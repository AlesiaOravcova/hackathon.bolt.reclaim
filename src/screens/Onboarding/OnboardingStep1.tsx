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
    if (selectedCalendars.length > 0) {
      navigate("/onboarding/step2");
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
          className="px-6 pt-4 sticky top-0 z-10 bg-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 font-medium"
            >
              ← Back
            </button>
            <h1 className="text-[17px] font-semibold text-gray-900 leading-[22px] tracking-[-0.43px]">Welcome to Reclaim</h1>
          </div>

          {/* Progress bar */}
          <div className="flex gap-2.5 mb-6">
            <div className="flex-1 h-2.5 bg-[#00C7BE] rounded-lg"></div>
            <div className="flex-1 h-2.5 bg-[#F3FDF5] rounded-lg"></div>
            <div className="flex-1 h-2.5 bg-[#F3FDF5] rounded-lg"></div>
            <div className="flex-1 h-2.5 bg-[#F3FDF5] rounded-lg"></div>
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-6"
        >
          <h2 className="text-[22px] font-normal text-gray-900 mb-8 leading-[28px] tracking-[-0.45px]">
            Which calendars would you like to sync?
          </h2>

          <div className="space-y-4">
            {calendars.map((calendar, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}
                onClick={() => toggleCalendar(calendar)}
                className={`w-full h-[54px] rounded-[16px] border-2 text-left transition-none pointer-events-auto ${
                  selectedCalendars.includes(calendar)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
                style={{ marginBottom: index < calendars.length - 1 ? '16px' : '0' }}
              >
                <div className="flex items-center gap-3 px-4">
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
      <div className="p-6">
        <Button
          onClick={handleNext}
          disabled={selectedCalendars.length === 0}
          className={`w-full h-[54px] rounded-[16px] font-semibold text-lg transition-none pointer-events-auto ${
            selectedCalendars.length > 0
              ? "bg-blue-600 text-white"
              : "bg-blue-600 bg-opacity-30 text-white cursor-not-allowed"
          }`}
        >
          Step 2 of 4
        </Button>
      </div>
    </div>
  );
};