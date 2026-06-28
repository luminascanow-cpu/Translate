import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Heart, Share2, Clipboard, BookOpen, ChevronRight, CheckCircle, HelpCircle, GraduationCap, Sparkles, Sliders, Pause, Play, Square } from 'lucide-react';
import { AppPage, TranslationItem } from '../types';

interface ResultsTabProps {
  currentResult: TranslationItem | null;
  onNavigate: (tab: AppPage) => void;
  onToggleFavorite: (item: TranslationItem) => void;
  onLoadActiveCard: (item: TranslationItem) => void;
}

export default function ResultsTab({ currentResult, onNavigate, onToggleFavorite, onLoadActiveCard }: ResultsTabProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Web Speech API Synthesis state
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [speechPitch, setSpeechPitch] = useState<number>(1.0);
  const [isSpeakingWebSpeech, setIsSpeakingWebSpeech] = useState(false);
  const [isPausedWebSpeech, setIsPausedWebSpeech] = useState(false);

  const getLangCode = (lang: string) => {
    switch (lang) {
      case "Hindi": return "hi-IN";
      case "Bengali": return "bn-IN";
      case "Tamil": return "ta-IN";
      case "Telugu": return "te-IN";
      case "Marathi": return "mr-IN";
      default: return "hi-IN";
    }
  };

  // Load voices on mount and voice change
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);

        if (currentResult) {
          const langCode = getLangCode(currentResult.targetLang);
          // Prioritize Indian locales for target languages
          const matchingVoice = availableVoices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(langCode.toLowerCase()));
          if (matchingVoice) {
            setSelectedVoiceURI(matchingVoice.voiceURI);
          } else if (availableVoices.length > 0) {
            setSelectedVoiceURI(availableVoices[0].voiceURI);
          }
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, [currentResult?.targetLang]);

  if (!currentResult) {
    return (
      <div className="w-full py-16 text-center animate-fade-in px-4">
        <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-gray-800">No active scan results.</h3>
        <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
          Please open the OCR tab and capture a scenic Indian landmark or upload an image to view smart dictionary analysis.
        </p>
        <button 
          onClick={() => onNavigate('ocr')}
          className="mt-6 px-6 py-2.5 bg-[#ff9933] text-white font-bold rounded-xl text-xs active:scale-95 transition-transform shadow-sm focus:outline-hidden"
        >
          Go to OCR Tab
        </button>
      </div>
    );
  }

  // Filter voices matching current translation's target language
  const currentLangCode = getLangCode(currentResult.targetLang);
  const filteredVoices = voices.filter(v => 
    v.lang.toLowerCase().replace('_', '-').startsWith(currentLangCode.split('-')[0])
  );

  // Web Speech API Voice synthesis triggers
  const speakWebSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert("Web Speech API is not supported in this browser.");
      return;
    }

    // Cancel existing
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentResult.translatedText);
    
    // Choose selected voice
    if (selectedVoiceURI) {
      const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    } else {
      utterance.lang = currentLangCode;
    }

    utterance.rate = speechRate;
    utterance.pitch = speechPitch;

    utterance.onstart = () => {
      setIsSpeakingWebSpeech(true);
      setIsPausedWebSpeech(false);
    };

    utterance.onend = () => {
      setIsSpeakingWebSpeech(false);
      setIsPausedWebSpeech(false);
    };

    utterance.onerror = () => {
      setIsSpeakingWebSpeech(false);
      setIsPausedWebSpeech(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pauseWebSpeech = () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsPausedWebSpeech(true);
      } else if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPausedWebSpeech(false);
      }
    }
  };

  const stopWebSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingWebSpeech(false);
      setIsPausedWebSpeech(false);
    }
  };

  // Real TTS trigger on backend with fallback
  const handleTTS = async () => {
    // If the user uses standard speaker button, we trigger our custom Web Speech API speaker automatically!
    speakWebSpeech();
  };

  const handleShare = () => {
    const textToShare = `"${currentResult.sourceText}" -> "${currentResult.translatedText}" (${currentResult.transliteration}) - translated via BhashaSetu`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } else {
      alert("Copied to clipboard: " + textToShare);
    }
  };

  const handlePracticeCard = () => {
    onLoadActiveCard(currentResult);
    onNavigate('learn');
  };

  return (
    <div className="w-full pb-28 animate-fade-in px-4">
      <div className="max-w-[720px] mx-auto py-4 space-y-6">
        
        {/* Navigation Action Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <button 
            onClick={() => onNavigate('ocr')}
            className="flex items-center gap-1.5 text-[#8f4e00] font-sans font-extrabold text-sm hover:opacity-85 focus:outline-hidden"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5px]" />
            Return to Lens
          </button>
          
          <div className="flex bg-orange-50 text-[#8f4e00] px-2.5 py-1 rounded-md text-[11px] font-extrabold border border-orange-100 uppercase tracking-wide">
            {currentResult.targetLang} Target
          </div>
        </div>

        {/* Source Snippet Image & Extracted Original Text */}
        <section className="bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-100 flex flex-col md:flex-row">
          <div className="md:w-[220px] h-40 md:h-auto relative bg-neutral-900 shrink-0">
            <img 
              className="w-full h-full object-cover opacity-75" 
              src={currentResult.sceneryUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300"} 
              alt="OCR captured original crop"
              referrerPolicy="no-referrer"
            />
            {/* Viewfinder simulation bounds on crop */}
            <div className="absolute inset-0 bg-primary/5 flex items-center justify-center p-4">
              <div className="border-2 border-[#ff9933]/80 w-11/12 h-5/6 rounded shadow-[0_0_0_999px_rgba(0,0,0,0.4)]"></div>
            </div>
          </div>
          
          <div className="p-5 flex-1 flex flex-col justify-center bg-[#f9f9f9]/80">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-[#056e00]" />
              <span className="font-sans text-xs font-bold text-[#056e00] uppercase tracking-wider">
                Extracted Script
              </span>
            </div>
            <p className="font-sans font-bold text-lg text-gray-800 italic leading-relaxed select-all">
              "{currentResult.sourceText}"
            </p>
          </div>
        </section>

        {/* Translation Main Card block */}
        <section className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 border-l-4 border-l-[#ff9933] space-y-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1 flex-1">
              <span className="font-sans text-xs font-extrabold text-[#8f4e00] uppercase tracking-wider">
                {currentResult.targetLang} Translation
              </span>
              <h2 className="font-sans font-extrabold text-2xl text-gray-900 leading-snug select-all">
                "{currentResult.translatedText}"
              </h2>
              <p className="font-sans text-sm font-medium text-gray-500 italic mt-1 select-all">
                {currentResult.transliteration}
              </p>
            </div>

            {/* real-time speaker voice call trigger */}
            <button 
              onClick={handleTTS}
              className={`p-4 rounded-full shadow-md active:scale-90 transition-transform focus:outline-hidden flex-shrink-0 ${
                isSpeakingWebSpeech 
                  ? 'bg-amber-100 text-[#ff9933] animate-pulse border border-amber-200' 
                  : 'bg-[#ff9933] hover:bg-[#ff8800] text-white'
              }`}
              title="Speak Pronunciation (Web Speech API)"
            >
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          {/* Web Speech API Voice Customization Panel */}
          <div className="bg-[#fff9f3] rounded-xl p-4 border border-orange-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#8f4e00] font-sans font-extrabold text-xs uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-[#ff9933]" />
                Web Speech Voice Settings
              </div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Web Speech API</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Voice selector */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-600 block">Select Native Voice</label>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => setSelectedVoiceURI(e.target.value)}
                  className="w-full bg-white border border-gray-200/80 rounded-lg p-2 font-sans font-medium focus:ring-1 focus:ring-[#ff9933] outline-hidden cursor-pointer text-gray-700"
                >
                  {filteredVoices.length > 0 ? (
                    filteredVoices.map(v => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} ({v.lang})
                      </option>
                    ))
                  ) : (
                    <option value="">Browser Default ({getLangCode(currentResult.targetLang)})</option>
                  )}
                </select>
              </div>

              {/* Pitch and Speed Controls */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between font-semibold text-gray-600 mb-0.5">
                    <span>Speed Rate: {speechRate}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={speechRate}
                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff9933]"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-gray-600 mb-0.5">
                    <span>Pitch Modulation: {speechPitch}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={speechPitch}
                    onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#ff9933]"
                  />
                </div>
              </div>
            </div>

            {/* Speaking Controller Buttons */}
            <div className="flex gap-2 pt-2 border-t border-orange-100/50">
              <button
                onClick={speakWebSpeech}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 focus:outline-hidden ${
                  isSpeakingWebSpeech && !isPausedWebSpeech
                    ? 'bg-[#056e00] text-white'
                    : 'bg-[#ff9933] hover:bg-[#ff8800] text-white shadow-xs'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isSpeakingWebSpeech && !isPausedWebSpeech ? 'Speaking...' : 'Speak aloud'}
              </button>

              <button
                onClick={pauseWebSpeech}
                disabled={!isSpeakingWebSpeech}
                className="py-2 px-3 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-50 disabled:opacity-50 transition-all flex items-center gap-1.5 focus:outline-hidden"
              >
                <Pause className="w-3.5 h-3.5" />
                {isPausedWebSpeech ? 'Resume' : 'Pause'}
              </button>

              <button
                onClick={stopWebSpeech}
                disabled={!isSpeakingWebSpeech}
                className="py-2 px-3 bg-white border border-rose-200 text-rose-700 rounded-lg text-xs font-bold hover:bg-rose-50 disabled:opacity-50 transition-all flex items-center gap-1.5 focus:outline-hidden"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                Stop
              </button>
            </div>
          </div>

          {/* Bento Grid Actions Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-gray-100">
            <button 
              onClick={() => onToggleFavorite(currentResult)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all border group focus:outline-hidden ${
                currentResult.isFavorite 
                  ? 'bg-amber-50 text-[#8f4e00] border-amber-200' 
                  : 'bg-gray-50 border-gray-100 hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 mb-1 transition-transform group-hover:scale-110 ${currentResult.isFavorite ? 'fill-[#ff9933] text-[#ff9933]' : ''}`} />
              <span className="font-sans text-xs font-bold">{currentResult.isFavorite ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button 
              onClick={handleShare}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-600 focus:outline-hidden group"
            >
              {copiedText ? (
                <>
                  <Clipboard className="w-5 h-5 text-emerald-600 mb-1" />
                  <span className="font-sans text-xs font-bold text-emerald-600">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-5 h-5 text-gray-600 mb-1 group-hover:scale-110" />
                  <span className="font-sans text-xs font-bold">Copy Text</span>
                </>
              )}
            </button>

            {/* Practice as Flashcard link */}
            <button 
              onClick={handlePracticeCard}
              className="col-span-2 flex flex-col items-center justify-center py-3 px-4 rounded-xl bg-[#ff9933] hover:bg-[#ff8800] text-white font-sans font-bold shadow-xs active:scale-98 transition-all hover:shadow-md focus:outline-hidden group border-b-2 border-orange-700/20"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-100 group-hover:animate-bounce" />
                <span className="text-xs font-extrabold uppercase tracking-wide">Practice Flashcard</span>
              </div>
            </button>
          </div>
        </section>


        {/* Dictionary Segment */}
        {currentResult.dictionary && currentResult.dictionary.length > 0 && (
          <section className="space-y-3">
            <h3 className="font-sans font-extrabold text-lg text-gray-900 flex items-center gap-2">
              <span className="w-2.5 h-4 bg-[#056e00] rounded-sm"></span>
              Quick Dictionary
            </h3>
            
            <div className="space-y-3">
              {currentResult.dictionary.map((entry, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs hover:shadow-xs transition-shadow"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans font-extrabold text-base text-gray-800">
                        {entry.word}
                      </span>
                      <span className="bg-amber-50 text-amber-800 border border-amber-200/50 px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider">
                        {entry.partOfSpeech}
                      </span>
                    </div>
                    <span className="text-[#056e00] font-sans font-extrabold text-sm select-all">
                      {entry.translation}
                    </span>
                  </div>
                  
                  <p className="font-sans text-xs text-gray-500 mb-2">
                    {entry.definition}
                  </p>
                  
                  <div className="bg-emerald-50/50 p-2.5 rounded-lg border-l-2 border-[#056e00]">
                    <p className="font-sans text-xs italic text-[#056e00] font-medium leading-relaxed">
                      {entry.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Master this Phrase - Contextual recommendation */}
        {currentResult.lesson && (
          <section className="bg-amber-50/40 rounded-2xl p-5 border-2 border-dashed border-amber-200 flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 bg-[#ffdcc2] text-[#8f4e00] rounded-xl flex items-center justify-center shadow-xs">
              <GraduationCap className="w-6 h-6 stroke-[2.2px]" />
            </div>
            <div>
              <h4 className="font-sans font-extrabold text-base text-gray-900">
                {currentResult.lesson.title || "Master this Phrase"}
              </h4>
              <p className="font-sans text-xs text-gray-500 mt-0.5 leading-relaxed">
                {currentResult.lesson.description || 'Learn how to form phrases with this grammatical structure and test yourself.'}
              </p>
              
              <button 
                onClick={handlePracticeCard}
                className="mt-3 text-[#ff9933] font-sans font-bold text-xs flex items-center gap-1 hover:gap-2 transition-all focus:outline-hidden"
              >
                Start Lesson & Quiz
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
