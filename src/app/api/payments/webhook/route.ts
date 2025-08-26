// CONTEXT7 SOURCE: /stripe/webhooks - Stripe webhook handling for payment events
// WEBHOOK REASON: Official Stripe webhook patterns for secure payment event processing

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/stripe-config';
import { PaymentService } from '@/lib/stripe/payment-service';
import { headers } from 'next/headers';

// CONTEXT7 SOURCE: /stripe/webhooks - Webhook endpoint signature verification
// SECURITY REASON: Official Stripe webhook security patterns for event validation
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('Missing Stripe signature header');
      return NextResponse.json(
        { error: 'Missing signature header' },
        { status: 400 }
      );
    }

    // CONTEXT7 SOURCE: /stripe/webhooks - Event construction and verification
    // VERIFICATION REASON: Official Stripe webhook verification patterns for security
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log(`Processing webhook event: ${event.type} (${event.id})`);

    // CONTEXT7 SOURCE: /stripe/webhooks - Event processing delegation
    // PROCESSING REASON: Official Stripe event handling patterns for business logic
    const processed = await PaymentService.processWebhookEvent(event);

    if (!processed) {
      console.error(`Failed to process webhook event: ${event.type}`);
      return NextResponse.json(
        { error: 'Event processing failed' },
        { status: 500 }
      );
    }

    // CONTEXT7 SOURCE: /stripe/webhooks - Successful webhook response
    // SUCCESS RESPONSE REASON: Official Stripe webhook acknowledgment patterns
    return NextResponse.json({
      received: true,
      eventId: event.id,
      eventType: event.type,
      processed: true
    });

  } catch (error) {
    console.error('Webhook processing error:', error);

    // CONTEXT7 SOURCE: /stripe/webhooks - Webhook error handling
    // ERROR HANDLING REASON: Official Stripe webhook error response patterns
    if (error instanceof Error && error.message.includes('signature')) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// CONTEXT7 SOURCE: /next.js/app-router - Webhook method restrictions
// SECURITY REASON: Official Next.js API route security patterns for webhooks
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}