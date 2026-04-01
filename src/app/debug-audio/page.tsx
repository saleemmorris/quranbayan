'use client';

import React, { useState, useEffect } from 'react';
import { getWordAudioUrl } from '@/lib/audioUtils';
import { CheckCircle2, XCircle, Volume2, Search } from 'lucide-react';

const TEST_WORDS = [
  { text: 'بِسْمِ', surah: 1, ayah: 1, word: 1 },
  { text: 'ٱللَّهِ', surah: 1, ayah: 1, word: 2 },
  { text: 'ٱلرَّحْمَـٰنِ', surah: 1, ayah: 1, word: 3 },
  { text: 'ٱلرَّحِيمِ', surah: 1, ayah: 1, word: 4 },
  { text: 'ٱلْحَمْدُ', surah: 1, ayah: 2, word: 1 },
];

export default function DebugAudioPage() {
  const [results, setResults] = useState<Record<string, { status?: number; error?: string }>>({});
  const [userActivation, setUserActivation] = useState<boolean>(false);

  useEffect(() => {
    // Check activation state
    const checkActivation = () => {
      // @ts-ignore - navigator.userActivation is relatively new
      const isActive = navigator.userActivation?.isActive || false;
      setUserActivation(isActive);
      console.log('DEBUG_AUDIO: navigator.userActivation.isActive ->', isActive);
    };

    const timer = setInterval(checkActivation, 1000);
    return () => clearInterval(timer);
  }, []);

  const testPath = async (path: string) => {
    console.log(`DEBUG_AUDIO: Testing path -> ${path}`);
    try {
      const response = await fetch(path, { method: 'HEAD' });
      console.log(`DEBUG_AUDIO: Response for ${path} -> Status ${response.status}`);
      setResults(prev => ({ ...prev, [path]: { status: response.status } }));
    } catch (err: any) {
      console.error(`DEBUG_AUDIO: Fetch error for ${path} ->`, err);
      setResults(prev => ({ ...prev, [path]: { error: err.message } }));
    }
  };

  const forcePlay = async (path: string) => {
    console.log(`DEBUG_AUDIO: Force playing -> ${path}`);
    try {
      const audio = new Audio(path);
      await audio.play();
      console.log(`DEBUG_AUDIO: Playback started successfully for ${path}`);
    } catch (err: any) {
      console.error(`DEBUG_AUDIO: Playback failed for ${path} ->`, err);
      alert(`Playback failed: ${err.name} - ${err.message}`);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2 text-brand-olive">Audio Diagnostic Tool</h1>
      <p className="text-foreground/70 mb-8">Verify local asset existence and bypass Tajweed logic.</p>

      <div className="bg-brand-clay/10 p-4 rounded-xl mb-8 border border-brand-clay/20">
        <h2 className="text-sm font-bold uppercase tracking-widest mb-2">Browser State</h2>
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${userActivation ? 'bg-green-500' : 'bg-amber-500'}`} />
          <span className="font-mono text-sm">
            navigator.userActivation.isActive: <span className="font-bold">{userActivation ? 'TRUE' : 'FALSE'}</span>
          </span>
        </div>
        <p className="text-xs text-foreground/60 mt-2 italic">
          Note: TRUE means the browser will likely allow audio. FALSE means it might block until you click something.
        </p>
      </div>

      <div className="space-y-4">
        {TEST_WORDS.map((w) => {
          const path = getWordAudioUrl(w.surah, w.ayah, w.word);
          const res = results[path];

          return (
            <div key={path} className="bg-background border border-brand-border rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <span className="font-amiri text-4xl text-brand-olive min-w-[80px]" dir="rtl">{w.text}</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground/50 uppercase">Location {w.surah}:{w.ayah}:{w.word}</span>
                  <code className="text-sm bg-foreground/5 px-2 py-1 rounded mt-1">{path}</code>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {res && (
                  <div className="mr-4 flex items-center gap-2">
                    {res.status === 200 ? (
                      <><CheckCircle2 className="text-green-500 h-5 w-5" /> <span className="text-xs font-bold text-green-600">FOUND</span></>
                    ) : (
                      <><XCircle className="text-red-500 h-5 w-5" /> <span className="text-xs font-bold text-red-600">ERROR {res.status || res.error}</span></>
                    )}
                  </div>
                )}

                <button
                  onClick={() => testPath(path)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-clay/10 text-brand-clay hover:bg-brand-clay/20 transition-all font-bold text-sm"
                >
                  <Search className="h-4 w-4" />
                  Test Path
                </button>

                <button
                  onClick={() => forcePlay(path)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-olive text-white hover:opacity-90 transition-all font-bold text-sm"
                >
                  <Volume2 className="h-4 w-4" />
                  Force Play
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="mt-12 pt-8 border-t border-brand-border text-foreground/50 text-sm italic">
        Check the browser console (F12) for detailed logs prefixed with <strong>DEBUG_AUDIO:</strong>
      </footer>
    </div>
  );
}
