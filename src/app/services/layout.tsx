/**
 * CONTEXT7 SOURCE: /vercel/next.js - App Router layout with metadata export
 * IMPLEMENTATION REASON: Official Next.js 15 documentation for page-specific metadata and SEO
 * 
 * Services Page Layout with Advanced SEO Implementation
 */

import type { Metadata } from 'next'
import Script from 'next/script'
import { 
  servicesMetadata, 
  generateStructuredData, 
  generateFAQStructuredData, 
  generateBreadcrumbStructuredData 
} from './metadata'

// CONTEXT7 SOURCE: /vercel/next.js - Metadata export for SEO optimization
// IMPLEMENTATION REASON: Official Next.js documentation for static metadata export
export const metadata: Metadata = servicesMetadata

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // CONTEXT7 SOURCE: /vercel/next.js - JSON-LD structured data injection
  // IMPLEMENTATION REASON: Official Next.js documentation for structured data implementation
  const structuredData = generateStructuredData()
  const faqStructuredData = generateFAQStructuredData()
  const breadcrumbStructuredData = generateBreadcrumbStructuredData()

  return (
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - Script component for JSON-LD injection */}
      {/* IMPLEMENTATION REASON: Official Next.js documentation for structured data scripts */}
      <Script
        id="services-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <Script
        id="services-faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />
      <Script
        id="services-breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      {children}
    </>
  )
}