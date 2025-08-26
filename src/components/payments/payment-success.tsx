'use client';

// CONTEXT7 SOURCE: /next.js/app-router - Payment success component for tutoring platform
// SUCCESS COMPONENT REASON: Official Next.js patterns for payment success handling

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Calendar, Mail, ArrowRight, Star } from 'lucide-react';
import { TUTORING_PACKAGES } from '@/lib/stripe/stripe-config';
import Link from 'next/link';

// CONTEXT7 SOURCE: /typescript/handbook - Payment success component props interface
// TYPE SAFETY REASON: Official TypeScript patterns for component props
interface PaymentSuccessProps {
  paymentIntentId: string;
  customerEmail?: string;
  packageType?: keyof typeof TUTORING_PACKAGES;
  onScheduleBooking?: () => void;
  onDownloadReceipt?: () => void;
}

// CONTEXT7 SOURCE: /react/hooks - Payment confirmation and status tracking
// STATUS TRACKING REASON: Official React patterns for payment confirmation
export default function PaymentSuccess({
  paymentIntentId,
  customerEmail,
  packageType,
  onScheduleBooking,
  onDownloadReceipt
}: PaymentSuccessProps) {
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // CONTEXT7 SOURCE: /react/hooks - Payment details retrieval effect
  // CONFIRMATION REASON: Official React patterns for payment confirmation data fetching
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentIntentId,
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          setPaymentDetails(data.payment);
        } else {
          console.error('Failed to fetch payment details:', data.error);
        }
      } catch (error) {
        console.error('Payment confirmation error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (paymentIntentId) {
      fetchPaymentDetails();
    }
  }, [paymentIntentId]);

  const selectedPackage = packageType ? TUTORING_PACKAGES[packageType] : null;
  const paymentAmount = paymentDetails?.amount ? (paymentDetails.amount / 100).toFixed(2) : '0.00';

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-8">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Confirming your payment...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Success Card */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="text-center pb-4">
          <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-2xl text-green-800 mb-2">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-green-700 text-lg">
            Thank you for choosing My Private Tutor Online
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Payment Summary */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Amount Paid</p>
                <p className="text-2xl font-bold text-green-600">£{paymentAmount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Payment ID</p>
                <p className="font-mono text-sm">{paymentIntentId}</p>
              </div>
              {selectedPackage && (
                <div>
                  <p className="text-sm text-gray-600">Package</p>
                  <p className="font-semibold">{selectedPackage.name}</p>
                </div>
              )}
              {customerEmail && (
                <div>
                  <p className="text-sm text-gray-600">Confirmation Email</p>
                  <p className="text-sm">{customerEmail}</p>
                </div>
              )}
            </div>
          </div>

          {/* Package Details */}
          {selectedPackage && (
            <div className="bg-blue-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Your {selectedPackage.name} Package
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-blue-600">Sessions Included</p>
                  <p className="font-semibold text-blue-900">{selectedPackage.sessions} sessions</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Session Duration</p>
                  <p className="font-semibold text-blue-900">{selectedPackage.duration}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-blue-600 mb-2">Package Features</p>
                <ul className="space-y-1">
                  {selectedPackage.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-blue-800">
                      <Star className="w-4 h-4 mr-2 text-blue-600 fill-current" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">What Happens Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Confirmation Email</h4>
                  <p className="text-sm text-gray-600">
                    You'll receive a detailed confirmation email with your receipt and package details within the next few minutes.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Tutor Matching</h4>
                  <p className="text-sm text-gray-600">
                    Our team will match you with the perfect tutor based on your requirements within 24 hours.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Schedule Your Sessions</h4>
                  <p className="text-sm text-gray-600">
                    Your assigned tutor will contact you to schedule your first session at a convenient time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onScheduleBooking}
              className="flex-1"
              size="lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule First Session
            </Button>
            
            <Button
              onClick={onDownloadReceipt}
              variant="outline"
              size="lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Receipt
            </Button>
          </div>

          {/* Support Information */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Need Help?</h4>
                <p className="text-sm text-yellow-700 mb-2">
                  Our customer support team is ready to assist you with any questions about your purchase or tutoring sessions.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 text-sm">
                  <Link href="/contact" className="text-yellow-800 hover:text-yellow-900 font-medium">
                    Contact Support
                  </Link>
                  <span className="hidden sm:inline text-yellow-600">•</span>
                  <Link href="/faq" className="text-yellow-800 hover:text-yellow-900 font-medium">
                    Visit FAQ
                  </Link>
                  <span className="hidden sm:inline text-yellow-600">•</span>
                  <a href="mailto:support@myprivatetutoronline.com" className="text-yellow-800 hover:text-yellow-900 font-medium">
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Return to Website */}
          <div className="text-center pt-4">
            <Link href="/">
              <Button variant="ghost" size="lg">
                Return to Homepage
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}