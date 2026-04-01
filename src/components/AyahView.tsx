'use client';

import React, { useEffect, useState } from 'react';
import WordToken from "@/components/WordToken";
import { StudyProvider } from "@/lib/StudyContext";
import RootAnalysisDrawer from "@/components/RootAnalysisDrawer";

interface Word {
  id: number;
  text_uthmani: string;
  transliteration?: {
    text: string;
  };
  location: string;
}

interface AyahData {
  words: Word[];
}

interface AyahViewProps {
  verseKey?: string; // e.g., "1:1"
  arabicText?: string; // fallback if no verseKey
}

/**
 * AyahView component for displaying Arabic Ayah text word-by-word.
 * Fetches data from Quran.com API if verseKey is provided.
 * Supports interactive WordToken analysis and Study Mode.
 */
export default function AyahView({ verseKey = "1:1", arabicText }: AyahViewProps) {
  const [data, setData] = useState<AyahData | null>(null);
  const [loading, setLoading] = useState(!!verseKey);
  const [selectedWord, setSelectedWord] = useState<{
    word: string;
    transliteration: string;
    location: string;
  } | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (verseKey) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      fetch(`https://api.quran.com/api/v4/verses/by_key/${verseKey}?words=true&word_fields=text_uthmani,transliteration,location`)
        .then(res => res.json())
        .then(json => {
          setData({ words: json.verse.words });
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch Ayah data:", err);
          setLoading(false);
        });
    }
  }, [verseKey]);

  const handleWordClick = (word: Word) => {
    setSelectedWord({
      word: word.text_uthmani,
      transliteration: word.transliteration?.text || '...',
      location: word.location,
      wordId: word.id
    });
    setIsDrawerOpen(true);
  };

  if (loading) {
    return (
      <div className="flex animate-pulse items-center justify-center py-8">
        <div className="h-12 w-48 rounded-full bg-brand-border/30" />
      </div>
    );
  }

  // Fallback if no API data but manual text provided
  if (!data && arabicText) {
    return (
      <div className="flex flex-col gap-2 p-4">
        <p className="font-amiri text-4xl leading-loose text-brand-olive" dir="rtl">
          {arabicText.normalize('NFC')}
        </p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <StudyProvider>
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-4 p-6" dir="rtl">
        {data.words.map((word) => (
          <WordToken 
            key={word.id}
            arabic={word.text_uthmani}
            transliteration={word.transliteration?.text || '...'}
            onClick={() => handleWordClick(word)}
          />
        ))}
      </div>

      <RootAnalysisDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        analysis={selectedWord}
      />
    </StudyProvider>
  );
}
