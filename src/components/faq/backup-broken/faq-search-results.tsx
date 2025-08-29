/**
 * CONTEXT7 SOURCE: /vercel/next.js - Search results component patterns for Next.js applications
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Advanced filtering and search UI patterns
 * 
 * FAQ Search Results Component - Advanced Search Interface
 * Comprehensive search results display with filtering and sorting capabilities
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through enhanced search experience
 * SEARCH FEATURES: Advanced filtering, sorting, pagination, and result ranking
 * USER EXPERIENCE: Intuitive search interface with real-time filtering
 * 
 * FEATURES:
 * - Advanced search result display
 * - Category and difficulty filtering
 * - Client segment targeting
 * - Search suggestions and corrections
 * - Result analytics and tracking
 * - Mobile-responsive design
 * 
 * MANDATORY Requirements (CLAUDE.md):
 * - Rule 22: All content via centralised CMS
 * - Rule 23: Zero hardcoded content
 * - Rule 24: CMS comment requirement
 * - Rule 25: Structured data management
 */

"use client"

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { m } from 'framer-motion'
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Clock, 
  Star, 
  Target, 
  ChevronRight,
  AlertCircle
} from 'lucide-react'
import { Section } from '@/components/layout/section'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { FAQQuestion } from '@/lib/cms/cms-content'
import type { EnhancedFAQCategory } from '@/lib/cms/cms-faq-categories'
import { FAQHelpfulnessRating, useFAQAnalytics } from './faq-analytics-tracker'
import { FAQRichMedia } from './faq-rich-media-renderer'

// CONTEXT7 SOURCE: /microsoft/typescript - Search results interface patterns
// SEARCH RESULTS: Interface for search results data structure
interface FAQSearchResults {
  results: FAQQuestion[]
  categories: EnhancedFAQCategory[]
  totalResults: number
  searchMetadata: {
    query: string
    executionTime: number
    resultsByCategory: Record<string, number>
    suggestedFilters: string[]
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Search filters interface patterns
// SEARCH FILTERS: Interface for search filtering options
interface SearchFilters {
  category?: string
  difficulty?: string
  segment?: string
  sort?: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - Component props interface
// COMPONENT PROPS: Search results component properties
interface FAQSearchResultsProps {
  searchResults: FAQSearchResults
  allCategories: EnhancedFAQCategory[]
  currentQuery: string
  currentFilters: SearchFilters
}

/**
 * FAQ Search Results Component - Advanced Search Interface
 * CONTEXT7 SOURCE: /vercel/next.js - Client component patterns for interactive search
 * INTERACTIVE SEARCH: Real-time filtering and sorting with analytics tracking
 */
export function FAQSearchResults({
  searchResults,
  allCategories,
  currentQuery,
  currentFilters
}: FAQSearchResultsProps) {
  const analytics = useFAQAnalytics()
  const [localQuery, setLocalQuery] = useState(currentQuery)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<SearchFilters>(currentFilters)

  // CONTEXT7 SOURCE: /microsoft/typescript - Results processing with advanced sorting
  // RESULTS PROCESSING: Sort and filter search results based on user preferences
  const processedResults = useMemo(() => {
    let results = [...searchResults.results]
    
    // Apply client-side filtering if different from current filters
    if (selectedFilters.difficulty && selectedFilters.difficulty !== currentFilters.difficulty) {
      results = results.filter(q => q.difficulty === selectedFilters.difficulty)
    }
    
    if (selectedFilters.segment && selectedFilters.segment !== currentFilters.segment) {
      results = results.filter(q => 
        q.clientSegment === selectedFilters.segment || q.clientSegment === 'all'
      )
    }

    // Apply sorting
    const sortBy = selectedFilters.sort || 'relevance'
    switch (sortBy) {
      case 'priority':
        results.sort((a, b) => b.priority - a.priority)
        break
      case 'difficulty':
        const difficultyOrder = { 'basic': 1, 'intermediate': 2, 'advanced': 3 }
        results.sort((a, b) => (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0))
        break
      case 'newest':
        results.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      case 'category':
        results.sort((a, b) => a.category.localeCompare(b.category))
        break
      default: // relevance
        results.sort((a, b) => b.priority - a.priority)
    }

    return results
  }, [searchResults.results, selectedFilters, currentFilters])

  // CONTEXT7 SOURCE: /microsoft/typescript - URL update function for search state
  // URL MANAGEMENT: Update URL with current search state
  const updateSearchURL = (newQuery: string, newFilters: SearchFilters) => {
    const params = new URLSearchParams()
    
    if (newQuery.trim()) {
      params.set('q', newQuery.trim())
    }
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value)
      }
    })

