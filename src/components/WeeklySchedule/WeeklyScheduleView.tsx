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
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Gabie's Weekly Schedule
        </h1>
        <p className="text-lg text-gray-600 mb-1">
          June 29 - July 5, 2024
        </p>
        <p className="text-sm text-gray-500">
          Working mom with 2 middle school children • Summer schedule
        </p>
      </motion.div>

      {/* Week Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-8"
      >
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
              className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-1">
                  {dayNames[index]}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {format(parseISO(date), 'd')}
                </div>
                {isJuly4th && (
                  <div className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full mb-2">
                    🇺🇸 July 4th
                  </div>
                )}
                <div className="text-xs text-gray-600 mb-2">
                  {completedCount}/{totalCount} done
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Detailed Day View */}
      {selectedDay && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-200 p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {format(parseISO(selectedDay), 'EEEE, MMMM d')}
                {selectedDay === '2024-07-04' && (
                  <span className="ml-3 text-lg bg-red-100 text-red-600 px-3 py-1 rounded-full">
                    🇺🇸 Independence Day
                  </span>
                )}
              </h2>
              <p className="text-gray-600">
                {getCompletedCount(selectedDay)} of {getTotalCount(selectedDay)} activities completed
              </p>
            </div>
            <button
              onClick={() => setSelectedDay(null)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3">
            {(groupedActivities[selectedDay] || []).map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => onActivityClick?.(activity)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  activity.completed
                    ? 'bg-green-50 border-green-200'
                    : getActivityColor(activity.type)
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                      {activity.completed && (
                        <span className="text-green-600">✓</span>
                      )}
                      {activity.priority === 'high' && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          High Priority
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">{formatTime(activity.time)}</span>
                      <span className="mx-2">•</span>
                      <span>{activity.duration}</span>
                      {activity.location && (
                        <>
                          <span className="mx-2">•</span>
                          <span>📍 {activity.location}</span>
                        </>
                      )}
                    </div>
                    {activity.description && (
                      <p className="text-sm text-gray-700">{activity.description}</p>
                    )}
                    <div className="mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getActivityColor(activity.type)}`}>
                        {activity.type}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Weekly Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* Wellness Focus */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="text-3xl mb-3">🧘</div>
          <h3 className="text-lg font-semibold mb-2">Wellness Activities</h3>
          <p className="text-purple-100 text-sm">
            {gabieSchedule.filter(a => a.type === 'wellness').length} wellness moments scheduled throughout the week
          </p>
        </div>

        {/* Work-Life Balance */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <div className="text-3xl mb-3">⚖️</div>
          <h3 className="text-lg font-semibold mb-2">Work-Life Balance</h3>
          <p className="text-blue-100 text-sm">
            {gabieSchedule.filter(a => a.type === 'work').length} work activities balanced with {gabieSchedule.filter(a => a.type === 'family').length} family moments
          </p>
        </div>

        {/* Family Time */}
        <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-white">
          <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
          <h3 className="text-lg font-semibold mb-2">Family Activities</h3>
          <p className="text-green-100 text-sm">
            Quality time with kids including camps, meals, and special July 4th celebration
          </p>
        </div>

        {/* Self-Care */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <div className="text-3xl mb-3">💆‍♀️</div>
          <h3 className="text-lg font-semibold mb-2">Self-Care Moments</h3>
          <p className="text-orange-100 text-sm">
            Daily meditation, reading, baths, and personal reflection time built into busy schedule
          </p>
        </div>
      </motion.div>

      {/* Schedule Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white"
      >
        <h3 className="text-xl font-semibold mb-4">📊 Weekly Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-bold">{gabieSchedule.length}</div>
            <div className="text-indigo-100">Total Activities</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {Math.round((gabieSchedule.filter(a => a.type === 'wellness').length / gabieSchedule.length) * 100)}%
            </div>
            <div className="text-indigo-100">Wellness Focus</div>
          </div>
          <div>
            <div className="text-2xl font-bold">7:00 AM</div>
            <div className="text-indigo-100">Daily Start Time</div>
          </div>
        </div>
        <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-xl">
          <p className="text-sm text-indigo-100">
            <strong>Gabie's Schedule Philosophy:</strong> This week demonstrates how a working mom can integrate wellness and self-care into a demanding routine while prioritizing family responsibilities. Each day includes multiple "me time" moments, from morning meditation to evening relaxation rituals.
          </p>
        </div>
      </motion.div>
    </div>
  );
};