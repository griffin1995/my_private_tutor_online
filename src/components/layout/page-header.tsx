/**
 * MAIN NAVBAR COMPONENT - PHASE 1 FOUNDATION
 * Created: August 27, 2025
 * Purpose: New MainNavbar component with scroll detection and dual styling
 * Status: Foundation component for 6-component decomposition architecture
 * 
 * CONTEXT7 SOURCE: /reactjs/react.dev - React hooks and state management patterns
 * IMPLEMENTATION REASON: Official React documentation for useEffect, useCallback, and useState patterns
 * 
 * CONTEXT7 SOURCE: /grx7/framer-motion - Animation and transition patterns
 * MOTION REASON: Official Framer Motion documentation for smooth transitions and motion.div usage
 * 
 * CONTEXT7 SOURCE: /vercel/next.js - Link component external URL patterns
 * CTA_UPDATE_REASON: Official Next.js documentation for external link handling with target="_blank" and security attributes
 * 
 * Key Features:
 * - Scroll-based dual styling (transparent ↔ solid)
 * - Performance-optimized scroll detection with passive listeners
 * - SSR-safe implementation with hydration protection
 * - Foundation for component decomposition architecture
 * - Logo switching functionality based on scroll state
 * 
 * Architecture:
 * - Scroll detection system with 100px threshold
 * - Transparent state: bg-transparent, white text/logo
 * - Solid state: bg-white/95 backdrop-blur-lg, dark text/standard logo
 * - 60fps performance with RAF optimization
 */

"use client"

// CONTEXT7 SOURCE: /reactjs/react.dev - React hooks for state management and effects
// HOOKS REASON: Official React documentation for useState, useEffect, and useCallback patterns
import React, { useState, useEffect, useCallback } from 'react'

// CONTEXT7 SOURCE: /reactjs/react.dev - Next.js optimized components
// NEXT_IMPORTS REASON: Official React documentation for Image and Link component usage
import Image from 'next/image'
import Link from 'next/link'

// CONTEXT7 SOURCE: /grx7/framer-motion - Motion components for animations
// MOTION_REASON: Official Framer Motion documentation for motion.div and transition patterns
import { motion } from 'framer-motion'

// CONTEXT7 SOURCE: /radix-ui/website - NavigationMenu component for dropdown navigation
// NAVIGATION_REASON: Official Radix UI documentation for NavigationMenu patterns and hover interactions
import * as NavigationMenu from '@radix-ui/react-navigation-menu'

// CONTEXT7 SOURCE: /lucide-icons/lucide - Menu and X icons from lucide-react for mobile menu trigger
// ICON_REASON: Official Lucide documentation for Menu hamburger and X close icons
import { Menu, X } from 'lucide-react'

// CONTEXT7 SOURCE: /websites/headlessui_com - Dialog components for mobile sheet-like modal
// DIALOG_REASON: Official Headless UI documentation for Dialog with backdrop and panel patterns
import { Dialog } from '@headlessui/react'

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Utility function for CSS class management
// UTILS_REASON: Official Tailwind documentation for conditional class composition
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /vercel/next.js - Local component imports for modular architecture
// COMPONENT_REASON: Official Next.js documentation for component composition and reusable architecture
import { LogoSection } from './logo-section'

// CONTEXT7 SOURCE: /typescript/handbook - Interface definitions for type safety
// INTERFACE_REASON: Official TypeScript documentation for component prop typing
interface PageHeaderProps {
  className?: string
  isHeroPage?: boolean
  isHomepage?: boolean
}

// CONTEXT7 SOURCE: /typescript/handbook - Navigation data structure interfaces
// INTERFACE_REASON: Official TypeScript documentation for complex type definitions
interface NavigationItem {
  label: string
  href?: string
  items?: NavigationSubItem[]
}

interface NavigationSubItem {
  label: string
  href: string
  description?: string
}

// CONTEXT7 SOURCE: /typescript/handbook - Component props for context-aware styling
// PROPS_REASON: Official TypeScript documentation for component composition patterns
interface DesktopNavigationProps {
  isTransparent: boolean
}

/**
 * CONTEXT7 SOURCE: /grx7/framer-motion - RequestAnimationFrame optimized scroll detection
 * RAF_OPTIMIZATION_REASON: Official Framer Motion documentation for 60fps animation performance
 * PERFORMANCE_IMPROVEMENT: Prevents excessive state updates during scroll events
 */
