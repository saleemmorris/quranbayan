import { MetadataRoute } from 'next';

/**
 * Sitemap generator for QuranBayan.
 * Dynamically lists all 114 Surahs plus main pages.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://quranbayan.org';

  // Generate URLs for all 114 Surahs
  const surahUrls = Array.from({ length: 114 }, (_, i) => ({
    url: `${baseUrl}/surah/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...surahUrls,
  ];
}
