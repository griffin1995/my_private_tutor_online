import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 JWT session management
// Reference: /vercel/next.js authentication patterns with jose library

/**
 * Session payload structure for admin authentication
 * Contains minimal data for enterprise-grade security
 */
export interface SessionPayload {
  userId: string
  role: 'admin'
  expiresAt: Date
  [key: string]: any // Allow additional properties for JWT compatibility
}

/**
 * Retrieve session secret key from environment variables
 * CRITICAL: This must be at least 32 characters for security
 * Build-time fallback: use placeholder during build, runtime check enforced
 */
const secretKey = process.env.SESSION_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'build-time-placeholder-key-minimum-32-chars')

// Runtime check - only enforce in production runtime (not build time)
if (!secretKey && process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
  throw new Error('SESSION_SECRET environment variable is required for admin authentication')
}

const encodedKey = new TextEncoder().encode(secretKey || 'build-time-placeholder-key-minimum-32-chars')

/**
 * Encrypts session payload into a signed JWT token
 * Uses HS256 algorithm with 7-day expiration for admin sessions
 * 
 * @param payload - Admin session data
 * @returns Encrypted JWT token string
 */
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Admin sessions expire after 7 days
    .sign(encodedKey)
}

/**
 * Decrypts and verifies JWT session token
 * Returns null if token is invalid or expired
 * 
 * @param session - JWT token string
 * @returns Decrypted session payload or null
 */
export async function decrypt(session: string | undefined = ''): Promise<SessionPayload | null> {
  try {
    if (!session) return null
    
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    
    return payload as unknown as SessionPayload
  } catch (error) {
    console.log('Failed to verify admin session:', error)
    return null
  }
}

/**
 * Validates session payload structure
 * Ensures all required fields are present and valid
 */
export function isValidSessionPayload(payload: unknown): payload is SessionPayload {
  if (!payload || typeof payload !== 'object') return false
  
  const p = payload as Record<string, any>
  return (
    typeof p.userId === 'string' &&
    p.role === 'admin' &&
    p.expiresAt &&
    new Date(p.expiresAt) > new Date()
  )
}