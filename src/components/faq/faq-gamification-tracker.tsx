/**
 * CONTEXT7 SOURCE: /context7/motion_dev - Progress tracking animations with real-time updates
 * CONTEXT7 SOURCE: /facebook/react - Custom hooks for gamification event tracking
 * IMPLEMENTATION REASON: Task 21 - Seamless integration with existing FAQ components for progress tracking
 * 
 * FAQ Gamification Tracker Component - Integration Layer
 * Provides gamification event tracking hooks and progress monitoring
 * Integrates seamlessly with existing FAQ components without disruption
 * 
 * FEATURES:
 * - Real-time progress tracking hooks
 * - Event-driven gamification updates
 * - Performance optimized with minimal re-renders
 * - Privacy-conscious data collection
 * - Royal client quality standards
 * 
 * INTEGRATION: Works with FAQCategorySection, FAQEnhancedSearch, FAQRatingSystem
 * BUSINESS IMPACT: Supports £381,600 revenue opportunity through enhanced engagement
 */

"use client"

import React from 'react'
// CONTEXT7 SOURCE: /context7/motion_dev - Animation hooks for smooth progress updates
// PROGRESS ANIMATIONS: Official Motion documentation recommends useSpring for smooth numerical transitions
import { useSpring, useTransform } from 'framer-motion'
// CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interfaces for gamification events
// TYPE SAFETY: Comprehensive typing for gamification event system
import type { GamificationProgress } from './faq-gamification-system'

// CONTEXT7 SOURCE: /microsoft/typescript - Event tracking interface definitions
// EVENT SYSTEM: Strongly typed event system for gamification actions
interface GamificationEvent {
  type: 'question_read' | 'category_completed' | 'search_performed' | 'helpful_vote' | 'question_shared' | 'session_time'
  questionId?: string
  categoryId?: string
  searchQuery?: string
  platform?: string
  readingTime?: number
  isHelpful?: boolean
  resultsCount?: number
  timestamp: number
}

interface GamificationContextValue {
  progress: GamificationProgress
  trackEvent: (event: Omit<GamificationEvent, 'timestamp'>) => void
  getProgressPercentage: (type: 'questions' | 'categories' | 'achievements') => number
  getCurrentLevel: () => number
  getNextLevelProgress: () => number
  isAchievementUnlocked: (achievementId: string) => boolean
  getTotalPoints: () => number
}

// CONTEXT7 SOURCE: /facebook/react - React Context for gamification state management
// CONTEXT PROVIDER: Centralized gamification state accessible throughout FAQ components
const GamificationContext = React.createContext<GamificationContextValue | null>(null)

/**
 * Gamification Provider Component
 * CONTEXT7 SOURCE: /facebook/react - Context provider pattern for global state management
 * PROVIDER REASON: Official React documentation recommends Context for cross-component state sharing
 */
interface GamificationProviderProps {
  children: React.ReactNode
  totalQuestions: number
  totalCategories: number
  enableTracking?: boolean
}

