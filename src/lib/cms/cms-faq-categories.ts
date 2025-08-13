/**
 * CONTEXT7 SOURCE: /vercel/next.js - Dynamic routing patterns for category management systems
 * CONTEXT7 SOURCE: /microsoft/typescript - Object mapping and interface design for hierarchical data structures
 * 
 * FAQ Category Management System - Dynamic Category Generation
 * Hierarchical Structure Implementation: Categories → Subcategories → FAQ Items
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through improved FAQ organization
 * TARGET SEGMENTS: Oxbridge prep, 11+ parents, elite corporate, comparison shoppers
 * 
 * ROUTING STRUCTURE:
 * /faq → Main FAQ page with all categories
 * /faq/[category] → Category-specific FAQ list
 * /faq/[category]/[subcategory] → Subcategory FAQ list
 * /faq/search?q=[query] → Search results page
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content via centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: CMS comment requirement
 * - Rule 25: Structured data management
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Import patterns for type safety and interface extension
// CMS DATA SOURCE: Import base interfaces for extension and enhancement
import type { FAQCategory, FAQQuestion } from './cms-content'
import type { LucideIcon } from 'lucide-react'

// CONTEXT7 SOURCE: /microsoft/typescript - Interface extension patterns for enhanced data structures
// ENHANCED INTERFACES: Extended category management with routing and analytics support
export interface EnhancedFAQCategory extends Omit<FAQCategory, 'icon'> {
  // Navigation and routing
  slug: string
  parentCategory?: string
  breadcrumbPath: string[]
  
  // Visual design system
  iconComponent: LucideIcon | string
  primaryColor: string
  secondaryColor: string
  gradientFrom: string
  gradientTo: string
  
  // Category management
  priority: number
  isExpanded: boolean
  childrenCount: number
  totalQuestions: number
  
  // Analytics and tracking
  analytics: FAQCategoryAnalytics
  
  // SEO optimization
  seo: FAQCategorySEO
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design for subcategory hierarchy
// SUBCATEGORY STRUCTURE: Enhanced subcategory with routing and visual design
export interface EnhancedFAQSubcategory {
  id: string
  name: string
  slug: string
  description: string
  parentCategorySlug: string
  order: number
  questionCount: number
  
  // Visual design
  iconComponent?: LucideIcon | string
  color?: string
  
  // SEO and navigation
  breadcrumbPath: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
  }
  
  // Analytics
  analytics: {
    views: number
    popularityRank: number
    conversionRate: number
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Analytics interface patterns for tracking systems
// ANALYTICS STRUCTURE: Category performance tracking and insights
export interface FAQCategoryAnalytics {
  totalViews: number
  uniqueViews: number
  averageTimeSpent: number
  bounceRate: number
  conversionRate: number
  topQuestions: string[]
  searchKeywords: string[]
  clientSegmentDistribution: {
    oxbridge_prep: number
    eleven_plus: number
    elite_corporate: number
    comparison_shopper: number
  }
  helpfulnessRating: number
  lastUpdated: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - SEO interface patterns for search optimization
// SEO STRUCTURE: Search engine optimization data for categories
export interface FAQCategorySEO {
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string
  ogTitle: string
  ogDescription: string
  structuredData: {
    '@type': 'FAQPage' | 'CollectionPage'
    mainEntity?: any[]
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Dynamic routing parameter interfaces for route handling
// ROUTING INTERFACES: Type-safe parameter handling for dynamic routes
export interface FAQRouteParams {
  category?: string
  subcategory?: string
}

export interface FAQSearchParams {
  q?: string
  segment?: string
  difficulty?: string
  sort?: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - Utility type patterns for navigation management
// NAVIGATION TYPES: Breadcrumb and menu generation
export interface FAQBreadcrumb {
  label: string
  href: string
  isActive: boolean
}

export interface FAQCategoryMenuItem {
  id: string
  label: string
  href: string
  icon: LucideIcon | string
  badge?: string
  isActive: boolean
  children?: FAQCategoryMenuItem[]
}

// CONTEXT7 SOURCE: /microsoft/typescript - Mapping function patterns for data transformation
// CATEGORY ENHANCEMENT: Transform base categories to enhanced format with routing
export function enhanceFAQCategories(categories: readonly FAQCategory[]): EnhancedFAQCategory[] {
  return categories.map((category, index): EnhancedFAQCategory => {
    const slug = generateCategorySlug(category.name)
    
    return {
      ...category,
      slug,
      breadcrumbPath: ['FAQ', category.name],
      
      // Visual design mapping
      iconComponent: mapCategoryIcon(category.icon),
      primaryColor: category.color,
      secondaryColor: lightenColor(category.color, 0.2),
      gradientFrom: category.color,
      gradientTo: darkenColor(category.color, 0.1),
      
      // Category management
      priority: category.order,
      isExpanded: false,
      childrenCount: category.subcategories?.length || 0,
      totalQuestions: category.questions.length,
      
      // Enhanced analytics
      analytics: generateCategoryAnalytics(category),
      
      // SEO optimization
      seo: generateCategorySEO(category, slug)
    }
  })
}

// CONTEXT7 SOURCE: /microsoft/typescript - String manipulation patterns for URL generation
// SLUG GENERATION: Create SEO-friendly URL slugs from category names
export function generateCategorySlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// CONTEXT7 SOURCE: /microsoft/typescript - Icon mapping patterns for visual components
// ICON MAPPING: Convert string icons to Lucide components
export function mapCategoryIcon(iconString: string): string {
  const iconMap: Record<string, string> = {
    'Globe': 'Globe',
    'GraduationCap': 'GraduationCap',
    'BookOpen': 'BookOpen',
    'TrendingUp': 'TrendingUp',
    'Calendar': 'Calendar',
    'Banknote': 'Banknote',
    'HelpCircle': 'HelpCircle'
  }
  
  return iconMap[iconString] || 'HelpCircle'
}

// CONTEXT7 SOURCE: /microsoft/typescript - Color manipulation utility functions
// COLOR UTILITIES: Generate theme variations for visual consistency
export function lightenColor(hex: string, amount: number): string {
  // Simple color lightening logic
  const num = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * amount * 100)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  
  return '#' + (0x1000000 + (R < 255 ? R : 255) * 0x10000 +
    (G < 255 ? G : 255) * 0x100 + (B < 255 ? B : 255))
    .toString(16).slice(1)
}

export function darkenColor(hex: string, amount: number): string {
  return lightenColor(hex, -amount)
}

// CONTEXT7 SOURCE: /microsoft/typescript - Analytics generation patterns for performance tracking
// ANALYTICS GENERATION: Create initial analytics data for categories
export function generateCategoryAnalytics(category: FAQCategory): FAQCategoryAnalytics {
  return {
    totalViews: 0,
    uniqueViews: 0,
    averageTimeSpent: 0,
    bounceRate: 0,
    conversionRate: 0,
    topQuestions: category.questions
      .filter(q => q.featured)
      .slice(0, 5)
      .map(q => q.id),
    searchKeywords: extractCategoryKeywords(category),
    clientSegmentDistribution: {
      oxbridge_prep: 0,
      eleven_plus: 0,
      elite_corporate: 0,
      comparison_shopper: 0
    },
    helpfulnessRating: 0,
    lastUpdated: new Date().toISOString()
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - SEO generation patterns for search optimization
// SEO GENERATION: Create search-optimized metadata for categories
export function generateCategorySEO(category: FAQCategory, slug: string): FAQCategorySEO {
  return {
    title: `${category.name} - Frequently Asked Questions | My Private Tutor Online`,
    description: category.description,
    keywords: extractCategoryKeywords(category),
    canonicalUrl: `/faq/${slug}`,
    ogTitle: `${category.name} FAQ | My Private Tutor Online`,
    ogDescription: `Get answers to common questions about ${category.name.toLowerCase()} with My Private Tutor Online.`,
    structuredData: {
      '@type': 'FAQPage',
      mainEntity: category.questions.map(question => ({
        '@type': 'Question',
        name: question.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: question.answer
        }
      }))
    }
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Keyword extraction patterns for content analysis
// KEYWORD EXTRACTION: Generate relevant search keywords from category content
export function extractCategoryKeywords(category: FAQCategory): string[] {
  const keywords = new Set<string>()
  
  // Add category name variations
  keywords.add(category.name.toLowerCase())
  keywords.add(category.title.toLowerCase())
  
  // Add keywords from questions
  category.questions.forEach(question => {
    question.tags.forEach(tag => keywords.add(tag))
    question.searchKeywords.forEach(keyword => keywords.add(keyword))
  })
  
  // Add common FAQ keywords
  keywords.add('frequently asked questions')
  keywords.add('help')
  keywords.add('support')
  keywords.add('tutoring')
  keywords.add('premium education')
  
  return Array.from(keywords).slice(0, 20) // Limit to 20 keywords
}

// CONTEXT7 SOURCE: /vercel/next.js - Breadcrumb generation patterns for navigation hierarchy
// BREADCRUMB GENERATION: Create navigation breadcrumbs for category hierarchy
export function generateFAQBreadcrumbs(
  category?: string,
  subcategory?: string
): FAQBreadcrumb[] {
  const breadcrumbs: FAQBreadcrumb[] = [
    { label: 'Home', href: '/', isActive: false },
    { label: 'FAQ', href: '/faq', isActive: !category }
  ]
  
  if (category) {
    breadcrumbs.push({
      label: formatCategoryName(category),
      href: `/faq/${category}`,
      isActive: !subcategory
    })
  }
  
  if (subcategory) {
    breadcrumbs.push({
      label: formatCategoryName(subcategory),
      href: `/faq/${category}/${subcategory}`,
      isActive: true
    })
  }
  
  return breadcrumbs
}

// CONTEXT7 SOURCE: /microsoft/typescript - String formatting patterns for display text
// TEXT FORMATTING: Convert slugs to human-readable category names
export function formatCategoryName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// CONTEXT7 SOURCE: /microsoft/typescript - Search filtering patterns for content discovery
// CATEGORY FILTERING: Filter categories and questions based on search criteria
export function filterFAQContentBySearch(
  categories: EnhancedFAQCategory[],
  searchQuery: string,
  filters: {
    segment?: string
    difficulty?: string
    category?: string
  } = {}
): {
  categories: EnhancedFAQCategory[]
  totalResults: number
  resultsByCategory: Record<string, number>
} {
  const query = searchQuery.toLowerCase().trim()
  const filteredCategories: EnhancedFAQCategory[] = []
  const resultsByCategory: Record<string, number> = {}
  let totalResults = 0
  
  categories.forEach(category => {
    // Apply category filter
    if (filters.category && category.slug !== filters.category) {
      return
    }
    
    // Filter questions within category
    const matchingQuestions = category.questions.filter(question => {
      // Search query matching
      const queryMatch = !query || 
        question.question.toLowerCase().includes(query) ||
        question.answer.toLowerCase().includes(query) ||
        question.tags.some(tag => tag.toLowerCase().includes(query)) ||
        question.searchKeywords.some(keyword => keyword.toLowerCase().includes(query))
      
      // Client segment filter
      const segmentMatch = !filters.segment || 
        question.clientSegment === filters.segment ||
        question.clientSegment === 'all'
      
      // Difficulty filter
      const difficultyMatch = !filters.difficulty || 
        question.difficulty === filters.difficulty
      
      return queryMatch && segmentMatch && difficultyMatch
    })
    
    if (matchingQuestions.length > 0) {
      filteredCategories.push({
        ...category,
        questions: matchingQuestions,
        totalQuestions: matchingQuestions.length
      })
      
      resultsByCategory[category.slug] = matchingQuestions.length
      totalResults += matchingQuestions.length
    }
  })
  
  return {
    categories: filteredCategories,
    totalResults,
    resultsByCategory
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Route parameter validation patterns
// ROUTE VALIDATION: Validate dynamic route parameters for category management
export function validateFAQRouteParams(
  categories: EnhancedFAQCategory[],
  params: FAQRouteParams
): {
  isValid: boolean
  category?: EnhancedFAQCategory
  subcategory?: EnhancedFAQSubcategory
  error?: string
} {
  const { category: categorySlug, subcategory: subcategorySlug } = params
  
  if (!categorySlug) {
    return { isValid: true } // Root FAQ page
  }
  
  const category = categories.find(cat => cat.slug === categorySlug)
  if (!category) {
    return {
      isValid: false,
      error: `Category '${categorySlug}' not found`
    }
  }
  
  if (!subcategorySlug) {
    return { isValid: true, category }
  }
  
  const subcategory = category.subcategories?.find(sub => 
    generateCategorySlug(sub.name) === subcategorySlug
  )
  
  if (!subcategory) {
    return {
      isValid: false,
      error: `Subcategory '${subcategorySlug}' not found in category '${categorySlug}'`
    }
  }
  
  return {
    isValid: true,
    category,
    subcategory: {
      ...subcategory,
      slug: subcategorySlug,
      parentCategorySlug: categorySlug,
      breadcrumbPath: ['FAQ', category.name, subcategory.name],
      seo: {
        title: `${subcategory.name} - ${category.name} FAQ | My Private Tutor Online`,
        description: subcategory.description,
        keywords: [subcategory.name.toLowerCase(), category.name.toLowerCase(), 'faq', 'help']
      },
      analytics: {
        views: 0,
        popularityRank: 0,
        conversionRate: 0
      }
    }
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Default export patterns for CMS modules
// Export enhanced category management functions
export default {
  enhanceFAQCategories,
  generateCategorySlug,
  generateFAQBreadcrumbs,
  filterFAQContentBySearch,
  validateFAQRouteParams,
  formatCategoryName
}