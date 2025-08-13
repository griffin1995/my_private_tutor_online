/**
 * CONTEXT7 SOURCE: /radix-ui/primitives - Offline search component with voice support
 * OFFLINE SEARCH: Advanced offline search interface for FAQ system
 * 
 * Offline Search Component - Royal Client Experience
 * Features:
 * - Real-time search with instant results
 * - Voice search integration
 * - Smart suggestions and autocomplete
 * - Advanced filtering options
 * - Search analytics and history
 * - Keyboard navigation support
 */

'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { searchIndex, SearchResult, SearchOptions } from '@/lib/offline/search-index';
import { useOffline } from '@/hooks/use-offline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Search, 
  Mic, 
  MicOff, 
  Filter, 
  Clock, 
  TrendingUp,
  X,
  ChevronDown,
  ChevronUp,
  Wifi,
  WifiOff,
  Star,
  Eye
} from 'lucide-react';

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for offline search
// TYPE SAFETY: Complete interfaces for search component configuration
export interface OfflineSearchProps {
  placeholder?: string;
  showFilters?: boolean;
  showVoiceSearch?: boolean;
  showSuggestions?: boolean;
  showHistory?: boolean;
  maxResults?: number;
  onSearchResults?: (results: SearchResult[]) => void;
  onResultClick?: (result: SearchResult) => void;
  className?: string;
}

export interface SearchFilters {
  categories: string[];
  tags: string[];
  type: ('question' | 'category' | 'tag')[];
  sortBy: 'relevance' | 'popularity' | 'date';
  minScore: number;
}

