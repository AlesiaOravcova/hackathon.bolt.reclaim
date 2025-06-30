import React from 'react';

export const BoltBadge: React.FC = () => {
  return (
    <a 
      href="https://bolt.new/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed top-4 right-4 z-50 transition-transform duration-200 hover:scale-105"
    >
      <div className="w-12 h-12 rounded-full shadow-lg bg-transparent flex items-center justify-center overflow-hidden">
        <img 
          src="/white_circle_360x360 copy.png" 
          alt="Bolt Badge" 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to blue circle with "B" if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.className = "w-12 h-12 rounded-full shadow-lg bg-blue-600 flex items-center justify-center overflow-hidden";
              parent.innerHTML = '<span class="text-white font-bold text-lg">B</span>';
            }
          }}
        />
      </div>
    </a>
  );
};