import React from 'react';

interface SurahCardProps {
  number: number;
  arabicName: string;
  englishName: string;
}

/**
 * SurahCard component displaying the Surah number, Arabic name, and English name.
 * Uses Zaytuna (Olive & Clay) color tokens and Tailwind 4.0.
 */
export default function SurahCard({ number, arabicName, englishName }: SurahCardProps) {
  return (
    <div className="bg-brand-card border border-brand-border p-4 rounded-lg flex items-center gap-4 transition-colors">
      <div className="flex items-center justify-center min-w-10 h-10 rounded-full bg-brand-clay text-white font-bold">
        {number}
      </div>
      <div className="flex flex-col flex-1">
        <span 
          className="text-brand-olive font-amiri text-2xl" 
          dir="rtl"
        >
          {arabicName.normalize('NFC')}
        </span>
        <span className="text-foreground text-sm">
          {englishName}
        </span>
      </div>
    </div>
  );
}
