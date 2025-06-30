import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { TabBar } from "../../components/TabBar";
import { StatusBar } from "../../components/StatusBar";

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

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

  const handleScheduleEvent = () => {
    // Navigate to calendar page to schedule a new event
    navigate("/calendar");
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Good morning!</h1>
              <p className="text-gray-600">Ready for your me time?</p>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-semibold">J</span>
            </button>
          </div>

          {/* Progress Card */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Today's Progress</h3>
                <p className="text-green-100">2 of 4 activities completed</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">50%</div>
                <div className="text-green-100 text-sm">Complete</div>
              </div>
            </div>
            <div className="w-full bg-green-400 rounded-full h-2">
              <div className="bg-white h-2 rounded-full w-1/2"></div>
            </div>
          </div>
        </motion.div>

        {/* Calendar Integration Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-4"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Connect Your Calendar</h3>
                <p className="text-emerald-100 text-sm mb-4">
                  Sync with Google Calendar to automatically find time for your wellness activities
                </p>
                <Button
                  onClick={() => navigate("/calendar")}
                  className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold px-4 py-2 rounded-xl"
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
          className="px-6 py-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleScheduleEvent}
                className="bg-green-600 text-white font-semibold px-4 py-2 rounded-xl text-sm"
              >
                + Schedule Event
              </Button>
              <Button
                variant="ghost"
                className="text-green-600 font-semibold"
                onClick={() => navigate("/schedule")}
              >
                View All
              </Button>
            </div>
          </div>

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
                        ? "bg-emerald-100" 
                        : "bg-green-100"
                    }`}>
                      {activity.type === "mindfulness" ? (
                        <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,9.5C14.8,9.3 14.6,9.1 14.3,9L16.5,7.5C16.1,7.2 15.6,7 15,7V9C15,9.8 14.6,10.5 14,10.9V22H16V16H18V22H20V10.6C20.6,10 21,9.1 21,9M10,11.5L7.91,17.76C7.55,18.8 6.4,19.28 5.36,18.92C4.32,18.56 3.84,17.41 4.2,16.37L6.5,9.5C6.96,8.15 8.5,7.35 9.85,7.81C10.2,7.93 10.5,8.15 10.76,8.4L11,8.5V22H13V10.5C13,10.1 12.7,9.8 12.3,9.8L10,11.5Z"/>
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.12,10H15L13.5,7.5C13.1,6.9 12.4,6.5 11.7,6.5C11.35,6.5 11.03,6.6 10.76,6.8L6.5,9.5C6.05,9.8 5.85,10.4 6.15,10.85C6.45,11.3 7.05,11.5 7.5,11.2L10.5,9.5L11.2,10.8L8.5,11.5C7.85,11.7 7.45,12.35 7.65,13S8.35,13.45 9,13.25L12.4,12.2C12.95,12.05 13.4,11.7 13.6,11.2L14.12,10M14,3.5C14,4.6 14.9,5.5 16,5.5C17.1,5.5 18,4.6 18,3.5C18,2.4 17.1,1.5 16,1.5C14.9,1.5 14,2.4 14,3.5M7,22V16.5L9.5,15L8.09,11.09C7.85,10.5 7.1,10.24 6.5,10.5C5.9,10.76 5.64,11.5 5.91,12.09L7.5,16.5L5.5,17.5C4.75,17.85 4.41,18.76 4.76,19.51C5.11,20.26 6.04,20.6 6.79,20.25L9.5,18.9V22H7Z"/>
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
                    className="bg-green-600 text-white rounded-full px-4 py-2"
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
          className="px-6 py-4 mb-20"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">This Week</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between gap-2">
              {weeklyStats.map((stat, index) => (
                <div key={stat.day} className="flex flex-col items-center gap-2">
                  <div className="text-xs font-medium text-gray-500">{stat.day}</div>
                  <div className="w-8 h-16 bg-gray-100 rounded-full relative overflow-hidden">
                    <div
                      className="absolute bottom-0 w-full bg-gradient-to-t from-green-500 to-emerald-600 rounded-full transition-all duration-500"
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