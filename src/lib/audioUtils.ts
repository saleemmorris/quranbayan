import { AUDIO_CDN_URL } from '@/constants/config';

function pad(num: number, size: number = 3): string {
  let s = num.toString();
  while (s.length < size) s = '0' + s;
  return s;
}

export function getWordAudioUrl(surah: number, ayah: number, word: number): string {
  const s = pad(surah);
  const a = pad(ayah);
  const w = pad(word);
  return `${AUDIO_CDN_URL}${s}_${a}_${w}.mp3`;
}

export function getWordAudioFallbackUrl(surah: number, ayah: number, word: number): string {
  const s = pad(surah);
  const a = pad(ayah);
  const w = pad(word);
  return `https://audio.quran.com/v2/word/${s}_${a}_${w}.mp3`;
}
