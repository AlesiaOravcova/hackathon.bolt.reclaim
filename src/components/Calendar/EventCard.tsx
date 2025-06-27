import React from 'react';
import { motion } from 'framer-motion';
import { CalendarEvent, googleCalendarService } from '../../services/googleCalendar';
import { format, parseISO, isToday, isTomorrow } from 'date-fns';

interface EventCardProps {
  event: CalendarEvent;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
  showDate?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ 
  event, 
  onEdit, 
  onDelete, 
  showDate = false 
}) => {
  const startTime = event.start.dateTime ? parseISO(event.start.dateTime) : parseISO(event.start.date!);
  const endTime = event.end.dateTime ? parseISO(event.end.dateTime) : parseISO(event.end.date!);
  const isAllDay = !event.start.dateTime;
  const categoryColor = googleCalendarService.getCategoryColor(event.category);

  const formatEventDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d');
  };

  const formatEventTime = (start: Date, end: Date, allDay: boolean) => {
    if (allDay) return 'All day';
    return `${format(start, 'h:mm a')} - ${format(end, 'h:mm a')}`;
  };

  const getCategoryIcon = (category: CalendarEvent['category']) => {
    switch (category) {
      case 'work':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
          </svg>
        );
      case 'school':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
          </svg>
        );
      case 'family':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2h3v4H4zm12.5-11.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm3 7.5h-2.84c-.58.01-1.14.32-1.45.86l-.92 1.32L9.72 8c-.58-.01-1.14.32-1.45.86L6.6 11.55c-.19.27-.19.65 0 .92.27.19.65.19.92 0l1.04-1.49 3.16 6.71 1.33-1.93.84-1.22c.58-.01 1.14-.32 1.45-.86l1.51-2.16c.19-.27.19-.65 0-.92-.27-.19-.65-.19-.92 0z"/>
          </svg>
        );
      case 'health':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8h2v8c0 1.1.9 2 2 2h8v2H8c-2.21 0-4-1.79-4-4V8zm4-4v2h8c1.1 0 2 .9 2 2v8h2V8c0-2.21-1.79-4-4-4H8z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
    >
      <div className="flex items-start gap-3">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
          style={{ backgroundColor: categoryColor }}
        >
          {getCategoryIcon(event.category)}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {event.summary}
          </h3>
          
          <div className="flex items-center gap-2 mt-1">
            {showDate && (
              <span className="text-sm text-gray-600">
                {formatEventDate(startTime)} •
              </span>
            )}
            <span className="text-sm text-gray-600">
              {formatEventTime(startTime, endTime, isAllDay)}
            </span>
          </div>
          
          {event.location && (
            <div className="flex items-center gap-1 mt-1">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-sm text-gray-500 truncate">
                {event.location}
              </span>
            </div>
          )}
          
          {event.description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {event.description}
            </p>
          )}
          
          <div className="flex items-center gap-1 mt-2">
            <span 
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: categoryColor }}
            />
            <span className="text-xs text-gray-500 capitalize">
              {event.category}
            </span>
          </div>
        </div>
        
        {(onEdit || onDelete) && (
          <div className="flex gap-1">
            {onEdit && (
              <button
                onClick={() => onEdit(event)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(event)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};