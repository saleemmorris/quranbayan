/**
 * Phonetic Builder for QuranBayan
 * Maps Arabic text to a sequence of audio filenames for tajweed/phonetic playback.
 */

const LETTER_MAP: Record<string, string> = {
  'ا': '1_alif',
  'أ': '28_hamzah',
  'إ': '28_hamzah',
  'ؤ': '28_hamzah',
  'ئ': '28_hamzah',
  'ء': '28_hamzah',
  'آ': '1_alif', // Alif with Maddah
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
  'ي': '30_yaa',
  'ى': '30_yaa',
  'ة': '26_haah', // Usually haa sound at end of word/pause
  'لا': '29_laaa',
};

// Vowels (Harakat)
const FATHAH = '\u064E';
const DAMMAH = '\u064F';
const KASRAH = '\u0650';
const SUKUN = '\u0652';
const SHADDA = '\u0651';
const MADDAH = '\u0653';

/**
 * Identifies letters followed by vowels and returns an array of audio filenames.
 * Handles Shadda (doubling) and Madd (lengthening).
 */
export function getPhoneticSequence(arabicText: string): string[] {
  if (!arabicText) return [];

  // Normalize and split into components (letter + modifiers)
  const normalized = arabicText.normalize('NFC');
  const sequence: string[] = [];
  
  // Regex to match a letter followed by its harakat/modifiers
  // [^\u064B-\u065F] matches base characters
  // [\u064B-\u065F]* matches following harakat
  const unitRegex = /([^\u064B-\u065F]|[\u0621-\u064A])([\u064B-\u065F]*)/g;
  
  let match;
  while ((match = unitRegex.exec(normalized)) !== null) {
    const letter = match[1];
    const modifiers = match[2];
    
    // Check for special Laam-Alif case
    let filename = LETTER_MAP[letter];
    
    if (letter === 'ل' && modifiers.includes('ا')) {
      filename = LETTER_MAP['لا'];
    }

    if (!filename) continue;

    // Handle Shadda (Doubling the letter)
    if (modifiers.includes(SHADDA)) {
      sequence.push(filename);
      sequence.push(filename);
    } else {
      sequence.push(filename);
    }

    // Handle Madd (Lengthening)
    // Madd can be explicit Maddah symbol or a letter like Alif/Waw/Yaa acting as a carrier
    if (modifiers.includes(MADDAH)) {
      // Add an extra instance of the letter for lengthening
      sequence.push(filename);
    }
    
    // Handle vowel combinations that might imply Madd (lengthening)
    // In this context, if it's a letter followed by a vowel, we've already added the letter.
    // If we want to strictly follow "identify letters followed by vowels", 
    // we already have the filenames.
  }

  return sequence;
}
