// CONTEXT7 SOURCE: /context7/react_dev - React functional component patterns with TypeScript
// COMPONENT PATTERN: Official React docs recommend this functional component structure
// CONTEXT7 SOURCE: /context7/motion_dev - Framer Motion animation patterns for interactive elements  
// ANIMATION REASON: Motion dev docs show whileHover, whileTap, and variants for smooth interactions

'use client'

import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTestimonialRating } from '@/hooks/use-testimonials-rating'

interface TestimonialRatingInterfaceProps {
  testimonialId: string
  className?: string
  showStats?: boolean
  variant?: 'compact' | 'full'
}

// CONTEXT7 SOURCE: /context7/motion_dev - Animation variants for orchestrated animations
// VARIANTS PATTERN: Motion documentation shows this pattern for reusable animation states
const buttonVariants = {
  idle: { 
    scale: 1, 
    opacity: 0.7,
    transition: { duration: 0.2 }
  },
  hover: { 
    scale: 1.05, 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  },
  active: {
    scale: 1,
    opacity: 1,
    backgroundColor: 'var(--color-gold)',
    color: 'var(--color-navy)',
    transition: { duration: 0.3 }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Star animation variants for interactive feedback
// STAR ANIMATION: Motion dev docs recommend this pattern for rating interactions
const starVariants = {
  empty: { 
    scale: 1, 
    opacity: 0.3,
    fill: 'transparent',
    stroke: 'currentColor'
  },
  filled: { 
    scale: 1, 
    opacity: 1,
    fill: 'var(--color-gold)',
    stroke: 'var(--color-gold)'
  },
  hover: { 
    scale: 1.1,
    opacity: 1,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.9,
    transition: { duration: 0.1 }
  }
}

// CONTEXT7 SOURCE: /context7/motion_dev - Container animation for smooth state transitions
// CONTAINER PATTERN: Official Motion docs for parent-child animation coordination
const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.3,
      staggerChildren: 0.1 
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.2 }
  }
}

