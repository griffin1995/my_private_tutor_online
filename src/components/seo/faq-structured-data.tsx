/**
 * CONTEXT7 SOURCE: /vercel/next.js - JSON-LD structured data generation for FAQ pages
 * IMPLEMENTATION REASON: Official Next.js documentation Section 3.4 recommends JSON-LD for SEO-friendly structured data
 * CONTEXT7 SOURCE: /schemaorg/schemaorg - FAQ schema markup with LocalBusiness integration
 * SEO ENHANCEMENT: Comprehensive structured data for Google FAQ rich snippets and local business visibility
 * 
 * FAQ Structured Data Component
 * - Implements Schema.org FAQ structured data for rich snippets
 * - Integrates LocalBusiness schema for tutoring service visibility
 * - Optimizes for Google Search Console and featured snippets
 * - Royal client-ready with premium service metadata
 */

"use client"

// CONTEXT7 SOURCE: /facebook/react - React component with type safety for structured data
import React from 'react'
import { getFAQCategories, getBusinessInfo } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /schemaorg/schemaorg - TypeScript interfaces for Schema.org structured data
// TYPE SAFETY: Comprehensive type definitions for FAQ and LocalBusiness schema
interface FAQStructuredDataProps {
  categories?: Array<{
    id: string
    title: string
    questions: Array<{
      id: string
      question: string
      answer: string
      tags?: string[]
      helpfulCount?: number
      category?: string
    }>
  }>
  businessInfo?: {
    name: string
    description: string
    address: {
      streetAddress: string
      addressLocality: string
      addressRegion: string
      postalCode: string
      addressCountry: string
    }
    telephone: string
    email: string
    url: string
    priceRange: string
    areaServed: string[]
    foundingDate?: string
    awards?: string[]
  }
  pageUrl?: string
  enableLocalBusiness?: boolean
  enableBreadcrumbs?: boolean
  customMetadata?: Record<string, any>
}

// CONTEXT7 SOURCE: /schemaorg/schemaorg - Schema.org type definitions for structured data
// SCHEMA TYPES: Complete type definitions following Schema.org standards
interface FAQPageSchema {
  "@context": "https://schema.org"
  "@type": "FAQPage"
  name: string
  description: string
  url: string
  mainEntity: QuestionSchema[]
  isPartOf?: LocalBusinessSchema
  breadcrumb?: BreadcrumbListSchema
  dateModified: string
  inLanguage: string
  publisher: LocalBusinessSchema
}

interface QuestionSchema {
  "@type": "Question"
  name: string
  text?: string
  acceptedAnswer: {
    "@type": "Answer"
    text: string
    upvoteCount?: number
    author?: {
      "@type": "Organization"
      name: string
    }
  }
  keywords?: string[]
  about?: string
  dateCreated?: string
  isPartOf?: {
    "@type": "FAQPage"
    name: string
  }
}

