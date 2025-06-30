import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useAuthContext } from "../../contexts/AuthContext";

export const Welcome = (): JSX.Element => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingType, setLoadingType] = useState<'signup' | 'login' | null>(null);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSignUp = () => {
    setIsLoading(true);
    setLoadingType('signup');
    // Simulate loading for better UX
    setTimeout(() => {
      navigate("/signup");
    }, 1000);
  };

  const handleLogIn = () => {
    setIsLoading(true);
    setLoadingType('login');
    // Simulate loading for better UX
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleContinueAsGuest = () => {
    setIsLoading(true);
    setLoadingType('signup');
    // Simulate loading for better UX
    setTimeout(() => {
      navigate("/onboarding/step1");
    }, 1000);
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5] relative overflow-hidden">
      {/* Status bar simulation */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1 text-black relative">
        <span className="text-sm font-semibold">9:41</span>
        
        {/* Bolt.new Badge */}
        <motion.a
          href="https://bolt.new"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3L4 14h7v7l9-11h-7V3z"/>
            </svg>
            Built with Bolt.new
          </div>
        </motion.a>

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

        {/* Authentication section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col gap-3 pb-2"
        >
          {/* Sign Up Button */}
          <Button
            onClick={handleSignUp}
            disabled={isLoading}
            className={`w-full h-12 rounded-2xl font-semibold text-lg transition-all duration-200 ${
              isLoading && loadingType === 'signup'
                ? "bg-blue-600 bg-opacity-50 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
            }`}
          >
            {isLoading && loadingType === 'signup' ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          {/* Log In Button */}
          <Button
            onClick={handleLogIn}
            disabled={isLoading}
            variant="outline"
            className={`w-full h-12 rounded-2xl font-semibold text-lg transition-all duration-200 ${
              isLoading && loadingType === 'login'
                ? "border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:scale-95"
            }`}
          >
            {isLoading && loadingType === 'login' ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              "Log In"
            )}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Continue as Guest */}
          <button
            onClick={handleContinueAsGuest}
            disabled={isLoading}
            className="text-blue-600 font-medium text-center py-2 active:scale-95 transition-all duration-200 disabled:opacity-50"
          >
            Continue as Guest
          </button>

          {/* Privacy notice */}
          <p className="text-xs text-gray-500 text-center leading-relaxed mt-2">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </motion.div>
      </div>
    </div>
  );
};