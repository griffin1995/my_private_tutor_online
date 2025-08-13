/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Custom React hooks for search functionality
 * SEARCH HOOK: React hook for FAQ search with performance optimization and state management
 * 
 * FAQ Search Hook - Client-side Search with <100ms Response Time
 * Optimized React hook for fuzzy search functionality with debouncing
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through enhanced search experience
 * PERFORMANCE TARGET: <100ms search response with intelligent debouncing
 * FEATURES: Real-time search, suggestions, analytics tracking
 * 
 * FEATURES:
 * - Real-time fuzzy search with debouncing
 * - Search suggestions and autocomplete
 * - Performance monitoring and analytics
 * - State management for search UI
 * - Error handling and loading states
 * - Search history management
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content via centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: CMS comment requirement
 * - Rule 25: Structured data management
 */

'use client'

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { 
  FAQSearchEngine, 
  FAQSearchResult, 
  FAQSearchMetadata,
  createFAQSearchEngine,
  SearchPerformanceUtils
} from './faq-search-engine'
import type { FAQQuestion, FAQCategory } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /appbaseio/reactivesearch - Advanced filter interface integration
// ADVANCED SEARCH FILTERS: Extended filtering interface for comprehensive FAQ search
import type { AdvancedSearchFilters } from '@/components/faq/faq-advanced-search-filters'

// CONTEXT7 SOURCE: /reactjs/react.dev - Hook interface patterns for TypeScript
// SEARCH FILTERS: Interface for search filtering options (legacy compatibility)
export interface SearchFilters {
  category?: string
  difficulty?: 'basic' | 'intermediate' | 'advanced'
  clientSegment?: 'oxbridge_prep' | '11_plus' | 'elite_corporate' | 'comparison_shopper' | 'all'
  featured?: boolean
  limit?: number
}

// CONTEXT7 SOURCE: /appbaseio/reactivesearch - Extended search filters for advanced functionality
// EXTENDED FILTERS: Comprehensive filtering interface combining basic and advanced options
export type ExtendedSearchFilters = SearchFilters & Partial<AdvancedSearchFilters>

// CONTEXT7 SOURCE: /reactjs/react.dev - Hook state interface patterns
// SEARCH STATE: Comprehensive search state management interface
export interface FAQSearchState {
  // Search input and results
  query: string
  results: FAQSearchResult[]
  metadata: FAQSearchMetadata | null
  
  // UI state
  isSearching: boolean
  hasSearched: boolean
  error: string | null
  
  // Filters and options
  filters: ExtendedSearchFilters
  suggestions: string[]
  
  // Performance tracking
  lastSearchTime: number
  performanceStats: {
    averageSearchTime: number
    totalSearches: number
    performanceRating: 'excellent' | 'good' | 'acceptable' | 'poor'
  }
  
  // Search history
  searchHistory: string[]
  recentSearches: string[]
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Hook return interface patterns  
// SEARCH HOOK RETURN: Comprehensive hook return interface
export interface FAQSearchHook {
  // Search state
  state: FAQSearchState
  
  // Search actions
  search: (query: string, filters?: ExtendedSearchFilters) => Promise<void>
  clearSearch: () => void
  setQuery: (query: string) => void
  setFilters: (filters: Partial<ExtendedSearchFilters>) => void
  
  // Suggestion actions
  getSuggestions: (query: string) => string[]
  selectSuggestion: (suggestion: string) => void
  
  // Utility functions
  highlightQuery: (text: string, query: string) => string
  getPerformanceReport: () => {
    meetsTargets: boolean
    recommendations: string[]
  }
  
