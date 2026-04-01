import React from 'react';
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import parse from 'html-react-parser';

interface SearchResult {
  verse_key: string;
  verse_id: number;
  text: string;
  translations: {
    text: string;
    resource_id: number;
    resource_name: string;
  }[];
}

interface SearchResponse {
  search: {
    query: string;
    total_results: number;
    current_page: number;
    total_pages: number;
    results: SearchResult[];
  };
}

/**
 * Functional search integration with Quran.com API v4.
 * Handles deep linguistic search across Ayahs and Surahs.
 */
async function searchQuran(query: string): Promise<SearchResponse | null> {
  if (!query) return null;
  
  try {
    const res = await fetch(`https://api.quran.com/api/v4/search?q=${encodeURIComponent(query)}&language=en`);
    if (!res.ok) throw new Error('Search failed');
    return await res.json();
  } catch (error) {
    console.error(`Searching Quran failed for: ${query}`, error);
    return null;
  }
}

/**
 * Search Results Page (Server Component).
 * Reads the 'q' parameter and displays results using Zaytuna design tokens.
 */
export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}) {
  const { q } = await searchParams;
  const query = q || '';
  
  // Call search function
  const searchData = await searchQuran(query);
  const results = searchData?.search.results || [];
  const totalResults = searchData?.search.total_results || 0;

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-brand-clay/30">
      <Header />
      
      <main className="container mx-auto flex-1 px-4 py-12 sm:px-6 lg:px-8">
        {/* Zaytuna Header Style */}
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Search Results for: <span className="text-brand-olive">&quot;{query}&quot;</span>
          </h1>
          {query && (
            <p className="mt-4 text-lg text-foreground/70">
              Found {totalResults} matches for your inquiry.
            </p>
          )}
          <div className="mt-10 w-full">
            <SearchBar placeholder="Search for another term..." />
          </div>
        </header>

        {/* Results Section */}
        <div className="space-y-6">
          {results.length === 0 ? (
            <div className="rounded-[2.5rem] border border-brand-border/40 bg-background/50 p-12 shadow-sm backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-6 rounded-full bg-brand-clay/10 p-6 text-brand-clay">
                  <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground">No results found</h2>
                <p className="mt-3 max-w-md text-foreground/70">
                  We couldn't find any exact matches. Try searching for a different keyword, Surah name, or verse key (e.g., 2:255).
                </p>
                <Link 
                  href="/surah"
                  className="mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-olive hover:opacity-80 transition-opacity"
                >
                  Browse All Surahs Instead
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {results.map((result) => (
                <Link 
                  key={result.verse_id}
                  href={`/surah/${result.verse_key.split(':')[0]}#ayah-${result.verse_key.split(':')[1]}`}
                  className="group block rounded-3xl border border-brand-border/40 bg-brand-card/50 p-8 shadow-sm transition-all hover:border-brand-clay/40 hover:shadow-md backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 text-brand-clay">
                      <BookOpen className="h-5 w-5" />
                      <span className="text-sm font-bold uppercase tracking-widest">Verse {result.verse_key}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-brand-olive opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="font-amiri text-2xl text-brand-olive leading-loose text-right">
                      {parse(result.text)}
                    </div>
                    {result.translations?.[0] && (
                      <div className="text-lg text-foreground/80 leading-relaxed italic">
                        {parse(result.translations[0].text)}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="mt-20 border-t border-brand-border/50 py-12 text-center">
        <p className="text-sm font-medium text-foreground/70">
          Powered by Quran.com API v4. Built for clarity and insight.
        </p>
      </footer>
    </div>
  );
}
