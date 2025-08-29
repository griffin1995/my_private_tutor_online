/**
 * CONTEXT7 SOURCE: /radix-ui/website - Enhanced rating components with gamification rewards
 * CONTEXT7 SOURCE: /context7/motion_dev - Reward animations and achievement celebrations
 * IMPLEMENTATION REASON: Task 21 - Gamified FAQ rating system with point rewards and achievement tracking
 * 
 * FAQ Gamification Rating Component - Enhanced Rating with Rewards
 * Extends the existing FAQ rating system with gamification elements
 * Provides immediate feedback and rewards for user engagement
 * 
 * FEATURES:
 * - Point rewards for helpful votes
 * - Achievement notifications for rating milestones
 * - Visual feedback and celebration animations
 * - Integration with existing FAQRatingSystem
 * - Royal client quality with professional design
 * 
 * BUSINESS IMPACT: Increases user engagement leading to higher conversion rates
 * REVENUE OPPORTUNITY: Supports £381,600 revenue target through enhanced UX
 */

"use client"

import React from 'react'
// CONTEXT7 SOURCE: /context7/motion_dev - Advanced animations for reward celebrations and feedback
// REWARD ANIMATIONS: Official Motion documentation recommends spring physics for celebratory interactions
import { m, AnimatePresence } from 'framer-motion'
// CONTEXT7 SOURCE: /radix-ui/website - Button and Badge components for rating interface
// UI COMPONENTS: Professional rating interface with accessibility compliance
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  ThumbsUp, 
  ThumbsDown, 
  Star, 
  Sparkles, 
  Plus,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react'
// CONTEXT7 SOURCE: /facebook/react - Custom hooks for gamification integration
// GAMIFICATION HOOKS: Integration with gamification tracking system
import { useGamification, useHelpfulVoteTracker } from './faq-gamification-tracker'

// CONTEXT7 SOURCE: /microsoft/typescript - Interface definitions for enhanced rating component
// TYPE DEFINITIONS: Comprehensive typing for gamified rating system
interface GamificationRatingProps {
  questionId: string
  questionText: string
  onRatingSubmit?: (data: {
    questionId: string
    rating: 'helpful' | 'not_helpful'
    feedback?: string
    timestamp: number
  }) => void
  className?: string
  showPoints?: boolean
  enableAnimations?: boolean
  compact?: boolean
}

interface RatingFeedback {
  type: 'helpful' | 'not_helpful'
  points: number
  message: string
  achievementUnlocked?: string
}

/**
 * Gamification Enhanced Rating Component
 * CONTEXT7 SOURCE: /vercel/next.js - Component composition patterns for enhanced functionality
 * ENHANCEMENT REASON: Extends basic rating with gamification rewards and visual feedback
 */
