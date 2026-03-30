import React from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Utility component to render Schema.org JSON-LD structured data.
 * Used for Breadcrumbs, Articles, and other SEO-rich data.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
