export interface DictionaryEntry {
  word: string;
  partOfSpeech: string;
  translation: string;
  definition: string;
  example: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonPlan {
  title: string;
  description: string;
  quiz: QuizQuestion;
}

export interface TranslationItem {
  id: string;
  sourceText: string;
  translatedText: string;
  transliteration: string;
  sourceLang: string;
  targetLang: string;
  timestamp: string;
  isFavorite: boolean;
  sceneryId?: string;
  sceneryUrl?: string; // Image with transliterated text overlay
  translatedSceneryUrl?: string; // Image with translated meaning overlay
  dictionary: DictionaryEntry[];
  lesson?: LessonPlan;
}

export type AppPage = 'home' | 'history' | 'ocr' | 'results' | 'learn' | 'settings';

export interface UserProgress {
  streak: number;
  wordsLearned: number;
  accuracy: number;
  level: string; // e.g. "Hindi Level - A1"
  dailyGoalProgress: number; // e.g. 8 (out of 10)
}

export interface SceneryPreset {
  id: string;
  title: string;
  url: string;
  description: string;
  defaultExtracted: string;
}
