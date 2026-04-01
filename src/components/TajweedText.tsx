'use client';

import React from 'react';

interface TajweedRule {
  pattern: string;
  sound: string;
  type: 'madd' | 'heavy' | 'ghunnah' | 'qalqalah';
}

const TAJWEED_RULES: TajweedRule[] = [
  // Madd (Long Vowels)
  { pattern: 'ā', sound: 'aa-long', type: 'madd' },
  { pattern: 'ī', sound: 'ee-long', type: 'madd' },
  { pattern: 'ū', sound: 'uu-long', type: 'madd' },
  
  // Heavy/Deep Letters
  { pattern: 'ḥ', sound: 'hah-deep', type: 'heavy' },
  { pattern: 'ṣ', sound: 'sad-heavy', type: 'heavy' },
  { pattern: 'ḍ', sound: 'dad-heavy', type: 'heavy' },
  { pattern: 'ṭ', sound: 'tah-heavy', type: 'heavy' },
  { pattern: 'ẓ', sound: 'zah-heavy', type: 'heavy' },
  { pattern: 'ʿ', sound: 'ayn-deep', type: 'heavy' },
  
  // Ghunnah (Nasalization)
  { pattern: 'nn', sound: 'ghunnah-n', type: 'ghunnah' },
  { pattern: 'mm', sound: 'ghunnah-m', type: 'ghunnah' },
  
  // Qalqalah (Echo)
  { pattern: 'q', sound: 'qalqalah-q', type: 'qalqalah' },
  { pattern: 't', sound: 'qalqalah-t', type: 'qalqalah' },
  { pattern: 'b', sound: 'qalqalah-b', type: 'qalqalah' },
  { pattern: 'j', sound: 'qalqalah-j', type: 'qalqalah' },
  { pattern: 'd', sound: 'qalqalah-d', type: 'qalqalah' },
];

const TAJWEED_COLORS = {
  madd: 'text-[#2196F3]',
  ghunnah: 'text-brand-olive',
  qalqalah: 'text-brand-clay',
  heavy: 'text-[#795548]',
};

/**
 * TajweedText component for interactive transliteration.
 * Color-codes and adds audio triggers for specific phonetic patterns.
 */
export default function TajweedText({ transliteration }: { transliteration: string }) {
  const playSound = (soundName: string) => {
    // Audio path updated to /audio/tajweed/ as per project structure
    const audio = new Audio(`/audio/tajweed/${soundName}.mp3`);
    audio.play().catch(() => {
      // Fallback or warning if audio is missing
      console.warn(`Tajweed sound not found: ${soundName}`);
    });
  };

  // Sort patterns by length descending to ensure longer ones (like 'nn') match first
  const sortedPatterns = TAJWEED_RULES.map(r => r.pattern).sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${sortedPatterns.join('|')})`, 'gi');

  // Split string into interactive and static parts
  const parts = transliteration.split(regex);

  return (
    <span className="italic">
      {parts.map((part, index) => {
        const lowerPart = part.toLowerCase();
        const rule = TAJWEED_RULES.find(r => r.pattern === lowerPart);

        if (rule) {
          return (
            <span
              key={index}
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent token click
                playSound(rule.sound);
              }}
              className={`${TAJWEED_COLORS[rule.type]} cursor-pointer border-b border-dotted border-current hover:border-solid transition-all`}
              title={`${rule.type}: ${rule.pattern}`}
            >
              {part}
            </span>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
