import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withCSRFProtection } from '@/lib/security/csrf'
import { sanitiseInput, securityMonitor } from '@/middleware/security'
import { sendContactEmail } from '@/lib/email-service'

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
 * CONTEXT7 SOURCE: /resend/resend-js - Email integration for revenue recovery
 * REVISION REASON: Implementation - Replace console logging with actual email sending for £85,000 revenue capture
 */
async function processContactForm(data: ContactFormData): Promise<void> {
  try {
    // Send email using Resend service
    const emailResult = await sendContactEmail({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      phone: data.phone,
      preferredContact: data.preferredContact,
      // Map additional fields if needed
      service: data.studentDetails?.subjects?.join(', '),
    });

    if (!emailResult.success) {
      console.error('[Email Service Error]', emailResult.error);
      throw new Error(`Email service failed: ${emailResult.error}`);
    }

    // Log successful email submission for audit trail
    console.log('[Contact Form - Email Sent Successfully]', {
      reference: generateEnquiryReference(),
      messageId: emailResult.messageId,
      timestamp: new Date().toISOString(),
      redactedData: {
        name: data.name,
        email: data.email.replace(/(.{3}).*(@.*)/, '$1***$2'),
        phone: data.phone?.replace(/\d(?=\d{4})/g, '*'),
        subject: data.subject,
      }
    });

  } catch (error) {
    console.error('[Process Contact Form Error]', error);
    throw error; // Re-throw to handle in main API endpoint
  }
}