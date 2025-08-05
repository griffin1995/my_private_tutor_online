import { NextResponse } from 'next/server'
import { generateCSRFToken } from '@/lib/security/csrf'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 CSRF token generation
// Reference: /vercel/next.js API routes for security tokens

/**
 * CSRF token generation endpoint
 * Provides secure tokens for form submissions
 * Essential for protecting royal client data from CSRF attacks
 */

export async function GET() {
  try {
    const token = await generateCSRFToken()
    
    // Also set the token in response headers for meta tag usage
    const response = NextResponse.json({ 
      token,
      expiresIn: 3600 // 1 hour
    })
    
    // Add security headers
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    
    return response
  } catch (error) {
    console.error('[CSRF Token Generation Error]', error)
    
    return NextResponse.json(
      { error: 'Failed to generate security token' },
      { status: 500 }
    )
  }
}