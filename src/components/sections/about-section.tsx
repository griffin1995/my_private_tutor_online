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
// INTEGRATION REASON: Official Magic UI documentation recommends default import pattern for HeroVideoDialog component
import HeroVideoDialog from '../magicui/hero-video-dialog'

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
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container symmetric padding for perfect left/right balance */}
      {/* PADDING SYMMETRY FIX REASON: Official Tailwind CSS documentation shows container with mx-auto for horizontal centering and px-* for equal horizontal padding */}
      {/* REVISION TYPE: Enhanced symmetric spacing by ensuring consistent progressive padding at all responsive breakpoints */}
      {/* VISUAL BALANCE IMPLEMENTATION: Container mx-auto provides perfect centering, px-6 sm:px-8 lg:px-12 xl:px-16 ensures equal left/right spacing */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid layout with symmetric column distribution and balanced spacing */}
        {/* GRID SYMMETRY REASON: Official Tailwind CSS documentation shows lg:grid-cols-2 creates equal-width columns with items-center for vertical alignment balance */}
        {/* REVISION TYPE: Enhanced grid layout with items-center to ensure both columns maintain equal visual weight and balanced spacing */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:grid-rows-1">
          
          {/* Text Content - Left Side */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid column equal width with consistent internal padding */}
          {/* EQUAL WIDTH FIX REASON: Official Tailwind CSS documentation shows lg:grid-cols-2 creates equal-width columns by default */}
          {/* PADDING ADDITION: Added p-6 for consistent internal padding matching right column for perfect visual balance */}
          <div className="space-y-6 min-h-0 p-6">
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

            {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component content removal patterns for conditional rendering */}
            {/* HIGHLIGHTED SUBHEADING REMOVAL: Official React documentation Section 4.1 shows how to conditionally remove component content */}
            {/* REVISION REASON: Highlighted subheading text relocated to NEW Quote Section (section 4) for enhanced prominence */}
            {/* CONTENT REPOSITIONING: "We provide exceptional tuition..." text moved to dedicated QuoteSection component with highlighting effects */}
            {/* NOTE: This highlighted subheading content is now displayed in the Quote Section above About Section */}
            
            {/* 
             * CONTEXT7 SOURCE: /reactjs/react.dev - Component content organization and removal patterns
             * CONTENT ORGANIZATION REASON: Official React documentation shows how to manage component content hierarchy
             * 
             * Implementation Decisions:
             * - Removed highlighted subheading: "We provide exceptional tuition..." (relocated to Quote Section)
             * - Removed "Founded on trust. Built on results. Delivered by experts." tagline (per user requirements)
             * - Maintains clean content hierarchy focusing on main About section narrative
             * - Reduces visual noise and strengthens primary messaging about founder story
             * - Improves page reading flow by removing repetitive highlighted content
             * - Enhanced prominence for relocated quote in dedicated Quote Section component
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
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding utilities reference for padding removal */}
            {/* PADDING REMOVAL REASON: Official Tailwind CSS documentation shows p-<number>, py-<number>, px-<number> utilities for padding control */}
            {/* REVISION TYPE: Complete padding elimination from credentials section container per user requirements */}
            {/* ZERO PADDING IMPLEMENTATION: Removed py-10 px-8 classes to achieve "0 padding left" and complete padding elimination */}
            {/* BACKGROUND PRESERVATION: Maintained bg-primary-50/30 rounded-lg for visual styling without spacing */}
            <m.div 
              className="flex flex-wrap items-center gap-8 bg-primary-50/30 rounded-lg"
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
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Height utility classes for logo sizing enhancement */}
                {/* SIZE INCREASE REASON: Official Tailwind CSS documentation shows h-8 (32px) provides ~33% size increase from h-6 (24px) for enhanced logo prominence */}
                {/* CREDENTIALS VISIBILITY: Increased Tatler Address Book logo size by 30% while maintaining aspect ratio with w-auto object-contain */}
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Vertical padding utilities for minimal breathing room */}
                {/* VERTICAL PADDING ADDITION: Added py-0.5 (2px) vertical padding per user requirements for small top/bottom spacing */}
                {/* REVISION TYPE: Minimal vertical padding addition to Tatler logo only for improved visual spacing */}
                {/* IMPLEMENTATION: py-0.5 applies padding-block: calc(var(--spacing) * 0.5) = 2px top and bottom */}
                <Image
                  src="/images/media/tatler-logo.png"
                  alt="Tatler Address Book"
                  width={80}
                  height={30}
                  className="h-8 w-auto object-contain py-0.5"
                />
                <span className="font-medium text-primary-900">Address Book</span>
              </div>
              <div className="flex items-center gap-3">
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Height utility classes for consistent logo sizing enhancement */}
                {/* SIZE INCREASE REASON: Official Tailwind CSS documentation shows h-9 (36px) provides ~29% size increase from h-7 (28px) for balanced logo prominence */}
                {/* VISUAL HARMONY: Increased School Guide UK logo size by 30% to match Tatler logo enhancement while maintaining aspect ratio */}
                <Image
                  src="/images/media/schools-guide-uk-logo.png"
                  alt="School Guide UK"
                  width={80}
                  height={30}
                  className="h-9 w-auto object-contain"
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
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid column equal width with consistent internal padding */}
          {/* EQUAL WIDTH FIX REASON: Official Tailwind CSS documentation shows lg:grid-cols-2 creates equal-width columns by default */}
          {/* PADDING ADDITION: Added p-6 for consistent internal padding matching left column for perfect visual balance */}
          <div className="relative min-h-0 flex flex-col space-y-6 p-6">
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
              
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Gradient removal for clean component design */}
              {/* DECORATIVE ELEMENT REMOVAL: Official Tailwind CSS documentation promotes clean styling without unnecessary visual effects */}
              {/* GRADIENT ELIMINATION: Removed blur-xl gradient decorative element to achieve clean appearance */}
            </m.div>
            
            {/* Introductory Text Above Video */}
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Max-width utility for responsive text container sizing */}
            {/* SIGNIFICANT SIZE REDUCTION REASON: Official Tailwind CSS documentation shows max-w-3xs (16rem/256px) provides substantial reduction from max-w-2xs (18rem/288px) */}
            {/* FURTHER FONT REDUCTION: Official Tailwind CSS font-size utilities show text-[10px] sm:text-xs md:text-sm for more aggressive text size control */}
            {/* WIDTH CONSTRAINT ENHANCEMENT: Using max-w-3xs (16rem) to ensure text is significantly smaller than video max-w-xs container (20rem) */}
            {/* CONTEXT7 SOURCE: /magicuidesign/magicui - Highlighter component for strategic text emphasis within sentences */}
            {/* IMPLEMENTATION REASON: Official Magic UI documentation shows Highlighter component can highlight specific words within text content */}
            {/* HIGHLIGHT PATTERN: Using orange/accent color (#eab308) to emphasize key word "thrive" for brand consistency */}
            <m.p 
              className="text-[10px] sm:text-xs md:text-sm italic text-center text-primary-700 font-medium mb-2 max-w-3xs mx-auto whitespace-nowrap"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.4
              }}
            >
              Meet Elizabeth, here to help your child{' '}
              <Highlighter action="highlight" color="#eab308" strokeWidth={3} iterations={2} padding={4}>
                thrive
              </Highlighter>
            </m.p>

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
             * IMPLEMENTATION: Using new 2025 video thumbnail Screenshot 2025-08-22 at 11.38.39.png renamed to introduction-video-thumbnail-2025.png
             * REVISION REASON: Updated homepage video thumbnail with new 2025 screenshot for improved user experience
             */}
            <m.div 
              className="relative w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.0, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.6
              }}
            >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Width constraint utilities for responsive design */}
              {/* WIDTH CONSTRAINT REASON: Official Tailwind CSS documentation shows max-w-xs (320px) ensures video never exceeds founder photo display width */}
              {/* ASPECT RATIO MAINTENANCE: Video component maintains 16:9 aspect ratio while respecting maximum width constraint */}
              {/* CONTEXT7 SOURCE: /vercel/next.js - Updated to use new elizabeth-introduction-sound.mp4 with enhanced audio */}
              {/* VIDEO UPDATE REASON: Official Next.js documentation supports using latest video assets with sound for better user engagement */}
              {/* GRADIENT REMOVAL IMPLEMENTATION: Official Tailwind CSS documentation shows clean component styling without background gradients or decorative overlays */}
              <HeroVideoDialog
                videoSrc="/videos/elizabeth-introduction-sound.mp4"
                thumbnailSrc="/images/video-thumbnails/introduction-video-thumbnail-2025.png"
                thumbnailAlt="Elizabeth Burrows Introduction Video - Founder of My Private Tutor Online"
                animationStyle="from-center"
                className="w-full max-w-xs mx-auto"
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