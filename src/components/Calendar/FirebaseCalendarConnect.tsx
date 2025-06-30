import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { GoogleIcon } from '../icons';

interface FirebaseCalendarConnectProps {
  onConnect: () => void;
  isLoading?: boolean;
}

export const FirebaseCalendarConnect: React.FC<FirebaseCalendarConnectProps> = ({ 
  onConnect, 
  isLoading = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
        Connect Your Calendar
      </h2>
      
      <p className="text-gray-600 text-center mb-8 leading-relaxed">
        Sign in with Google to sync your calendar and automatically schedule your wellness activities around your existing commitments.
      </p>

      <div className="w-full max-w-sm space-y-4">
        <Button
          onClick={onConnect}
          disabled={isLoading}
          className="w-full h-14 bg-white border-2 border-gray-200 text-gray-900 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
        >
          <GoogleIcon className="w-6 h-6" />
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Secure authentication powered by Firebase
          </p>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 rounded-2xl p-4 w-full max-w-sm">
        <h3 className="font-semibold text-blue-900 mb-2">What we'll do:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Securely authenticate with Google</li>
          <li>• View your existing calendar events</li>
          <li>• Find free time for wellness activities</li>
          <li>• Add new wellness events to your calendar</li>
          <li>• Send gentle reminders for your me-time</li>
        </ul>
      </div>
    </motion.div>
  );
};