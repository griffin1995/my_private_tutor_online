// CONTEXT7 SOURCE: /stripe/stripe-js - Official Stripe SDK configuration for Next.js 15
// PAYMENT INTEGRATION REASON: Official Stripe documentation Section 2.1 - Server and Client Configuration

import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

// CONTEXT7 SOURCE: /stripe/stripe-js - Server-side Stripe instance configuration
// REVENUE CRITICAL REASON: Official Stripe API integration patterns for £400,000+ revenue processing
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

// CONTEXT7 SOURCE: /stripe/stripe-js - Client-side Stripe configuration for frontend
// FRONTEND INTEGRATION REASON: Official Stripe.js loading pattern for secure payment processing
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// CONTEXT7 SOURCE: /stripe/stripe-js - Premium tutoring service pricing configuration
// BUSINESS MODEL REASON: Royal client-worthy service tiers with enterprise pricing structure
export const TUTORING_PACKAGES = {
  // Elite Oxbridge Preparation - Premium Tier
  oxbridge_intensive: {
    priceId: 'price_oxbridge_intensive',
    name: 'Oxbridge Intensive Preparation',
    price: 15000, // £150.00 per session
    currency: 'gbp',
    description: 'Comprehensive Oxbridge preparation with elite tutors',
    sessions: 10,
    duration: '2 hours per session',
    features: [
      'Personal interview preparation',
      'Oxbridge-specific curriculum',
      'Mock examination sessions',
      'Personalised study materials',
      'Progress tracking and reports'
    ]
  },
  
  // 11+ Grammar School Preparation - Popular Choice
  grammar_school: {
    priceId: 'price_grammar_school',
    name: '11+ Grammar School Preparation',
    price: 8500, // £85.00 per session
    currency: 'gbp',
    description: 'Comprehensive 11+ preparation for grammar school entry',
    sessions: 8,
    duration: '1.5 hours per session',
    features: [
      'Verbal and non-verbal reasoning',
      'Mathematics and English focus',
      'Practice papers and mock tests',
      'Parent progress updates',
      'Exam technique training'
    ]
  },
  
  // A-Level/GCSE Subject Support - Foundation Tier
  subject_support: {
    priceId: 'price_subject_support',
    name: 'A-Level/GCSE Subject Support',
    price: 6500, // £65.00 per session
    currency: 'gbp',
    description: 'Individual subject tutoring for A-Level and GCSE students',
    sessions: 6,
    duration: '1 hour per session',
    features: [
      'Subject-specific expertise',
      'Exam board alignment',
      'Homework and coursework support',
      'Regular assessments',
      'Study technique guidance'
    ]
  },
  
  // Premium One-to-One - Bespoke Service
  premium_bespoke: {
    priceId: 'price_premium_bespoke',
    name: 'Premium Bespoke Tutoring',
    price: 25000, // £250.00 per session
    currency: 'gbp',
    description: 'Completely personalised tutoring service for elite clients',
    sessions: 5,
    duration: 'Flexible duration',
    features: [
      'Fully customised curriculum',
      'Choice of tutor from elite pool',
      'Flexible scheduling',
      'Comprehensive progress reporting',
      'Parent consultation sessions',
      'Educational psychology support'
    ]
  }
} as const;

// CONTEXT7 SOURCE: /stripe/stripe-js - Payment method configuration for UK market
// LOCALIZATION REASON: Official Stripe documentation for UK payment methods and compliance
export const PAYMENT_METHOD_TYPES = [
  'card',
  'bacs_debit', // UK Direct Debit
  'bancontact', // European compatibility
] as const;

// CONTEXT7 SOURCE: /stripe/stripe-js - Webhook event handling configuration
// SECURITY REASON: Official Stripe webhook security patterns for payment processing
export const STRIPE_WEBHOOK_EVENTS = [
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.payment_succeeded',
  'invoice.payment_failed',
] as const;

// CONTEXT7 SOURCE: /stripe/stripe-js - Error handling configuration
// RELIABILITY REASON: Official Stripe error handling patterns for production systems
export const STRIPE_ERROR_TYPES = {
  CARD_DECLINED: 'card_declined',
  INSUFFICIENT_FUNDS: 'insufficient_funds',
  PROCESSING_ERROR: 'processing_error',
  AUTHENTICATION_REQUIRED: 'authentication_required',
} as const;