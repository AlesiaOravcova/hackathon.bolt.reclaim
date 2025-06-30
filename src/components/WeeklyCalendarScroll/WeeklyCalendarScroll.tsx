import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface WeeklyCalendarScrollProps {
  onDateSelect?: (date: Date) => void;
  className?: string;
}

export const WeeklyCalendarScroll: React.FC<WeeklyCalendarScrollProps> = ({
  onDateSelect,
  className = ''
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Generate 7 days starting from currentWeekStart
  const generateWeekDays = (startDate: Date): Date[] => {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const [weekDays, setWeekDays] = useState<Date[]>(() => generateWeekDays(currentWeekStart));

  useEffect(() => {
    setWeekDays(generateWeekDays(currentWeekStart));
  }, [currentWeekStart]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const scrollToPreviousWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newStart);
  };

  const scrollToNextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newStart);
  };

  const formatDate = (date: Date): string => {
    return date.getDate().toString();
  };

  const formatDay = (date: Date): string => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isMonday = (date: Date): boolean => {
    return date.getDay() === 1;
  };

  const isSelected = (date: Date): boolean => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const getButtonStyle = (date: Date): string => {
    if (isSelected(date)) {
      return 'text-blue-600';
    }

  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">

        {/* Calendar container */}
        <div
          ref={scrollContainerRef}
          className="overflow-hidden"
        >
          <motion.div
            key={currentWeekStart.toISOString()}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex gap-2 justify-between"
          >
            {weekDays.map((date, index) => (
              <motion.button
                key={date.toISOString()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onClick={() => handleDateSelect(date)}
                className={`
                  flex-1 min-w-0 h-16 transition-all duration-200 
                  flex flex-col items-center justify-center gap-1 
                  active:scale-95 transform
                  ${getButtonStyle(date)}
                `}
              >
                <span className="text-lg font-bold leading-none">
                  {formatDate(date)}
                </span>
                <span className="text-xs font-medium leading-none">
                  {formatDay(date)}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};