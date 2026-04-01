import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import WordAnalysis from './WordAnalysis';
import '@testing-library/jest-dom';

// Mock the global fetch
global.fetch = jest.fn();

describe('WordAnalysis Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Functional Particle when root is missing', async () => {
    const mockApiResponse = {
      verse: {
        id: 1,
        verse_key: "1:1",
        words: [
          {
            id: 1,
            position: 1,
            text: "ﭑ",
            translation: { text: "In (the) name" },
            transliteration: { text: "bis'mi" }
            // root and grammar_description are missing
          }
        ]
      }
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    render(<WordAnalysis verseKey="1:1" location="1:1:1" />);

    // Wait for the data to load
    await waitFor(() => {
      expect(screen.getByText(/Functional Particle/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/In \(the\) name/i)).toBeInTheDocument();
  });

  it('should render RootDisplay when root is present', async () => {
    const mockApiResponse = {
      verse: {
        id: 1,
        verse_key: "2:155",
        words: [
          {
            id: 1,
            position: 1,
            text_uthmani: "وَلَنَبْلُوَنَّكُمْ",
            root: "ب ل و",
            grammar_description: "verb",
            translation: { text: "And surely We will test you" },
            transliteration: { text: "walana-bluwannakum" }
          }
        ]
      }
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    render(<WordAnalysis verseKey="2:155" location="2:155:1" />);

    await waitFor(() => {
      expect(screen.getByText(/3-Letter Root/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/ب/)).toBeInTheDocument();
    expect(screen.getByText(/ل/)).toBeInTheDocument();
    expect(screen.getByText(/و/)).toBeInTheDocument();
  });

  it('should render error message when validation fails', async () => {
    const invalidResponse = {
      invalid: "data"
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => invalidResponse,
    });

    // Suppress console.error for this test as we expect a Zod error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<WordAnalysis verseKey="1:1" location="1:1:1" />);

    await waitFor(() => {
      expect(screen.getByText(/API Response Validation Failed/i)).toBeInTheDocument();
    });
    
    consoleSpy.mockRestore();
  });
});
