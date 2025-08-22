import { NextRequest, NextResponse } from 'next/server'
import { generateCSRFToken, getCSRFToken } from '@/lib/security/csrf'
import { getRedisSessionStore } from '@/lib/security/redis-session-store'

// CONTEXT7 SOURCE: /redis/node-redis - Enterprise CSRF token management API
// SECURITY IMPLEMENTATION REASON: Database-backed token generation and rotation for royal client protection

/**
 * CSRF token generation endpoint
 * Provides secure tokens for form submissions
 * Essential for protecting royal client data from CSRF attacks
 */

/**
 * Get current CSRF token or generate new one
 * CONTEXT7 SOURCE: /redis/node-redis - Token retrieval with Redis validation
 */
export async function GET() {
  try {
    // Try to get existing valid token first
    let token = await getCSRFToken()
    
    if (!token) {
      // Generate new token if none exists or invalid
      token = await generateCSRFToken()
    }
    
    // Also set the token in response headers for meta tag usage
    const response = NextResponse.json({ 
      token,
      expiresIn: 3600, // 1 hour
      generated: Date.now(),
      success: true
    })
    
    // Add security headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    
    return response
  } catch (error) {
    console.error('[CSRF Token Retrieval Error]', error)
    
    return NextResponse.json(
      { error: 'Failed to retrieve security token' },
      { status: 500 }
    )
  }
}

/**
 * Generate new CSRF token (for rotation)
 * CONTEXT7 SOURCE: /redis/node-redis - Token generation with enterprise rotation
 */
export async function POST(request: NextRequest) {
  try {
    const sessionId = request.headers.get('x-session-id') || undefined
    const token = await generateCSRFToken(sessionId)
    
    // Log token generation for security monitoring
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 'unknown'
    
    try {
      const redisStore = getRedisSessionStore()
      const tokenEvent = {
        type: 'csrf_token_generated',
        timestamp: Date.now(),
        clientIP,
        userAgent: request.headers.get('user-agent') || 'unknown',
        sessionId,
        severity: 'info'
      }
      
      await redisStore.setSession(
        `token_event:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`,
        tokenEvent as any,
        3600 // 1 hour retention for token events
      )
    } catch (redisError) {
      console.error('Failed to log CSRF token generation:', redisError)
      // Don't fail token generation due to logging issues
    }
    
    const response = NextResponse.json({
      token,
      success: true,
      generated: Date.now(),
      expiresIn: 3600,
      sessionId
    })
    
    // Add security headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    
    return response
  } catch (error) {
    console.error('[CSRF Token Generation Error]', error)
    
    return NextResponse.json(
      { error: 'Failed to generate security token' },
      { status: 500 }
    )
  }
}