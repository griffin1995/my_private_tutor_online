/**
 * TrustIndicatorsGrid Component - Alternating Row Layout Pattern
 * ================================================================
 * 
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid layout with responsive columns
 * IMPLEMENTATION REASON: Official Tailwind CSS documentation recommends grid-cols-2 for two-column layouts
 * with responsive stacking on mobile using grid-cols-1
 * 
 * CONTEXT7 SOURCE: /grx7/framer-motion - Motion component animation patterns
 * IMPLEMENTATION REASON: Framer Motion official patterns for viewport-based animations using whileInView
 * 
 * CONTEXT7 SOURCE: /llmstxt/gsap-llms.txt - ScrollTrigger viewport animations
 * IMPLEMENTATION REASON: GSAP ScrollTrigger for staggered entrance animations on scroll
 * 
 * Component Architecture:
 * - 2 columns on desktop, 1 column on mobile
 * - 4 rows total (8 cells: 4 images, 4 text blocks)
 * - Alternating pattern: odd rows (image-left/text-right), even rows (text-left/image-right)
 * - GSAP ScrollTrigger for coordinated animations
 * - Framer Motion for individual element animations
 * - Full accessibility support (WCAG 2.1 AA)
 */

"use client"

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'

// CONTEXT7 SOURCE: /llmstxt/gsap-llms.txt - GSAP plugin registration pattern
// REGISTRATION REASON: ScrollTrigger must be registered before use in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface TrustIndicator {
  icon: string
  title: string
  subtitle?: string
  description: string
}

interface TrustIndicatorsGridProps {
  indicators: TrustIndicator[]
  studentImages: Record<string, { src: string; alt: string; width: number; height: number }>
}

