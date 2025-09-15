/**
 * CONTEXT7 SOURCE: /vercel/next.js - Technical SEO optimization utilities
 * MULTI-AGENT CONSENSUS: Performance-Engineer approved technical SEO for £548K optimization
 * CONTEXT7 SOURCE: /vercel/next.js - Metadata API and performance optimization
 * IMPLEMENTATION: Royal client SEO standards with comprehensive technical optimization
 */

import { Metadata } from 'next'

// CONTEXT7 SOURCE: /vercel/next.js - Advanced robots configuration for search engine control
// SEO OPTIMIZATION: Granular search engine directive management for premium content
export const ROBOTS_CONFIG = {
  // Premium pages - full indexing with enhanced directives
  PREMIUM: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Standard pages - balanced indexing approach
  STANDARD: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': 200,
      'max-image-preview': 'standard',
    },
  },

  // Private/Admin pages - restricted access
  RESTRICTED: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },

  // Landing pages - optimised for conversion
  LANDING: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
} as const

// CONTEXT7 SOURCE: /vercel/next.js - OpenGraph configuration templates
// SOCIAL OPTIMIZATION: Comprehensive social media metadata for royal client branding
export const OPENGRAPH_TEMPLATES = {
  // Homepage template
  HOMEPAGE: {
    type: 'website',
    siteName: 'My Private Tutor Online',
    locale: 'en_GB',
    countryName: 'United Kingdom',
    images: [
      {
        url: '/images/og/homepage-og.webp',
        width: 1200,
        height: 630,
        alt: 'My Private Tutor Online - Premium Tutoring with Royal Endorsements',
        type: 'image/webp'
      },
      {
        url: '/images/og/homepage-og-square.webp',
        width: 1200,
        height: 1200,
        alt: 'My Private Tutor Online - Elite Education Services',
        type: 'image/webp'
      }
    ]
  },

  // Service pages template
  SERVICE: {
    type: 'website',
    siteName: 'My Private Tutor Online',
    locale: 'en_GB',
    images: [
      {
        width: 1200,
        height: 630,
        type: 'image/webp'
      }
    ]
  },

  // Article/Blog template
  ARTICLE: {
    type: 'article',
    siteName: 'My Private Tutor Online',
    locale: 'en_GB',
    authors: ['My Private Tutor Online Editorial Team'],
    section: 'Education',
    tags: ['tutoring', 'education', 'oxbridge', 'premium']
  },

  // Course pages template
  COURSE: {
    type: 'website',
    siteName: 'My Private Tutor Online',
    locale: 'en_GB',
    images: [
      {
        width: 1200,
        height: 630,
        type: 'image/webp'
      }
    ]
  }
} as const

// CONTEXT7 SOURCE: /vercel/next.js - Canonical URL generation utilities
// URL OPTIMIZATION: Consistent canonical URL management for SEO authority
export class CanonicalUrlManager {
  private static readonly BASE_URL = 'https://myprivatetutoronline.co.uk'

