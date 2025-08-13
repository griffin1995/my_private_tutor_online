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
 * CONTEXT7 SOURCE: /context7/radix-ui-primitives - Button component API for accessible CTA buttons with hierarchy support
 * INTERFACE DESIGN REASON: Official Radix UI documentation demonstrates AlertDialog.Action and AlertDialog.Cancel patterns for button hierarchy
 */
interface CtaButton {
  text: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  'aria-label'?: string
  disabled?: boolean
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component props interface patterns for multi-tier CTA systems
 * MULTI-TIER CTA REASON: Official Radix UI AlertDialog patterns demonstrate primary action, cancel, and additional button hierarchies
 */
interface AboutCtaSectionProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  className?: string
  // Primary CTA: High intent actions (Book Consultation)
  primaryCta?: CtaButton
  // Secondary CTA: Medium intent actions (Download Prospectus)
  secondaryCta?: CtaButton
  // Tertiary CTA: Low intent actions (Join Newsletter)
  tertiaryCta?: CtaButton
  showSecondaryButton?: boolean
  showTertiaryButton?: boolean
  ctaLayout?: 'stacked' | 'inline' | 'grid'
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
    text: "Download Our Prospectus",
    variant: "secondary", 
    size: "lg",
    className: "bg-accent-100 text-primary-900 hover:bg-accent-200 px-8 py-3"
  },
  tertiaryCta = {
    text: "Join Our Newsletter",
    variant: "ghost",
    size: "md",
    className: "text-accent-200 hover:text-white hover:bg-primary-800 px-6 py-2"
  },
  showSecondaryButton = true,
  showTertiaryButton = true,
  ctaLayout = 'stacked'
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
          
          {/* CONTEXT7 SOURCE: /context7/motion-dev-docs - Multi-tier CTA container animation with extended delay for professional timing */}
          {/* MULTI-TIER CTA REASON: Official Motion documentation specifies progressive reveal timing for hierarchical call-to-action elements */}
          <m.div
            className={`gap-4 justify-center ${
              ctaLayout === 'stacked' 
                ? 'flex flex-col items-center max-w-sm mx-auto' 
                : ctaLayout === 'inline'
                ? 'flex flex-col sm:flex-row items-center'
                : 'grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto'
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* CONTEXT7 SOURCE: /context7/radix-ui-primitives - AlertDialog.Action pattern for primary CTA button */}
            {/* PRIMARY CTA REASON: Official Radix UI AlertDialog.Action documentation ensures primary action accessibility and focus management */}
            <Button 
              size={primaryCta.size}
              variant={primaryCta.variant}
              className={`${primaryCta.className} ${ctaLayout === 'stacked' ? 'w-full' : ''}`}
              onClick={primaryCta.onClick}
              aria-label={primaryCta['aria-label'] || primaryCta.text}
              disabled={primaryCta.disabled}
            >
              {primaryCta.text}
            </Button>
            
            {/* CONTEXT7 SOURCE: /context7/radix-ui-primitives - AlertDialog.Cancel pattern for secondary CTA button */}
            {/* SECONDARY CTA REASON: Official Radix UI AlertDialog.Cancel documentation recommends visually distinct secondary actions */}
            {showSecondaryButton && (
              <Button 
                size={secondaryCta.size}
                variant={secondaryCta.variant}
                className={`${secondaryCta.className} ${ctaLayout === 'stacked' ? 'w-full' : ''}`}
                onClick={secondaryCta.onClick}
                aria-label={secondaryCta['aria-label'] || secondaryCta.text}
                disabled={secondaryCta.disabled}
              >
                {secondaryCta.text}
              </Button>
            )}

            {/* CONTEXT7 SOURCE: /context7/radix-ui-primitives - Button ghost variant pattern for tertiary low-intent actions */}
            {/* TERTIARY CTA REASON: Official Radix UI button variants documentation demonstrates ghost variant for subtle, low-priority actions */}
            {showTertiaryButton && (
              <Button 
                size={tertiaryCta.size}
                variant={tertiaryCta.variant}
                className={`${tertiaryCta.className} ${ctaLayout === 'stacked' ? 'w-full' : ''}`}
                onClick={tertiaryCta.onClick}
                aria-label={tertiaryCta['aria-label'] || tertiaryCta.text}
                disabled={tertiaryCta.disabled}
              >
                {tertiaryCta.text}
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
 * // Basic usage with defaults (all three CTAs)
 * <AboutCtaSection />
 * 
 * // Multi-tier CTA system with conversion funnel
 * <AboutCtaSection 
 *   title="Transform Your Academic Future"
 *   subtitle="Choose your engagement level - from consultation to ongoing updates"
 *   ctaLayout="stacked"
 *   primaryCta={{
 *     text: "Book Free Consultation",
 *     onClick: () => router.push('/contact'),
 *     'aria-label': "Schedule a free tutoring consultation"
 *   }}
 *   secondaryCta={{
 *     text: "Download Prospectus",
 *     onClick: () => downloadPdf('/prospectus.pdf'),
 *     'aria-label': "Download our comprehensive tutoring prospectus"
 *   }}
 *   tertiaryCta={{
 *     text: "Subscribe to Newsletter",
 *     onClick: () => openNewsletterModal(),
 *     'aria-label': "Subscribe for tutoring tips and success stories"
 *   }}
 * />
 * 
 * // Grid layout for equal emphasis
 * <AboutCtaSection 
 *   ctaLayout="grid"
 *   primaryCta={{
 *     text: "Start Today",
 *     className: "bg-accent-600 hover:bg-accent-700 text-white"
 *   }}
 *   secondaryCta={{
 *     text: "Learn More",
 *     className: "bg-accent-100 text-primary-900 hover:bg-accent-200"
 *   }}
 *   tertiaryCta={{
 *     text: "Get Updates",
 *     className: "text-accent-200 hover:text-white"
 *   }}
 * />
 * 
 * // Inline layout with selective display
 * <AboutCtaSection 
 *   ctaLayout="inline"
 *   showTertiaryButton={false}
 *   primaryCta={{
 *     text: "Schedule Consultation",
 *     variant: "primary",
 *     size: "lg"
 *   }}
 *   secondaryCta={{
 *     text: "View Success Stories",
 *     variant: "secondary",
 *     size: "lg"
 *   }}
 * />
 * 
 * // Single button configuration (high-intent only)
 * <AboutCtaSection 
 *   showSecondaryButton={false}
 *   showTertiaryButton={false}
 *   primaryCta={{
 *     text: "Book Now - Limited Availability",
 *     className: "bg-red-600 hover:bg-red-700 text-white px-12 py-4",
 *     'aria-label': "Book consultation now - limited availability this term"
 *   }}
 * />
 * 
 * // Custom styling with royal theme
 * <AboutCtaSection 
 *   backgroundColor="bg-primary-900"
 *   className="border-t-4 border-accent-500"
 *   title="Royal Standard Tutoring"
 *   subtitle="Approved by elite families across Britain"
 * />
 */