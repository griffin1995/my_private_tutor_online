import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 security middleware
// Reference: /vercel/next.js security patterns and OWASP compliance

/**
 * Enterprise-grade security middleware for premium tutoring service
 * Implements OWASP Top 10 protection measures
 * Suitable for handling royal family testimonials and sensitive client data
 */

// Rate limiting configuration
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMITS = {
  api: 60, // 60 requests per minute for general API
  auth: 5, // 5 login attempts per minute
  contact: 3, // 3 contact form submissions per minute
  admin: 100, // 100 requests per minute for authenticated admin
}

// CSRF token storage (in production, use Redis or similar)
const csrfTokens = new Map<string, { token: string; expires: number }>()

/**
 * Generate secure CSRF token
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

/**
 * Verify CSRF token validity
 */
export function verifyCSRFToken(sessionId: string, token: string): boolean {
  const stored = csrfTokens.get(sessionId)
  if (!stored || stored.expires < Date.now()) {
    return false
  }
  return crypto.timingSafeEqual(Buffer.from(stored.token), Buffer.from(token))
}

/**
 * Rate limiting implementation
 */
export function checkRateLimit(
  identifier: string,
  limit: number
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = rateLimitMap.get(identifier) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW }

  // Reset if window expired
  if (now > record.resetTime) {
    record.count = 0
    record.resetTime = now + RATE_LIMIT_WINDOW
  }

  record.count++
  rateLimitMap.set(identifier, record)

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime + RATE_LIMIT_WINDOW) {
        rateLimitMap.delete(key)
      }
    }
  }

  return {
    allowed: record.count <= limit,
    remaining: Math.max(0, limit - record.count),
    resetTime: record.resetTime,
  }
}

/**
 * Input sanitisation schemas
 */
export const inputSchemas = {
  // Contact form schema
  contactForm: z.object({
    name: z.string().min(2).max(100).regex(/^[a-zA-Z\s\-']+$/),
    email: z.string().email().max(255),
    phone: z.string().regex(/^[\d\s\-\+\(\)]+$/).max(20).optional(),
    subject: z.string().min(5).max(200),
    message: z.string().min(10).max(5000),
    preferredContact: z.enum(['email', 'phone']).optional(),
    studentAge: z.number().min(4).max(25).optional(),
    tutoringSubject: z.string().max(100).optional(),
  }),

  // Login schema
  login: z.object({
    email: z.string().email().max(255),
    password: z.string().min(8).max(128),
    rememberMe: z.boolean().optional(),
  }),

  // Generic text input
  textInput: z.string().max(1000).regex(/^[^<>{}]*$/), // No HTML/script tags
}

/**
 * Sanitise and validate input data
 */
export function sanitiseInput<T>(
  data: unknown,
  schema: z.ZodSchema<T>
): { success: boolean; data?: T; errors?: z.ZodError } {
  try {
    const validated = schema.parse(data)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error }
    }
    throw error
  }
}

/**
 * Security headers middleware
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
  // Apply nonce for inline scripts if needed
  const nonce = crypto.randomBytes(16).toString('base64')
  
  // Additional security headers not in vercel.json
  response.headers.set('X-Request-ID', crypto.randomUUID())
  response.headers.set('X-Content-Security-Policy-Nonce', nonce)
  
  return response
}

/**
 * Main security middleware
 */
export async function securityMiddleware(request: NextRequest): Promise<NextResponse | null> {
  const path = request.nextUrl.pathname
  const method = request.method
  const clientIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

  // Skip security checks for static assets
  if (path.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|css|js|woff|woff2|ttf|otf)$/)) {
    return null
  }

  // Determine rate limit based on path
  let rateLimit = RATE_LIMITS.api
  if (path.startsWith('/api/auth') || path.startsWith('/admin/login')) {
    rateLimit = RATE_LIMITS.auth
  } else if (path.includes('/contact') || path.includes('/enquiry')) {
    rateLimit = RATE_LIMITS.contact
  } else if (path.startsWith('/admin')) {
    rateLimit = RATE_LIMITS.admin
  }

  // Check rate limit
  const rateLimitResult = checkRateLimit(`${clientIp}:${path}`, rateLimit)
  if (!rateLimitResult.allowed) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)),
        'X-RateLimit-Limit': String(rateLimit),
        'X-RateLimit-Remaining': String(rateLimitResult.remaining),
        'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
      },
    })
  }

  // CSRF protection for state-changing operations
  if (method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH') {
    const sessionId = request.cookies.get('session')?.value || request.cookies.get('admin_session')?.value
    
    if (sessionId && !path.startsWith('/api/auth/login')) {
      const csrfToken = request.headers.get('x-csrf-token')
      
      if (!csrfToken || !verifyCSRFToken(sessionId, csrfToken)) {
        return new NextResponse('Invalid CSRF Token', { status: 403 })
      }
    }
  }

  // Log security events for monitoring
  if (path.startsWith('/admin') || path.startsWith('/api/auth')) {
    console.log('[Security Audit]', {
      timestamp: new Date().toISOString(),
      method,
      path,
      clientIp,
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer'),
    })
  }

  return null
}

/**
 * Security monitoring alert system
 */
export interface SecurityEvent {
  type: 'rate_limit' | 'csrf_failure' | 'auth_failure' | 'suspicious_input' | 'sql_injection_attempt'
  severity: 'low' | 'medium' | 'high' | 'critical'
  timestamp: Date
  clientIp: string
  path: string
  details: Record<string, any>
}

export class SecurityMonitor {
  private events: SecurityEvent[] = []
  private alertThresholds = {
    rate_limit: { count: 10, window: 300000 }, // 10 in 5 minutes
    csrf_failure: { count: 5, window: 300000 },
    auth_failure: { count: 3, window: 300000 },
    suspicious_input: { count: 5, window: 600000 }, // 10 minutes
    sql_injection_attempt: { count: 1, window: 3600000 }, // 1 hour
  }

  logEvent(event: Omit<SecurityEvent, 'timestamp'>): void {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: new Date(),
    }
    
    this.events.push(fullEvent)
    this.checkThresholds(fullEvent)
    
    // Clean old events
    const cutoff = Date.now() - 86400000 // 24 hours
    this.events = this.events.filter(e => e.timestamp.getTime() > cutoff)
  }

  private checkThresholds(event: SecurityEvent): void {
    const threshold = this.alertThresholds[event.type]
    const recentEvents = this.events.filter(
      e => e.type === event.type && 
      e.clientIp === event.clientIp &&
      e.timestamp.getTime() > Date.now() - threshold.window
    )

    if (recentEvents.length >= threshold.count) {
      this.sendAlert({
        title: `Security Alert: ${event.type}`,
        severity: event.severity,
        message: `Threshold exceeded for ${event.type} from IP ${event.clientIp}`,
        events: recentEvents,
      })
    }
  }

  private sendAlert(alert: {
    title: string
    severity: string
    message: string
    events: SecurityEvent[]
  }): void {
    // In production, integrate with monitoring service (e.g., Sentry, DataDog)
    console.error('[SECURITY ALERT]', alert)
    
    // For critical alerts, could trigger additional actions:
    // - Block IP temporarily
    // - Send email to security team
    // - Create incident ticket
  }
}

// Export singleton instance
export const securityMonitor = new SecurityMonitor()