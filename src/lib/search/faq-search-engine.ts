/**
 * CONTEXT7 SOURCE: /krisk/fuse - Advanced fuzzy search implementation for FAQ system
 * SEARCH FOUNDATION: Comprehensive search engine with fuzzy matching, relevance scoring, and highlighting
 * 
 * FAQ Search Engine - Advanced Fuzzy Search Implementation
 * Features comprehensive search with <100ms response time target
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through enhanced search experience  
 * PERFORMANCE TARGET: <100ms search response for optimal user experience
 * SEARCH CAPABILITIES: Fuzzy matching, keyword highlighting, relevance scoring
 * 
 * FEATURES:
 * - Fuse.js integration for fuzzy search
 * - Multi-field search (questions, answers, tags, keywords)
 * - Relevance scoring and result ranking
 * - Keyword highlighting in results  
 * - Search suggestions and autocomplete
 * - Client-side optimized performance
 * - Search analytics integration
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content via centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: CMS comment requirement
 * - Rule 25: Structured data management
 */

import Fuse from 'fuse.js'
import type { FAQQuestion, FAQCategory } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /krisk/fuse - Search configuration interface patterns
// SEARCH CONFIGURATION: Comprehensive search options for optimal performance
export interface FAQSearchConfig {
  // Fuse.js core options
  threshold: number        // 0.4 for balanced fuzzy matching
  distance: number         // Search distance for location matching
  includeScore: boolean    // Include relevance scores
  includeMatches: boolean  // Include match indices for highlighting
  minMatchCharLength: number // Minimum match character length
  ignoreLocation: boolean  // Ignore location for broad matching
  useExtendedSearch: boolean // Enable advanced search patterns
  
  // Custom search options
  maxResults: number       // Maximum results to return
  boostRecent: boolean     // Boost recently updated content
  boostFeatured: boolean   // Boost featured questions
  clientSegmentBoost: string | null // Boost specific client segment
}

// CONTEXT7 SOURCE: /krisk/fuse - Search result interface with enhanced metadata
// SEARCH RESULTS: Comprehensive result structure with match highlighting
export interface FAQSearchResult {
  item: FAQQuestion
  score?: number
  matches?: Fuse.FuseResultMatch[]
  category?: FAQCategory
  highlighted: {
    question: string
    answer: string
    tags: string[]
  }
  relevanceFactors: {
    textMatch: number
    categoryMatch: number
    priorityBoost: number
    recentBoost: number
    clientSegmentMatch: number
  }
}

// CONTEXT7 SOURCE: /krisk/fuse - Search metadata interface for analytics
// SEARCH METADATA: Performance and suggestion data for search enhancement  
export interface FAQSearchMetadata {
  query: string
  totalResults: number
  executionTime: number
  suggestions: string[]
  didYouMean?: string
  filters: {
    categories: string[]
    difficulties: string[]
    segments: string[]
  }
  performance: {
    indexSize: number
    searchTime: number
    processingTime: number
  }
}

// CONTEXT7 SOURCE: /krisk/fuse - Search keys configuration for multi-field search
// SEARCH FIELDS: Weighted search keys for comprehensive FAQ search
const SEARCH_KEYS = [
  // Primary search fields with high weights
  { name: 'question', weight: 0.4 },
  { name: 'answer', weight: 0.3 },
  
  // Secondary search fields with medium weights  
  { name: 'searchKeywords', weight: 0.15 },
  { name: 'tags', weight: 0.1 },
  
  // Tertiary search fields with low weights
  { name: 'category', weight: 0.03 },
  { name: 'subcategory', weight: 0.02 }
] as const

// CONTEXT7 SOURCE: /krisk/fuse - Default search configuration optimized for FAQ search
// DEFAULT CONFIG: Performance-optimized settings for <100ms response time
const DEFAULT_SEARCH_CONFIG: FAQSearchConfig = {
  // Fuse.js optimization settings
  threshold: 0.4,           // Balanced fuzzy matching threshold
  distance: 100,            // Reasonable search distance
  includeScore: true,       // Enable relevance scoring
  includeMatches: true,     // Enable match highlighting
  minMatchCharLength: 2,    // Minimum 2 character matches
  ignoreLocation: true,     // Ignore position for broad matching
  useExtendedSearch: false, // Disable for performance (basic search)
  
  // Performance optimization
  maxResults: 50,           // Limit results for performance
  boostRecent: true,        // Boost recently updated content
  boostFeatured: true,      // Boost featured questions
  clientSegmentBoost: null  // No default client segment boost
}

