import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Heart, Share2, Clipboard, BookOpen, ChevronRight, CheckCircle, HelpCircle, GraduationCap, Sparkles, Sliders, Pause, Play, Square, Maximize, X } from 'lucide-react';
import { AppPage, TranslationItem } from '../types';
import { playSarvamTTS } from '../utils/sarvam';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface ResultsTabProps {
  currentResult: TranslationItem | null;
  onNavigate: (tab: AppPage) => void;
  onToggleFavorite: (item: TranslationItem) => void;
}

export default function ResultsTab({ currentResult, onNavigate, onToggleFavorite }: ResultsTabProps) {
  const [activeImageMode, setActiveImageMode] = useState<'transliterated' | 'translated'>('translated');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showAudioSettings, setShowAudioSettings] = useState(false);

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
          Please open the Scan tab and capture a scenic Indian landmark or upload an image to view smart dictionary analysis.
        </p>
        <button 
          onClick={() => onNavigate('ocr')}
          className="mt-6 px-6 py-2.5 bg-[#ff9933] text-white font-bold rounded-xl text-xs active:scale-95 transition-transform shadow-sm focus:outline-hidden"
        >
          Go to Scan Tab
        </button>
      </div>
    );
  }

  // Filter voices matching current translation's target language
  const currentLangCode = getLangCode(currentResult.targetLang);
  const filteredVoices = voices.filter(v => 
    v.lang.toLowerCase().replace('_', '-').startsWith(currentLangCode.split('-')[0])
  );

  // Web Speech API Voice synthesis triggers - now using Sarvam TTS
  const speakWebSpeech = async () => {
    setIsSpeakingWebSpeech(true);
    setIsPausedWebSpeech(false);

    const textToSpeak = activeImageMode === 'transliterated' ? currentResult.sourceText : currentResult.translatedText;
    const langToSpeak = activeImageMode === 'transliterated' ? currentResult.sourceLang : currentResult.targetLang;

    await playSarvamTTS(textToSpeak, langToSpeak);

    setIsSpeakingWebSpeech(false);
  };

  const pauseWebSpeech = () => {
    // Sarvam TTS audio object is managed internally in playSarvamTTS for now,
    // so pause/resume isn't directly exposed here unless we refactor it.
    // For simplicity, we can ignore pause or just reset state.
    setIsPausedWebSpeech(true);
  };

  const stopWebSpeech = () => {
    setIsSpeakingWebSpeech(false);
    setIsPausedWebSpeech(false);
  };

  // Real TTS trigger on backend with fallback
  const handleTTS = async () => {
    // If the user uses standard speaker button, we trigger our custom Web Speech API speaker automatically!
    speakWebSpeech();
    setShowAudioSettings(true);
  };

  const handleShare = () => {
    const textToShare = `"${currentResult.sourceText}" -> "${currentResult.translatedText}" (${currentResult.transliteration}) - translated via BhashaSethu`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToShare);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } else {
      alert("Copied to clipboard: " + textToShare);
    }
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

        {/* AR Image Toggle */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveImageMode('transliterated')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all focus:outline-hidden ${
              activeImageMode === 'transliterated' 
                ? 'bg-white text-gray-900 shadow-xs' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Readable Native Text
          </button>
          <button
            onClick={() => setActiveImageMode('translated')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all focus:outline-hidden ${
              activeImageMode === 'translated' 
                ? 'bg-white text-gray-900 shadow-xs' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Translated Meaning
          </button>
        </div>

        {/* Source Snippet Image with AR Overlay */}
        <section className="bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-100 relative group">
          <button 
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-opacity focus:outline-hidden"
            title="View Full Screen"
          >
            <Maximize className="w-4 h-4" />
          </button>
          <div className="w-full relative bg-neutral-900 flex justify-center overflow-hidden cursor-zoom-in active:cursor-grabbing">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={8}
              centerOnInit={true}
              wheel={{ step: 0.1 }}
            >
              <TransformComponent wrapperClass="w-full h-full flex items-center justify-center">
                <img 
                  className="w-full h-auto max-h-[60vh] object-contain select-none" 
                  src={activeImageMode === 'transliterated' ? (currentResult.sceneryUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300") : (currentResult.translatedSceneryUrl || currentResult.sceneryUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300")} 
                  alt="AR Translated Image"
                  referrerPolicy="no-referrer"
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </section>

        {/* On-Demand Audio Play Button */}
        <section className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-gray-900 text-sm">Pronunciation</span>
            <span className="text-xs text-gray-500">Play translation audio on demand</span>
          </div>

          <button 
            onClick={handleTTS}
            className={`p-3 rounded-full shadow-md active:scale-90 transition-transform focus:outline-hidden ${
              isSpeakingWebSpeech 
                ? 'bg-amber-100 text-[#ff9933] animate-pulse border border-amber-200' 
                : 'bg-[#ff9933] hover:bg-[#ff8800] text-white'
            }`}
            title="Play Audio"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </section>

        {/* Web Speech API Voice Customization Panel - On Demand */}
        {showAudioSettings && (
          <div className="bg-[#fff9f3] rounded-xl p-4 border border-orange-100 space-y-3 animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#8f4e00] font-sans font-extrabold text-xs uppercase tracking-wider">
                <Sliders className="w-4 h-4 text-[#ff9933]" />
                Audio Settings
              </div>
              <button 
                onClick={() => setShowAudioSettings(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-hidden"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {/* Voice selector */}
              <div className="space-y-1">
                <label className="font-semibold text-gray-600 block">Select Voice</label>
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
          </div>
        )}
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


          </div>
      </div>

      {/* Full Screen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[120] bg-black flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="absolute top-[env(safe-area-inset-top,24px)] mt-4 left-0 right-0 p-4 flex justify-end z-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
            <button 
              onClick={() => setIsFullscreen(false)}
              className="bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-md transition-colors pointer-events-auto"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 w-full h-full flex items-center justify-center overflow-hidden">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={10}
              centerOnInit={true}
              wheel={{ step: 0.1 }}
            >
              <TransformComponent wrapperClass="w-full h-full flex items-center justify-center">
                <img 
                  className="w-full h-full max-h-screen object-contain select-none cursor-zoom-in active:cursor-grabbing" 
                  src={activeImageMode === 'transliterated' ? (currentResult.sceneryUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300") : (currentResult.translatedSceneryUrl || currentResult.sceneryUrl || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300")} 
                  alt="AR Translated Image Fullscreen"
                  referrerPolicy="no-referrer"
                  draggable={false}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      )}
    </div>
  );
}
