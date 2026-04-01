'use client';

import React from 'react';
import { useStudy } from '@/lib/StudyContext';
import TajweedText from './TajweedText';

interface WordTokenProps {
  arabic: string;
  transliteration: string;
  onClick?: () => void;
}

/**
 * WordToken component displays an Arabic word with its transliteration.
 * Follows AGENTS.md rules for Zaytuna design system and Study Mode visibility.
 */
export default function WordToken({ arabic, transliteration, onClick }: WordTokenProps) {
  const { showArabic, showTransliteration } = useStudy();
  
  // Normalize Arabic text to NFC as per project requirements
  const normalizedArabic = arabic.normalize('NFC');

  return (
    <div 
      className="group flex flex-col items-center rounded-lg px-2.5 pt-3 pb-2 transition-all duration-200 hover:bg-brand-clay/15 cursor-pointer"
      aria-label={`${transliteration} (${normalizedArabic})`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-y-3">
        {/* Arabic text using Amiri font, Olive color, min-size 24px (text-3xl is ~30px) */}
        <span 
          className={`font-amiri text-3xl leading-[2.5] text-brand-olive transition-opacity duration-300 ${showArabic ? 'opacity-100' : 'opacity-0'}`} 
          dir="rtl"
        >
          {normalizedArabic}
        </span>
        
        {/* DIN 31635 Transliteration using interactive TajweedText */}
        <div 
          className={`text-[11px] font-medium text-brand-clay/90 leading-tight transition-opacity duration-300 ${showTransliteration ? 'opacity-100' : 'opacity-0'}`} 
          dir="ltr"
        >
          <TajweedText transliteration={transliteration} />
        </div>
      </div>
    </div>
  );
}
