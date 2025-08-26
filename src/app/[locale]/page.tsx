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

// CONTEXT7 SOURCE: /amannn/next-intl - Client component homepage with proper i18n provider patterns
// CLIENT COMPONENT RESTORATION: Official next-intl documentation shows client components use useTranslations hook
// ARCHITECTURE FIX REASON: Restoring original working client component pattern for useState/useEffect compatibility

"use client"

// CONTEXT7 SOURCE: /websites/react_dev - React import with useState and useEffect for async data loading
// ASYNC DATA LOADING REASON: Official React documentation Section 3.2 requires useState and useEffect for client-side async operations
import React, { useState, useEffect } from 'react';
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
  getResultsDocumentation,
} from '../../lib/cms'
import { getStudentImages } from '../../lib/cms/cms-images'

// CONTEXT7 SOURCE: /reactjs/react.dev - Optimized component imports with lazy loading strategy
// LAZY LOADING REASON: Official React documentation enables code splitting for better performance

// Critical above-the-fold components (immediate load)
import { PageLayout } from '../../components/layout/page-layout'
import { HeroSection } from '../../components/sections/hero-section'
import { AnimatedTagline } from '../../components/sections/animated-tagline'
import { ScrollingSchools } from '../../components/sections/scrolling-schools'
import { AboutSection } from '../../components/sections/about-section'
import { TrustIndicatorsGrid } from '../../components/sections/trust-indicators-grid'
import { QuoteSection } from '../../components/sections/quote-section'
import { LanguageSwitcher } from '../../components/ui/language-switcher'

// CONTEXT7 SOURCE: /vercel/next.js - Client component wrapper for homepage sections
// CLIENT WRAPPER REASON: Official Next.js documentation prohibits client components in server components
import { HomepageSections } from '../../components/homepage/homepage-sections'

// CONTEXT7 SOURCE: /facebook/react - Results Documentation Section component for business analytics display
// RESULTS DOCUMENTATION REASON: Official React patterns for quantifiable outcomes section identical to Subject Tuition page
import { ResultsDocumentation } from '../../components/sections/results-documentation'

