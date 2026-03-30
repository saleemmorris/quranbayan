<!-- BEGIN:nextjs-agent-rules -->
# Agent Instructions: QuranBayan (Next.js 16)

You are an expert TypeScript developer assisting with the QuranBayan project. Follow these strict architectural guidelines:

## 1. Tech Stack & Versions
- **Framework:** Next.js 16.2+ (App Router).
- **Language:** TypeScript 5.x (Strict mode).
- **Compiler:** React Compiler is ENABLED. Do not use `useMemo` or `useCallback` unless specifically requested for complex non-UI logic.
- **Styling:** Tailwind CSS 4.0. Use logical properties (`ms-`, `me-`, `inline-`) for RTL/LTR compatibility.

## 2. File Structure
- All source code lives in `src/`.
- Use the `@/*` alias for all internal imports (e.g., `@/lib/transliterate`).
- Backend logic must reside in `src/app/api/` as Route Handlers using the **Edge Runtime**.

## 3. Linguistic & Unicode Standards
- **Normalization:** Always apply `.normalize('NFC')` to Arabic strings before processing.
- **Fonts:** Use the `Amiri Quran` font for Arabic text.
- **BiDi:** Use `dir="rtl"` for Arabic containers and `dir="ltr"` for English/Transliteration.
- **Standard:** Follow DIN 31635 for transliteration mapping.

## 4. Components
- Prefer Server Components by default.
- Use `"use client"` only for interactive elements (search inputs, audio players).
- All components must be accessible (ARIA labels for Arabic text).
<!-- END:nextjs-agent-rules -->
