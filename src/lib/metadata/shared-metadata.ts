import type { Metadata } from 'next'
import { cache } from 'react'

// Cached shared base configuration for performance
export const getSharedMetadata = cache(() => ({
  siteName: 'My Private Tutor Online',
  siteUrl: 'https://myprivatetutoronline.com',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@myprivatetutoronline'
}))

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

// Base metadata utility with modern Next.js 15 features
export function createPageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  robots = 'index, follow',
  type = 'website',
  image,
  publishedTime,
  modifiedTime,
  authors
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
}): Metadata {
  const { siteName, siteUrl, twitterHandle } = getSharedMetadata()
  const openGraphImage = getOpenGraphImage()
  const fullTitle = `${title} | ${siteName}`
  const url = `${siteUrl}${path}`

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
      ...pageImage,
      title: fullTitle,
      description,
      url,
      siteName,
      locale: 'en_GB',
      type: type as OpenGraph['type'],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
    },
    twitter: {
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
      google: process.env.GOOGLE_VERIFICATION_CODE,
    },
    category: 'Education',
  }
}

// Specialized utility for article metadata
export function createArticleMetadata({
  title,
  description,
  path = '',
  keywords = [],
  image,
  publishedTime,
  modifiedTime,
  authors = ['Elizabeth Burrows']
}: {
  title: string
  description: string
  path?: string
  keywords?: string[]
  image?: string
  publishedTime: string
  modifiedTime?: string
  authors?: string[]
}): Metadata {
  return createPageMetadata({
    title,
    description,
    path,
    keywords,
    type: 'article',
    image,
    publishedTime,
    modifiedTime,
    authors
  })
}

// Structured data utilities
export function createOrganizationSchema() {
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
      "contactType": "Customer Service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://linkedin.com/company/myprivatetutoronline",
      "https://twitter.com/myprivatetutoronline"
    ]
  }
}

// Service schema for services pages
export function createServiceSchema() {
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
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "11+ Preparation",
        "description": "Comprehensive 11+ exam preparation with mock tests and practice papers"
      },
      {
        "@type": "Offer",
        "name": "GCSE Support",
        "description": "Expert GCSE tutoring across all major subjects"
      },
      {
        "@type": "Offer",
        "name": "A-Level Coaching",
        "description": "Advanced A-level tutoring for university preparation"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tutoring Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Private Tutoring",
            "category": "Education"
          }
        }
      ]
    }
  }
}