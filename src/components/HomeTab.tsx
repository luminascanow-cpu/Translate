import React, { useState } from 'react';
import { Camera, TrendingUp, BookOpen, ChevronRight, Bookmark, BookmarkCheck, Star, Type, Loader2 } from 'lucide-react';
import { AppPage, TranslationItem } from '../types';

interface HomeTabProps {
  userName: string;
  onNavigate: (tab: AppPage) => void;
  onSelectSavedItem: (item: TranslationItem) => void;
  recentHistory: TranslationItem[];
  sourceLanguage?: string;
  targetLanguage?: string;
}

export default function HomeTab({ userName, onNavigate, onSelectSavedItem, recentHistory, sourceLanguage = 'Hindi', targetLanguage = 'English' }: HomeTabProps) {
  const [favoriteDailyWord, setFavoriteDailyWord] = useState(false);
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleQuickTranslate = async () => {
    if (!textToTranslate.trim()) return;
    setIsTranslating(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      
      const response = await fetch(`${backendUrl}/api/quick-translate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToTranslate,
          sourceLanguage
        })
      });
      
      const data = await response.json();
      const text = data.translated || data.error || "Error translating";
      setTranslatedText(text.trim());
    } catch (e) {
      console.error(e);
      setTranslatedText("Failed to translate. Try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  // Determine what to show in the recent list
  const listToRender = recentHistory.slice(0, 3);

  return (
    <div className="w-full pb-28 animate-fade-in px-4">
      <div className="max-w-screen-xl mx-auto py-6 space-y-6">
        
        {/* Primary Action Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Saffron Action Card: Translate Now */}
          <div 
            className="md:col-span-12 bg-white border border-gray-100 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-[200px] shadow-sm hover:shadow-md transition-all group cursor-pointer"
            onClick={() => onNavigate('ocr')}
            id="card-hero-translate"
          >
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none bg-radial from-[#ff9933]/40 to-transparent"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#ff9933]/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[#ffdcc2] p-2 rounded-lg text-[#8f4e00] w-fit">
                  <Camera className="w-5 h-5 stroke-[2.5px]" />
                </div>
                <span className="font-sans text-xs font-bold text-[#8f4e00] tracking-wider uppercase">
                  Smart OCR Engine
                </span>
              </div>
              <h3 className="font-sans font-extrabold text-2xl text-gray-900 max-w-xs leading-snug">
                Instantly translate script using your lens
              </h3>
            </div>

            <div className="relative z-10 flex">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('ocr');
                }}
                className="bg-[#ff9933] hover:bg-[#ff8800] text-white font-extrabold px-6 py-3 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-md hover:shadow-lg border-b-2 border-orange-700/30 focus:outline-hidden w-fit"
              >
                <Camera className="w-5 h-5 fill-white/10" />
                Translate Now
              </button>
            </div>
          </div>
        </div>

        {/* Quick Translate */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm mt-2">
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-[#8f4e00]" />
            <h3 className="font-sans font-extrabold text-lg text-gray-900">Quick Translate to {sourceLanguage}</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              value={textToTranslate}
              onChange={(e) => setTextToTranslate(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuickTranslate()}
              placeholder={`Type in ${targetLanguage}...`}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-sans text-sm focus:outline-hidden focus:ring-2 focus:ring-[#ff9933]/50 focus:border-[#ff9933]"
            />
            <button 
              onClick={handleQuickTranslate}
              disabled={isTranslating || !textToTranslate.trim()}
              className="bg-[#056e00] hover:bg-[#045600] disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-xl font-sans font-bold shadow-md active:scale-95 transition-all flex items-center justify-center min-w-[120px]"
            >
              {isTranslating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Translate"}
            </button>
          </div>
          {translatedText && (
            <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
              <p className="font-sans font-bold text-lg text-emerald-900 select-all">{translatedText}</p>
            </div>
          )}
        </div>

        {/* Recent Translations & Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
          
          {/* Recent Translations List */}
          <div className="md:col-span-12 space-y-4" id="section-recent-translations">
            <div className="flex justify-between items-center">
              <h4 className="font-sans font-extrabold text-lg text-gray-900">
                Recent Translations
              </h4>
              <button 
                onClick={() => onNavigate('history')}
                className="text-[#ff9933] font-sans font-bold text-xs hover:underline uppercase tracking-wider focus:outline-hidden"
              >
                View All
              </button>
            </div>

            {listToRender.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Camera className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-gray-600 font-semibold mb-2">No Translations Yet</h4>
                <p className="text-gray-500 text-sm max-w-xs">
                  Use the camera to scan and translate text to start building your history.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {listToRender.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => onSelectSavedItem(item)}
                    className="bg-white border border-gray-100 border-l-4 border-l-[#ff9933] p-4 rounded-xl flex items-center justify-between hover:bg-gray-50/50 cursor-pointer active:scale-99 transition-all shadow-xs"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200/50">
                        <img 
                          className="w-full h-full object-cover" 
                          src={item.sceneryUrl || "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=200"} 
                          alt="Scanned text scenery"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="font-sans font-bold text-sm text-gray-900 select-all line-clamp-2">
                          {item.translatedText}
                        </p>
                        <p className="font-sans text-xs text-gray-500 select-all mt-0.5 line-clamp-1">
                          {item.sourceText}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#ff9933]" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile context */}
      <button 
        onClick={() => onNavigate('ocr')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#ff9933] hover:bg-[#ff8800] text-white rounded-full shadow-lg flex items-center justify-center md:hidden active:scale-90 transition-transform z-40 focus:outline-hidden cursor-pointer"
        title="Quick OCR Scan"
      >
        <Camera className="w-6 h-6 stroke-[2.5px]" />
      </button>
    </div>
  );
}
