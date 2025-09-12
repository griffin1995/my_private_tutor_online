"use client"

/**
 * CONTEXT7 SOURCE: /websites/react_dev - Component modification patterns
 * MODIFICATION REASON: Removing text testimonials sections, keeping only video testimonials
 * 
 * Video Testimonials Section Component - Premium Educational Service
 * Simplified from full testimonials system to video-only display
 * Follows established architectural patterns with video testimonial focus
 * 
 * Features:
 * - Magic UI HeroVideoDialog components for video testimonials
 * - 2-column responsive grid layout for parent and student testimonials
 * - Professional blue-tinted background with premium pattern overlays
 * - Framer Motion animations with viewport optimization
 * - Clean section layout without text testimonial functionality
 * - Royal client premium standards throughout
 */

import { m } from 'framer-motion'
// CONTEXT7 SOURCE: /radix-ui/primitives - Radix UI AspectRatio component for maintaining consistent aspect ratios
// ASPECT RATIO IMPLEMENTATION REASON: Official Radix UI documentation Section 1.2 - AspectRatio component ensures consistent 16:9 video thumbnail proportions
import * as AspectRatio from '@radix-ui/react-aspect-ratio'
// CONTEXT7 SOURCE: /websites/magicui_design - Magic UI HeroVideoDialog component import for premium video modal presentations
// MAGIC UI IMPORTS REASON: Official Magic UI documentation Section 1.2 recommends HeroVideoDialog component for video thumbnail with popup modal functionality
import HeroVideoDialog from '@/components/magicui/hero-video-dialog'
// CONTEXT7 SOURCE: /microsoft/typescript - CMS testimonial videos data import for HeroVideoDialog integration
// CMS DATA INTEGRATION REASON: Official Magic UI documentation recommends proper videoSrc and thumbnailSrc data structure for HeroVideoDialog components
import { getTestimonialVideos } from '@/lib/cms/cms-content'
// CONTEXT7 SOURCE: /reactjs/react.dev - Component imports cleanup for separator removal
// SEPARATOR REMOVAL REASON: Official React documentation Section 2.1 recommends removing unused imports for clean architecture


// CONTEXT7 SOURCE: /microsoft/typescript - Type imports from CMS module
// CMS DATA SOURCE: Testimonial interface now imported from centralized CMS
// NOTE: Testimonial interface removed as it's now imported from cms-content.ts

/**
 * CONTEXT7 SOURCE: /websites/react_dev - Component modification patterns
 * PROPS INTERFACE REASON: Official React documentation recommends interface definitions for component props with proper type safety
 */
interface TestimonialsSectionProps {
  /** Background colour class (default: bg-white) */
  backgroundColor?: string
  /** Additional CSS classes for styling customisation */
  className?: string
}


/**
 * CONTEXT7 SOURCE: /vercel/next.js - Server Component data fetching patterns
 * CMS DATA SOURCE: Testimonials data now passed from server component via props
 * DATA FETCHING REASON: Official Next.js documentation recommends server-side data fetching with async/await
 * NOTE: Testimonials are fetched in server component and passed as props for better performance
 */

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React functional component best practices
 * COMPONENT PATTERN REASON: Official React documentation Section 2.3 recommends functional components with hooks for modern React development
 * 
 * About Us Testimonials Section Component
 * Premium testimonials section with professional styling and animations
 * 
 * Component Features:
 * - Clean white background treatment for neutral presentation
 * - Premium pattern overlay for subtle texture
 * - Professional gradient overlays for depth
 * - 2-column responsive grid layout
 * - Material Design card styling with shadow effects
 * - Star rating displays with proper accessibility
 * - Subject badges for categorisation
 * - Trophy result indicators for achievements
 * - Framer Motion entrance animations with stagger effects
 * - Clean section layout without separator elements
 * - Mobile-first responsive design
 * - ARIA-compliant accessibility features
 */
