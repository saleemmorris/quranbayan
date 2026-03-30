import React from 'react';
import Logo from './Logo';

/**
 * Header component for quranbayan.org.
 * Sticky, glass-morphism effect, and brand-border.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        
        {/* Navigation / Actions can go here */}
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-foreground hover:text-brand-olive transition-colors">
            Surahs
          </button>
          <button className="bg-brand-clay text-white px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity">
            Search
          </button>
        </div>
      </div>
    </header>
  );
}
