'use client';

// CONTEXT7 SOURCE: /@stripe/stripe-js - React Stripe Elements payment form
// PAYMENT FORM REASON: Official Stripe Elements patterns for secure card processing

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { TUTORING_PACKAGES } from '@/lib/stripe/stripe-config';
import { toast } from 'sonner';

// CONTEXT7 SOURCE: /@stripe/stripe-js - Stripe public key configuration
// CONFIGURATION REASON: Official Stripe.js initialization patterns
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// CONTEXT7 SOURCE: /@stripe/stripe-js - Card element styling configuration
// STYLING REASON: Official Stripe Elements styling patterns for premium UI
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: false, // Keep postal code for UK market
};

// CONTEXT7 SOURCE: /typescript/handbook - Payment form data interface
// TYPE SAFETY REASON: Official TypeScript patterns for form data structures
interface PaymentFormData {
  packageType: keyof typeof TUTORING_PACKAGES;
  customerEmail: string;
  customerName: string;
  studentName: string;
  subjects: string[];
  specialRequirements: string;
}

interface PaymentFormProps {
  onSuccess?: (paymentIntentId: string) => void;
  onError?: (error: string) => void;
  prefilledData?: Partial<PaymentFormData>;
}

// CONTEXT7 SOURCE: /react/hooks - Payment processing form component
// FORM COMPONENT REASON: Official React patterns for payment form implementation
function PaymentFormContent({ onSuccess, onError, prefilledData }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [formData, setFormData] = useState<PaymentFormData>({
    packageType: 'grammar_school',
    customerEmail: prefilledData?.customerEmail || '',
    customerName: prefilledData?.customerName || '',
    studentName: prefilledData?.studentName || '',
    subjects: prefilledData?.subjects || [],
    specialRequirements: prefilledData?.specialRequirements || '',
  });
  
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'succeeded' | 'failed'>('idle');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  // CONTEXT7 SOURCE: /react/hooks - Form field update handler
  // STATE MANAGEMENT REASON: Official React state management patterns for forms
  const updateFormData = (field: keyof PaymentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // CONTEXT7 SOURCE: /@stripe/stripe-js - Payment intent creation effect
  // PAYMENT INTENT REASON: Official Stripe payment intent creation patterns
  useEffect(() => {
    if (formData.packageType && formData.customerEmail && formData.customerName) {
      createPaymentIntent();
    }
  }, [formData.packageType, formData.customerEmail, formData.customerName]);

  // CONTEXT7 SOURCE: /@stripe/stripe-js - Payment intent creation function
  // INTENT CREATION REASON: Official Stripe payment intent API integration
  const createPaymentIntent = async () => {
    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageType: formData.packageType,
          customerEmail: formData.customerEmail,
          customerName: formData.customerName,
          studentName: formData.studentName || formData.customerName,
          subjects: formData.subjects,
          specialRequirements: formData.specialRequirements,
          metadata: {
            source: 'payment_form',
            timestamp: new Date().toISOString(),
          }
        }),
      });

      const data = await response.json();
      
      if (data.success && data.clientSecret) {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      } else {
        throw new Error(data.error || 'Failed to create payment intent');
      }
    } catch (error) {
      console.error('Payment intent creation failed:', error);
      toast.error('Failed to initialize payment. Please try again.');
      onError?.(error instanceof Error ? error.message : 'Payment initialization failed');
    }
  };

  // CONTEXT7 SOURCE: /@stripe/stripe-js - Payment form submission handler
  // PAYMENT SUBMISSION REASON: Official Stripe payment confirmation patterns
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);
    setPaymentStatus('processing');

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setProcessing(false);
      setPaymentStatus('failed');
      toast.error('Payment form not properly initialized');
      return;
    }

    // CONTEXT7 SOURCE: /@stripe/stripe-js - Payment confirmation with card element
    // CONFIRMATION REASON: Official Stripe payment confirmation patterns
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: formData.customerName,
          email: formData.customerEmail,
        },
      },
      receipt_email: formData.customerEmail,
    });

    setProcessing(false);

    if (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('failed');
      toast.error(`Payment failed: ${error.message}`);
      onError?.(error.message || 'Payment failed');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded:', paymentIntent.id);
      setPaymentStatus('succeeded');
      toast.success('Payment successful! Thank you for your purchase.');
      onSuccess?.(paymentIntent.id);
    } else {
      setPaymentStatus('failed');
      toast.error('Payment processing failed. Please try again.');
      onError?.('Payment processing failed');
    }
  };

  const selectedPackage = TUTORING_PACKAGES[formData.packageType];
  const packagePrice = selectedPackage.price / 100; // Convert pence to pounds

  // CONTEXT7 SOURCE: /react/conditional-rendering - Payment status rendering
  // STATUS DISPLAY REASON: Official React patterns for payment status feedback
  if (paymentStatus === 'succeeded') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-8">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for purchasing {selectedPackage.name}
            </p>
            <p className="text-sm text-gray-500">
              Payment ID: {paymentIntentId}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              You will receive a confirmation email shortly with next steps.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-6 h-6" />
          Secure Payment
        </CardTitle>
        <CardDescription>
          Complete your tutoring package purchase securely
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Package Selection */}
          <div className="space-y-2">
            <Label htmlFor="package">Tutoring Package</Label>
            <Select
              value={formData.packageType}
              onValueChange={(value) => updateFormData('packageType', value as keyof typeof TUTORING_PACKAGES)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a tutoring package" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TUTORING_PACKAGES).map(([key, pkg]) => (
                  <SelectItem key={key} value={key}>
                    {pkg.name} - £{(pkg.price / 100).toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Package Details */}
          <div className="p-4 bg-blue-50 rounded-lg border">
            <h3 className="font-semibold text-blue-900">{selectedPackage.name}</h3>
            <p className="text-blue-700 text-sm mb-2">{selectedPackage.description}</p>
            <div className="space-y-1 text-sm text-blue-600">
              <p><strong>Price:</strong> £{packagePrice.toFixed(2)}</p>
              <p><strong>Sessions:</strong> {selectedPackage.sessions}</p>
              <p><strong>Duration:</strong> {selectedPackage.duration}</p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Parent/Guardian Name *</Label>
              <Input
                id="customerName"
                type="text"
                value={formData.customerName}
                onChange={(e) => updateFormData('customerName', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Email Address *</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) => updateFormData('customerEmail', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentName">Student Name</Label>
            <Input
              id="studentName"
              type="text"
              value={formData.studentName}
              onChange={(e) => updateFormData('studentName', e.target.value)}
              placeholder="If different from parent/guardian name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subjects">Subjects (optional)</Label>
            <Input
              id="subjects"
              type="text"
              value={formData.subjects.join(', ')}
              onChange={(e) => updateFormData('subjects', e.target.value.split(', ').filter(Boolean))}
              placeholder="Mathematics, English, Science..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequirements">Special Requirements (optional)</Label>
            <Textarea
              id="specialRequirements"
              value={formData.specialRequirements}
              onChange={(e) => updateFormData('specialRequirements', e.target.value)}
              placeholder="Any specific learning needs, accessibility requirements, or preferences..."
              rows={3}
            />
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <Label>Payment Information</Label>
            <div className="p-4 border border-gray-300 rounded-md bg-white">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!stripe || processing || paymentStatus === 'processing'}
            className="w-full"
            size="lg"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay £{packagePrice.toFixed(2)}
              </>
            )}
          </Button>

          {/* Security Notice */}
          <div className="text-center text-sm text-gray-500">
            <p>🔒 Your payment information is secure and encrypted</p>
            <p>Powered by Stripe • PCI DSS Compliant</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// CONTEXT7 SOURCE: /@stripe/stripe-js - Stripe Elements provider wrapper
// PROVIDER REASON: Official Stripe Elements provider patterns for React integration
export default function PaymentForm(props: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent {...props} />
    </Elements>
  );
}