import React from 'react';
import Header from "@/components/Header";
import SurahCard from "@/components/SurahCard";

interface Chapter {
  id: number;
  name_complex: string;
  name_arabic: string;
  translated_name: {
    name: string;
  };
}

async function getAllChapters(): Promise<Chapter[]> {
  const res = await fetch('https://api.quran.com/api/v4/chapters?language=en');
  
  if (!res.ok) {
    throw new Error('Failed to fetch surah list');
  }

  const data = await res.json();
  return data.chapters;
}

/**
 * All Surahs Page.
 * Displays a complete grid of all 114 Surahs.
 */
export default async function AllSurahsPage() {
  const chapters = await getAllChapters();

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-brand-clay/30">
      <Header />
      
      <main className="container mx-auto flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Explore <span className="text-brand-olive">All Surahs</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/70">
            Navigate through the 114 chapters of the Noble Quran.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {chapters.map((chapter) => (
            <SurahCard 
              key={chapter.id}
              number={chapter.id}
              arabicName={chapter.name_arabic}
              englishName={chapter.translated_name.name}
            />
          ))}
        </div>
      </main>

      <footer className="border-t border-brand-border py-12 text-center">
        <p className="text-sm text-foreground/50">
          © {new Date().getFullYear()} quranbayan.org.
        </p>
      </footer>
    </div>
  );
}
