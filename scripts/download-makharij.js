const https = require('https');
const fs = require('fs');
const path = require('path');

const AUDIO_DIR = path.join(__dirname, '../public/audio/tajweed/');
const BASE_URL = 'https://www.arabicreadingcourse.com/audio/alphabet/';

// Ensure directory exists
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

/**
 * Mapping of DIN 31635 names to server filenames
 */
const letterMap = {
  'alif': '1-alif',
  'ba': '2-ba',
  'ta': '3-ta',
  'tha': '4-tha',
  'jeem': '5-jeem',
  'hah-deep': '6-ha',
  'kha': '7-kha',
  'dal': '8-dal',
  'dhal': '9-dhal',
  'ra': '10-ra',
  'zay': '11-zay',
  'seen': '12-seen',
  'sheen': '13-sheen',
  'sad-heavy': '14-sad',
  'dad-heavy': '15-dad',
  'tah-heavy': '16-ta',
  'zah-heavy': '17-dha',
  'ayn-deep': '18-ayn',
  'ghayn': '19-ghayn',
  'fa': '20-fa',
  'qaf': '21-qaf',
  'kaf': '22-kaf',
  'lam': '23-lam',
  'meem': '24-meem',
  'noon': '25-noon',
  'ha': '26-ha',
  'waw': '27-waw',
  'ya': '28-ya',
};

async function downloadFile(localName, serverName) {
  const fileName = `${localName}.mp3`;
  const filePath = path.join(AUDIO_DIR, fileName);
  const url = `${BASE_URL}${serverName}.mp3`;

  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  };

  return new Promise((resolve) => {
    https.get(url, options, (response) => {
      if (response.statusCode !== 200) {
        console.error(`[-] Failed to download ${fileName}: Status ${response.statusCode}`);
        resolve();
        return;
      }

      const file = fs.createWriteStream(filePath);
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`[+] Success: Saved ${fileName} to ./public/audio/tajweed/`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`[-] Error downloading ${fileName}: ${err.message}`);
      resolve();
    });
  });
}

async function run() {
  console.log('🚀 Starting makharij audio download...\n');
  
  for (const [localName, serverName] of Object.entries(letterMap)) {
    await downloadFile(localName, serverName);
  }

  console.log('\n✅ Download sequence finished.');
}

run();
