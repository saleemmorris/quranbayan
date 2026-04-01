import React from 'react';
import Header from "@/components/Header";
import Link from 'next/link';
import { ArrowLeft, Info, Music, Wind, Waves } from 'lucide-react';
import TajweedText from '@/components/TajweedText';

export const metadata = {
  title: 'Help to Read (Tajweed Guide) - QuranBayan',
  description: 'Learn the Tajweed color-coding system used on QuranBayan to improve your recitation.',
};

export default function HelpToReadPage() {
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

        <header className="mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Help to <span className="text-brand-olive">Read</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/70">
            Our color-coded transliteration system helps you apply fundamental Tajweed rules intuitively as you read.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Madd Section */}
          <section className="flex flex-col rounded-3xl border border-brand-border bg-brand-card p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2196F3]/10 text-[#2196F3]">
              <Waves className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Blue = Madd</h2>
            <p className="mt-4 flex-1 text-foreground/70 leading-relaxed">
              <strong>Long Vowels:</strong> Stretch these sounds for 4 to 6 counts. This occurs when a vowel is followed by a Madd letter (Alif, Waw, or Ya) with a Madd sign.
            </p>
            <div className="mt-8 rounded-xl bg-background p-4 text-center border border-brand-border">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground/70 block mb-2">Example</span>
              <div className="text-xl font-medium">
                <TajweedText transliteration="al-laḏīna āmanū" />
              </div>
            </div>
          </section>

          {/* Ghunnah Section */}
          <section className="flex flex-col rounded-3xl border border-brand-border bg-brand-card p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#4CAF50]/10 text-[#4CAF50]">
              <Wind className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Green = Ghunnah</h2>
            <p className="mt-4 flex-1 text-foreground/70 leading-relaxed">
              <strong>Nasalization:</strong> A vibrating sound produced through the nose. This happens on doubled <em>Meem</em> (mm) and <em>Noon</em> (nn).
            </p>
            <div className="mt-8 rounded-xl bg-background p-4 text-center border border-brand-border">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground/70 block mb-2">Example</span>
              <div className="text-xl font-medium">
                <TajweedText transliteration="innahuu" />
              </div>
            </div>
          </section>

          {/* Qalqalah Section */}
          <section className="flex flex-col rounded-3xl border border-brand-border bg-brand-card p-8 shadow-sm transition-all hover:shadow-md">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF5722]/10 text-[#FF5722]">
              <Music className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Orange = Qalqalah</h2>
            <p className="mt-4 flex-1 text-foreground/70 leading-relaxed">
              <strong>Echo Sound:</strong> A bouncing or echoing sound made when certain letters (q, t, b, j, d) appear with a Sukun or at the end of a word.
            </p>
            <div className="mt-8 rounded-xl bg-background p-4 text-center border border-brand-border">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground/70 block mb-2">Example</span>
              <div className="text-xl font-medium">
                <TajweedText transliteration="laqad" />
              </div>
            </div>
          </section>
        </div>

        <section className="mt-16 rounded-3xl border border-brand-olive/20 bg-brand-olive/5 p-8 md:p-12">
          <div className="flex items-start gap-6">
            <div className="shrink-0 rounded-full bg-brand-olive/10 p-3 text-brand-olive">
              <Info className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Interactive Learning</h2>
              <p className="mt-4 text-lg text-foreground/70 leading-relaxed">
                Notice the <strong>dotted underlines</strong> on the colored text above? You can click on any colored pattern to hear exactly how it should be pronounced. This allows you to master the makhraj (articulation point) and timing of each rule as you study.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-brand-border py-12 text-center">
        <p className="text-sm text-foreground/70">
          © {new Date().getFullYear()} quranbayan.org. Built for clarity and accuracy.
        </p>
      </footer>
    </div>
  );
}
