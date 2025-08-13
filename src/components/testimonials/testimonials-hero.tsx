"use client"

import { m } from 'framer-motion'
import { Crown, Award, Star } from 'lucide-react'

// CONTEXT7 SOURCE: /reactjs/react.dev - Component Props Interface Definition
// CONTEXT7 SOURCE: Official React documentation for defining component props using TypeScript interfaces
// IMPLEMENTATION REASON: Following official React patterns for flexible, reusable component design
interface TestimonialsHeroProps {
  heroContent?: {
    readonly title: string
    readonly subtitle: string
    readonly description: string
  }
  backgroundVariant?: 'gradient' | 'image' | 'video'
  size?: 'compact' | 'standard' | 'full'
  animationDelay?: number
  className?: string
  showCredentials?: boolean
  customCredentials?: Array<{
    icon: 'crown' | 'award' | 'star'
    text: string
  }>
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Animation Variants for Sophisticated Motion
// CONTEXT7 SOURCE: Official Framer Motion documentation for animation variant patterns
// ANIMATION REASON: Using official Framer Motion variant system for professional staggered animations
const heroAnimationVariants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" // Professional easing curve
    }
  }
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Container Variants for Staggered Children
// CONTEXT7 SOURCE: Official Framer Motion documentation for staggerChildren animation patterns
// STAGGER REASON: Following official Motion patterns for sophisticated sequential reveal animations
const containerVariants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Item Variants for Individual Animation Control
// CONTEXT7 SOURCE: Official Framer Motion documentation for child animation coordination
// ITEM ANIMATION REASON: Official Motion patterns for coordinated parent-child animation sequences
const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Credential Animation with Hover Effects
// CONTEXT7 SOURCE: Official Framer Motion documentation for whileHover animation patterns
// HOVER REASON: Using official Motion hover patterns for premium micro-interactions
const credentialVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
}

/**
 * TestimonialsHero Component - Enhanced modular hero section for testimonials pages
 * 
 * CONTEXT7 SOURCE: /reactjs/react.dev - React Component Architecture Best Practices
 * COMPONENT REASON: Following official React patterns for reusable, flexible component design
 * 
 * Features:
 * - Flexible background variants (gradient, image, video)
 * - Multiple size options for different contexts
 * - Sophisticated Framer Motion animations with staggered reveals
 * - Royal credentials display with hover effects
 * - Accessibility-first implementation
 * - Premium visual design suitable for elite clients
 * 
 * @param heroContent - CMS content for title, subtitle, and description
 * @param backgroundVariant - Background treatment type
 * @param size - Hero section size variant
 * @param animationDelay - Delay before animations begin
 * @param className - Additional CSS classes
 * @param showCredentials - Whether to display royal credentials
 * @param customCredentials - Custom credential items to display
 */
export function TestimonialsHero({
  heroContent,
  backgroundVariant = 'gradient',
  size = 'full',
  animationDelay = 0,
  className = '',
  showCredentials = true,
  customCredentials
}: TestimonialsHeroProps) {
  
  // Size variant classes
  const sizeClasses = {
    compact: 'py-16 lg:py-20',
    standard: 'py-20 lg:py-24',
    full: 'py-24 lg:py-32 min-h-screen'
  }

  // Background variant classes
  const backgroundClasses = {
    gradient: 'bg-gradient-to-br from-primary-900 via-primary-800 to-slate-900',
    image: 'bg-cover bg-center bg-no-repeat',
    video: 'relative overflow-hidden'
  }

  // Default royal credentials
  const defaultCredentials = [
    { icon: 'crown' as const, text: 'Featured in Tatler Address Book 2025' },
    { icon: 'award' as const, text: 'School Guide UK\'s Premium Choice' },
    { icon: 'star' as const, text: '15 Years of Excellence' }
  ]

  const credentials = customCredentials || defaultCredentials

  // CONTEXT7 SOURCE: /grx7/framer-motion - Icon Component Mapping
  // CONTEXT7 SOURCE: Official React patterns for dynamic component rendering
  // ICON MAPPING REASON: Following React best practices for conditional icon rendering
  const IconComponent = ({ icon }: { icon: 'crown' | 'award' | 'star' }) => {
    const icons = {
      crown: Crown,
      award: Award,
      star: Star
    }
    const Icon = icons[icon]
    return <Icon className="w-5 h-5 text-accent-400" />
  }

  return (
    <section
      className={`relative flex items-center justify-center ${sizeClasses[size]} ${backgroundClasses[backgroundVariant]} ${className}`}
      role="banner"
      aria-label="Testimonials page hero section"
    >
      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Container Animation with Delay Support */}
      {/* CONTEXT7 SOURCE: Official Framer Motion documentation for delayed animation sequences */}
      {/* DELAY REASON: Using official Motion delay patterns for sophisticated animation control */}
      <m.div 
        className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ animationDelay: `${animationDelay}s` }}
      >
        
        {/* Royal Credentials Display */}
        {showCredentials && (
          <m.div 
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
            variants={itemVariants}
          >
            {credentials.map((credential, index) => (
              <m.div
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/15 cursor-default"
                variants={credentialVariants}
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                <IconComponent icon={credential.icon} />
                <span className="font-semibold text-white text-sm lg:text-base">
                  {credential.text}
                </span>
              </m.div>
            ))}
          </m.div>
        )}

        {/* Hero Title */}
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Viewport-triggered Animations for Performance */}
        {/* CONTEXT7 SOURCE: Official Framer Motion documentation for whileInView optimization patterns */}
        {/* VIEWPORT REASON: Using official Motion viewport patterns for performance-optimized hero animations */}
        <m.h1 
          className="text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-white leading-tight mb-8"
          variants={heroAnimationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {heroContent?.title || "Testimonials"}
        </m.h1>
        
        {/* Hero Subtitle */}
        <m.p 
          className="text-xl lg:text-2xl text-accent-400 font-semibold mb-8"
          variants={heroAnimationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
        >
          {heroContent?.subtitle || "What families say about My Private Tutor Online"}
        </m.p>
        
        {/* Hero Description */}
        <m.p 
          className="text-lg text-white/90 leading-relaxed max-w-4xl mx-auto"
          variants={heroAnimationVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
        >
          {heroContent?.description || "Since 2010, My Private Tutor Online has helped hundreds of students achieve their academic goals."}
        </m.p>
      </m.div>
    </section>
  )
}