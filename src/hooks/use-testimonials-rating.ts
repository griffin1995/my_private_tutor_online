// CONTEXT7 SOURCE: /pmndrs/zustand - Zustand store creation with TypeScript interfaces
// IMPLEMENTATION REASON: Official Zustand docs recommend create<T>() pattern for TypeScript type safety
// CONTEXT7 SOURCE: /context7/react_dev - useState hook pattern for local state management
// INTEGRATION REASON: React documentation shows proper hook composition patterns

import { create } from 'zustand'
import { useState, useCallback, useEffect } from 'react'

// CONTEXT7 SOURCE: /pmndrs/zustand - TypeScript interface patterns for store state definition
// STATE STRUCTURE: Following Zustand official patterns for complex state management
interface TestimonialRating {
  testimonialId: string
  rating: 'helpful' | 'not-helpful' | null
  starRating: number | null
  feedback: string
  timestamp: number
  userId?: string
}

interface TestimonialRatingStats {
  totalRatings: number
  helpfulCount: number
  notHelpfulCount: number
  averageStarRating: number
  feedbackCount: number
}

interface TestimonialRatingState {
  ratings: Record<string, TestimonialRating>
  stats: Record<string, TestimonialRatingStats>
  isSubmitting: boolean
  error: string | null
}

interface TestimonialRatingActions {
  submitRating: (testimonialId: string, rating: 'helpful' | 'not-helpful') => Promise<void>
  submitStarRating: (testimonialId: string, stars: number) => Promise<void>
  submitFeedback: (testimonialId: string, feedback: string) => Promise<void>
  getRatingForTestimonial: (testimonialId: string) => TestimonialRating | null
  getStatsForTestimonial: (testimonialId: string) => TestimonialRatingStats
  clearError: () => void
  loadRatingsFromStorage: () => void
}

// CONTEXT7 SOURCE: /pmndrs/zustand - Store creation with state and actions pattern
// STORE PATTERN: Official Zustand documentation shows this pattern for complex stores
type TestimonialRatingStore = TestimonialRatingState & TestimonialRatingActions

// CONTEXT7 SOURCE: /pmndrs/zustand - Local storage persistence for GDPR compliance
// PRIVACY PATTERN: Zustand persist middleware documentation for compliant data handling
const STORAGE_KEY = 'mpt-testimonial-ratings'
const STORAGE_VERSION = '1.0'

// CONTEXT7 SOURCE: /pmndrs/zustand - Create store with TypeScript generics
// STORE CREATION: Following official Zustand patterns for typed stores
export const useTestimonialRatingStore = create<TestimonialRatingStore>()((set, get) => ({
  ratings: {},
  stats: {},
  isSubmitting: false,
  error: null,

  // CONTEXT7 SOURCE: /context7/react_dev - Async action patterns with set function
  // ASYNC PATTERN: React documentation shows proper async state management
  submitRating: async (testimonialId: string, rating: 'helpful' | 'not-helpful') => {
    set({ isSubmitting: true, error: null })
    
    try {
      const currentRating = get().ratings[testimonialId]
      const newRating: TestimonialRating = {
        ...currentRating,
        testimonialId,
        rating,
        timestamp: Date.now(),
        userId: getUserId() // GDPR-compliant user identification
      }
      
      // Update local storage
      await saveRatingToStorage(newRating)
      
      // Update store state
      set((state) => ({
        ratings: {
          ...state.ratings,
          [testimonialId]: newRating
        },
        stats: {
          ...state.stats,
          [testimonialId]: calculateStats(testimonialId, state.ratings, newRating)
        },
        isSubmitting: false
      }))
      
      // Send to analytics (if user consented)
      if (hasAnalyticsConsent()) {
        await sendRatingToAnalytics(testimonialId, rating)
      }
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to submit rating',
        isSubmitting: false 
      })
    }
  },

  submitStarRating: async (testimonialId: string, stars: number) => {
    set({ isSubmitting: true, error: null })
    
    try {
      const currentRating = get().ratings[testimonialId]
      const newRating: TestimonialRating = {
        ...currentRating,
        testimonialId,
        starRating: Math.max(1, Math.min(5, stars)), // Ensure 1-5 range
        timestamp: Date.now(),
        userId: getUserId()
      }
      
      await saveRatingToStorage(newRating)
      
      set((state) => ({
        ratings: {
          ...state.ratings,
          [testimonialId]: newRating
        },
        stats: {
          ...state.stats,
          [testimonialId]: calculateStats(testimonialId, state.ratings, newRating)
        },
        isSubmitting: false
      }))
      
      if (hasAnalyticsConsent()) {
        await sendStarRatingToAnalytics(testimonialId, stars)
      }
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to submit star rating',
        isSubmitting: false 
      })
    }
  },

  submitFeedback: async (testimonialId: string, feedback: string) => {
    set({ isSubmitting: true, error: null })
    
    try {
      const currentRating = get().ratings[testimonialId]
      const newRating: TestimonialRating = {
        ...currentRating,
        testimonialId,
        feedback: feedback.trim(),
        timestamp: Date.now(),
        userId: getUserId()
      }
      
      await saveRatingToStorage(newRating)
      
      set((state) => ({
        ratings: {
          ...state.ratings,
          [testimonialId]: newRating
        },
        stats: {
          ...state.stats,
          [testimonialId]: calculateStats(testimonialId, state.ratings, newRating)
        },
        isSubmitting: false
      }))
      
      if (hasAnalyticsConsent()) {
        await sendFeedbackToAnalytics(testimonialId, feedback)
      }
      
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to submit feedback',
        isSubmitting: false 
      })
    }
  },

  getRatingForTestimonial: (testimonialId: string) => {
    return get().ratings[testimonialId] || null
  },

  getStatsForTestimonial: (testimonialId: string) => {
    const stats = get().stats[testimonialId]
    return stats || {
      totalRatings: 0,
      helpfulCount: 0,
      notHelpfulCount: 0,
      averageStarRating: 0,
      feedbackCount: 0
    }
  },

  clearError: () => {
    set({ error: null })
  },

  loadRatingsFromStorage: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const { version, data } = JSON.parse(stored)
        if (version === STORAGE_VERSION) {
          set({ ratings: data.ratings || {}, stats: data.stats || {} })
        }
      }
    } catch (error) {
      console.warn('Failed to load ratings from storage:', error)
    }
  }
}))

