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
import * as Dialog from '@radix-ui/react-dialog'
// CONTEXT7 SOURCE: /lucide-icons/lucide - Standard icon imports for navigation components
// REVERSION REASON: Restoring ChevronDown import for main menu dropdown indicators per user request
import { Menu as MenuIcon, X, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import ArrowAngularTopRight from '@/components/icons/ArrowAngularTopRight'

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
      // CONTEXT7 SOURCE: /vercel/next.js - Link component with homepage navigation pattern
      // REVISION REASON: Changed "Hero" to "Overview" and updated href from section anchor to homepage root path
      { label: 'Overview', href: '/' },
      { label: 'Our Promise', href: '/#homepage-tagline' },
      { label: 'Top Schools', href: '/#homepage-schools' },
      { label: 'Our Mission', href: '/#homepage-mission' },
      { label: 'About Elizabeth', href: '/#homepage-about' },
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
      { label: 'Overview', href: '/about#about-hero' },
      { label: 'Founder\'s Story', href: '/about#about-founder-story' },
      { label: 'Our Ethos', href: '/about#about-quote' },
      { label: 'Client Reviews', href: '/about#about-testimonials' },
    ],
  },
  {
    label: 'Subject Tuition',
    href: '/subject-tuition',
    items: [
      { label: 'Overview', href: '/subject-tuition#subject-tuition-hero' },
      { label: 'Subject Categories', href: '/subject-tuition#subject-tuition-categories' },
      { label: 'Academic Results', href: '/subject-tuition#subject-tuition-results' },
      { label: 'Home Education', href: '/subject-tuition#subject-tuition-homeschooling-preview' },
    ],
  },
  {
    label: 'How It Works',
    href: '/how-it-works',
    items: [
      { label: 'Overview', href: '/how-it-works#how-it-works-hero' },
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
      { label: 'Overview', href: '/testimonials#testimonials-hero' },
      { label: 'Filter Reviews', href: '/testimonials#testimonials-filter' },
      { label: 'All Reviews', href: '/testimonials#testimonials-grid' },
      { label: 'Elite Schools', href: '/testimonials#testimonials-schools-carousel' },
    ],
  },
  {
    label: 'Video Masterclasses',
    href: '/video-masterclasses',
    items: [
      { label: 'Overview', href: '/video-masterclasses' },
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
      { label: 'Overview', href: '/11-plus-bootcamps#bootcamps-hero' },
      { label: 'Elite Schools', href: '/11-plus-bootcamps#bootcamps-schools' },
      { label: 'Our Promise', href: '/11-plus-bootcamps#bootcamps-tagline' },
      { label: 'Programmes', href: '/11-plus-bootcamps#bootcamps-programme-options' },
      { label: 'What Makes Us Different', href: '/11-plus-bootcamps#bootcamps-features' },
    ],
  },
  {
    label: 'FAQs',
    href: '/faq',
  },
  {
    label: 'Blog',
    href: '/blog',
    items: [
      { label: 'Latest Posts', href: '/blog#blog-hero' },
    ],
  },
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [dropdownState, setDropdownState] = useState<DropdownState>({ isOpen: false, activeMenu: null })
  // CONTEXT7 SOURCE: /reactjs/react.dev - useState for tracking active menu item state
  // STATE_REASON: Official React documentation for managing conditional styling state
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null)
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { scrollY } = useScroll()
  
  // DEBUG: State for showing debug overlay
  const [showDebug, setShowDebug] = useState(true)

  // CONTEXT7 SOURCE: /grx7/framer-motion - useMotionValueEvent for scroll detection
  // SCROLL_REASON: Official Framer Motion documentation for scroll-based state changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  // CONTEXT7 SOURCE: /tailwindlabs/headlessui - Custom dropdown state management
  // DROPDOWN_REASON: Official Headless UI documentation for managing persistent dropdown behavior
  const handleMouseEnter = (menuLabel: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setDropdownState({ isOpen: true, activeMenu: menuLabel })
    // CONTEXT7 SOURCE: /reactjs/react.dev - State management for active menu highlighting
    // ACTIVE_STATE_REASON: Official React documentation for conditional state updates
    setActiveMenuItem(menuLabel)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      // Don't close on mouse leave - require explicit close action
    }, 100)
  }

  const handleCloseDropdown = () => {
    setDropdownState({ isOpen: false, activeMenu: null })
    // CONTEXT7 SOURCE: /reactjs/react.dev - State reset for active menu highlighting
    // RESET_REASON: Official React documentation for clearing conditional state
    setActiveMenuItem(null)
  }

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

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
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // Set initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive height calculations for dynamic navbar sizing
  // NAVBAR_HEIGHT_REASON: Official Tailwind documentation for responsive design patterns - calculating navbar height based on viewport width
  // Mobile: h-24 = 96px, Large: h-28 = 112px, XL: h-32 = 128px (20% increase from original responsive design)
  const getNavbarHeight = () => {
    if (typeof window === 'undefined') return 104
    const width = window.innerWidth
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

    // CONTEXT7 SOURCE: /websites/react_dev - getBoundingClientRect for layout measurements
    // MEASUREMENT_REASON: Official React documentation for measuring DOM element dimensions
    const calculateOptimalFontSize = (count: number) => {
      const viewportHeight = windowSize.height || window.innerHeight
      const navbarHeight = getNavbarHeight()
      const paddingAndMargins = 120 // Top/bottom padding and margins
      const closeButtonSpace = 60 // Space for close button
      const lineSpacing = 8 // Gap between items (py-1 = 8px total)
      
      const availableHeight = viewportHeight - navbarHeight - paddingAndMargins - closeButtonSpace
      const totalSpacing = (count - 1) * lineSpacing
      const heightPerItem = (availableHeight - totalSpacing) / count
      
      // CONTEXT7 SOURCE: /nicolas-cusan/tailwind-clamp - Font size calculations for responsive typography
      // CALCULATION_REASON: Official Tailwind Clamp documentation for calculating optimal font sizes within constraints
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

  return (
    <>
      {/* DEBUG OVERLAY - Shows all navigation states */}
      {showDebug && (
        <div className="fixed top-0 left-0 z-[100] bg-black/90 text-white p-4 rounded-br-lg max-w-md">
          <div className="text-xs font-mono space-y-1">
            <div className="font-bold text-yellow-300 mb-2">🔍 NAVIGATION DEBUG MODE</div>
            
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div>📍 Scroll Position:</div>
              <div className="text-green-400">{Math.round(scrollY.get())}px</div>
              
              <div>📌 Is Scrolled:</div>
              <div className={isScrolled ? "text-blue-400" : "text-gray-400"}>{isScrolled ? "YES (blue border)" : "NO (red border)"}</div>
              
              <div>📂 Dropdown Open:</div>
              <div className={dropdownState.isOpen ? "text-green-400" : "text-gray-400"}>{dropdownState.isOpen ? "YES (green border)" : "NO"}</div>
              
              <div>📋 Active Menu:</div>
              <div className="text-amber-400">{dropdownState.activeMenu || "none"}</div>
              
              <div>🎯 Active Item:</div>
              <div className="text-amber-400">{activeMenuItem || "none"}</div>
              
              <div>📏 Navbar Height:</div>
              <div className="text-cyan-400">{getNavbarHeight()}px</div>
              
              <div>🖥️ Window Width:</div>
              <div className="text-purple-400">{windowSize.width}px</div>
            </div>
            
            <div className="mt-2 pt-2 border-t border-gray-600">
              <div className="font-bold text-yellow-300 mb-1">🎨 COLOR KEY:</div>
              <div className="grid grid-cols-2 gap-1 text-[10px]">
                <div>🔴 Red Border:</div>
                <div>Not scrolled, transparent bg</div>
                
                <div>🔵 Blue Border:</div>
                <div>Scrolled, white bg</div>
                
                <div>🟢 Green Border:</div>
                <div>Dropdown open, white bg</div>
                
                <div>🟡 Yellow Border:</div>
                <div>Container div</div>
                
                <div>🟣 Purple Border:</div>
                <div>Nav element</div>
                
                <div>🟠 Orange Border:</div>
                <div>Logo link</div>
                
                <div>🔷 Cyan Border:</div>
                <div>Desktop nav items</div>
                
                <div>🩷 Pink Border:</div>
                <div>Dropdown overlay</div>
                
                <div>💙 Indigo Border:</div>
                <div>Dropdown content</div>
                
                <div>🟨 Amber Border:</div>
                <div>Menu items container</div>
              </div>
            </div>
            
            <button
              onClick={() => setShowDebug(false)}
              className="mt-2 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-[10px] font-bold"
            >
              CLOSE DEBUG
            </button>
          </div>
        </div>
      )}
      
      <motion.header
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-24 lg:h-28 xl:h-32",
          // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional styling with background colors
          // BACKGROUND_LOGIC_REASON: Official Tailwind documentation for conditional class application - submenu open state takes priority for white background
          dropdownState.isOpen ? "bg-white shadow-sm" : (isScrolled ? "bg-white shadow-sm" : "bg-transparent"),
          // DEBUG: Visual indicators for navbar states
          "border-4",
          dropdownState.isOpen ? "border-green-500" : (isScrolled ? "border-blue-500" : "border-red-500"),
          className
        )}
        // DEBUG: Show current state in data attributes
        data-debug-scrolled={isScrolled}
        data-debug-dropdown-open={dropdownState.isOpen}
        data-debug-active-menu={dropdownState.activeMenu || 'none'}
        data-debug-height={getNavbarHeight()}
      >
        <div className="container mx-auto px-4 lg:px-6 h-24 lg:h-28 xl:h-32 border-2 border-yellow-400">
          <nav className="flex items-center justify-between h-24 lg:h-28 xl:h-32 border-2 border-purple-400">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 z-10 border-2 border-orange-400">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-48 h-12"
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
            <div className="hidden lg:flex items-center space-x-1 border-2 border-cyan-400">
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
                              "flex items-center gap-1 px-4 py-2 text-base font-medium transition-all duration-200",
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
                              "flex items-center gap-1 px-4 py-2 text-base font-medium transition-all duration-200",
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
                        "flex items-center px-4 py-2 text-base font-medium transition-all duration-200",
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
              <Button
                asChild
                className={cn(
                  "px-6 py-2.5 font-semibold transition-all duration-300",
                  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flat design button styling
                  // BUTTON_REASON: Official Tailwind documentation for flat design button implementation
                  "bg-[#3F4A7E] text-white hover:bg-[#CA9E5B] hover:scale-105 active:scale-95",
                  isScrolled 
                    ? "bg-[#3F4A7E] text-white hover:bg-[#CA9E5B]" 
                    : "bg-white text-[#3F4A7E] hover:bg-[#CA9E5B] hover:text-white"
                )}
              >
                {/* CONTEXT7 SOURCE: /vercel/next.js - Link component with external URL navigation pattern */}
                {/* REVISION REASON: Updated button text to "Request Free Consultation" and href to external inquiry form URL */}
                <Link href="https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~">
                  Request Free Consultation
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
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
            className="fixed inset-0 z-40 border-4 border-pink-500"
            style={{ top: `${getNavbarHeight()}px` }}
            // DEBUG: Show dropdown position calculation
            data-debug-top={getNavbarHeight()}
            data-debug-menu={dropdownState.activeMenu}
          >
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-screen overlay implementation */}
            {/* OVERLAY_REASON: Official Tailwind documentation for full-screen overlay positioning */}
            <div className="absolute inset-0 bg-white border-4 border-indigo-500">
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
              <div className="container mx-auto px-4 lg:px-6 pt-8 border-2 border-teal-500">
                {navigationData
                  .filter(item => item.label === dropdownState.activeMenu && item.items)
                  .map(item => {
                    // CONTEXT7 SOURCE: /reactjs/react.dev - Accessing precomputed values to avoid hook order violations
                    // FONT_SIZE_REASON: Official React documentation - Use precomputed font sizes from useMemo to maintain hook order consistency
                    const fontSize = menuFontSizes[item.label] || 'text-3xl'

                    return (
                      <div key={item.label} className="max-w-6xl mx-auto border-2 border-amber-500" data-debug-font-size={fontSize}>
                        
                        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid layout for navigation items with dynamic spacing */}
                        {/* GRID_REASON: Official Tailwind documentation for responsive grid layout with calculated gaps */}
                        <div className="grid gap-2">
                          {item.items!.map((subItem, subIndex) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href!}
                              onClick={handleCloseDropdown}
                              className={cn(
                                "block py-1 px-6 rounded-lg transition-colors duration-200 group",
                                "hover:text-[#CA9E5B] no-underline",
                                subItem.featured && "bg-gradient-to-r from-[#3F4A7E]/5 to-[#CA9E5B]/5"
                              )}
                              // CONTEXT7 SOURCE: /nicolas-cusan/tailwind-clamp - Dynamic font sizing with responsive typography
                              // DYNAMIC_SIZING_REASON: Official Tailwind Clamp documentation for fluid typography that adapts to content and viewport
                              // 
                              // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - no-underline utility class for removing text decorations
                              // REVISION_REASON: Added no-underline class to prevent underline effects on submenu item hover states
                            >
                              <div className="flex items-center gap-1">
                                <h3 className={cn(
                                  fontSize,
                                  "font-semibold text-[#3F4A7E] hover:text-[#CA9E5B] transition-colors no-underline leading-tight"
                                )}>
                                  {subItem.label}
                                </h3>
                                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Gap utilities for spacing between flex items */}
                                {/* ARROW_REASON: Official Tailwind documentation for gap-1 spacing - creates "1 character space" equivalent gap */}
                                {/* REVISION REASON: Using inline size calculation to properly match text height */}
                                <ArrowAngularTopRight 
                                  className="inline-block align-baseline"
                                  size={parseInt(fontSize.replace(/[^\d]/g, '')) || 18}
                                />
                              </div>
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

      {/* Mobile Menu */}
      <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 z-50" />
          <Dialog.Content asChild>
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <Dialog.Title className="text-lg font-bold text-[#3F4A7E]">
                    Menu
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#3F4A7E]"
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
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
                  <Button 
                    asChild 
                    className={cn(
                      "w-full bg-[#3F4A7E] text-white hover:bg-[#CA9E5B] transition-colors",
                      // Make CTA subtle on mobile as requested
                      "text-sm py-2"
                    )}
                  >
                    {/* CONTEXT7 SOURCE: /vercel/next.js - Link component with external URL navigation pattern */}
                    {/* REVISION REASON: Updated mobile button text to "Request Free Consultation" and href to external inquiry form URL */}
                    <Link href="https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~">
                      Request Free Consultation
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
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
          <div key={item.label} className="rounded-lg border border-gray-200 overflow-hidden">
            {hasSubItems ? (
              <>
                <button
                  onClick={() => toggleExpanded(item.label)}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 text-left transition-colors duration-200",
                    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flat design mobile accordion styling
                    // ACCORDION_REASON: Official Tailwind documentation for flat design mobile navigation
                    "hover:bg-gray-50 text-[#3F4A7E]",
                    isExpanded && "bg-gray-50 text-[#CA9E5B]"
                  )}
                >
                  <span className="font-medium">{item.label}</span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 transition-transform duration-200 text-[#3F4A7E]",
                      isExpanded && "rotate-90 text-[#CA9E5B]"
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
                            "hover:bg-white hover:text-[#CA9E5B] text-[#3F4A7E] no-underline",
                            pathname === subItem.href && "bg-white text-[#CA9E5B] font-medium"
                          )}
                          // CONTEXT7 SOURCE: /microsoft/typescript - Optional interface properties pattern  
                          // REVISION REASON: Simplified mobile submenu items to show only headings, removed description text rendering
                          // 
                          // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - no-underline utility class for removing text decorations
                          // REVISION REASON: Added no-underline class to prevent underline effects on mobile submenu item hover states
                        >
                          <div className="flex items-center gap-1">
                            <div className="text-base font-medium">{subItem.label}</div>
                            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Gap utilities for spacing between flex items */}
                            {/* MOBILE_ARROW_REASON: Official Tailwind documentation for gap-1 spacing - creates consistent spacing for mobile submenu arrows */}
                            {/* REVISION REASON: Using fixed size appropriate for mobile text */}
                            <ArrowAngularTopRight 
                              className="inline-block align-baseline"
                              size={16}
                            />
                          </div>
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
                  "hover:bg-gray-50 hover:text-[#CA9E5B] text-[#3F4A7E]",
                  pathname === item.href && "bg-gray-50 text-[#CA9E5B] font-medium"
                )}
              >
                {item.label}
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}