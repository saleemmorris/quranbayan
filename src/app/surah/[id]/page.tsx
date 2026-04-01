import React from 'react';
import Header from "@/components/Header";
import SurahStudyView from "@/components/SurahStudyView";
import { Metadata } from 'next';
import JsonLd from "@/components/JsonLd";
import { SurahData, Verse, ChapterResponse, VersesByChapterResponse } from '@/types/quran';

async function getSurahData(id: string): Promise<SurahData> {
  const [chapterRes, versesRes] = await Promise.all([
    fetch(`https://api.quran.com/api/v4/chapters/${id}?language=en`),
    fetch(`https://api.quran.com/api/v4/verses/by_chapter/${id}?words=true&word_fields=text_uthmani,transliteration,location,root_template,grammar_description&per_page=all`)
  ]);

  if (!chapterRes.ok || !versesRes.ok) {
    throw new Error(`Failed to fetch surah data for ID: ${id}`);
  }

  const chapterData: ChapterResponse = await chapterRes.json();
  const versesData: VersesByChapterResponse = await versesRes.json();

  return {
    chapter: chapterData.chapter,
    verses: versesData.verses || []
  };
}

/**
 * Generate dynamic SEO metadata for each Surah.
 */
export async function generateMetadata(
  props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await props.params;
  const { chapter } = await getSurahData(id);

  const title = `Surah ${chapter.name_complex} - QuranBayan`;
  const description = `Read and study ${chapter.name_complex} (${chapter.name_arabic}) on QuranBayan. Explore ${chapter.verses_count} verses with clear word-by-word transliteration and root analysis. Revealed in ${chapter.revelation_place}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://quranbayan.org/surah/${id}`,
      siteName: 'QuranBayan',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { chapter, verses } = await getSurahData(id);

  // Schema.org Article data for the Surah
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Surah ${chapter.name_complex}`,
    description: `Study ${chapter.name_complex} on QuranBayan.`,
    author: {
      '@type': 'Organization',
      name: 'QuranBayan',
    },
    publisher: {
      '@type': 'Organization',
      name: 'QuranBayan',
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={jsonLd} />
      <Header />
      <SurahStudyView chapter={chapter} verses={verses} />
      
      <footer className="border-t border-brand-border/50 py-12 text-center bg-background">
        <p className="text-sm font-medium text-foreground/70">
          Built with clear word-by-word transliteration. Data from Quran.com API v4.
        </p>
      </footer>
    </div>
  );
}
