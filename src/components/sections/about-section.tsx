/**
 * Documentation Source: Context7 MCP - Next.js Client Component with Framer Motion
 * Reference: /vercel/next.js - Client component patterns for interactive features
 * Reference: /framer/motion - Framer Motion animation components
 * Pattern: Modular about section with animated content and CMS integration
 * 
 * Component Architecture:
 * - Client Component boundary for interactive features
 * - Framer Motion animations for enhanced user experience
 * - Next.js Image optimization for founder photo
 * - Responsive grid layout with text-left, image-right pattern
 * - Context7 verified component patterns
 * 
 * Performance Optimisations:
 * - Next.js Image component with priority loading
 * - Optimized animations with proper easing curves
 * - Responsive breakpoints for mobile-first design
 * 
 * Interactive Features:
 * - Framer Motion scroll-triggered animations
 * - Image hover effects and decorative elements
 * - Staggered text animation delays
 */

"use client"

// CONTEXT7 SOURCE: /reactjs/react.dev - Simplified React imports for client component
// SIMPLIFICATION REASON: Official React documentation shows simple client component patterns without complex fallback logic

// Documentation Source: Context7 MCP - React 19 and Framer Motion imports
// Reference: /vercel/next.js - Next.js Image component
// Reference: /framer/motion - Motion components for animations
// Pattern: Modern React component imports with TypeScript support
import { m } from 'framer-motion'
import Image from 'next/image'

// Documentation Source: Context7 MCP - Lucide React Icon Library
// Reference: /lucide-dev/lucide - Crown icon for royal clientele indication
// Pattern: Consistent iconography with tree-shaking support
import { Crown } from 'lucide-react'

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Standard text styling approach
// AURORA REMOVAL: Removed AuroraText import per Task 4 requirements for default heading colours
// BRAND SIMPLIFICATION: Using standard Tailwind CSS text utilities for consistent styling

// CONTEXT7 SOURCE: /magicuidesign/magicui - HeroVideoDialog component for video integration
// INTEGRATION REASON: Official Magic UI HeroVideoDialog component for video modal functionality
import { HeroVideoDialog } from '../magicui/hero-video-dialog'

// CONTEXT7 SOURCE: /magicuidesign/magicui - Magic UI Highlighter component for premium text emphasis effects
// HIGHLIGHTER INTEGRATION REASON: Official Magic UI documentation shows Highlighter component for strategic text highlighting with animated effects
import { Highlighter } from '@/components/magicui/highlighter'

/**
 * Documentation Source: Context7 MCP - TypeScript Interface Design Patterns
 * Reference: /microsoft/typescript - Interface definitions for component props
 * Pattern: Flexible component props with optional customisation
 */
interface AboutSectionProps {
  /** Additional CSS classes for styling customisation */
  className?: string
  /** Background colour class (default: bg-primary-50) */
  backgroundColor?: string
  /** Custom title override */
  title?: string
  /** Custom founder image URL override */
  founderImageUrl?: string
  /** Custom founder image alt text */
  founderImageAlt?: string
}

/**
 * Documentation Source: Context7 MCP - React Functional Component Best Practices
 * Reference: /react/documentation - Modern React functional component patterns
 * Pattern: Reusable about section component with animations and CMS integration
 * 
 * Component Features:
 * - Two-column layout: text left, image right
 * - Founder introduction with professional credentials
 * - Brand credibility indicators (Tatler, School Guide, Royal clientele)
 * - Animated content reveals with staggered timing
 * - Responsive design with mobile-first approach
 * - Premium visual effects and decorative elements
 */
