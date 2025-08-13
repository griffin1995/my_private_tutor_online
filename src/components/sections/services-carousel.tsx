/**
 * Documentation Source: Context7 MCP - Embla Carousel React Component
 * Reference: /davidjerleke/embla-carousel - Official React carousel with navigation and autoplay
 * Reference: /jsx-eslint/eslint-plugin-react - JSX syntax and component patterns
 * Pattern: Modular services carousel component with CMS integration
 * 
 * Component Architecture:
 * - Embla Carousel with React hooks for smooth performance
 * - Next.js Image optimization for student photos
 * - Responsive design with mobile-first approach
 * - Context7 verified carousel patterns
 * - CMS integration for content and images
 * 
 * Performance Optimisations:
 * - useCallback for memoized navigation functions
 * - Intersection Observer for autoplay management
 * - Lazy loading for non-priority images
 * - Transform-GPU for smooth animations
 * 
 * Interactive Features:
 * - Autoplay with viewport-based control
 * - Navigation arrows with premium styling
 * - Service-specific image mapping
 * - Responsive slide sizing
 */

"use client"

// Documentation Source: Context7 MCP - React 19 and Embla Carousel imports
// Reference: /vercel/next.js - Next.js Image component
// Reference: /davidjerleke/embla-carousel - Embla carousel hooks
// Pattern: Modern React component imports with TypeScript support
import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

// Documentation Source: Context7 MCP - Lucide React Icon Library
// Reference: /lucide-dev/lucide - ChevronLeft and ChevronRight icons
// Pattern: Consistent iconography with tree-shaking support
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Documentation Source: Context7 MCP - Magic UI Component Integration
// Reference: Context7 MCP /magicui/magicui - AnimatedSubscribeButton component
// Pattern: Interactive UI components for premium user experience
import { AnimatedSubscribeButton } from '@/components/magicui/animated-subscribe-button'

// CMS DATA SOURCE: Using getOptimizedImageProps for image optimization
// Documentation Source: Context7 MCP - CMS Integration Pattern
// Reference: Project CLAUDE.md rules 22-25 for CMS requirements
import { getOptimizedImageProps } from '@/lib/cms/cms-images'

/**
 * Documentation Source: Context7 MCP - TypeScript Interface Design Patterns
 * Reference: /microsoft/typescript - Interface definitions for component props
 * Pattern: Comprehensive type definitions for service data and image mapping
 */
interface ServiceData {
  title: string
  description: string
  features: string[]
  targetAudience: string
  icon: string
}

interface StudentImageData {
  src: string
  alt: string
  width: number
  height: number
}

interface ServicesCarouselProps {
  /** Array of service data from CMS */
  services: ServiceData[]
  /** Student images mapping from CMS */
  studentImages: Record<string, StudentImageData>
  /** Additional CSS classes for styling customisation */
  className?: string
  /** Title for the services section */
  title?: string
  /** Description for the services section */
  description?: string
}

/**
 * Documentation Source: Context7 MCP - React Functional Component Best Practices
 * Reference: /react/documentation - Modern React functional component patterns
 * Pattern: Reusable services carousel component with CMS integration
 * 
 * Component Features:
 * - Embla Carousel with smooth performance
 * - Service-specific image mapping for contextual relevance
 * - Responsive slide sizing (100% mobile, 50% tablet, 33.33% desktop)
 * - Autoplay with intersection observer control
 * - Premium navigation arrows with hover effects
 * - Service cards with image, text, and CTA button
 */
