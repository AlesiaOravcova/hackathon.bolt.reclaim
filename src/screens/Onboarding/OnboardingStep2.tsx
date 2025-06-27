import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { StatusBar } from "../../components/StatusBar";

export const OnboardingStep2 = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");

  const options = [
    "I'm always busy with work",
    "My family needs me all the time",
    "Feeling constantly overwhelmed",
    "Chronic fatigue and exhaustion",
    "I feel a bit lonely",
    "Something else (please specify)"
  ];

  const handleNext = () => {
    if (selectedOption) {
      navigate("/onboarding/step3");
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
          className="px-6 py-4 bg-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/onboarding/step1")}
              className="text-blue-600 font-medium"
            >
              ← Back
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Welcome to Reclaim</h1>
          </div>

          {/* Progress bar */}
          <div className="flex gap-2.5 mb-6">
            <div className="flex-1 h-2.5 bg-[#00C7BE] rounded-lg"></div>
            <div className="flex-1 h-2.5 bg-[#00C7BE] rounded-lg"></div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-tight">
            What makes it hardest for you to take time for yourself lately?
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
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedOption === option
                      ? "border-blue-500 bg-blue-500"
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
          onClick={handleNext}
          disabled={!selectedOption}
          className={`w-full h-14 rounded-2xl font-semibold text-lg ${
            selectedOption
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-400"
          }`}
        >
          Step 3 of 4
        </Button>
      </div>
    </div>
  );
};