  // Search engine instance (for advanced usage)
  searchEngine: FAQSearchEngine | null
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Default hook options interface
// HOOK OPTIONS: Configuration options for search hook
export interface UseFAQSearchOptions {
  debounceMs?: number
  maxSuggestions?: number
  enableAnalytics?: boolean
  performanceTracking?: boolean
  autoSearch?: boolean
  minQueryLength?: number
}

/**
 * FAQ Search Hook - Advanced Client-side Search
 * CONTEXT7 SOURCE: /reactjs/react.dev - Custom hook patterns for complex state management
 * SEARCH HOOK: <100ms response time with comprehensive search functionality
 */
export function useFAQSearch(
  questions: FAQQuestion[],
  categories: FAQCategory[],
  options: UseFAQSearchOptions = {}
): FAQSearchHook {
  const {
    debounceMs = 150,
    maxSuggestions = 5,
    enableAnalytics = true,
    performanceTracking = true,
    autoSearch = true,
    minQueryLength = 2
  } = options

  // CONTEXT7 SOURCE: /reactjs/react.dev - useRef for performance optimization
  // SEARCH ENGINE: Memoized search engine instance for optimal performance
  const searchEngine = useMemo(() => {
    if (!questions.length || !categories.length) return null
    return createFAQSearchEngine(questions, categories, {
      maxResults: 50,
      boostRecent: true,
      boostFeatured: true
    })
  }, [questions, categories])

  // Performance tracking refs
  const searchTimesRef = useRef<number[]>([])
  const totalSearchesRef = useRef(0)

  // CONTEXT7 SOURCE: /reactjs/react.dev - useState for complex state management
  // SEARCH STATE: Comprehensive search state initialization
  const [state, setState] = useState<FAQSearchState>({
    query: '',
    results: [],
    metadata: null,
    isSearching: false,
    hasSearched: false,
    error: null,
    filters: {},
    suggestions: [],
    lastSearchTime: 0,
    performanceStats: {
      averageSearchTime: 0,
      totalSearches: 0,
      performanceRating: 'excellent'
    },
    searchHistory: [],
    recentSearches: []
  })

  /**
   * Process advanced filters to basic search engine format
   * CONTEXT7 SOURCE: /appbaseio/reactivesearch - Filter processing for complex search queries
   * FILTER PROCESSING: Convert advanced filters to search engine compatible format
   */
  const processAdvancedFilters = useCallback((filters: ExtendedSearchFilters) => {
    const basicFilters: any = {
      category: filters.category,
      difficulty: filters.difficulty || filters.answerComplexity,
      clientSegment: filters.clientSegment || (filters.clientSegments?.[0]),
      featured: filters.featured || filters.featuredOnly,
      limit: filters.limit
    }

    // Remove undefined values
    return Object.fromEntries(
      Object.entries(basicFilters).filter(([_, value]) => value !== undefined)
    )
  }, [])

  /**
   * Apply advanced filtering logic to search results
   * CONTEXT7 SOURCE: /appbaseio/reactivesearch - Post-search filtering for advanced criteria
   * ADVANCED FILTERING: Apply complex filters that require post-processing
   */
  const applyAdvancedFilters = useCallback((
    results: FAQSearchResult[], 
    filters: ExtendedSearchFilters
  ): FAQSearchResult[] => {
    let filteredResults = [...results]

    // Multi-category filtering with AND/OR logic
    if (filters.categories && filters.categories.length > 0) {
      filteredResults = filteredResults.filter(result => {
        if (filters.categoryLogic === 'AND') {
          return filters.categories!.every(cat => result.item.category === cat)
        } else {
          return filters.categories!.some(cat => result.item.category === cat)
        }
      })
    }

    // Date range filtering
    if (filters.dateRange) {
      const now = new Date()
      let dateFrom: Date | undefined
      let dateTo: Date | undefined

      if (filters.dateRange.preset) {
        switch (filters.dateRange.preset) {
          case 'today':
            dateFrom = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            break
          case 'week':
            dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            break
          case 'month':
            dateFrom = new Date(now.getFullYear(), now.getMonth(), 1)
            break
          case 'quarter':
            const quarter = Math.floor(now.getMonth() / 3)
            dateFrom = new Date(now.getFullYear(), quarter * 3, 1)
            break
          case 'year':
            dateFrom = new Date(now.getFullYear(), 0, 1)
            break
        }
      } else {
        dateFrom = filters.dateRange.from
        dateTo = filters.dateRange.to
      }

      if (dateFrom || dateTo) {
        filteredResults = filteredResults.filter(result => {
          const itemDate = new Date(result.item.lastUpdated)
          if (dateFrom && itemDate < dateFrom) return false
          if (dateTo && itemDate > dateTo) return false
          return true
        })
      }
    }

    // Tag filtering with inclusion/exclusion
    if (filters.includeTags && filters.includeTags.length > 0) {
      filteredResults = filteredResults.filter(result => {
        const itemTags = result.item.tags || []
        return filters.tagLogic === 'AND'
          ? filters.includeTags!.every(tag => itemTags.includes(tag))
          : filters.includeTags!.some(tag => itemTags.includes(tag))
      })
    }

    if (filters.excludeTags && filters.excludeTags.length > 0) {
      filteredResults = filteredResults.filter(result => {
        const itemTags = result.item.tags || []
        return !filters.excludeTags!.some(tag => itemTags.includes(tag))
      })
    }

    // Popularity and engagement filtering
    if (filters.minViews) {
      filteredResults = filteredResults.filter(result => 
        (result.item.analytics?.views || 0) >= filters.minViews!
      )
    }

    if (filters.minRating) {
      filteredResults = filteredResults.filter(result => {
        const analytics = result.item.analytics
        if (!analytics || !analytics.helpful || !analytics.notHelpful) return false
        const rating = analytics.helpful / (analytics.helpful + analytics.notHelpful) * 5
        return rating >= filters.minRating!
      })
    }

    if (filters.minHelpfulness) {
      filteredResults = filteredResults.filter(result => {
        const analytics = result.item.analytics
        if (!analytics || !analytics.helpful || !analytics.notHelpful) return false
        const helpfulness = (analytics.helpful / (analytics.helpful + analytics.notHelpful)) * 100
        return helpfulness >= filters.minHelpfulness!
      })
    }

    if (filters.showTrending) {
      filteredResults = filteredResults.filter(result => 
        result.item.analytics?.trending === true
      )
    }

    // Content characteristics filtering
    if (filters.contentLength && filters.contentLength !== 'any') {
      filteredResults = filteredResults.filter(result => {
        const wordCount = (result.item.question + ' ' + result.item.answer).split(' ').length
        switch (filters.contentLength) {
          case 'short': return wordCount < 200
          case 'medium': return wordCount >= 200 && wordCount <= 500
          case 'long': return wordCount > 500
          default: return true
        }
      })
    }

    if (filters.readingTime) {
      filteredResults = filteredResults.filter(result => {
        const readingTime = result.item.estimatedReadTime || 0
        if (filters.readingTime!.min && readingTime < filters.readingTime!.min) return false
        if (filters.readingTime!.max && readingTime > filters.readingTime!.max) return false
        return true
      })
    }

    // Client segmentation filtering
    if (filters.clientSegments && filters.clientSegments.length > 0) {
      filteredResults = filteredResults.filter(result =>
        filters.clientSegments!.includes(result.item.clientSegment || '') ||
        result.item.clientSegment === 'all'
      )
    }

    // Journey stage filtering (would require additional metadata)
    if (filters.journeyStage && filters.journeyStage !== 'any') {
      // This would require additional metadata on FAQ items
      // For now, we'll implement a basic mapping based on tags or categories
      filteredResults = filteredResults.filter(result => {
        const tags = result.item.tags || []
        const category = result.item.category || ''
        
        switch (filters.journeyStage) {
          case 'awareness':
            return tags.includes('introduction') || category.includes('overview')
          case 'consideration':
            return tags.includes('comparison') || tags.includes('options')
          case 'decision':
            return tags.includes('pricing') || tags.includes('booking')
          case 'retention':
            return tags.includes('support') || tags.includes('ongoing')
          default:
            return true
        }
      })
    }

    // Priority range filtering
    if (filters.priorityRange) {
      filteredResults = filteredResults.filter(result => {
        const priority = result.item.priority || 5
        return priority >= filters.priorityRange!.min && priority <= filters.priorityRange!.max
      })
    }

    return filteredResults
  }, [])

  /**
   * Execute search with performance tracking and advanced filtering
   * CONTEXT7 SOURCE: /reactjs/react.dev - useCallback for performance optimization
   * SEARCH EXECUTION: Debounced search with performance monitoring and advanced filters
   */
  const executeSearch = useCallback(async (
    query: string,
    filters: ExtendedSearchFilters = {}
  ) => {
    if (!searchEngine || query.length < minQueryLength) {
      setState(prev => ({
        ...prev,
        results: [],
        metadata: null,
        hasSearched: query.length >= minQueryLength,
        error: query.length < minQueryLength && query.length > 0 
          ? `Please enter at least ${minQueryLength} characters` 
          : null
      }))
      return
    }

    setState(prev => ({
      ...prev,
      isSearching: true,
      error: null
    }))

    try {
      // CONTEXT7 SOURCE: /krisk/fuse - Performance measurement for search execution with advanced filters
      // PERFORMANCE TRACKING: Measure search execution time for optimization with advanced filtering
      const basicFilters = processAdvancedFilters(filters)
      const { result, executionTime } = await SearchPerformanceUtils.measureSearchTime(
        async () => {
          const searchResult = await searchEngine.search(query, basicFilters)
          
          // Apply advanced filters to search results
          const filteredResults = applyAdvancedFilters(searchResult.results, filters)
          
          // Apply sorting if specified
          let sortedResults = filteredResults
          if (filters.sortBy && filters.sortBy !== 'relevance') {
            sortedResults = [...filteredResults].sort((a, b) => {
              const aItem = a.item
              const bItem = b.item
              let comparison = 0
              
              switch (filters.sortBy) {
                case 'date':
                  comparison = new Date(bItem.lastUpdated).getTime() - new Date(aItem.lastUpdated).getTime()
                  break
                case 'popularity':
                  const aViews = aItem.analytics?.views || 0
                  const bViews = bItem.analytics?.views || 0
                  comparison = bViews - aViews
                  break
                case 'alphabetical':
                  comparison = aItem.question.localeCompare(bItem.question)
                  break
                case 'priority':
                  comparison = (bItem.priority || 5) - (aItem.priority || 5)
                  break
                default:
                  comparison = 0
              }
              
              return filters.sortOrder === 'asc' ? comparison : -comparison
            })
          }
          
          return {
            results: sortedResults,
            metadata: {
              ...searchResult.metadata,
              totalResults: sortedResults.length
            }
          }
        }
      )

      // Update performance statistics
      if (performanceTracking) {
        searchTimesRef.current.push(executionTime)
        totalSearchesRef.current += 1
        
        // Keep only last 100 search times for rolling average
        if (searchTimesRef.current.length > 100) {
          searchTimesRef.current = searchTimesRef.current.slice(-100)
        }
      }

      const performanceResult = SearchPerformanceUtils.validatePerformance(executionTime)
      
      setState(prev => ({
        ...prev,
        results: result.results,
        metadata: result.metadata,
        isSearching: false,
        hasSearched: true,
        lastSearchTime: executionTime,
        performanceStats: {
          averageSearchTime: searchTimesRef.current.reduce((a, b) => a + b, 0) / searchTimesRef.current.length,
          totalSearches: totalSearchesRef.current,
          performanceRating: performanceResult.performance
        },
        searchHistory: prev.searchHistory.includes(query) 
          ? prev.searchHistory 
          : [query, ...prev.searchHistory].slice(0, 50),
        recentSearches: [query, ...prev.recentSearches.filter(s => s !== query)].slice(0, 10)
      }))

    } catch (error) {
      setState(prev => ({
        ...prev,
        isSearching: false,
        error: error instanceof Error ? error.message : 'Search failed'
      }))
    }
  }, [searchEngine, minQueryLength, performanceTracking, processAdvancedFilters, applyAdvancedFilters])

  /**
   * Debounced search function for real-time search
   * CONTEXT7 SOURCE: /use-debounce - Optimized debouncing for search performance
   * DEBOUNCED SEARCH: Intelligent debouncing for optimal user experience
   */
  const debouncedSearch = useDebouncedCallback(
    executeSearch,
    debounceMs
  )

  /**
   * Main search function
   * CONTEXT7 SOURCE: /reactjs/react.dev - useCallback for stable function references
   * SEARCH API: Primary search interface with state management
   */
  const search = useCallback(async (query: string, filters: ExtendedSearchFilters = {}) => {
    setState(prev => ({
      ...prev,
      query,
      filters: { ...prev.filters, ...filters }
    }))
    
    await executeSearch(query, { ...state.filters, ...filters })
  }, [executeSearch, state.filters])

  /**
   * Set query with optional auto-search
   * CONTEXT7 SOURCE: /reactjs/react.dev - State update patterns
   * QUERY SETTING: Update search query with optional auto-search
   */
  const setQuery = useCallback((query: string) => {
    setState(prev => ({ ...prev, query }))
    
    if (autoSearch && searchEngine) {
      debouncedSearch(query, state.filters)
    }
  }, [autoSearch, debouncedSearch, searchEngine, state.filters])

  /**
   * Update search filters
   * CONTEXT7 SOURCE: /reactjs/react.dev - State update patterns with partial updates
   * FILTER MANAGEMENT: Update search filters with automatic re-search
   */
  const setFilters = useCallback((newFilters: Partial<ExtendedSearchFilters>) => {
    setState(prev => {
      const updatedFilters = { ...prev.filters, ...newFilters }
      return { ...prev, filters: updatedFilters }
    })
    
    // Re-search with new filters if we have a query and auto-search is enabled
    if (state.query && autoSearch && searchEngine) {
      debouncedSearch(state.query, { ...state.filters, ...newFilters })
    }
  }, [state.query, state.filters, autoSearch, debouncedSearch, searchEngine])

  /**
   * Clear search results and state
   * CONTEXT7 SOURCE: /reactjs/react.dev - State reset patterns
   * SEARCH CLEARING: Reset search state to initial values
   */
  const clearSearch = useCallback(() => {
    setState(prev => ({
      ...prev,
      query: '',
      results: [],
      metadata: null,
      hasSearched: false,
      error: null,
      suggestions: []
    }))
  }, [])

  /**
   * Get search suggestions for autocomplete
   * CONTEXT7 SOURCE: /reactjs/react.dev - useCallback for performance optimization
   * SEARCH SUGGESTIONS: Generate intelligent search suggestions
   */
  const getSuggestions = useCallback((query: string): string[] => {
    if (!searchEngine || query.length < 1) return []
    
    const suggestions = searchEngine.getSearchSuggestions(query, maxSuggestions)
    
    // Add recent searches that match the query
    const matchingRecentSearches = state.recentSearches
      .filter(search => 
        search.toLowerCase().includes(query.toLowerCase()) && 
        search.toLowerCase() !== query.toLowerCase()
      )
      .slice(0, 2)
    
    return [...new Set([...suggestions, ...matchingRecentSearches])].slice(0, maxSuggestions)
  }, [searchEngine, maxSuggestions, state.recentSearches])

  /**
   * Select a search suggestion
   * CONTEXT7 SOURCE: /reactjs/react.dev - Event handling patterns
   * SUGGESTION SELECTION: Handle suggestion selection with automatic search
   */
  const selectSuggestion = useCallback((suggestion: string) => {
    setQuery(suggestion)
    if (autoSearch) {
      executeSearch(suggestion, state.filters)
    }
  }, [setQuery, autoSearch, executeSearch, state.filters])

  /**
   * Highlight query matches in text
   * CONTEXT7 SOURCE: /reactjs/react.dev - Text processing utilities
   * TEXT HIGHLIGHTING: Highlight search query matches in content
   */
  const highlightQuery = useCallback((text: string, query: string): string => {
    if (!query.trim()) return text
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(
      regex, 
      '<mark class="bg-yellow-200 text-yellow-900 px-1 py-0.5 rounded">$1</mark>'
    )
  }, [])

  /**
   * Get performance report and recommendations
   * CONTEXT7 SOURCE: /reactjs/react.dev - Performance analysis utilities
   * PERFORMANCE REPORTING: Analyze search performance and provide recommendations
   */
  const getPerformanceReport = useCallback(() => {
    const meetsTargets = state.performanceStats.averageSearchTime < 100
    const recommendations: string[] = []
    
    if (!meetsTargets) {
      recommendations.push('Consider reducing search index size')
      recommendations.push('Optimize search result limit')
      
      if (state.performanceStats.averageSearchTime > 200) {
        recommendations.push('Enable search result caching')
        recommendations.push('Consider server-side search for large datasets')
      }
    }
    
    if (state.results.length > 30) {
      recommendations.push('Consider pagination for large result sets')
    }
    
    return { meetsTargets, recommendations }
  }, [state.performanceStats, state.results.length])

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for suggestion updates
  // SUGGESTION UPDATES: Update suggestions when query changes
  useEffect(() => {
    if (state.query.length >= 1) {
      const suggestions = getSuggestions(state.query)
      setState(prev => ({ ...prev, suggestions }))
    } else {
      setState(prev => ({ ...prev, suggestions: [] }))
    }
  }, [state.query, getSuggestions])

  return {
    state,
    search,
    clearSearch,
    setQuery,
    setFilters,
    getSuggestions,
    selectSuggestion,
    highlightQuery,
    getPerformanceReport,
    searchEngine
  }
}

/**
 * FAQ Search Context for sharing search state across components
 * CONTEXT7 SOURCE: /reactjs/react.dev - React Context patterns for state sharing
 * SEARCH CONTEXT: Share search state across FAQ components
 */
import { createContext, useContext } from 'react'

const FAQSearchContext = createContext<FAQSearchHook | null>(null)

/**
 * FAQ Search Provider component
 * CONTEXT7 SOURCE: /reactjs/react.dev - Context provider patterns
 * SEARCH PROVIDER: Provide search functionality to FAQ page components
 */
export function FAQSearchProvider({ 
  children, 
  questions, 
  categories, 
  options 
}: {
  children: React.ReactNode
  questions: FAQQuestion[]
  categories: FAQCategory[]
  options?: UseFAQSearchOptions
}) {
  const searchHook = useFAQSearch(questions, categories, options)
  
  return (
    <FAQSearchContext.Provider value={searchHook}>
      {children}
    </FAQSearchContext.Provider>
  )
}

/**
 * Hook to access FAQ search context
 * CONTEXT7 SOURCE: /reactjs/react.dev - Context consumption patterns
 * SEARCH CONTEXT HOOK: Access search functionality from FAQ components
 */
export function useFAQSearchContext(): FAQSearchHook {
  const context = useContext(FAQSearchContext)
  if (!context) {
    throw new Error('useFAQSearchContext must be used within a FAQSearchProvider')
  }
  return context
}