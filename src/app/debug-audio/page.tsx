'use client';

import React, { useState, useEffect } from 'react';

const DEBUG_WORDS = [
  { id: '001_001_001', text: 'بِسْمِ', transliteration: "bis'mi", path: '/audio/words/001_001_001.mp3' },
  { id: '001_001_002', text: 'اللَّهِ', transliteration: 'l-lahi', path: '/audio/words/001_001_002.mp3' },
  { id: '001_001_003', text: 'الرَّحْمَنِ', transliteration: 'l-raḥmāni', path: '/audio/words/001_001_003.mp3' },
  { id: '001_001_004', text: 'الرَّحِيمِ', transliteration: 'l-raḥīmi', path: '/audio/words/001_001_004.mp3' },
  { id: '001_002_001', text: 'الْحَمْدُ', transliteration: 'al-ḥamdu', path: '/audio/words/001_002_001.mp3' },
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
            <span className="text-green-600 font-bold">ACTIVE (✓)</span>
          ) : (
            <span className="text-red-600 font-bold">INACTIVE (X)</span>
          )}
          <span className="text-xs text-gray-500">(Click anywhere to activate)</span>
        </div>
      </div>

      <div className="space-y-4">
        {DEBUG_WORDS.map((word) => (
          <div key={word.id} className="bg-white dark:bg-[#25291C] p-6 rounded-xl border border-[#E2E4D8] dark:border-[#323828] shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-amiri font-bold">{word.text}</span>
                  <span className="text-sm text-[#7A5C33] dark:text-[#E5D3B3]">{word.transliteration}</span>
                </div>
                <div className="text-xs font-mono bg-gray-100 dark:bg-black/20 p-1 rounded">
                  {word.path}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <button
                  onClick={() => testPath(word.id, word.path)}
                  className="px-4 py-2 bg-[#3E4A2E] text-white rounded hover:bg-[#3E4A2E]/90 transition-colors text-sm"
                >
                  Test Path
                </button>
                <button
                  onClick={() => forcePlay(word.id, word.path)}
                  className="px-4 py-2 bg-[#7A5C33] text-white rounded hover:bg-[#7A5C33]/90 transition-colors text-sm"
                >
                  Force Play
                </button>

                <div className="flex items-center ml-4 space-x-2">
                  {results[word.id]?.status === 200 && (
                    <span className="text-green-600 font-bold" title="Status 200 OK">✓ Found</span>
                  )}
                  {results[word.id]?.status && results[word.id]?.status !== 200 && (
                    <span className="text-red-600 font-bold" title={`Status ${results[word.id].status}`}>
                      X (Status: {results[word.id].status})
                    </span>
                  )}
                  {results[word.id]?.error && (
                    <div className="text-red-500 text-xs max-w-[200px] truncate" title={results[word.id].error}>
                      Error: {results[word.id].error}
                    </div>
                  )}
                  {results[word.id]?.playing && (
                    <span className="animate-pulse text-blue-500">🔊 Playing...</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="text-sm text-[#7A5C33] dark:text-[#E5D3B3] border-t border-[#E2E4D8] dark:border-[#323828] pt-4">
        <p>Results are also printed to the browser console with "DEBUG_AUDIO:" prefix.</p>
      </footer>
    </div>
  );
}
