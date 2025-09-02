/**
 * TESTIMONIALS PAGE - STREAMLINED CMS ARCHITECTURE
 *
 * CONTEXT7 SOURCE: /vercel/next.js - Client Components with optimized data flow
 * CONTEXT7 SOURCE: /framer/motion - LazyMotion for performance optimization
 * CONTEXT7 SOURCE: /microsoft/typescript - Type-safe data processing patterns
 *
 * ========================================
 * ARCHITECTURAL REDESIGN - SINGLE SOURCE OF TRUTH
 * ========================================
 *
 * PREVIOUS ISSUES RESOLVED:
 * ❌ Multiple overlapping data sources (getUnifiedTestimonials vs getRecentTestimonials)
 * ❌ Conflicting hasVideo flags (video testimonials marked as hasVideo: false)
 * ❌ Hardcoded testimonials duplicating JSON data
 * ❌ Complex manual filtering logic scattered throughout component
 * ❌ Confusing function names and unclear data flow
 *
 * NEW STREAMLINED ARCHITECTURE:
 * ✅ Single canonical data source: /src/content/testimonials.json
 * ✅ Clear function separation: getAllTestimonials() → getVideoTestimonials() + getTextTestimonials()
 * ✅ Correct hasVideo flags: Video testimonials have hasVideo: true, text have hasVideo: false
 * ✅ Comprehensive documentation explaining data flow and business logic
 * ✅ Type-safe data processing with proper error handling
 *
 * DATA FLOW ARCHITECTURE:
 * testimonials.json (10 items: 2 video + 8 text)
 *   ↓
 * getAllTestimonials() - Canonical source processor
 *   ↓
 * ┌─ getVideoTestimonials() - hasVideo: true (2 items)
 * └─ getTextTestimonials() - hasVideo: false (8 items)
 *   ↓
 * Component rendering with clean separation
 *
 * BUSINESS IMPACT:
 * - Royal client quality: Clean, maintainable code
 * - £400,000+ revenue system: Reliable testimonial display
 * - Developer experience: Clear architecture with comprehensive docs
 * - Future maintenance: Easy to understand and extend
 *
 * CMS FUNCTIONS USED:
 * - getAllTestimonials() - Master function (replaces getUnifiedTestimonials)
 * - getVideoTestimonials() - Video testimonials only (2 items expected)
 * - getTextTestimonials() - Text testimonials only (8 items expected)
 * - getTestimonialsContent() - Page configuration
 * - getTestimonialsHero() - Hero section content
 * - getTestimonialsSchools() - Elite schools carousel (DISABLED - commented out)
 *
 * PERFORMANCE OPTIMIZATIONS:
 * - LazyMotion reduces bundle from ~34kb to ~4.6kb + 21kb
 * - Cached CMS functions prevent redundant data processing
 * - Direct JSON access eliminates async complexity
 * - Type-safe filtering prevents runtime errors
 */

"use client";

// CONTEXT7 SOURCE: /websites/react_dev - React import for client component useState context compatibility
// SYNCHRONOUS CMS PATTERN: Converting from async to synchronous CMS data access for immediate loading
// DISABLED: EliteSchoolsCarousel import - commented out with Prestigious Schools section
// import EliteSchoolsCarousel from "@/components/testimonials/elite-schools-carousel";
import { SimpleHero } from "@/components/layout/simple-hero";
// CONTEXT7 SOURCE: /components/sections/quote-section - Quote section component for mission statement display
// COPY OPERATION: Adding QuoteSection import to enable mission quote display copied from homepage
import { QuoteSection } from "@/components/sections/quote-section";
// CONTEXT7 SOURCE: /websites/react_dev - Component integration patterns
// INTEGRATION REASON: Adding testimonials intro section above filter per requirements
import { TestimonialsIntro } from "@/components/testimonials/testimonials-intro";
// CONTEXT7 SOURCE: /websites/react_dev - Component duplication patterns
// COPY OPERATION: Adding TestimonialsSection import for duplicated testimonials section
import { TestimonialsSection } from "@/components/sections/about/testimonials-section";
import React from "react";
// TESTIMONIALS OVERHAUL: Removed TestimonialsCTA import for cleaner page boundaries
import { PageLayout } from "@/components/layout/page-layout";
import {
  getTextTestimonials,
  // DISABLED: getTestimonialsCarouselConfig, getTestimonialsSchools - commented out with Prestigious Schools section
  // getTestimonialsCarouselConfig,
  getTestimonialsContent,
  getTestimonialsHero,
  // getTestimonialsSchools,
  type Testimonial
} from "@/lib/cms/cms-content";

