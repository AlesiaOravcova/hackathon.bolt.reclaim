import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { GoogleIcon } from "../../components/icons";

export const Welcome = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendarPrompt, setShowCalendarPrompt] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      setShowCalendarPrompt(true);
    }, 1500);
  };

  const handleConnectCalendar = () => {
    // Navigate to calendar integration
    navigate("/calendar");
  };

  const handleSkipCalendar = () => {
    // Skip calendar connection and go to onboarding
    navigate("/onboarding/step1");
  };

  const handleSignIn = () => {
    // Navigate to sign in flow (for now, just go to dashboard)
    navigate("/dashboard");
  };

  if (showCalendarPrompt) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Status bar simulation */}
        <div className="flex justify-between items-center px-6 pt-3 pb-1 text-black">
          <span className="text-sm font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-black rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
            <div className="ml-2 w-6 h-3 border border-black rounded-sm">
              <div className="w-4 h-1.5 bg-black rounded-sm m-0.5"></div>
            </div>
          </div>
        </div>

        {/* Calendar Connection Prompt */}
        <div className="flex-1 flex flex-col justify-center px-6 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            {/* Calendar Icon */}
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Connect Your Calendar
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed px-4">
              To find the perfect time for your wellness activities, we'd like to sync with your Google Calendar.
            </p>

            <div className="bg-blue-50 rounded-2xl p-6 mb-8 mx-4">
              <h3 className="font-semibold text-blue-900 mb-3">What we'll do:</h3>
              <ul className="text-sm text-blue-800 space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  View your existing events to find free time
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Automatically schedule wellness activities
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Send gentle reminders for your me-time
                </li>
              </ul>
            </div>

            <div className="space-y-4 px-4">
              <Button
                onClick={handleConnectCalendar}
                className="w-full h-14 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
              >
                <GoogleIcon className="w-6 h-6" />
                Connect Google Calendar
              </Button>

              <button
                onClick={handleSkipCalendar}
                className="w-full text-gray-600 font-medium py-3 hover:text-gray-800 transition-colors"
              >
                Skip for now
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Status bar simulation */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1 text-black">
        <span className="text-sm font-semibold">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          </div>
          <div className="ml-2 w-6 h-3 border border-black rounded-sm">
            <div className="w-4 h-1.5 bg-black rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-between px-6 py-2">
        {/* Header section - reduced padding */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-2 mt-2"
        >

          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            Reclaim your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              me time
            </span>
          </h1>

          <p className="text-base text-gray-600 leading-relaxed">
            AI assistant that intelligently schedules time for your personal wellbeing and self-care.
          </p>
        </motion.div>

        {/* Illustration with floating elements - increased size */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="flex-1 flex items-center justify-center py-4 relative max-h-80"
        >
          <div className="relative w-80 h-80">
            {/* Floating element 1 - Weather/Sun icon (top left) */}
            <motion.div
              animate={{ 
                y: [-12, 12, -12],
                x: [-4, 4, -4],
                rotate: [0, 4, -4, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0
              }}
              className="absolute top-0 left-0 w-32 h-32 z-10"
            >
              <img 
                src="/image 1.png" 
                alt="Weather element" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Floating element 2 - Cloud (top right) */}
            <motion.div
              animate={{ 
                y: [10, -10, 10],
                x: [4, -4, 4],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-6 right-6 w-16 h-12 z-10"
            >
              <img 
                src="/image 2.png" 
                alt="Cloud element" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Floating element 3 - Winter/Snow tree (bottom left) */}
            <motion.div
              animate={{ 
                y: [-8, 10, -8],
                x: [-3, 5, -3],
                rotate: [0, -3, 3, 0]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-12 left-4 w-16 h-18 z-10"
            >
              <img 
                src="/image 3.png" 
                alt="Winter tree element" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Floating element 4 - Calendar (bottom right) */}
            <motion.div
              animate={{ 
                y: [10, -8, 10],
                x: [3, -3, 3],
                rotate: [0, 6, -6, 0]
              }}
              transition={{ 
                duration: 4.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-14 right-8 w-20 h-20 z-10"
            >
              <img 
                src="/image 4 copy.png" 
                alt="Calendar element" 
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Main character illustration - static */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <img 
                src="/welcome_bg_img.png" 
                alt="Welcome illustration" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </motion.div>

        {/* Authentication section - compact spacing */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3 pb-2"
        >
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            variant="outline"
            className="flex h-12 items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-900 rounded-2xl font-semibold text-base shadow-lg active:scale-95 transition-all duration-200"
          >
            <GoogleIcon className="w-5 h-5" />
            {isLoading ? "Signing in..." : "Continue with Google"}
          </Button>

          {/* Sign in link */}
          <button
            onClick={handleSignIn}
            className="text-blue-600 font-medium text-center py-1 active:scale-95 transition-all duration-200"
          >
            Already have an account? Sign in
          </button>
        </motion.div>
      </div>
    </div>
  );
};