/**
 * FAQ Search Engine - Advanced Fuzzy Search Implementation
 * CONTEXT7 SOURCE: /krisk/fuse - Comprehensive search engine with performance optimization
 * SEARCH ENGINE: <100ms response time with fuzzy matching and highlighting
 */
export class FAQSearchEngine {
  private fuse: Fuse<FAQQuestion>
  private config: FAQSearchConfig
  private categories: FAQCategory[]
  private questionMap: Map<string, FAQQuestion>
  private categoryMap: Map<string, FAQCategory>
  private searchHistory: string[] = []
  
  /**
   * Initialize FAQ Search Engine
   * CONTEXT7 SOURCE: /krisk/fuse - Search engine initialization with optimized index
   * INITIALIZATION: Build search index with performance optimization
   */
  constructor(
    questions: FAQQuestion[], 
    categories: FAQCategory[], 
    config: Partial<FAQSearchConfig> = {}
  ) {
    this.config = { ...DEFAULT_SEARCH_CONFIG, ...config }
    this.categories = categories
    
    // CONTEXT7 SOURCE: /krisk/fuse - Fuse.js initialization with weighted keys
    // INDEX CREATION: Optimized search index for multi-field search
    const fuseOptions: Fuse.IFuseOptions<FAQQuestion> = {
      keys: SEARCH_KEYS,
      threshold: this.config.threshold,
      distance: this.config.distance,
      includeScore: this.config.includeScore,
      includeMatches: this.config.includeMatches,
      minMatchCharLength: this.config.minMatchCharLength,
      ignoreLocation: this.config.ignoreLocation,
      useExtendedSearch: this.config.useExtendedSearch,
      // CONTEXT7 SOURCE: /krisk/fuse - Field norm optimization for consistent scoring
      // FIELD NORMALIZATION: Consistent relevance scoring across different content lengths
      ignoreFieldNorm: false,
      fieldNormWeight: 1
    }

    // Build optimized lookup maps for performance
    this.questionMap = new Map(questions.map(q => [q.id, q]))
    this.categoryMap = new Map(categories.map(c => [c.id, c]))
    
    // CONTEXT7 SOURCE: /krisk/fuse - Search index initialization
    // FUSE INITIALIZATION: Create search index with performance optimization
    this.fuse = new Fuse(questions, fuseOptions)
  }

  /**
   * Perform comprehensive FAQ search
   * CONTEXT7 SOURCE: /krisk/fuse - Advanced search with result processing
   * SEARCH EXECUTION: <100ms response time with comprehensive result processing
   */
  async search(
    query: string,
    filters: {
      category?: string
      difficulty?: string
      clientSegment?: string
      featured?: boolean
      limit?: number
    } = {}
  ): Promise<{
    results: FAQSearchResult[]
    metadata: FAQSearchMetadata
  }> {
    const startTime = performance.now()
    
    // Input sanitization and validation
    const sanitizedQuery = query.trim()
    if (!sanitizedQuery) {
      return {
        results: [],
        metadata: this.createEmptyMetadata(query, performance.now() - startTime)
      }
    }

    // CONTEXT7 SOURCE: /krisk/fuse - Core search execution  
    // FUZZY SEARCH: Execute fuzzy search with Fuse.js
    const searchResults = this.fuse.search(sanitizedQuery, {
      limit: filters.limit || this.config.maxResults
    })

    // Process and enhance results
    const processedResults = await this.processSearchResults(
      searchResults,
      sanitizedQuery,
      filters
    )

    // Apply additional filters
    const filteredResults = this.applyFilters(processedResults, filters)

    // Sort by relevance and apply boosts
    const sortedResults = this.applyScoringBoosts(filteredResults, filters)

    // Limit final results
    const finalResults = sortedResults.slice(0, filters.limit || this.config.maxResults)

    const executionTime = performance.now() - startTime

    // Update search history for suggestions
    this.updateSearchHistory(sanitizedQuery)

    return {
      results: finalResults,
      metadata: this.createSearchMetadata(
        sanitizedQuery,
        finalResults.length,
        executionTime,
        filters
      )
    }
  }

