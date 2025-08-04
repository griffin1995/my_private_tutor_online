"use client"

import { Mail, Phone, MapPin, ArrowUp, Crown, Award, TrendingUp, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { getFooterContent, getContactInfo, getCopyrightText } from '@/lib/cms'
import { cn } from '@/lib/utils'
// Documentation Source: Framer Motion LazyMotion with Static Export Compatibility
// Reference: https://www.framer.com/motion/lazy-motion/
// Pattern: Static-export compatible animations

// CMS DATA SOURCE: Using getFooterContent for footer links and content

interface PageFooterProps {
  className?: string
  variant?: 'default' | 'minimal' | 'premium'
  showBackToTop?: boolean
}

export function PageFooter({
  className,
  variant = 'default',
  showBackToTop = true
}: PageFooterProps) {
  // CMS DATA SOURCE: Using getFooterContent for footer structure and links
  const footerContent = getFooterContent()
  const contactInfo = getContactInfo()
  const copyrightText = getCopyrightText()

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
        {/* Newsletter CTA Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-in-up">
              <h3 className="text-3xl font-serif font-bold text-black mb-4">
                Join Our Exclusive Community
              </h3>
              <p className="text-gray-700 mb-8 text-lg">
                Receive personalised academic insights and exclusive opportunities for your child's success
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
                />
                <ShinyButton
                  text="Subscribe"
                  className="px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-300" />

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
            </div>
          </div>
        </div>

        <Separator className="bg-gray-300" />

        {/* Contact Information Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-in-up">
            {/* Phone */}
            <div className="group text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-serif text-lg font-bold text-black mb-2">Call Us</h4>
              <a 
                href={`tel:${contactInfo.phone}`}
                className="text-gray-700 hover:text-accent-600 transition-colors duration-300 text-lg"
              >
                {contactInfo.phone}
              </a>
              <p className="text-sm text-gray-600 mt-1">Mon-Fri 9am-6pm</p>
            </div>

            {/* Email */}
            <div className="group text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-serif text-lg font-bold text-black mb-2">Email Us</h4>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-gray-700 hover:text-accent-600 transition-colors duration-300 text-lg"
              >
                {contactInfo.email}
              </a>
              <p className="text-sm text-gray-600 mt-1">24/7 Response Time</p>
            </div>

            {/* Address */}
            <div className="group text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-serif text-lg font-bold text-black mb-2">Visit Us</h4>
              <address className="text-gray-700 not-italic leading-relaxed">
                {contactInfo.address.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < contactInfo.address.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </address>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Copyright & Legal */}
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <p className="text-gray-600 text-sm">
                  {copyrightText}
                </p>
                <Separator orientation="vertical" className="hidden md:block h-4 bg-gray-400" />
                <nav className="flex items-center gap-6 text-sm">
                  <Link
                    href="/privacy"
                    className="text-gray-600 hover:text-accent-600 transition-colors duration-300"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-gray-600 hover:text-accent-600 transition-colors duration-300"
                  >
                    Terms
                  </Link>
                  <Link
                    href="/cookies"
                    className="text-gray-600 hover:text-accent-600 transition-colors duration-300"
                  >
                    Cookies
                  </Link>
                  <Link
                    href="/accessibility"
                    className="text-gray-600 hover:text-accent-600 transition-colors duration-300"
                  >
                    Accessibility
                  </Link>
                </nav>
              </div>

              {/* Back to Top Button */}
              {showBackToTop && (
                <div className="animate-fade-in opacity-0 animate-delay-500">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollToTop}
                    className="w-12 h-12 rounded-full bg-accent-600 hover:bg-accent-700 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                    aria-label="Back to top"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Export variant types for documentation
export type PageFooterVariant = 'default' | 'minimal' | 'premium'