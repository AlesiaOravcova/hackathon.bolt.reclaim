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
    { time: "8:00 AM", title: "Morning Meditation", duration: "15 min", completed: true },
    { time: "9:30 AM", title: "Gratitude Journal", duration: "10 min", completed: true },
    { time: "12:30 PM", title: "Mindful Lunch Break", duration: "20 min", completed: false },
    { time: "3:00 PM", title: "Breathing Exercise", duration: "10 min", completed: false },
    { time: "5:30 PM", title: "Evening Walk", duration: "25 min", completed: false },
    { time: "8:00 PM", title: "Yoga Session", duration: "30 min", completed: false },
  ];

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

          {/* Week Calendar */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">This Week</h2>
            <Button variant="ghost" className="text-blue-600 font-medium">
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
                      ? "bg-blue-600 text-white"
                      : isToday
                      ? "bg-blue-100 text-blue-600"
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
                        : "bg-blue-100"
                    }`}>
                      {item.completed ? (
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      )}
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
                      className="bg-blue-600 text-white rounded-full px-4 py-2"
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