function useScrollDetection(threshold: number = 75) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  // CONTEXT7 SOURCE: /reactjs/react.dev - useRef for persistent RAF ID storage
  // REF_REASON: Official React documentation for mutable values that don't trigger re-renders
  const rafId = React.useRef<number>()

  // CONTEXT7 SOURCE: /grx7/framer-motion - RequestAnimationFrame for smooth 60fps updates
  // RAF_REASON: Official Framer Motion documentation for RequestAnimationFrame optimization patterns
  const handleScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
    }
    
    rafId.current = requestAnimationFrame(() => {
      if (typeof window === 'undefined') return
      
      const scrollY = window.scrollY
      setIsScrolled(scrollY > threshold)
    })
  }, [threshold])

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for DOM event management with RAF cleanup
  // EFFECT_REASON: Official React documentation for subscribing to DOM events with proper cleanup
  useEffect(() => {
    setIsMounted(true)

    if (typeof window === 'undefined') return

    // CONTEXT7 SOURCE: /reactjs/react.dev - Passive event listeners for performance
    // PASSIVE_REASON: Official React documentation for scroll event optimization
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial scroll position check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      // CONTEXT7 SOURCE: /grx7/framer-motion - RAF cleanup on component unmount
      // CLEANUP_REASON: Official Framer Motion documentation for proper animation cleanup
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleScroll])

  return { isScrolled: isMounted ? isScrolled : false, isMounted }
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Main navbar component with scroll-based styling
 * COMPONENT_REASON: Official React documentation for component composition and state management
 */
export function PageHeader({ 
  className, 
  isHeroPage = false,
  isHomepage = false
}: PageHeaderProps) {
  const { isScrolled, isMounted } = useScrollDetection(75)

  // CONTEXT7 SOURCE: /grx7/framer-motion - Animation variants for smooth transitions
  // VARIANTS_REASON: Official Framer Motion documentation for state-based animations
  const navbarVariants = {
    transparent: {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      backdropFilter: 'blur(0px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    solid: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.1)'
    }
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Enhanced transparency logic for proper homepage behavior
  // TRANSPARENCY_REASON: Official React documentation for useMemo optimization with multiple state dependencies
  const isTransparent = React.useMemo(() => {
    // Enhanced logic for transparency determination
    const hasHeroSection = isHeroPage || isHomepage
    const isScrolledPastThreshold = isScrolled && isMounted
    const shouldShowTransparent = hasHeroSection && !isScrolledPastThreshold
    
    return shouldShowTransparent
  }, [isHeroPage, isHomepage, isScrolled, isMounted])
  
  const currentVariant = isTransparent ? 'transparent' : 'solid'

  return (
    // CONTEXT7 SOURCE: /grx7/framer-motion - motion.header for animated transitions
    // MOTION_HEADER_REASON: Official Framer Motion documentation for animating container elements
    <motion.header 
      className={cn(
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Fixed positioning and z-index
        // POSITIONING_REASON: Official Tailwind documentation for overlay positioning
        "fixed top-0 left-0 right-0 z-50",
        "w-full transition-all duration-300",
        // Text color based on state
        isTransparent ? "text-white" : "text-gray-900",
        className
      )}
      variants={navbarVariants}
      animate={currentVariant}
      initial={isHomepage ? 'solid' : 'transparent'}
      // CONTEXT7 SOURCE: /grx7/framer-motion - Transition configuration
      // TRANSITION_REASON: Official Framer Motion documentation for smooth state changes
      transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section - Component 5/6: Dedicated logo component with context-aware switching */}
          <LogoSection 
            isTransparent={isTransparent} 
            isHomepage={isHomepage} 
          />

          {/* Desktop Navigation - Full Implementation */}
          <DesktopNavigation isTransparent={isTransparent} />

          {/* CTA Button - Context-Aware Design */}
          <CTAButton isTransparent={isTransparent} isHomepage={isHomepage} />

          {/* Mobile Menu Implementation */}
          <MobileMenu isTransparent={isTransparent} />
        </div>
      </div>
      
      {/* Development Status Indicator - Phase 6: Library-Native Enhanced Architecture */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-full left-0 right-0 bg-blue-100 border-b border-blue-300 px-4 py-2 text-center z-40">
          <div className="text-blue-800 text-xs">
            🚀 Phase 6: Library-Native Enhancements Complete | 
            State: {isTransparent ? 'Transparent' : 'Solid'} | 
            Scroll: {isScrolled ? 'Yes' : 'No'} (75px RAF-optimized) | 
            Homepage: {isHomepage ? 'Yes' : 'No'} |
            Features: Full-width Dropdowns ✓ Enhanced Transparency Logic ✓ 60fps Scroll ✓
          </div>
        </div>
      )}
    </motion.header>
  )
}

