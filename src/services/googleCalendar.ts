// Google Calendar API service with enhanced security
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
  
  // Minimized scopes - only request what we absolutely need
  private readonly SCOPES = [
    'https://www.googleapis.com/auth/calendar.readonly', // Read-only access to calendars
    'https://www.googleapis.com/auth/calendar.events'    // Manage calendar events
  ].join(' ');

  private tokens: GoogleCalendarTokens | null = null;
  private readonly STORAGE_KEY = 'google_calendar_tokens';
  private readonly SELECTED_CALENDARS_KEY = 'selected_calendars';

  constructor() {
    this.loadTokensFromStorage();
    
    // Security: Clear tokens on page unload for additional protection
    window.addEventListener('beforeunload', () => {
      this.clearSensitiveData();
    });
    
    // Debug logging (only in development)
    if (import.meta.env.DEV) {
      console.log('GoogleCalendarService initialized:', {
        hasClientId: !!this.CLIENT_ID,
        hasClientSecret: !!this.CLIENT_SECRET,
        currentOrigin: window.location.origin,
        scopes: this.SCOPES
      });
    }
  }

  // Get the current redirect URI dynamically
  private getRedirectUri(): string {
    return `${window.location.origin}/auth/callback`;
  }

  // OAuth 2.0 Authentication with popup window
  async initiateOAuth(): Promise<boolean> {
    console.log('Initiating OAuth flow with popup...');
    
    if (!this.CLIENT_ID) {
      throw new Error('Google Client ID is not configured. Please check your .env file.');
    }

    const redirectUri = this.getRedirectUri();
    console.log('Using redirect URI:', redirectUri);

    try {
      // Create the OAuth URL with proper encoding and security parameters
      const authParams = new URLSearchParams({
        client_id: this.CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: this.SCOPES,
        access_type: 'offline',
        prompt: 'consent',
        include_granted_scopes: 'true',
        // Security: Add state parameter to prevent CSRF attacks
        state: this.generateSecureState()
      });

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${authParams.toString()}`;
      
      if (import.meta.env.DEV) {
        console.log('OAuth URL:', authUrl);
        console.log('Opening popup window...');
      }
      
      // Open popup window
      const popup = window.open(
        authUrl,
        'google-oauth',
        'width=500,height=600,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no'
      );

      if (!popup) {
        throw new Error('Popup blocked. Please allow popups for this site and try again.');
      }

      // Wait for popup to complete authentication
      return new Promise((resolve, reject) => {
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            // Check if we received tokens (they would be stored during the callback)
            if (this.isAuthenticated()) {
              resolve(true);
            } else {
              reject(new Error('Authentication was cancelled or failed.'));
            }
          }
        }, 1000);

        // Listen for messages from the popup (callback page will send success message)
        const messageListener = (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'GOOGLE_AUTH_CALLBACK') {
            // Handle the OAuth callback in the main window with proper state verification
            clearInterval(checkClosed);
            window.removeEventListener('message', messageListener);
            popup.close();
            
            // Process the OAuth callback
            this.handleOAuthCallback(event.data.code, event.data.state)
              .then((success) => {
                if (success) {
                  resolve(true);
                } else {
                  reject(new Error('Failed to authenticate with Google Calendar'));
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageListener);
            popup.close();
            resolve(true);
          } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageListener);
            popup.close();
            reject(new Error(event.data.error || 'Authentication failed'));
          }
        };

        window.addEventListener('message', messageListener);

        // Timeout after 5 minutes
        setTimeout(() => {
          clearInterval(checkClosed);
          window.removeEventListener('message', messageListener);
          if (!popup.closed) {
            popup.close();
          }
          reject(new Error('Authentication timeout. Please try again.'));
        }, 5 * 60 * 1000);
      });
      
    } catch (error) {
      console.error('Error creating OAuth URL:', error);
      throw error;
    }
  }

  async handleOAuthCallback(code: string, state?: string): Promise<boolean> {
    console.log('Handling OAuth callback...');
    
    try {
      // Security: Verify state parameter to prevent CSRF attacks
      if (state) {
        const storedState = sessionStorage.getItem('oauth_state');
        if (!storedState || storedState !== state) {
          throw new Error('Invalid state parameter - possible CSRF attack');
        }
        // Clear the state after verification
        sessionStorage.removeItem('oauth_state');
      }

      if (!this.CLIENT_ID || !this.CLIENT_SECRET) {
        throw new Error('Google API credentials are not properly configured');
      }

      const redirectUri = this.getRedirectUri();

      const tokenUrl = 'https://oauth2.googleapis.com/token';
      const body = new URLSearchParams({
        client_id: this.CLIENT_ID,
        client_secret: this.CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      });

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: body,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Token exchange failed:', errorText);
        
        let errorMessage = `Failed to exchange code for tokens: ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error_description) {
            errorMessage += ` - ${errorData.error_description}`;
          }
        } catch (e) {
          errorMessage += ` - ${errorText}`;
        }
        
        throw new Error(errorMessage);
      }

      const tokens = await response.json();
      
      // Security: Validate token response
      if (!tokens.access_token || !tokens.refresh_token) {
        throw new Error('Invalid token response from Google');
      }
      
      tokens.expires_at = Date.now() + (tokens.expires_in * 1000);
      
      this.tokens = tokens;
      this.saveTokensToStorage();
      return true;
    } catch (error) {
      console.error('OAuth callback error:', error);
      return false;
    }
  }

  async refreshAccessToken(): Promise<boolean> {
    if (!this.tokens?.refresh_token) {
      console.error('No refresh token available');
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
        const errorText = await response.text();
        console.error('Token refresh failed:', errorText);
        
        // Security: Clear tokens if refresh fails (user needs to re-authenticate)
        if (response.status === 400 || response.status === 401) {
          this.signOut();
        }
        
        throw new Error(`Failed to refresh token: ${response.status}`);
      }

      const newTokens = await response.json();
      
      // Security: Validate refreshed token
      if (!newTokens.access_token) {
        throw new Error('Invalid refresh token response');
      }
      
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
      console.error('No tokens available');
      return false;
    }

    // Security: Check token expiry with buffer time
    if (Date.now() >= this.tokens.expires_at - 60000) { // Refresh 1 minute before expiry
      console.log('Token expired, refreshing...');
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
      
      // Security: Data minimization - only return necessary fields
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

  // Event Management with data minimization
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
        
        // Security: Only request fields we actually need
        url.searchParams.set('fields', 'items(id,summary,description,start,end,location,colorId)');

        const response = await this.makeAuthenticatedRequest(url.toString());
        
        if (!response.ok) {
          console.warn(`Failed to fetch events for calendar ${calendarId}`);
          return [];
        }

        const data = await response.json();
        return data.items.map((item: any) => ({
          id: item.id,
          summary: item.summary || 'Untitled Event',
          description: item.description,
          start: item.start,
          end: item.end,
          location: item.location,
          colorId: item.colorId,
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
      // Security: Sanitize input data
      const sanitizedEvent = {
        summary: this.sanitizeString(event.summary || ''),
        description: this.sanitizeString(event.description || ''),
        start: event.start,
        end: event.end,
        location: this.sanitizeString(event.location || ''),
        colorId: event.colorId,
      };

      const response = await this.makeAuthenticatedRequest(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
        {
          method: 'POST',
          body: JSON.stringify(sanitizedEvent),
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
      // Security: Sanitize input data
      const sanitizedEvent = {
        summary: this.sanitizeString(event.summary || ''),
        description: this.sanitizeString(event.description || ''),
        start: event.start,
        end: event.end,
        location: this.sanitizeString(event.location || ''),
        colorId: event.colorId,
      };

      const response = await this.makeAuthenticatedRequest(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events/${eventId}`,
        {
          method: 'PUT',
          body: JSON.stringify(sanitizedEvent),
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

  // Security utility methods
  private generateSecureState(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const state = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    
    // Store state in sessionStorage for verification
    sessionStorage.setItem('oauth_state', state);
    return state;
  }

  private sanitizeString(input: string): string {
    // Basic sanitization - remove potentially harmful characters
    return input.replace(/[<>\"'&]/g, '').trim();
  }

  private clearSensitiveData(): void {
    // Clear any sensitive data from memory
    if (this.tokens) {
      // Overwrite token data
      this.tokens.access_token = '';
      this.tokens.refresh_token = '';
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
    // Security: Clear all stored data
    this.clearSensitiveData();
    this.tokens = null;
    sessionStorage.removeItem(this.STORAGE_KEY);
    sessionStorage.removeItem(this.SELECTED_CALENDARS_KEY);
    sessionStorage.removeItem('oauth_state');
  }

  // Security: Updated storage methods to use sessionStorage
  private saveTokensToStorage(): void {
    if (this.tokens) {
      try {
        // Use sessionStorage instead of localStorage for better security
        sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tokens));
      } catch (error) {
        console.error('Failed to save tokens to storage:', error);
        // If storage fails, clear tokens to prevent inconsistent state
        this.tokens = null;
      }
    }
  }

  private loadTokensFromStorage(): void {
    try {
      // Use sessionStorage instead of localStorage
      const stored = sessionStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const tokens = JSON.parse(stored);
        
        // Security: Validate stored tokens
        if (tokens.access_token && tokens.refresh_token && tokens.expires_at) {
          // Check if tokens are still valid
          if (Date.now() < tokens.expires_at) {
            this.tokens = tokens;
          } else {
            // Tokens expired, remove them
            sessionStorage.removeItem(this.STORAGE_KEY);
          }
        } else {
          // Invalid token structure, remove them
          sessionStorage.removeItem(this.STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Failed to parse stored tokens:', error);
      sessionStorage.removeItem(this.STORAGE_KEY);
    }
  }
}

export const googleCalendarService = new GoogleCalendarService();