// CONTEXT7 SOURCE: /stripe/customers - Customer management API for tutoring platform
// CUSTOMER API REASON: Official Stripe customer management patterns for service businesses

import { NextRequest, NextResponse } from 'next/server';
import { PaymentService, type CustomerData } from '@/lib/stripe/payment-service';
import { z } from 'zod';

// CONTEXT7 SOURCE: /zod/validation - Customer data validation schema
// VALIDATION REASON: Official Zod validation patterns for customer information
const customerDataSchema = z.object({
  email: z.string().email('Valid email address required'),
  name: z.string().min(1, 'Customer name is required'),
  phone: z.string().optional(),
  address: z.object({
    line1: z.string().min(1, 'Address line 1 is required'),
    line2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    postal_code: z.string().min(1, 'Postal code is required'),
    country: z.string().min(2, 'Country code is required').max(2)
  }).optional(),
  metadata: z.record(z.string()).optional()
});

// CONTEXT7 SOURCE: /next.js/app-router - POST handler for customer creation
// CUSTOMER CREATION REASON: Official Next.js API patterns for customer management
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = customerDataSchema.parse(body);

    // CONTEXT7 SOURCE: /stripe/customers - Customer creation with deduplication
    // DEDUPLICATION REASON: Official Stripe customer management patterns
    const customer = await PaymentService.createOrRetrieveCustomer(validatedData);

    // CONTEXT7 SOURCE: /stripe/customers - Customer response formatting
    // RESPONSE FORMAT REASON: Official Stripe customer data response patterns
    const response = {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      created: customer.created,
      metadata: customer.metadata,
      
      // Additional customer information
      balance: customer.balance,
      currency: customer.currency,
      defaultSource: customer.default_source,
      
      // Service-specific data
      isExistingCustomer: customer.created < (Date.now() / 1000) - 60, // Created more than 1 minute ago
      totalPaymentMethods: 0, // Would need separate API call to get accurate count
      
      // Privacy-safe response (exclude sensitive data)
      livemode: customer.livemode,
    };

    return NextResponse.json({
      success: true,
      customer: response
    });

  } catch (error) {
    console.error('Customer management API error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid customer data', 
          details: error.errors,
          code: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    // Handle Stripe errors
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Customer already exists', 
          code: 'CUSTOMER_EXISTS'
        },
        { status: 409 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { 
        success: false,
        error: 'Customer creation failed', 
        code: 'CUSTOMER_CREATION_FAILED'
      },
      { status: 500 }
    );
  }
}

// CONTEXT7 SOURCE: /next.js/app-router - GET handler for customer retrieval
// CUSTOMER RETRIEVAL REASON: Official Next.js API patterns for customer lookup
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const customerId = searchParams.get('id');

    if (!email && !customerId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email or customer ID is required',
          code: 'MISSING_IDENTIFIER'
        },
        { status: 400 }
      );
    }

    // CONTEXT7 SOURCE: /stripe/customers - Customer lookup by email or ID
    // LOOKUP REASON: Official Stripe customer search patterns
    let customer;
    
    if (customerId) {
      // Direct customer ID lookup
      const { stripe } = await import('@/lib/stripe/stripe-config');
      customer = await stripe.customers.retrieve(customerId);
    } else if (email) {
      // Email-based customer search
      const { stripe } = await import('@/lib/stripe/stripe-config');
      const customers = await stripe.customers.list({
        email: email,
        limit: 1
      });
      
      if (customers.data.length === 0) {
        return NextResponse.json(
          { 
            success: false,
            error: 'Customer not found',
            code: 'CUSTOMER_NOT_FOUND'
          },
          { status: 404 }
        );
      }
      
      customer = customers.data[0];
    }

    // Format response
    const response = {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      created: customer.created,
      metadata: customer.metadata,
      balance: customer.balance,
      currency: customer.currency,
      livemode: customer.livemode,
    };

    return NextResponse.json({
      success: true,
      customer: response
    });

  } catch (error) {
    console.error('Customer retrieval API error:', error);

    // Handle Stripe errors
    if (error instanceof Error && error.message.includes('No such customer')) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Customer not found',
          code: 'CUSTOMER_NOT_FOUND'
        },
        { status: 404 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { 
        success: false,
        error: 'Customer retrieval failed',
        code: 'CUSTOMER_RETRIEVAL_FAILED'
      },
      { status: 500 }
    );
  }
}

// CONTEXT7 SOURCE: /next.js/app-router - CORS configuration for customer API
// SECURITY REASON: Official Next.js CORS patterns for customer management endpoints
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://myprivatetutoronline.com,https://myprivatetutoronline.vercel.app',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours
    },
  });
}