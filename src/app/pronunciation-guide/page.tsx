import React from 'react';
import Header from "@/components/Header";
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PlaySoundButton from '@/components/PlaySoundButton';

interface ArabicLetter {
  letter: string;
  transliteration: string;
  rule: string;
  sound: string;
}

const ARABIC_LETTERS: ArabicLetter[] = [
  { letter: 'ا', transliteration: 'ā / \'', rule: 'Madd (Long Vowel)', sound: 'alif' },
  { letter: 'ب', transliteration: 'b', rule: 'Qalqalah (Echo)', sound: 'ba' },
  { letter: 'ت', transliteration: 't', rule: 'Qalqalah (Echo)', sound: 'ta' },
  { letter: 'ث', transliteration: 'th', rule: 'Soft', sound: 'tha' },
  { letter: 'ج', transliteration: 'j', rule: 'Qalqalah (Echo)', sound: 'jeem' },
  { letter: 'ح', transliteration: 'ḥ', rule: 'Heavy / Deep', sound: 'hah-deep' },
  { letter: 'خ', transliteration: 'kh', rule: 'Heavy / Deep', sound: 'kha' },
  { letter: 'د', transliteration: 'd', rule: 'Qalqalah (Echo)', sound: 'dal' },
  { letter: 'ذ', transliteration: 'dh', rule: 'Soft', sound: 'dhal' },
  { letter: 'ر', transliteration: 'r', rule: 'Rolling', sound: 'ra' },
  { letter: 'ز', transliteration: 'z', rule: 'Whistling', sound: 'zay' },
  { letter: 'س', transliteration: 's', rule: 'Whistling', sound: 'seen' },
  { letter: 'ش', transliteration: 'sh', rule: 'Spreading', sound: 'sheen' },
  { letter: 'ص', transliteration: 'ṣ', rule: 'Heavy / Whistling', sound: 'sad-heavy' },
  { letter: 'ض', transliteration: 'ḍ', rule: 'Heavy / Deep', sound: 'dad-heavy' },
  { letter: 'ط', transliteration: 'ṭ', rule: 'Heavy / Qalqalah', sound: 'tah-heavy' },
  { letter: 'ظ', transliteration: 'ẓ', rule: 'Heavy / Deep', sound: 'zah-heavy' },
  { letter: 'ع', transliteration: 'ʿ', rule: 'Heavy / Deep', sound: 'ayn-deep' },
  { letter: 'غ', transliteration: 'gh', rule: 'Heavy / Deep', sound: 'ghayn' },
  { letter: 'ف', transliteration: 'f', rule: 'Soft', sound: 'fa' },
  { letter: 'ق', transliteration: 'q', rule: 'Heavy / Qalqalah', sound: 'qaf' },
  { letter: 'ك', transliteration: 'k', rule: 'Thin', sound: 'kaf' },
  { letter: 'ل', transliteration: 'l', rule: 'Thin', sound: 'lam' },
  { letter: 'م', transliteration: 'm', rule: 'Ghunnah (if doubled)', sound: 'meem' },
  { letter: 'ن', transliteration: 'n', rule: 'Ghunnah (if doubled)', sound: 'noon' },
  { letter: 'ه', transliteration: 'h', rule: 'Deep', sound: 'ha' },
  { letter: 'و', transliteration: 'w / ū', rule: 'Madd (Long Vowel)', sound: 'waw' },
  { letter: 'ي', transliteration: 'y / ī', rule: 'Madd (Long Vowel)', sound: 'ya' },
];

export const metadata = {
  title: 'Pronunciation Guide - QuranBayan',
  description: 'Master Arabic pronunciation and Tajweed rules with our interactive guide.',
};

export default function PronunciationGuidePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="container mx-auto flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-olive transition-colors hover:text-brand-clay"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </div>

        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Pronunciation <span className="text-brand-olive">Guide</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/70">
            A comprehensive reference for Arabic letters, transliteration patterns, and fundamental Tajweed rules.
          </p>
        </header>

        <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-brand-border bg-brand-olive/5 text-sm font-bold uppercase tracking-widest text-brand-olive">
                  <th className="px-6 py-4">Letter</th>
                  <th className="px-6 py-4">Transliteration</th>
                  <th className="px-6 py-4">Tajweed Rule</th>
                  <th className="px-6 py-4">Listen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {ARABIC_LETTERS.map((item, index) => (
                  <tr key={index} className="transition-colors hover:bg-brand-olive/[0.02]">
                    <td className="px-6 py-6 font-amiri text-4xl text-brand-olive">
                      {item.letter}
                    </td>
                    <td className="px-6 py-6 font-mono text-lg font-medium text-brand-clay">
                      {item.transliteration}
                    </td>
                    <td className="px-6 py-6">
                      <span className="inline-flex rounded-full bg-brand-clay/10 px-3 py-1 text-xs font-bold text-brand-clay uppercase tracking-wider">
                        {item.rule}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <PlaySoundButton soundName={item.sound} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="border-t border-brand-border py-12 text-center">
        <p className="text-sm text-foreground/50">
          © {new Date().getFullYear()} quranbayan.org. Mastering the art of recitation.
        </p>
      </footer>
    </div>
  );
}
