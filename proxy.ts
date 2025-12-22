// NEXT.JS 16 PROXY - Enterprise Security Headers Implementation
// CONTEXT7 SOURCE: /vercel/next.js - Migrated from middleware to proxy convention
// PURPOSE: Royal client security standards with minimal RSC interference

import { NextRequest, NextResponse } from 'next/server'

/**
 * Modern proxy function implementing enterprise security headers
 * Migrated from middleware.ts to align with Next.js 16 proxy convention
 * Maintains all security functionality while using updated API
 */
export function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Skip ALL proxy processing for static assets and API routes
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

  // ENHANCED SECURITY HEADERS - Royal client standards
  // Basic protection headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // HSTS - Force HTTPS for 1 year
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }

  // Content Security Policy - Restrictive but functional
  // Allows: self, trusted CDNs, inline styles/scripts (for Next.js), data URIs for images
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "media-src 'self' blob:",
    "connect-src 'self' https://vercel.live wss://ws-*.vercel.live https://*.vercel-insights.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ]

  // Join CSP directives
  response.headers.set(
    'Content-Security-Policy',
    cspDirectives.join('; ')
  )

  // Permissions Policy - Restrict browser features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  return response
}

/**
 * Optimised matcher configuration for Next.js 16
 * Excludes all routes that don't require security header processing
 */
export const config = {
  matcher: [
    // Only match routes that absolutely need proxy processing
    // Exclude all API routes, static files, and Next.js internals
    '/((?!api|_next|_vercel|.*\\..*|favicon.ico|robots.txt|sitemap.xml|manifest.json|.well-known).*)',
  ],
}