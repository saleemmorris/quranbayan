<!-- BEGIN:nextjs-agent-rules -->
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
  - **Backgrounds:** Light `#F7F8F2` (Parchment) | Dark `#1C1F16` (Dark Moss)
- **Usage Rules:**
  - `Olive`: Primary text, Surah titles, active learning states.
  - `Clay`: Word-level transliteration, progress indicators, interactive highlights.
  - Dark Mode: Prioritize `Sage` on `Dark Moss` for high-readability/low-smear.

## 5. UI/UX Architecture: Learning Mode
- **Icons:** NEVER use external `<link>` tags for icon fonts. Use an official/highly supported library for all UI icons to ensure SVG server-side rendering and tree-shaking. Size them using Tailwind `w-*` and `h-*` classes, and color them using `text-brand-*`.
- **Quiet Interface:** Minimize distractions. Avoid loud colors or non-functional animations.
- **Interactive Tokens:** Clicking an Arabic word triggers a "Root Analysis" drawer or tooltip.
- **Navigation:** Maintain a "Flat" hierarchy. Maximum 2 clicks to reach any Ayah study view.
- **Accessibility:** All Arabic tokens must have appropriate ARIA labels for screen readers.
- **Study Toggles:** Provide UI switches to hide/show Arabic, Transliteration, or Translation independently for memorization testing.
- **-Search Interactions:** All search inputs must utilize a "Smart Autocomplete" Command Palette pattern. Avoid manual category selectors; instead, auto-detect the user's intent (Surah name, Ayah coordinate like `2:255`, or Keyword) and categorize the dropdown results accordingly.
## 6. Security Posture
- **XSS Prevention:** Strictly forbid the use of `dangerouslySetInnerHTML`. All user-generated or external content must be sanitized or rendered using React's default escaping.
- **Input Validation:** Mandate the use of **Zod** for all API input validation and environment variable schema enforcement.
- **API Protection:** All new API routes must include rate-limiting logic to prevent abuse.
- **HTTP Headers:** Maintain strict security headers (CSP, HSTS, X-Frame-Options, etc.) as configured in `next.config.ts` and `middleware.ts`.

## 7. SEO Standards
- **Metadata:** All dynamic routes must export a `generateMetadata` function to ensure unique titles, descriptions, and OpenGraph tags.
- **Semantic HTML:** Use proper semantic tags (`<h1-h6>`, `<article>`, `<section>`, `<nav>`) to ensure content hierarchy is clear to search engines.
- **Structured Data:** Use the `JsonLd` component to provide Schema.org structured data (e.g., BreadcrumbList, Article) where appropriate.
- **Crawling:** Maintain `sitemap.ts` and `robots.ts` to guide search engine indexing.

<!-- END:nextjs-agent-rules -->
