import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live; style-src 'self' 'unsafe-inline' https://vercel.live; img-src 'self' data: blob: https://vercel.live https://vercel.com; font-src 'self' data: https://vercel.live https://assets.vercel.com; connect-src 'self' https://api.quran.com https://vercel.live wss://ws-us3.pusher.com; media-src 'self' blob: https://*.arabicreadingcourse.com https://*.everyayah.com; frame-src 'self' https://vercel.live; frame-ancestors 'none'; upgrade-insecure-requests;",
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
