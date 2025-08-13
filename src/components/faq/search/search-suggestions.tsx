"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Hash, Clock, TrendingUp, Star, ChevronDown } from 'lucide-react';

// CONTEXT7 SOURCE: /context7/motion_dev - Stagger animation patterns for list elements
// IMPLEMENTATION REASON: Official Motion documentation Section 5.2 recommends stagger effects for improved perceived performance
// CONTEXT7 SOURCE: /streamich/react-use - Keyboard navigation patterns for accessible dropdowns
// IMPLEMENTATION REASON: React-use documentation Section 4.1 provides best practices for keyboard interaction

interface SuggestionItem {
  id: string;
  text: string;
  category: string;
  type: 'question' | 'category' | 'keyword';
  relevance: number;
  popularity?: number;
}

interface CategoryGroup {
  category: string;
  icon: string;
  suggestions: SuggestionItem[];
  priority: number;
}

interface SearchSuggestionsProps {
  query: string;
  isVisible: boolean;
  suggestions: SuggestionItem[];
  recentSearches: string[];
  popularQueries: string[];
  onSelectSuggestion: (suggestion: string) => void;
  onClose: () => void;
  maxSuggestions?: number;
  showCategories?: boolean;
  showRecentSearches?: boolean;
  className?: string;
}

const defaultSuggestions: SuggestionItem[] = [
  // About the Service
  { id: '1', text: 'What is My Private Tutor Online?', category: 'About the Service', type: 'question', relevance: 1.0, popularity: 85 },
  { id: '2', text: 'Why choose My Private Tutor Online?', category: 'About the Service', type: 'question', relevance: 0.9, popularity: 78 },
  { id: '3', text: 'Benefits of online tutoring', category: 'About the Service', type: 'keyword', relevance: 0.8, popularity: 65 },
  { id: '4', text: 'In-person tutoring availability', category: 'About the Service', type: 'keyword', relevance: 0.7, popularity: 42 },

  // Tutors & Teaching
  { id: '5', text: 'How do tutor tiers work?', category: 'Tutors & Teaching', type: 'question', relevance: 1.0, popularity: 92 },
  { id: '6', text: 'Which tutor tier is right for me?', category: 'Tutors & Teaching', type: 'question', relevance: 0.9, popularity: 88 },
  { id: '7', text: 'Change tutor if not satisfied', category: 'Tutors & Teaching', type: 'keyword', relevance: 0.8, popularity: 34 },
  { id: '8', text: 'Creative subjects tutoring', category: 'Tutors & Teaching', type: 'keyword', relevance: 0.7, popularity: 28 },

  // Subjects & Curriculum
  { id: '9', text: 'What subjects do you offer?', category: 'Subjects & Curriculum', type: 'question', relevance: 1.0, popularity: 96 },
  { id: '10', text: 'International exam boards support', category: 'Subjects & Curriculum', type: 'keyword', relevance: 0.9, popularity: 73 },
  { id: '11', text: 'University admissions support', category: 'Subjects & Curriculum', type: 'keyword', relevance: 0.8, popularity: 67 },

  // Progress & Results
  { id: '12', text: 'What are your success rates?', category: 'Progress & Results', type: 'question', relevance: 1.0, popularity: 89 },
  { id: '13', text: 'Testimonials and recommendations', category: 'Progress & Results', type: 'keyword', relevance: 0.9, popularity: 71 },
  { id: '14', text: 'Track tutoring progress', category: 'Progress & Results', type: 'keyword', relevance: 0.8, popularity: 56 },

  // Pricing & Payment
  { id: '15', text: 'How much does tutoring cost?', category: 'Pricing & Payment', type: 'question', relevance: 1.0, popularity: 98 },
  { id: '16', text: 'Payment methods and timing', category: 'Pricing & Payment', type: 'keyword', relevance: 0.9, popularity: 64 },
  { id: '17', text: 'Discounts and referral scheme', category: 'Pricing & Payment', type: 'keyword', relevance: 0.8, popularity: 47 },

  // Scheduling & Process
  { id: '18', text: 'How do I get started?', category: 'Scheduling & Process', type: 'question', relevance: 1.0, popularity: 94 },
  { id: '19', text: 'Track tutoring schedule', category: 'Scheduling & Process', type: 'keyword', relevance: 0.9, popularity: 52 },
  { id: '20', text: 'Try tutor before committing', category: 'Scheduling & Process', type: 'keyword', relevance: 0.8, popularity: 38 }
];

