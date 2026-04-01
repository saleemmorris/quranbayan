import { VerseResponseSchema } from './quran';

describe('Quran API Schema Validation', () => {
  const sampleApiResponse = {
    "verse": {
      "id": 1,
      "verse_number": 1,
      "verse_key": "1:1",
      "hizb_number": 1,
      "rub_el_hizb_number": 1,
      "ruku_number": 1,
      "manzil_number": 1,
      "sajdah_number": null,
      "page_number": 1,
      "juz_number": 1,
      "words": [
        {
          "id": 1,
          "position": 1,
          "audio_url": "wbw/001_001_001.mp3",
          "char_type_name": "word",
          "page_number": 1,
          "line_number": 2,
          "text": "ﭑ",
          "translation": {
            "text": "In (the) name",
            "language_name": "english"
          },
          "transliteration": {
            "text": "bis'mi",
            "language_name": "english"
          }
        },
        {
          "id": 2,
          "position": 2,
          "audio_url": "wbw/001_001_002.mp3",
          "char_type_name": "word",
          "page_number": 1,
          "line_number": 2,
          "text": "ﭒ",
          "translation": {
            "text": "(of) Allah",
            "language_name": "english"
          },
          "transliteration": {
            "text": "l-lahi",
            "language_name": "english"
          }
        },
        {
          "id": 5,
          "position": 5,
          "audio_url": null,
          "char_type_name": "end",
          "page_number": 1,
          "line_number": 2,
          "text": "ﭕ",
          "translation": {
            "text": "(1)",
            "language_name": "english"
          },
          "transliteration": {
            "text": null,
            "language_name": "english"
          }
        }
      ]
    }
  };

  it('should validate the live API response for verse 1:1', () => {
    const result = VerseResponseSchema.safeParse(sampleApiResponse);
    
    if (!result.success) {
      console.error('Validation failed with errors:', JSON.stringify(result.error.format(), null, 2));
    }
    
    expect(result.success).toBe(true);
  });

  it('should validate a word with root and grammar_description', () => {
    const wordWithRoot = {
      id: 1,
      position: 1,
      text_uthmani: "بِسْمِ",
      root: "b s m",
      grammar_description: "noun",
      translation: { text: "In name" },
      transliteration: { text: "bismi" }
    };
    
    const responseWithRoot = {
      verse: {
        id: 1,
        verse_key: "1:1",
        words: [wordWithRoot]
      }
    };

    const result = VerseResponseSchema.safeParse(responseWithRoot);
    expect(result.success).toBe(true);
  });
});