// CONTEXT7 SOURCE: /amannn/next-intl - Client component homepage without server-side locale parameters
// CLIENT COMPONENT REASON: Official next-intl documentation uses useTranslations hook in client components
export default function HomePage() {
  console.log('[DEBUG-HomePage] Component function executed - client component with synchronous data loading')
  
  // CONTEXT7 SOURCE: /amannn/next-intl - Client-side translations for homepage
  // CLIENT HOOK REASON: Official next-intl documentation enables useTranslations hook in client components
  const t = useTranslations('Navigation');
  console.log('[DEBUG-HomePage] useTranslations hook completed successfully')
  
  // CONTEXT7 SOURCE: /websites/react_dev - useState and useEffect for async data loading
  // ASYNC DATA LOADING REASON: Official React documentation for client-side async operations with useState/useEffect pattern
  const [asyncResultsData, setAsyncResultsData] = useState<any[]>([])
  
  useEffect(() => {
    async function loadResultsData() {
      try {
        const data = await getResultsDocumentation()
        setAsyncResultsData([...data])
      } catch (error) {
        console.error('Failed to load results data:', error)
      }
    }
    
    loadResultsData()
  }, [])
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - Direct synchronous data access pattern
  // SYNCHRONOUS RESTORATION: Return to proven working pattern with immediate data availability
  console.log('[DEBUG-HomePage] Loading CMS data synchronously - client component')
  
  // Direct synchronous CMS function calls - no useState/useEffect needed
  const trustIndicators = getTrustIndicators()
  const testimonials = getTestimonials()
  const services = getServices()
  const branding = getSiteBranding()
  const founderQuote = getFounderQuote()
  const studentImages = getStudentImages()
  const testimonialsSchools = getTestimonialsSchools()
  
  console.log('[DEBUG-HomePage] CMS data loaded synchronously:', {
    trustIndicators: trustIndicators?.length || 0,
    testimonials: testimonials?.length || 0,
    services: services?.length || 0,
    studentImages: studentImages ? Object.keys(studentImages).length : 0,
    branding: !!branding,
    founderQuote: !!founderQuote?.quote,
    testimonialsSchools: testimonialsSchools?.length || 0,
  })

  return (
    <PageLayout 
      showHeader={true} 
      showFooter={true} 
      containerSize="full" 
      verticalSpacing="none"
      headerProps={{ isHomepage: true }}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - PageLayout spacing control with verticalSpacing="none" */}
      {/* WHITE SPACE FIX REASON: Official Tailwind CSS documentation shows py-12 utility creates 48px top/bottom padding - verticalSpacing="none" eliminates this padding to allow full-screen Hero section to start at viewport top */}
      {/* LAYOUT OPTIMIZATION: Prevents white space above Hero section by removing default PageLayout container padding for premium full-viewport design */}
      
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns for header/navbar visibility control */}
      {/* NAVBAR RESTORATION REASON: Official React documentation shows how showHeader controls site NAVIGATION/NAVBAR visibility - this is the main site menu that users need to access other pages */}
      {/* NAVBAR vs HEADER TERMINOLOGY: showHeader=true renders the NAVBAR (main site navigation), showHeader=false hides it completely */}
      {/* COMPONENT RELATIONSHIP: PageLayout showHeader=true renders navbar, HeroSection showHeader=false prevents duplicate header rendering */}
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
      
      {/* CONTEXT7 SOURCE: /context7/react_dev-learn - Homepage component ordering with JSX structure */}
      {/* COMPONENT ORDERING REASON: Official React documentation enables structured component composition for modular homepage layout */}
      
      {/* 1. HERO SECTION */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns to prevent duplicate component instances */}
      {/* NAVBAR vs HERO HEADER COORDINATION: */}
      {/* - PageLayout.showHeader={true} = Renders MAIN NAVBAR (restored for user navigation) */}
      {/* - HeroSection.showHeader={false} = Prevents DUPLICATE header inside hero section */}
      {/* CRITICAL UNDERSTANDING: These control DIFFERENT headers - navbar vs hero header */}
      {/* ACCESSIBILITY: PageLayout navbar is ESSENTIAL for users to navigate between pages */}
      <HeroSection 
        showHeader={false}
        hasStaticNavbar={true}
      />
      
      {/* 2. "WE HELP STUDENTS PLACE AT TOP 10 UK SCHOOLS AND UNIVERSITIES" */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spacing utilities for vertical rhythm */}
      {/* SPACING ADDITION REASON: Official Tailwind CSS documentation mt-8 utility creates 2rem (32px) top margin for breathing room between Hero and Tagline sections */}
      <div className="mt-8">
        <AnimatedTagline />
      </div>
      
      {/* 3. SCROLLING SCHOOLS COMPONENT */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Margin utilities for consistent vertical rhythm */}
      {/* SPACING CONSISTENCY REASON: Official Tailwind CSS documentation mt-8 utility maintains same 2rem spacing as Tagline for visual rhythm grouping */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering for async data loading */}
      {/* ASYNC RENDERING REASON: Official React documentation shows conditional rendering patterns for loading states and data availability */}
      <div className="mt-8">
        {testimonialsSchools.length > 0 && (
          <ScrollingSchools 
            schools={[...testimonialsSchools]}
          />
        )}
      </div>
      
      {/* 4. ABOUT SECTION */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Margin utilities for visual hierarchy and section separation */}
      {/* VISUAL BREAK REASON: Official Tailwind CSS documentation mt-16 utility creates 4rem (64px) top margin for clear separation between introductory group (Hero/Tagline/Schools) and main content sections */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - About section with founder story and company credentials */}
      {/* ABOUT SECTION RESTORATION: Restored from git history - provides company background and founder credibility */}
      <div className="mt-16">
        <AboutSection />
      </div>
      
      
      {/* 5. RESULTS DOCUMENTATION - QUANTIFIABLE ACADEMIC OUTCOMES */}
      {/* CONTEXT7 SOURCE: /facebook/react - ResultsDocumentation component integration identical to Subject Tuition page */}
      {/* RESULTS DOCUMENTATION REASON: Exact carbon copy of Subject Tuition page section 4 for consistent data presentation */}
      <section className="py-16 lg:py-24 relative bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 opacity-70" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ResultsDocumentation
            title="Quantifiable Academic Outcomes"
            description="Verified results that demonstrate measurable ROI for logic-driven families and elite service positioning"
            results={asyncResultsData}
            showVerificationBadges={true}
            showConfidenceIntervals={true}
            layout="grid"
            maxItems={3}
          />
        </div>
      </section>
      
      {/* 6. WHO WE SUPPORT */}
      <TrustIndicatorsGrid 
        indicators={trustIndicators}
        studentImages={studentImages}
      />
      
      {/* 7. WHAT WE OFFER - CLIENT COMPONENT WRAPPER */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Client component for interactive sections */}
      {/* CLIENT WRAPPER REASON: Official Next.js documentation requires client components for useState hooks */}
      <HomepageSections 
        services={[...services]}
        studentImages={Object.values(studentImages)}
      />
      
      {/* 8. QUOTE SECTION */}
      {/* CONTEXT7 SOURCE: /magicui/design - Text-only quote with strategic highlighting effects */}
      {/* HIGHLIGHTER ENHANCEMENT REASON: Magic UI documentation enables visual emphasis without photos for clean, professional presentation */}
      <QuoteSection 
        quote={founderQuote.quote}
        author={founderQuote.author}
        role={founderQuote.role}
        showAuthorImage={false}
      />
      
      {/* 9. BIZSTIM CTA SECTION */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns for main CTA section */}
      {/* BIZSTIM SECTION REASON: Official React documentation enables component repositioning for improved user flow */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-4">
              Ready to Start the Conversation?
            </h2>
            <p className="text-xl text-primary-700 mb-8">
              Access our secure enquiry portal to discuss your child's educational needs
            </p>
            {/* CONTEXT7 SOURCE: /vercel/next.js - Link component wrapping Image for external navigation */}
            {/* ACCESSIBILITY REASON: Official React documentation emphasizes proper external link handling with target and rel attributes */}
            <a 
              href="https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block group"
              aria-label="Open Bizstim enquiry form in new window - secure external portal for My Private Tutor Online"
            >
              <div className="relative overflow-hidden rounded-lg border-2 border-gray-300 hover:border-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                {/* CONTEXT7 SOURCE: /vercel/next.js - Image component with proper width, height and alt for accessibility */}
                {/* IMAGE OPTIMIZATION REASON: Official Next.js documentation requires explicit dimensions for local images */}
                {/* BIZSTIM FORM UPDATE: Updated to use new bizstim-form-preview.png as per homepage CMS configuration */}
                <img
                  src="/images/graphics/bizstim-form-preview.png"
                  alt="Screenshot of My Private Tutor Online enquiry form on Bizstim platform showing student details form with fields for first name, last name, email and phone number"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Overlay for interaction feedback */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                {/* Call-to-action overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-medium text-sm">
                    Click to access secure enquiry form →
                  </p>
                </div>
              </div>
            </a>
            <p className="text-xs text-gray-500 mt-3">
              Opens in new window • Secure encrypted connection • Same trusted service
            </p>
          </div>
        </div>
      </section>
      
      {/* CONSULTATION FORM SECTION - DISABLED FOR HOMEPAGE REORGANIZATION */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns for component visibility control */}
      {/* COMMENT OUT REASON: Official React documentation shows how to disable sections while preserving code structure */}
      {/*
        ORIGINAL CONSULTATION FORM SECTION - PRESERVED FOR REFERENCE:
        
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-4">
                Ready to Start the Conversation?
              </h2>
              <p className="text-xl text-primary-700 max-w-3xl mx-auto">
                Book your confidential consultation with Elizabeth's team to discuss your child's educational needs and create a personalised tutoring plan.
              </p>
            </div>
            <LazyConsultationForm />
          </div>
        </section>
      */}
      
    </PageLayout>
  )
}

// CONTEXT7 SOURCE: /vercel/next.js - Client component architecture restoration complete
// ARCHITECTURE FIX: Restored homepage to working client component pattern - Mon Aug 19 12:07:00 PM BST 2025
