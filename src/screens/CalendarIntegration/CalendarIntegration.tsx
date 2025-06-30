import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../../components/StatusBar';
import { TabBar } from '../../components/TabBar';
import { Button } from '../../components/ui/button';
import { WeeklyScheduleView } from '../../components/WeeklySchedule';
import { CalendarGridView } from '../../components/CalendarGrid';
import { ScheduleActivity } from '../../data/scheduleData';

export const CalendarIntegration: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calendar');
  const [viewMode, setViewMode] = useState<'grid' | 'schedule' | 'integration'>('grid');

  const handleActivityClick = (activity: ScheduleActivity) => {
    console.log('Activity clicked:', activity);
    // You can add more functionality here, like opening a modal or navigating to details
  };

  const renderIntegrationView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
        Calendar Integration Unavailable
      </h2>
      
      <p className="text-gray-600 text-center mb-8 leading-relaxed">
        Calendar integration has been disabled. You can still view Gabie's sample schedule and track wellness activities manually.
      </p>

      <div className="w-full max-w-sm space-y-4">
        <Button
          onClick={() => setViewMode('grid')}
          className="w-full h-14 bg-blue-600 text-white rounded-2xl font-semibold text-lg"
        >
          View Calendar Grid
        </Button>

        <Button
          onClick={() => setViewMode('schedule')}
          variant="outline"
          className="w-full h-14 border-gray-300 text-gray-700 rounded-2xl font-semibold text-lg"
        >
          View Weekly Schedule
        </Button>

        <Button
          onClick={() => navigate('/dashboard')}
          variant="outline"
          className="w-full h-14 border-gray-300 text-gray-700 rounded-2xl font-semibold text-lg"
        >
          Back to Dashboard
        </Button>
      </div>

      <div className="mt-8 bg-blue-50 rounded-2xl p-4 w-full max-w-sm">
        <h3 className="font-semibold text-blue-900 mb-2">What you can still do:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
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
                <h1 className="text-xl font-bold text-gray-900">Calendar</h1>
                <p className="text-sm text-gray-600">
                  {viewMode === 'grid' ? "Calendar Grid View" : 
                   viewMode === 'schedule' ? "Gabie's Sample Schedule" : 
                   "Calendar integration is not available"}
                </p>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📅 Grid
              </button>
              <button
                onClick={() => setViewMode('schedule')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'schedule'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📋 Schedule
              </button>
              <button
                onClick={() => setViewMode('integration')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {viewMode === 'grid' && (
            <CalendarGridView onActivityClick={handleActivityClick} />
          )}
          {viewMode === 'schedule' && (
            <WeeklyScheduleView onActivityClick={handleActivityClick} />
          )}
          {viewMode === 'integration' && renderIntegrationView()}
        </div>
      </div>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};