  /**
   * Process search results with highlighting and category enrichment
   * CONTEXT7 SOURCE: /krisk/fuse - Result processing with match highlighting
   * RESULT PROCESSING: Enhanced results with highlighting and metadata
   */
  private async processSearchResults(
    searchResults: Fuse.FuseResult<FAQQuestion>[],
    query: string,
    filters: any
  ): Promise<FAQSearchResult[]> {
    return searchResults.map(result => {
      const question = result.item
      const category = this.categoryMap.get(question.category)
      
      return {
        item: question,
        score: result.score,
        matches: result.matches,
        category,
        highlighted: this.highlightMatches(question, result.matches || [], query),
        relevanceFactors: this.calculateRelevanceFactors(question, query, filters)
      }
    })
  }

  /**
   * Highlight search matches in content
   * CONTEXT7 SOURCE: /krisk/fuse - Match highlighting with HTML formatting
   * HIGHLIGHTING: Keyword highlighting for search result enhancement
   */
  private highlightMatches(
    question: FAQQuestion,
    matches: Fuse.FuseResultMatch[],
    query: string
  ): FAQSearchResult['highlighted'] {
    const highlighted = {
      question: question.question,
      answer: question.answer,
      tags: [...question.tags]
    }

    // CONTEXT7 SOURCE: /krisk/fuse - Match index processing for highlighting
    // MATCH HIGHLIGHTING: Process Fuse.js match indices for keyword highlighting
    matches.forEach(match => {
      if (!match.indices || !match.value) return
      
      const highlightedText = this.applyHighlighting(match.value, match.indices)
      
      switch (match.key) {
        case 'question':
          highlighted.question = highlightedText
          break
        case 'answer':
          highlighted.answer = highlightedText
          break
        case 'tags':
          if (typeof match.refIndex === 'number' && match.refIndex < highlighted.tags.length) {
            highlighted.tags[match.refIndex] = highlightedText
          }
          break
      }
    })

    return highlighted
  }

  /**
   * Apply highlighting to text based on match indices
   * CONTEXT7 SOURCE: /krisk/fuse - Text highlighting utility function
   * TEXT HIGHLIGHTING: HTML markup for matched text segments
   */
  private applyHighlighting(text: string, indices: readonly Fuse.RangeTuple[]): string {
    let highlightedText = ''
    let lastIndex = 0

    // Sort indices to process them in order
    const sortedIndices = [...indices].sort(([a], [b]) => a - b)

    sortedIndices.forEach(([start, end]) => {
      // Add text before the match
      highlightedText += text.slice(lastIndex, start)
      // Add highlighted match
      highlightedText += `<mark class="bg-yellow-200 text-yellow-900 px-1 py-0.5 rounded">${text.slice(start, end + 1)}</mark>`
      lastIndex = end + 1
    })

    // Add remaining text
    highlightedText += text.slice(lastIndex)
    
    return highlightedText
  }

  /**
   * Calculate relevance factors for scoring
   * CONTEXT7 SOURCE: /krisk/fuse - Relevance scoring enhancement
   * RELEVANCE SCORING: Multi-factor scoring for search result ranking
   */
  private calculateRelevanceFactors(
    question: FAQQuestion,
    query: string,
    filters: any
  ): FAQSearchResult['relevanceFactors'] {
    return {
      textMatch: this.calculateTextMatchScore(question, query),
      categoryMatch: filters.category === question.category ? 1.0 : 0.0,
      priorityBoost: question.priority / 10,
      recentBoost: this.calculateRecencyBoost(question.lastUpdated),
      clientSegmentMatch: this.calculateClientSegmentScore(question, filters.clientSegment)
    }
  }

  /**
   * Calculate text match score
   * CONTEXT7 SOURCE: /krisk/fuse - Text similarity scoring
   * TEXT MATCHING: Enhanced text similarity calculation
   */
  private calculateTextMatchScore(question: FAQQuestion, query: string): number {
    const queryLower = query.toLowerCase()
    const questionLower = question.question.toLowerCase()
    const answerLower = question.answer.toLowerCase()
    
    // Exact phrase bonus
    const exactQuestionMatch = questionLower.includes(queryLower) ? 0.5 : 0
    const exactAnswerMatch = answerLower.includes(queryLower) ? 0.3 : 0
    
    // Keyword density score  
    const keywordMatches = question.searchKeywords.filter(keyword => 
      keyword.toLowerCase().includes(queryLower) || queryLower.includes(keyword.toLowerCase())
    ).length
    const keywordScore = Math.min(keywordMatches * 0.1, 0.2)
    
    return Math.min(exactQuestionMatch + exactAnswerMatch + keywordScore, 1.0)
  }

