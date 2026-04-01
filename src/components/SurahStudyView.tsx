'use client';

import React, { useState } from 'react';
import WordToken from "@/components/WordToken";
import RootAnalysisDrawer from "@/components/RootAnalysisDrawer";
import { StudyProvider } from "@/lib/StudyContext";
import StudyToggles from "@/components/StudyToggles";

interface Word {
  id: number;
  text_uthmani: string;
  transliteration?: {
    text: string;
  };
  location: string;
}

interface Verse {
  id: number;
  verse_number: number;
  words: Word[];
}

interface SurahStudyViewProps {
  chapter: {
    id: number;
    name_complex: string;
    name_arabic: string;
    revelation_place: string;
    verses_count: number;
    translated_name: {
      name: string;
    };
  };
  verses: Verse[];
}

/**
 * SurahStudyView manages the interactive learning state (Study Toggles + Root Analysis).
 * Uses Zaytuna design tokens.
 */
export default function SurahStudyView({ chapter, verses }: SurahStudyViewProps) {
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    transliteration: string;
    location: string;
  } | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleWordClick = (word: Word) => {
    setSelectedWord({
      word: word.text_uthmani,
      transliteration: word.transliteration?.text || '...',
      location: word.location,
      wordId: word.id
    });
    setIsDrawerOpen(true);
  };

  return (
    <StudyProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <main className="container mx-auto flex-1 px-4 py-12 sm:px-6 lg:px-8">
          {/* Surah Header Section */}
          <header className="mb-16 text-center">
            <h1 className="font-amiri text-5xl font-bold text-brand-olive sm:text-7xl">
              {chapter.name_arabic.normalize('NFC')}
            </h1>
            <div className="mt-6 flex flex-col items-center gap-2">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {chapter.name_complex}
              </h2>
              <p className="text-lg text-foreground/60">
                {chapter.translated_name.name}
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-widest text-brand-clay">
              <span>{chapter.revelation_place}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-border" />
              <span>{chapter.verses_count} Verses</span>
            </div>

            {/* Study Mode Controls */}
            <div className="mt-12 flex justify-center">
              <StudyToggles />
            </div>
          </header>

          {/* Verse Reading Container */}
          <div 
            className="mx-auto max-w-5xl space-y-16 rounded-[2.5rem] border border-brand-border/40 bg-background/50 p-6 shadow-sm backdrop-blur-sm sm:p-16"
            dir="rtl"
          >
            {verses.map((verse) => (
              <section 
                key={verse.id} 
                className="group flex flex-wrap items-center justify-start gap-x-1.5 gap-y-8 border-b border-brand-border/10 pb-16 last:border-0 last:pb-0"
              >
                <div 
                  className="ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-clay/20 bg-brand-clay/5 text-sm font-bold text-brand-clay transition-colors group-hover:border-brand-olive/30 group-hover:bg-brand-olive/5"
                  dir="ltr"
                >
                  {verse.verse_number}
                </div>

                <div className="flex flex-wrap items-center gap-x-1 gap-y-4">
                  {verse.words.map((word) => (
                    <WordToken 
                      key={word.id}
                      arabic={word.text_uthmani}
                      transliteration={word.transliteration?.text || '...'}
                      onClick={() => handleWordClick(word)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>

        <RootAnalysisDrawer 
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          analysis={selectedWord}
        />
      </div>
    </StudyProvider>
  );
}
