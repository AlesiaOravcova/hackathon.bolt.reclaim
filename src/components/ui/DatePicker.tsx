import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DatePickerProps {
  selectedDays: string[];
  onDaysChange: (days: string[]) => void;
  isVisible: boolean;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDays,
  onDaysChange,
  isVisible
}) => {
  const toggleDay = (day: string) => {
    const newSelection = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];
    
    onDaysChange(newSelection);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="flex gap-2">
            {DAYS.map((day, index) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`flex-1 h-[54px] rounded-[16px] border-2 text-center transition-all font-medium ${
                  selectedDays.includes(day)
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-900"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};