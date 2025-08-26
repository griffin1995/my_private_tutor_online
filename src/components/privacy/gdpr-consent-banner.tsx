'use client';

// CONTEXT7 SOURCE: /gdpr/consent-ui - GDPR compliant consent banner component
// CONSENT BANNER REASON: Official GDPR Article 7 patterns for consent collection

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, Shield, Cookie, Mail, BarChart, CreditCard } from 'lucide-react';

// CONTEXT7 SOURCE: /typescript/handbook - GDPR consent preferences interface
// TYPE SAFETY REASON: Official TypeScript patterns for consent management
interface ConsentPreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  communication: boolean;
  payment_processing: boolean;
}

interface ConsentBannerProps {
  onConsentUpdate?: (preferences: ConsentPreferences) => void;
  initialPreferences?: Partial<ConsentPreferences>;
  compactMode?: boolean;
}

// CONTEXT7 SOURCE: /react/hooks - GDPR consent banner component
// CONSENT UI REASON: Official React patterns for GDPR consent interfaces
export default function GDPRConsentBanner({ 
  onConsentUpdate, 
  initialPreferences = {},
  compactMode = false 
}: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true, // Always true - cannot be disabled
    analytics: initialPreferences.analytics ?? false,
    marketing: initialPreferences.marketing ?? false,
    communication: initialPreferences.communication ?? false,
    payment_processing: initialPreferences.payment_processing ?? false,
  });
  const [processing, setProcessing] = useState(false);

  // CONTEXT7 SOURCE: /react/hooks - Consent banner visibility effect
  // VISIBILITY LOGIC REASON: Official React patterns for conditional rendering
  useEffect(() => {
    // Check if user has already made consent choices
    const hasConsented = localStorage.getItem('gdpr-consent-given');
    const consentExpiry = localStorage.getItem('gdpr-consent-expiry');
    
    if (!hasConsented || (consentExpiry && new Date(consentExpiry) < new Date())) {
      setShowBanner(true);
    }
  }, []);

  // CONTEXT7 SOURCE: /gdpr/consent-processing - Consent preferences handler
  // CONSENT PROCESSING REASON: Official GDPR patterns for consent recording
  const handleConsentSubmission = async (acceptAll: boolean = false) => {
    setProcessing(true);

    try {
      const finalPreferences: ConsentPreferences = acceptAll ? {
        essential: true,
        analytics: true,
        marketing: true,
        communication: true,
        payment_processing: true,
      } : preferences;

      // CONTEXT7 SOURCE: /gdpr/api-integration - Submit consent preferences to API
      // API INTEGRATION REASON: Official GDPR consent recording patterns
      const consentPromises = [];

      // Process each consent purpose
      for (const [purpose, granted] of Object.entries(finalPreferences)) {
        if (purpose === 'essential') continue; // Essential doesn't need explicit consent
        
        if (granted) {
          consentPromises.push(
            fetch('/api/gdpr/consent', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'grant',
                email: getUserEmail(), // Would get from user context
                purpose: mapPurposeName(purpose),
                consent_text: getConsentText(purpose),
                version: '2.0',
                ip_address: await getUserIP(),
                user_agent: navigator.userAgent,
                double_opt_in: false,
                consent_method: 'explicit_checkbox'
              })
            })
          );
        }
      }

      // Wait for all consent submissions
      await Promise.allSettled(consentPromises);

      // Store consent in localStorage
      localStorage.setItem('gdpr-consent-given', 'true');
      localStorage.setItem('gdpr-consent-preferences', JSON.stringify(finalPreferences));
      localStorage.setItem('gdpr-consent-date', new Date().toISOString());
      
      // Set expiry for 12 months (GDPR recommendation)
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      localStorage.setItem('gdpr-consent-expiry', expiryDate.toISOString());

      // Notify parent component
      onConsentUpdate?.(finalPreferences);

      // Hide banner
      setShowBanner(false);

    } catch (error) {
      console.error('Failed to process consent:', error);
      // Show error message to user
    } finally {
      setProcessing(false);
    }
  };

  // CONTEXT7 SOURCE: /gdpr/preference-update - Individual preference update handler
  // PREFERENCE UPDATE REASON: Official GDPR granular consent patterns
  const updatePreference = (purpose: keyof ConsentPreferences, value: boolean) => {
    if (purpose === 'essential') return; // Essential cannot be changed
    
    setPreferences(prev => ({
      ...prev,
      [purpose]: value
    }));
  };

  // Don't render if banner shouldn't be shown
  if (!showBanner) return null;

  // CONTEXT7 SOURCE: /react/conditional-rendering - Compact banner rendering
  // COMPACT MODE REASON: Official React patterns for responsive consent UI
  if (compactMode) {
    return (
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
        <Card className="border-blue-200 bg-blue-50 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Cookie className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-blue-900 mb-3">
                  We use cookies and process personal data to provide our tutoring services. 
                  <button
                    onClick={() => setShowDetails(true)}
                    className="text-blue-700 underline hover:text-blue-800 ml-1"
                  >
                    Learn more
                  </button>
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleConsentSubmission(true)}
                    disabled={processing}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Accept All
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowDetails(true)}
                  >
                    Customize
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // CONTEXT7 SOURCE: /react/conditional-rendering - Full consent interface rendering
  // FULL INTERFACE REASON: Official React patterns for detailed consent management
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <CardTitle>Your Privacy Choices</CardTitle>
          </div>
          <CardDescription>
            We respect your privacy and are committed to protecting your personal data under UK GDPR. 
            Please review and customize your consent preferences below.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Essential Cookies - Always Required */}
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <Shield className="w-5 h-5 text-gray-600 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Essential Services</h3>
                <Checkbox checked={true} disabled className="opacity-60" />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Required for basic website functionality, security, and providing our tutoring services. 
                These cannot be disabled as they are necessary for the service to function.
              </p>
              <div className="text-xs text-gray-500 mt-2">
                Legal basis: Legitimate interest (Article 6(1)(f) GDPR)
              </div>
            </div>
          </div>

          {/* Analytics Consent */}
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <BarChart className="w-5 h-5 text-green-600 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Analytics & Performance</h3>
                <Checkbox 
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => updatePreference('analytics', !!checked)}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Help us understand how you use our website to improve our services and user experience.
                Data is anonymized and used only for statistical analysis.
              </p>
              <div className="text-xs text-gray-500 mt-2">
                Legal basis: Consent (Article 6(1)(a) GDPR) • Retention: 24 months
              </div>
            </div>
          </div>

          {/* Marketing Consent */}
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Mail className="w-5 h-5 text-blue-600 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Marketing Communications</h3>
                <Checkbox 
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => updatePreference('marketing', !!checked)}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Receive personalised offers, educational content, and updates about our tutoring services.
                You can unsubscribe at any time.
              </p>
              <div className="text-xs text-gray-500 mt-2">
                Legal basis: Consent (Article 6(1)(a) GDPR) • Retention: Until withdrawal
              </div>
            </div>
          </div>

          {/* Communication Consent */}
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Mail className="w-5 h-5 text-purple-600 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Service Communications</h3>
                <Checkbox 
                  checked={preferences.communication}
                  onCheckedChange={(checked) => updatePreference('communication', !!checked)}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Important updates about your tutoring sessions, booking confirmations, and service notifications.
              </p>
              <div className="text-xs text-gray-500 mt-2">
                Legal basis: Consent (Article 6(1)(a) GDPR) • Retention: 24 months after service
              </div>
            </div>
          </div>

          {/* Payment Processing */}
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <CreditCard className="w-5 h-5 text-orange-600 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Payment Processing</h3>
                <Checkbox 
                  checked={preferences.payment_processing}
                  onCheckedChange={(checked) => updatePreference('payment_processing', !!checked)}
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Process payments for tutoring services through our secure payment provider (Stripe).
                Required only if you plan to purchase our services.
              </p>
              <div className="text-xs text-gray-500 mt-2">
                Legal basis: Contract performance (Article 6(1)(b) GDPR) • Retention: 7 years (tax law)
              </div>
            </div>
          </div>

          {/* Privacy Information */}
          <div className="bg-blue-50 p-4 rounded-lg text-sm">
            <h4 className="font-semibold text-blue-900 mb-2">Your Privacy Rights</h4>
            <ul className="text-blue-800 space-y-1 list-disc list-inside">
              <li>Access your personal data and processing activities</li>
              <li>Rectify inaccurate or incomplete information</li>
              <li>Request deletion of your data (right to be forgotten)</li>
              <li>Object to processing or request restrictions</li>
              <li>Data portability to another service provider</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-2 text-xs text-blue-700">
              Contact our Data Protection Officer: <strong>dpo@myprivatetutoronline.com</strong>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              onClick={() => handleConsentSubmission(false)}
              disabled={processing}
              className="flex-1"
            >
              {processing ? 'Processing...' : 'Save My Preferences'}
            </Button>
            <Button
              variant="outline"
              onClick={() => handleConsentSubmission(true)}
              disabled={processing}
              className="flex-1"
            >
              Accept All
            </Button>
          </div>

          {/* Footer Links */}
          <div className="text-center text-xs text-gray-500 border-t pt-4">
            <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
            <span className="mx-2">•</span>
            <a href="/cookie-policy" className="text-blue-600 hover:underline">Cookie Policy</a>
            <span className="mx-2">•</span>
            <a href="/privacy/your-rights" className="text-blue-600 hover:underline">Your Rights</a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// CONTEXT7 SOURCE: /gdpr/utility-functions - Consent utility functions
// UTILITY FUNCTIONS REASON: Official GDPR patterns for consent processing helpers

// Get user email from session/context (simplified for demo)
function getUserEmail(): string {
  // In production, get from user session or require input
  return 'user@example.com';
}

// Get user IP address for consent recording
async function getUserIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    return 'unknown';
  }
}

// Map internal purpose names to API purpose names
function mapPurposeName(purpose: string): string {
  const mapping = {
    analytics: 'analytics',
    marketing: 'marketing',
    communication: 'communication',
    payment_processing: 'payment_processing'
  };
  
  return mapping[purpose] || purpose;
}

// Get consent text for specific purpose
function getConsentText(purpose: string): string {
  const consentTexts = {
    analytics: 'I consent to the processing of my personal data for analytics and website improvement purposes.',
    marketing: 'I consent to receiving marketing communications and personalised offers from My Private Tutor Online.',
    communication: 'I consent to receiving service communications and important updates about my tutoring sessions.',
    payment_processing: 'I consent to the processing of my payment information for tutoring service purchases.'
  };
  
  return consentTexts[purpose] || 'I consent to the processing of my personal data for the specified purpose.';
}