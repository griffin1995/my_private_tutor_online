// CONTEXT7 SOURCE: /nodejs/node - Crypto module for secure token generation
// CRYPTO REASON: Node.js crypto module provides cryptographically secure random values
import crypto from 'crypto'
// CONTEXT7 SOURCE: /vercel/next.js - Cookies function from next/headers for server-side cookie management
// COOKIE MANAGEMENT REASON: Next.js documentation shows cookies() for secure server-side cookie handling
import { cookies } from 'next/headers'

// CONTEXT7 SOURCE: /vercel/next.js - Security patterns for CSRF protection in Next.js applications
// CSRF PROTECTION REASON: Next.js documentation recommends CSRF tokens for form security

/**
 * CSRF token management for premium tutoring service
 * Protects forms from cross-site request forgery attacks
 * Essential for protecting royal client data integrity
 */

const CSRF_TOKEN_HEADER = 'x-csrf-token'
const CSRF_TOKEN_FIELD = '_csrf'
const CSRF_COOKIE_NAME = 'csrf-token'
const TOKEN_LENGTH = 32
const TOKEN_EXPIRY = 3600000 // 1 hour

/**
 * Generate a new CSRF token and store it in a secure cookie
 */
export async function generateCSRFToken(): Promise<string> {
  // CONTEXT7 SOURCE: /nodejs/node - randomBytes for cryptographically secure random values
  // TOKEN GENERATION REASON: Node.js crypto.randomBytes ensures unpredictable token generation
  const token = crypto.randomBytes(TOKEN_LENGTH).toString('hex')
  const expires = new Date(Date.now() + TOKEN_EXPIRY)

  const cookieStore = await cookies()
  // CONTEXT7 SOURCE: /vercel/next.js - Secure cookie settings for session management
  // COOKIE SECURITY REASON: Next.js documentation shows httpOnly, secure, sameSite for CSRF protection
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires,
    path: '/',
  })
  
  return token
}

/**
 * Get the current CSRF token from cookies
 */
export async function getCSRFToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(CSRF_COOKIE_NAME)?.value
  return token || null
}

/**
 * Verify CSRF token from request
 */
export async function verifyCSRFToken(requestToken: string | null): Promise<boolean> {
  if (!requestToken) return false
  
  const storedToken = await getCSRFToken()
  if (!storedToken) return false
  
  // Use timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(storedToken),
    Buffer.from(requestToken)
  )
}

/**
 * Extract CSRF token from request (header or body)
 */
export function extractCSRFToken(request: Request): string | null {
  // Check header first
  const headerToken = request.headers.get(CSRF_TOKEN_HEADER)
  if (headerToken) return headerToken
  
  // Check body if it's a form submission
  if (request.headers.get('content-type')?.includes('application/x-www-form-urlencoded')) {
    // Token would be in the form data
    return null // Will be extracted in the route handler
  }
  
  return null
}

/**
 * CSRF protection wrapper for API routes
 */
export async function withCSRFProtection<T>(
  request: Request,
  handler: () => Promise<T>
): Promise<Response> {
  // Skip CSRF for safe methods
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    return handler() as any
  }
  
  const token = extractCSRFToken(request)
  const isValid = await verifyCSRFToken(token)
  
  if (!isValid) {
    return new Response(
      JSON.stringify({ error: 'Invalid CSRF token' }),
      { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
  
  return handler() as any
}

/**
 * React hook for CSRF token management (client-side)
 */
export function useCSRFToken() {
  if (typeof window === 'undefined') {
    throw new Error('useCSRFToken can only be used on the client side')
  }
  
  // Get token from meta tag or cookie
  const getToken = (): string | null => {
    const meta = document.querySelector('meta[name="csrf-token"]')
    return meta?.getAttribute('content') || null
  }
  
  // Add token to fetch headers
  const securedFetch = (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = getToken()
    if (!token) {
      throw new Error('CSRF token not found')
    }
    
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        [CSRF_TOKEN_HEADER]: token,
      },
    })
  }
  
  return { token: getToken(), securedFetch }
}