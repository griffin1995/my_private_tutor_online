'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 client-side logout patterns
// Reference: /vercel/next.js authentication logout with secure API calls

/**
 * Props for the AdminHeader component
 */
interface AdminHeaderProps {
  title?: string
  subtitle?: string
}

/**
 * Enterprise-grade admin panel header with secure logout functionality
 * 
 * Security Features:
 * - Secure logout API call with POST method (CSRF protection)
 * - Immediate session invalidation
 * - Automatic redirect to login page
 * - Loading states for better UX
 * - Error handling for network issues
 * - Royal client data protection compliance
 */
export default function AdminHeader({ 
  title = "Admin Dashboard",
  subtitle = "My Private Tutor Online Administration"
}: AdminHeaderProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState<string | null>(null)

  /**
   * Handles secure admin logout process
   * Calls logout API and redirects to login page
   */
  const handleLogout = async () => {
    if (isLoggingOut) return // Prevent double-clicks

    setIsLoggingOut(true)
    setLogoutError(null)

    try {
      const response = await fetch('/api/admin/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // Successful logout - redirect to login page
        router.push('/admin/login')
        router.refresh() // Clear any cached auth state
      } else {
        const result = await response.json()
        setLogoutError(result.error || 'Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      setLogoutError('Network error during logout')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-centre justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <p className="text-slate-600 mt-1">{subtitle}</p>
          </div>
          
          <div className="flex items-centre gap-4">
            {/* Logout error display */}
            {logoutError && (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
                {logoutError}
              </div>
            )}

            {/* Logout button */}
            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="min-w-[100px]"
            >
              {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
            </Button>
          </div>
        </div>

        {/* Session info (optional) */}
        <div className="mt-4 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-500">
            Secure admin session active • All actions are logged for security
          </p>
        </div>
      </CardContent>
    </Card>
  )
}