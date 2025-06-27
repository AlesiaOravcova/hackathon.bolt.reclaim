import { useState, useEffect, useCallback } from 'react';
import { googleCalendarService, CalendarEvent, Calendar } from '../services/googleCalendar';

export interface UseGoogleCalendarReturn {
  isAuthenticated: boolean;
  calendars: Calendar[];
  events: CalendarEvent[];
  selectedCalendars: string[];
  isLoading: boolean;
  error: string | null;
  initiateAuth: () => void;
  handleAuthCallback: (code: string) => Promise<boolean>;
  fetchCalendars: () => Promise<void>;
  fetchEvents: (timeMin?: Date, timeMax?: Date) => Promise<void>;
  selectCalendars: (calendarIds: string[]) => void;
  createEvent: (calendarId: string, event: Partial<CalendarEvent>) => Promise<CalendarEvent | null>;
  updateEvent: (calendarId: string, eventId: string, event: Partial<CalendarEvent>) => Promise<CalendarEvent | null>;
  deleteEvent: (calendarId: string, eventId: string) => Promise<boolean>;
  signOut: () => void;
  refreshEvents: () => Promise<void>;
}

export const useGoogleCalendar = (): UseGoogleCalendarReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsAuthenticated(googleCalendarService.isAuthenticated());
    
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

  const initiateAuth = useCallback(() => {
    setError(null);
    googleCalendarService.initiateOAuth();
  }, []);

  const handleAuthCallback = useCallback(async (code: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const success = await googleCalendarService.handleOAuthCallback(code);
      setIsAuthenticated(success);
      return success;
    } catch (error) {
      setError('Authentication failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCalendars = useCallback(async (): Promise<void> => {
    if (!googleCalendarService.isAuthenticated()) {
      setError('Not authenticated');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const calendarList = await googleCalendarService.getCalendarList();
      setCalendars(calendarList);
      
      // Auto-select primary calendar if no calendars are selected
      if (selectedCalendars.length === 0) {
        const primaryCalendar = calendarList.find(cal => cal.primary);
        if (primaryCalendar) {
          setSelectedCalendars([primaryCalendar.id]);
          localStorage.setItem('selected_calendars', JSON.stringify([primaryCalendar.id]));
        }
      }
    } catch (error) {
      setError('Failed to fetch calendars');
      console.error('Fetch calendars error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCalendars.length]);

  const fetchEvents = useCallback(async (timeMin?: Date, timeMax?: Date): Promise<void> => {
    if (!googleCalendarService.isAuthenticated() || selectedCalendars.length === 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const eventList = await googleCalendarService.getEvents(selectedCalendars, timeMin, timeMax);
      setEvents(eventList);
    } catch (error) {
      setError('Failed to fetch events');
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
    if (!googleCalendarService.isAuthenticated()) {
      setError('Not authenticated');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const createdEvent = await googleCalendarService.createEvent(calendarId, event);
      
      // Add to local events list
      setEvents(prev => [...prev, createdEvent].sort((a, b) => {
        const aStart = new Date(a.start.dateTime || a.start.date);
        const bStart = new Date(b.start.dateTime || b.start.date);
        return aStart.getTime() - bStart.getTime();
      }));
      
      return createdEvent;
    } catch (error) {
      setError('Failed to create event');
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
    if (!googleCalendarService.isAuthenticated()) {
      setError('Not authenticated');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const updatedEvent = await googleCalendarService.updateEvent(calendarId, eventId, event);
      
      // Update local events list
      setEvents(prev => prev.map(e => e.id === eventId ? updatedEvent : e));
      
      return updatedEvent;
    } catch (error) {
      setError('Failed to update event');
      console.error('Update event error:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (calendarId: string, eventId: string): Promise<boolean> => {
    if (!googleCalendarService.isAuthenticated()) {
      setError('Not authenticated');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      await googleCalendarService.deleteEvent(calendarId, eventId);
      
      // Remove from local events list
      setEvents(prev => prev.filter(e => e.id !== eventId));
      
      return true;
    } catch (error) {
      setError('Failed to delete event');
      console.error('Delete event error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(() => {
    googleCalendarService.signOut();
    setIsAuthenticated(false);
    setCalendars([]);
    setEvents([]);
    setSelectedCalendars([]);
    setError(null);
    localStorage.removeItem('selected_calendars');
  }, []);

  const refreshEvents = useCallback(async (): Promise<void> => {
    await fetchEvents();
  }, [fetchEvents]);

  return {
    isAuthenticated,
    calendars,
    events,
    selectedCalendars,
    isLoading,
    error,
    initiateAuth,
    handleAuthCallback,
    fetchCalendars,
    fetchEvents,
    selectCalendars,
    createEvent,
    updateEvent,
    deleteEvent,
    signOut,
    refreshEvents,
  };
};