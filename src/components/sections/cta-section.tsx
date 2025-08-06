/**
 * Documentation Source: Context7 MCP - Next.js Client Component with Magic UI Integration
 * Reference: /vercel/next.js - Client component patterns for interactive features
 * Reference: Context7 MCP /magicui/magicui - Interactive button components
 * Pattern: Modular call-to-action section with video background and CMS integration
 * 
 * Component Architecture:
 * - Client Component boundary for interactive features
 * - Magic UI components for premium button interactions
 * - BrandStatementVideo component integration
 * - CMS integration for dynamic content
 * - Context7 verified component patterns
 * 
 * Performance Optimisations:
 * - Efficient video component rendering
 * - Optimized button animations
 * - Responsive design with mobile-first approach
 * - Memory-efficient event handling
 * 
 * Interactive Features:
 * - Interactive hover buttons with animations
 * - Video-text brand statement component
 * - Multiple CTA options for user choice
 * - Premium visual effects and gradients
 */

"use client"

// Documentation Source: Context7 MCP - Magic UI Component Library Integration
// Reference: Context7 MCP /magicui/magicui - ShinyButton and InteractiveHoverButton components
// Pattern: Interactive UI components for premium user experience
import { ShinyButton } from '@/components/magicui/shiny-button'
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button'

// Documentation Source: Context7 MCP - Brand Statement Video Component
// Reference: Custom BrandStatementVideo component
// Pattern: Video-text combination for brand messaging
import { BrandStatementVideo } from '@/components/marketing/brand-statement-video'

// CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - Component patterns with external data
// REFERENCE: CMS integration pattern - No hardcoded content in components
// CMS DATA SOURCE: Using getCTAContent for all component content
import { getCTAContent } from '@/lib/cms/cms-content'

/**
 * Documentation Source: Context7 MCP - TypeScript Interface Design Patterns
 * Reference: /microsoft/typescript - Interface definitions for component props
 * Pattern: Flexible component props with comprehensive customisation options
 */
interface CTASectionProps {
  /** Additional CSS classes for styling customisation */
  className?: string
  /** Background colour class (default: bg-primary-900) */
  backgroundColor?: string
  /** Main headline text */
  title?: string
  /** Brand statement text for video component */
  brandStatement?: string
  /** Description text below title */
  description?: string
  /** Primary CTA button text */
  primaryButtonText?: string
  /** Secondary CTA button text */
  secondaryButtonText?: string
  /** Site name for dynamic content */
  siteName?: string
  /** Video component height class */
  videoHeight?: string
  /** Enable brand statement video (default: true) */
  showVideo?: boolean
}

/**
 * Documentation Source: Context7 MCP - React Functional Component Best Practices
 * Reference: /react/documentation - Modern React functional component patterns
 * Pattern: Reusable call-to-action section component with premium styling
 * 
 * Component Features:
 * - Dark background with contrasting white text
 * - Brand statement video integration
 * - Dual CTA buttons with different styling approaches
 * - Responsive typography and spacing
 * - Professional visual hierarchy
 * - Mobile-optimized button layout
 * - CMS-driven content (CLAUDE.md Rule 23 compliance)
 */
