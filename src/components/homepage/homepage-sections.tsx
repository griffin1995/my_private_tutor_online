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

// CONTEXT7 SOURCE: /vercel/next.js - Props interface for client component wrapper
// TYPE SAFETY REASON: Official Next.js documentation ensures proper prop typing
// CONTEXT7 SOURCE: /vercel/next.js - Props passing patterns for proper data structure types
// INTERFACE FIX: Official Next.js documentation requires matching interface types - ServicesCarousel expects Record<string, StudentImageData> not array
interface HomepageSectionsProps {
  services: any[]
  studentImages: Record<string, any>
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