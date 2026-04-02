import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
    "style-src 'self' 'unsafe-inline' https://vercel.live",
    "img-src 'self' data: blob: https://vercel.live https://vercel.com",
    "font-src 'self' data: https://vercel.live https://assets.vercel.com",
    "connect-src 'self' https://api.quran.com https://audio.quran.com https://quranbayan.github.io https://vercel.live wss://ws-us3.pusher.com",
    "media-src 'self' blob: https://*.arabicreadingcourse.com https://*.everyayah.com https://quranbayan.github.io https://audio.quran.com",
    "frame-src 'self' https://vercel.live",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ');

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