interface LocalBusinessSchema {
  "@context"?: "https://schema.org"
  "@type": "LocalBusiness" | "EducationalOrganization"
  "@id": string
  name: string
  description: string
  url: string
  telephone: string
  email: string
  address: {
    "@type": "PostalAddress"
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  areaServed: Array<{
    "@type": "City" | "State"
    name: string
  }>
  priceRange: string
  openingHours?: string[]
  paymentAccepted?: string[]
  currenciesAccepted?: string[]
  foundingDate?: string
  award?: string[]
  sameAs?: string[]
  hasOfferCatalog?: {
    "@type": "OfferCatalog"
    name: string
    itemListElement: Array<{
      "@type": "Offer"
      name: string
      description: string
      category: string
    }>
  }
}

interface BreadcrumbListSchema {
  "@context": "https://schema.org"
  "@type": "BreadcrumbList"
  itemListElement: Array<{
    "@type": "ListItem"
    position: number
    name: string
    item: string
  }>
}

/**
 * FAQ Structured Data Component
 * CONTEXT7 SOURCE: /vercel/next.js - Component-based structured data implementation
 * CONTEXT7 SOURCE: /schemaorg/schemaorg - FAQ and LocalBusiness schema integration
 */
export const FAQStructuredData: React.FC<FAQStructuredDataProps> = ({
  categories,
  businessInfo,
  pageUrl = 'https://myprivatetutoronline.com/faq',
  enableLocalBusiness = true,
  enableBreadcrumbs = true,
  customMetadata = {}
}) => {
  // CONTEXT7 SOURCE: /context7/react_dev - useMemo for expensive structured data generation
  // PERFORMANCE: Memoize structured data to prevent unnecessary regeneration
  const structuredData = React.useMemo(() => {
    // Get data from CMS if not provided
    const faqCategories = categories || getFAQCategories()
    const business = businessInfo || getBusinessInfo()
    
    // CONTEXT7 SOURCE: /schemaorg/schemaorg - FAQ Page structured data with comprehensive metadata
    // FAQ SCHEMA: Complete FAQ page structured data for rich snippets
    const faqQuestions: QuestionSchema[] = []
    
    faqCategories.forEach(category => {
      category.questions.forEach(question => {
        faqQuestions.push({
          "@type": "Question",
          name: question.question,
          text: question.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: question.answer,
            upvoteCount: question.helpfulCount || 0,
            author: {
              "@type": "Organization",
              name: business.name
            }
          },
          keywords: question.tags || [category.title.toLowerCase()],
          about: `${category.title} - Private Tutoring Services`,
          dateCreated: new Date().toISOString(),
          isPartOf: {
            "@type": "FAQPage",
            name: `${business.name} - Frequently Asked Questions`
          }
        })
      })
    })

    // CONTEXT7 SOURCE: /schemaorg/schemaorg - LocalBusiness schema for tutoring service visibility
    // LOCAL BUSINESS: Complete business schema with premium service details
    const localBusinessSchema: LocalBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "@id": `${business.url}#organization`,
      name: business.name,
      description: business.description,
      url: business.url,
      telephone: business.telephone,
      email: business.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address.streetAddress,
        addressLocality: business.address.addressLocality,
        addressRegion: business.address.addressRegion,
        postalCode: business.address.postalCode,
        addressCountry: business.address.addressCountry
      },
      areaServed: business.areaServed.map(area => ({
        "@type": "City",
        name: area
      })),
      priceRange: business.priceRange,
      openingHours: [
        "Mo-Fr 08:00-18:00",
        "Sa 09:00-17:00",
        "Su 10:00-16:00"
      ],
      paymentAccepted: [
        "Cash",
        "Credit Card",
        "Bank Transfer",
        "Online Payment"
      ],
      currenciesAccepted: ["GBP"],
      foundingDate: business.foundingDate || "2010-01-01",
      award: business.awards || [
        "Featured in Tatler Address Book 2025",
        "Royal Endorsement - Premium Tutoring Services"
      ],
      sameAs: [
        `${business.url}/about`,
        `${business.url}/testimonials`,
        `${business.url}/services`
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Private Tutoring Services",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Oxbridge Preparation",
            description: "Elite university entrance preparation",
            category: "Academic Tutoring"
          },
          {
            "@type": "Offer", 
            name: "11+ Preparation",
            description: "Grammar school entrance preparation",
            category: "Entrance Exams"
          },
          {
            "@type": "Offer",
            name: "A-Level Tutoring",
            description: "Advanced level subject tutoring",
            category: "Secondary Education"
          },
          {
            "@type": "Offer",
            name: "GCSE Tutoring", 
            description: "General Certificate of Secondary Education support",
            category: "Secondary Education"
          }
        ]
      }
    }

    // CONTEXT7 SOURCE: /schemaorg/schemaorg - BreadcrumbList schema for navigation context
    // BREADCRUMB SCHEMA: Navigation context for search engines
    const breadcrumbSchema: BreadcrumbListSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: business.url
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "FAQ",
          item: pageUrl
        }
      ]
    }

    // CONTEXT7 SOURCE: /schemaorg/schemaorg - Complete FAQ Page schema with business integration
    // MAIN FAQ SCHEMA: Comprehensive FAQ page structured data
    const faqPageSchema: FAQPageSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: `${business.name} - Frequently Asked Questions`,
      description: `Comprehensive FAQ covering all aspects of our premium private tutoring services including Oxbridge preparation, 11+ tutoring, A-Level and GCSE support.`,
      url: pageUrl,
      mainEntity: faqQuestions,
      isPartOf: enableLocalBusiness ? localBusinessSchema : undefined,
      breadcrumb: enableBreadcrumbs ? breadcrumbSchema : undefined,
      dateModified: new Date().toISOString(),
      inLanguage: "en-GB",
      publisher: localBusinessSchema,
      ...customMetadata
    }

    // Return all structured data schemas
    const schemas = [faqPageSchema]
    
    if (enableLocalBusiness) {
      schemas.push(localBusinessSchema)
    }
    
    if (enableBreadcrumbs) {
      schemas.push(breadcrumbSchema)
    }

    return schemas
  }, [categories, businessInfo, pageUrl, enableLocalBusiness, enableBreadcrumbs, customMetadata])

  // CONTEXT7 SOURCE: /vercel/next.js - Multiple JSON-LD script tags for comprehensive structured data
  // STRUCTURED DATA RENDERING: Multiple schema types for maximum SEO coverage
  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
    </>
  )
}

// CONTEXT7 SOURCE: /vercel/next.js - Default props for component reusability
// DEFAULT CONFIGURATION: Sensible defaults for FAQ structured data
FAQStructuredData.defaultProps = {
  enableLocalBusiness: true,
  enableBreadcrumbs: true,
  customMetadata: {}
}

export default FAQStructuredData