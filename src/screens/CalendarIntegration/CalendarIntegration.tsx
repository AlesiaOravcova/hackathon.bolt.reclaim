import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../../components/StatusBar';
import { TabBar } from '../../components/TabBar';
import { Button } from '../../components/ui/button';
import { WeeklyScheduleView } from '../../components/WeeklySchedule';
import { ScheduleActivity } from '../../data/scheduleData';

export const CalendarIntegration: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calendar');
  const [viewMode, setViewMode] = useState<'schedule' | 'integration'>('schedule');

  const handleActivityClick = (activity: ScheduleActivity) => {
    console.log('Activity clicked:', activity);
    // You can add more functionality here, like opening a modal or navigating to details
  };

  const renderIntegrationView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-8 px-6 h-full"
    >
      <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
        Calendar Integration Unavailable
      </h2>
      
      <p className="text-gray-600 text-center mb-6 leading-relaxed text-sm">
        Calendar integration has been disabled. You can still view Gabie's sample schedule and track wellness activities manually.
      </p>

      <div className="w-full max-w-xs space-y-3">
        <Button
          onClick={() => setViewMode('schedule')}
          className="w-full h-12 bg-blue-600 text-white rounded-xl font-semibold"
        >
          View Sample Schedule
        </Button>

        <Button
          onClick={() => navigate('/dashboard')}
          variant="outline"
          className="w-full h-12 border-gray-300 text-gray-700 rounded-xl font-semibold"
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="mt-6 bg-blue-50 rounded-xl p-4 w-full max-w-xs">
        <h3 className="font-semibold text-blue-900 mb-2 text-sm">What you can still do:</h3>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• View Gabie's sample weekly schedule</li>
          <li>• Track your progress and streaks</li>
          <li>• Set personal reminders</li>
          <li>• View your wellness dashboard</li>
        </ul>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5]">
      <StatusBar />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3 bg-white border-b border-gray-200 flex-shrink-0"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Calendar</h1>
                <p className="text-xs text-gray-600">
                  {viewMode === 'schedule' ? "Gabie's Sample Schedule" : "Integration unavailable"}
                </p>
              </div>
            </div>
            
            {/* Compact View Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('schedule')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  viewMode === 'schedule'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📅 Schedule
              </button>
              <button
                onClick={() => setViewMode('integration')}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  viewMode === 'integration'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🔗 Integration
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content - Takes remaining space */}
        <div className="flex-1 overflow-hidden">
          {viewMode === 'schedule' ? (
            <WeeklyScheduleView onActivityClick={handleActivityClick} />
          ) : (
            renderIntegrationView()
          )}
        </div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};