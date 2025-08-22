import { NextRequest, NextResponse } from 'next/server'
import { processCSPViolation, CSPViolationReport } from '@/lib/security/security-headers'
import { getRedisSessionStore } from '@/lib/security/redis-session-store'

// CONTEXT7 SOURCE: /vercel/next.js - CSP violation reporting endpoint
// SECURITY IMPLEMENTATION REASON: Official CSP monitoring patterns for royal client security compliance

/**
 * Content Security Policy violation reporting endpoint
 * Collects and processes CSP violations for security monitoring
 * Essential for maintaining royal client protection standards
 */

export async function POST(request: NextRequest) {
  try {
    // Parse CSP violation report
    const body = await request.json()
    const report = body['csp-report'] as CSPViolationReport
    
    if (!report) {
      return NextResponse.json(
        { error: 'Invalid CSP report format' },
        { status: 400 }
      )
    }
    
    // Process the violation
    const analysis = processCSPViolation(report)
    
    // Get client information
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'
    
    // Create security event
    const securityEvent = {
      type: 'csp_violation',
      timestamp: Date.now(),
      severity: analysis.severity,
      action: analysis.action,
      clientIP,
      userAgent,
      report: analysis.details,
      raw: report
    }
    
    // Store in Redis for analysis
    try {
      const redisStore = getRedisSessionStore()
      const eventKey = `security_event:csp:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`
      
      // Store with longer retention for security analysis
      await redisStore.setSession(eventKey, securityEvent as any, 604800) // 7 days
      
      console.log(`CSP Violation [${analysis.severity.toUpperCase()}]:`, {
        directive: report['violated-directive'],
        blockedUri: report['blocked-uri'],
        documentUri: report['document-uri'],
        clientIP,
        severity: analysis.severity
      })
      
      // Alert on high severity violations
      if (analysis.severity === 'high') {
        console.error('HIGH SEVERITY CSP VIOLATION DETECTED:', {
          clientIP,
          userAgent,
          violation: report['violated-directive'],
          blockedUri: report['blocked-uri'],
          documentUri: report['document-uri'],
          scriptSample: report['script-sample']
        })
        
        // Store high severity alert
        const alertKey = `security_alert:csp:${Date.now()}:${Math.random().toString(36).substr(2, 9)}`
        await redisStore.setSession(alertKey, {
          ...securityEvent,
          alertLevel: 'critical',
          requiresImmediate: true
        } as any, 2592000) // 30 days retention for alerts
      }
      
    } catch (redisError) {
      console.error('Failed to store CSP violation in Redis:', redisError)
      // Still log to console even if Redis fails
      console.warn('CSP Violation (Redis unavailable):', analysis.details)
    }
    
    // Return 204 No Content as per CSP specification
    return new NextResponse(null, { status: 204 })
    
  } catch (error) {
    console.error('CSP report processing error:', error)
    
    // Return 204 even on error to prevent CSP report retry loops
    return new NextResponse(null, { status: 204 })
  }
}

/**
 * Handle unsupported methods
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for CSP reports.' },
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