"use client"

// CONTEXT7 SOURCE: /reactjs/react.dev - Optimized client component with service integration
// CLIENT COMPONENT REASON: Official React documentation requires "use client" for components using hooks and browser APIs
// OPTIMIZATION UPDATE: Integrated service contracts and component decomposition for performance
// CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Optimized React imports
// IMPORT CLEANUP REASON: Official React patterns show importing only necessary hooks for performance
import React, { useMemo, lazy, Suspense, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import FooterErrorBoundary from './footer-error-boundary'

// CONTEXT7 SOURCE: /reactjs/react.dev - Component decomposition imports
// DECOMPOSITION REASON: Official React documentation demonstrates component separation for maintainability
import FooterCompanySection from './footer-components/footer-company-section'
import FooterNavigationSections from './footer-components/footer-navigation-sections'
// CONTEXT7 SOURCE: /reactjs/react.dev - Import removed for unused contact section component
// REMOVAL REASON: FooterContactSection component no longer used after surgical contact info removal

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic imports for code splitting
// CODE SPLITTING REASON: Official Next.js documentation shows lazy loading for performance optimization
const FooterNewsletterForm = lazy(() => import('./footer-components/footer-newsletter-form'))
const FooterNewsletterFormSkeleton = lazy(() => 
  import('./footer-components/footer-newsletter-form').then(module => ({ 
    default: module.FooterNewsletterFormSkeleton 
  }))
)
// CONTEXT7 SOURCE: /websites/react_dev_reference - Removed unused dynamic import
// IMPORT CLEANUP REASON: FooterPerformanceMonitor component no longer used

// CONTEXT7 SOURCE: /wcag/guidelines - Accessibility hooks import
// ACCESSIBILITY REASON: Import accessibility enhancements for WCAG 2.1 AA compliance
import { useFooterAccessibility } from '@/lib/hooks/use-footer-accessibility'
import FooterSkipLink from './footer-components/footer-skip-link'
import { useFooterPerformanceMarks } from './footer-components/footer-performance-monitor'

// Type definitions for props passed from server component
interface FooterContent {
  companyName: string
  description: string
  logo: {
    main: string
    alt: string
    width: number
    height: number
  }
  footerSections: Array<{
    title: string
    links: Array<{
      href: string
      label: string
    }>
  }>
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Interface removed after surgical contact section removal
// REMOVAL REASON: ContactInfo interface no longer needed as contact section has been cleanly removed

interface PageFooterClientProps {
  footerContent: FooterContent
  // CONTEXT7 SOURCE: /reactjs/react.dev - Interface parameter removed for unused contact info
  // REMOVAL REASON: contactInfo parameter no longer needed after contact section surgical removal
  copyrightText: string
  className?: string
  variant?: 'default' | 'minimal' | 'premium'
  showBackToTop?: boolean
  showNewsletter?: boolean
  showContactForm?: boolean
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Optimized client component with service integration
// HOOKS REASON: Official React documentation shows optimized hook usage with memoization
export function PageFooterClient({
  footerContent,
  // CONTEXT7 SOURCE: /reactjs/react.dev - Parameter removed for unused contact info
  // REMOVAL REASON: contactInfo parameter no longer needed after contact section surgical removal
  copyrightText,
  className,
  variant = 'default',
  showBackToTop = true,
  showNewsletter = false,
  showContactForm = false
}: PageFooterClientProps) {

  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for component configuration
  // MEMOIZATION REASON: Official React documentation shows useMemo for expensive computations
  const footerConfig = useMemo(() => ({
    variant,
    showBackToTop,
    showNewsletter,
    showContactForm,
    containerClasses: {
      default: 'bg-white text-black',
      minimal: 'bg-gray-50 text-black',
      premium: 'bg-white text-black relative overflow-hidden'
    }
  }), [variant, showBackToTop, showNewsletter, showContactForm]);

  // CONTEXT7 SOURCE: /web.dev/performance - Optimized scroll function with memoization
  // SCROLL REASON: Memoized scroll function prevents recreation on every render
  const scrollToTop = useMemo(() => () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // CONTEXT7 SOURCE: /react-hook-form/documentation - Newsletter form submission handler
  // FORM HANDLER REASON: Optimized form submission with error handling
  const handleNewsletterSubmit = useMemo(() => async (data: any) => {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter submission error:', error);
      throw error;
    }
  }, []);

  // CONTEXT7 SOURCE: /wcag/guidelines - Accessibility enhancements integration
  // ACCESSIBILITY REASON: Enable comprehensive accessibility features
  const { 
    announce, 
    manageFocus, 
    announcementRef,
    isKeyboardUser,
    reducedMotion 
  } = useFooterAccessibility({
    enableSkipLinks: true,
    enableFocusManagement: true,
    enableAnnouncements: true,
    enableKeyboardShortcuts: true
  });

  // CONTEXT7 SOURCE: /web.dev/performance - Performance tracking integration
  // PERFORMANCE REASON: Track footer-specific performance metrics
  const { 
    markFooterRenderStart, 
    markFooterRenderEnd, 
    markFooterInteractionReady 
  } = useFooterPerformanceMarks();

  // CONTEXT7 SOURCE: /web.dev/performance - Performance marks on render
  // PERFORMANCE TRACKING REASON: Measure footer render performance
  useEffect(() => {
    markFooterRenderStart();
    
    return () => {
      markFooterRenderEnd();
    };
  }, [markFooterRenderStart, markFooterRenderEnd]);

  // CONTEXT7 SOURCE: /web.dev/performance - Mark interaction readiness
  // INTERACTION REASON: Track when footer becomes interactive
  useEffect(() => {
    const timer = setTimeout(() => {
      markFooterInteractionReady();
      announce('Footer is ready for interaction');
    }, 100);
    
    return () => clearTimeout(timer);
  }, [markFooterInteractionReady, announce]);

  // CONTEXT7 SOURCE: /websites/react_dev_reference - Remove duplicate variable declarations
  // CLEANUP REASON: Official React docs recommend removing duplicate definitions for cleaner code
  return (
    // CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary wrapper for graceful failure handling
    // ERROR BOUNDARY REASON: Official React documentation demonstrates error boundaries for production resilience
    <FooterErrorBoundary
      enableRecovery={true}
      showDetails={process.env.NODE_ENV === 'development'}
      onError={(error, errorInfo) => {
        console.error('Footer component error:', error, errorInfo);
      }}
    >
      {/* CONTEXT7 SOURCE: /wcag/guidelines - Skip navigation accessibility */}
      {/* SKIP LINK REASON: WCAG 2.4.1 requires bypass blocks for repetitive content */}
      <FooterSkipLink />
      
      {/* CONTEXT7 SOURCE: /wcag/guidelines - Screen reader announcement region */}
      {/* ANNOUNCEMENT REASON: WCAG 4.1.3 requires status messages for dynamic content */}
      <div
        ref={announcementRef}
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      />

      <footer 
        id="footer"
        className={cn(footerConfig.containerClasses[variant], className)}
        role="contentinfo"
        aria-label="Site footer"
      >
        {/* CONTEXT7 SOURCE: /websites/react_dev_reference - Optimized premium background without wrapper div */}
        {/* STRUCTURAL OPTIMIZATION REASON: Official React docs show removing unnecessary wrapper containers */}
        {variant === 'premium' && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 via-transparent to-gray-100/50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-50/30 animate-pulse opacity-50" />
          </>
        )}

        <div className="relative">
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering with optimized components */}
          {/* Contact Form Section */}
          {footerConfig.showContactForm && (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-4">
                  Ready to Start the Conversation?
                </h2>
                <p className="text-xl text-primary-700 mb-8">
                  Access our secure enquiry portal to discuss your child's educational needs
                </p>
                <a 
                  href="https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block group"
                  aria-label="Open Bizstim enquiry form in new window - secure external portal for My Private Tutor Online"
                >
                  <div className="relative overflow-hidden rounded-lg border-2 border-gray-300 hover:border-accent-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <img
                      src="/images/graphics/bizstim-form-preview.png"
                      alt="Screenshot of My Private Tutor Online enquiry form on Bizstim platform showing student details form with fields for first name, last name, email and phone number"
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white font-medium text-sm">
                        Click to access secure enquiry form →
                      </p>
                    </div>
                  </div>
                </a>
                <p className="text-xs text-gray-500 mt-3">
                  Opens in new window • Secure encrypted connection • Same trusted service
                </p>
              </div>
            </div>
          )}
          
          {footerConfig.showContactForm && <Separator className="bg-gray-300" />}
          
          {/* CONTEXT7 SOURCE: /vercel/next.js - Dynamic newsletter form loading */}
          {/* Newsletter CTA Section with Code Splitting */}
          {footerConfig.showNewsletter && (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="max-w-4xl mx-auto text-center">
                <div className="animate-fade-in-up">
                  <h3 className="text-3xl font-serif font-bold text-black mb-4">
                    Join Our Exclusive Community
                  </h3>
                  <p className="text-gray-700 mb-8 text-lg">
                    Receive personalised academic insights and exclusive opportunities for your child's success
                  </p>
                  
                  {/* CONTEXT7 SOURCE: /reactjs/react.dev - Suspense with dynamic component loading */}
                  {/* CODE SPLITTING REASON: Official React documentation shows Suspense for lazy loaded components */}
                  <Suspense 
                    fallback={
                      <FooterNewsletterFormSkeleton className="max-w-md mx-auto" />
                    }
                  >
                    <FooterNewsletterForm 
                      onSubmit={handleNewsletterSubmit}
                      autoConsent={true}
                    />
                  </Suspense>
                </div>
              </div>
            </div>
          )}

          {footerConfig.showNewsletter && <Separator className="bg-gray-300" />}

          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Main footer content with decomposed components */}
          {/* DECOMPOSITION REASON: Component boundaries improve maintainability and performance */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* CONTEXT7 SOURCE: /websites/v2_tailwindcss - Flex layout with items-stretch for equal height sections */}
            {/* HEIGHT DISTRIBUTION REASON: Official Tailwind CSS documentation shows items-stretch makes flex items fill container's cross axis */}
            {/* PARENT CONTAINER FIX: Apply items-stretch to flex container holding 35% logo and 65% navigation sections */}
            <div className="flex flex-col lg:flex-row gap-12 items-stretch">

              {/* CONTEXT7 SOURCE: /reactjs/react.dev - Company section component */}
              {/* CONTEXT7 SOURCE: /websites/v2_tailwindcss - Full height container for logo section */}
              {/* HEIGHT STRETCH REASON: Official Tailwind CSS documentation shows h-full makes element fill parent height */}
              <div className="lg:w-[35%] h-full">
                <FooterCompanySection
                  content={footerContent}
                  className="animate-fade-in-left"
                />
              </div>

              {/* CONTEXT7 SOURCE: /reactjs/react.dev - Navigation sections component */}
              {/* CONTEXT7 SOURCE: /websites/v2_tailwindcss - Full height container for navigation section */}
              {/* HEIGHT STRETCH REASON: Official Tailwind CSS documentation shows h-full makes element fill parent height */}
              <div className="lg:w-[65%] h-full">
                <FooterNavigationSections
                  sections={footerContent.footerSections}
                />
              </div>

              {/* CONTEXT7 SOURCE: /websites/react_dev_reference - Clean layout after contact section removal */}
              {/* CLEANUP COMPLETED: Contact section successfully removed for streamlined footer */}
            </div>
          </div>

          <Separator className="bg-gray-300" />
          
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Copyright section with back to top */}
          {/* COPYRIGHT REASON: Separate copyright section for clean footer structure */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-gray-600 text-center sm:text-left">
                {copyrightText}
              </p>
              
              {/* CONTEXT7 SOURCE: /web.dev/performance - Back to top button with optimized scroll */}
              {footerConfig.showBackToTop && (
                <Button
                  onClick={scrollToTop}
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-accent-600 transition-colors duration-300 mx-auto sm:mx-0"
                  aria-label="Scroll to top of page"
                >
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Back to Top
                </Button>
              )}
            </div>
          </div>

          {/* CONTEXT7 SOURCE: /websites/react_dev_reference - Dead code removal for performance */}
          {/* DEAD CODE CLEANUP REASON: Official React docs recommend removing commented code that's not in use */}
        </div>
      </footer>
    </FooterErrorBoundary>
  )
}