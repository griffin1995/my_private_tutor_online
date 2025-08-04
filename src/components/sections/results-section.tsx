/**
 * Documentation Source: Context7 MCP - React Component Architecture with CMS Integration
 * Reference: /context7/react_dev - Reusable component patterns with TypeScript props interface
 * Pattern: Modular results statistics section component with flexible styling and CMS-driven content
 * 
 * Component Architecture:
 * - Extracted from homepage for improved modularity and reusability
 * - CMS integration via getResultsStatistics for data consistency
 * - Flexible props interface for customizable title, description, and styling
 * - Responsive grid layout with proper semantic HTML structure
 * - Performance optimized with lucide-react icons and Next.js best practices
 * 
 * Usage Context:
 * - Originally part of homepage main component
 * - Extracted for better component organization and maintainability
 * - Can be reused across multiple pages with consistent design
 * - Maintains original visual design and functionality
 * 
 * Design Principles:
 * - Mobile-first responsive design with grid breakpoints
 * - Semantic HTML with proper heading hierarchy
 * - Accessible color contrast and interactive elements
 * - Consistent spacing and typography following site design system
 */

"use client"

import { CheckCircle } from 'lucide-react'
import { getResultsStatistics } from '@/lib/cms/cms-content'

interface ResultsSectionProps {
  title?: string
  description?: string
  backgroundColor?: string
  className?: string
  showDescription?: boolean
}

/**
 * Documentation Source: Context7 MCP - React Functional Component with TypeScript Interface
 * Reference: /context7/react_dev - Component props with JSDoc descriptions and default values
 * Pattern: Flexible component with customizable content and styling via props
 * 
 * Component Features:
 * - CMS-driven statistics via getResultsStatistics function
 * - Customizable title and description through props
 * - Background color and additional CSS class support
 * - Optional description visibility control
 * - Responsive grid layout for statistics display
 * - Consistent icon usage with CheckCircle from lucide-react
 * 
 * Props Interface Design:
 * - title: Main section heading (defaults to CMS content)
 * - description: Optional section description
 * - backgroundColor: Tailwind CSS background class for theming
 * - className: Additional CSS classes for custom styling
 * - showDescription: Controls visibility of description paragraph
 * 
 * Implementation Details:
 * - Uses semantic HTML section element with proper heading hierarchy
 * - Grid layout: 1 column on mobile, 3 columns on medium+ screens
 * - Maximum width constraint (max-w-4xl) for optimal readability
 * - Centered content alignment with proper spacing
 * - Icon integration with consistent styling and accessibility
 */
