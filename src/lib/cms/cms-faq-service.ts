/**
 * CONTEXT7 SOURCE: /vercel/next.js - Service layer patterns for dynamic content management
 * CONTEXT7 SOURCE: /microsoft/typescript - Service class design patterns for data management
 * 
 * FAQ Category Management Service - Dynamic Category Generation
 * Service Layer Implementation for FAQ Category Management System
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through improved FAQ organization
 * CLIENT SEGMENTS: Oxbridge prep, 11+ parents, elite corporate, comparison shoppers
 * 
 * SERVICE CAPABILITIES:
 * - Dynamic category generation from CMS data
 * - Category filtering and search functionality  
 * - Analytics tracking and performance monitoring
 * - SEO optimization for category pages
 * - Route validation and parameter handling
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content via centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: CMS comment requirement
 * - Rule 25: Structured data management
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Import patterns for service dependencies
// CMS DATA SOURCE: Import CMS functions and enhanced category interfaces
import { getFAQContent, getVisibleFAQCategories, searchFAQQuestions } from './cms-faq'
import type { FAQContent, FAQCategory, FAQQuestion } from './cms-content'
import {
  enhanceFAQCategories,
  generateCategorySlug,
  generateFAQBreadcrumbs,
  filterFAQContentBySearch,
  validateFAQRouteParams,
  formatCategoryName,
  type EnhancedFAQCategory,
  type EnhancedFAQSubcategory,
  type FAQRouteParams,
  type FAQSearchParams,
  type FAQBreadcrumb,
  type FAQCategoryMenuItem
} from './cms-faq-categories'

// CONTEXT7 SOURCE: /microsoft/typescript - Service class patterns for business logic encapsulation
// FAQ SERVICE: Centralized service for FAQ category management operations
export class FAQCategoryService {
  private static instance: FAQCategoryService
  private categoriesCache: EnhancedFAQCategory[] | null = null
  private lastCacheUpdate: number = 0
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  // CONTEXT7 SOURCE: /microsoft/typescript - Singleton pattern for service instantiation
  // SINGLETON INSTANCE: Ensure single service instance for consistent data management
  public static getInstance(): FAQCategoryService {
    if (!FAQCategoryService.instance) {
      FAQCategoryService.instance = new FAQCategoryService()
    }
    return FAQCategoryService.instance
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Cache management patterns for performance optimization
  // CACHE MANAGEMENT: Intelligent caching for enhanced FAQ categories
  private shouldRefreshCache(): boolean {
    return !this.categoriesCache || 
           (Date.now() - this.lastCacheUpdate) > this.CACHE_TTL
  }

  private refreshCache(): void {
    const baseFAQContent = getFAQContent()
    const visibleCategories = getVisibleFAQCategories()
    this.categoriesCache = enhanceFAQCategories(visibleCategories)
    this.lastCacheUpdate = Date.now()
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Getter method patterns for data access
  // CATEGORY ACCESS: Get all enhanced FAQ categories with caching
  public getAllCategories(): EnhancedFAQCategory[] {
    if (this.shouldRefreshCache()) {
      this.refreshCache()
    }
    return this.categoriesCache || []
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Array filtering patterns for data retrieval
  // CATEGORY LOOKUP: Find specific category by slug with validation
  public getCategoryBySlug(slug: string): EnhancedFAQCategory | null {
    const categories = this.getAllCategories()
    return categories.find(category => category.slug === slug) || null
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Nested filtering patterns for subcategory access
  // SUBCATEGORY LOOKUP: Find subcategory within parent category
  public getSubcategoryBySlug(
    categorySlug: string, 
    subcategorySlug: string
  ): EnhancedFAQSubcategory | null {
    const category = this.getCategoryBySlug(categorySlug)
    if (!category || !category.subcategories) {
      return null
    }

    const subcategory = category.subcategories.find(sub => 
      generateCategorySlug(sub.name) === subcategorySlug
    )

    if (!subcategory) {
      return null
    }

    return {
      ...subcategory,
      slug: subcategorySlug,
      parentCategorySlug: categorySlug,
      breadcrumbPath: ['FAQ', category.name, subcategory.name],
      seo: {
        title: `${subcategory.name} - ${category.name} FAQ | My Private Tutor Online`,
        description: subcategory.description,
        keywords: [subcategory.name.toLowerCase(), category.name.toLowerCase(), 'faq', 'tutoring']
      },
      analytics: {
        views: 0,
        popularityRank: subcategory.order,
        conversionRate: 0
      }
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Search algorithm implementation for content discovery
  // SEARCH FUNCTIONALITY: Advanced search with filtering and ranking
  public searchFAQContent(
    query: string,
    filters: FAQSearchParams = {}
  ): {
    results: FAQQuestion[]
    categories: EnhancedFAQCategory[]
    totalResults: number
    searchMetadata: {
      query: string
      executionTime: number
      resultsByCategory: Record<string, number>
      suggestedFilters: string[]
    }
  } {
    const startTime = Date.now()
    const categories = this.getAllCategories()

    // Apply search and filters
    const searchResult = filterFAQContentBySearch(categories, query, {
      segment: filters.segment,
      difficulty: filters.difficulty,
      category: filters.category
    })

    // Extract all matching questions
    const results: FAQQuestion[] = []
    searchResult.categories.forEach(category => {
      results.push(...category.questions)
    })

    // Sort results by priority and relevance
    results.sort((a, b) => {
      // Prioritize featured questions
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      
      // Then by priority score
      return b.priority - a.priority
    })

    // Generate suggested filters
    const suggestedFilters = this.generateSearchSuggestions(results)

    const executionTime = Date.now() - startTime

    return {
      results: results.slice(0, 50), // Limit to top 50 results
      categories: searchResult.categories,
      totalResults: searchResult.totalResults,
      searchMetadata: {
        query,
        executionTime,
        resultsByCategory: searchResult.resultsByCategory,
        suggestedFilters
      }
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Suggestion algorithm patterns for enhanced UX
  // SEARCH SUGGESTIONS: Generate relevant filter suggestions based on results
  private generateSearchSuggestions(results: FAQQuestion[]): string[] {
    const suggestions = new Set<string>()

    // Add common tags from results
    results.forEach(result => {
      result.tags.slice(0, 3).forEach(tag => suggestions.add(tag))
    })

    // Add difficulty levels present in results
    const difficulties = new Set(results.map(r => r.difficulty))
    difficulties.forEach(difficulty => {
      suggestions.add(difficulty)
    })

    // Add client segments
    const segments = new Set(results.map(r => r.clientSegment))
    segments.forEach(segment => {
      if (segment !== 'all') {
        suggestions.add(segment.replace('_', ' '))
      }
    })

    return Array.from(suggestions).slice(0, 8)
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Route parameter validation for dynamic routing
  // ROUTE VALIDATION: Comprehensive validation for dynamic FAQ routes
  public validateRouteParams(params: FAQRouteParams): {
    isValid: boolean
    category?: EnhancedFAQCategory
    subcategory?: EnhancedFAQSubcategory
    error?: string
    redirect?: string
  } {
    const categories = this.getAllCategories()
    return validateFAQRouteParams(categories, params)
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Navigation generation patterns for menu systems
  // NAVIGATION MENU: Generate hierarchical navigation menu for categories
  public generateCategoryMenu(currentPath?: string): FAQCategoryMenuItem[] {
    const categories = this.getAllCategories()

    return categories.map(category => {
      const categoryPath = `/faq/${category.slug}`
      const isActive = currentPath === categoryPath

      const menuItem: FAQCategoryMenuItem = {
        id: category.id,
        label: category.name,
        href: categoryPath,
        icon: category.iconComponent,
        badge: category.totalQuestions > 0 ? category.totalQuestions.toString() : undefined,
        isActive,
        children: []
      }

      // Add subcategory children
      if (category.subcategories && category.subcategories.length > 0) {
        menuItem.children = category.subcategories.map(subcategory => {
          const subcategorySlug = generateCategorySlug(subcategory.name)
          const subcategoryPath = `/faq/${category.slug}/${subcategorySlug}`
          
          return {
            id: subcategory.id,
            label: subcategory.name,
            href: subcategoryPath,
            icon: 'ChevronRight',
            badge: subcategory.questionCount > 0 ? subcategory.questionCount.toString() : undefined,
            isActive: currentPath === subcategoryPath
          }
        })
      }

      return menuItem
    })
  }

  // CONTEXT7 SOURCE: /vercel/next.js - Breadcrumb generation for navigation hierarchy
  // BREADCRUMB NAVIGATION: Generate breadcrumb navigation for current page
  public generateBreadcrumbs(params: FAQRouteParams): FAQBreadcrumb[] {
    return generateFAQBreadcrumbs(params.category, params.subcategory)
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Analytics aggregation patterns for insights
  // ANALYTICS INSIGHTS: Generate category performance insights
  public getCategoryAnalytics(categorySlug?: string): {
    overview: {
      totalCategories: number
      totalQuestions: number
      totalViews: number
      averageHelpfulness: number
    }
    topCategories: Array<{
      slug: string
      name: string
      views: number
      questions: number
      helpfulness: number
    }>
    categoryBreakdown?: {
      category: EnhancedFAQCategory
      performance: {
        viewsPerQuestion: number
        popularQuestions: string[]
        conversionRate: number
      }
    }
  } {
    const categories = this.getAllCategories()

    // Calculate overview metrics
    const overview = {
      totalCategories: categories.length,
      totalQuestions: categories.reduce((sum, cat) => sum + cat.totalQuestions, 0),
      totalViews: categories.reduce((sum, cat) => sum + cat.analytics.totalViews, 0),
      averageHelpfulness: categories.reduce((sum, cat) => sum + cat.analytics.helpfulnessRating, 0) / categories.length
    }

    // Generate top categories
    const topCategories = categories
      .sort((a, b) => b.analytics.totalViews - a.analytics.totalViews)
      .slice(0, 5)
      .map(category => ({
        slug: category.slug,
        name: category.name,
        views: category.analytics.totalViews,
        questions: category.totalQuestions,
        helpfulness: category.analytics.helpfulnessRating
      }))

    // Category-specific breakdown if requested
    let categoryBreakdown
    if (categorySlug) {
      const category = this.getCategoryBySlug(categorySlug)
      if (category) {
        categoryBreakdown = {
          category,
          performance: {
            viewsPerQuestion: category.totalQuestions > 0 
              ? category.analytics.totalViews / category.totalQuestions 
              : 0,
            popularQuestions: category.analytics.topQuestions.slice(0, 5),
            conversionRate: category.analytics.conversionRate
          }
        }
      }
    }

    return {
      overview,
      topCategories,
      categoryBreakdown
    }
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Static generation patterns for build-time optimization
  // STATIC GENERATION: Generate static paths for build-time pre-rendering
  public generateStaticPaths(): Array<{ params: FAQRouteParams }> {
    const categories = this.getAllCategories()
    const paths: Array<{ params: FAQRouteParams }> = []

    // Add category paths
    categories.forEach(category => {
      paths.push({
        params: { category: category.slug }
      })

      // Add subcategory paths
      if (category.subcategories) {
        category.subcategories.forEach(subcategory => {
          paths.push({
            params: {
              category: category.slug,
              subcategory: generateCategorySlug(subcategory.name)
            }
          })
        })
      }
    })

    return paths
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Cache invalidation patterns for data consistency
  // CACHE MANAGEMENT: Force cache refresh for updated content
  public invalidateCache(): void {
    this.categoriesCache = null
    this.lastCacheUpdate = 0
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Health check patterns for service monitoring
  // SERVICE HEALTH: Monitor service health and data integrity
  public getServiceHealth(): {
    status: 'healthy' | 'degraded' | 'unhealthy'
    metrics: {
      cacheHitRate: number
      averageResponseTime: number
      dataIntegrity: boolean
    }
    lastUpdate: string
  } {
    const categories = this.getAllCategories()
    const dataIntegrity = categories.length > 0 && 
                         categories.every(cat => cat.totalQuestions > 0)

    return {
      status: dataIntegrity ? 'healthy' : 'degraded',
      metrics: {
        cacheHitRate: this.categoriesCache ? 1 : 0,
        averageResponseTime: 50, // Mock value
        dataIntegrity
      },
      lastUpdate: new Date(this.lastCacheUpdate).toISOString()
    }
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Factory function patterns for service access
// SERVICE FACTORY: Convenient access to FAQ category service instance
export const faqCategoryService = FAQCategoryService.getInstance()

// CONTEXT7 SOURCE: /microsoft/typescript - Utility function exports for common operations
// UTILITY FUNCTIONS: Export commonly used category utilities
export {
  generateCategorySlug,
  formatCategoryName,
  generateFAQBreadcrumbs
} from './cms-faq-categories'

// CONTEXT7 SOURCE: /microsoft/typescript - Default export for clean imports
export default faqCategoryService