'use client';

import React from 'react';
import TajweedPlayer from './TajweedPlayer';

interface RootDisplayProps {
  root: string;
}

/**
 * RootDisplay component for rendering the Arabic root letters.
 * Each letter triggers its own phonetic Tajweed sound on click.
 */
export default function RootDisplay({ root }: RootDisplayProps) {
  // Split root into individual letters (e.g. "s m w" or "ب س م" -> ["ب", "س", "م"])
  // The API sometimes returns English letters for roots, but Zaytuna design
  // expects Arabic letters for phonetic interactive play.
  const letters = root.split(' ').filter(l => l.trim().length > 0);
  
  return (
    <div className="flex flex-col items-center gap-6 border-b border-brand-border/50 pb-8">
      <span className="text-xs font-bold uppercase tracking-widest text-brand-clay/80">3-Letter Root</span>
      <div className="flex gap-8" dir="rtl">
        {letters.map((letter, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3">
            <span className="font-amiri text-5xl font-bold text-brand-olive" style={{ fontSize: '48px' }}>
              {letter}
            </span>
            <TajweedPlayer soundName={letter} />
          </div>
        ))}
      </div>
    </div>
  );
}
