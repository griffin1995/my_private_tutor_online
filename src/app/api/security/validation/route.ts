import { NextRequest, NextResponse } from 'next/server'
import { SecurityValidator, quickSecurityCheck } from '@/lib/security/security-validator'
import { getRedisSessionStore } from '@/lib/security/redis-session-store'

// CONTEXT7 SOURCE: /vercel/next.js - Security validation and monitoring endpoint
// SECURITY IMPLEMENTATION REASON: Real-time security validation for royal client protection compliance

/**
 * Security validation and monitoring endpoint
 * Provides real-time security status and comprehensive validation reports
 * Essential for maintaining royal client protection standards
 */

interface SecurityEndpointAuth {
  isValid: boolean
  role?: string
}

/**
 * Simple authentication check for security endpoints
 * In production, this should be replaced with proper JWT validation
 */
async function validateSecurityAccess(request: NextRequest): Promise<SecurityEndpointAuth> {
  const authHeader = request.headers.get('authorization')
  const apiKey = request.headers.get('x-api-key')
  
  // Check for API key (for CI/CD and monitoring systems)
  if (apiKey === process.env.SECURITY_API_KEY && process.env.SECURITY_API_KEY) {
    return { isValid: true, role: 'monitor' }
  }
  
  // Check for admin session (could be enhanced with actual session validation)
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // In a real implementation, validate JWT token here
    return { isValid: true, role: 'admin' }
  }
  
  // For development, allow localhost access
  const isLocalhost = request.headers.get('host')?.includes('localhost')
  if (process.env.NODE_ENV === 'development' && isLocalhost) {
    return { isValid: true, role: 'dev' }
  }
  
  return { isValid: false }
}

/**
 * GET /api/security/validation - Quick security status check
 */
export async function GET(request: NextRequest) {
  try {
    // Validate access
    const auth = await validateSecurityAccess(request)
    if (!auth.isValid) {
      return NextResponse.json(
        { error: 'Unauthorized access to security endpoint' },
        { status: 401 }
      )
    }
    
    // Quick security check
    const isSecure = await quickSecurityCheck()
    
    // Get Redis health status
    let redisHealth = { connected: false, error: 'Not tested' }
    try {
      const redisStore = getRedisSessionStore()
      redisHealth = await redisStore.getHealthStatus()
    } catch (error) {
      redisHealth = { 
        connected: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }
    }
    
    // Basic environment checks
    const envChecks = {
      sessionSecretSet: !!process.env.SESSION_SECRET,
      adminCredentialsSet: !!(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD),
      nodeEnv: process.env.NODE_ENV,
      redisConfigured: !!(process.env.REDIS_URL || process.env.REDIS_HOST),
    }
    
    return NextResponse.json({
      status: isSecure ? 'secure' : 'issues_detected',
      timestamp: Date.now(),
      redis: redisHealth,
      environment: envChecks,
      accessLevel: auth.role,
      quickCheck: isSecure
    })
    
  } catch (error) {
    console.error('Security validation endpoint error:', error)
    
    return NextResponse.json(
      { 
        error: 'Security validation failed',
        timestamp: Date.now()
      },
      { status: 500 }
    )
  }
}

/**
 * POST /api/security/validation - Full security audit
 */
export async function POST(request: NextRequest) {
  try {
    // Validate access
    const auth = await validateSecurityAccess(request)
    if (!auth.isValid) {
      return NextResponse.json(
        { error: 'Unauthorized access to security endpoint' },
        { status: 401 }
      )
    }
    
    // Parse request options
    const body = await request.json().catch(() => ({}))
    const options = {
      includeDetails: body.includeDetails ?? true,
      storeResults: body.storeResults ?? true,
      ...body
    }
    
    // Run comprehensive validation
    const validator = new SecurityValidator()
    const report = await validator.runCompleteValidation()
    
    // Store results in Redis for historical tracking
    if (options.storeResults) {
      try {
        const redisStore = getRedisSessionStore()
        const auditKey = `security_audit:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`
        
        await redisStore.setSession(auditKey, {
          report,
          timestamp: Date.now(),
          triggeredBy: auth.role,
          clientIP: request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
        } as any, 2592000) // 30 days retention
        
      } catch (redisError) {
        console.error('Failed to store security audit results:', redisError)
        // Don't fail the audit due to storage issues
      }
    }
    
    // Prepare response
    const response: any = {
      audit: {
        overall: report.overall,
        score: report.score,
        maxScore: report.maxScore,
        executionTime: report.executionTime,
        timestamp: Date.now()
      },
      issues: {
        critical: report.criticalIssues,
        high: report.highIssues,
        medium: report.mediumIssues,
        low: report.lowIssues
      },
      recommendations: report.recommendations,
      accessLevel: auth.role
    }
    
    // Include detailed results if requested
    if (options.includeDetails) {
      response.results = report.results
    }
    
    // Set appropriate HTTP status based on findings
    let status = 200
    if (report.overall === 'fail') {
      status = 503 // Service Unavailable due to security issues
    } else if (report.overall === 'warning') {
      status = 200 // OK but with warnings
    }
    
    return NextResponse.json(response, { status })
    
  } catch (error) {
    console.error('Security audit endpoint error:', error)
    
    return NextResponse.json(
      { 
        error: 'Security audit failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: Date.now()
      },
      { status: 500 }
    )
  }
}

/**
 * Handle unsupported methods
 */
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

export async function PATCH() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}