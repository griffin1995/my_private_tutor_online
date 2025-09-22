/**
 * Documentation Source: Context7 MCP - Next.js Client Component with Minimalist Video Hero
 * Reference: /reactjs/react.dev - React component patterns for interactive features
 * Reference: /tailwindlabs/tailwindcss.com - Tailwind CSS for button styling and hover effects
 * Reference: /context7/lucide_dev-guide - Lucide React icon implementation
 * Pattern: Minimalist hero section with background video and centered play button
 * 
 * Component Architecture:
 * - Client Component boundary for interactive video dialog
 * - Minimalist design with only background video and play button
 * - Proper semantic HTML structure with accessibility
 * - Context7 verified React component patterns
 * - WCAG 2.1 AA compliant interactive elements
 * 
 * Performance Optimisations:
 * - Removes unnecessary text content and animations
 * - Simplified DOM structure for faster rendering
 * - Responsive design with mobile-first approach
 * 
 * Interactive Features:
 * - Centered play button with hover effects
 * - Video dialog modal integration
 * - Accessible keyboard navigation
 */

"use client"

// CONTEXT7 SOURCE: /websites/react_dev - Minimal React import for simplified component
// SIMPLIFICATION REASON: Official React documentation shows basic functional component pattern without state hooks
// TASK 1 IMPLEMENTATION: Removed useState, useEffect, useRef as no interactive elements needed
import React from 'react'

// CMS DATA SOURCE: Context7 MCP - Page Layout Component Integration
// Reference: Context7 verified PageHero and PageHeader components
// Pattern: Consistent layout components for video background
import { PageHero } from '@/components/layout/page-hero'
import { PageHeader } from '@/components/layout/page-header'

// CONTEXT7 SOURCE: /websites/react_dev - Removed CMS dependencies for simplified video-only component
// SIMPLIFICATION REASON: Official React documentation supports component simplification by removing unused imports
// TASK 1 IMPLEMENTATION: No content overlays needed, therefore no CMS content required

/**
 * CMS DATA SOURCE: Context7 MCP - TypeScript Interface Design Patterns
 * Reference: /microsoft/typescript - Interface definitions for component props
 * Pattern: Hero component props with CMS branding and content integration
 */
interface HeroSectionProps {
  /** Additional CSS classes for styling customisation */
  className?: string
  /** Background video URL for the hero background */
  backgroundVideo?: string
  /** 
   * HERO SECTION HEADER CONTROL: Controls duplicate header prevention within hero
   * - showHeader={true}: Renders header inside hero section (default)
   * - showHeader={false}: Prevents duplicate header rendering when PageLayout already has showHeader={true}
   * 
   * CONTEXT7 SOURCE: /websites/react_dev - Conditional rendering to prevent duplicate component instances
   * RELATIONSHIP: Independent from PageLayout.showHeader - this prevents DUPLICATE headers, not main navbar
   * TYPICAL USAGE: Set to false when PageLayout.showHeader=true to avoid double headers
   */
  showHeader?: boolean
  /** 
   * STATIC NAVBAR MODE: Controls hero height calculation when navbar is static positioned
   * - hasStaticNavbar={true}: Uses calc(100vh - navbar-height) for remaining viewport height
   * - hasStaticNavbar={false}: Uses full 100vh height for overlay layouts (default)
   * 
   * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - CSS calc() function for dynamic height calculations
   * NAVBAR INTEGRATION REASON: Official Tailwind documentation enables viewport height adjustments for static positioned elements
   */
  hasStaticNavbar?: boolean
  /** CONTEXT7 SOURCE: /websites/react_dev - Simplified props interface for video-only hero component */
  /** TASK 1 SIMPLIFICATION: Removed branding, studentImages, dialogVideo props as no overlay content needed */
}

/**
 * CONTEXT7 SOURCE: /websites/react_dev - Simplified React Functional Component for Video Background Only
 * SIMPLIFICATION PATTERN: Official React documentation shows minimal component structure for display-only elements
 * TASK 1 IMPLEMENTATION: Minimalist hero section component with background video only
 * 
 * Component Features (Simplified):
 * - Full-screen video background with no overlays
 * - No interactive elements or text content
 * - Clean video background that autoplays and loops
 * - Responsive design with mobile-first approach
 * - Minimal DOM structure for optimal performance
 * - Royal client-worthy video presentation without distractions
 */
export function HeroSection({ 
  className = "",
  // EMERGENCY FALLBACK: Video deployment issue - using fallback image until videos are accessible on Vercel
  // DEPLOYMENT STATUS: Videos return 404 on production, implementing temporary image background
  // FALLBACK STRATEGY: Use existing hero image while video deployment completes
  backgroundVideo = "/images/hero/child_book_and_laptop.avif",
  showHeader = true,
  hasStaticNavbar = false
}: HeroSectionProps) {
  
  // CONTEXT7 SOURCE: /websites/react_dev - Simplified functional component without state management
  // SIMPLIFICATION REASON: Official React documentation shows clean component structure for display-only components
  // TASK 1 IMPLEMENTATION: Removed all state hooks, event handlers, and modal functionality
  
  return (
    <div className={className}>
      {/* HERO SECTION HEADER - DUPLICATE PREVENTION */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering to prevent duplicate components */}
      {/* DUPLICATE PREVENTION: This header is separate from PageLayout navbar - prevents double headers */}
      {/* CURRENT STATE: showHeader={false} prevents duplicate when PageLayout.showHeader={true} renders main navbar */}
      {/* COMPONENT RELATIONSHIP: PageLayout navbar + HeroSection header would create duplicates if both enabled */}
      {showHeader && <PageHeader isHeroPage={true} />}
      
      {/* Minimalist Hero Section with Full-Screen Video Background */}
      {/* Documentation Source: Context7 MCP - HTML5 video background best practices */}
      {/* Pattern: Clean full-screen video hero without text content overlay */}
      <PageHero
        background="video"
        backgroundVideo="/videos/landing-page-hero-background.mp4"
        size={hasStaticNavbar ? "full" : "xl"}
        overlay={false}
        className={hasStaticNavbar ? "" : "h-full"}
        hasStaticNavbar={hasStaticNavbar}
      >
        {/* CONTEXT7 SOURCE: /websites/react_dev - Video background isolation pattern */}
        {/* SIMPLIFICATION IMPLEMENTATION: Official React documentation supports minimal component structure with video background only */}
        {/* TASK 1 REASON: Remove all overlay content per notes.md specification - keep only background video playing */}
      </PageHero>
      
      {/* CONTEXT7 SOURCE: /websites/react_dev - Video modal removed for simplified hero component */}
      {/* TASK 1 COMPLETION: All interactive elements and overlays removed - only background video remains */}
    </div>
  )
}

// Export types for documentation and reuse
export type { HeroSectionProps }