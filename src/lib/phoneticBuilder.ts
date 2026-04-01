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
  'sh': '13_sheen',
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
  'ة': '26_haah',
  'لا': '29_laaa',
};

// Arabic Unicode Constants
const SHADDA = '\u0651';
const MADDAH = '\u0653';
const ALIF_MADDAH = '\u0622';

/**
 * Identifies letters followed by vowels and returns an array of audio filenames.
 * Handles Shadda (doubling) and Madd (lengthening).
 */
export function getPhoneticSequence(arabicText: string): string[] {
  if (!arabicText) return [];

  let text = arabicText.normalize('NFC');
  
  // Replace 'لا' with a unique internal symbol to avoid it being split
  // Using a private use area character or just a placeholder
  const LAAM_ALIF_PLACEHOLDER = '\uE000';
  text = text.replace(/لا/g, LAAM_ALIF_PLACEHOLDER);

  const sequence: string[] = [];
  
  // Tokenize into units (Letter + its Harakat)
  // Base characters: \u0621-\u064A, \u0622, and our placeholder
  const unitRegex = /([\u0621-\u064A\u0622\uE000])([\u064B-\u065F]*)/g;
  
  let match;
  while ((match = unitRegex.exec(text)) !== null) {
    const letter = match[1];
    const modifiers = match[2];
    
    let filename: string | undefined;

    if (letter === LAAM_ALIF_PLACEHOLDER) {
      filename = LETTER_MAP['لا'];
    } else {
      filename = LETTER_MAP[letter];
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
    // Maddah only doubles if it's NOT part of the Laam-Alif special filename already
    if (letter !== LAAM_ALIF_PLACEHOLDER) {
      const isMadd = letter === ALIF_MADDAH || modifiers.includes(MADDAH);
      if (isMadd) {
        sequence.push(filename);
      }
    }
  }

  return sequence;
}
