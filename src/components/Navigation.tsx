import React from 'react';
import { Home, History, Camera, BookOpen, Settings } from 'lucide-react';
import { AppPage } from '../types';

interface NavigationProps {
  currentTab: AppPage;
  onNavigate: (tab: AppPage) => void;
}

export default function Navigation({ currentTab, onNavigate }: NavigationProps) {
  const tabs: Array<{ id: AppPage; label: string; icon: any; highlight?: boolean }> = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'history', label: 'History', icon: History },
    { id: 'ocr', label: 'Scan', icon: Camera, highlight: true },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pt-2 pb-6 bg-white border-t border-gray-100 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] rounded-t-xl h-20 max-w-screen-xl mx-auto left-0 right-0">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        // In our app, Scan tab can transition to "results" tab, so we highlight the Scan button for both 'ocr' and 'results' page
        const isActive = currentTab === tab.id || (tab.id === 'ocr' && currentTab === 'results');

        if (tab.highlight) {
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center rounded-full px-5 py-1.5 active:scale-90 transition-all duration-200 focus:outline-hidden ${
                isActive 
                  ? 'bg-[#ff9933] text-white shadow-md shadow-orange-500/15' 
                  : 'text-gray-500 hover:text-[#8f4e00]'
              }`}
              title={tab.label}
              id={`nav-tab-${tab.id}`}
            >
              <Icon className="w-6 h-6" />
              <span className="font-sans text-[11px] font-bold mt-0.5">{tab.label}</span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center text-gray-400 hover:text-[#8f4e00] transition-all active:scale-90 duration-200 focus:outline-hidden ${
              isActive ? 'text-[#8f4e00] font-semibold' : ''
            }`}
            title={tab.label}
            id={`nav-tab-${tab.id}`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="font-sans text-[11px] mt-1">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
