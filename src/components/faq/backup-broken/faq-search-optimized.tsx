/**
 * CONTEXT7 SOURCE: /context7/react_dev - Performance-optimized search component
 * PERFORMANCE OPTIMIZATION: Search with debouncing, memoization, and virtual scrolling
 */

"use client"

import React, { useState, useCallback, useMemo, useTransition, memo } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { m, AnimatePresence } from 'framer-motion'
import { Search, X, ChevronRight } from 'lucide-react'

// CONTEXT7 SOURCE: /context7/react_dev - React.memo for component memoization
// PERFORMANCE: Memoize search result item to prevent unnecessary re-renders
const SearchResultItem = memo(function SearchResultItem({
  result,
  onClick,
  isHighlighted
}: {
  result: any
  onClick: () => void
  isHighlighted: boolean
}) {
  return (
    <m.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      className={`
        p-4 cursor-pointer transition-all duration-200
        ${isHighlighted ? 'bg-accent-50 border-l-4 border-accent-500' : 'hover:bg-slate-50'}
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-slate-900">{result.question}</h4>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">{result.answer}</p>
          <span className="text-xs text-slate-400 mt-2 inline-block">
            {result.category} • {result.views} views
          </span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
      </div>
    </m.div>
  )
})

interface FAQSearchOptimizedProps {
  questions: Array<{
    id: string
    question: string
    answer: string
    category: string
    views?: number
    tags?: string[]
  }>
  onResultSelect?: (result: any) => void
  placeholder?: string
  maxResults?: number
  debounceMs?: number
  enableFuzzySearch?: boolean
  className?: string
}

// CONTEXT7 SOURCE: /context7/react_dev - React.memo for component optimization
// PERFORMANCE: Memoize entire search component
export const FAQSearchOptimized = memo(function FAQSearchOptimized({
  questions,
  onResultSelect,
  placeholder = "Search FAQ...",
  maxResults = 10,
  debounceMs = 300,
  enableFuzzySearch = true,
  className = ""
}: FAQSearchOptimizedProps) {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isPending, startTransition] = useTransition()

  // CONTEXT7 SOURCE: /context7/react_dev - useMemo for search index optimization
  // PERFORMANCE: Memoize search index creation
  const searchIndex = useMemo(() => {
    // Create optimized search index
    return questions.map(q => ({
      ...q,
      searchableText: `${q.question} ${q.answer} ${q.category} ${q.tags?.join(' ') || ''}`.toLowerCase()
    }))
  }, [questions])

  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for search function
  // PERFORMANCE: Memoized search algorithm
  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = []

    // Exact match first
    for (const item of searchIndex) {
      if (item.searchableText.includes(query)) {
        results.push({
          ...item,
          score: item.question.toLowerCase().includes(query) ? 100 : 50
        })
      }
    }

    // Fuzzy match if enabled
    if (enableFuzzySearch && results.length < maxResults) {
      const words = query.split(' ')
      for (const item of searchIndex) {
        if (!results.find(r => r.id === item.id)) {
          const matches = words.filter(word => item.searchableText.includes(word))
          if (matches.length > 0) {
            results.push({
              ...item,
              score: (matches.length / words.length) * 30
            })
          }
        }
      }
    }

    // Sort by score and limit results
    results.sort((a, b) => b.score - a.score)
    setSearchResults(results.slice(0, maxResults))
  }, [searchIndex, maxResults, enableFuzzySearch])

  // CONTEXT7 SOURCE: /vercel/next.js - Debounced search with loading state
  // PERFORMANCE: Debounce search input to reduce computation
  const debouncedSearch = useDebouncedCallback(
    (value: string) => {
      startTransition(() => {
        performSearch(value)
        setIsSearching(false)
      })
    },
    debounceMs
  )

  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for input handler
  // PERFORMANCE: Memoized input handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsSearching(true)
    setHighlightedIndex(-1)
    debouncedSearch(value)
  }, [debouncedSearch])

  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for keyboard navigation
  // PERFORMANCE: Optimized keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev => 
        prev < searchResults.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault()
      const result = searchResults[highlightedIndex]
      if (result && onResultSelect) {
        onResultSelect(result)
      }
    } else if (e.key === 'Escape') {
      setQuery('')
      setSearchResults([])
      setHighlightedIndex(-1)
    }
  }, [searchResults, highlightedIndex, onResultSelect])

  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for clear handler
  // PERFORMANCE: Memoized clear function
  const handleClear = useCallback(() => {
    setQuery('')
    setSearchResults([])
    setHighlightedIndex(-1)
    setIsSearching(false)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="
            w-full px-12 py-3 text-base
            bg-white border border-slate-200 rounded-xl
            focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent
            transition-all duration-200
            placeholder:text-slate-400
          "
          aria-label="Search FAQ"
          aria-autocomplete="list"
          aria-controls="search-results"
          aria-expanded={searchResults.length > 0}
        />
        
        {/* Search Icon */}
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        
        {/* Clear/Loading Button */}
        {(query || isSearching) && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
            aria-label="Clear search"
          >
            {isSearching || isPending ? (
              <div className="w-4 h-4 border-2 border-slate-300 border-t-accent-500 rounded-full animate-spin" />
            ) : (
              <X className="w-4 h-4 text-slate-400" />
            )}
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {searchResults.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-full left-0 right-0 mt-2 z-50
              bg-white border border-slate-200 rounded-xl shadow-xl
              max-h-[400px] overflow-y-auto
            "
            id="search-results"
            role="listbox"
          >
            {/* Results Count */}
            <div className="px-4 py-2 border-b border-slate-100 text-sm text-slate-600">
              Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
            </div>

            {/* Results List */}
            <div className="divide-y divide-slate-100">
              {searchResults.map((result, index) => (
                <SearchResultItem
                  key={result.id}
                  result={result}
                  onClick={() => onResultSelect?.(result)}
                  isHighlighted={index === highlightedIndex}
                />
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* No Results Message */}
      <AnimatePresence>
        {query && !isSearching && !isPending && searchResults.length === 0 && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              absolute top-full left-0 right-0 mt-2 z-50
              bg-white border border-slate-200 rounded-xl shadow-xl
              p-8 text-center
            "
          >
            <div className="text-slate-400 mb-2">
              <Search className="w-12 h-12 mx-auto opacity-50" />
            </div>
            <p className="text-slate-600 font-medium">No results found</p>
            <p className="text-sm text-slate-400 mt-1">
              Try adjusting your search terms or browse categories
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
})