'use client';

import React from 'react';
import { Volume2 } from 'lucide-react';

interface TajweedPlayerProps {
  soundName: string;
}

/**
 * TajweedPlayer component for playing Arabic letter sounds.
 * Integrates with the audio files downloaded to /audio/tajweed/.
 */
export default function TajweedPlayer({ soundName }: TajweedPlayerProps) {
  const play = () => {
    const audio = new Audio(`/audio/tajweed/${soundName}.mp3`);
    audio.play().catch((err) => {
      console.warn(`Sound file not found for: ${soundName}`, err);
    });
  };

  return (
    <button
      onClick={play}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-olive/10 text-brand-olive transition-all hover:bg-brand-olive hover:text-white"
      aria-label={`Play sound for ${soundName}`}
    >
      <Volume2 className="h-5 w-5" />
    </button>
  );
}
