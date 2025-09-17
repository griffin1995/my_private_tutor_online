import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withCSRFProtection } from '@/lib/security/csrf'
import { sanitiseInput, securityMonitor } from '@/middleware/security'

// CMS DATA SOURCE: Using Context7 MCP documentation for Next.js 15 API route security
// Reference: /vercel/next.js API routes with Zod validation

/**
 * Secure contact form API endpoint
 * Implements comprehensive security measures for handling enquiries
 * Suitable for royal family and high-profile client communications
 */

// Contact form validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name contains invalid characters'),
  
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email too long'),
  
  phone: z.string()
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format')
    .max(20, 'Phone number too long')
    .optional(),
  
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject too long'),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message too long')
    .regex(/^[^<>{}]*$/, 'Message contains invalid characters'),
  
  preferredContact: z.enum(['email', 'phone']).optional(),
  
  studentDetails: z.object({
    age: z.number().min(4).max(25).optional(),
    currentLevel: z.string().max(50).optional(),
    subjects: z.array(z.string().max(50)).max(10).optional(),
    examBoard: z.string().max(50).optional(),
  }).optional(),
  
  urgency: z.enum(['immediate', 'within_week', 'within_month', 'planning_ahead']).optional(),
  
  referralSource: z.string().max(100).optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export async function POST(request: NextRequest) {
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown'
  
  try {
    // CSRF protection is handled by middleware
    
    // Parse request body
    const body = await request.json()
    
    // Sanitise and validate input
    const { success, data, errors } = sanitiseInput(body, contactSchema)
    
    if (!success) {
      // Log suspicious input attempts
      if (JSON.stringify(body).includes('<script>') || JSON.stringify(body).includes('DROP TABLE')) {
        securityMonitor.logEvent({
          type: 'suspicious_input',
          severity: 'high',
          clientIp,
          path: '/api/contact',
          details: { 
            errors: errors?.errors,
            sample: JSON.stringify(body).substring(0, 100)
          }
        })
      }
      
      return NextResponse.json(
        { 
          error: 'Invalid form data',
          details: errors?.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        },
        { status: 400 }
      )
    }
    
    // Additional security checks
    if (containsSQLInjectionPatterns(data)) {
      securityMonitor.logEvent({
        type: 'sql_injection_attempt',
        severity: 'critical',
        clientIp,
        path: '/api/contact',
        details: { data }
      })
      
      return NextResponse.json(
        { error: 'Security violation detected' },
        { status: 403 }
      )
    }
    
    // CONTEXT7 SOURCE: /microsoft/typescript - Null safety validation for undefined data access
    // TYPE SAFETY REASON: Official TypeScript documentation requires validation of potentially undefined values
    if (!data) {
      return NextResponse.json(
        { error: 'Data validation failed' },
        { status: 400 }
      );
    }

    // Process the contact form (in production, send email, save to database, etc.)
    await processContactForm(data)

    // Log successful submission for audit trail
    console.log('[Contact Form Submission]', {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      subject: data.subject,
      clientIp,
    })
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your enquiry. We will respond within 24 hours.',
      reference: generateEnquiryReference(),
    })
    
  } catch (error) {
    console.error('[Contact Form Error]', error)
    
    return NextResponse.json(
      { error: 'An error occurred processing your request' },
      { status: 500 }
    )
  }
}

/**
 * Check for SQL injection patterns
 */
function containsSQLInjectionPatterns(data: ContactFormData): boolean {
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|CREATE|ALTER|EXEC|SCRIPT)\b)/i,
    /(--|\/\*|\*\/|;|'|")/,
    /(\bOR\b\s*\d+\s*=\s*\d+)/i,
    /(\bAND\b\s*\d+\s*=\s*\d+)/i,
  ]
  
  const dataString = JSON.stringify(data)
  return sqlPatterns.some(pattern => pattern.test(dataString))
}

/**
 * Generate unique enquiry reference
 */
function generateEnquiryReference(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `MPT-${year}${month}-${random}`
}

/**
 * Process contact form submission
 */
async function processContactForm(data: ContactFormData): Promise<void> {
  // In production:
  // 1. Save to database with encryption for sensitive data
  // 2. Send notification email to admin
  // 3. Send confirmation email to user
  // 4. Create CRM entry
  // 5. Trigger Slack/Teams notification for urgent enquiries
  
  // For now, just log
  console.log('[Process Contact Form]', {
    reference: generateEnquiryReference(),
    data: {
      ...data,
      // Redact sensitive information in logs
      email: data.email.replace(/(.{3}).*(@.*)/, '$1***$2'),
      phone: data.phone?.replace(/\d(?=\d{4})/g, '*'),
    }
  })
}