// CONTEXT7 SOURCE: /amannn/next-intl - Internationalized robots.txt generation
// SEO INTERNATIONALIZATION REASON: Official next-intl documentation enables locale-specific robots directives

import { MetadataRoute } from 'next';

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic robots.txt generation with internationalization
// SEO OPTIMIZATION REASON: Official Next.js documentation supports dynamic robots.txt for multi-language crawling
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://myprivatetutoronline.com';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // CONTEXT7 SOURCE: /amannn/next-intl - Allow all localized paths for indexing
        // MULTILINGUAL SEO: Official next-intl documentation ensures all language variants are crawlable
        disallow: [
          '/admin/',
          '/api/',
          '/_next/',
          '/_vercel/',
          '/private/',
          '/temp/',
          '*.pdf$'
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        // CONTEXT7 SOURCE: /context7/developers_google-search - Enhanced Google crawling for multilingual content
        // GOOGLE SEO: Official Google Search documentation optimizes crawling for international sites
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1,
      }
    ],
    sitemap: [
      // CONTEXT7 SOURCE: /amannn/next-intl - Multilingual sitemap references
      // SITEMAP INDEXING: Official next-intl documentation provides comprehensive sitemap discovery
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/en-GB/sitemap.xml`,
      `${baseUrl}/fr-FR/sitemap.xml`,
      `${baseUrl}/es-ES/sitemap.xml`,
      `${baseUrl}/de-DE/sitemap.xml`,
      `${baseUrl}/zh-CN/sitemap.xml`,
    ],
    host: baseUrl,
  };
}