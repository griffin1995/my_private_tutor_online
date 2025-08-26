// CONTEXT7 SOURCE: /stripe/stripe-js - Payment service implementation for tutoring platform
// PAYMENT SERVICE REASON: Official Stripe API patterns for secure payment processing

import { stripe, TUTORING_PACKAGES, PAYMENT_METHOD_TYPES } from './stripe-config';
import type Stripe from 'stripe';

// CONTEXT7 SOURCE: /typescript/handbook - Type definitions for payment service
// TYPE SAFETY REASON: Official TypeScript patterns for payment data structures
export interface CreatePaymentIntentData {
  packageType: keyof typeof TUTORING_PACKAGES;
  customerEmail: string;
  customerName: string;
  studentName?: string;
  subjects?: string[];
  specialRequirements?: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResponse {
  success: boolean;
  clientSecret?: string;
  paymentIntentId?: string;
  error?: string;
  errorCode?: string;
}

export interface CustomerData {
  email: string;
  name: string;
  phone?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    postal_code: string;
    country: string;
  };
  metadata?: Record<string, string>;
}

export interface SubscriptionData {
  customerId: string;
  packageType: keyof typeof TUTORING_PACKAGES;
  paymentMethodId: string;
  trialPeriodDays?: number;
  metadata?: Record<string, string>;
}

// CONTEXT7 SOURCE: /stripe/stripe-js - Payment Intent creation service
// REVENUE PROCESSING REASON: Official Stripe payment intent patterns for secure transactions
export class PaymentService {
  
