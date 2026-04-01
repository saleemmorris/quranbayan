# Agent Instructions: QuranBayan (Next.js 16) - Learning Tool Pivot

## 1. Workflow & Deployment
- **Pre-push Testing:** Before every push, project MUST be tested locally via `npx vercel dev`.
- **Validation:** Verify environment variables; the local build must succeed without console errors.
- **Branching:** `develop` for features; `main` for production-stable releases only.

## 2. Tech Stack & Architecture
- **Framework:** Next.js 16.2+ (App Router).
- **Language:** TypeScript 5.x (Strict mode).
- **Compiler:** React Compiler ENABLED. Avoid manual `useMemo`/`useCallback` unless handling non-UI heavy computation.
- **Styling:** Tailwind CSS 4.0. Prioritize logical properties (`ms-`, `me-`, `inline-`) for RTL-first layouts.
- **Runtime:** API Route Handlers in `src/app/api/` must use **Edge Runtime**.

## 3. Educational & Linguistic Logic (The Learning Pivot)
- **Word-Level Intelligence:** Every Ayah is a collection of interactive tokens.
- **Data Source:** Use **Quran.com API (v4)**. Fetch `word_fields` including `text_uthmani`, `transliteration`, and `location`.
- **Normalization:** Apply `.normalize('NFC')` to all Arabic strings.
- **Fonts:** Arabic text MUST use `Amiri Quran` (min-size 24px).
- **Transliteration:** Strictly follow **DIN 31635**. Transliteration is placed directly beneath its corresponding Arabic word in `Clay`.

## 4. Design System: Zaytuna (Olive & Clay)
- **Palette (Current CSS):**
  - **Backgrounds:** Light `#F7F8F2` (Parchment) | Dark `#1C1F16` (Dark Moss)
  - **Foregrounds:** Light `#3E4A2E` (Olive) | Dark `#C5D1AF` (Sage)
  - **Olive (Primary):** Light `#3E4A2E` | Dark `#C5D1AF` (Sage)
  - **Clay (Accent):** Light `#7A5C33` (Deep Tan) | Dark `#E5D3B3` (Light Sand)
  - **Cards:** Light `#FFFFFF` | Dark `#25291C` (Moss Card)
  - **Borders:** Light `#E2E4D8` | Dark `#323828`
- **Tajweed Specifics:**
  - **Madd Blue:** `#2196F3`
  - **Ghunnah:** `#3E4A2E` (Olive)
  - **Qalqalah:** `#D2B48C` (Classic Clay)
- **Usage Rules:**
  - `Olive`: Primary text, Surah titles, active learning states.
  - `Clay`: Word-level transliteration, progress indicators, and accent borders.

## 5. UI/UX Architecture: Learning Mode
- **Icons:** Use React-supported SVG libraries (e.g., Lucide-React). No external `<link>` tags.
- **Interactive Tokens:** Clicking an Arabic word triggers a "Root Analysis" drawer or tooltip.
- **Navigation (Header & Sidebar):**
    - **Background:** MUST have a distinct background (`bg-background` or specific brand color) with a border to ensure separation from main content.
    - Burger Menu replaces top-level "Surahs" link. Contains:
        1. Surah Index
        2. Pronunciation Guide (`/pronunciation-guide`)
        3. Help to Read (`/help-to-read`)
- **Search:** utilize "Smart Autocomplete" Command Palette. Auto-detect Surah name, `2:255`, or Keyword.

## 6. Security Posture
- **XSS:** Strictly forbid `dangerouslySetInnerHTML`. Use `html-react-parser` or `DOMPurify`.
- **Validation:** Use **Zod** for all API input and environment variable schema enforcement.
- **Headers:** Maintain strict CSP in `next.config.ts`.

## 7. SEO Standards
- **Metadata:** Use `generateMetadata` for dynamic routes.
- **Semantic HTML:** Use `<article>`, `<section>`, and `<nav>` appropriately.

## 8. Tajweed & Interactive Phonetics
- **Audio Assets:** All phonetic MP3s reside in `/public/audio/tajweed/`. Filenames are lowercase (e.g., `qaf.mp3`).
- **Phonetic Tokenization:**
    - **Madd (Long Vowels):** `ā`, `ī`, `ū` -> Color: `#2196F3`.
    - **Ghunnah (Nasality):** `nn`, `mm`, `n~` -> Color: `#3E4A2E`.
    - **Qalqalah (Echo):** `q, t, b, j, d` (syllable ends) -> Color: `#D2B48C`.
- **Interactive Component:** Use `<TajweedPlayer />` (Client Component). Provide visual pulse and trigger audio on click.

## 9. Phonetic Builder & Utility
- **Builder Logic:** Use `src/lib/phoneticBuilder.ts` to transform Arabic text into audio sequences.
- **Function:** `getPhoneticSequence(arabicText: string): string[]` returns an array of filenames from `/public/audio/tajweed/`.
- **Phonetic Handling:**
    - **Regex:** Identify letters followed by Harakat (Fathah, Kasrah, Dammah, Sukun).
    - **Shadda:** Double the corresponding letter's audio filename in the sequence.
    - **Madd:** Lengthen the sequence by doubling the carrier letter or identifying Maddah symbols.
- **Filenames:** Match the `1_alif` through `30_yaa` convention.

## 10. Build-Step & Asset Management
- **Automation:** Use `scripts/download-makharij.js` (or manual ZIP) to populate `/public/audio/tajweed/`.
- **Prebuild:** Ensure `package.json` includes `prebuild` scripts if assets are being fetched dynamically.

## 11. Next.js 16.2+ & React 19 Protocols
- **Component Defaults:** Default to **Server Components**. Move `'use client'` to the lowest possible "leaf" components.
- **Streaming:** Implement **Streaming with Suspense** for API-heavy data (e.g., Root Analysis).
- **Data Fetching:** Use **Async Server Components**. Leverage native `fetch` caching. 
- **Asset Preloading:** Preload critical Tajweed MP3s in `layout.tsx` via `<link rel="preload">`.
- **RTL Standards:** Use Tailwind 4.0 Logical Properties exclusively.
