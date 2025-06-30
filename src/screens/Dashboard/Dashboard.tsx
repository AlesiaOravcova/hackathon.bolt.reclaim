import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { TabBar } from "../../components/TabBar";
import { StatusBar } from "../../components/StatusBar";
import { useAuthContext } from "../../contexts/AuthContext";
import { monthlySchedule, getTodaysActivities, getWeeklyStats } from "../../data/scheduleData";

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const { user } = useAuthContext();

  // Get today's activities and stats
  const todayActivities = getTodaysActivities(monthlySchedule);
  const weeklyStats = getWeeklyStats(monthlySchedule);
  
  // Calculate today's progress
  const completedToday = todayActivities.filter(activity => activity.completed).length;
  const totalToday = todayActivities.length;
  const progressPercentage = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;

  // Get user initials for avatar
  const getUserInitial = () => {
    if (user?.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Get user's first name for greeting
  const getUserFirstName = () => {
    if (user?.displayName) {
      return user.displayName.split(' ')[0];
    }
    return 'there';
  };

  // Get activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'mindfulness':
        return (
          <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
      case 'exercise':
        return (
          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
          </svg>
        );
      case 'nutrition':
        return (
          <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      case 'sleep':
        return (
          <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        );
      case 'social':
        return (
          <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h3v-2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v2h3v4H4z"/>
          </svg>
        );
      case 'creative':
        return (
          <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        );
    }
  };

  // Get activity background color based on type
  const getActivityBgColor = (type: string) => {
    switch (type) {
      case 'mindfulness': return 'bg-purple-100';
      case 'exercise': return 'bg-green-100';
      case 'nutrition': return 'bg-orange-100';
      case 'sleep': return 'bg-indigo-100';
      case 'social': return 'bg-pink-100';
      case 'creative': return 'bg-yellow-100';
      default: return 'bg-blue-100';
    }
  };

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
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hi, {getUserFirstName()}!
              </h1>
              <p className="text-gray-600">Ready for your me time?</p>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-semibold">{getUserInitial()}</span>
            </button>
          </div>

          {/* Progress Card */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold">Today's Progress</h3>
                <p className="text-blue-100">{completedToday} of {totalToday} activities completed</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{progressPercentage}%</div>
                <div className="text-blue-100 text-sm">Complete</div>
              </div>
            </div>
            <div className="w-full bg-blue-400 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
            <Button
              variant="ghost"
              className="text-blue-600 font-semibold"
              onClick={() => navigate("/schedule")}
            >
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {todayActivities.slice(0, 4).map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-white rounded-2xl p-4 shadow-sm border ${
                  activity.completed ? "border-green-200 bg-green-50" : "border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activity.completed 
                        ? "bg-green-100" 
                        : getActivityBgColor(activity.type)
                    }`}>
                      {activity.completed ? (
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      ) : (
                        getActivityIcon(activity.type)
                      )}
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        activity.completed ? "text-green-900" : "text-gray-900"
                      }`}>
                        {activity.title}
                      </h3>
                      <p className={`text-sm ${
                        activity.completed ? "text-green-600" : "text-gray-500"
                      }`}>
                        {activity.time} • {activity.duration}
                      </p>
                    </div>
                  </div>
                  
                  {!activity.completed && (
                    <Button
                      size="sm"
                      className="bg-blue-600 text-white rounded-full px-4 py-2"
                    >
                      Start
                    </Button>
                  )}
                  
                  {activity.completed && (
                    <div className="text-green-600 font-semibold text-sm">
                      Completed
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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
                      className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                      style={{ height: `${stat.total > 0 ? (stat.completed / stat.total) * 100 : 0}%` }}
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