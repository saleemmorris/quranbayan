'use client';

import React from 'react';
import { X, Book, HelpCircle, Settings as SettingsIcon } from 'lucide-react';
import Link from 'next/link';

interface NavSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Main Navigation Sidebar for quranbayan.org.
 * Provides access to Surahs, Help Guide, and Settings.
 */
export default function NavSidebar({ isOpen, onClose }: NavSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 cursor-pointer ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed start-0 top-0 z-[70] h-full w-full max-w-xs bg-background shadow-2xl transition-transform duration-500 ease-in-out border-e border-brand-border ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-full flex-col p-6">
          <header className="flex items-center justify-between border-b border-brand-border pb-6">
            <h2 className="text-xl font-bold text-foreground">Menu</h2>
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-brand-clay/10 transition-colors"
              aria-label="Close Menu"
            >
              <X className="h-6 w-6 text-brand-olive" strokeWidth={2.5} />
            </button>
          </header>

          <nav className="mt-8 flex-1">
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/surah" 
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground transition-colors hover:bg-brand-clay/10 hover:text-brand-olive group"
                >
                  <Book className="h-5 w-5 text-brand-clay group-hover:text-brand-olive" />
                  <span className="font-semibold">Explore Surahs</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/pronunciation-guide" 
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground transition-colors hover:bg-brand-clay/10 hover:text-brand-olive group"
                >
                  <HelpCircle className="h-5 w-5 text-brand-clay group-hover:text-brand-olive" />
                  <span className="font-semibold">Pronunciation Guide</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/help-to-read" 
                  onClick={onClose}
                  className="flex items-center gap-4 rounded-xl px-4 py-3 text-foreground transition-colors hover:bg-brand-clay/10 hover:text-brand-olive group"
                >
                  <HelpCircle className="h-5 w-5 text-brand-clay group-hover:text-brand-olive" />
                  <span className="font-semibold">Help to Read</span>
                </Link>
              </li>
            </ul>
          </nav>

          <footer className="mt-auto border-t border-brand-border pt-6">
            <p className="text-center text-xs text-foreground/70 font-medium">
              © {new Date().getFullYear()} quranbayan.org
            </p>
          </footer>
        </div>
      </aside>
    </>
  );
}