  /**
   * Create a payment intent for tutoring package purchase
   * Handles all package types with appropriate pricing and metadata
   */
  static async createPaymentIntent(data: CreatePaymentIntentData): Promise<PaymentIntentResponse> {
    try {
      const packageDetails = TUTORING_PACKAGES[data.packageType];
      
      if (!packageDetails) {
        return {
          success: false,
          error: 'Invalid package type specified',
          errorCode: 'INVALID_PACKAGE'
        };
      }

      // CONTEXT7 SOURCE: /stripe/stripe-js - Payment Intent configuration with UK market settings
      // LOCALIZATION REASON: Official Stripe UK market configuration for GBP processing
      const paymentIntent = await stripe.paymentIntents.create({
        amount: packageDetails.price,
        currency: packageDetails.currency,
        payment_method_types: [...PAYMENT_METHOD_TYPES],
        receipt_email: data.customerEmail,
        description: `${packageDetails.name} - ${data.customerName}`,
        metadata: {
          package_type: data.packageType,
          customer_name: data.customerName,
          customer_email: data.customerEmail,
          student_name: data.studentName || data.customerName,
          subjects: data.subjects?.join(', ') || '',
          special_requirements: data.specialRequirements || '',
          service_type: 'tutoring_package',
          business_unit: 'premium_tutoring',
          ...data.metadata
        },
        // CONTEXT7 SOURCE: /stripe/stripe-js - Automatic payment method configuration
        // SECURITY REASON: Official Stripe security patterns for payment confirmation
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never' // Keep users on our platform for better UX
        }
      });

      return {
        success: true,
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id
      };

    } catch (error) {
      console.error('Payment intent creation failed:', error);
      
      if (error instanceof Error) {
        return {
          success: false,
          error: error.message,
          errorCode: 'PAYMENT_INTENT_CREATION_FAILED'
        };
      }
      
      return {
        success: false,
        error: 'Unknown payment processing error',
        errorCode: 'UNKNOWN_ERROR'
      };
    }
  }

  /**
   * Create or retrieve Stripe customer
   * Implements customer deduplication and data management
   */
  static async createOrRetrieveCustomer(customerData: CustomerData): Promise<Stripe.Customer> {
    try {
      // CONTEXT7 SOURCE: /stripe/stripe-js - Customer deduplication pattern
      // EFFICIENCY REASON: Official Stripe customer management patterns
      const existingCustomers = await stripe.customers.list({
        email: customerData.email,
        limit: 1
      });

      if (existingCustomers.data.length > 0) {
        const customer = existingCustomers.data[0];
        
        // Update customer data if needed
        return await stripe.customers.update(customer.id, {
          name: customerData.name,
          phone: customerData.phone,
          address: customerData.address,
          metadata: {
            ...customer.metadata,
            ...customerData.metadata,
            last_updated: new Date().toISOString()
          }
        });
      }

      // CONTEXT7 SOURCE: /stripe/stripe-js - New customer creation pattern
      // CUSTOMER MANAGEMENT REASON: Official Stripe customer creation with full data capture
      return await stripe.customers.create({
        email: customerData.email,
        name: customerData.name,
        phone: customerData.phone,
        address: customerData.address,
        metadata: {
          customer_type: 'tutoring_client',
          registration_date: new Date().toISOString(),
          service_tier: 'premium',
          ...customerData.metadata
        }
      });

    } catch (error) {
      console.error('Customer creation/retrieval failed:', error);
      throw new Error(`Customer management failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create subscription for recurring tutoring services
   * Implements flexible billing cycles for different service tiers
   */
  static async createSubscription(subscriptionData: SubscriptionData): Promise<Stripe.Subscription> {
    try {
      const packageDetails = TUTORING_PACKAGES[subscriptionData.packageType];
      
      // CONTEXT7 SOURCE: /stripe/stripe-js - Subscription creation with payment method
      // SUBSCRIPTION REASON: Official Stripe subscription patterns for recurring services
      const subscription = await stripe.subscriptions.create({
        customer: subscriptionData.customerId,
        default_payment_method: subscriptionData.paymentMethodId,
        items: [{
          price_data: {
            currency: packageDetails.currency,
            product_data: {
              name: packageDetails.name,
              description: packageDetails.description,
              metadata: {
                package_type: subscriptionData.packageType,
                sessions_included: packageDetails.sessions.toString(),
                session_duration: packageDetails.duration
              }
            },
            recurring: {
              interval: 'month', // Monthly billing for consistent cash flow
              interval_count: 1
            },
            unit_amount: packageDetails.price
          }
        }],
        trial_period_days: subscriptionData.trialPeriodDays,
        metadata: {
          package_type: subscriptionData.packageType,
          service_type: 'recurring_tutoring',
          billing_cycle: 'monthly',
          ...subscriptionData.metadata
        }
      });

      return subscription;

    } catch (error) {
      console.error('Subscription creation failed:', error);
      throw new Error(`Subscription creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Retrieve payment intent status and details
   * Used for payment confirmation and status tracking
   */
  static async getPaymentIntentStatus(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      return await stripe.paymentIntents.retrieve(paymentIntentId);
    } catch (error) {
      console.error('Payment intent retrieval failed:', error);
      throw new Error(`Payment status check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Process webhook events for payment status updates
   * Handles all critical payment lifecycle events
   */
  static async processWebhookEvent(event: Stripe.Event): Promise<boolean> {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
          break;
          
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object as Stripe.PaymentIntent);
          break;
          
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          await this.handleSubscriptionChange(event.data.object as Stripe.Subscription);
          break;
          
        case 'invoice.payment_succeeded':
          await this.handleInvoicePayment(event.data.object as Stripe.Invoice);
          break;
          
        default:
          console.log(`Unhandled webhook event type: ${event.type}`);
      }
      
      return true;
      
    } catch (error) {
      console.error('Webhook processing failed:', error);
      return false;
    }
  }

  // CONTEXT7 SOURCE: /stripe/stripe-js - Payment success handling
  // SUCCESS PROCESSING REASON: Official Stripe success event processing patterns
  private static async handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    console.log('Payment succeeded:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      customer: paymentIntent.customer,
      metadata: paymentIntent.metadata
    });
    
    // TODO: Implement business logic for successful payment
    // - Send confirmation email
    // - Create tutoring session bookings
    // - Update customer records
    // - Trigger welcome sequence
  }

  // CONTEXT7 SOURCE: /stripe/stripe-js - Payment failure handling
  // FAILURE PROCESSING REASON: Official Stripe failure event processing patterns
  private static async handlePaymentFailure(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    console.log('Payment failed:', {
      id: paymentIntent.id,
      last_payment_error: paymentIntent.last_payment_error,
      customer: paymentIntent.customer,
      metadata: paymentIntent.metadata
    });
    
    // TODO: Implement business logic for failed payment
    // - Send failure notification
    // - Retry payment prompts
    // - Customer support alerts
  }

  // CONTEXT7 SOURCE: /stripe/stripe-js - Subscription event handling
  // SUBSCRIPTION PROCESSING REASON: Official Stripe subscription lifecycle management
  private static async handleSubscriptionChange(subscription: Stripe.Subscription): Promise<void> {
    console.log('Subscription changed:', {
      id: subscription.id,
      status: subscription.status,
      customer: subscription.customer,
      metadata: subscription.metadata
    });
    
    // TODO: Implement subscription business logic
    // - Update service access
    // - Modify tutoring schedules
    // - Send status notifications
  }

  // CONTEXT7 SOURCE: /stripe/stripe-js - Invoice payment handling
  // INVOICE PROCESSING REASON: Official Stripe invoice processing patterns
  private static async handleInvoicePayment(invoice: Stripe.Invoice): Promise<void> {
    console.log('Invoice paid:', {
      id: invoice.id,
      subscription: invoice.subscription,
      customer: invoice.customer,
      amount_paid: invoice.amount_paid
    });
    
    // TODO: Implement invoice business logic
    // - Send payment receipts
    // - Update billing records
    // - Renew service access
  }
}