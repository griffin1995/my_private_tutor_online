/**
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic robots.txt generation
 * IMPLEMENTATION REASON: Official Next.js App Router pattern for robots.txt configuration
 * CONTEXT7 SOURCE: /vercel/next.js - Robots object type definition and sitemap integration
 * SEO IMPLEMENTATION: Premium tutoring service crawler optimization for royal client visibility
 * 
 * Pattern: Dynamic robots.txt generation using Next.js MetadataRoute.Robots
 * Architecture:
 * - Allows all major search engines to crawl premium tutoring content
 * - Disallows access to admin panels and private client areas
 * - Specifies XML sitemap location for comprehensive page discovery
 * - Optimized for premium service search visibility
 * 
 * Premium Service SEO Strategy:
 * - Allow comprehensive crawling for maximum service visibility
 * - Protect private client and admin areas for confidentiality
 * - Guide crawlers to sitemap for optimal page discovery
 * - Royal client service standards with proper access control
 */

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // CONTEXT7 SOURCE: /vercel/next.js - robots.txt dynamic generation with rules and sitemap
  // PREMIUM SERVICE REASON: Allow maximum search visibility for elite tutoring services
  return {
    rules: [
      {
        // CONTEXT7 SOURCE: /vercel/next.js - userAgent configuration for all crawlers
        // SEO STRATEGY: Allow all major search engines for maximum premium service visibility
        userAgent: '*',
        // Premium tutoring service pages - allow all public content
        allow: [
          '/',                    // Homepage - premium tutoring services
          '/about/',              // About page - service credibility
          '/services/',           // Services - tutoring specializations
          '/testimonials/',       // Client testimonials - social proof
          '/how-it-works/',       // Process explanation - client guidance
          '/expert-educators/',   // Tutor profiles - expertise showcase
          '/subject-tuition/',    // Subject specializations
          '/11-plus-bootcamps/',  // Specialized programs
          '/video/', // Educational content
          '/exam-papers/',        // Resources
          '/homeschooling/',      // Service offerings
          '/faq/',               // Frequently asked questions - enhanced SEO
          '/faq/search/',        // FAQ search functionality
          '/faq/*/',             // All FAQ category pages
          '/legal/',             // Legal pages - transparency
        ],
        // Protect private and administrative areas
        disallow: [
          '/admin/',             // Admin panel - confidential
          '/api/admin/',         // Admin API endpoints
          '/student/',           // Private student areas
          '/tutor/',             // Private tutor areas  
          '/private/',           // Private client resources
          '/_next/',             // Next.js internal files
          '/api/errors/',        // Error logging endpoints
          '/api/csrf-token/',    // CSRF token endpoints
        ],
        // CONTEXT7 SOURCE: /vercel/next.js - crawlDelay for server performance
        // PREMIUM SERVICE: Reasonable delay to ensure server performance for clients
        crawlDelay: 1,
      },
      {
        // Special rules for Google Bot - premium service optimization
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/admin/',
          '/student/', 
          '/tutor/',
          '/private/',
        ],
        // No crawl delay for Google - maximum indexing speed
      },
      {
        // Bing bot optimization for comprehensive search coverage
        userAgent: 'bingbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/admin/',
          '/student/',
          '/tutor/', 
          '/private/',
        ],
      },
    ],
    // CONTEXT7 SOURCE: /vercel/next.js - sitemap URL specification in robots.txt
    // SITEMAP INTEGRATION: Direct crawlers to comprehensive XML sitemap
    sitemap: 'https://myprivatetutoronline.com/sitemap.xml',
    
    // CONTEXT7 SOURCE: /vercel/next.js - host directive for canonical domain
    // PREMIUM SERVICE: Canonical domain for royal client service
    host: 'https://myprivatetutoronline.com',
  }
}