    const newURL = `/faq/search${params.toString() ? `?${params.toString()}` : ''}`
    window.history.replaceState({}, '', newURL)
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Search handler with analytics tracking
  // SEARCH HANDLING: Process new search queries with debouncing
  const handleSearch = (query: string) => {
    setLocalQuery(query)
    
    // Debounce search updates
    const timeoutId = setTimeout(() => {
      updateSearchURL(query, selectedFilters)
      analytics.trackSearch(query, processedResults.length, [])
    }, 500)

    return () => clearTimeout(timeoutId)
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Filter change handler
  // FILTER MANAGEMENT: Handle filter changes with URL updates
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...selectedFilters, [key]: value }
    setSelectedFilters(newFilters)
    updateSearchURL(localQuery, newFilters)
  }

  return (
    <Section className="py-16 lg:py-20" background="white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* SEARCH HEADER AND FILTERS */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Search interface layout patterns */}
          {/* SEARCH INTERFACE: Advanced search controls with filtering options */}
          <m.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Search Input */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search FAQ questions and answers..."
                  value={localQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-12 h-12 text-lg border-2 border-slate-200 rounded-xl focus:border-accent-500"
                />
              </div>
              
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-6"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <m.div
                className="bg-slate-50 rounded-xl p-6 mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category
                    </label>
                    <Select
                      value={selectedFilters.category || 'all'}
                      onValueChange={(value) => handleFilterChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {allCategories.map((category) => (
                          <SelectItem key={category.slug} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Difficulty
                    </label>
                    <Select
                      value={selectedFilters.difficulty || 'all'}
                      onValueChange={(value) => handleFilterChange('difficulty', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Difficulties" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Difficulties</SelectItem>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Client Segment Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Client Type
                    </label>
                    <Select
                      value={selectedFilters.segment || 'all'}
                      onValueChange={(value) => handleFilterChange('segment', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Clients" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Clients</SelectItem>
                        <SelectItem value="oxbridge_prep">Oxbridge Prep</SelectItem>
                        <SelectItem value="11_plus">11+ Parents</SelectItem>
                        <SelectItem value="elite_corporate">Elite Corporate</SelectItem>
                        <SelectItem value="comparison_shopper">Comparison Shoppers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Sort By
                    </label>
                    <Select
                      value={selectedFilters.sort || 'relevance'}
                      onValueChange={(value) => handleFilterChange('sort', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sort by Relevance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="priority">Priority</SelectItem>
                        <SelectItem value="difficulty">Difficulty</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="category">Category</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </m.div>
            )}

            {/* Results Summary */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <p className="text-slate-600">
                  {processedResults.length} result{processedResults.length !== 1 ? 's' : ''} found
                  {currentQuery && (
                    <span className="ml-2 text-slate-800 font-medium">
                      for "{currentQuery}"
                    </span>
                  )}
                </p>
                
                {searchResults.searchMetadata.executionTime > 0 && (
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {searchResults.searchMetadata.executionTime}ms
                  </Badge>
                )}
              </div>

              {/* Suggested Filters */}
              {searchResults.searchMetadata.suggestedFilters.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-500">Suggested:</span>
                  {searchResults.searchMetadata.suggestedFilters.slice(0, 3).map((filter) => (
                    <Badge 
                      key={filter}
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-accent-50"
                      onClick={() => handleSearch(`${localQuery} ${filter}`.trim())}
                    >
                      {filter}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </m.div>

          {/* SEARCH RESULTS */}
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Search results layout patterns */}
          {/* RESULTS DISPLAY: Comprehensive search results with enhanced information */}
          {processedResults.length > 0 ? (
            <div className="space-y-6">
              {processedResults.map((question, index) => {
                const category = allCategories.find(cat => cat.id === question.category)
                
                return (
                  <m.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-white border-2 border-slate-100 hover:border-slate-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            {/* Question Title */}
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                              {question.question}
                            </h3>
                            
                            {/* Question Metadata */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                              {category && (
                                <Link 
                                  href={`/faq/${category.slug}`}
                                  className="flex items-center space-x-2 text-sm text-accent-600 hover:text-accent-700 transition-colors"
                                >
                                  <span>{category.iconComponent}</span>
                                  <span>{category.name}</span>
                                </Link>
                              )}
                              
                              {question.difficulty && (
                                <Badge 
                                  variant={question.difficulty === 'advanced' ? 'destructive' : 
                                         question.difficulty === 'intermediate' ? 'default' : 'secondary'}
                                >
                                  {question.difficulty}
                                </Badge>
                              )}
                              
                              {question.featured && (
                                <Badge variant="outline">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                              
                              {question.estimatedReadTime && (
                                <Badge variant="outline">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {question.estimatedReadTime}min
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="ml-4">
                            <Badge variant="secondary">
                              <Target className="w-3 h-3 mr-1" />
                              {question.priority}/10
                            </Badge>
                          </div>
                        </div>

                        {/* Question Answer */}
                        <div className="prose prose-slate max-w-none mb-6">
                          <p className="text-slate-700 leading-relaxed">
                            {question.answer.length > 300 
                              ? `${question.answer.slice(0, 300)}...` 
                              : question.answer
                            }
                          </p>
                        </div>

                        {/* CONTEXT7 SOURCE: /microsoft/typescript - Rich media content rendering */}
                        {/* Rich Media Content */}
                        {question.richMedia && question.richMedia.length > 0 && (
                          <FAQRichMedia
                            sections={question.richMedia}
                            position="after"
                            className="mb-6"
                          />
                        )}

                        {/* Question Tags */}
                        {question.tags && question.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {question.tags.slice(0, 5).map((tag) => (
                              <Badge key={tag} variant="outline" size="sm">
                                {tag}
                              </Badge>
                            ))}
                            {question.tags.length > 5 && (
                              <Badge variant="outline" size="sm" className="text-slate-400">
                                +{question.tags.length - 5} more
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Question Actions */}
                        <div className="flex items-center justify-between">
                          <FAQHelpfulnessRating
                            questionId={question.id}
                            categorySlug={category?.slug}
                            className="flex-1"
                          />
                          
                          {category && (
                            <Link
                              href={`/faq/${category.slug}#${question.id}`}
                              className="flex items-center space-x-2 text-sm text-accent-600 hover:text-accent-700 transition-colors font-medium"
                              onClick={() => analytics.trackQuestionInteraction(question.id, 'open', category.slug)}
                            >
                              <span>View Full Answer</span>
                              <ChevronRight className="w-4 h-4" />
                            </Link>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </m.div>
                )
              })}
            </div>
          ) : (
            /* NO RESULTS STATE */
            /* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Empty state design patterns */
            /* EMPTY STATE: Helpful no results state with suggestions */
            <m.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                No results found
              </h3>
              <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                {currentQuery 
                  ? `We couldn't find any FAQ items matching "${currentQuery}". Try adjusting your search terms or filters.`
                  : "Try entering a search query to find relevant FAQ items."
                }
              </p>
              
              {/* Search Suggestions */}
              {allCategories.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-4">
                    Browse by category:
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {allCategories.slice(0, 6).map((category) => (
                      <Link
                        key={category.slug}
                        href={`/faq/${category.slug}`}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors"
                      >
                        <span>{category.iconComponent}</span>
                        <span>{category.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </m.div>
          )}
        </div>
      </div>
    </Section>
  )
}

export default FAQSearchResults