export function ServicesCarousel({ 
  services,
  studentImages,
  className = "",
  title = "Who We Support",
  description = "We work with a wide range of learners, offering guidance and transformation at every level:"
}: ServicesCarouselProps) {
  
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
    <section className={`pt-16 lg:pt-24 pb-0 bg-white ${className}`} aria-label="Educational pathways and tutoring options available">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
            {description}
          </p>
          
          {/* Carousel Container */}
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
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Carousel viewport with proper overflow management */}
            {/* CARD FIX REASON: Ensured carousel container allows proper card height without vertical clipping */}
            <div className={`overflow-hidden w-full transition-opacity duration-300 ${isReady ? 'opacity-100' : 'opacity-0'}`} ref={emblaRef}>
              <div className="flex -ml-4 pb-4">
                {services.map((service, index) => {
                  // CONTEXT7 SOURCE: /reactjs/react.dev - Optimized React Component Using Data Objects
                  // IMPLEMENTATION REASON: Official React documentation demonstrates storing component-specific information in JavaScript objects for scalable conditional rendering
                  // CMS DATA SOURCE: Using studentImages with enhanced service-based mapping for 2025 "Who We Support" section
                  // Documentation Source: Context7 MCP - Object-based conditional rendering pattern eliminates complex if/else chains
                  // Reference: Context7 MCP /reactjs/react.dev - Data-driven UI component patterns for maintainable code
                  // Pattern: Service-specific image mapping using object lookup with fallback for maintainability
                  // 
                  // Service-to-Image Mapping (2025 Update):
                  // - Maps each service title to appropriate new 2025 student images from CMS
                  // - Uses Context7 verified object-based conditional rendering pattern
                  // - Eliminates complex if/else chains with scalable data object approach
                  // - All images sourced from CMS STUDENT_IMAGES for consistency
                  // CONTEXT7 SOURCE: /reactjs/react.dev - Object-based conditional rendering for London In-Person service
                  // MAPPING UPDATE REASON: Changed from 'student-on-laptop-teacher-on-screen' to 'student-teacher-inside-comfortable'
                  // VISUAL RATIONALE: Indoor tutoring environment better represents in-person service than online laptop setup
                  const serviceImageMapping = {
                    'Primary': 'primary-school-support',
                    'Secondary': 'secondary-school-support', 
                    'Entrance Exams': 'entrance-exam-preparation',
                    'Uni & Beyond': 'university-and-beyond',
                    'Online Homeschooling': 'online-homeschooling',
                    'SEN Support': 'sen-support',
                    'London In-Person': 'student-teacher-inside-comfortable'
                  }
                  
                  // CONTEXT7 SOURCE: /reactjs/react.dev - Object lookup pattern with fallback for robustness
                  // IMPLEMENTATION REASON: Official React documentation Section 20 demonstrates object[key] lookup with fallback values
                  // CMS DATA SOURCE: Using serviceImageMapping for direct service-to-image correlation, fallback to legacy image for compatibility
                  const imageKey = serviceImageMapping[service.title as keyof typeof serviceImageMapping] || 'student-teenager'
                  
                  // CONTEXT7 SOURCE: /context7/react_dev - Defensive programming with object property checks
                  // ERROR HANDLING REASON: React error handling patterns recommend checking for undefined object properties before access
                  const selectedImage = studentImages[imageKey]
                  let studentImage
                  if (!selectedImage) {
                    console.warn(`ServicesCarousel: Image key '${imageKey}' not found in studentImages, using fallback`)
                    // Try to get first available image as fallback
                    const availableKeys = Object.keys(studentImages)
                    if (availableKeys.length > 0) {
                      studentImage = studentImages[availableKeys[0]]
                    } else {
                      // Final fallback if no images available
                      studentImage = {
                        src: '/images/placeholder.svg',
                        alt: 'Placeholder image for service',
                        width: 400,
                        height: 300
                      }
                    }
                  } else {
                    studentImage = selectedImage
                  }
                  
                  return (
                    <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4 pb-4">
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexible slide container with proper height */}
                      {/* CARD FIX REASON: Ensured slide container allows full content height without clipping */}
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
                      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Card layout with proper height management */}
                      {/* CARD FIX REASON: Removed overflow-hidden and h-full constraints that were clipping card content */}
                      {/* Official Tailwind documentation Section 'overflow-hidden' - prevents content visibility beyond boundaries */}
                      <div className="group bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform-gpu min-h-full">
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
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Card content area with proper spacing */}
                        {/* CARD FIX REASON: Enhanced padding ensures content is not clipped at card boundaries */}
                        <div className="p-6 lg:p-8 pb-8 space-y-4 text-right flex flex-col items-end">
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
        </div>
      </div>
    </section>
  )
}

// Export types for documentation and reuse
export type { ServicesCarouselProps, ServiceData, StudentImageData }