/**
 * PHONETIC_INDEX maps DIN 31635 transliteration characters to 
 * local audio filenames in /public/audio/tajweed/.
 */
export const PHONETIC_INDEX: Record<string, string> = {
  // 28 Letters
  "'": '28_hamzah.mp3',
  "ʾ": '28_hamzah.mp3',
  "’": '28_hamzah.mp3',
  "b": "2_baa.mp3",
  "t": "3_taa.mp3",
  "ṯ": "4_thaa.mp3",
  "j": "5_jeem.mp3",
  "ḥ": "6_haa.mp3",
  "ḫ": "7_khaa.mp3",
  "d": "8_daal.mp3",
  "ḏ": "9_zaal.mp3",
  "r": "10_raa.mp3",
  "z": "11_zaa.mp3",
  "s": "12_seen.mp3",
  "š": "13_sheen.mp3",
  "ṣ": "14_saad.mp3",
  "ḍ": "15_daad.mp3",
  "ṭ": "16_taah.mp3",
  "ẓ": "17_zhaa.mp3",
  "ʿ": "18_ain.mp3",
  "ġ": "19_ghain.mp3",
  "f": "20_faa.mp3",
  "q": "21_qaaf.mp3",
  "k": "22_kaaf.mp3",
  "l": "23_laam.mp3",
  "m": "24_meem.mp3",
  "n": "25_noon.mp3",
  "h": "26_haah.mp3",
  "w": "27_waw.mp3",
  "y": "30_yaa.mp3",

  // Vowels (Long)
  "ā": "1_alif.mp3",
  "ī": "30_yaa.mp3",
  "ū": "27_waw.mp3",

  // Vowels (Short - Mapping to carriers/nearest fits)
  "a": "1_alif.mp3",
  "i": "30_yaa.mp3",
  "u": "27_waw.mp3",

  // Special Combined
  "la": "29_laaa.mp3"
};
