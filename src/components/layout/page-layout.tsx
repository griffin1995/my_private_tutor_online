/**
 * Documentation Source: React 18 + TypeScript Best Practices
 * Reference: https://react.dev/reference/react/ReactNode
 * Reference: https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
 * 
 * Pattern: Layout Wrapper Component
 * Architecture:
 * - Client component for interactive header/footer
 * - Composition pattern with optional sections
 * - Flexible background and spacing system
 * 
 * Design System:
 * - Consistent container sizes
 * - Standardized vertical spacing
 * - Background variants for visual hierarchy
 * 
 * Accessibility:
 * - Semantic HTML structure
 * - Skip navigation support (in header)
 * - ARIA landmarks
 */

"use client"

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { PageHeader } from './page-header'
import { PageFooter } from './page-footer'

// CMS DATA SOURCE: Layout uses CMS data via Header and Footer components
// CLAUDE.md rule 42: PageLayout → PageHero → Section structure
// CLAUDE.md rule 43: Always specify background='white' explicitly

// Context7 MCP Documentation Source: /microsoft/typescript
// Reference: TypeScript strict mode - proper interface definitions instead of Record<string, any>
// Purpose: Type safety for header and footer component props
interface PageHeaderProps {
  className?: string
  variant?: 'transparent' | 'solid' | 'glass'
  showCTA?: boolean
  fixed?: boolean
}

interface PageFooterProps {
  className?: string
  variant?: 'default' | 'minimal' | 'premium'
  showBackToTop?: boolean
}

interface PageLayoutProps {
  children: ReactNode
  className?: string
  background?: 'white' | 'gradient' | 'pattern' | 'dark' | 'transparent'
  showHeader?: boolean
  showFooter?: boolean
  headerProps?: PageHeaderProps
  footerProps?: PageFooterProps
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  verticalSpacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export function PageLayout({
  children,
  className,
  background = 'white', // CLAUDE.md rule 43: Explicit white background
  showHeader = true,
  showFooter = true,
  headerProps,
  footerProps,
  containerSize = 'full',
  verticalSpacing = 'lg'
}: PageLayoutProps) {

  const backgroundClasses = {
    white: 'bg-white',
    gradient: 'bg-gradient-to-br from-white via-primary-50 to-accent-50',
    pattern: 'bg-white bg-gradient-to-r from-primary-50/30 via-white to-accent-50/30',
    dark: 'bg-primary-900',
    // Documentation Source: Context7 Tailwind CSS - Transparent backgrounds for fixed header layouts
    // Reference: /tailwindlabs/tailwindcss.com - background-color: transparent
    // 
    // Purpose: Enables fixed header overlay layouts without white space gaps
    // Usage: Essential for pages with full-viewport hero sections
    // Technical: Works with fixed positioned headers to create seamless overlays
    // Impact: Allows hero content to start at viewport top (y=0) with header floating above
    transparent: 'bg-transparent'
  }

  const containerSizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl', 
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-none'
  }

  const verticalSpacingClasses = {
    none: '',
    sm: 'py-4',
    md: 'py-8',
    lg: 'py-12',
    xl: 'py-16'
  }

  return (
    <div 
      className={cn(
        'min-h-screen flex flex-col overflow-x-hidden',
        backgroundClasses[background],
        className
      )}
    >
      
      {/* Header */}
      {showHeader && (
        <PageHeader {...headerProps} />
      )}

      {/* Main Content Area */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container padding control patterns */}
      {/* LAYOUT FIX REASON: Official Tailwind CSS documentation shows conditional padding application */}
      {/* Container width 'full' should not have horizontal padding to allow edge-to-edge sections */}
      <main 
        className="flex-1"
        role="main"
        id="main-content"
        tabIndex={-1}
      >
        <div 
          className={cn(
            'mx-auto',
            containerSize !== 'full' && 'px-4 sm:px-6 lg:px-8',
            containerSizeClasses[containerSize],
            verticalSpacingClasses[verticalSpacing]
          )}
        >
          {children}
        </div>
      </main>

      {/* Footer */}
      {showFooter && (
        <PageFooter {...footerProps} />
      )}
    </div>
  )
}

// Skip-to-content link for accessibility - CLAUDE.md rule 30
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-900 text-white px-4 py-2 rounded-md text-sm font-medium z-50 focus:z-50"
      style={{ zIndex: 1600 }} // zIndex.skipLink from design system
    >
      Skip to main content
    </a>
  )
}

// Export types for documentation
export type PageLayoutBackground = 'white' | 'gradient' | 'pattern' | 'dark' | 'transparent'
export type PageLayoutContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
export type PageLayoutVerticalSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl'