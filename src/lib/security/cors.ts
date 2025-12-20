import { NextResponse } from 'next/server';

/**
 * CORS Configuration for My Private Tutor Online
 * Secure cross-origin resource sharing settings
 * Royal client standards - enterprise-grade security
 */

// Allowed origins for API access
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://myprivatetutoronline.co.uk',
  'https://www.myprivatetutoronline.co.uk',
  'https://www.myprivatetutoronline.com',
  // Add staging URLs if needed
];

// CORS headers configuration
const CORS_HEADERS = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-CSRF-Token',
  'Access-Control-Max-Age': '86400', // 24 hours
  'Access-Control-Allow-Credentials': 'true',
};

/**
 * Apply CORS headers to a response
 * @param response NextResponse object
 * @param origin Request origin
 * @returns Response with CORS headers
 */
function applyCorsHeaders(response: NextResponse, origin?: string | null): NextResponse {
  // Check if origin is allowed
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV === 'development') {
    // Allow localhost in development
    response.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  }
  // Note: No wildcard (*) - security requirement

  // Apply other CORS headers
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

/**
 * Handle CORS preflight requests
 * @param origin Request origin
 * @returns Preflight response
 */
export function handleCorsPreflightRequest(origin?: string | null): NextResponse {
  const response = new NextResponse(null, { status: 204 });
  return applyCorsHeaders(response, origin);
}

/**
 * Check if an origin is allowed
 * @param origin Origin to check
 * @returns Boolean indicating if origin is allowed
 */
function isOriginAllowed(origin?: string | null): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin) ||
         (process.env.NODE_ENV === 'development' && origin.startsWith('http://localhost:'));
}