export function FAQGamificationRating({
  questionId,
  questionText,
  onRatingSubmit,
  className = "",
  showPoints = true,
  enableAnimations = true,
  compact = false
}: GamificationRatingProps) {
  
  // CONTEXT7 SOURCE: /facebook/react - Gamification state and tracking hooks
  // GAMIFICATION INTEGRATION: Access to progress tracking and reward system
  const { progress, getTotalPoints } = useGamification()
  const { trackHelpfulVote } = useHelpfulVoteTracker()
  
  // CONTEXT7 SOURCE: /facebook/react - Component state for rating interactions
  // RATING STATE: Track user interactions and feedback display
  const [hasRated, setHasRated] = React.useState(false)
  const [ratingType, setRatingType] = React.useState<'helpful' | 'not_helpful' | null>(null)
  const [showReward, setShowReward] = React.useState(false)
  const [feedback, setFeedback] = React.useState<RatingFeedback | null>(null)
  const [isAnimating, setIsAnimating] = React.useState(false)
  
  // CONTEXT7 SOURCE: /facebook/react - Check if question has been previously rated
  // RATING PERSISTENCE: Prevent duplicate ratings for same question
  React.useEffect(() => {
    const ratedQuestions = localStorage.getItem('faq-rated-questions')
    if (ratedQuestions) {
      try {
        const parsed = JSON.parse(ratedQuestions)
        if (parsed[questionId]) {
          setHasRated(true)
          setRatingType(parsed[questionId].type)
        }
      } catch (error) {
        console.warn('Failed to parse rated questions:', error)
      }
    }
  }, [questionId])
  
  // CONTEXT7 SOURCE: /facebook/react - Save rating to prevent duplicate votes
  // RATING PERSISTENCE: Store user ratings in localStorage
  const saveRatingToStorage = React.useCallback((type: 'helpful' | 'not_helpful') => {
    const ratedQuestions = localStorage.getItem('faq-rated-questions')
    const existing = ratedQuestions ? JSON.parse(ratedQuestions) : {}
    
    existing[questionId] = {
      type,
      timestamp: Date.now(),
      questionText: questionText.slice(0, 100) // Store partial text for reference
    }
    
    localStorage.setItem('faq-rated-questions', JSON.stringify(existing))
  }, [questionId, questionText])
  
  // CONTEXT7 SOURCE: /facebook/react - Handle rating submission with rewards
  // RATING HANDLER: Process rating and calculate rewards with achievement checking
  const handleRating = React.useCallback(async (type: 'helpful' | 'not_helpful') => {
    if (hasRated) return
    
    setIsAnimating(true)
    
    // Calculate points and determine feedback
    const points = type === 'helpful' ? 5 : 2 // More points for helpful votes
    const messages = {
      helpful: [
        "Thank you for your feedback! 🌟",
        "Great! Your input helps others! ✨",
        "Excellent! Knowledge shared is knowledge doubled! 👑",
        "Wonderful! You're contributing to our royal community! 🏆"
      ],
      not_helpful: [
        "Thanks for the feedback! We'll improve! 💡",
        "Your input helps us enhance our service! 🔧",
        "Thank you for helping us serve you better! 📈"
      ]
    }
    
    const randomMessage = messages[type][Math.floor(Math.random() * messages[type].length)]
    
    // Check for achievement unlocks
    let achievementUnlocked = undefined
    const newVoteCount = progress.helpfulVotes + (type === 'helpful' ? 1 : 0)
    
    if (type === 'helpful' && newVoteCount === 1) {
      achievementUnlocked = "First helpful vote! Welcome to our community!"
    } else if (type === 'helpful' && newVoteCount === 5) {
      achievementUnlocked = "Helpful Contributor - 5 helpful votes!"
    } else if (type === 'helpful' && newVoteCount === 10) {
      achievementUnlocked = "Community Champion - 10 helpful votes!"
    }
    
    const feedbackData: RatingFeedback = {
      type,
      points,
      message: randomMessage,
      achievementUnlocked
    }
    
    setFeedback(feedbackData)
    setRatingType(type)
    setHasRated(true)
    setShowReward(true)
    
    // Track the vote
    trackHelpfulVote(questionId, type === 'helpful')
    
    // Save to prevent duplicates
    saveRatingToStorage(type)
    
    // Notify parent component
    onRatingSubmit?.({
      questionId,
      rating: type,
      timestamp: Date.now()
    })
    
    // Auto-hide reward after animation
    if (enableAnimations) {
      setTimeout(() => {
        setShowReward(false)
        setIsAnimating(false)
      }, 3000)
    } else {
      setTimeout(() => {
        setShowReward(false)
        setIsAnimating(false)
      }, 2000)
    }
  }, [hasRated, progress.helpfulVotes, trackHelpfulVote, questionId, onRatingSubmit, saveRatingToStorage, enableAnimations])
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Animation variants for reward celebrations
  // REWARD ANIMATIONS: Celebratory animations for positive user feedback
  const rewardAnimationVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 20 
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Button interaction animations
  // BUTTON ANIMATIONS: Interactive feedback for rating buttons
  const buttonAnimationVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        type: "spring" as const,
        stiffness: 600,
        damping: 30
      }
    },
    selected: {
      scale: 1.1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    }
  }
  
  if (compact) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {/* Compact Rating Buttons */}
        <div className="flex items-center space-x-1">
          <m.div
            variants={enableAnimations ? buttonAnimationVariants : {}}
            initial="idle"
            whileHover={!hasRated && enableAnimations ? "hover" : "idle"}
            whileTap={!hasRated && enableAnimations ? "tap" : "idle"}
            animate={hasRated && ratingType === 'helpful' ? "selected" : "idle"}
          >
            <Button
              size="sm"
              variant={hasRated && ratingType === 'helpful' ? "default" : "outline"}
              onClick={() => handleRating('helpful')}
              disabled={hasRated || isAnimating}
              className={`h-8 px-3 ${
                hasRated && ratingType === 'helpful' 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'hover:bg-green-50 hover:border-green-300 hover:text-green-700'
              } transition-all duration-200`}
            >
              <ThumbsUp size={14} className="mr-1" />
              <span className="text-xs">Helpful</span>
              {showPoints && feedback && feedback.type === 'helpful' && (
                <Badge variant="secondary" className="ml-1 text-xs px-1">
                  +{feedback.points}
                </Badge>
              )}
            </Button>
          </m.div>
          
          <m.div
            variants={enableAnimations ? buttonAnimationVariants : {}}
            initial="idle"
            whileHover={!hasRated && enableAnimations ? "hover" : "idle"}
            whileTap={!hasRated && enableAnimations ? "tap" : "idle"}
            animate={hasRated && ratingType === 'not_helpful' ? "selected" : "idle"}
          >
            <Button
              size="sm"
              variant={hasRated && ratingType === 'not_helpful' ? "secondary" : "outline"}
              onClick={() => handleRating('not_helpful')}
              disabled={hasRated || isAnimating}
              className={`h-8 px-3 ${
                hasRated && ratingType === 'not_helpful'
                  ? 'bg-slate-200 text-slate-700'
                  : 'hover:bg-slate-50 hover:border-slate-300'
              } transition-all duration-200`}
            >
              <ThumbsDown size={14} className="mr-1" />
              <span className="text-xs">Not Helpful</span>
            </Button>
          </m.div>
        </div>
        
        {/* Compact Reward Display */}
        <AnimatePresence>
          {showReward && feedback && enableAnimations && (
            <m.div
              variants={rewardAnimationVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex items-center space-x-1 text-xs"
            >
              <Sparkles size={12} className="text-amber-500" />
              <span className="text-green-600 font-semibold">+{feedback.points}pts</span>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
  
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Rating Question */}
      <div className="text-center">
        <p className="text-sm font-medium text-slate-700 mb-4">
          Was this answer helpful?
        </p>
        
        {/* Rating Buttons */}
        <div className="flex items-center justify-center space-x-4">
          <m.div
            variants={enableAnimations ? buttonAnimationVariants : {}}
            initial="idle"
            whileHover={!hasRated && enableAnimations ? "hover" : "idle"}
            whileTap={!hasRated && enableAnimations ? "tap" : "idle"}
            animate={hasRated && ratingType === 'helpful' ? "selected" : "idle"}
          >
            <Button
              variant={hasRated && ratingType === 'helpful' ? "default" : "outline"}
              onClick={() => handleRating('helpful')}
              disabled={hasRated || isAnimating}
              className={`flex items-center space-x-2 px-6 py-3 ${
                hasRated && ratingType === 'helpful' 
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
                  : 'hover:bg-green-50 hover:border-green-300 hover:text-green-700 hover:shadow-md'
              } transition-all duration-300`}
            >
              <ThumbsUp size={18} />
              <span className="font-medium">Yes, helpful!</span>
              {showPoints && (
                <Badge variant="secondary" className="ml-2">
                  +5 pts
                </Badge>
              )}
            </Button>
          </m.div>
          
          <m.div
            variants={enableAnimations ? buttonAnimationVariants : {}}
            initial="idle"
            whileHover={!hasRated && enableAnimations ? "hover" : "idle"}
            whileTap={!hasRated && enableAnimations ? "tap" : "idle"}
            animate={hasRated && ratingType === 'not_helpful' ? "selected" : "idle"}
          >
            <Button
              variant={hasRated && ratingType === 'not_helpful' ? "secondary" : "outline"}
              onClick={() => handleRating('not_helpful')}
              disabled={hasRated || isAnimating}
              className={`flex items-center space-x-2 px-6 py-3 ${
                hasRated && ratingType === 'not_helpful'
                  ? 'bg-slate-200 text-slate-700 shadow-lg'
                  : 'hover:bg-slate-50 hover:border-slate-300 hover:shadow-md'
              } transition-all duration-300`}
            >
              <ThumbsDown size={18} />
              <span className="font-medium">Could be better</span>
              {showPoints && (
                <Badge variant="outline" className="ml-2">
                  +2 pts
                </Badge>
              )}
            </Button>
          </m.div>
        </div>
      </div>
      
      {/* Reward Feedback */}
      <AnimatePresence>
        {showReward && feedback && (
          <m.div
            variants={rewardAnimationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  {feedback.type === 'helpful' ? (
                    <Sparkles className="text-amber-500" size={24} />
                  ) : (
                    <TrendingUp className="text-blue-500" size={24} />
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-700">
                      +{feedback.points} points
                    </span>
                    <Zap className="text-amber-500" size={16} />
                  </div>
                </div>
                
                <p className="text-sm text-green-800 mb-2">
                  {feedback.message}
                </p>
                
                {feedback.achievementUnlocked && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Award className="text-amber-600" size={20} />
                      <span className="text-sm font-bold text-amber-800">
                        Achievement Unlocked!
                      </span>
                    </div>
                    <p className="text-xs text-amber-700">
                      {feedback.achievementUnlocked}
                    </p>
                  </div>
                )}
                
                {showPoints && (
                  <div className="mt-3 text-xs text-slate-600">
                    Total Points: {getTotalPoints()}
                  </div>
                )}
              </CardContent>
            </Card>
          </m.div>
        )}
      </AnimatePresence>
      
      {/* Static Thank You Message (for non-animated mode) */}
      {hasRated && !showReward && !enableAnimations && (
        <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-700">
            Thank you for your feedback! Your input helps improve our service.
          </p>
          {showPoints && feedback && (
            <p className="text-xs text-green-600 font-semibold mt-1">
              +{feedback.points} points earned
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * Rating Statistics Component
 * CONTEXT7 SOURCE: /facebook/react - Statistics display for FAQ rating effectiveness
 * STATISTICS DISPLAY: Show rating statistics to encourage participation
 */
interface RatingStatisticsProps {
  questionId: string
  className?: string
}

export function RatingStatistics({ questionId, className = "" }: RatingStatisticsProps) {
  const [stats, setStats] = React.useState({
    helpfulVotes: 0,
    totalVotes: 0,
    helpfulPercentage: 0
  })
  
  // CONTEXT7 SOURCE: /facebook/react - Load rating statistics from localStorage
  // STATISTICS LOADING: Calculate and display rating statistics
  React.useEffect(() => {
    const ratedQuestions = localStorage.getItem('faq-rated-questions')
    if (ratedQuestions) {
      try {
        const parsed = JSON.parse(ratedQuestions)
        
        // Calculate global statistics (in a real app, this would be per question)
        const allRatings = Object.values(parsed) as Array<{ type: 'helpful' | 'not_helpful' }>
        const helpfulCount = allRatings.filter(r => r.type === 'helpful').length
        const total = allRatings.length
        
        setStats({
          helpfulVotes: helpfulCount,
          totalVotes: total,
          helpfulPercentage: total > 0 ? Math.round((helpfulCount / total) * 100) : 0
        })
      } catch (error) {
        console.warn('Failed to parse rating statistics:', error)
      }
    }
  }, [questionId])
  
  if (stats.totalVotes === 0) {
    return null
  }
  
  return (
    <div className={`flex items-center justify-center space-x-4 text-xs text-slate-500 ${className}`}>
      <div className="flex items-center space-x-1">
        <ThumbsUp size={12} />
        <span>{stats.helpfulVotes} found this helpful</span>
      </div>
      <div className="flex items-center space-x-1">
        <Star size={12} />
        <span>{stats.helpfulPercentage}% helpful rating</span>
      </div>
    </div>
  )
}