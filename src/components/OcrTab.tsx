import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Flashlight, AlertCircle, Languages, Loader2 } from 'lucide-react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { AppPage, TranslationItem } from '../types';
import { compressImage, getProcessedImages } from '../utils/image';
import { showRewardedAd } from '../services/monetization';

interface OcrTabProps {
  onNavigate: (tab: AppPage) => void;
  onSetCurrentResult: (item: TranslationItem) => void;
  sourceLanguage: string;
  onSetSourceLanguage: (lang: string) => void;
  targetLanguage: string;
  onSetTargetLanguage: (lang: string) => void;
  isPro: boolean;
  scansToday: number;
  onIncrementScan: () => void;
  onUnlockScans: (amount: number) => void;
}

export default function OcrTab({ 
  onNavigate, 
  onSetCurrentResult, 
  sourceLanguage,
  onSetSourceLanguage,
  targetLanguage, 
  onSetTargetLanguage,
  isPro,
  scansToday,
  onIncrementScan,
  onUnlockScans
}: OcrTabProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Analyzing Script...");
  const [flashOn, setFlashOn] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Freemium States
  const [showPaywall, setShowPaywall] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [adTimer, setAdTimer] = useState(5);
  const [cleanMode, setCleanMode] = useState(false);
  
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 80,
    height: 80,
    x: 10,
    y: 10
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handlePreCaptureCheck = () => {
    if (!isPro && scansToday >= 3) {
      setShowPaywall(true);
      return false;
    }
    return true;
  };

  const handleWatchAd = async () => {
    setShowPaywall(false);
    try {
      // Try real AdMob first (works on iOS/Android)
      await showRewardedAd((reward) => {
        console.log('Reward earned from AdMob:', reward);
        onUnlockScans(2);
      });
    } catch (err) {
      console.log('AdMob failed (likely on Web), falling back to Simulator:', err);
      // Fallback Simulator for Web/Dev
      setShowAd(true);
      setAdTimer(5);
      
      const interval = setInterval(() => {
        setAdTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowAd(false);
            onUnlockScans(2); // Subtracts 2 from scansToday, giving 2 more free scans
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const executeOcrScan = async (ocrImage: string, displayImage: string, textContext: string) => {
    setIsLoading(true);
    setLoadingStatus("Analyzing image...");
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

      const response = await fetch(`${backendUrl}/api/ocr-scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: ocrImage,
          sourceLanguage,
          targetLanguage
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to scan image using Gemini. Status: ${response.status}. Details: ${errorText}`);
      }

      const blocks = await response.json();

      setLoadingStatus("Generating AR overlays...");

      const img = new Image();
      img.src = displayImage;
      await new Promise(resolve => { img.onload = resolve; });
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const transliteratedOverlays: { text: string, bbox: { x0: number, y0: number, x1: number, y1: number } }[] = [];
      const translatedOverlays: { text: string, bbox: { x0: number, y0: number, x1: number, y1: number } }[] = [];
      let fullSourceText = "";
      let fullTranslatedText = "";

      blocks.forEach((block: any) => {
        if (!block.bbox || block.bbox.length !== 4) return;
        const [ymin, xmin, ymax, xmax] = block.bbox;
        const bbox = {
          x0: (xmin / 1000) * imgWidth,
          y0: (ymin / 1000) * imgHeight,
          x1: (xmax / 1000) * imgWidth,
          y1: (ymax / 1000) * imgHeight,
        };
        transliteratedOverlays.push({ text: block.transliterated || block.original, bbox });
        translatedOverlays.push({ text: block.translated || block.original, bbox });
        fullSourceText += block.original + " ";
        fullTranslatedText += (block.translated || block.original) + " ";
      });

      const compressedImage = await compressImage(displayImage, transliteratedOverlays, cleanMode);
      const translatedCompressedImage = await compressImage(displayImage, translatedOverlays, cleanMode);

      const newResult: TranslationItem = {
        id: "scan-" + Date.now(),
        sourceText: fullSourceText.trim() || textContext || "No text could be extracted.",
        translatedText: fullTranslatedText.trim() || "Translation failed.",
        transliteration: "",
        sourceLang: sourceLanguage,
        targetLang: targetLanguage,
        timestamp: new Date().toLocaleDateString(),
        isFavorite: false,
        sceneryUrl: compressedImage,
        translatedSceneryUrl: translatedCompressedImage,
        dictionary: blocks.length > 0 ? [{
          word: fullSourceText.trim().substring(0, 30) + (fullSourceText.trim().length > 30 ? "..." : ""),
          partOfSpeech: "phrase",
          translation: fullTranslatedText.trim(),
          definition: fullTranslatedText.trim(),
          example: ""
        }] : [],
      };

      if (!isPro) {
        onIncrementScan();
      }

      onSetCurrentResult(newResult);
      onNavigate('results');
    } catch (err: any) {
      console.error(err);
      alert("Scan failed: " + (err.message || JSON.stringify(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCapture = async () => {
    if (!handlePreCaptureCheck()) return;

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

    const flashDiv = document.createElement("div");
    flashDiv.className = "fixed inset-0 bg-white z-[60] pointer-events-none opacity-80 transition-opacity duration-150";
    document.body.appendChild(flashDiv);
    setTimeout(() => {
      flashDiv.style.opacity = "0";
      setTimeout(() => flashDiv.remove(), 150);
    }, 50);

    if (navigator.vibrate) {
      navigator.vibrate(60);
    }

    try {
      const { DocumentScanner } = await import("@abderrahmen.habib/capacitor-document-scanner");
      const { scannedImages, status } = await DocumentScanner.scanDocument({
        letUserAdjustCrop: true,
        maxNumDocuments: 1,
        responseType: 'base64' as any
      });

      if (status === 'success' && scannedImages && scannedImages.length > 0) {
        let base64 = scannedImages[0];
        if (!base64.startsWith("data:image")) {
          base64 = "data:image/jpeg;base64," + base64;
        }
        const { ocrImage, displayImage } = await getProcessedImages(base64);
        await executeOcrScan(ocrImage, displayImage, "Scanned Document");
      }
    } catch (err) {
      console.log("Document Scanner not available or failed, falling back to native file input", err);
      cameraInputRef.current?.click();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!handlePreCaptureCheck()) return;

    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        setCropImageSrc(base64);
        if (fileInputRef.current) fileInputRef.current.value = "";
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleConfirmCrop = async () => {
    if (!imgRef.current || !completedCrop || completedCrop.width === 0 || completedCrop.height === 0) {
      if (cropImageSrc) {
        const { ocrImage, displayImage } = await getProcessedImages(cropImageSrc);
        setCropImageSrc(null);
        await executeOcrScan(ocrImage, displayImage, "Uploaded image");
      }
      return;
    }
    
    try {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      
      canvas.width = Math.floor(completedCrop.width * scaleX);
      canvas.height = Math.floor(completedCrop.height * scaleY);
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(
          imgRef.current,
          completedCrop.x * scaleX,
          completedCrop.y * scaleY,
          completedCrop.width * scaleX,
          completedCrop.height * scaleY,
          0,
          0,
          canvas.width,
          canvas.height
        );
        const croppedBase64 = canvas.toDataURL('image/jpeg', 0.95);
        setCropImageSrc(null);
        const { ocrImage, displayImage } = await getProcessedImages(croppedBase64);
        await executeOcrScan(ocrImage, displayImage, "Cropped Gallery Upload");
      }
    } catch (e) {
      console.error("Crop failed:", e);
      if (cropImageSrc) {
        const { ocrImage, displayImage } = await getProcessedImages(cropImageSrc);
        setCropImageSrc(null);
        await executeOcrScan(ocrImage, displayImage, "Uploaded image");
      }
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

    if (!handlePreCaptureCheck()) return;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        setCropImageSrc(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const languagesList = ["Hindi", "Marathi", "Bengali", "Tamil", "Telugu"];

  return (
    <div className="w-full animate-fade-in bg-black text-white min-h-[calc(100vh-144px)] flex flex-col relative select-none">
      
      {/* PAYWALL OVERLAY */}
      {showPaywall && (
        <div className="absolute inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#ff9933]/10 flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-[#ff9933]" />
            </div>
            <h3 className="font-extrabold text-xl text-white mb-2">Daily Limit Reached</h3>
            <p className="text-sm text-neutral-400 mb-8">
              You've used your 3 free scans for today. Watch a quick ad to unlock 2 more, or upgrade to BhashaSethu Pro for unlimited scans!
            </p>
            
            <div className="w-full space-y-3">
              <button 
                onClick={handleWatchAd}
                className="w-full py-3.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl font-bold transition-colors border border-neutral-700"
              >
                Watch Ad (+2 Scans)
              </button>
              <button 
                onClick={() => { setShowPaywall(false); onNavigate('settings'); }}
                className="w-full py-3.5 bg-[#ff9933] hover:bg-[#ff8800] text-white rounded-xl font-bold transition-colors shadow-lg shadow-[#ff9933]/20"
              >
                Upgrade to Pro
              </button>
              <button 
                onClick={() => setShowPaywall(false)}
                className="w-full py-2 text-neutral-500 font-semibold text-sm pt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AD SIMULATOR OVERLAY */}
      {showAd && (
        <div className="absolute inset-0 z-[110] bg-black flex flex-col items-center justify-center p-6">
          <div className="absolute top-6 right-6 px-3 py-1 bg-white/10 rounded-full border border-white/20">
            <span className="text-white text-xs font-bold font-mono">Ad • {adTimer}s</span>
          </div>
          <div className="w-24 h-24 border-4 border-t-[#ff9933] border-white/10 rounded-full animate-spin mb-6"></div>
          <h3 className="text-white font-extrabold text-xl mb-2">Simulated Video Ad</h3>
          <p className="text-neutral-400 text-sm max-w-[250px] text-center">
            In production, a Google AdMob video will play here.
          </p>
        </div>
      )}

      {/* Crop UI Overlay */}
      {cropImageSrc && (
        <div className="absolute inset-0 z-[90] bg-neutral-950 flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              className="max-h-full"
            >
              <img 
                ref={imgRef}
                src={cropImageSrc} 
                alt="Crop me" 
                className="max-h-[70vh] object-contain rounded-sm"
              />
            </ReactCrop>
          </div>
          <div className="p-6 bg-neutral-900 border-t border-neutral-800 flex justify-between gap-4 pb-12">
             <button 
               onClick={() => setCropImageSrc(null)} 
               className="px-6 py-3 bg-neutral-800 text-white rounded-xl font-bold active:scale-95 transition-transform"
             >
               Cancel
             </button>
             <button 
               onClick={handleConfirmCrop} 
               className="px-6 py-3 bg-[#ff9933] text-white rounded-xl font-bold flex-1 active:scale-95 transition-transform"
             >
               Confirm & Translate
             </button>
          </div>
        </div>
      )}

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
      <div className="w-full bg-neutral-900/90 py-3 px-4 flex flex-col sm:flex-row items-center justify-center gap-3 border-b border-neutral-800/60 z-10">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-[#ff9933]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Scan from:</span>
          <select 
            value={sourceLanguage}
            onChange={(e) => onSetSourceLanguage(e.target.value)}
            className="bg-neutral-800 border border-neutral-700/60 text-[#ff9933] text-xs font-extrabold px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-[#ff9933] outline-hidden cursor-pointer"
          >
            {languagesList.map(lang => (
              <option key={lang + "-src"} value={lang}>{lang}</option>
            ))}
            <option value="English">English</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Read in:</span>
          <select 
            value={targetLanguage}
            onChange={(e) => onSetTargetLanguage(e.target.value)}
            className="bg-neutral-800 border border-neutral-700/60 text-[#ff9933] text-xs font-extrabold px-3 py-1.5 rounded-lg focus:ring-1 focus:ring-[#ff9933] outline-hidden cursor-pointer"
          >
            {languagesList.map(lang => (
              <option key={lang + "-tgt"} value={lang}>{lang}</option>
            ))}
            <option value="English">English</option>
          </select>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <label className="flex items-center cursor-pointer gap-2">
            <input 
              type="checkbox" 
              checked={cleanMode} 
              onChange={(e) => setCleanMode(e.target.checked)} 
              className="w-4 h-4 text-[#ff9933] bg-neutral-800 border-neutral-700 rounded focus:ring-[#ff9933]" 
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Clean Doc Mode</span>
          </label>
        </div>
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
        <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-900">
          <div className="absolute inset-0 bg-radial from-transparent to-black/70"></div>
        </div>

        <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center z-10">
          
          <div className="viewfinder-corner top-0 left-0 border-t-4 border-l-4 rounded-tl-xl"></div>
          <div className="viewfinder-corner top-0 right-0 border-t-4 border-r-4 rounded-tr-xl"></div>
          <div className="viewfinder-corner bottom-0 left-0 border-b-4 border-l-4 rounded-bl-xl"></div>
          <div className="viewfinder-corner bottom-0 right-0 border-b-4 border-r-4 rounded-br-xl"></div>

          {!isLoading && (
            <div className="absolute w-[92%] h-[2px] bg-[#ff9933] shadow-[0_0_12px_rgba(255,153,51,0.9)] animate-[scan_3s_ease-in-out_infinite]"></div>
          )}

          {isLoading && (
            <div className="absolute inset-0 bg-black/60 rounded-xl flex flex-col items-center justify-center gap-3 backdrop-blur-xs">
              <Loader2 className="w-10 h-10 text-[#ff9933] animate-spin" />
              <p className="text-xs font-bold font-sans tracking-wide text-[#ffdcc2] animate-pulse">
                {loadingStatus}
              </p>
            </div>
          )}
        </div>
        
        {/* Scans Remaining Indicator (if not pro) */}
        {!isPro && (
          <div className="absolute bottom-6 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 z-10">
            <span className="text-xs font-bold text-white/80">
              {Math.max(0, 3 - scansToday)} free scans left
            </span>
          </div>
        )}
      </div>

      {/* Interaction Controls Row */}
      <div className="bg-neutral-950 pt-6 pb-28 px-4 flex flex-col items-center gap-4 border-t border-neutral-900 z-10">
        
        <div className="flex items-center justify-around w-full max-w-sm pb-2">
          
          {/* Gallery Button */}
          <button 
            onClick={() => {
              if (handlePreCaptureCheck()) fileInputRef.current?.click();
            }}
            className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-white active:scale-90 transition-transform focus:outline-hidden hover:bg-neutral-800"
            title="Upload Photo (Crop)"
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
          <input 
            type="file"
            ref={cameraInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            capture="environment"
            className="hidden"
          />

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

        <div className="flex items-center gap-2 text-neutral-400 text-xs">
          <AlertCircle className="w-4 h-4 text-neutral-500" />
          <span>Upload or drag & drop any photo or click shutter</span>
        </div>
      </div>
    </div>
  );
}
