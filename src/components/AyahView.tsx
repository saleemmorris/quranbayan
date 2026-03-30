import React from 'react';
import { transliterate } from '@src/lib/transliterate';

interface AyahViewProps {
  arabicText: string;
}

/**
 * AyahView component for displaying Arabic Ayah text with transliteration.
 * Follows DIN 31635 and Zaytuna design guidelines.
 */
export default function AyahView({ arabicText }: AyahViewProps) {
  const normalizedArabic = arabicText.normalize('NFC');
  const transliteratedText = transliterate(normalizedArabic);

  return (
    <div className="flex flex-col gap-2 p-4">
      <p 
        className="text-brand-olive font-amiri text-4xl leading-loose" 
        dir="rtl"
      >
        {normalizedArabic}
      </p>
      <p 
        className="text-brand-clay text-sm italic opacity-80" 
        dir="ltr"
      >
        {transliteratedText}
      </p>
    </div>
  );
}
