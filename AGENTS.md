# Agent Instructions: QuranBayan (Next.js 16) - Learning Tool Pivot

## 1. Workflow & Deployment
- **Pre-push Testing:** Before every push to `develop` or `main`, the project MUST be tested locally via `npx vercel dev`.
- **Validation:** Verify environment variables; the local build must succeed without console errors.
- **Branching Strategy:** - `develop`: Feature incubation and learning-tool refinements.
  - `main`: Production-stable releases only. Merge only after Vercel local simulation is verified.

## 2. Tech Stack & Architecture
- **Framework:** Next.js 16.2+ (App Router).
- **Language:** TypeScript 5.x (Strict mode).
- **Compiler:** React Compiler ENABLED. Avoid `useMemo`/`useCallback` unless handling non-UI heavy computation.
- **Styling:** Tailwind CSS 4.0. Prioritize logical properties (`ms-`, `me-`, `inline-`) for RTL-first layouts.
- **Runtime:** API Route Handlers in `src/app/api/` must use **Edge Runtime**.

## 3. Educational & Linguistic Logic (The Learning Pivot)
- **Word-Level Intelligence:** The UI must support "Word-by-Word" analysis. Every Ayah is a collection of interactive tokens.
- **Data Source:** Use **Quran.com API (v4)**. Fetch `word_fields` including `text_uthmani`, `transliteration`, and `location`.
- **Normalization:** Apply `.normalize('NFC')` to all Arabic strings before rendering.
- **Fonts:** Arabic text MUST use `Amiri Quran` (min-size 24px).
- **Transliteration:** Strictly follow **DIN 31635**. Transliterated text should be placed directly beneath its corresponding Arabic word in `Clay`.
- **BiDi Control:** Use `dir="rtl"` for Arabic/Word containers and `dir="ltr"` for Analysis/English sections.

### Linguistic Standards
- **Word-Level Stacks:** Mandate a minimum `gap-y-3` between Arabic text and its transliteration to ensure no visual overlap of descenders; the Arabic word must have a `leading-[2.5]` to prevent clipping.

## 4. Design System: Zaytuna (Olive & Clay)
- **Palette:**
  - **Olive (Primary):** Light `#3E4A2E` | Dark `#C5D1AF` (Sage)
  - **Clay (Accent):** Light `#D2B48C` (Tan) | Dark `#4B3B2F` (Earth)
  - **Madd Blue (Rule):** `#2196F3`
  - **Backgrounds:** Light `#F7F8F2` (Parchment) | Dark `#1C1F16` (Dark Moss)
- **Usage Rules:**
  - `Olive`: Primary text, Surah titles, active learning states, and Ghunnah highlighting.
  - `Clay`: Word-level transliteration, progress indicators, interactive highlights, and Qalqalah tokens.
  - Dark Mode: Prioritize `Sage` on `Dark Moss` for high-readability/low-smear.

## 5. UI/UX Architecture: Learning Mode
- **Icons:** NEVER use external `<link>` tags. Use a React-supported SVG library (e.g., Lucide-React) for tree-shaking.
- **Quiet Interface:** Minimize distractions. Avoid loud colors or non-functional animations.
- **Interactive Tokens:** Clicking an Arabic word triggers a "Root Analysis" drawer or tooltip.
- **Navigation:** Maintain a "Flat" hierarchy. Maximum 2 clicks to reach any Ayah study view.
- **Burger Menu:** Replace top-level "Surahs" link with a Burger Menu containing:
    1. Surah Index
    2. Pronunciation Guide (`/pronunciation-guide`)
    3. Help to Read (`/help-to-read`)
- **Study Toggles:** Provide UI switches to hide/show Arabic, Transliteration, or Translation independently.
- **Search:** Utilize a "Smart Autocomplete" Command Palette. Auto-detect intent (Surah name, `2:255`, or Keyword).

## 6. Security Posture
- **XSS:** Strictly forbid `dangerouslySetInnerHTML`. 
- **Validation:** Use **Zod** for all API input and env-var schema enforcement.
- **Headers:** Maintain strict CSP and HSTS headers in `next.config.ts`.

## 7. SEO Standards
- **Metadata:** Use `generateMetadata` for dynamic routes.
- **Semantic HTML:** Use `<article>`, `<section>`, and `<nav>` appropriately.
- **Crawling:** Maintain `sitemap.ts` and `robots.ts`.

## 8. Tajweed & Interactive Phonetics
- **Audio Assets:** All phonetic MP3s reside in `/public/audio/tajweed/`. Filenames must be lowercase (e.g., `ha.mp3`, `madd_6.mp3`).
- **Phonetic Tokenization:** Parse transliteration strings into clickable triggers with specific colors:
    - **Madd (Long Vowels):** `ā`, `ī`, `ū` -> Color: `#2196F3` (Blue).
    - **Ghunnah (Nasality):** `nn`, `mm`, `n~` -> Color: `#3E4A2E` (Olive).
    - **Qalqalah (Echo):** `q, t, b, j, d` (at syllable ends) -> Color: `#D2B48C` (Clay).
- **Interactive Component:** Use `<TajweedPlayer />` (Client Component). Provide visual feedback (subtle pulse) and trigger audio on click.
- **Accessibility:** Interactive tokens must have `aria-label` describing the rule (e.g., "Madd: Long vowel 4 counts").

## 9. Build-Step Audio Fetching
- **Automation:** Use `scripts/download-makharij.js` to fetch letter sounds from EveryAyah/Ayman Sowaid datasets during the `prebuild` phase.
- **Consistency:** The "Pronunciation Guide" page must use a CSS Grid/Table layout mapping symbols to Arabic letters and audio triggers.