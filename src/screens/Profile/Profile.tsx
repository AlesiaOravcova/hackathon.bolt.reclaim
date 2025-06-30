import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { TabBar } from "../../components/TabBar";
import { StatusBar } from "../../components/StatusBar";

export const Profile = (): JSX.Element => {
  const navigate = useNavigate();

  const profileStats = [
    { label: "Activities Completed", value: "127", icon: "✓" },
    { label: "Current Streak", value: "12 days", icon: "🔥" },
    { label: "Total Me Time", value: "24.5 hrs", icon: "⏰" },
    { label: "Mindfulness Score", value: "8.4/10", icon: "🧘" },
  ];

  const preferences = [
    { label: "Preferred Activity Time", value: "Morning & Evening" },
    { label: "Activity Duration", value: "15-30 minutes" },
    { label: "Focus Areas", value: "Mindfulness, Exercise" },
    { label: "Notifications", value: "Enabled" },
  ];

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      navigate("/");
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
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          </div>

          {/* Profile Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">J</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Jane Doe</h2>
              <p className="text-gray-600">Member since March 2024</p>
              <p className="text-sm text-blue-600 font-medium">Premium Plan</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-4"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            {profileStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-6 py-4"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Preferences</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {preferences.map((pref, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 ${
                  index !== preferences.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                <span className="text-gray-900 font-medium">{pref.label}</span>
                <span className="text-gray-600">{pref.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="px-6 py-4 mb-20"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Settings</h3>
          <div className="space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-between h-14 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <span className="text-gray-900 font-medium">Edit Profile</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-between h-14 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <span className="text-gray-900 font-medium">Notifications</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-between h-14 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <span className="text-gray-900 font-medium">Privacy & Security</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-between h-14 bg-white rounded-2xl shadow-sm border border-gray-100"
              onClick={handleSignOut}
            >
              <span className="text-red-600 font-medium">Sign Out</span>
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </Button>
          </div>
        </motion.div>
      </div>

      <TabBar activeTab="profile" onTabChange={() => {}} />
    </div>
  );
};