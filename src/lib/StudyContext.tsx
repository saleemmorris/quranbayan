'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StudyContextType {
  showArabic: boolean;
  showTransliteration: boolean;
  showTranslation: boolean;
  setShowArabic: (val: boolean) => void;
  setShowTransliteration: (val: boolean) => void;
  setShowTranslation: (val: boolean) => void;
  toggleArabic: () => void;
  toggleTransliteration: () => void;
  toggleTranslation: () => void;
}

const StudyContext = createContext<StudyContextType | undefined>(undefined);

/**
 * StudyProvider manages the visibility of Arabic text, Transliteration, and Translation.
 * Used for "Learning Mode" memorization testing.
 */
export function StudyProvider({ children }: { children: ReactNode }) {
  const [showArabic, setShowArabic] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);

  const toggleArabic = () => setShowArabic(prev => !prev);
  const toggleTransliteration = () => setShowTransliteration(prev => !prev);
  const toggleTranslation = () => setShowTranslation(prev => !prev);

  return (
    <StudyContext.Provider value={{
      showArabic,
      showTransliteration,
      showTranslation,
      setShowArabic,
      setShowTransliteration,
      setShowTranslation,
      toggleArabic,
      toggleTransliteration,
      toggleTranslation
    }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const context = useContext(StudyContext);
  if (context === undefined) {
    throw new Error('useStudy must be used within a StudyProvider');
  }
  return context;
}
