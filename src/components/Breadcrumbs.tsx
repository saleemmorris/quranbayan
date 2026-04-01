'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mockSurahs } from '@/lib/surahs';

/**
 * Dynamic Breadcrumbs component that uses the current path.
 * Follows Zaytuna design system (Clay/Olive accents).
 */
export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Split path into segments and filter out empty ones
  const segments = pathname.split('/').filter(segment => segment !== '');
  
  // Base segment for Home
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      
      // Clean up labels (e.g., capitalize, replace hyphens)
      let label = segment.charAt(0).toUpperCase() + segment.slice(1);
      label = label.replace(/-/g, ' ');
      
      // Special handling for numeric IDs (like surah IDs) - now using shared data
      if (!isNaN(Number(segment))) {
        const surahId = Number(segment);
        const surah = mockSurahs.find(s => s.id === surahId);
        label = surah ? surah.name : `Surah ${segment}`;
      }
      
      return { label, href };
    })
  ];

  if (pathname === '/') return null;

  return (
    <nav aria-label="Breadcrumb" className="border-t border-brand-border/40 bg-background/95 py-2.5 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide">
          {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={breadcrumb.href} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-brand-border select-none">/</span>
                )}
                
                {isLast ? (
                  <span className="text-brand-clay font-bold" aria-current="page">
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link 
                    href={breadcrumb.href}
                    className="text-foreground/70 transition-colors hover:text-brand-olive"
                  >
                    {breadcrumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
