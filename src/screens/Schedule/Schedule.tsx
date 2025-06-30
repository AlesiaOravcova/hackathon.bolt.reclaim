import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { TabBar } from "../../components/TabBar";
import { StatusBar } from "../../components/StatusBar";

export const Schedule = (): JSX.Element => {
  const navigate = useNavigate();

  // Calendar data matching the screenshot
  const scheduleData = {
    sunday: [
      { id: 1, time: "9:00 AM", endTime: "10:00 AM", title: "Breakfast", type: "meal" },
      { id: 2, time: "10:00 AM", endTime: "11:30 AM", title: "English tutor (ride)", type: "education" },
      { id: 3, time: "12:30 PM", endTime: "1:30 PM", title: "Lunch", type: "meal" },
      { id: 4, time: "2:00 PM", endTime: "3:30 PM", title: "Football (ride)", type: "sports" },
      { id: 5, time: "3:30 PM", endTime: "4:30 PM", title: "Groceries", type: "errands" },
      { id: 6, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    monday: [
      { id: 7, time: "7:00 AM", endTime: "8:00 AM", title: "Breakfast", type: "meal" },
      { id: 8, time: "8:00 AM", endTime: "8:30 AM", title: "Camp (ride)", type: "transport" },
      { id: 9, time: "9:00 AM", endTime: "5:00 PM", title: "Onsite", type: "work" },
      { id: 10, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    tuesday: [
      { id: 11, time: "7:00 AM", endTime: "8:00 AM", title: "Breakfast", type: "meal" },
      { id: 12, time: "8:00 AM", endTime: "8:30 AM", title: "Camp (ride)", type: "transport" },
      { id: 13, time: "9:00 AM", endTime: "5:00 PM", title: "Onsite", type: "work" },
      { id: 14, time: "5:30 PM", endTime: "6:00 PM", title: "Camp (ride)", type: "transport" },
      { id: 15, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    wednesday: [
      { id: 16, time: "7:00 AM", endTime: "8:00 AM", title: "Breakfast", type: "meal" },
      { id: 17, time: "9:30 AM", endTime: "5:30 PM", title: "Work from Home", type: "work" },
      { id: 18, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    thursday: [
      { id: 19, time: "7:00 AM", endTime: "8:00 AM", title: "Breakfast", type: "meal" },
      { id: 20, time: "8:00 AM", endTime: "8:30 AM", title: "Camp (ride)", type: "transport" },
      { id: 21, time: "9:00 AM", endTime: "5:00 PM", title: "Work from Home", type: "work" },
      { id: 22, time: "5:30 PM", endTime: "6:00 PM", title: "Camp (ride)", type: "transport" },
      { id: 23, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    friday: [
      { id: 24, time: "7:00 AM", endTime: "8:00 AM", title: "Breakfast", type: "meal" },
      { id: 25, time: "10:00 AM", endTime: "5:00 PM", title: "Onsite", type: "work" },
      { id: 26, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ],
    saturday: [
      { id: 27, time: "8:00 AM", endTime: "9:30 AM", title: "Laundry", type: "chores" },
      { id: 28, time: "9:30 AM", endTime: "10:30 AM", title: "Breakfast", type: "meal" },
      { id: 29, time: "11:00 AM", endTime: "4:00 PM", title: "Birthday party", type: "social" },
      { id: 30, time: "5:00 PM", endTime: "6:00 PM", title: "Math tutor (at home)", type: "education" },
      { id: 31, time: "6:00 PM", endTime: "7:30 PM", title: "Dinner", type: "meal" }
    ]
  };

  // Me time opportunities based on schedule analysis
  const meTimeSlots = {
    sunday: [
      { time: "7:00 AM", endTime: "9:00 AM", title: "Sunday Self-Care", priority: "high", duration: "2 hours" }
    ],
    monday: [
      { time: "6:00 AM", endTime: "7:00 AM", title: "Morning Meditation", priority: "high", duration: "1 hour" }
    ],
    tuesday: [
      { time: "6:00 AM", endTime: "7:00 AM", title: "Gentle Yoga", priority: "high", duration: "1 hour" }
    ],
    wednesday: [
      { time: "6:00 AM", endTime: "7:00 AM", title: "Journaling", priority: "medium", duration: "1 hour" },
      { time: "8:00 AM", endTime: "9:30 AM", title: "Nature Walk", priority: "medium", duration: "1.5 hours" }
    ],
    thursday: [
      { time: "6:00 AM", endTime: "7:00 AM", title: "Mindfulness", priority: "medium", duration: "1 hour" }
    ],
    friday: [
      { time: "8:00 AM", endTime: "10:00 AM", title: "Self-Care Morning", priority: "high", duration: "2 hours" }
    ],
    saturday: [
      { time: "6:00 AM", endTime: "8:00 AM", title: "Weekend Workout", priority: "medium", duration: "2 hours" }
    ]
  };

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekDaysLong = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  
  // Get current week dates - June 29 to July 5, 2025
  const getCurrentWeek = () => {
    const dates = [
      new Date(2025, 5, 29), // June 29 (Sunday)
      new Date(2025, 5, 30), // June 30 (Monday) - highlighted
      new Date(2025, 6, 1),  // July 1 (Tuesday)
      new Date(2025, 6, 2),  // July 2 (Wednesday)
      new Date(2025, 6, 3),  // July 3 (Thursday)
      new Date(2025, 6, 4),  // July 4 (Friday)
      new Date(2025, 6, 5)   // July 5 (Saturday)
    ];
    return dates;
  };

  const currentWeek = getCurrentWeek();

  // Time slots from 1 AM to 11 PM
  const timeSlots = [
    "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", 
    "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", 
    "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
  ];

  const getEventsForDay = (dayIndex: number) => {
    const dayName = weekDaysLong[dayIndex];
    return scheduleData[dayName] || [];
  };

  const getMeTimeSlotsForDay = (dayIndex: number) => {
    const dayName = weekDaysLong[dayIndex];
    return meTimeSlots[dayName] || [];
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meal':
        return 'bg-blue-500 text-white';
      case 'work':
        return 'bg-green-600 text-white';
      case 'transport':
        return 'bg-gray-500 text-white';
      case 'education':
        return 'bg-gray-500 text-white';
      case 'sports':
        return 'bg-gray-500 text-white';
      case 'errands':
        return 'bg-blue-500 text-white';
      case 'chores':
        return 'bg-blue-500 text-white';
      case 'social':
        return 'bg-red-400 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getMeTimeColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-purple-400 bg-purple-50 text-purple-700';
      case 'medium':
        return 'border-blue-400 bg-blue-50 text-blue-700';
      case 'low':
        return 'border-gray-400 bg-gray-50 text-gray-700';
      default:
        return 'border-purple-400 bg-purple-50 text-purple-700';
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
    return Math.max(duration * 64, 32); // 64px per hour, minimum 32px
  };

  const getEventTop = (startTime: string, slotTime: string) => {
    const eventStart = parseTime(startTime);
    const slotStart = parseTime(slotTime);
    
    if (eventStart.getHours() === slotStart.getHours()) {
      const minuteOffset = eventStart.getMinutes();
      return (minuteOffset / 60) * 64; // 64px per hour
    }
    return 0;
  };

  const shouldShowEventInSlot = (event: any, slotTime: string) => {
    const eventStart = parseTime(event.time);
    const slotStart = parseTime(slotTime);
    return eventStart.getHours() === slotStart.getHours();
  };

  const shouldShowMeTimeInSlot = (meTime: any, slotTime: string) => {
    const meTimeStart = parseTime(meTime.time);
    const slotStart = parseTime(slotTime);
    return meTimeStart.getHours() === slotStart.getHours();
  };

  const renderCalendarView = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Calendar Header */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="p-3 text-xs font-medium text-gray-500 border-r border-gray-200">
          GMT+01
        </div>
        {weekDays.map((day, index) => {
          const date = currentWeek[index];
          const isMonday = index === 1; // Monday (June 30) is highlighted in blue
          
          return (
            <div key={day} className="p-3 text-center border-r border-gray-200 last:border-r-0">
              <div className={`text-xs font-medium mb-1 ${isMonday ? 'text-blue-600' : 'text-gray-500'}`}>
                {day}
              </div>
              <div className={`text-lg font-bold ${
                isMonday ? 'bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto' :
                'text-gray-900'
              }`}>
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar Grid */}
      <div className="relative">
        {/* Time slots */}
        {timeSlots.map((time, index) => (
          <div key={time} className="grid grid-cols-8 border-b border-gray-100 last:border-b-0">
            <div className="p-3 text-xs text-gray-500 border-r border-gray-200 h-16 flex items-start">
              {time}
            </div>
            {/* Day columns */}
            {Array.from({ length: 7 }, (_, dayIndex) => (
              <div key={dayIndex} className="border-r border-gray-100 last:border-r-0 h-16 relative">
                {/* Regular Events for this time slot and day */}
                {getEventsForDay(dayIndex)
                  .filter(event => shouldShowEventInSlot(event, time))
                  .map(event => (
                    <div
                      key={`${event.id}-${dayIndex}`}
                      className={`absolute left-1 right-1 rounded-lg p-2 text-xs font-medium ${getEventColor(event.type)}`}
                      style={{
                        height: `${getEventHeight(event.time, event.endTime)}px`,
                        top: `${getEventTop(event.time, time)}px`,
                        zIndex: 10
                      }}
                    >
                      <div className="font-semibold text-xs leading-tight">
                        {event.title}
                      </div>
                      <div className="text-xs opacity-90 mt-0.5">
                        {event.time.replace(':00', '')} – {event.endTime.replace(':00', '')}
                      </div>
                    </div>
                  ))}

                {/* Me Time Opportunities for this time slot and day */}
                {getMeTimeSlotsForDay(dayIndex)
                  .filter(meTime => shouldShowMeTimeInSlot(meTime, time))
                  .map((meTime, meTimeIndex) => (
                    <motion.div
                      key={`me-time-${dayIndex}-${meTimeIndex}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + (dayIndex * 0.1) }}
                      className={`absolute left-1 right-1 rounded-lg p-2 text-xs font-medium border-2 border-dashed ${getMeTimeColor(meTime.priority)}`}
                      style={{
                        height: `${getEventHeight(meTime.time, meTime.endTime)}px`,
                        top: `${getEventTop(meTime.time, time)}px`,
                        zIndex: 15
                      }}
                    >
                      <div className="font-semibold text-xs leading-tight mb-1">
                        {meTime.title}
                      </div>
                      <div className="text-xs opacity-90">
                        {meTime.time.replace(':00', '')} – {meTime.endTime.replace(':00', '')}
                      </div>
                    </motion.div>
                  ))}
              </div>
            ))}
          </div>
        ))}
        
        {/* Current time indicator (red line) - positioned at around 7:30 PM */}
        <div className="absolute left-0 right-0 h-0.5 bg-red-500 z-20" style={{ top: '1216px' }}>
          <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5 -mt-1"></div>
        </div>
      </div>
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
            <h1 className="text-2xl font-bold text-gray-900">My Calendar</h1>
          </div>

          {/* Legend */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Me Time Opportunities
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-dashed border-purple-400 bg-purple-50 rounded"></div>
                <span className="text-gray-700">High Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-dashed border-blue-400 bg-blue-50 rounded"></div>
                <span className="text-gray-700">Medium Priority</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Dashed boxes show optimal times for wellness activities based on your schedule
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-4 mb-20"
        >
          {renderCalendarView()}

          {/* Add Activity Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Button
              className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg"
            >
              + Schedule New Activity
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <TabBar activeTab="schedule" onTabChange={() => {}} />
    </div>
  );
};