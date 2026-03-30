'use client';

import React from 'react';
import Logo from './Logo';
import Breadcrumbs from './Breadcrumbs';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

/**
 * Header component for quranbayan.org.
 * Sticky, glass-morphism effect, and brand-border.
 * Now includes dynamic breadcrumbs and a theme toggle.
 * Uses Lucide icons per new AGENTS.md standards.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        <Logo />
        
        {/* Navigation / Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/surah" 
            className="text-sm font-medium text-foreground hover:text-brand-olive transition-colors"
          >
            Surahs
          </Link>
          
          <SearchBar isHeader={true} />
          
          <div className="h-6 w-px bg-brand-border mx-1 hidden sm:block" />
          
          <ThemeToggle />
        </div>
      </div>
      
      {/* Breadcrumb section at the bottom of the header */}
      <Breadcrumbs />
    </header>
  );
}
