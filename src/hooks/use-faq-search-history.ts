"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

// CONTEXT7 SOURCE: /streamich/react-use - Local storage hooks and state management patterns
// IMPLEMENTATION REASON: React-use documentation Section 6.1 provides local storage persistence patterns
// CONTEXT7 SOURCE: /streamich/react-use - Analytics event tracking for search interactions
// IMPLEMENTATION REASON: React-use documentation Section 7.2 specifies performance tracking for user interactions

export interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
  results: number;
  duration: number;
  category?: string;
  source: 'manual' | 'voice' | 'suggestion' | 'auto-complete';
  clicked?: boolean;
  clickedResultId?: string;
}

export interface SearchAnalytics {
  totalSearches: number;
  averageResultsPerSearch: number;
  averageSearchDuration: number;
  popularQueries: Array<{ query: string; count: number; lastUsed: number }>;
  categoryDistribution: Record<string, number>;
  sourceDistribution: Record<string, number>;
  clickThroughRate: number;
  noResultsQueries: string[];
}

export interface SearchSuggestion {
  query: string;
  frequency: number;
  lastUsed: number;
  averageResults: number;
  source: 'history' | 'popular' | 'related';
}

interface UseFAQSearchHistoryOptions {
  maxHistoryItems?: number;
  enableAnalytics?: boolean;
  enableSuggestions?: boolean;
  storageKey?: string;
  debounceMs?: number;
  trackClicks?: boolean;
}

const DEFAULT_OPTIONS: Required<UseFAQSearchHistoryOptions> = {
  maxHistoryItems: 50,
  enableAnalytics: true,
  enableSuggestions: true,
  storageKey: 'faq-search-history',
  debounceMs: 300,
  trackClicks: true
};

/**
 * Custom hook for managing FAQ search history, analytics, and suggestions
 * CONTEXT7 SOURCE: /streamich/react-use - Custom hooks for search functionality
 * IMPLEMENTATION REASON: React-use documentation provides patterns for search state management
 */
