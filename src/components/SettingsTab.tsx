import React, { useState, useEffect } from 'react';
import { User, Languages, Heart, CheckCircle, Loader2 } from 'lucide-react';
import { getProPackages, purchasePackage, restorePurchases } from '../services/monetization';
import { AppPage } from '../types';

interface SettingsTabProps {
  onNavigate: (tab: AppPage) => void;
  userName: string;
  onSetUserName: (name: string) => void;
  sourceLanguage: string;
  onSetSourceLanguage: (lang: string) => void;
  targetLanguage: string;
  onSetTargetLanguage: (lang: string) => void;
  isPro: boolean;
  onSetIsPro: (val: boolean) => void;
}

export default function SettingsTab({ 
  onNavigate, 
  userName, 
  onSetUserName, 
  sourceLanguage,
  onSetSourceLanguage,
  targetLanguage, 
  onSetTargetLanguage,
  isPro,
  onSetIsPro
}: SettingsTabProps) {
  const languagesList = ["English", "Hindi", "Marathi", "Bengali", "Tamil", "Telugu", "Malayalam", "Kannada", "Gujarati", "Punjabi", "Odia"];
  
  const [packages, setPackages] = useState<any[]>([]);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      const packs = await getProPackages();
      setPackages(packs);
    };
    fetchPackages();
  }, []);

  const handlePurchase = async (pack: any) => {
    setIsPurchasing(true);
    const success = await purchasePackage(pack);
    if (success) {
      onSetIsPro(true);
    }
    setIsPurchasing(false);
  };

  const handleRestore = async () => {
    setIsPurchasing(true);
    const success = await restorePurchases();
    if (success) {
      onSetIsPro(true);
      alert('Purchases restored successfully!');
    } else {
      alert('No active purchases found to restore.');
    }
    setIsPurchasing(false);
  };

  return (
    <div className="w-full pb-28 animate-fade-in px-4">
      <div className="max-w-[540px] mx-auto py-4 space-y-5">
        
        <h2 className="font-sans font-extrabold text-xl text-gray-900">
          Preferences & Settings
        </h2>

        {/* PREMIUM / PRO SETTINGS */}
        <div className="bg-gradient-to-br from-[#ff9933]/10 to-[#ff9933]/5 rounded-2xl border border-[#ff9933]/30 p-5 space-y-4 shadow-sm relative overflow-hidden">
          <div className="absolute -top-2 -right-2 p-4">
            <Heart className="w-16 h-16 text-[#ff9933] opacity-10 rotate-12" />
          </div>
          
          <div className="flex justify-between items-center z-10 relative">
            <div>
              <h3 className="font-sans font-extrabold text-lg text-gray-900 flex items-center gap-2">
                BhashaSethu Pro
                {isPro && <CheckCircle className="w-5 h-5 text-green-500" />}
              </h3>
              <p className="text-xs font-semibold text-gray-500 mt-1 max-w-[200px]">
                {isPro ? "You are a Pro member. Thank you for your support!" : "Unlock unlimited scans, remove ads, and support development."}
              </p>
            </div>
            
            {isPro ? (
              <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                Active
              </span>
            ) : (
              <div className="flex flex-col gap-2 items-end">
                <button 
                  onClick={handleRestore} 
                  disabled={isPurchasing}
                  className="text-[10px] text-gray-500 underline font-bold"
                >
                  Restore Purchases
                </button>
              </div>
            )}
          </div>
          
          {!isPro && (
            <div className="grid grid-cols-3 gap-2 mt-4 z-10 relative">
              {packages.length > 0 ? (
                packages.map((pack) => {
                  const isMonthly = pack.packageType === 'MONTHLY';
                  let durationLabel = 'Plan';
                  if (pack.packageType === 'WEEKLY') durationLabel = 'Weekly';
                  else if (pack.packageType === 'MONTHLY') durationLabel = 'Monthly';
                  else if (pack.packageType === 'ANNUAL') durationLabel = 'Yearly';
                  else if (pack.packageType === 'LIFETIME') durationLabel = 'Lifetime';
                  
                  return (
                    <button 
                      key={pack.identifier}
                      onClick={() => handlePurchase(pack)}
                      disabled={isPurchasing}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all border active:scale-95 ${
                        isMonthly 
                          ? 'bg-[#ff9933] hover:bg-[#ff8800] border-[#ff9933] text-white shadow-md' 
                          : 'bg-white/80 hover:bg-white border-[#ff9933]/20 text-gray-800'
                      }`}
                    >
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isMonthly ? 'text-white/80' : 'text-gray-500'}`}>
                        {durationLabel}
                      </span>
                      <span className={`text-sm font-extrabold mt-0.5 ${isMonthly ? 'text-white' : 'text-[#8f4e00]'}`}>
                        {pack.storeProduct.priceString}
                      </span>
                    </button>
                  );
                })
              ) : (
                <>
                  <button 
                    onClick={() => onSetIsPro(true)}
                    disabled={isPurchasing}
                    className="flex flex-col items-center justify-center p-2 bg-white/80 hover:bg-white border border-[#ff9933]/20 rounded-xl transition-colors active:scale-95"
                  >
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Weekly</span>
                    <span className="text-sm font-extrabold text-[#8f4e00]">₹49</span>
                  </button>
                  <button 
                    onClick={() => onSetIsPro(true)}
                    disabled={isPurchasing}
                    className="flex flex-col items-center justify-center p-2 bg-[#ff9933] hover:bg-[#ff8800] border border-[#ff9933] rounded-xl transition-colors text-white shadow-md active:scale-95"
                  >
                    <span className="text-[10px] text-white/80 font-bold uppercase">Monthly</span>
                    <span className="text-sm font-extrabold">₹149</span>
                  </button>
                  <button 
                    onClick={() => onSetIsPro(true)}
                    disabled={isPurchasing}
                    className="flex flex-col items-center justify-center p-2 bg-white/80 hover:bg-white border border-[#ff9933]/20 rounded-xl transition-colors active:scale-95"
                  >
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Yearly</span>
                    <span className="text-sm font-extrabold text-[#8f4e00]">₹799</span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

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
              Primary Detecting Language
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 pb-4 border-b border-gray-50">
              {languagesList.map((lang) => {
                const isActive = sourceLanguage === lang;
                return (
                  <button
                    key={lang + "-src"}
                    onClick={() => onSetSourceLanguage(lang)}
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

          <div className="space-y-1.5 pt-2">
            <label className="font-sans text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Primary Target Translation Language
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {languagesList.map((lang) => {
                const isActive = targetLanguage === lang;
                return (
                  <button
                    key={lang + "-tgt"}
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

        {/* Bottom Credits Footer */}
        <div className="text-center text-gray-400 text-[10px] font-sans font-bold uppercase tracking-widest pt-4">
          BhashaSethu OCR • Proudly Built in India
        </div>

      </div>
    </div>
  );
}
