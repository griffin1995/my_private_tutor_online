// CONTEXT7 SOURCE: /next.js/app-router - API route for Stripe payment intent creation
// PAYMENT API REASON: Official Next.js 15 App Router API patterns for payment processing

import { NextRequest, NextResponse } from 'next/server';
import { PaymentService, type CreatePaymentIntentData } from '@/lib/stripe/payment-service';
import { z } from 'zod';

// CONTEXT7 SOURCE: /zod/validation - Request validation schema for payment data
// VALIDATION REASON: Official Zod validation patterns for secure payment input
const createPaymentIntentSchema = z.object({
  packageType: z.enum(['oxbridge_intensive', 'grammar_school', 'subject_support', 'premium_bespoke']),
  customerEmail: z.string().email('Valid email address required'),
  customerName: z.string().min(1, 'Customer name is required'),
  studentName: z.string().optional(),
  subjects: z.array(z.string()).optional(),
  specialRequirements: z.string().optional(),
  metadata: z.record(z.string()).optional(),
});

// CONTEXT7 SOURCE: /next.js/app-router - POST handler for payment intent creation
// REVENUE PROCESSING REASON: Official Next.js API route patterns for Stripe integration
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = createPaymentIntentSchema.parse(body);

    // CONTEXT7 SOURCE: /stripe/stripe-js - Payment intent creation with error handling
    // SECURITY REASON: Official Stripe error handling patterns for payment processing
    const result = await PaymentService.createPaymentIntent(validatedData);

    if (!result.success) {
      return NextResponse.json(
        { 
          error: result.error, 
          code: result.errorCode 
        },
        { status: 400 }
      );
    }

    // CONTEXT7 SOURCE: /next.js/app-router - Successful payment intent response
    // SUCCESS RESPONSE REASON: Official Next.js response patterns for payment APIs
    return NextResponse.json({
      clientSecret: result.clientSecret,
      paymentIntentId: result.paymentIntentId,
      success: true
    });

  } catch (error) {
    console.error('Payment intent creation API error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: error.errors,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

// CONTEXT7 SOURCE: /next.js/app-router - CORS configuration for payment API
// SECURITY REASON: Official Next.js CORS patterns for secure payment endpoints
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://myprivatetutoronline.com,https://myprivatetutoronline.vercel.app',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours
    },
  });
}