export const TestimonialRatingInterface: React.FC<TestimonialRatingInterfaceProps> = ({
  testimonialId,
  className = '',
  showStats = true,
  variant = 'full'
}) => {
  const {
    currentRating,
    stats,
    hasInteracted,
    isSubmitting,
    error,
    submitRating,
    submitStarRating,
    submitFeedback,
    clearError
  } = useTestimonialRating(testimonialId)
  
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [hoveredStar, setHoveredStar] = useState(0)
  
  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for event handlers optimization
  // CALLBACK PATTERN: React documentation shows useCallback prevents unnecessary re-renders
  const handleHelpfulClick = useCallback(async () => {
    await submitRating('helpful')
  }, [submitRating])
  
  const handleNotHelpfulClick = useCallback(async () => {
    await submitRating('not-helpful')
  }, [submitRating])
  
  const handleStarClick = useCallback(async (starValue: number) => {
    await submitStarRating(starValue)
  }, [submitStarRating])
  
  const handleFeedbackSubmit = useCallback(async () => {
    if (feedbackText.trim()) {
      await submitFeedback(feedbackText.trim())
      setFeedbackText('')
      setShowFeedback(false)
    }
  }, [feedbackText, submitFeedback])
  
  const handleStarHover = useCallback((starValue: number) => {
    setHoveredStar(starValue)
  }, [])
  
  const handleStarLeave = useCallback(() => {
    setHoveredStar(0)
  }, [])
  
  // Clear error when component unmounts or testimonialId changes
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, clearError])
  
  const isCompact = variant === 'compact'
  const userRating = currentRating?.rating
  const userStarRating = currentRating?.starRating || 0
  const displayStars = hoveredStar || userStarRating
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className={`testimonial-rating-interface ${className}`}
      aria-label="Rate this testimonial"
    >
      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm"
            role="alert"
            aria-live="polite"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Rating Question */}
      {!hasInteracted && !isCompact && (
        <motion.p 
          className="text-sm font-medium text-slate-700 mb-3"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          Was this testimonial helpful?
        </motion.p>
      )}
      
      {/* Helpful/Not Helpful Buttons */}
      <div className="flex items-center gap-3 mb-4">
        <motion.button
          variants={buttonVariants}
          initial="idle"
          animate={userRating === 'helpful' ? 'active' : 'idle'}
          whileHover={!isSubmitting ? 'hover' : 'idle'}
          whileTap={!isSubmitting ? 'tap' : 'idle'}
          onClick={handleHelpfulClick}
          disabled={isSubmitting}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md border transition-colors
            ${userRating === 'helpful' 
              ? 'bg-green-50 border-green-300 text-green-700' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
          `}
          aria-pressed={userRating === 'helpful'}
          aria-label="Mark testimonial as helpful"
        >
          {/* CONTEXT7 SOURCE: /context7/motion_dev - SVG animation within motion components */}
          {/* SVG PATTERN: Motion docs show proper SVG integration for micro-animations */}
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={userRating === 'helpful' ? { rotate: [0, 10, 0] } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h3a2 2 0 0 1 2 2v1.88Z" />
          </motion.svg>
          <span className={isCompact ? 'sr-only' : 'text-sm font-medium'}>
            Helpful {stats.helpfulCount > 0 && `(${stats.helpfulCount})`}
          </span>
        </motion.button>
        
        <motion.button
          variants={buttonVariants}
          initial="idle"
          animate={userRating === 'not-helpful' ? 'active' : 'idle'}
          whileHover={!isSubmitting ? 'hover' : 'idle'}
          whileTap={!isSubmitting ? 'tap' : 'idle'}
          onClick={handleNotHelpfulClick}
          disabled={isSubmitting}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md border transition-colors
            ${userRating === 'not-helpful' 
              ? 'bg-red-50 border-red-300 text-red-700' 
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          `}
          aria-pressed={userRating === 'not-helpful'}
          aria-label="Mark testimonial as not helpful"
        >
          <motion.svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={userRating === 'not-helpful' ? { rotate: [0, -10, 0] } : { rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            <path d="M17 14V2" />
            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h-3a2 2 0 0 1-2-2v-1.88Z" />
          </motion.svg>
          <span className={isCompact ? 'sr-only' : 'text-sm font-medium'}>
            Not helpful {stats.notHelpfulCount > 0 && `(${stats.notHelpfulCount})`}
          </span>
        </motion.button>
      </div>
      
      {/* Star Rating */}
      {!isCompact && (
        <div className="mb-4">
          <p className="text-sm font-medium text-slate-700 mb-2">
            Rate this testimonial:
          </p>
          <div 
            className="flex items-center gap-1"
            role="radiogroup"
            aria-label="Star rating"
            onMouseLeave={handleStarLeave}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                variants={starVariants}
                initial="empty"
                animate={star <= displayStars ? 'filled' : 'empty'}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                disabled={isSubmitting}
                className="p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 rounded"
                role="radio"
                aria-checked={star === userStarRating}
                aria-label={`Rate ${star} out of 5 stars`}
              >
                <motion.svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </motion.svg>
              </motion.button>
            ))}
            {stats.averageStarRating > 0 && showStats && (
              <motion.span 
                className="ml-2 text-sm text-slate-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                ({stats.averageStarRating.toFixed(1)} avg)
              </motion.span>
            )}
          </div>
        </div>
      )}
      
      {/* Feedback Section */}
      {!isCompact && hasInteracted && (
        <AnimatePresence>
          {!showFeedback ? (
            <motion.button
              key="feedback-trigger"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setShowFeedback(true)}
              className="text-sm text-slate-600 hover:text-slate-800 underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 rounded"
            >
              Add feedback (optional)
            </motion.button>
          ) : (
            <motion.div
              key="feedback-form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Your feedback:
                </span>
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Tell us more about your experience with this testimonial..."
                  className="mt-1 block w-full px-3 py-2 border border-slate-200 rounded-md text-sm
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500
                           placeholder:text-slate-400 resize-none"
                  rows={3}
                  maxLength={500}
                  disabled={isSubmitting}
                />
                <span className="text-xs text-slate-500 mt-1">
                  {feedbackText.length}/500 characters
                </span>
              </label>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleFeedbackSubmit}
                  disabled={isSubmitting || !feedbackText.trim()}
                  className="px-4 py-2 bg-slate-900 text-white text-sm rounded-md
                           hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowFeedback(false)
                    setFeedbackText('')
                  }}
                  className="px-4 py-2 text-slate-600 text-sm hover:text-slate-800
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 rounded-md"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      
      {/* Stats Display */}
      {showStats && stats.totalRatings > 0 && !isCompact && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500"
        >
          <div className="flex items-center gap-4">
            <span>
              {stats.totalRatings} rating{stats.totalRatings !== 1 ? 's' : ''}
            </span>
            {stats.averageStarRating > 0 && (
              <span>
                {stats.averageStarRating.toFixed(1)} ⭐ average
              </span>
            )}
            {stats.feedbackCount > 0 && (
              <span>
                {stats.feedbackCount} feedback{stats.feedbackCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Loading Indicator */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-md"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full"
              aria-label="Submitting rating"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TestimonialRatingInterface