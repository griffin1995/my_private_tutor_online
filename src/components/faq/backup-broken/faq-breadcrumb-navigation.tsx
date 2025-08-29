/**
 * CONTEXT7 SOURCE: /vercel/next.js - Breadcrumb navigation patterns for hierarchical routing
 * CONTEXT7 SOURCE: /radix-ui/primitives - Accessible navigation component patterns
 * 
 * FAQ Breadcrumb Navigation Component
 * Hierarchical navigation system for FAQ category structure
 * 
 * BUSINESS CONTEXT: Enhanced user navigation through FAQ category hierarchy
 * UX IMPROVEMENT: Clear navigation path for complex FAQ structure
 * SEO BENEFIT: Breadcrumb schema for enhanced search result display
 * 
 * FEATURES:
 * - Hierarchical breadcrumb display
 * - Accessible navigation with ARIA labels
 * - Responsive design for mobile/desktop
 * - Category-specific styling and icons
 * - Schema.org structured data integration
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content via centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: CMS comment requirement
 * - Rule 25: Structured data management
 */

"use client"

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { m } from 'framer-motion'
import type { FAQBreadcrumb } from '@/lib/cms/cms-faq-categories'

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for component props
// COMPONENT PROPS: TypeScript interface for breadcrumb navigation
interface FAQBreadcrumbNavigationProps {
  breadcrumbs: FAQBreadcrumb[]
  className?: string
  showHome?: boolean
  showSchema?: boolean
}

/**
 * FAQ Breadcrumb Navigation Component
 * CONTEXT7 SOURCE: /radix-ui/primitives - Accessible navigation component design patterns
 * ACCESSIBILITY REASON: Provides screen reader support and keyboard navigation
 */
export function FAQBreadcrumbNavigation({
  breadcrumbs,
  className = '',
  showHome = true,
  showSchema = true
}: FAQBreadcrumbNavigationProps) {
  
  // CONTEXT7 SOURCE: /microsoft/typescript - Array filtering patterns for navigation display
  // BREADCRUMB PROCESSING: Filter and enhance breadcrumb data for display
  const displayBreadcrumbs = breadcrumbs.map((crumb, index) => ({
    ...crumb,
    position: index + 1,
    isLast: index === breadcrumbs.length - 1
  }))

  return (
    <>
      {/* CONTEXT7 SOURCE: /vercel/next.js - Structured data patterns for breadcrumb schema */}
      {/* BREADCRUMB SCHEMA: Enhance search results with structured data */}
      {showSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: displayBreadcrumbs.map((crumb, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: crumb.label,
                item: `https://myprivatetutoronline.com${crumb.href}`
              }))
            })
          }}
        />
      )}

      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Navigation component with accessibility */}
      {/* ACCESSIBLE NAVIGATION: ARIA labels and semantic HTML structure */}
      <nav 
        aria-label="Breadcrumb navigation"
        className={`flex items-center space-x-1 text-sm ${className}`}
      >
        <m.ol 
          className="flex flex-wrap items-center space-x-1 sm:space-x-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {displayBreadcrumbs.map((crumb, index) => (
            <m.li
              key={crumb.href}
              className="flex items-center"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1 
              }}
            >
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Interactive breadcrumb styling */}
              {/* BREADCRUMB ITEM: Active and inactive state styling */}
              {crumb.isActive ? (
                <span 
                  className="flex items-center px-2 py-1 font-semibold text-accent-700 bg-accent-50 rounded-lg"
                  aria-current="page"
                >
                  {/* CONTEXT7 SOURCE: /lucide/lucide-react - Icon integration for home breadcrumb */}
                  {/* HOME ICON: Special icon for home breadcrumb */}
                  {crumb.label === 'Home' && showHome && (
                    <Home className="w-4 h-4 mr-1.5" />
                  )}
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="flex items-center px-2 py-1 text-slate-600 hover:text-accent-700 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                  aria-label={`Navigate to ${crumb.label}`}
                >
                  {/* CONTEXT7 SOURCE: /lucide/lucide-react - Home icon for navigation links */}
                  {/* HOME ICON: Consistent home icon across breadcrumb states */}
                  {crumb.label === 'Home' && showHome && (
                    <Home className="w-4 h-4 mr-1.5" />
                  )}
                  {crumb.label}
                </Link>
              )}

              {/* CONTEXT7 SOURCE: /lucide/lucide-react - Breadcrumb separator icons */}
              {/* SEPARATOR: ChevronRight between breadcrumb items */}
              {!crumb.isLast && (
                <ChevronRight 
                  className="w-4 h-4 mx-1 sm:mx-2 text-slate-400" 
                  aria-hidden="true"
                />
              )}
            </m.li>
          ))}
        </m.ol>
      </nav>
    </>
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Component variant patterns for different breadcrumb styles
// BREADCRUMB VARIANTS: Different styling options for various contexts

/**
 * Compact Breadcrumb Navigation - Mobile-optimized version
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Responsive design patterns
 * MOBILE OPTIMIZATION: Streamlined breadcrumb for small screens
 */
export function FAQBreadcrumbNavigationCompact({
  breadcrumbs,
  className = ''
}: Omit<FAQBreadcrumbNavigationProps, 'showHome' | 'showSchema'>) {
  
  const currentPage = breadcrumbs[breadcrumbs.length - 1]
  const parentPage = breadcrumbs[breadcrumbs.length - 2]
  
  if (!currentPage) return null

  return (
    <nav 
      aria-label="Compact breadcrumb navigation"
      className={`flex items-center space-x-2 text-sm ${className}`}
    >
      {parentPage && (
        <>
          <Link
            href={parentPage.href}
            className="flex items-center text-slate-600 hover:text-accent-700 transition-colors duration-200"
            aria-label={`Navigate back to ${parentPage.label}`}
          >
            <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
            {parentPage.label}
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
        </>
      )}
      <span 
        className="font-semibold text-accent-700"
        aria-current="page"
      >
        {currentPage.label}
      </span>
    </nav>
  )
}

/**
 * FAQ Category Menu Navigation - Horizontal category selector
 * CONTEXT7 SOURCE: /vercel/next.js - Category navigation patterns for FAQ systems
 * CATEGORY NAVIGATION: Horizontal menu for switching between FAQ categories
 */
export function FAQCategoryMenuNavigation({
  categories,
  currentCategory,
  className = ''
}: {
  categories: Array<{
    name: string
    slug: string
    totalQuestions: number
    iconComponent: string
    primaryColor: string
  }>
  currentCategory?: string
  className?: string
}) {
  return (
    <nav 
      aria-label="FAQ category navigation"
      className={`flex items-center space-x-1 overflow-x-auto pb-2 ${className}`}
    >
      <div className="flex space-x-2 min-w-max">
        {/* All Categories Link */}
        <Link
          href="/faq"
          className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            !currentCategory 
              ? 'bg-accent-600 text-white shadow-lg' 
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Home className="w-4 h-4 mr-2" />
          All Categories
        </Link>

        {/* Individual Category Links */}
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/faq/${category.slug}`}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              currentCategory === category.slug
                ? 'text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
            style={currentCategory === category.slug ? {
              backgroundColor: category.primaryColor
            } : {}}
          >
            <span className="mr-2">{category.iconComponent}</span>
            {category.name}
            <span className="ml-2 px-2 py-0.5 text-xs bg-white/20 rounded-full">
              {category.totalQuestions}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Default export for clean component imports
export default FAQBreadcrumbNavigation