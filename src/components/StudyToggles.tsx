'use client';

import React from 'react';
import { useStudy } from '@/lib/StudyContext';

/**
 * StudyToggles provides UI switches to hide/show Arabic and Transliteration.
 * Mandated by AGENTS.md for memorization testing.
 */
export default function StudyToggles() {
  const { 
    showArabic, 
    showTransliteration, 
    toggleArabic, 
    toggleTransliteration 
  } = useStudy();

  return (
    <div className="flex items-center gap-6 rounded-full border border-brand-border bg-background/95 px-6 py-3 backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input 
            type="checkbox" 
            checked={showArabic} 
            onChange={toggleArabic}
            className="h-4 w-4 rounded border-brand-border text-brand-olive focus:ring-brand-olive"
          />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground/70">Arabic</span>
        </label>
      </div>

      <div className="h-4 w-px bg-brand-border" />

      <div className="flex items-center gap-2">
        <label className="flex cursor-pointer items-center gap-2">
          <input 
            type="checkbox" 
            checked={showTransliteration} 
            onChange={toggleTransliteration}
            className="h-4 w-4 rounded border-brand-border text-brand-clay focus:ring-brand-clay"
          />
          <span className="text-xs font-bold uppercase tracking-wider text-foreground/70">Transliteration</span>
        </label>
      </div>
    </div>
  );
}
