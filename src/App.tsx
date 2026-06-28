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

export default function App() {
  const [currentTab, setCurrentTab] = useState<AppPage>('home');
  const [userName, setUserName] = useState<string>("Arpita");
  const [targetLanguage, setTargetLanguage] = useState<string>("Hindi");
  const [currentResult, setCurrentResult] = useState<TranslationItem | null>(null);
  const [activeCardItem, setActiveCardItem] = useState<TranslationItem | null>(null);
  const [history, setHistory] = useState<TranslationItem[]>([]);

  // Load state on startup
  useEffect(() => {
    try {
      const storedName = localStorage.getItem('bhashasetu_username');
      if (storedName) setUserName(storedName);

      const storedLang = localStorage.getItem('bhashasetu_lang');
      if (storedLang) setTargetLanguage(storedLang);

      const storedHistory = localStorage.getItem('bhashasetu_history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (err) {
      console.error("Failed to load state from localStorage:", err);
    }
  }, []);

  // Sync profile name
  const handleSetUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem('bhashasetu_username', name);
  };

  // Sync target language
  const handleSetTargetLanguage = (lang: string) => {
    setTargetLanguage(lang);
    localStorage.setItem('bhashasetu_lang', lang);
  };

  // Save new translation log
  const handleSetCurrentResult = (newResult: TranslationItem) => {
    setCurrentResult(newResult);
    
    // Append to history list
    const updatedHistory = [newResult, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('bhashasetu_history', JSON.stringify(updatedHistory));
  };

  // Toggle favorite status on any translation item
  const handleToggleFavorite = (item: TranslationItem) => {
    const updatedHistory = history.map((histItem) => {
      if (histItem.id === item.id) {
        return { ...histItem, isFavorite: !histItem.isFavorite };
      }
      return histItem;
    });

    setHistory(updatedHistory);
    localStorage.setItem('bhashasetu_history', JSON.stringify(updatedHistory));

    // Also update active view if it is the currentResult
    if (currentResult && currentResult.id === item.id) {
      setCurrentResult({ ...currentResult, isFavorite: !currentResult.isFavorite });
    }
  };

  // Delete log item
  const handleDeleteHistoryItem = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('bhashasetu_history', JSON.stringify(updatedHistory));

    if (currentResult && currentResult.id === id) {
      setCurrentResult(null);
    }
  };

  // Select item from history to view back on Results Page
  const handleSelectSavedItem = (item: TranslationItem) => {
    setCurrentResult(item);
    setCurrentTab('results');
  };

  // Clear or load custom flashcard practicing
  const handleLoadActiveCard = (item: TranslationItem) => {
    setActiveCardItem(item);
  };

  const handleClearActiveCard = () => {
    setActiveCardItem(null);
  };

  // Restores standard factory defaults
  const handleResetApp = () => {
    localStorage.removeItem('bhashasetu_username');
    localStorage.removeItem('bhashasetu_lang');
    localStorage.removeItem('bhashasetu_history');
    setUserName("Arpita");
    setTargetLanguage("Hindi");
    setHistory([]);
    setCurrentResult(null);
    setActiveCardItem(null);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-gray-800 font-sans flex flex-col selection:bg-[#ff9933]/25 selection:text-[#8f4e00]">
      
      {/* Top Banner Branding */}
      <Header 
        currentTab={currentTab} 
        onNavigate={setCurrentTab} 
        userName={userName}
      />

      {/* Main Container Stage with Animation */}
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
              />
            )}

            {currentTab === 'ocr' && (
              <OcrTab 
                onNavigate={setCurrentTab}
                onSetCurrentResult={handleSetCurrentResult}
                targetLanguage={targetLanguage}
                onSetTargetLanguage={handleSetTargetLanguage}
              />
            )}

            {currentTab === 'results' && (
              <ResultsTab 
                currentResult={currentResult}
                onNavigate={setCurrentTab}
                onToggleFavorite={handleToggleFavorite}
                onLoadActiveCard={handleLoadActiveCard}
              />
            )}

            {currentTab === 'learn' && (
              <LearnTab 
                onNavigate={setCurrentTab}
                activeCardItem={activeCardItem}
                onClearActiveCard={handleClearActiveCard}
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
                targetLanguage={targetLanguage}
                onSetTargetLanguage={handleSetTargetLanguage}
                onResetApp={handleResetApp}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Bottom Tab Controller */}
      <Navigation currentTab={currentTab} onNavigate={setCurrentTab} />
    </div>
  );
}
