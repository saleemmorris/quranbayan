/**
 * Audio Utilities for QuranBayan
 * Follows the SSS_AAA_WWW.mp3 naming convention (Surah_Ayah_Word).
 */

/**
 * Pads a number to a specific length with leading zeros.
 */
function pad(num: number, size: number = 3): string {
  let s = num.toString();
  while (s.length < size) s = "0" + s;
  return s;
}

/**
 * Returns the URL for a specific word's audio file.
 * Format: /audio/words/SSS_AAA_WWW.mp3
 */
export function getWordAudioUrl(surah: number, ayah: number, word: number): string {
  const s = pad(surah);
  const a = pad(ayah);
  const w = pad(word);
  return `/audio/words/${s}_${a}_${w}.mp3`;
}
