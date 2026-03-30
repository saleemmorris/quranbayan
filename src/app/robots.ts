import { MetadataRoute } from 'next';

/**
 * robots.txt configuration for QuranBayan.
 * Allows crawling of all public routes and points to the dynamic sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'], // Optional: Disallow private paths
    },
    sitemap: 'https://quranbayan.org/sitemap.xml',
  };
}
