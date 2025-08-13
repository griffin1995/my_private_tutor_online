// CONTEXT7 SOURCE: /amannn/next-intl - Navigation API wrappers for internationalized routing
// NAVIGATION REASON: Official next-intl documentation Section 4.2 creates lightweight wrappers around Next.js navigation APIs

import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// CONTEXT7 SOURCE: /amannn/next-intl - Internationalized navigation components and hooks
// WRAPPER REASON: Official next-intl documentation provides routing-aware navigation APIs
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

// CONTEXT7 SOURCE: /amannn/next-intl - Type-safe locale switching utilities
// TYPE SAFETY REASON: Custom utilities for consistent locale handling across the application
export const localeNames: Record<string, string> = {
  'en-GB': 'English (UK)',
  'fr-FR': 'Français',
  'es-ES': 'Español', 
  'de-DE': 'Deutsch',
  'zh-CN': '简体中文'
};

// CONTEXT7 SOURCE: /amannn/next-intl - Locale flag mapping for visual language switcher
// UX ENHANCEMENT REASON: Flag icons improve user experience for language selection
export const localeFlags: Record<string, string> = {
  'en-GB': '🇬🇧',
  'fr-FR': '🇫🇷',
  'es-ES': '🇪🇸',
  'de-DE': '🇩🇪',
  'zh-CN': '🇨🇳'
};

// CONTEXT7 SOURCE: /amannn/next-intl - RTL language detection utility
// RTL SUPPORT REASON: Official next-intl documentation supports right-to-left text direction
export const isRTLLocale = (locale: string): boolean => {
  const languageCode = locale.split('-')[0];
  return ['ar', 'he'].includes(languageCode);
};

// CONTEXT7 SOURCE: /amannn/next-intl - Language code extraction utility
// LANGUAGE DETECTION REASON: Utility for extracting primary language code from locale
export const getLanguageCode = (locale: string): string => {
  return locale.split('-')[0];
};