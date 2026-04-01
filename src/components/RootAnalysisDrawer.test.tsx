import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RootAnalysisDrawer from './RootAnalysisDrawer';

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  X: () => <div data-testid="x-icon" />,
  Volume2: () => <div data-testid="volume2-icon" />,
}));

// Mock TajweedText component
jest.mock('./TajweedText', () => ({
  __esModule: true,
  default: ({ transliteration }: { transliteration: string }) => <span>{transliteration}</span>,
}));

// Mock WordAnalysis component
jest.mock('./WordAnalysis', () => ({
  __esModule: true,
  default: ({ location }: { location: string }) => <div data-testid="word-analysis">Analysis for {location}</div>,
}));

// Mock audioUtils
jest.mock('@/lib/audioUtils', () => ({
  getWordAudioUrl: jest.fn(() => '/mock-audio.mp3'),
}));

const mockAnalysis = {
  word: 'بِسْمِ',
  transliteration: 'bismi',
  location: '1:1:1',
};

describe('RootAnalysisDrawer', () => {
  beforeEach(() => {
    global.open = jest.fn();
    // Mock Audio
    global.Audio = jest.fn().mockImplementation(() => ({
      play: jest.fn().mockResolvedValue(undefined),
    })) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when open', () => {
    render(
      <RootAnalysisDrawer
        isOpen={true}
        onClose={() => {}}
        analysis={mockAnalysis}
      />
    );

    expect(screen.getByText('Word Analysis')).toBeInTheDocument();
    expect(screen.getByText('بِسْمِ')).toBeInTheDocument();
    expect(screen.getByText('bismi')).toBeInTheDocument();
    expect(screen.getByText(/Location 1:1:1/i)).toBeInTheDocument();
    expect(screen.getByTestId('word-analysis')).toBeInTheDocument();
    expect(screen.getByTestId('volume2-icon')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(
      <RootAnalysisDrawer
        isOpen={true}
        onClose={onClose}
        analysis={mockAnalysis}
      />
    );

    const closeButton = screen.getByLabelText('Close Analysis');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('plays audio when volume icon is clicked', () => {
    render(
      <RootAnalysisDrawer
        isOpen={true}
        onClose={() => {}}
        analysis={mockAnalysis}
      />
    );

    const playButton = screen.getByLabelText('Play Word Audio');
    fireEvent.click(playButton);
    expect(global.Audio).toHaveBeenCalledWith('/mock-audio.mp3');
  });
});
