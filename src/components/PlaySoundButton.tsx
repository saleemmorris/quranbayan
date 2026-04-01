'use client';

import React from 'react';
import { Volume2 } from 'lucide-react';

interface PlaySoundButtonProps {
  soundName: string;
}

export default function PlaySoundButton({ soundName }: PlaySoundButtonProps) {
  const play = () => {
    const audio = new Audio(`/assets/audio/letters/${soundName}.mp3`);
    audio.play().catch(() => console.warn(`Sound not found: ${soundName}`));
  };

  return (
    <button
      onClick={play}
      className="flex items-center gap-2 rounded-full bg-brand-olive/10 px-4 py-2 text-sm font-semibold text-brand-olive transition-all hover:bg-brand-olive hover:text-white"
      aria-label={`Listen to ${soundName}`}
    >
      <Volume2 className="h-4 w-4" />
      <span>Listen</span>
    </button>
  );
}
