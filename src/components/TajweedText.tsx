'use client';

import React from 'react';

/**
 * TajweedRule maps transliteration patterns to audio filenames and visual styles.
 * Aligned with DIN 31635 and the 1_alif...30_yaa audio assets.
 */
interface TajweedRule {
  pattern: string;
  sound: string;
  type: 'madd' | 'heavy' | 'ghunnah' | 'qalqalah' | 'letter';
}

const TAJWEED_RULES: TajweedRule[] = [
  // Madd (Long Vowels & Carriers)
  { pattern: 'ā', sound: '1_alif', type: 'madd' },
  { pattern: 'ī', sound: '30_yaa', type: 'madd' },
  { pattern: 'ū', sound: '27_waw', type: 'madd' },
  { pattern: 'a', sound: '1_alif', type: 'madd' },
  { pattern: 'i', sound: '30_yaa', type: 'madd' },
  { pattern: 'u', sound: '27_waw', type: 'madd' },
  
  // Letters mapped to phonetic assets
  { pattern: "'", sound: '28_hamzah', type: 'letter' },
  { pattern: 'b', sound: '2_baa', type: 'qalqalah' },
  { pattern: 't', sound: '3_taa', type: 'qalqalah' },
  { pattern: 'ṯ', sound: '4_thaa', type: 'letter' },
  { pattern: 'j', sound: '5_jeem', type: 'qalqalah' },
  { pattern: 'ḥ', sound: '6_haa', type: 'heavy' },
  { pattern: 'ḫ', sound: '7_khaa', type: 'heavy' },
  { pattern: 'd', sound: '8_daal', type: 'qalqalah' },
  { pattern: 'ḏ', sound: '9_zaal', type: 'letter' },
  { pattern: 'r', sound: '10_raa', type: 'heavy' },
  { pattern: 'z', sound: '11_zaa', type: 'letter' },
  { pattern: 's', sound: '12_seen', type: 'letter' },
  { pattern: 'š', sound: '13_sheen', type: 'letter' },
  { pattern: 'ṣ', sound: '14_saad', type: 'heavy' },
  { pattern: 'ḍ', sound: '15_daad', type: 'heavy' },
  { pattern: 'ṭ', sound: '16_taah', type: 'heavy' },
  { pattern: 'ẓ', sound: '17_zhaa', type: 'heavy' },
  { pattern: 'ʿ', sound: '18_ain', type: 'heavy' },
  { pattern: 'ġ', sound: '19_ghain', type: 'heavy' },
  { pattern: 'f', sound: '20_faa', type: 'letter' },
  { pattern: 'q', sound: '21_qaaf', type: 'qalqalah' },
  { pattern: 'k', sound: '22_kaaf', type: 'letter' },
  { pattern: 'l', sound: '23_laam', type: 'letter' },
  { pattern: 'm', sound: '24_meem', type: 'ghunnah' },
  { pattern: 'n', sound: '25_noon', type: 'ghunnah' },
  { pattern: 'h', sound: '26_haah', type: 'letter' },
  { pattern: 'w', sound: '27_waw', type: 'letter' },
  { pattern: 'y', sound: '30_yaa', type: 'letter' },
];

const TAJWEED_COLORS = {
  madd: 'text-[#2196F3]',
  ghunnah: 'text-brand-olive',
  qalqalah: 'text-brand-clay',
  heavy: 'text-[#795548]',
  letter: 'text-brand-clay',
};

/**
 * TajweedText component for interactive transliteration.
 * Makes every identified phonetic part a clickable sound link.
 */
export default function TajweedText({ transliteration }: { transliteration: string }) {
  const playSound = (soundName: string) => {
    // Audio path in /audio/tajweed/ as per project structure
    const audio = new Audio(`/audio/tajweed/${soundName}.mp3`);
    audio.play().catch(() => {
      console.warn(`Phonetic sound not found: ${soundName}`);
    });
  };

  // Sort patterns by length descending to ensure longer matches take precedence
  const sortedPatterns = TAJWEED_RULES.map(r => r.pattern).sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${sortedPatterns.map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

  // Split transliteration into parts based on recognized patterns
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
                e.stopPropagation(); // Avoid triggering parent WordToken analysis
                playSound(rule.sound);
              }}
              className={`${TAJWEED_COLORS[rule.type]} cursor-pointer border-b border-dotted border-current hover:border-solid hover:bg-brand-clay/10 rounded px-0.5 transition-all`}
              title={`${rule.type}: ${rule.pattern}`}
            >
              {part}
            </span>
          );
        }

        // Render separators or unknown parts as static text
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
