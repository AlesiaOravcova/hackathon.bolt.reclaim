import React from 'react';

export const BoltBadge: React.FC = () => {
  return (
    <a
      href="https://bolt.new/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-10 right-4 z-50 transition-transform duration-200 hover:scale-105"
    >
      <img
        src="https://imagedelivery.net/3RKw_J_fJQ_4KpJP3_YgXA/a24bb2c9-f4d2-4991-9cd9-5a82f74c2300/public"
        alt="Powered by Bolt"
        className="w-12 h-12 rounded-full shadow-lg"
      />
    </a>
  );
};