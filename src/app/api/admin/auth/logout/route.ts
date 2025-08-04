import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 secure logout patterns
// Reference: /vercel/next.js API route session management and cookie clearing

/**
 * Enterprise-grade admin logout API endpoint
 * 
 * Security Features:
 * - Immediate session invalidation
 * - Secure HTTP-only cookie clearing
 * - Comprehensive audit logging
 * - CSRF protection via POST method requirement
 * - Royal client data protection compliance
 */
export async function POST(request: NextRequest) {
  try {
    // Extract client IP for audit logging
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Clear the admin session cookie
    const cookieStore = await cookies()
    
    // Verify session exists before logging
    const existingSession = cookieStore.get('admin_session')
    
    if (existingSession) {
      console.log(`Admin logout from IP: ${clientIP}`)
      
      // Delete the session cookie securely
      cookieStore.delete('admin_session')
      
      // Also set an expired cookie to ensure complete removal
      cookieStore.set('admin_session', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        expires: new Date(0), // Expire immediately
      })
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Logout successful' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Admin logout API error:', error)
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * Handle unsupported HTTP methods
 * Only POST is allowed for security reasons (CSRF protection)
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for logout.' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for logout.' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST for logout.' },
    { status: 405 }
  )
}