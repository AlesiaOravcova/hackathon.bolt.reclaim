import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { CalendarEvent, Calendar } from '../../services/googleCalendar';
import { format, parseISO } from 'date-fns';

interface EventFormProps {
  event?: CalendarEvent;
  calendars: Calendar[];
  selectedCalendarId?: string;
  onSave: (calendarId: string, eventData: Partial<CalendarEvent>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const EventForm: React.FC<EventFormProps> = ({
  event,
  calendars,
  selectedCalendarId,
  onSave,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState({
    summary: '',
    description: '',
    location: '',
    calendarId: selectedCalendarId || (calendars[0]?.id || ''),
    startDate: format(new Date(), 'yyyy-MM-dd'),
    startTime: format(new Date(), 'HH:mm'),
    endDate: format(new Date(), 'yyyy-MM-dd'),
    endTime: format(new Date(Date.now() + 60 * 60 * 1000), 'HH:mm'), // 1 hour later
    isAllDay: false,
    category: 'personal' as CalendarEvent['category'],
  });

  useEffect(() => {
    if (event) {
      const startTime = event.start.dateTime ? parseISO(event.start.dateTime) : parseISO(event.start.date!);
      const endTime = event.end.dateTime ? parseISO(event.end.dateTime) : parseISO(event.end.date!);
      const isAllDay = !event.start.dateTime;

      setFormData({
        summary: event.summary || '',
        description: event.description || '',
        location: event.location || '',
        calendarId: event.calendarId,
        startDate: format(startTime, 'yyyy-MM-dd'),
        startTime: isAllDay ? '09:00' : format(startTime, 'HH:mm'),
        endDate: format(endTime, 'yyyy-MM-dd'),
        endTime: isAllDay ? '10:00' : format(endTime, 'HH:mm'),
        isAllDay,
        category: event.category || 'personal',
      });
    }
  }, [event]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventData: Partial<CalendarEvent> = {
      summary: formData.summary,
      description: formData.description,
      location: formData.location,
      category: formData.category,
    };

    if (formData.isAllDay) {
      eventData.start = {
        date: formData.startDate,
      };
      eventData.end = {
        date: formData.endDate,
      };
    } else {
      eventData.start = {
        dateTime: `${formData.startDate}T${formData.startTime}:00`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      eventData.end = {
        dateTime: `${formData.endDate}T${formData.endTime}:00`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
    }

    await onSave(formData.calendarId, eventData);
  };

  const categories: Array<{ value: CalendarEvent['category']; label: string; color: string }> = [
    { value: 'work', label: 'Work', color: '#3B82F6' },
    { value: 'school', label: 'School', color: '#10B981' },
    { value: 'family', label: 'Family', color: '#F59E0B' },
    { value: 'health', label: 'Health', color: '#EF4444' },
    { value: 'personal', label: 'Personal', color: '#8B5CF6' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-t-3xl p-6 max-h-[90vh] overflow-y-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {event ? 'Edit Event' : 'Create Event'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            value={formData.summary}
            onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter event title"
            required
          />
        </div>

        {/* Calendar Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calendar
          </label>
          <select
            value={formData.calendarId}
            onChange={(e) => setFormData(prev => ({ ...prev, calendarId: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {calendars.map(calendar => (
              <option key={calendar.id} value={calendar.id}>
                {calendar.summary}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map(category => (
              <button
                key={category.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, category: category.value }))}
                className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${
                  formData.category === category.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* All Day Toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="allDay"
            checked={formData.isAllDay}
            onChange={(e) => setFormData(prev => ({ ...prev, isAllDay: e.target.checked }))}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="allDay" className="text-sm font-medium text-gray-700">
            All day event
          </label>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          {!formData.isAllDay && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          {!formData.isAllDay && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter location (optional)"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter description (optional)"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1 h-12 border-gray-300 text-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !formData.summary.trim()}
            className="flex-1 h-12 bg-blue-600 text-white"
          >
            {isLoading ? 'Saving...' : (event ? 'Update Event' : 'Create Event')}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};