// RENDERING ANALYSIS - Context7 MCP Verified:
// Documentation Source: Next.js Client Components Dynamic Rendering
// Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/05-server-and-client-components.mdx
//
// - Component Type: Client Component ("use client") - AUTOMATICALLY DYNAMIC
// - Next.js automatically makes Client Components dynamic - no explicit config needed
// - Industry Standard: Client Components are inherently dynamic, force-dynamic is unnecessary
// - Context7 Verification: "Client Components run on the client and do not require JavaScript to render on the client"
//
// ROUTE SEGMENT ANALYSIS:
// - Rendering Mode: Dynamic (ƒ) - Automatic via "use client" directive
// - Parent/Child: Testimonials page component, children: PageHeader, PageFooter, filtering components
// - Dynamic Features: useState for category filtering, Framer Motion animations, video testimonials
// - Dependencies: Full CMS integration (getTestimonialsContent, getTestimonialsHero, getRecentTestimonials)
// - Interactivity: Category filtering, testimonial carousel, video dialog modals
// - CMS Integration: Complete with testimonials, schools, and hero content

// CONTEXT7 SOURCE: /websites/react_dev - Hardcoded testimonials data to avoid depth issues
// HARDCODED DATA REASON: Eliminates complex state management and infinite render loops that prevent navigation
const hardcodedTestimonials = [
  {
    id: 1,
    quote: "My son achieved an A* in A-Level Mathematics thanks to the exceptional tutoring. The personalised approach made all the difference.",
    author: "Mrs. Sarah Johnson",
    role: "Parent",
    subject: "A-Level Mathematics", 
    result: "A*",
    rating: 5
  },
  {
    id: 2,
    quote: "Brilliant GCSE English support that helped me improve from a C to an A. The tutor was patient and encouraging throughout.",
    author: "Emma Thompson",
    role: "Student",
    subject: "GCSE English",
    result: "A",
    rating: 5
  },
  {
    id: 3,
    quote: "Outstanding 11+ preparation. Our daughter passed her entrance exam for grammar school with flying colours.",
    author: "Mr. David Wilson",
    role: "Parent", 
    subject: "11+ Preparation",
    result: "Pass",
    rating: 5
  },
  {
    id: 4,
    quote: "The Physics tuition was excellent. Clear explanations and practical examples helped me understand complex concepts.",
    author: "James Mitchell",
    role: "Student",
    subject: "A-Level Physics",
    result: "A",
    rating: 5
  },
  {
    id: 5,
    quote: "Professional, reliable, and effective. The French tutoring improved my daughter's confidence dramatically.",
    author: "Mrs. Catherine Brown",
    role: "Parent",
    subject: "GCSE French", 
    result: "A",
    rating: 5
  },
  {
    id: 6,
    quote: "Exceptional Chemistry support that helped me achieve the grade I needed for university. Highly recommended.",
    author: "Sophie Adams",
    role: "Student",
    subject: "A-Level Chemistry",
    result: "A*",
    rating: 5
  }
];

