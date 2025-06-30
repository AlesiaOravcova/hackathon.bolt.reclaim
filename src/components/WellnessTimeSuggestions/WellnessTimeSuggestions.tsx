import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';

interface TimeSlot {
  day: string;
  time: string;
  duration: string;
  activity: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  type: 'morning' | 'afternoon' | 'evening';
}

interface WellnessTimeSuggestionsProps {
  onAcceptSuggestion?: (slot: TimeSlot) => void;
  onDismiss?: () => void;
}

export const WellnessTimeSuggestions: React.FC<WellnessTimeSuggestionsProps> = ({
  onAcceptSuggestion,
  onDismiss
}) => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const suggestions: TimeSlot[] = [
    {
      day: 'Monday',
      time: '6:30 AM - 7:00 AM',
      duration: '30 min',
      activity: 'Morning Meditation',
      reason: 'Perfect quiet time before breakfast',
      priority: 'high',
      type: 'morning'
    },
    {
      day: 'Tuesday',
      time: '6:30 AM - 7:00 AM',
      duration: '30 min',
      activity: 'Gentle Yoga',
      reason: 'Start your day with movement',
      priority: 'high',
      type: 'morning'
    },
    {
      day: 'Wednesday',
      time: '8:30 AM - 9:30 AM',
      duration: '60 min',
      activity: 'Nature Walk',
      reason: 'Free hour before work starts',
      priority: 'medium',
      type: 'morning'
    },
    {
      day: 'Thursday',
      time: '6:30 AM - 7:00 AM',
      duration: '30 min',
      activity: 'Journaling',
      reason: 'Peaceful morning reflection',
      priority: 'medium',
      type: 'morning'
    },
    {
      day: 'Friday',
      time: '8:00 AM - 10:00 AM',
      duration: '120 min',
      activity: 'Self-Care Morning',
      reason: 'Extended free time before work',
      priority: 'high',
      type: 'morning'
    },
    {
      day: 'Saturday',
      time: '7:00 AM - 8:00 AM',
      duration: '60 min',
      activity: 'Weekend Workout',
      reason: 'Start weekend with energy',
      priority: 'medium',
      type: 'morning'
    },
    {
      day: 'Sunday',
      time: '7:00 AM - 9:00 AM',
      duration: '120 min',
      activity: 'Sunday Self-Care',
      reason: 'Prepare for the week ahead',
      priority: 'high',
      type: 'morning'
    }
  ];

  const toggleSlot = (day: string) => {
    setSelectedSlots(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'morning':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case 'afternoon':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
          </svg>
        );
      case 'evening':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            🤖 AI Wellness Suggestions
          </h3>
          <p className="text-gray-600 text-sm">
            Based on your schedule, here are optimal times for self-care
          </p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-3 mb-6">
        {suggestions.map((slot, index) => (
          <motion.div
            key={slot.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
              selectedSlots.includes(slot.day)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => toggleSlot(slot.day)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    selectedSlots.includes(slot.day)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedSlots.includes(slot.day) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(slot.type)}
                    <span className="font-semibold text-gray-900">{slot.day}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(slot.priority)}`}>
                    {slot.priority} priority
                  </span>
                </div>
                
                <div className="ml-8">
                  <div className="flex items-center gap-4 mb-1">
                    <span className="text-blue-600 font-medium">{slot.time}</span>
                    <span className="text-gray-500 text-sm">({slot.duration})</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{slot.activity}</h4>
                  <p className="text-gray-600 text-sm">{slot.reason}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Smart Scheduling Tips</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Morning slots are ideal for setting a positive tone</li>
              <li>• 30-minute sessions are perfect for busy schedules</li>
              <li>• Weekend mornings offer longer self-care opportunities</li>
              <li>• Consistency builds lasting wellness habits</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => {
            selectedSlots.forEach(day => {
              const slot = suggestions.find(s => s.day === day);
              if (slot && onAcceptSuggestion) {
                onAcceptSuggestion(slot);
              }
            });
          }}
          disabled={selectedSlots.length === 0}
          className={`flex-1 h-12 rounded-xl font-semibold ${
            selectedSlots.length > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Add {selectedSlots.length} Selected Slot{selectedSlots.length !== 1 ? 's' : ''}
        </Button>
        
        <Button
          variant="outline"
          className="px-6 h-12 rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Customize
        </Button>
      </div>
    </motion.div>
  );
};