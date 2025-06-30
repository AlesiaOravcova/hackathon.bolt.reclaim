import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { TabBar } from "../../components/TabBar";
import { StatusBar } from "../../components/StatusBar";

export const Schedule = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + i);
    return date;
  });

  const scheduleData = [
    { time: "8:00 AM", title: "Morning Meditation", duration: "15 min", completed: true, type: "meditation" },
    { time: "9:30 AM", title: "Gratitude Journal", duration: "10 min", completed: true, type: "journal" },
    { time: "12:30 PM", title: "Mindful Lunch Break", duration: "20 min", completed: false, type: "mindful" },
    { time: "3:00 PM", title: "Breathing Exercise", duration: "10 min", completed: false, type: "breathing" },
    { time: "5:30 PM", title: "Evening Walk", duration: "25 min", completed: false, type: "walk" },
    { time: "8:00 PM", title: "Yoga Session", duration: "30 min", completed: false, type: "yoga" },
  ];

  const getActivityIcon = (type: string, completed: boolean) => {
    const iconColor = completed ? "text-green-600" : "text-emerald-600";
    
    switch (type) {
      case "meditation":
        return (
          <svg className={`w-6 h-6 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
          </svg>
        );
      case "journal":
        return (
          <svg className={`w-6 h-6 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
          </svg>
        );
      case "mindful":
        return (
          <svg className={`w-6 h-6 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,18.5C15.5,18.5 18.5,15.5 18.5,12C18.5,8.5 15.5,5.5 12,5.5C8.5,5.5 5.5,8.5 5.5,12C5.5,15.5 8.5,18.5 12,18.5M12,7C14.4,7 16.5,8.8 16.9,11.2C16.9,11.2 16.9,11.1 16.9,11C16.9,9.3 15.6,8 13.9,8C12.2,8 10.9,9.3 10.9,11C10.9,11.1 10.9,11.2 10.9,11.2C11.3,8.8 13.4,7 12,7Z"/>
          </svg>
        );
      case "breathing":
        return (
          <svg className={`w-6 h-6 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6M12,8A4,4 0 0,0 8,12A4,4 0 0,0 12,16A4,4 0 0,0 16,12A4,4 0 0,0 12,8M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z"/>
          </svg>
        );
      case "walk":
        return (
          <svg className={`w-6 h-6 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.12,10H15L13.5,7.5C13.1,6.9 12.4,6.5 11.7,6.5C11.35,6.5 11.03,6.6 10.76,6.8L6.5,9.5C6.05,9.8 5.85,10.4 6.15,10.85C6.45,11.3 7.05,11.5 7.5,11.2L10.5,9.5L11.2,10.8L8.5,11.5C7.85,11.7 7.45,12.35 7.65,13S8.35,13.45 9,13.25L12.4,12.2C12.95,12.05 13.4,11.7 13.6,11.2L14.12,10M14,3.5C14,4.6 14.9,5.5 16,5.5C17.1,5.5 18,4.6 18,3.5C18,2.4 17.1,1.5 16,1.5C14.9,1.5 14,2.4 14,3.5M7,22V16.5L9.5,15L8.09,11.09C7.85,10.5 7.1,10.24 6.5,10.5C5.9,10.76 5.64,11.5 5.91,12.09L7.5,16.5L5.5,17.5C4.75,17.85 4.41,18.76 4.76,19.51C5.11,20.26 6.04,20.6 6.79,20.25L9.5,18.9V22H7Z"/>
          </svg>
        );
      case "yoga":
        return (
          <svg className={`w-6 h-6 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,9.5C14.8,9.3 14.6,9.1 14.3,9L16.5,7.5C16.1,7.2 15.6,7 15,7V9C15,9.8 14.6,10.5 14,10.9V22H16V16H18V22H20V10.6C20.6,10 21,9.1 21,9M10,11.5L7.91,17.76C7.55,18.8 6.4,19.28 5.36,18.92C4.32,18.56 3.84,17.41 4.2,16.37L6.5,9.5C6.96,8.15 8.5,7.35 9.85,7.81C10.2,7.93 10.5,8.15 10.76,8.4L11,8.5V22H13V10.5C13,10.1 12.7,9.8 12.3,9.8L10,11.5Z"/>
          </svg>
        );
      default:
        return (
          <svg className={`w-6 h-6 ${iconColor}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
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

          {/* Week Calendar */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">This Week</h2>
            <Button variant="ghost" className="text-green-600 font-medium">
              Add Activity
            </Button>
          </div>

          <div className="flex gap-2">
            {currentWeek.map((date, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-1 py-3 px-2 rounded-2xl transition-all ${
                    isSelected
                      ? "bg-green-600 text-white"
                      : isToday
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <div className="text-xs font-medium mb-1">{weekDays[index]}</div>
                  <div className="text-lg font-bold">{date.getDate()}</div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Schedule List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-4 mb-20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <span className="text-sm text-gray-500">
              {scheduleData.filter(item => item.completed).length} of {scheduleData.length} completed
            </span>
          </div>

          <div className="space-y-3">
            {scheduleData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-white rounded-2xl p-4 shadow-sm border ${
                  item.completed ? "border-green-200 bg-green-50" : "border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.completed 
                        ? "bg-green-100" 
                        : "bg-emerald-100"
                    }`}>
                      {getActivityIcon(item.type, item.completed)}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${
                        item.completed ? "text-green-900" : "text-gray-900"
                      }`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm ${
                        item.completed ? "text-green-600" : "text-gray-500"
                      }`}>
                        {item.time} • {item.duration}
                      </p>
                    </div>
                  </div>
                  
                  {!item.completed && (
                    <Button
                      size="sm"
                      className="bg-green-600 text-white rounded-full px-4 py-2"
                    >
                      Start
                    </Button>
                  )}
                  
                  {item.completed && (
                    <div className="text-green-600 font-semibold text-sm">
                      Completed
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Activity Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Button
              className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-semibold text-lg shadow-lg"
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