import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { StatusBar } from "../../components/StatusBar";

export const OnboardingStep1 = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([]);

  const calendars = [
    "Work",
    "School run",
    "Family",
    "Events"
  ];

  const toggleCalendar = (calendar: string) => {
    setSelectedCalendars(prev => 
      prev.includes(calendar)
        ? prev.filter(item => item !== calendar)
        : [...prev, calendar]
    );
  };

  const handleNext = () => {
    navigate("/onboarding/step2");
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
            <div className="bg-teal-500 h-1 rounded-full w-1/4"></div>
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
            Which calendars would you like to sync?
          </h2>

          <div className="space-y-4">
            {calendars.map((calendar, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => toggleCalendar(calendar)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedCalendars.includes(calendar)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                    selectedCalendars.includes(calendar)
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}>
                    {selectedCalendars.includes(calendar) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-900 font-medium">{calendar}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom button */}
      <div className="p-6 bg-white border-t border-gray-200">
        <Button
          onClick={handleNext}
          className="w-full h-14 bg-blue-600 text-white rounded-2xl font-semibold text-lg"
        >
          Step 2 of 4
        </Button>
      </div>
    </div>
  );
};