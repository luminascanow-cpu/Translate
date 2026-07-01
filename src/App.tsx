import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import HomeTab from './components/HomeTab';
import OcrTab from './components/OcrTab';
import ResultsTab from './components/ResultsTab';
import LearnTab from './components/LearnTab';
import HistoryTab from './components/HistoryTab';
import SettingsTab from './components/SettingsTab';
import { AppPage, TranslationItem } from './types';
import { initializeMonetization, prepareRewardedAd, checkProStatus } from './services/monetization';

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppPage>('home');
  const [userName, setUserName] = useState<string>("Arpita");
  const [sourceLanguage, setSourceLanguage] = useState<string>("English");
  const [targetLanguage, setTargetLanguage] = useState<string>("Hindi");
  const [currentResult, setCurrentResult] = useState<TranslationItem | null>(null);
  const [history, setHistory] = useState<TranslationItem[]>([]);

  // Freemium State
  const [isPro, setIsPro] = useState<boolean>(false);
  const [scansToday, setScansToday] = useState<number>(0);

  // App Initialization
  useEffect(() => {
    const initApp = async () => {
      // 1. Initialize AdMob & RevenueCat
      await initializeMonetization();
      
      // 2. Pre-load the first video ad so it's ready instantly
      await prepareRewardedAd();
      
      // 3. Check if user is already subscribed
      const proStatus = await checkProStatus();
      setIsPro(proStatus);
    };
    
    initApp();
  }, []);

  // Load state on startup
  useEffect(() => {
    try {
      const storedName = localStorage.getItem('bhashasethu_username');
      if (storedName) setUserName(storedName);

      const storedLang = localStorage.getItem('bhashasethu_lang');
      if (storedLang) setTargetLanguage(storedLang);

      const storedSourceLang = localStorage.getItem('bhashasethu_source_lang');
      if (storedSourceLang) setSourceLanguage(storedSourceLang);

      const storedHistory = localStorage.getItem('bhashasethu_history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory).slice(0, 3));
      }

      // Freemium logic
      const storedIsPro = localStorage.getItem('bhashasethu_is_pro');
      if (storedIsPro === 'true') setIsPro(true);

      const storedScans = localStorage.getItem('bhashasethu_scans');
      const storedDate = localStorage.getItem('bhashasethu_scan_date');
      const today = new Date().toISOString().split('T')[0];

      if (storedDate === today) {
        if (storedScans) setScansToday(parseInt(storedScans, 10));
      } else {
        localStorage.setItem('bhashasethu_scan_date', today);
        localStorage.setItem('bhashasethu_scans', '0');
        setScansToday(0);
      }

    } catch (err) {
      console.error("Failed to load state from localStorage:", err);
    }
  }, []);

  const handleSetUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem('bhashasethu_username', name);
  };

  const handleSetTargetLanguage = (lang: string) => {
    setTargetLanguage(lang);
    localStorage.setItem('bhashasethu_lang', lang);
  };

  const handleSetSourceLanguage = (lang: string) => {
    setSourceLanguage(lang);
    localStorage.setItem('bhashasethu_source_lang', lang);
  };

  const handleSetIsPro = (val: boolean) => {
    setIsPro(val);
    localStorage.setItem('bhashasethu_is_pro', val.toString());
  };

  const handleIncrementScan = () => {
    const newCount = scansToday + 1;
    setScansToday(newCount);
    localStorage.setItem('bhashasethu_scans', newCount.toString());
  };

  const handleUnlockScans = (amount: number) => {
    const newCount = Math.max(0, scansToday - amount);
    setScansToday(newCount);
    localStorage.setItem('bhashasethu_scans', newCount.toString());
  };

  const handleSetCurrentResult = (newResult: TranslationItem) => {
    setCurrentResult(newResult);
    const updatedHistory = [newResult, ...history].slice(0, 3);
    setHistory(updatedHistory);
    saveHistoryToStorage(updatedHistory);
  };

  const saveHistoryToStorage = (hist: TranslationItem[]) => {
    try {
      const historyToSave = hist.map(item => ({
        ...item,
        sceneryUrl: "",
        translatedSceneryUrl: ""
      }));
      localStorage.setItem('bhashasethu_history', JSON.stringify(historyToSave));
    } catch (e) {
      console.warn("Storage quota exceeded or error saving history:", e);
    }
  };

  const handleToggleFavorite = (item: TranslationItem) => {
    const updatedHistory = history.map((histItem) => {
      if (histItem.id === item.id) {
        return { ...histItem, isFavorite: !histItem.isFavorite };
      }
      return histItem;
    });

    setHistory(updatedHistory);
    saveHistoryToStorage(updatedHistory);

    if (currentResult && currentResult.id === item.id) {
      setCurrentResult({ ...currentResult, isFavorite: !currentResult.isFavorite });
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    saveHistoryToStorage(updatedHistory);

    if (currentResult && currentResult.id === id) {
      setCurrentResult(null);
    }
  };

  const handleSelectSavedItem = (item: TranslationItem) => {
    setCurrentResult(item);
    setCurrentTab('results');
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-800 font-sans flex flex-col selection:bg-[#ff9933]/25 selection:text-[#8f4e00]">
      <Header 
        currentTab={currentTab} 
        onNavigate={setCurrentTab} 
        userName={userName}
      />

      <main className="flex-1 w-full max-w-screen-xl mx-auto pt-4 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {currentTab === 'home' && (
              <HomeTab 
                userName={userName}
                onNavigate={setCurrentTab}
                onSelectSavedItem={handleSelectSavedItem}
                recentHistory={history}
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
              />
            )}

            {currentTab === 'ocr' && (
              <OcrTab 
                onNavigate={setCurrentTab}
                onSetCurrentResult={handleSetCurrentResult}
                sourceLanguage={sourceLanguage}
                onSetSourceLanguage={handleSetSourceLanguage}
                targetLanguage={targetLanguage}
                onSetTargetLanguage={handleSetTargetLanguage}
                isPro={isPro}
                scansToday={scansToday}
                onIncrementScan={handleIncrementScan}
                onUnlockScans={handleUnlockScans}
              />
            )}

            {currentTab === 'results' && (
              <ResultsTab 
                currentResult={currentResult}
                onNavigate={setCurrentTab}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {currentTab === 'learn' && (
              <LearnTab 
                sourceLanguage={sourceLanguage}
              />
            )}

            {currentTab === 'history' && (
              <HistoryTab 
                onNavigate={setCurrentTab}
                history={history}
                onSelectSavedItem={handleSelectSavedItem}
                onDeleteHistoryItem={handleDeleteHistoryItem}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsTab 
                onNavigate={setCurrentTab}
                userName={userName}
                onSetUserName={handleSetUserName}
                sourceLanguage={sourceLanguage}
                onSetSourceLanguage={handleSetSourceLanguage}
                targetLanguage={targetLanguage}
                onSetTargetLanguage={handleSetTargetLanguage}
                isPro={isPro}
                onSetIsPro={handleSetIsPro}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navigation currentTab={currentTab} onNavigate={setCurrentTab} />
    </div>
  );
}