/**
 * CONTEXT7 SOURCE: /radix-ui/website - Desktop Navigation Menu Component
 * IMPLEMENTATION_REASON: Official Radix UI NavigationMenu patterns with hover dropdowns
 */
function DesktopNavigation({ isTransparent }: DesktopNavigationProps) {
  // CONTEXT7 SOURCE: /radix-ui/website - Navigation data structure following official patterns
  // DATA_REASON: Official Radix UI documentation for navigation content organization
  const navigationData: NavigationItem[] = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'About Us',
      items: [
        { label: 'Founder Story', href: '/about/founder-story', description: 'Meet our founder and learn about our journey' },
        { label: 'Statistics', href: '/about/statistics', description: 'Our proven track record and success metrics' },
        { label: 'Global Reach', href: '/about/global-reach', description: 'Serving students worldwide' },
        { label: 'Company History', href: '/about/history', description: '15 years of educational excellence' },
        { label: 'Our Ethos', href: '/about/ethos', description: 'Our educational philosophy and values' }
      ]
    },
    {
      label: 'Subject Tuition',
      items: [
        { label: 'Primary Education', href: '/subjects/primary', description: 'Foundation learning for ages 5-11' },
        { label: 'Secondary Education', href: '/subjects/secondary', description: 'Comprehensive GCSE and A-Level support' },
        { label: 'Entrance Exams', href: '/subjects/entrance-exams', description: '11+, 13+, and school entrance preparation' },
        { label: 'University Admissions', href: '/subjects/university', description: 'Oxbridge and Russell Group preparation' },
        { label: 'Homeschooling Support', href: '/subjects/homeschooling', description: 'Structured home education programmes' },
        { label: 'SEN Support', href: '/subjects/sen', description: 'Specialist educational needs support' },
        { label: 'London Tuition', href: '/subjects/london', description: 'In-person tutoring in London' }
      ]
    },
    {
      label: 'How It Works',
      items: [
        { label: 'Tier System', href: '/how-it-works/tiers', description: 'Our unique three-tier tutoring approach' },
        { label: 'Initial Assessment', href: '/how-it-works/assessment', description: 'Comprehensive educational evaluation' },
        { label: 'Progress Tracking', href: '/how-it-works/progress', description: 'Monitor and measure learning outcomes' },
        { label: 'Achievements', href: '/how-it-works/achievements', description: 'Celebrate milestones and success' },
        { label: 'Global Excellence', href: '/how-it-works/excellence', description: 'World-class educational standards' }
      ]
    },
    {
      label: 'Testimonials',
      href: '/testimonials'
    },
    {
      label: 'Video Masterclasses',
      items: [
        { label: 'Featured Classes', href: '/masterclasses/featured', description: 'Our most popular educational content' },
        { label: 'UCAS Application Guide', href: '/masterclasses/ucas', description: 'Complete university application support' },
        { label: 'British Culture & Etiquette', href: '/masterclasses/culture', description: 'Essential cultural preparation' },
        { label: 'Free Resources', href: '/masterclasses/free', description: 'Complimentary educational materials' }
      ]
    }
  ]

  // CONTEXT7 SOURCE: /radix-ui/website - Secondary navigation items for larger screens
  // SECONDARY_REASON: Official Radix UI documentation for responsive navigation patterns
  const secondaryNavigationData: NavigationItem[] = [
    {
      label: '11+ Bootcamps',
      items: [
        { label: 'Choose Your Bootcamp', href: '/11-plus/bootcamps', description: 'Intensive preparation programmes' },
        { label: 'Why We\'re Unique', href: '/11-plus/unique', description: 'Our distinctive approach to 11+ preparation' }
      ]
    },
    {
      label: 'FAQs',
      items: [
        { label: 'About Our Service', href: '/faqs/service', description: 'General service information' },
        { label: 'Our Tutors', href: '/faqs/tutors', description: 'Tutor qualifications and expertise' },
        { label: 'Subjects', href: '/faqs/subjects', description: 'Available subjects and curricula' },
        { label: 'Progress & Assessment', href: '/faqs/progress', description: 'Tracking and evaluation methods' },
        { label: 'Scheduling', href: '/faqs/scheduling', description: 'Booking and timetable flexibility' },
        { label: 'Pricing', href: '/faqs/pricing', description: 'Transparent fee structure' },
        { label: 'Other Questions', href: '/faqs/other', description: 'Additional frequently asked questions' }
      ]
    },
    {
      label: 'Blog',
      href: '/blog'
    }
  ]

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Context-aware styling classes
  // STYLING_REASON: Official Tailwind documentation for conditional class composition
  const linkClasses = cn(
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:scale-105",
    isTransparent
      ? "text-white/90 hover:text-white hover:bg-white/10"
      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
  )

  const triggerClasses = cn(
    "group px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1 hover:scale-105",
    isTransparent
      ? "text-white/90 hover:text-white hover:bg-white/10"
      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
  )

  // CONTEXT7 SOURCE: /radix-ui/website - Enhanced content classes for premium mobile experience  
  // CONTENT_REASON: Official Radix UI documentation for NavigationMenu content with mobile optimization
  const contentClasses = cn(
    "absolute left-0 top-0 w-full sm:w-auto",
    "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
    "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
    "data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52",
    "data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52",
    "bg-white border border-gray-200/50 rounded-lg shadow-xl backdrop-blur-sm",
    "p-4 sm:p-6 min-w-[300px] max-w-[90vw] sm:max-w-none z-50",
    "transition-all duration-200 ease-out"
  )

  // CONTEXT7 SOURCE: /radix-ui/website - Render navigation item helper function
  // HELPER_REASON: Official Radix UI documentation for NavigationMenu item patterns
  const renderNavigationItem = (item: NavigationItem) => {
    if (item.href && !item.items) {
      return (
        <NavigationMenu.Item key={item.label}>
          <NavigationMenu.Link asChild>
            <Link href={item.href} className={linkClasses}>
              {item.label}
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      )
    }

    if (item.items) {
      return (
        <NavigationMenu.Item key={item.label}>
          <NavigationMenu.Trigger className={triggerClasses}>
            {item.label}
            {/* CONTEXT7 SOURCE: /radix-ui/website - Dropdown indicator icon */}
            {/* ICON_REASON: Official Radix UI documentation for trigger visual indicators */}
            <svg 
              className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className={contentClasses}>
            <div className="grid gap-3">
              {item.items.map((subItem) => (
                <NavigationMenu.Link asChild key={subItem.label}>
                  <Link
                    href={subItem.href}
                    className={cn(
                      "group grid h-auto w-full justify-start gap-1 rounded-md p-3",
                      "text-sm leading-none no-underline outline-none transition-all duration-200",
                      "hover:bg-gray-50 hover:text-primary-600 hover:shadow-sm hover:scale-[1.02]",
                      "focus:bg-gray-50 focus:text-primary-600 focus:ring-2 focus:ring-primary-500/20",
                      "active:scale-[0.98] min-h-[44px] flex items-start" // WCAG touch target + alignment
                    )}
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary-600">
                      {subItem.label}
                    </div>
                    {subItem.description && (
                      <p className="line-clamp-2 text-xs leading-snug text-gray-600 group-hover:text-gray-700">
                        {subItem.description}
                      </p>
                    )}
                  </Link>
                </NavigationMenu.Link>
              ))}
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      )
    }

    return null
  }

  return (
    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive design with custom breakpoints
    // RESPONSIVE_REASON: Official Tailwind documentation for responsive utility classes
    <div className="hidden desktop:flex items-center relative">
      <NavigationMenu.Root className="relative z-10 flex max-w-max flex-1 items-center justify-center">
        <NavigationMenu.List className="group flex flex-1 list-none items-center justify-center space-x-1">
          {/* Primary Navigation Items - Always visible on desktop+ */}
          {navigationData.map(renderNavigationItem)}
          
          {/* Secondary Navigation Items - Only visible on 3xl+ screens (1780px+) */}
          <div className="hidden 3xl:contents">
            {secondaryNavigationData.map(renderNavigationItem)}
          </div>
        </NavigationMenu.List>
        
        {/* CONTEXT7 SOURCE: /radix-ui/website - NavigationMenu.Viewport positioned correctly within Root */}
        {/* VIEWPORT_CONTEXT_FIX: Official Radix UI documentation requires Viewport inside Root for React Context */}
        {/* FULL-WIDTH_SOLUTION: Enhanced CSS positioning for viewport-width with performance optimizations */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full z-40 w-screen">
          {/* CONTEXT7 SOURCE: /radix-ui/website - Premium styling wrapper with enhanced mobile responsiveness */}
          {/* STYLING_REASON: Official Radix UI documentation for Viewport styling with CSS variables and mobile optimization */}
          <div className={cn(
            "flex justify-center bg-white/95 backdrop-blur-lg border-b shadow-xl",
            "px-4 py-6 sm:px-6 sm:py-8", // Enhanced mobile spacing
            "border-gray-200/50 transition-all duration-200", // Smooth transitions
            "max-h-[85vh] overflow-y-auto" // Prevent viewport overflow on mobile
          )}>
            {/* CONTEXT7 SOURCE: /radix-ui/website - NavigationMenu.Viewport with enhanced mobile support */}
            {/* VIEWPORT_REASON: Official Radix UI documentation for Viewport with responsive constraints */}
            <NavigationMenu.Viewport className={cn(
              "w-full transition-all duration-200",
              "max-w-7xl mx-auto", // Enhanced centering
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            )} />
          </div>
        </div>
      </NavigationMenu.Root>
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /websites/headlessui_com - Mobile Menu Sheet Component
 * IMPLEMENTATION_REASON: Official Headless UI Dialog patterns for mobile navigation overlay
 */
function MobileMenu({ isTransparent }: { isTransparent: boolean }) {
  // CONTEXT7 SOURCE: /reactjs/react.dev - State management for mobile menu visibility
  // STATE_REASON: Official React documentation for useState hook patterns
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // CONTEXT7 SOURCE: /websites/headlessui_com - Navigation data structure for mobile menu
  // DATA_REASON: Official Headless UI documentation for accessible navigation patterns
  const navigationData: NavigationItem[] = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: 'About Us',
      items: [
        { label: 'Founder Story', href: '/about/founder-story', description: 'Meet our founder and learn about our journey' },
        { label: 'Statistics', href: '/about/statistics', description: 'Our proven track record and success metrics' },
        { label: 'Global Reach', href: '/about/global-reach', description: 'Serving students worldwide' },
        { label: 'Company History', href: '/about/history', description: '15 years of educational excellence' },
        { label: 'Our Ethos', href: '/about/ethos', description: 'Our educational philosophy and values' }
      ]
    },
    {
      label: 'Subject Tuition',
      items: [
        { label: 'Primary Education', href: '/subjects/primary', description: 'Foundation learning for ages 5-11' },
        { label: 'Secondary Education', href: '/subjects/secondary', description: 'Comprehensive GCSE and A-Level support' },
        { label: 'Entrance Exams', href: '/subjects/entrance-exams', description: '11+, 13+, and school entrance preparation' },
        { label: 'University Admissions', href: '/subjects/university', description: 'Oxbridge and Russell Group preparation' },
        { label: 'Homeschooling Support', href: '/subjects/homeschooling', description: 'Structured home education programmes' },
        { label: 'SEN Support', href: '/subjects/sen', description: 'Specialist educational needs support' },
        { label: 'London Tuition', href: '/subjects/london', description: 'In-person tutoring in London' }
      ]
    },
    {
      label: 'How It Works',
      items: [
        { label: 'Tier System', href: '/how-it-works/tiers', description: 'Our unique three-tier tutoring approach' },
        { label: 'Initial Assessment', href: '/how-it-works/assessment', description: 'Comprehensive educational evaluation' },
        { label: 'Progress Tracking', href: '/how-it-works/progress', description: 'Monitor and measure learning outcomes' },
        { label: 'Achievements', href: '/how-it-works/achievements', description: 'Celebrate milestones and success' },
        { label: 'Global Excellence', href: '/how-it-works/excellence', description: 'World-class educational standards' }
      ]
    },
    {
      label: 'Testimonials',
      href: '/testimonials'
    },
    {
      label: 'Video Masterclasses',
      items: [
        { label: 'Featured Classes', href: '/masterclasses/featured', description: 'Our most popular educational content' },
        { label: 'UCAS Application Guide', href: '/masterclasses/ucas', description: 'Complete university application support' },
        { label: 'British Culture & Etiquette', href: '/masterclasses/culture', description: 'Essential cultural preparation' },
        { label: 'Free Resources', href: '/masterclasses/free', description: 'Complimentary educational materials' }
      ]
    },
    {
      label: '11+ Bootcamps',
      items: [
        { label: 'Choose Your Bootcamp', href: '/11-plus/bootcamps', description: 'Intensive preparation programmes' },
        { label: 'Why We\'re Unique', href: '/11-plus/unique', description: 'Our distinctive approach to 11+ preparation' }
      ]
    },
    {
      label: 'FAQs',
      items: [
        { label: 'About Our Service', href: '/faqs/service', description: 'General service information' },
        { label: 'Our Tutors', href: '/faqs/tutors', description: 'Tutor qualifications and expertise' },
        { label: 'Subjects', href: '/faqs/subjects', description: 'Available subjects and curricula' },
        { label: 'Progress & Assessment', href: '/faqs/progress', description: 'Tracking and evaluation methods' },
        { label: 'Scheduling', href: '/faqs/scheduling', description: 'Booking and timetable flexibility' },
        { label: 'Pricing', href: '/faqs/pricing', description: 'Transparent fee structure' },
        { label: 'Other Questions', href: '/faqs/other', description: 'Additional frequently asked questions' }
      ]
    },
    {
      label: 'Blog',
      href: '/blog'
    }
  ]

  // CONTEXT7 SOURCE: /reactjs/react.dev - Handler for expanding/collapsing menu items
  // HANDLER_REASON: Official React documentation for event handling patterns
  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    )
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Handler for closing menu on navigation
  // HANDLER_REASON: Official React documentation for state management patterns
  const handleNavigation = () => {
    setIsOpen(false)
    setExpandedItems([])
  }

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Context-aware styling for hamburger button
  // STYLING_REASON: Official Tailwind documentation for conditional class composition
  const hamburgerButtonClasses = cn(
    "lg:hidden flex items-center justify-center",
    "w-11 h-11 rounded-lg transition-all duration-200",
    "hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
    isTransparent
      ? "text-white/90 hover:text-white hover:bg-white/10 focus:ring-white/50"
      : "text-gray-700 hover:text-primary-600 hover:bg-gray-50 focus:ring-primary-500"
  )

  return (
    <>
      {/* CONTEXT7 SOURCE: /lucide-icons/lucide - Hamburger menu trigger button */}
      {/* TRIGGER_REASON: Official Lucide documentation for Menu icon in mobile interfaces */}
      <button
        onClick={() => setIsOpen(true)}
        className={hamburgerButtonClasses}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
      >
        <Menu size={24} aria-hidden="true" />
      </button>

      {/* CONTEXT7 SOURCE: /websites/headlessui_com - Dialog for mobile menu sheet */}
      {/* DIALOG_REASON: Official Headless UI documentation for Dialog with backdrop patterns */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 lg:hidden"
        id="mobile-navigation-menu"
      >
        {/* CONTEXT7 SOURCE: /websites/headlessui_com - Dialog backdrop */}
        {/* BACKDROP_REASON: Official Headless UI documentation for backdrop overlay */}
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
          aria-hidden="true" 
        />

        {/* CONTEXT7 SOURCE: /websites/headlessui_com - Dialog panel container */}
        {/* PANEL_REASON: Official Headless UI documentation for Dialog panel positioning */}
        <div className="fixed inset-0 flex">
          <div className="flex w-full justify-end">
            {/* CONTEXT7 SOURCE: /grx7/framer-motion - Animated dialog panel */}
            {/* MOTION_REASON: Official Framer Motion documentation for slide animations */}
            <Dialog.Panel
              as={motion.div}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'tween',
                duration: 0.3,
                ease: 'easeInOut'
              }}
              className={cn(
                "relative flex h-full w-full max-w-sm flex-col",
                "bg-white/95 backdrop-blur-md shadow-xl",
                "overflow-y-auto"
              )}
            >
              {/* CONTEXT7 SOURCE: /websites/headlessui_com - Mobile menu header */}
              {/* HEADER_REASON: Official Headless UI documentation for dialog title patterns */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <Dialog.Title className="text-lg font-semibold text-gray-900">
                  My Private Tutor Online
                </Dialog.Title>
                
                {/* CONTEXT7 SOURCE: /lucide-icons/lucide - Close button with X icon */}
                {/* CLOSE_REASON: Official Lucide documentation for X icon in close buttons */}
                <button
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-lg",
                    "text-gray-500 hover:text-gray-700 hover:bg-gray-100",
                    "transition-colors duration-200 focus:outline-none",
                    "focus:ring-2 focus:ring-primary-500"
                  )}
                  aria-label="Close navigation menu"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              {/* CONTEXT7 SOURCE: /websites/headlessui_com - Mobile navigation content */}
              {/* NAVIGATION_REASON: Official Headless UI documentation for accessible navigation */}
              <nav className="flex-1 px-6 py-4 space-y-1" aria-label="Mobile navigation">
                {navigationData.map((item) => {
                  const isExpanded = expandedItems.includes(item.label)
                  
                  if (item.href && !item.items) {
                    // Simple navigation link
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={handleNavigation}
                        className={cn(
                          "flex items-center w-full px-4 py-3 text-base",
                          "font-medium text-gray-900 rounded-lg",
                          "hover:bg-gray-50 hover:text-primary-600",
                          "transition-colors duration-200 min-h-[44px]"
                        )}
                      >
                        {item.label}
                      </Link>
                    )
                  }

                  if (item.items) {
                    // Expandable navigation section
                    return (
                      <div key={item.label}>
                        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Expandable trigger button */}
                        {/* TRIGGER_REASON: Official Framer Motion documentation for interactive animations */}
                        <button
                          onClick={() => toggleExpanded(item.label)}
                          className={cn(
                            "flex items-center justify-between w-full px-4 py-3",
                            "text-base font-medium text-gray-900 rounded-lg",
                            "hover:bg-gray-50 hover:text-primary-600",
                            "transition-colors duration-200 min-h-[44px]"
                          )}
                          aria-expanded={isExpanded}
                          aria-controls={`mobile-submenu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                        >
                          <span>{item.label}</span>
                          {/* CONTEXT7 SOURCE: /grx7/framer-motion - Animated chevron icon */}
                          {/* CHEVRON_REASON: Official Framer Motion documentation for rotation animations */}
                          <motion.svg
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            aria-hidden="true"
                          >
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </motion.svg>
                        </button>

                        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Animated submenu */}
                        {/* SUBMENU_REASON: Official Framer Motion documentation for height animations */}
                        <motion.div
                          id={`mobile-submenu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                          initial={false}
                          animate={{
                            height: isExpanded ? 'auto' : 0,
                            opacity: isExpanded ? 1 : 0
                          }}
                          transition={{
                            duration: 0.3,
                            ease: 'easeInOut'
                          }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 mt-2 space-y-1">
                            {item.items.map((subItem, index) => (
                              <motion.div
                                key={subItem.label}
                                initial={false}
                                animate={{
                                  opacity: isExpanded ? 1 : 0,
                                  x: isExpanded ? 0 : -10
                                }}
                                transition={{
                                  duration: 0.2,
                                  delay: isExpanded ? index * 0.05 : 0
                                }}
                              >
                                <Link
                                  href={subItem.href}
                                  onClick={handleNavigation}
                                  className={cn(
                                    "flex flex-col px-4 py-3 text-sm rounded-lg",
                                    "text-gray-700 hover:bg-gray-50 hover:text-primary-600",
                                    "transition-colors duration-200 min-h-[44px]"
                                  )}
                                >
                                  <span className="font-medium">{subItem.label}</span>
                                  {subItem.description && (
                                    <span className="text-xs text-gray-500 mt-1 line-clamp-2">
                                      {subItem.description}
                                    </span>
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    )
                  }

                  return null
                })}
              </nav>

              {/* CONTEXT7 SOURCE: /websites/headlessui_com - Mobile CTA section */}
              {/* CTA_REASON: Official Headless UI documentation for dialog action patterns */}
              <div className="border-t border-gray-200 px-6 py-4">
                <Link
                  href="https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavigation}
                  className={cn(
                    "flex items-center justify-center w-full px-6 py-3",
                    "text-base font-semibold text-white bg-primary-600",
                    "rounded-lg hover:bg-primary-700 transition-colors duration-200",
                    "min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary-500"
                  )}
                >
                  Request Free Consultation
                </Link>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Context-Aware CTA Button Component
 * IMPLEMENTATION_REASON: Official Tailwind documentation for button styling with hover effects and transitions
 * 
 * CONTEXT7 SOURCE: /grx7/framer-motion - Animation and interaction patterns
 * ANIMATION_REASON: Official Framer Motion documentation for hover animations and scale effects
 * 
 * CONTEXT7 SOURCE: /vercel/next.js - Link component composition patterns
 * LINK_REASON: Official Next.js documentation for Link component with button composition
 */
interface CTAButtonProps {
  isTransparent: boolean
  isHomepage: boolean
}

function CTAButton({ isTransparent, isHomepage }: CTAButtonProps) {
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Context-aware styling system
  // STYLING_REASON: Official Tailwind documentation for conditional class composition and button variants
  const buttonStyles = cn(
    // Base button styles - consistent across all states
    "inline-flex items-center justify-center",
    "px-6 py-3 text-sm font-semibold rounded-lg",
    "min-h-[44px] transition-all duration-300 ease-in-out", // WCAG 2.1 AA touch target + smooth transitions
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "hover:scale-105 active:scale-95", // Premium interaction effects
    "relative overflow-hidden", // For shimmer effect
    
    // Responsive visibility - desktop only (1500px+)
    "hidden desktop:block",
    
    // Context-aware styling logic
    isHomepage || !isTransparent ? (
      // Solid state styling (homepage or scrolled)
      cn(
        "bg-accent-600 text-white border-2 border-accent-600",
        "hover:bg-accent-700 hover:border-accent-700",
        "hover:shadow-lg hover:shadow-accent-600/25",
        "focus:ring-accent-500"
      )
    ) : (
      // Transparent state styling (hero pages, not scrolled)
      cn(
        "bg-transparent text-white border-2 border-white",
        "hover:bg-white hover:text-primary-700 hover:border-white",
        "hover:shadow-lg hover:shadow-white/25",
        "focus:ring-white/50"
      )
    )
  )

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Shimmer effect CSS-in-Tailwind pattern
  // SHIMMER_REASON: Official Tailwind documentation for pseudo-element styling and animations
  const shimmerStyles = cn(
    "before:absolute before:inset-0",
    "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
    "before:translate-x-[-100%] before:transition-transform before:duration-600",
    "hover:before:translate-x-[100%]"
  )

  return (
    <div className="hidden desktop:block">
      {/* CONTEXT7 SOURCE: /vercel/next.js - Link component with anchor composition */}
      {/* LINK_COMPOSITION_REASON: Official Next.js documentation for Link component button patterns */}
      <Link 
        href="https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonStyles, shimmerStyles)}
        aria-label="Request Free Consultation - Opens Bizstim inquiry form in new window"
        role="button"
      >
        {/* CONTEXT7 SOURCE: /grx7/framer-motion - Motion span for premium text animation */}
        {/* TEXT_ANIMATION_REASON: Official Framer Motion documentation for hover text effects */}
        <motion.span
          className="relative z-10 flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          Request Free Consultation
          
          {/* Premium arrow icon with context-aware styling */}
          <motion.svg
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              isHomepage || !isTransparent ? "text-white" : "text-white group-hover:text-primary-700"
            )}
            whileHover={{ x: 2 }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </motion.svg>
        </motion.span>
      </Link>
    </div>
  )
}

// CONTEXT7 SOURCE: /typescript/handbook - Type export for component reuse
// TYPE_EXPORT_REASON: Official TypeScript documentation for interface exports
export type { PageHeaderProps }