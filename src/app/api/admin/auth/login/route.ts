import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { encrypt, SessionPayload } from '@/lib/auth/session'
import { verifyPassword } from '@/lib/security/password-security'
import { getRedisSessionStore } from '@/lib/security/redis-session-store'
import { z } from 'zod'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 API Route authentication
// Reference: /vercel/next.js API route security patterns with JWT sessions

// CONTEXT7 SOURCE: /redis/node-redis - Distributed session storage replaces in-memory Map
// SECURITY ENHANCEMENT REASON: Enterprise Redis-based storage for royal client session isolation and persistence

/**
 * Login request validation schema
 * Ensures proper email format and password requirements
 */
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

/**
 * Rate limiting configuration for enterprise security
 */
const RATE_LIMIT = {
  MAX_ATTEMPTS: 5,
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  LOCKOUT_MS: 30 * 60 * 1000, // 30 minutes after max attempts
}

/**
 * Admin credentials from environment variables
 * CRITICAL: These must be set in production deployment
 */
const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
}

/**
 * Redis-based rate limiting for distributed login attempt tracking
 * CONTEXT7 SOURCE: /redis/node-redis - Distributed rate limiting with TTL expiration
 * Prevents brute force attacks with enterprise-grade persistence
 */
async function checkRateLimit(clientIP: string): Promise<{ allowed: boolean; remainingAttempts: number }> {
  try {
    const redisStore = getRedisSessionStore()
    const now = Date.now()
    
    const attempts = await redisStore.getRateLimit(clientIP)

    if (!attempts) {
      await redisStore.setRateLimit(clientIP, { 
        count: 1, 
        lastAttempt: now, 
        windowStart: now 
      }, Math.ceil(RATE_LIMIT.WINDOW_MS / 1000))
      return { allowed: true, remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS - 1 }
    }

    // Reset attempts if window has expired
    if (now - attempts.lastAttempt > RATE_LIMIT.WINDOW_MS) {
      await redisStore.setRateLimit(clientIP, { 
        count: 1, 
        lastAttempt: now, 
        windowStart: now 
      }, Math.ceil(RATE_LIMIT.WINDOW_MS / 1000))
      return { allowed: true, remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS - 1 }
    }

    // Check if locked out
    if (attempts.count >= RATE_LIMIT.MAX_ATTEMPTS) {
      const lockoutEnd = attempts.lastAttempt + RATE_LIMIT.LOCKOUT_MS
      if (now < lockoutEnd) {
        return { allowed: false, remainingAttempts: 0 }
      } else {
        // Lockout expired, reset
        await redisStore.setRateLimit(clientIP, { 
          count: 1, 
          lastAttempt: now, 
          windowStart: now 
        }, Math.ceil(RATE_LIMIT.WINDOW_MS / 1000))
        return { allowed: true, remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS - 1 }
      }
    }

    // Increment attempts
    const newCount = attempts.count + 1
    await redisStore.setRateLimit(clientIP, {
      count: newCount,
      lastAttempt: now,
      windowStart: attempts.windowStart
    }, Math.ceil(RATE_LIMIT.LOCKOUT_MS / 1000))

    return {
      allowed: newCount <= RATE_LIMIT.MAX_ATTEMPTS,
      remainingAttempts: Math.max(0, RATE_LIMIT.MAX_ATTEMPTS - newCount)
    }
  } catch (error) {
    console.error('Redis rate limiting error, falling back to allow:', error)
    // Fallback to allow request if Redis is unavailable (fail-open for availability)
    return { allowed: true, remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS }
  }
}

/**
 * Clears rate limiting for successful login using Redis
 * CONTEXT7 SOURCE: /redis/node-redis - Key deletion for cleanup after successful authentication
 */
async function clearRateLimit(clientIP: string): Promise<void> {
  try {
    const redisStore = getRedisSessionStore()
    await redisStore.clearRateLimit(clientIP)
  } catch (error) {
    console.error('Failed to clear rate limit in Redis:', error)
    // Non-critical error, continue with authentication
  }
}

/**
 * Enterprise-grade admin login API endpoint
 * 
 * Security Features:
 * - Input validation with Zod schema
 * - Rate limiting to prevent brute force attacks
 * - Secure credential comparison
 * - JWT session creation with HTTP-only cookies
 * - Comprehensive audit logging
 * - Royal client data protection compliance
 */
export async function POST(request: NextRequest) {
  try {
    // Validate environment configuration
    if (!ADMIN_CREDENTIALS.email || !ADMIN_CREDENTIALS.password) {
      console.error('Admin credentials not configured in environment variables')
      return NextResponse.json(
        { error: 'Authentication service unavailable' },
        { status: 500 }
      )
    }

    // Extract client IP for rate limiting
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Check rate limiting with Redis-based distributed storage
    const rateLimitResult = await checkRateLimit(clientIP)
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`)
      return NextResponse.json(
        { 
          error: 'Too many login attempts. Please try again later.',
          retryAfter: Math.ceil(RATE_LIMIT.LOCKOUT_MS / 1000)
        },
        { status: 429 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = loginSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid request data',
          details: validationResult.error.errors
        },
        { status: 400 }
      )
    }

    const { email, password } = validationResult.data

    // Verify admin credentials with secure password comparison
    // CONTEXT7 SOURCE: /dcodeio/bcrypt.js - Secure password verification patterns
    // SECURITY ENHANCEMENT REASON: Replace plain text comparison with bcrypt verification for royal client data protection
    const isValidEmail = email.toLowerCase() === ADMIN_CREDENTIALS.email?.toLowerCase()
    const isValidPassword = ADMIN_CREDENTIALS.password ? 
      await verifyPassword(password, ADMIN_CREDENTIALS.password) : 
      password === process.env.ADMIN_PASSWORD // Fallback for plain text during migration
    
    const isValidCredentials = isValidEmail && isValidPassword

    if (!isValidCredentials) {
      console.warn(`Failed login attempt from IP: ${clientIP}, Email: ${email}`)
      
      return NextResponse.json(
        { 
          error: 'Invalid credentials',
          remainingAttempts: rateLimitResult.remainingAttempts
        },
        { status: 401 }
      )
    }

    // Clear rate limiting on successful authentication
    await clearRateLimit(clientIP)

    // Create admin session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    const sessionPayload: SessionPayload = {
      userId: 'admin',
      role: 'admin',
      expiresAt,
    }

    const sessionToken = await encrypt(sessionPayload)

    // Set secure HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: expiresAt,
    })

    console.log(`Successful admin login from IP: ${clientIP}, Email: ${email}`)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Authentication successful',
        expiresAt: expiresAt.toISOString()
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Admin login API error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}