export function GamificationProvider({ 
  children, 
  totalQuestions, 
  totalCategories, 
  enableTracking = true 
}: GamificationProviderProps) {
  
  // CONTEXT7 SOURCE: /facebook/react - State management for gamification progress
  // PROGRESS STATE: Comprehensive progress tracking with persistence
  const [progress, setProgress] = React.useState<GamificationProgress>({
    totalQuestionsRead: 0,
    categoriesCompleted: [],
    readingTimeMinutes: 0,
    searchesPerformed: 0,
    helpfulVotes: 0,
    questionsShared: 0,
    streakDays: 1,
    lastVisitDate: new Date().toISOString(),
    totalPoints: 0,
    level: 1
  })
  
  const [sessionEvents, setSessionEvents] = React.useState<GamificationEvent[]>([])
  const [readQuestionIds, setReadQuestionIds] = React.useState<Set<string>>(new Set())
  const [completedCategoryIds, setCompletedCategoryIds] = React.useState<Set<string>>(new Set())
  
  // CONTEXT7 SOURCE: /facebook/react - Effect hook for data persistence initialization
  // DATA LOADING: Load saved progress from localStorage on component mount
  React.useEffect(() => {
    if (!enableTracking) return
    
    const savedProgress = localStorage.getItem('faq-gamification-progress')
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress)
        
        // Calculate streak
        const lastVisit = new Date(parsedProgress.lastVisitDate)
        const today = new Date()
        const daysDiff = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24))
        
        if (daysDiff === 1) {
          parsedProgress.streakDays += 1
        } else if (daysDiff > 1) {
          parsedProgress.streakDays = 1
        }
        
        parsedProgress.lastVisitDate = today.toISOString()
        setProgress(parsedProgress)
        setReadQuestionIds(new Set(parsedProgress.readQuestions || []))
        setCompletedCategoryIds(new Set(parsedProgress.categoriesCompleted || []))
      } catch (error) {
        console.warn('Failed to parse gamification progress:', error)
      }
    }
  }, [enableTracking])
  
  // CONTEXT7 SOURCE: /facebook/react - Effect hook for progress persistence
  // DATA SAVING: Automatically save progress changes to localStorage
  React.useEffect(() => {
    if (!enableTracking) return
    
    const progressWithIds = {
      ...progress,
      readQuestions: Array.from(readQuestionIds),
      completedCategories: Array.from(completedCategoryIds)
    }
    
    localStorage.setItem('faq-gamification-progress', JSON.stringify(progressWithIds))
  }, [progress, readQuestionIds, completedCategoryIds, enableTracking])
  
  // CONTEXT7 SOURCE: /facebook/react - Event tracking function with progress updates
  // EVENT TRACKING: Process gamification events and update progress accordingly
  const trackEvent = React.useCallback((event: Omit<GamificationEvent, 'timestamp'>) => {
    if (!enableTracking) return
    
    const timestampedEvent: GamificationEvent = {
      ...event,
      timestamp: Date.now()
    }
    
    setSessionEvents(prev => [...prev, timestampedEvent])
    
    // Update progress based on event type
    setProgress(prev => {
      const newProgress = { ...prev }
      
      switch (event.type) {
        case 'question_read':
          if (event.questionId && !readQuestionIds.has(event.questionId)) {
            setReadQuestionIds(prevIds => new Set([...prevIds, event.questionId!]))
            newProgress.totalQuestionsRead = prev.totalQuestionsRead + 1
            newProgress.totalPoints = prev.totalPoints + 10
            newProgress.readingTimeMinutes = prev.readingTimeMinutes + (event.readingTime || 1)
          }
          break
          
        case 'category_completed':
          if (event.categoryId && !completedCategoryIds.has(event.categoryId)) {
            setCompletedCategoryIds(prevIds => new Set([...prevIds, event.categoryId!]))
            newProgress.categoriesCompleted = [...prev.categoriesCompleted, event.categoryId]
            newProgress.totalPoints = prev.totalPoints + 25
          }
          break
          
        case 'search_performed':
          newProgress.searchesPerformed = prev.searchesPerformed + 1
          newProgress.totalPoints = prev.totalPoints + (event.resultsCount && event.resultsCount > 0 ? 5 : 2)
          break
          
        case 'helpful_vote':
          if (event.isHelpful) {
            newProgress.helpfulVotes = prev.helpfulVotes + 1
            newProgress.totalPoints = prev.totalPoints + 5
          }
          break
          
        case 'question_shared':
          newProgress.questionsShared = prev.questionsShared + 1
          newProgress.totalPoints = prev.totalPoints + 15
          break
          
        case 'session_time':
          newProgress.readingTimeMinutes = prev.readingTimeMinutes + 1
          break
      }
      
      // Update level based on points
      newProgress.level = Math.floor(newProgress.totalPoints / 100) + 1
      
      return newProgress
    })
  }, [enableTracking, readQuestionIds, completedCategoryIds])
  
  // CONTEXT7 SOURCE: /microsoft/typescript - Utility functions for progress calculations
  // PROGRESS UTILITIES: Helper functions for calculating various progress metrics
  const getProgressPercentage = React.useCallback((type: 'questions' | 'categories' | 'achievements') => {
    switch (type) {
      case 'questions':
        return totalQuestions > 0 ? (progress.totalQuestionsRead / totalQuestions) * 100 : 0
      case 'categories':
        return totalCategories > 0 ? (progress.categoriesCompleted.length / totalCategories) * 100 : 0
      case 'achievements':
        // This would need to be calculated based on unlocked achievements
        return 0
      default:
        return 0
    }
  }, [progress.totalQuestionsRead, progress.categoriesCompleted.length, totalQuestions, totalCategories])
  
  const getCurrentLevel = React.useCallback(() => progress.level, [progress.level])
  
  const getNextLevelProgress = React.useCallback(() => {
    const pointsInCurrentLevel = progress.totalPoints % 100
    return (pointsInCurrentLevel / 100) * 100
  }, [progress.totalPoints])
  
  const isAchievementUnlocked = React.useCallback((achievementId: string) => {
    // This would check against saved achievements
    const savedAchievements = localStorage.getItem('faq-gamification-achievements')
    if (savedAchievements) {
      try {
        const achievements = JSON.parse(savedAchievements)
        return achievements.some((ach: any) => ach.id === achievementId && ach.unlocked)
      } catch (error) {
        return false
      }
    }
    return false
  }, [])
  
  const getTotalPoints = React.useCallback(() => progress.totalPoints, [progress.totalPoints])
  
  const contextValue: GamificationContextValue = {
    progress,
    trackEvent,
    getProgressPercentage,
    getCurrentLevel,
    getNextLevelProgress,
    isAchievementUnlocked,
    getTotalPoints
  }
  
  return (
    <GamificationContext.Provider value={contextValue}>
      {children}
    </GamificationContext.Provider>
  )
}

/**
 * Gamification Hook for Component Integration
 * CONTEXT7 SOURCE: /facebook/react - Custom hook pattern for component integration
 * HOOK REASON: Official React documentation recommends custom hooks for reusable stateful logic
 */
export function useGamification() {
  const context = React.useContext(GamificationContext)
  
  if (!context) {
    // Return no-op functions if gamification is not enabled
    return {
      progress: {
        totalQuestionsRead: 0,
        categoriesCompleted: [],
        readingTimeMinutes: 0,
        searchesPerformed: 0,
        helpfulVotes: 0,
        questionsShared: 0,
        streakDays: 0,
        lastVisitDate: new Date().toISOString(),
        totalPoints: 0,
        level: 1
      },
      trackEvent: () => {},
      getProgressPercentage: () => 0,
      getCurrentLevel: () => 1,
      getNextLevelProgress: () => 0,
      isAchievementUnlocked: () => false,
      getTotalPoints: () => 0
    }
  }
  
  return context
}

/**
 * Question Read Tracker Hook
 * CONTEXT7 SOURCE: /facebook/react - Specialized hook for question reading events
 * TRACKING REASON: Provides automatic question reading detection with timing
 */
export function useQuestionReadTracker(questionId: string) {
  const { trackEvent } = useGamification()
  const [startTime] = React.useState(Date.now())
  const [hasTracked, setHasTracked] = React.useState(false)
  
  // Track when question is first viewed
  React.useEffect(() => {
    if (!hasTracked) {
      const timer = setTimeout(() => {
        const readingTime = Math.max(1, Math.floor((Date.now() - startTime) / 60000)) // At least 1 minute
        trackEvent({
          type: 'question_read',
          questionId,
          readingTime
        })
        setHasTracked(true)
      }, 5000) // Track after 5 seconds of viewing
      
      return () => clearTimeout(timer)
    }
  }, [questionId, trackEvent, startTime, hasTracked])
  
  return { hasTracked }
}

/**
 * Category Completion Tracker Hook
 * CONTEXT7 SOURCE: /facebook/react - Hook for category completion detection
 * COMPLETION TRACKING: Automatically detects when user has read majority of category questions
 */
export function useCategoryCompletionTracker(categoryId: string, totalQuestions: number, readQuestions: string[]) {
  const { trackEvent } = useGamification()
  const [hasCompleted, setHasCompleted] = React.useState(false)
  
  React.useEffect(() => {
    const completionThreshold = Math.ceil(totalQuestions * 0.7) // 70% completion threshold
    
    if (!hasCompleted && readQuestions.length >= completionThreshold && totalQuestions > 0) {
      trackEvent({
        type: 'category_completed',
        categoryId
      })
      setHasCompleted(true)
    }
  }, [categoryId, totalQuestions, readQuestions.length, trackEvent, hasCompleted])
  
  return { hasCompleted, progress: (readQuestions.length / totalQuestions) * 100 }
}