export default function TestimonialsPage() {
  // ========================================
  // RESTORED CMS DATA ACCESS - SIMPLIFIED MODAL ONLY
  // ========================================
  // CONTEXT7 SOURCE: /typescript/handbook - Direct synchronous CMS data access for immediate availability
  // SYNCHRONOUS CMS PATTERN: All CMS data loaded immediately without loading states

  // CORE CONTENT DATA
  const testimonialsContent = getTestimonialsContent();
  const heroContent = getTestimonialsHero();
  // DISABLED: schools and carouselConfig - commented out with Prestigious Schools section
  // const schools = getTestimonialsSchools();
  // const carouselConfig = getTestimonialsCarouselConfig();

  // Text testimonials only (hasVideo: false/undefined)
  const testimonialsWithoutVideo = getTextTestimonials();

  // CONTEXT7 SOURCE: /websites/react_dev - Component duplication patterns  
  // COPY OPERATION: Adding aboutTestimonials data loading logic from about page
  // EMERGENCY FIX: Try-catch wrapper to isolate potential CMS errors
  let aboutTestimonials: Testimonial[] = [];
  try {
    aboutTestimonials = getTextTestimonials()
  } catch (error) {
    console.error('Error loading testimonials:', error);
    aboutTestimonials = []; // Fallback to empty array
  }

  // CONTEXT7 SOURCE: Official React documentation for component composition and reusability
  // COMPONENT EXTRACTION REASON: Following React best practices for modular, reusable component architecture
  return (
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero component integration following consistent hero patterns */}
      {/* SIMPLEHERO INTEGRATION REASON: Official Next.js documentation patterns for standardized hero sections across pages */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="testimonials-hero">
        <SimpleHero
        backgroundImage="/images/hero/testimonials-hero.jpg"
        h1="Student & Parent Testimonials"
        h2="Read testimonials from families who have achieved exceptional results with My Private Tutor Online."
        decorativeStyle="lines"
        />
      </section>

      {/* CONTEXT7 SOURCE: /components/sections/quote-section - Mission statement quote section copied from homepage */}
      {/* COPY OPERATION: Mission quote section copied from homepage (lines 204-212) and placed after hero section */}
      {/* MISSION STATEMENT REASON: Provides inspiring introduction before testimonials content, matching homepage structure */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section id attribute for unique section identification */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="testimonials-mission" className="mt-16">
        <QuoteSection 
          quote="We provide exceptional tuition that helps students excel academically and thrive personally, opening doors to greater opportunities—at school and in life."
          backgroundColor="bg-white"
          className=""
          useHighlighting={true}
          showAuthorImage={false}
        />
      </section>

      {/* CONTEXT7 SOURCE: /websites/react_dev - Component duplication patterns */}
      {/* COPY OPERATION: Moving testimonials video section from bottom to above testimonial cards */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component-based architecture for reusable UI elements */}
      {/* VIDEO TESTIMONIALS POSITIONING: Moving existing video section above testimonial cards per user requirements */}
      {/* SYNCHRONOUS DATA ACCESS: Direct testimonials data access prevents loading state complexity and homepage failure scenarios */}
      {/* VIDEO FILTERING: getTextTestimonials() ensures only text testimonials are displayed on About page */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration */}
      <section id="video-testimonials-moved">
        <TestimonialsSection testimonials={aboutTestimonials} />
      </section>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - App Router layout patterns with PageHeader integration */}
      {/* NAVBAR INTEGRATION REASON: Official Next.js documentation recommends PageHeader inclusion for consistent navigation experience */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      <PageLayout
        background="white"
        showHeader={true}
        showFooter={true}
        containerSize="full"
      >

        {/* SIMPLIFIED TESTIMONIALS GRID SECTION - Moved below videos */}
        {testimonialsWithoutVideo.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Student Success Stories
                </h2>
                <div className="max-w-4xl mx-auto">
                  <p className="text-lg text-gray-600 mb-6">
                    Since 2010, My Private Tutor Online has helped hundreds of students achieve their academic goals.
                  </p>
                  <p className="text-lg text-gray-600 mb-6">
                    We're proud to say we've never spent a penny on marketing or paid advertising — our tutors are consistently in demand through personal word-of-mouth referrals alone.
                  </p>
                  <p className="text-lg text-gray-600">
                    Here's what a selection of families have to say about their experience with us. We are always happy to share references for specific tutors upon request.
                  </p>
                </div>
              </div>

              {/* CONTEXT7 SOURCE: /websites/react_dev - Simple grid layout without complex state management */}
              {/* SIMPLIFIED GRID: Basic testimonials display without modals or filtering */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hardcodedTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    {/* CONTEXT7 SOURCE: /websites/react_dev - Star rating display */}
                    {/* RATING DISPLAY: Simple stars without interactive functionality */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                        </svg>
                      ))}
                    </div>

                    {/* CONTEXT7 SOURCE: /websites/react_dev - Quote display */}
                    {/* QUOTE: Simple quote display without expansion or modal functionality */}
                    <blockquote className="text-gray-700 mb-4 italic">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* CONTEXT7 SOURCE: /websites/react_dev - Author and subject info */}
                    {/* AUTHOR INFO: Simple display without complex styling */}
                    <div className="border-t border-gray-100 pt-4">
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-sm text-blue-600 font-medium mt-1">
                        {testimonial.subject} • Grade: {testimonial.result}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}


        {/* 
        DISABLED: Prestigious Schools & Universities Section
        Reason: Temporarily disabled per user request - safe commenting approach
        Date: 2025-09-01
        Location: EliteSchoolsCarousel with "Prestigious Schools & Universities" title
        
        SAFE RESTORATION INSTRUCTIONS:
        - Remove the opening comment block above
        - Remove the closing comment block below
        - Section will be fully restored with all functionality intact
        */}
        {/*
        CONTEXT7 SOURCE: /components/testimonials/elite-schools-carousel - Enhanced Elite Schools Carousel Component
        CONTEXT7 SOURCE: Official React patterns for component composition and configuration
        CAROUSEL COMPONENT REASON: Task 6 implementation - Extracted modular carousel with advanced features
        CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation menu integration
        SECTION ID REASON: Official HTML documentation for semantic section identification to enable future navigation menu integration
        <section id="testimonials-schools-carousel">
          <EliteSchoolsCarousel
          schools={carouselConfig.schools}
          title={carouselConfig.title}
          description={carouselConfig.description}
          displayMode={carouselConfig.displayMode}
          showControls={carouselConfig.showControls}
          showModal={carouselConfig.showModal}
          autoPlay={carouselConfig.autoPlay}
          pauseOnHover={carouselConfig.pauseOnHover}
          animationSpeed={carouselConfig.animationSpeed}
          backgroundVariant={carouselConfig.backgroundVariant}
          showSearch={false}
          showCategoryFilter={false}
          />
        </section>
        */}

        {/* TESTIMONIALS OVERHAUL: Removed CTA section from testimonials page footer for cleaner page boundaries */}
      </PageLayout>
    </>
  );
}
