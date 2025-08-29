// CONTEXT7 SOURCE: /reactjs/react.dev - Client Component with synchronous data fetching patterns  
// SYNCHRONOUS ARCHITECTURE RESTORATION: Return to working pattern from August 14, 2025
// WORKING PATTERN REASON: Direct CMS function calls eliminate async complexity
import React from 'react'
import { getFooterContent, getUnifiedContact, getCopyrightText } from '@/lib/cms'

// Client Component for interactive functionality
import { PageFooterClient } from './page-footer-client'

// CMS DATA SOURCE: Using getFooterContent for footer links and content

interface PageFooterProps {
  className?: string
  variant?: 'default' | 'minimal' | 'premium'
  showBackToTop?: boolean
  showNewsletter?: boolean
  showContactForm?: boolean
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React Client Component with synchronous data access
// SYNCHRONOUS RESTORATION: Return to proven working pattern with immediate data availability
export function PageFooter({
  className,
  variant = 'default',
  showBackToTop = true,
  showNewsletter = false,
  showContactForm = false
}: PageFooterProps) {
  // CONTEXT7 SOURCE: /reactjs/react.dev - Direct synchronous data access pattern
  // SYNCHRONOUS CMS REASON: Direct function calls eliminate async complexity and loading states
  // CMS DATA SOURCE: Using synchronous getFooterContent for footer structure and links
  const footerContent = getFooterContent()
  // CONTEXT7 SOURCE: /microsoft/typescript - Unified data access pattern with interface extraction
  const unifiedContact = getUnifiedContact()
  const contactInfo = unifiedContact.landingInfo
  const copyrightText = getCopyrightText()

  // CONTEXT7 SOURCE: /reactjs/react.dev - Client Component composition pattern
  // COMPOSITION REASON: Official React documentation demonstrates passing synchronous data as props to client components
  return (
    <PageFooterClient 
      footerContent={footerContent}
      contactInfo={contactInfo}
      copyrightText={copyrightText}
      className={className}
      variant={variant}
      showBackToTop={showBackToTop}
      showNewsletter={showNewsletter}
      showContactForm={showContactForm}
    />
  )
}

// Export variant types for documentation
export type PageFooterVariant = 'default' | 'minimal' | 'premium'