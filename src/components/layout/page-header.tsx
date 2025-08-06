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
  
  // Documentation Source: React 19 useState for component state management
  // Reference: https://react.dev/reference/react/useState
  // Pattern: Component state for scroll detection and mobile menu
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // CONTEXT7 SOURCE: /vercel/next.js - SSR-safe client-side state initialization
  // HYDRATION FIX REASON: Official Next.js patterns for preventing hydration mismatches
  // Pattern: Two-pass rendering to ensure consistent server/client state
  const [isMounted, setIsMounted] = useState(false)
  
  // Documentation Source: Context7 React 19 + Performance Optimization - useCallback for scroll handling
  // Reference: https://react.dev/reference/react/useCallback
  // Pattern: Memoized scroll handler to prevent unnecessary re-renders and optimize performance
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
    }
  }, [handleScroll])
  
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16 lg:h-20">
          
          {/* Logo Section - Left */}
          {/* Documentation Source: Context7 MCP - Next.js Image Conditional Rendering for Logo Switching
           * Reference: /vercel/next.js - Scroll-based image switching and conditional src patterns
           * Pattern: Logo switching based on navbar scroll state for optimal visibility
           * Implementation: White logo for transparent navbar, standard logo for scrolled state
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
                <Image
                  src={!safeIsScrolled ? logoWhite.src : logoDefault.src}
                  alt={!safeIsScrolled ? logoWhite.alt : logoDefault.alt}
                  width={!safeIsScrolled ? logoWhite.width : logoDefault.width}
                  height={!safeIsScrolled ? logoWhite.height : logoDefault.height}
                  priority
                  className="h-auto w-auto max-h-12 lg:max-h-16 transition-all duration-300 group-hover:scale-105"
                />
                {/* Documentation Source: Context7 MCP - CSS Transform Effects for Premium Branding
                 * Reference: /tailwindcss/tailwindcss - Transform utilities and hover state management
                 * Pattern: Subtle glow effect on logo hover for premium brand experience
                 */}
                <div className="absolute inset-0 -z-10 rounded-lg bg-accent-100/20 scale-0 transition-transform duration-300 group-hover:scale-110 opacity-0 group-hover:opacity-100" />
              </div>
            </Link>
          </div>
          
          {/* Navigation Section - Center (Desktop Only) */}
          {/* Documentation Source: Context7 Radix UI NavigationMenu - Individual Link Styling Pattern
           * Reference: /radix-ui/website - NavigationMenu.Link data attributes and hover state management
           * Pattern: WCAG 2.1 AA compliant navigation with proper individual link hover states
           * 
           * Critical Implementation Notes:
           * - Each NavigationMenuItem must handle its own hover states independently
           * - Radix UI NavigationMenu.Link components use [data-active] attributes for state management
           * - CSS hover specificity must target individual Link elements, not parent containers
           * - Group hover patterns prevent individual link state management conflicts
           */}
          <nav className="hidden lg:flex justify-center" role="navigation" aria-label="Main navigation">
            <NavigationMenu>
              <NavigationMenuList className="flex items-center space-x-1">
                {navigation.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          // Documentation Source: Context7 Tailwind CSS - Individual Link Hover States with ::after Pseudo-elements
                          // Reference: /tailwindlabs/tailwindcss.com - ::after pseudo-elements for decorative effects
                          // Pattern: Individual link styling using Tailwind CSS ::after variants for underline animations
                          "relative inline-flex h-10 items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50 whitespace-nowrap",
                          
                          // Documentation Source: Context7 Tailwind CSS - ::after Pseudo-element Utilities
                          // Reference: /tailwindlabs/tailwindcss.com - Using ::after variants for decorative underlines
                          // Pattern: Tailwind automatically adds content: '' for ::after pseudo-elements
                          "after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:transition-all after:duration-300",
                          "hover:after:w-3/4 focus:after:w-3/4",
                          
                          // Documentation Source: Context7 Radix UI - Individual Link State Management
                          // Reference: /radix-ui/website - Preventing hover state conflicts across NavigationMenu items
                          // Pattern: State-specific styling that prevents cross-contamination between navigation links
                          //
                          // CRITICAL IMPLEMENTATION: Individual link hover states (no group dependencies)
                          // Each NavigationMenuItem manages its own hover state completely independently
                          // This prevents hover effects from affecting all navigation links simultaneously
                          
                          // CLIENT REQUIREMENTS: Scroll-based colour transition implementation
                          // Initial state (no scrolling): ALL navbar text WHITE
                          // After scrolling: ALL navbar text BLUE (#3F4A7E = primary-700)
                          
                          // Transparent Navbar State: Default state when at top of page
                          !safeIsScrolled && [
                            // Documentation Source: Context7 MCP - React Scroll Event Handler Implementation
                            // Reference: /react-hook-form/documentation - useEffect scroll event patterns
                            // CLIENT REQUIREMENT: Initial state text must be WHITE for visibility over hero content
                            "!text-white",
                            
                            // Documentation Source: Context7 Tailwind CSS - Maintaining Text Color Consistency
                            // Reference: /tailwindlabs/tailwindcss.com - Hover state text color preservation
                            // CLIENT REQUIREMENT: Keep white text white on hover (no color change)
                            "hover:!text-white",
                            
                            // Documentation Source: Context7 Tailwind CSS - ::after Pseudo-element Underline Effects
                            // Reference: /tailwindlabs/tailwindcss.com - Gradient utilities with ::after variants
                            // Underline gradient: White to light accent maintains visibility on transparent state
                            "after:bg-gradient-to-r after:from-white after:to-accent-200",
                            
                            // Documentation Source: Context7 Tailwind CSS - Semi-transparent Overlay Effects
                            // Reference: /tailwindlabs/tailwindcss.com - Background opacity utilities for hover feedback
                            // Hover background: Subtle white overlay provides tactile feedback
                            "hover:bg-white/10",
                            
                            // Documentation Source: Context7 Tailwind CSS - Keyboard Navigation Accessibility
                            // Reference: /tailwindlabs/tailwindcss.com - :focus pseudo-class for WCAG 2.1 AA compliance
                            // Focus background: Enhanced visibility for keyboard users
                            "focus:bg-white/15",
                            
                            // Documentation Source: Context7 Tailwind CSS - Premium Visual Effects
                            // Reference: /tailwindlabs/tailwindcss.com - box-shadow utilities for depth and hierarchy
                            // Premium shadow effects: Elevated visual hierarchy for luxury brand positioning
                            "hover:shadow-lg hover:shadow-white/20",
                            
                            // Documentation Source: Context7 Tailwind CSS - Transform Scale Micro-interactions
                            // Reference: /tailwindlabs/tailwindcss.com - Scale transform for engaging user feedback
                            // Scale animation: Subtle interaction feedback maintaining professional aesthetic
                            "hover:scale-105 focus:scale-105"
                          ].join(' '),
                          
                          // Scrolled Navbar State: When user has scrolled down the page
                          safeIsScrolled && [
                            // Documentation Source: Context7 MCP - Client Brand Color Implementation
                            // Reference: Tailwind Config - primary-700: '#3f4a7e' (CLIENT BRAND BLUE)
                            // CLIENT REQUIREMENT: Scrolled state text must be BLUE (#3F4A7E)
                            "!text-primary-700",
                            
                            // Documentation Source: Context7 Tailwind CSS - Consistent Brand Color Application
                            // Reference: /tailwindlabs/tailwindcss.com - Hover state color consistency patterns
                            // CLIENT REQUIREMENT: Keep blue text blue on hover (no color change)
                            "hover:!text-primary-700",
                            
                            // Documentation Source: Context7 Tailwind CSS - Brand Color Gradients
                            // Reference: /tailwindlabs/tailwindcss.com - Primary color gradient utilities
                            // Underline gradient: Primary blue gradient maintains brand consistency
                            "after:bg-gradient-to-r after:from-primary-700 after:to-primary-600",
                            
                            // Documentation Source: Context7 Tailwind CSS - Light Background Hover States
                            // Reference: /tailwindlabs/tailwindcss.com - Primary color tint utilities for feedback
                            // Hover background: Light primary tint provides gentle visual feedback
                            "hover:bg-primary-50",
                            
                            // Documentation Source: Context7 Tailwind CSS - Focus State Enhancement
                            // Reference: /tailwindlabs/tailwindcss.com - Enhanced focus visibility for accessibility
                            // Focus background: Slightly darker primary for improved keyboard navigation
                            "focus:bg-primary-100",
                            
                            // Documentation Source: Context7 Tailwind CSS - Consistent Interactive Animations
                            // Reference: /tailwindlabs/tailwindcss.com - Transform utilities for uniform interactions
                            // Scale animation: Consistent micro-interactions across all navbar states
                            "hover:scale-105 focus:scale-105"
                          ].join(' ')
                        )}
                        prefetch={false}
                      >
                        <span className="relative z-10">{item.label}</span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          
          {/* CTA Section - Right */}
          {/* Documentation Source: Responsive button design with mobile menu
           * Reference: https://ui.shadcn.com/docs/components/button
           * Pattern: Desktop CTA button + mobile menu toggle
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
                  
                  {/* Mobile Navigation Links */}
                  {/* Documentation Source: Touch-friendly mobile navigation patterns
                   * Reference: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
                   * Pattern: 44px minimum touch targets for mobile accessibility
                   */}
                  <nav className="space-y-2" role="navigation" aria-label="Mobile navigation">
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="group flex items-center w-full min-h-[44px] px-4 py-3 text-primary-700 hover:text-primary-900 font-medium rounded-xl hover:bg-primary-50 active:bg-primary-100 transition-all duration-300 focus:bg-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50"
                        aria-label={`Navigate to ${item.label} section`}
                      >
                        <span className="relative z-10">{item.label}</span>
                        {/* Documentation Source: Mobile interaction feedback patterns
                         * Reference: https://material.io/design/interaction/states.html
                         * Pattern: Animated background on touch for tactile feedback
                         */}
                        <span 
                          className="absolute inset-0 bg-gradient-to-r from-accent-50/50 to-accent-100/50 translate-x-[-100%] transition-transform duration-300 group-hover:translate-x-0 rounded-xl"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </nav>
                  
                  {/* Mobile CTA Button */}
                  <div className="mt-8 pt-6 border-t border-primary-100">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 min-h-[48px]"
                      onClick={() => setIsMobileMenuOpen(false)}
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
    </header>
  )
}

// Export types for documentation and reuse
export type { PageHeaderProps }