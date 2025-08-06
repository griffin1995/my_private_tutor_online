// CONTEXT7 SOURCE: /react-hook-form/documentation - Form submission with API handling
// Reference: Official React Hook Form patterns for server-side processing
// Purpose: Newsletter subscription endpoint following premium service standards

import { NextRequest, NextResponse } from 'next/server'
import { newsletterSchema, safeValidateForm } from '@/lib/validation/schemas'
import { headers } from 'next/headers'

// Rate limiting configuration for premium service protection
const RATE_LIMIT_REQUESTS = 5
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return `newsletter:${ip}`
}

function checkRateLimit(key: string): { allowed: boolean; resetTime?: number } {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    // Create new or reset expired record
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return { allowed: true }
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    return { allowed: false, resetTime: record.resetTime }
  }

  // Increment count
  record.count += 1
  return { allowed: true }
}

// CONTEXT7 SOURCE: /vercel/next.js - Next.js App Router API route handlers
// Reference: Server-side form processing with validation and error handling
export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const rateLimitKey = getRateLimitKey(request)
    const rateLimit = checkRateLimit(rateLimitKey)
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Too many requests. Please try again later.',
          resetTime: rateLimit.resetTime
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()
    
    // CONTEXT7 SOURCE: /colinhacks/zod - TypeScript-first schema validation
    // Reference: Safe form validation with detailed error reporting
    const validation = safeValidateForm(newsletterSchema, body)
    
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          fieldErrors: validation.errors || {}
        },
        { status: 400 }
      )
    }

    const { email, firstName, interests, consentToMarketing } = validation.data

    // Honeypot validation (anti-spam)
    if (body.honeypot && body.honeypot.trim() !== '') {
      // Log potential spam attempt but return success to not reveal honeypot
      console.warn(`Newsletter spam attempt detected: ${email}`)
      return NextResponse.json({ success: true, message: 'Subscription successful!' })
    }

    // Here you would integrate with your email service provider
    // Examples: Mailchimp, ConvertKit, Klaviyo, SendGrid, etc.
    
    // PLACEHOLDER: Actual email service integration
    // const emailService = await subscribeToNewsletter({
    //   email,
    //   firstName,
    //   interests,
    //   consentToMarketing,
    //   source: 'website_footer',
    //   subscribedAt: new Date().toISOString()
    // })

    // For now, we'll simulate successful subscription
    console.log('Newsletter subscription:', {
      email,
      firstName: firstName || 'Not provided',
      interests: interests || [],
      consentToMarketing,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      referer: request.headers.get('referer')
    })

    // CONTEXT7 SOURCE: /vercel/next.js - Successful API response patterns
    // Reference: Consistent response format for client-side handling
    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! You\'ll receive personalised academic insights and exclusive opportunities.',
      data: {
        email,
        subscribedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.'
      },
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
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