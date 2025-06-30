import React from 'react';

export const BoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-4 z-50 transition-transform duration-200 hover:scale-105"
    >
      <img
        src="https://bolt.new/logo.png"
        alt="Built with Bolt"
        className="w-12 h-12 rounded-full shadow-lg"
        onError={(e) => {
          // Fallback to a simple SVG if the image fails to load
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = document.createElement('div');
          fallback.className = 'w-12 h-12 rounded-full shadow-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg';
          fallback.textContent = 'B';
          target.parentNode?.appendChild(fallback);
        }}
      />
    </a>
  );
};