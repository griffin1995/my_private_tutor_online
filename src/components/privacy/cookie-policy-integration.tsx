'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CookieSettingsButton, CookieStatusIndicator } from './cookie-settings-button';
import { cookieConsentUtils } from './cookie-consent-manager';

/**
 * Integration component for cookie policy page
 * Provides live cookie management alongside policy content
 */
export function CookiePolicyIntegration() {
  const [consentState, setConsentState] = useState<ReturnType<typeof cookieConsentUtils.getConsentState>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateConsentState = () => {
      const state = cookieConsentUtils.getConsentState();
      setConsentState(state);
    };

    updateConsentState();

    // Listen for consent changes
    const interval = setInterval(updateConsentState, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null; // Prevent SSR issues

  return (
    <div className="space-y-6">
      {/* Live Cookie Status Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-900">
            Your Current Cookie Settings
          </h3>

          <div className="space-y-3">
            <CookieStatusIndicator className="text-sm" />

            {consentState && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className={`p-2 rounded ${consentState.necessary ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  <div className="font-medium">Essential</div>
                  <div className="text-xs">{consentState.necessary ? 'Active' : 'Inactive'}</div>
                </div>
                <div className={`p-2 rounded ${consentState.functional ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                  <div className="font-medium">Functional</div>
                  <div className="text-xs">{consentState.functional ? 'Active' : 'Inactive'}</div>
                </div>
                <div className={`p-2 rounded ${consentState.analytics ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
                  <div className="font-medium">Analytics</div>
                  <div className="text-xs">{consentState.analytics ? 'Active' : 'Inactive'}</div>
                </div>
                <div className={`p-2 rounded ${consentState.marketing ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'}`}>
                  <div className="font-medium">Marketing</div>
                  <div className="text-xs">{consentState.marketing ? 'Active' : 'Inactive'}</div>
                </div>
              </div>
            )}

            {consentState && (
              <div className="text-xs text-gray-500">
                Last updated: {new Date(consentState.timestamp).toLocaleString('en-GB')}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <CookieSettingsButton variant="default" size="sm">
              Update Cookie Preferences
            </CookieSettingsButton>

            <Button
              variant="outline"
              size="sm"
              onClick={() => cookieConsentUtils.reset()}
              className="text-sm"
            >
              Reset All Settings
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4">
        <h4 className="font-medium mb-3">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            size="sm"
            className="justify-start"
            onClick={() => {
              // Accept only essential cookies
              cookieConsentUtils.reset();
              // The banner will appear, then programmatically click "Reject All"
          >
            Essential Cookies Only
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="justify-start"
            onClick={() => {
              // This would programmatically accept analytics but reject marketing
              cookieConsentUtils.showPreferences();
          >
            Allow Analytics Only
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="justify-start"
            onClick={() => {
              // This would accept all cookies
              cookieConsentUtils.showPreferences();
          >
            Accept All Cookies
          </Button>
        </div>
      </Card>

      {/* GDPR Rights Information */}
      <Card className="p-4 border-l-4 border-green-500">
        <h4 className="font-medium text-green-900 mb-2">Your Data Rights</h4>
        <div className="text-sm text-green-800 space-y-2">
          <p>
            Under GDPR, you have the right to:
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Withdraw consent at any time (click "Cookie Settings" above)</li>
            <li>Access your data (contact privacy@myprivatetutoronline.co.uk)</li>
            <li>Rectify incorrect data</li>
            <li>Erase your data</li>
            <li>Port your data to another service</li>
          </ul>
          <p className="text-xs mt-2">
            Your consent choices are logged for compliance purposes and can be withdrawn at any time.
          </p>
        </div>
      </Card>
    </div>
  );

/**
 * Cookie compliance checker for development
 */
export function CookieComplianceChecker() {
  const [checks, setChecks] = useState<Array<{ name: string; passed: boolean; message: string }>([]);

  useEffect(() => {
    const runChecks = () => {
      const newChecks = [
        {
          name: 'Cookie Consent Library Loaded',
          passed: typeof window !== 'undefined' && !!(window as any).CookieConsent,
          message: 'vanilla-cookieconsent library should be loaded'
        },
        {
          name: 'Consent State Available',
          passed: cookieConsentUtils.getConsentState() !== null,
          message: 'User should have made consent choices'
        },
        {
          name: 'Analytics Blocked by Default',
          passed: !cookieConsentUtils.isAnalyticsAllowed(),
          message: 'Analytics should be blocked until user consent'
        },
        {
          name: 'Marketing Blocked by Default',
          passed: !cookieConsentUtils.isMarketingAllowed(),
          message: 'Marketing cookies should be blocked until user consent'
        },
        {
          name: 'Cookie Settings Accessible',
          passed: typeof cookieConsentUtils.showPreferences === 'function',
          message: 'User should be able to change preferences'
      ];

      setChecks(newChecks);
    };

    runChecks();
    const interval = setInterval(runChecks, 2000);
    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;

  return (
    <Card className="p-4 bg-yellow-50 border border-yellow-200">
      <h4 className="font-medium text-yellow-900 mb-3">
        GDPR Compliance Checks (Development Only)
      </h4>
      <div className="space-y-2">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${check.passed ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={check.passed ? 'text-green-700' : 'text-red-700'}>
              {check.name}
            </span>
            <span className="text-gray-600">- {check.message}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-xs text-yellow-700">
        These checks help ensure GDPR compliance during development.
      </div>
    </Card>
  );