export function useFAQSearchHistory(options: UseFAQSearchHistoryOptions = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState<SearchAnalytics | null>(null);
  
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const analyticsCache = useRef<SearchAnalytics | null>(null);

  // Load search history from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(config.storageKey);
      if (stored) {
        const parsedHistory: SearchHistoryItem[] = JSON.parse(stored);
        
        // Validate and clean history data
        const validHistory = parsedHistory
          .filter(item => 
            item &&
            typeof item.query === 'string' &&
            typeof item.timestamp === 'number' &&
            item.timestamp > 0
          )
          .sort((a, b) => b.timestamp - a.timestamp)
          .slice(0, config.maxHistoryItems);

        setSearchHistory(validHistory);
        
        if (config.enableAnalytics) {
          updateAnalytics(validHistory);
        }
      }
    } catch (error) {
      console.warn('Failed to load search history:', error);
      // Clear corrupted data
      localStorage.removeItem(config.storageKey);
    } finally {
      setIsLoading(false);
    }
  }, [config.storageKey, config.maxHistoryItems, config.enableAnalytics]);

  // Save search history to localStorage
  const saveHistoryToStorage = useCallback((history: SearchHistoryItem[]) => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(config.storageKey, JSON.stringify(history));
    } catch (error) {
      console.warn('Failed to save search history:', error);
    }
  }, [config.storageKey]);

  // Debounced save function
  const debouncedSave = useCallback((history: SearchHistoryItem[]) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      saveHistoryToStorage(history);
    }, config.debounceMs);
  }, [saveHistoryToStorage, config.debounceMs]);

  // Add search to history
  const addSearch = useCallback((searchData: Omit<SearchHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: SearchHistoryItem = {
      id: `search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      ...searchData
    };

    setSearchHistory(prev => {
      // Remove duplicate queries from recent history (last 5 items)
      const recentQueries = prev.slice(0, 5).map(item => item.query.toLowerCase());
      const isDuplicate = recentQueries.includes(newItem.query.toLowerCase());

      let updatedHistory: SearchHistoryItem[];
      
      if (isDuplicate) {
        // Update existing entry instead of adding duplicate
        updatedHistory = prev.map(item => 
          item.query.toLowerCase() === newItem.query.toLowerCase() && 
          (Date.now() - item.timestamp) < 60000 // Within last minute
            ? { ...item, timestamp: newItem.timestamp, results: newItem.results }
            : item
        );
      } else {
        // Add new entry
        updatedHistory = [newItem, ...prev].slice(0, config.maxHistoryItems);
      }

      // Trigger debounced save
      debouncedSave(updatedHistory);
      
      // Update analytics if enabled
      if (config.enableAnalytics) {
        updateAnalytics(updatedHistory);
      }

      return updatedHistory;
    });

    return newItem.id;
  }, [config.maxHistoryItems, config.enableAnalytics, debouncedSave]);

  // Update search item (e.g., when user clicks on a result)
  const updateSearch = useCallback((searchId: string, updates: Partial<SearchHistoryItem>) => {
    setSearchHistory(prev => {
      const updatedHistory = prev.map(item =>
        item.id === searchId ? { ...item, ...updates } : item
      );

      debouncedSave(updatedHistory);
      
      if (config.enableAnalytics) {
        updateAnalytics(updatedHistory);
      }

      return updatedHistory;
    });
  }, [config.enableAnalytics, debouncedSave]);

  // Remove search from history
  const removeSearch = useCallback((searchId: string) => {
    setSearchHistory(prev => {
      const updatedHistory = prev.filter(item => item.id !== searchId);
      debouncedSave(updatedHistory);
      
      if (config.enableAnalytics) {
        updateAnalytics(updatedHistory);
      }

      return updatedHistory;
    });
  }, [config.enableAnalytics, debouncedSave]);

  // Clear all search history
  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    setAnalytics(null);
    analyticsCache.current = null;
    
    try {
      localStorage.removeItem(config.storageKey);
    } catch (error) {
      console.warn('Failed to clear search history:', error);
    }
  }, [config.storageKey]);

  // Get recent searches (excluding duplicates)
  const getRecentSearches = useCallback((limit: number = 5): SearchHistoryItem[] => {
    const seen = new Set<string>();
    return searchHistory
      .filter(item => {
        const queryLower = item.query.toLowerCase();
        if (seen.has(queryLower)) {
          return false;
        }
        seen.add(queryLower);
        return true;
      })
      .slice(0, limit);
  }, [searchHistory]);

  // Get search suggestions based on history
  const getSuggestions = useCallback((
    partialQuery: string, 
    limit: number = 5
  ): SearchSuggestion[] => {
    if (!config.enableSuggestions || !partialQuery.trim()) {
      return [];
    }

    const queryLower = partialQuery.toLowerCase();
    const suggestions = new Map<string, SearchSuggestion>();

    // Analyze search history for suggestions
    searchHistory.forEach(item => {
      const itemQueryLower = item.query.toLowerCase();
      
      // Skip exact matches
      if (itemQueryLower === queryLower) return;

      // Check if query contains the partial query
      if (itemQueryLower.includes(queryLower)) {
        const existing = suggestions.get(itemQueryLower);
        
        if (existing) {
          existing.frequency += 1;
          existing.lastUsed = Math.max(existing.lastUsed, item.timestamp);
          existing.averageResults = (existing.averageResults + item.results) / 2;
        } else {
          suggestions.set(itemQueryLower, {
            query: item.query,
            frequency: 1,
            lastUsed: item.timestamp,
            averageResults: item.results,
            source: 'history'
          });
        }
      }
    });

    // Sort suggestions by relevance score
    return Array.from(suggestions.values())
      .map(suggestion => ({
        ...suggestion,
        // Calculate relevance score based on frequency, recency, and result count
        relevanceScore: 
          (suggestion.frequency * 0.4) + 
          (Math.max(0, 1 - (Date.now() - suggestion.lastUsed) / (1000 * 60 * 60 * 24 * 30)) * 0.3) + // 30 day decay
          (Math.min(suggestion.averageResults / 10, 1) * 0.3) // Normalize result count
      }))
      .sort((a, b) => (b as any).relevanceScore - (a as any).relevanceScore)
      .slice(0, limit);
  }, [searchHistory, config.enableSuggestions]);

  // Update analytics
  const updateAnalytics = useCallback((history: SearchHistoryItem[]) => {
    if (!config.enableAnalytics) return;

    // Use cached analytics if history hasn't changed significantly
    const historyLength = history.length;
    if (analyticsCache.current && 
        Math.abs(analyticsCache.current.totalSearches - historyLength) < 5) {
      return;
    }

    const analytics: SearchAnalytics = {
      totalSearches: history.length,
      averageResultsPerSearch: history.length > 0 
        ? history.reduce((sum, item) => sum + item.results, 0) / history.length 
        : 0,
      averageSearchDuration: history.length > 0
        ? history.reduce((sum, item) => sum + item.duration, 0) / history.length
        : 0,
      popularQueries: [],
      categoryDistribution: {},
      sourceDistribution: {},
      clickThroughRate: 0,
      noResultsQueries: []
    };

    // Analyze popular queries
    const queryFrequency = new Map<string, { count: number; lastUsed: number }>();
    const sourceCount = new Map<string, number>();
    const categoryCount = new Map<string, number>();
    let clickedSearches = 0;
    const noResultsQueries = new Set<string>();

    history.forEach(item => {
      // Query frequency
      const queryLower = item.query.toLowerCase();
      const existing = queryFrequency.get(queryLower);
      if (existing) {
        existing.count += 1;
        existing.lastUsed = Math.max(existing.lastUsed, item.timestamp);
      } else {
        queryFrequency.set(queryLower, { count: 1, lastUsed: item.timestamp });
      }

      // Source distribution
      const currentSourceCount = sourceCount.get(item.source) || 0;
      sourceCount.set(item.source, currentSourceCount + 1);

      // Category distribution
      if (item.category) {
        const currentCategoryCount = categoryCount.get(item.category) || 0;
        categoryCount.set(item.category, currentCategoryCount + 1);
      }

      // Click tracking
      if (item.clicked) {
        clickedSearches += 1;
      }

      // No results tracking
      if (item.results === 0) {
        noResultsQueries.add(item.query);
      }
    });

    // Popular queries (top 10)
    analytics.popularQueries = Array.from(queryFrequency.entries())
      .map(([query, data]) => ({ query, count: data.count, lastUsed: data.lastUsed }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Source distribution
    analytics.sourceDistribution = Object.fromEntries(sourceCount);

    // Category distribution
    analytics.categoryDistribution = Object.fromEntries(categoryCount);

    // Click-through rate
    analytics.clickThroughRate = history.length > 0 
      ? (clickedSearches / history.length) * 100 
      : 0;

    // No results queries
    analytics.noResultsQueries = Array.from(noResultsQueries);

    analyticsCache.current = analytics;
    setAnalytics(analytics);
  }, [config.enableAnalytics]);

  // Export search history data
  const exportHistory = useCallback((): string => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalSearches: searchHistory.length,
      searches: searchHistory,
      analytics: analytics
    };

    return JSON.stringify(exportData, null, 2);
  }, [searchHistory, analytics]);

  // Import search history data
  const importHistory = useCallback((jsonData: string): boolean => {
    try {
      const importData = JSON.parse(jsonData);
      
      if (!Array.isArray(importData.searches)) {
        throw new Error('Invalid import data format');
      }

      // Validate imported searches
      const validSearches = importData.searches
        .filter((item: any) => 
          item &&
          typeof item.query === 'string' &&
          typeof item.timestamp === 'number'
        )
        .slice(0, config.maxHistoryItems);

      setSearchHistory(validSearches);
      saveHistoryToStorage(validSearches);
      
      if (config.enableAnalytics) {
        updateAnalytics(validSearches);
      }

      return true;
    } catch (error) {
      console.error('Failed to import search history:', error);
      return false;
    }
  }, [config.maxHistoryItems, config.enableAnalytics, saveHistoryToStorage, updateAnalytics]);

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    searchHistory,
    isLoading,
    analytics,

    // Actions
    addSearch,
    updateSearch,
    removeSearch,
    clearHistory,

    // Computed values
    getRecentSearches,
    getSuggestions,

    // Utilities
    exportHistory,
    importHistory,

    // Analytics helpers
    hasSearches: searchHistory.length > 0,
    recentSearchCount: searchHistory.filter(item => 
      Date.now() - item.timestamp < 1000 * 60 * 60 * 24 * 7 // Last 7 days
    ).length
  };
}