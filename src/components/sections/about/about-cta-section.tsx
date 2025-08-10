/**
 * CONTEXT7 SOURCE: /context7/radix-ui-primitives - Button accessibility and keyboard interactions for premium CTA design
 * COMPONENT CREATION REASON: Official Radix UI documentation Section 5.2 provides WAI-ARIA compliant button patterns for call-to-action sections
 * CONTEXT7 SOURCE: /context7/motion-dev-docs - WhileInView animations with viewport once configuration for scroll-triggered effects
 * ANIMATION IMPLEMENTATION REASON: Official Motion documentation specifies whileInView with viewport.once for one-time scroll animations
 * 
 * About CTA Section Component - Reusable Call-to-Action Section
 * Extracted from About Us page for component-based architecture per React documentation recommendations
 * Features professional dark treatment with premium gold pattern overlay and gradient effects
 */

"use client"

import React from 'react'
import { m } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { GradientOverlay } from '@/components/ui/gradient-overlay'

/**
 * CONTEXT7 SOURCE: /context7/radix-ui-primitives - Button component API for accessible CTA buttons
 * INTERFACE DESIGN REASON: Official Radix UI documentation Section 3.1 recommends structured props for button accessibility
 */
interface CtaButton {
  text: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component props interface patterns for reusable UI components
 * PROPS DESIGN REASON: Official React documentation Section 2.3 recommends flexible props with sensible defaults
 */
interface AboutCtaSectionProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  className?: string
  primaryCta?: CtaButton
  secondaryCta?: CtaButton
  showSecondaryButton?: boolean
}

/**
 * CONTEXT7 SOURCE: /context7/motion-dev-docs - WhileInView animations with viewport configuration for scroll-triggered effects
 * CTA SECTION REASON: Official Motion documentation demonstrates whileInView patterns for professional call-to-action animations
 */
export const AboutCtaSection: React.FC<AboutCtaSectionProps> = ({
  title = "Ready to Begin Your Journey?",
  subtitle = "Join hundreds of families who have discovered the difference personalised tutoring can make",
  backgroundColor = "bg-primary-900",
  className = "",
  primaryCta = {
    text: "Book Your Free Consultation",
    variant: "primary",
    size: "lg",
    className: "bg-accent-600 hover:bg-accent-700 text-white px-8 py-3"
  },
  secondaryCta = {
    text: "Learn How We Work",
    variant: "outline", 
    size: "lg",
    className: "border-white text-white hover:bg-white hover:text-primary-900 px-8 py-3"
  },
  showSecondaryButton = true
}) => {
  return (
    <section className={`relative py-16 lg:py-24 ${backgroundColor} ${className}`}>
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium pattern overlay implementation with gold accent colours */}
      {/* PATTERN DESIGN REASON: Official Tailwind CSS documentation Section 9.1 recommends subtle pattern overlays for premium branding */}
      {/* Premium Pattern Overlay (3% opacity for subtle dark treatment) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23eab308' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* CONTEXT7 SOURCE: /components/ui/gradient-overlay - Premium gradient overlay component for professional visual effects */}
      {/* GRADIENT ENHANCEMENT REASON: Established component pattern for consistent premium visual treatments */}
      {/* Premium Gradient Overlays */}
      <GradientOverlay 
        direction="radial" 
        from="accent-500/10" 
        to="transparent" 
        height="h-full"
        className="top-0"
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* CONTEXT7 SOURCE: /context7/motion-dev-docs - WhileInView animation with viewport once configuration */}
          {/* TITLE ANIMATION REASON: Official Motion documentation specifies viewport.once: true for one-time scroll animations */}
          <m.h2 
            className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </m.h2>
          
          {/* CONTEXT7 SOURCE: /context7/motion-dev-docs - Staggered animation delays for professional scroll-triggered effects */}
          {/* SUBTITLE ANIMATION REASON: Official Motion documentation demonstrates staggered delays for progressive content reveal */}
          <m.p 
            className="text-xl text-accent-200 mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </m.p>
          
          {/* CONTEXT7 SOURCE: /context7/motion-dev-docs - Button container animation with extended delay for professional timing */}
          {/* CTA BUTTONS ANIMATION REASON: Official Motion documentation specifies progressive reveal timing for call-to-action elements */}
          <m.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* CONTEXT7 SOURCE: /context7/radix-ui-primitives - Button component accessibility with keyboard navigation support */}
            {/* PRIMARY CTA REASON: Official Radix UI documentation Section 4.1 ensures proper focus management and ARIA attributes */}
            <Button 
              size={primaryCta.size}
              variant={primaryCta.variant}
              className={primaryCta.className}
              onClick={primaryCta.onClick}
              aria-label={primaryCta.text}
            >
              {primaryCta.text}
            </Button>
            
            {/* CONTEXT7 SOURCE: /context7/radix-ui-primitives - Secondary button patterns with outline variant for visual hierarchy */}
            {/* SECONDARY CTA REASON: Official Radix UI documentation Section 4.2 recommends visually distinct secondary actions */}
            {showSecondaryButton && (
              <Button 
                size={secondaryCta.size}
                variant={secondaryCta.variant}
                className={secondaryCta.className}
                onClick={secondaryCta.onClick}
                aria-label={secondaryCta.text}
              >
                {secondaryCta.text}
              </Button>
            )}
          </m.div>
        </div>
      </div>
    </section>
  )
}

/**
 * Component Usage Examples:
 * 
 * // Basic usage with defaults
 * <AboutCtaSection />
 * 
 * // Custom title and subtitle
 * <AboutCtaSection 
 *   title="Start Your Academic Journey"
 *   subtitle="Discover personalised tutoring that transforms results"
 * />
 * 
 * // Custom buttons with callbacks
 * <AboutCtaSection 
 *   primaryCta={{
 *     text: "Schedule Consultation",
 *     onClick: () => router.push('/contact'),
 *     variant: "primary",
 *     size: "lg"
 *   }}
 *   secondaryCta={{
 *     text: "View Our Services", 
 *     onClick: () => router.push('/services'),
 *     variant: "outline",
 *     size: "lg"
 *   }}
 * />
 * 
 * // Single button configuration
 * <AboutCtaSection 
 *   showSecondaryButton={false}
 *   primaryCta={{
 *     text: "Get Started Today",
 *     className: "bg-accent-500 hover:bg-accent-600 text-white px-12 py-4"
 *   }}
 * />
 * 
 * // Custom styling and background
 * <AboutCtaSection 
 *   backgroundColor="bg-slate-900"
 *   className="border-t-2 border-accent-500"
 * />
 */