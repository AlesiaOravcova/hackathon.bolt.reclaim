import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { TabBar } from "../../components/TabBar";
import { StatusBar } from "../../components/StatusBar";
import { WeeklyCalendarScroll } from "../../components/WeeklyCalendarScroll";

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const todayActivities = [
    { time: "9:00 AM", title: "Morning Meditation", duration: "15 min", type: "mindfulness" },
    { time: "12:30 PM", title: "Lunch Break Walk", duration: "20 min", type: "exercise" },
    { time: "3:00 PM", title: "Breathing Exercise", duration: "10 min", type: "mindfulness" },
    { time: "6:00 PM", title: "Evening Yoga", duration: "30 min", type: "exercise" },
  ];

  const weeklyStats = [
    { day: "Mon", completed: 3, total: 4 },
    { day: "Tue", completed: 4, total: 4 },
    { day: "Wed", completed: 2, total: 3 },
    { day: "Thu", completed: 4, total: 4 },
    { day: "Fri", completed: 1, total: 4 },
    { day: "Sat", completed: 0, total: 2 },
    { day: "Sun", completed: 0, total: 2 },
  ];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // You can add logic here to filter activities by selected date
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5]">
      <StatusBar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-4"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-medium text-gray-900 leading-tight">
                ☀️ Good morning{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Elizabeth
                </span>
              </h1>
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center hidden"
            >
              <span className="text-white font-semibold">J</span>
            </button>
          </div>

          {/* Weekly Calendar Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <WeeklyCalendarScroll onDateSelect={handleDateSelect} />
          </motion.div>

          {/* Progress Card */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white hidden">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Today's Progress</h3>
                <p className="text-blue-100">2 of 4 activities completed</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">50%</div>
                <div className="text-blue-100 text-sm">Complete</div>
              </div>
            </div>
            <div className="w-full bg-blue-400 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-1/2"></div>
            </div>
          </div>
        </motion.div>

        {/* Calendar Integration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-4 hidden"
        >
          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Connect Your Calendar</h3>
                <p className="text-green-100 text-sm mb-4">
                  Sync with Google Calendar to automatically find time for your wellness activities
                </p>
                <Button
                  onClick={() => navigate("/calendar")}
                  className="bg-white text-green-600 hover:bg-green-50 font-semibold px-4 py-2 rounded-xl"
                >
                  Connect Now
                </Button>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center ml-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-6"
        >

          <div className="space-y-3">
            {todayActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activity.type === "mindfulness" 
                        ? "bg-purple-100" 
                        : "bg-green-100"
                    }`}>
                      {activity.type === "mindfulness" ? (
                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                      <p className="text-sm text-gray-500">{activity.time} • {activity.duration}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-600 text-white rounded-full px-4 py-2"
                  >
                    Start
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-6 py-4 mb-20 hidden"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">This Week</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between gap-2">
              {weeklyStats.map((stat, index) => (
                <div key={stat.day} className="flex flex-col items-center gap-2">
                  <div className="text-xs font-medium text-gray-500">{stat.day}</div>
                  <div className="w-8 h-16 bg-gray-100 rounded-full relative overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                      style={{ height: `${(stat.completed / stat.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600">{stat.completed}/{stat.total}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};