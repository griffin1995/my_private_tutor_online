'use client';

// CONTEXT7 SOURCE: /next.js/app-router - Payments page for tutoring platform
// PAYMENTS PAGE REASON: Official Next.js 15 App Router patterns for payment integration

import React, { useState } from 'react';
import { Suspense } from 'react';
import PaymentForm from '@/components/payments/payment-form';
import PaymentSuccess from '@/components/payments/payment-success';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Shield, Star, Users, Award } from 'lucide-react';

// CONTEXT7 SOURCE: /react/hooks - Payment page state management
// STATE MANAGEMENT REASON: Official React patterns for payment flow state
export default function PaymentsPage() {
  const [paymentStatus, setPaymentStatus] = useState<'form' | 'success' | 'error'>('form');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // CONTEXT7 SOURCE: /react/event-handling - Payment success handler
  // SUCCESS HANDLING REASON: Official React patterns for payment completion
  const handlePaymentSuccess = (intentId: string) => {
    setPaymentIntentId(intentId);
    setPaymentStatus('success');
  };

  // CONTEXT7 SOURCE: /react/event-handling - Payment error handler
  // ERROR HANDLING REASON: Official React patterns for payment failure handling
  const handlePaymentError = (error: string) => {
    setErrorMessage(error);
    setPaymentStatus('error');
  };

  // CONTEXT7 SOURCE: /react/conditional-rendering - Payment flow rendering
  // FLOW RENDERING REASON: Official React patterns for multi-step payment flows
  const renderContent = () => {
    switch (paymentStatus) {
      case 'success':
        return (
          <PaymentSuccess
            paymentIntentId={paymentIntentId}
            onScheduleBooking={() => {
              window.location.href = '/contact?subject=schedule-session';
            }}
            onDownloadReceipt={() => {
              window.open(`/api/payments/receipt?payment_intent=${paymentIntentId}`, '_blank');
            }}
          />
        );

      case 'error':
        return (
          <Card className="w-full max-w-2xl mx-auto border-red-200 bg-red-50">
            <CardContent className="pt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">⚠</span>
                </div>
                <h2 className="text-2xl font-bold text-red-800 mb-2">Payment Failed</h2>
                <p className="text-red-700 mb-4">{errorMessage}</p>
                <button
                  onClick={() => {
                    setPaymentStatus('form');
                    setErrorMessage('');
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return (
          <PaymentForm
            onSuccess={handlePaymentSuccess}
            onError={handlePaymentError}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Secure Payment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of families who trust My Private Tutor Online for premium educational excellence
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Secure Payments</h3>
            <p className="text-sm text-gray-600">256-bit SSL encryption & PCI compliance</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">5-Star Service</h3>
            <p className="text-sm text-gray-600">Rated excellent by 2,500+ families</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Expert Tutors</h3>
            <p className="text-sm text-gray-600">Oxbridge graduates & subject specialists</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Proven Results</h3>
            <p className="text-sm text-gray-600">95% success rate for grammar school entry</p>
          </div>
        </div>

        {/* Main Payment Content */}
        <Suspense fallback={
          <Card className="w-full max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Loading payment form...</p>
              </div>
            </CardContent>
          </Card>
        }>
          {renderContent()}
        </Suspense>

        {/* Security Footer */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center gap-6 mb-4">
            <img 
              src="/images/stripe-badge.png" 
              alt="Powered by Stripe" 
              className="h-8 opacity-70"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="text-sm text-gray-500">
              🔒 Powered by Stripe • PCI DSS Level 1 Compliant
            </div>
          </div>
          <p className="text-xs text-gray-400 max-w-2xl mx-auto">
            Your payment information is processed securely. We do not store credit card details nor do we share customer details with any third parties. 
            All transactions are protected by industry-standard 256-bit SSL encryption.
          </p>
        </div>

        {/* Support Contact */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Need help with your payment?
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a 
              href="mailto:payments@myprivatetutoronline.com" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              payments@myprivatetutoronline.com
            </a>
            <span className="text-gray-400">•</span>
            <a 
              href="tel:+447123456789" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              +44 7123 456 789
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}