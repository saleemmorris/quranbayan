import React from 'react';
import Link from 'next/link';

interface SurahCardProps {
  number: number;
  arabicName: string;
  englishName: string;
  formalName?: string;
}

/**
 * SurahCard component displaying the Surah number, Arabic name, and English name.
 * Uses Zaytuna (Olive & Clay) color tokens and Tailwind 4.0.
 * Links to the dynamic surah analysis page.
 */
export default function SurahCard({ number, arabicName, englishName, formalName }: SurahCardProps) {
  return (
    <Link 
      href={`/surah/${number}`}
      className="group bg-brand-card border border-brand-border p-5 rounded-2xl flex items-center gap-5 transition-all duration-300 hover:border-brand-clay/40 hover:shadow-md hover:bg-white"
    >
      <div className="flex items-center justify-center min-w-12 h-12 rounded-full bg-brand-clay/10 text-brand-clay font-bold transition-colors group-hover:bg-brand-olive group-hover:text-white">
        {number}
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <span 
          className="text-brand-olive font-amiri text-2xl truncate transition-colors group-hover:text-brand-olive" 
          dir="rtl"
        >
          {arabicName.normalize('NFC')}
        </span>
        <div className="flex flex-col">
          <span className="text-foreground/80 text-sm font-bold transition-colors group-hover:text-foreground">
            {formalName || englishName}
          </span>
          {formalName && (
            <span className="text-foreground/50 text-xs transition-colors group-hover:text-foreground/70">
              {englishName}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
