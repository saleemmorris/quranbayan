'use client';

import React, { useEffect, useState } from 'react';
import { VerseResponseSchema, WordZod } from '@/types/quran';
import RootDisplay from './RootDisplay';
import parse from 'html-react-parser';

interface WordAnalysisProps {
  verseKey: string;
  location: string;
}

/**
 * WordAnalysis component refactored to use official Quran.com V4 structure.
 * 1. Fetches from 'https://api.quran.com/api/v4/verses/by_key/{verseKey}?words=true&word_fields=root,grammar_description'
 * 2. Uses Zod for response validation.
 * 3. Maps 'root' string to RootDisplay.
 * 4. Shows 'Functional Particle' badge if no root exists.
 */
export default function WordAnalysis({ verseKey, location }: WordAnalysisProps) {
  const [wordData, setWordData] = useState<WordZod | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWordAnalysis() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://api.quran.com/api/v4/verses/by_key/${verseKey}?words=true&word_fields=root,grammar_description,translation`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch from Quran.com API');
        }

        const json = await response.json();
        
        // Validate with Zod
        const result = VerseResponseSchema.safeParse(json);
        if (!result.success) {
          console.error('Zod Validation Error:', result.error);
          throw new Error('API Response Validation Failed');
        }

        const matchedWord = result.data.verse.words.find(
          (w) => {
            const wordLocation = w.location || `${verseKey}:${w.position}`;
            return wordLocation === location;
          }
        );

        if (!matchedWord) {
          throw new Error('Word not found in verse data');
        }

        setWordData(matchedWord);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (verseKey && location) {
      fetchWordAnalysis();
    }
  }, [verseKey, location]);

  const renderGrammarSegments = (description?: string | null) => {
    if (!description) return null;
    
    return (
      <div className="flex flex-wrap gap-2">
        {description.split(',').map((segment, idx) => {
          const trimmed = segment.trim();
          let colorClass = "text-foreground/80 bg-foreground/5 border-transparent";
          
          if (trimmed.toLowerCase().includes('noun')) {
            colorClass = "text-brand-olive bg-brand-olive/10 border-brand-olive/20";
          } else if (trimmed.toLowerCase().includes('verb')) {
            colorClass = "text-brand-clay bg-brand-clay/10 border-brand-clay/20";
          }
          
          return (
            <span 
              key={idx} 
              className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${colorClass}`}
            >
              {trimmed}
            </span>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <div className="h-12 w-32 animate-pulse rounded-lg bg-brand-border/20" />
        <div className="h-4 w-48 animate-pulse rounded-full bg-brand-border/20" />
      </div>
    );
  }

  if (error || !wordData) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-600">
        {error || 'Linguistic analysis unavailable.'}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-olive/80">Grammar & Root</h3>
        <div className="rounded-2xl border border-brand-border bg-brand-card/30 p-6 flex flex-col justify-center">
          <div className="space-y-6">
            {wordData.root ? (
              <RootDisplay root={wordData.root} />
            ) : (
              <div className="flex flex-col items-center gap-4 border-b border-brand-border/50 pb-8">
                <span className="rounded-full bg-brand-olive px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                  Functional Particle
                </span>
                <p className="text-sm text-foreground/60 italic">This word has no derived root.</p>
              </div>
            )}
            
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/70">Linguistic Breakdown</span>
              {renderGrammarSegments(wordData.grammar_description)}
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-olive/80">English Meaning</h3>
        <div className="rounded-2xl border border-brand-border bg-brand-card/30 p-6">
          <div className="text-2xl font-medium text-foreground">
            {wordData.translation?.text ? (
              parse(wordData.translation.text)
            ) : (
              <button 
                onClick={() => {
                  const parts = location.split(':');
                  if (parts.length >= 2) {
                    const [chapter, verse] = parts;
                    window.open(`https://corpus.quran.com/wordbyword.jsp?chapter=${chapter}&verse=${verse}#(${location})`, '_blank');
                  }
                }}
                className="text-brand-olive hover:underline underline-offset-4 cursor-pointer text-lg font-semibold"
              >
                Click for full lexicon analysis.
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
