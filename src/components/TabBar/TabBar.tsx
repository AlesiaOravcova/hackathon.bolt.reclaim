import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TabBar = ({ activeTab, onTabChange }: TabBarProps): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      id: "Me time",
      label: "Me time",
      path: "/dashboard",
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? "text-blue-600" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      ),
    },
    {
      id: "Calendar",
      label: "Calendar",
      path: "/schedule",
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? "text-blue-600" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
        </svg>
      ),
    },

    {
      id: "Settings",
      label: "Settings",
      path: "/profile",
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? "text-blue-600" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
    },
  ];

  const handleTabPress = (tab: any) => {
    onTabChange(tab.id);
    navigate(tab.path);
  };

  const getCurrentTab = () => {
    const currentPath = location.pathname;
    return tabs.find(tab => tab.path === currentPath)?.id || "Your me time";
  };

  const currentActiveTab = getCurrentTab();

  return (
    <div className="bg-white border-t border-gray-200 px-6 py-2 safe-area-bottom">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = currentActiveTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabPress(tab)}
              className="flex flex-col items-center py-2 px-3 min-w-0 flex-1"
            >
              {tab.icon(isActive)}
              <span className={`text-xs mt-1 font-medium ${
                isActive ? "text-blue-600" : "text-gray-400"
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};