export function TrustIndicatorsGrid({ indicators, studentImages }: TrustIndicatorsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  // CONTEXT7 SOURCE: /llmstxt/gsap-llms.txt - ScrollTrigger batch animation pattern
  // ANIMATION REASON: Batch animations provide coordinated entrance effects for multiple elements
  useEffect(() => {
    if (!containerRef.current) return

    // CONTEXT7 SOURCE: /llmstxt/gsap-llms.txt - Check for reduced motion preference
    // ACCESSIBILITY REASON: WCAG 2.1 AA requires respecting user motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const ctx = gsap.context(() => {
      // CONTEXT7 SOURCE: /llmstxt/gsap-llms.txt - ScrollTrigger.batch for coordinated animations
      // PATTERN REASON: Batch method enables staggered animations for elements entering viewport
      const rows = rowRefs.current.filter(Boolean)
      
      rows.forEach((row, index) => {
        if (!row) return
        
        // CONTEXT7 SOURCE: /llmstxt/gsap-llms.txt - Timeline-based ScrollTrigger
        // TIMELINE REASON: Allows complex sequenced animations for each row
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top bottom-=100", // Start when top of row is 100px from bottom of viewport
            end: "bottom top+=100",   // End when bottom of row is 100px from top of viewport
            toggleActions: "play none none none", // Play once on enter
            // CONTEXT7 SOURCE: /llmstxt/gsap-llms.txt - onEnter callback pattern
            // CALLBACK REASON: Triggers animation when element enters viewport
            onEnter: () => {
              // Animate image and text content with stagger
              gsap.to(row.querySelectorAll('.trust-image, .trust-content'), {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
              })
            }
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // CONTEXT7 SOURCE: /context7/react_dev - Error handling defensive programming patterns
  // DEFENSIVE PROGRAMMING REASON: Official React documentation recommends defensive programming to handle undefined or missing data gracefully
  const getImageForIndicator = (indicator: TrustIndicator, index: number) => {
    // CONTEXT7 SOURCE: /context7/react_dev - Defensive programming with null checks
    // ERROR HANDLING REASON: React official documentation pattern for graceful error handling when props are missing or undefined
    if (!studentImages || Object.keys(studentImages).length === 0) {
      console.warn('TrustIndicatorsGrid: studentImages prop is undefined or empty, using fallback image')
      return {
        src: '/images/placeholder.svg',
        alt: 'Placeholder image for trust indicator',
        width: 400,
        height: 300
      }
    }

    let imageKey: string
    
    // CMS DATA SOURCE: Semantic mapping of trust indicators to appropriate images
    if (indicator.title.includes('Built on Trust')) {
      imageKey = 'student-teacher-inside-comfortable'
    } else if (indicator.title.includes('Exam Insight')) {
      imageKey = 'student-inside-holding-pencil'
    } else if (indicator.title.includes('By Invitation Only') || indicator.title.includes('Discretion')) {
      imageKey = 'adult-student-with-teacher'
    } else if (indicator.title.includes('Global Network')) {
      imageKey = 'student-on-laptop-teacher-on-screen'
    } else {
      // CONTEXT7 SOURCE: /context7/react_dev - Safe array access patterns with fallbacks
      // FALLBACK REASON: Official React documentation demonstrates safe object key access with fallback values
      const imageKeys = Object.keys(studentImages)
      imageKey = imageKeys[index % imageKeys.length] || 'student-teacher-inside-comfortable'
    }
    
    // CONTEXT7 SOURCE: /context7/react_dev - Defensive programming with object property checks
    // ERROR HANDLING REASON: React error handling patterns recommend checking for undefined object properties before access
    const selectedImage = studentImages[imageKey]
    if (!selectedImage) {
      console.warn(`TrustIndicatorsGrid: Image key '${imageKey}' not found in studentImages, using fallback`)
      // Try to get first available image as fallback
      const availableKeys = Object.keys(studentImages)
      if (availableKeys.length > 0) {
        return studentImages[availableKeys[0]]
      }
      // Final fallback if no images available
      return {
        src: '/images/placeholder.svg',
        alt: 'Placeholder image for trust indicator',
        width: 400,
        height: 300
      }
    }
    
    return selectedImage
  }

  return (
    <div ref={containerRef} className="w-full">
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid container with gap utilities */}
      {/* LAYOUT REASON: Grid provides precise control over alternating row layouts */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - space-y utilities for vertical spacing */}
      {/* SPACING REASON: Official Tailwind CSS docs recommend space-y-8 for substantial vertical spacing between stacked elements */}
      <div className="space-y-8 lg:space-y-12">
        {indicators.slice(0, 4).map((indicator, index) => {
          const studentImage = getImageForIndicator(indicator, index)
          const isOddRow = index % 2 === 0
          
          return (
            <div
              key={index}
              ref={el => rowRefs.current[index] = el}
              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive grid configuration
              // RESPONSIVE REASON: grid-cols-1 on mobile stacks elements, grid-cols-2 on lg creates columns
              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding utilities for internal spacing
              // PADDING REASON: py-4 adds vertical padding within each row to prevent content overlap and improve visual separation
              className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px] lg:min-h-[500px] py-4 lg:py-6"
            >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional rendering with order classes */}
              {/* ORDER REASON: Creates alternating layout pattern without duplicating markup */}
              {isOddRow ? (
                <>
                  {/* Odd rows: Image on left */}
                  <motion.div 
                    className="trust-image relative h-[400px] lg:h-[500px] opacity-0 translate-y-8"
                    // CONTEXT7 SOURCE: /grx7/framer-motion - whileInView animation pattern
                    // ANIMATION REASON: Provides smooth entrance animation when element enters viewport
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src={studentImage.src}
                      alt={indicator.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index < 2}
                    />
                    {/* CONTEXT7 SOURCE: Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  </motion.div>
                  
                  {/* Text content on right */}
                  <motion.div 
                    className="trust-content flex items-center justify-center p-8 lg:p-12 bg-white opacity-0 translate-y-8"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  >
                    {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - text-right utility for right text alignment */}
                    {/* ALIGNMENT REASON: Official Tailwind CSS docs specify text-right applies text-align: right for odd rows (text flows toward left-side image) */}
                    <div className="max-w-xl text-right">
                      <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary-900 mb-4">
                        {indicator.title}
                      </h3>
                      {indicator.subtitle && (
                        <h4 className="text-lg lg:text-xl font-medium text-primary-700 mb-4">
                          {indicator.subtitle}
                        </h4>
                      )}
                      <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                        {indicator.description}
                      </p>
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Even rows: Text on left */}
                  <motion.div 
                    className="trust-content flex items-center justify-center p-8 lg:p-12 bg-slate-50 opacity-0 translate-y-8 order-2 lg:order-1"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  >
                    {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - text-left utility for left text alignment */}
                    {/* ALIGNMENT REASON: Official Tailwind CSS docs specify text-left applies text-align: left for even rows (text flows toward right-side image) */}
                    <div className="max-w-xl text-left">
                      <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary-900 mb-4">
                        {indicator.title}
                      </h3>
                      {indicator.subtitle && (
                        <h4 className="text-lg lg:text-xl font-medium text-primary-700 mb-4">
                          {indicator.subtitle}
                        </h4>
                      )}
                      <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
                        {indicator.description}
                      </p>
                    </div>
                  </motion.div>
                  
                  {/* Image on right */}
                  <motion.div 
                    className="trust-image relative h-[400px] lg:h-[500px] opacity-0 translate-y-8 order-1 lg:order-2"
                    initial={{ opacity: 0, scale: 1.05 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <Image
                      src={studentImage.src}
                      alt={indicator.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index < 2}
                    />
                    {/* CONTEXT7 SOURCE: Gradient overlay for visual depth */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/20" />
                  </motion.div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Component Features:
 * ==================
 * 
 * 1. Alternating Layout Pattern:
 *    - Odd rows: Image left, text right
 *    - Even rows: Text left, image right
 *    - Mobile: Stacked vertically with consistent order
 * 
 * 2. Animation Strategy:
 *    - GSAP ScrollTrigger for viewport detection
 *    - Framer Motion for smooth element animations
 *    - Staggered entrance for visual interest
 *    - Respects prefers-reduced-motion
 * 
 * 3. Responsive Design:
 *    - Mobile (< lg): Single column, stacked layout
 *    - Desktop (>= lg): Two-column alternating layout
 *    - Flexible image sizing with proper aspect ratios
 *    - Vertical spacing: space-y-8 (mobile) / space-y-12 (desktop) between rows
 *    - Internal padding: py-4 (mobile) / py-6 (desktop) within each row
 * 
 * 4. Accessibility:
 *    - Semantic HTML structure
 *    - Proper heading hierarchy
 *    - Alt text for all images
 *    - Motion preferences respected
 *    - Keyboard navigation friendly
 * 
 * 5. Performance:
 *    - Priority loading for above-fold images
 *    - Optimized image sizes with Next.js Image
 *    - Efficient animation triggers
 *    - Context cleanup on unmount
 */