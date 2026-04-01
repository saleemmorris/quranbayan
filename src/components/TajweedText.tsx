'use client';

import React from 'react';
import { CONSONANTS, VOWELS } from '@/constants/phoneticMap';

/**
 * Structural Overhaul - TajweedText
 * Supports Syllabic Mapping (Consonant + Vowel)
 */
export default function TajweedText({ transliteration }: { transliteration: string }) {
  
  /**
   * Tokenizes the transliteration string into Consonant+Vowel units.
   * Regex: /([b-zḥḏʿġšṣḍṭẓʾ][āīūaiu]?|')/gi
   */
  const tokenizeTransliteration = (text: string): string[] => {
    const regex = /([b-zḥḏʿġšṣḍṭẓʾ][āīūaiu]?|')/gi;
    const tokens: string[] = [];
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push(text.substring(lastIndex, match.index));
      }
      tokens.push(match[0]);
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      tokens.push(text.substring(lastIndex));
    }

    return tokens;
  };

  /**
   * Resolves the correct audio filename for a phonetic unit.
   * Logic: ${consonant}${vowel}.mp3
   */
  const getPhoneticFile = (unit: string): string | null => {
    const lower = unit.toLowerCase();
    
    // Check for explicit combined mapping if any (future expansion)
    // Currently following consonant + vowel logic
    const consonantPart = lower.charAt(0);
    const vowelPart = lower.substring(1);

    const baseName = CONSONANTS[consonantPart];
    if (!baseName) return null;

    if (vowelPart) {
      const vowelSuffix = VOWELS[vowelPart];
      if (vowelSuffix) {
        return `${baseName}${vowelSuffix}.mp3`;
      }
    }

    // Standalone consonant (Sukun or letter name)
    return `${baseName}.mp3`;
  };

  /**
   * Plays sound of a specific token from /audio/tajweed/
   */
  const playSound = (unit: string) => {
    const filename = getPhoneticFile(unit);
    if (!filename) return;

    const audioPath = `/audio/tajweed/${filename}`;
    const audio = new Audio(audioPath);
    audio.play().catch(() => {
      console.warn(`Phonetic audio not found: ${audioPath}`);
    });
  };

  const tokens = tokenizeTransliteration(transliteration);

  return (
    <span className="italic flex flex-wrap gap-x-0.5">
      {tokens.map((token, index) => {
        const isInteractive = !!getPhoneticFile(token);

        if (isInteractive) {
          return (
            <span
              key={`${token}-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                playSound(token);
              }}
              className="cursor-pointer hover:text-blue-500 hover:scale-110 border-b border-dotted border-brand-clay transition-all duration-200 inline-block transform"
            >
              {token}
            </span>
          );
        }

        return <React.Fragment key={`${token}-${index}`}>{token}</React.Fragment>;
      })}
    </span>
  );
}
