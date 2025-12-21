'use client';

import { useEffect, useState } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

// Cookie categories following GDPR/PECR requirements
const CAT_NECESSARY = 'necessary';
const CAT_ANALYTICS = 'analytics';
const CAT_FUNCTIONAL = 'functional';
const CAT_MARKETING = 'marketing';

// Google Consent Mode v2 services
const SERVICE_AD_STORAGE = 'ad_storage';
const SERVICE_AD_USER_DATA = 'ad_user_data';
const SERVICE_AD_PERSONALIZATION = 'ad_personalization';
const SERVICE_ANALYTICS_STORAGE = 'analytics_storage';
const SERVICE_FUNCTIONALITY_STORAGE = 'functionality_storage';
const SERVICE_PERSONALIZATION_STORAGE = 'personalization_storage';
const SERVICE_SECURITY_STORAGE = 'security_storage';

interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;

interface CookieConsentManagerProps {
  enableAnalytics?: boolean;
  gaTrackingId?: string;

/**
 * GDPR/PECR compliant cookie consent manager
 * Implements vanilla-cookieconsent with Google Consent Mode v2
 * Following 2025 UK regulations with proper consent blocking
 */
export function CookieConsentManager({
  enableAnalytics = false,
  gaTrackingId
}: CookieConsentManagerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize Google Consent Mode v2
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(arguments);

      // Set default consent to 'denied' before any analytics loading
      gtag('consent', 'default', {
        [SERVICE_AD_STORAGE]: 'denied',
        [SERVICE_AD_USER_DATA]: 'denied',
        [SERVICE_AD_PERSONALIZATION]: 'denied',
        [SERVICE_ANALYTICS_STORAGE]: 'denied',
        [SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
        [SERVICE_PERSONALIZATION_STORAGE]: 'denied',
        [SERVICE_SECURITY_STORAGE]: 'granted', // Always allowed for security
      });

      // Update consent based on user choices
      const updateGoogleConsent = () => {
        gtag('consent', 'update', {
          [SERVICE_ANALYTICS_STORAGE]: CookieConsent.acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS) ? 'granted' : 'denied',
          [SERVICE_AD_STORAGE]: CookieConsent.acceptedService(SERVICE_AD_STORAGE, CAT_MARKETING) ? 'granted' : 'denied',
          [SERVICE_AD_USER_DATA]: CookieConsent.acceptedService(SERVICE_AD_USER_DATA, CAT_MARKETING) ? 'granted' : 'denied',
          [SERVICE_AD_PERSONALIZATION]: CookieConsent.acceptedService(SERVICE_AD_PERSONALIZATION, CAT_MARKETING) ? 'granted' : 'denied',
          [SERVICE_FUNCTIONALITY_STORAGE]: CookieConsent.acceptedService(SERVICE_FUNCTIONALITY_STORAGE, CAT_FUNCTIONAL) ? 'granted' : 'denied',
          [SERVICE_PERSONALIZATION_STORAGE]: CookieConsent.acceptedService(SERVICE_PERSONALIZATION_STORAGE, CAT_FUNCTIONAL) ? 'granted' : 'denied',
        });
      };

      // Log consent for GDPR compliance
      const logConsent = async () => {
        try {
          const preferences = CookieConsent.getUserPreferences();
          const consentData = {
            consent: {
              necessary: true, // Always true
              analytics: preferences.acceptedCategories.includes(CAT_ANALYTICS),
              functional: preferences.acceptedCategories.includes(CAT_FUNCTIONAL),
              marketing: preferences.acceptedCategories.includes(CAT_MARKETING),
              timestamp: new Date().toISOString(),
              version: '1.0.0',
            },
            userAgent: navigator.userAgent,
            ipAddress: '', // Will be populated server-side
            url: window.location.href,
            sessionId: sessionStorage.getItem('analytics_session') || 'unknown',
          };

          await fetch('/api/analytics/consent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(consentData),
          });
        } catch (error) {
          console.error('Failed to log consent:', error);
      };

      // Initialize CookieConsent with GDPR-compliant configuration
      CookieConsent.run({
        // Core configuration
        guiOptions: {
          consentModal: {
            layout: 'box inline',
            position: 'bottom left',
            equalWeightButtons: true,
            flipButtons: false,
          },
          preferencesModal: {
            layout: 'box',
            position: 'right',
            equalWeightButtons: true,
            flipButtons: false,
          },
        },

        // Required callbacks for consent tracking
        onFirstConsent: () => {
          updateGoogleConsent();
          logConsent();
        },
        onConsent: () => {
          updateGoogleConsent();
          logConsent();
        },
        onChange: () => {
          updateGoogleConsent();
          logConsent();
        },

        // Cookie categories with auto-clearing and services
        categories: {
          [CAT_NECESSARY]: {
            enabled: true,
            readOnly: true,
          },
          [CAT_FUNCTIONAL]: {
            autoClear: {
              cookies: [
                { name: 'user_preferences' },
                { name: 'form_data' },
                { name: /intercom-.*/ },
              ],
            },
            services: {
              [SERVICE_FUNCTIONALITY_STORAGE]: {
                label: 'Enables storage that supports the functionality of the website or app e.g. language settings.',
              },
              [SERVICE_PERSONALIZATION_STORAGE]: {
                label: 'Enables storage that supports personalization, e.g. website recommendations.',
              },
            },
          },
          [CAT_ANALYTICS]: {
            autoClear: {
              cookies: [
                { name: /^_ga/ },
                { name: '_gid' },
                { name: /^_gtag/ },
                { name: 'performance_metrics' },
              ],
            },
            services: {
              [SERVICE_ANALYTICS_STORAGE]: {
                label: 'Enables storage (such as cookies) related to analytics e.g. visit duration.',
              },
            },
          },
          [CAT_MARKETING]: {
            autoClear: {
              cookies: [
                { name: /^_gcl/ },
                { name: /^_fbp/ },
                { name: /^_fbc/ },
                { name: /^li_/ },
                { name: 'UserMatchHistory' },
              ],
            },
            services: {
              [SERVICE_AD_STORAGE]: {
                label: 'Enables storage (such as cookies) related to advertising.',
              },
              [SERVICE_AD_USER_DATA]: {
                label: 'Sets consent for sending user data related to advertising to Google.',
              },
              [SERVICE_AD_PERSONALIZATION]: {
                label: 'Sets consent for personalized advertising.',
              },
            },
          },
        },

        // Localization - matches your existing cookie policy content
        language: {
          default: 'en',
          translations: {
            en: {
              consentModal: {
                title: 'We use cookies',
                description: 'This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. We never share your data with third parties.',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                showPreferencesBtn: 'Manage preferences',
                footer: `
                  <a href="/legal/privacy-policy" target="_blank">Privacy Policy</a>
                  <a href="/legal/cookie-policy" target="_blank">Cookie Policy</a>
                `,
              },
              preferencesModal: {
                title: 'Manage cookie preferences',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                savePreferencesBtn: 'Accept current selection',
                closeIconLabel: 'Close modal',
                sections: [
                  {
                    title: 'Cookie usage',
                    description: 'We use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want.',
                  },
                  {
                    title: 'Strictly necessary cookies',
                    description: 'These cookies are essential for the proper functioning of the website, for example for user authentication and security. Without these cookies, the website cannot function properly.',
                    linkedCategory: CAT_NECESSARY,
                  },
                  {
                    title: 'Functional cookies',
                    description: 'These cookies enable enhanced functionality and personalisation features, such as remembering your preferences and providing personalised content.',
                    linkedCategory: CAT_FUNCTIONAL,
                    cookieTable: {
                      headers: {
                        name: 'Name',
                        domain: 'Service',
                        description: 'Description',
                        expiration: 'Expiration',
                      },
                      body: [
                        {
                          name: 'user_preferences',
                          domain: 'My Private Tutor Online',
                          description: 'Remembers language, theme, and display preferences',
                          expiration: '12 months',
                        },
                        {
                          name: 'form_data',
                          domain: 'My Private Tutor Online',
                          description: 'Saves partially completed forms',
                          expiration: '24 hours',
                        },
                      ],
                    },
                  },
                  {
                    title: 'Analytics cookies',
                    description: 'These cookies help us understand how visitors use our website so we can improve it. All data is anonymised and cannot be used to identify you.',
                    linkedCategory: CAT_ANALYTICS,
                    cookieTable: {
                      headers: {
                        name: 'Name',
                        domain: 'Service',
                        description: 'Description',
                        expiration: 'Expiration',
                      },
                      body: [
                        {
                          name: '_ga',
                          domain: 'Google Analytics',
                          description: 'Cookie set by <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
                          expiration: '2 years',
                        },
                        {
                          name: '_gid',
                          domain: 'Google Analytics',
                          description: 'Cookie set by <a href="https://business.safety.google/adscookies/">Google Analytics</a>',
                          expiration: '24 hours',
                        },
                      ],
                    },
                  },
                  {
                    title: 'Marketing cookies',
                    description: 'These cookies track your visits across websites to show relevant advertisements and measure ad effectiveness. You can opt out at any time.',
                    linkedCategory: CAT_MARKETING,
                    cookieTable: {
                      headers: {
                        name: 'Name',
                        domain: 'Service',
                        description: 'Description',
                        expiration: 'Expiration',
                      },
                      body: [
                        {
                          name: '_gcl_*',
                          domain: 'Google Ads',
                          description: 'Conversion tracking for Google Ads',
                          expiration: '3 months',
                        },
                        {
                          name: '_fbp',
                          domain: 'Facebook',
                          description: 'Facebook advertising pixel',
                          expiration: '3 months',
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      });

      setIsLoaded(true);

    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined' && CookieConsent.reset) {
        CookieConsent.reset(true);
    };
  }, [enableAnalytics, gaTrackingId]);

  // Custom styling to match your brand
  useEffect(() => {
    if (!isLoaded) return;

    const style = document.createElement('style');
    style.textContent = `
      /* Custom styling to match My Private Tutor Online brand */
      .cc__main {
        --cc-bg: theme(colors.white);
        --cc-text: theme(colors.slate.800);
        --cc-btn-primary-bg: theme(colors.blue.600);
        --cc-btn-primary-text: theme(colors.white);
        --cc-btn-primary-hover-bg: theme(colors.blue.700);
        --cc-btn-secondary-bg: theme(colors.slate.200);
        --cc-btn-secondary-text: theme(colors.slate.800);
        --cc-btn-secondary-hover-bg: theme(colors.slate.300);
        --cc-toggle-on-bg: theme(colors.blue.600);
        --cc-cookie-category-block-bg: theme(colors.slate.50);
        --cc-cookie-category-block-border: theme(colors.slate.200);
        --cc-separator-border-color: theme(colors.slate.200);
        font-family: theme(fontFamily.sans);

      .cc__main .cc__title {
        font-family: theme(fontFamily.serif);
        font-weight: 700;

      .cc__main .cm__body {
        border-radius: theme(borderRadius.lg);
        box-shadow: theme(boxShadow.xl);

      .cc__main .pm__body {
        border-radius: theme(borderRadius.lg);
        box-shadow: theme(boxShadow.xl);

      /* Ensure equal button prominence for GDPR compliance */
      .cc__main .cm__btn {
        font-weight: 600;
        padding: theme(spacing.2) theme(spacing.4);
        border-radius: theme(borderRadius.md);
        min-width: 120px;

      .cc__main .cm__btn + .cm__btn {
        margin-left: theme(spacing.2);

      /* Mobile responsive adjustments */
      @media (max-width: 640px) {
        .cc__main .cm__body {
          margin: theme(spacing.4);
          max-width: calc(100vw - 2rem);

        .cc__main .cm__btn {
          width: 100%;
          margin-left: 0 !important;
          margin-top: theme(spacing.2);
    `;

    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
    };
  }, [isLoaded]);

  // Component doesn't render anything - the library handles the UI
  return null;

// Utility functions for checking consent state
export const cookieConsentUtils = {
  /**
   * Check if a specific category is accepted
   */
  isCategoryAccepted: (category: string): boolean => {
    if (typeof window === 'undefined') return false;
    return CookieConsent.acceptedCategory(category);
  },

  /**
   * Check if analytics tracking is allowed
   */
  isAnalyticsAllowed: (): boolean => {
    return cookieConsentUtils.isCategoryAccepted(CAT_ANALYTICS);
  },

  /**
   * Check if marketing cookies are allowed
   */
  isMarketingAllowed: (): boolean => {
    return cookieConsentUtils.isCategoryAccepted(CAT_MARKETING);
  },

  /**
   * Get current consent preferences
   */
  getConsentState: (): ConsentState | null => {
    if (typeof window === 'undefined') return null;

    try {
      const preferences = CookieConsent.getUserPreferences();
      return {
        necessary: true, // Always true
        analytics: preferences.acceptedCategories.includes(CAT_ANALYTICS),
        functional: preferences.acceptedCategories.includes(CAT_FUNCTIONAL),
        marketing: preferences.acceptedCategories.includes(CAT_MARKETING),
        timestamp: new Date().toISOString(),
        version: '1.0.0',
      };
    } catch {
      return null;
  },

  /**
   * Show preferences modal programmatically
   */
  showPreferences: (): void => {
    if (typeof window !== 'undefined') {
      CookieConsent.showPreferences();
  },

  /**
   * Reset all consent and show modal again
   */
  reset: (): void => {
    if (typeof window !== 'undefined') {
      CookieConsent.reset(true);
  },
};

// Export types for use in other components
;
;