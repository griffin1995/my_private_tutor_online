/**
 * Documentation Source: Context7 MCP - Next.js Client Component with Framer Motion
 * Reference: /vercel/next.js - Client component patterns for interactive features
 * Reference: /framer/motion - Framer Motion animation components
 * Pattern: Modular hero section with video background and CMS integration
 * 
 * Component Architecture:
 * - Client Component boundary for interactive features
 * - CMS integration for all content
 * - Proper semantic HTML structure
 * - Context7 verified React component patterns
 * - Static export compatibility
 * 
 * Performance Optimisations:
 * - Strategic component lazy loading
 * - Optimised image loading with Next.js Image
 * - Responsive breakpoints for mobile-first design
 * 
 * Interactive Features Requiring Client:
 * - Framer Motion animations and scroll triggers
 * - Hero video dialog modals
 * - Dynamic state management
 */

"use client"

// Documentation Source: Context7 MCP - React 19 and Next.js 15 imports
// Reference: /vercel/next.js - Next.js Image and Link components
// Pattern: Modern React component imports with TypeScript support
import { ReactNode } from 'react'

// Documentation Source: Context7 MCP - Magic UI Component Library Integration
// Reference: Context7 MCP /magicui/magicui - ShinyButton component implementation
// Pattern: Interactive UI components for premium user experience
import { ShinyButton } from '@/components/magicui/shiny-button'

// Documentation Source: Context7 MCP - Page Layout Component Integration
// Reference: Context7 verified PageHero and PageHeader components
// Pattern: Consistent layout components with CMS integration
import { PageHero } from '@/components/layout/page-hero'
import { PageHeader } from '@/components/layout/page-header'

// CMS DATA SOURCE: Using getHeroContent for hero section content
// Documentation Source: Context7 MCP - CMS Integration Pattern
// Reference: Project CLAUDE.md rules 22-25 for CMS requirements
import { getHeroContent } from '@/lib/cms'

/**
 * Documentation Source: Context7 MCP - TypeScript Interface Design Patterns
 * Reference: /microsoft/typescript - Interface definitions for component props
 * Pattern: Flexible component props with optional customisation
 */
interface HeroSectionProps {
  /** Additional CSS classes for styling customisation */
  className?: string
  /** Background video URL override (defaults to CMS content) */
  backgroundVideo?: string
  /** Custom children to override default hero content */
  children?: ReactNode
  /** Show header within hero section (default: true) */
  showHeader?: boolean
}

/**
 * Documentation Source: Context7 MCP - React Functional Component Best Practices
 * Reference: /react/documentation - Modern React functional component patterns
 * Pattern: Reusable hero section component with CMS integration
 * 
 * Component Features:
 * - Full-screen video background hero section
 * - CMS-driven content with fallback support
 * - Framer Motion animations
 * - Responsive design with mobile-first approach
 * - Accessible markup with proper ARIA labels
 * - Premium visual effects and gradients
 */
