'use client';

import React from 'react';
import { X } from 'lucide-react';
import TajweedText from './TajweedText';
import WordAnalysis from './WordAnalysis';

interface WordAnalysisData {
  word: string;
  transliteration: string;
  location: string;
  wordId?: number;
  meaning?: string;
}

interface RootAnalysisDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: WordAnalysisData | null;
}

/**
 * RootAnalysisDrawer provides word-level linguistic analysis.
 * Follows Zaytuna design system (Olive & Clay).
 * Uses WordAnalysis component for fetching and rendering data.
 */
export default function RootAnalysisDrawer({ isOpen, onClose, analysis }: RootAnalysisDrawerProps) {
  if (!analysis) return null;

  // Extract verse key (e.g., "1:1" from "1:1:1")
  const verseKey = analysis.location.split(':').slice(0, 2).join(':');

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 cursor-pointer ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside 
        className={`fixed end-0 top-0 z-[70] h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-500 ease-in-out sm:border-s sm:border-brand-border ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex h-full flex-col p-8">
          <header className="flex items-center justify-between border-b border-brand-border pb-6">
            <h2 className="text-xl font-bold text-foreground">Word Analysis</h2>
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-brand-clay/10 transition-colors"
              aria-label="Close Analysis"
            >
              <X className="h-6 w-6 text-brand-olive" strokeWidth={2.5} />
            </button>
          </header>

          <div className="mt-12 flex-1 overflow-y-auto">
            <div className="flex flex-col items-center gap-6 text-center">
              <span className="font-amiri text-7xl text-brand-olive" dir="rtl">
                {analysis.word.normalize('NFC')}
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-2xl font-semibold text-brand-clay italic">
                  <TajweedText transliteration={analysis.transliteration} />
                </span>
                <span className="text-sm font-bold uppercase tracking-widest text-foreground/70">
                  Location {analysis.location}
                </span>
              </div>
            </div>

            <div className="mt-16">
              <WordAnalysis verseKey={verseKey} location={analysis.location} />
            </div>
          </div>

          <footer className="mt-auto border-t border-brand-border pt-6">
            <button 
              onClick={() => {
                const parts = analysis.location.split(':');
                if (parts.length >= 2) {
                  const [chapter, verse] = parts;
                  window.open(`https://corpus.quran.com/wordbyword.jsp?chapter=${chapter}&verse=${verse}#(${analysis.location})`, '_blank');
                }
              }}
              className="w-full rounded-xl bg-brand-olive py-4 text-sm font-bold text-white shadow-lg hover:opacity-95 transition-all"
            >
              View Full Lexicon Entry
            </button>
          </footer>
        </div>
      </aside>
    </>
  );
}
