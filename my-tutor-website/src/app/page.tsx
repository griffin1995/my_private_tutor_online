/**
 * Documentation Source: Next.js 14 App Router with Client Components
 * Reference: https://nextjs.org/docs/app/building-your-application/rendering/client-components
 * Reference: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
 * Pattern: Optimised Client Component with comprehensive JSX structure
 * 
 * Architecture:
 * - Client Component boundary for interactive features
 * - CMS integration for all content
 * - Proper semantic HTML structure
 * - Context7 verified React component patterns
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

import { CheckCircle, Crown, Award, Phone, Calendar, BookOpen, Trophy, ChevronLeft, ChevronRight } from 'lucide-react'
import { m } from 'framer-motion'
import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { 
  getHeroContent, 
  getResultsStatistics, 
  getTrustIndicators,
  getTestimonials,
  getServices,
  getSiteBranding,
  getHowItWorksSteps,
  getTestimonialsSchools,
  // getWhoWeSupport - temporarily unused
} from '@/lib/cms'
import { getStudentImages, getOptimizedImageProps } from '@/lib/cms/cms-images'
import Image from 'next/image'
import { BrandStatementVideo } from '@/components/marketing/brand-statement-video'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'
import { PageLayout } from '@/components/layout/page-layout'
import { PageHero } from '@/components/layout/page-hero'
import { Timeline } from '@/components/ui/timeline'
import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button'
import { Carousel } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { TypingAnimation } from '@/components/magicui/typing-animation'
import { BoxReveal } from '@/components/magicui/box-reveal'
import { TrustIndicatorsGrid } from '@/components/sections/trust-indicators-grid'

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
   * Pattern: useEmblaCarousel hook with responsive options and autoplay plugin
   * 
   * Configuration Details:
   * - loop: true - Enables infinite scrolling for continuous browsing
   * - slidesToScroll: 1 - Single slide advancement for precise control
   * - containScroll: 'trimSnaps' - Prevents empty space at carousel edges
   * - Autoplay: 4000ms intervals, continues even when user interacts
   */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      slidesToScroll: 1,
      containScroll: 'trimSnaps'
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
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

  return (
    <div className="relative max-w-7xl mx-auto flex items-center">
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
        className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        onClick={scrollPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-primary-900" />
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
        className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        onClick={scrollNext}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-primary-900" />
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
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex">
          {services.map((service, index) => {
            // CMS DATA SOURCE: Using studentImages with service-based mapping
            // Documentation Source: CMS Images utility with dynamic key mapping
            // Pattern: Rotating through available student images for variety
            // Keys: Correspond to CMS studentImages object keys
            // Fallback: Graceful degradation to emoji icons if image unavailable
            const imageKeys = ['student-teenager', 'student-university', 'student-oxbridge', 'student-child', 'student-teenager', 'student-university']
            const studentImage = studentImages[imageKeys[index] as keyof typeof studentImages]
            
            return (
              <div key={index} className="flex-[0_0_33.333%] min-w-0 pl-4">
                {/* 
                 * Framer Motion Slide Animation Card
                 * Documentation Source: Framer Motion - whileInView animations
                 * Reference: https://www.framer.com/motion/use-in-view/
                 * Pattern: Staggered entrance animations with hover effects
                 * 
                 * Animation Properties:
                 * - initial: { opacity: 0, y: 20 } - Starts invisible and slightly below
                 * - whileInView: { opacity: 1, y: 0 } - Fades in and moves to position
                 * - viewport: { once: true } - Animation only triggers once per page load
                 * - transition: 0.6s duration with staggered delay (index * 0.1)
                 * 
                 * Hover Effects:
                 * - hover:shadow-2xl: Premium shadow elevation
                 * - hover:-translate-y-2: Subtle lift effect (8px up)
                 * - duration-500: Smooth 500ms transitions
                 * 
                 * Card Design: Maintains 'long horizontal cards, squared edges' as requested
                 */}
                <m.div 
                  className="group bg-white overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {/* Student Image - 616px height with CMS integration and hover effects */}
                  {studentImage ? (
                    <div className="relative overflow-hidden h-[616px]">
                      {/* Next.js Image with CMS optimized props */}
                      <Image
                        {...getOptimizedImageProps(studentImage, '(max-width: 768px) 100vw, 33vw')}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Premium overlay effect - appears on hover for sophisticated interaction */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  ) : (
                    <div className="relative overflow-hidden h-[616px] bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-400 text-4xl">{service.icon}</span>
                    </div>
                  )}
                  
                  {/* Enhanced Content Section with right-aligned text and hover effects */}
                  <div className="p-8 space-y-4 text-right">
                    {/* Service Title - H1 equivalent with serif typography and hover colour change */}
                    <h3 className="text-2xl font-serif font-bold text-primary-900 group-hover:text-accent-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    {/* Service Description - Clear, readable body text */}
                    <p className="text-primary-700 leading-relaxed text-lg">
                      {service.description}
                    </p>
                    {/* Magic UI AnimatedSubscribeButton with brand colours */}
                    <AnimatedSubscribeButton
                      buttonColor="#0f172a"
                      buttonTextColor="#ffffff"
                      subscribeStatus={false}
                      initialText="Learn More"
                      changeText="View Details"
                      className="mt-4"
                    />
                  </div>
                </m.div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * Documentation Source: Magic UI official typing-animation component
 * Pattern: Professional typing effect with elegant styling for premium brand positioning
 * 
 * Component Implementation:
 * - Uses TypingAnimation component from Magic UI library
 * - Custom background gradient effects for premium feel
 * - Decorative flourishes with Motion animations
 * - Responsive design with proper breakpoints
 */
function AnimatedTagline() {
  return (
    <div className="relative text-center pb-12 pt-0">
      {/* Premium background effects */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="w-[500px] h-20 bg-gradient-to-r from-transparent via-accent-100/20 to-transparent blur-2xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute w-96 h-16 bg-gradient-to-r from-accent-200/10 via-primary-100/20 to-accent-200/10 blur-xl opacity-60" />
      </div>
      
      {/* Magic UI Typing Animation */}
      <div className="relative z-10 px-4">
        <TypingAnimation
          className="text-xl lg:text-2xl italic font-medium tracking-wide"
          style={{
            fontFamily: '"Dancing Script", "Brush Script MT", cursive',
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
  // CMS DATA SOURCE: Using getResultsStatistics for performance metrics
  const resultsStats = getResultsStatistics()
  // CMS DATA SOURCE: Using getStudentImages for student photos
  const studentImages = getStudentImages()
  // CMS DATA SOURCE: Using getSiteBranding for company information
  const siteBranding = getSiteBranding()
  // CMS DATA SOURCE: Using getHowItWorksSteps for process timeline
  const howItWorksSteps = getHowItWorksSteps()
  // CMS DATA SOURCE: Using getTestimonialsSchools for elite institution names
  const schoolNames = getTestimonialsSchools()

  return (
    <PageLayout background="transparent" showHeader showFooter containerSize="full" verticalSpacing="none" headerProps={{ isHeroPage: true }}>
      {/* Hero Section with Full-Screen Video Background */}
      {/* Documentation Source: Context7 verified HTML5 video best practices and CMS integration */}
      {/* Pattern: Full-screen video hero with proper HTML5 attributes and CMS video source */}
      <PageHero 
        background="video" 
        backgroundVideo="/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.mp4"
        size="full"
        overlay
        overlayOpacity="medium"
        className=""
      >
        {/* Hero Content - Centered over Full-Screen Video */}
        {/* Documentation Source: CSS Grid and Flexbox for hero content layout */}
        {/* Pattern: Centered hero content with responsive typography and prominent CTAs */}
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                {heroContent.title}
              </h1>
              <p className="text-2xl lg:text-3xl text-accent-300 font-semibold drop-shadow-md">
                {heroContent.subtitle}
              </p>
              <p className="text-xl lg:text-2xl text-white/95 leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
                {heroContent.description}
              </p>
            </div>
            
            {/* CTA Buttons - Prominent and Centered */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
              <ShinyButton 
                text="Book Free Consultation"
                className="px-12 py-6 h-auto text-xl font-bold bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 rounded-lg"
              />
              <InteractiveHoverButton 
                text="Watch Introduction"
                className="px-12 py-6 text-xl font-bold border-3 border-white/90 bg-white/15 backdrop-blur-md text-white hover:bg-white hover:text-primary-900 transition-all duration-300 rounded-lg shadow-xl hover:shadow-2xl"
              />
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </PageHero>

      {/* School Shields Section - CMS DATA SOURCE: Using siteBranding for credentials */}
      {/* Documentation Source: CSS spacing utilities for seamless section transitions */}
      {/* Pattern: Remove top padding to connect directly with hero section */}
      <section className="pb-16 bg-transparent" aria-label="Elite schools and universities our students have placed at">
        <div className="w-full overflow-hidden bg-transparent py-6">
          <div className="flex animate-scroll gap-16 whitespace-nowrap">
            {/* CMS DATA SOURCE: Using getTestimonialsSchools for elite institution names */}
            {schoolNames.slice(0, 6).map((school: string | { name?: string; title?: string }, index: number) => (
              <div key={index} className="flex-shrink-0 flex items-center justify-center px-8">
                <div className="text-lg font-semibold text-primary-700">
                  {typeof school === 'string' ? school : school.name || school.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Animated Tagline - Using Magic UI TypingAnimation */}
      {/* Documentation Source: Magic UI AutoAnimate + Framer Motion patterns */}
      {/* Pattern: Professional UI library animation effects for premium brand positioning */}
      <AnimatedTagline />

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
              
              <m.h3 
                className="text-xl font-medium text-accent-600"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.3
                }}
              >
                Founded on trust. Built on results. Delivered by experts.
              </m.h3>
              
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
                  At the heart of My Private Tutor Online is a singular vision: academic support that is both exceptional and deeply personal. Founded in 2010 by Elizabeth Burrows—a Cambridge-accepted educator and former Forbes journalist—the company began not as a business, but as a trusted network of elite colleagues she met throughout her international tutoring career.
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
                  What started as a circle of personal recommendations has since evolved—organically and exclusively—into one of the UK&apos;s most respected names in specialist private tutoring. As testament, My Private Tutor Online is honoured to be featured in Tatler&apos;s Address Book and recognised as School Guide UK&apos;s &lsquo;Top Pick&rsquo; for private tuition.
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
                  Today, the ethos remains the same: every tutor is handpicked, every match thoughtfully made, and every family accommodated directly by Elizabeth and her team.
                </m.p>
              </div>
              
              {/* Credentials */}
              <m.div 
                className="flex flex-wrap items-center gap-6 pt-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 1.1
                }}
              >
                <div className="flex items-center gap-2">
                  <Crown className="w-6 h-6 text-accent-600" />
                  <span className="font-medium text-primary-900">Tatler Address Book</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-accent-600" />
                  <span className="font-medium text-primary-900">School Guide UK &lsquo;Top Pick&rsquo;</span>
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

      {/* Educational Options Section - CMS DATA SOURCE: Using getServices for service offerings */}
      <section className="py-16 lg:py-24 bg-white" aria-label="Educational pathways and tutoring options available">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
              Who We Support
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
              We work with a wide range of learners, offering guidance and transformation at every level:
            </p>
            
            <ServicesCarousel services={services} studentImages={studentImages} />
          </div>
        </div>
      </section>

      {/* Royal Endorsement Section - CMS DATA SOURCE: Using getTrustIndicators for trust indicators */}
      {/* Documentation Source: GSAP ScrollTrigger Official Documentation + Magic UI Box Reveal */}
      {/* Pattern: GSAP ScrollTrigger batch with staggered grid animations + sequential box reveal */}
      <section className="relative bg-white">
        <div className="text-left py-16 px-4 max-w-4xl mx-auto">
          {/* Documentation Source: Magic UI Box Reveal sequential pattern with Motion timing */}
          {/* Pattern: Progressive content revelation with slower timing and fade-up effects */}
          <BoxReveal boxColor="#eab308" duration={1.2} delay={0.3}>
            <m.h2 
              className="text-5xl lg:text-6xl font-serif font-bold text-black mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Royal Endorsement
            </m.h2>
          </BoxReveal>

          <BoxReveal boxColor="#eab308" duration={1.2} delay={0.8}>
            <m.h3 
              className="text-2xl lg:text-3xl font-medium text-black mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Trusted by Britain&apos;s Most Distinguished Families
            </m.h3>
          </BoxReveal>

          <BoxReveal boxColor="#eab308" duration={1.2} delay={1.3}>
            <m.p 
              className="text-lg text-black/90 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              Featured in Tatler&apos;s Address Book and chosen by royal households, our tutoring excellence is recognised at the highest levels of British society.
            </m.p>
          </BoxReveal>
        </div>
        
        {/* GSAP ScrollTrigger Staggered Grid Component */}
        <TrustIndicatorsGrid 
          indicators={trustIndicators}
          studentImages={studentImages}
        />
      </section>

      {/* Results Statistics - CMS DATA SOURCE: Using getResultsStatistics for performance metrics */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-12">
              Results that Speak for Themselves
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {resultsStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-accent-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-accent-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary-900 mb-2">{stat.number}</h3>
                  <p className="text-primary-700 leading-relaxed">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Elizabeth's Quote - CMS DATA SOURCE: Using siteBranding for founder information */}
      <section className="py-16 lg:py-24 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-xl lg:text-2xl font-serif text-primary-700 italic leading-relaxed mb-8">
              &ldquo;Parents come to us when something truly matters—an entrance exam, a lost sense of confidence, a desire for academic stretch. They stay with us because we deliver real progress, quietly and expertly. This is not a tutoring directory. This is a bespoke service for ambitious families looking for trusted partners in their child&apos;s academic career.&rdquo;
            </blockquote>
            <cite className="text-lg font-semibold text-primary-900 not-italic">
              — Elizabeth Burrows, Founder
            </cite>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline - CMS DATA SOURCE: Using services for process steps */}
      <section className="py-16 lg:py-24 bg-primary-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
              Your journey to academic excellence in four simple steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Timeline 
              items={howItWorksSteps.slice(0, 4).map((step, index) => {
                const icons = [
                  <Phone key={0} className="w-6 h-6 text-accent-600" />,
                  <Calendar key={1} className="w-6 h-6 text-accent-600" />,
                  <BookOpen key={2} className="w-6 h-6 text-accent-600" />,
                  <Trophy key={3} className="w-6 h-6 text-accent-600" />
                ]
                return {
                  title: step.title,
                  description: step.description,
                  icon: icons[index] || <BookOpen key={index} className="w-6 h-6 text-accent-600" />
                }
              })}
            />
          </div>
        </div>
      </section>

      {/* Client Reflections - Carousel - CMS DATA SOURCE: Using getTestimonials for client testimonials */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
              Client Reflections
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
  )
}
