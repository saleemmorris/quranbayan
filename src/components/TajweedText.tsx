'use client';

import React from 'react';
import { PHONETIC_INDEX } from '@/constants/phoneticMap';

/**
 * Phonetic Integration - TajweedText
 * Tokenizes DIN 31635 transliteration and links parts to audio assets.
 */
export default function TajweedText({ transliteration }: { transliteration: string }) {
  
  /**
   * Tokenizes the transliteration string into Consonant+Vowel units.
   * Regex: /([b-zḥḏʿġšṣḍṭẓʾ][āīūaiu]?|')/gi
   */
  const tokenizeTransliteration = (text: string): string[] => {
    // Regex identifies letters followed by optional vowels, or a hamzah (')
    const regex = /([b-zḥḏʿġšṣḍṭẓʾ][āīūaiu]?|')/gi;
    const tokens: string[] = [];
    let match;
    let lastIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      // Add any non-matching characters before the current match as static text
      if (match.index > lastIndex) {
        tokens.push(text.substring(lastIndex, match.index));
      }
      tokens.push(match[0]);
      lastIndex = regex.lastIndex;
    }

    // Add any trailing characters
    if (lastIndex < text.length) {
      tokens.push(text.substring(lastIndex));
    }

    return tokens;
  };

  /**
   * Plays sound of a specific token from /audio/tajweed/
   */
  const playSound = (token: string) => {
    const lowerToken = token.toLowerCase();
    
    // Check for special combined cases first (like 'la')
    let filename = PHONETIC_INDEX[lowerToken];

    // If no direct token match, lookup by primary consonant or character
    if (!filename) {
      // Pick first character of token as fallback for consonants+vowels
      const firstChar = lowerToken.charAt(0);
      filename = PHONETIC_INDEX[firstChar];
    }

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
        const lowerToken = token.toLowerCase();
        
        // Determine if token is interactive (exists in mapping)
        const isInteractive = !!PHONETIC_INDEX[lowerToken] || !!PHONETIC_INDEX[lowerToken.charAt(0)];

        if (isInteractive) {
          return (
            <span
              key={`${token}-${index}`}
              onClick={(e) => {
                e.stopPropagation();
                playSound(token);
              }}
              className="cursor-pointer hover:text-blue-500 border-b border-dotted border-brand-clay transition-all duration-200"
            >
              {token}
            </span>
          );
        }

        // Static part (e.g., spaces, punctuation)
        return <React.Fragment key={`${token}-${index}`}>{token}</React.Fragment>;
      })}
    </span>
  );
}
