"use client"

import { useState } from 'react'
import { Menu, X, Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { getSiteHeader, getMainNavigation, getContactInfo } from '@/lib/cms'
import { cn } from '@/lib/utils'

// CMS DATA SOURCE: Using getSiteHeader for header content and navigation

interface PageHeaderProps {
  className?: string
  variant?: 'default' | 'transparent' | 'sticky'
  showContactInfo?: boolean
}

export function PageHeader({
  className,
  variant = 'default',
  showContactInfo = true
}: PageHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // CMS DATA SOURCE: Using getSiteHeader for site branding and navigation
  const headerContent = getSiteHeader()
  const navigation = getMainNavigation()
  const contactInfo = getContactInfo()

  const containerClasses = {
    default: 'bg-white border-b border-navy-100 sticky top-0 z-50',
    transparent: 'bg-white/95 backdrop-blur-sm border-b border-navy-100/50 sticky top-0 z-50',
    sticky: 'bg-white shadow-md sticky top-0 z-50'
  }

  return (
    <header 
      className={cn(containerClasses[variant], className)}
      role="banner"
    >
      
      {/* Top Contact Bar - Desktop Only */}
      {showContactInfo && (
        <div className="hidden lg:block bg-navy-900 text-white py-2">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="hover:text-accent-300 transition-colors duration-200"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="hover:text-accent-300 transition-colors duration-200"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="text-accent-300 font-medium">
                Featured in Tatler Address Book 2025
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center space-x-3 group"
              aria-label={`${headerContent.siteName} homepage`}
            >
              <div className="relative">
                <Image
                  src={headerContent.logo.main}
                  alt={headerContent.logo.alt}
                  width={headerContent.logo.width}
                  height={headerContent.logo.height}
                  priority
                  className="h-8 lg:h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-lg lg:text-xl font-bold text-navy-900 group-hover:text-navy-700 transition-colors duration-300">
                  {headerContent.siteName}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <NavigationMenu>
              <NavigationMenuList className="flex space-x-6">
                {navigation.map((item, index) => (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="text-navy-700 hover:text-navy-900 font-medium transition-colors duration-200 px-3 py-2 rounded-md hover:bg-navy-50"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-gold"
              asChild
            >
              <Link href="#contact">
                Book Free Consultation
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-navy-700 hover:text-navy-900 hover:bg-navy-50"
                  aria-label="Open mobile menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left">
                  <SheetTitle className="font-serif text-xl font-bold text-navy-900">
                    {headerContent.siteName}
                  </SheetTitle>
                </SheetHeader>
                
                {/* Mobile Navigation */}
                <nav className="mt-8" role="navigation" aria-label="Mobile navigation">
                  <div className="flex flex-col space-y-4">
                    {navigation.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-navy-700 hover:text-navy-900 font-medium py-3 px-4 rounded-lg hover:bg-navy-50 transition-all duration-200"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </nav>

                {/* Mobile Contact Info */}
                <div className="mt-8 pt-8 border-t border-navy-200">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-navy-600">
                      <Phone className="w-5 h-5" />
                      <a 
                        href={`tel:${contactInfo.phone}`}
                        className="hover:text-navy-900 transition-colors duration-200"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-navy-600">
                      <Mail className="w-5 h-5" />
                      <a 
                        href={`mailto:${contactInfo.email}`}
                        className="hover:text-navy-900 transition-colors duration-200"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Mobile CTA Button */}
                <div className="mt-8 pt-6 border-t border-navy-200">
                  <Button
                    className="w-full bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white shadow-gold"
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                  >
                    <Link href="#contact">
                      Book Free Consultation
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

// Export variant types for documentation
export type PageHeaderVariant = 'default' | 'transparent' | 'sticky'