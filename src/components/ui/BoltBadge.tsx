import React, { useState } from 'react';

export const BoltBadge: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <a 
      href="https://bolt.new/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed top-4 right-4 z-50 transition-transform duration-200 hover:scale-105"
    >
      <div className="w-12 h-12 rounded-full shadow-lg bg-white flex items-center justify-center overflow-hidden">
        {!imageError ? (
          <img 
            src="/ReclaimLogo.svg"
            alt="Bolt Logo" 
            className="w-8 h-8 object-contain"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            B
          </div>
        )}
      </div>
    </a>
  );
};