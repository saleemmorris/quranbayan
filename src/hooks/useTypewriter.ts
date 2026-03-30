import { useState, useEffect } from 'react';

/**
 * Custom hook for typewriter effect on an array of strings.
 * @param words Array of strings to cycle through.
 * @param typingSpeed Speed of typing in ms.
 * @param deletingSpeed Speed of deleting in ms.
 * @param pauseDuration Pause duration between words in ms.
 */
export function useTypewriter(
  words: string[],
  typingSpeed: number = 100,
  deletingSpeed: number = 50,
  pauseDuration: number = 2000
) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index % words.length];

    const handleType = () => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentWord.substring(0, displayText.length + 1));

        if (displayText === currentWord) {
          // Finished typing, wait then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        setDisplayText(currentWord.substring(0, displayText.length - 1));

        if (displayText === '') {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setIndex((prev) => prev + 1);
        }
      }
    };

    const timer = setTimeout(
      handleType,
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, words, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}
