import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../../components/StatusBar';
import { googleCalendarService } from '../../services/googleCalendar';

export const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check for direct Google Calendar API OAuth callback
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');
        const error = urlParams.get('error');
        
        // Security: Check for OAuth errors first
        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }
        
        if (code) {
          // Check if we're in a popup window
          if (window.opener && !window.opener.closed) {
            console.log('📨 In popup window, processing OAuth callback...');
            
            // Process the OAuth callback in the popup
            const success = await googleCalendarService.handleOAuthCallback(code, state || undefined);
            
            if (success) {
              console.log('✅ OAuth callback successful in popup');
              // Send success message to parent window
              window.opener.postMessage({ 
                type: 'GOOGLE_AUTH_SUCCESS'
              }, window.location.origin);
              
              // Close the popup
              window.close();
              return;
            } else {
              console.error('❌ OAuth callback failed in popup');
              // Send error message to parent window
              window.opener.postMessage({ 
                type: 'GOOGLE_AUTH_ERROR',
                error: 'Failed to authenticate with Google Calendar'
              }, window.location.origin);
              
              // Close the popup
              window.close();
              return;
            }
          } else {
            console.log('📨 In main window, processing OAuth callback...');
            // We're in the main window - proceed with normal callback handling
            const success = await googleCalendarService.handleOAuthCallback(code, state || undefined);
            
            if (success) {
              console.log('✅ OAuth callback successful in main window');
              // Security: Clear URL parameters to remove sensitive data from browser history
              window.history.replaceState({}, document.title, window.location.pathname);
              // Redirect to onboarding
              navigate('/onboarding/step1');
              return;
            } else {
              throw new Error('Failed to authenticate with Google Calendar');
            }
          }
        }

        // No authentication result found
        if (window.opener && !window.opener.closed) {
          // We're in a popup, send error message to parent and close
          window.opener.postMessage({ 
            type: 'GOOGLE_AUTH_ERROR', 
            error: 'No authentication code received' 
          }, window.location.origin);
          window.close();
          return;
        } else {
          // We're in the main window, redirect to welcome
          navigate('/');
        }
      } catch (error: any) {
        console.error('Auth callback error:', error);
        setError(error.message || 'Authentication failed. Please try again.');
        
        // Security: Clear any potentially sensitive URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
        
        if (window.opener && !window.opener.closed) {
          // We're in a popup, send error message to parent and close
          window.opener.postMessage({ 
            type: 'GOOGLE_AUTH_ERROR', 
            error: error.message || 'Authentication failed' 
          }, window.location.origin);
          window.close();
          return;
        } else {
          // We're in the main window, show error and redirect after delay
          setTimeout(() => {
            navigate('/');
          }, 3000);
        }
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5]">
        <StatusBar />
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center px-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Authentication Error
            </h2>
            <p className="text-gray-600 mb-4">
              {error}
            </p>
            {!window.opener && (
              <p className="text-sm text-gray-500">
                Redirecting you back to the welcome page...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#F1F6FE] to-[#F3FDF5]">
      <StatusBar />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Connecting your account...
          </h2>
          <p className="text-gray-600">
            Please wait while we securely complete your authentication.
          </p>
        </div>
      </div>
    </div>
  );
};