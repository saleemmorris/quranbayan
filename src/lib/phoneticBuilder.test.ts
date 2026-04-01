import { getPhoneticSequence } from './phoneticBuilder';

describe('phoneticBuilder - getPhoneticSequence', () => {
  it('should return empty array for empty input', () => {
    expect(getPhoneticSequence('')).toEqual([]);
  });

  it('should map basic letters to filenames', () => {
    // ب (Baa)
    expect(getPhoneticSequence('ب')).toEqual(['2_baa']);
    // ت (Taa)
    expect(getPhoneticSequence('ت')).toEqual(['3_taa']);
  });

  it('should handle letters with Harakat (Fathah, Kasrah, Dammah, Sukun)', () => {
    // بَ (Baa + Fathah)
    expect(getPhoneticSequence('بَ')).toEqual(['2_baa']);
    // تِ (Taa + Kasrah)
    expect(getPhoneticSequence('تِ')).toEqual(['3_taa']);
    // ثُ (Thaa + Dammah)
    expect(getPhoneticSequence('ثُ')).toEqual(['4_thaa']);
    // جْ (Jeem + Sukun)
    expect(getPhoneticSequence('جْ')).toEqual(['5_jeem']);
  });

  it('should handle Shadda by doubling the letter', () => {
    // بّ (Baa + Shadda)
    expect(getPhoneticSequence('بّ')).toEqual(['2_baa', '2_baa']);
    // بَّ (Baa + Shadda + Fathah)
    expect(getPhoneticSequence('بَّ')).toEqual(['2_baa', '2_baa']);
  });

  it('should handle Maddah by doubling the letter', () => {
    // آ (Alif with Maddah)
    // NFC normalization turns it into a single char \u0622
    // Our implementation should detect this as a Madd and double it.
    expect(getPhoneticSequence('آ')).toEqual(['1_alif', '1_alif']);
    
    // Test explicit Maddah modifier if applicable
    // آ (Alif + Maddah modifier \u0653)
    // NFC turns this into \u0622 as well.
    expect(getPhoneticSequence('ا\u0653')).toEqual(['1_alif', '1_alif']);
  });

  it('should handle Laam-Alif special case', () => {
    // لا (Laam + Alif)
    expect(getPhoneticSequence('لا')).toEqual(['29_laaa']);
  });

  it('should handle a sequence of characters', () => {
    // بَتَّ (Baa + Fathah, Taa + Shadda + Fathah)
    // Result: Baa, Taa, Taa
    expect(getPhoneticSequence('بَتَّ')).toEqual(['2_baa', '3_taa', '3_taa']);
  });

  it('should handle normalization (NFC)', () => {
    // Combined vs Decomposed forms
    const combined = 'بَّ'; // Baa + Shadda + Fathah (NFC)
    const decomposed = 'ب' + '\u0651' + '\u064E';
    expect(getPhoneticSequence(combined)).toEqual(['2_baa', '2_baa']);
    expect(getPhoneticSequence(decomposed)).toEqual(['2_baa', '2_baa']);
  });

  it('should ignore non-Arabic characters in the map', () => {
    expect(getPhoneticSequence('abc ب')).toEqual(['2_baa']);
  });
});
