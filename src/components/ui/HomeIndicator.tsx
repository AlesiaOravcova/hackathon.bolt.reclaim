import React from 'react';

export const HomeIndicator: React.FC = () => {
  return (
    <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50">
      <div className="w-32 h-1 bg-black bg-opacity-30 rounded-full"></div>
    </div>
  );
};