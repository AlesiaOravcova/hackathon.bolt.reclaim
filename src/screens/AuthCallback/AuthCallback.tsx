import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../../components/StatusBar';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This component handles the OAuth callback
    // The actual logic is handled in CalendarIntegration component
    navigate('/calendar');
  }, [navigate]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <StatusBar />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Connecting your calendar...
          </h2>
          <p className="text-gray-600">
            Please wait while we set up your Google Calendar integration.
          </p>
        </div>
      </div>
    </div>
  );
};