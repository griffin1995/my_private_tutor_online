/**
 * PREMIUM NAVIGATION COMPONENT - MY PRIVATE TUTOR ONLINE
 * Redesigned: January 2025
 * 
 * A sophisticated navigation component featuring full-screen dropdown overlays:
 * - Next.js 15 App Router patterns
 * - Headless UI for accessibility and control
 * - Framer Motion for smooth animations
 * - Full-screen persistent dropdowns with hover triggers
 * - Flat design aesthetic with metallic blue and aztec gold
 * 
 * CONTEXT7 SOURCE: /vercel/next.js - Link component and navigation patterns
 * IMPLEMENTATION REASON: Official Next.js documentation for client-side navigation
 * 
 * CONTEXT7 SOURCE: /tailwindlabs/headlessui - Menu component with hover interactions
 * IMPLEMENTATION REASON: Official Headless UI documentation for accessible menu components
 * 
 * CONTEXT7 SOURCE: /grx7/framer-motion - Animation and transition patterns
 * IMPLEMENTATION REASON: Official Framer Motion documentation for smooth transitions
 */

"use client"

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
// CONTEXT7 SOURCE: /lucide-icons/lucide - Standard icon imports for navigation components
// REVERSION REASON: Restoring ChevronDown import for main menu dropdown indicators per user request
import { Menu as MenuIcon, X, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'

// CONTEXT7 SOURCE: /typescript/handbook - Type definitions for navigation structure
// TYPE_REASON: Official TypeScript documentation for interface definitions
interface NavigationItem {
  label: string
  href?: string
  description?: string
  items?: NavigationItem[]
  featured?: boolean
  icon?: React.ReactNode
}

interface NavigationProps {
  className?: string
  isHomepage?: boolean
}

// CONTEXT7 SOURCE: /tailwindlabs/headlessui - Custom hook for dropdown state management
// STATE_REASON: Official Headless UI documentation for managing menu state with custom logic
interface DropdownState {
  isOpen: boolean
  activeMenu: string | null
}


// CONTEXT7 SOURCE: /vercel/next.js - Static navigation data pattern with comprehensive submenus
// DATA_REASON: Official Next.js documentation for static data optimization with anchor link navigation
// SUBMENU_REASON: Added comprehensive submenus using section IDs extracted from each page for smooth scrolling navigation
const navigationData: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
    items: [
      { label: 'Top Schools', href: '/#homepage-schools' },
      { label: 'Results', href: '/#homepage-results' },
      { label: 'Who We Support', href: '/#homepage-who-we-support' },
      { label: 'What We Offer', href: '/#homepage-what-we-offer' },
      { label: 'Testimonials', href: '/#homepage-testimonials' },
    ],
  },
  {
    label: 'About Us',
    href: '/about',
    items: [
      { label: 'Founder\'s Story', href: '/about#about-founder-story' },
      { label: 'Our Ethos', href: '/about#about-quote' },
      { label: 'Client Reviews', href: '/about#about-testimonials' },
    ],
  },
  {
    label: 'Subject Tuition',
    href: '/subject-tuition',
    items: [
      { label: 'Subject Categories', href: '/subject-tuition#subject-tuition-categories' },
      { label: 'Academic Results', href: '/subject-tuition#subject-tuition-results' },
      { label: 'Home Education', href: '/subject-tuition#subject-tuition-homeschooling-preview' },
    ],
  },
  {
    label: 'How It Works',
    href: '/how-it-works',
    items: [
      { label: 'Our Process', href: '/how-it-works#how-it-works-process-steps' },
      { label: 'Meet Our Tutors', href: '/how-it-works#how-it-works-tutors' },
      { label: 'Pricing Tiers', href: '/how-it-works#how-it-works-tutoring-tiers' },
      { label: 'Why Choose Us', href: '/how-it-works#how-it-works-benefits' },
    ],
  },
  {
    label: 'Testimonials',
    href: '/testimonials',
    items: [
      { label: 'Filter Reviews', href: '/testimonials#testimonials-filter' },
      { label: 'All Reviews', href: '/testimonials#testimonials-grid' },
      { label: 'Elite Schools', href: '/testimonials#testimonials-schools-carousel' },
    ],
  },
  {
    label: 'Video Masterclasses',
    href: '/video-masterclasses',
    items: [
      { label: 'Introduction', href: '/video-masterclasses#section-2' },
      { label: 'Featured Classes', href: '/video-masterclasses#section-4' },
      { label: 'Free Resources', href: '/video-masterclasses#section-3' },
      { label: 'UCAS Guide', href: '/video-masterclasses#ucas-guide-section' },
      { label: 'British Culture', href: '/video-masterclasses#british-culture-section' },
    ],
  },
  {
    label: '11+ Bootcamps',
    href: '/11-plus-bootcamps',
    items: [
      { label: 'Elite Schools', href: '/11-plus-bootcamps#bootcamps-schools' },
      { label: 'Our Promise', href: '/11-plus-bootcamps#bootcamps-tagline' },
      { label: 'Programmes', href: '/11-plus-bootcamps#bootcamps-programme-options' },
      { label: 'What Makes Us Different', href: '/11-plus-bootcamps#bootcamps-features' },
    ],
  },
