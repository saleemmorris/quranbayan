'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import Breadcrumbs from './Breadcrumbs';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';
import NavSidebar from './NavSidebar';
import { Menu } from 'lucide-react';

/**
 * Header component for quranbayan.org.
 * Sticky, glass-morphism effect, and brand-border.
 * Now includes dynamic breadcrumbs, a theme toggle, and a navigation sidebar.
 * Uses Lucide icons per new AGENTS.md standards.
 */
export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-brand-clay/10 transition-colors text-foreground group"
            aria-label="Open Menu"
          >
            <Menu className="h-6 w-6 text-brand-olive group-hover:text-brand-clay transition-colors" strokeWidth={2.5} />
          </button>
          <Logo />
        </div>
        
        {/* Navigation / Actions */}
        <div className="flex items-center gap-4">
          <SearchBar isHeader={true} />
          
          <div className="h-6 w-px bg-brand-border mx-1 hidden sm:block" />
          
          <ThemeToggle />
        </div>
      </div>
      
      {/* Navigation Sidebar */}
      <NavSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Breadcrumb section at the bottom of the header */}
      <Breadcrumbs />
    </header>
  );
}
