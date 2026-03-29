# BayanScript 📖✨

**BayanScript** is a high-performance, Unicode-standardized web application designed to bridge the gap between Arabic Quranic script and English transliteration. 

Our mission is to provide students of the Quran with a phonetically accurate, standardized reading experience that preserves Tajweed nuances through digital precision and serverless efficiency.

---

## 🚀 Purpose
Transliteration is often inconsistent across different publishers. BayanScript solves this by:
* **Standardizing Phonetics:** Implementing a strict mapping based on the **DIN 31635** academic standard.
* **Unicode Excellence:** Handling complex Arabic diacritics (Harakaat) using UTF-8 NFC Normalization.
* **Serverless Processing:** Leveraging Edge functions to process transliteration logic instantly without a dedicated server.

---

## 🛠 Tech Stack (2026 Modern Standards)

### Frontend & Core
* **Next.js 16:** Utilizing **Partial Prerendering (PPR)** for instant page shells and **Turbopack** for lightning-fast builds.
* **TypeScript 5.x:** Providing end-to-end type safety for linguistic mapping and API responses.
* **Tailwind CSS 4.0:** Using native RTL support and container queries for a responsive reading experience.

### Backend (Serverless Architecture)
* **Next.js Route Handlers:** API logic living in `app/api/`, deployed as **Edge Functions**.
* **Supabase:** Used as a thin data layer for storing user bookmarks and verified Quranic text (PostgreSQL).
* **Vercel Data Cache:** Implementing aggressive caching for static Quranic Ayahs to minimize API calls.

### Linguistic Logic
* **Intl.Segmenter:** For locale-aware string splitting (crucial for not breaking cursive Arabic).
* **Amiri Quran Font:** A specialized Unicode font for perfect stacking of Quranic vowels.

---

## 🏗 System Architecture

1. **Client:** Requests an Ayah (e.g., Surah 1, Ayah 1).
2. **Edge Function (Backend):** - Fetches Uthmani script from the database.
   - Runs the `transliteration-engine.ts` (TypeScript logic).
   - Applies Tajweed rules (Ghunnah, Qalqalah) via Regex.
3. **Cache:** Stores the result so the next user receives it in <50ms.
4. **UI:** Renders side-by-side with synchronized highlighting.

---

## 📦 Key Features
- [x] **Zero-Latency Transliteration:** Powered by Vercel Edge Runtime.
- [x] **Unicode Normalization:** Automatically fixes "broken" Arabic characters.
- [x] **Smart Search:** Fuzzy matching that understands Arabic phonetics (e.g., "kh" vs "kh").
- [x] **Mobile First:** Designed for distraction-free reading on any device.

---

## 🛠 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/bayanscript.git](https://github.com/yourusername/bayanscript.git)