/**
 * Search Performance Tracker Hook
 * CONTEXT7 SOURCE: /facebook/react - Hook for search activity tracking
 * SEARCH TRACKING: Tracks search queries and success rates for gamification
 */
export function useSearchTracker() {
  const { trackEvent } = useGamification()
  
  const trackSearch = React.useCallback((query: string, resultsCount: number) => {
    trackEvent({
      type: 'search_performed',
      searchQuery: query,
      resultsCount
    })
  }, [trackEvent])
  
  return { trackSearch }
}

/**
 * Helpful Vote Tracker Hook
 * CONTEXT7 SOURCE: /facebook/react - Hook for FAQ rating/voting tracking
 * VOTING TRACKING: Tracks user engagement with FAQ helpfulness ratings
 */
export function useHelpfulVoteTracker() {
  const { trackEvent } = useGamification()
  
  const trackHelpfulVote = React.useCallback((questionId: string, isHelpful: boolean) => {
    trackEvent({
      type: 'helpful_vote',
      questionId,
      isHelpful
    })
  }, [trackEvent])
  
  return { trackHelpfulVote }
}

/**
 * Share Tracker Hook
 * CONTEXT7 SOURCE: /facebook/react - Hook for social sharing tracking
 * SHARE TRACKING: Tracks when users share FAQ content on various platforms
 */
export function useShareTracker() {
  const { trackEvent } = useGamification()
  
  const trackShare = React.useCallback((questionId: string, platform: string) => {
    trackEvent({
      type: 'question_shared',
      questionId,
      platform
    })
  }, [trackEvent])
  
  return { trackShare }
}

/**
 * Progress Indicator Component
 * CONTEXT7 SOURCE: /context7/motion_dev - Animated progress indicators with spring physics
 * PROGRESS DISPLAY: Reusable progress indicator with smooth animations
 */
interface ProgressIndicatorProps {
  type: 'questions' | 'categories' | 'points' | 'level'
  showLabel?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressIndicator({ 
  type, 
  showLabel = true, 
  className = "", 
  size = 'md' 
}: ProgressIndicatorProps) {
  const { progress, getProgressPercentage } = useGamification()
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Spring animations for progress values
  // PROGRESS ANIMATIONS: Smooth spring-based animations for numerical progress
  const animatedValue = useSpring(
    type === 'questions' || type === 'categories' 
      ? getProgressPercentage(type)
      : type === 'points'
      ? progress.totalPoints
      : progress.level
  )
  
  const displayValue = useTransform(animatedValue, value => 
    type === 'questions' || type === 'categories' 
      ? `${Math.round(value)}%`
      : Math.round(value).toString()
  )
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }
  
  const labels = {
    questions: 'Questions Read',
    categories: 'Categories Explored',
    points: 'Total Points',
    level: 'Current Level'
  }
  
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`font-bold text-slate-900 ${sizeClasses[size]}`}>
        {displayValue.get()}
      </div>
      {showLabel && (
        <div className={`text-slate-600 ${sizeClasses[size]}`}>
          {labels[type]}
        </div>
      )}
    </div>
  )
}

/**
 * Mini Progress Badge Component
 * CONTEXT7 SOURCE: /radix-ui/website - Badge component with progress display
 * MINI BADGE: Compact progress indicator for space-constrained layouts
 */
interface MiniProgressBadgeProps {
  type: 'level' | 'points' | 'streak'
  className?: string
}

export function MiniProgressBadge({ type, className = "" }: MiniProgressBadgeProps) {
  const { progress } = useGamification()
  
  const getValue = () => {
    switch (type) {
      case 'level': return `L${progress.level}`
      case 'points': return `${progress.totalPoints}pts`
      case 'streak': return `${progress.streakDays}🔥`
      default: return ''
    }
  }
  
  const getColorClass = () => {
    switch (type) {
      case 'level': return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'points': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'streak': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }
  
  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${getColorClass()} ${className}`}>
      {getValue()}
    </div>
  )
}