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

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Quote request form integration
// LAYOUT RESTORATION REASON: Import QuoteRequestForm for restored original quote section functionality
import { QuoteRequestForm } from '@/components/forms/quote-request-form'

// CONTEXT7 SOURCE: /reactjs/react.dev - Comprehensive debugging system integration
// DEBUG SYSTEM REASON: Official React and Tailwind CSS patterns for visual debugging and development tools
import { 
  DebugSection,
  DebugContainer,
  DebugComponent,
  DebugOverlay,
  debugHelpers
} from '@/lib/debug'

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
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - React state management patterns
 * IMPLEMENTATION REASON: Official React documentation recommends useState for component state management
 * Pattern: Simple state toggle for interactive quote section visibility
 */
import { useState } from 'react'


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
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - React useState for interactive components
  // IMPLEMENTATION REASON: Official React patterns for component state management
  const [showQuoteForm, setShowQuoteForm] = useState(false)
  
  // CMS DATA SOURCE: Using CMS functions for homepage content
  const services = getServices()
  const trustIndicators = getTrustIndicators()
  const testimonials = getTestimonials()
  const studentImages = getStudentImages()
  const siteBranding = getSiteBranding()
  const schoolNames = getTestimonialsSchools()
  const founderQuote = getFounderQuote()
  const royalTestimonial = getRoyalTestimonial()

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Event handler patterns
  // IMPLEMENTATION REASON: Standard React event handling for interactive functionality
  const toggleQuoteForm = () => {
    setShowQuoteForm(!showQuoteForm)
  }

  return (
    <>
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Debug overlay for development visibility */}
      {/* DEBUG OVERLAY REASON: Official React patterns for development debugging interface */}
      <DebugOverlay />
      
      <div className="overflow-x-hidden" {...debugHelpers.attrs('landing-page-root', 'homepage')}>
      {/* Hero Section with Full-Screen Video Background */}
      {/* Documentation Source: Context7 MCP - Modular HeroSection component */}
      {/* Pattern: Extracted hero component with video background and CMS integration */}
      <DebugSection 
        id="hero-section" 
        label="Hero Section"
        description="Full-screen video background with header and call-to-action"
      >
        <HeroSection 
          backgroundVideo="/videos/background-video-2025.mp4"
          showHeader={true}
        />
      </DebugSection>

      {/* Rest of content wrapped in PageLayout */}
      <DebugComponent 
        name="Page Layout" 
        props={{ background: "transparent", showHeader: false, showFooter: true, containerSize: "full", verticalSpacing: "none" }}
        showProps={true}
      >
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
        
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component wrapper cleanup patterns */}
        {/* WRAPPER REMOVAL REASON: Official React documentation patterns for component cleanup - removing all wrapper elements around AnimatedTagline per user requirement */}
        {/* CLEANUP STRATEGY: Following React best practices for component simplification by removing unnecessary container elements, debug wrappers, and styling layers */}
        <AnimatedTagline />

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component simplification and wrapper removal patterns */}
        {/* WRAPPER REMOVAL REASON: Official React component cleanup patterns for removing all debugging wrappers */}
        {/* IMPLEMENTATION REASON: Clean component usage following React best practices without unnecessary container elements */}
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component cleanup and removal patterns */}
        {/* SEPARATOR REMOVAL REASON: Official React documentation component simplification patterns for cleaner layout */}
        {/* IMPLEMENTATION REASON: Removing WaveSeparator component to maintain clean single-line scrolling schools display */}
        <ScrollingSchools schools={schoolNames} speed={25} />


        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component cleanup and wrapper removal patterns */}
        {/* WRAPPER REMOVAL REASON: Official React documentation component simplification patterns for removing all debugging wrappers, section containers, and wave separators */}
        {/* IMPLEMENTATION REASON: Clean component usage following React best practices without unnecessary container elements */}
        <AboutSection backgroundColor="transparent" />

        {/* 
         * Documentation Source: Context7 MCP - Results Section Professional Enhancement
         * Reference: Context7 MCP /tailwindlabs/tailwindcss.com - Professional background treatment
         * Pattern: Enhanced results section with sophisticated visual treatment
         * 
         * Results Statistics Section - Professional Background Treatment
         * Enhanced Design: Sophisticated background with professional transitions
         * Visual Strategy: Return to warm neutral after brand tint for visual rhythm
         */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full width section patterns */}
        {/* FULL WIDTH REASON: Remove mx-*, px-*, ml-*, mr-*, pl-*, pr-* for complete edge-to-edge coverage */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Direct child structure for full width filling */}
        {/* LAYOUT FIX REASON: Removed container wrapper and intermediate divs that prevent full width coverage */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding removal for zero vertical spacing */}
        {/* PADDING REMOVAL REASON: Official Tailwind CSS documentation py-*, pt-*, pb-* utilities removed for zero vertical padding */}
        <section className="relative bg-slate-50/80 border-b border-slate-100/50 w-full">
          <GradientOverlay 
            direction="radial" 
            from="primary-100/20" 
            to="transparent" 
            height="h-full"
            className="top-0"
          />
          <ResultsSection backgroundColor="transparent" className="" />
          <WaveSeparator variant="subtle" color="neutral-50" flip={true} />
        </section>

        {/* Educational Options Section - Professional Background Treatment */}
        {/* Documentation Source: Context7 MCP - Enhanced Services Section Design */}
        {/* Pattern: Professional services presentation with sophisticated background */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full width section patterns */}
        {/* FULL WIDTH REASON: Remove mx-*, px-*, ml-*, mr-*, pl-*, pr-* for complete edge-to-edge coverage */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding removal for zero vertical spacing */}
        {/* PADDING REMOVAL REASON: Official Tailwind CSS documentation py-*, pt-*, pb-* utilities removed for zero vertical padding */}
        <DebugSection 
          id="section-e" 
          label="Services Carousel Section"
          description="Educational pathways and tutoring options with interactive carousel"
          backgroundColor="neutral-50"
          showMetrics={true}
        >
          <section className="relative bg-neutral-50 w-full" aria-label="Educational pathways and tutoring options available">
            <DebugContainer id="container-services" type="container">
              <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <DebugContainer id="container-services-content" type="content">
                  <div className="relative w-full">
                    <DebugComponent 
                      name="Services Carousel" 
                      props={{
                        servicesCount: services.length,
                        title: "Who We Support",
                        hasStudentImages: !!studentImages
                      }}
                      showProps={true}
                    >
                      <ServicesCarousel 
                        services={services.map(service => ({
                          ...service,
                          features: service.features.map(f => f.feature),
                          targetAudience: getTargetAudienceFromTitle(service.title)
                        }))} 
                        studentImages={studentImages}
                        title="Who We Support"
                      />
                    </DebugComponent>
                  </div>
                </DebugContainer>
              </div>
            </DebugContainer>
            <DebugComponent name="Wave Separator" props={{ variant: "double", color: "blue-50/30" }}>
              <WaveSeparator variant="double" color="blue-50/30" />
            </DebugComponent>
          </section>
        </DebugSection>

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
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full width section patterns */}
        {/* FULL WIDTH REASON: Remove mx-*, px-*, ml-*, mr-*, pl-*, pr-* for complete edge-to-edge coverage */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Direct child structure and reduced padding */}
        {/* LAYOUT FIX REASON: Removed container wrapper, reduced excessive py-20 lg:py-28 padding to normal py-16 lg:py-24 */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding removal for zero vertical spacing */}
        {/* PADDING REMOVAL REASON: Official Tailwind CSS documentation py-*, pt-*, pb-* utilities removed for zero vertical padding */}
        <DebugSection 
          id="section-f" 
          label="Royal Testimonial Section"
          description="Premium royal endorsement with sophisticated gradient background"
          backgroundColor="blue-50/30"
          showMetrics={true}
        >
          <section className="relative bg-blue-50/30  w-full">
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Debug label positioning system */}
            
            {/* Premium Pattern Overlay (2% opacity) */}
            <DebugComponent name="Pattern Overlay" props={{ opacity: "0.02", backgroundSize: "60px" }}>
              <div 
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233f4a7e' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: '60px 60px'
                }}
              />
            </DebugComponent>
            
            {/* Professional Gradient Overlays */}
            <DebugComponent name="Gradient Overlay" props={{ direction: "radial", from: "primary-100/10" }}>
              <GradientOverlay 
                direction="radial" 
                from="primary-100/10" 
                to="transparent" 
                height="h-full"
                className="top-0"
              />
            </DebugComponent>
            
            {/* Premium Borders */}
            <DebugContainer id="container-royal-borders" type="decorative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-30" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent opacity-30" />
            </DebugContainer>
            
            <DebugComponent 
              name="Royal Quote Section" 
              props={{
                quote: royalTestimonial.quote.substring(0, 50) + "...",
                author: royalTestimonial.author,
                role: royalTestimonial.role,
                backgroundColor: "transparent"
              }}
              showProps={true}
            >
              <QuoteSection 
                quote={royalTestimonial.quote}
                author={royalTestimonial.author}
                role={royalTestimonial.role}
                backgroundColor="transparent"
                className=""
              />
            </DebugComponent>
            
            <DebugComponent name="Wave Separator" props={{ variant: "organic", color: "slate-50", flip: true }}>
              <WaveSeparator variant="organic" color="slate-50" flip={true} />
            </DebugComponent>
          </section>
        </DebugSection>
      
        {/* 
         * Documentation Source: Context7 MCP - Trust Indicators Professional Enhancement
         * Reference: Context7 MCP /tailwindlabs/tailwindcss.com - Professional background coordination
         * Pattern: Enhanced trust indicators section with sophisticated visual treatment
         * 
         * Trust Indicators Grid - Professional Background Treatment
         * Enhanced Design: Warm neutral background for reliability and trust
         * Visual Strategy: Return to slate-50 for consistent rhythm after premium royal section
         */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full width section patterns */}
        {/* FULL WIDTH REASON: Remove mx-*, ml-*, mr-* for complete edge-to-edge coverage */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Horizontal padding restoration for content spacing */}
        {/* PADDING RESTORATION REASON: Official Tailwind CSS documentation px-* utilities restored for proper horizontal content spacing while maintaining zero vertical padding */}
        <DebugSection 
          id="section-g" 
          label="Trust Indicators Grid Section"
          description="Professional trust indicators and achievements with GSAP animations"
          backgroundColor="slate-50/80"
          showMetrics={true}
        >
          <section className="relative bg-slate-50/80 border-b border-slate-100/50  w-full px-4 sm:px-6 lg:px-8">
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Debug label positioning system */}
            <DebugComponent name="Gradient Overlay" props={{ direction: "top", from: "white/20", height: "h-20" }}>
              <GradientOverlay 
                direction="top" 
                from="white/20" 
                to="transparent" 
                height="h-20"
                className="top-0"
              />
            </DebugComponent>
            
            {/* GSAP ScrollTrigger Staggered Grid Component */}
            <DebugComponent 
              name="Trust Indicators Grid" 
              props={{
                indicatorsCount: trustIndicators.length,
                hasStudentImages: !!studentImages,
                animationType: "GSAP ScrollTrigger"
              }}
              showProps={true}
            >
              <TrustIndicatorsGrid 
                indicators={trustIndicators}
                studentImages={studentImages}
              />
            </DebugComponent>
            
            <DebugComponent name="Wave Separator" props={{ variant: "subtle", color: "blue-50/30" }}>
              <WaveSeparator variant="subtle" color="blue-50/30" />
            </DebugComponent>
          </section>
        </DebugSection>


        {/* 
         * Documentation Source: Context7 MCP - Founder Quote Professional Treatment
         * Reference: Context7 MCP /tailwindlabs/tailwindcss.com - Brand connection background
         * Pattern: Enhanced founder quote section with brand tint for connection
         * 
         * Elizabeth's Quote Section - Professional Background Treatment
         * Enhanced Design: Soft brand tint for founder connection and authenticity
         * Visual Strategy: Blue tint connects to brand identity and founder authority
         */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full width section patterns */}
        {/* FULL WIDTH REASON: Remove mx-*, px-*, ml-*, mr-*, pl-*, pr-* for complete edge-to-edge coverage */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Direct child structure for full width filling */}
        {/* LAYOUT FIX REASON: Removed container wrapper and intermediate divs that prevent H.1 full width coverage */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding removal for zero vertical spacing */}
        {/* PADDING REMOVAL REASON: Official Tailwind CSS documentation py-*, pt-*, pb-* utilities removed for zero vertical padding */}
        <DebugSection 
          id="section-h" 
          label="Founder Quote Section"
          description="Elizabeth's quote with brand tint for authenticity and connection"
          backgroundColor="blue-50/30"
          showMetrics={true}
        >
          <section className="relative bg-blue-50/30  w-full">
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Debug label positioning system */}
            <DebugComponent 
              name="Founder Quote Section" 
              props={{
                quote: founderQuote.quote.substring(0, 50) + "...",
                author: founderQuote.author,
                role: founderQuote.role,
                backgroundColor: "transparent"
              }}
              showProps={true}
            >
              <QuoteSection 
                quote={founderQuote.quote}
                author={founderQuote.author}
                role={founderQuote.role}
                backgroundColor="transparent"
              />
            </DebugComponent>
            
            <DebugComponent name="Wave Separator" props={{ variant: "dramatic", color: "neutral-50" }}>
              <WaveSeparator variant="dramatic" color="neutral-50" />
            </DebugComponent>
          </section>
        </DebugSection>

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Section removal for layout optimization */}
        {/* LAYOUT FIX REASON: Section I (TestimonialsSection) completely removed as requested */}

        {/* Original Quote Section - Restored with Dropdown Functionality */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Simple dropdown pattern for progressive disclosure */}
        {/* LAYOUT RESTORATION REASON: Restored original simple quote section design with dropdown button functionality */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full width section patterns */}
        {/* FULL WIDTH REASON: Remove mx-*, px-*, ml-*, mr-*, pl-*, pr-* for complete edge-to-edge coverage */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding removal for zero vertical spacing */}
        {/* PADDING REMOVAL REASON: Official Tailwind CSS documentation py-*, pt-*, pb-* utilities removed for zero vertical padding */}
        <DebugSection 
          id="section-j" 
          label="Quote Request Form Section"
          description="Interactive quote request with progressive disclosure and form functionality"
          backgroundColor="slate-100"
          showMetrics={true}
        >
          <section className="relative bg-slate-100  w-full">
            
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Centered content with proper container structure */}
            {/* CONTAINER REASON: Using container for content centering since this section needs contained width unlike full-width sections */}
            <DebugContainer id="container-quote-form" type="container">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <DebugContainer id="container-quote-content" type="content">
                  <div className="max-w-4xl mx-auto text-center">
                    <DebugComponent 
                      name="Quote Section Header" 
                      props={{ 
                        title: "Ready to Start Your Child's Educational Journey?",
                        hasDescription: true
                      }}
                    >
                      <h2 className="text-3xl font-bold text-primary-900 mb-6">
                        Ready to Start Your Child's Educational Journey?
                      </h2>
                      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Request a personalised quote for premium tutoring services tailored to your child's academic needs and goals.
                      </p>
                    </DebugComponent>
                    
                    {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Button with dropdown functionality */}
                    {/* IMPLEMENTATION REASON: Simple toggle button for progressive disclosure of quote form */}
                    <DebugComponent 
                      name="Toggle Quote Button" 
                      props={{
                        isExpanded: showQuoteForm,
                        toggleFunction: "toggleQuoteForm",
                        hasAnimation: true
                      }}
                      showProps={true}
                    >
                      <button 
                        onClick={toggleQuoteForm}
                        className="inline-flex items-center px-8 py-4 bg-accent-600 text-white font-semibold rounded-lg hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl"
                        aria-expanded={showQuoteForm}
                        aria-controls="quote-form-container"
                      >
                        <span>{showQuoteForm ? 'Hide Quote Form' : 'Get Your Personalised Quote'}</span>
                        <svg 
                          className={`ml-2 h-5 w-5 transition-transform duration-200 ${showQuoteForm ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </DebugComponent>
                    
                    {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Progressive disclosure with smooth transitions */}
                    {/* ANIMATION REASON: Smooth expand/collapse animation for better user experience */}
                    {showQuoteForm && (
                      <DebugComponent 
                        name="Quote Request Form" 
                        props={{
                          compact: true,
                          isVisible: showQuoteForm,
                          hasAnimation: true
                        }}
                        showProps={true}
                      >
                        <div 
                          id="quote-form-container"
                          className="mt-12 animate-in slide-in-from-top-4 duration-300"
                        >
                          <QuoteRequestForm compact={true} />
                        </div>
                      </DebugComponent>
                    )}
                  </div>
                </DebugContainer>
              </div>
            </DebugContainer>
          </section>
        </DebugSection>

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Section removal for layout optimization */}
        {/* LAYOUT FIX REASON: Section K (CTASection) completely removed as requested */}
        </PageLayout>
      </DebugComponent>
      </div>
    </>
  )
}