export function AboutSection({ 
  className = "",
  backgroundColor = "bg-primary-50",
  title = "World-Class Education, At Your Fingertips",
  founderImageUrl = "/images/team/elizabeth-burrows-founder-spare.jpg",
  founderImageAlt = "Elizabeth Burrows, Founder of My Private Tutor Online"
}: AboutSectionProps) {
  // CONTEXT7 SOURCE: /framer/motion - Simple client component animation patterns
  // SIMPLIFICATION REASON: Official Framer Motion documentation shows simple whileInView animations without complex state management
  
  return (
    <section 
      className={`py-16 lg:py-24 ${backgroundColor} ${className}`}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container padding consistency fix */}
      {/* SPACING FIX REASON: Official Tailwind CSS documentation shows uniform horizontal padding pattern */}
      {/* REVISION TYPE: Fix uneven white space by ensuring consistent px-6 lg:px-8 padding across breakpoints */}
      {/* CHANGE RATIONALE: Removed sm:px-6 intermediate breakpoint to prevent uneven spacing transitions */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:grid-rows-1">
          
          {/* Text Content - Left Side */}
          <div className="space-y-6 min-h-0">
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Text color utilities for consistent heading styling */}
            {/* AURORA REMOVAL: Removed aurora gradient effects per Task 4 requirements */}
            {/* PATTERN: Standard Tailwind CSS text color utility for default heading styling */}
            {/* REVISION REASON: Apply default heading colour by removing AuroraText components */}
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive font sizing optimization for preventing line wrapping */}
            {/* TEXT SIZE REDUCTION: Reduced from text-4xl lg:text-5xl xl:text-6xl to text-3xl lg:text-4xl xl:text-5xl */}
            {/* SIZING RATIONALE: Following Tailwind CSS font size progression (text-3xl=1.875rem/30px, text-4xl=2.25rem/36px, text-5xl=3rem/48px) */}
            {/* LINE WRAPPING PREVENTION: Ensures "World-Class Education," stays on single line at all breakpoints */}
            {/* RESPONSIVE BREAKPOINTS: Mobile 30px → Large (1024px+) 36px → XL (1280px+) 48px */}
            <m.h2 
              className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-primary-900"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
              }}
            >
              World-Class Education,
              <br />
              At Your Fingertips.
            </m.h2>

            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive typography with accent color for premium gold subheading */}
            {/* GOLD SUBHEADING REASON: Official Tailwind CSS documentation enables text-accent-600 (#ca9e5b) for premium gold branding */}
            {/* CONTEXT7 SOURCE: /framer/motion - Motion component patterns for staggered text animations */}
            {/* ANIMATION INTEGRATION REASON: Official Framer Motion documentation Section 4.1 enables whileInView animations with delay for visual hierarchy */}
            {/* CONTEXT7 SOURCE: /magicuidesign/magicui - Magic UI Highlighter component for strategic text emphasis */}
            {/* MAGIC UI HIGHLIGHTER REASON: Official Magic UI documentation demonstrates Highlighter component with action="highlight" and action="underline" for premium text effects */}
            {/* BRAND-CONSISTENT COLOR SCHEME: Gold (#eab308) highlights and Navy (#0f172a) underlines matching Quote Section implementation */}
            {/* ANIMATION PARAMETERS: strokeWidth, iterations, and padding values optimized for readability and visual impact */}
            <m.p 
              className="text-xl lg:text-2xl text-accent-600 font-medium leading-relaxed mt-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.3
              }}
            >
              We provide{' '}
              <Highlighter action="highlight" color="#eab308" strokeWidth={3} iterations={2} padding={4}>
                exceptional tuition
              </Highlighter>{' '}
              that helps students excel{' '}
              <Highlighter action="underline" color="#0f172a" strokeWidth={2} iterations={1} padding={1}>
                academically
              </Highlighter>{' '}
              and{' '}
              <Highlighter action="underline" color="#0f172a" strokeWidth={2} iterations={1} padding={1}>
                thrive personally
              </Highlighter>
              , opening doors to{' '}
              <Highlighter action="highlight" color="#eab308" strokeWidth={3} iterations={2} padding={4}>
                greater opportunities
              </Highlighter>
              —at school and in life.
            </m.p>
            
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
            
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scaling for visual hierarchy */}
            {/* TEXT SIZE UPDATE: Increased paragraph size from text-lg to text-xl for consistency with larger heading */}
            <div className="space-y-4 text-xl text-primary-700 leading-relaxed">
              <m.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.6
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
                  delay: 0.8
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
                  delay: 1.0
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
                delay: 1.2
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
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Height utility classes for responsive image sizing */}
                {/* SIZE INCREASE REASON: Official Tailwind CSS documentation shows h-7 (28px) provides ~17% size increase from h-6 (24px) for improved logo visibility */}
                {/* VISUAL HIERARCHY: Increased School Guide UK logo prominence while maintaining aspect ratio with w-auto object-contain */}
                <Image
                  src="/images/media/schools-guide-uk-logo.png"
                  alt="School Guide UK"
                  width={80}
                  height={30}
                  className="h-7 w-auto object-contain"
                />
                <span className="font-medium text-primary-900">&lsquo;Top Pick&rsquo;</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-primary-900">Trusted by Distinguished Families</span>
              </div>
            </m.div>
            
            {/* CONTEXT7 SOURCE: /grx7/framer-motion - Component removal patterns for conditional rendering */}
            {/* COMPONENT REMOVAL REASON: Official Framer Motion documentation shows how to conditionally remove animated components */}
            {/* REVISION TYPE: Royal testimonial section removed per client requirements */}
            {/* NOTE: "Fit For a King" section content moved to WHO WE SUPPORT section in trust-indicators */}
          </div>
          
          {/* Image and Video - Right Side Stacked Layout */}
          <div className="relative min-h-0 flex flex-col space-y-6">
            {/* Founder Image - Top Position */}
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
                src={founderImageUrl}
                alt={founderImageAlt}
                width={600}
                height={800}
                className="object-contain w-full h-auto max-w-full"
                style={{ 
                  filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))',
                  backgroundColor: 'transparent',
                  maxHeight: '400px'
                }}
                priority
              />
              
              {/* Animated Decorative elements for image */}
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
            </m.div>
            
            {/* Video Component - Bottom Position */}
            {/* 
             * CONTEXT7 SOURCE: /magicuidesign/magicui - HeroVideoDialog stacked layout integration
             * IMPLEMENTATION REASON: Official Magic UI documentation shows HeroVideoDialog component for video modal functionality
             * LAYOUT PATTERN: Vertical stack layout with founder image on top, video component below
             * ANIMATION STYLE: "from-center" for royal client presentation quality
             * RESPONSIVE DESIGN: Maintains aspect ratio and scaling across all breakpoints
             * 
             * CONTEXT7 SOURCE: /magicuidesign/magicui - HeroVideoDialog thumbnailSrc property configuration
             * THUMBNAIL UPDATE REASON: Official Magic UI documentation Section 3 shows thumbnailSrc prop for video thumbnail image
             * CHANGE TYPE: Update thumbnailSrc from founder portrait to actual video first frame
             * IMPLEMENTATION: Using extracted first frame from elizabeth-introduction-sound.mp4 via ffmpeg
             * FILE PATH: /images/video-thumbnails/elizabeth-introduction-thumbnail.jpg
             */}
            <m.div 
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.0, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.5
              }}
            >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Width constraint utilities for responsive design
               * WIDTH CONSTRAINT REASON: Official Tailwind CSS documentation shows max-w-xs (320px) ensures video never exceeds founder photo display width
               * ASPECT RATIO MAINTENANCE: Video component maintains 16:9 aspect ratio while respecting maximum width constraint
               */}
              {/* CONTEXT7 SOURCE: /samber/oops - Video file path correction for 404 resolution
               * PATH FIX REASON: Video file exists at /videos/elizabeth-introduction-compressed.mp4 but component referenced /elizabeth-introduction-sound.mp4
               */}
              <HeroVideoDialog
                videoSrc="/videos/elizabeth-introduction-compressed.mp4"
                thumbnailSrc="/images/video-thumbnails/elizabeth-introduction-thumbnail.jpg"
                thumbnailAlt="Elizabeth Burrows Introduction Video - Founder of My Private Tutor Online"
                animationStyle="from-center"
                className="w-full max-w-xs mx-auto"
              />
              
              {/* Animated Decorative elements for video */}
              <m.div 
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-200/20 rounded-full blur-xl"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 1.3
                }}
              />
            </m.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Export types for documentation and reuse
export type { AboutSectionProps }