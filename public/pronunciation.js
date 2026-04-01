/**
 * tajweed-engine.js - quranbayan.org
 * Handles Tajweed phonetic highlighting and sound playback.
 */

(function() {
  const tajweedRules = [
    // Madd (Long Vowels)
    { pattern: 'ā', sound: 'aa-long', type: 'madd' },
    { pattern: 'ī', sound: 'ee-long', type: 'madd' },
    { pattern: 'ū', sound: 'uu-long', type: 'madd' },
    
    // Heavy/Deep Letters
    { pattern: 'ḥ', sound: 'hah-deep', type: 'heavy' },
    { pattern: 'ṣ', sound: 'sad-heavy', type: 'heavy' },
    { pattern: 'ḍ', sound: 'dad-heavy', type: 'heavy' },
    { pattern: 'ṭ', sound: 'tah-heavy', type: 'heavy' },
    { pattern: 'ẓ', sound: 'zah-heavy', type: 'heavy' },
    { pattern: 'ʿ', sound: 'ayn-deep', type: 'heavy' },
    
    // Ghunnah (Nasalization)
    { pattern: 'nn', sound: 'ghunnah-n', type: 'ghunnah' },
    { pattern: 'mm', sound: 'ghunnah-m', type: 'ghunnah' },
    
    // Qalqalah (Echo) - Simple end-of-syllable or end-of-word check
    { pattern: 'q', sound: 'qalqalah-q', type: 'qalqalah' },
    { pattern: 't', sound: 'qalqalah-t', type: 'qalqalah' },
    { pattern: 'b', sound: 'qalqalah-b', type: 'qalqalah' },
    { pattern: 'j', sound: 'qalqalah-j', type: 'qalqalah' },
    { pattern: 'd', sound: 'qalqalah-d', type: 'qalqalah' },
  ];

  // Sort by pattern length descending
  const sortedRules = [...tajweedRules].sort((a, b) => b.pattern.length - a.length);

  /**
   * Plays sound from /assets/audio/tajweed/
   */
  async function playSound(soundName) {
    const path = `/assets/audio/tajweed/${soundName}.mp3`;
    try {
      const audio = new Audio(path);
      await audio.play();
    } catch (err) {
      console.warn(`Audio not found: ${path}`);
    }
  }

  /**
   * Tokenizes and injects spans into transliteration elements.
   */
  function applyTajweedHighlighting(container) {
    const elements = container.querySelectorAll('.transliteration:not([data-tajweed-processed])');
    
    elements.forEach(el => {
      el.setAttribute('data-tajweed-processed', 'true');
      let text = el.textContent;
      let html = text;

      // Single pass replacement using regex to avoid nested issues
      const combinedRegex = new RegExp(`(${sortedRules.map(r => r.pattern).join('|')})`, 'gi');
      
      html = text.replace(combinedRegex, (match) => {
        const rule = sortedRules.find(r => r.pattern === match.toLowerCase());
        if (!rule) return match;
        
        return `<span class="tajweed-trigger tajweed-${rule.type}" data-sound="${rule.sound}">${match}</span>`;
      });

      el.innerHTML = html;
    });
  }

  // Global Click Listener
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.tajweed-trigger');
    if (trigger) {
      const sound = trigger.getAttribute('data-sound');
      playSound(sound);
    }
  });

  // Initial and dynamic processing
  applyTajweedHighlighting(document.body);
  const observer = new MutationObserver(() => applyTajweedHighlighting(document.body));
  observer.observe(document.body, { childList: true, subtree: true });
})();
