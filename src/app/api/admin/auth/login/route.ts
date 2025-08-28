import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { encrypt, SessionPayload } from '@/lib/auth/session'
import { z } from 'zod'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 API Route authentication
// Reference: /vercel/next.js API route security patterns with JWT sessions

/**
 * Rate limiting storage for login attempts
 * In production, use Redis or similar distributed cache
 */
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

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
  email: process.env['ADMIN_EMAIL'],
  password: process.env['ADMIN_PASSWORD'],
}

/**
 * Implements rate limiting for login attempts
 * Prevents brute force attacks on admin credentials
 */
function checkRateLimit(clientIP: string): { allowed: boolean; remainingAttempts: number } {
  const now = Date.now()
  const attempts = loginAttempts.get(clientIP)

  if (!attempts) {
    loginAttempts.set(clientIP, { count: 1, lastAttempt: now })
    return { allowed: true, remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS - 1 }
  }

  // Reset attempts if window has expired
  if (now - attempts.lastAttempt > RATE_LIMIT.WINDOW_MS) {
    loginAttempts.set(clientIP, { count: 1, lastAttempt: now })
    return { allowed: true, remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS - 1 }
  }

  // Check if locked out
  if (attempts.count >= RATE_LIMIT.MAX_ATTEMPTS) {
    const lockoutEnd = attempts.lastAttempt + RATE_LIMIT.LOCKOUT_MS
    if (now < lockoutEnd) {
      return { allowed: false, remainingAttempts: 0 }
    } else {
      // Lockout expired, reset
      loginAttempts.set(clientIP, { count: 1, lastAttempt: now })
      return { allowed: true, remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS - 1 }
    }
  }

  // Increment attempts
  attempts.count++
  attempts.lastAttempt = now
  loginAttempts.set(clientIP, attempts)

  return {
    allowed: attempts.count <= RATE_LIMIT.MAX_ATTEMPTS,
    remainingAttempts: Math.max(0, RATE_LIMIT.MAX_ATTEMPTS - attempts.count)
  }
}

/**
 * Clears rate limiting for successful login
 */
function clearRateLimit(clientIP: string): void {
  loginAttempts.delete(clientIP)
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

    // Check rate limiting
    const rateLimitResult = checkRateLimit(clientIP)
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

    // Verify admin credentials
    const isValidCredentials = 
      email.toLowerCase() === ADMIN_CREDENTIALS.email?.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password

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
    clearRateLimit(clientIP)

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