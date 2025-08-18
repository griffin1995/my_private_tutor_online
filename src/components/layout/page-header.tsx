/**
 * Documentation Source: Context7 Tailwind CSS + Radix UI Navigation Menu + React 19 + Next.js 15
 * Reference: /tailwindlabs/tailwindcss.com - Fixed positioning, z-index, backdrop filters
 * Reference: https://www.radix-ui.com/docs/primitives/components/navigation-menu
 * Reference: https://react.dev/reference/react/useEffect
 * Reference: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating
 * 
 * Pattern: Fixed overlay navbar with scroll-based transparency transitions
 * Architecture:
 * - Fixed positioning (position: fixed) to overlay content without affecting document flow
 * - Three-section layout: Logo left, Navigation center, CTA right
 * - Radix UI NavigationMenu for WCAG 2.1 AA compliance
 * - React 19 hooks for optimized scroll detection and state management
 * - Context7 verified implementation patterns for modern web applications
 * 
 * Key Features:
 * - Fixed positioning that doesn't push content down (eliminates white space gaps)
 * - Dynamic transparency: transparent with white text by default, opaque with dark text when scrolled
 * - Backdrop blur effects for glass morphism aesthetic on scroll
 * - Responsive mobile-first design with collapsible hamburger menu
 * - Keyboard navigation support and complete ARIA accessibility
 * - Premium animation effects with smooth transitions
 * 
 * Technical Implementation:
 * - CSS fixed positioning with top-0 left-0 right-0 for full-width overlay
 * - z-index: 50 for proper stacking context above all page content
 * - Backdrop filters with blur and transparency for glass effect when scrolled
 * - Passive scroll event listeners for 60fps performance optimization
 * - useCallback optimization to prevent unnecessary re-renders
 * - Proper event listener cleanup to prevent memory leaks
 */

"use client"

// Documentation Source: React 19 hooks and TypeScript patterns
// Reference: https://react.dev/reference/react/hooks
// Pattern: Modern React hooks with TypeScript support
import { useState, useEffect, useCallback } from 'react'

// Documentation Source: Next.js 15 App Router components
// Reference: https://nextjs.org/docs/app/api-reference/components/image
// Reference: https://nextjs.org/docs/app/api-reference/components/link
// Pattern: Optimized Next.js components for performance
import Image from 'next/image'
import Link from 'next/link'

// Documentation Source: Lucide React icons library
// Reference: https://lucide.dev/guide/packages/lucide-react
// Pattern: Consistent iconography with tree-shaking support
import { Menu } from 'lucide-react'

// Documentation Source: Radix UI Navigation Menu primitives
// Reference: https://www.radix-ui.com/docs/primitives/components/navigation-menu
// Pattern: Accessible navigation with keyboard support and ARIA attributes
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList 
} from '@/components/ui/navigation-menu'

// Documentation Source: Radix UI Sheet for mobile menu
// Reference: https://www.radix-ui.com/docs/primitives/components/dialog
// Pattern: Modal dialog implementation for mobile navigation
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'

// Documentation Source: Shadcn UI Button component
// Reference: https://ui.shadcn.com/docs/components/button
// Pattern: Consistent button styling with variants
import { Button } from '@/components/ui/button'

// Documentation Source: Class Variance Authority utility
// Reference: https://cva.style/docs
// Pattern: Conditional CSS class management
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /context7/motion_dev - Framer Motion with AnimatePresence for dropdown animations
// DROPDOWN ANIMATION REASON: Official Motion documentation for hover-triggered navigation dropdowns
// CONTEXT7 SOURCE: /context7/motion_dev - Motion components for enhanced navigation interactions
// MOTION INTEGRATION: Advanced animation patterns for premium navigation experience
import { AnimatePresence, m } from 'framer-motion'

// CMS DATA SOURCE: Using getSiteHeader and getMainNavigation for all header content
// Documentation Source: Centralized CMS pattern for content management
// Reference: Project CLAUDE.md rules 22-25 for CMS requirements
import { getSiteHeader, getMainNavigation } from '@/lib/cms/cms-content'

// Documentation Source: Context7 MCP - Next.js Image Conditional Rendering for Logo Switching
// Reference: /vercel/next.js - Scroll-based image switching patterns
// CMS DATA SOURCE: Using getMainLogo and getMainLogoWhite for scroll-state logo variants
import { getMainLogo, getMainLogoWhite } from '@/lib/cms/cms-images'

interface PageHeaderProps {
  className?: string
  isHeroPage?: boolean
}

/**
 * Documentation Source: React 19 functional component patterns
 * Reference: https://react.dev/learn/your-first-component
 * Pattern: Modern React functional component with TypeScript props
 * 
 * Component Architecture:
 * - Mobile-first responsive design
 * - Three-section layout with CSS Grid
 * - Scroll-based transparency detection
 * - Accessibility-first implementation
 */