export function ResultsSection({
  title = "Results that Speak for Themselves (No styling revisions made yet, only moved)",
  description,
  backgroundColor = "bg-white",
  className = "",
  showDescription = false
}: ResultsSectionProps) {
  // CMS DATA SOURCE: Using getResultsStatistics for performance metrics data
  // Documentation Source: Context7 MCP - CMS integration patterns for React components
  // Reference: /context7/react_dev - Functional component with external data fetching
  // Pattern: CMS function call within component for type-safe data access
  const resultsStats = getResultsStatistics()

  return (
    <section className={`py-16 lg:py-24 ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* 
           * Documentation Source: Context7 MCP - Semantic HTML Heading Hierarchy
           * Reference: /context7/react_dev - Proper heading structure for accessibility
           * Pattern: h2 level heading with responsive text sizing and consistent typography
           * 
           * Typography Implementation:
           * - text-3xl lg:text-4xl: Responsive heading sizes (48px → 56px)
           * - font-serif: Uses Source Serif 4 following site typography system
           * - font-bold: Strong visual weight for section prominence
           * - text-primary-900: Consistent color scheme integration
           * - mb-12: Bottom margin (48px) for proper section spacing
           */}
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-12">
            {title}
          </h2>

          {/* 
           * Documentation Source: Context7 MCP - React Conditional Rendering Pattern
           * Reference: /context7/react_dev - Conditional JSX rendering with logical AND operator
           * Pattern: Optional description rendering based on props and content availability
           * 
           * Conditional Logic:
           * - showDescription && description: Only renders when both conditions are true
           * - Prevents empty paragraph elements in DOM
           * - Maintains semantic HTML structure when content is available
           * - Flexible content control via component props
           */}
          {showDescription && description && (
            <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-8">
              {description}
            </p>
          )}

          {/* 
           * Documentation Source: Context7 MCP - CSS Grid Layout with Responsive Breakpoints
           * Reference: /context7/react_dev - Responsive grid implementation patterns
           * Pattern: Mobile-first responsive grid with proper spacing and alignment
           * 
           * Grid Implementation:
           * - grid-cols-1: Single column on mobile devices for optimal reading
           * - md:grid-cols-3: Three columns on medium+ screens for desktop layout
           * - gap-8: Consistent 32px spacing between grid items
           * - max-w-4xl mx-auto: Centered container with maximum width constraint
           * 
           * Design Rationale:
           * - Mobile-first approach ensures optimal experience on all devices
           * - 3-column layout provides balanced visual presentation
           * - Max-width prevents overly wide layout on large screens
           * - Consistent gap spacing maintains visual rhythm
           */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {resultsStats.map((stat, index) => (
              /* 
               * Documentation Source: Context7 MCP - React List Rendering with Key Props
               * Reference: /context7/react_dev - Array.map() with unique key attributes
               * Pattern: Statistics card component with consistent styling and structure
               * 
               * Card Architecture:
               * - text-center: Centered content alignment for balanced visual presentation
               * - Icon container: Circular background with brand color integration
               * - Number display: Large, bold text for statistical emphasis
               * - Description: Supporting text with proper typography hierarchy
               * 
               * Accessibility Features:
               * - Proper key prop for React reconciliation
               * - Semantic HTML structure with div containers
               * - High contrast colors for readability
               * - Descriptive text content for screen readers
               */
              <div key={index} className="text-center">
                {/* 
                 * Documentation Source: Context7 MCP - Tailwind CSS Icon Container Design
                 * Reference: /tailwindlabs/tailwindcss.com - Flexbox utilities and background colors
                 * Pattern: Circular icon container with brand colors and proper centering
                 * 
                 * Container Implementation:
                 * - bg-accent-50: Light brand accent background for visual softness
                 * - rounded-full: Perfect circle shape for modern aesthetic
                 * - w-24 h-24: Fixed dimensions (96px) for consistent sizing
                 * - flex items-center justify-center: Perfect center alignment for icon
                 * - mx-auto mb-4: Horizontal centering and bottom margin
                 * 
                 * Icon Integration:
                 * - CheckCircle from lucide-react for consistent iconography
                 * - w-12 h-12: 48px size for proper visual weight
                 * - text-accent-600: Brand color for visual consistency
                 */}
                <div className="bg-accent-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-accent-600" />
                </div>

                {/* 
                 * Documentation Source: Context7 MCP - Typography Hierarchy Implementation
                 * Reference: /context7/react_dev - Heading and paragraph text styling patterns
                 * Pattern: Statistical data presentation with proper visual hierarchy
                 * 
                 * Typography Structure:
                 * - h3 element: Semantic heading for statistical number
                 * - text-2xl: Large text size (24px) for statistical prominence
                 * - font-bold: Strong weight for numerical emphasis
                 * - text-primary-900: Dark primary color for high contrast
                 * - mb-2: Bottom margin (8px) for proper spacing to description
                 * 
                 * Description Styling:
                 * - p element: Semantic paragraph for supporting text
                 * - text-primary-700: Medium primary color for hierarchy
                 * - leading-relaxed: Increased line height for readability
                 */}
                <h3 className="text-2xl font-bold text-primary-900 mb-2">{stat.number}</h3>
                <p className="text-primary-700 leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResultsSection