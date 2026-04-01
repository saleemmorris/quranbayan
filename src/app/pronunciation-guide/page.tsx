import React from 'react';
import Header from "@/components/Header";
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import TajweedPlayer from '@/components/TajweedPlayer';

interface ArabicLetter {
  letter: string;
  transliteration: string;
  makhraj: string;
  sound: string;
}

const ARABIC_LETTERS: ArabicLetter[] = [
  { letter: 'ا', transliteration: 'ā', makhraj: 'Empty space in mouth/throat', sound: 'alif' },
  { letter: 'ب', transliteration: 'b', makhraj: 'Inside of lips', sound: 'ba' },
  { letter: 'ت', transliteration: 't', makhraj: 'Tip of tongue/roots of upper teeth', sound: 'ta' },
  { letter: 'ث', transliteration: 'th', makhraj: 'Tip of tongue/edges of upper teeth', sound: 'tha' },
  { letter: 'ج', transliteration: 'j', makhraj: 'Middle of tongue/roof of mouth', sound: 'jeem' },
  { letter: 'ح', transliteration: 'ḥ', makhraj: 'Middle of throat', sound: 'hah-deep' },
  { letter: 'خ', transliteration: 'kh', makhraj: 'Top of throat', sound: 'kha' },
  { letter: 'د', transliteration: 'd', makhraj: 'Tip of tongue/roots of upper teeth', sound: 'dal' },
  { letter: 'ذ', transliteration: 'dh', makhraj: 'Tip of tongue/edges of upper teeth', sound: 'dhal' },
  { letter: 'ر', transliteration: 'r', makhraj: 'Tip of tongue/gums of upper teeth', sound: 'ra' },
  { letter: 'ز', transliteration: 'z', makhraj: 'Tip of tongue/edges of lower teeth', sound: 'zay' },
  { letter: 'س', transliteration: 's', makhraj: 'Tip of tongue/edges of lower teeth', sound: 'seen' },
  { letter: 'ش', transliteration: 'sh', makhraj: 'Middle of tongue/roof of mouth', sound: 'sheen' },
  { letter: 'ص', transliteration: 'ṣ', makhraj: 'Tip of tongue/edges of lower teeth', sound: 'sad-heavy' },
  { letter: 'ض', transliteration: 'ḍ', makhraj: 'Side of tongue/upper molars', sound: 'dad-heavy' },
  { letter: 'ط', transliteration: 'ṭ', makhraj: 'Tip of tongue/roots of upper teeth', sound: 'tah-heavy' },
  { letter: 'ظ', transliteration: 'ẓ', makhraj: 'Tip of tongue/edges of upper teeth', sound: 'zah-heavy' },
  { letter: 'ع', transliteration: 'ʿ', makhraj: 'Middle of throat', sound: 'ayn-deep' },
  { letter: 'غ', transliteration: 'gh', makhraj: 'Top of throat', sound: 'ghayn' },
  { letter: 'ف', transliteration: 'f', makhraj: 'Bottom lip/edges of upper teeth', sound: 'fa' },
  { letter: 'ق', transliteration: 'q', makhraj: 'Deepest part of tongue/soft palate', sound: 'qaf' },
  { letter: 'ك', transliteration: 'k', makhraj: 'Back of tongue/hard palate', sound: 'kaf' },
  { letter: 'ل', transliteration: 'l', makhraj: 'Edge of tongue/upper gums', sound: 'lam' },
  { letter: 'م', transliteration: 'm', makhraj: 'Outer part of lips', sound: 'meem' },
  { letter: 'ن', transliteration: 'n', makhraj: 'Tip of tongue/upper gums', sound: 'noon' },
  { letter: 'ه', transliteration: 'h', makhraj: 'Deepest part of throat', sound: 'ha' },
  { letter: 'و', transliteration: 'w', makhraj: 'Rounding of the lips', sound: 'waw' },
  { letter: 'ي', transliteration: 'y', makhraj: 'Middle of tongue/roof of mouth', sound: 'ya' },
];

const MAKHRAJ_GROUPS = [
  { title: 'Al-Jawf (The Empty Space)', letters: 'ا, و, ي', description: 'The empty space inside the mouth and throat.' },
  { title: 'Al-Halq (The Throat)', letters: 'ء, هـ, ع, ح, غ, خ', description: 'Divided into three parts: deepest, middle, and closest parts of the throat.' },
  { title: 'Al-Lisaan (The Tongue)', letters: 'ق, ك, ج, ش, ي, ض, ل, ن, ر, ط, د, ت, ص, ز, س, ظ, ذ, ث', description: 'The largest makhraj category, utilizing various parts of the tongue.' },
  { title: 'Ash-Shafataan (The Lips)', letters: 'ف, و, ب, م', description: 'Sounds produced using the upper and lower lips.' },
  { title: 'Al-Khayshum (The Nasal Passage)', letters: 'Ghunnah', description: 'The point of origin for nasalization sounds (Ghunnah).' },
];

export const metadata = {
  title: 'Pronunciation Guide - QuranBayan',
  description: 'Learn the correct makhraj and pronunciation of Arabic letters.',
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
            A comprehensive guide to the Arabic alphabet, DIN 31635 transliteration, and points of articulation (Makharij).
          </p>
        </header>

        {/* Makharij Overview */}
        <section className="mb-16">
          <h2 className="mb-8 text-2xl font-bold text-foreground flex items-center gap-3">
            <MapPin className="h-6 w-6 text-brand-clay" />
            Points of Articulation (Makharij)
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MAKHRAJ_GROUPS.map((group, index) => (
              <div key={index} className="rounded-2xl border border-brand-border bg-brand-card/50 p-6 shadow-sm transition-all hover:shadow-md">
                <h3 className="text-lg font-bold text-brand-olive">{group.title}</h3>
                <p className="mt-2 text-sm font-bold text-brand-clay">{group.letters}</p>
                <p className="mt-4 text-sm text-foreground/70 leading-relaxed">{group.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Alphabet Grid */}
        <section>
          <h2 className="mb-8 text-2xl font-bold text-foreground">Alphabet & Transliteration</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ARABIC_LETTERS.map((item, index) => (
              <div key={index} className="group flex flex-col rounded-2xl border border-brand-border bg-brand-card p-6 transition-all duration-300 hover:border-brand-clay/40 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-amiri text-5xl font-bold text-brand-olive">{item.letter}</span>
                  <TajweedPlayer soundName={item.sound} />
                </div>
                <div className="mt-6 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">Transliteration</span>
                    <span className="font-mono text-lg font-bold text-brand-clay">{item.transliteration}</span>
                  </div>
                  <div className="mt-4 border-t border-brand-border/50 pt-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground/70 block mb-1">Makhraj</span>
                    <p className="text-sm text-foreground/70 leading-snug">{item.makhraj}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-brand-border py-12 text-center">
        <p className="text-sm text-foreground/70">
          © {new Date().getFullYear()} quranbayan.org. Learning the makharij of the Noble Quran.
        </p>
      </footer>
    </div>
  );
}
