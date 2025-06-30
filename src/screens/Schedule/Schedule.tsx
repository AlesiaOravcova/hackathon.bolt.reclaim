import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { TabBar } from "../../components/TabBar";
import { StatusBar } from "../../components/StatusBar";
import { WeeklyScheduleView } from "../../components/WeeklySchedule";
import { gabieSchedule, getActivitiesForDate, ScheduleActivity } from "../../data/scheduleData";
import { format, parseISO, startOfWeek, addDays } from "date-fns";

export const Schedule = (): JSX.Element => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'weekly' | 'daily'>('weekly');
  const [selectedDate, setSelectedDate] = useState(new Date('2024-07-01')); // Start with Monday July 1st

  // Create week starting from June 29th (Saturday) to July 5th (Friday)
  const weekStart = new Date('2024-06-29');
  const weekDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  const currentWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    return date;
  });

  const scheduleData = getActivitiesForDate(format(selectedDate, 'yyyy-MM-dd'));

  const handleActivityClick = (activity: ScheduleActivity) => {
    console.log('Activity clicked:', activity);
    // You can add more functionality here, like opening a modal or navigating to details
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'wellness':
        return (
          <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      case 'work':
        return (
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
          </svg>
        );
      case 'family':
        return (
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2h3v4H4zm12.5-11.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm3 7.5h-2.84c-.58.01-1.14.32-1.45.86l-.92 1.32L9.72 8c-.58-.01-1.14.32-1.45.86L6.6 11.55c-.19.27-.19.65 0 .92.27.19.65.19.92 0l1.04-1.49 3.16 6.71 1.33-1.93.84-1.22c.58-.01 1.14-.32 1.45-.86l1.51-2.16c.19-.27.19-.65 0-.92-.27-.19-.65-.19-.92 0z"/>
          </svg>
        );
      case 'personal':
        return (
          <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'wellness':
        return 'bg-purple-100 border-purple-200';
      case 'work':
        return 'bg-blue-100 border-blue-200';
      case 'family':
        return 'bg-green-100 border-green-200';
      case 'personal':
        return 'bg-orange-100 border-orange-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  const getCompletedCount = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const activities = getActivitiesForDate(dateStr);
    return activities.filter(activity => activity.completed).length;
  };

  const getTotalCount = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return getActivitiesForDate(dateStr).length;
  };

  const renderDailyView = () => (
    <div className="px-6 py-4 mb-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">
          {format(selectedDate, 'EEEE, MMMM d')}
          {format(selectedDate, 'yyyy-MM-dd') === '2024-07-04' && (
            <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
              🇺🇸 Independence Day
            </span>
          )}
        </h3>
        <span className="text-sm text-gray-500">
          {scheduleData.filter(item => item.completed).length} of {scheduleData.length} completed
        </span>
      </div>

      {scheduleData.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No activities scheduled</h3>
          <p className="text-gray-600">This day is free for spontaneous activities!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {scheduleData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${
                item.completed 
                  ? "border-green-200 bg-green-50" 
                  : getActivityColor(item.type)
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    item.completed 
                      ? "bg-green-100" 
                      : "bg-white"
                  }`}>
                    {item.completed ? (
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    ) : (
                      getActivityIcon(item.type)
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      item.completed ? "text-green-900" : "text-gray-900"
                    }`}>
                      {item.title}
                    </h4>
                    <p className={`text-sm ${
                      item.completed ? "text-green-600" : "text-gray-500"
                    }`}>
                      {item.time} • {item.duration}
                      {item.location && ` • ${item.location}`}
                    </p>
                    {item.description && (
                      <p className={`text-xs mt-1 ${
                        item.completed ? "text-green-700" : "text-gray-600"
                      }`}>
                        {item.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.type === 'wellness' ? 'bg-purple-100 text-purple-700' :
                        item.type === 'work' ? 'bg-blue-100 text-blue-700' :
                        item.type === 'family' ? 'bg-green-100 text-green-700' :
                        item.type === 'personal' ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {item.type}
                      </span>
                      {item.priority === 'high' && (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-700 font-medium">
                          High Priority
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                {!item.completed && (
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700"
                  >
                    Start
                  </Button>
                )}
                
                {item.completed && (
                  <div className="text-green-600 font-semibold text-sm">
                    ✓ Done
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5]">
      <StatusBar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-6 bg-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gabie's Schedule</h1>
              <p className="text-gray-600">June 29 - July 5, 2024</p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-4">
            <button
              onClick={() => setViewMode('weekly')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'weekly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📅 Weekly View
            </button>
            <button
              onClick={() => setViewMode('daily')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                viewMode === 'daily'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📋 Daily View
            </button>
          </div>

          {/* Week Calendar - Only show in daily view */}
          {viewMode === 'daily' && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">This Week</h2>
                <div className="text-sm text-gray-500">
                  Working mom with 2 middle schoolers
                </div>
              </div>

              <div className="flex gap-2">
                {currentWeek.map((date, index) => {
                  const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                  const completedCount = getCompletedCount(date);
                  const totalCount = getTotalCount(date);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`flex-1 py-3 px-2 rounded-2xl transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <div className="text-xs font-medium mb-1">{weekDays[index]}</div>
                      <div className="text-lg font-bold mb-1">{date.getDate()}</div>
                      <div className="text-xs">
                        {completedCount}/{totalCount}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {viewMode === 'weekly' ? (
            <WeeklyScheduleView onActivityClick={handleActivityClick} />
          ) : (
            renderDailyView()
          )}
        </motion.div>
      </div>

      <TabBar activeTab="schedule" onTabChange={() => {}} />
    </div>
  );
};