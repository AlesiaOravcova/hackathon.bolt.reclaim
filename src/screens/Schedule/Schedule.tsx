import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { TabBar } from "../../components/TabBar";
import { StatusBar } from "../../components/StatusBar";

export const Schedule = (): JSX.Element => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');

  // Comprehensive schedule data matching the screenshot
  const scheduleData = {
    sunday: [
      { id: 1, time: "7:00 AM", endTime: "8:00 AM", title: "Breakfast", type: "meal" },
      { id: 2, time: "9:00 AM", endTime: "10:00 AM", title: "Wake kids up/breakfast", type: "family" },
      { id: 3, time: "10:00 AM", endTime: "11:30 AM", title: "English tutor (ride)", type: "education" },
      { id: 4, time: "12:30 PM", endTime: "1:30 PM", title: "Lunch", type: "meal" },
      { id: 5, time: "2:00 PM", endTime: "3:30 PM", title: "Football (ride)", type: "sports" },
      { id: 6, time: "3:30 PM", endTime: "4:30 PM", title: "Groceries", type: "errands" },
      { id: 7, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    monday: [
      { id: 8, time: "7:00 AM", endTime: "8:00 AM", title: "Breakfast", type: "meal" },
      { id: 9, time: "7:30 AM", endTime: "8:30 AM", title: "Wake kids up/breakfast", type: "family" },
      { id: 10, time: "9:00 AM", endTime: "5:00 PM", title: "Onsite", type: "work" },
      { id: 11, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    tuesday: [
      { id: 12, time: "7:00 AM", endTime: "8:00 AM", title: "Breakfast", type: "meal" },
      { id: 13, time: "7:30 AM", endTime: "8:30 AM", title: "Wake kids up/breakfast", type: "family" },
      { id: 14, time: "8:30 AM", endTime: "9:00 AM", title: "Summer school drop off", type: "transport" },
      { id: 15, time: "9:00 AM", endTime: "5:00 PM", title: "Onsite", type: "work" },
      { id: 16, time: "5:30 PM", endTime: "6:00 PM", title: "Summer school pick up", type: "transport" },
      { id: 17, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    wednesday: [
      { id: 18, time: "7:00 AM", endTime: "8:00 AM", title: "Breakfast", type: "meal" },
      { id: 19, time: "7:30 AM", endTime: "8:30 AM", title: "Wake kids up/breakfast", type: "family" },
      { id: 20, time: "9:30 AM", endTime: "5:30 PM", title: "Work from Home", type: "work" },
      { id: 21, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    thursday: [
      { id: 22, time: "7:00 AM", endTime: "8:00 AM", title: "Breakfast", type: "meal" },
      { id: 23, time: "7:30 AM", endTime: "8:30 AM", title: "Wake kids up/breakfast", type: "family" },
      { id: 24, time: "8:30 AM", endTime: "9:00 AM", title: "Summer school drop off", type: "transport" },
      { id: 25, time: "9:00 AM", endTime: "5:00 PM", title: "Work from Home", type: "work" },
      { id: 26, time: "5:30 PM", endTime: "6:00 PM", title: "Summer school pick up", type: "transport" },
      { id: 27, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    friday: [
      { id: 28, time: "7:00 AM", endTime: "8:00 AM", title: "Breakfast", type: "meal" },
      { id: 29, time: "10:00 AM", endTime: "5:00 PM", title: "Onsite", type: "work" },
      { id: 30, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    saturday: [
      { id: 31, time: "8:00 AM", endTime: "9:30 AM", title: "Laundry", type: "chores" },
      { id: 32, time: "9:30 AM", endTime: "10:30 AM", title: "Breakfast", type: "meal" },
      { id: 33, time: "11:00 AM", endTime: "4:00 PM", title: "Birthday party", type: "social" },
      { id: 34, time: "5:00 PM", endTime: "6:00 PM", title: "Math tutor (at home)", type: "education" },
      { id: 35, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ]
  };

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekDaysLong = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  
  // Get current week dates
  const getCurrentWeek = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const currentWeek = getCurrentWeek();

  // Time slots for the calendar grid
  const timeSlots = [
    "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", 
    "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"
  ];

  const getEventsForDay = (dayIndex: number) => {
    const dayName = weekDaysLong[dayIndex];
    return scheduleData[dayName] || [];
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meal':
        return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-blue-300';
      case 'work':
        return 'bg-gradient-to-br from-amber-700 to-amber-800 text-white shadow-lg border-amber-600';
      case 'family':
        return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-blue-300';
      case 'transport':
        return 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg border-orange-400';
      case 'education':
        return 'bg-gradient-to-br from-orange-600 to-orange-700 text-white shadow-lg border-orange-500';
      case 'sports':
        return 'bg-gradient-to-br from-orange-600 to-orange-700 text-white shadow-lg border-orange-500';
      case 'errands':
        return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-blue-300';
      case 'chores':
        return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg border-blue-300';
      case 'social':
        return 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg border-green-400';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600 text-white shadow-lg border-gray-400';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'meal':
        return '🍽️';
      case 'work':
        return '💼';
      case 'family':
        return '👨‍👩‍👧‍👦';
      case 'transport':
        return '🚗';
      case 'education':
        return '📚';
      case 'sports':
        return '⚽';
      case 'errands':
        return '🛒';
      case 'chores':
        return '🧺';
      case 'social':
        return '🎉';
      default:
        return '📅';
    }
  };

  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours);
    date.setMinutes(minutes || 0);
    return date;
  };

  const getEventHeight = (startTime: string, endTime: string) => {
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const duration = (end - start) / (1000 * 60 * 60); // hours
    return Math.max(duration * 80, 40); // 80px per hour, minimum 40px
  };

  const getEventTop = (startTime: string, slotTime: string) => {
    const eventStart = parseTime(startTime);
    const slotStart = parseTime(slotTime);
    
    if (eventStart.getHours() === slotStart.getHours()) {
      const minuteOffset = eventStart.getMinutes();
      return (minuteOffset / 60) * 80; // 80px per hour
    }
    return 0;
  };

  const shouldShowEventInSlot = (event: any, slotTime: string) => {
    const eventStart = parseTime(event.time);
    const slotStart = parseTime(slotTime);
    return eventStart.getHours() === slotStart.getHours();
  };

  const renderCalendarView = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm"
    >
      {/* Calendar Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="grid grid-cols-8">
          <div className="p-4 text-xs font-semibold text-gray-600 border-r border-gray-200 bg-gray-50">
            <div className="text-center">GMT+01</div>
          </div>
          {weekDays.map((day, index) => {
            const date = currentWeek[index];
            const isToday = date.toDateString() === new Date().toDateString();
            const isMonday = index === 1; // Monday is highlighted in blue
            
            return (
              <motion.div 
                key={day} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 text-center border-r border-gray-200 last:border-r-0 hover:bg-blue-50 transition-colors duration-200"
              >
                <div className={`text-xs font-semibold mb-2 ${isMonday ? 'text-blue-600' : 'text-gray-600'}`}>
                  {day}
                </div>
                <div className={`text-xl font-bold transition-all duration-200 ${
                  isMonday ? 'bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center mx-auto shadow-lg transform scale-110' :
                  isToday ? 'text-blue-600 bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto' : 
                  'text-gray-900 hover:bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto'
                }`}>
                  {date.getDate()}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="relative bg-gradient-to-br from-gray-50 to-white">
        {/* Time slots */}
        {timeSlots.map((time, index) => (
          <motion.div 
            key={time} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-8 border-b border-gray-100 last:border-b-0 hover:bg-blue-50/30 transition-colors duration-200"
          >
            <div className="p-4 text-sm font-medium text-gray-600 border-r border-gray-200 h-20 flex items-start bg-gray-50/50">
              <div className="bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-200 text-xs font-semibold">
                {time}
              </div>
            </div>
            {/* Day columns */}
            {Array.from({ length: 7 }, (_, dayIndex) => (
              <div key={dayIndex} className="border-r border-gray-100 last:border-r-0 h-20 relative hover:bg-blue-50/20 transition-colors duration-200">
                {/* Events for this time slot and day */}
                {getEventsForDay(dayIndex)
                  .filter(event => shouldShowEventInSlot(event, time))
                  .map(event => (
                    <motion.div
                      key={`${event.id}-${dayIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className={`absolute left-2 right-2 rounded-xl p-3 text-xs font-medium cursor-pointer border-2 backdrop-blur-sm ${getEventColor(event.type)}`}
                      style={{
                        height: `${getEventHeight(event.time, event.endTime)}px`,
                        top: `${getEventTop(event.time, time)}px`,
                        zIndex: 10
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-sm">{getEventIcon(event.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-xs leading-tight truncate">
                            {event.title}
                          </div>
                          <div className="text-xs opacity-90 mt-1 font-medium">
                            {event.time} – {event.endTime}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            ))}
          </div>
        ))}
        
        {/* Current time indicator (enhanced) */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 z-20 shadow-lg" 
          style={{ top: '390px' }}
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full -ml-2 -mt-1.5 shadow-lg border-2 border-white"
          />
          <div className="absolute left-4 -top-6 bg-red-500 text-white text-xs px-2 py-1 rounded-lg shadow-lg font-semibold">
            Now
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] via-[#F8FAFF] to-[#F3FDF5]">
      <StatusBar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-6 bg-white/80 backdrop-blur-sm border-b border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/dashboard")}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  My Calendar
                </h1>
                <p className="text-gray-600 font-medium">Your weekly schedule overview</p>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-2xl p-1 shadow-inner">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setViewMode('week')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  viewMode === 'week' 
                    ? 'bg-white text-blue-600 shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Week
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setViewMode('day')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  viewMode === 'day' 
                    ? 'bg-white text-blue-600 shadow-lg' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Day
              </motion.button>
            </div>
          </div>

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-4"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="text-2xl font-bold text-blue-700">24</div>
              <div className="text-sm text-blue-600 font-medium">Events this week</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="text-2xl font-bold text-green-700">8h</div>
              <div className="text-sm text-green-600 font-medium">Free time</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
              <div className="text-2xl font-bold text-purple-700">5</div>
              <div className="text-sm text-purple-600 font-medium">Categories</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-6 py-6 mb-20"
        >
          {renderCalendarView()}

          {/* Enhanced Add Activity Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="w-full h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white rounded-3xl font-bold text-lg shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
                <div className="relative flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ✨
                  </motion.div>
                  Schedule New Activity
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    +
                  </motion.div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6 bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Types</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { type: 'meal', label: 'Meals', icon: '🍽️' },
                { type: 'work', label: 'Work', icon: '💼' },
                { type: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
                { type: 'transport', label: 'Transport', icon: '🚗' },
                { type: 'education', label: 'Education', icon: '📚' },
                { type: 'social', label: 'Social', icon: '🎉' }
              ].map((item, index) => (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className={`w-4 h-4 rounded-lg ${getEventColor(item.type).split(' ')[0]} ${getEventColor(item.type).split(' ')[1]}`} />
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <TabBar activeTab="schedule" onTabChange={() => {}} />
    </div>
  );
};