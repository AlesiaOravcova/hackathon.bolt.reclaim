import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../../components/StatusBar';
import { TabBar } from '../../components/TabBar';
import { FirebaseCalendarConnect } from '../../components/Calendar/FirebaseCalendarConnect';
import { CalendarSelector, CalendarView } from '../../components/Calendar';
import { useFirebaseGoogleCalendar } from '../../hooks/useFirebaseGoogleCalendar';

export const FirebaseCalendarIntegration: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('calendar');
  const [setupStep, setSetupStep] = useState<'connect' | 'select' | 'view'>('connect');
  
  const {
    isAuthenticated,
    user,
    calendars,
    events,
    selectedCalendars,
    isLoading,
    error,
    signInWithGoogle,
    fetchCalendars,
    fetchEvents,
    selectCalendars,
    createEvent,
    updateEvent,
    deleteEvent,
    signOut,
    refreshEvents,
  } = useFirebaseGoogleCalendar();

  useEffect(() => {
    if (isAuthenticated) {
      if (calendars.length === 0) {
        fetchCalendars();
      }
      if (selectedCalendars.length > 0) {
        setSetupStep('view');
        fetchEvents();
      } else if (calendars.length > 0) {
        setSetupStep('select');
      }
    }
  }, [isAuthenticated, calendars.length, selectedCalendars.length]);

  const handleGoogleSignIn = async () => {
    const success = await signInWithGoogle();
    if (success) {
      setSetupStep('select');
      fetchCalendars();
    }
  };

  const handleCalendarSelection = (calendarIds: string[]) => {
    selectCalendars(calendarIds);
    setSetupStep('view');
    fetchEvents();
  };

  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect your Google Calendar?')) {
      signOut();
      setSetupStep('connect');
    }
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connection Error</h3>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Try Again
          </button>
        </div>
      );
    }

    switch (setupStep) {
      case 'connect':
        return <FirebaseCalendarConnect onConnect={handleGoogleSignIn} isLoading={isLoading} />;
      
      case 'select':
        return (
          <CalendarSelector
            calendars={calendars}
            selectedCalendars={selectedCalendars}
            onSelectionChange={selectCalendars}
            onContinue={() => handleCalendarSelection(selectedCalendars)}
            isLoading={isLoading}
          />
        );
      
      case 'view':
        return (
          <CalendarView
            events={events}
            calendars={calendars}
            selectedCalendars={selectedCalendars}
            onCreateEvent={createEvent}
            onUpdateEvent={updateEvent}
            onDeleteEvent={deleteEvent}
            onRefresh={refreshEvents}
            isLoading={isLoading}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5]">
      <StatusBar />
      
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        {setupStep === 'view' && (
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
                  <h1 className="text-xl font-bold text-gray-900">My Calendar</h1>
                  <p className="text-sm text-gray-600">
                    {user?.displayName || user?.email} • {selectedCalendars.length} calendar{selectedCalendars.length !== 1 ? 's' : ''} connected
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleDisconnect}
                className="text-red-600 text-sm font-medium"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>

      {setupStep === 'view' && (
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
};