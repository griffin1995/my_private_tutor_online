// CONTEXT7 SOURCE: /amannn/next-intl - Internationalized sitemap generation
// SEO INTERNATIONALIZATION REASON: Official next-intl documentation enables locale-specific sitemaps

import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic sitemap generation with internationalization
// SEO OPTIMIZATION REASON: Official Next.js documentation Section 6.1 enables dynamic sitemap generation for multi-language sites
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://myprivatetutoronline.com';
  
  // CONTEXT7 SOURCE: /amannn/next-intl - Generate sitemap entries for all supported locales
  // MULTILINGUAL SEO: Official next-intl documentation provides comprehensive SEO for international markets
  const localeEntries = routing.locales.flatMap((locale) => [
    // Homepage entries for each locale
    {
      url: `${baseUrl}/${locale === routing.defaultLocale ? '' : locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [
            loc,
            `${baseUrl}/${loc === routing.defaultLocale ? '' : loc}`
          ])
        ),
      },
    },
    
    // FAQ pages with localized pathnames
    {
      url: `${baseUrl}/${locale === routing.defaultLocale ? '' : `${locale}/`}${getFAQPath(locale)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [
            loc,
            `${baseUrl}/${loc === routing.defaultLocale ? '' : `${loc}/`}${getFAQPath(loc)}`
          ])
        ),
      },
    },
    
    // About pages with localized pathnames
    {
      url: `${baseUrl}/${locale === routing.defaultLocale ? '' : `${locale}/`}${getAboutPath(locale)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [
            loc,
            `${baseUrl}/${loc === routing.defaultLocale ? '' : `${loc}/`}${getAboutPath(loc)}`
          ])
        ),
      },
    },
    
    // Contact pages with localized pathnames  
    {
      url: `${baseUrl}/${locale === routing.defaultLocale ? '' : `${locale}/`}${getContactPath(locale)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [
            loc,
            `${baseUrl}/${loc === routing.defaultLocale ? '' : `${loc}/`}${getContactPath(loc)}`
          ])
        ),
      },
    },
    
    // Services pages with localized pathnames
    {
      url: `${baseUrl}/${locale === routing.defaultLocale ? '' : `${locale}/`}${getServicesPath(locale)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((loc) => [
            loc,
            `${baseUrl}/${loc === routing.defaultLocale ? '' : `${loc}/`}${getServicesPath(loc)}`
          ])
        ),
      },
    },
  ]);
  
  return localeEntries;
}

// CONTEXT7 SOURCE: /amannn/next-intl - Localized pathname helpers
// PATHNAME LOCALIZATION REASON: Official next-intl documentation supports localized URL paths for better local SEO

function getFAQPath(locale: string): string {
  const paths: Record<string, string> = {
    'en-GB': 'faq',
    'fr-FR': 'aide',
    'es-ES': 'preguntas-frecuentes',
    'de-DE': 'haeufig-gestellte-fragen',
    'zh-CN': '常见问题'
  };
  return paths[locale] || 'faq';
}

function getAboutPath(locale: string): string {
  const paths: Record<string, string> = {
    'en-GB': 'about',
    'fr-FR': 'a-propos',
    'es-ES': 'acerca-de',
    'de-DE': 'ueber-uns',
    'zh-CN': '关于我们'
  };
  return paths[locale] || 'about';
}

function getContactPath(locale: string): string {
  const paths: Record<string, string> = {
    'en-GB': 'contact',
    'fr-FR': 'contact',
    'es-ES': 'contacto',
    'de-DE': 'kontakt',
    'zh-CN': '联系我们'
  };
  return paths[locale] || 'contact';
}

function getServicesPath(locale: string): string {
  const paths: Record<string, string> = {
    'en-GB': 'services',
    'fr-FR': 'services',
    'es-ES': 'servicios',
    'de-DE': 'dienstleistungen',
    'zh-CN': '服务'
  };
  return paths[locale] || 'services';
}