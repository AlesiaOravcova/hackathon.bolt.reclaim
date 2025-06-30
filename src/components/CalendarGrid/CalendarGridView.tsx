import React from "react";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";

export const CalendarGridView = ({ onActivityClick }) => {
  // Sample data for demonstration - can be replaced with real calendar data later
  const sampleEvents = [
    {
      id: 1,
      title: "Morning Meditation",
      time: "7:00 AM",
      type: "wellness",
      date: "2024-06-30"
    },
    {
      id: 2,
      title: "Work Meeting",
      time: "10:00 AM", 
      type: "work",
      date: "2024-06-30"
    },
    {
      id: 3,
      title: "Family Dinner",
      time: "7:00 PM",
      type: "family", 
      date: "2024-06-30"
    }
  ];

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + i);
    return date;
  });

  const getEventsForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return sampleEvents.filter(event => event.date === dateStr);
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'wellness':
        return 'bg-purple-100 text-purple-800';
      case 'work':
        return 'bg-blue-100 text-blue-800';
      case 'family':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {weekDays.map((day, index) => (
          <div key={day} className="text-center">
            <div className="text-xs font-medium text-gray-500 mb-2">{day}</div>
            <div className={`text-lg font-bold ${
              index === new Date().getDay() ? 'text-blue-600' : 'text-gray-900'
            }`}>
              {currentWeek[index].getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {currentWeek.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isToday = index === new Date().getDay();
          
          return (
            <motion.div
              key={date.toISOString()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`min-h-[120px] p-2 rounded-lg border ${
                isToday ? 'border-blue-200 bg-blue-50' : 'border-gray-100'
              }`}
            >
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => onActivityClick?.(event)}
                    className={`w-full text-left p-1 rounded text-xs ${getActivityColor(event.type)} hover:opacity-80 transition-opacity`}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="text-xs opacity-75">{event.time}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};