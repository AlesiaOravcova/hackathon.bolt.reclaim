import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { GoogleIcon } from "../../components/icons";
import { googleCalendarService } from "../../services/googleCalendar";

export const Welcome = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    // Debug environment variables
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
    
    let debug = "Debug Info:\n";
    debug += `Client ID: ${clientId ? `${clientId.substring(0, 20)}...` : 'NOT SET'}\n`;
    debug += `Client Secret: ${clientSecret ? 'SET' : 'NOT SET'}\n`;
    debug += `Current URL: ${window.location.href}\n`;
    debug += `Redirect URI: ${window.location.origin}/auth/callback\n`;
    debug += `Is in iframe: ${window.top !== window.self}\n`;
    debug += `User Agent: ${navigator.userAgent}\n`;
    
    setDebugInfo(debug);
    console.log(debug);
  }, []);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("Starting Google Sign-In process...");
      
      // Check if we have Google Calendar credentials configured
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
      
      console.log("Environment check:", {
        hasClientId: !!clientId,
        hasClientSecret: !!clientSecret,
        clientIdLength: clientId?.length || 0
      });
      
      if (!clientId) {
        throw new Error("VITE_GOOGLE_CLIENT_ID is not configured. Please check your .env file.");
      }
      
      if (!clientSecret) {
        throw new Error("VITE_GOOGLE_CLIENT_SECRET is not configured. Please check your .env file.");
      }
      
      console.log("Initiating OAuth flow...");
      
      // Add a small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Initiate Google OAuth flow
      googleCalendarService.initiateOAuth();
      
      // Note: The page will redirect, so code after this won't execute
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message || "An error occurred during sign-in. Please try again.");
      setIsLoading(false);
    }
  };

  const handleGetStarted = () => {
    setIsLoading(true);
    // Simulate loading for better UX
    setTimeout(() => {
      navigate("/onboarding/step1");
    }, 1000);
  };

  const handleShowDebugInfo = () => {
    alert(debugInfo);
  };

  const handleTryAlternativeMethod = () => {
    setError(null);
    
    // Try opening in a new window/tab as an alternative
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError("Google Client ID is not configured.");
      return;
    }

    const redirectUri = `${window.location.origin}/auth/callback`;
    const authParams = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events',
      access_type: 'offline',
      prompt: 'consent',
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${authParams.toString()}`;
    
    // Try opening in new window
    const popup = window.open(authUrl, 'google-auth', 'width=500,height=600,scrollbars=yes,resizable=yes');
    
    if (!popup) {
      setError("Popup blocked. Please allow popups for this site and try again, or use the 'Skip for now' option.");
    } else {
      // Monitor the popup for completion
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          // Refresh the page to check for auth completion
          window.location.reload();
        }
      }, 1000);
    }
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
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
            >
              <div className="font-semibold mb-1">Connection Issue:</div>
              <div className="mb-2">{error}</div>
              <div className="flex gap-2">
                <button
                  onClick={handleTryAlternativeMethod}
                  className="text-xs underline text-red-600 hover:text-red-800"
                >
                  Try Alternative Method
                </button>
                <button
                  onClick={handleShowDebugInfo}
                  className="text-xs underline text-red-600 hover:text-red-800"
                >
                  Show Debug Info
                </button>
              </div>
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
                Connecting...
              </div>
            ) : (
              "Continue with Google"
            )}
          </Button>

          {/* Alternative option */}
          <button
            onClick={handleGetStarted}
            disabled={isLoading}
            className="text-blue-600 font-medium text-center py-1 active:scale-95 transition-all duration-200 disabled:opacity-50"
          >
            Skip for now - Get Started
          </button>

          {/* Debug button for development */}
          {import.meta.env.DEV && (
            <button
              onClick={handleShowDebugInfo}
              className="text-xs text-gray-400 text-center py-1"
            >
              Debug Info
            </button>
          )}

          {/* Privacy notice */}
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            By continuing, you agree to our Terms of Service and Privacy Policy. 
            Connect your Google Calendar to automatically schedule your wellness time.
          </p>

          {/* Troubleshooting note */}
          <div className="mt-2 p-3 bg-blue-50 rounded-xl">
            <p className="text-xs text-blue-700 text-center">
              <strong>Having trouble connecting?</strong><br />
              Make sure popups are enabled, or use "Skip for now\" to explore the app without calendar integration.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};