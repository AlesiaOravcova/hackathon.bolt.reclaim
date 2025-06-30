import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { TabBar } from "../../components/TabBar";
import { StatusBar } from "../../components/StatusBar";

export const Schedule = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sample schedule data matching the screenshot
  const scheduleData = [
    // Morning routine (7:30-8:30 AM)
    { 
      id: 1, 
      time: "7:30 AM", 
      endTime: "8:30 AM",
      title: "Wake kids up/breakfast", 
      duration: "1 hour", 
      completed: true, 
      type: "family",
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    
    // Work blocks
    { 
      id: 2, 
      time: "9:30 AM", 
      endTime: "5:30 PM",
      title: "Onsite", 
      duration: "8 hours", 
      completed: false, 
      type: "work",
      days: ['monday', 'tuesday']
    },
    { 
      id: 3, 
      time: "9:30 AM", 
      endTime: "5:30 PM",
      title: "Work from Home", 
      duration: "8 hours", 
      completed: false, 
      type: "work",
      days: ['wednesday']
    },
    { 
      id: 4, 
      time: "10:00 AM", 
      endTime: "6:00 PM",
      title: "Work from Home", 
      duration: "8 hours", 
      completed: false, 
      type: "work",
      days: ['thursday']
    },
    { 
      id: 5, 
      time: "10:00 AM", 
      endTime: "5:00 PM",
      title: "Onsite", 
      duration: "7 hours", 
      completed: false, 
      type: "work",
      days: ['friday']
    },
    
    // Evening routine (7-8 PM)
    { 
      id: 6, 
      time: "7:00 PM", 
      endTime: "8:00 PM",
      title: "Family Dinner", 
      duration: "1 hour", 
      completed: false, 
      type: "family",
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    }
  ];

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekDaysLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
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
    const dayName = weekDaysLong[dayIndex].toLowerCase();
    return scheduleData.filter(event => 
      event.days.includes(dayName)
    );
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'family':
        return 'bg-blue-500 text-white';
      case 'work':
        return 'bg-amber-700 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getEventHeight = (startTime: string, endTime: string) => {
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const duration = (end - start) / (1000 * 60 * 60); // hours
    return Math.max(duration * 60, 40); // minimum 40px height
  };

  const getEventTop = (startTime: string) => {
    const time = parseTime(startTime);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const startHour = 7; // 7 AM
    return ((hours - startHour) * 60 + minutes) + 40; // 40px for header
  };

  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours);
    date.setMinutes(minutes || 0);
    return date;
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
          const isToday = date.toDateString() === new Date().toDateString();
          const isMonday = index === 1; // Monday is highlighted in blue
          
          return (
            <div key={day} className="p-3 text-center border-r border-gray-200 last:border-r-0">
              <div className={`text-xs font-medium mb-1 ${isMonday ? 'text-blue-600' : 'text-gray-500'}`}>
                {day}
              </div>
              <div className={`text-lg font-bold ${
                isMonday ? 'bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto' :
                isToday ? 'text-blue-600' : 'text-gray-900'
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
                {/* Events for this time slot and day */}
                {getEventsForDay(dayIndex)
                  .filter(event => {
                    const eventStart = parseTime(event.time);
                    const slotStart = parseTime(time);
                    const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);
                    return eventStart >= slotStart && eventStart < slotEnd;
                  })
                  .map(event => (
                    <div
                      key={`${event.id}-${dayIndex}`}
                      className={`absolute left-1 right-1 rounded-lg p-2 text-xs font-medium ${getEventColor(event.type)}`}
                      style={{
                        height: `${getEventHeight(event.time, event.endTime)}px`,
                        zIndex: 10
                      }}
                    >
                      <div className="font-semibold text-xs leading-tight">
                        {event.title}
                      </div>
                      <div className="text-xs opacity-90 mt-1">
                        {event.time} – {event.endTime}
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
        
        {/* Current time indicator (red line) */}
        <div className="absolute left-0 right-0 h-0.5 bg-red-500 z-20" style={{ top: '390px' }}>
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
            <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
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