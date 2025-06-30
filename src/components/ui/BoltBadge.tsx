import React from 'react';

export const BoltBadge: React.FC = () => {
  return (
    <div className="fixed top-10 right-4 z-50">
      <a 
        href="https://bolt.new/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block transition-transform duration-200 hover:scale-105"
      >
        <img 
          src="https://bolt.new/logo.png" 
          alt="Powered by Bolt" 
          className="w-12 h-12 opacity-80 hover:opacity-100 transition-opacity duration-200"
        />
      </a>
    </div>
  );
};