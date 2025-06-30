import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { TabBar } from "../../components/TabBar";
import { StatusBar } from "../../components/StatusBar";
import { WeeklyCalendarScroll } from "../../components/WeeklyCalendarScroll";
import { SuccessModal } from "../../components/SuccessModal";

export const Dashboard = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCommitSuccessModal, setShowCommitSuccessModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string>("");
  const [showSpaPromo, setShowSpaPromo] = useState(true);

  const todayActivities = [
    { time: "9:00–9:15am", title: "🧘 Morning Meditation"},
    { time: "12:30–1:00PM", title: "🚶 Lunch Break Walk"},
    { time: "8:15–8:45PM", title: "🧘 Evening Yoga"},
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

  const handleCommit = (activityTitle: string) => {
    setSelectedActivity(activityTitle);
    setShowCommitSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowCommitSuccessModal(false);
    setSelectedActivity("");
  };

  const handleSpaCommit = () => {
    setSelectedActivity("🌸 Spa Treatment");
    setShowCommitSuccessModal(true);
  };

  const handleSpaDismiss = () => {
    setShowSpaPromo(false);
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
          <div className="flex flex-col items-start mb-6">
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
          <h2 className="text-lg font-semibold mb-2">Suggested activities</h2>
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
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {activity.title}
                    </h3>
                    <div className="text-sm text-gray-500">
                      {activity.time} 
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleCommit(activity.title)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-4 py-2 ml-4"
                  >
                    Commit
                  </Button>
                </div>
              </motion.div>
            ))}

            {/* Spa Treatment Promotional Card */}
            {showSpaPromo && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ delay: 0.4, type: "spring", damping: 20, stiffness: 300 }}
                className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-2xl p-5 border-2 border-pink-200 shadow-sm"
              >
                {/* Subtle decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-200/30 to-pink-200/30 rounded-full translate-y-8 -translate-x-8"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      {/* Title row with Spa Treatment and Treat yourself on same line */}
                      <div className="flex items-start justify-between w-full">
                        <div className="flex flex-col"> 
                          <h3 className="font-semibold text-gray-900 mb-0 flex-1">
                            Spa Treatment
                          </h3>
                          <div className="text-sm text-purple-700 font-medium">
                            Saturday 2:00-4:00PM
                          </div>
                        </div>
                        <span className="text-sm font-medium text-pink-700 bg-pink-100 px-2 py-1 rounded-full">
                          🌸 Treat yourself
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        You've been doing great with your wellness routine. How about scheduling some pampering time this weekend?
                      </p>

                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                     <Button
                        size="sm"
                        variant="outline"
                        onClick={handleSpaDismiss}
                        className="border-pink-300 text-pink-700 hover:bg-pink-50 rounded-full px-4 py-2"
                      >
                        Maybe later
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSpaCommit}
                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full px-4 py-2"
                      >
                        I'm In!
                      </Button>
                
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showCommitSuccessModal}
        onClose={handleCloseSuccessModal}
        activityTitle={selectedActivity}
      />

      {/* Tab Bar */}
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};