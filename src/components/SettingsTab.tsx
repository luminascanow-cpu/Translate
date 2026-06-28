import React from 'react';
import { User, Languages, Volume2, Shield, Trash2, Heart, RefreshCw, CheckCircle } from 'lucide-react';
import { AppPage } from '../types';

interface SettingsTabProps {
  onNavigate: (tab: AppPage) => void;
  userName: string;
  onSetUserName: (name: string) => void;
  targetLanguage: string;
  onSetTargetLanguage: (lang: string) => void;
  onResetApp: () => void;
}

export default function SettingsTab({ onNavigate, userName, onSetUserName, targetLanguage, onSetTargetLanguage, onResetApp }: SettingsTabProps) {
  const languagesList = ["Hindi", "Marathi", "Bengali", "Tamil", "Telugu"];

  const handleReset = () => {
    if (confirm("Reset application? This will restore preset translations and default state.")) {
      onResetApp();
      alert("App restarted with mock presets successfully!");
      onNavigate('home');
    }
  };

  return (
    <div className="w-full pb-28 animate-fade-in px-4">
      <div className="max-w-[540px] mx-auto py-4 space-y-5">
        
        <h2 className="font-sans font-extrabold text-xl text-gray-900">
          Preferences & Settings
        </h2>

        {/* PROFILE SECTION */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <User className="w-5 h-5 text-[#8f4e00]" />
            <h3 className="font-sans font-extrabold text-sm text-gray-800">
              User Profile
            </h3>
          </div>

          <div className="space-y-1.5">
            <label className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Profile Name
            </label>
            <input 
              type="text"
              value={userName}
              onChange={(e) => onSetUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-sans text-xs focus:outline-hidden focus:ring-1 focus:ring-[#ff9933] focus:border-[#ff9933] text-gray-800 font-bold"
            />
          </div>
        </div>

        {/* LINGUISTICS & TRANSLATIONS SETTINGS */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Languages className="w-5 h-5 text-[#8f4e00]" />
            <h3 className="font-sans font-extrabold text-sm text-gray-800">
              Linguistic Options
            </h3>
          </div>

          <div className="space-y-1.5">
            <label className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Primary Target Translation Language
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {languagesList.map((lang) => {
                const isActive = targetLanguage === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => onSetTargetLanguage(lang)}
                    className={`p-3 rounded-xl text-xs font-bold border transition-all text-center focus:outline-hidden ${
                      isActive 
                        ? 'bg-amber-50 border-[#ff9933] text-[#8f4e00] ring-1 ring-[#ff9933]/30' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ADVANCED INTEGRATIONS INFO */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Volume2 className="w-5 h-5 text-[#8f4e00]" />
            <h3 className="font-sans font-extrabold text-sm text-gray-800">
              Speech Configuration
            </h3>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium leading-relaxed font-sans">
              BhashaSetu is integrated with the Gemini <strong className="text-[#8f4e00]">gemini-3.1-flash-tts-preview</strong> model to offer realistic vocal pronunciations for Indian languages.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 rounded-lg p-2.5">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>Real-time voice modulation is active with standard fallback.</span>
            </div>
          </div>
        </div>

        {/* SYSTEM RESTORATION STORAGE UTILITIES */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Shield className="w-5 h-5 text-rose-600" />
            <h3 className="font-sans font-extrabold text-sm text-rose-800">
              Storage Maintenance
            </h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleReset}
              className="flex-1 py-3 px-4 rounded-xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 font-sans font-bold text-xs flex items-center justify-center gap-1.5 focus:outline-hidden transition-all active:scale-98"
            >
              <RefreshCw className="w-4 h-4" />
              Reset App Presets
            </button>
          </div>
        </div>

        {/* Bottom Credits Footer */}
        <div className="text-center text-gray-400 text-[10px] font-sans font-bold uppercase tracking-widest pt-4">
          BhashaSetu OCR • Proudly Built in India
        </div>

      </div>
    </div>
  );
}
