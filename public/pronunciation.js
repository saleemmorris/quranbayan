/**
 * pronunciation.js - quranbayan.org
 * Handles phonetic highlighting and sound playback for Arabic transliteration.
 */

(function() {
  const phoneticMap = {
    'th': '/audio/letters/tha.mp3',
    'kh': '/audio/letters/kha.mp3',
    'gh': '/audio/letters/ghayn.mp3',
    'sh': '/audio/letters/sheen.mp3',
    'dh': '/audio/letters/dhal.mp3',
    'aa': '/audio/letters/alif.mp3',
    'ee': '/audio/letters/ya.mp3',
    'uu': '/audio/letters/waw.mp3',
    'ṣ': '/audio/letters/sad.mp3',
    'ḍ': '/audio/letters/dad.mp3',
    'ṭ': '/audio/letters/tah.mp3',
    'ẓ': '/audio/letters/zah.mp3',
    'ḥ': '/audio/letters/hah.mp3',
    'ʿ': '/audio/letters/ayn.mp3',
    'q': '/audio/letters/qaf.mp3'
  };

  // Sort keys by length descending to match 'kh' before 'k'
  const patterns = Object.keys(phoneticMap).sort((a, b) => b.length - a.length);

  /**
   * Plays a sound using Web Audio API
   */
  async function playPhonetic(text) {
    const path = phoneticMap[text.toLowerCase()];
    if (!path) return;

    try {
      const audio = new Audio(path);
      await audio.play();
    } catch (err) {
      console.error('Audio playback failed:', err);
    }
  }

  /**
   * Scans elements and wraps patterns
   */
  function applyPhoneticHighlighting(container) {
    const elements = container.querySelectorAll('.transliteration:not([data-phonetic-processed])');
    
    elements.forEach(el => {
      let html = el.innerHTML;
      
      // Prevent multiple processing
      el.setAttribute('data-phonetic-processed', 'true');

      patterns.forEach(pattern => {
        // Use a regex that ignores case and ensures we don't wrap already wrapped tags
        const regex = new RegExp(`(?<!<[^>]*)${pattern}`, 'gi');
        html = html.replace(regex, (match) => {
          return `<span class="phonetic-trigger" data-phonetic="${pattern}">${match}</span>`;
        });
      });

      el.innerHTML = html;
    });
  }

  // Global event listener for phonetic triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.phonetic-trigger');
    if (trigger) {
      const phonetic = trigger.getAttribute('data-phonetic');
      playPhonetic(phonetic);
    }
  });

  // Initial application
  applyPhoneticHighlighting(document.body);

  // Watch for dynamic content changes (Next.js transitions)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        applyPhoneticHighlighting(document.body);
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