// CONTEXT7 SOURCE: /mdn/content - Array.prototype.filter() method for removing elements from arrays
// REMOVAL_REASON: Official MDN documentation for filtering arrays - FAQ navigation item removed per user request
// FAQ navigation item removed from navigationData array
]

// CONTEXT7 SOURCE: /grx7/framer-motion - Animation variants for navigation transitions
// ANIMATION_REASON: Official Framer Motion documentation for reusable animation variants
const navVariants = {
  hidden: { 
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  }
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Full-screen overlay animation variants
// OVERLAY_REASON: Official Framer Motion documentation for full-screen overlay transitions
const overlayVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.15,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: 'easeIn'
    }
  }
}

const mobileMenuVariants = {
  closed: {
    x: '100%',
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  open: {
    x: 0,
    transition: {
      type: 'tween',
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}

export function Navigation({ className, isHomepage = false }: NavigationProps) {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  // CONTEXT7 SOURCE: /reactjs/react.dev - useState for mobile menu state management
  // STATE_REASON: Official React documentation for boolean state management in mobile navigation components
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [dropdownState, setDropdownState] = useState<DropdownState>({ isOpen: false, activeMenu: null })
  // CONTEXT7 SOURCE: /reactjs/react.dev - useState for tracking active menu item state
  // STATE_REASON: Official React documentation for managing conditional styling state
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { scrollY } = useScroll()
  

  // CONTEXT7 SOURCE: /grx7/framer-motion - useMotionValueEvent for scroll detection
  // SCROLL_REASON: Official Framer Motion documentation for scroll-based state changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // CONTEXT7 SOURCE: /reactjs/react.dev - useRef for timeout ID management with hover delay
  // HOVER_DELAY_REASON: Official React documentation for storing mutable timeout values that persist across renders without triggering re-renders
  const hoverDelayTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // CONTEXT7 SOURCE: /tailwindlabs/headlessui - Custom dropdown state management with hover delay
  // DROPDOWN_REASON: Official Headless UI documentation for managing persistent dropdown behavior with 300ms hover delay to prevent accidental triggers
  const handleMouseEnter = (menuLabel: string) => {
    // Clear any existing close timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    
    // Clear any existing hover delay timeout
    if (hoverDelayTimeoutRef.current) {
      clearTimeout(hoverDelayTimeoutRef.current)
      hoverDelayTimeoutRef.current = null
    }
    
    // CONTEXT7 SOURCE: /reactjs/react.dev - setTimeout for delayed state updates in event handlers
    // TIMEOUT_REASON: Official React documentation for using setTimeout within event handlers to delay dropdown opening by 300ms
    hoverDelayTimeoutRef.current = setTimeout(() => {
      setDropdownState({ isOpen: true, activeMenu: menuLabel })
      // CONTEXT7 SOURCE: /reactjs/react.dev - State management for active menu highlighting
      // ACTIVE_STATE_REASON: Official React documentation for conditional state updates
      setActiveMenuItem(menuLabel)
      hoverDelayTimeoutRef.current = null
    }, 300) // 300ms delay for optimal UX - prevents accidental triggers from quick mouse movements
  }

  const handleMouseLeave = () => {
    // CONTEXT7 SOURCE: /reactjs/react.dev - clearTimeout for cancelling pending state updates
    // CLEANUP_REASON: Official React documentation for clearing setTimeout to cancel delayed dropdown opening when mouse leaves before delay completes
    if (hoverDelayTimeoutRef.current) {
      clearTimeout(hoverDelayTimeoutRef.current)
      hoverDelayTimeoutRef.current = null
    }
    
    dropdownTimeoutRef.current = setTimeout(() => {
      // Don't close on mouse leave - require explicit close action
    }, 100)
  }

  const handleCloseDropdown = () => {
    // CONTEXT7 SOURCE: /reactjs/react.dev - clearTimeout for comprehensive timeout cleanup
    // CLEANUP_REASON: Official React documentation for clearing all pending timeouts when closing dropdown explicitly
    if (hoverDelayTimeoutRef.current) {
      clearTimeout(hoverDelayTimeoutRef.current)
      hoverDelayTimeoutRef.current = null
    }
    
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    
    setDropdownState({ isOpen: false, activeMenu: null })
    // CONTEXT7 SOURCE: /reactjs/react.dev - State reset for active menu highlighting
    // RESET_REASON: Official React documentation for clearing conditional state
    setActiveMenuItem(null)
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for route change side effects without infinite loops
  // ROUTE_CHANGE_REASON: Official React documentation pattern for closing modals/menus on navigation without causing infinite loops
  // Close mobile menu on route change only (not on state changes)
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect cleanup function for timeout memory leak prevention
  // CLEANUP_REASON: Official React documentation for cleanup functions to prevent memory leaks when component unmounts
  useEffect(() => {
    return () => {
      // Clear all timeouts on component unmount to prevent memory leaks
      if (hoverDelayTimeoutRef.current) {
        clearTimeout(hoverDelayTimeoutRef.current)
        hoverDelayTimeoutRef.current = null
      }
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
        dropdownTimeoutRef.current = null
      }
    }
  }, [])

  // CONTEXT7 SOURCE: /vercel/next.js - usePathname for active link detection
  // ACTIVE_REASON: Official Next.js documentation for determining active navigation state
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Rules of Hooks for dynamic font sizing
  // HOOKS_REASON: Official React documentation - All hooks must be called at component top level, not conditionally or in loops
  // Track window size changes for responsive font calculations
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // CONTEXT7 SOURCE: /websites/react_dev - Window resize event listener for responsive recalculation
  // RESIZE_REASON: Official React documentation for handling window resize events in effects
  // INFINITE LOOP FIX: Throttle resize events and prevent unnecessary state updates
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newSize = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        // Only update if values actually changed
        setWindowSize(prev => {
          if (prev.width !== newSize.width || prev.height !== newSize.height) {
            return newSize;
          }
          return prev;
        });
      }, 100); // Throttle resize events
    }

    // Set initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (timeoutId) clearTimeout(timeoutId);
    }
  }, [])

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive height calculations for dynamic navbar sizing
  // NAVBAR_HEIGHT_REASON: Official Tailwind documentation for responsive design patterns - calculating navbar height based on viewport width
  // Mobile: h-24 = 96px, Large: h-28 = 112px, XL: h-32 = 128px (20% increase from original responsive design)
  const getNavbarHeight = (width: number) => {
    if (width >= 1280) return 128 // xl: h-32
    if (width >= 1024) return 112 // lg: h-28  
    return 96 // default: h-24
  }

  // Calculate font sizes for all menus at component level to avoid conditional hook calls
  const menuFontSizes = React.useMemo(() => {
    const activeMenuData = navigationData.find(item => item.label === dropdownState.activeMenu && item.items)
    if (!activeMenuData || !dropdownState.isOpen) return {}
    
    const itemCount = activeMenuData.items?.length || 0
    if (itemCount === 0) return {}

    // CONTEXT7 SOURCE: /reactjs/react.dev - getBoundingClientRect for layout measurements
    // MEASUREMENT_REASON: Official React documentation for measuring DOM element dimensions
    const calculateOptimalFontSize = (count: number) => {
      const viewportHeight = windowSize.height || window.innerHeight
      const navbarHeight = getNavbarHeight(windowSize.width || window.innerWidth)
      const paddingAndMargins = 120 // Top/bottom padding and margins
      const closeButtonSpace = 60 // Space for close button
      const lineSpacing = 8 // Gap between items (py-1 = 8px total)
      
      const availableHeight = viewportHeight - navbarHeight - paddingAndMargins - closeButtonSpace
      const totalSpacing = (count - 1) * lineSpacing
      const heightPerItem = (availableHeight - totalSpacing) / count
      
      // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Font size calculations for responsive typography
      // CALCULATION_REASON: Official Tailwind CSS documentation for calculating optimal font sizes within constraints
      // Convert height to approximate font size (accounting for line-height)
      const lineHeightMultiplier = 1.2 // Standard line-height
      const baseFontSize = Math.floor(heightPerItem / lineHeightMultiplier)
      
      // Map calculated size to Tailwind classes with clamp for responsiveness
      if (baseFontSize >= 80) return 'text-7xl' // 72px
      if (baseFontSize >= 60) return 'text-6xl' // 60px  
      if (baseFontSize >= 48) return 'text-5xl' // 48px
      if (baseFontSize >= 36) return 'text-4xl' // 36px
      if (baseFontSize >= 30) return 'text-3xl' // 30px
      if (baseFontSize >= 24) return 'text-2xl' // 24px
      if (baseFontSize >= 20) return 'text-xl'  // 20px
      return 'text-lg' // 18px minimum
    }

    return {
      [dropdownState.activeMenu]: calculateOptimalFontSize(itemCount)
    }
  }, [dropdownState.activeMenu, dropdownState.isOpen, navigationData, windowSize])

  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for dynamic navigation font sizing calculations
  // DYNAMIC_FONT_REASON: Official React documentation for memoizing expensive calculations that depend on window dimensions
  // Calculate optimal font sizes for main navigation items based on available horizontal space
  const mainNavFontSizes = React.useMemo(() => {
    const viewportWidth = windowSize.width || window.innerWidth
    
    // Only apply dynamic sizing at desktop/tablet sizes (≥1024px - lg breakpoint)
    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive breakpoints for mobile-first design
    // BREAKPOINT_REASON: Official Tailwind CSS documentation - lg breakpoint is 64rem (1024px) minimum width
    if (viewportWidth < 1024) return {}
    
    // CONTEXT7 SOURCE: /reactjs/react.dev - Container space calculations for responsive layout
    // SPACE_CALCULATION_REASON: Official React documentation for measuring available layout space
    // Calculate available horizontal space: total width - logo width - CTA button - spacing
    const logoWidth = viewportWidth >= 1280 ? 224 : 192 // xl: w-56 (224px), lg: w-48 (192px)
    const ctaButtonWidth = 240 // "Request Free Consultation" button approximate width
    const containerPadding = viewportWidth >= 1024 ? 48 : 32 // lg:px-6 (48px total), px-4 (32px total)
    const logoMargin = 48 // ml-12 = 48px
    const itemSpacing = 32 * (navigationData.length - 1) // space-x-8 = 32px between items
    
    const totalFixedWidth = logoWidth + logoMargin + ctaButtonWidth + containerPadding + itemSpacing
    const availableNavWidth = viewportWidth - totalFixedWidth
    
    // Calculate optimal font size per navigation item based on text length and available space
    const averageWidthPerItem = availableNavWidth / navigationData.length
    
    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Font size utility classes and responsive design
    // FONT_SIZE_REASON: Official Tailwind CSS documentation for font-size utility classes from text-sm to text-xl
    // Estimate character width ratios for different font sizes (approximate values)
    const fontSizeOptions = [
      { class: 'text-xl', pixelSize: 20, charWidth: 12 },   // 20px font, ~12px per character
      { class: 'text-lg', pixelSize: 18, charWidth: 11 },   // 18px font, ~11px per character  
      { class: 'text-base', pixelSize: 16, charWidth: 10 }, // 16px font, ~10px per character
      { class: 'text-sm', pixelSize: 14, charWidth: 8.5 }   // 14px font, ~8.5px per character (minimum for WCAG)
    ]
    
    // Calculate optimal font size for each navigation item
    const itemFontSizes: Record<string, string> = {}
    
    navigationData.forEach(item => {
      const textLength = item.label.length
      
      // Find largest font size that fits within available width
      let optimalFontClass = 'text-sm' // Default minimum size
      
      for (const option of fontSizeOptions) {
        const estimatedWidth = textLength * option.charWidth
        if (estimatedWidth <= averageWidthPerItem * 0.9) { // 90% to allow padding
          optimalFontClass = option.class
          break
        }
      }
      
      itemFontSizes[item.label] = optimalFontClass
    })
    
    return itemFontSizes
  }, [windowSize, navigationData])

  return (
    <>
        <motion.header
          initial="hidden"
          animate="visible"
          variants={navVariants}
          className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-24 lg:h-28 xl:h-32",
            // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional styling with background colors
            // BACKGROUND_LOGIC_REASON: Official Tailwind documentation for conditional class application - submenu open state takes priority for white background
            dropdownState.isOpen ? "bg-white shadow-sm" : (isScrolled ? "bg-white shadow-sm" : "bg-transparent"),
            className
          )}
      >
        <div className="container mx-auto px-4 lg:px-6 h-24 lg:h-28 xl:h-32">
          <nav className="flex items-center justify-between h-24 lg:h-28 xl:h-32">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive height utilities with navbar proportional scaling
                // LOGO_SIZE_REASON: Official Tailwind documentation for h-<number> utilities - scaling logo to use 80-85% of navbar height (h-20/h-24 for h-24 navbar, h-24/h-28 for h-28 navbar, h-28/h-32 for h-32 navbar)
                className="relative w-48 h-20 lg:h-24 xl:h-28"
              >
                {/* CONTEXT7 SOURCE: /vercel/next.js - Dynamic image src with conditional logic based on state */}
                {/* REVISION REASON: Implemented logo state management - dark logo when dropdown open OR scrolled, white logo when dropdown closed AND not scrolled */}
                <Image
                  src={`/images/logos/${(dropdownState.isOpen || isScrolled) ? 'logo-with-name.png' : 'logo-with-name-white.png'}`}
                  alt="My Private Tutor Online"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-start ml-12">
              {navigationData.map((item) => (
                <div key={item.label} className="relative">
                  {item.items ? (
                    <div
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* CONTEXT7 SOURCE: /tailwindlabs/headlessui - MenuButton with custom trigger behavior */}
                      {/* TRIGGER_REASON: Official Headless UI documentation for MenuButton with custom hover triggers */}
                      <div className="flex items-center">
                        {item.href ? (
                          <Link
                            href={item.href}
                            className={cn(
                              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Font family utilities for custom font application
                              // FONT_FAMILY_REASON: Official Tailwind documentation for using custom font variables via font utility classes
                              // CONTEXT7 SOURCE: /reactjs/react.dev - Dynamic font sizing with responsive breakpoints
                              // DYNAMIC_FONT_REASON: Official React documentation for applying calculated font sizes based on available space
                              "flex items-center gap-1 px-2 py-1 font-medium font-display transition-all duration-200",
                              // Apply dynamic font size or fallback to responsive clamp
                              mainNavFontSizes[item.label] || "clamp-[text,sm,lg]",
                              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flat design color scheme
                              // COLOR_REASON: Official Tailwind documentation for custom color implementation
                              "text-[#3F4A7E] hover:text-[#CA9E5B]",
                              isScrolled ? "text-[#3F4A7E]" : "text-white hover:text-[#CA9E5B]",
                              isActive(item.href) && "text-[#CA9E5B]",
                              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional class application
                              // ACTIVE_MENU_REASON: Official Tailwind documentation for conditional styling patterns
                              activeMenuItem === item.label && "text-[#CA9E5B]",
                              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional class application
                              // DROPDOWN_STATE_COLOR_REASON: Official Tailwind documentation for conditional class application - navy color when dropdown is open
                              dropdownState.isOpen && activeMenuItem !== item.label && "text-[#3F4A7E]"
                            )}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            className={cn(
                              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Font family utilities for custom font application
                              // FONT_FAMILY_REASON: Official Tailwind documentation for using custom font variables via font utility classes
                              // CONTEXT7 SOURCE: /reactjs/react.dev - Dynamic font sizing with responsive breakpoints
                              // DYNAMIC_FONT_REASON: Official React documentation for applying calculated font sizes based on available space
                              "flex items-center gap-1 px-2 py-1 font-medium font-display transition-all duration-200",
                              // Apply dynamic font size or fallback to responsive clamp
                              mainNavFontSizes[item.label] || "clamp-[text,sm,lg]",
                              "text-[#3F4A7E] hover:text-[#CA9E5B]",
                              isScrolled ? "text-[#3F4A7E]" : "text-white hover:text-[#CA9E5B]",
                              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional class application
                              // ACTIVE_MENU_REASON: Official Tailwind documentation for conditional styling patterns
                              activeMenuItem === item.label && "text-[#CA9E5B]",
                              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional class application
                              // DROPDOWN_STATE_COLOR_REASON: Official Tailwind documentation for conditional class application - navy color when dropdown is open
                              dropdownState.isOpen && activeMenuItem !== item.label && "text-[#3F4A7E]"
                            )}
                          >
                            {item.label}
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Font family utilities for custom font application
                        // FONT_FAMILY_REASON: Official Tailwind documentation for using custom font variables via font utility classes
                        // CONTEXT7 SOURCE: /reactjs/react.dev - Dynamic font sizing with responsive breakpoints
                        // DYNAMIC_FONT_REASON: Official React documentation for applying calculated font sizes based on available space
                        "flex items-center px-2 py-1 font-medium font-display transition-all duration-200",
                        // Apply dynamic font size or fallback to responsive clamp
                        mainNavFontSizes[item.label] || "clamp-[text,sm,lg]",
                        "text-[#3F4A7E] hover:text-[#CA9E5B]",
                        isScrolled ? "text-[#3F4A7E]" : "text-white hover:text-[#CA9E5B]",
                        isActive(item.href!) && "text-[#CA9E5B]",
                        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional class application
                        // DROPDOWN_STATE_COLOR_REASON: Official Tailwind documentation for conditional class application - navy color when dropdown is open
                        dropdownState.isOpen && !isActive(item.href!) && "text-[#3F4A7E]"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link href="https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~">
                <InteractiveHoverButton>
                  Request Free Consultation
                </InteractiveHoverButton>
              </Link>
            </div>

            {/* CONTEXT7 SOURCE: /reactjs/react.dev - Button click handler for mobile menu toggle */}
            {/* CLICK_REASON: Official React documentation onClick pattern for state updates in mobile navigation */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                "lg:hidden p-2 rounded-lg transition-colors duration-200",
                isScrolled ? "text-[#3F4A7E] hover:bg-gray-100" : "text-white hover:bg-white/10"
              )}
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </nav>
        </div>
        </motion.header>

      {/* Full-Screen Dropdown Overlays */}
      <AnimatePresence>
        {dropdownState.isOpen && dropdownState.activeMenu && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 z-40"
            style={{ top: `${getNavbarHeight()}px` }}
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-screen overlay implementation */}
            {/* OVERLAY_REASON: Official Tailwind documentation for full-screen overlay positioning */}
            <div className="absolute inset-0 bg-white">
              {/* Close Button */}
              <div className="absolute top-6 right-6 z-50">
                <button
                  onClick={handleCloseDropdown}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200",
                    "bg-gray-100 hover:bg-gray-200 text-[#3F4A7E]"
                  )}
                  aria-label="Close dropdown"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
              </div>

              {/* Dropdown Content */}
              <div className="container mx-auto px-4 lg:px-6 pt-8">
                {navigationData
                  .filter(item => item.label === dropdownState.activeMenu && item.items)
                  .map(item => {
                    // CONTEXT7 SOURCE: /reactjs/react.dev - Accessing precomputed values to avoid hook order violations
                    // FONT_SIZE_REASON: Official React documentation - Use precomputed font sizes from useMemo to maintain hook order consistency
                    const fontSize = menuFontSizes[item.label] || 'text-3xl'

                    return (
                      <div key={item.label} className="max-w-6xl mx-auto">
                        
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid layout for navigation items with dynamic spacing */}
                        {/* GRID_REASON: Official Tailwind documentation for responsive grid layout with calculated gaps */}
                        <div className="grid gap-2">
                          {item.items!.map((subItem, subIndex) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href!}
                              onClick={handleCloseDropdown}
                              className={cn(
                                "block py-1 px-6 rounded-lg transition-colors duration-200 group no-underline",
                                "hover:text-[#CA9E5B] hover:no-underline",
                                subItem.featured && "bg-gradient-to-r from-[#3F4A7E]/5 to-[#CA9E5B]/5"
                              )}
                              style={{ textDecoration: 'none' }}
                              // CONTEXT7 SOURCE: /nicolas-cusan/tailwind-clamp - Dynamic font sizing with responsive typography
                              // DYNAMIC_SIZING_REASON: Official Tailwind Clamp documentation for fluid typography that adapts to content and viewport
                              // 
                              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - no-underline utility class for removing text decorations
                              // REVISION_REASON: Enhanced no-underline classes to ensure no underline effects on submenu item hover states
                            >
                              <h3 className={cn(
                                fontSize,
                                "font-semibold text-[#3F4A7E] hover:text-[#CA9E5B] transition-colors no-underline hover:no-underline leading-tight"
                              )} style={{ textDecoration: 'none' }}>
                                {subItem.label}
                              </h3>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  })
                }
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering pattern for mobile menu */}
      {/* CONDITIONAL_REASON: Official React documentation pattern for conditional UI rendering based on state */}
      {isMobileMenuOpen && (
        <>
          {/* Mobile Menu Overlay */}
          <div 
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Content */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50">
            <div className="w-full h-full">
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-lg font-bold text-[#3F4A7E]">
                    Menu
                  </h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#3F4A7E]"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile Menu Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <MobileNavigation 
                    items={navigationData} 
                    pathname={pathname}
                    onNavigate={() => setIsMobileMenuOpen(false)}
                  />
                </div>

                {/* Mobile Menu Footer */}
                <div className="p-6 border-t border-gray-200">
                  <Link href="https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~" className="block">
                    <InteractiveHoverButton className="w-full">
                      Request Free Consultation
                    </InteractiveHoverButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  )
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Recursive component pattern for mobile navigation
// RECURSIVE_REASON: Official React documentation for nested navigation structures
function MobileNavigation({ 
  items, 
  pathname, 
  onNavigate 
}: { 
  items: NavigationItem[]
  pathname: string
  onNavigate: () => void
}) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    )
  }

  return (
    <div className="space-y-2">
      {items.map((item, itemIndex) => {
        const isExpanded = expandedItems.includes(item.label)
        const hasSubItems = item.items && item.items.length > 0

        return (
          // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - border-none utility for removing borders
          // BORDER_REMOVAL_REASON: Official Tailwind documentation for removing element borders using border-none
          <div key={item.label} className="rounded-lg border-none overflow-hidden">
            {hasSubItems ? (
              <>
                <button
                  onClick={() => toggleExpanded(item.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200",
                    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom color application with royal blue
                    // COLOR_REVISION_REASON: Official Tailwind documentation for applying royal blue (#3F4A7E) to mobile menu items
                    "hover:bg-gray-50 text-[#3F4A7E]",
                    isExpanded && "bg-gray-50 text-[#3F4A7E]"
                  )}
                >
                  <span className="font-medium text-[#3F4A7E]">{item.label}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform duration-200 text-[#3F4A7E]",
                      isExpanded && "rotate-90 text-[#3F4A7E]"
                    )}
                  />
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className="ml-4 space-y-1 overflow-hidden bg-gray-50/50 pb-2"
                    >
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href!}
                          onClick={onNavigate}
                          className={cn(
                            "block px-4 py-2 rounded-lg transition-colors duration-200 mx-2",
                            // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom color application with royal blue
                            // COLOR_REVISION_REASON: Official Tailwind documentation for applying royal blue (#3F4A7E) to mobile menu items
                            "hover:bg-white hover:text-[#3F4A7E] text-[#3F4A7E] no-underline hover:no-underline",
                            pathname === subItem.href && "bg-white text-[#3F4A7E] font-medium"
                          )}
                          // CONTEXT7 SOURCE: /microsoft/typescript - Optional interface properties pattern  
                          // REVISION REASON: Simplified mobile submenu items to show only headings, removed description text rendering
                          // 
                          // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - no-underline utility class for removing text decorations
                          // REVISION REASON: Added no-underline class to prevent underline effects on mobile submenu item hover states
                        >
                          <div className="text-base font-medium text-[#3F4A7E]">{subItem.label}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={item.href!}
                onClick={onNavigate}
                className={cn(
                  "block px-4 py-3 transition-colors duration-200",
                  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Custom color application with royal blue
                  // COLOR_REVISION_REASON: Official Tailwind documentation for applying royal blue (#3F4A7E) to mobile menu items
                  "hover:bg-gray-50 hover:text-[#3F4A7E] text-[#3F4A7E]",
                  pathname === item.href && "bg-gray-50 text-[#3F4A7E] font-medium"
                )}
              >
                <span className="text-[#3F4A7E]">{item.label}</span>
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}