import Header from "@/components/Header";
import SurahCard from "@/components/SurahCard";
import AyahView from "@/components/AyahView";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const sampleSurahs = [
    { number: 1, arabic: "الفاتحة", english: "The Opening" },
    { number: 2, arabic: "البقرة", english: "The Cow" },
    { number: 3, arabic: "آل عمران", english: "The Family of Imran" },
    { number: 4, arabic: "النساء", english: "The Women" },
    { number: 18, arabic: "الكهف", english: "The Cave" },
    { number: 36, arabic: "يس", english: "Ya-Sin" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-brand-clay/20">
      <Header />
      
      <main className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Experience the <span className="text-brand-olive">Quran</span> with <span className="text-brand-clay">Clarity</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-foreground/70">
            A modern, focused reading experience with clear word-by-word transliteration.
          </p>
          
          <div className="mt-8 w-full">
            <SearchBar />
          </div>
        </section>

        {/* Featured Section / Ayah of the Day */}
        <section className="mb-12">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-clay">
            Ayah of the Day
          </h2>
          <div className="rounded-2xl border border-brand-border bg-brand-card p-2 shadow-sm">
            <AyahView verseKey="1:1" />
          </div>
        </section>

        {/* Surah Grid */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Explore Surahs</h2>
            <Link 
              href="/surah" 
              className="text-sm font-medium text-brand-olive hover:underline"
            >
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sampleSurahs.map((surah) => (
              <SurahCard 
                key={surah.number}
                number={surah.number}
                arabicName={surah.arabic}
                englishName={surah.english}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-border py-8 text-center">
        <p className="text-sm text-foreground/50">
          © {new Date().getFullYear()} quranbayan.org. 
        </p>
      </footer>
    </div>
  );
}
