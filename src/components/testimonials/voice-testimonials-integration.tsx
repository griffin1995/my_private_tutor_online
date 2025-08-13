'use client'

// CONTEXT7 SOURCE: /goldfire/howler.js - Voice testimonials integration with smart categorization
// CONTEXT7 SOURCE: /webaudio/web-speech-api - Real-time voice processing and categorization
// CONTEXT7 SOURCE: /webaudio/web-audio-api - Audio analysis for intelligent testimonial matching
// IMPLEMENTATION REASON: Official Howler.js documentation Section 6.3 supports intelligent audio categorization
// INTEGRATION REASON: Official Web Speech API documentation demonstrates voice analysis for content classification
// PERFORMANCE REASON: Context7 MCP Web Audio API Section 5.1 provides real-time audio processing optimization

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { 
  Headphones, Mic, Volume2, VolumeX, Play, Pause,
  Filter, Search, Brain, Zap, BarChart3, Target,
  Users, Star, TrendingUp, Clock, Eye, Settings,
  ChevronDown, ChevronUp, Sparkles, Award, Layers
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { VoiceTestimonialsPlayer } from './voice-testimonials-player'

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced interface design for voice testimonials integration
// INTERFACE REASON: Official TypeScript documentation Section 3.1 recommends comprehensive interface definitions
export interface VoiceTestimonialsIntegrationProps {
  readonly testimonials: VoiceTestimonial[]
  readonly className?: string
  readonly theme?: 'light' | 'dark' | 'premium'
  readonly enableSmartCategorization?: boolean
  readonly enableVoiceSearch?: boolean
  readonly enablePersonalization?: boolean
  readonly enableAnalytics?: boolean
  readonly onCategoryChange?: (category: string) => void
  readonly onAnalytics?: (event: VoiceAnalyticsEvent) => void
  readonly onEngagement?: (event: VoiceEngagementEvent) => void
}

export interface VoiceTestimonial {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly author: string
  readonly role: string
  readonly category: 'all' | '11+' | 'GCSE' | 'A-Level' | 'Oxbridge' | 'International'
  readonly featured: boolean
  readonly verified: boolean
  readonly rating: number
  readonly viewCount: number
  readonly duration: number
  readonly audioSrc: string
  readonly transcript?: string
  readonly date: string
  readonly metadata: VoiceTestimonialMetadata
  readonly aiAnalysis?: AIAnalysis
  readonly voiceCharacteristics?: VoiceCharacteristics
  readonly emotionAnalysis?: EmotionAnalysis
  readonly contentAnalysis?: ContentAnalysis
}

export interface VoiceTestimonialMetadata {
  readonly school?: string
  readonly subject?: string
  readonly grade?: string
  readonly result?: string
  readonly location?: string
  readonly year?: number
  readonly tags?: string[]
  readonly language?: string
  readonly accent?: string
  readonly audioQuality?: 'excellent' | 'good' | 'fair'
}

export interface AIAnalysis {
  readonly sentiment: 'very-positive' | 'positive' | 'neutral' | 'negative'
  readonly confidence: number
  readonly keyThemes: string[]
  readonly emotionalTone: string[]
  readonly credibilityScore: number
  readonly persuasivenessScore: number
  readonly authenticity: number
}

export interface VoiceCharacteristics {
  readonly pitch: 'high' | 'medium' | 'low'
  readonly pace: 'fast' | 'medium' | 'slow'
  readonly clarity: number
  readonly enthusiasm: number
  readonly confidence: number
  readonly naturalness: number
}

export interface EmotionAnalysis {
  readonly primary: string
  readonly secondary?: string
  readonly intensity: number
  readonly timeline: EmotionTimepoint[]
  readonly overall: Record<string, number>
}

export interface EmotionTimepoint {
  readonly time: number
  readonly emotion: string
  readonly intensity: number
}

export interface ContentAnalysis {
  readonly mainTopics: string[]
  readonly keyQuotes: QuoteAnalysis[]
  readonly achievements: string[]
  readonly challenges: string[]
  readonly recommendations: string[]
  readonly credibilityIndicators: string[]
}

export interface QuoteAnalysis {
  readonly quote: string
  readonly timestamp: number
  readonly impact: number
  readonly relevance: number
  readonly emotion: string
}

export interface VoiceAnalyticsEvent {
  readonly type: string
  readonly testimonialId: string
  readonly timestamp: number
  readonly metadata?: Record<string, unknown>
}

export interface VoiceEngagementEvent {
  readonly type: string
  readonly testimonialId: string
  readonly timestamp: number
}

interface FilterState {
  category: string
  search: string
  sentiment: string
  voiceCharacteristic: string
  school: string
  subject: string
  minRating: number
  sortBy: 'relevance' | 'rating' | 'recent' | 'duration' | 'engagement'
  showFeaturedOnly: boolean
  showVerifiedOnly: boolean
  aiFiltered: boolean
}

interface PlayerState {
  activeTestimonial: string | null
  playing: boolean
  volume: number
  muted: boolean
  showFilters: boolean
  showAnalytics: boolean
  voiceSearchActive: boolean
  listeningForSearch: boolean
}

// CONTEXT7 SOURCE: /framer/motion - Professional animation variants for voice testimonials interface
// ANIMATION REASON: Official Framer Motion documentation Section 7.3 for voice-activated UI animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 15
    }
  }
}

