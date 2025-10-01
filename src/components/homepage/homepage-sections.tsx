/**
 * CONTEXT7 SOURCE: /vercel/next.js - Client component wrapper for homepage sections
 * CLIENT WRAPPER REASON: Official Next.js documentation requires separating client components from server components
 * 
 * HomePage Client Sections - useState Error Resolution
 * Wraps client components with useState hooks to prevent server-side execution errors
 * 
 * SERVER-CLIENT SEPARATION:
 * - Server components handle data fetching and static content
 * - Client components handle interactive elements with useState/useEffect
 * - Proper boundary between server and client rendering contexts
 * 
 * PRODUCTION FIX: Resolves TypeError: Cannot read properties of null (reading 'useState')
 */

"use client"

import React from 'react'
import { 
  LazyServicesCarousel
} from '../dynamic/lazy-loaded-components'

// CONTEXT7 SOURCE: /microsoft/typescript - Service content interface definitions
// TYPE SAFETY: Official TypeScript documentation requires comprehensive interface definitions
interface ServiceContent {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly icon?: string
  readonly href: string
  readonly featured: boolean
  readonly category: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - Student image metadata interface
// IMAGE METADATA: Comprehensive typing for student image data structures
interface StudentImageData {
  readonly src: string
  readonly alt: string
  readonly width?: number
  readonly height?: number
  readonly placeholder?: string
  readonly optimized: boolean
}

// CONTEXT7 SOURCE: /vercel/next.js - Props interface for client component wrapper
// TYPE SAFETY REASON: Official Next.js documentation ensures proper prop typing
interface HomepageSectionsProps {
  readonly services: readonly ServiceContent[]
  readonly studentImages: Record<string, StudentImageData>
}

// CONTEXT7 SOURCE: /vercel/next.js - Client component wrapper for homepage sections
// CLIENT COMPONENT REASON: Official Next.js documentation prevents useState server-side execution
export const HomepageSections: React.FC<HomepageSectionsProps> = ({
  services,
  studentImages
}) => {
  return (
    <>
      {/* SERVICES CAROUSEL - CLIENT COMPONENT */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Dynamic import for below-the-fold content optimization */}
      {/* LAZY LOADING REASON: Official Next.js documentation reduces initial bundle size for non-critical sections */}
      <LazyServicesCarousel 
        services={services}
        studentImages={studentImages}
      />
    </>
  )
}