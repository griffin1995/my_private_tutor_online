// CONTEXT7 SOURCE: /amannn/next-intl - Routing configuration for internationalization
// INTERNATIONALIZATION REASON: Official next-intl documentation Section 4.1 recommends defineRouting for shared configuration between middleware and navigation APIs

import { defineRouting } from 'next-intl/routing';

// CONTEXT7 SOURCE: /amannn/next-intl - Multi-language routing configuration
// LANGUAGE SUPPORT REASON: Official next-intl documentation supports 5+ languages for international client base
export const routing = defineRouting({
  // CONTEXT7 SOURCE: /amannn/next-intl - Locale configuration for royal client international support
  // BUSINESS REQUIREMENT: Support 5 target languages for premium tutoring service expansion
  // RTL PREPARATION: Arabic and Hebrew included for future Middle East expansion
  locales: [
    'en-GB',   // Primary - British English (royal client standard)
    'fr-FR',   // European clients - France
    'es-ES',   // International expansion - Spain
    'de-DE',   // European market - Germany
    'zh-CN',   // Asian market - Mainland China (Simplified Chinese)
    // RTL languages for future expansion (commented out until full translation available)
    // 'ar-SA',   // Middle East market - Saudi Arabia (Arabic RTL)
    // 'he-IL'    // Israel market - Hebrew (RTL)
  ],

  // CONTEXT7 SOURCE: /amannn/next-intl - Default locale configuration
  // BRITISH STANDARD: Official next-intl documentation recommends defaultLocale for fallback routing
  defaultLocale: 'en-GB',

  // CONTEXT7 SOURCE: /amannn/next-intl - Locale prefix configuration for SEO optimization
  // SEO OPTIMIZATION REASON: Official next-intl documentation Section 5.2 'as-needed' provides clean URLs for default locale
  localePrefix: 'as-needed',

  // CONTEXT7 SOURCE: /amannn/next-intl - Pathnames localization for enhanced SEO
  // INTERNATIONALIZATION REASON: Official next-intl documentation supports localized pathnames for better local SEO
  pathnames: {
    '/': '/',
    '/faq': {
      'en-GB': '/faq',
      'fr-FR': '/aide',
      'es-ES': '/preguntas-frecuentes', 
      'de-DE': '/haeufig-gestellte-fragen',
      'zh-CN': '/常见问题'
    },
    '/about': {
      'en-GB': '/about',
      'fr-FR': '/a-propos',
      'es-ES': '/acerca-de',
      'de-DE': '/ueber-uns',
      'zh-CN': '/关于我们'
    },
    '/contact': {
      'en-GB': '/contact',
      'fr-FR': '/contact',
      'es-ES': '/contacto',
      'de-DE': '/kontakt',
      'zh-CN': '/联系我们'
    },
    '/services': {
      'en-GB': '/services',
      'fr-FR': '/services',
      'es-ES': '/servicios',
      'de-DE': '/dienstleistungen',
      'zh-CN': '/服务'
    },
    '/testimonials': {
      'en-GB': '/testimonials',
      'fr-FR': '/temoignages',
      'es-ES': '/testimonios',
      'de-DE': '/erfahrungsberichte',
      'zh-CN': '/推荐信'
    }
  }
});

// CONTEXT7 SOURCE: /amannn/next-intl - Locale type definition for TypeScript safety
// TYPE SAFETY REASON: Official next-intl documentation recommends type extraction for consistent locale handling
export type Locale = (typeof routing.locales)[number];