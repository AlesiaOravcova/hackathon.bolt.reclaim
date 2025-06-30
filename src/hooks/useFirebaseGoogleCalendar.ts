import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { firebaseGoogleCalendarService, CalendarEvent, Calendar } from '../services/firebaseGoogleCalendar';

export interface UseFirebaseGoogleCalendarReturn {
  isAuthenticated: boolean;
  user: User | null;
  calendars: Calendar[];
  events: CalendarEvent[];
  selectedCalendars: string[];
  isLoading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<boolean>;
  fetchCalendars: () => Promise<void>;
  fetchEvents: (timeMin?: Date, timeMax?: Date) => Promise<void>;
  selectCalendars: (calendarIds: string[]) => void;
  createEvent: (calendarId: string, event: Partial<CalendarEvent>) => Promise<CalendarEvent | null>;
  updateEvent: (calendarId: string, eventId: string, event: Partial<CalendarEvent>) => Promise<CalendarEvent | null>;
  deleteEvent: (calendarId: string, eventId: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  refreshEvents: () => Promise<void>;
  clearError: () => void;
}

export const useFirebaseGoogleCalendar = (): UseFirebaseGoogleCalendarReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check initial auth state
    const currentUser = firebaseGoogleCalendarService.getCurrentUser();
    setUser(currentUser);
    setIsAuthenticated(firebaseGoogleCalendarService.isAuthenticated());
    
    // Load selected calendars from localStorage
    const stored = localStorage.getItem('selected_calendars');
    if (stored) {
      try {
        setSelectedCalendars(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse selected calendars:', error);
      }
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const signInWithGoogle = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await firebaseGoogleCalendarService.signInWithGoogle();
      if (success) {
        setUser(firebaseGoogleCalendarService.getCurrentUser());
        setIsAuthenticated(true);
      }
      return success;
    } catch (error: any) {
      setError(error.message || 'Authentication failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCalendars = useCallback(async (): Promise<void> => {
    if (!firebaseGoogleCalendarService.isAuthenticated()) {
      setError('Not authenticated');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const calendarList = await firebaseGoogleCalendarService.getCalendarList();
      setCalendars(calendarList);
      
      // Auto-select primary calendar if no calendars are selected
      if (selectedCalendars.length === 0) {
        const primaryCalendar = calendarList.find(cal => cal.primary);
        if (primaryCalendar) {
          setSelectedCalendars([primaryCalendar.id]);
          localStorage.setItem('selected_calendars', JSON.stringify([primaryCalendar.id]));
        }
      }
    } catch (error: any) {
      setError(error.message || 'Failed to fetch calendars');
      console.error('Fetch calendars error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCalendars.length]);

  const fetchEvents = useCallback(async (timeMin?: Date, timeMax?: Date): Promise<void> => {
    if (!firebaseGoogleCalendarService.isAuthenticated() || selectedCalendars.length === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const eventList = await firebaseGoogleCalendarService.getEvents(selectedCalendars, timeMin, timeMax);
      setEvents(eventList);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch events');
      console.error('Fetch events error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCalendars]);

  const selectCalendars = useCallback((calendarIds: string[]) => {
    setSelectedCalendars(calendarIds);
    localStorage.setItem('selected_calendars', JSON.stringify(calendarIds));
  }, []);

  const createEvent = useCallback(async (
    calendarId: string, 
    event: Partial<CalendarEvent>
  ): Promise<CalendarEvent | null> => {
    if (!firebaseGoogleCalendarService.isAuthenticated()) {
      setError('Not authenticated');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const createdEvent = await firebaseGoogleCalendarService.createEvent(calendarId, event);
      
      // Add to local events list
      setEvents(prev => [...prev, createdEvent].sort((a, b) => {
        const aStart = new Date(a.start.dateTime || a.start.date);
        const bStart = new Date(b.start.dateTime || b.start.date);
        return aStart.getTime() - bStart.getTime();
      }));
      
      return createdEvent;
    } catch (error: any) {
      setError(error.message || 'Failed to create event');
      console.error('Create event error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (
    calendarId: string, 
    eventId: string, 
    event: Partial<CalendarEvent>
  ): Promise<CalendarEvent | null> => {
    if (!firebaseGoogleCalendarService.isAuthenticated()) {
      setError('Not authenticated');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updatedEvent = await firebaseGoogleCalendarService.updateEvent(calendarId, eventId, event);
      
      // Update local events list
      setEvents(prev => prev.map(e => e.id === eventId ? updatedEvent : e));
      
      return updatedEvent;
    } catch (error: any) {
      setError(error.message || 'Failed to update event');
      console.error('Update event error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (calendarId: string, eventId: string): Promise<boolean> => {
    if (!firebaseGoogleCalendarService.isAuthenticated()) {
      setError('Not authenticated');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      await firebaseGoogleCalendarService.deleteEvent(calendarId, eventId);
      
      // Remove from local events list
      setEvents(prev => prev.filter(e => e.id !== eventId));
      
      return true;
    } catch (error: any) {
      setError(error.message || 'Failed to delete event');
      console.error('Delete event error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    try {
      await firebaseGoogleCalendarService.signOut();
      setIsAuthenticated(false);
      setUser(null);
      setCalendars([]);
      setEvents([]);
      setSelectedCalendars([]);
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Failed to sign out');
    }
  }, []);

  const refreshEvents = useCallback(async (): Promise<void> => {
    await fetchEvents();
  }, [fetchEvents]);

  return {
    isAuthenticated,
    user,
    calendars,
    events,
    selectedCalendars,
    isLoading,
    error,
    signInWithGoogle,
    fetchCalendars,
    fetchEvents,
    selectCalendars,
    createEvent,
    updateEvent,
    deleteEvent,
    signOut,
    refreshEvents,
    clearError,
  };
};