'use client';

import React from 'react';
import { Volume2 } from 'lucide-react';

interface TajweedPlayerProps {
  soundName: string;
}

/**
 * Mapping from Arabic letters to local audio filenames in /audio/tajweed/
 */
const ARABIC_LETTER_TO_SOUND: Record<string, string> = {
  'ا': '1_alif',
  'ب': '2_baa',
  'ت': '3_taa',
  'ث': '4_thaa',
  'ج': '5_jeem',
  'ح': '6_haa',
  'خ': '7_khaa',
  'د': '8_daal',
  'ذ': '9_zaal',
  'ر': '10_raa',
  'ز': '11_zaa',
  'س': '12_seen',
  'ش': '13_sheen',
  'ص': '14_saad',
  'ض': '15_daad',
  'ط': '16_taah',
  'ظ': '17_zhaa',
  'ع': '18_ain',
  'غ': '19_ghain',
  'ف': '20_faa',
  'ق': '21_qaaf',
  'ك': '22_kaaf',
  'ل': '23_laam',
  'م': '24_meem',
  'ن': '25_noon',
  'ه': '26_haah',
  'و': '27_waw',
  'ء': '28_hamzah',
  'ي': '30_yaa',
};

/**
 * TajweedPlayer component for playing Arabic letter sounds.
 * Integrates with the local audio files in /audio/tajweed/.
 */
export default function TajweedPlayer({ soundName }: TajweedPlayerProps) {
  const play = () => {
    // Check if soundName is an Arabic letter, otherwise use it as a filename
    const fileName = ARABIC_LETTER_TO_SOUND[soundName] || soundName.toLowerCase();
    const audio = new Audio(`/audio/tajweed/${fileName}.mp3`);
    audio.play().catch((err) => {
      console.warn(`Sound file not found for: ${fileName}`, err);
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
