/**
 * CONTEXT7 SOURCE: /facebook/react - Results Documentation Section component for business analytics display
 * IMPLEMENTATION REASON: Official React patterns for data visualization components with TypeScript interfaces
 * CONTEXT7 SOURCE: /grx7/framer-motion - Animation patterns for statistical data presentation
 * BUSINESS ANALYTICS REASON: Premium positioning through verifiable outcomes and competitive differentiation
 * 
 * Results Documentation Section - Business Analytics Implementation
 * Displays verifiable academic outcomes, case studies, and competitive positioning data:
 * - Grade improvement statistics with confidence intervals
 * - University placement success rates with verification levels
 * - ROI calculations for logic-driven families
 * - Competitive advantages for premium service justification
 * 
 * Target Audiences:
 * - Oxbridge Prep: University admission rates and grade improvements
 * - 11+ Parents: Grammar school success rates and structured preparation timelines
 * - Elite Corporate: Discretion protocols and exclusive service verification
 * - Comparison Shoppers: Detailed ROI analysis and competitive advantage data
 */

"use client"

import { m } from 'framer-motion'
import { 
  TrendingUp, 
  Award, 
  Crown, 
  Target, 
  BookOpen, 
  Heart,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Users,
  Shield,
  Star,
  DollarSign,
  Calendar
} from 'lucide-react'
import { Section } from '@/components/layout/section'
import { StatsTrio } from './stats-trio'

// CONTEXT7 SOURCE: /microsoft/typescript - Interface definitions for results documentation props
// PROPS INTERFACE REASON: Official TypeScript patterns for component data structure and type safety
export interface ResultsDocumentationProps {
  readonly title?: string
  readonly description?: string
  readonly results: readonly ResultsDocumentationItem[]
  readonly showVerificationBadges?: boolean
  readonly showConfidenceIntervals?: boolean
  readonly layout?: 'grid' | 'list' | 'featured'
  readonly maxItems?: number
  readonly className?: string
}

export interface ResultsDocumentationItem {
  readonly category: 'grade_improvement' | 'university_placement' | 'exam_success' | 'roi_analysis'
  readonly metric: string
  readonly value: string
  readonly description: string
  readonly sampleSize?: number
  readonly timeframe: string
  readonly verificationLevel: 'verified' | 'estimated' | 'projected'
  readonly confidenceInterval?: string
  readonly icon?: string
  readonly priority: number
}

// CONTEXT7 SOURCE: /facebook/react - Icon mapping helper function for results documentation
// ICON MAPPING REASON: CMS stores icon names as strings, components require React elements
const iconMap: Record<string, React.ReactElement> = {
  TrendingUp: <TrendingUp className="w-8 h-8" />,
  Award: <Award className="w-8 h-8" />,
  Crown: <Crown className="w-8 h-8" />,
  Target: <Target className="w-8 h-8" />,
  BookOpen: <BookOpen className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  BarChart3: <BarChart3 className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Star: <Star className="w-8 h-8" />
}

// CONTEXT7 SOURCE: /facebook/react - Helper function for verification badge display
// VERIFICATION SYSTEM REASON: Business requirement for data credibility and trust indicators
const getVerificationBadge = (level: ResultsDocumentationItem['verificationLevel']) => {
  switch (level) {
    case 'verified':
      return (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          <CheckCircle className="w-3 h-3" />
          Verified
        </div>
      )
    case 'estimated':
      return (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
          <AlertCircle className="w-3 h-3" />
          Estimated
        </div>
      )
    case 'projected':
      return (
        <div className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          <BarChart3 className="w-3 h-3" />
          Projected
        </div>
      )
    default:
      return null
  }
}

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Helper function for category styling with brand colour palette
// CATEGORY STYLING REASON: Visual differentiation using brand amber/yellow/gold colour variants for consistency
const getCategoryStyle = (category: ResultsDocumentationItem['category']) => {
  switch (category) {
    case 'grade_improvement':
      return 'border-amber-200 bg-amber-50 text-amber-900'
    case 'university_placement':
      return 'border-yellow-200 bg-yellow-50 text-yellow-900'
    case 'exam_success':
      return 'border-amber-300 bg-amber-100 text-amber-800'
    case 'roi_analysis':
      return 'border-yellow-300 bg-yellow-100 text-yellow-800'
    default:
      return 'border-amber-200 bg-amber-50 text-amber-900'
  }
}

// CONTEXT7 SOURCE: /facebook/react - Main component implementation with analytics data display
// COMPONENT IMPLEMENTATION REASON: Official React patterns for business analytics presentation
export function ResultsDocumentation({
  title = "Results That Drive Decisions",
  description = "Verifiable outcomes and competitive advantages that justify premium investment",
  results,
  showVerificationBadges = true,
  showConfidenceIntervals = true,
  layout = 'grid',
  maxItems,
  className = ""
}: ResultsDocumentationProps) {
  // Sort results by priority and apply max items limit
  const sortedResults = [...results]
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxItems)

  return (
    <Section className={`py-16 lg:py-24 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <m.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6">
            {title}
          </h2>
          <p className="text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </m.div>

        {/* Results Grid */}
        <div className={`grid gap-6 ${
          layout === 'grid' 
            ? 'md:grid-cols-2 lg:grid-cols-3' 
            : layout === 'list'
            ? 'grid-cols-1 max-w-4xl mx-auto'
            : 'md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
        }`}>
          {sortedResults.map((result, index) => (
            <m.div
              key={`${result.category}-${result.metric}`}
              className={`p-6 rounded-xl border-2 ${getCategoryStyle(result.category)} 
                         hover:shadow-lg transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Icon and Verification Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-white/70">
                  {result.icon && iconMap[result.icon] 
                    ? iconMap[result.icon] 
                    : <BarChart3 className="w-8 h-8" />}
                </div>
                {false && getVerificationBadge(result.verificationLevel)}
              </div>

              {/* Metric Value */}
              <div className="mb-4">
                <div className="text-3xl font-bold mb-2">
                  {result.value}
                </div>
                <h3 className="text-lg font-semibold">
                  {result.metric}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-4">
                {result.description}
              </p>

              {/* Additional Information */}
              <div className="space-y-2 text-xs">
                {result.sampleSize && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>Sample: {result.sampleSize.toLocaleString()} students</span>
                  </div>
                )}
                
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{result.timeframe}</span>
                </div>

                {showConfidenceIntervals && result.confidenceInterval && (
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-3 h-3" />
                    <span>{result.confidenceInterval}</span>
                  </div>
                )}
              </div>
            </m.div>
          ))}
        </div>

        {/* CONTEXT7 SOURCE: /websites/react_dev-learn - Conditional rendering with logical AND operator for component visibility
             REMOVAL REASON: StatsTrio contains old hardcoded cards that should not be displayed alongside new results data */}
        {false && (
          <m.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <StatsTrio showAnimation={false} variant="default" />
          </m.div>
        )}
      </div>
    </Section>
  )
}

export default ResultsDocumentation