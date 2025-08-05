import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/auth/session'
import { cookies } from 'next/headers'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 API routes
// Reference: /vercel/next.js secure API endpoints for admin metrics

/**
 * Security metrics API endpoint for admin dashboard
 * Provides aggregated security statistics
 * Protected route - requires admin authentication
 */

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')?.value
    const session = await decrypt(sessionCookie)
    
    if (!session || session.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorised' },
        { status: 401 }
      )
    }
    
    // In production, aggregate from database
    const metrics = {
      totalEvents24h: 47,
      criticalEvents: 0,
      blockedRequests: 15,
      uniqueIps: 23,
      topThreats: [
        { type: 'rate_limit', count: 15 },
        { type: 'auth_failure', count: 8 },
        { type: 'suspicious_input', count: 3 },
        { type: 'csrf_failure', count: 1 }
      ],
      systemHealth: {
        status: 'healthy',
        lastCheck: new Date().toISOString(),
        uptime: '99.99%',
        avgResponseTime: 145 // ms
      },
      recentAlerts: [
        {
          level: 'warning',
          message: 'Increased rate limit violations from IP range 192.168.x.x',
          timestamp: new Date(Date.now() - 3600000).toISOString()
        }
      ]
    }
    
    return NextResponse.json(metrics)
    
  } catch (error) {
    console.error('[Security Metrics API Error]', error)
    
    return NextResponse.json(
      { error: 'Failed to fetch security metrics' },
      { status: 500 }
    )
  }
}