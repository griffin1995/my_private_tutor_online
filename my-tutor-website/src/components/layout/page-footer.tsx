"use client"

import { Mail, Phone, MapPin, ArrowUp, Crown, Award, TrendingUp, Send } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShinyButton } from '@/components/magicui/shiny-button'
import { getFooterContent, getContactInfo, getCopyrightText } from '@/lib/cms'
import { cn } from '@/lib/utils'
import { m } from 'framer-motion'

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
    default: 'bg-primary-900 text-white',
    minimal: 'bg-primary-800 text-white',
    premium: 'bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white relative overflow-hidden'
  }

  return (
    <footer 
      className={cn(containerClasses[variant], className)}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Premium animated background */}
      {variant === 'premium' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 via-transparent to-accent-500/10 pointer-events-none" />
          <m.div 
            className="absolute inset-0 bg-gradient-to-br from-primary-900/50 via-transparent to-primary-900/50"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 100%'],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </>
      )}

      <div className="relative">
        {/* Newsletter CTA Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-serif font-bold text-white mb-4">
                Join Our Exclusive Community
              </h3>
              <p className="text-primary-200 mb-8 text-lg">
                Receive personalised academic insights and exclusive opportunities for your child's success
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
                />
                <ShinyButton
                  text="Subscribe"
                  className="px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold"
                />
              </div>
            </m.div>
          </div>
        </div>

        <Separator className="bg-primary-700" />

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Company Information */}
            <div className="lg:col-span-2">
              <m.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
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
                    <span className="font-serif text-2xl font-bold text-white">
                      {footerContent.companyName}
                    </span>
                  </Link>
                </div>
                
                <p className="text-primary-200 leading-relaxed mb-8 text-lg max-w-md">
                  {footerContent.description}
                </p>

                {/* Premium Accolades */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <Crown className="w-6 h-6 text-accent-400 mb-2" />
                    <p className="text-sm font-semibold text-white">Royal Family</p>
                    <p className="text-xs text-primary-300">Endorsed</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <Award className="w-6 h-6 text-accent-400 mb-2" />
                    <p className="text-sm font-semibold text-white">Tatler 2025</p>
                    <p className="text-xs text-primary-300">Featured</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <TrendingUp className="w-6 h-6 text-accent-400 mb-2" />
                    <p className="text-sm font-semibold text-white">15+ Years</p>
                    <p className="text-xs text-primary-300">Excellence</p>
                  </div>
                </div>
              </m.div>
            </div>

            {/* Footer Links Sections */}
            {footerContent.footerSections.map((section, sectionIndex) => (
              <m.div 
                key={sectionIndex} 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                  {section.title}
                  <Separator className="flex-1 bg-primary-700" />
                </h3>
                <nav role="navigation" aria-label={`${section.title} links`}>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="group flex items-center text-primary-200 hover:text-accent-400 transition-all duration-300"
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
              </m.div>
            ))}
          </div>
        </div>

        <Separator className="bg-primary-700 mt-16" />

        {/* Contact Information Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <m.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Phone */}
            <div className="group text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">Call Us</h4>
              <a 
                href={`tel:${contactInfo.phone}`}
                className="text-primary-200 hover:text-accent-400 transition-colors duration-300 text-lg"
              >
                {contactInfo.phone}
              </a>
              <p className="text-sm text-primary-300 mt-1">Mon-Fri 9am-6pm</p>
            </div>

            {/* Email */}
            <div className="group text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">Email Us</h4>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="text-primary-200 hover:text-accent-400 transition-colors duration-300 text-lg"
              >
                {contactInfo.email}
              </a>
              <p className="text-sm text-primary-300 mt-1">24/7 Response Time</p>
            </div>

            {/* Address */}
            <div className="group text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">Visit Us</h4>
              <address className="text-primary-200 not-italic leading-relaxed">
                {contactInfo.address.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < contactInfo.address.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </address>
            </div>
          </m.div>
        </div>

        {/* Footer Bottom */}
        <div className="bg-primary-950/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Copyright & Legal */}
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <p className="text-primary-300 text-sm">
                  {copyrightText}
                </p>
                <Separator orientation="vertical" className="hidden md:block h-4 bg-primary-700" />
                <nav className="flex items-center gap-6 text-sm">
                  <Link
                    href="/privacy"
                    className="text-primary-300 hover:text-accent-400 transition-colors duration-300"
                  >
                    Privacy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-primary-300 hover:text-accent-400 transition-colors duration-300"
                  >
                    Terms
                  </Link>
                  <Link
                    href="/cookies"
                    className="text-primary-300 hover:text-accent-400 transition-colors duration-300"
                  >
                    Cookies
                  </Link>
                  <Link
                    href="/accessibility"
                    className="text-primary-300 hover:text-accent-400 transition-colors duration-300"
                  >
                    Accessibility
                  </Link>
                </nav>
              </div>

              {/* Back to Top Button */}
              {showBackToTop && (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollToTop}
                    className="w-12 h-12 rounded-full bg-accent-600 hover:bg-accent-700 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                    aria-label="Back to top"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                </m.div>
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