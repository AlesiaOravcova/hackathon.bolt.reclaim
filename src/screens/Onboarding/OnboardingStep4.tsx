import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { StatusBar } from "../../components/StatusBar";

export const OnboardingStep4 = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const options = [
    "Everyday (Mon-Sun)",
    "Every weekday (Mon-Fri)",
    "I'd like to choose",
    "I don't want gentle reminders for now"
  ];

  const handleComplete = () => {
    // Save onboarding data and navigate to dashboard
    navigate("/dashboard");
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
              onClick={() => navigate("/onboarding/step3")}
              className="text-green-600 font-medium"
            >
              ← Back
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Welcome to Reclaim</h1>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-1 mb-6">
            <div className="bg-emerald-500 h-1 rounded-full w-full"></div>
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
            When would you like gentle reminders when we find time for you?
          </h2>

          <div className="space-y-4">
            {options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setSelectedOption(option)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedOption === option
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === option
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300"
                  }`}>
                    {selectedOption === option && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-gray-900 font-medium">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom button */}
      <div className="p-6 bg-white border-t border-gray-200">
        <Button
          onClick={handleComplete}
          disabled={!selectedOption}
          className={`w-full h-14 rounded-2xl font-semibold text-lg ${
            selectedOption
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          All done!
        </Button>
      </div>
    </div>
  );
};