import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Logo component that renders the quranbayan logo SVG.
 * Handles light/dark transitions via CSS classes in the SVG.
 */
export default function Logo({ className = '', width = 160, height = 48 }: LogoProps) {
  return (
    <Link href="/" className={`inline-block ${className}`} aria-label="quranbayan.org home">
      <Image
        src="/images/logo/logo.svg"
        alt="quranbayan.org"
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
      />
    </Link>
  );
}
