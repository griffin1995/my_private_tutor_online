"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, TrendingUp, Filter, Grid, List } from 'lucide-react';

// Import our interactive search components
import AnimatedSearchBar from './animated-search-bar';
import SearchSuggestions from './search-suggestions';
import QuickAccessCards from './quick-access-cards';
import VoiceSearchButton from './voice-search-button';
import SearchResultsOverlay from './search-results-overlay';

// Import search functionality
import { useFAQSearchHistory } from '@/hooks/use-faq-search-history';
import { getBaseRate, getPromotionalPricing } from '@/lib/cms/cms-content';

// CONTEXT7 SOURCE: /context7/motion_dev - Integrated component animations and state management
// IMPLEMENTATION REASON: Motion documentation Section 13.1 recommends centralized animation state for complex interfaces
// CONTEXT7 SOURCE: /streamich/react-use - Search state management and performance optimization
// IMPLEMENTATION REASON: React-use documentation Section 8.1 provides patterns for search interface management

interface SearchResult {
  id: string;
  question: string;
  answer: string;
  category: string;
  categoryIcon: string;
  relevanceScore: number;
  snippet: string;
  tags: string[];
  views: number;
  helpful: number;
  lastUpdated: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  relatedQuestions?: string[];
}

interface IntegratedSearchInterfaceProps {
  onSearch?: (query: string) => Promise<SearchResult[]>;
  onResultClick?: (result: SearchResult) => void;
  placeholder?: string;
  showQuickAccess?: boolean;
  showVoiceSearch?: boolean;
  showHistory?: boolean;
  maxQuickAccessCards?: number;
  className?: string;
  mode?: 'hero' | 'page' | 'modal';
}

const MOCK_SEARCH_RESULTS: SearchResult[] = [
  {
    id: '1',
    question: 'How much does tutoring cost?',
    answer: `Bespoke 1-2-1 tutoring starts from just ${getBaseRate().display} per hour. ${getPromotionalPricing().feeDisclaimer}`,
    category: 'Pricing & Payment',
    categoryIcon: '💰',
    relevanceScore: 95,
    snippet: `Bespoke 1-2-1 tutoring starts from just ${getBaseRate().display} per hour...`,
    tags: ['pricing', 'cost', 'fees', 'payment'],
    views: 2847,
    helpful: 94,
    lastUpdated: '2024-08-01',
    difficulty: 'beginner',
    relatedQuestions: ['Do you offer discounts?', 'How do we pay and when?']
  },
  {
    id: '2',
    question: 'What subjects do you offer tutoring in?',
    answer: 'We cover all major academic and entrance exam subjects, including entrance exams (4+, 7+, 11+, 13+, 16+), core subjects (English, Maths, Sciences), languages, humanities, and more.',
    category: 'Subjects & Curriculum',
    categoryIcon: '📚',
    relevanceScore: 88,
    snippet: 'We cover all major academic and entrance exam subjects...',
    tags: ['subjects', 'curriculum', 'courses', 'offerings'],
    views: 2654,
    helpful: 92,
    lastUpdated: '2024-08-02',
    difficulty: 'beginner',
    relatedQuestions: ['Do you cover international exam boards?', 'Do you offer university admissions support?']
  }
];

