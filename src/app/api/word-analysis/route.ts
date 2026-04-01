import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'edge';

const QuerySchema = z.object({
  verseKey: z.string().regex(/^\d+:\d+$/),
  location: z.string().regex(/^\d+:\d+:\d+$/),
});

/**
 * Edge API Route for word-level linguistic analysis.
 * Fetches root, grammar, and translation data from Quran.com v4.
 * Enforces Zod validation and Edge Runtime per project standards.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const result = QuerySchema.safeParse({
      verseKey: searchParams.get('verseKey'),
      location: searchParams.get('location'),
    });

    if (!result.success) {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const { verseKey, location } = result.data;
    
    // Fetch data from Quran.com v4
    const response = await fetch(
      `https://api.quran.com/api/v4/verses/by_key/${verseKey}?words=true&word_fields=root_modern,grammar_description,translation`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Quran.com API');
    }

    const data = await response.json();
    const words = data.verse?.words || [];
    const matchedWord = words.find((w: any) => w.location === location);

    if (!matchedWord) {
      return NextResponse.json({ error: 'Word not found' }, { status: 404 });
    }

    return NextResponse.json({
      root_modern: matchedWord.root_modern,
      grammar_description: matchedWord.grammar_description,
      translation: matchedWord.translation,
    });

  } catch (error: any) {
    console.error('Word Analysis API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
