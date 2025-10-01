// CONTEXT7 SOURCE: /vercel/next.js - Server-only module for server-side code protection
// SERVER PROTECTION REASON: Next.js documentation ensures DAL runs only on server
import 'server-only'
// CONTEXT7 SOURCE: /facebook/react - Cache function for request deduplication
// CACHE REASON: React documentation for caching expensive operations
import { cache } from 'react'
// CONTEXT7 SOURCE: /vercel/next.js - Cookies and redirect from Next.js headers
// NAVIGATION REASON: Next.js documentation for cookie access and navigation
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { decrypt, isValidSessionPayload, SessionPayload } from './session'

// CONTEXT7 SOURCE: /vercel/next.js - Data Access Layer pattern for authentication
// DAL PATTERN REASON: Next.js documentation for session verification and caching

/**
 * Verified admin session data structure
 * Contains minimal required data for authorization
 */
export interface VerifiedSession {
  isAuth: true
  userId: string
  role: 'admin'
  expiresAt: Date
}

/**
 * Creates and manages secure HTTP-only session cookie
 * Used after successful admin authentication
 * 
 * @param userId - Admin user identifier
 */
export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  const sessionPayload: SessionPayload = {
    userId,
    role: 'admin',
    expiresAt,
  }

  const { encrypt } = await import('./session')
  const sessionToken = await encrypt(sessionPayload)

  const cookieStore = await cookies()
  cookieStore.set('admin_session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  })
}

/**
 * Extends existing admin session expiration
 * Maintains user login state without re-authentication
 */
export async function updateSession(): Promise<void> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('admin_session')?.value
  
  if (!sessionCookie) return

  const payload = await decrypt(sessionCookie)
  if (!payload || !isValidSessionPayload(payload)) return

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Extend 7 days
  
  // Update the payload expiration
  const updatedPayload: SessionPayload = {
    ...payload,
    expiresAt: expires,
  }

  const { encrypt } = await import('./session')
  const newSessionToken = await encrypt(updatedPayload)

  cookieStore.set('admin_session', newSessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires,
  })
}

/**
 * Deletes admin session cookie for secure logout
 * Immediately invalidates user authentication
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  
  // Also set expired cookie for complete removal
  cookieStore.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(0),
  })
}

/**
 * Enterprise-grade session verification with automatic redirect
 * Cached for performance during React render passes
 * 
 * Security Features:
 * - JWT token verification
 * - Expiration time validation
 * - Role-based authorization
 * - Automatic login redirect on failure
 * - React cache optimization
 * 
 * @returns Verified admin session data
 * @throws Redirects to login if authentication fails
 */
export const verifySession = cache(async (): Promise<VerifiedSession> => {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('admin_session')?.value

  if (!sessionCookie) {
    console.warn('Admin session verification failed: No session cookie')
    redirect('/admin/login')
  }

  const session = await decrypt(sessionCookie)

  if (!session || !isValidSessionPayload(session)) {
    console.warn('Admin session verification failed: Invalid session payload')
    redirect('/admin/login')
  }

  // Additional role verification for admin access
  if (session.role !== 'admin') {
    console.warn('Admin session verification failed: Invalid role')
    redirect('/admin/login')
  }

  // Check if session has expired
  if (new Date(session.expiresAt) <= new Date()) {
    console.warn('Admin session verification failed: Session expired')
    await deleteSession() // Clean up expired session
    redirect('/admin/login')
  }

  return {
    isAuth: true,
    userId: session.userId,
    role: session.role,
    expiresAt: session.expiresAt,
  }
})

/**
 * Optional session verification without redirect
 * Returns null if session is invalid instead of redirecting
 * Useful for conditional UI rendering
 * 
 * @returns Verified session data or null
 */
export const getOptionalSession = cache(async (): Promise<VerifiedSession | null> => {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')?.value

    if (!sessionCookie) return null

    const session = await decrypt(sessionCookie)

    if (!session || !isValidSessionPayload(session)) return null

    if (session.role !== 'admin') return null

    if (new Date(session.expiresAt) <= new Date()) {
      await deleteSession() // Clean up expired session
      return null
    }

    return {
      isAuth: true,
      userId: session.userId,
      role: session.role,
      expiresAt: session.expiresAt,
    }
  } catch (error) {
    console.error('Optional session verification error:', error)
    return null
  }
})

/**
 * Checks if current user has admin privileges
 * Used for authorization in Server Components and API routes
 * 
 * @returns Boolean indicating admin status
 */
export const isAdmin = cache(async (): Promise<boolean> => {
  try {
    const session = await getOptionalSession()
    return session?.role === 'admin' || false
  } catch {
    return false
  }
})