import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "hi" | "en";

const translations = {
  hi: {
    appName: "Fetter AI",
    welcome: "नमस्ते!",
    welcomeSub: "आज आपकी क्या मदद करूं?",
    askPlaceholder: "कुछ पूछें...",
    imagePromptPlaceholder: "Image describe करें...",
    studyHelp: "📘 Study Help",
    studyHelpDesc: "Class 1–12, Exams",
    aiChat: "🤖 AI Chat",
    aiChatDesc: "कुछ भी पूछें",
    settings: "⚙️ Settings",
    settingsDesc: "Language, Theme",
    generalKnowledge: "🌍 General Knowledge",
    generalKnowledgeDesc: "GK, Current Affairs",
    examPrep: "🎯 Exam Prep",
    examPrepDesc: "UPSC, SSC, Bank",
    imageGen: "🎨 Image Generate",
    imageGenDesc: "AI से image बनाएं",
    login: "Login",
    signup: "Signup",
    logout: "Logout",
    guest: "Guest",
    settingsTitle: "Settings",
    language: "भाषा / Language",
    theme: "थीम / Theme",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    back: "वापस",
    home: "Home",
    chat: "Chat",
    file: "File",
    photo: "Photo",
    imageGenerate: "Image Generate",
    history: "History",
    newChat: "New Chat",
    loginRequired: "Login करें",
    continueAsGuest: "Guest के रूप में जारी रखें",
    or: "या",
  },
  en: {
    appName: "Fetter AI",
    welcome: "Hello!",
    welcomeSub: "How can I help you today?",
    askPlaceholder: "Ask something...",
    imagePromptPlaceholder: "Describe image to generate...",
    studyHelp: "📘 Study Help",
    studyHelpDesc: "Class 1–12, Exams",
    aiChat: "🤖 AI Chat",
    aiChatDesc: "Ask anything",
    settings: "⚙️ Settings",
    settingsDesc: "Language, Theme",
    generalKnowledge: "🌍 General Knowledge",
    generalKnowledgeDesc: "GK, Current Affairs",
    examPrep: "🎯 Exam Prep",
    examPrepDesc: "UPSC, SSC, Bank",
    imageGen: "🎨 Image Generate",
    imageGenDesc: "Generate images with AI",
    login: "Login",
    signup: "Signup",
    logout: "Logout",
    guest: "Guest",
    settingsTitle: "Settings",
    language: "Language",
    theme: "Theme",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    back: "Back",
    home: "Home",
    chat: "Chat",
    file: "File",
    photo: "Photo",
    imageGenerate: "Image Generate",
    history: "History",
    newChat: "New Chat",
    loginRequired: "Login Required",
    continueAsGuest: "Continue as Guest",
    or: "or",
  },
} as const;

export type TranslationKey = keyof typeof translations.hi;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("fetter-lang");
    return (saved === "en" || saved === "hi") ? saved : "hi";
  });

  useEffect(() => {
    localStorage.setItem("fetter-lang", language);
  }, [language]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
