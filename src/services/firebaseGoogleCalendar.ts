import { signInWithPopup, signInWithRedirect, getRedirectResult, signOut as firebaseSignOut, User, GoogleAuthProvider, getAdditionalUserInfo } from 'firebase/auth';
import { auth, googleProvider } from './firebaseConfig';

export interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  colorId?: string;
  calendarId: string;
  category?: 'work' | 'school' | 'family' | 'personal' | 'health';
  location?: string;
  attendees?: Array<{
    email: string;
    displayName?: string;
    responseStatus?: string;
  }>;
}

export interface Calendar {
  id: string;
  summary: string;
  description?: string;
  backgroundColor?: string;
  foregroundColor?: string;
  selected?: boolean;
  primary?: boolean;
}

class FirebaseGoogleCalendarService {
  private user: User | null = null;
  private accessToken: string | null = null;

  constructor() {
    // Listen for auth state changes
    auth.onAuthStateChanged((user) => {
      this.user = user;
      if (user) {
        // Try to get the access token from the user's auth result
        this.refreshAccessToken();
      }
    });
  }

  async signInWithGoogle(): Promise<boolean> {
    try {
      // Configure the Google provider with additional scopes
      googleProvider.addScope('https://www.googleapis.com/auth/calendar');
      googleProvider.addScope('https://www.googleapis.com/auth/calendar.events');
      googleProvider.addScope('https://www.googleapis.com/auth/calendar.readonly');
      
      // Set custom parameters for better UX
      googleProvider.setCustomParameters({
        prompt: 'select_account',
        access_type: 'offline',
      });

      // Try popup first, fallback to redirect if blocked
      try {
        const result = await signInWithPopup(auth, googleProvider);
        return this.handleAuthResult(result);
      } catch (popupError: any) {
        console.log('Popup failed, trying redirect:', popupError.code);
        
        // If popup is blocked or fails, use redirect
        if (popupError.code === 'auth/popup-blocked' || 
            popupError.code === 'auth/popup-closed-by-user' ||
            popupError.code === 'auth/cancelled-popup-request') {
          
          // Use redirect as fallback
          await signInWithRedirect(auth, googleProvider);
          // Note: Page will redirect, so we return false here
          // The actual result will be handled in handleRedirectResult
          return false;
        }
        
        // Re-throw other errors
        throw popupError;
      }
    } catch (error: any) {
      console.error('Error with Google sign-in:', error);
      
      // Handle specific error cases
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Pop-up was blocked. Redirecting to sign-in page...');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your connection and try again.');
      } else if (error.code === 'auth/unauthorized-domain') {
        throw new Error('This domain is not authorized. Please contact support.');
      } else {
        throw new Error('Failed to sign in with Google. Please try again.');
      }
    }
  }

  private handleAuthResult(result: any): boolean {
    if (result) {
      this.user = result.user;
      
      // Get the access token for Google Calendar API
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.accessToken = credential?.accessToken || null;
      
      // Check if this is a new user
      const additionalUserInfo = getAdditionalUserInfo(result);
      const isNewUser = additionalUserInfo?.isNewUser || false;
      
      // Store user info in localStorage for persistence
      if (this.accessToken) {
        localStorage.setItem('google_access_token', this.accessToken);
        localStorage.setItem('user_info', JSON.stringify({
          uid: this.user.uid,
          email: this.user.email,
          displayName: this.user.displayName,
          photoURL: this.user.photoURL,
          isNewUser
        }));
      }
      
      return true;
    }
    
    return false;
  }

  async handleRedirectResult(): Promise<boolean> {
    try {
      const result = await getRedirectResult(auth);
      return this.handleAuthResult(result);
    } catch (error: any) {
      console.error('Error handling redirect result:', error);
      
      // Handle specific error cases
      if (error.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your connection and try again.');
      } else {
        throw new Error('Failed to complete Google sign-in. Please try again.');
      }
    }
  }

  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
      this.user = null;
      this.accessToken = null;
      
      // Clear stored tokens and user info
      localStorage.removeItem('google_access_token');
      localStorage.removeItem('user_info');
      localStorage.removeItem('selected_calendars');
    } catch (error) {
      console.error('Error signing out:', error);
      throw new Error('Failed to sign out. Please try again.');
    }
  }

  isAuthenticated(): boolean {
    return !!this.user && !!this.accessToken;
  }

  private async refreshAccessToken(): Promise<void> {
    // Try to get token from localStorage first
    const storedToken = localStorage.getItem('google_access_token');
    if (storedToken && this.user) {
      this.accessToken = storedToken;
    }
  }

  private async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    if (!this.accessToken) {
      throw new Error('No access token available. Please sign in again.');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // Token might be expired, try to refresh
      throw new Error('Authentication expired. Please sign in again.');
    }

    return response;
  }

  async getCalendarList(): Promise<Calendar[]> {
    try {
      const response = await this.makeAuthenticatedRequest(
        'https://www.googleapis.com/calendar/v3/users/me/calendarList'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch calendar list');
      }

      const data = await response.json();
      return data.items.map((item: any) => ({
        id: item.id,
        summary: item.summary,
        description: item.description,
        backgroundColor: item.backgroundColor,
        foregroundColor: item.foregroundColor,
        selected: item.selected,
        primary: item.primary,
      }));
    } catch (error) {
      console.error('Error fetching calendar list:', error);
      throw error;
    }
  }

  async getEvents(calendarIds: string[], timeMin?: Date, timeMax?: Date): Promise<CalendarEvent[]> {
    const startTime = timeMin || new Date();
    const endTime = timeMax || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    try {
      const eventPromises = calendarIds.map(async (calendarId) => {
        const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
        url.searchParams.set('timeMin', startTime.toISOString());
        url.searchParams.set('timeMax', endTime.toISOString());
        url.searchParams.set('singleEvents', 'true');
        url.searchParams.set('orderBy', 'startTime');
        url.searchParams.set('maxResults', '50');

        const response = await this.makeAuthenticatedRequest(url.toString());
        
        if (!response.ok) {
          console.warn(`Failed to fetch events for calendar ${calendarId}`);
          return [];
        }

        const data = await response.json();
        return data.items.map((item: any) => ({
          ...item,
          calendarId,
          category: this.categorizeEvent(item.summary, item.description),
        }));
      });

      const eventArrays = await Promise.all(eventPromises);
      const allEvents = eventArrays.flat();
      
      return allEvents.sort((a, b) => {
        const aStart = new Date(a.start.dateTime || a.start.date);
        const bStart = new Date(b.start.dateTime || b.start.date);
        return aStart.getTime() - bStart.getTime();
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }

  async createEvent(calendarId: string, event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    try {
      const response = await this.makeAuthenticatedRequest(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
        {
          method: 'POST',
          body: JSON.stringify({
            summary: event.summary,
            description: event.description,
            start: event.start,
            end: event.end,
            location: event.location,
            attendees: event.attendees,
            colorId: event.colorId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const createdEvent = await response.json();
      return {
        ...createdEvent,
        calendarId,
        category: this.categorizeEvent(createdEvent.summary, createdEvent.description),
      };
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }

  async updateEvent(calendarId: string, eventId: string, event: Partial<CalendarEvent>): Promise<CalendarEvent> {
    try {
      const response = await this.makeAuthenticatedRequest(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            summary: event.summary,
            description: event.description,
            start: event.start,
            end: event.end,
            location: event.location,
            attendees: event.attendees,
            colorId: event.colorId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      const updatedEvent = await response.json();
      return {
        ...updatedEvent,
        calendarId,
        category: this.categorizeEvent(updatedEvent.summary, updatedEvent.description),
      };
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  }

  async deleteEvent(calendarId: string, eventId: string): Promise<void> {
    try {
      const response = await this.makeAuthenticatedRequest(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  }

  private categorizeEvent(summary: string, description?: string): CalendarEvent['category'] {
    const text = `${summary} ${description || ''}`.toLowerCase();
    
    if (text.includes('work') || text.includes('meeting') || text.includes('office')) {
      return 'work';
    }
    if (text.includes('school') || text.includes('class') || text.includes('homework')) {
      return 'school';
    }
    if (text.includes('family') || text.includes('kids') || text.includes('parent')) {
      return 'family';
    }
    if (text.includes('doctor') || text.includes('health') || text.includes('medical')) {
      return 'health';
    }
    
    return 'personal';
  }

  getCategoryColor(category: CalendarEvent['category']): string {
    const colors = {
      work: '#3B82F6',
      school: '#10B981',
      family: '#F59E0B',
      health: '#EF4444',
      personal: '#8B5CF6',
    };
    return colors[category] || colors.personal;
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  // Helper method to check if user is new
  isNewUser(): boolean {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        return parsed.isNewUser || false;
      } catch {
        return false;
      }
    }
    return false;
  }
}

export const firebaseGoogleCalendarService = new FirebaseGoogleCalendarService();