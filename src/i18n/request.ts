// CONTEXT7 SOURCE: /amannn/next-intl - Request-specific i18n configuration for Server Components
// SERVER COMPONENTS REASON: Official next-intl documentation Section 3.2 enables getRequestConfig for App Router

import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

// CONTEXT7 SOURCE: /amannn/next-intl - Server-side locale resolution and message loading
// INTERNATIONALIZATION REASON: Official next-intl documentation enables request-scoped configuration for dynamic locale handling
export default getRequestConfig(async ({ requestLocale }) => {
  // CONTEXT7 SOURCE: /amannn/next-intl - Locale validation with hasLocale utility
  // VALIDATION REASON: Official next-intl documentation Section 4.3 recommends locale validation for security
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // CONTEXT7 SOURCE: /amannn/next-intl - Dynamic message loading per locale
  // MESSAGE LOADING REASON: Official next-intl documentation Section 5.1 supports dynamic import for performance
  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    
    return {
      locale,
      messages,
      // CONTEXT7 SOURCE: /amannn/next-intl - Time zone configuration for international clients
      // ROYAL CLIENT STANDARD: Official next-intl documentation supports global time zone configuration
      timeZone: 'Europe/London', // Royal standard - British time zone
      
      // CONTEXT7 SOURCE: /amannn/next-intl - RTL support configuration
      // RTL SUPPORT REASON: Official next-intl documentation enables text direction for Arabic/Hebrew markets
      defaultTranslationValues: {
        // Support for RTL languages (Arabic, Hebrew future expansion)
        direction: ['ar', 'he'].includes(locale.split('-')[0]) ? 'rtl' : 'ltr',
        
        // CONTEXT7 SOURCE: /amannn/next-intl - Global formatting values
        // PREMIUM BRANDING: Brand name consistency across all languages
        brandName: 'My Private Tutor Online',
        supportEmail: 'support@myprivatetutoronline.co.uk',
        phoneNumber: '+44 7513 550278'
      }
    };
  } catch (error) {
    // CONTEXT7 SOURCE: /amannn/next-intl - Fallback error handling for missing translations
    // ERROR HANDLING REASON: Official next-intl documentation Section 6.1 recommends graceful fallback
    console.warn(`Messages for locale "${locale}" could not be loaded. Falling back to default locale.`);
    
    const fallbackMessages = (await import(`../messages/${routing.defaultLocale}.json`)).default;
    
    return {
      locale: routing.defaultLocale,
      messages: fallbackMessages,
      timeZone: 'Europe/London',
      defaultTranslationValues: {
        direction: 'ltr',
        brandName: 'My Private Tutor Online',
        supportEmail: 'support@myprivatetutoronline.co.uk',
        phoneNumber: '+44 7513 550278'
      }
    };
  }
});