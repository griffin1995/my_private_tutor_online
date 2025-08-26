// CONTEXT7 SOURCE: /stripe/payment-intents - Payment confirmation API for status verification
// CONFIRMATION REASON: Official Stripe payment confirmation patterns for frontend integration

import { NextRequest, NextResponse } from 'next/server';
import { PaymentService } from '@/lib/stripe/payment-service';
import { z } from 'zod';

// CONTEXT7 SOURCE: /zod/validation - Payment confirmation request validation
// VALIDATION REASON: Official Zod validation patterns for payment status requests
const confirmPaymentSchema = z.object({
  paymentIntentId: z.string().min(1, 'Payment Intent ID is required'),
});

// CONTEXT7 SOURCE: /next.js/app-router - POST handler for payment confirmation
// STATUS CHECK REASON: Official Next.js API patterns for payment status verification
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request
    const body = await request.json();
    const { paymentIntentId } = confirmPaymentSchema.parse(body);

    // CONTEXT7 SOURCE: /stripe/payment-intents - Payment intent status retrieval
    // STATUS VERIFICATION REASON: Official Stripe payment status checking patterns
    const paymentIntent = await PaymentService.getPaymentIntentStatus(paymentIntentId);

    // CONTEXT7 SOURCE: /stripe/payment-intents - Payment status response mapping
    // RESPONSE FORMAT REASON: Official Stripe payment status response patterns
    const response = {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      customer: paymentIntent.customer,
      metadata: paymentIntent.metadata,
      created: paymentIntent.created,
      
      // Additional status information
      paymentMethod: paymentIntent.payment_method,
      receiptEmail: paymentIntent.receipt_email,
      description: paymentIntent.description,
      
      // Error information if failed
      lastPaymentError: paymentIntent.last_payment_error ? {
        code: paymentIntent.last_payment_error.code,
        message: paymentIntent.last_payment_error.message,
        type: paymentIntent.last_payment_error.type,
      } : null,
      
      // Success indicators
      succeeded: paymentIntent.status === 'succeeded',
      requiresAction: paymentIntent.status === 'requires_action',
      requiresPaymentMethod: paymentIntent.status === 'requires_payment_method',
      processing: paymentIntent.status === 'processing',
      failed: paymentIntent.status === 'payment_failed',
    };

    return NextResponse.json({
      success: true,
      payment: response
    });

  } catch (error) {
    console.error('Payment confirmation API error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid request data', 
          details: error.errors,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Handle Stripe errors
    if (error instanceof Error && error.message.includes('No such payment_intent')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Payment not found', 
          code: 'PAYMENT_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { 
        success: false,
        error: 'Payment status check failed', 
        code: 'STATUS_CHECK_FAILED'
      },
      { status: 500 }
    );
  }
}

// CONTEXT7 SOURCE: /next.js/app-router - CORS configuration for payment confirmation
// SECURITY REASON: Official Next.js CORS patterns for payment confirmation endpoints
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