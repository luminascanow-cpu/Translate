import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { AppPage } from '../types';
import { Capacitor } from '@capacitor/core';

interface HeaderProps {
  currentTab: AppPage;
  onNavigate: (tab: AppPage) => void;
  title?: string;
  userName?: string;
}

export default function Header({ currentTab, onNavigate, title = "Bashasethu", userName = "Arpita" }: HeaderProps) {
  const isNative = Capacitor.isNativePlatform();
  
  return (
    <header className={`w-full top-0 sticky bg-white shadow-xs border-b border-gray-100 z-50 transition-colors ${isNative ? 'pt-8' : ''}`}>
      <div className="flex items-center justify-between px-4 h-16 w-full max-w-screen-xl mx-auto">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('settings')}
            className="active:scale-95 duration-150 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-hidden"
            title="Open Settings"
            id="btn-header-settings"
          >
            <Menu className="w-6 h-6 text-[#8f4e00]" />
          </button>
          
          <div className="flex flex-col">
            <h1 
              onClick={() => onNavigate('home')}
              className="font-sans font-extrabold text-2xl text-[#8f4e00] tracking-tight cursor-pointer hover:opacity-90 active:scale-98 transition-transform select-none"
              id="header-brand-title"
            >
              {title}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">

          <button 
            onClick={() => alert(`You have no unread notifications. Stay tuned for bilingual updates!`)}
            className="active:scale-95 duration-150 p-2 rounded-full hover:bg-gray-100 transition-colors relative focus:outline-hidden"
            title="Notifications"
            id="btn-header-notifications"
          >
            <Bell className="w-6 h-6 text-[#8f4e00]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
