import React from 'react';

interface BoltBadgeProps {
  className?: string;
}

export const BoltBadge: React.FC<BoltBadgeProps> = ({ className = '' }) => {
  return (
    <div className={`fixed top-10 right-4 z-50 ${className}`}>
      <img 
        src="/white_circle_360x360.png" 
        alt="Powered by Bolt" 
        className="w-12 h-12 opacity-80 hover:opacity-100 transition-opacity duration-200"
      />
    </div>
  );
};