'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value.
 * Useful for limiting the frequency of API calls or heavy computations
 * triggered by rapid input changes.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
