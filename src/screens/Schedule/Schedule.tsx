import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BoltBadge } from "../../components/ui";
import { TabBar } from "../../components/TabBar";
import { StatusBar } from "../../components/StatusBar";
import { EventCard } from "../../components/Calendar";
import { useGoogleCalendar } from "../../hooks/useGoogleCalendar";
import { CalendarEvent } from "../../services/googleCalendar";

export const Schedule = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('work');

  const {
    isAuthenticated,
    events,
    selectedCalendars,
    isLoading,
    error,
    fetchEvents,
  } = useGoogleCalendar();

  // Category filter options
  const categories = [
    { id: 'work', label: 'Work', color: '#3B82F6' },
    { id: 'school', label: 'School run', color: '#10B981' },
    { id: 'family', label: 'Family', color: '#F59E0B' },
  ];

  // Fetch events when component mounts or when authentication/calendars change
  useEffect(() => {
    if (isAuthenticated && selectedCalendars.length > 0) {
      fetchEvents();
    }
  }, [isAuthenticated, selectedCalendars.length, fetchEvents]);

  // Filter events based on active category
  const filteredEvents = events.filter(event => {
    if (activeCategoryFilter === 'all') return true;
    return event.category === activeCategoryFilter;
  });

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategoryFilter(categoryId);
  };

  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Calendar</h3>
          <p className="text-gray-600 text-center mb-4">
            Connect your Google Calendar to view and manage your events
          </p>
          <button
            onClick={() => navigate("/calendar")}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium"
          >
            Connect Calendar
          </button>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Events</h3>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={() => fetchEvents()}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-medium"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (filteredEvents.length === 0) {
      const categoryLabel = categories.find(cat => cat.id === activeCategoryFilter)?.label || activeCategoryFilter;
      return (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No {categoryLabel} Events</h3>
          <p className="text-gray-600 text-center">
            No events found for the selected category. Try selecting a different category or add new events.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <EventCard
              event={event}
              showDate={true}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5]">
      {/* Bolt Badge */}
      <BoltBadge />
      
      <StatusBar />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-6 bg-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          </div>

          {/* Category Filter Tags */}
          <div className="flex gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-2xl font-medium text-sm transition-all duration-200 ${
                  activeCategoryFilter === category.id
                    ? 'text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: activeCategoryFilter === category.id ? category.color : undefined,
                }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Events List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-6 py-4 pb-20"
        >
          {renderContent()}
        </motion.div>
      </div>

      <TabBar activeTab="Calendar" onTabChange={() => {}} />
    </div>
  );
};