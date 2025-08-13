/**
 * Documentation Source: Next.js Static Export + Client Components + next-intl
 * Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/static-exports.mdx#_snippet_9
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: /amannn/next-intl - Internationalized homepage implementation
 * Pattern: Modular homepage with extracted section components and internationalization
 * 
 * Modular Architecture:
 * - Individual section components for better maintainability
 * - CMS integration through modular component props
 * - Proper separation of concerns
 * - Context7 verified component patterns
 * - Reusable components following CLAUDE.md standards
 * - Multi-language support with next-intl
 * 
 * Performance Optimisations:
 * - Component-level lazy loading potential
 * - Reduced main page complexity
 * - Optimised bundle splitting opportunities
 * - Memory-efficient component imports
 * - Locale-specific content loading
 * 
 * Maintainability Benefits:
 * - Each section can be modified independently
 * - Easy to test individual components
 * - Clear component boundaries and responsibilities
 * - Simplified debugging and development
 * - Internationalization support
 */

"use client"

import React from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

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

// Documentation Source: Context7 MCP - Modular Component Imports
// Reference: Context7 verified section component patterns
// Pattern: Importing reusable section components for homepage composition
import { PageLayout } from '@/components/layout/page-layout'
import { QuoteSection } from '@/components/sections/quote-section'
import { ResultsSection } from '@/components/sections/results-section'
import { TrustIndicatorsGrid } from '@/components/sections/trust-indicators-grid'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ScrollingSchools } from '@/components/sections/scrolling-schools'
import { HeroSection } from '@/components/sections/hero-section'
import { HomepageHowItWorks } from '@/components/sections/homepage-how-it-works'
import { AnimatedTagline } from '@/components/sections/animated-tagline'
import { ServicesCarousel } from '@/components/sections/services-carousel'
import { NewsletterSection } from '@/components/sections/newsletter-section'
import { CTASection } from '@/components/sections/cta-section'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

// CONTEXT7 SOURCE: /amannn/next-intl - Homepage component with locale parameter
// LOCALE PARAM REASON: Official next-intl documentation provides locale context for internationalized pages
interface HomePageProps {
  params: Promise<{ locale: string }>;
}

// CONTEXT7 SOURCE: /amannn/next-intl - Internationalized homepage component
// HOMEPAGE I18N REASON: Official next-intl documentation enables multi-language homepage support
export default function HomePage({ params }: HomePageProps) {
  // CONTEXT7 SOURCE: /amannn/next-intl - Client-side translations for homepage
  // CLIENT TRANSLATIONS: Using useTranslations hook for client component internationalization
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
    <PageLayout showHeader={true} showFooter={true} containerSize="full">
      {/* CONTEXT7 SOURCE: /amannn/next-intl - Language switcher in page header */}
      {/* LANGUAGE SWITCHING: Official next-intl documentation enables easy locale switching */}
      <div className="fixed top-6 right-6 z-50">
        <LanguageSwitcher 
          variant="compact"
          position="header"
          showFlags={true}
          showLabels={false}
        />
      </div>
      
      {/* CONTEXT7 SOURCE: /vercel/next.js - Modular homepage sections with CMS integration */}
      {/* MODULAR ARCHITECTURE: Official Next.js documentation recommends component extraction for maintainability */}
      <HeroSection 
        branding={branding}
        studentImages={studentImages}
      />
      
      <AnimatedTagline />
      
      <TrustIndicatorsGrid 
        indicators={trustIndicators}
        studentImages={studentImages}
      />
      
      <ScrollingSchools 
        schools={testimonialsSchools}
      />
      
      <QuoteSection 
        quote={founderQuote.quote}
        author={founderQuote.author}
        role={founderQuote.role}
      />
      
      <ResultsSection />
      
      <ServicesCarousel 
        services={services}
        studentImages={studentImages}
      />
      
      <HomepageHowItWorks />
      
      <TestimonialsSection 
        testimonials={testimonials}
      />
      
      <NewsletterSection />
      
      <CTASection />
      
    </PageLayout>
  )
}