  // CONTEXT7 SOURCE: /vercel/next.js - Generate canonical URL with proper formatting
  public static generateCanonical(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path

    // Remove trailing slash for consistency
    const normalizedPath = cleanPath.endsWith('/') && cleanPath !== ''
      ? cleanPath.slice(0, -1)
      : cleanPath

    return normalizedPath
      ? `${this.BASE_URL}/${normalizedPath}`
      : this.BASE_URL
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Generate alternate URLs for multilingual support
  public static generateAlternates(path: string): Record<string, string> {
    const canonical = this.generateCanonical(path)

    return {
      canonical,
      languages: {
        'en-GB': canonical,
        'en': canonical,
        'x-default': canonical
      }
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Generate sitemap URLs for technical SEO
  public static generateSitemapUrls(): string[] {
    const baseUrls = [
      '',
      'about',
      'how-it-works',
      'subject-tuition',
      'expert-educators',
      'testimonials',
      'contact',
      'faq',
      'blog'
    ]

    return baseUrls.map(url => this.generateCanonical(url))
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Metadata generation utilities for dynamic content
// METADATA OPTIMIZATION: Dynamic metadata generation with royal client standards
export class MetadataGenerator {
  // CONTEXT7 SOURCE: /vercel/next.js - Generate complete metadata object
  public static generatePageMetadata(config: {
    title: string
    description: string
    path: string
    type?: 'homepage' | 'service' | 'article' | 'course'
    keywords?: string[]
    images?: Array<{
      url: string
      alt: string
      width?: number
      height?: number
    }>
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
  }): Metadata {
    const {
      title,
      description,
      path,
      type = 'service',
      keywords = [],
      images = [],
      publishedTime,
      modifiedTime,
      authors
    } = config

    const canonical = CanonicalUrlManager.generateCanonical(path)
    const alternates = CanonicalUrlManager.generateAlternates(path)

    // CONTEXT7 SOURCE: /vercel/next.js - Select appropriate templates based on page type
    let ogTemplate = OPENGRAPH_TEMPLATES.SERVICE
    let robotsConfig = ROBOTS_CONFIG.STANDARD

    switch (type) {
      case 'homepage':
        ogTemplate = OPENGRAPH_TEMPLATES.HOMEPAGE
        robotsConfig = ROBOTS_CONFIG.PREMIUM
        break
      case 'article':
        ogTemplate = OPENGRAPH_TEMPLATES.ARTICLE
        robotsConfig = ROBOTS_CONFIG.STANDARD
        break
      case 'course':
        ogTemplate = OPENGRAPH_TEMPLATES.COURSE
        robotsConfig = ROBOTS_CONFIG.LANDING
        break
      default:
        ogTemplate = OPENGRAPH_TEMPLATES.SERVICE
        robotsConfig = ROBOTS_CONFIG.STANDARD
    }

    // CONTEXT7 SOURCE: /vercel/next.js - Process custom images or use defaults
    const processedImages = images.length > 0
      ? images.map(img => ({
          url: img.url,
          width: img.width || 1200,
          height: img.height || 630,
          alt: img.alt,
          type: 'image/webp'
        }))
      : ogTemplate.images

    const metadata: Metadata = {
      title,
      description,
      keywords: [
        'premium tutoring',
        'royal endorsed education',
        'oxbridge preparation',
        'elite tutoring UK',
        'private tuition',
        ...keywords
      ],
      authors: authors ? authors.map(name => ({ name })) : undefined,
      creator: 'My Private Tutor Online',
      publisher: 'My Private Tutor Online Ltd',

      // CONTEXT7 SOURCE: /vercel/next.js - Robots configuration
      robots: robotsConfig,

      // CONTEXT7 SOURCE: /vercel/next.js - OpenGraph metadata
      openGraph: {
        ...ogTemplate,
        title,
        description,
        url: canonical,
        images: processedImages,
        publishedTime,
        modifiedTime,
        ...(authors && type === 'article' && { authors })
      },

      // CONTEXT7 SOURCE: /vercel/next.js - Twitter metadata
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: processedImages.map(img => img.url),
        creator: '@myprivatetutoronline',
        site: '@myprivatetutoronline'
      },

      // CONTEXT7 SOURCE: /vercel/next.js - Alternate URLs
      alternates,

      // CONTEXT7 SOURCE: /vercel/next.js - Additional metadata
      category: 'Education',
      classification: 'Education Services',
      referrer: 'origin-when-cross-origin',
      formatDetection: {
        email: true,
        address: true,
        telephone: true
      },

      // CONTEXT7 SOURCE: /vercel/next.js - Verification tags
      verification: {
        google: process.env.GOOGLE_SITE_VERIFICATION,
        yandex: process.env.YANDEX_VERIFICATION,
        other: {
          'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
          'facebook-domain-verification': process.env.FACEBOOK_DOMAIN_VERIFICATION || ''
        }
      }
    }

    return metadata
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Generate subject-specific metadata
  public static generateSubjectMetadata(subject: string, subjectData: any): Metadata {
    const subjectTitle = `${subjectData.displayName} Tutoring | Expert ${subjectData.displayName} Tuition | My Private Tutor Online`
    const subjectDescription = `Expert ${subjectData.displayName} tutoring with royal endorsements. 15+ years experience, Oxbridge specialists, proven results. ${subjectData.description}`

    return this.generatePageMetadata({
      title: subjectTitle,
      description: subjectDescription,
      path: `subject-tuition/${subject}`,
      type: 'course',
      keywords: [
        `${subjectData.displayName.toLowerCase()} tutoring`,
        `${subjectData.displayName.toLowerCase()} tuition`,
        `private ${subjectData.displayName.toLowerCase()} tutor`,
        'royal endorsed tutoring',
        'oxbridge preparation',
        ...subjectData.keywords
      ],
      images: [
        {
          url: `/images/subjects/${subject}-tutoring.webp`,
          alt: `${subjectData.displayName} Tutoring Services`,
          width: 1200,
          height: 630
        }
      ]
    })
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Generate blog post metadata
  public static generateBlogMetadata(post: {
    title: string
    excerpt: string
    slug: string
    publishedAt: string
    updatedAt?: string
    author: string
    tags: string[]
    featuredImage?: string
  }): Metadata {
    return this.generatePageMetadata({
      title: `${post.title} | My Private Tutor Online Blog`,
      description: post.excerpt,
      path: `blog/${post.slug}`,
      type: 'article',
      keywords: post.tags,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      images: post.featuredImage ? [
        {
          url: post.featuredImage,
          alt: post.title,
          width: 1200,
          height: 630
        }
      ] : undefined
    })
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Performance optimization for SEO metrics
// PERFORMANCE SEO: Technical optimizations that impact search engine rankings
export class TechnicalSEOOptimizer {
  // CONTEXT7 SOURCE: /vercel/next.js - Generate preload links for critical resources
  public static generatePreloadLinks(): Array<{
    rel: string
    href: string
    as: string
    type?: string
    crossOrigin?: string
  }> {
    return [
      // Critical fonts preloading
      {
        rel: 'preload',
        href: '/fonts/inter-var.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous'
      },

      // Critical CSS preloading
      {
        rel: 'preload',
        href: '/css/critical.css',
        as: 'style'
      },

      // Hero image preloading
      {
        rel: 'preload',
        href: '/images/hero/hero-main.webp',
        as: 'image',
        type: 'image/webp'
      }
    ]
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Generate DNS prefetch hints
  public static generateDNSPrefetch(): string[] {
    return [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      'https://connect.facebook.net',
      'https://www.linkedin.com'
    ]
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Generate structured data for breadcrumbs
  public static generateBreadcrumbStructuredData(breadcrumbs: Array<{
    name: string
    url: string
  }>): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': crumb.name,
        'item': {
          '@type': 'WebPage',
          '@id': crumb.url
        }
      }))
    }
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Generate FAQ structured data
  public static generateFAQStructuredData(faqs: Array<{
    question: string
    answer: string
  }>): Record<string, any> {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    }
  }
}

export default {
  MetadataGenerator,
  CanonicalUrlManager,
  TechnicalSEOOptimizer,
  ROBOTS_CONFIG,
  OPENGRAPH_TEMPLATES
}