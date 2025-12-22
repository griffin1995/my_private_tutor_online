/**
 * Privacy Components - Central Export File
 *
 * This file provides a convenient way to import all privacy-related
 * components, utilities, and TypeScript interfaces from a single location.
 *
 * Following 2025 best practices for modular component architecture.
 */

// Core Components
export { CookieConsentManager } from './cookie-consent-manager';
export { CookieSettingsButton, CookieStatusIndicator, PrivacyControlPanel } from './cookie-settings-button';
export { CookiePolicyIntegration, CookieComplianceChecker } from './cookie-policy-integration';
export { CookieErrorBoundary, withCookieErrorBoundary, useCookieErrorHandler } from './cookie-error-boundary';

// Utilities
export { cookieConsentUtils } from './cookie-consent-manager';

// TypeScript Interfaces - Core Types
export type {
  ConsentState,
  CookieCategory,
  ConsentPreferences,
  GoogleConsentState,
  CookieConsentManagerProps,
} from './cookie-consent-manager';

// TypeScript Interfaces - UI Components
export type {
  CookieSettingsButtonProps,
  CookieStatusIndicatorProps,
  PrivacyControlPanelProps,
} from './cookie-settings-button';

// TypeScript Interfaces - Error Handling
export type {
  CookieErrorBoundaryProps,
  CookieErrorBoundaryState,
} from './cookie-error-boundary';

// Utility Types for External Use
export type CookieConsentCallback = (state: ConsentState | null) => void;
export type CookieConsentCleanup = () => void;
export type CookieConsentEventListener = (callback: CookieConsentCallback) => CookieConsentCleanup;

// Enums for Cookie Categories
export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  FUNCTIONAL: 'functional',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
} as const;

export type CookieCategoryType = typeof COOKIE_CATEGORIES[keyof typeof COOKIE_CATEGORIES];

// Google Consent Mode v2 Types
export const GOOGLE_CONSENT_TYPES = {
  AD_STORAGE: 'ad_storage',
  AD_USER_DATA: 'ad_user_data',
  AD_PERSONALIZATION: 'ad_personalization',
  ANALYTICS_STORAGE: 'analytics_storage',
  FUNCTIONALITY_STORAGE: 'functionality_storage',
  PERSONALIZATION_STORAGE: 'personalization_storage',
  SECURITY_STORAGE: 'security_storage',
} as const;

export type GoogleConsentType = typeof GOOGLE_CONSENT_TYPES[keyof typeof GOOGLE_CONSENT_TYPES];
export type ConsentValue = 'granted' | 'denied';

// GDPR Compliance Constants
export const GDPR_VERSION = '2025' as const;
export const CONSENT_MECHANISM = 'banner' as const;
export const CONSENT_VERSION = '2.0.0' as const;

// Helper type for strongly typed consent checks
export interface CookieConsentChecker {
  isAnalyticsAllowed: () => boolean;
  isMarketingAllowed: () => boolean;
  isFunctionalAllowed: () => boolean;
  hasConsentBeenGiven: () => boolean;
  getConsentState: () => ConsentState | null;
  getGoogleConsentState: () => GoogleConsentState | null;
}

// Default export for easy importing
export default {
  CookieConsentManager,
  CookieSettingsButton,
  CookieStatusIndicator,
  CookiePolicyIntegration,
  CookieComplianceChecker,
  CookieErrorBoundary,
  cookieConsentUtils,
  COOKIE_CATEGORIES,
  GOOGLE_CONSENT_TYPES,
  GDPR_VERSION,
  CONSENT_VERSION,
};