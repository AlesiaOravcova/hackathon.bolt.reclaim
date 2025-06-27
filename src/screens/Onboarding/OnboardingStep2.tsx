import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { StatusBar } from "../../components/StatusBar";

export const OnboardingStep2 = (): JSX.Element => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [customText, setCustomText] = useState<string>("");

  const options = [
    "I'm always busy with work",
    "My family needs me all the time",
    "Feeling constantly overwhelmed",
    "Chronic fatigue and exhaustion",
    "I feel a bit lonely",
    "Something else (please specify)"
  ];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    // If selecting a different option, hide the input but keep the text
    if (option !== "Something else (please specify)") {
      // Don't clear customText, just hide the input
    }
  };

  const handleNext = () => {
    if (selectedOption && (selectedOption !== "Something else (please specify)" || customText.trim())) {
      navigate("/onboarding/step3");
    }
  };

  const isNextEnabled = () => {
    if (!selectedOption) return false;
    if (selectedOption === "Something else (please specify)") {
      return customText.trim().length > 0;
    }
    return true;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5]">
      <StatusBar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pt-4 sticky top-0 z-10 bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5]"
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/onboarding/step1")}
              className="text-blue-600 font-medium"
            >
              ← Back
            </button>
            <h1 className="text-[17px] font-normal text-gray-900 leading-[22px] tracking-[-0.43px] flex-1 text-right">step 2 of 4</h1>
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
          className="px-6 pb-6"
        >
          <h2 className="text-[22px] font-normal text-gray-900 mb-10 leading-[28px] tracking-[-0.45px]">
            What makes it hardest for you to take time for yourself lately?
          </h2>

          <div className="space-y-6">
            {options.map((option, index) => (
              <div key={index}>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 400,
                    damping: 17
                  }}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full h-[54px] rounded-[16px] border-2 text-left transition-none pointer-events-auto ${
                    selectedOption === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3 px-4">
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

                {/* Conditional Input Field */}
                <AnimatePresence>
                  {selectedOption === option && option === "Something else (please specify)" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <Input
                        placeholder="Please specify..."
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        className="w-full"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom button */}
      <div className="p-6">
        <Button
          onClick={handleNext}
          disabled={!isNextEnabled()}
          className={`w-full h-[54px] rounded-[16px] font-semibold text-lg transition-none pointer-events-auto ${
            isNextEnabled()
              ? "bg-blue-600 text-white"
              : "bg-blue-600 bg-opacity-30 text-white cursor-not-allowed"
          }`}
        >
          Step 3 of 4
        </Button>
      </div>
    </div>
  );
};