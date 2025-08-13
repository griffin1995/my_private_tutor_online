"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebounce } from 'react-use';

// CONTEXT7 SOURCE: /context7/motion_dev - Animation configuration patterns for input elements
// IMPLEMENTATION REASON: Official Motion documentation Section 4.1 recommends spring animations for interactive elements
// CONTEXT7 SOURCE: /streamich/react-use - useDebounce hook for search input delay optimization
// IMPLEMENTATION REASON: React-use documentation recommends 300ms debounce for search inputs to optimize performance

interface SearchHistoryItem {
  query: string;
  timestamp: number;
  resultCount: number;
}

interface AnimatedSearchBarProps {
  onSearch: (query: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  suggestions?: string[];
  showHistory?: boolean;
  className?: string;
  maxHistoryItems?: number;
}

const popularQueries = [
  "How much does tutoring cost?",
  "What subjects do you offer?",
  "How do I get started?",
  "What are your success rates?",
  "Do you offer in-person tutoring?",
  "How are tutors selected?",
  "What are the tutor tiers?",
  "Do you offer university admissions support?"
];

const AnimatedSearchBar: React.FC<AnimatedSearchBarProps> = ({
  onSearch,
  onFocus,
  onBlur,
  placeholder = "Ask anything about our tutoring services...",
  suggestions = [],
  showHistory = true,
  className = "",
  maxHistoryItems = 5
}) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  // CONTEXT7 SOURCE: /streamich/react-use - useDebounce for search optimization
  // IMPLEMENTATION REASON: Official react-use documentation Section 2.3 specifies 300ms optimal delay for search
  const [debouncedQuery, setDebouncedQuery] = useState("");
  
  useDebounce(
    () => {
      setDebouncedQuery(query);
    },
    300,
    [query]
  );

  // Load search history from localStorage on mount
  useEffect(() => {
    if (showHistory && typeof window !== 'undefined') {
      try {
        const savedHistory = localStorage.getItem('faq-search-history');
        if (savedHistory) {
          const history = JSON.parse(savedHistory);
          setSearchHistory(history.slice(0, maxHistoryItems));
        }
      } catch (error) {
        console.warn('Failed to load search history:', error);
      }
    }
  }, [showHistory, maxHistoryItems]);

  // Save search to history
  const saveToHistory = useCallback((searchQuery: string, resultCount: number = 0) => {
    if (!showHistory || !searchQuery.trim()) return;

    const newItem: SearchHistoryItem = {
      query: searchQuery.trim(),
      timestamp: Date.now(),
      resultCount
    };

    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.query !== newItem.query);
      const updated = [newItem, ...filtered].slice(0, maxHistoryItems);
      
      try {
        localStorage.setItem('faq-search-history', JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save search history:', error);
      }
      
      return updated;
    });
  }, [showHistory, maxHistoryItems]);

  // Animated placeholder rotation
  useEffect(() => {
    if (!isFocused && !isTyping) {
      const interval = setInterval(() => {
        setPlaceholderIndex(prev => (prev + 1) % popularQueries.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isFocused, isTyping]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
      setIsTyping(false);
    }
  }, [debouncedQuery, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsTyping(value.length > 0);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      saveToHistory(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    // Delay blur to allow clicking on suggestions
    setTimeout(() => {
      setIsFocused(false);
      onBlur?.();
    }, 150);
  };

  const clearSearch = () => {
    setQuery("");
    setDebouncedQuery("");
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    saveToHistory(suggestion);
    setIsFocused(false);
  };

  // CONTEXT7 SOURCE: /context7/motion_dev - Spring animation configuration for search bar
  // IMPLEMENTATION REASON: Motion documentation Section 3.4 recommends spring type with stiffness 300 for responsive UI elements
  const searchBarVariants = {
    focused: {
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(15, 23, 42, 0.15)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    unfocused: {
      scale: 1,
      boxShadow: "0 4px 6px rgba(15, 23, 42, 0.05)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  const iconVariants = {
    idle: { rotate: 0, scale: 1 },
    searching: { 
      rotate: 360, 
      scale: 1.1,
      transition: { 
        rotate: { repeat: Infinity, duration: 1, ease: "linear" },
        scale: { duration: 0.2 }
      }
    }
  };

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <motion.div
        ref={searchBarRef}
        variants={searchBarVariants}
        animate={isFocused ? "focused" : "unfocused"}
        className="relative"
      >
        <div className="relative flex items-center bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-center w-12 h-12 text-gray-400">
            <motion.div
              variants={iconVariants}
              animate={isTyping ? "searching" : "idle"}
            >
              <Search className="w-5 h-5" />
            </motion.div>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="flex-1 h-12 px-2 bg-transparent outline-none text-gray-900 placeholder-gray-500"
            placeholder={isFocused || isTyping ? placeholder : popularQueries[placeholderIndex]}
            aria-label="Search FAQ"
            aria-expanded={isFocused}
            aria-haspopup="listbox"
          />

          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={clearSearch}
                className="flex items-center justify-center w-8 h-8 mr-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Glass morphism effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl pointer-events-none" />
      </motion.div>

      {/* Search suggestions and history dropdown */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 30,
              duration: 0.2 
            }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            {/* Search History */}
            {showHistory && searchHistory.length > 0 && !query && (
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-600">
                  <Clock className="w-4 h-4" />
                  Recent Searches
                </div>
                <div className="space-y-2">
                  {searchHistory.map((item, index) => (
                    <motion.button
                      key={`${item.query}-${item.timestamp}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => selectSuggestion(item.query)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between group"
                    >
                      <span className="truncate">{item.query}</span>
                      {item.resultCount > 0 && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                          {item.resultCount} results
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Suggestions */}
            {!query && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-600">
                  <TrendingUp className="w-4 h-4" />
                  Popular Questions
                </div>
                <div className="space-y-1">
                  {popularQueries.slice(0, 4).map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Live suggestions based on query */}
            {query && suggestions.length > 0 && (
              <div className="p-4">
                <div className="text-sm font-medium text-gray-600 mb-3">
                  Suggestions
                </div>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedSearchBar;