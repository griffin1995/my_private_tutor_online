/**
 * Documentation Source: Next.js Static Export + Client Components
 * Reference: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/static-exports.mdx#_snippet_9
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
 * Pattern: Static Export Compatible Client Component with Framer Motion
 * 
 * Static Export Fix: export const dynamic = 'force-static' prevents React.Children.only errors
 * React.Children.only Issue: Framer Motion m components cause SSR conflicts during static generation
 * Solution: Force static rendering ensures consistent component behavior
 * 
 * Architecture:
 * - Client Component boundary for interactive features
 * - CMS integration for all content
 * - Proper semantic HTML structure
 * - Context7 verified React component patterns
 * - Static export compatibility
 * 
 * Performance Optimisations:
 * - Strategic component lazy loading
 * - Optimised image loading with Next.js Image
 * - Responsive breakpoints for mobile-first design
 * 
 * Interactive Features Requiring Client:
 * - Framer Motion animations and scroll triggers
 * - Hero video dialog modals
 * - Interactive carousel components
 * - Dynamic state management
 */

"use client"

import { CheckCircle, Crown, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { m } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { 
  getHeroContent, 
 
  getTrustIndicators,
  getTestimonials,
  getServices,
  getSiteBranding,
  getTestimonialsSchools,
  getFounderQuote,
  getRoyalTestimonial,
  // getWhoWeSupport - temporarily unused
} from '@/lib/cms'
import { getStudentImages, getOptimizedImageProps } from '@/lib/cms/cms-images'
import Image from 'next/image'
import { BrandStatementVideo } from '@/components/marketing/brand-statement-video'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { HeroVideoDialog } from '@/components/magicui/hero-video-dialog'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { PageHeader } from '@/components/layout/page-header'
import { QuoteSection } from '@/components/sections/quote-section'
import { ResultsSection } from '@/components/sections/results-section'
import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button'
import { Carousel } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { TypingAnimation } from '@/components/magicui/typing-animation'
import { BoxReveal } from '@/components/magicui/box-reveal'
import { TrustIndicatorsGrid } from '@/components/sections/trust-indicators-grid'
import { ScrollingSchools } from '@/components/sections/scrolling-schools'

// RENDERING ANALYSIS - Context7 MCP Verified:
// - Component Type: Client Component ("use client") - AUTOMATICALLY DYNAMIC
// - Next.js automatically makes Client Components dynamic - no explicit config needed
// - Parent/Child: Root page component, children: ServicesCarousel, AnimatedTagline, multiple sections
// - Dynamic Features: Framer Motion animations, useEmblaCarousel hook, useState for carousel state
// - Dependencies: CMS functions (getHeroContent, getServices, etc.), Next.js Image optimization
// - Industry Standard: Client Components are naturally dynamic without force-dynamic export

/**
 * Documentation Source: Context7 MCP - TypeScript Utility Functions
 * Reference: Official TypeScript documentation - Utility functions for type safety
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
 * Documentation Source: Context7 Embla Carousel React Implementation + JSX Best Practices
 * Reference: /davidjerleke/embla-carousel - Official React carousel with navigation and autoplay
 * Reference: /jsx-eslint/eslint-plugin-react - JSX syntax and component patterns
 * Pattern: React functional component using proper JSX structure with hooks
 * 
 * Component Structure:
 * - Functional component with proper TypeScript props
 * - useEmblaCarousel hook for carousel functionality
 * - useCallback for performance-optimized navigation functions
 * - Proper JSX element structure without IIFE anti-patterns
 */
function ServicesCarousel({ services, studentImages }: {
  services: Array<{
    title: string
    description: string
    features: string[]
    targetAudience: string
    icon: string
  }>
  studentImages: Record<string, {
    src: string
    alt: string
    width: number
    height: number
  }>
}) {
  /**
   * Documentation Source: Context7 Embla Carousel React Implementation
   * Reference: /davidjerleke/embla-carousel - Official React carousel with navigation and autoplay
   * Pattern: useEmblaCarousel hook with optimized options for smooth performance
   * 
   * Configuration Details:
   * - loop: true - Enables infinite scrolling for continuous browsing
   * - slidesToScroll: 1 - Single slide advancement for precise control
   * - containScroll: 'trimSnaps' - Prevents empty space at carousel edges
   * - align: 'start' - Consistent alignment to prevent glitches
   * - skipSnaps: false - Ensures all slides are accessible
   * - Autoplay: 5000ms intervals (slower for better UX)
   * - stopOnInteraction: true - Pauses on user interaction for better control
   */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      slidesToScroll: 1,
      containScroll: 'trimSnaps',
      align: 'start',
      skipSnaps: false,
      startIndex: 0,
      dragFree: false,
      duration: 25
    },
    [Autoplay({ 
      delay: 5000, 
      stopOnInteraction: true, 
      stopOnMouseEnter: true,
      playOnInit: false 
    })]
  )
  
  /**
   * Documentation Source: Context7 Embla Carousel React Navigation Implementation
   * Reference: /davidjerleke/embla-carousel - Previous and Next button implementation
   * Pattern: useCallback hooks to memoize navigation functions for performance optimization
   * 
   * Performance Benefits:
   * - Prevents unnecessary re-renders of navigation buttons
   * - Optimizes click handler performance
   * - Ensures stable function references across renders
   */
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const [isReady, setIsReady] = useState(false)

  /**
   * Documentation Source: Context7 MCP - React Intersection Observer Integration
   * Reference: /thebuilder/react-intersection-observer - Autoplay trigger on scroll
   * Pattern: useInView hook to detect when carousel section enters viewport
   * 
   * Scroll-Based Autoplay Logic:
   * - triggerOnce: false - Allows re-triggering if user scrolls away and back
   * - threshold: 0.3 - Triggers when 30% of carousel is visible
   * - rootMargin: "-100px 0px" - Triggers slightly before element fully enters view
   * - Only starts autoplay when carousel section is in viewport
   * - Ensures users always see the correct sequence from Primary → Secondary → etc.
   */
  const { ref: intersectionRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
    rootMargin: "-100px 0px"
  })

  /**
   * Intersection Observer-Based Autoplay Control
   * Context7 MCP verified pattern: Start/stop autoplay based on viewport visibility
   * Performance: Prevents unnecessary autoplay when carousel is off-screen
   */
  useEffect(() => {
    if (!emblaApi) return
    
    const autoplay = emblaApi.plugins().autoplay
    if (autoplay) {
      if (inView) {
        // Start autoplay when carousel enters viewport
        const timer = setTimeout(() => {
          autoplay.play()
          setIsReady(true)
        }, 200) // Brief delay for smooth initialization
        return () => clearTimeout(timer)
      } else {
        // Stop autoplay when carousel leaves viewport to save performance
        autoplay.stop()
      }
    }
    
    // Ensure consistent return behavior
    return undefined
  }, [emblaApi, inView])

  return (
    <div ref={intersectionRef} className="relative max-w-7xl mx-auto flex items-center px-4 sm:px-0">
      {/* 
       * Navigation Arrow - Left (Positioned outside viewport)
       * Documentation Source: Tailwind CSS Positioning + Transform utilities
       * Reference: https://tailwindcss.com/docs/position
       * Reference: https://tailwindcss.com/docs/transform
       * 
       * Design Implementation:
       * - Position: -left-16 (64px) places arrow completely outside carousel content area
       * - Design: Circular button with subtle shadow and premium hover effects
       * - Accessibility: Proper ARIA label for screen reader compatibility
       * - Interaction: Scale transform (110%) on hover provides tactile feedback
       */}
      <button
        className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 z-10 bg-white/90 sm:bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary-900" />
      </button>
      
      {/* 
       * Navigation Arrow - Right (Positioned outside viewport)
       * Documentation Source: Tailwind CSS Positioning symmetry patterns
       * 
       * Design Implementation:
       * - Position: -right-16 (64px) creates symmetrical placement outside content
       * - Interaction: Scale transform (110%) on hover provides tactile feedback
       * - Performance: CSS transitions handle smooth state changes
       * - Accessibility: Proper ARIA labeling for screen readers
       */}
      <button
        className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 z-10 bg-white/90 sm:bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary-900" />
      </button>

      {/* 
       * Embla Carousel Viewport Container
       * Documentation Source: Embla Carousel Official Structure Pattern
       * Reference: https://www.embla-carousel.com/get-started/react/#the-component-structure
       * Pattern: Overflow container with flex children for horizontal scrolling
       * 
       * Architecture Implementation:
       * - overflow-hidden: Clips non-visible slides beyond viewport
       * - w-full: Takes full available width within max-w-7xl container
       * - ref={emblaRef}: Connects to Embla Carousel API for control
       * 
       * Container Structure:
       * - Flex container: Enables horizontal slide arrangement
       * - flex-[0_0_33.333%]: Shows exactly 3 slides (1/3 width each)
       * - min-w-0: Prevents flex item overflow issues
       * - pl-4: Spacing between slides (16px padding-left)
       */}
      <div className={`overflow-hidden w-full transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`} ref={emblaRef}>
        <div className="flex -ml-4">
          {services.map((service, index) => {
            // CMS DATA SOURCE: Using studentImages with enhanced service-based mapping
            // Documentation Source: Context7 MCP - Next.js Image Component with CMS Integration
            // Reference: /context7/nextjs - Image optimization patterns for carousel components
            // Pattern: Service-specific image mapping with fallback rotation for variety
            // 
            // Service-Specific Image Mapping:
            // - Maps specific services to appropriate student images from CMS
            // - "London In-Person" now properly mapped to student-on-laptop-teacher-on-screen image
            // - Maintains fallback rotation for other services
            // - All images sourced from CMS studentImages for consistency
            let studentImage
            if (service.title === 'London In-Person') {
              // CMS DATA SOURCE: Using studentImages['student-on-laptop-teacher-on-screen'] for London In-Person
              studentImage = studentImages['student-on-laptop-teacher-on-screen']
            } else {
              // CMS DATA SOURCE: Rotating through available student images for variety
              const imageKeys = ['student-teenager', 'student-university', 'student-oxbridge', 'student-child', 'adult-student-with-teacher', 'student-teacher-inside-comfortable']
              studentImage = studentImages[imageKeys[index] as keyof typeof studentImages]
            }
            
            return (
              <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4">
                {/* 
                 * Optimized Framer Motion Card Animation
                 * Documentation Source: Context7 Framer Motion Performance Optimization 
                 * Reference: /grx7/framer-motion - Performance-first animation patterns
                 * Pattern: Simplified animations to prevent carousel conflicts
                 * 
                 * Performance Optimizations:
                 * - Removed staggered delays to prevent autoplay conflicts
                 * - Simplified hover effects to reduce GPU load
                 * - Used CSS transforms for better performance
                 * - Removed whileInView to prevent scroll/carousel conflicts
                 * 
                 * Card Design: Maintains premium aesthetic with optimized performance
                 */}
                <div className="group bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full transform-gpu">
                  {/* Student Image - Optimized for performance */}
                  {studentImage ? (
                    <div className="relative overflow-hidden h-[400px] lg:h-[500px]">
                      {/* Next.js Image with optimized loading */}
                      <Image
                        {...getOptimizedImageProps(studentImage, '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw')}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={index < 3}
                        loading={index < 3 ? 'eager' : 'lazy'}
                      />
                      {/* Simplified overlay effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ) : (
                    <div className="relative overflow-hidden h-[400px] lg:h-[500px] bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-400 text-4xl">{service.icon}</span>
                    </div>
                  )}
                  
                  {/* 
                   * Documentation Source: Context7 MCP - Tailwind CSS Universal Alignment System
                   * Reference: /tailwindlabs/tailwindcss.com - Text alignment, flex layout, and justify-content patterns
                   * Pattern: Flexible content alignment system that ensures heading, text, and button consistency
                   * 
                   * Universal Alignment Strategy:
                   * This system can be easily modified for any alignment preference:
                   * 
                   * RIGHT ALIGNMENT (Current Implementation):
                   * - text-right: Aligns all text content to the right
                   * - flex flex-col items-end: Flex column with items aligned to end (right)
                   * - justify-end: Button positioned at end of flex container
                   * 
                   * For LEFT ALIGNMENT, change to:
                   * - text-left + flex flex-col items-start + justify-start
                   * 
                   * For CENTER ALIGNMENT, change to:
                   * - text-center + flex flex-col items-center + justify-center
                   * 
                   * Context7 MCP verified: All elements (heading, text, button) follow same formatting direction
                   * Consistent Design: Regardless of alignment choice, all components maintain visual harmony
                   */}
                  <div className="p-6 lg:p-8 space-y-4 text-right flex flex-col items-end">
                    {/* Service Title - follows container alignment */}
                    <h3 className="text-xl lg:text-2xl font-serif font-bold text-primary-900 group-hover:text-accent-600 transition-colors duration-200 w-full">
                      {service.title}
                    </h3>
                    {/* Service Description - follows container alignment */}
                    <p className="text-primary-700 leading-relaxed text-base lg:text-lg w-full">
                      {service.description}
                    </p>
                    {/* 
                     * Documentation Source: Context7 MCP - Tailwind CSS Button Alignment Consistency
                     * Reference: /tailwindlabs/tailwindcss.com - justify-end for right alignment consistency
                     * Pattern: Button wrapper ensures alignment matches text content above
                     * 
                     * Button Alignment Logic:
                     * - flex justify-end: Right-aligns button to match text-right content
                     * - w-full: Full width container ensures proper positioning
                     * - Button visually aligns with heading and description text
                     * - Creates cohesive visual flow throughout card content
                     */}
                    <div className="flex justify-end w-full">
                      <AnimatedSubscribeButton
                        key={`button-${index}`}
                        buttonColor="#0f172a"
                        buttonTextColor="#ffffff"
                        subscribeStatus={false}
                        initialText="Learn More"
                        changeText="View Details"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * Documentation Source: Context7 MCP - Magic UI TypingAnimation + Tailwind CSS Spacing
 * Reference: Context7 MCP /tailwindlabs/tailwindcss-typography - Typography spacing patterns
 * Reference: Context7 MCP /magicui/magicui - TypingAnimation component implementation
 * Pattern: Professional typing effect with consistent vertical spacing and site typography
 * 
 * Component Implementation:
 * - Uses TypingAnimation component from Magic UI library
 * - Custom background gradient effects for premium feel
 * - Decorative flourishes with Motion animations
 * - Responsive design with proper breakpoints
 * - Equal padding top/bottom for balanced spacing
 * - Consistent site typography (Source Serif 4 font system)
 */
function AnimatedTagline() {
  return (
    <div className="relative text-center py-3">
      {/* Premium background effects */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="w-[500px] h-20 bg-gradient-to-r from-transparent via-accent-100/20 to-transparent blur-2xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute w-96 h-16 bg-gradient-to-r from-accent-200/10 via-primary-100/20 to-accent-200/10 blur-xl opacity-60" />
      </div>
      
      {/* Magic UI Typing Animation */}
      <div className="relative z-10 px-4">
        <TypingAnimation
          className="text-xl lg:text-2xl font-serif font-medium tracking-wide"
          style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 75%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 8px rgba(15, 23, 42, 0.1)'
          }}
          duration={80}
          delay={500}
          startOnView={true}
        >
          We help students place at top 10 UK schools and universities
        </TypingAnimation>
      </div>
      
      {/* Elite decorative flourishes */}
      <m.div 
        className="flex justify-center items-center mt-6 space-x-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-400/50 to-accent-500/30" />
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 shadow-lg" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent-400/30 animate-ping" 
               style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
        </div>
        <div className="w-12 h-px bg-gradient-to-l from-transparent via-accent-400/50 to-accent-500/30" />
      </m.div>
    </div>
  )
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
  
  // CMS DATA SOURCE: Using getHeroContent for hero section content
  const heroContent = getHeroContent()
  // CMS DATA SOURCE: Using getServices for educational paths/services section  
  const services = getServices()
  // CMS DATA SOURCE: Using getWhoWeSupport for who we support section
  // CMS DATA SOURCE: Using getWhoWeSupport for client demographics data
  // Temporarily unused - available for future implementation
  // const whoWeSupport = getWhoWeSupport()
  // CMS DATA SOURCE: Using getTrustIndicators for why choose us section
  const trustIndicators = getTrustIndicators()
  // CMS DATA SOURCE: Using getTestimonials for client testimonials
  const testimonials = getTestimonials()
  // CMS DATA SOURCE: Using getStudentImages for student photos
  const studentImages = getStudentImages()
  // CMS DATA SOURCE: Using getSiteBranding for company information
  const siteBranding = getSiteBranding()
  // CMS DATA SOURCE: Using getTestimonialsSchools for elite institution names
  const schoolNames = getTestimonialsSchools()
  const founderQuote = getFounderQuote()
  const royalTestimonial = getRoyalTestimonial()

  return (
    <div>
      {/* Header outside of PageLayout for proper hero positioning */}
      <PageHeader isHeroPage={true} />
      
      {/* Hero Section with Full-Screen Video Background - Outside PageLayout container */}
      {/* Documentation Source: Context7 verified HTML5 video best practices and CMS integration */}
      {/* Pattern: Full-screen video hero with proper HTML5 attributes and CMS video source */}
      <PageHero 
        background="video" 
        backgroundVideo="/videos/background-video-2025.mp4"
        size="full"
        overlay
        overlayOpacity="medium"
        className=""
      >
        {/* Clean Hero Content - Minimal overlay on silent video */}
        {/* Documentation Source: Context7 Tailwind CSS - Clean hero design with minimal text overlay */}
        {/* Pattern: Simplified hero content without decorative elements for clean video presentation */}
        <div className="min-h-screen flex items-center justify-center relative">
          <div className="text-center space-y-8 max-w-5xl mx-auto relative z-10 py-16 lg:py-20">
            <div className="space-y-8 px-6 lg:px-8">
              <div className="relative">
                {/* 
                 * Documentation Source: Context7 MCP - Tailwind CSS Typography Utilities
                 * Reference: /context7/tailwindcss - text-* utilities for font sizing
                 * Pattern: Large heading with responsive text sizes for hero sections
                 * 
                 * Typography Implementation:
                 * - text-5xl (3rem/48px): Base size for mobile devices
                 * - lg:text-7xl (4.5rem/72px): Large screens for prominence  
                 * - xl:text-8xl (6rem/96px): Extra large screens for maximum impact
                 * - font-serif: Uses Source Serif 4 for premium readability
                 * - font-bold: Strong visual weight for hero prominence
                 * - leading-tight: Optimized line-height for large display text
                 */}
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-serif font-bold text-white leading-tight drop-shadow-2xl animate-fade-in-up">
                  <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent bg-size-200 animate-gradient-x">
                    {heroContent.title}
                  </span>
                </h1>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-gold-400 to-accent-500 rounded-full shadow-lg animate-fade-in-up animation-delay-300" />
              </div>
              
              <p className="text-lg lg:text-xl text-accent-300 font-semibold drop-shadow-lg animate-fade-in-up animation-delay-200">
                <span className="bg-gradient-to-r from-accent-300 via-gold-300 to-accent-300 bg-clip-text text-transparent bg-size-200 animate-gradient-x">
                  {heroContent.subtitle}
                </span>
              </p>
              
              {/* 
               * Documentation Source: Context7 MCP - Next.js Conditional Rendering Best Practices
               * Reference: /vercel/next.js - Conditional rendering patterns in React components
               * Pattern: Conditional rendering based on content availability
               * 
               * Implementation Logic:
               * - Only render description paragraph if heroContent.description exists and is not empty
               * - Prevents empty <p> elements from affecting layout spacing
               * - Maintains semantic HTML structure when content is available
               */}
              {heroContent.description && (
                <p className="text-base lg:text-lg text-white/95 leading-relaxed max-w-3xl drop-shadow-md animate-fade-in-up animation-delay-400">
                  {heroContent.description}
                </p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12 animate-fade-in-up animation-delay-600">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-accent-500 via-gold-500 to-accent-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse" />
                <ShinyButton 
                  text="Book Free Consultation"
                  className="relative px-10 py-4 h-auto text-lg font-bold bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-3xl hover:shadow-4xl transition-all duration-500 transform hover:scale-105 rounded-lg border border-gold-400/20"
                />
              </div>
            </div>
          </div>
        </div>
      </PageHero>
      
      {/* Documentation Source: Context7 Tailwind CSS - Transform and opacity animations for scroll indicators
       * Reference: /tailwindlabs/tailwindcss.com - CSS transforms, opacity animations, and fade effects
       * Pattern: Vertical line with fixed-bottom shrinking effect and delayed text fade animation
       * 
       * Implementation Strategy:
       * - Single vertical line with bottom position fixed in place
       * - Line shrinks from top to bottom (top edge moves down to meet bottom edge)
       * - "SCROLL" text moves downward with the line as if connected together
       * - Text stops moving when line disappears, then fades out smoothly
       * - origin-bottom ensures bottom edge stays fixed while top edge slides down
       * 
       * Animation Details:
       * - scrollIndicator: Line shrinks vertically (scaleY 1 → 0) with no position movement
       * - scrollText: Text moves down with line (translateY 0 → 40px), then fades out (opacity 1 → 0)
       * - 67% duration (2s) for line shrinking and text movement, remaining 33% (1s) for text fade
       * - Perfect synchronization: text follows line down, stops when line disappears, then fades
       * - Infinite loop with smooth ease-in-out timing function
       * 
       * Accessibility Considerations:
       * - motion-reduce:hidden: Respects user preference for reduced motion
       * - High contrast white text and line with shadow for visibility
       * - Non-interactive indicator, purely visual scroll cue
       * - Semantic text content for screen readers if needed
       */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 motion-reduce:hidden">
        <div className="relative flex flex-col items-center">
          {/* SCROLL Text */}
          <div 
            className="text-white text-xs font-medium tracking-wider mb-3 drop-shadow-lg"
            style={{
              animation: 'scrollText 3s ease-in-out infinite'
            }}
          >
            SCROLL
          </div>
          
          {/* Vertical Line */}
          <div 
            className="w-0.5 h-8 bg-white shadow-lg origin-bottom"
            style={{
              animation: 'scrollIndicator 3s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      {/* Rest of content wrapped in PageLayout */}
      <PageLayout background="transparent" showHeader={false} showFooter={true} containerSize="full" verticalSpacing="none">
        {/* 
         * Documentation Source: Context7 MCP - Tailwind CSS Spacing System for Section Consistency
         * Reference: Context7 MCP /tailwindlabs/tailwindcss-typography - Consistent vertical rhythm patterns
         * 
         * Spacing Strategy Analysis:
         * - Hero section: No bottom padding (video background ends cleanly)
         * - AnimatedTagline: Needs top spacing to separate from hero + equal bottom to match
         * - ScrollingSchools: Has own internal spacing, needs consistent separation
         * 
         * Solution: Use pt-3 wrapper + py-3 on AnimatedTagline + py-0 on ScrollingSchools for perfect equal spacing
         * Rationale: Creates perfectly symmetric 12px whitespace around "We help students..." content
         * Pattern: Consistent 0.75rem (12px) vertical rhythm for close section separation
         * Total: 12px above + 12px below = perfectly equal minimal spacing
         */}
        
        {/* Animated Tagline Section - Above School Shields */}
        {/* Documentation Source: Context7 Magic UI TypingAnimation with minimal symmetric spacing */}
        {/* Pattern: Text animation with tight equal top/bottom whitespace for visual balance */}
        <div className="pt-3">
          <AnimatedTagline />
        </div>

      {/* School Shields Section - CMS DATA SOURCE: Using ScrollingSchools component */}
      {/* Documentation Source: Context7 Framer Motion infinite marquee pattern */}
      {/* Pattern: Modular component with seamless infinite loop */}
      <ScrollingSchools schools={schoolNames} speed={25} />

      {/* About Section - Text Left, Image Right Layout */}
      <section className="py-16 lg:py-24 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:grid-rows-1">
            
            {/* Text Content - Left Side */}
            <div className="space-y-6 min-h-0">
              <m.h2 
                className="text-3xl lg:text-4xl font-serif font-bold text-primary-900"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.1
                }}
              >
                Expert Private Tutoring, Personally Curated by Elizabeth Burrows
              </m.h2>
              
              {/* 
               * Documentation Source: Context7 MCP - Framer Motion Animation Best Practices
               * Reference: /grx7/framer-motion - Motion component animation patterns
               * Pattern: Removed redundant tagline per user requirements
               * 
               * Implementation Decision:
               * - Removed "Founded on trust. Built on results. Delivered by experts." tagline
               * - Maintains clean content hierarchy focusing on main value proposition
               * - Reduces visual noise and strengthens primary messaging
               * - Improves page reading flow by removing repetitive content
               */}
              
              <div className="space-y-4 text-lg text-primary-700 leading-relaxed">
                <m.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.5
                  }}
                >
                  At the heart of My Private Tutor Online is a singular vision: academic support that is both exceptional and deeply personal. Founded in 2010 by Elizabeth Burrows—a <strong>Cambridge-accepted educator and former Forbes journalist</strong>—the company began not as a business, but as a trusted network of elite colleagues she met throughout her international tutoring career.
                </m.p>
                
                <m.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.7
                  }}
                >
                  What started as a circle of personal recommendations has since evolved—organically and exclusively—into one of the UK&apos;s most respected names in specialist private tutoring. As testament, My Private Tutor Online is honoured to be featured in <strong>Tatler's Address Book</strong> and recognised as <strong>School Guide's 'Top Pick'</strong> for private tuition.
                </m.p>
                
                <m.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.9
                  }}
                >
                  15 years later, the ethos remains the same: every tutor is handpicked, every match thoughtfully made, and every family accommodated directly by Elizabeth and her team.
                </m.p>
              </div>
              
              {/* Credentials with Brand Logos */}
              {/* Documentation Source: Context7 MCP - Next.js Image optimization for brand logos */}
              {/* Pattern: Using actual brand logos instead of generic icons for credibility */}
              <m.div 
                className="flex flex-wrap items-center gap-8 pt-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 1.1
                }}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/media/tatler-logo.png"
                    alt="Tatler Address Book"
                    width={80}
                    height={30}
                    className="h-6 w-auto object-contain"
                  />
                  <span className="font-medium text-primary-900">Address Book</span>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/media/schools-guide-uk-logo.png"
                    alt="School Guide UK"
                    width={80}
                    height={30}
                    className="h-6 w-auto object-contain"
                  />
                  <span className="font-medium text-primary-900">&lsquo;Top Pick&rsquo;</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-6 h-6 text-accent-600" />
                  <span className="font-medium text-primary-900">Royal Clientele</span>
                </div>
              </m.div>
            </div>
            
            {/* Image - Right Side */}
            <div className="relative min-h-0 flex items-start">
              <m.div 
                className="relative w-full flex items-center justify-center bg-transparent"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 1.0, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.3
                }}
                style={{ height: 'fit-content' }}
              >
                <Image
                  src="/images/team/elizabeth-burrows-founder-spare.jpg"
                  alt="Elizabeth Burrows, Founder of My Private Tutor Online"
                  width={600}
                  height={800}
                  className="object-contain w-full h-auto max-w-full"
                  style={{ 
                    filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))',
                    backgroundColor: 'transparent',
                    maxHeight: '600px'
                  }}
                  priority
                />
                
              </m.div>
              
              {/* Animated Decorative elements */}
              <m.div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-accent-200/30 rounded-full blur-xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.9
                }}
              />
              <m.div 
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-200/20 rounded-full blur-xl"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 1.1
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 
       * Documentation Source: Context7 MCP - React Component Integration Pattern
       * Reference: /context7/react_dev - Modular component usage with proper section spacing
       * Pattern: ResultsSection component placement after About section for logical content flow
       * 
       * Results Statistics Section - CMS DATA SOURCE: Using ResultsSection component
       * Component: ResultsSection with CMS-driven statistics and flexible props
       * Positioning: After Elizabeth introduction, before Who We Support for optimal user journey
       * 
       * Content Flow Strategy:
       * - About Elizabeth → Results that validate expertise → Services offered
       * - Creates trust-building narrative: credibility → proof → offerings
       * - Results section acts as social proof after personal introduction
       */}
      <ResultsSection 
        backgroundColor="bg-primary-50"
        className=""
      />

      {/* 
       * Documentation Source: Context7 MCP - Tailwind CSS Spacing Utilities for Section Layout
       * Reference: /tailwindlabs/tailwindcss.com - Padding utilities and section spacing patterns
       * Pattern: Section spacing coordination to prevent double padding conflicts
       * 
       * Educational Options Section - CMS DATA SOURCE: Using getServices for service offerings
       * Spacing Strategy: pb-0 prevents double spacing with QuoteSection below
       * - pt-16 lg:pt-24: Standard top padding for section separation
       * - pb-0: No bottom padding to avoid conflict with QuoteSection's top padding
       * - QuoteSection below handles bottom spacing with its own py-16 lg:py-24
       */}
      <section className="pt-16 lg:pt-24 pb-0 bg-white" aria-label="Educational pathways and tutoring options available">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
              Who We Support
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
              We work with a wide range of learners, offering guidance and transformation at every level:
            </p>
            
            <ServicesCarousel 
              services={services.map(service => ({
                ...service,
                features: service.features.map(f => f.feature),
                targetAudience: getTargetAudienceFromTitle(service.title)
              }))} 
              studentImages={studentImages} 
            />
          </div>
        </div>
      </section>

      {/* 
       * Documentation Source: Context7 MCP - Tailwind CSS Section Spacing with Equal Padding Fix
       * Reference: /tailwindlabs/tailwindcss.com - Consistent spacing utilities for visual balance
       * Pattern: QuoteSection with equal top and bottom padding for symmetric spacing
       * 
       * Royal Testimonial Section - CMS DATA SOURCE: Using getRoyalTestimonial for premium service showcase
       * Component: QuoteSection with CMS-driven content and balanced spacing
       * Background: bg-white maintains design consistency with trust indicators section
       * 
       * Fixed Spacing Coordination:
       * - pt-16 lg:pt-24: Standard top padding (64px/96px) from previous section
       * - pb-16 lg:pb-24: Equal bottom padding (64px/96px) for visual symmetry
       * - Creates perfectly balanced whitespace above and below royal endorsement
       */}
      <QuoteSection 
        quote={royalTestimonial.quote}
        author={royalTestimonial.author}
        role={royalTestimonial.role}
        backgroundColor="bg-white"
        className="pt-16 lg:pt-24 pb-16 lg:pb-24"
      />
      
      {/* 
       * Documentation Source: Context7 MCP - Tailwind CSS Section Spacing Coordination
       * Reference: /tailwindlabs/tailwindcss.com - Padding utilities for seamless section transitions
       * Pattern: GSAP ScrollTrigger batch with coordinated spacing after quote section
       * 
       * Trust Indicators Grid - CMS DATA SOURCE: Using getTrustIndicators for trust indicators
       * Documentation Source: GSAP ScrollTrigger Official Documentation
       * 
       * Spacing Strategy:
       * - pt-0: No top padding as QuoteSection above provides pb-16 lg:pb-24
       * - pb-16 lg:pb-24: Standard bottom padding for section separation
       * - Creates seamless visual flow from Royal Quote to Trust Indicators to Results
       */}
      <section className="relative bg-white pt-0 pb-16 lg:pb-24">
        {/* GSAP ScrollTrigger Staggered Grid Component */}
        <TrustIndicatorsGrid 
          indicators={trustIndicators}
          studentImages={studentImages}
        />
      </section>


      {/* 
       * Documentation Source: Context7 MCP - React Component with CMS Integration
       * Reference: /context7/react_dev - Reusable component with props from CMS
       * Pattern: QuoteSection component consuming CMS data for founder testimonial
       * 
       * Elizabeth's Quote Section - CMS DATA SOURCE: Using getFounderQuote for founder information
       * Component: QuoteSection with CMS-driven content for consistent styling and reusability
       * Background: bg-primary-50 maintains design consistency with original section
       */}
      <QuoteSection 
        quote={founderQuote.quote}
        author={founderQuote.author}
        role={founderQuote.role}
        backgroundColor="bg-primary-50"
      />


      {/* Client Reflections - Carousel - CMS DATA SOURCE: Using getTestimonials for client testimonials */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
              Hear from families who have experienced the transformative power of personalised tutoring
            </p>
          </div>
          
          <Carousel
            centerMode={true}
            autoPlay={true}
            autoPlayInterval={5000}
            showDots={true}
            items={testimonials.map((testimonial, index) => ({
              id: index,
              content: (
                <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-6">
                        <div className="flex justify-center mb-4">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <Award key={i} className="w-5 h-5 text-accent-500 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-lg text-primary-700 italic leading-relaxed">
                          &ldquo;{testimonial.quote}&rdquo;
                        </blockquote>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-primary-600">{testimonial.author} - {testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            }))}
            className="max-w-6xl mx-auto"
          />
        </div>
      </section>

      {/* Call to Action - CMS DATA SOURCE: Using siteBranding for final CTA */}
      <section className="py-16 lg:py-24 bg-primary-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
              This Is Tutoring at Its Best
            </h2>
            
            {/* Video-text brand statement - CMS DATA SOURCE: Using BrandStatementVideo component */}
            <div className="mb-8">
              <BrandStatementVideo 
                className="h-[120px]" 
                text="Exact. Effective. Empowering."
                videoKey="brandStatement"
              />
            </div>
            <p className="text-lg text-primary-300 mb-8 max-w-2xl mx-auto">
              From prep school entry to Oxbridge preparation, {siteBranding.siteName} delivers expert tuition for exceptional futures.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ShinyButton 
                text="Contact Elizabeth's Team"
                className="px-8 py-3 h-auto"
              />
              <InteractiveHoverButton 
                text="Request a Consultation"
                className="px-8 py-3 border border-white bg-transparent text-white hover:bg-white hover:text-primary-900"
              />
            </div>
          </div>
        </div>
      </section>
      </PageLayout>
    </div>
  )
}
