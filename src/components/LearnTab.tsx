import React, { useState } from 'react';
import { Sparkles, HelpCircle, Volume2, Lightbulb, CheckCircle2, RotateCcw, ArrowRight, Star } from 'lucide-react';
import { AppPage, TranslationItem } from '../types';

interface LearnTabProps {
  onNavigate: (tab: AppPage) => void;
  activeCardItem: TranslationItem | null;
  onClearActiveCard: () => void;
}

export default function LearnTab({ onNavigate, activeCardItem, onClearActiveCard }: LearnTabProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [dailyProgress, setDailyProgress] = useState(8); // Default 8 out of 10 from mock
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Lesson Quiz State
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizIsSubmitted, setQuizIsSubmitted] = useState(false);

  // Default vocabulary bank to toggle through
  const DEFAULT_VOCAB = [
    {
      word: "नमस्ते",
      roman: "Namaste",
      translation: "Hello / Greetings",
      description: "A respectful greeting commonly used in India.",
      mnemonic: "'Nama' (Bow) + 'Te' (To you)",
      lang: "Hindi"
    },
    {
      word: "विश्राम",
      roman: "Vishrām",
      translation: "Rest / Relaxation",
      description: "State of rest or peace from active effort.",
      mnemonic: "'Vish' (Deeply) + 'Ram' (Resting/Pleasant)",
      lang: "Hindi"
    },
    {
      word: "धन्यवाद",
      roman: "Dhanyavaad",
      translation: "Thank You",
      description: "Expression of gratefulness or appreciation.",
      mnemonic: "'Dhanya' (Blessed) + 'Vaad' (Speech)",
      lang: "Hindi"
    },
    {
      word: "मित्र",
      roman: "Mitra",
      translation: "Friend",
      description: "A companion or person with whom one has a bond.",
      mnemonic: "'Mi' (Bonding/Love) + 'Tra' (Protector)",
      lang: "Hindi"
    }
  ];

  const currentVocab = DEFAULT_VOCAB[activeWordIndex % DEFAULT_VOCAB.length];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleResponse = (type: 'review' | 'gotit') => {
    // Increment progress bar if learned
    if (type === 'gotit' && dailyProgress < 10) {
      setDailyProgress(prev => prev + 1);
    }
    
    // Smooth reset state & increment index
    setIsFlipped(false);
    setActiveWordIndex(prev => prev + 1);
  };

  const playVocabAudio = (text: string, langCode: string) => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => setIsPlayingAudio(false);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 800);
    }
  };

  const handleQuizOption = (index: number) => {
    if (quizIsSubmitted) return;
    setQuizSelectedOption(index);
  };

  const submitQuiz = () => {
    if (quizSelectedOption === null) return;
    setQuizIsSubmitted(true);
  };

  const resetQuiz = () => {
    setQuizSelectedOption(null);
    setQuizIsSubmitted(false);
  };

  return (
    <div className="w-full pb-28 animate-fade-in px-4 bg-radial from-amber-500/5 to-emerald-500/5 min-h-[calc(100vh-144px)] select-none">
      <div className="max-w-[480px] mx-auto py-4 space-y-6">

        {/* CSS 3D Flip Effects */}
        <style>{`
          .perspective-1000 { perspective: 1000px; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .preserve-3d { transform-style: preserve-3d; }
          .flashcard-inner {
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .flashcard-flipped {
            transform: rotateY(180deg);
          }
        `}</style>

        {/* Goal Progress Header matching screen 3 */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-end">
            <span className="font-sans font-bold text-xs text-gray-500 uppercase tracking-wider">
              Daily Goal: {dailyProgress}/10 Words
            </span>
            <span className="font-sans font-extrabold text-sm text-[#056e00]">
              {Math.round((dailyProgress / 10) * 100)}%
            </span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#056e00] rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(dailyProgress / 10) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* ACTIVE EXTRA: Scanned OCR Lesson Quiz Segment */}
        {activeCardItem && activeCardItem.lesson && (
          <div className="bg-white rounded-2xl p-5 border border-[#ff9933]/30 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-orange-100/50">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-[#ff9933] animate-pulse" />
                <span className="font-sans font-extrabold text-xs text-[#8f4e00] uppercase tracking-wide">
                  Active OCR Lesson Quiz
                </span>
              </div>
              <button 
                onClick={onClearActiveCard}
                className="text-xs text-gray-400 hover:text-gray-600 focus:outline-hidden"
              >
                Clear Quiz
              </button>
            </div>

            <p className="font-sans text-xs text-gray-500 leading-relaxed italic">
              Practice this real lesson context extracted from your live lens scans:
            </p>

            <div className="space-y-3">
              <h4 className="font-sans font-extrabold text-sm text-gray-800 leading-snug">
                {activeCardItem.lesson.quiz.question}
              </h4>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {activeCardItem.lesson.quiz.options.map((option, idx) => {
                  let buttonClass = "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-100";
                  if (quizSelectedOption === idx) {
                    buttonClass = "bg-amber-50 text-[#8f4e00] border-[#ff9933]/50 ring-1 ring-[#ff9933]/30";
                  }
                  if (quizIsSubmitted) {
                    if (idx === activeCardItem.lesson.quiz.correctIndex) {
                      buttonClass = "bg-emerald-50 text-[#056e00] border-emerald-300 ring-1 ring-emerald-300";
                    } else if (quizSelectedOption === idx) {
                      buttonClass = "bg-rose-50 text-rose-800 border-rose-300 ring-1 ring-rose-300";
                    } else {
                      buttonClass = "bg-gray-50 text-gray-400 border-gray-100 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizOption(idx)}
                      disabled={quizIsSubmitted}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all focus:outline-hidden ${buttonClass}`}
                    >
                      {idx + 1}. {option}
                    </button>
                  );
                })}
              </div>

              {quizIsSubmitted ? (
                <div className="p-3 bg-neutral-50 rounded-xl border border-gray-200/50 space-y-2 mt-2">
                  <div className="flex items-center gap-1.5">
                    {quizSelectedOption === activeCardItem.lesson.quiz.correctIndex ? (
                      <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                      </span>
                    ) : (
                      <span className="text-rose-600 font-bold text-xs">
                        Incorrect Try.
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-sans">
                    {activeCardItem.lesson.quiz.explanation}
                  </p>
                  <button 
                    onClick={resetQuiz}
                    className="mt-2 text-xs text-[#ff9933] font-bold flex items-center gap-1 hover:underline focus:outline-hidden"
                  >
                    <RotateCcw className="w-3 h-3" /> Retry Lesson Quiz
                  </button>
                </div>
              ) : (
                <button
                  onClick={submitQuiz}
                  disabled={quizSelectedOption === null}
                  className={`w-full mt-2 py-2.5 rounded-xl text-xs font-extrabold transition-all border shadow-xs text-center focus:outline-hidden ${
                    quizSelectedOption !== null 
                      ? 'bg-[#ff9933] text-white border-b-2 border-orange-700/20 active:scale-98' 
                      : 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              )}
            </div>
          </div>
        )}

        {/* Flashcard Component view */}
        <div 
          onClick={handleFlip}
          className="w-full aspect-[4/5] max-h-[360px] perspective-1000 cursor-pointer relative group"
          id="flashcard-interactive-box"
        >
          <div className={`flashcard-inner w-full h-full relative preserve-3d shadow-xs hover:shadow-md transition-shadow duration-300 rounded-2xl ${
            isFlipped ? 'flashcard-flipped' : ''
          }`}>
            
            {/* FRONT CARD SIDE */}
            <div className="absolute inset-0 backface-hidden bg-white border border-gray-100 flex flex-col items-center justify-center p-6 rounded-2xl">
              <div className="absolute top-4 left-4">
                <span className="bg-[#ffdcc2] text-[#6d3a00] font-sans text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-orange-100/30">
                  {activeCardItem ? activeCardItem.targetLang : currentVocab.lang}
                </span>
              </div>
              
              <div className="text-center space-y-2">
                <h2 className="font-sans font-extrabold text-5xl text-gray-950 tracking-wider">
                  {activeCardItem ? activeCardItem.translatedText : currentVocab.word}
                </h2>
                <p className="font-sans text-sm text-gray-400 font-medium italic">
                  {activeCardItem ? activeCardItem.transliteration : currentVocab.roman}
                </p>
              </div>

              <div className="absolute bottom-4 text-center">
                <span className="material-symbols-outlined text-gray-300 animate-bounce">touch_app</span>
                <p className="font-sans text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Tap to flip card
                </p>
              </div>
            </div>

            {/* BACK CARD SIDE */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white border-l-4 border-l-[#ff9933] border border-gray-100 flex flex-col items-center justify-center p-6 rounded-2xl">
              <div className="absolute top-4 left-4">
                <span className="bg-gray-100 text-gray-600 font-sans text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  English Target
                </span>
              </div>
              
              <div className="text-center space-y-3 px-2">
                <h2 className="font-sans font-extrabold text-3xl text-[#8f4e00] leading-snug">
                  {activeCardItem ? activeCardItem.sourceText : currentVocab.translation}
                </h2>
                <p className="font-sans text-xs text-gray-500 italic max-w-xs leading-relaxed">
                  "{activeCardItem ? "Contextually generated lesson card from OCR lens scan." : currentVocab.description}"
                </p>
              </div>

              {/* Volume Audio output */}
              <div className="absolute bottom-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const speakText = activeCardItem ? activeCardItem.translatedText : currentVocab.word;
                    playVocabAudio(speakText, "hi-IN");
                  }}
                  className={`p-3 rounded-full border transition-all ${
                    isPlayingAudio 
                      ? 'bg-amber-100 text-[#ff9933] border-amber-200 animate-pulse' 
                      : 'bg-[#ffdcc2] text-[#8f4e00] border-orange-100 hover:bg-orange-100'
                  }`}
                  title="Listen Pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mnemonic Hint panel with Bulb */}
        <div className="w-full flex gap-3">
          <div className="flex-1 bg-[#f9f9f9] p-4 rounded-2xl border border-gray-100 relative overflow-hidden flex flex-col justify-center shadow-xs">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#ff9933]"></div>
            <h4 className="font-sans font-extrabold text-xs text-[#8f4e00] uppercase tracking-wider mb-1">
              Mnemonic Link
            </h4>
            <p className="font-sans text-xs text-gray-600 leading-relaxed font-medium">
              {activeCardItem ? `BhashaSetu scan-context: practicing this card strengthens translation accuracy.` : currentVocab.mnemonic}
            </p>
          </div>
          
          <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100 shrink-0">
            <Lightbulb className="w-7 h-7 text-[#ff9933]" />
          </div>
        </div>

        {/* Action interactive buttons */}
        <div className="w-full grid grid-cols-2 gap-3 pt-2">
          <button 
            onClick={() => handleResponse('review')}
            className="flex flex-col items-center justify-center py-4 bg-gray-50 hover:bg-gray-100 border-b-4 border-gray-300 text-gray-700 font-sans font-extrabold text-xs rounded-xl active:scale-95 transition-all focus:outline-hidden"
          >
            <RotateCcw className="w-5 h-5 mb-1.5" />
            Review again
          </button>
          
          <button 
            onClick={() => handleResponse('gotit')}
            className="flex flex-col items-center justify-center py-4 bg-[#056e00] hover:bg-[#045600] border-b-4 border-emerald-800 text-white font-sans font-extrabold text-xs rounded-xl active:scale-95 transition-all shadow-md shadow-emerald-700/10 focus:outline-hidden"
          >
            <CheckCircle2 className="w-5 h-5 mb-1.5" />
            Got it
          </button>
        </div>

      </div>
    </div>
  );
}
