'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import TajweedText from './TajweedText';
import TajweedPlayer from './TajweedPlayer';

interface WordAnalysis {
  word: string;
  transliteration: string;
  location: string;
  wordId?: number;
  root?: string;
  meaning?: string;
}

interface FetchedWordInfo {
  root_modern?: string;
  grammar_description?: string;
  translation?: {
    text: string;
  };
}

interface RootAnalysisDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: WordAnalysis | null;
}

/**
 * RootAnalysisDrawer provides word-level linguistic analysis.
 * Follows Zaytuna design system (Olive & Clay).
 * Fetches root and grammar data from Quran.com API on click.
 */
export default function RootAnalysisDrawer({ isOpen, onClose, analysis }: RootAnalysisDrawerProps) {
  const [wordInfo, setWordInfo] = useState<FetchedWordInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && analysis?.location) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      // Extract verse key (e.g., "1:1" from "1:1:1")
      const verseKey = analysis.location.split(':').slice(0, 2).join(':');
      
      fetch(`https://api.quran.com/api/v4/verses/by_key/${verseKey}?words=true&word_fields=root_modern,grammar_description,translation`)
        .then(res => res.json())
        .then(data => {
          const words = data.verse?.words || [];
          const matchedWord = words.find((w: { location: string; root_modern?: string; grammar_description?: string; translation?: { text: string } }) => w.location === analysis.location);
          if (matchedWord) {
            setWordInfo({
              root_modern: matchedWord.root_modern,
              grammar_description: matchedWord.grammar_description,
              translation: matchedWord.translation
            });
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch word analysis:", err);
          setLoading(false);
        });
    } else if (!isOpen) {
      setWordInfo(null);
    }
  }, [isOpen, analysis?.location]);

  if (!analysis) return null;

  // Map grammar segments to Zaytuna colors (Olive for Nouns, Clay for Verbs)
  const renderGrammarSegments = (description?: string) => {
    if (!description) return null;
    
    return (
      <div className="flex flex-wrap gap-2">
        {description.split(',').map((segment, idx) => {
          const trimmed = segment.trim();
          let colorStyle = { color: 'rgba(0,0,0,0.8)', backgroundColor: 'rgba(0,0,0,0.05)', borderColor: 'transparent' };
          
          if (trimmed.toLowerCase().includes('noun')) {
            colorStyle = { color: '#3E4A2E', backgroundColor: 'rgba(62, 74, 46, 0.1)', borderColor: 'rgba(62, 74, 46, 0.2)' };
          } else if (trimmed.toLowerCase().includes('verb')) {
            colorStyle = { color: '#D2B48C', backgroundColor: 'rgba(210, 180, 140, 0.1)', borderColor: 'rgba(210, 180, 140, 0.2)' };
          }
          
          return (
            <span 
              key={idx} 
              style={colorStyle}
              className="rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
            >
              {trimmed}
            </span>
          );
        })}
      </div>
    );
  };

  const renderRootDisplay = (root?: string) => {
    if (!root) return null;
    
    // Split root into individual letters (e.g. "ب س م" -> ["ب", "س", "م"])
    const letters = root.split(' ').filter(l => l.trim().length > 0);
    
    return (
      <div className="flex flex-col items-center gap-6 border-b border-brand-border/50 pb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-clay/80">3-Letter Root</span>
        <div className="flex gap-8" dir="rtl">
          {letters.map((letter, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3">
              <span className="font-amiri text-5xl font-bold" style={{ fontSize: '48px', color: '#3E4A2E' }}>
                {letter}
              </span>
              <TajweedPlayer soundName={letter} />
            </div>
          ))}
        </div>
      </div>
    );
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
        className={`fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-500 ease-in-out sm:border-l sm:border-brand-border ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
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

            <div className="mt-16 space-y-12">
              <section>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-olive/80">Grammar & Root</h3>
                <div className={`rounded-2xl border border-brand-border bg-brand-card/30 p-6 min-h-[160px] flex flex-col justify-center transition-all duration-300 ${loading ? 'animate-pulse bg-brand-border/10' : ''}`}>
                  {loading ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-12 w-32 bg-brand-border/20 rounded-lg animate-shimmer" />
                      <div className="h-4 w-48 bg-brand-border/20 rounded-full animate-shimmer" />
                    </div>
                  ) : wordInfo ? (
                    <div className="space-y-6">
                      {renderRootDisplay(wordInfo.root_modern)}
                      <div className="space-y-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Linguistic Breakdown</span>
                        {renderGrammarSegments(wordInfo.grammar_description)}
                      </div>
                    </div>
                  ) : (
                    <p className="text-lg text-foreground/80 leading-relaxed italic">
                      Linguistic analysis unavailable for this token.
                    </p>
                  )}
                </div>
              </section>

              <section>
                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-olive/80">English Meaning</h3>
                <div className={`rounded-2xl border border-brand-border bg-brand-card/30 p-6 transition-all duration-300 ${loading ? 'animate-pulse bg-brand-border/10' : ''}`}>
                  {loading ? (
                    <div className="h-8 w-full bg-brand-border/20 rounded animate-shimmer" />
                  ) : (
                    <p className="text-2xl font-medium text-foreground">
                      {wordInfo?.translation?.text || analysis.meaning || "Click for full lexicon analysis."}
                    </p>
                  )}
                </div>
              </section>
            </div>
          </div>

          <footer className="mt-auto border-t border-brand-border pt-6">
            <button 
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