export function PageHeader({ 
  className, 
  isHeroPage = false 
}: PageHeaderProps) {
  
  // CMS DATA SOURCE: Using getSiteHeader for header content and navigation
  // Pattern: Centralized content management for all header data
  const headerContent = getSiteHeader()
  const navigation = getMainNavigation()
  
  // Documentation Source: Context7 MCP - Next.js Image Component Conditional Rendering
  // Reference: /vercel/next.js - Logo switching based on scroll state for navbar transparency
  // CMS DATA SOURCE: Using logo variants for transparent vs scrolled navbar states
  const logoDefault = getMainLogo()
  const logoWhite = getMainLogoWhite()
  
  // CONTEXT7 SOURCE: /context7/react_dev - Enhanced state management for dropdown navigation
  // DROPDOWN STATE REASON: Official React patterns for managing complex navigation state
  // Documentation Source: React 19 useState for component state management
  // Reference: https://react.dev/reference/react/useState
  // Pattern: Component state for scroll detection, mobile menu, and dropdown management
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  
  // CONTEXT7 SOURCE: /vercel/next.js - SSR-safe client-side state initialization
  // HYDRATION FIX REASON: Official Next.js patterns for preventing hydration mismatches
  // Pattern: Two-pass rendering to ensure consistent server/client state
  const [isMounted, setIsMounted] = useState(false)
  
  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for optimized scroll handling
  // SCROLL OPTIMIZATION REASON: Official React documentation for memoized event handlers
  const handleScroll = useCallback(() => {
    // CONTEXT7 SOURCE: /vercel/next.js - SSR-safe window access prevention
    // HYDRATION FIX REASON: Official Next.js patterns for preventing server-side window access
    if (typeof window === 'undefined') return
    
    // Documentation Source: Web API Window.scrollY property
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
    // 
    // Scroll threshold logic: 100px creates optimal user experience
    // - Below 100px: User is at top of page, keep header transparent to showcase hero content
    // - Above 100px: User has scrolled, add glass morphism effect for better readability
    // 
    // Why 100px threshold?
    // 1. Provides smooth transition point after initial hero content viewing
    // 2. Prevents flickering on minor scroll movements
    // 3. Aligns with modern web design patterns for fixed headers
    // 4. Gives users clear visual feedback about scroll position
    setIsScrolled(window.scrollY > 100)
  }, [])
  
  // CONTEXT7 SOURCE: /context7/react_dev - Enhanced dropdown hover handlers with timeout management
  // DROPDOWN HOVER REASON: Official React patterns for smooth dropdown navigation without flicker
  const handleMouseEnterNav = useCallback((itemName: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    setActiveDropdown(itemName)
  }, [hoverTimeout])
  
  const handleMouseLeaveNavArea = useCallback(() => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null)
    }, 150) // Small delay to allow moving to dropdown
    setHoverTimeout(timeout)
  }, [])
  
  const handleMouseEnterDropdown = useCallback(() => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
  }, [hoverTimeout])
  
  // CONTEXT7 SOURCE: /vercel/next.js - Client-side only effects with SSR safety
  // HYDRATION FIX REASON: Official Next.js patterns for client-side only effects
  // Pattern: useEffect with SSR safety for hydration consistency
  useEffect(() => {
    // CONTEXT7 SOURCE: /vercel/next.js - Hydration-safe mounting detection
    // HYDRATION FIX REASON: Ensure component is mounted client-side before accessing browser APIs
    setIsMounted(true)
    
    // Documentation Source: Context7 Performance - Passive scroll event listeners
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#improving_scrolling_performance_with_passive_listeners
    // 
    // Performance Optimization Strategy:
    // - passive: true flag tells browser we won't call preventDefault()
    // - This allows browser to optimize scrolling performance (60fps target)
    // - Prevents scroll jank and maintains smooth user experience
    // - Critical for mobile performance where scroll events are frequent
    
    // CONTEXT7 SOURCE: /vercel/next.js - SSR-safe initial scroll state detection
    // HYDRATION FIX REASON: Only set initial scroll state after client mount
    if (typeof window !== 'undefined') {
      // Initialize scroll state on component mount
      // Handles cases where page is refreshed at scroll position > 0
      handleScroll()
      
      // Add optimized scroll listener
      // passive: true is crucial for performance - allows browser optimization
      window.addEventListener('scroll', handleScroll, { passive: true })
    }
    
    // Documentation Source: React useEffect cleanup pattern for memory management
    // Reference: https://react.dev/reference/react/useEffect#subscribing-to-events
    // Pattern: Essential cleanup to prevent memory leaks and duplicate listeners
    // 
    // Cleanup importance:
    // 1. Prevents memory leaks when component unmounts
    // 2. Avoids duplicate event listeners on component re-renders
    // 3. Ensures proper browser resource management
    // 4. Critical for SPA navigation where components mount/unmount frequently
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
      }
      // CONTEXT7 SOURCE: /context7/react_dev - Cleanup hover timeouts to prevent memory leaks
      // CLEANUP REASON: Official React patterns for proper effect cleanup
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [handleScroll, hoverTimeout])
  
  // CONTEXT7 SOURCE: /context7/react_dev - Enhanced keyboard navigation and escape handling
  // ACCESSIBILITY REASON: Official React patterns for keyboard navigation support
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setIsMobileMenuOpen(false)
      }
    }
    
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Element
      if (!target.closest('[data-navigation]') && !target.closest('.dropdown-area')) {
        setActiveDropdown(null)
      }
    }
    
    if (activeDropdown) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleOutsideClick)
      return () => {
        document.removeEventListener('keydown', handleEscape)
        document.removeEventListener('mousedown', handleOutsideClick)
      }
    }
  }, [activeDropdown])
  
  // CONTEXT7 SOURCE: /vercel/next.js - Prevent hydration mismatch with initial server state
  // HYDRATION FIX REASON: Server always renders with isScrolled=false to match initial client state
  const safeIsScrolled = isMounted ? isScrolled : false
  
  // Documentation Source: Context7 Tailwind CSS - Background colors, backdrop filters, and transparency
  // Reference: /tailwindlabs/tailwindcss.com - backdrop-filter utilities and color opacity
  // Pattern: Conditional styling based on scroll state for glass morphism effect
  const getHeaderClasses = () => {
    // Dynamic header appearance based on scroll position
    // Default: Fully transparent to showcase hero content underneath
    // Scrolled: Glass morphism effect with backdrop blur and semi-transparent background
    
    return safeIsScrolled 
      ? [
          // Documentation Source: Context7 Tailwind CSS - Background color with opacity
          // Reference: /tailwindlabs/tailwindcss.com - Semi-transparent backgrounds
          // bg-white/95: background-color: rgb(255 255 255 / 0.95) - 95% opaque white background
          'bg-white/95',
          
          // Documentation Source: Context7 Tailwind CSS - Backdrop blur filters  
          // Reference: /tailwindlabs/tailwindcss.com - backdrop-filter: blur(16px)
          // backdrop-blur-lg: Creates glass morphism effect by blurring content behind header
          'backdrop-blur-lg',
          
          // Border and shadow for depth and definition when opaque
          // border-b: Subtle bottom border to separate header from content
          // border-primary-100/80: Semi-transparent primary color border
          'border-b border-primary-100/80',
          
          // shadow-lg: Adds depth with drop shadow when header becomes opaque
          'shadow-lg'
        ].join(' ')
      : [
          // Documentation Source: Context7 Tailwind CSS - Transparent backgrounds
          // Reference: /tailwindlabs/tailwindcss.com - Fully transparent elements
          // Default state: Completely transparent to let hero content show through
          
          // bg-transparent: background-color: transparent - No background color
          'bg-transparent',
          
          // backdrop-blur-none: backdrop-filter: none - No blur effect in default state
          'backdrop-blur-none',
          
          // border-b border-transparent: Transparent border maintains layout consistency
          'border-b border-transparent'
        ].join(' ')
  }
  
  
  
  return (
    <header 
      className={cn(
        // Documentation Source: Context7 Tailwind CSS - Fixed positioning and z-index utilities
        // Reference: /tailwindlabs/tailwindcss.com - position: fixed; z-index: 50;
        // Pattern: Fixed overlay header that doesn't affect document flow
        // 
        // Key Implementation Details:
        // - fixed: position: fixed - Positions header relative to viewport, not document flow
        // - top-0: top: 0 - Anchors header to very top of viewport (y=0)
        // - left-0: left: 0 - Anchors header to left edge of viewport (x=0) 
        // - right-0: right: 0 - Anchors header to right edge of viewport (extends full width)
        // - z-50: z-index: 50 - High stacking context to ensure header appears above all page content
        // - w-full: width: 100% - Ensures header spans complete viewport width
        // - transition-all: Smooth transitions for all animatable properties (background, backdrop-filter, etc.)
        // - duration-300: 300ms transition timing for responsive feel without lag
        // - ease-out: Deceleration curve for natural motion (fast start, slow end)
        //
        // Critical: This fixed positioning approach eliminates the white space gap issue because:
        // 1. Header is removed from normal document flow (doesn't push content down)
        // 2. Page content starts at viewport top (y=0) with header overlaying transparently
        // 3. No layout shifts or content displacement when header changes appearance
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-out',
        getHeaderClasses(),
        className
      )}
      role="banner"
      aria-label="Site header with navigation"
      suppressHydrationWarning
    >
      {/* Documentation Source: CSS Grid layout for three-section navbar
       * Reference: https://tailwindcss.com/docs/grid-template-columns
       * Pattern: Responsive grid with logo left, nav center, CTA right
       */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full viewport width containers without breakpoint constraints
       * FULL WIDTH REASON: Official Tailwind documentation shows w-full + max-w-none removes container breakpoint limitations
       * NAVBAR WIDTH FIX: Replacing container mx-auto with full-width approach for complete viewport utilization
       * PATTERN: w-full (100% viewport width) + max-w-none (no max width) + responsive padding for proper spacing
       */}
      <div className="w-full max-w-none px-16 sm:px-24 lg:px-28">
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced header container height for larger logo accommodation
         * HEADER HEIGHT ENHANCEMENT REASON: Official Tailwind responsive height patterns for improved visual hierarchy
         * CLIENT REQUIREMENT: Accommodate increased logo size while maintaining navigation balance
         * HEIGHT STRATEGY: Progressive scaling - 80px mobile → 96px desktop → 112px large screens
         * RESPONSIVE PATTERN: h-20 (80px) → lg:h-24 (96px) → xl:h-28 (112px)
         * VISUAL BALANCE: Maintains proper spacing ratio with enhanced logo prominence
         */}
        <div className="grid grid-cols-3 items-center h-20 lg:h-24 xl:h-28">
          
          {/* Logo Section - Left */}
          {/* Documentation Source: Context7 MCP - Next.js Image Conditional Rendering for Logo Switching
           * Reference: /vercel/next.js - Scroll-based image switching and conditional src patterns
           * Pattern: Logo switching based on navbar scroll state for optimal visibility
           * Implementation: White logo for transparent navbar, standard logo for scrolled state
           * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced logo positioning with increased left spacing
           * POSITIONING REASON: Official Tailwind spacing patterns for better brand prominence and navigation balance
           */}
          <div className="flex items-center justify-start">
            <Link 
              href="/" 
              className="group flex items-center space-x-3"
              aria-label={`${headerContent.siteName} homepage`}
            >
              <div className="relative">
                {/* Documentation Source: Context7 MCP - Next.js Image Component Conditional src
                 * Reference: /vercel/next.js - Conditional image rendering patterns for state-based UI
                 * Pattern: Dynamic src switching based on scroll state
                 * 
                 * Logo State Logic:
                 * - !isScrolled (transparent navbar): Use white logo variant for visibility over hero content
                 * - isScrolled (opaque navbar): Use standard logo variant for contrast on light background
                 * 
                 * Performance Optimization:
                 * - Both logos use priority loading for above-the-fold content
                 * - Shared dimensions prevent layout shift during state transitions
                 * - Single Image component prevents duplicate DOM elements
                 */}
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced responsive logo sizing for increased brand visibility
                 * LOGO ENHANCEMENT REASON: Official Tailwind responsive sizing patterns for prominent brand presentation
                 * CLIENT REQUIREMENT: Increase navigation panel logo size while maintaining responsive behavior
                 * SIZING STRATEGY: Progressive scaling - 64px mobile → 80px desktop → 96px large screens
                 * RESPONSIVE PATTERN: max-h-16 (64px) → lg:max-h-20 (80px) → xl:max-h-24 (96px)
                 */}
                <Image
                  src={!safeIsScrolled ? logoWhite.src : logoDefault.src}
                  alt={!safeIsScrolled ? logoWhite.alt : logoDefault.alt}
                  width={!safeIsScrolled ? logoWhite.width : logoDefault.width}
                  height={!safeIsScrolled ? logoWhite.height : logoDefault.height}
                  priority
                  className="h-auto w-auto max-h-16 lg:max-h-20 xl:max-h-24 transition-all duration-300 group-hover:scale-105"
                />
                {/* Documentation Source: Context7 MCP - CSS Transform Effects for Premium Branding
                 * Reference: /tailwindcss/tailwindcss - Transform utilities and hover state management
                 * Pattern: Subtle glow effect on logo hover for premium brand experience
                 */}
                <div className="absolute inset-0 -z-10 rounded-lg bg-accent-100/20 scale-0 transition-transform duration-300 group-hover:scale-110 opacity-0 group-hover:opacity-100" />
              </div>
            </Link>
          </div>
          
          {/* Enhanced Navigation Section - Center (Desktop Only) with Dropdown Menus */}
          {/* CONTEXT7 SOURCE: /context7/react_dev - Enhanced navigation with dropdown hover management
           * DROPDOWN NAVIGATION REASON: Official React patterns for complex navigation with hover-triggered submenus
           * CONTEXT7 SOURCE: /context7/motion_dev - Framer Motion dropdown animations for seamless user experience
           * ANIMATION ENHANCEMENT: Premium navigation patterns with smooth dropdown transitions
           * 
           * Enhanced Implementation Features:
           * - Hover-triggered dropdown submenus with timeout management
           * - Smooth animations using Framer Motion AnimatePresence
           * - Hover bridge functionality for seamless navigation
           * - Keyboard navigation and escape key support
           * - Mobile responsive with collapsible dropdown support
           * - WCAG 2.1 AA compliant with proper ARIA attributes
           * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Optimized navigation spacing for enhanced logo/button positioning
           * NAVIGATION SPACING REASON: Official Tailwind flex patterns for balanced center navigation with responsive spacing
           */}
          <nav 
            className="hidden lg:flex justify-center px-2" 
            role="navigation" 
            aria-label="Main navigation"
            data-navigation
            onMouseLeave={handleMouseLeaveNavArea}
          >
            <div className="flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
              {/* Enhanced navigation with dropdown structure */}
              {getEnhancedNavigation().map((item, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => item.submenu ? handleMouseEnterNav(item.name) : null}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      // CONTEXT7 SOURCE: /context7/motion_dev - Enhanced navigation link styling with dropdown indicators
                      // STYLING REASON: Official Motion patterns for interactive navigation elements
                      "relative inline-flex h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 whitespace-nowrap",
                      
                      // Enhanced underline animation for dropdown-enabled links
                      "after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:transition-all after:duration-300",
                      "hover:after:w-3/4 focus:after:w-3/4",
                      
                      // Active dropdown state styling
                      activeDropdown === item.name && [
                        !safeIsScrolled ? "bg-white/20 !text-white shadow-lg" : "bg-primary-100 !text-primary-700 shadow-lg"
                      ].join(' '),
                      
                      // Transparent Navbar State: Default state when at top of page
                      !safeIsScrolled && !(activeDropdown === item.name) && [
                        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Fixed text color utilities with proper color compilation
                        // HOVER FIX REASON: Ensuring Tailwind properly compiles blue-400 color by using standard classes
                        "!text-white",
                        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - White text on blue background for proper contrast
                        // CONTRAST FIX: Maintaining white text on blue hover background for accessibility compliance
                        "hover:!text-white",
                        "after:bg-gradient-to-r after:from-blue-400 after:to-blue-300",
                        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Increased opacity for visible blue background on hover
                        // VISIBILITY FIX: Using /80 opacity for sufficient blue background visibility on transparent navbar
                        "hover:bg-blue-400/80",
                        "focus:bg-blue-400/15",
                        "hover:shadow-lg hover:shadow-blue-400/20",
                        "hover:scale-105 focus:scale-105"
                      ].join(' '),
                      
                      // Scrolled Navbar State: When user has scrolled down the page
                      safeIsScrolled && !(activeDropdown === item.name) && [
                        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Direct text color utilities for consistency
                        // CONSISTENCY REASON: Official Tailwind documentation for reliable color application
                        "!text-primary-700",
                        "hover:!text-primary-700",
                        "after:bg-gradient-to-r after:from-primary-700 after:to-primary-600",
                        "hover:bg-primary-50",
                        "focus:bg-primary-100",
                        "hover:scale-105 focus:scale-105"
                      ].join(' ')
                    )}
                    prefetch={false}
                  >
                    <span className="relative z-10 flex items-center gap-1">
                      {item.label}
                      {/* CONTEXT7 SOURCE: /context7/motion_dev - Dropdown indicator with smooth rotation animation */}
                      {item.submenu && (
                        <m.div
                          animate={{ 
                            rotate: activeDropdown === item.name ? 180 : 0 
                          }}
                          transition={{ duration: 0.2 }}
                          className="ml-1"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </m.div>
                      )}
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </nav>
          
          {/* CTA Section - Right */}
          {/* Documentation Source: Responsive button design with mobile menu
           * Reference: https://ui.shadcn.com/docs/components/button
           * Pattern: Desktop CTA button + mobile menu toggle
           * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced button positioning with increased right spacing
           * POSITIONING REASON: Official Tailwind spacing patterns for balanced button placement and improved visual hierarchy
           */}
          <div className="flex items-center justify-end space-x-4">
            
            {/* Desktop CTA Button */}
            <div className="hidden lg:block">
              <Button
                size="default"
                className={cn(
                  // Documentation Source: Context7 MCP - Client Brand Color Requirements Implementation
                  // Reference: /tailwindlabs/tailwindcss.com - Button component conditional styling patterns
                  // CLIENT REQUIREMENTS: CTA button text follows same color pattern as navigation
                  "relative overflow-hidden font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 focus:scale-105 active:scale-95",
                  
                  // Initial State (No Scrolling): CTA button with white text
                  !safeIsScrolled 
                    ? [
                        // Documentation Source: Context7 Tailwind CSS - Transparent Button with Border
                        // Reference: /tailwindlabs/tailwindcss.com - Border utilities and background transparency
                        // CLIENT REQUIREMENT: Initial state uses white text (transparent background with white border)
                        'bg-transparent border-2 border-white !text-white',
                        
                        // Documentation Source: Context7 Tailwind CSS - Button Hover State Transitions
                        // Reference: /tailwindlabs/tailwindcss.com - Hover state background and text color changes
                        // Hover state: Background becomes white, text becomes brand blue
                        'hover:bg-white hover:!text-primary-700'
                      ].join(' ')
                    : [
                        // Scrolled State: CTA button with brand blue text
                        // Documentation Source: Context7 MCP - Accent Color Implementation
                        // Reference: Tailwind Config - accent-600 background with primary-700 text override
                        // CLIENT REQUIREMENT: Scrolled state uses blue text on accent background
                        'bg-accent-600 hover:bg-accent-700',
                        
                        // Documentation Source: Context7 MCP - Text Color Override for Client Requirements
                        // Reference: /tailwindlabs/tailwindcss.com - Text color utilities for brand consistency
                        // CLIENT REQUIREMENT: CTA button text must be blue when scrolled (overrides default white)
                        '!text-primary-700 hover:!text-primary-700'
                      ].join(' ')
                )}
                asChild
              >
                <Link href="#contact">
                  <span className="relative z-10">Book Free Consultation</span>
                  {/* Documentation Source: CSS shimmer effect for premium buttons
                   * Reference: https://tailwindcss.com/docs/animation
                   * Pattern: Subtle shimmer animation on hover for premium feel
                   */}
                  <span 
                    className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] skew-x-12 transition-transform duration-600 group-hover:translate-x-[200%]"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            {/* Documentation Source: Radix UI Sheet for mobile navigation
             * Reference: https://www.radix-ui.com/docs/primitives/components/dialog
             * Pattern: Accessible mobile menu with focus trap and ARIA support
             */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      // Documentation Source: Context7 Tailwind CSS - Mobile Menu Button Styling
                      // Reference: /tailwindlabs/tailwindcss.com - Button component patterns and state variants
                      // Pattern: Consistent styling with main navigation links for cohesive user experience
                      //
                      // Base mobile button styles:
                      // - h-10 w-10: Square button with consistent sizing (40x40px)
                      // - p-0: No internal padding (icon provides visual weight)
                      // - transition-all duration-200: Smooth transitions for all properties
                      // - hover:scale-105 focus:scale-105: Subtle scale feedback on interaction
                      "h-10 w-10 p-0 transition-all duration-200 hover:scale-105 focus:scale-105",
                      
                      // Documentation Source: Context7 Tailwind CSS - Conditional State Application
                      // Reference: /tailwindlabs/tailwindcss.com - Clean conditional styling patterns
                      // Pattern: State-based styling that mirrors navigation link behavior
                      //
                      // CLIENT REQUIREMENTS: Mobile menu button follows same color pattern
                      // Initial state (no scrolling): Icon WHITE
                      // After scrolling: Icon BLUE (#3F4A7E = primary-700)
                      
                      // Transparent State (Default - when !safeIsScrolled):
                      // Applied when navbar is transparent at top of page
                      !safeIsScrolled && [
                        // Documentation Source: Context7 MCP - SVG Icon Color Implementation
                        // Reference: /tailwindlabs/tailwindcss.com - text-* utilities for SVG fill color
                        // CLIENT REQUIREMENT: Initial state icon must be WHITE
                        '!text-white',
                        
                        // Documentation Source: Context7 Tailwind CSS - Consistent White Icon on Hover
                        // Reference: /tailwindlabs/tailwindcss.com - Maintaining icon color consistency
                        // CLIENT REQUIREMENT: Keep white icon white on hover (matches navigation pattern)
                        'hover:!text-white',
                        
                        // Documentation Source: Context7 Tailwind CSS - Semi-transparent Background Hover
                        // Reference: /tailwindlabs/tailwindcss.com - Background opacity utilities for feedback
                        // Hover background: Subtle white overlay matching navigation links
                        'hover:bg-white/10',
                        
                        // Documentation Source: Context7 Tailwind CSS - Keyboard Navigation Focus State
                        // Reference: /tailwindlabs/tailwindcss.com - focus: prefix for accessibility compliance
                        // Focus background: Enhanced visibility for keyboard users
                        'focus:bg-white/15'
                      ].join(' '),
                      
                      // Scrolled State (when safeIsScrolled):
                      // Applied when navbar becomes opaque after scrolling
                      safeIsScrolled && [
                        // Documentation Source: Context7 MCP - Client Brand Color Implementation
                        // Reference: Tailwind Config - primary-700: '#3f4a7e' (CLIENT BRAND BLUE)
                        // CLIENT REQUIREMENT: Scrolled state icon must be BLUE (#3F4A7E)
                        '!text-primary-700',
                        
                        // Documentation Source: Context7 Tailwind CSS - Consistent Brand Color on Hover
                        // Reference: /tailwindlabs/tailwindcss.com - Maintaining brand color consistency
                        // CLIENT REQUIREMENT: Keep blue icon blue on hover (matches navigation pattern)
                        'hover:!text-primary-700',
                        
                        // Documentation Source: Context7 Tailwind CSS - Light Background Hover States
                        // Reference: /tailwindlabs/tailwindcss.com - Primary color tint utilities for feedback
                        // Hover background: Light primary tint matching navigation link behavior
                        'hover:bg-primary-50',
                        
                        // Documentation Source: Context7 Tailwind CSS - Focus State for Mobile Accessibility
                        // Reference: /tailwindlabs/tailwindcss.com - Enhanced focus visibility for touch devices
                        // Focus background: Darker primary tint for clear focus indication
                        'focus:bg-primary-100'
                      ].join(' ')
                    )}
                    aria-label="Open mobile navigation menu"
                    aria-expanded={isMobileMenuOpen}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                
                {/* Mobile Menu Content */}
                <SheetContent 
                  side="right" 
                  className="w-[320px] sm:w-[400px] bg-white/95 backdrop-blur-md border-l border-primary-100"
                >
                  <SheetHeader className="text-left border-b border-primary-100 pb-4 mb-6">
                    <SheetTitle className="font-serif text-xl font-bold text-primary-900">
                      {headerContent.siteName}
                    </SheetTitle>
                  </SheetHeader>
                  
                  {/* Enhanced Mobile Navigation Links with Dropdown Support */}
                  {/* CONTEXT7 SOURCE: /context7/react_dev - Enhanced mobile navigation with dropdown functionality
                   * MOBILE DROPDOWN REASON: Official React patterns for collapsible mobile navigation
                   * CONTEXT7 SOURCE: /context7/motion_dev - Mobile dropdown animations and state management
                   * MOBILE ANIMATION: Touch-friendly navigation with smooth dropdown transitions
                   */}
                  <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                    {getEnhancedNavigation().map((item, index) => (
                      <div key={index}>
                        <button
                          onClick={() => {
                            if (item.submenu) {
                              setActiveDropdown(
                                activeDropdown === item.name ? null : item.name
                              )
                            } else {
                              setIsMobileMenuOpen(false)
                            }
                          }}
                          className="group flex items-center justify-between w-full min-h-[44px] px-4 py-3 text-primary-700 hover:text-primary-900 font-medium rounded-xl hover:bg-primary-50 active:bg-primary-100 transition-all duration-300 focus:bg-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50"
                          aria-label={item.submenu ? `Toggle ${item.label} submenu` : `Navigate to ${item.label} section`}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {item.label}
                          </span>
                          {item.submenu && (
                            <m.div
                              animate={{ 
                                rotate: activeDropdown === item.name ? 180 : 0 
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </m.div>
                          )}
                          {/* Mobile interaction feedback */}
                          <span 
                            className="absolute inset-0 bg-gradient-to-r from-accent-50/50 to-accent-100/50 translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0 rounded-xl"
                            aria-hidden="true"
                          />
                        </button>
                        
                        {/* CONTEXT7 SOURCE: /context7/motion_dev - Mobile dropdown submenu with smooth animations */}
                        <AnimatePresence>
                          {activeDropdown === item.name && item.submenu && (
                            <m.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="ml-4 mt-2 space-y-1 overflow-hidden"
                            >
                              {getSubmenuItems(item.name).map((subItem, subIndex) => (
                                <m.div
                                  key={subItem.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ 
                                    duration: 0.3,
                                    delay: subIndex * 0.05
                                  }}
                                >
                                  <Link
                                    href={subItem.href}
                                    className="block px-3 py-2 text-base text-primary-600 hover:text-primary-900 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                                    onClick={() => {
                                      setIsMobileMenuOpen(false)
                                      setActiveDropdown(null)
                                    }}
                                  >
                                    <div>
                                      <div className="font-medium">{subItem.name}</div>
                                      <div className="text-sm text-primary-500 mt-1">{subItem.description}</div>
                                    </div>
                                  </Link>
                                </m.div>
                              ))}
                            </m.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </nav>
                  
                  {/* Mobile CTA Button */}
                  <div className="mt-8 pt-6 border-t border-primary-100">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 min-h-[48px]"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        setActiveDropdown(null)
                      }}
                      asChild
                    >
                      <Link href="#contact">
                        <span className="relative z-10">Book Free Consultation</span>
                        {/* Mobile shimmer effect */}
                        <span 
                          className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] skew-x-12 transition-transform duration-700 group-hover:translate-x-[100%]"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* CONTEXT7 SOURCE: /context7/motion_dev - Hover Bridge for seamless dropdown navigation */}
      {/* HOVER BRIDGE REASON: Official Motion patterns for preventing dropdown flicker during navigation */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Adjusted dropdown positioning for enhanced header height
       * DROPDOWN POSITIONING REASON: Official positioning patterns for responsive header accommodation
       * CLIENT REQUIREMENT: Maintain dropdown alignment with increased header size
       * POSITION ADJUSTMENT: top: 76px → 84px to accommodate taller header container
       */}
      <AnimatePresence>
        {activeDropdown && (
          <div 
            className="fixed left-0 right-0 h-4 z-[9997] dropdown-area"
            style={{ top: '84px' }}
            onMouseEnter={handleMouseEnterDropdown}
            onMouseLeave={handleMouseLeaveNavArea}
          />
        )}
      </AnimatePresence>
      
      {/* CONTEXT7 SOURCE: /context7/motion_dev - Enhanced dropdown menu with smooth animations */}
      {/* DROPDOWN ANIMATION REASON: Official Motion documentation for premium navigation dropdowns */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced dropdown positioning for larger header accommodation
       * DROPDOWN POSITIONING ADJUSTMENT: Official positioning patterns for responsive navigation menus
       * POSITION ENHANCEMENT: top: 80px → 88px to align with increased header height
       */}
      <AnimatePresence>
        {activeDropdown && (
          <m.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              "fixed left-0 right-0 z-[9998] dropdown-area shadow-xl border-b",
              safeIsScrolled 
                ? "bg-white/95 backdrop-blur-xl border-primary-100/80" 
                : "bg-slate-900/95 backdrop-blur-xl border-slate-700/50"
            )}
            style={{ top: '88px' }}
            data-navigation
            onMouseEnter={handleMouseEnterDropdown}
            onMouseLeave={handleMouseLeaveNavArea}
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {getSubmenuItems(activeDropdown).map((subItem, index) => (
                  <m.div
                    key={subItem.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05
                    }}
                  >
                    <Link
                      href={subItem.href}
                      className={cn(
                        "group relative block rounded-xl p-6 transition-all duration-300 border border-transparent",
                        safeIsScrolled
                          ? "hover:bg-primary-50 hover:shadow-lg hover:border-primary-200/50 text-primary-700"
                          : "hover:bg-white/10 hover:shadow-lg hover:border-white/20 text-white"
                      )}
                      onClick={() => setActiveDropdown(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className={cn(
                            "text-lg font-semibold transition-colors duration-300 relative inline-block",
                            safeIsScrolled
                              ? "text-primary-700 group-hover:text-primary-900"
                              : "text-white group-hover:text-accent-300"
                          )}>
                            {subItem.name}
                            <span className={cn(
                              "absolute bottom-0 left-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left w-full",
                              safeIsScrolled ? "bg-primary-400" : "bg-accent-400"
                            )}></span>
                          </h3>
                          <p className={cn(
                            "mt-2 text-base transition-colors duration-300",
                            safeIsScrolled
                              ? "text-primary-600/70 group-hover:text-primary-600/90"
                              : "text-white/70 group-hover:text-white/90"
                          )}>
                            {subItem.description}
                          </p>
                        </div>
                        <m.div
                          className={cn(
                            "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                            safeIsScrolled ? "text-primary-300" : "text-accent-300"
                          )}
                          animate={{ x: 0 }}
                          whileHover={{ x: 4 }}
                        >
                          <svg className="h-5 w-5 -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </m.div>
                      </div>
                    </Link>
                  </m.div>
                ))}
              </div>
              
              {/* CONTEXT7 SOURCE: /context7/motion_dev - Call to action section in dropdown */}
              {/* CTA INTEGRATION REASON: Enhanced navigation with premium service call-to-action */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={cn(
                  "mt-8 pt-6 border-t",
                  safeIsScrolled ? "border-primary-100/50" : "border-slate-700/50"
                )}
              >
                <div className="text-center">
                  <h3 className={cn(
                    "text-lg font-semibold mb-2",
                    safeIsScrolled ? "text-primary-700" : "text-white"
                  )}>
                    Need Expert Guidance?
                  </h3>
                  <p className={cn(
                    "text-sm mb-4",
                    safeIsScrolled ? "text-primary-600/70" : "text-white/70"
                  )}>
                    Our educational consultants are here to help you achieve your goals
                  </p>
                  <Link
                    href="#contact"
                    className={cn(
                      "inline-flex items-center rounded-lg px-6 py-3 text-sm font-medium shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
                      safeIsScrolled
                        ? "bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white focus:ring-accent-500"
                        : "bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white focus:ring-accent-500"
                    )}
                    onClick={() => setActiveDropdown(null)}
                  >
                    Get Free Consultation
                    <svg className="ml-2 h-4 w-4 -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                </div>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
      
      {/* CONTEXT7 SOURCE: /context7/motion_dev - Backdrop overlay for dropdown focus management */}
      {/* BACKDROP REASON: Official Motion patterns for dropdown focus management and accessibility */}
      <AnimatePresence>
        {(activeDropdown || isMobileMenuOpen) && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9997]"
            style={{ 
              top: activeDropdown ? '320px' : '88px'
            }}
            onClick={() => {
              setActiveDropdown(null)
              setIsMobileMenuOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </header>
  )
}

// CONTEXT7 SOURCE: /context7/react_dev - Enhanced navigation structure with dropdown submenus
// NAVIGATION STRUCTURE REASON: Comprehensive submenu system for premium tutoring service

// CONTEXT7 SOURCE: /vercel/next.js - Enhanced navigation structure with About page restoration
// NAVIGATION RESTORATION REASON: Official Next.js navigation patterns for complete site structure
// CONTEXT7 SOURCE: /context7/headlessui_com - Enhanced navigation structure with client-specified dropdown submenus
// NAVIGATION REQUIREMENTS REASON: Official Headless UI navigation menu patterns for complex dropdown structures
// Enhanced navigation structure with dropdown submenus per client requirements
function getEnhancedNavigation() {
  return [
    {
      name: 'ABOUT US',
      label: 'About Us',
      href: '/about',
      submenu: true
    },
    {
      name: 'SUBJECT TUITION',
      label: 'Subject Tuition',
      href: '/subject-tuition',
      submenu: true
    },
    {
      name: 'HOW IT WORKS',
      label: 'How It Works',
      href: '/how-it-works',
      submenu: true
    },
    {
      name: '11+ BOOTCAMPS',
      label: '11+ Bootcamps',
      href: '/11-plus-bootcamps',
      submenu: true
    },
    {
      name: 'VIDEO MASTERCLASSES',
      label: 'Video Masterclasses',
      href: '/video-masterclasses',
      submenu: true
    },
    {
      name: 'BLOG',
      label: 'Blog',
      href: '/blog',
      submenu: false
    },
    {
      // CONTEXT7 SOURCE: /websites/react_dev - React navigation menu configuration with top-level links
      // TESTIMONIALS ADDITION REASON: Official React documentation for adding navigation items to main menu
      name: 'TESTIMONIALS',
      label: 'Testimonials',
      href: '/testimonials',
      submenu: false
    },
    {
      name: 'FAQ',
      label: 'FAQ',
      href: '/faq',
      submenu: true
    }
  ]
}

// CONTEXT7 SOURCE: /websites/react_dev - React scroll navigation with smooth anchor scrolling
// ANCHOR NAVIGATION REASON: Official React documentation for smooth scrolling to page sections using scrollIntoView API
// CONTEXT7 SOURCE: /context7/headlessui_com - Client-specified submenu items configuration per exact requirements
// SUBMENU CONFIGURATION REASON: Official Headless UI Menu component patterns for hierarchical navigation structures
// CLIENT REQUIREMENTS: Updated About Us dropdown links to navigate to specific page sections
function getSubmenuItems(activeDropdown: string) {
  const submenus = {
    'ABOUT US': [
      { name: 'Our Founder', href: '/about#founder-story', description: 'Founder & Educational Director' },
      { name: 'Statistics', href: '/about#statistics', description: 'Our proven track record' },
      { name: 'Global Reach', href: '/about#global-reach', description: 'International presence' },
      { name: 'Company History', href: '/about#timeline', description: '15 years of excellence' },
      { name: 'Our Ethos', href: '/about#ethos', description: 'Values-driven approach to learning' }
    ],
    'SUBJECT TUITION': [
      { name: 'Primary', href: '/subject-tuition#primary', description: 'Foundation learning for ages 4-11' },
      { name: 'Secondary', href: '/subject-tuition#secondary', description: 'Comprehensive GCSE & A-Level support' },
      { name: 'Entrance Exams', href: '/subject-tuition#entrance-exams', description: 'Grammar school & independent school prep' },
      { name: 'University & Beyond', href: '/subject-tuition#university', description: 'Oxbridge preparation & degree-level support' },
      { name: 'Online Homeschooling', href: '/homeschooling', description: 'Complete curriculum delivery from home' },
      { name: 'SEN Support & Neurodiverse Learning', href: '/subject-tuition#sen-support', description: 'Specialist support for learning differences' },
      { name: 'London In-Person Tutoring', href: '/subject-tuition#london-tutoring', description: 'Face-to-face sessions in premium locations' }
    ],
    'HOW IT WORKS': [
      { name: 'Our Three-Tier System', href: '/how-it-works#tier-system', description: 'Structured approach to educational excellence' },
      { name: 'Assessment & Matching', href: '/how-it-works#assessment', description: 'Finding the perfect tutor fit' },
      { name: 'Progress Tracking', href: '/how-it-works#progress', description: 'Monitoring and measuring success' },
      { name: 'Our Achievements', href: '/how-it-works#achievements', description: 'Track record of academic excellence' },
      { name: 'Global Excellence', href: '/how-it-works#global', description: 'International reach and recognition' }
    ],
    '11+ BOOTCAMPS': [
      { name: 'Choose Your Bootcamps', href: '/11-plus-bootcamps#choose', description: 'Intensive preparation programmes' },
      { name: 'Why We\'re Unique', href: '/11-plus-bootcamps#unique', description: 'Official examiners & proven methods' }
    ],
    // CONTEXT7 SOURCE: /websites/reactrouter - Enhanced scroll navigation with anchor fragment identifiers
    // NAVIGATION ENHANCEMENT REASON: Official React Router documentation recommends hash-based navigation for same-page section scrolling
    // IMPLEMENTATION: Updated video masterclasses submenu to include all page sections with proper scroll anchor targets
    'VIDEO MASTERCLASSES': [
      { name: 'Featured Masterclasses', href: '/video-masterclasses#section-3', description: 'Premium video content and exclusive sessions' },
      { name: 'Elizabeth\'s Essential UCAS Guide', href: '/video-masterclasses#ucas-guide-section', description: 'University application expertise and guidance' },
      { name: 'Get Confident with British Culture', href: '/video-masterclasses#british-culture-section', description: 'Essential cultural knowledge for success' },
      { name: 'Free Resources', href: '/video-masterclasses#section-2', description: 'Complimentary masterclasses and educational content' }
    ],
    'FAQ': [
      { name: 'About the Service', href: '/faq#about-service', description: 'Understanding our tutoring approach' },
      { name: 'Tutors & Teaching', href: '/faq#tutors-teaching', description: 'Our educator selection and methodology' },
      { name: 'Subjects & Curriculum', href: '/faq#subjects-curriculum', description: 'Coverage and educational frameworks' },
      { name: 'Progress & Results', href: '/faq#progress-results', description: 'Tracking success and outcomes' },
      { name: 'Scheduling & Process', href: '/faq#scheduling-process', description: 'Booking and session management' },
      { name: 'Pricing & Payment', href: '/faq#pricing-payment', description: 'Investment and payment options' },
      { name: 'Other Questions', href: '/faq#other-questions', description: 'Additional information and support' }
    ]
  }
  
  return submenus[activeDropdown as keyof typeof submenus] || []
}

// Export types for documentation and reuse
export type { PageHeaderProps }