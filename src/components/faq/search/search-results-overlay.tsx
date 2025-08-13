"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Search, 
  ArrowRight, 
  Filter, 
  SortAsc, 
  SortDesc,
  ChevronDown,
  ChevronUp,
  Hash,
  Clock,
  Star,
  Eye,
  ThumbsUp,
  ExternalLink,
  BookOpen,
  MessageCircle
} from 'lucide-react';

// CONTEXT7 SOURCE: /context7/motion_dev - Modal and overlay animation patterns
// IMPLEMENTATION REASON: Motion documentation Section 10.1 recommends backdrop and content separation for modals
// CONTEXT7 SOURCE: /context7/motion_dev - Text highlighting and search result animations
// IMPLEMENTATION REASON: Official Motion guide Section 11.3 specifies highlight animations for search results

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

interface SearchResultsOverlayProps {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  totalResults: number;
  isLoading?: boolean;
  onClose: () => void;
  onResultClick: (result: SearchResult) => void;
  onLoadMore?: () => void;
  onQueryChange?: (query: string) => void;
  showFilters?: boolean;
  className?: string;
}

type SortOption = 'relevance' | 'popularity' | 'recent' | 'helpful';
type FilterOption = 'all' | 'beginner' | 'intermediate' | 'advanced';

const SearchResultsOverlay: React.FC<SearchResultsOverlayProps> = ({
  isOpen,
  query,
  results,
  totalResults,
  isLoading = false,
  onClose,
  onResultClick,
  onLoadMore,
  onQueryChange,
  showFilters = true,
  className = ""
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [expandedResult, setExpandedResult] = useState<string | null>(null);
  const [displayedResults, setDisplayedResults] = useState<SearchResult[]>([]);
  
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Filter and sort results
  useEffect(() => {
    let filtered = [...results];

    // Apply difficulty filter
    if (filterBy !== 'all') {
      filtered = filtered.filter(result => result.difficulty === filterBy);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevanceScore - a.relevanceScore;
        case 'popularity':
          return b.views - a.views;
        case 'recent':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    setDisplayedResults(filtered);
  }, [results, sortBy, filterBy]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Highlight matched text in search results
  const highlightText = (text: string, searchQuery: string): JSX.Element => {
    if (!searchQuery.trim()) {
      return <span>{text}</span>;
    }

    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) => 
          regex.test(part) ? (
            <motion.mark
              key={index}
              initial={{ backgroundColor: 'transparent' }}
              animate={{ backgroundColor: '#fef3c7' }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-yellow-200 text-yellow-900 px-1 rounded"
            >
              {part}
            </motion.mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  const toggleExpanded = (resultId: string) => {
    setExpandedResult(prev => prev === resultId ? null : resultId);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  // CONTEXT7 SOURCE: /context7/motion_dev - Modal backdrop and content animations
  // IMPLEMENTATION REASON: Motion documentation Section 10.2 recommends backdrop fade with content scale
  const overlayVariants = {
    hidden: { 
      opacity: 0,
      backdropFilter: "blur(0px)"
    },
    visible: { 
      opacity: 1,
      backdropFilter: "blur(8px)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const contentVariants = {
    hidden: {
      scale: 0.9,
      opacity: 0,
      y: 20
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const resultVariants = {
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto ${className}`}
          onClick={(e) => {
            if (e.target === overlayRef.current) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={contentRef}
            variants={contentVariants}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl my-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-200 p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Search className="w-6 h-6 text-blue-500" />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Search Results
                    </h2>
                    <p className="text-sm text-gray-600">
                      {isLoading ? (
                        "Searching..."
                      ) : (
                        <>
                          {displayedResults.length} of {totalResults} results for{" "}
                          <span className="font-medium">"{query}"</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close search results"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Search input */}
              <div className="relative mb-4">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => onQueryChange?.(e.target.value)}
                  placeholder="Refine your search..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>

              {/* Filters and sorting */}
              {showFilters && (
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Filter:</span>
                      <select
                        value={filterBy}
                        onChange={(e) => setFilterBy(e.target.value as FilterOption)}
                        className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="all">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      {sortBy === 'relevance' ? <SortDesc className="w-4 h-4 text-gray-500" /> : <SortAsc className="w-4 h-4 text-gray-500" />}
                      <span className="text-sm font-medium text-gray-700">Sort:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="popularity">Popularity</option>
                        <option value="recent">Most Recent</option>
                        <option value="helpful">Most Helpful</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500">
                    {Math.round((displayedResults.length / Math.max(totalResults, 1)) * 100)}% of results shown
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="p-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  ))}
                </div>
              ) : displayedResults.length > 0 ? (
                <motion.div className="space-y-6">
                  {displayedResults.map((result, index) => (
                    <motion.div
                      key={result.id}
                      variants={resultVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-2xl" role="img" aria-label={result.category}>
                              {result.categoryIcon}
                            </span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  {result.category}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(result.difficulty)}`}>
                                  {result.difficulty}
                                </span>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span>{result.relevanceScore.toFixed(1)}% match</span>
                                </div>
                              </div>
                              <h3 
                                className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors cursor-pointer"
                                onClick={() => onResultClick(result)}
                              >
                                {highlightText(result.question, query)}
                              </h3>
                            </div>
                          </div>

                          <button
                            onClick={() => toggleExpanded(result.id)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label={expandedResult === result.id ? "Collapse answer" : "Expand answer"}
                          >
                            {expandedResult === result.id ? (
                              <ChevronUp className="w-4 h-4 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>

                        {/* Snippet */}
                        <div className="text-gray-600 mb-4">
                          {highlightText(result.snippet, query)}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                          {result.tags.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                              +{result.tags.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{formatNumber(result.views)} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              <span>{result.helpful}% helpful</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>Updated {new Date(result.lastUpdated).toLocaleDateString()}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => onResultClick(result)}
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                          >
                            <span>View Full Answer</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Expanded content */}
                        <AnimatePresence>
                          {expandedResult === result.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="text-gray-700 mb-4">
                                  {highlightText(result.answer, query)}
                                </div>

                                {/* Related questions */}
                                {result.relatedQuestions && result.relatedQuestions.length > 0 && (
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                                      <MessageCircle className="w-4 h-4" />
                                      Related Questions
                                    </h4>
                                    <div className="space-y-1">
                                      {result.relatedQuestions.slice(0, 3).map((relatedQ, index) => (
                                        <button
                                          key={index}
                                          onClick={() => onQueryChange?.(relatedQ)}
                                          className="block text-sm text-blue-600 hover:text-blue-700 hover:underline text-left"
                                        >
                                          {relatedQ}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-500 mb-4">
                    We couldn't find any FAQ answers matching "{query}".
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Try:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Using different keywords</li>
                      <li>Checking your spelling</li>
                      <li>Using more general terms</li>
                      <li>Browsing our FAQ categories</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Load more button */}
              {onLoadMore && displayedResults.length < totalResults && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center mt-8"
                >
                  <button
                    onClick={onLoadMore}
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
                  >
                    Load More Results ({totalResults - displayedResults.length} remaining)
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchResultsOverlay;