import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Flashlight, AlertCircle, Languages, Loader2 } from 'lucide-react';
import { AppPage, TranslationItem, SceneryPreset } from '../types';

interface OcrTabProps {
  onNavigate: (tab: AppPage) => void;
  onSetCurrentResult: (item: TranslationItem) => void;
  targetLanguage: string;
  onSetTargetLanguage: (lang: string) => void;
}

export default function OcrTab({ onNavigate, onSetCurrentResult, targetLanguage, onSetTargetLanguage }: OcrTabProps) {
  const [flashOn, setFlashOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preset Indian signages/text mockups for instant scanning
  const PRESETS: SceneryPreset[] = [
    {
      id: "preset-wooden-sign",
      title: "Weathered Wooden Signage",
      url: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=600",
      description: "Traditional Indian street signboard with Sanskrit & Hindi scripting.",
      defaultExtracted: "Please wait here"
    },
    {
      id: "preset-menu",
      title: "Dhaba Menu Card",
      url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600",
      description: "Indian spice menu highlighting specialty local foods.",
      defaultExtracted: "Delicious food"
    },
    {
      id: "preset-transit",
      title: "Digital Metro Board",
      url: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=600",
      description: "Transit indicator directions board in a modern railway station.",
      defaultExtracted: "Next station"
    },
    {
      id: "preset-calligraphy",
      title: "Calligraphy Scroll",
      url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600",
      description: "Ancient text showing handwritten philosophical wisdom.",
      defaultExtracted: "The journey of a thousand miles begins with a single step."
    }
  ];

  // Helper to trigger backend OCR API call
  const executeOcrScan = async (base64Image: string, textContext: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64Image,
          targetLanguage: targetLanguage
        })
      });

      if (!response.ok) {
        throw new Error("Failed to scan image using server.");
      }

      const data = await response.json();
      
      const newResult: TranslationItem = {
        id: "scan-" + Date.now(),
        sourceText: data.extractedText || textContext || "The journey of a thousand miles begins with a single step.",
        translatedText: data.translatedText,
        transliteration: data.transliteration,
        sourceLang: data.sourceLang || "English",
        targetLang: targetLanguage,
        timestamp: new Date().toLocaleDateString(),
        isFavorite: false,
        sceneryUrl: PRESETS[selectedPresetIndex].url,
        dictionary: data.dictionary || [],
        lesson: data.lesson
      };

      onSetCurrentResult(newResult);
      onNavigate('results');
    } catch (err: any) {
      console.error(err);
      alert("OCR translation failed. Please check your internet connection or API Key settings.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCapture = async () => {
    // Play camera sound feedback
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } catch (e) {}

    // Flash feedback overlay effect
    const flashDiv = document.createElement("div");
    flashDiv.className = "fixed inset-0 bg-white z-[60] pointer-events-none opacity-80 transition-opacity duration-150";
    document.body.appendChild(flashDiv);
    setTimeout(() => {
      flashDiv.style.opacity = "0";
      setTimeout(() => flashDiv.remove(), 150);
    }, 50);

    // Vibration feedback (supported on mobile browsers)
    if (navigator.vibrate) {
      navigator.vibrate(60);
    }

    // Trigger translation process
    // Convert active preset or uploaded image into base64 or pass it
    // For convenience, we send preset sign data as preloaded base64 mock or perform fallback ocr
    const base64Dummy = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    await executeOcrScan(base64Dummy, PRESETS[selectedPresetIndex].defaultExtracted);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        await executeOcrScan(base64, "Uploaded custom script text");
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        await executeOcrScan(base64, "Dropped custom script text");
      };
      reader.readAsDataURL(file);
    }
  };

  const languagesList = ["Hindi", "Marathi", "Bengali", "Tamil", "Telugu"];

  return (
    <div className="w-full pb-28 animate-fade-in bg-black text-white min-h-[calc(100vh-144px)] flex flex-col relative select-none">
      
      {/* CSS Animation Keyframes for Scanner Line */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 8%; opacity: 0.9; }
          50% { top: 92%; opacity: 0.9; }
        }
        .viewfinder-corner {
          width: 32px;
          height: 32px;
          border-color: rgba(255, 153, 51, 0.9);
          position: absolute;
        }
      `}</style>

      {/* Top Banner Dropdown Selection */}
      <div className="w-full bg-neutral-900/90 py-3 px-4 flex items-center justify-center gap-3 border-b border-neutral-800/60 z-10">
        <Languages className="w-4 h-4 text-[#ff9933]" />
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Translate to:</span>
        <select 
          value={targetLanguage}
          onChange={(e) => onSetTargetLanguage(e.target.value)}
          className="bg-neutral-800 border border-neutral-700/60 text-[#ff9933] text-xs font-extrabold px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-[#ff9933] outline-hidden cursor-pointer"
        >
          {languagesList.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* Main Viewfinder Canvas */}
      <div 
        className={`flex-1 relative flex flex-col items-center justify-center p-6 min-h-[380px] transition-colors ${
          dragActive ? 'bg-orange-950/20' : 'bg-neutral-950'
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        {/* Scenic Background Viewfinder Simulation */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={PRESETS[selectedPresetIndex].url}
            className="w-full h-full object-cover opacity-60 filter blur-[1px] scale-105 transition-all duration-700" 
            alt="Scenic view for OCR translation"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-radial from-transparent to-black/70"></div>
        </div>

        {/* Scan line overlay UI */}
        <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center z-10">
          
          {/* Brackets */}
          <div className="viewfinder-corner top-0 left-0 border-t-4 border-l-4 rounded-tl-xl"></div>
          <div className="viewfinder-corner top-0 right-0 border-t-4 border-r-4 rounded-tr-xl"></div>
          <div className="viewfinder-corner bottom-0 left-0 border-b-4 border-l-4 rounded-bl-xl"></div>
          <div className="viewfinder-corner bottom-0 right-0 border-b-4 border-r-4 rounded-br-xl"></div>

          {/* Laser Animated Line */}
          {!isLoading && (
            <div className="absolute w-[92%] h-[2px] bg-[#ff9933] shadow-[0_0_12px_rgba(255,153,51,0.9)] animate-[scan_3s_ease-in-out_infinite]"></div>
          )}

          {/* Loader Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-black/60 rounded-xl flex flex-col items-center justify-center gap-3 backdrop-blur-xs">
              <Loader2 className="w-10 h-10 text-[#ff9933] animate-spin" />
              <p className="text-xs font-bold font-sans tracking-wide text-[#ffdcc2] animate-pulse">
                Analyzing Script...
              </p>
            </div>
          )}
          
          {/* Preset Text Info Hint */}
          {!isLoading && (
            <div className="absolute bottom-4 left-4 right-4 bg-black/75 px-3 py-1.5 rounded-lg border border-neutral-800/40 text-[10px] text-center text-amber-200">
              Preset Target: "{PRESETS[selectedPresetIndex].defaultExtracted}"
            </div>
          )}
        </div>

        {/* Preset Selector Rail */}
        <div className="w-full max-w-lg mt-6 z-10 flex flex-col gap-2">
          <p className="text-[10px] font-sans font-bold text-center uppercase text-neutral-400 tracking-wider">
            Select Scenery Script Preset:
          </p>
          <div className="flex justify-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {PRESETS.map((preset, index) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetIndex(index)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap focus:outline-hidden ${
                  selectedPresetIndex === index 
                    ? 'bg-[#ff9933] text-white shadow-xs' 
                    : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {index + 1}. {preset.title.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interaction Controls Row */}
      <div className="bg-neutral-950 py-6 px-4 flex flex-col items-center gap-4 border-t border-neutral-900 z-10">
        
        <div className="flex items-center justify-around w-full max-w-sm pb-2">
          
          {/* Gallery Button */}
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-white active:scale-90 transition-transform focus:outline-hidden hover:bg-neutral-800"
            title="Upload Photo"
            disabled={isLoading}
          >
            <ImageIcon className="w-6 h-6 text-neutral-300" />
          </button>
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          {/* Central Capture Shutter */}
          <button 
            onClick={handleCapture}
            className="relative flex items-center justify-center w-20 h-20 rounded-full border-4 border-white p-1 focus:outline-hidden group active:scale-95 duration-100"
            title="Capture Sign"
            disabled={isLoading}
          >
            <div className={`w-full h-full rounded-full flex items-center justify-center shadow-md transition-colors ${
              isLoading ? 'bg-neutral-700' : 'bg-[#ff9933] group-active:bg-[#ff8800]'
            }`}>
              <Camera className="w-8 h-8 text-white fill-white/10" />
            </div>
          </button>

          {/* Flash Toggle */}
          <button 
            onClick={() => setFlashOn(!flashOn)}
            className={`p-4 rounded-full border text-white active:scale-90 transition-transform focus:outline-hidden ${
              flashOn 
                ? 'bg-[#ff9933]/15 border-[#ff9933]/40 text-[#ff9933]' 
                : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800'
            }`}
            title="Toggle Flash"
          >
            <Flashlight className={`w-6 h-6 ${flashOn ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          </button>
        </div>

        {/* Drag & Drop Help text */}
        <div className="flex items-center gap-2 text-neutral-400 text-xs">
          <AlertCircle className="w-4 h-4 text-neutral-500" />
          <span>Drag & drop any photo or click shutter to scan preset</span>
        </div>
      </div>
    </div>
  );
}
