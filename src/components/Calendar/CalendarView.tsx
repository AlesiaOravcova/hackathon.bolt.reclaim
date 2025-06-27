import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { EventCard } from './EventCard';
import { EventForm } from './EventForm';
import { CalendarEvent, Calendar } from '../../services/googleCalendar';
import { format, startOfWeek, addDays, isSameDay, parseISO } from 'date-fns';

interface CalendarViewProps {
  events: CalendarEvent[];
  calendars: Calendar[];
  selectedCalendars: string[];
  onCreateEvent: (calendarId: string, event: Partial<CalendarEvent>) => Promise<CalendarEvent | null>;
  onUpdateEvent: (calendarId: string, eventId: string, event: Partial<CalendarEvent>) => Promise<CalendarEvent | null>;
  onDeleteEvent: (calendarId: string, eventId: string) => Promise<boolean>;
  onRefresh: () => Promise<void>;
  isLoading?: boolean;
}

type ViewMode = 'agenda' | 'timeline' | 'week';

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  calendars,
  selectedCalendars,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
  onRefresh,
  isLoading = false
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('agenda');
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCreateEvent = async (calendarId: string, eventData: Partial<CalendarEvent>) => {
    const result = await onCreateEvent(calendarId, eventData);
    if (result) {
      setShowEventForm(false);
      setEditingEvent(null);
    }
  };

  const handleUpdateEvent = async (calendarId: string, eventData: Partial<CalendarEvent>) => {
    if (!editingEvent) return;
    
    const result = await onUpdateEvent(calendarId, editingEvent.id, eventData);
    if (result) {
      setShowEventForm(false);
      setEditingEvent(null);
    }
  };

  const handleEditEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleDeleteEvent = async (event: CalendarEvent) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await onDeleteEvent(event.calendarId, event.id);
    }
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = event.start.dateTime ? parseISO(event.start.dateTime) : parseISO(event.start.date!);
      return isSameDay(eventDate, date);
    });
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => {
        const eventDate = event.start.dateTime ? parseISO(event.start.dateTime) : parseISO(event.start.date!);
        return eventDate >= now;
      })
      .slice(0, 10);
  };

  const renderAgendaView = () => {
    const upcomingEvents = getUpcomingEvents();
    
    if (upcomingEvents.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming events</h3>
          <p className="text-gray-600 mb-4">Create your first event to get started</p>
          <Button
            onClick={() => setShowEventForm(true)}
            className="bg-blue-600 text-white"
          >
            Create Event
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {upcomingEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <EventCard
              event={event}
              onEdit={handleEditEvent}
              onDelete={handleDeleteEvent}
              showDate={true}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return (
      <div className="space-y-4">
        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedDate(addDays(selectedDate, -7))}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
          </h3>
          <button
            onClick={() => setSelectedDate(addDays(selectedDate, 7))}
            className="p-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Week Days */}
        <div className="space-y-3">
          {weekDays.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isToday = isSameDay(day, new Date());

            return (
              <motion.div
                key={day.toISOString()}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl p-4 border ${
                  isToday ? 'border-blue-200 bg-blue-50' : 'border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-semibold ${
                    isToday ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {format(day, 'EEEE, MMM d')}
                  </h4>
                  <span className={`text-sm ${
                    isToday ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {dayEvents.length > 0 ? (
                  <div className="space-y-2">
                    {dayEvents.map(event => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onEdit={handleEditEvent}
                        onDelete={handleDeleteEvent}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">No events scheduled</p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimelineView = () => {
    const today = new Date();
    const next7Days = Array.from({ length: 7 }, (_, i) => addDays(today, i));

    return (
      <div className="space-y-6">
        {next7Days.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isToday = isSameDay(day, new Date());

          return (
            <motion.div
              key={day.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot and line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />
              <div className={`absolute left-2 top-2 w-4 h-4 rounded-full border-2 ${
                isToday 
                  ? 'bg-blue-600 border-blue-600' 
                  : 'bg-white border-gray-300'
              }`} />

              <div className="ml-12">
                <h3 className={`font-semibold mb-2 ${
                  isToday ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {format(day, 'EEEE, MMMM d')}
                  {isToday && <span className="ml-2 text-sm text-blue-600">Today</span>}
                </h3>

                {dayEvents.length > 0 ? (
                  <div className="space-y-3">
                    {dayEvents.map(event => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onEdit={handleEditEvent}
                        onDelete={handleDeleteEvent}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-500 text-sm">No events scheduled</p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">Calendar</h2>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg disabled:opacity-50"
          >
            <svg 
              className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        <Button
          onClick={() => setShowEventForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          + Add Event
        </Button>
      </div>

      {/* View Mode Selector */}
      <div className="flex bg-gray-100 m-4 rounded-xl p-1">
        {[
          { mode: 'agenda' as ViewMode, label: 'Agenda' },
          { mode: 'timeline' as ViewMode, label: 'Timeline' },
          { mode: 'week' as ViewMode, label: 'Week' },
        ].map(({ mode, label }) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              viewMode === mode
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === 'agenda' && renderAgendaView()}
        {viewMode === 'timeline' && renderTimelineView()}
        {viewMode === 'week' && renderWeekView()}
      </div>

      {/* Event Form Modal */}
      <AnimatePresence>
        {showEventForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end"
            onClick={() => {
              setShowEventForm(false);
              setEditingEvent(null);
            }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full"
            >
              <EventForm
                event={editingEvent || undefined}
                calendars={calendars.filter(cal => selectedCalendars.includes(cal.id))}
                selectedCalendarId={selectedCalendars[0]}
                onSave={editingEvent ? handleUpdateEvent : handleCreateEvent}
                onCancel={() => {
                  setShowEventForm(false);
                  setEditingEvent(null);
                }}
                isLoading={isLoading}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};