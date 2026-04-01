'use client';

import React from 'react';
import { X, Volume2 } from 'lucide-react';
import TajweedText from './TajweedText';
import WordAnalysis from './WordAnalysis';
import { getWordAudioUrl } from '@/lib/audioUtils';

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
 * Includes Word-Level Audio Sync (SSS_AAA_WWW protocol).
 * 
 * Audit Note: Marked with 'use client' and handles Audio playback 
 * via user-triggered events to satisfy browser autoplay policies.
 */
export default function RootAnalysisDrawer({ isOpen, onClose, analysis }: RootAnalysisDrawerProps) {
  if (!analysis) return null;

  // Extract verse key (e.g., "1:1" from "1:1:1")
  const locationParts = analysis.location.split(':');
  const verseKey = locationParts.slice(0, 2).join(':');

  /**
   * Triggers word-level audio playback.
   * Includes detailed error logging for network/asset failures.
   */
  const handlePlayWord = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (locationParts.length === 3) {
      const surah = parseInt(locationParts[0], 10);
      const ayah = parseInt(locationParts[1], 10);
      const word = parseInt(locationParts[2], 10);
      
      const audioUrl = getWordAudioUrl(surah, ayah, word);
      
      try {
        const audio = new Audio(audioUrl);
        
        // Add specific event listener for detailed load failure logging
        audio.onerror = () => {
          console.error(`Audio Load Failed: [${audioUrl}] - check path in /public/audio/words/`);
        };

        await audio.play();
      } catch (err) {
        console.error(`Audio Playback Failed: [${audioUrl}]`, err);
      }
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 cursor-pointer ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside 
        className={`fixed end-0 top-0 z-[70] h-full w-full max-md:max-w-full md:max-w-md bg-background shadow-2xl transition-transform duration-500 ease-in-out sm:border-s sm:border-brand-border ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
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
              <div className="relative group">
                <span className="font-amiri text-7xl text-brand-olive" dir="rtl">
                  {analysis.word.normalize('NFC')}
                </span>
                <button
                  onClick={handlePlayWord}
                  className="absolute -right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-brand-olive/5 text-brand-olive hover:bg-brand-olive/20 hover:text-brand-olive transition-all duration-200 shadow-sm"
                  aria-label="Play Word Audio"
                >
                  <Volume2 className="h-6 w-6" strokeWidth={2.5} />
                </button>
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-bold text-brand-clay italic">
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
        </div>
      </aside>
    </>
  );
}
