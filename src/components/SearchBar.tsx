'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Book, Hash, MessageSquare } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useTypewriter } from '@/hooks/useTypewriter';

interface Suggestion {
  type: 'surah' | 'ayah' | 'keyword';
  title: string;
  subtitle?: string;
  href: string;
}

const mockSurahs = [
  { id: 1, name: "Al-Fatihah" },
  { id: 2, name: "Al-Baqarah" },
  { id: 18, name: "Al-Kahf" },
  { id: 36, name: "Ya-Sin" },
  { id: 67, name: "Al-Mulk" },
  { id: 114, name: "An-Nas" },
];

/**
 * Smart SearchBar with Autocomplete.
 * Categorizes suggestions into 'Jump to Surah', 'Jump to Ayah', and 'Keyword Search'.
 * Follows Zaytuna design system (Olive & Clay).
 */
export default function SearchBar({ 
  placeholder, 
  isHeader = false 
}: { 
  placeholder?: string;
  isHeader?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const typewriterText = useTypewriter([
    'Search Surah...',
    'Search Ayah...',
    'Try 2:255...'
  ]);

  const fullPlaceholder = isHeader ? "Search" : (placeholder || "Search Surah, Ayah (e.g., 2:255), or Keyword...");
  const shortPlaceholder = isHeader ? "Search" : typewriterText;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions when debounced query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestions([]);
      return;
    }

    const newSuggestions: Suggestion[] = [];
    const lowerQuery = debouncedQuery.toLowerCase();

    // 1. Check for 'Jump to Ayah' (regex matching \d+:\d+)
    const ayahMatch = debouncedQuery.match(/^(\d+):(\d+)$/);
    if (ayahMatch) {
      newSuggestions.push({
        type: 'ayah',
        title: `Jump to Ayah ${debouncedQuery}`,
        subtitle: `Go directly to Surah ${ayahMatch[1]}, Verse ${ayahMatch[2]}`,
        href: `/surah/${ayahMatch[1]}#ayah-${ayahMatch[2]}`
      });
    }

    // 2. Check for 'Jump to Surah'
    const surahMatches = mockSurahs.filter(s => 
      s.name.toLowerCase().includes(lowerQuery) || 
      s.id.toString() === debouncedQuery
    );
    surahMatches.forEach(s => {
      newSuggestions.push({
        type: 'surah',
        title: s.name,
        subtitle: `Surah #${s.id}`,
        href: `/surah/${s.id}`
      });
    });

    // 3. Always offer 'Keyword Search'
    newSuggestions.push({
      type: 'keyword',
      title: `Search for "${debouncedQuery}"`,
      subtitle: 'Perform a full-text linguistic search',
      href: `/search?q=${encodeURIComponent(debouncedQuery)}`
    });

    setSuggestions(newSuggestions);
  }, [debouncedQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (href: string) => {
    router.push(href);
    setIsFocused(false);
    setQuery('');
  };

  return (
    <div 
      ref={searchRef} 
      className={`relative transition-all duration-500 ease-in-out z-50 ${
        isHeader 
          ? (isFocused ? 'absolute inset-x-0 top-0 h-full bg-background flex items-center px-4 sm:px-6 lg:px-8' : 'w-auto') 
          : (isFocused ? 'fixed inset-x-0 top-0 h-24 bg-background/95 backdrop-blur-md flex items-center px-4 sm:px-6 lg:px-8 border-b border-brand-border' : 'w-full max-w-md')
      }`}
    >
      <form onSubmit={handleSearch} className="relative flex items-center w-full max-w-7xl mx-auto">
        <div className="relative flex-1 group">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={isFocused ? (isHeader ? "Search" : "") : shortPlaceholder} 
            className={`w-full rounded-full border border-brand-border bg-brand-card px-6 py-4 text-foreground shadow-sm focus:border-brand-clay focus:outline-none focus:ring-1 focus:ring-brand-clay transition-all pr-32 ${
              isHeader && !isFocused ? 'py-2 px-4 pr-10' : ''
            } ${!isHeader && isFocused ? 'py-5 px-8' : ''}`}
          />
          {/* Animated scrolling placeholder for focused state */}
          {isFocused && query === "" && !isHeader && (
            <div className="pointer-events-none absolute inset-y-0 left-6 right-32 flex items-center overflow-hidden">
              <span className="animate-marquee inline-block text-foreground/50 text-sm md:text-base">
                {fullPlaceholder}
              </span>
            </div>
          )}
        </div>
        <button 
          type="submit"
          className={`absolute right-2 flex items-center gap-2 rounded-full bg-brand-olive text-sm font-semibold text-white hover:opacity-90 transition-opacity cursor-pointer ${
            isHeader && !isFocused ? 'p-2' : 'p-2 sm:px-6 sm:py-3 top-1/2 -translate-y-1/2 mr-1'
          }`}
        >
          <Search className="h-4 w-4" strokeWidth={2.5} />
          <span className={isHeader && !isFocused ? 'hidden' : 'hidden sm:inline'}>Search</span>
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className={`absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-brand-border bg-brand-card shadow-xl backdrop-blur-sm max-w-7xl mx-auto ${
          isHeader || !isHeader ? 'top-full' : ''
        } ${!isHeader ? 'mt-4' : 'mt-2'}`}>
          <ul className="py-2">
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSuggestionClick(suggestion.href)}
                  className="flex w-full items-center gap-4 px-6 py-3 text-left transition-colors hover:bg-brand-clay/10 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-clay/5 text-brand-clay group-hover:bg-brand-olive/10 group-hover:text-brand-olive">
                    {suggestion.type === 'surah' && <Book className="h-5 w-5" />}
                    {suggestion.type === 'ayah' && <Hash className="h-5 w-5" />}
                    {suggestion.type === 'keyword' && <MessageSquare className="h-5 w-5" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground group-hover:text-brand-olive">
                      {suggestion.title}
                    </span>
                    {suggestion.subtitle && (
                      <span className="text-xs text-foreground/50">
                        {suggestion.subtitle}
                      </span>
                    )}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
