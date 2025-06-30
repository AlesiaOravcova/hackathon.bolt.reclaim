import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { GoogleIcon } from "../../components/icons";
import { firebaseGoogleCalendarService } from "../../services/firebaseGoogleCalendar";

export const Welcome = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopupHelp, setShowPopupHelp] = useState(false);

  useEffect(() => {
    // Check for redirect result on component mount
    const checkRedirectResult = async () => {
      try {
        const success = await firebaseGoogleCalendarService.handleRedirectResult();
        if (success) {
          const isNewUser = firebaseGoogleCalendarService.isNewUser();
          if (isNewUser) {
            navigate('/onboarding/step1');
          } else {
            navigate('/dashboard');
          }
        }
      } catch (error: any) {
        console.error('Redirect result error:', error);
        setError(error.message);
      }
    };

    checkRedirectResult();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    setShowPopupHelp(false);
    
    try {
      const success = await firebaseGoogleCalendarService.signInWithGoogle();
      
      if (success) {
        // Check if this is a new user
        const isNewUser = firebaseGoogleCalendarService.isNewUser();
        
        if (isNewUser) {
          navigate('/onboarding/step1');
        } else {
          navigate('/dashboard');
        }
      }
      // If success is false, it means redirect was used, so we wait for page reload
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      
      if (error.message.includes('Pop-up was blocked')) {
        setShowPopupHelp(true);
        setError("Pop-up was blocked. Please allow pop-ups for this site or try the button below.");
      } else {
        setError(error.message || "An error occurred during sign-in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    // For existing users who want to sign in manually
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5] relative overflow-hidden">
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
          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Popup help message */}
          {showPopupHelp && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl text-sm"
            >
              <p className="font-medium mb-2">Pop-up blocked? Here's how to fix it:</p>
              <ul className="text-xs space-y-1">
                <li>• Look for a popup blocker icon in your address bar</li>
                <li>• Click it and select "Always allow pop-ups from this site"</li>
                <li>• Or try the button below for an alternative sign-in method</li>
              </ul>
            </motion.div>
          )}

          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            variant="outline"
            className="flex h-12 items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-900 rounded-2xl font-semibold text-base shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GoogleIcon className="w-5 h-5" />
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                Signing in...
              </div>
            ) : (
              "Continue with Google"
            )}
          </Button>

          {/* Alternative sign-in method for popup issues */}
          {showPopupHelp && (
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex h-12 items-center justify-center gap-3 bg-blue-600 text-white rounded-2xl font-semibold text-base shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <GoogleIcon className="w-5 h-5" />
              Try Alternative Sign-in
            </Button>
          )}

          {/* Sign in link */}
          <button
            onClick={handleSignIn}
            disabled={isLoading}
            className="text-blue-600 font-medium text-center py-1 active:scale-95 transition-all duration-200 disabled:opacity-50"
          >
            Already have an account? Sign in
          </button>

          {/* Privacy notice */}
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy. 
            We'll access your Google Calendar to help schedule your wellness time.
          </p>
        </motion.div>
      </div>
    </div>
  );
};