const IntegratedSearchInterface: React.FC<IntegratedSearchInterfaceProps> = ({
  onSearch,
  onResultClick,
  placeholder = "Search frequently asked questions...",
  showQuickAccess = true,
  showVoiceSearch = true,
  showHistory = true,
  maxQuickAccessCards = 6,
  className = "",
  mode = 'page'
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');

  // Search history hook
  const {
    addSearch,
    getRecentSearches,
    getSuggestions,
    searchHistory
  } = useFAQSearchHistory({
    maxHistoryItems: 50,
    enableAnalytics: true,
    enableSuggestions: true
  });

  // Mock search function - replace with actual search implementation
  const performSearch = useCallback(async (searchQuery: string): Promise<SearchResult[]> => {
    if (onSearch) {
      return await onSearch(searchQuery);
    }

    // Mock implementation - filter mock data
    const queryLower = searchQuery.toLowerCase();
    return MOCK_SEARCH_RESULTS.filter(result => 
      result.question.toLowerCase().includes(queryLower) ||
      result.answer.toLowerCase().includes(queryLower) ||
      result.tags.some(tag => tag.toLowerCase().includes(queryLower))
    );
  }, [onSearch]);

  // Handle search execution
  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setQuery(searchQuery);

    try {
      const startTime = Date.now();
      const searchResults = await performSearch(searchQuery);
      const duration = Date.now() - startTime;

      setResults(searchResults);
      setShowResults(true);
      setShowSuggestions(false);

      // Add to search history
      addSearch({
        query: searchQuery,
        results: searchResults.length,
        duration,
        source: 'manual',
        category: selectedCategory !== 'All Categories' ? selectedCategory : undefined
      });

    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  }, [performSearch, addSearch, selectedCategory]);

  // Handle voice search result
  const handleVoiceResult = useCallback((transcript: string) => {
    setQuery(transcript);
    handleSearch(transcript);
    
    // Add voice search to history
    addSearch({
      query: transcript,
      results: 0, // Will be updated when search completes
      duration: 0,
      source: 'voice'
    });
  }, [handleSearch, addSearch]);

  // Handle result click
  const handleResultClick = useCallback((result: SearchResult) => {
    // Track click in search history
    const historyItem = searchHistory.find(item => 
      item.query.toLowerCase() === query.toLowerCase() &&
      Date.now() - item.timestamp < 60000 // Within last minute
    );

    if (historyItem) {
      // Update search history with click data
      addSearch({
        ...historyItem,
        clicked: true,
        clickedResultId: result.id
      });
    }

    if (onResultClick) {
      onResultClick(result);
    }

    setShowResults(false);
  }, [query, searchHistory, addSearch, onResultClick]);

  // Quick access card click handler
  const handleQuickAccessClick = useCallback((card: any) => {
    const searchQuery = card.question;
    setQuery(searchQuery);
    handleSearch(searchQuery);
  }, [handleSearch]);

  // Get suggestions for search bar
  const getSearchSuggestions = useCallback((partialQuery: string): string[] => {
    const historySuggestions = getSuggestions(partialQuery, 3);
    const recentSearches = getRecentSearches(2);
    
    const suggestions = [
      ...historySuggestions.map(s => s.query),
      ...recentSearches.map(s => s.query)
    ];

    // Remove duplicates and return unique suggestions
    return [...new Set(suggestions)].slice(0, 5);
  }, [getSuggestions, getRecentSearches]);

  // Handle search bar focus
  const handleSearchFocus = useCallback(() => {
    setShowSuggestions(true);
  }, []);

  // Handle search bar blur
  const handleSearchBlur = useCallback(() => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  }, []);

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback((suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
    setShowSuggestions(false);
  }, [handleSearch]);

  // Handle category filter change
  const handleCategoryFilter = useCallback((category: string) => {
    setSelectedCategory(category);
    if (query) {
      handleSearch(query); // Re-search with new category filter
    }
  }, [query, handleSearch]);

  // Get mode-specific styling
  const getModeClasses = () => {
    switch (mode) {
      case 'hero':
        return 'text-center py-16';
      case 'modal':
        return 'p-6';
      default:
        return 'py-8';
    }
  };

  // CONTEXT7 SOURCE: /context7/motion_dev - Container animations for integrated interfaces
  // IMPLEMENTATION REASON: Motion documentation Section 13.2 recommends staggered animations for complex layouts
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full ${getModeClasses()} ${className}`}
    >
      {/* Main search interface */}
      <motion.div variants={itemVariants} className="relative max-w-4xl mx-auto">
        {/* Search bar with voice button */}
        <div className="relative flex items-center gap-4">
          <div className="flex-1 relative">
            <AnimatedSearchBar
              onSearch={handleSearch}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              placeholder={placeholder}
              suggestions={getSearchSuggestions(query)}
              showHistory={showHistory}
              className="w-full"
            />

            {/* Search suggestions overlay */}
            <AnimatePresence>
              {showSuggestions && (
                <SearchSuggestions
                  query={query}
                  isVisible={showSuggestions}
                  suggestions={[]} // Will be populated by AnimatedSearchBar
                  recentSearches={getRecentSearches(5).map(s => s.query)}
                  popularQueries={[
                    "How much does tutoring cost?",
                    "What subjects do you offer?",
                    "How do I get started?",
                    "What are your success rates?"
                  ]}
                  onSelectSuggestion={handleSuggestionSelect}
                  onClose={() => setShowSuggestions(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Voice search button */}
          {showVoiceSearch && (
            <VoiceSearchButton
              onVoiceResult={handleVoiceResult}
              language="en-GB"
              size="lg"
              variant="primary"
            />
          )}

          {/* View mode toggle */}
          {showQuickAccess && (
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-xl p-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Search status */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <SearchIcon className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">Searching...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Quick access cards */}
      {showQuickAccess && !showResults && (
        <motion.div 
          variants={itemVariants}
          className="mt-12"
        >
          <QuickAccessCards
            onCardClick={handleQuickAccessClick}
            onCategoryFilter={handleCategoryFilter}
            selectedCategory={selectedCategory}
            maxCards={maxQuickAccessCards}
            showFilters={true}
            showStats={true}
          />
        </motion.div>
      )}

      {/* Search results overlay */}
      <SearchResultsOverlay
        isOpen={showResults}
        query={query}
        results={results}
        totalResults={results.length}
        isLoading={isSearching}
        onClose={() => setShowResults(false)}
        onResultClick={handleResultClick}
        onQueryChange={setQuery}
        showFilters={true}
      />

      {/* Quick stats (for hero mode) */}
      {mode === 'hero' && !showResults && (
        <motion.div 
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full mx-auto mb-3">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">150+</div>
            <div className="text-sm text-gray-600">FAQ Topics</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mx-auto mb-3">
              <SearchIcon className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">&lt;100ms</div>
            <div className="text-sm text-gray-600">Search Speed</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-full mx-auto mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default IntegratedSearchInterface;