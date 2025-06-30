import React from "react";

export const StatusBar = (): JSX.Element => {
  return (
    <div className="flex justify-between items-center px-6 pt-3 pb-1 text-black relative">
      <span className="text-sm font-semibold">8:23</span>
      <div className="flex items-center gap-1">
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-black rounded-full"></div>
          <div className="w-1 h-1 bg-black rounded-full"></div>
          <div className="w-1 h-1 bg-black rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
        <div className="ml-2 w-6 h-3 border border-black rounded-sm">
          <div className="w-4 h-1.5 bg-black rounded-sm m-0.5"></div>
        </div>
      </div>
      
      {/* Bolt Badge */}
      <div className="absolute top-8 right-6">
        <img 
          src="/white_circle_360x360.png" 
          alt="Powered by Bolt" 
          className="w-8 h-8 opacity-80 hover:opacity-100 transition-opacity duration-200"
        />
      </div>
    </div>
  );
};