  /**
   * Calculate recency boost score
   * CONTEXT7 SOURCE: /krisk/fuse - Time-based relevance scoring
   * RECENCY SCORING: Boost recently updated content
   */
  private calculateRecencyBoost(lastUpdated: string): number {
    if (!this.config.boostRecent) return 0
    
    const now = Date.now()
    const updateTime = new Date(lastUpdated).getTime()
    const daysSinceUpdate = (now - updateTime) / (1000 * 60 * 60 * 24)
    
    // Linear decay over 90 days
    return Math.max(0, Math.min(1, (90 - daysSinceUpdate) / 90)) * 0.1
  }

  /**
   * Calculate client segment matching score
   * CONTEXT7 SOURCE: /krisk/fuse - Segment-based relevance scoring
   * CLIENT SEGMENTATION: Targeted content relevance scoring
   */
  private calculateClientSegmentScore(question: FAQQuestion, targetSegment?: string): number {
    if (!targetSegment || !question.clientSegment) return 0
    
    // Exact match bonus
    if (question.clientSegment === targetSegment) return 0.2
    
    // Universal content applies to all segments
    if (question.clientSegment === 'all') return 0.1
    
    return 0
  }

  /**
   * Apply search filters to results
   * CONTEXT7 SOURCE: /krisk/fuse - Result filtering functionality
   * RESULT FILTERING: Apply search filters for targeted results
   */
  private applyFilters(
    results: FAQSearchResult[],
    filters: any
  ): FAQSearchResult[] {
    return results.filter(result => {
      const question = result.item
      
      // Category filter
      if (filters.category && question.category !== filters.category) {
        return false
      }
      
      // Difficulty filter
      if (filters.difficulty && question.difficulty !== filters.difficulty) {
        return false
      }
      
      // Client segment filter
      if (filters.clientSegment && 
          question.clientSegment !== filters.clientSegment && 
          question.clientSegment !== 'all') {
        return false
      }
      
      // Featured filter
      if (filters.featured !== undefined && question.featured !== filters.featured) {
        return false
      }
      
      return true
    })
  }

  /**
   * Apply scoring boosts and sort results
   * CONTEXT7 SOURCE: /krisk/fuse - Enhanced relevance scoring
   * SCORING BOOSTS: Apply relevance boosts for optimal result ranking
   */
  private applyScoringBoosts(
    results: FAQSearchResult[],
    filters: any
  ): FAQSearchResult[] {
    return results.map(result => {
      const factors = result.relevanceFactors
      const baseScore = result.score || 0
      
      // Calculate boost multiplier
      const boostMultiplier = 1 + 
        factors.categoryMatch * 0.2 +
        factors.priorityBoost * 0.1 +
        factors.recentBoost +
        factors.clientSegmentMatch +
        factors.textMatch * 0.15
      
      // Apply featured boost
      const featuredBoost = result.item.featured && this.config.boostFeatured ? 0.9 : 1.0
      
      return {
        ...result,
        score: baseScore * boostMultiplier * featuredBoost
      }
    }).sort((a, b) => {
      // Sort by enhanced score (lower scores are better in Fuse.js)
      const scoreA = a.score || 1
      const scoreB = b.score || 1
      
      if (scoreA !== scoreB) {
        return scoreA - scoreB
      }
      
      // Secondary sort by priority
      return b.item.priority - a.item.priority
    })
  }

  /**
   * Generate search suggestions based on history and content
   * CONTEXT7 SOURCE: /krisk/fuse - Search suggestion generation
   * SUGGESTIONS: Intelligent search suggestions for user experience
   */
  getSearchSuggestions(query: string, limit = 5): string[] {
    const queryLower = query.toLowerCase()
    const suggestions: Set<string> = new Set()
    
    // Add matches from search keywords
    this.questionMap.forEach(question => {
      question.searchKeywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(queryLower) && 
            keyword.toLowerCase() !== queryLower) {
          suggestions.add(keyword)
        }
      })
      
