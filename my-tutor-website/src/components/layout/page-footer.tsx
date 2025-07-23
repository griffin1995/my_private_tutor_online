"use client"

import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getFooterContent, getContactInfo, getCopyrightText } from '@/lib/cms'
import { cn } from '@/lib/utils'

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
    default: 'bg-navy-900 text-white',
    minimal: 'bg-navy-800 text-white',
    premium: 'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white relative overflow-hidden'
  }

  return (
    <footer 
      className={cn(containerClasses[variant], className)}
      role="contentinfo"
      aria-label="Site footer"
    >
      
      {/* Premium background decoration */}
      {variant === 'premium' && (
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-gold-500/10 pointer-events-none" />
      )}

      <div className="relative">
        
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          
          {/* Footer Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Information */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <Link 
                  href="/" 
                  className="flex items-center space-x-3 group"
                  aria-label={`${footerContent.companyName} homepage`}
                >
                  <Image
                    src={footerContent.logo.main}
                    alt={footerContent.logo.alt}
                    width={footerContent.logo.width}
                    height={footerContent.logo.height}
                    className="h-8 w-auto group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              </div>
              
              <p className="text-navy-200 leading-relaxed mb-6 max-w-sm">
                {footerContent.description}
              </p>

              {/* Premium badges */}
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-gold-300">
                  <span className="w-2 h-2 bg-gold-400 rounded-full" />
                  <span>Featured in Tatler 2025</span>
                </div>
                <div className="flex items-center gap-2 text-gold-300">
                  <span className="w-2 h-2 bg-gold-400 rounded-full" />
                  <span>Royal Family Endorsed</span>
                </div>
                <div className="flex items-center gap-2 text-gold-300">
                  <span className="w-2 h-2 bg-gold-400 rounded-full" />
                  <span>15+ Years Excellence</span>
                </div>
              </div>
            </div>

            {/* Footer Links Sections */}
            {footerContent.footerSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="font-serif text-lg font-semibold text-white">
                  {section.title}
                </h3>
                <nav role="navigation" aria-label={`${section.title} links`}>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="text-navy-200 hover:text-white transition-colors duration-200 text-sm hover:underline"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            ))}
          </div>

          {/* Contact Information Section */}
          <div className="mt-12 pt-8 border-t border-navy-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Phone</h4>
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="text-navy-200 hover:text-white transition-colors duration-200"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-navy-200 hover:text-white transition-colors duration-200"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 md:col-span-2 lg:col-span-1">
                <div className="flex-shrink-0 w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Address</h4>
                  <address className="text-navy-200 not-italic text-sm leading-relaxed">
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
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-navy-700 py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Copyright */}
              <div className="text-navy-300 text-sm">
                {copyrightText}
              </div>

              {/* Legal Links */}
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-navy-300 hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-navy-300 hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-navy-300 hover:text-white transition-colors duration-200"
                >
                  Cookie Policy
                </Link>
              </div>

              {/* Back to Top Button */}
              {showBackToTop && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={scrollToTop}
                  className="text-navy-300 hover:text-white hover:bg-navy-800 group"
                  aria-label="Back to top"
                >
                  <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                  <span className="ml-2 hidden sm:inline">Back to Top</span>
                </Button>
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