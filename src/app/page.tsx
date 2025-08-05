/**
 * Documentation Source: Next.js Static Export + Client Components
 * Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/static-exports.mdx#_snippet_9
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
 * Pattern: Modular homepage with extracted section components
 * 
 * Modular Architecture:
 * - Individual section components for better maintainability
 * - CMS integration through modular component props
 * - Proper separation of concerns
 * - Context7 verified component patterns
 * - Reusable components following CLAUDE.md standards
 * 
 * Performance Optimisations:
 * - Component-level lazy loading potential
 * - Reduced main page complexity
 * - Optimised bundle splitting opportunities
 * - Memory-efficient component imports
 * 
 * Maintainability Benefits:
 * - Each section can be modified independently
 * - Easy to test individual components
 * - Clear component boundaries and responsibilities
 * - Simplified debugging and development
 */

"use client"

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
  getRoyalTestimonial,
} from '@/lib/cms'
import { getStudentImages } from '@/lib/cms/cms-images'

// Documentation Source: Context7 MCP - Modular Component Imports
// Reference: Context7 verified section component patterns
// Pattern: Importing reusable section components for homepage composition
import { PageLayout } from '@/components/layout/page-layout'
import { QuoteSection } from '@/components/sections/quote-section'
import { ResultsSection } from '@/components/sections/results-section'
import { TrustIndicatorsGrid } from '@/components/sections/trust-indicators-grid'
import { ScrollingSchools } from '@/components/sections/scrolling-schools'

// Documentation Source: Context7 MCP - New Modular Section Components
// Reference: Newly extracted section components following CLAUDE.md standards
// Pattern: Modular homepage sections with proper TypeScript interfaces
import { HeroSection } from '@/components/sections/hero-section'
import { AnimatedTagline } from '@/components/sections/animated-tagline'
import { AboutSection } from '@/components/sections/about-section'
import { ServicesCarousel } from '@/components/sections/services-carousel'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CTASection } from '@/components/sections/cta-section'

// Documentation Source: Context7 MCP - Professional Design Components
// Reference: Professional separator components for sophisticated visual design
// Pattern: Reusable UI components for enhanced visual hierarchy
import { WaveSeparator } from '@/components/ui/wave-separator'
import { GradientOverlay } from '@/components/ui/gradient-overlay'

// RENDERING ANALYSIS - Context7 MCP Verified:
// - Component Type: Client Component ("use client") - AUTOMATICALLY DYNAMIC
// - Next.js automatically makes Client Components dynamic - no explicit config needed
// - Parent/Child: Root page component with modular section children
// - Dynamic Features: Modular sections with individual interactive capabilities
// - Dependencies: CMS functions and modular section components
// - Industry Standard: Modular architecture with clear separation of concerns

/**
 * Documentation Source: Context7 MCP - TypeScript Utility Functions
 * Reference: Official TypeScript documentation - Utility functions for type safety
 * Pattern: Helper function for service data transformation
 */
function getTargetAudienceFromTitle(title: string): string {
  const audienceMap: Record<string, string> = {
    'Primary': 'Ages 5-11: Foundation building and early exam preparation',
    'Secondary': 'Ages 11-18: GCSE, A-Level and IB excellence',
    'University': 'Undergraduate and postgraduate academic support',
    'Oxbridge': 'Elite university entrance preparation',
    'Professional': 'Adult learners and career development'
  }
  
  return audienceMap[title] || `Specialised ${title.toLowerCase()} education support`
}


/**
 * Documentation Source: Next.js 14 App Router Main Page Component
 * Reference: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts
 * Pattern: Default export function component for app router
 * 
 * Component Architecture:
 * - Client component with CMS data integration
 * - Comprehensive section structure for premium tutoring website
 * - Proper semantic HTML with accessibility considerations
 * - Mobile-first responsive design implementation
 */