      // Add tag suggestions  
      question.tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower) && 
            tag.toLowerCase() !== queryLower) {
          suggestions.add(tag)
        }
      })
    })
    
    // Add category name suggestions
    this.categories.forEach(category => {
      if (category.name.toLowerCase().includes(queryLower) &&
          category.name.toLowerCase() !== queryLower) {
        suggestions.add(category.name)
      }
    })
    
    return Array.from(suggestions).slice(0, limit)
  }

  /**
   * Update search history for suggestion enhancement
   * CONTEXT7 SOURCE: /krisk/fuse - Search history management
   * SEARCH HISTORY: Track searches for improved suggestions
   */
  private updateSearchHistory(query: string): void {
    this.searchHistory.unshift(query)
    // Keep only last 100 searches
    if (this.searchHistory.length > 100) {
      this.searchHistory = this.searchHistory.slice(0, 100)
    }
  }

  /**
   * Create search metadata for analytics and performance tracking
   * CONTEXT7 SOURCE: /krisk/fuse - Search analytics metadata
   * SEARCH METADATA: Performance and analytics data collection
   */
  private createSearchMetadata(
    query: string,
    resultCount: number,
    executionTime: number,
    filters: any
  ): FAQSearchMetadata {
    return {
      query,
      totalResults: resultCount,
      executionTime: Math.round(executionTime * 100) / 100, // Round to 2 decimal places
      suggestions: this.getSearchSuggestions(query),
      filters: {
        categories: this.categories.map(c => c.name),
        difficulties: ['basic', 'intermediate', 'advanced'],
        segments: ['oxbridge_prep', '11_plus', 'elite_corporate', 'comparison_shopper']
      },
      performance: {
        indexSize: this.fuse.getIndex().size(),
        searchTime: executionTime,
        processingTime: 0 // Placeholder for processing time tracking
      }
    }
  }

  /**
   * Create empty metadata for no results
   * CONTEXT7 SOURCE: /krisk/fuse - Empty state metadata
   * EMPTY METADATA: Default metadata for empty search results
   */
  private createEmptyMetadata(query: string, executionTime: number): FAQSearchMetadata {
    return {
      query,
      totalResults: 0,
      executionTime: Math.round(executionTime * 100) / 100,
      suggestions: this.getSearchSuggestions(query),
      filters: {
        categories: [],
        difficulties: [],
        segments: []
      },
      performance: {
        indexSize: 0,
        searchTime: executionTime,
        processingTime: 0
      }
    }
  }
}

/**
 * Create optimized FAQ search engine instance
 * CONTEXT7 SOURCE: /krisk/fuse - Factory function for search engine creation
 * FACTORY FUNCTION: Create configured search engine instance
 */
export function createFAQSearchEngine(
  questions: FAQQuestion[],
  categories: FAQCategory[],
  config?: Partial<FAQSearchConfig>
): FAQSearchEngine {
  return new FAQSearchEngine(questions, categories, config)
}

/**
 * Search performance utilities
 * CONTEXT7 SOURCE: /krisk/fuse - Performance measurement utilities
 * PERFORMANCE UTILS: Search performance monitoring and optimization
 */
export const SearchPerformanceUtils = {
  /**
   * Measure search performance
   */
  measureSearchTime: async <T>(
    searchFn: () => Promise<T>
  ): Promise<{ result: T; executionTime: number }> => {
    const startTime = performance.now()
    const result = await searchFn()
    const executionTime = performance.now() - startTime
    
    return { result, executionTime }
  },

  /**
   * Validate search performance against targets
   */
  validatePerformance: (executionTime: number): {
    meetsTarget: boolean
    performance: 'excellent' | 'good' | 'acceptable' | 'poor'
  } => {
    const meetsTarget = executionTime < 100 // <100ms target
    
    let performance: 'excellent' | 'good' | 'acceptable' | 'poor'
    if (executionTime < 50) performance = 'excellent'
    else if (executionTime < 100) performance = 'good'
    else if (executionTime < 200) performance = 'acceptable'
    else performance = 'poor'
    
    return { meetsTarget, performance }
  }
}