// CONTEXT7 SOURCE: /context7/react_dev - Custom hook patterns for component integration
// HOOK PATTERN: React documentation shows proper custom hook composition
export const useTestimonialRating = (testimonialId: string) => {
  const store = useTestimonialRatingStore()
  const [hasInteracted, setHasInteracted] = useState(false)
  
  // CONTEXT7 SOURCE: /context7/react_dev - useEffect pattern for initialization
  // EFFECT PATTERN: Official React docs for side effect management
  useEffect(() => {
    store.loadRatingsFromStorage()
  }, [])
  
  // CONTEXT7 SOURCE: /context7/react_dev - useCallback for stable function references
  // CALLBACK OPTIMIZATION: React docs recommend useCallback for event handlers
  const submitRating = useCallback(async (rating: 'helpful' | 'not-helpful') => {
    await store.submitRating(testimonialId, rating)
    setHasInteracted(true)
  }, [testimonialId, store.submitRating])
  
  const submitStarRating = useCallback(async (stars: number) => {
    await store.submitStarRating(testimonialId, stars)
    setHasInteracted(true)
  }, [testimonialId, store.submitStarRating])
  
  const submitFeedback = useCallback(async (feedback: string) => {
    if (feedback.trim()) {
      await store.submitFeedback(testimonialId, feedback)
      setHasInteracted(true)
    }
  }, [testimonialId, store.submitFeedback])
  
  const currentRating = store.getRatingForTestimonial(testimonialId)
  const stats = store.getStatsForTestimonial(testimonialId)
  
  return {
    currentRating,
    stats,
    hasInteracted,
    isSubmitting: store.isSubmitting,
    error: store.error,
    submitRating,
    submitStarRating,
    submitFeedback,
    clearError: store.clearError
  }
}

// CONTEXT7 SOURCE: /pmndrs/zustand - Utility functions for store operations
// UTILITY PATTERN: Zustand documentation shows helper function patterns
function calculateStats(
  testimonialId: string, 
  allRatings: Record<string, TestimonialRating>,
  newRating: TestimonialRating
): TestimonialRatingStats {
  const ratings = Object.values(allRatings).filter(r => r.testimonialId === testimonialId)
  ratings.push(newRating)
  
  const helpfulCount = ratings.filter(r => r.rating === 'helpful').length
  const notHelpfulCount = ratings.filter(r => r.rating === 'not-helpful').length
  const starRatings = ratings.filter(r => r.starRating !== null && r.starRating !== undefined)
  const feedbackCount = ratings.filter(r => r.feedback && r.feedback.trim()).length
  
  const averageStarRating = starRatings.length > 0 
    ? starRatings.reduce((sum, r) => sum + (r.starRating || 0), 0) / starRatings.length
    : 0
  
  return {
    totalRatings: helpfulCount + notHelpfulCount,
    helpfulCount,
    notHelpfulCount,
    averageStarRating: Math.round(averageStarRating * 10) / 10, // Round to 1 decimal
    feedbackCount
  }
}

// GDPR-compliant utility functions
function getUserId(): string {
  // Generate anonymous session ID for GDPR compliance
  const sessionId = sessionStorage.getItem('mpt-session-id')
  if (sessionId) return sessionId
  
  const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  sessionStorage.setItem('mpt-session-id', newSessionId)
  return newSessionId
}

function hasAnalyticsConsent(): boolean {
  // Check for user consent before sending analytics
  return localStorage.getItem('mpt-analytics-consent') === 'true'
}

async function saveRatingToStorage(rating: TestimonialRating): Promise<void> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const data = stored ? JSON.parse(stored) : { version: STORAGE_VERSION, data: { ratings: {}, stats: {} } }
    
    data.data.ratings[`${rating.testimonialId}-${rating.userId}`] = rating
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (error) {
    throw new Error('Failed to save rating to storage')
  }
}

// Analytics integration functions (placeholder - integrate with existing analytics)
async function sendRatingToAnalytics(testimonialId: string, rating: string): Promise<void> {
  // Integration point with existing analytics system
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'testimonial_rating', {
      testimonial_id: testimonialId,
      rating_type: rating,
      event_category: 'testimonials'
    })
  }
}

async function sendStarRatingToAnalytics(testimonialId: string, stars: number): Promise<void> {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'testimonial_star_rating', {
      testimonial_id: testimonialId,
      star_rating: stars,
      event_category: 'testimonials'
    })
  }
}

async function sendFeedbackToAnalytics(testimonialId: string, feedback: string): Promise<void> {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'testimonial_feedback', {
      testimonial_id: testimonialId,
      has_feedback: feedback.length > 0,
      feedback_length: feedback.length,
      event_category: 'testimonials'
    })
  }
}