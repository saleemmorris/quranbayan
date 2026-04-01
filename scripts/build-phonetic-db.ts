import fs from 'fs';
import path from 'path';
import { getPhoneticSequence } from '../src/lib/phoneticBuilder';

async function buildPhoneticDatabase() {
  console.log('Fetching all Quran verses...');
  const response = await fetch('https://api.quran.com/api/v4/quran/verses/uthmani');
  if (!response.ok) {
    throw new Error('Failed to fetch verses');
  }
  const data = await response.json();
  const verses = data.verses;

  console.log(`Processing ${verses.length} verses...`);
  
  const phoneticDb: Record<string, string[]> = {};
  
  let totalWords = 0;
  for (const verse of verses) {
    const text = verse.text_uthmani;
    if (!text) continue;
    
    // Split by spaces to get words
    const words = text.split(/\s+/);
    
    for (const word of words) {
      if (!word) continue;
      
      // Clean word from possible punctuation like end of ayah markers, stop marks
      // Actually Quran.com uthmani text uses spaces, sometimes small stop marks (like ۖ)
      // Let's remove stop marks if they are separate words, or just process them (getPhoneticSequence will ignore non-arabic chars)
      
      if (!phoneticDb[word]) {
        const sequence = getPhoneticSequence(word);
        if (sequence.length > 0) {
          phoneticDb[word] = sequence;
        }
      }
      totalWords++;
    }
  }

  const uniqueWordsCount = Object.keys(phoneticDb).length;
  console.log(`Processed ${totalWords} total words, found ${uniqueWordsCount} unique words with phonetics.`);

  const outputPath = path.join(process.cwd(), 'public', 'quran_phonetics.json');
  fs.writeFileSync(outputPath, JSON.stringify(phoneticDb, null, 2));
  console.log(`Database saved to ${outputPath}`);
}

buildPhoneticDatabase().catch(console.error);
