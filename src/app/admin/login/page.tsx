'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 secure form handling
// Reference: /vercel/next.js authentication patterns with client-side validation

/**
 * Admin login form component with search params handling
 */
function AdminLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('from') || '/admin'

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  /**
   * Validates admin login form data
   * Ensures email format and password strength requirements
   */
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handles secure admin login form submission
   * Sends credentials to authentication API and manages session
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setErrors({})

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        // Successful authentication - redirect to admin dashboard
        router.push(redirectTo)
        router.refresh() // Refresh to update auth state
      } else {
        // Handle authentication errors
        if (response.status === 401) {
          setErrors({ general: 'Invalid email or password. Please try again.' })
        } else if (response.status === 429) {
          setErrors({ general: 'Too many login attempts. Please try again later.' })
        } else {
          setErrors({ general: result.error || 'An error occurred. Please try again.' })
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      setErrors({ general: 'Network error. Please check your connection and try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Handles input changes with real-time validation
   */
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear field-specific errors on input
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen flex items-centre justify-centre bg-slate-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-centre">Admin Login</CardTitle>
          <CardDescription className="text-centre">
            Access the My Private Tutor Online administration panel
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* General error message */}
            {errors.general && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {errors.general}
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="admin@myprivatetutoronline.co.uk"
                className={errors.email ? 'border-red-500' : ''}
                disabled={isLoading}
                autoComplete="email"
                autoFocus
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your secure password"
                className={errors.password ? 'border-red-500' : ''}
                disabled={isLoading}
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Security notice */}
          <div className="mt-6 p-3 text-xs text-slate-600 bg-slate-100 rounded-md">
            <p className="font-medium mb-1">Security Notice</p>
            <p>
              This is a secure administration panel for authorised personnel only. 
              All access attempts are logged and monitored for security purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Enterprise-grade admin login page for premium tutoring service
 * 
 * Security Features:
 * - Client-side input validation
 * - CSRF protection via server-side authentication
 * - Secure credential transmission
 * - Automatic redirection after successful login
 * - Rate limiting protection (server-side)
 * - Royal client data protection compliance
 */
export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-centre justify-centre bg-slate-50 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="flex items-centre justify-centre">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  )
}