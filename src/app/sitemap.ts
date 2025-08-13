/**
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic sitemap generation using MetadataRoute.Sitemap
 * IMPLEMENTATION REASON: Official Next.js App Router pattern for XML sitemap generation
 * CONTEXT7 SOURCE: /vercel/next.js - Sitemap return type definition with URL, lastModified, changeFrequency, priority
 * SEO IMPLEMENTATION: Comprehensive page discovery for premium tutoring service visibility
 * 
 * Pattern: Programmatic XML sitemap generation for premium tutoring service
 * Architecture:
 * - Dynamic sitemap with all public pages and proper SEO priorities
 * - Premium service pages prioritized for maximum search visibility
 * - Strategic changeFrequency settings for different content types
 * - Royal client service standards with proper URL structure
 * 
 * Premium Service SEO Strategy:
 * - Homepage: Maximum priority (1.0) for service discovery
 * - Core services: High priority (0.9) for tutoring specializations
 * - About/Testimonials: High priority (0.8) for credibility
 * - Resources: Medium priority (0.7) for educational content
 * - Legal pages: Lower priority (0.3) but included for completeness
 */

import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // CONTEXT7 SOURCE: /vercel/next.js - MetadataRoute.Sitemap return type with required url field
  // PREMIUM SERVICE REASON: Comprehensive page discovery for elite tutoring service visibility
  
  const baseUrl = 'https://myprivatetutoronline.com'
  const lastModified = new Date()
  
  return [
    // HOMEPAGE - Maximum priority for premium tutoring service discovery
    {
      url: baseUrl,
      lastModified,
      // CONTEXT7 SOURCE: /vercel/next.js - changeFrequency enum values for sitemap optimization
      // SEO STRATEGY: Weekly updates for premium service content and testimonials
      changeFrequency: 'weekly',
      // CONTEXT7 SOURCE: /vercel/next.js - priority number field for search ranking guidance
      // PREMIUM SERVICE: Maximum priority for homepage service discovery
      priority: 1.0,
    },
    
    // CORE SERVICE PAGES - High priority for tutoring specializations
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      // High priority for service credibility and royal endorsements
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified, 
      changeFrequency: 'monthly',
      // High priority for tutoring service offerings
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified,
      changeFrequency: 'monthly',
      // High priority for client process understanding
      priority: 0.8,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified,
      changeFrequency: 'weekly',
      // High priority for social proof and client testimonials
      priority: 0.8,
    },
    {
      url: `${baseUrl}/expert-educators`,
      lastModified,
      changeFrequency: 'monthly',
      // High priority for tutor expertise showcase
      priority: 0.8,
    },
    
    // SPECIALIZED TUTORING SERVICES - High priority for service discovery
    {
      url: `${baseUrl}/subject-tuition`,
      lastModified,
      changeFrequency: 'monthly',
      // High priority for subject specialization visibility
      priority: 0.9,
    },
    {
      url: `${baseUrl}/11-plus-bootcamps`,
      lastModified,
      changeFrequency: 'monthly',
      // High priority for 11+ preparation services
      priority: 0.9,
    },
    {
      url: `${baseUrl}/video-masterclasses`,
      lastModified,
      changeFrequency: 'weekly',
      // High priority for educational video content
      priority: 0.8,
    },
    {
      url: `${baseUrl}/exam-papers`,
      lastModified,
      changeFrequency: 'weekly',
      // Medium-high priority for educational resources
      priority: 0.7,
    },
    {
      url: `${baseUrl}/homeschooling`,
      lastModified,
      changeFrequency: 'monthly',
      // High priority for homeschooling service offerings
      priority: 0.8,
    },
    
    // SUPPORT AND INFORMATION PAGES - Enhanced FAQ SEO
    {
      url: `${baseUrl}/faq`,
      lastModified,
      changeFrequency: 'weekly',
      // CONTEXT7 SOURCE: /vercel/next.js - Increased priority for FAQ SEO targeting
      // SEO ENHANCEMENT: Higher priority for comprehensive FAQ system with structured data
      priority: 0.8,
    },
    
    // FAQ CATEGORY PAGES - Individual category targeting
    {
      url: `${baseUrl}/faq/getting-started`,
      lastModified,
      changeFrequency: 'monthly',
      // High priority for new client onboarding information
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq/tutoring-services`,
      lastModified,
      changeFrequency: 'monthly',
      // High priority for service-specific FAQ content
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq/pricing-payments`,
      lastModified,
      changeFrequency: 'monthly',
      // High priority for pricing transparency
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq/scheduling-booking`,
      lastModified,
      changeFrequency: 'monthly',
      // High priority for booking process information
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq/academic-support`,
      lastModified,
      changeFrequency: 'monthly',
      // High priority for academic service information
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq/technical-support`,
      lastModified,
      changeFrequency: 'monthly',
      // Medium priority for technical assistance
      priority: 0.6,
    },
    
    // FAQ SEARCH PAGE - Search functionality visibility
    {
      url: `${baseUrl}/faq/search`,
      lastModified,
      changeFrequency: 'weekly',
      // Medium priority for search functionality
      priority: 0.5,
    },
    
    // LEGAL AND COMPLIANCE PAGES - Required for premium service transparency
    {
      url: `${baseUrl}/legal/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly',
      // Lower priority but important for legal compliance
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms-of-service`,
      lastModified,
      changeFrequency: 'yearly',
      // Lower priority but required for service terms
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cookie-policy`,
      lastModified,
      changeFrequency: 'yearly',
      // Lower priority but required for GDPR compliance
      priority: 0.3,
    },
  ]
}