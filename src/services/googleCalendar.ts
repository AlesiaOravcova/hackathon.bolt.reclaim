// Google Calendar API service
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

export interface GoogleCalendarTokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  expires_at: number;
}

class GoogleCalendarService {
  private readonly CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  private readonly CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
  private readonly REDIRECT_URI = `${window.location.origin}/auth/callback`;
  private readonly SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
  ].join(' ');

  private tokens: GoogleCalendarTokens | null = null;

  constructor() {
    this.loadTokensFromStorage();
    console.log('GoogleCalendarService initialized with:', {
      clientId: this.CLIENT_ID ? 'Set' : 'Not set',
      clientSecret: this.CLIENT_SECRET ? 'Set' : 'Not set',
      redirectUri: this.REDIRECT_URI,
      currentOrigin: window.location.origin,
      currentUrl: window.location.href
    });
  }

  // OAuth 2.0 Authentication
  initiateOAuth(): void {
    if (!this.CLIENT_ID) {
      console.error('Environment variables:', {
        VITE_GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        VITE_GOOGLE_CLIENT_SECRET: import.meta.env.VITE_GOOGLE_CLIENT_SECRET
      });
      throw new Error('Google Client ID is not configured. Please check your .env file.');
    }

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    authUrl.searchParams.set('client_id', this.CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', this.REDIRECT_URI);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', this.SCOPES);
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');
    authUrl.searchParams.set('include_granted_scopes', 'true');
    
    console.log('=== OAuth Debug Information ===');
    console.log('Client ID:', this.CLIENT_ID);
    console.log('Redirect URI:', this.REDIRECT_URI);
    console.log('Current URL:', window.location.href);
    console.log('Auth URL:', authUrl.toString());
    console.log('================================');
    
    // Add a small delay to ensure console logs are visible
    setTimeout(() => {
      console.log('Redirecting to Google OAuth in 2 seconds...');
      window.location.href = authUrl.toString();
    }, 2000);
  }

  async handleOAuthCallback(code: string): Promise<boolean> {
    try {
      console.log('Handling OAuth callback with code:', code);
      
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.REDIRECT_URI,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Token exchange failed:', errorData);
        throw new Error(`Failed to exchange code for tokens: ${errorData.error_description || errorData.error}`);
      }

      const tokens = await response.json();
      tokens.expires_at = Date.now() + (tokens.expires_in * 1000);
      
      this.tokens = tokens;
      this.saveTokensToStorage();
      console.log('OAuth tokens received and saved');
      return true;
    } catch (error) {
      console.error('OAuth callback error:', error);
      return false;
    }
  }

  async refreshAccessToken(): Promise<boolean> {
    if (!this.tokens?.refresh_token) {
      return false;
    }

    try {
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET,
          refresh_token: this.tokens.refresh_token,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const newTokens = await response.json();
      this.tokens = {
        ...this.tokens,
        access_token: newTokens.access_token,
        expires_in: newTokens.expires_in,
        expires_at: Date.now() + (newTokens.expires_in * 1000),
      };
      
      this.saveTokensToStorage();
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  private async ensureValidToken(): Promise<boolean> {
    if (!this.tokens) {
      return false;
    }

    if (Date.now() >= this.tokens.expires_at - 60000) { // Refresh 1 minute before expiry
      return await this.refreshAccessToken();
    }

    return true;
  }

  private async makeAuthenticatedRequest(url: string, options: RequestInit = {}): Promise<Response> {
    if (!(await this.ensureValidToken())) {
      throw new Error('No valid authentication token');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${this.tokens!.access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // Try to refresh token once
      if (await this.refreshAccessToken()) {
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${this.tokens!.access_token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    }

    return response;
  }

  // Calendar Management
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

  // Event Management
  async getEvents(calendarIds: string[], timeMin?: Date, timeMax?: Date): Promise<CalendarEvent[]> {
    const startTime = timeMin || new Date();
    const endTime = timeMax || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

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
      
      // Sort by start time
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

  // Utility methods
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
      work: '#3B82F6', // Blue
      school: '#10B981', // Green
      family: '#F59E0B', // Yellow
      health: '#EF4444', // Red
      personal: '#8B5CF6', // Purple
    };
    return colors[category] || colors.personal;
  }

  isAuthenticated(): boolean {
    return !!this.tokens && Date.now() < this.tokens.expires_at;
  }

  signOut(): void {
    this.tokens = null;
    localStorage.removeItem('google_calendar_tokens');
  }

  private saveTokensToStorage(): void {
    if (this.tokens) {
      localStorage.setItem('google_calendar_tokens', JSON.stringify(this.tokens));
    }
  }

  private loadTokensFromStorage(): void {
    const stored = localStorage.getItem('google_calendar_tokens');
    if (stored) {
      try {
        this.tokens = JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored tokens:', error);
        localStorage.removeItem('google_calendar_tokens');
      }
    }
  }
}

export const googleCalendarService = new GoogleCalendarService();