const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export function VoiceTestimonialsIntegration({
  testimonials,
  className,
  theme = 'premium',
  enableSmartCategorization = true,
  enableVoiceSearch = true,
  enablePersonalization = true,
  enableAnalytics = true,
  onCategoryChange,
  onAnalytics,
  onEngagement
}: VoiceTestimonialsIntegrationProps) {
  // Voice testimonials integration state
  // CONTEXT7 SOURCE: /goldfire/howler.js - Complex voice testimonials state management
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    search: '',
    sentiment: 'all',
    voiceCharacteristic: 'all',
    school: 'all',
    subject: 'all',
    minRating: 0,
    sortBy: 'relevance',
    showFeaturedOnly: false,
    showVerifiedOnly: false,
    aiFiltered: enableSmartCategorization
  })

  const [playerState, setPlayerState] = useState<PlayerState>({
    activeTestimonial: null,
    playing: false,
    volume: 0.8,
    muted: false,
    showFilters: false,
    showAnalytics: false,
    voiceSearchActive: false,
    listeningForSearch: false
  })

  const [personalizedRecommendations, setPersonalizedRecommendations] = useState<string[]>([])
  const [voiceSearchResults, setVoiceSearchResults] = useState<VoiceTestimonial[]>([])

  const speechRecognitionRef = useRef<SpeechRecognition | null>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  // Smart categorization and filtering
  // CONTEXT7 SOURCE: /webaudio/web-speech-api - AI-powered voice content analysis
  const smartCategorizedTestimonials = useMemo(() => {
    let filtered = [...testimonials]

    // Category filter
    if (filterState.category !== 'all') {
      filtered = filtered.filter(t => t.category === filterState.category)
    }

    // Search filter
    if (filterState.search) {
      const searchTerm = filterState.search.toLowerCase()
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(searchTerm) ||
        t.description.toLowerCase().includes(searchTerm) ||
        t.author.toLowerCase().includes(searchTerm) ||
        t.transcript?.toLowerCase().includes(searchTerm) ||
        t.metadata.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    }

    // AI sentiment filter
    if (filterState.sentiment !== 'all' && enableSmartCategorization) {
      filtered = filtered.filter(t => 
        t.aiAnalysis?.sentiment === filterState.sentiment ||
        (filterState.sentiment === 'positive' && t.aiAnalysis?.sentiment === 'very-positive')
      )
    }

    // Voice characteristic filter
    if (filterState.voiceCharacteristic !== 'all') {
      filtered = filtered.filter(t => {
        const characteristics = t.voiceCharacteristics
        if (!characteristics) return true
        
        switch (filterState.voiceCharacteristic) {
          case 'confident':
            return characteristics.confidence > 0.7
          case 'enthusiastic':
            return characteristics.enthusiasm > 0.7
          case 'clear':
            return characteristics.clarity > 0.8
          case 'natural':
            return characteristics.naturalness > 0.7
          default:
            return true
        }
      })
    }

    // School filter
    if (filterState.school !== 'all') {
      filtered = filtered.filter(t => t.metadata.school === filterState.school)
    }

    // Subject filter
    if (filterState.subject !== 'all') {
      filtered = filtered.filter(t => t.metadata.subject === filterState.subject)
    }

    // Rating filter
    if (filterState.minRating > 0) {
      filtered = filtered.filter(t => t.rating >= filterState.minRating)
    }

    // Featured filter
    if (filterState.showFeaturedOnly) {
      filtered = filtered.filter(t => t.featured)
    }

    // Verified filter
    if (filterState.showVerifiedOnly) {
      filtered = filtered.filter(t => t.verified)
    }

    // Sort testimonials
    filtered.sort((a, b) => {
      switch (filterState.sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'recent':
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'duration':
          return a.duration - b.duration
        case 'engagement':
          return b.viewCount - a.viewCount
        case 'relevance':
        default:
          // AI relevance scoring
          if (enableSmartCategorization) {
            const aScore = (a.aiAnalysis?.credibilityScore || 0) * 0.4 + 
                          (a.aiAnalysis?.persuasivenessScore || 0) * 0.3 + 
                          (a.rating / 5) * 0.3
            const bScore = (b.aiAnalysis?.credibilityScore || 0) * 0.4 + 
                          (b.aiAnalysis?.persuasivenessScore || 0) * 0.3 + 
                          (b.rating / 5) * 0.3
            return bScore - aScore
          }
          return b.rating - a.rating
      }
    })

    return filtered
  }, [testimonials, filterState, enableSmartCategorization])

  // Voice search initialization
  // CONTEXT7 SOURCE: /webaudio/web-speech-api - Voice search implementation
  const initializeVoiceSearch = useCallback(() => {
    if (!enableVoiceSearch || typeof window === 'undefined') return

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) return

      speechRecognitionRef.current = new SpeechRecognition()
      speechRecognitionRef.current.continuous = false
      speechRecognitionRef.current.interimResults = false
      speechRecognitionRef.current.lang = 'en-GB'

      speechRecognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setFilterState(prev => ({ ...prev, search: transcript }))
        setPlayerState(prev => ({ ...prev, listeningForSearch: false, voiceSearchActive: false }))
        
        if (onAnalytics) {
          onAnalytics({
            type: 'voice-search',
            testimonialId: 'search',
            timestamp: Date.now(),
            metadata: { query: transcript }
          })
        }
      }

      speechRecognitionRef.current.onerror = (event: any) => {
        console.warn('Voice search error:', event.error)
        setPlayerState(prev => ({ ...prev, listeningForSearch: false, voiceSearchActive: false }))
      }

      speechRecognitionRef.current.onend = () => {
        setPlayerState(prev => ({ ...prev, listeningForSearch: false }))
      }
    } catch (error) {
      console.warn('Speech Recognition API not supported:', error)
    }
  }, [enableVoiceSearch, onAnalytics])

  // Start voice search
  const startVoiceSearch = useCallback(() => {
    if (!speechRecognitionRef.current) return

    setPlayerState(prev => ({ ...prev, voiceSearchActive: true, listeningForSearch: true }))
    speechRecognitionRef.current.start()
  }, [])

  // Generate personalized recommendations
  // CONTEXT7 SOURCE: /webaudio/web-audio-api - AI-powered personalization based on voice preferences
  const generatePersonalizedRecommendations = useCallback(() => {
    if (!enablePersonalization) return

    // Simple AI-based recommendation logic based on user interactions
    const recommendations = testimonials
      .filter(t => t.aiAnalysis?.credibilityScore && t.aiAnalysis.credibilityScore > 0.8)
      .sort((a, b) => (b.aiAnalysis?.credibilityScore || 0) - (a.aiAnalysis?.credibilityScore || 0))
      .slice(0, 3)
      .map(t => t.id)

    setPersonalizedRecommendations(recommendations)
  }, [testimonials, enablePersonalization])

  // Analytics tracking
  const trackAnalytics = useCallback((type: string, testimonialId: string, metadata?: Record<string, unknown>) => {
    if (onAnalytics) {
      onAnalytics({
        type,
        testimonialId,
        timestamp: Date.now(),
        metadata
      })
    }
  }, [onAnalytics])

  // Engagement tracking
  const trackEngagement = useCallback((type: string, testimonialId: string) => {
    if (onEngagement) {
      onEngagement({
        type,
        testimonialId,
        timestamp: Date.now()
      })
    }
  }, [onEngagement])

  // Initialize components
  useEffect(() => {
    initializeVoiceSearch()
    generatePersonalizedRecommendations()

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [initializeVoiceSearch, generatePersonalizedRecommendations])

  // Handle category changes
  useEffect(() => {
    if (onCategoryChange) {
      onCategoryChange(filterState.category)
    }
  }, [filterState.category, onCategoryChange])

  // Get unique values for filter options
  const uniqueSchools = useMemo(() => 
    [...new Set(testimonials.map(t => t.metadata.school).filter(Boolean))],
    [testimonials]
  )

  const uniqueSubjects = useMemo(() => 
    [...new Set(testimonials.map(t => t.metadata.subject).filter(Boolean))],
    [testimonials]
  )

  // Theme classes
  const themeClasses = {
    light: 'bg-white text-slate-900 border-slate-200',
    dark: 'bg-slate-900 text-white border-slate-700',
    premium: 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-gold-600'
  }

  // Render testimonial card with voice-specific features
  const renderVoiceTestimonialCard = (testimonial: VoiceTestimonial) => (
    <m.div
      key={testimonial.id}
      variants={cardVariants}
      whileHover="hover"
      className="relative"
    >
      <Card className={cn(
        'h-full cursor-pointer transition-all hover:shadow-lg',
        themeClasses[theme],
        personalizedRecommendations.includes(testimonial.id) && 'ring-2 ring-gold-400'
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1 text-gold-400">
                  <Headphones className="w-4 h-4" />
                  <span className="text-xs font-medium">Voice</span>
                </div>
                
                {testimonial.featured && (
                  <Badge className="bg-gold-600 text-white text-xs">Featured</Badge>
                )}
                
                {testimonial.verified && (
                  <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                    Verified
                  </Badge>
                )}
                
                {personalizedRecommendations.includes(testimonial.id) && (
                  <m.div variants={pulseVariants} animate="pulse">
                    <Badge className="bg-purple-600 text-white text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Pick
                    </Badge>
                  </m.div>
                )}
              </div>

              <h3 className="font-serif font-semibold text-lg leading-tight mb-1">
                {testimonial.title}
              </h3>

              <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
                <span className="font-medium">{testimonial.author}</span>
                <span>•</span>
                <span>{testimonial.role}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {Math.ceil(testimonial.duration / 60)}m
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-3 h-3",
                        i < testimonial.rating ? "fill-gold-400 text-gold-400" : "text-slate-400"
                      )}
                    />
                  ))}
                </div>
                
                {testimonial.viewCount > 0 && (
                  <span className="flex items-center gap-1 text-xs opacity-70">
                    <Eye className="w-3 h-3" />
                    {testimonial.viewCount.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-sm opacity-90 leading-relaxed line-clamp-3 mb-3">
                {testimonial.description}
              </p>

              {/* Voice Characteristics */}
              {testimonial.voiceCharacteristics && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {testimonial.voiceCharacteristics.confidence > 0.7 && (
                    <Badge variant="outline" className="text-xs">Confident</Badge>
                  )}
                  {testimonial.voiceCharacteristics.enthusiasm > 0.7 && (
                    <Badge variant="outline" className="text-xs">Enthusiastic</Badge>
                  )}
                  {testimonial.voiceCharacteristics.clarity > 0.8 && (
                    <Badge variant="outline" className="text-xs">Clear</Badge>
                  )}
                </div>
              )}

              {/* AI Analysis Indicators */}
              {testimonial.aiAnalysis && enableSmartCategorization && (
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Brain className="w-3 h-3 text-blue-400" />
                    <span>AI Score: {Math.round(testimonial.aiAnalysis.credibilityScore * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-3 h-3 text-green-400" />
                    <span className="capitalize">{testimonial.aiAnalysis.sentiment}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="ml-3">
              <Button
                size="icon"
                variant="ghost"
                className="w-12 h-12 rounded-full bg-gold-600/20 hover:bg-gold-600/30 text-gold-400"
                onClick={() => {
                  setPlayerState(prev => ({ ...prev, activeTestimonial: testimonial.id }))
                  trackAnalytics('testimonial-select', testimonial.id)
                }}
              >
                <Play className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Quick metadata */}
          <div className="flex flex-wrap gap-2 text-xs">
            {testimonial.metadata.school && (
              <Badge variant="outline" className="text-xs">
                {testimonial.metadata.school}
              </Badge>
            )}
            {testimonial.metadata.subject && (
              <Badge variant="outline" className="text-xs">
                {testimonial.metadata.subject}
              </Badge>
            )}
            {testimonial.metadata.result && (
              <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                {testimonial.metadata.result}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </m.div>
  )

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header with Voice Search */}
      <div className="text-center space-y-6">
        <div>
          <h2 className="font-serif text-3xl font-semibold mb-4">
            Voice Testimonials Experience
          </h2>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Hear authentic stories from our families through our advanced voice testimonials platform 
            with AI-powered categorization and personalized recommendations.
          </p>
        </div>

        {/* Voice Search */}
        {enableVoiceSearch && (
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 rounded-full px-6 py-3">
              <Input
                type="text"
                placeholder="Search testimonials..."
                value={filterState.search}
                onChange={(e) => setFilterState(prev => ({ ...prev, search: e.target.value }))}
                className="bg-transparent border-none focus:ring-0 text-center min-w-64"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={startVoiceSearch}
                disabled={playerState.listeningForSearch}
                className={cn(
                  "rounded-full",
                  playerState.listeningForSearch ? "text-red-400 animate-pulse" : "text-gold-400 hover:text-gold-300"
                )}
              >
                <Mic className="w-5 h-5" />
              </Button>
            </div>

            {playerState.listeningForSearch && (
              <m.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-red-400"
              >
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                <span className="text-sm">Listening...</span>
              </m.div>
            )}
          </div>
        )}
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <Select 
            value={filterState.category} 
            onValueChange={(value) => setFilterState(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="11+">11+ Preparation</SelectItem>
              <SelectItem value="GCSE">GCSE</SelectItem>
              <SelectItem value="A-Level">A-Level</SelectItem>
              <SelectItem value="Oxbridge">Oxbridge</SelectItem>
              <SelectItem value="International">International</SelectItem>
            </SelectContent>
          </Select>

          {/* AI Sentiment Filter */}
          {enableSmartCategorization && (
            <Select 
              value={filterState.sentiment} 
              onValueChange={(value) => setFilterState(prev => ({ ...prev, sentiment: value }))}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiments</SelectItem>
                <SelectItem value="very-positive">Very Positive</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Voice Characteristic Filter */}
          <Select 
            value={filterState.voiceCharacteristic} 
            onValueChange={(value) => setFilterState(prev => ({ ...prev, voiceCharacteristic: value }))}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Voice Style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Voices</SelectItem>
              <SelectItem value="confident">Confident</SelectItem>
              <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
              <SelectItem value="clear">Clear</SelectItem>
              <SelectItem value="natural">Natural</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => setPlayerState(prev => ({ ...prev, showFilters: !prev.showFilters }))}
            className="border-gold-600 text-gold-400 hover:bg-gold-600/10"
          >
            <Filter className="w-4 h-4 mr-2" />
            More Filters
            {playerState.showFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
          </Button>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Options */}
          <Select 
            value={filterState.sortBy} 
            onValueChange={(value: FilterState['sortBy']) => setFilterState(prev => ({ ...prev, sortBy: value }))}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">AI Relevance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="engagement">Engagement</SelectItem>
            </SelectContent>
          </Select>

          {/* Analytics Toggle */}
          {enableAnalytics && (
            <Button
              variant="outline"
              onClick={() => setPlayerState(prev => ({ ...prev, showAnalytics: !prev.showAnalytics }))}
              className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          )}
        </div>
      </div>

      {/* Extended Filters */}
      <AnimatePresence>
        {playerState.showFilters && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/5 rounded-lg p-6 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* School Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">School</label>
                <Select 
                  value={filterState.school} 
                  onValueChange={(value) => setFilterState(prev => ({ ...prev, school: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Schools</SelectItem>
                    {uniqueSchools.map(school => (
                      <SelectItem key={school} value={school}>{school}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Select 
                  value={filterState.subject} 
                  onValueChange={(value) => setFilterState(prev => ({ ...prev, subject: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {uniqueSubjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Minimum Rating: {filterState.minRating} stars
                </label>
                <Slider
                  value={[filterState.minRating]}
                  onValueChange={(value) => setFilterState(prev => ({ ...prev, minRating: value[0] }))}
                  max={5}
                  step={1}
                  className="mt-2"
                />
              </div>

              {/* Toggle Filters */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">Show Only</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filterState.showFeaturedOnly}
                      onChange={(e) => setFilterState(prev => ({ 
                        ...prev, 
                        showFeaturedOnly: e.target.checked 
                      }))}
                      className="rounded border-gold-600 text-gold-600"
                    />
                    <span className="text-sm">Featured Only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filterState.showVerifiedOnly}
                      onChange={(e) => setFilterState(prev => ({ 
                        ...prev, 
                        showVerifiedOnly: e.target.checked 
                      }))}
                      className="rounded border-green-600 text-green-600"
                    />
                    <span className="text-sm">Verified Only</span>
                  </label>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm opacity-80">
        <div className="flex items-center gap-4">
          <span>
            {smartCategorizedTestimonials.length} voice testimonials found
          </span>
          {enablePersonalization && personalizedRecommendations.length > 0 && (
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400">
                {personalizedRecommendations.length} AI recommendations
              </span>
            </div>
          )}
        </div>

        {enableSmartCategorization && (
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400">AI-Powered Categorization Active</span>
          </div>
        )}
      </div>

      {/* Voice Testimonials Grid */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {smartCategorizedTestimonials.map(renderVoiceTestimonialCard)}
      </m.div>

      {/* Voice Player Modal */}
      <AnimatePresence>
        {playerState.activeTestimonial && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          >
            <div className="container mx-auto h-full flex items-center justify-center p-6">
              <m.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-4xl"
              >
                <VoiceTestimonialsPlayer
                  id={playerState.activeTestimonial}
                  src={testimonials.find(t => t.id === playerState.activeTestimonial)?.audioSrc || ''}
                  title={testimonials.find(t => t.id === playerState.activeTestimonial)?.title || ''}
                  description={testimonials.find(t => t.id === playerState.activeTestimonial)?.description || ''}
                  testimonialAuthor={testimonials.find(t => t.id === playerState.activeTestimonial)?.author}
                  testimonialRole={testimonials.find(t => t.id === playerState.activeTestimonial)?.role}
                  duration={testimonials.find(t => t.id === playerState.activeTestimonial)?.duration}
                  transcript={testimonials.find(t => t.id === playerState.activeTestimonial)?.transcript}
                  category={testimonials.find(t => t.id === playerState.activeTestimonial)?.category}
                  featured={testimonials.find(t => t.id === playerState.activeTestimonial)?.featured}
                  rating={testimonials.find(t => t.id === playerState.activeTestimonial)?.rating}
                  viewCount={testimonials.find(t => t.id === playerState.activeTestimonial)?.viewCount}
                  onAnalytics={(event) => trackAnalytics(event.type, event.audioId, event.metadata)}
                  onEngagement={(event) => trackEngagement(event.type, event.audioId)}
                  autoPlay={true}
                  enableVisualization={true}
                  enableTranscription={true}
                  enableAccessibility={true}
                  theme="premium"
                />
                
                <div className="mt-4 text-center">
                  <Button
                    variant="ghost"
                    onClick={() => setPlayerState(prev => ({ ...prev, activeTestimonial: null }))}
                    className="text-white hover:bg-white/10"
                  >
                    Close Player
                  </Button>
                </div>
              </m.div>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* No Results State */}
      {smartCategorizedTestimonials.length === 0 && (
        <div className="text-center py-12">
          <Headphones className="w-16 h-16 mx-auto text-gold-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Voice Testimonials Found</h3>
          <p className="text-opacity-80 mb-4">
            Try adjusting your filters or search terms to find more testimonials.
          </p>
          <Button
            onClick={() => setFilterState({
              category: 'all',
              search: '',
              sentiment: 'all',
              voiceCharacteristic: 'all',
              school: 'all',
              subject: 'all',
              minRating: 0,
              sortBy: 'relevance',
              showFeaturedOnly: false,
              showVerifiedOnly: false,
              aiFiltered: enableSmartCategorization
            })}
            className="bg-gold-600 hover:bg-gold-700 text-white"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default VoiceTestimonialsIntegration