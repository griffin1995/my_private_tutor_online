'use client';

import { useEffect, useState, useCallback } from 'react';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';
import { CookieErrorBoundary } from './cookie-error-boundary';

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

// Exported TypeScript interfaces for external use
export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export interface CookieCategory {
  name: string;
  label: string;
  description: string;
  required: boolean;
}

export interface ConsentPreferences {
  acceptedCategories: string[];
  rejectedCategories: string[];
  timestamp: string;
  version: string;
}

export interface GoogleConsentState {
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  functionality_storage: 'granted' | 'denied';
  personalization_storage: 'granted' | 'denied';
  security_storage: 'granted' | 'denied';
}

export interface CookieConsentManagerProps {
  enableAnalytics?: boolean;
  gaTrackingId?: string;
  onConsentChange?: (state: ConsentState) => void;
  onError?: (error: Error) => void;
}

// Global window interface extension
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    CookieConsent: typeof CookieConsent;
  }
}

/**
 * GDPR/PECR compliant cookie consent manager
 * Implements vanilla-cookieconsent with Google Consent Mode v2
 * Following 2025 UK regulations with proper consent blocking
 * Enhanced with error boundaries and event-driven updates
 */
export function CookieConsentManager({
  enableAnalytics = false,
  gaTrackingId,
  onConsentChange,
  onError
}: CookieConsentManagerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Error handling wrapper
  const handleError = useCallback((err: Error, context: string) => {
    setError(err);
    if (onError) {
      onError(err);
    }

    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`Cookie Consent Error (${context}):`, err);
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      try {
        fetch('/api/analytics/error', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            error: { message: err.message, stack: err.stack },
            context: `CookieConsent-${context}`,
            timestamp: new Date().toISOString(),
          }),
        }).catch(() => {}); // Silent fail for error reporting
      } catch {}
    }
  }, [onError]);

  useEffect(() => {
    // Initialize Google Consent Mode v2 with enhanced error handling
    if (typeof window !== 'undefined') {
      try {
        window.dataLayer = window.dataLayer || [];

        // Enhanced gtag function with error handling
        function gtag(...args: any[]) {
          try {
            window.dataLayer.push(arguments);
          } catch (err) {
            handleError(err instanceof Error ? err : new Error(String(err)), 'gtag-push');
          }
        }

        // Store gtag globally for use in consent updates
        window.gtag = gtag;

        // Set default consent to 'denied' before any analytics loading
        // Google Consent Mode v2 - includes all required parameters for 2025
        gtag('consent', 'default', {
          [SERVICE_AD_STORAGE]: 'denied',
          [SERVICE_AD_USER_DATA]: 'denied', // v2 requirement
          [SERVICE_AD_PERSONALIZATION]: 'denied', // v2 requirement
          [SERVICE_ANALYTICS_STORAGE]: 'denied',
          [SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
          [SERVICE_PERSONALIZATION_STORAGE]: 'denied',
          [SERVICE_SECURITY_STORAGE]: 'granted', // Always allowed for security
          // Additional v2 parameters for enhanced privacy
          wait_for_update: 500, // Wait up to 500ms for consent update
          region: ['GB', 'EU'], // Apply to UK and EU regions
        });
      } catch (err) {
        handleError(err instanceof Error ? err : new Error(String(err)), 'google-consent-init');
      }

      // Enhanced consent update with error handling and v2 compliance
      const updateGoogleConsent = () => {
        try {
          const consentUpdate: GoogleConsentState = {
            [SERVICE_ANALYTICS_STORAGE]: CookieConsent.acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS) ? 'granted' : 'denied',
            [SERVICE_AD_STORAGE]: CookieConsent.acceptedService(SERVICE_AD_STORAGE, CAT_MARKETING) ? 'granted' : 'denied',
            [SERVICE_AD_USER_DATA]: CookieConsent.acceptedService(SERVICE_AD_USER_DATA, CAT_MARKETING) ? 'granted' : 'denied',
            [SERVICE_AD_PERSONALIZATION]: CookieConsent.acceptedService(SERVICE_AD_PERSONALIZATION, CAT_MARKETING) ? 'granted' : 'denied',
            [SERVICE_FUNCTIONALITY_STORAGE]: CookieConsent.acceptedService(SERVICE_FUNCTIONALITY_STORAGE, CAT_FUNCTIONAL) ? 'granted' : 'denied',
            [SERVICE_PERSONALIZATION_STORAGE]: CookieConsent.acceptedService(SERVICE_PERSONALIZATION_STORAGE, CAT_FUNCTIONAL) ? 'granted' : 'denied',
            [SERVICE_SECURITY_STORAGE]: 'granted', // Always granted
          };

          gtag('consent', 'update', consentUpdate);

          // Trigger custom callback if provided
          if (onConsentChange) {
            const currentState = getCurrentConsentState();
            if (currentState) {
              onConsentChange(currentState);
            }
          }
        } catch (err) {
          handleError(err instanceof Error ? err : new Error(String(err)), 'consent-update');
        }
      };

      // Helper function to get current consent state
      const getCurrentConsentState = (): ConsentState | null => {
        try {
          const preferences = CookieConsent.getUserPreferences();
          return {
            necessary: true, // Always true
            analytics: preferences.acceptedCategories.includes(CAT_ANALYTICS),
            functional: preferences.acceptedCategories.includes(CAT_FUNCTIONAL),
            marketing: preferences.acceptedCategories.includes(CAT_MARKETING),
            timestamp: new Date().toISOString(),
            version: '2.0.0', // Updated for v2
          };
        } catch (err) {
          handleError(err instanceof Error ? err : new Error(String(err)), 'get-consent-state');
          return null;
        }
      };

      // Enhanced consent logging for GDPR compliance with v2 features
      const logConsent = async () => {
        try {
          const preferences = CookieConsent.getUserPreferences();
          const consentState = getCurrentConsentState();

          if (!consentState) return;

          const consentData = {
            consent: consentState,
            userAgent: navigator.userAgent,
            ipAddress: '', // Will be populated server-side
            url: window.location.href,
            sessionId: sessionStorage.getItem('analytics_session') || 'unknown',
            googleConsentMode: {
              ad_storage: preferences.acceptedCategories.includes(CAT_MARKETING) ? 'granted' : 'denied',
              ad_user_data: preferences.acceptedCategories.includes(CAT_MARKETING) ? 'granted' : 'denied',
              ad_personalization: preferences.acceptedCategories.includes(CAT_MARKETING) ? 'granted' : 'denied',
              analytics_storage: preferences.acceptedCategories.includes(CAT_ANALYTICS) ? 'granted' : 'denied',
              functionality_storage: preferences.acceptedCategories.includes(CAT_FUNCTIONAL) ? 'granted' : 'denied',
              personalization_storage: preferences.acceptedCategories.includes(CAT_FUNCTIONAL) ? 'granted' : 'denied',
              security_storage: 'granted',
            },
            gdprVersion: '2025',
            consentMechanism: 'banner',
          };

          await fetch('/api/analytics/consent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(consentData),
          });
        } catch (error) {
          handleError(error instanceof Error ? error : new Error(String(error)), 'consent-logging');
        }
      };

      // Initialize CookieConsent with enhanced error handling
      try {
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

        // Enhanced callbacks for consent tracking with error handling
        onFirstConsent: () => {
          try {
            updateGoogleConsent();
            logConsent();

            // Development logging
            if (process.env.NODE_ENV === 'development') {
              console.log('Cookie consent: First consent given');
            }
          } catch (err) {
            handleError(err instanceof Error ? err : new Error(String(err)), 'first-consent');
          }
        },
        onConsent: () => {
          try {
            updateGoogleConsent();
            logConsent();

            // Development logging
            if (process.env.NODE_ENV === 'development') {
              console.log('Cookie consent: Consent updated');
            }
          } catch (err) {
            handleError(err instanceof Error ? err : new Error(String(err)), 'consent');
          }
        },
        onChange: () => {
          try {
            updateGoogleConsent();
            logConsent();

            // Development logging
            if (process.env.NODE_ENV === 'development') {
              console.log('Cookie consent: Preferences changed');
            }
          } catch (err) {
            handleError(err instanceof Error ? err : new Error(String(err)), 'consent-change');
          }
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

      // Store CookieConsent instance globally for access
      window.CookieConsent = CookieConsent;

      } catch (err) {
        handleError(err instanceof Error ? err : new Error(String(err)), 'cookie-consent-init');

        // Set loaded to true anyway to prevent infinite loading
        setIsLoaded(true);
      }
    }

    // Cleanup on unmount
    return () => {
      if (typeof window !== 'undefined' && CookieConsent.reset) {
        CookieConsent.reset(true);
      }
    };
  }, [enableAnalytics, gaTrackingId, handleError]);

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
      }

      .cc__main .cc__title {
        font-family: theme(fontFamily.serif);
        font-weight: 700;
      }

      .cc__main .cm__body {
        border-radius: theme(borderRadius.lg);
        box-shadow: theme(boxShadow.xl);
      }

      .cc__main .pm__body {
        border-radius: theme(borderRadius.lg);
        box-shadow: theme(boxShadow.xl);
      }

      /* Ensure equal button prominence for GDPR compliance */
      .cc__main .cm__btn {
        font-weight: 600;
        padding: theme(spacing.2) theme(spacing.4);
        border-radius: theme(borderRadius.md);
        min-width: 120px;
      }

      .cc__main .cm__btn + .cm__btn {
        margin-left: theme(spacing.2);
      }

      /* Mobile responsive adjustments */
      @media (max-width: 640px) {
        .cc__main .cm__body {
          margin: theme(spacing.4);
          max-width: calc(100vw - 2rem);
        }

        .cc__main .cm__btn {
          width: 100%;
          margin-left: 0 !important;
          margin-top: theme(spacing.2);
        }
      }
    `;

    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, [isLoaded]);

  // Component doesn't render anything - the library handles the UI
  // Return error boundary wrapper if there's an error
  if (error) {
    return (
      <CookieErrorBoundary fallback={null}>
        {null}
      </CookieErrorBoundary>
    );
  }

  return null;
}

// Enhanced utility functions with error handling and v2 features
export const cookieConsentUtils = {
  /**
   * Check if a specific category is accepted
   */
  isCategoryAccepted: (category: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      return CookieConsent.acceptedCategory(category);
    } catch {
      return false;
    }
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
   * Check if functional cookies are allowed
   */
  isFunctionalAllowed: (): boolean => {
    return cookieConsentUtils.isCategoryAccepted(CAT_FUNCTIONAL);
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
        version: '2.0.0',
      };
    } catch {
      return null;
    }
  },

  /**
   * Get Google Consent Mode v2 state
   */
  getGoogleConsentState: (): GoogleConsentState | null => {
    if (typeof window === 'undefined') return null;

    try {
      const state = cookieConsentUtils.getConsentState();
      if (!state) return null;

      return {
        ad_storage: state.marketing ? 'granted' : 'denied',
        ad_user_data: state.marketing ? 'granted' : 'denied',
        ad_personalization: state.marketing ? 'granted' : 'denied',
        analytics_storage: state.analytics ? 'granted' : 'denied',
        functionality_storage: state.functional ? 'granted' : 'denied',
        personalization_storage: state.functional ? 'granted' : 'denied',
        security_storage: 'granted',
      };
    } catch {
      return null;
    }
  },

  /**
   * Check if consent has been given (any choice made)
   */
  hasConsentBeenGiven: (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const preferences = CookieConsent.getUserPreferences();
      return preferences && preferences.acceptedCategories !== undefined;
    } catch {
      return false;
    }
  },

  /**
   * Show preferences modal programmatically
   */
  showPreferences: (): void => {
    if (typeof window !== 'undefined') {
      try {
        CookieConsent.showPreferences();
      } catch (error) {
        // Fallback: redirect to cookie policy page
        window.location.href = '/legal/cookie-policy';
      }
    }
  },

  /**
   * Reset all consent and show modal again
   */
  reset: (): void => {
    if (typeof window !== 'undefined') {
      try {
        CookieConsent.reset(true);
      } catch (error) {
        // Clear consent cookies manually as fallback
        document.cookie = 'cookieconsent_status=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'cc_cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Reload page to reinitialise
        window.location.reload();
      }
    }
  },

  /**
   * Add event listener for consent changes (event-driven updates)
   */
  addEventListener: (callback: (state: ConsentState | null) => void): (() => void) => {
    if (typeof window === 'undefined') return () => {};

    const handleConsentChange = () => {
      const state = cookieConsentUtils.getConsentState();
      callback(state);
    };

    // Listen for custom consent change events
    window.addEventListener('cc:onChange', handleConsentChange);
    window.addEventListener('cc:onAccept', handleConsentChange);
    window.addEventListener('cc:onFirstAccept', handleConsentChange);

    // Return cleanup function
    return () => {
      window.removeEventListener('cc:onChange', handleConsentChange);
      window.removeEventListener('cc:onAccept', handleConsentChange);
      window.removeEventListener('cc:onFirstAccept', handleConsentChange);
    };
  },

  /**
   * Get all available cookie categories
   */
  getAvailableCategories: (): CookieCategory[] => {
    return [
      {
        name: CAT_NECESSARY,
        label: 'Essential Cookies',
        description: 'Required for basic website functionality',
        required: true,
      },
      {
        name: CAT_FUNCTIONAL,
        label: 'Functional Cookies',
        description: 'Enable enhanced functionality and personalisation',
        required: false,
      },
      {
        name: CAT_ANALYTICS,
        label: 'Analytics Cookies',
        description: 'Help us understand how you use our website',
        required: false,
      },
      {
        name: CAT_MARKETING,
        label: 'Marketing Cookies',
        description: 'Used to show relevant advertisements',
        required: false,
      },
    ];
  },

  /**
   * Check if the cookie consent library is properly loaded
   */
  isLoaded: (): boolean => {
    return typeof window !== 'undefined' &&
           typeof CookieConsent !== 'undefined' &&
           typeof CookieConsent.run === 'function';
  },
};

// Export types for use in other components