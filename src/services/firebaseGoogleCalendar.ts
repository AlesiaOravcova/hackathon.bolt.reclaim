import { signInWithPopup, signOut as firebaseSignOut, User } from 'firebase/auth';
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
    });
  }

  async signInWithGoogle(): Promise<boolean> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      this.user = result.user;
      
      // Get the access token for Google Calendar API
      const credential = GoogleAuthProvider.credentialFromResult(result);
      this.accessToken = credential?.accessToken || null;
      
      return true;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      return false;
    }
  }

  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
      this.user = null;
      this.accessToken = null;
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  isAuthenticated(): boolean {
    return !!this.user && !!this.accessToken;
  }

  private async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
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
}

export const firebaseGoogleCalendarService = new FirebaseGoogleCalendarService();