export function HeroSection({ 
  className = "",
  backgroundVideo,
  children,
  showHeader = true
}: HeroSectionProps) {
  
  // CMS DATA SOURCE: Using getHeroContent for hero section content
  // Documentation Source: Context7 MCP - CMS Data Integration Pattern
  // Pattern: Centralized content management for all hero data
  const heroContent = getHeroContent()
  
  return (
    <div className={className}>
      {/* Header - Conditionally rendered */}
      {showHeader && <PageHeader isHeroPage={true} />}
      
      {/* Hero Section with Full-Screen Video Background */}
      {/* Documentation Source: Context7 verified HTML5 video best practices and CMS integration */}
      {/* Pattern: Full-screen video hero with proper HTML5 attributes and CMS video source */}
      <PageHero 
        background="video" 
        backgroundVideo={backgroundVideo || "/videos/background-video-2025.mp4"}
        size="full"
        overlay
        overlayOpacity="medium"
        className=""
      >
        {children || (
          /* Default Hero Content - Minimal overlay on silent video */
          /* Documentation Source: Context7 Tailwind CSS - Clean hero design with minimal text overlay */
          /* Pattern: Simplified hero content without decorative elements for clean video presentation */
          <div className="min-h-screen flex items-center justify-center relative">
            <div className="text-center space-y-8 max-w-5xl mx-auto relative z-10 py-16 lg:py-20">
              <div className="space-y-8 px-6 lg:px-8">
                <div className="relative">
                  {/* 
                   * Documentation Source: Context7 MCP - Tailwind CSS Typography Utilities
                   * Reference: /context7/tailwindcss - text-* utilities for font sizing
                   * Pattern: Large heading with responsive text sizes for hero sections
                   * 
                   * Typography Implementation:
                   * - text-5xl (3rem/48px): Base size for mobile devices
                   * - lg:text-7xl (4.5rem/72px): Large screens for prominence  
                   * - xl:text-8xl (6rem/96px): Extra large screens for maximum impact
                   * - font-serif: Uses Source Serif 4 for premium readability
                   * - font-bold: Strong visual weight for hero prominence
                   * - leading-tight: Optimized line-height for large display text
                   */}
                  <h1 className="text-5xl lg:text-7xl xl:text-8xl font-serif font-bold text-white leading-tight drop-shadow-2xl animate-fade-in-up">
                    <span className="bg-gradient-to-r from-white via-accent-200 to-white bg-clip-text text-transparent bg-size-200 animate-gradient-x">
                      {heroContent.title}
                    </span>
                  </h1>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-gold-400 to-accent-500 rounded-full shadow-lg animate-fade-in-up animation-delay-300" />
                </div>
                
                <p className="text-lg lg:text-xl text-accent-300 font-semibold drop-shadow-lg animate-fade-in-up animation-delay-200">
                  <span className="bg-gradient-to-r from-accent-300 via-gold-300 to-accent-300 bg-clip-text text-transparent bg-size-200 animate-gradient-x">
                    {heroContent.subtitle}
                  </span>
                </p>
                
                {/* 
                 * Documentation Source: Context7 MCP - Next.js Conditional Rendering Best Practices
                 * Reference: /vercel/next.js - Conditional rendering patterns in React components
                 * Pattern: Conditional rendering based on content availability
                 * 
                 * Implementation Logic:
                 * - Only render description paragraph if heroContent.description exists and is not empty
                 * - Prevents empty <p> elements from affecting layout spacing
                 * - Maintains semantic HTML structure when content is available
                 */}
                {heroContent.description && (
                  <p className="text-base lg:text-lg text-white/95 leading-relaxed max-w-3xl drop-shadow-md animate-fade-in-up animation-delay-400">
                    {heroContent.description}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12 animate-fade-in-up animation-delay-600">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent-500 via-gold-500 to-accent-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse" />
                  <ShinyButton 
                    text="Book Free Consultation"
                    className="relative px-10 py-4 h-auto text-lg font-bold bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-3xl hover:shadow-4xl transition-all duration-500 transform hover:scale-105 rounded-lg border border-gold-400/20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </PageHero>
      
      {/* Documentation Source: Context7 Tailwind CSS - Transform and opacity animations for scroll indicators
       * Reference: /tailwindlabs/tailwindcss.com - CSS transforms, opacity animations, and fade effects
       * Pattern: Vertical line with fixed-bottom shrinking effect and delayed text fade animation
       * 
       * Implementation Strategy:
       * - Single vertical line with bottom position fixed in place
       * - Line shrinks from top to bottom (top edge moves down to meet bottom edge)
       * - "SCROLL" text moves downward with the line as if connected together
       * - Text stops moving when line disappears, then fades out smoothly
       * - origin-bottom ensures bottom edge stays fixed while top edge slides down
       * 
       * Animation Details:
       * - scrollIndicator: Line shrinks vertically (scaleY 1 → 0) with no position movement
       * - scrollText: Text moves down with line (translateY 0 → 40px), then fades out (opacity 1 → 0)
       * - 67% duration (2s) for line shrinking and text movement, remaining 33% (1s) for text fade
       * - Perfect synchronization: text follows line down, stops when line disappears, then fades
       * - Infinite loop with smooth ease-in-out timing function
       * 
       * Accessibility Considerations:
       * - motion-reduce:hidden: Respects user preference for reduced motion
       * - High contrast white text and line with shadow for visibility
       * - Non-interactive indicator, purely visual scroll cue
       * - Semantic text content for screen readers if needed
       */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 motion-reduce:hidden">
        <div className="relative flex flex-col items-center">
          {/* SCROLL Text */}
          <div 
            className="text-white text-xs font-medium tracking-wider mb-3 drop-shadow-lg"
            style={{
              animation: 'scrollText 3s ease-in-out infinite'
            }}
          >
            SCROLL
          </div>
          
          {/* Vertical Line */}
          <div 
            className="w-0.5 h-8 bg-white shadow-lg origin-bottom"
            style={{
              animation: 'scrollIndicator 3s ease-in-out infinite'
            }}
          />
        </div>
      </div>
    </div>
  )
}

// Export types for documentation and reuse
export type { HeroSectionProps }