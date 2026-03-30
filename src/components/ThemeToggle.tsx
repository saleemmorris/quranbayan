'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

/**
 * ThemeToggle component using Lucide React icons.
 * Toggles between light and dark modes.
 */
export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 flex items-center justify-center">
        <div className="h-5 w-5 rounded-full bg-brand-border animate-pulse" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-brand-clay/10 transition-colors focus:outline-none"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-brand-olive" strokeWidth={2} />
      ) : (
        <Moon className="h-6 w-6 text-brand-olive" strokeWidth={2} />
      )}
    </button>
  );
}