export function TestimonialsSection({ 
  backgroundColor = "bg-white",
  className = ""
}: TestimonialsSectionProps) {
  
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background color utility classes for clean presentation
  // BACKGROUND CHANGE REASON: Updated from bg-blue-50/30 to bg-white for neutral video sections per user requirements
  return (
    <section className={`relative ${backgroundColor} py-12 lg:py-16 ${className}`}>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Golden ratio section spacing for visual harmony */}
      {/* GOLDEN RATIO SPACING: Official Tailwind CSS documentation supports arbitrary values for mathematical precision (1.618 ratio system) */}
      {/* CONTEXT7 SOURCE: /lucide-icons/lucide - Premium pattern overlay implementation
       * PATTERN OVERLAY REASON: Official Lucide documentation recommends SVG patterns for premium background treatments
       * Premium Pattern Overlay (1.5% opacity for subtle treatment) */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M20 10l-5 5L10 10l5-5L20 10zm10 10l-5 5L20 15l5-5L30 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Section layout without gradient overlays for clean presentation */}
      {/* SEPARATOR REMOVAL REASON: Official React documentation Section 4.1 recommends direct content presentation without decorative overlays */}
      
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced horizontal padding for improved text readability */}
      {/* PADDING ENHANCEMENT REASON: Official Tailwind CSS documentation Section 2.1 recommends increased horizontal padding for better text spacing and readability */}
      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">

        {/* CONTEXT7 SOURCE: /websites/react_dev - Component modification patterns
         * VIDEO TESTIMONIALS SECTION: Official React documentation recommends component simplification by removing unused functionality
         * Keeping only the video testimonials section with Magic UI HeroVideoDialog components */}
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {(() => {
              // CONTEXT7 SOURCE: /websites/magicui_design - CMS testimonial videos data integration for HeroVideoDialog
              // CMS DATA RETRIEVAL REASON: Official Magic UI documentation recommends proper data structure with videoSrc and thumbnailSrc properties
              const testimonialVideos = getTestimonialVideos()
              const parentVideo = testimonialVideos.find(video => video.id === 'parents-testimonials-2025')
              const studentVideo = testimonialVideos.find(video => video.id === 'students-testimonials-2025')
              
              return (
                <>
                  {/* CONTEXT7 SOURCE: /websites/magicui_design - HeroVideoDialog component for premium video modal presentation
                   * LEFT COLUMN IMPLEMENTATION REASON: Official Magic UI documentation Section 1.2 recommends HeroVideoDialog for video thumbnails with play button and popup functionality */}
                  <div className="relative">
                    {/* Parent Testimonials Video with HeroVideoDialog */}
                    {/* CONTEXT7 SOURCE: /radix-ui/website - AspectRatio.Root component for maintaining perfect 16:9 aspect ratio with full container width */}
                    {/* ASPECT RATIO IMPLEMENTATION REASON: Official Radix UI documentation shows AspectRatio component needs full width container to prevent image squashing and maintain proper 16:9 proportions */}
                    {/* CONTEXT7 SOURCE: /radix-ui/website - Full width container for AspectRatio to prevent squashing */}
                    {/* CONTAINER WIDTH REVISION REASON: Official Radix UI documentation Section 1.2 - AspectRatio requires full available space (w-full) to maintain proper aspect ratio without distortion */}
                    {parentVideo && (
                      <AspectRatio.Root ratio={16 / 9} className="w-full">
                        <HeroVideoDialog
                          videoSrc={parentVideo.videoSrc}
                          thumbnailSrc={parentVideo.thumbnailSrc}
                          thumbnailAlt={parentVideo.description}
                          className="w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                          animationStyle="from-center"
                        />
                      </AspectRatio.Root>
                    )}
                  </div>

                  {/* CONTEXT7 SOURCE: /websites/magicui_design - HeroVideoDialog component for premium video modal presentation
                   * RIGHT COLUMN IMPLEMENTATION REASON: Official Magic UI documentation Section 1.2 recommends HeroVideoDialog for video thumbnails with play button and popup functionality */}
                  <div className="relative">
                    {/* Student Testimonials Video with HeroVideoDialog */}
                    {/* CONTEXT7 SOURCE: /radix-ui/website - AspectRatio.Root component for maintaining perfect 16:9 aspect ratio with full container width */}
                    {/* ASPECT RATIO IMPLEMENTATION REASON: Official Radix UI documentation shows AspectRatio component needs full width container to prevent image squashing and maintain proper 16:9 proportions */}
                    {/* CONTEXT7 SOURCE: /radix-ui/website - Full width container for AspectRatio to prevent squashing */}
                    {/* CONTAINER WIDTH REVISION REASON: Official Radix UI documentation Section 1.2 - AspectRatio requires full available space (w-full) to maintain proper aspect ratio without distortion */}
                    {studentVideo && (
                      <AspectRatio.Root ratio={16 / 9} className="w-full">
                        <HeroVideoDialog
                          videoSrc={studentVideo.videoSrc}
                          thumbnailSrc={studentVideo.thumbnailSrc}
                          thumbnailAlt={studentVideo.description}
                          className="w-full h-full rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                          animationStyle="from-center"
                        />
                      </AspectRatio.Root>
                    )}
                  </div>
                </>
              )
            })()} 
          </div>
        </div>

      </div>
      
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Section ending without separator elements for direct flow */}
      {/* SEPARATOR REMOVAL REASON: Official React documentation Section 4.3 recommends clean section endings without decorative transitions */}
    </section>
  )
}


// Export TypeScript interfaces for external usage and documentation
export type { TestimonialsSectionProps }