import React, { useState } from 'react';
import { Camera, TrendingUp, BookOpen, ChevronRight, Bookmark, BookmarkCheck, Star } from 'lucide-react';
import { AppPage, TranslationItem } from '../types';

interface HomeTabProps {
  userName: string;
  onNavigate: (tab: AppPage) => void;
  onSelectSavedItem: (item: TranslationItem) => void;
  recentHistory: TranslationItem[];
}

export default function HomeTab({ userName, onNavigate, onSelectSavedItem, recentHistory }: HomeTabProps) {
  const [favoriteDailyWord, setFavoriteDailyWord] = useState(false);

  // Default pre-packaged translations from the mockup, so they look identical to the screenshot
  const defaultRecentTranslations = [
    {
      id: "preset-wait",
      sourceText: "Please wait here",
      translatedText: "कृपया यहाँ प्रतीक्षा करें",
      transliteration: "kripaya yahaan prateeksha karen",
      sourceLang: "English",
      targetLang: "Hindi",
      timestamp: new Date().toLocaleDateString(),
      isFavorite: true,
      sceneryUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=200",
      dictionary: [
        { word: "Please", partOfSpeech: "Adverb", translation: "कृपया (Kripaya)", definition: "Used to polite request.", example: "Please come inside." },
        { word: "Wait", partOfSpeech: "Verb", translation: "प्रतीक्षा करें (Prateeksha karen)", definition: "Stay where one is or delay action.", example: "Wait for the bus." }
      ],
      lesson: {
        title: "Polite Commands",
        description: "Learn how to formulate polite instructions in Hindi using 'कृपया' (Kripaya).",
        quiz: {
          question: "Which of these means 'Please' in Hindi?",
          options: ["कृपया (Kripaya)", "धन्यवाद (Dhanyavaad)", "नमस्ते (Namaste)", "सवारी (Savaari)"],
          correctIndex: 0,
          explanation: "Correct! 'Kripaya' translates directly to 'Please' and is used to express politeness."
        }
      }
    },
    {
      id: "preset-food",
      sourceText: "Delicious food",
      translatedText: "स्वादिष्ट भोजन",
      transliteration: "svaadishth bhojan",
      sourceLang: "English",
      targetLang: "Hindi",
      timestamp: new Date().toLocaleDateString(),
      isFavorite: false,
      sceneryUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=200",
      dictionary: [
        { word: "Delicious", partOfSpeech: "Adjective", translation: "स्वादिष्ट (Svaadishth)", definition: "Highly pleasant to the taste.", example: "This mango is delicious." },
        { word: "Food", partOfSpeech: "Noun", translation: "भोजन (Bhojan)", definition: "Nutritious substance that people eat.", example: "Clean food is essential." }
      ],
      lesson: {
        title: "Adjective Ordering",
        description: "Explore how descriptors like 'delicious' precede nouns like 'food' in Hindi syntax.",
        quiz: {
          question: "How do you say 'Delicious' in Hindi?",
          options: ["स्वादिष्ट (Svaadishth)", "भोजन (Bhojan)", "पानी (Paani)", "मित्र (Mitra)"],
          correctIndex: 0,
          explanation: "Correct! 'Svaadishth' means delicious."
        }
      }
    },
    {
      id: "preset-station",
      sourceText: "Next station",
      translatedText: "अगला स्टेशन",
      transliteration: "agala steshan",
      sourceLang: "English",
      targetLang: "Hindi",
      timestamp: new Date().toLocaleDateString(),
      isFavorite: false,
      sceneryUrl: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=200",
      dictionary: [
        { word: "Next", partOfSpeech: "Adjective", translation: "अगला (Agala)", definition: "Coming immediately after the present one.", example: "Next train is at 5pm." },
        { word: "Station", partOfSpeech: "Noun", translation: "स्टेशन (Steshan)", definition: "A designated stopping place for trains.", example: "Meet me at the station." }
      ],
      lesson: {
        title: "Directional Phrases",
        description: "Learn essential commute markers like 'अगला' (Agala/Next) and 'पिछला' (Pichhla/Previous).",
        quiz: {
          question: "Which Hindi word means 'Next'?",
          options: ["अगला (Agala)", "स्टेशन (Steshan)", "यहाँ (Yahaan)", "वहाँ (Vahaan)"],
          correctIndex: 0,
          explanation: "Correct! 'Agala' translates to next."
        }
      }
    }
  ];

  // Merge loaded history item first or use presets
  const displayHistory = recentHistory.length > 0 
    ? [...recentHistory, ...defaultRecentTranslations].slice(0, 3)
    : defaultRecentTranslations;

  return (
    <div className="w-full pb-28 animate-fade-in px-4">
      <div className="max-w-screen-xl mx-auto py-6 space-y-6">
        
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3" id="home-welcome">
          <div>
            <p className="font-sans font-bold text-xs uppercase tracking-wider text-[#8f4e00]/80">
              Namaste, {userName}!
            </p>
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-gray-900 tracking-tight mt-1">
              Ready to bridge the gap?
            </h2>
          </div>
          
          <div className="flex bg-[#ffdcc2] text-[#6d3a00] px-3 py-1.5 rounded-lg items-center gap-2 border border-[#dbc2b0]/30 shadow-xs">
            <TrendingUp className="w-4 h-4 text-[#8f4e00]" />
            <span className="text-xs font-bold font-sans">Daily Streak: 12 Days</span>
          </div>
        </section>

        {/* Primary Action Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Saffron Action Card: Translate Now */}
          <div 
            className="md:col-span-8 bg-white border border-gray-100 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-[280px] shadow-sm hover:shadow-md transition-all group cursor-pointer"
            onClick={() => onNavigate('ocr')}
            id="card-hero-translate"
          >
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none bg-radial from-[#ff9933]/40 to-transparent"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#ff9933]/10 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-[#ffdcc2] p-2 rounded-lg text-[#8f4e00]">
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

            <div className="relative z-10">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate('ocr');
                }}
                className="bg-[#ff9933] hover:bg-[#ff8800] text-white font-extrabold px-6 py-3 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-md hover:shadow-lg border-b-2 border-orange-700/30 focus:outline-hidden"
              >
                <Camera className="w-5 h-5 fill-white/10" />
                Translate Now
              </button>
            </div>
          </div>

          {/* Daily Word Card */}
          <div 
            className="md:col-span-4 bg-amber-50/50 border border-amber-100/50 rounded-2xl p-6 flex flex-col justify-between h-[280px] shadow-xs"
            id="card-daily-word"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans text-xs font-bold text-amber-800 tracking-wider uppercase">
                  Daily Word
                </span>
                <BookOpen className="w-5 h-5 text-amber-700" />
              </div>
              
              <div className="text-center py-2">
                <p className="font-sans font-extrabold text-4xl text-[#8f4e00] tracking-wide mb-1 select-all">
                  विश्राम
                </p>
                <p className="font-sans text-xs font-medium text-gray-500 italic">
                  (Vishrām)
                </p>
                <p className="font-sans font-bold text-lg text-gray-800 mt-4">
                  Rest / Relaxation
                </p>
              </div>
            </div>

            <button 
              onClick={() => setFavoriteDailyWord(!favoriteDailyWord)}
              className={`w-full py-2.5 rounded-xl font-sans font-semibold text-xs border transition-all flex items-center justify-center gap-2 active:scale-98 focus:outline-hidden ${
                favoriteDailyWord 
                  ? 'bg-amber-100 text-amber-800 border-amber-200' 
                  : 'bg-white text-amber-900 hover:bg-amber-50 border-amber-200/50 shadow-xs'
              }`}
            >
              {favoriteDailyWord ? (
                <>
                  <Star className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                  Saved to Favorites
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  Add to Favorites
                </>
              )}
            </button>
          </div>
        </div>

        {/* Recent Translations & Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
          
          {/* Recent Translations List */}
          <div className="md:col-span-7 space-y-4" id="section-recent-translations">
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

            <div className="space-y-3">
              {displayHistory.map((item) => (
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
                      <p className="font-sans font-bold text-sm text-gray-900 select-all">
                        {item.translatedText}
                      </p>
                      <p className="font-sans text-xs text-gray-500 select-all mt-0.5">
                        {item.sourceText}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#ff9933]" />
                </div>
              ))}
            </div>
          </div>

          {/* Progress / Learning stats card */}
          <div className="md:col-span-5 space-y-4" id="section-learning-journey">
            <h4 className="font-sans font-extrabold text-lg text-gray-900">
              Learning Journey
            </h4>
            
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col gap-4 shadow-xs">
              <div>
                <div className="flex justify-between mb-1.5 items-end">
                  <span className="font-sans font-bold text-sm text-gray-800">
                    Marathi Level - A1
                  </span>
                  <span className="font-sans font-extrabold text-xs text-[#8f4e00] bg-orange-100 px-2 py-0.5 rounded-sm">
                    65% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-[#ff9933] h-full rounded-full w-[65%] transition-all duration-1000 shadow-sm"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border border-gray-100">
                  <p className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Words Learnt
                  </p>
                  <p className="font-sans font-extrabold text-2xl text-emerald-600 mt-1">
                    248
                  </p>
                </div>
                
                <div className="bg-white p-3 rounded-xl border border-gray-100">
                  <p className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Accuracy
                  </p>
                  <p className="font-sans font-extrabold text-2xl text-[#8f4e00] mt-1">
                    92%
                  </p>
                </div>
              </div>

              <button 
                onClick={() => onNavigate('learn')}
                className="w-full py-3 bg-[#056e00] hover:bg-[#045600] text-white font-bold text-sm rounded-xl active:scale-95 transition-all shadow-sm border-b-2 border-emerald-800/40 focus:outline-hidden flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Continue Lesson 4
              </button>
            </div>
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
