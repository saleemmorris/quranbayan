import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RootAnalysisDrawer from './RootAnalysisDrawer';
import '@testing-library/jest-dom';

// Mock components that might cause issues
jest.mock('./WordAnalysis', () => {
  return function DummyWordAnalysis() {
    return <div data-testid="word-analysis">Word Analysis Component</div>;
  };
});

jest.mock('./TajweedText', () => {
  return function DummyTajweedText({ transliteration }: { transliteration: string }) {
    return <span>{transliteration}</span>;
  };
});

describe('RootAnalysisDrawer Lexicon Link', () => {
  const mockAnalysis = {
    word: "بِسْمِ",
    transliteration: "bis'mi",
    location: "1:1:1",
    wordId: 1
  };

  beforeAll(() => {
    // Mock window.open
    global.open = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should open the correct corpus.quran.com link when Lexicon button is clicked', () => {
    render(
      <RootAnalysisDrawer 
        isOpen={true} 
        onClose={() => {}} 
        analysis={mockAnalysis} 
      />
    );

    const lexiconButton = screen.getByText(/View Full Lexicon Entry/i);
    fireEvent.click(lexiconButton);

    expect(global.open).toHaveBeenCalledWith(
      'https://corpus.quran.com/wordbyword.jsp?chapter=1&verse=1#(1:1:1)',
      '_blank'
    );
  });
});
