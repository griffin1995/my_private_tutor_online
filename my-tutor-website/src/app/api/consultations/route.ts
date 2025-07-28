import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Comprehensive validation schema matching the form
const consultationSchema = z.object({
  parentName: z.string()
    .min(2, 'Parent name must be at least 2 characters')
    .max(100, 'Parent name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Parent name can only contain letters, spaces, hyphens and apostrophes'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email address too long')
    .toLowerCase(),
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number too long')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Phone number contains invalid characters'),
  studentName: z.string()
    .min(2, 'Student name must be at least 2 characters')
    .max(100, 'Student name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Student name can only contain letters, spaces, hyphens and apostrophes'),
  academicLevel: z.enum([
    'primary', '11plus', 'secondary', 'gcse', 'alevel', 'oxbridge', 'university'
  ], { errorMap: () => ({ message: 'Please select a valid academic level' }) }),
  subjects: z.string()
    .min(1, 'Please specify subjects needed')
    .max(500, 'Subject list too long')
    .trim(),
  urgency: z.enum(['immediate', 'within-week', 'within-month', 'planning-ahead'], {
    errorMap: () => ({ message: 'Please select a valid timescale' })
  }),
  specificNeeds: z.string()
    .max(1000, 'Specific needs description too long')
    .optional()
    .or(z.literal('')),
  preferredContact: z.enum(['phone', 'email', 'either'], {
    errorMap: () => ({ message: 'Please select a valid contact method' })
  }),
  budget: z.enum(['standard', 'premium', 'elite', 'discuss'], {
    errorMap: () => ({ message: 'Please select a valid service level' })
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = consultationSchema.parse(body)
    
    // In a real implementation, you would:
    // 1. Save to database
    // 2. Send notification emails
    // 3. Integrate with CRM system
    // 4. Send confirmation emails
    
    // Process validated consultation request
    const requestId = Math.random().toString(36).substr(2, 9)
    const timestamp = new Date().toISOString()
    
    // In production: save to database, send notifications, etc.

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Consultation request received successfully',
        data: {
          id: requestId,
          parentName: validatedData.parentName,
          studentName: validatedData.studentName,
          academicLevel: validatedData.academicLevel,
          urgency: validatedData.urgency,
          timestamp,
        }
      },
      { status: 200 }
    )

  } catch (error) {
    // Handle API errors appropriately

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

// Handle GET requests (for health checks or info)
export async function GET() {
  return NextResponse.json({
    service: 'My Private Tutor Online - Consultation API',
    status: 'Active',
    endpoints: {
      POST: 'Submit consultation request',
    }
  })
}