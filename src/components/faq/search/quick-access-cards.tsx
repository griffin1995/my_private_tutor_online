"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  Filter, 
  ChevronRight, 
  Star, 
  Eye,
  MessageCircle,
  Heart,
  Users
} from 'lucide-react';

// CONTEXT7 SOURCE: /context7/motion_dev - Card hover animations and layout transitions
// IMPLEMENTATION REASON: Motion documentation Section 6.1 recommends layoutId for smooth card animations
// CONTEXT7 SOURCE: /context7/motion_dev - Gesture press animations for interactive elements
// IMPLEMENTATION REASON: Official Motion guide Section 7.2 specifies press gesture patterns for cards

interface FAQCard {
  id: string;
  question: string;
  answer: string;
  category: string;
  categoryIcon: string;
  popularity: number;
  views: number;
  helpful: number;
  tags: string[];
  lastUpdated: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface QuickAccessCardsProps {
  cards?: FAQCard[];
  onCardClick: (card: FAQCard) => void;
  onCategoryFilter?: (category: string) => void;
  selectedCategory?: string;
  maxCards?: number;
  showFilters?: boolean;
  showStats?: boolean;
  className?: string;
}

const defaultCards: FAQCard[] = [
  {
    id: '1',
    question: 'How much does tutoring cost?',
    answer: 'Bespoke 1-2-1 tutoring starts from just £45 per hour. Unlike many other providers, we don\'t charge registration, placement or administrative fees.',
    category: 'Pricing & Payment',
    categoryIcon: '💰',
    popularity: 98,
    views: 2847,
    helpful: 94,
    tags: ['pricing', 'cost', 'fees', 'payment'],
    lastUpdated: '2024-08-01',
    difficulty: 'beginner'
  },
  {
    id: '2',
    question: 'What subjects do you offer tutoring in?',
    answer: 'We cover all major academic and entrance exam subjects, including entrance exams (4+, 7+, 11+, 13+, 16+), core subjects (English, Maths, Sciences), languages, humanities, and more.',
    category: 'Subjects & Curriculum',
    categoryIcon: '📚',
    popularity: 96,
    views: 2654,
    helpful: 92,
    tags: ['subjects', 'curriculum', 'courses', 'offerings'],
    lastUpdated: '2024-08-02',
    difficulty: 'beginner'
  },
  {
    id: '3',
    question: 'How do I get started?',
    answer: 'Simply complete our enquiry form, schedule a consultation with Elizabeth (our Founder), receive a tailored tutor recommendation, book an initial lesson, and begin regular sessions.',
    category: 'Scheduling & Process',
    categoryIcon: '🗓️',
    popularity: 94,
    views: 2456,
    helpful: 96,
    tags: ['getting started', 'process', 'onboarding', 'first steps'],
    lastUpdated: '2024-08-03',
    difficulty: 'beginner'
  },
  {
    id: '4',
    question: 'How do tutor tiers work?',
    answer: 'Tier 1: Super Tutors (official examiners), Tier 2: Qualified teachers with 5+ years experience, Tier 3: Graduate subject specialists. Each tier is designed for different learning needs and budgets.',
    category: 'Tutors & Teaching',
    categoryIcon: '🧑‍🏫',
    popularity: 92,
    views: 2198,
    helpful: 89,
    tags: ['tutors', 'tiers', 'qualifications', 'selection'],
    lastUpdated: '2024-08-04',
    difficulty: 'intermediate'
  },
  {
    id: '5',
    question: 'What are your success rates?',
    answer: '94% of GCSE students improve by at least two grades. Many progress from grade 5 to 8/9 within months. We also have consistent placements at Oxbridge and other top-tier universities.',
    category: 'Progress & Results',
    categoryIcon: '💡',
    popularity: 89,
    views: 2012,
    helpful: 91,
    tags: ['results', 'success', 'grades', 'improvement'],
    lastUpdated: '2024-08-05',
    difficulty: 'beginner'
  },
  {
    id: '6',
    question: 'Do you offer university admissions support?',
    answer: 'Yes, we provide personal statement coaching, interview preparation, subject-specific entrance tests, and Oxbridge and Ivy League strategy masterclasses.',
    category: 'Subjects & Curriculum',
    categoryIcon: '📚',
    popularity: 78,
    views: 1834,
    helpful: 88,
    tags: ['university', 'admissions', 'oxbridge', 'interviews'],
    lastUpdated: '2024-08-06',
    difficulty: 'advanced'
  },
  {
    id: '7',
    question: 'What if I don\'t like my tutor?',
    answer: 'No problem. We\'ll quickly match you with another educator until we find the ideal fit. Your satisfaction and learning outcomes are our priority.',
    category: 'Tutors & Teaching',
    categoryIcon: '🧑‍🏫',
    popularity: 67,
    views: 1567,
    helpful: 85,
    tags: ['tutor change', 'satisfaction', 'matching', 'replacement'],
    lastUpdated: '2024-08-07',
    difficulty: 'beginner'
  },
  {
    id: '8',
    question: 'Do you offer discounts?',
    answer: 'Yes, discounts are available for block bookings (15+ lessons/month) and sibling enrolment. We also have a referral scheme offering free lesson credits.',
    category: 'Pricing & Payment',
    categoryIcon: '💰',
    popularity: 72,
    views: 1432,
    helpful: 82,
    tags: ['discounts', 'savings', 'referrals', 'siblings'],
    lastUpdated: '2024-08-08',
    difficulty: 'beginner'
  }
];

const categories = [
  'All Categories',
  'Pricing & Payment',
  'Subjects & Curriculum',
  'Tutors & Teaching',
  'Progress & Results',
  'Scheduling & Process',
  'About the Service'
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'text-green-600 bg-green-100';
    case 'intermediate': return 'text-yellow-600 bg-yellow-100';
    case 'advanced': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const QuickAccessCards: React.FC<QuickAccessCardsProps> = ({
  cards = defaultCards,
  onCardClick,
  onCategoryFilter,
  selectedCategory = 'All Categories',
  maxCards = 6,
  showFilters = true,
  showStats = true,
  className = ""
}) => {
  const [sortBy, setSortBy] = useState<'popularity' | 'views' | 'helpful'>('popularity');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Filter and sort cards
  const filteredAndSortedCards = useMemo(() => {
    let filtered = cards;

    // Filter by category
    if (selectedCategory && selectedCategory !== 'All Categories') {
      filtered = cards.filter(card => card.category === selectedCategory);
    }

    // Sort cards
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'views':
          return b.views - a.views;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

    return sorted.slice(0, maxCards);
  }, [cards, selectedCategory, sortBy, maxCards]);

  const handleCategoryChange = (category: string) => {
    onCategoryFilter?.(category);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  // CONTEXT7 SOURCE: /context7/motion_dev - Container animation with stagger children
  // IMPLEMENTATION REASON: Motion documentation Section 8.1 recommends staggerChildren for grid layouts
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const filterVariants = {
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

  return (
    <div className={`w-full ${className}`}>
      {/* Filters */}
      {showFilters && (
        <motion.div
          variants={filterVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filter by category:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'popularity' | 'views' | 'helpful')}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="popularity">Popularity</option>
                <option value="views">Views</option>
                <option value="helpful">Helpfulness</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredAndSortedCards.map((card) => (
            <motion.div
              key={card.id}
              layoutId={card.id}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredCard(card.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => onCardClick(card)}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer group relative"
            >
              {/* Gradient overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === card.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5 z-10 pointer-events-none"
              />

              <div className="p-6 relative z-20">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl" role="img" aria-label={card.category}>
                      {card.categoryIcon}
                    </span>
                    <div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {card.category}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full mt-1 ${getDifficultyColor(card.difficulty)}`}>
                        {card.difficulty}
                      </div>
                    </div>
                  </div>

                  <motion.div
                    animate={{ 
                      x: hoveredCard === card.id ? 5 : 0,
                      rotate: hoveredCard === card.id ? 45 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                  </motion.div>
                </div>

                {/* Question */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                  {card.question}
                </h3>

                {/* Answer Preview */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 group-hover:text-gray-700">
                  {card.answer}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {card.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                  {card.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                      +{card.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                {showStats && (
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>{card.popularity}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{formatNumber(card.views)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span>{card.helpful}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>Updated {new Date(card.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Hover glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === card.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 shadow-xl shadow-blue-500/10 rounded-xl pointer-events-none"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* No results message */}
      {filteredAndSortedCards.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No questions found
          </h3>
          <p className="text-gray-500">
            Try selecting a different category or check back later for new content.
          </p>
        </motion.div>
      )}

      {/* Show more indicator */}
      {cards.length > maxCards && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>Showing {filteredAndSortedCards.length} of {cards.length} questions</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuickAccessCards;