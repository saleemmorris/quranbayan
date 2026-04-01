import { z } from 'zod';

/**
 * Zod Schemas for Quran.com API V4 validation
 */

export const WordSchema = z.object({
  id: z.number(),
  position: z.number(),
  text_uthmani: z.string(),
  root: z.string().nullable().optional(),
  grammar_description: z.string().nullable().optional(),
  translation: z.object({ text: z.string() }).optional(),
  transliteration: z.object({ text: z.string() }).optional(),
  location: z.string().optional(),
});

export const VerseResponseSchema = z.object({
  verse: z.object({
    id: z.number(),
    verse_key: z.string(),
    words: z.array(WordSchema),
  }),
});

export type WordZod = z.infer<typeof WordSchema>;
export type VerseResponse = z.infer<typeof VerseResponseSchema>;

/**
 * Quran.com API V4 Types (Manual Interfaces)
 * 
 * This file defines the TypeScript interfaces for the Quran.com API V4 responses,
 * specifically focusing on the 'Verses by Key' and 'Verses by Chapter' endpoints.
 * These types include linguistic metadata such as root templates, grammar descriptions,
 * and transliterations as required by the QuranBayan learning pivot.
 */

export interface WordTransliteration {
  text: string;
  language_name: string;
}

export interface WordTranslation {
  text: string;
  language_name: string;
}

export interface Word {
  id: number;
  position: number;
  audio_url?: string;
  text_uthmani: string;
  text_indopak?: string;
  text_imlaei?: string;
  location: string;
  page_number?: number;
  line_number?: number;
  code_v1?: string;
  code_v2?: string;
  v1_page?: number;
  v2_page?: number;
  char_type_name: string;
  root_template?: string;
  root_modern?: string;
  grammar_description?: string;
  transliteration?: WordTransliteration;
  translation?: WordTranslation;
  root?: string; // Added for compatibility with WordSchema
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: number | null;
  page_number: number;
  juz_number: number;
  words: Word[];
}

/**
 * Response for GET https://api.quran.com/api/v4/verses/by_key/{verse_key}
 */
export interface VersesByKeyResponse {
  verse: Verse;
}

/**
 * Response for GET https://api.quran.com/api/v4/verses/by_chapter/{chapter_id}
 */
export interface VersesByChapterResponse {
  verses: Verse[];
  pagination: {
    per_page: number;
    current_page: number;
    next_page: number | null;
    total_pages: number;
    total_records: number;
  };
}

export interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

/**
 * Response for GET https://api.quran.com/api/v4/chapters/{id}
 */
export interface ChapterResponse {
  chapter: Chapter;
}

/**
 * Consolidated Surah Data for local usage
 */
export interface SurahData {
  chapter: Chapter;
  verses: Verse[];
}
