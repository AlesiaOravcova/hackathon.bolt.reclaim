import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Calendar } from '../../services/googleCalendar';

interface CalendarSelectorProps {
  calendars: Calendar[];
  selectedCalendars: string[];
  onSelectionChange: (calendarIds: string[]) => void;
  onContinue: () => void;
  isLoading?: boolean;
}

export const CalendarSelector: React.FC<CalendarSelectorProps> = ({
  calendars,
  selectedCalendars,
  onSelectionChange,
  onContinue,
  isLoading = false
}) => {
  const toggleCalendar = (calendarId: string) => {
    const newSelection = selectedCalendars.includes(calendarId)
      ? selectedCalendars.filter(id => id !== calendarId)
      : [...selectedCalendars, calendarId];
    
    onSelectionChange(newSelection);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-6 py-4"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select Calendars
        </h2>
        <p className="text-gray-600">
          Choose which calendars to sync for finding your available time slots.
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {calendars.map((calendar, index) => (
          <motion.button
            key={calendar.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => toggleCalendar(calendar.id)}
            className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
              selectedCalendars.includes(calendar.id)
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                selectedCalendars.includes(calendar.id)
                  ? 'border-green-500 bg-green-500'
                  : 'border-gray-300'
              }`}>
                {selectedCalendars.includes(calendar.id) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {calendar.backgroundColor && (
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: calendar.backgroundColor }}
                    />
                  )}
                  <span className="font-semibold text-gray-900">
                    {calendar.summary}
                  </span>
                  {calendar.primary && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Primary
                    </span>
                  )}
                </div>
                {calendar.description && (
                  <p className="text-sm text-gray-600 mt-1">
                    {calendar.description}
                  </p>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <Button
        onClick={onContinue}
        disabled={selectedCalendars.length === 0 || isLoading}
        className={`w-full h-14 rounded-2xl font-semibold text-lg ${
          selectedCalendars.length > 0
            ? 'bg-green-600 text-white'
            : 'bg-gray-200 text-gray-400'
        }`}
      >
        {isLoading ? 'Loading...' : `Continue with ${selectedCalendars.length} calendar${selectedCalendars.length !== 1 ? 's' : ''}`}
      </Button>
    </motion.div>
  );
};