export interface SearchHistory {
  query: string;
  timestamp: number;
  resultCount: number;
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Main offline search component
// OFFLINE SEARCH: Comprehensive search interface with advanced features
export function OfflineSearch({
  placeholder = "Search FAQ offline...",
  showFilters = true,
  showVoiceSearch = true,
  showSuggestions = true,
  showHistory = true,
  maxResults = 20,
  onSearchResults,
  onResultClick,
  className = ''
}: OfflineSearchProps) {
  const { state } = useOffline();
  
  // CONTEXT7 SOURCE: /facebook/react - State management for search functionality
  // STATE MANAGEMENT: Comprehensive search state tracking
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  // CONTEXT7 SOURCE: /facebook/react - Search filters state
  // FILTER STATE: Advanced filtering options for refined search
  const [filters, setFilters] = useState<SearchFilters>({
    categories: [],
    tags: [],
    type: ['question', 'category', 'tag'],
    sortBy: 'relevance',
    minScore: 0
  });

  // CONTEXT7 SOURCE: /facebook/react - Refs for component management
  // REF MANAGEMENT: Input focus and dropdown handling
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<NodeJS.Timeout>();

  // CONTEXT7 SOURCE: /facebook/react - Search execution with debouncing
  // SEARCH EXECUTION: Debounced search with comprehensive options
  const executeSearch = useCallback(async (searchQuery: string, searchFilters: SearchFilters) => {
    if (!searchQuery.trim()) {
      setResults([]);
      onSearchResults?.([]);
      return;
    }

    setIsSearching(true);

    try {
      const options: SearchOptions = {
        query: searchQuery,
        filters: {
          categories: searchFilters.categories.length > 0 ? searchFilters.categories : undefined,
          tags: searchFilters.tags.length > 0 ? searchFilters.tags : undefined,
          type: searchFilters.type,
          minScore: searchFilters.minScore > 0 ? searchFilters.minScore : undefined
        },
        fuzzy: true,
        limit: maxResults,
        sortBy: searchFilters.sortBy,
        includeSnippets: true,
        highlightMatches: true
      };

      const searchResults = await searchIndex.search(options);
      setResults(searchResults);
      onSearchResults?.(searchResults);

      // Add to search history
      const historyEntry: SearchHistory = {
        query: searchQuery,
        timestamp: Date.now(),
        resultCount: searchResults.length
      };

      setSearchHistory(prev => {
        const filtered = prev.filter(item => item.query !== searchQuery);
        return [historyEntry, ...filtered].slice(0, 10);
      });

    } catch (error) {
      console.error('Search execution failed:', error);
      setResults([]);
      onSearchResults?.([]);
    } finally {
      setIsSearching(false);
    }
  }, [maxResults, onSearchResults]);

  // CONTEXT7 SOURCE: /facebook/react - Debounced search trigger
  // DEBOUNCED SEARCH: Prevent excessive search calls during typing
  const handleSearchChange = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(-1);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      executeSearch(value, filters);
    }, 300);

    // Update suggestions
    if (value.length >= 2 && showSuggestions) {
      searchIndex.getSuggestions(value, 5).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [executeSearch, filters, showSuggestions]);

  // CONTEXT7 SOURCE: /facebook/react - Voice search implementation
  // VOICE SEARCH: Speech recognition integration for hands-free search
  const handleVoiceSearch = useCallback(async () => {
    if (!showVoiceSearch) return;

    try {
      setIsListening(true);
      setIsVoiceActive(true);

      const transcript = await searchIndex.voiceSearch({
        language: 'en-US',
        continuous: false,
        interimResults: false
      });

      setQuery(transcript);
      executeSearch(transcript, filters);

    } catch (error) {
      console.error('Voice search failed:', error);
    } finally {
      setIsListening(false);
      setIsVoiceActive(false);
    }
  }, [showVoiceSearch, executeSearch, filters]);

  // CONTEXT7 SOURCE: /facebook/react - Keyboard navigation handling
  // KEYBOARD NAVIGATION: Arrow keys and enter for accessibility
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const totalItems = suggestions.length + results.length;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, totalItems - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        event.preventDefault();
        if (selectedIndex >= 0) {
          if (selectedIndex < suggestions.length) {
            // Select suggestion
            const suggestion = suggestions[selectedIndex];
            setQuery(suggestion);
            executeSearch(suggestion, filters);
            setSuggestions([]);
          } else {
            // Select result
            const resultIndex = selectedIndex - suggestions.length;
            const result = results[resultIndex];
            if (result) {
              onResultClick?.(result);
            }
          }
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  }, [suggestions, results, selectedIndex, executeSearch, filters, onResultClick]);

  // CONTEXT7 SOURCE: /facebook/react - Filter change handling
  // FILTER HANDLING: Update search when filters change
  const handleFilterChange = useCallback((newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    if (query.trim()) {
      executeSearch(query, updatedFilters);
    }
  }, [filters, query, executeSearch]);

  // CONTEXT7 SOURCE: /facebook/react - Load search history on mount
  // INITIALIZATION: Load search history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('offline_search_history');
      if (stored) {
        setSearchHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load search history:', error);
    }
  }, []);

  // CONTEXT7 SOURCE: /facebook/react - Save search history when updated
  // PERSISTENCE: Save search history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('offline_search_history', JSON.stringify(searchHistory));
    } catch (error) {
      console.warn('Failed to save search history:', error);
    }
  }, [searchHistory]);

  // CONTEXT7 SOURCE: /grx7/framer-motion - Main search interface
  // SEARCH INTERFACE: Comprehensive search UI with animations
  return (
    <div className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Search input with status indicator */}
      {/* SEARCH INPUT: Main search field with offline status */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="pl-10 pr-24 py-3 text-base"
            autoComplete="off"
            aria-label="Search FAQ"
            aria-expanded={suggestions.length > 0 || results.length > 0}
          />
          
          <div className="absolute right-3 flex items-center space-x-2">
            {/* Offline Status Indicator */}
            <div className="flex items-center">
              {state.isOnline ? (
                <Wifi className="w-4 h-4 text-green-600" title="Online - Real-time search" />
              ) : (
                <WifiOff className="w-4 h-4 text-orange-600" title="Offline - Cached search" />
              )}
            </div>

            {/* Voice Search Button */}
            {showVoiceSearch && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceSearch}
                disabled={isListening}
                className="h-8 w-8 p-0"
                title="Voice search"
              >
                {isListening ? (
                  <MicOff className="w-4 h-4 text-red-600 animate-pulse" />
                ) : (
                  <Mic className="w-4 h-4 text-slate-600" />
                )}
              </Button>
            )}

            {/* Filter Toggle */}
            {showFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="h-8 w-8 p-0"
                title="Search filters"
              >
                <Filter className={`w-4 h-4 ${isFiltersOpen ? 'text-blue-600' : 'text-slate-600'}`} />
              </Button>
            )}
          </div>
        </div>

        {/* Loading Indicator */}
        {isSearching && (
          <div className="absolute top-full left-0 right-0 mt-1">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
              <div className="flex items-center space-x-2 text-blue-700 text-sm">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Searching...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Search filters panel */}
      {/* FILTERS PANEL: Advanced filtering options */}
      <AnimatePresence>
        {isFiltersOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2 overflow-hidden"
          >
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value as any })}
                    className="w-full p-2 border border-slate-300 rounded-md text-sm"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="popularity">Popularity</option>
                    <option value="date">Most Recent</option>
                  </select>
                </div>

                {/* Content Types */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Content Type
                  </label>
                  <div className="space-y-1">
                    {['question', 'category', 'tag'].map(type => (
                      <label key={type} className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={filters.type.includes(type as any)}
                          onChange={(e) => {
                            const newTypes = e.target.checked
                              ? [...filters.type, type as any]
                              : filters.type.filter(t => t !== type);
                            handleFilterChange({ type: newTypes });
                          }}
                          className="mr-2"
                        />
                        {type.charAt(0).toUpperCase() + type.slice(1)}s
                      </label>
                    ))}
                  </div>
                </div>

                {/* Minimum Score */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Min Relevance
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={filters.minScore}
                    onChange={(e) => handleFilterChange({ minScore: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-xs text-slate-500 mt-1">
                    {Math.round(filters.minScore * 100)}% relevance
                  </div>
                </div>
              </div>
            </Card>
          </m.div>
        )}
      </AnimatePresence>

      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Search suggestions and results */}
      {/* SUGGESTIONS & RESULTS: Dropdown with suggestions and search results */}
      <AnimatePresence>
        {(suggestions.length > 0 || results.length > 0 || (showHistory && searchHistory.length > 0 && !query)) && (
          <m.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                  Suggestions
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setQuery(suggestion);
                      executeSearch(suggestion, filters);
                      setSuggestions([]);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedIndex === index
                        ? 'bg-blue-50 text-blue-900'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <Search className="w-3 h-3 inline-block mr-2 text-slate-400" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Search Results */}
            {results.length > 0 && (
              <div className="p-2 border-t border-slate-100">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                  Results ({results.length})
                </div>
                {results.slice(0, 5).map((result, index) => {
                  const resultIndex = suggestions.length + index;
                  return (
                    <button
                      key={result.id}
                      onClick={() => onResultClick?.(result)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedIndex === resultIndex
                          ? 'bg-blue-50 text-blue-900'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-slate-900 truncate">
                            {result.title}
                          </div>
                          {result.snippet && (
                            <div className="text-xs text-slate-600 mt-1 line-clamp-2">
                              {result.snippet}
                            </div>
                          )}
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {result.category}
                            </Badge>
                            <div className="flex items-center text-xs text-slate-500">
                              <Star className="w-3 h-3 mr-1" />
                              {Math.round(result.score * 100)}%
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-2 text-xs text-slate-400">
                          {result.type}
                        </div>
                      </div>
                    </button>
                  );
                })}
                
                {results.length > 5 && (
                  <div className="text-center mt-2 text-xs text-slate-500">
                    +{results.length - 5} more results
                  </div>
                )}
              </div>
            )}

            {/* Search History */}
            {showHistory && searchHistory.length > 0 && !query && (
              <div className="p-2 border-t border-slate-100">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                  Recent Searches
                </div>
                {searchHistory.slice(0, 5).map((item, index) => (
                  <button
                    key={`${item.query}-${item.timestamp}`}
                    onClick={() => {
                      setQuery(item.query);
                      executeSearch(item.query, filters);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-2 text-slate-400" />
                        {item.query}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.resultCount} results
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* No Results */}
            {query && !isSearching && results.length === 0 && suggestions.length === 0 && (
              <div className="p-4 text-center">
                <div className="text-sm text-slate-600">
                  No results found for "{query}"
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Try different keywords or check your spelling
                </div>
              </div>
            )}
          </m.div>
        )}
      </AnimatePresence>

      {/* Voice Search Indicator */}
      <AnimatePresence>
        {isVoiceActive && (
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-red-600 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Listening...
              </h3>
              <p className="text-sm text-slate-600">
                Speak your search query clearly
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}