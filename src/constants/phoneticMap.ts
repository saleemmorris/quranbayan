/**
 * PHONETIC_INDEX maps DIN 31635 transliteration characters to 
 * audio fragments for syllabic reconstruction.
 */

export const CONSONANTS: Record<string, string> = {
  'l': 'lam',
  'r': 'ra',
  'ḥ': 'hha',
  'ḫ': 'khaa',
  'm': 'meem',
  't': 'taa',
  'f': 'faa',
  'n': 'noon',
  'b': 'baa',
  'ṯ': 'thaa',
  'j': 'jeem',
  'd': 'daal',
  'ḏ': 'zaal',
  'z': 'zaa',
  's': 'seen',
  'š': 'sheen',
  'ṣ': 'saad',
  'ḍ': 'daad',
  'ṭ': 'tah',
  'ẓ': 'zha',
  'ʿ': 'ayn',
  'ġ': 'ghayn',
  'q': 'qaf',
  'k': 'kaf',
  'h': 'ha',
  'w': 'waw',
  'y': 'ya',
  "'": 'hamzah',
  "ʾ": 'hamzah',
  "’": 'hamzah',
};

export const VOWELS: Record<string, string> = {
  'a': '_a',
  'i': '_i',
  'u': '_u',
  'ā': '_a_long',
  'ī': '_i_long',
  'ū': '_u_long'
};

export const PHONETIC_INDEX = {
  ...CONSONANTS,
  ...VOWELS
};
