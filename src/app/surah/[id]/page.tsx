import React from 'react';
import Header from "@/components/Header";
import SurahStudyView from "@/components/SurahStudyView";

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

interface SurahData {
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

async function getSurahData(id: string): Promise<SurahData> {
  const [chapterRes, versesRes] = await Promise.all([
    fetch(`https://api.quran.com/api/v4/chapters/${id}?language=en`),
    fetch(`https://api.quran.com/api/v4/verses/by_chapter/${id}?words=true&word_fields=text_uthmani,transliteration,location&per_page=all`)
  ]);

  if (!chapterRes.ok || !versesRes.ok) {
    throw new Error(`Failed to fetch surah data for ID: ${id}`);
  }

  const chapterData = await chapterRes.json();
  const versesData = await versesRes.json();

  return {
    chapter: chapterData.chapter,
    verses: (versesData.verses || []) as Verse[]
  };
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { chapter, verses } = await getSurahData(id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SurahStudyView chapter={chapter} verses={verses} />
      
      <footer className="border-t border-brand-border/50 py-12 text-center bg-background">
        <p className="text-sm font-medium text-foreground/30">
          Built with clear word-by-word transliteration. Data from Quran.com API v4.
        </p>
      </footer>
    </div>
  );
}
