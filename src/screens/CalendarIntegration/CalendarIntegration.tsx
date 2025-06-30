import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../../components/StatusBar';
import { TabBar } from '../../components/TabBar';
import { CalendarGridView } from '../../components/CalendarGrid';
import { ScheduleActivity } from '../../data/scheduleData';

export const CalendarIntegration: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calendar');

  const handleActivityClick = (activity: ScheduleActivity) => {
    console.log('Activity clicked:', activity);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5]">
      <StatusBar />
      
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-4 bg-white border-b border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Gabie's Schedule</h1>
                <p className="text-sm text-gray-600">
                  June 29 - July 5, 2024
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Calendar Grid Content */}
        <div className="flex-1 overflow-auto">
          <CalendarGridView onActivityClick={handleActivityClick} />
        </div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};