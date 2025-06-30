import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO, startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { gabieSchedule, ScheduleActivity } from '../../data/scheduleData';

interface CalendarGridViewProps {
  onActivityClick?: (activity: ScheduleActivity) => void;
}

export const CalendarGridView: React.FC<CalendarGridViewProps> = ({ onActivityClick }) => {
  const [selectedActivity, setSelectedActivity] = useState<ScheduleActivity | null>(null);

  // Week dates from June 29 to July 5
  const weekDates = [
    '2024-06-29', // Saturday
    '2024-06-30', // Sunday  
    '2024-07-01', // Monday
    '2024-07-02', // Tuesday
    '2024-07-03', // Wednesday
    '2024-07-04', // Thursday (July 4th)
    '2024-07-05', // Friday
  ];

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const timeSlots = [
    '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM',
    '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'
  ];

  // Group activities by date
  const groupedActivities = gabieSchedule.reduce((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = [];
    }
    acc[activity.date].push(activity);
    return acc;
  }, {} as Record<string, ScheduleActivity[]>);

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'wellness':
        return 'bg-purple-400 text-white';
      case 'work':
        return 'bg-amber-700 text-white';
      case 'family':
        return 'bg-blue-400 text-white';
      case 'personal':
        return 'bg-green-400 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const parseTime = (timeStr: string): number => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    
    if (period === 'PM' && hours !== 12) {
      hour24 += 12;
    } else if (period === 'AM' && hours === 12) {
      hour24 = 0;
    }
    
    return hour24 + (minutes || 0) / 60;
  };

  const getActivityPosition = (activity: ScheduleActivity) => {
    const startTime = parseTime(activity.time);
    const durationMinutes = parseInt(activity.duration.split(' ')[0]) || 60;
    const durationHours = durationMinutes / 60;
    
    // Calculate position relative to 7 AM start
    const topPosition = (startTime - 7) * 60; // 60px per hour
    const height = durationHours * 60;
    
    return {
      top: `${Math.max(0, topPosition)}px`,
      height: `${Math.max(20, height)}px`
    };
  };

  const getActivitiesForTimeSlot = (date: string, timeSlot: string) => {
    const activities = groupedActivities[date] || [];
    const slotHour = parseTime(timeSlot.replace(' ', ':00 '));
    
    return activities.filter(activity => {
      const activityTime = parseTime(activity.time);
      return Math.floor(activityTime) === Math.floor(slotHour);
    });
  };

  const handleActivityClick = (activity: ScheduleActivity) => {
    setSelectedActivity(activity);
    onActivityClick?.(activity);
  };

  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="p-4 text-xs text-gray-500 font-medium">GMT+01</div>
        {weekDates.map((date, index) => {
          const dayNum = format(parseISO(date), 'd');
          const isMonday = index === 2; // Monday is highlighted in blue
          
          return (
            <div key={date} className="p-4 text-center border-l border-gray-200">
              <div className={`text-xs font-medium mb-1 ${isMonday ? 'text-blue-600' : 'text-gray-500'}`}>
                {dayNames[index]}
              </div>
              <div className={`text-2xl font-bold ${isMonday ? 'text-white bg-blue-600 rounded-full w-10 h-10 flex items-center justify-center mx-auto' : 'text-gray-900'}`}>
                {dayNum}
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar Grid */}
      <div className="relative">
        {timeSlots.map((timeSlot, timeIndex) => (
          <div key={timeSlot} className="grid grid-cols-8 border-b border-gray-100 min-h-[60px]">
            {/* Time Label */}
            <div className="p-2 text-xs text-gray-500 font-medium flex items-start">
              {timeSlot}
            </div>
            
            {/* Day Columns */}
            {weekDates.map((date, dayIndex) => {
              const activities = getActivitiesForTimeSlot(date, timeSlot);
              
              return (
                <div key={`${date}-${timeSlot}`} className="border-l border-gray-200 relative min-h-[60px] p-1">
                  {activities.map((activity, actIndex) => {
                    const position = getActivityPosition(activity);
                    
                    return (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (timeIndex * 7 + dayIndex) * 0.01 }}
                        onClick={() => handleActivityClick(activity)}
                        className={`absolute left-1 right-1 rounded-md p-2 cursor-pointer hover:shadow-md transition-all duration-200 ${getActivityColor(activity.type)}`}
                        style={{
                          top: position.top,
                          height: position.height,
                          zIndex: 10
                        }}
                      >
                        <div className="text-xs font-medium leading-tight">
                          {activity.title}
                        </div>
                        <div className="text-xs opacity-90 leading-tight">
                          {activity.time} - {activity.duration}
                        </div>
                        {activity.location && (
                          <div className="text-xs opacity-75 leading-tight truncate">
                            📍 {activity.location}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Special Events Indicators */}
      <div className="grid grid-cols-8 border-t border-gray-200">
        <div className="p-2"></div>
        {weekDates.map((date, index) => (
          <div key={date} className="border-l border-gray-200 p-2 text-center">
            {date === '2024-07-04' && (
              <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full inline-block">
                🇺🇸 Independence Day
              </div>
            )}
            {date === '2024-06-29' && (
              <div className="w-2 h-2 bg-red-500 rounded-full mx-auto"></div>
            )}
          </div>
        ))}
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedActivity(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">{selectedActivity.title}</h3>
              <button
                onClick={() => setSelectedActivity(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{selectedActivity.time} • {selectedActivity.duration}</span>
              </div>
              
              {selectedActivity.location && (
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{selectedActivity.location}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getActivityColor(selectedActivity.type)}`}>
                  {selectedActivity.type}
                </span>
                {selectedActivity.priority === 'high' && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    High Priority
                  </span>
                )}
                {selectedActivity.completed && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    ✓ Completed
                  </span>
                )}
              </div>
              
              {selectedActivity.description && (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedActivity.description}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};