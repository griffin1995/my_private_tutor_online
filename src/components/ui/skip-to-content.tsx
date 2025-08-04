/**
 * Skip to Content Component
 * Documentation Source: WCAG 2.1 - Bypass Blocks
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html
 * Reference: https://www.w3.org/WAI/WCAG21/Techniques/general/G1
 * 
 * Pattern: Skip navigation link
 * Purpose: Allow keyboard users to bypass repetitive content
 * 
 * Accessibility Features:
 * - Visible on focus for keyboard users
 * - Hidden from view but accessible to screen readers
 * - Smooth scroll to main content
 * - Proper focus management
 */

import React from 'react'
import { cn } from '@/lib/utils'

interface SkipToContentProps {
  href?: string
  className?: string
  children?: React.ReactNode
}

export const SkipToContent: React.FC<SkipToContentProps> = ({
  href = '#main-content',
  className,
  children = 'Skip to main content'
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Get the target element
    const targetId = href.replace('#', '')
    const target = document.getElementById(targetId)
    
    if (target) {
      // Set temporary tabindex for focus
      target.setAttribute('tabindex', '-1')
      
      // Focus the element
      target.focus()
      
      // Scroll to element
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      
      // Remove tabindex after focus
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex')
      }, { once: true })
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        // Positioning
        'fixed top-0 left-0 z-[100]',
        // Styling
        'bg-primary text-primary-foreground',
        'px-4 py-2 rounded-md',
        'text-sm font-medium',
        // Hidden by default
        'translate-y-[-100%]',
        // Visible on focus
        'focus:translate-y-0',
        // Transitions
        'transition-transform duration-200',
        // Focus styles
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
      aria-label={typeof children === 'string' ? children : 'Skip to main content'}
    >
      {children}
    </a>
  )
}

// Skip Link Container for multiple skip links
interface SkipLinksProps {
  links?: Array<{
    href: string
    label: string
  }>
  className?: string
}

export const SkipLinks: React.FC<SkipLinksProps> = ({
  links = [
    { href: '#main-content', label: 'Skip to main content' },
    { href: '#navigation', label: 'Skip to navigation' },
    { href: '#footer', label: 'Skip to footer' }
  ],
  className
}) => {
  return (
    <nav
      aria-label="Skip links"
      className={cn('sr-only focus-within:not-sr-only', className)}
    >
      {links.map((link) => (
        <SkipToContent
          key={link.href}
          href={link.href}
          className="mr-2"
        >
          {link.label}
        </SkipToContent>
      ))}
    </nav>
  )
}