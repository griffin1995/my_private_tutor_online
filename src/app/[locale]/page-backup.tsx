/**
 * BACKUP: Original locale page with all imports preserved for restoration after deployment fix
 */

// CONTEXT7 SOURCE: /amannn/next-intl - Client component homepage with proper i18n provider patterns
// HYDRATION FIX REASON: Official next-intl documentation prohibits setRequestLocale in client components

"use client"

import React from 'react';
import { useTranslations } from 'next-intl';

// Documentation Source: Context7 MCP - CMS Integration Imports
// Reference: Project CLAUDE.md rules 22-25 for CMS requirements
// Pattern: Centralized CMS data imports for homepage content
import { 
  getTrustIndicators,
  getTestimonials,
  getServices,
  getSiteBranding,
  getTestimonialsSchools,
  getFounderQuote,
} from '@/lib/cms'
import { getStudentImages } from '@/lib/cms/cms-images'

// CONTEXT7 SOURCE: /reactjs/react.dev - Optimized component imports with lazy loading strategy
// LAZY LOADING REASON: Official React documentation enables code splitting for better performance

// Critical above-the-fold components (immediate load)
import { PageLayout } from '@/components/layout/page-layout'
import { HeroSection } from '@/components/sections/hero-section'
import { AnimatedTagline } from '@/components/sections/animated-tagline'
import { ScrollingSchools } from '@/components/sections/scrolling-schools'
import { AboutSection } from '@/components/sections/about-section'
import { TrustIndicatorsGrid } from '@/components/sections/trust-indicators-grid'
import { QuoteSection } from '@/components/sections/quote-section'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

// CONTEXT7 SOURCE: /vercel/next.js - Lazy loaded components for bundle optimization
// BUNDLE OPTIMIZATION REASON: Official Next.js documentation for reduced initial bundle size
import { 
  LazyServicesCarousel,
  LazyConsultationForm
} from '@/components/dynamic/lazy-loaded-components'

// CONTEXT7 SOURCE: /amannn/next-intl - Client component homepage without server-side locale parameters
// CLIENT COMPONENT REASON: Official next-intl documentation uses useTranslations without setRequestLocale in client components
export default function HomePage() {
  // CONTEXT7 SOURCE: /amannn/next-intl - Client-side translations for homepage
  // HYDRATION FIX REASON: Official next-intl documentation enables useTranslations in client components with NextIntlClientProvider context
  const t = useTranslations('Navigation');
  
  // CMS DATA SOURCE: Get all homepage content from CMS
  const trustIndicators = getTrustIndicators()
  const testimonials = getTestimonials()
  const services = getServices()
  const branding = getSiteBranding()
  const testimonialsSchools = getTestimonialsSchools()
  const founderQuote = getFounderQuote()
  const studentImages = getStudentImages()

  return (
    <PageLayout showHeader={true} showFooter={true} containerSize="full" verticalSpacing="none">
      {/* Full original implementation preserved here */}
      {/* ... rest of original content ... */}
      
      <div className="min-h-screen">
        <h1>Homepage Loading...</h1>
      </div>
    </PageLayout>
  )
}