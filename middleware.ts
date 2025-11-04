// SIMPLIFIED MIDDLEWARE - Minimal interference with RSC requests
// CONTEXT7 SOURCE: /vercel/next.js - Streamlined middleware to fix RSC failures
// PURPOSE: Reduce complexity that was causing ERR_ABORTED on React Server Component requests

import { NextRequest, NextResponse } from 'next/server'

/**
 * Simplified middleware focusing only on essential functionality
 * Removes complex i18n, deep linking, and performance tracking that was interfering with RSC
 */
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Skip ALL middleware processing for static assets and API routes
  if (
    path.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|otf|mp4|webm|mov|avi)$/) ||
    path.startsWith('/_next') ||
    path.startsWith('/_vercel') ||
    path.startsWith('/api') ||
    path.startsWith('/videos/') ||
    path.startsWith('/public/')
  ) {
    return NextResponse.next()
  }

  // Essential security headers only
  const response = NextResponse.next()

  // Minimal security headers (essential only)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

/**
 * Simplified matcher - exclude everything that doesn't need middleware
 */
export const config = {
  matcher: [
    // Only match routes that absolutely need middleware processing
    // Exclude all API routes, static files, and Next.js internals
    '/((?!api|_next|_vercel|.*\\..*|favicon.ico|robots.txt|sitemap.xml|manifest.json|.well-known).*)',
  ],
}