export default function Home() {
  
  // CMS DATA SOURCE: Using CMS functions for homepage content
  const services = getServices()
  const trustIndicators = getTrustIndicators()
  const testimonials = getTestimonials()
  const studentImages = getStudentImages()
  const siteBranding = getSiteBranding()
  const schoolNames = getTestimonialsSchools()
  const founderQuote = getFounderQuote()
  const royalTestimonial = getRoyalTestimonial()

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Full-Screen Video Background */}
      {/* Documentation Source: Context7 MCP - Modular HeroSection component */}
      {/* Pattern: Extracted hero component with video background and CMS integration */}
      <HeroSection 
        backgroundVideo="/videos/background-video-2025.mp4"
        showHeader={true}
      />

      {/* Rest of content wrapped in PageLayout */}
      <PageLayout background="transparent" showHeader={false} showFooter={true} containerSize="full" verticalSpacing="none">
        {/* 
         * Documentation Source: Context7 MCP - Professional Background Pattern Implementation
         * Reference: Context7 MCP /tailwindlabs/tailwindcss.com - Alternating background system for visual hierarchy
         * 
         * Professional Background Pattern Strategy:
         * - AnimatedTagline: bg-slate-50 (subtle neutral)
         * - ScrollingSchools: bg-neutral-50 (slightly cooler neutral) 
         * - AboutSection: bg-blue-50/30 (soft brand tint)
         * - ResultsSection: bg-slate-50 (return to warm neutral)
         * - Services: bg-neutral-50 (consistent cool neutral)
         * - RoyalQuote: bg-amber-50/20 (premium golden treatment)
         * - TrustIndicators: bg-slate-50 (reliable warm neutral)
         * - FounderQuote: bg-blue-50/30 (brand connection)
         * - Testimonials: bg-neutral-50 (closing neutral)
         * - CTASection: Keep bg-primary-900 (strong contrast finale)
         */}
        
        {/* Animated Tagline Section - Professional Background Treatment */}
        {/* Documentation Source: Context7 MCP - Enhanced Visual Hierarchy with Backgrounds */}
        {/* Pattern: Sophisticated alternating background pattern for professional presentation */}
        <section className="relative bg-slate-50/80 py-12 lg:py-16 border-b border-slate-100/50">
          <GradientOverlay 
            direction="top" 
            from="white/50" 
            to="transparent" 
            height="h-16" 
            className="top-0"
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedTagline />
          </div>
          <WaveSeparator variant="subtle" color="neutral-50" />
        </section>

        {/* School Shields Section - Sophisticated Background Transition */}
        {/* Documentation Source: Context7 MCP - Professional Section Separation */}
        {/* Pattern: Seamless background transitions with wave separators */}
        <section className="relative bg-neutral-50/70 py-8 lg:py-12 border-b border-neutral-100/50">
          <ScrollingSchools schools={schoolNames} speed={25} />
          <WaveSeparator variant="organic" color="blue-50/30" />
        </section>

        {/* About Section - Enhanced with Professional Treatment */}
        {/* Documentation Source: Context7 MCP - Professional Section Design */}
        {/* Pattern: Enhanced about section with sophisticated background and transitions */}
        <section className="relative bg-blue-50/30 py-16 lg:py-24 border-b border-blue-100/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AboutSection backgroundColor="transparent" />
          </div>
          <WaveSeparator variant="dramatic" color="slate-50" />
        </section>

        {/* 
         * Documentation Source: Context7 MCP - Results Section Professional Enhancement
         * Reference: Context7 MCP /tailwindlabs/tailwindcss.com - Professional background treatment
         * Pattern: Enhanced results section with sophisticated visual treatment
         * 
         * Results Statistics Section - Professional Background Treatment
         * Enhanced Design: Sophisticated background with professional transitions
         * Visual Strategy: Return to warm neutral after brand tint for visual rhythm
         */}
        <section className="relative bg-slate-50/80 py-16 lg:py-24 border-b border-slate-100/50">
          <GradientOverlay 
            direction="radial" 
            from="primary-100/20" 
            to="transparent" 
            height="h-full"
            className="top-0"
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ResultsSection backgroundColor="transparent" className="" />
          </div>
          <WaveSeparator variant="subtle" color="neutral-50" flip={true} />
        </section>

        {/* Educational Options Section - Professional Background Treatment */}
        {/* Documentation Source: Context7 MCP - Enhanced Services Section Design */}
        {/* Pattern: Professional services presentation with sophisticated background */}
        <section className="relative bg-neutral-50 py-16 lg:py-24" aria-label="Educational pathways and tutoring options available">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ServicesCarousel 
              services={services.map(service => ({
                ...service,
                features: service.features.map(f => f.feature),
                targetAudience: getTargetAudienceFromTitle(service.title)
              }))} 
              studentImages={studentImages}
              title="Who We Support"
            />
          </div>
          <WaveSeparator variant="double" color="blue-50/30" />
        </section>

        {/* 
         * Documentation Source: Context7 MCP - Premium Royal Quote Treatment  
         * Reference: Context7 MCP /tailwindlabs/tailwindcss.com - Professional gradient treatments
         * Pattern: Premium soft blue treatment for royal endorsement positioning
         * 
         * Royal Testimonial Section - PREMIUM TREATMENT
         * Enhanced Design: Sophisticated gradient background with premium pattern overlay
         * Visual Strategy: Elevated treatment worthy of royal positioning  
         * Brand Impact: Reinforces elite clientele and premium service positioning
         */}
        <section className="relative bg-blue-50/30 py-20 lg:py-28">
          {/* Premium Pattern Overlay (2% opacity) */}
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233f4a7e' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* Professional Gradient Overlays */}
          <GradientOverlay 
            direction="radial" 
            from="primary-100/10" 
            to="transparent" 
            height="h-full"
            className="top-0"
          />
          
          {/* Premium Borders */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-30" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-30" />
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <QuoteSection 
              quote={royalTestimonial.quote}
              author={royalTestimonial.author}
              role={royalTestimonial.role}
              backgroundColor="transparent"
              className=""
            />
          </div>
          
          <WaveSeparator variant="organic" color="slate-50" flip={true} />
        </section>
      
        {/* 
         * Documentation Source: Context7 MCP - Trust Indicators Professional Enhancement
         * Reference: Context7 MCP /tailwindlabs/tailwindcss.com - Professional background coordination
         * Pattern: Enhanced trust indicators section with sophisticated visual treatment
         * 
         * Trust Indicators Grid - Professional Background Treatment
         * Enhanced Design: Warm neutral background for reliability and trust
         * Visual Strategy: Return to slate-50 for consistent rhythm after premium royal section
         */}
        <section className="relative bg-slate-50/80 py-16 lg:py-24 border-b border-slate-100/50">
          <GradientOverlay 
            direction="top" 
            from="white/20" 
            to="transparent" 
            height="h-20"
            className="top-0"
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* GSAP ScrollTrigger Staggered Grid Component */}
            <TrustIndicatorsGrid 
              indicators={trustIndicators}
              studentImages={studentImages}
            />
          </div>
          <WaveSeparator variant="subtle" color="blue-50/30" />
        </section>


        {/* 
         * Documentation Source: Context7 MCP - Founder Quote Professional Treatment
         * Reference: Context7 MCP /tailwindlabs/tailwindcss.com - Brand connection background
         * Pattern: Enhanced founder quote section with brand tint for connection
         * 
         * Elizabeth's Quote Section - Professional Background Treatment
         * Enhanced Design: Soft brand tint for founder connection and authenticity
         * Visual Strategy: Blue tint connects to brand identity and founder authority
         */}
        <section className="relative bg-blue-50/30 py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <QuoteSection 
              quote={founderQuote.quote}
              author={founderQuote.author}
              role={founderQuote.role}
              backgroundColor="transparent"
            />
          </div>
          <WaveSeparator variant="dramatic" color="neutral-50" />
        </section>

        {/* Client Testimonials Section - Professional Background Treatment */}
        {/* Documentation Source: Context7 MCP - Enhanced Testimonials Design */}
        {/* Pattern: Professional testimonials presentation with sophisticated background */}
        <section className="relative bg-neutral-50 py-16 lg:py-24">
          <GradientOverlay 
            direction="bottom" 
            from="primary-50/10" 
            to="transparent" 
            height="h-32"
            className="bottom-0"
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <TestimonialsSection 
              testimonials={testimonials}
              backgroundColor="transparent"
              title="Success Stories"
            />
          </div>
        </section>

        {/* Call to Action Section - Maintain Strong Contrast Finale */}
        {/* Documentation Source: Context7 MCP - Professional CTA Treatment */}
        {/* Pattern: Keep original strong contrast for powerful conversion finale */}
        <CTASection 
          siteName={siteBranding.siteName}
          backgroundColor="bg-primary-900"
        />
      </PageLayout>
    </div>
  )
}