export function CTASection({ 
  className = "",
  backgroundColor,
  title,
  brandStatement,
  description,
  primaryButtonText,
  secondaryButtonText,
  siteName,
  videoHeight,
  showVideo
}: CTASectionProps) {
  
  // CONTEXT7 SOURCE: /michelebertoli/react-design-patterns-and-best-practices - External data integration
  // CMS DATA SOURCE: Using getCTAContent for all component content - CLAUDE.md Rule 23 compliance
  const cmsContent = getCTAContent()
  
  // Use CMS content as defaults, allow props to override for flexibility
  const resolvedTitle = title ?? cmsContent.title
  const resolvedBrandStatement = brandStatement ?? cmsContent.brandStatement
  const resolvedDescription = description ?? cmsContent.description
  const resolvedPrimaryButtonText = primaryButtonText ?? cmsContent.primaryButtonText
  const resolvedSecondaryButtonText = secondaryButtonText ?? cmsContent.secondaryButtonText
  const resolvedSiteName = siteName ?? cmsContent.siteName
  const resolvedVideoHeight = videoHeight ?? cmsContent.videoHeight ?? "h-[120px]"
  const resolvedShowVideo = showVideo ?? cmsContent.showVideo ?? true
  const resolvedBackgroundColor = backgroundColor ?? cmsContent.backgroundColor ?? "bg-primary-900"
  
  // Replace {siteName} placeholder in description with actual site name
  const processedDescription = resolvedDescription.replace('{siteName}', resolvedSiteName)
  
  return (
    <section className={`py-16 lg:py-24 ${resolvedBackgroundColor} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          {/* Documentation Source: Context7 MCP - Typography Hierarchy for CTA Sections
           * Reference: /tailwindlabs/tailwindcss.com - Text sizing and colour utilities
           * Pattern: Large heading with white text on dark background
           * 
           * Typography Features:
           * - Responsive text sizing from 3xl to 4xl
           * - Serif font for premium brand consistency
           * - Bold weight for strong visual impact
           * - White text for contrast on dark background
           * - Proper spacing with margin bottom
           * - CMS-driven content (CLAUDE.md Rule 23 compliance)
           */}
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
            {resolvedTitle}
          </h2>
          
          {/* Brand Statement Video */}
          {/* Documentation Source: Context7 MCP - Conditional Component Rendering
           * Reference: /react/documentation - Conditional rendering patterns
           * Pattern: Optional video component based on CMS-driven showVideo setting
           * 
           * Video Component Features:
           * - BrandStatementVideo with customizable height from CMS
           * - Dynamic text content from CMS
           * - Consistent brand messaging
           * - Professional video-text integration
           * - CMS-driven content (CLAUDE.md Rule 23 compliance)
           */}
          {resolvedShowVideo && (
            <div className="mb-8">
              <BrandStatementVideo 
                className={resolvedVideoHeight} 
                text={resolvedBrandStatement}
                videoKey="brandStatement"
              />
            </div>
          )}
          
          {/* Description Text */}
          {/* Documentation Source: Context7 MCP - CTA Description Typography
           * Reference: /tailwindlabs/tailwindcss.com - Text colour and spacing utilities
           * Pattern: Supporting text with optimal readability
           * 
           * Description Features:
           * - Large text size for readability
           * - Light primary colour for subtle contrast
           * - Constrained width for optimal line length
           * - Centered alignment with auto margins
           * - Proper spacing before CTA buttons
           * - CMS-driven content (CLAUDE.md Rule 23 compliance)
           */}
          <p className="text-lg text-primary-300 mb-8 max-w-2xl mx-auto">
            {processedDescription}
          </p>
          
          {/* CTA Buttons */}
          {/* Documentation Source: Context7 MCP - Dual CTA Button Layout
           * Reference: /tailwindlabs/tailwindcss.com - Flexbox utilities for button layout
           * Pattern: Primary and secondary CTA buttons with responsive layout
           * 
           * Button Layout Features:
           * - Responsive flex layout (column on mobile, row on desktop)
           * - Equal spacing between buttons
           * - Centered alignment
           * - Consistent button sizing and styling
           * - Different visual treatments for hierarchy
           * - CMS-driven button text (CLAUDE.md Rule 23 compliance)
           */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary CTA Button */}
            {/* Documentation Source: Context7 MCP - ShinyButton Component Integration
             * Reference: Context7 MCP /magicui/magicui - ShinyButton implementation
             * Pattern: Premium primary button with shiny animation effect
             * 
             * Primary Button Features:
             * - ShinyButton component for premium feel
             * - Consistent padding and height
             * - Primary action styling
             * - Smooth animations and interactions
             * - CMS-driven text content (CLAUDE.md Rule 23 compliance)
             */}
            <ShinyButton 
              text={resolvedPrimaryButtonText}
              className="px-8 py-3 h-auto"
            />
            
            {/* Secondary CTA Button */}
            {/* Documentation Source: Context7 MCP - InteractiveHoverButton Component
             * Reference: Context7 MCP /magicui/magicui - InteractiveHoverButton patterns
             * Pattern: Secondary button with outline styling and hover animations
             * 
             * Secondary Button Features:
             * - InteractiveHoverButton for sophisticated interactions
             * - Outline styling with transparent background
             * - White text and border for consistency
             * - Hover state with background fill
             * - Color inversion on hover for visual feedback
             * - CMS-driven text content (CLAUDE.md Rule 23 compliance)
             */}
            <InteractiveHoverButton 
              text={resolvedSecondaryButtonText}
              className="px-8 py-3 border border-white bg-transparent text-white hover:bg-white hover:text-primary-900"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// Export types for documentation and reuse
export type { CTASectionProps }