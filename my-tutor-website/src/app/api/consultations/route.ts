import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema matching the form
const consultationSchema = z.object({
  parentName: z.string().min(2, 'Parent name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  studentName: z.string().min(2, 'Student name must be at least 2 characters'),
  academicLevel: z.string().min(1, 'Please select an academic level'),
  subjects: z.string().min(1, 'Please specify subjects needed'),
  urgency: z.enum(['immediate', 'within-week', 'within-month', 'planning-ahead']),
  specificNeeds: z.string().optional(),
  preferredContact: z.enum(['phone', 'email', 'either']),
  budget: z.enum(['standard', 'premium', 'elite', 'discuss']),
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
    
    // For now, we'll log the data and return success
    console.log('Consultation request received:', {
      ...validatedData,
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9),
    })

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Consultation request received successfully',
        data: {
          id: Math.random().toString(36).substr(2, 9),
          parentName: validatedData.parentName,
          studentName: validatedData.studentName,
          academicLevel: validatedData.academicLevel,
          urgency: validatedData.urgency,
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Consultation API error:', error)

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