import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { gabieSchedule, ScheduleActivity } from '../../data/scheduleData';

interface WeeklyScheduleViewProps {
  onActivityClick?: (activity: ScheduleActivity) => void;
}

export const WeeklyScheduleView: React.FC<WeeklyScheduleViewProps> = ({ onActivityClick }) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  // Group activities by date
  const groupedActivities = gabieSchedule.reduce((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = [];
    }
    acc[activity.date].push(activity);
    return acc;
  }, {} as Record<string, ScheduleActivity[]>);

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

  const dayNames = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'wellness':
        return '🧘';
      case 'work':
        return '💼';
      case 'family':
        return '👨‍👩‍👧‍👦';
      case 'personal':
        return '🏠';
      default:
        return '📅';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'wellness':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'work':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'family':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'personal':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getCompletedCount = (date: string) => {
    const activities = groupedActivities[date] || [];
    return activities.filter(activity => activity.completed).length;
  };

  const getTotalCount = (date: string) => {
    return (groupedActivities[date] || []).length;
  };

  const formatTime = (time: string) => {
    // Convert "7:00 AM" to "7:00"
    return time.replace(/\s?(AM|PM)/i, '').trim();
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Compact Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center px-4 py-3 bg-white border-b border-gray-200"
      >
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Gabie's Weekly Schedule
        </h1>
        <p className="text-sm text-gray-600 mb-1">
          June 29 - July 5, 2024
        </p>
        <p className="text-xs text-gray-500">
          Working mom • 2 middle schoolers • Summer schedule
        </p>
      </motion.div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Week Overview Cards - Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-4 py-3"
        >
          <div className="flex gap-3 overflow-x-auto pb-2">
            {weekDates.map((date, index) => {
              const dayActivities = groupedActivities[date] || [];
              const completedCount = getCompletedCount(date);
              const totalCount = getTotalCount(date);
              const isSelected = selectedDay === date;
              const isJuly4th = date === '2024-07-04';

              return (
                <motion.button
                  key={date}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setSelectedDay(isSelected ? null : date)}
                  className={`flex-shrink-0 w-20 p-3 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-xs font-medium text-gray-500 mb-1">
                      {dayNames[index]}
                    </div>
                    <div className="text-lg font-bold text-gray-900 mb-1">
                      {format(parseISO(date), 'd')}
                    </div>
                    {isJuly4th && (
                      <div className="text-xs bg-red-100 text-red-600 px-1 py-0.5 rounded mb-1">
                        🇺🇸
                      </div>
                    )}
                    <div className="text-xs text-gray-600 mb-1">
                      {completedCount}/{totalCount}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Detailed Day View */}
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {format(parseISO(selectedDay), 'EEEE, MMM d')}
                  {selectedDay === '2024-07-04' && (
                    <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      🇺🇸 July 4th
                    </span>
                  )}
                </h2>
                <p className="text-sm text-gray-600">
                  {getCompletedCount(selectedDay)} of {getTotalCount(selectedDay)} completed
                </p>
              </div>
              <button
                onClick={() => setSelectedDay(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {(groupedActivities[selectedDay] || []).map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  onClick={() => onActivityClick?.(activity)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                    activity.completed
                      ? 'bg-green-50 border-green-200'
                      : getActivityColor(activity.type)
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-lg">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{activity.title}</h3>
                        {activity.completed && (
                          <span className="text-green-600 text-sm">✓</span>
                        )}
                        {activity.priority === 'high' && (
                          <span className="text-xs bg-red-100 text-red-600 px-1 py-0.5 rounded">
                            !
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        <span className="font-medium">{formatTime(activity.time)}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.duration}</span>
                        {activity.location && (
                          <>
                            <span className="mx-1">•</span>
                            <span className="truncate">📍 {activity.location}</span>
                          </>
                        )}
                      </div>
                      {activity.description && (
                        <p className="text-xs text-gray-700 line-clamp-2">{activity.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Compact Weekly Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-4 pb-4"
        >
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Wellness Focus */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-3 text-white">
              <div className="text-xl mb-1">🧘</div>
              <h3 className="text-sm font-semibold mb-1">Wellness</h3>
              <p className="text-xs text-purple-100">
                {gabieSchedule.filter(a => a.type === 'wellness').length} activities
              </p>
            </div>

            {/* Work-Life Balance */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-3 text-white">
              <div className="text-xl mb-1">⚖️</div>
              <h3 className="text-sm font-semibold mb-1">Balance</h3>
              <p className="text-xs text-blue-100">
                {gabieSchedule.filter(a => a.type === 'work').length} work • {gabieSchedule.filter(a => a.type === 'family').length} family
              </p>
            </div>

            {/* Family Time */}
            <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-3 text-white">
              <div className="text-xl mb-1">👨‍👩‍👧‍👦</div>
              <h3 className="text-sm font-semibold mb-1">Family</h3>
              <p className="text-xs text-green-100">
                Quality time + July 4th
              </p>
            </div>

            {/* Self-Care */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-3 text-white">
              <div className="text-xl mb-1">💆‍♀️</div>
              <h3 className="text-sm font-semibold mb-1">Self-Care</h3>
              <p className="text-xs text-orange-100">
                Daily me-time moments
              </p>
            </div>
          </div>

          {/* Compact Schedule Insights */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-4 text-white">
            <h3 className="text-sm font-semibold mb-3">📊 Weekly Insights</h3>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center">
                <div className="text-lg font-bold">{gabieSchedule.length}</div>
                <div className="text-xs text-indigo-100">Activities</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">
                  {Math.round((gabieSchedule.filter(a => a.type === 'wellness').length / gabieSchedule.length) * 100)}%
                </div>
                <div className="text-xs text-indigo-100">Wellness</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">7:00</div>
                <div className="text-xs text-indigo-100">Start Time</div>
              </div>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <p className="text-xs text-indigo-100">
                <strong>Philosophy:</strong> Gabie integrates wellness into her demanding routine while prioritizing family. Each day includes multiple "me time" moments from morning meditation to evening relaxation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};