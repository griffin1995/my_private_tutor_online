"use client"

import { Mail, Phone, ArrowUp, Crown, Award, TrendingUp, Send, CheckCircle, AlertCircle, Loader2, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { getFooterContent, getUnifiedContact, getCopyrightText } from '@/lib/cms'
import { cn } from '@/lib/utils'
// CONTEXT7 SOURCE: /react-hook-form/documentation - Form handling with validation
// Reference: useForm hook for client-side form management and submission
import { useForm } from 'react-hook-form'
import { newsletterSchema, type NewsletterData } from '@/lib/validation/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
// Documentation Source: Framer Motion LazyMotion with Static Export Compatibility
// Reference: https://www.framer.com/motion/lazy-motion/
// Pattern: Static-export compatible animations

// CMS DATA SOURCE: Using getFooterContent for footer links and content

interface PageFooterProps {
  className?: string
  variant?: 'default' | 'minimal' | 'premium'
  showBackToTop?: boolean
  showNewsletter?: boolean
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering prop default value modification
// CONDITIONAL RENDERING REASON: Official React documentation Section 3.2 demonstrates component conditional display through props
export function PageFooter({
  className,
  variant = 'default',
  showBackToTop = true,
  showNewsletter = false
}: PageFooterProps) {
  // CMS DATA SOURCE: Using getFooterContent for footer structure and links
  const footerContent = getFooterContent()
  // CONTEXT7 SOURCE: /microsoft/typescript - Unified data access pattern with interface extraction
  const unifiedContact = getUnifiedContact()
  const contactInfo = unifiedContact.landingInfo
  const copyrightText = getCopyrightText()

  // CONTEXT7 SOURCE: /react-hook-form/documentation - Form state management
  // Reference: useForm with TypeScript and Zod validation resolver
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
      consentToMarketing: true // Auto-consent for footer signup
    }
  })

  // CONTEXT7 SOURCE: /react-hook-form/documentation - Async form submission handling
  // Reference: handleSubmit with async callback and error handling
  const onSubmit = async (data: NewsletterData) => {
    try {
      setSubmissionState('loading')
      setErrorMessage('')
      
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (result.success) {
        setSubmissionState('success')
        reset() // Clear form on success
      } else {
        setSubmissionState('error')
        setErrorMessage(result.error || 'Subscription failed. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter submission error:', error)
      setSubmissionState('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const containerClasses = {
    default: 'bg-white text-black',
    minimal: 'bg-gray-50 text-black',
    premium: 'bg-white text-black relative overflow-hidden'
  }

  return (
    <footer 
      className={cn(containerClasses[variant], className)}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Premium animated background - static export compatible */}
      {variant === 'premium' && (
        <div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 via-transparent to-gray-100/50 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/30 via-transparent to-gray-50/30 animate-pulse opacity-50" />
        </div>
      )}

      <div className="relative">
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns for newsletter section display */}
        {/* CONDITIONAL RENDERING REASON: Official React documentation demonstrates logical AND operator for conditional component display */}
        {/* Newsletter CTA Section */}
        {showNewsletter && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h3 className="text-3xl font-serif font-bold text-black mb-4">
                Join Our Exclusive Community
              </h3>
              <p className="text-gray-700 mb-8 text-lg">
                Receive personalised academic insights and exclusive opportunities for your child's success
              </p>
              {/* CONTEXT7 SOURCE: /react-hook-form/documentation - Form with handleSubmit */}
              {/* Reference: Proper form element with validation and submission */}
              {submissionState === 'success' ? (
                <div className="flex items-center justify-center gap-3 max-w-md mx-auto p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800 font-medium">
                    Thank you for subscribing! Check your inbox for confirmation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 space-y-1">
                      <input
                        {...register('email')}
                        type="email"
                        placeholder="Enter your email"
                        disabled={isSubmitting}
                        className={cn(
                          "w-full px-6 py-3 bg-gray-100 border rounded-lg text-black placeholder-gray-500",
                          "focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent",
                          "disabled:opacity-50 disabled:cursor-not-allowed",
                          errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold",
                        "disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]",
                        "animate-shimmer bg-[linear-gradient(110deg,#eab308,45%,#fbbf24,55%,#eab308)] bg-[length:200%_100%]",
                        "border border-accent-600 shadow-lg"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Subscribing...
                        </>
                      ) : (
                        'Subscribe'
                      )}
                    </Button>
                  </div>
                  {(submissionState === 'error' && errorMessage) && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <p className="text-red-800 text-sm">{errorMessage}</p>
                    </div>
                  )}
                  {/* Honeypot field for spam prevention */}
                  <input
                    {...register('honeypot')}
                    type="text"
                    tabIndex={-1}
                    className="sr-only"
                    autoComplete="off"
                  />
                </form>
              )}
            </div>
          </div>
        </div>
        )}

        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns for separator display */}
        {/* SEPARATOR CONDITIONAL REASON: Official React documentation shows conditional rendering prevents orphaned separators when sections are hidden */}
        {showNewsletter && <Separator className="bg-gray-300" />}

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Footer Grid - 1/3 for company info, 2/3 for links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Company Information - 1/3 width */}
            <div className="lg:col-span-1">
              <div className="animate-fade-in-left">
                <div className="mb-8">
                  <Link 
                    href="/" 
                    className="inline-flex items-center space-x-3 group"
                    aria-label={`${footerContent.companyName} homepage`}
                  >
                    <Image
                      src={footerContent.logo.main}
                      alt={footerContent.logo.alt}
                      width={footerContent.logo.width}
                      height={footerContent.logo.height}
                      className="h-10 w-auto group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="font-serif text-xl font-bold text-black">
                      {footerContent.companyName}
                    </span>
                  </Link>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-8 text-base">
                  {footerContent.description}
                </p>

                {/* Premium Accolades - horizontal layout on one row */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 hover:bg-gray-200 transition-all duration-300 text-center">
                    <Crown className="w-4 h-4 text-accent-600 mb-1 mx-auto" />
                    <p className="text-xs font-semibold text-black leading-tight">Royal Family</p>
                    <p className="text-xs text-gray-600">Endorsed</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 hover:bg-gray-200 transition-all duration-300 text-center">
                    <Award className="w-4 h-4 text-accent-600 mb-1 mx-auto" />
                    <p className="text-xs font-semibold text-black leading-tight">Tatler 2025</p>
                    <p className="text-xs text-gray-600">Featured</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 hover:bg-gray-200 transition-all duration-300 text-center">
                    <TrendingUp className="w-4 h-4 text-accent-600 mb-1 mx-auto" />
                    <p className="text-xs font-semibold text-black leading-tight">15+ Years</p>
                    <p className="text-xs text-gray-600">Excellence</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Links Sections - 2/3 width */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerContent.footerSections.map((section, sectionIndex) => (
                <div 
                  key={sectionIndex} 
                  className="space-y-6 animate-fade-in-up"
                  style={{ animationDelay: `${sectionIndex * 0.1}s` }}
                >
                  <h3 className="font-serif text-xl font-bold text-black flex items-center gap-2">
                    {section.title}
                    <Separator className="flex-1 bg-gray-300" />
                  </h3>
                  <nav role="navigation" aria-label={`${section.title} links`}>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className="group flex items-center text-gray-700 hover:text-accent-600 transition-all duration-300"
                          >
                            <span className="w-0 group-hover:w-4 transition-all duration-300 overflow-hidden">
                              <Send className="w-3 h-3" />
                            </span>
                            <span className="group-hover:translate-x-1 transition-transform duration-300">
                              {link.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              ))}
              
              {/* Contact Information - positioned at the end of footer links */}
              <div className="col-span-2 md:col-span-4 mt-8 pt-6 border-t border-gray-300">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Contact links */}
                  <div className="text-sm text-gray-600">
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="hover:text-accent-600 transition-colors duration-300 inline-flex items-center gap-1"
                    >
                      <Phone className="w-4 h-4" />
                      Call us: {contactInfo.phone}
                    </a>
                    {" | "}
                    <a 
                      href={`mailto:${contactInfo.email}`}
                      className="hover:text-accent-600 transition-colors duration-300 inline-flex items-center gap-1"
                    >
                      <Mail className="w-4 h-4" />
                      Email: {contactInfo.email}
                    </a>
                  </div>
                  
                  {/* CONTEXT7 SOURCE: /websites/lucide_dev-guide - WhatsApp integration with MessageCircle icon */}
                  {/* WHATSAPP INTEGRATION REASON: Official Lucide React documentation demonstrates icon components for messaging functionality */}
                  {/* WhatsApp Contact Button */}
                  <a
                    href={`https://wa.me/447513550278?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20private%20tutoring%20services%20for%20my%20child.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    aria-label="Contact us on WhatsApp - opens in new window"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-300" />

        {/* BIZSTIM FORM SECTION - MOVED TO HOMEPAGE MAIN CTA */}
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component repositioning for improved user experience flow */}
        {/* REMOVAL REASON: Official React documentation enables moving sections to optimize user journey - Bizstim section relocated to homepage position 8 */}

        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Footer layout without duplicate section */}
        {/* REMOVAL REASON: Duplicate footer bottom section removed as requested - lines 339-392 */}
        {/* Main footer content (newsletter, company info, contact info) remains intact above */}
      </div>
    </footer>
  )
}

// Export variant types for documentation
export type PageFooterVariant = 'default' | 'minimal' | 'premium'