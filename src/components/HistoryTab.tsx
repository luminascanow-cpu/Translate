import React, { useState } from 'react';
import { Search, Heart, Trash2, Calendar, Sparkles, BookOpen, ChevronRight, HelpCircle } from 'lucide-react';
import { AppPage, TranslationItem } from '../types';

interface HistoryTabProps {
  onNavigate: (tab: AppPage) => void;
  history: TranslationItem[];
  onSelectSavedItem: (item: TranslationItem) => void;
  onDeleteHistoryItem: (id: string) => void;
  onToggleFavorite: (item: TranslationItem) => void;
}

export default function HistoryTab({ onNavigate, history, onSelectSavedItem, onDeleteHistoryItem, onToggleFavorite }: HistoryTabProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState(false);

  // Filter history based on search and filters
  const filteredHistory = history.filter((item) => {
    const matchesSearch = 
      item.sourceText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.translatedText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.transliteration.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterFavoritesOnly) {
      return matchesSearch && item.isFavorite;
    }
    return matchesSearch;
  });

  return (
    <div className="w-full pb-28 animate-fade-in px-4">
      <div className="max-w-[640px] mx-auto py-4 space-y-5">
        
        {/* Title */}
        <div className="flex justify-between items-center">
          <h2 className="font-sans font-extrabold text-xl text-gray-900">
            Translation Log
          </h2>
          <span className="font-sans text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-sm border border-gray-200/50 font-bold">
            Total Scans: {history.length}
          </span>
        </div>

        {/* Search and Filters Segment */}
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search translation history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200/60 rounded-xl font-sans text-xs focus:outline-hidden focus:ring-1 focus:ring-[#ff9933] focus:border-[#ff9933]"
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setFilterFavoritesOnly(!filterFavoritesOnly)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 focus:outline-hidden ${
              filterFavoritesOnly 
                ? 'bg-amber-50 text-[#8f4e00] border-amber-200' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Heart className={`w-4 h-4 ${filterFavoritesOnly ? 'fill-[#ff9933] text-[#ff9933]' : ''}`} />
            Favorites Only
          </button>
        </div>

        {/* History List */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-3">
            {filteredHistory.map((item) => (
              <div 
                key={item.id}
                onClick={() => onSelectSavedItem(item)}
                className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-between hover:bg-gray-50/50 transition-all shadow-xs cursor-pointer active:scale-[0.99] group relative overflow-hidden"
              >
                <div className="flex items-center gap-4 flex-1 mr-2">
                  
                  {/* Small crop thumbnail */}
                  <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                    <img 
                      src={item.sceneryUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=150"} 
                      className="w-full h-full object-cover" 
                      alt="Thumbnail crop"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Main text metadata */}
                  <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold text-[#ff9933] uppercase">
                        {item.targetLang}
                      </span>
                      <span className="text-[9px] text-gray-400 flex items-center gap-0.5">
                        <Calendar className="w-3 h-3" />
                        {item.timestamp}
                      </span>
                    </div>
                    
                    <h3 className="font-sans font-extrabold text-sm text-gray-900 truncate">
                      "{item.translatedText}"
                    </h3>
                    <p className="font-sans text-xs text-gray-500 truncate italic">
                      {item.sourceText}
                    </p>
                  </div>
                </div>

                {/* Favorite & Delete Buttons on Right */}
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => onToggleFavorite(item)}
                    className={`p-2 rounded-lg border transition-all focus:outline-hidden ${
                      item.isFavorite 
                        ? 'bg-amber-50 border-amber-200 text-[#ff9933]' 
                        : 'bg-white border-gray-100 text-gray-400 hover:text-[#ff9933]'
                    }`}
                    title="Favorite Item"
                  >
                    <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-[#ff9933]' : ''}`} />
                  </button>

                  <button 
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this translation entry?")) {
                        onDeleteHistoryItem(item.id);
                      }
                    }}
                    className="p-2 rounded-lg bg-white border border-gray-100 text-gray-400 hover:text-rose-600 hover:bg-rose-50/30 transition-all focus:outline-hidden"
                    title="Delete Scan Log"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-600" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center space-y-4">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-sans font-bold text-sm text-gray-800">
                No matching scan logs found
              </h3>
              <p className="font-sans text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                {searchQuery || filterFavoritesOnly 
                  ? "Try resetting your search query or toggling off the 'Favorites Only' filter."
                  : "Start scanning signs or handwriting scripts in the OCR lens to build your log library!"}
              </p>
            </div>
            {!searchQuery && !filterFavoritesOnly && (
              <button 
                onClick={() => onNavigate('ocr')}
                className="px-5 py-2.5 bg-[#ff9933] text-white font-bold text-xs rounded-xl focus:outline-hidden active:scale-95 transition-transform border-b-2 border-orange-700/20"
              >
                Scan Now
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
