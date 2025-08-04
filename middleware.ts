import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/auth/session'
import { cookies } from 'next/headers'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 authentication middleware
// Reference: /vercel/next.js middleware patterns for protected routes

/**
 * Protected admin routes that require authentication
 * Only admin users with valid sessions can access these routes
 */
const protectedRoutes = ['/admin']

/**
 * Public routes accessible without authentication
 * Authenticated admin users are redirected away from login
 */
const publicRoutes = ['/admin/login']

/**
 * Enterprise-grade authentication middleware for premium tutoring service
 * Protects admin routes with JWT session verification
 * 
 * Security Features:
 * - HTTP-only cookie-based session management
 * - JWT token verification with expiration checks
 * - Automatic redirection for unauthorized access
 * - Royal client data protection compliance
 */
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)

  // Skip middleware for non-admin routes
  if (!isProtectedRoute && !isPublicRoute) {
    return NextResponse.next()
  }

  try {
    // Decrypt the admin session from secure HTTP-only cookie
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')?.value
    const session = await decrypt(sessionCookie)

    // Redirect to login if accessing protected route without valid session
    if (isProtectedRoute && (!session || session.role !== 'admin')) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('from', path) // Preserve original destination
      return NextResponse.redirect(loginUrl)
    }

    // Redirect authenticated admin away from login page
    if (isPublicRoute && session?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Admin authentication middleware error:', error)
    
    // On authentication error, redirect to login for security
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
    
    return NextResponse.next()
  }
}

/**
 * Middleware configuration for optimal performance
 * Excludes API routes, static files, and Next.js internals
 * Focuses on admin route protection only
 */
export const config = {
  matcher: [
    /*
     * Match admin routes while excluding:
     * - API routes (/api/*)
     * - Static files (_next/static/*)
     * - Image optimization (_next/image/*)
     * - Metadata files (favicon.ico, sitemap.xml, robots.txt)
     * - Public assets (/public/*)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public/).*)admin(.*)',
  ],
}