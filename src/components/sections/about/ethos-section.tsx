"use client"

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component extraction and props interface patterns
 * COMPONENT EXTRACTION REASON: Official React documentation Section 2.1 recommends component extraction for maintainability and reusability
 * CONTEXT7 SOURCE: /lucide-icons/lucide - React icon component usage
 * ICON IMPLEMENTATION REASON: Official Lucide documentation recommends importing specific icons as React components for optimal tree-shaking
 * CONTEXT7 SOURCE: /context7/motion_dev - React motion components with viewport animations
 * ANIMATION IMPLEMENTATION REASON: Official Motion documentation patterns for whileInView animations with staggered delays
 */

import { Heart, Globe } from 'lucide-react'
import { m } from 'framer-motion'
import { WaveSeparator } from '@/components/ui/wave-separator'
import { GradientOverlay } from '@/components/ui/gradient-overlay'

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface patterns for component props
// INTERFACE DESIGN REASON: Official React documentation recommends clear interface definitions for component API design
interface Philosophy {
  icon: 'heart' | 'globe'
  title: string
  description: string
}

interface QuoteContent {
  text: string
  author: string
  role: string
}

interface EthosSectionProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  className?: string
  philosophies?: Philosophy[]
  quote?: QuoteContent
  showQuote?: boolean
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Component with flexible props and sensible defaults
// COMPONENT ARCHITECTURE REASON: Official React documentation patterns for reusable component design with optional props
export function EthosSection({
  title = "Our Ethos",
  subtitle = "Our approach to education is built on the belief that every child deserves the luxury of choice and the confidence to pursue their own path to excellence.",
  backgroundColor = "bg-slate-50/80",
  className = "",
  philosophies = [
    {
      icon: 'heart',
      title: "Personalised Excellence",
      description: "We believe that one size does not fit all in education. Every child learns differently, and our approach is tailored to unlock each student's unique potential through personalised strategies and genuine care."
    },
    {
      icon: 'globe', 
      title: "Global Perspective",
      description: "Our international experience brings a global perspective to education, helping students not just excel academically but develop the confidence and adaptability needed for success in an interconnected world."
    }
  ],
  quote = {
    text: "Work as hard as you can to give yourself the luxury of choice, then have the confidence to pick what's right for you — even if it's not what's expected.",
    author: "Elizabeth Burrows",
    role: "Founder"
  },
  showQuote = true
}: EthosSectionProps) {

  // CONTEXT7 SOURCE: /lucide-icons/lucide - Icon component mapping for dynamic rendering
  // ICON MAPPING REASON: Official Lucide documentation pattern for dynamic icon selection based on string identifiers
  const getIconComponent = (iconType: 'heart' | 'globe') => {
    const iconComponents = {
      heart: Heart,
      globe: Globe
    }
    return iconComponents[iconType]
  }

  return (
    <section className={`relative ${backgroundColor} py-16 lg:py-24 border-b border-slate-100/50 ${className}`}>
      {/* Premium Pattern Overlay (2% opacity) */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Inline styles with dynamic background patterns */}
      {/* PATTERN ENHANCEMENT REASON: React documentation supports inline styles for dynamic SVG pattern overlays */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23475569' fill-opacity='1'%3E%3Cpath d='M25 5l-5 5L15 5l5-5L25 5zm10 10l-5 5L25 15l5-5L35 20z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Professional Gradient Overlay */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns */}
      {/* GRADIENT OVERLAY REASON: React documentation recommends component composition for reusable UI elements */}
      <GradientOverlay 
        direction="top" 
        from="white/30" 
        to="transparent" 
        height="h-20"
        className="top-0"
      />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            {/* CONTEXT7 SOURCE: /context7/motion_dev - whileInView animations with viewport settings */}
            {/* HEADER ANIMATION REASON: Official Motion documentation for scroll-triggered animations with viewport once: true */}
            <m.h2 
              className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              {title}
            </m.h2>
            <m.p 
              className="text-xl text-primary-700 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {subtitle}
            </m.p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* CONTEXT7 SOURCE: /reactjs/react.dev - Array mapping and component rendering patterns */}
            {/* DYNAMIC RENDERING REASON: Official React documentation for rendering lists of components with unique keys */}
            {philosophies.map((philosophy, index) => {
              const IconComponent = getIconComponent(philosophy.icon)
              
              return (
                <m.div
                  key={philosophy.title}
                  initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 + (index * 0.2) }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="bg-accent-100 rounded-full p-3 flex-shrink-0">
                      {/* CONTEXT7 SOURCE: /lucide-icons/lucide - Icon component usage with props */}
                      {/* ICON CUSTOMISATION REASON: Official Lucide documentation for size and color props */}
                      <IconComponent className="w-6 h-6 text-accent-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-primary-900 mb-4">
                        {philosophy.title}
                      </h3>
                      <p className="text-lg text-primary-700 leading-relaxed">
                        {philosophy.description}
                      </p>
                    </div>
                  </div>
                </m.div>
              )
            })}
          </div>

          {/* Quote Section */}
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns */}
          {/* CONDITIONAL DISPLAY REASON: Official React documentation for conditional component rendering based on props */}
          {showQuote && (
            <m.div
              className="mt-16 bg-gradient-to-br from-accent-50 to-primary-50 p-8 lg:p-12 rounded-3xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <blockquote className="text-2xl font-serif text-primary-800 italic text-center leading-relaxed">
                "{quote.text}"
              </blockquote>
              <p className="text-center text-primary-600 mt-6 font-medium">
                — {quote.author}, {quote.role}
              </p>
            </m.div>
          )}
        </div>
      </div>
      
      {/* Professional Section Transition */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component composition and reusable UI patterns */}
      {/* SECTION SEPARATOR REASON: React documentation recommends component composition for consistent UI elements */}
      <WaveSeparator variant="organic" color="primary-900" />
    </section>
  )
}