import type { Metadata, ResolvingMetadata } from 'next'
import { cache } from 'react'
import type { WithContext, Organization, EducationalOrganization, Service, Article, Person } from 'schema-dts'

// Cached shared base configuration for performance
export const getSharedMetadata = cache(() => ({
  siteName: 'My Private Tutor Online',
  siteUrl: 'https://myprivatetutoronline.com',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@myprivatetutoronline'
}))

// Security utility for JSON-LD to prevent XSS attacks
export function sanitizeJsonLd<T>(data: WithContext<T>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

// JSON-LD Script utility - use this in your component files
// Example: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(schema) }} />
export function getJsonLdScript<T>(data: WithContext<T>): string {
  return sanitizeJsonLd(data)
}

// Shared OpenGraph image configuration
export const getOpenGraphImage = cache(() => {
  const { siteUrl, defaultImage } = getSharedMetadata()
  return {
    images: [{
      url: `${siteUrl}${defaultImage}`,
      width: 1200,
      height: 630,
      alt: 'My Private Tutor Online - Premium Education Services',
      type: 'image/jpeg'
    }]
  }
})

// Enhanced metadata utility with parent inheritance support
export async function createPageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  robots = 'index, follow',
  type = 'website',
  image,
  publishedTime,
  modifiedTime,
  authors,
  parent
}: {
  title: string
  description: string
  path?: string
  keywords?: string[]
  robots?: string
  type?: 'website' | 'article'
  image?: string
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  parent?: ResolvingMetadata
}): Promise<Metadata> {
  const { siteName, siteUrl, twitterHandle } = getSharedMetadata()
  const openGraphImage = getOpenGraphImage()
  const fullTitle = `${title} | ${siteName}`
  const url = `${siteUrl}${path}`

  // Inherit parent metadata if provided
  const parentMetadata = parent ? await parent : undefined

  // Use custom image if provided, otherwise default
  const pageImage = image ? {
    images: [{
      url: `${siteUrl}${image}`,
      width: 1200,
      height: 630,
      alt: fullTitle,
      type: 'image/jpeg'
    }]
  } : openGraphImage

  return {
    ...parentMetadata,
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description,
    keywords: [
      'tutoring',
      'education',
      'premium',
      'royal endorsed',
      ...keywords
    ], // Modern array format instead of joined string
    openGraph: {
      ...parentMetadata?.openGraph,
      ...pageImage,
      title: fullTitle,
      description,
      url,
      siteName,
      locale: 'en_GB',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
      ...parentMetadata?.twitter,
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: pageImage.images,
      creator: twitterHandle,
    },
    robots,
    alternates: {
      canonical: url,
    },
    verification: {
      google: process.env['GOOGLE_VERIFICATION_CODE'],
    },
    category: 'Education',
  }
}

// Specialized utility for article metadata
export async function createArticleMetadata({
  title,
  description,
  path = '',
  keywords = [],
  image,
  publishedTime,
  modifiedTime,
  authors = ['Elizabeth Burrows'],
  parent
}: {
  title: string
  description: string
  path?: string
  keywords?: string[]
  image?: string
  publishedTime: string
  modifiedTime?: string
  authors?: string[]
  parent?: ResolvingMetadata
}): Promise<Metadata> {
  return createPageMetadata({
    title,
    description,
    path,
    keywords,
    type: 'article',
    ...(image !== undefined && { image }),
    publishedTime,
    ...(modifiedTime !== undefined && { modifiedTime }),
    ...(authors !== undefined && { authors }),
    ...(parent !== undefined && { parent })
  })
}

// Enhanced structured data utilities with type safety
export function createOrganizationSchema(): WithContext<EducationalOrganization> {
  const { siteName, siteUrl } = getSharedMetadata()

  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": siteName,
    "url": siteUrl,
    "description": "Premium tutoring service with royal endorsements",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Elizabeth Burrows"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressLocality": "London"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44 7513 550278",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://linkedin.com/company/myprivatetutoronline",
      "https://twitter.com/myprivatetutoronline"
    ]
  }
}

// Service schema for services pages with proper typing
export function createServiceSchema(): WithContext<Service> {
  const { siteName, siteUrl } = getSharedMetadata()

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Premium Tutoring Services",
    "provider": {
      "@type": "EducationalOrganization",
      "name": siteName,
      "url": siteUrl,
      "founder": {
        "@type": "Person",
        "name": "Elizabeth Burrows"
      }
    },
    "serviceType": "Educational Tutoring",
    "description": "Premium tutoring services including 11+ preparation, GCSE support, and A-level coaching",
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    }
  }
}

// Article schema for blog posts and educational content
export function createArticleSchema({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = 'Elizabeth Burrows'
}: {
  headline: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
}): WithContext<Article> {
  const { siteName, siteUrl } = getSharedMetadata()
  const fullUrl = `${siteUrl}${url}`
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/og-image.jpg`

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "url": fullUrl,
    "image": imageUrl,
    "datePublished": datePublished,
    ...(dateModified && { "dateModified": dateModified }),
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "EducationalOrganization",
      "name": siteName,
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    }
  }
}