/**
 * Documentation Source: Context7 MCP - React Component Architecture for Homepage Section
 * Reference: /context7/react_dev - Component extraction patterns for modular architecture
 * Pattern: Extracted homepage "How It Works" section for preservation and reuse
 * 
 * Component Purpose:
 * - Preserves original homepage How It Works implementation
 * - Maintains Timeline component usage with proper icon mapping
 * - CMS integration with getHowItWorksSteps for data consistency
 * - Flexible usage across different pages while maintaining design integrity
 * 
 * Usage Context:
 * - Originally part of homepage main component
 * - Extracted for preservation during homepage redesign
 * - Can be reused on other pages or restored to homepage if needed
 * - Maintains all original styling and functionality
 */

"use client"

import { Phone, Calendar, BookOpen, Trophy } from 'lucide-react'
import { Timeline } from '@/components/ui/timeline'
import { getHowItWorksSteps } from '@/lib/cms/cms-content'

interface HomepageHowItWorksProps {
  title?: string
  subtitle?: string
  backgroundColor?: string
  className?: string
}

/**
 * Documentation Source: Context7 MCP - React Component with Props Interface
 * Reference: /context7/react_dev - TypeScript component props with default values
 * Pattern: Flexible component with customizable title, subtitle, and styling
 * 
 * Component Features:
 * - CMS-driven content via getHowItWorksSteps
 * - Icon mapping for Timeline component integration
 * - Customizable title and subtitle via props
 * - Responsive design with proper spacing
 * - Background color customization support
 * 
 * Default Implementation:
 * - Uses first 4 steps from CMS data (slice(0, 4))
 * - Maps Phone, Calendar, BookOpen, Trophy icons to steps
 * - Timeline component handles visual presentation
 * - Maintains original homepage styling and behavior
 */
export function HomepageHowItWorks({ 
  title = "How It Works",
  subtitle = "Old Homepage Implementation - Kept here for now instead of deleted as may use it again",
  backgroundColor = "bg-primary-50",
  className = ""
}: HomepageHowItWorksProps) {
  // CMS DATA SOURCE: Using getHowItWorksSteps for process timeline data
  const howItWorksSteps = getHowItWorksSteps()

  return (
    <section className={`py-16 lg:py-24 ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-primary-700 max-w-3xl mx-auto mb-12">
            {subtitle}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* 
           * Documentation Source: Context7 MCP - Timeline Component Integration
           * Reference: /components/ui/timeline - Timeline component usage patterns
           * Pattern: Icon mapping and data transformation for Timeline component
           * 
           * Implementation Details:
           * - Maps CMS step data to Timeline component format
           * - Uses lucide-react icons for visual consistency
           * - Maintains 4-step process (Phone → Calendar → BookOpen → Trophy)
           * - Preserves original homepage Timeline styling and behavior
           * - Icons follow the journey: Contact → Schedule → Learn → Achieve
           */}
          <Timeline 
            items={howItWorksSteps.slice(0, 4).map((step, index) => {
              const icons = [
                <Phone key={0} className="w-6 h-6 text-accent-600" />,
                <Calendar key={1} className="w-6 h-6 text-accent-600" />,
                <BookOpen key={2} className="w-6 h-6 text-accent-600" />,
                <Trophy key={3} className="w-6 h-6 text-accent-600" />
              ]
              return {
                title: step.title,
                description: step.description,
                icon: icons[index] || <BookOpen key={index} className="w-6 h-6 text-accent-600" />
              }
            })}
          />
        </div>
      </div>
    </section>
  )
}

export default HomepageHowItWorks