import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { StatusBar } from "../../components/StatusBar";
import { CalendarConnect, CalendarSelector } from "../../components/Calendar";
import { useGoogleCalendar } from "../../hooks/useGoogleCalendar";

export const OnboardingCalendar = (): JSX.Element => {
  const navigate = useNavigate();
  const [setupStep, setSetupStep] = useState<'connect' | 'select' | 'complete'>('connect');
  
  const {
    isAuthenticated,
    calendars,
    selectedCalendars,
    isLoading,
    error,
    initiateAuth,
    handleAuthCallback,
    fetchCalendars,
    selectCalendars,
  } = useGoogleCalendar();

  useEffect(() => {
    // Check for OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      handleAuthCallback(code).then(success => {
        if (success) {
          // Clear URL parameters
          window.history.replaceState({}, document.title, window.location.pathname);
          setSetupStep('select');
          fetchCalendars();
        }
      });
    } else if (isAuthenticated) {
      if (calendars.length === 0) {
        fetchCalendars();
      }
      if (selectedCalendars.length > 0) {
        setSetupStep('complete');
      } else if (calendars.length > 0) {
        setSetupStep('select');
      }
    }
  }, [isAuthenticated, calendars.length, selectedCalendars.length]);

  const handleCalendarSelection = (calendarIds: string[]) => {
    selectCalendars(calendarIds);
    setSetupStep('complete');
  };

  const handleSkip = () => {
    navigate("/onboarding/step1");
  };

  const handleContinue = () => {
    navigate("/onboarding/step1");
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connection Error</h3>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <div className="flex gap-3">
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Try Again
            </Button>
            <Button
              onClick={handleSkip}
              variant="outline"
              className="border-gray-300 text-gray-700 px-4 py-2 rounded-xl"
            >
              Skip for Now
            </Button>
          </div>
        </div>
      );
    }

    switch (setupStep) {
      case 'connect':
        return (
          <div className="px-6 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                Let's connect your calendar first
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We'll sync with your Google Calendar to find the perfect times for your wellness activities around your existing commitments.
              </p>
            </motion.div>

            <CalendarConnect onConnect={initiateAuth} isLoading={isLoading} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <button
                onClick={handleSkip}
                className="text-gray-500 font-medium underline"
              >
                Skip for now (you can connect later)
              </button>
            </motion.div>
          </div>
        );
      
      case 'select':
        return (
          <div className="px-6 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Great! Now select your calendars
              </h2>
              <p className="text-gray-600">
                Choose which calendars we should check when finding time for your wellness activities.
              </p>
            </motion.div>

            <CalendarSelector
              calendars={calendars}
              selectedCalendars={selectedCalendars}
              onSelectionChange={selectCalendars}
              onContinue={() => handleCalendarSelection(selectedCalendars)}
              isLoading={isLoading}
            />
          </div>
        );
      
      case 'complete':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Calendar Connected! 🎉
            </h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              Perfect! We've connected {selectedCalendars.length} calendar{selectedCalendars.length !== 1 ? 's' : ''}. 
              Now we can intelligently find time for your wellness activities.
            </p>

            <div className="bg-blue-50 rounded-2xl p-4 mb-8">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next:</h3>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• We'll analyze your calendar for free time slots</li>
                <li>• Suggest optimal times for wellness activities</li>
                <li>• Automatically schedule your me-time</li>
                <li>• Send gentle reminders when it's time to relax</li>
              </ul>
            </div>

            <Button
              onClick={handleContinue}
              className="w-full h-14 bg-blue-600 text-white rounded-2xl font-semibold text-lg"
            >
              Continue Setup
            </Button>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <StatusBar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-4 bg-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 font-medium"
            >
              ← Back
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Welcome to Reclaim</h1>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-1 mb-6">
            <div className="bg-teal-500 h-1 rounded-full w-0"></div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};