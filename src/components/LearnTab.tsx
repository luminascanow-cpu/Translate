import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, X, ChevronDown, ChevronUp } from 'lucide-react';
import { EXTENDED_ALPHABETS, AlphabetItem, AlphabetSection } from '../data/alphabets';
import { playSarvamTTS } from '../utils/sarvam';

interface LearnTabProps {
  sourceLanguage: string;
}

export default function LearnTab({ sourceLanguage }: LearnTabProps) {
  const [activeAlphabet, setActiveAlphabet] = useState<AlphabetItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const playVocabAudio = async (text: string, langName: string) => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    await playSarvamTTS(text, langName);
    setIsPlayingAudio(false);
  };

  const data = EXTENDED_ALPHABETS[sourceLanguage];

  return (
    <div className="w-full pb-28 animate-fade-in px-4 bg-radial from-amber-500/5 to-emerald-500/5 min-h-[calc(100vh-144px)] select-none">
      <div className="max-w-[720px] mx-auto py-4 space-y-6">
        <div className="w-full pb-10">
          {!data ? (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xs text-center">
              <h3 className="font-sans font-extrabold text-lg text-gray-900">Alphabets Not Available</h3>
              <p className="text-gray-500 text-sm font-sans mt-2">
                We currently don't have predefined alphabets for {sourceLanguage}.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-white rounded-2xl p-6 border-2 border-orange-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-0"></div>
                <div className="relative z-10">
                  <h2 className="font-sans font-extrabold text-2xl text-gray-900 mb-2">
                    {sourceLanguage} Alphabet
                  </h2>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-md">
                      Total: {data.summary.total} letters
                    </span>
                  </div>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed font-medium">
                    {data.summary.breakdown}
                  </p>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-4">
                {data.sections.map((section: AlphabetSection, sIdx: number) => {
                  const isExpanded = expandedSections[section.title] !== false; // Default true
                  return (
                    <div key={sIdx} className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.title)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-orange-50/50 transition-colors focus:outline-hidden"
                      >
                        <div className="text-left">
                          <h3 className="font-sans font-extrabold text-gray-900 text-lg flex items-center gap-2">
                            {section.title}
                            <span className="bg-gray-200 text-gray-700 text-[10px] px-2 py-0.5 rounded-full">
                              {section.letters.length}
                            </span>
                          </h3>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">{section.description}</p>
                        </div>
                        <div className="text-gray-400">
                          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-gray-100"
                          >
                            <div className="p-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                              {section.letters.map((item, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveAlphabet(item)}
                                  className="aspect-square bg-white border border-gray-200 rounded-xl shadow-xs flex flex-col items-center justify-center active:scale-95 transition-all hover:bg-orange-50 hover:border-orange-200 focus:outline-hidden"
                                >
                                  <span className="text-2xl text-gray-900 font-bold">{item.letter}</span>
                                  {item.transliteration && (
                                    <span className="text-[9px] text-gray-400 uppercase font-bold mt-1">{item.transliteration}</span>
                                  )}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Detail Modal */}
              <AnimatePresence>
                {activeAlphabet && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed inset-x-0 bottom-24 mx-4 md:max-w-[400px] md:mx-auto bg-white border border-gray-200 shadow-2xl rounded-3xl p-8 z-50 flex flex-col items-center"
                  >
                    <button 
                      onClick={() => setActiveAlphabet(null)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-hidden bg-gray-50 hover:bg-gray-100 rounded-full p-1 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="text-7xl text-[#ff9933] font-extrabold mb-2">{activeAlphabet.letter}</div>
                    {activeAlphabet.transliteration && (
                      <div className="flex flex-col items-center mb-2">
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Readable Native Text</div>
                        <div className="text-lg text-gray-700 font-extrabold uppercase tracking-wider">
                          {activeAlphabet.transliteration}
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={() => playVocabAudio(activeAlphabet.letter, sourceLanguage)}
                      className="mt-6 p-4 rounded-full bg-amber-50 text-[#ff9933] border border-orange-200 active:scale-95 hover:bg-orange-100 transition-all shadow-sm"
                    >
                      <Volume2 className="w-8 h-8" />
                    </button>
                    <div className="text-xs text-gray-400 font-bold mt-3 uppercase tracking-wider">Pronounce</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
