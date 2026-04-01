import React from 'react';
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";

/**
 * Dummy function for future Quran.com API integration.
 * Will handle deep linguistic search across Ayahs and Surahs.
 */
async function searchQuran(query: string) {
  // Placeholder for future Quran.com API v4 /search endpoint
  console.log(`Searching Quran for: ${query}`);
  return [];
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
  
  // Call dummy search function
  const results = await searchQuran(query);

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-brand-clay/30">
      <Header />
      
      <main className="container mx-auto flex-1 px-4 py-12 sm:px-6 lg:px-8">
        {/* Zaytuna Header Style */}
        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Search Results for: <span className="text-brand-olive">&quot;{query}&quot;</span>
          </h1>
          <p className="mt-4 text-lg text-foreground/60">
            Linguistic analysis and word-by-word matches for your inquiry.
          </p>
          <div className="mt-10 w-full">
            <SearchBar placeholder="Search for another term..." />
          </div>
        </header>

        {/* Results Section */}
        <div className="rounded-[2.5rem] border border-brand-border/40 bg-background/50 p-12 shadow-sm backdrop-blur-sm">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-6 rounded-full bg-brand-clay/10 p-6 text-brand-clay">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground">No results found yet</h2>
              <p className="mt-3 max-w-md text-foreground/60">
                The search index is currently being populated. Deep root analysis and 
                full-text search will be available shortly.
              </p>
              <button className="mt-10 text-sm font-bold uppercase tracking-widest text-brand-olive hover:opacity-80 transition-opacity">
                Browse All Surahs Instead
              </button>
            </div>
          ) : (
            <div>{/* Results mapping will go here */}</div>
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
