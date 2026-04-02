'use client';

import React, { useState, useEffect } from 'react';
import { getWordAudioUrl } from '@/lib/audioUtils';
import { Search, Volume2, CheckCircle2, XCircle } from 'lucide-react';

const DEBUG_WORDS = [
  { surah: 1, ayah: 1, word: 1, text: 'بِسْمِ', transliteration: "bis'mi" },
  { surah: 1, ayah: 1, word: 2, text: 'اللَّهِ', transliteration: 'l-lahi' },
  { surah: 1, ayah: 1, word: 3, text: 'الرَّحْمَنِ', transliteration: 'l-raḥmāni' },
  { surah: 1, ayah: 1, word: 4, text: 'الرَّحِيمِ', transliteration: 'l-raḥīmi' },
  { surah: 1, ayah: 2, word: 1, text: 'الْحَمْدُ', transliteration: 'al-ḥamdu' },
];

export default function DebugAudioPage() {
  const [results, setResults] = useState<Record<string, { status?: number; error?: string; playing?: boolean }>>({});
  const [userActivation, setUserActivation] = useState<boolean>(false);

  useEffect(() => {
    const checkActivation = () => {
      // @ts-ignore - navigator.userActivation is relatively new
      const isActive = !!(navigator.userActivation && navigator.userActivation.isActive);
      setUserActivation(isActive);
      console.log('DEBUG_AUDIO: User Activation State:', isActive);
    };

    window.addEventListener('click', checkActivation);
    checkActivation();

    return () => window.removeEventListener('click', checkActivation);
  }, []);

  const testPath = async (id: string, path: string) => {
    console.log(`DEBUG_AUDIO: Testing path for ${id}: ${path}`);
    try {
      const response = await fetch(path, { method: 'HEAD' });
      setResults(prev => ({
        ...prev,
        [id]: { ...prev[id], status: response.status }
      }));
      console.log(`DEBUG_AUDIO: ${id} fetch result: ${response.status}`);
    } catch (err) {
      setResults(prev => ({
        ...prev,
        [id]: { ...prev[id], error: String(err) }
      }));
      console.error(`DEBUG_AUDIO: ${id} fetch error:`, err);
    }
  };

  const forcePlay = (id: string, path: string) => {
    console.log(`DEBUG_AUDIO: Force playing ${id}: ${path}`);
    const audio = new Audio(path);
    
    setResults(prev => ({
      ...prev,
      [id]: { ...prev[id], playing: true }
    }));

    audio.play()
      .then(() => {
        console.log(`DEBUG_AUDIO: ${id} playback started`);
      })
      .catch(err => {
        console.error(`DEBUG_AUDIO: ${id} playback failed:`, err);
        setResults(prev => ({
          ...prev,
          [id]: { ...prev[id], error: err.name + ': ' + err.message, playing: false }
        }));
      });
    
    audio.onended = () => {
      setResults(prev => ({
        ...prev,
        [id]: { ...prev[id], playing: false }
      }));
    };
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 bg-[#F7F8F2] dark:bg-[#1C1F16] min-h-screen text-[#3E4A2E] dark:text-[#C5D1AF]">
      <header className="border-b border-[#E2E4D8] dark:border-[#323828] pb-4">
        <h1 className="text-3xl font-bold font-amiri text-[#3E4A2E] dark:text-[#C5D1AF]">Audio Diagnostic Tool</h1>
        <p className="text-[#7A5C33] dark:text-[#E5D3B3] mt-2">Testing local audio assets and browser constraints</p>
      </header>

      <div className="bg-white dark:bg-[#25291C] p-4 rounded-lg shadow-sm border border-[#E2E4D8] dark:border-[#323828]">
        <h2 className="font-semibold mb-2">Browser Status</h2>
        <div className="flex items-center space-x-4">
          <span>User Activation:</span>
          {userActivation ? (
            <span className="text-green-600 font-bold flex items-center gap-1">
              <CheckCircle2 size={18} /> ACTIVE
            </span>
          ) : (
            <span className="text-red-600 font-bold flex items-center gap-1">
              <XCircle size={18} /> INACTIVE
            </span>
          )}
          <span className="text-xs text-gray-500">(Click anywhere to activate)</span>
        </div>
      </div>

      <div className="space-y-4">
        {DEBUG_WORDS.map((word) => {
          const path = getWordAudioUrl(word.surah, word.ayah, word.word);
          const id = `${word.surah}_${word.ayah}_${word.word}`;
          
          return (
            <div key={id} className="bg-white dark:bg-[#25291C] p-6 rounded-xl border border-[#E2E4D8] dark:border-[#323828] shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-amiri font-bold">{word.text}</span>
                    <span className="text-sm text-[#7A5C33] dark:text-[#E5D3B3] italic">{word.transliteration}</span>
                  </div>
                  <div className="text-xs font-mono bg-gray-100 dark:bg-black/20 p-2 rounded border border-black/5 overflow-x-auto">
                    {path}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <button
                    onClick={() => testPath(id, path)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#3E4A2E] text-white rounded hover:bg-[#3E4A2E]/90 transition-colors text-sm font-medium"
                  >
                    <Search size={16} /> Test Path
                  </button>
                  <button
                    onClick={() => forcePlay(id, path)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#7A5C33] text-white rounded hover:bg-[#7A5C33]/90 transition-colors text-sm font-medium"
                  >
                    <Volume2 size={16} /> Force Play
                  </button>

                  <div className="flex items-center ml-2 space-x-2 min-w-[100px]">
                    {results[id]?.status === 200 && (
                      <span className="text-green-600 font-bold flex items-center gap-1" title="Status 200 OK">
                        <CheckCircle2 size={18} /> Found
                      </span>
                    )}
                    {results[id]?.status && results[id]?.status !== 200 && (
                      <span className="text-red-600 font-bold flex items-center gap-1" title={`Status ${results[id].status}`}>
                        <XCircle size={18} /> Error {results[id].status}
                      </span>
                    )}
                    {results[id]?.error && (
                      <div className="text-red-500 text-xs max-w-[150px] truncate" title={results[id].error}>
                        Error: {results[id].error}
                      </div>
                    )}
                    {results[id]?.playing && (
                      <span className="animate-pulse text-blue-500 flex items-center gap-1">
                        <Volume2 size={18} className="animate-bounce" /> Playing...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <footer className="text-sm text-[#7A5C33] dark:text-[#E5D3B3] border-t border-[#E2E4D8] dark:border-[#323828] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>Console Logs: Press <kbd className="bg-gray-100 dark:bg-black/30 px-1 rounded">F12</kbd> or <kbd className="bg-gray-100 dark:bg-black/30 px-1 rounded">Ctrl+Shift+I</kbd></p>
        <p className="font-mono text-xs opacity-50">v1.0.1 | develop branch</p>
      </footer>
    </div>
  );
}