const categoryIcons: Record<string, string> = {
  'About the Service': '🌐',
  'Tutors & Teaching': '🧑‍🏫',
  'Subjects & Curriculum': '📚',
  'Progress & Results': '💡',
  'Pricing & Payment': '💰',
  'Scheduling & Process': '🗓️',
  'Other Questions': '❓'
};

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  isVisible,
  suggestions = defaultSuggestions,
  recentSearches = [],
  popularQueries = [],
  onSelectSuggestion,
  onClose,
  maxSuggestions = 8,
  showCategories = true,
  showRecentSearches = true,
  className = ""
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [filteredSuggestions, setFilteredSuggestions] = useState<CategoryGroup[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedItemRef = useRef<HTMLButtonElement>(null);

  // Filter and group suggestions based on query
  const filterSuggestions = useCallback(() => {
    if (!query.trim()) {
      // Show popular queries and recent searches when no query
      const groups: CategoryGroup[] = [];
      
      if (showRecentSearches && recentSearches.length > 0) {
        groups.push({
          category: 'Recent Searches',
          icon: '🕒',
          suggestions: recentSearches.slice(0, 3).map((search, index) => ({
            id: `recent-${index}`,
            text: search,
            category: 'Recent Searches',
            type: 'keyword' as const,
            relevance: 1.0
          })),
          priority: 1
        });
      }

      if (popularQueries.length > 0) {
        groups.push({
          category: 'Popular Questions',
          icon: '📈',
          suggestions: popularQueries.slice(0, 4).map((question, index) => ({
            id: `popular-${index}`,
            text: question,
            category: 'Popular Questions',
            type: 'question' as const,
            relevance: 1.0,
            popularity: 100 - index * 5
          })),
          priority: 2
        });
      }

      setFilteredSuggestions(groups);
      return;
    }

    // Filter suggestions based on query
    const queryLower = query.toLowerCase();
    const filtered = suggestions.filter(suggestion => 
      suggestion.text.toLowerCase().includes(queryLower) ||
      suggestion.category.toLowerCase().includes(queryLower)
    );

    // Group by category
    const groupedByCategory = filtered.reduce((acc, suggestion) => {
      const category = suggestion.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(suggestion);
      return acc;
    }, {} as Record<string, SuggestionItem[]>);

    // Convert to CategoryGroup array and sort
    const groups: CategoryGroup[] = Object.entries(groupedByCategory).map(([category, items]) => ({
      category,
      icon: categoryIcons[category] || '❓',
      suggestions: items
        .sort((a, b) => b.relevance - a.relevance)
        .slice(0, maxSuggestions),
      priority: items.reduce((sum, item) => sum + item.relevance, 0) / items.length
    })).sort((a, b) => b.priority - a.priority);

    setFilteredSuggestions(groups);
  }, [query, suggestions, recentSearches, popularQueries, maxSuggestions, showRecentSearches]);

  useEffect(() => {
    filterSuggestions();
    setSelectedIndex(-1);
  }, [filterSuggestions]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isVisible) return;

    const totalItems = filteredSuggestions.reduce((sum, group) => sum + group.suggestions.length, 0);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalItems);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? totalItems - 1 : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          const suggestion = getItemByIndex(selectedIndex);
          if (suggestion) {
            onSelectSuggestion(suggestion.text);
          }
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  }, [isVisible, selectedIndex, filteredSuggestions, onSelectSuggestion, onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedItemRef.current) {
      selectedItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const getItemByIndex = (index: number): SuggestionItem | null => {
    let currentIndex = 0;
    for (const group of filteredSuggestions) {
      for (const suggestion of group.suggestions) {
        if (currentIndex === index) {
          return suggestion;
        }
        currentIndex++;
      }
    }
    return null;
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const handleSuggestionClick = (suggestion: SuggestionItem) => {
    onSelectSuggestion(suggestion.text);
  };

  // CONTEXT7 SOURCE: /context7/motion_dev - Container animation with stagger children
  // IMPLEMENTATION REASON: Motion documentation Section 5.3 recommends staggerChildren for list animations
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const groupVariants = {
    hidden: { opacity: 0, y: -10 },
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  let itemIndex = 0;

  if (!isVisible || filteredSuggestions.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-xl shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto ${className}`}
        role="listbox"
        aria-label="Search suggestions"
      >
        {filteredSuggestions.map((group, groupIndex) => (
          <motion.div
            key={group.category}
            variants={groupVariants}
            className={`${groupIndex > 0 ? 'border-t border-gray-100' : ''}`}
          >
            {/* Category Header */}
            {showCategories && (
              <div className="sticky top-0 bg-gray-50/80 backdrop-blur-sm px-4 py-3 border-b border-gray-100">
                <button
                  onClick={() => toggleCategory(group.category)}
                  className="flex items-center justify-between w-full text-left"
                  aria-expanded={expandedCategories.has(group.category)}
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <span className="text-base" role="img" aria-label={group.category}>
                      {group.icon}
                    </span>
                    {group.category}
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                      {group.suggestions.length}
                    </span>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      expandedCategories.has(group.category) ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
              </div>
            )}

            {/* Suggestions List */}
            <AnimatePresence>
              {(!showCategories || expandedCategories.has(group.category)) && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {group.suggestions.map((suggestion) => {
                    const currentItemIndex = itemIndex++;
                    const isSelected = currentItemIndex === selectedIndex;

                    return (
                      <motion.button
                        key={suggestion.id}
                        ref={isSelected ? selectedItemRef : null}
                        variants={itemVariants}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`w-full text-left px-4 py-3 flex items-center justify-between group transition-all duration-200 ${
                          isSelected 
                            ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className={`transition-colors ${
                            isSelected ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-600'
                          }`}>
                            {suggestion.type === 'question' ? (
                              <Hash className="w-4 h-4" />
                            ) : suggestion.category === 'Recent Searches' ? (
                              <Clock className="w-4 h-4" />
                            ) : suggestion.category === 'Popular Questions' ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <Search className="w-4 h-4" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {suggestion.text}
                            </div>
                            {suggestion.popularity && (
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500">
                                  {suggestion.popularity}% match
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <ArrowRight className={`w-4 h-4 transition-all ${
                          isSelected 
                            ? 'text-blue-500 translate-x-1' 
                            : 'text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1'
                        }`} />
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        {/* No results message */}
        {query && filteredSuggestions.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="px-4 py-8 text-center text-gray-500"
          >
            <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No suggestions found for "{query}"</p>
            <p className="text-xs mt-1">Try different keywords or browse our FAQ categories</p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchSuggestions;