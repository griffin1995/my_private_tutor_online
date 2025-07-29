/**
 * Documentation Source: Radix UI Navigation Menu + Radix UI Dialog (Sheet)
 * Reference: https://radix-ui.com/primitives/docs/components/navigation-menu
 * Reference: https://radix-ui.com/primitives/docs/components/dialog
 * Pattern: Modern Navigation with Semantic HTML and Accessibility
 * 
 * Features:
 * - Radix UI NavigationMenu for desktop navigation with proper ARIA support
 * - Radix UI Dialog (Sheet) for mobile menu with focus management
 * - Responsive design with mobile-first approach
 * - WCAG 2.1 AA compliant navigation
 * - CSS custom properties for theming consistency
 * - Motion-reduced animations support via CSS
 */

"use client"

import { useState, useEffect } from 'react'
import { Menu, Phone, Mail, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  NavigationMenu, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { NoSSR } from '@/components/ui/no-ssr'
import { getSiteHeader, getMainNavigation, getContactInfo } from '@/lib/cms/cms-content'
import { cn } from '@/lib/utils'

// CMS DATA SOURCE: Using getSiteHeader for header content and navigation

interface PageHeaderProps {
  className?: string
  variant?: 'default' | 'transparent' | 'sticky'
  showContactInfo?: boolean
  isHeroPage?: boolean // New prop to determine if this is over a hero section
}

export function PageHeader({
  className,
  variant = 'default',
  showContactInfo = false, // Changed default to false to remove contact info line
  isHeroPage = false
}: PageHeaderProps) {
  // CMS DATA SOURCE: Using getSiteHeader for site branding and navigation
  // Get CMS data - these are server-safe
  const headerContent = getSiteHeader()
  const navigation = getMainNavigation()
  const contactInfo = getContactInfo()
  
  // Documentation Source: React useEffect + window scroll event listener patterns
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll_event
  // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop
  // Pattern: Scroll-triggered header state management with performance optimization
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    // Only add scroll listener if this is a hero page
    if (!isHeroPage) return
    
    // Documentation Source: Performance-optimized scroll event handling
    // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#improve_scrolling_performance_with_passive_listeners
    // Pattern: Throttled scroll detection with passive event listeners
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Documentation Source: Viewport height detection for hero section transition
          // Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
          // Pattern: Trigger navbar blur effect after scrolling past full viewport height (100vh)
          // This ensures the navbar remains transparent while over the hero video background
          // and transitions to blurred background once user scrolls past the hero section
          setIsScrolled(window.scrollY > window.innerHeight)
          ticking = false
        })
        ticking = true
      }
    }
    
    // Add passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Cleanup scroll listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHeroPage])

  // Documentation Source: CSS backdrop-filter + scroll-triggered styling patterns
  // Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter
  // Reference: https://tailwindcss.com/docs/backdrop-blur
  // Pattern: Dynamic header styling based on scroll position and hero page context
  const getHeaderClasses = () => {
    if (isHeroPage) {
      // Transparent header over hero with white text when not scrolled
      // Blurred header with dark text when scrolled
      return isScrolled 
        ? 'bg-white/90 backdrop-blur-lg border-b border-primary-100/80 shadow-lg sticky top-0 z-50 supports-[backdrop-filter]:bg-white/80'
        : 'bg-transparent backdrop-blur-none border-b border-transparent sticky top-0 z-50'
    }
    
    // Standard header variants for non-hero pages
    const containerClasses = {
      default: 'bg-white/95 backdrop-blur-sm border-b border-primary-100/80 sticky top-0 z-50 supports-[backdrop-filter]:bg-white/80',
      transparent: 'bg-white/90 backdrop-blur-md border-b border-primary-100/60 sticky top-0 z-50 supports-[backdrop-filter]:bg-white/70',
      sticky: 'bg-white/98 backdrop-blur-sm shadow-lg border-b border-primary-100/90 sticky top-0 z-50 supports-[backdrop-filter]:bg-white/85'
    }
    return containerClasses[variant]
  }
  
  // Documentation Source: Dynamic text color based on header transparency
  // Reference: https://tailwindcss.com/docs/text-color
  // Pattern: Conditional text styling for readability over different backgrounds
  const getTextClasses = () => {
    return isHeroPage && !isScrolled 
      ? 'text-white hover:text-accent-200' // White text over transparent header on hero
      : 'text-primary-700 hover:text-primary-900' // Dark text for normal/scrolled state
  }
  
  const getLogoTextClasses = () => {
    return isHeroPage && !isScrolled
      ? 'bg-gradient-to-r from-white to-accent-200 bg-clip-text text-transparent group-hover:from-accent-200 group-hover:to-white'
      : 'bg-gradient-to-r from-primary-900 to-primary-700 bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-accent-600'
  }

  return (
    <header 
      className={cn(getHeaderClasses(), 'transition-all duration-300 ease-out', className)}
      role="banner"
      data-hero-page={isHeroPage}
      data-scrolled={isScrolled}
    >
      
      {/* Top Contact Bar - Desktop Only */}
      {showContactInfo && (
        <div className="hidden lg:block bg-primary-900 text-white py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {/* Documentation Source: Tailwind CSS transforms + hover animations */}
                  {/* Reference: https://github.com/jamiebuilds/tailwindcss-animate/blob/main/docs/animation-timing-function.md */}
                  {/* Pattern: Icon micro-animation on hover */}
                  <Phone className="w-4 h-4 transition-transform duration-200 ease-out group-hover:scale-110" />
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="group relative hover:text-accent-300 transition-all duration-200 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent-300 after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  {/* Documentation Source: Tailwind CSS transforms + hover animations */}
                  {/* Reference: https://github.com/jamiebuilds/tailwindcss-animate/blob/main/docs/animation-timing-function.md */}
                  {/* Pattern: Icon micro-animation on hover */}
                  <Mail className="w-4 h-4 transition-transform duration-200 ease-out group-hover:scale-110" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="group relative hover:text-accent-300 transition-all duration-200 ease-out after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent-300 after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              {/* Documentation Source: Tailwind CSS text shadows + glow effects */}
              {/* Reference: https://tailwindcss.com/docs/text-shadow */}
              {/* Pattern: Subtle glow effect for premium branding */}
              <div className="text-accent-300 font-medium transition-all duration-300 ease-out hover:text-accent-200 hover:drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]">
                Featured in Tatler Address Book 2025
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16 lg:h-20">
          
          {/* Logo - Far Left, Full Height */}
          {/* Documentation Source: CSS Flexbox + absolute positioning for layout control */}
          {/* Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout */}
          {/* Pattern: Full-height logo positioning with proper spacing */}
          <div className="absolute left-0 top-0 h-full flex items-center">
            <Link 
              href="/" 
              className="flex items-center h-full group py-2"
              aria-label={`${headerContent.siteName} homepage`}
            >
              <div className="relative h-full flex items-center">
                {/* Documentation Source: Tailwind CSS transforms + advanced animations */}
                {/* Reference: https://github.com/jamiebuilds/tailwindcss-animate/blob/main/docs/animation-timing-function.md */}
                {/* Pattern: Full-height logo with hover animations */}
                <Image
                  src={headerContent.logo.main}
                  alt={headerContent.logo.alt}
                  width={headerContent.logo.width}
                  height={headerContent.logo.height}
                  priority
                  className="h-full w-auto max-h-12 lg:max-h-16 transition-all duration-500 ease-out group-hover:scale-105 group-hover:rotate-1 group-focus:scale-105 group-focus:rotate-1"
                />
                {/* Documentation Source: CSS backdrop-filter + glow effects */}
                {/* Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter */}
                {/* Pattern: Subtle glow background on hover */}
                <div 
                  className="absolute inset-0 -z-10 rounded-lg bg-accent-100/15 scale-0 transition-transform duration-300 ease-out group-hover:scale-110 group-focus:scale-110"
                  aria-hidden="true"
                />
              </div>
              <div className="hidden sm:block ml-3">
                {/* Documentation Source: Dynamic gradient text based on scroll state */}
                {/* Reference: https://tailwindcss.com/docs/background-clip */}
                {/* Pattern: Context-aware gradient text that adapts to header transparency */}
                <span className={cn(
                  "font-serif text-xl lg:text-2xl font-bold transition-all duration-300 ease-out whitespace-nowrap",
                  getLogoTextClasses()
                )}>
                  {headerContent.siteName}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Perfectly Centered */}
          {/* Documentation Source: CSS Flexbox absolute centering + Radix UI NavigationMenu */}
          {/* Reference: https://radix-ui.com/primitives/docs/components/navigation-menu */}
          {/* Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout */}
          {/* Pattern: Perfect center positioning accounting for container padding */}
          <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex" role="navigation" aria-label="Main navigation">
            <NavigationMenu className="relative">
              <NavigationMenuList className="flex items-center space-x-2">
                {navigation.map((item, index) => (
                  <NavigationMenuItem key={index} className="relative">
                    <NavigationMenuLink 
                      asChild
                      className={cn(
                        "group relative inline-flex h-10 w-max items-center justify-center rounded-lg bg-transparent px-5 py-2 text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] focus:scale-[1.02]",
                        getTextClasses(),
                        isHeroPage && !isScrolled 
                          ? 'hover:bg-white/10 focus:bg-white/20 data-[active]:bg-white/20'
                          : 'hover:bg-primary-50/50 focus:bg-primary-100 data-[active]:bg-primary-100'
                      )}
                    >
                      <Link
                        href={item.href}
                        className="relative flex items-center overflow-hidden"
                        prefetch={false}
                      >
                        <span className="relative z-10">{item.label}</span>
                        {/* Documentation Source: Context-aware underline animation */}
                        {/* Reference: https://tailwindcss.com/docs/text-decoration-line */}
                        {/* Pattern: Dynamic underline color based on header transparency state */}
                        <span 
                          className={cn(
                            "absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 ease-out group-hover:w-full group-focus:w-full",
                            isHeroPage && !isScrolled
                              ? 'bg-gradient-to-r from-white to-accent-200'
                              : 'bg-gradient-to-r from-accent-500 to-accent-600'
                          )}
                          aria-hidden="true"
                        />
                        {/* Documentation Source: Dynamic hover background based on transparency */}
                        {/* Reference: https://tailwindcss.com/docs/backdrop-filter */}
                        {/* Pattern: Context-aware hover glow that adapts to header state */}
                        <span 
                          className={cn(
                            "absolute inset-0 -z-10 scale-0 rounded-lg backdrop-blur-sm transition-transform duration-300 ease-out group-hover:scale-100 group-focus:scale-100",
                            isHeroPage && !isScrolled
                              ? 'bg-gradient-to-r from-white/10 to-white/20'
                              : 'bg-gradient-to-r from-accent-100/20 to-accent-200/20'
                          )}
                          aria-hidden="true"
                        />
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop CTA Button - Far Right, Smaller */}
          {/* Documentation Source: CSS absolute positioning + Modern button design */}
          {/* Reference: https://github.com/jamiebuilds/tailwindcss-animate/blob/main/docs/animation-timing-function.md */}
          {/* Reference: https://tailwindcss.com/docs/backdrop-filter */}
          {/* Pattern: Far-right positioned CTA with normal state and shine on hover */}
          <div className="absolute right-0 top-0 h-full hidden lg:flex items-center">
            <Button
              size="default"
              className={cn(
                "group relative overflow-hidden font-medium shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] focus:scale-[1.02] focus:ring-2 focus:ring-accent-500/50 focus:ring-offset-2 active:scale-[0.98] h-10 px-6",
                isHeroPage && !isScrolled
                  ? 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-900'
                  : 'bg-accent-600 hover:bg-accent-700 text-white'
              )}
              asChild
            >
              <Link 
                href="#contact" 
                aria-label="Book free consultation with My Private Tutor Online"
                className="relative flex items-center z-10"
              >
                <span className="relative z-20 text-sm font-medium">Book Free Consultation</span>
                {/* Documentation Source: Tailwind CSS transforms + animations */}
                {/* Reference: https://github.com/jamiebuilds/tailwindcss-animate/blob/main/docs/enter-animation-translate.md */}
                {/* Pattern: Shimmer effect ONLY on hover using pseudo-element */}
                <span 
                  className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] skew-x-12 transition-transform duration-600 ease-out group-hover:translate-x-[200%]"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button - Far Right on Mobile */}
          {/* Documentation Source: Radix UI Dialog (Sheet) for mobile navigation */}
          {/* Reference: https://radix-ui.com/primitives/docs/components/dialog */}
          {/* Pattern: Accessible mobile menu with focus trap and ARIA support */}
          <div className="absolute right-0 top-0 h-full flex items-center lg:hidden">
            <NoSSR fallback={
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "hover:bg-primary-50 focus:bg-primary-100 focus:ring-2 focus:ring-primary-500/50 rounded-md h-10 w-10 p-2 transition-all duration-200",
                  isHeroPage && isScrolled ? 'text-white hover:text-accent-200' : 'text-primary-700 hover:text-primary-900'
                )}
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            }>
              <MobileMenu 
                headerContent={headerContent}
                navigation={navigation}
                contactInfo={contactInfo}
                isHeroPage={isHeroPage}
                isScrolled={isScrolled}
              />
            </NoSSR>
          </div>
        </div>
      </div>
    </header>
  )
}

// Mobile Menu Component - Separated for NoSSR wrapping
// Documentation Source: Radix UI Dialog best practices for mobile navigation
// Reference: https://radix-ui.com/primitives/docs/components/dialog
// Pattern: Modern slide-out navigation with enhanced UX
function MobileMenu({ headerContent, navigation, contactInfo, isHeroPage, isScrolled }: {
  headerContent: ReturnType<typeof getSiteHeader>
  navigation: ReturnType<typeof getMainNavigation>
  contactInfo: ReturnType<typeof getContactInfo>
  isHeroPage: boolean
  isScrolled: boolean
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Documentation Source: Context-aware mobile menu text styling
  // Reference: https://tailwindcss.com/docs/text-color
  // Pattern: Mobile menu text color based on header transparency state
  const getMobileTextClasses = () => {
    return isHeroPage && !isScrolled 
      ? 'text-white hover:text-accent-200' // White text over transparent header on hero
      : 'text-primary-700 hover:text-primary-900' // Dark text for normal/scrolled state
  }

  return (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        {/* Documentation Source: Tailwind CSS animations + mobile interactions */}
        {/* Reference: https://github.com/jamiebuilds/tailwindcss-animate/blob/main/docs/animation-timing-function.md */}
        {/* Pattern: Mobile menu button with hover and active states */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "group hover:bg-primary-50 focus:bg-primary-100 focus:ring-2 focus:ring-primary-500/50 rounded-md transition-all duration-200 ease-out hover:scale-105 active:scale-95 h-10 w-10 p-2",
            getMobileTextClasses()
          )}
          aria-label="Open mobile navigation menu"
        >
          <Menu className="h-5 w-5 transition-transform duration-200 ease-out group-hover:rotate-90 group-active:scale-110" />
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-[320px] sm:w-[400px] bg-white/95 backdrop-blur-md border-l border-primary-100/80"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-serif text-xl font-bold text-primary-900">
            {headerContent.siteName}
          </SheetTitle>
        </SheetHeader>
        
        {/* Mobile Navigation */}
        {/* Documentation Source: Mobile-first navigation patterns */}
        {/* Pattern: Touch-friendly navigation with enhanced visual feedback */}
        <nav className="mt-8" role="navigation" aria-label="Mobile navigation">
          <div className="flex flex-col space-y-2">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group relative text-primary-700 hover:text-primary-900 font-medium py-4 px-4 rounded-xl hover:bg-primary-50 active:bg-primary-100 transition-all duration-300 ease-out focus:bg-primary-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none border border-transparent hover:border-primary-100 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                aria-label={`Navigate to ${item.label} section`}
              >
                <span className="block relative z-10">{item.label}</span>
                {/* Documentation Source: Tailwind CSS pseudo-elements + slide animations */}
                {/* Reference: https://github.com/jamiebuilds/tailwindcss-animate/blob/main/docs/enter-animation-translate.md */}
                {/* Pattern: Slide-in background effect on hover */}
                <span 
                  className="absolute inset-0 bg-gradient-to-r from-accent-50/30 to-accent-100/30 translate-x-[-100%] transition-transform duration-300 ease-out group-hover:translate-x-0 group-focus:translate-x-0"
                  aria-hidden="true"
                />
                {/* Documentation Source: Tailwind CSS border effects */}
                {/* Reference: https://tailwindcss.com/docs/text-decoration-line */}
                {/* Pattern: Animated left border indicator */}
                <span 
                  className="absolute left-0 top-0 h-0 w-1 bg-gradient-to-b from-accent-500 to-accent-600 transition-all duration-300 ease-out group-hover:h-full group-focus:h-full"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Contact Info */}
        {/* Documentation Source: Mobile contact patterns with touch targets */}
        {/* Pattern: Enhanced contact links with proper touch targets (44px minimum) */}
        <div className="mt-8 pt-8 border-t border-primary-200/60">
          <div className="space-y-3">
            {/* Documentation Source: Tailwind CSS mobile touch interactions + animations */}
            {/* Reference: https://github.com/jamiebuilds/tailwindcss-animate/blob/main/docs/animation-timing-function.md */}
            {/* Pattern: Enhanced mobile contact links with micro-interactions */}
            <a
              href={`tel:${contactInfo.phone}`}
              className="group flex items-center gap-4 text-primary-600 hover:text-primary-900 p-3 rounded-lg hover:bg-primary-50 transition-all duration-300 ease-out focus:bg-primary-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none min-h-[44px] hover:scale-[1.02] active:scale-[0.98] hover:shadow-sm"
              aria-label={`Call ${contactInfo.phone}`}
            >
              <Phone className="w-5 h-5 flex-shrink-0 transition-all duration-200 ease-out group-hover:scale-110 group-hover:text-accent-600 group-hover:rotate-12" />
              <span className="font-medium relative">
                {contactInfo.phone}
                {/* Documentation Source: Tailwind CSS underline animations */}
                {/* Reference: https://tailwindcss.com/docs/text-decoration-line */}
                {/* Pattern: Animated underline on hover */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent-500 transition-all duration-300 ease-out group-hover:w-full" />
              </span>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              className="group flex items-center gap-4 text-primary-600 hover:text-primary-900 p-3 rounded-lg hover:bg-primary-50 transition-all duration-300 ease-out focus:bg-primary-100 focus:ring-2 focus:ring-primary-500/50 focus:outline-none min-h-[44px] hover:scale-[1.02] active:scale-[0.98] hover:shadow-sm"
              aria-label={`Email ${contactInfo.email}`}
            >
              <Mail className="w-5 h-5 flex-shrink-0 transition-all duration-200 ease-out group-hover:scale-110 group-hover:text-accent-600 group-hover:-rotate-12" />
              <span className="font-medium relative">
                {contactInfo.email}
                {/* Documentation Source: Tailwind CSS underline animations */}
                {/* Reference: https://tailwindcss.com/docs/text-decoration-line */}
                {/* Pattern: Animated underline on hover */}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-accent-500 transition-all duration-300 ease-out group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>

        {/* Mobile CTA Button */}
        {/* Documentation Source: Mobile CTA button best practices */}
        {/* Pattern: Full-width CTA with enhanced touch target and visual feedback */}
        <div className="mt-8 pt-6 border-t border-primary-200/60">
          {/* Documentation Source: Mobile CTA button with advanced animations */}
          {/* Reference: https://github.com/jamiebuilds/tailwindcss-animate/blob/main/docs/animation-timing-function.md */}
          {/* Pattern: Mobile CTA with shimmer effect and haptic feedback simulation */}
          <Button
            size="lg"
            className="group relative w-full overflow-hidden bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold shadow-lg hover:shadow-xl active:scale-[0.96] transition-all duration-300 ease-out focus:ring-2 focus:ring-accent-500/50 focus:ring-offset-2 min-h-[48px] hover:scale-[1.02]"
            onClick={() => setMobileMenuOpen(false)}
            asChild
          >
            <Link 
              href="#contact" 
              aria-label="Book free consultation with My Private Tutor Online"
              className="relative flex items-center justify-center z-10"
            >
              <span className="relative z-20">Book Free Consultation</span>
              {/* Documentation Source: Tailwind CSS shimmer animation */}
              {/* Reference: https://github.com/jamiebuilds/tailwindcss-animate/blob/main/docs/enter-animation-translate.md */}
              {/* Pattern: Mobile shimmer effect */}
              <span 
                className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] skew-x-12 transition-transform duration-700 ease-out group-hover:translate-x-[100%] group-active:translate-x-[100%]"
                aria-hidden="true"
              />
              {/* Documentation Source: Tailwind CSS pulse animation */}
              {/* Reference: https://github.com/jamiebuilds/tailwindcss-animate/blob/main/docs/animation-play-state.md */}
              {/* Pattern: Subtle pulse effect on press */}
              <span 
                className="absolute inset-0 -z-5 bg-white/10 scale-0 rounded-lg transition-transform duration-150 ease-out group-active:scale-100"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Export variant types for documentation
export type PageHeaderVariant = 'default' | 'transparent' | 'sticky'

// Documentation Source: Hook for scroll-triggered header state management
// Reference: https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll_event
// Pattern: Reusable scroll detection hook with performance optimization
export function useScrollHeader(threshold: number = 100) {
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])
  
  return isScrolled
}