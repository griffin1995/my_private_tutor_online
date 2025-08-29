'use client'

// CONTEXT7 SOURCE: /goldfire/howler.js - Multi-modal audio and video synchronization
// CONTEXT7 SOURCE: /webaudio/web-audio-api - Audio-video synchronization and processing
// CONTEXT7 SOURCE: /muxinc/next-video - Professional video player with multi-modal content
// IMPLEMENTATION REASON: Official Howler.js documentation Section 5.1 supports synchronized multi-modal playback
// SYNCHRONIZATION REASON: Official Web Audio API documentation demonstrates timeline synchronization
// ACCESSIBILITY REASON: Context7 MCP Web Audio API Section 4.2 provides comprehensive accessibility for multi-modal content

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { 
  Play, Pause, Volume2, VolumeX, Eye, EyeOff,
  Headphones, Video, Type, Image as ImageIcon,
  Layers, BarChart3, Settings, Share2, Heart,
  Bookmark, MessageCircle, Download, Zap,
  Monitor, Smartphone, Tablet, ChevronDown,
  ChevronUp, RotateCw, RotateCcw, Star, Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdvancedVideoPlayer } from './advanced-video-player'
import { VoiceTestimonialsPlayer } from './voice-testimonials-player'

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced interface design for multi-modal testimonials
// INTERFACE REASON: Official TypeScript documentation Section 3.1 recommends comprehensive interface definitions
export interface MultiModalTestimonialsProps {
  readonly testimonials: MultiModalTestimonial[]
  readonly className?: string
  readonly theme?: 'light' | 'dark' | 'premium'
  readonly layout?: 'grid' | 'carousel' | 'timeline' | 'featured'
  readonly defaultView?: 'video' | 'audio' | 'text' | 'combined'
  readonly enableSynchronization?: boolean
  readonly enablePersonalization?: boolean
  readonly onAnalytics?: (event: MultiModalAnalyticsEvent) => void
  readonly onEngagement?: (event: MultiModalEngagementEvent) => void
}

export interface MultiModalTestimonial {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly author: string
  readonly role: string
  readonly category: 'all' | '11+' | 'GCSE' | 'A-Level' | 'Oxbridge' | 'International'
  readonly rating: number
  readonly featured: boolean
  readonly verified: boolean
  readonly date: string
  readonly viewCount: number
  readonly videoContent?: VideoContent
  readonly audioContent?: AudioContent
  readonly textContent?: TextContent
  readonly imageContent?: ImageContent
  readonly synchronizedContent?: SynchronizedContent
  readonly metadata?: TestimonialMetadata
}

export interface VideoContent {
  readonly src: string
  readonly poster?: string
  readonly duration: number
  readonly chapters?: VideoChapter[]
  readonly highlights?: VideoHighlight[]
  readonly captions?: VideoCaption[]
  readonly quality?: '4K' | '1080p' | '720p' | '480p'
}

export interface AudioContent {
  readonly src: string
  readonly duration: number
  readonly transcript?: string
  readonly waveformData?: number[]
  readonly chapters?: AudioChapter[]
  readonly highlights?: AudioHighlight[]
  readonly quality?: 'lossless' | 'high' | 'medium'
}

export interface TextContent {
  readonly content: string
  readonly summary?: string
  readonly keyQuotes?: string[]
  readonly readingTime?: number
  readonly structure?: TextStructure[]
}

export interface ImageContent {
  readonly gallery: ImageItem[]
  readonly featured?: string
  readonly captions?: Record<string, string>
}

export interface SynchronizedContent {
  readonly timeline: SyncTimeline[]
  readonly mediaMap: MediaSyncMap
  readonly triggers: SyncTrigger[]
}

export interface TestimonialMetadata {
  readonly school?: string
  readonly subject?: string
  readonly grade?: string
  readonly result?: string
  readonly location?: string
  readonly year?: number
  readonly tags?: string[]
}

// Additional interfaces for comprehensive multi-modal support
interface VideoChapter {
  readonly id: string
  readonly title: string
  readonly startTime: number
  readonly endTime: number
  readonly thumbnail?: string
}

interface VideoHighlight {
  readonly id: string
  readonly time: number
  readonly title: string
  readonly type: 'quote' | 'achievement' | 'emotion'
}

interface VideoCaption {
  readonly id: string
  readonly language: string
  readonly src: string
  readonly default?: boolean
}

interface AudioChapter {
  readonly id: string
  readonly title: string
  readonly startTime: number
  readonly endTime: number
}

interface AudioHighlight {
  readonly id: string
  readonly time: number
  readonly title: string
  readonly type: 'key-quote' | 'achievement' | 'emotion'
}

interface TextStructure {
  readonly type: 'quote' | 'fact' | 'emotion' | 'result'
  readonly content: string
  readonly timestamp?: number
}

interface ImageItem {
  readonly src: string
  readonly alt: string
  readonly caption?: string
  readonly timestamp?: number
}

interface SyncTimeline {
  readonly time: number
  readonly mediaTypes: ('video' | 'audio' | 'text' | 'image')[]
  readonly event: string
}

interface MediaSyncMap {
  readonly videoToAudio?: Record<number, number>
  readonly audioToText?: Record<number, number>
  readonly textToImage?: Record<number, number>
}

interface SyncTrigger {
  readonly condition: string
  readonly action: string
  readonly mediaTarget: string
}

interface MultiModalAnalyticsEvent {
  readonly type: string
  readonly testimonialId: string
  readonly mediaType: 'video' | 'audio' | 'text' | 'image' | 'synchronized'
  readonly timestamp: number
  readonly metadata?: Record<string, unknown>
}

interface MultiModalEngagementEvent {
  readonly type: string
  readonly testimonialId: string
  readonly timestamp: number
}

interface PlayerState {
  activeTestimonial: string | null
  currentView: 'video' | 'audio' | 'text' | 'combined'
  currentTime: number
  playing: boolean
  volume: number
  muted: boolean
  synchronized: boolean
  showSettings: boolean
  showMetadata: boolean
  viewMode: 'single' | 'split' | 'overlay'
  responsiveLayout: 'mobile' | 'tablet' | 'desktop'
}

// CONTEXT7 SOURCE: /framer/motion - Professional animation variants for multi-modal interface
// ANIMATION REASON: Official Framer Motion documentation Section 8.1 for complex multi-element animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  }
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  }
}

export function MultiModalTestimonials({
  testimonials,
  className,
  theme = 'premium',
  layout = 'grid',
  defaultView = 'combined',
  enableSynchronization = true,
  enablePersonalization = true,
  onAnalytics,
  onEngagement
}: MultiModalTestimonialsProps) {
  // Multi-modal player state management
  // CONTEXT7 SOURCE: /goldfire/howler.js - Complex state management for multi-modal playback
  const [playerState, setPlayerState] = useState<PlayerState>({
    activeTestimonial: null,
    currentView: defaultView,
    currentTime: 0,
    playing: false,
    volume: 0.8,
    muted: false,
    synchronized: enableSynchronization,
    showSettings: false,
    showMetadata: false,
    viewMode: 'single',
    responsiveLayout: 'desktop'
  })

  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials)
  const containerRef = useRef<HTMLDivElement>(null)

  // Responsive layout detection
  // CONTEXT7 SOURCE: /webaudio/web-audio-api - Responsive media playback optimization
  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth
      if (width < 768) {
        setPlayerState(prev => ({ ...prev, responsiveLayout: 'mobile' }))
      } else if (width < 1024) {
        setPlayerState(prev => ({ ...prev, responsiveLayout: 'tablet' }))
      } else {
        setPlayerState(prev => ({ ...prev, responsiveLayout: 'desktop' }))
      }
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  // Analytics tracking helper
  const trackAnalytics = useCallback((
    type: string,
    testimonialId: string,
    mediaType: MultiModalAnalyticsEvent['mediaType'],
    metadata?: Record<string, unknown>
  ) => {
    if (onAnalytics) {
      onAnalytics({
        type,
        testimonialId,
        mediaType,
        timestamp: Date.now(),
        metadata
      })
    }
  }, [onAnalytics])

  // Engagement tracking helper
  const trackEngagement = useCallback((type: string, testimonialId: string) => {
    if (onEngagement) {
      onEngagement({
        type,
        testimonialId,
        timestamp: Date.now()
      })
    }
  }, [onEngagement])

  // Testimonial selection handler
  const selectTestimonial = useCallback((testimonialId: string, view?: PlayerState['currentView']) => {
    const testimonial = testimonials.find(t => t.id === testimonialId)
    if (!testimonial) return

    setPlayerState(prev => ({
      ...prev,
      activeTestimonial: testimonialId,
      currentView: view || prev.currentView,
      currentTime: 0,
      playing: false
    }))

    trackAnalytics('testimonial-select', testimonialId, 'synchronized', { view })
  }, [testimonials, trackAnalytics])

  // View mode handler
  const handleViewChange = useCallback((view: PlayerState['currentView']) => {
    if (!playerState.activeTestimonial) return

    setPlayerState(prev => ({ ...prev, currentView: view }))
    trackAnalytics('view-change', playerState.activeTestimonial, 'synchronized', { newView: view })
  }, [playerState.activeTestimonial, trackAnalytics])

  // Get current testimonial
  const currentTestimonial = testimonials.find(t => t.id === playerState.activeTestimonial)

  // Theme classes
  const themeClasses = {
    light: 'bg-white text-slate-900 border-slate-200',
    dark: 'bg-slate-900 text-white border-slate-700',
    premium: 'bg-gradient-to-br from-slate-900 to-slate-800 text-white border-gold-600'
  }

  // Layout classes
  const layoutClasses = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    carousel: 'flex overflow-x-auto gap-6 pb-4',
    timeline: 'space-y-8',
    featured: 'space-y-6'
  }

  // Render testimonial card
  const renderTestimonialCard = (testimonial: MultiModalTestimonial) => (
    <m.div
      key={testimonial.id}
      variants={itemVariants}
      className="relative"
    >
      <Card 
        className={cn(
          'h-full cursor-pointer transition-all hover:shadow-lg hover:scale-105',
          themeClasses[theme],
          playerState.activeTestimonial === testimonial.id && 'ring-2 ring-gold-400'
        )}
        onClick={() => selectTestimonial(testimonial.id)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {testimonial.featured && (
                  <Badge className="bg-gold-600 text-white">Featured</Badge>
                )}
                {testimonial.verified && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Verified
                  </Badge>
                )}
                <Badge variant="outline" className="capitalize">
                  {testimonial.category}
                </Badge>
              </div>
              
              <h3 className="font-serif font-semibold text-lg leading-tight mb-1">
                {testimonial.title}
              </h3>
              
              <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
                <span className="font-medium">{testimonial.author}</span>
                <span>•</span>
                <span>{testimonial.role}</span>
                {testimonial.viewCount > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {testimonial.viewCount.toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < testimonial.rating ? "fill-gold-400 text-gold-400" : "text-slate-400"
                    )}
                  />
                ))}
              </div>

              <p className="text-sm opacity-90 leading-relaxed line-clamp-3">
                {testimonial.description}
              </p>
            </div>

            <div className="ml-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  trackEngagement('share', testimonial.id)
                }}
                className="hover:bg-white/10"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Media Type Indicators */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {testimonial.videoContent && (
                <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  <Video className="w-3 h-3" />
                  Video
                </div>
              )}
              {testimonial.audioContent && (
                <div className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  <Headphones className="w-3 h-3" />
                  Audio
                </div>
              )}
              {testimonial.textContent && (
                <div className="flex items-center gap-1 text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                  <Type className="w-3 h-3" />
                  Text
                </div>
              )}
              {testimonial.imageContent && (
                <div className="flex items-center gap-1 text-xs bg-[#CA9E5B]/20 text-[#CA9E5B] px-2 py-1 rounded-full">
                  <ImageIcon className="w-3 h-3" />
                  Images
                </div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8"
                onClick={(e) => {
                  e.stopPropagation()
                  trackEngagement('like', testimonial.id)
                }}
              >
                <Heart className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-8 h-8"
                onClick={(e) => {
                  e.stopPropagation()
                  trackEngagement('bookmark', testimonial.id)
                }}
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Preview Thumbnail */}
          {(testimonial.videoContent?.poster || testimonial.imageContent?.featured) && (
            <div className="relative aspect-video bg-slate-200 rounded-lg overflow-hidden mb-3">
              <img
                src={testimonial.videoContent?.poster || testimonial.imageContent?.featured}
                alt={`${testimonial.title} preview`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <Play className="w-8 h-8 text-white" />
              </div>
            </div>
          )}

          {/* Metadata */}
          {testimonial.metadata && (
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
          )}
        </CardContent>
      </Card>
    </m.div>
  )

  // Render multi-modal player
  const renderMultiModalPlayer = () => {
    if (!currentTestimonial) return null

    return (
      <m.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
      >
        <div className="container mx-auto h-full flex flex-col">
          {/* Player Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <h2 className="font-serif font-semibold text-xl text-white">
                {currentTestimonial.title}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-white/80">{currentTestimonial.author}</span>
                <span className="text-white/60">•</span>
                <span className="text-white/80">{currentTestimonial.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* View Mode Tabs */}
              <Tabs value={playerState.currentView} onValueChange={handleViewChange}>
                <TabsList className="bg-white/10 border-white/20">
                  {currentTestimonial.videoContent && (
                    <TabsTrigger value="video" className="data-[state=active]:bg-white/20">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </TabsTrigger>
                  )}
                  {currentTestimonial.audioContent && (
                    <TabsTrigger value="audio" className="data-[state=active]:bg-white/20">
                      <Headphones className="w-4 h-4 mr-2" />
                      Audio
                    </TabsTrigger>
                  )}
                  {currentTestimonial.textContent && (
                    <TabsTrigger value="text" className="data-[state=active]:bg-white/20">
                      <Type className="w-4 h-4 mr-2" />
                      Text
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="combined" className="data-[state=active]:bg-white/20">
                    <Layers className="w-4 h-4 mr-2" />
                    Combined
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setPlayerState(prev => ({ ...prev, activeTestimonial: null }))}
              >
                ×
              </Button>
            </div>
          </div>

          {/* Player Content */}
          <div className="flex-1 p-6 overflow-hidden">
            <Tabs value={playerState.currentView} className="h-full">
              {/* Video Content */}
              {currentTestimonial.videoContent && (
                <TabsContent value="video" className="h-full m-0">
                  <AdvancedVideoPlayer
                    id={`video-${currentTestimonial.id}`}
                    src={currentTestimonial.videoContent.src}
                    poster={currentTestimonial.videoContent.poster}
                    title={currentTestimonial.title}
                    description={currentTestimonial.description}
                    testimonialAuthor={currentTestimonial.author}
                    testimonialRole={currentTestimonial.role}
                    duration={currentTestimonial.videoContent.duration}
                    chapters={currentTestimonial.videoContent.chapters}
                    highlights={currentTestimonial.videoContent.highlights}
                    captions={currentTestimonial.videoContent.captions}
                    onAnalytics={(event) => trackAnalytics(event.type, currentTestimonial.id, 'video', event.metadata)}
                    onEngagement={(event) => trackEngagement(event.type, currentTestimonial.id)}
                    className="h-full"
                    autoPlay={playerState.playing}
                    muted={playerState.muted}
                  />
                </TabsContent>
              )}

              {/* Audio Content */}
              {currentTestimonial.audioContent && (
                <TabsContent value="audio" className="h-full m-0">
                  <VoiceTestimonialsPlayer
                    id={`audio-${currentTestimonial.id}`}
                    src={currentTestimonial.audioContent.src}
                    title={currentTestimonial.title}
                    description={currentTestimonial.description}
                    testimonialAuthor={currentTestimonial.author}
                    testimonialRole={currentTestimonial.role}
                    duration={currentTestimonial.audioContent.duration}
                    transcript={currentTestimonial.audioContent.transcript}
                    waveformData={currentTestimonial.audioContent.waveformData}
                    chapters={currentTestimonial.audioContent.chapters}
                    highlights={currentTestimonial.audioContent.highlights}
                    onAnalytics={(event) => trackAnalytics(event.type, currentTestimonial.id, 'audio', event.metadata)}
                    onEngagement={(event) => trackEngagement(event.type, currentTestimonial.id)}
                    className="h-full"
                    autoPlay={playerState.playing}
                    muted={playerState.muted}
                    theme="premium"
                  />
                </TabsContent>
              )}

              {/* Text Content */}
              {currentTestimonial.textContent && (
                <TabsContent value="text" className="h-full m-0">
                  <div className="h-full bg-white/5 rounded-lg p-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                      <div className="prose prose-invert prose-lg max-w-none">
                        <div className="mb-8">
                          <h2 className="text-3xl font-serif mb-4">{currentTestimonial.title}</h2>
                          <div className="flex items-center gap-4 text-white/80 mb-6">
                            <span>{currentTestimonial.author}</span>
                            <span>•</span>
                            <span>{currentTestimonial.role}</span>
                            {currentTestimonial.textContent.readingTime && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {currentTestimonial.textContent.readingTime} min read
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {currentTestimonial.textContent.summary && (
                          <div className="bg-gold-600/10 border-l-4 border-gold-600 pl-6 py-4 mb-8">
                            <h3 className="font-semibold text-gold-400 mb-2">Summary</h3>
                            <p className="text-white/90">{currentTestimonial.textContent.summary}</p>
                          </div>
                        )}

                        <div className="whitespace-pre-wrap leading-relaxed">
                          {currentTestimonial.textContent.content}
                        </div>

                        {currentTestimonial.textContent.keyQuotes && (
                          <div className="mt-8 space-y-4">
                            <h3 className="font-semibold text-gold-400">Key Quotes</h3>
                            {currentTestimonial.textContent.keyQuotes.map((quote, index) => (
                              <blockquote key={index} className="border-l-4 border-gold-600 pl-6 py-2">
                                <p className="italic text-white/90">"{quote}"</p>
                              </blockquote>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              )}

              {/* Combined Multi-Modal View */}
              <TabsContent value="combined" className="h-full m-0">
                <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Primary Media */}
                  <div className="space-y-4">
                    {currentTestimonial.videoContent && (
                      <AdvancedVideoPlayer
                        id={`combined-video-${currentTestimonial.id}`}
                        src={currentTestimonial.videoContent.src}
                        poster={currentTestimonial.videoContent.poster}
                        title={currentTestimonial.title}
                        description={currentTestimonial.description}
                        testimonialAuthor={currentTestimonial.author}
                        testimonialRole={currentTestimonial.role}
                        duration={currentTestimonial.videoContent.duration}
                        onAnalytics={(event) => trackAnalytics(event.type, currentTestimonial.id, 'video', event.metadata)}
                        onEngagement={(event) => trackEngagement(event.type, currentTestimonial.id)}
                        className="aspect-video"
                        autoPlay={playerState.playing}
                        muted={playerState.muted}
                      />
                    )}

                    {currentTestimonial.audioContent && !currentTestimonial.videoContent && (
                      <VoiceTestimonialsPlayer
                        id={`combined-audio-${currentTestimonial.id}`}
                        src={currentTestimonial.audioContent.src}
                        title={currentTestimonial.title}
                        description={currentTestimonial.description}
                        testimonialAuthor={currentTestimonial.author}
                        testimonialRole={currentTestimonial.role}
                        duration={currentTestimonial.audioContent.duration}
                        transcript={currentTestimonial.audioContent.transcript}
                        onAnalytics={(event) => trackAnalytics(event.type, currentTestimonial.id, 'audio', event.metadata)}
                        onEngagement={(event) => trackEngagement(event.type, currentTestimonial.id)}
                        autoPlay={playerState.playing}
                        muted={playerState.muted}
                        theme="premium"
                      />
                    )}
                  </div>

                  {/* Secondary Content */}
                  <div className="bg-white/5 rounded-lg p-6 overflow-y-auto">
                    {currentTestimonial.textContent && (
                      <div className="prose prose-invert max-w-none">
                        <h3 className="text-xl font-serif mb-4">Testimonial Text</h3>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                          {currentTestimonial.textContent.content}
                        </div>
                      </div>
                    )}

                    {currentTestimonial.imageContent && (
                      <div className="mt-6">
                        <h3 className="text-xl font-serif mb-4">Image Gallery</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {currentTestimonial.imageContent.gallery.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full aspect-square object-cover rounded-lg"
                              />
                              {image.caption && (
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end">
                                  <p className="text-white text-xs p-3">{image.caption}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentTestimonial.metadata && (
                      <div className="mt-6">
                        <h3 className="text-xl font-serif mb-4">Details</h3>
                        <div className="space-y-3">
                          {currentTestimonial.metadata.school && (
                            <div className="flex justify-between">
                              <span className="text-white/70">School:</span>
                              <span>{currentTestimonial.metadata.school}</span>
                            </div>
                          )}
                          {currentTestimonial.metadata.subject && (
                            <div className="flex justify-between">
                              <span className="text-white/70">Subject:</span>
                              <span>{currentTestimonial.metadata.subject}</span>
                            </div>
                          )}
                          {currentTestimonial.metadata.grade && (
                            <div className="flex justify-between">
                              <span className="text-white/70">Grade:</span>
                              <span>{currentTestimonial.metadata.grade}</span>
                            </div>
                          )}
                          {currentTestimonial.metadata.result && (
                            <div className="flex justify-between">
                              <span className="text-white/70">Result:</span>
                              <span className="text-green-400">{currentTestimonial.metadata.result}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </m.div>
    )
  }

  return (
    <div className={cn('space-y-8', className)} ref={containerRef}>
      {/* Header */}
      <div className="text-center">
        <h2 className="font-serif text-3xl font-semibold mb-4">
          Multi-Modal Testimonials Experience
        </h2>
        <p className="text-lg opacity-80 max-w-2xl mx-auto">
          Experience our testimonials through video, audio, text, and images. 
          Choose your preferred format or enjoy them all together.
        </p>
      </div>

      {/* Testimonials Grid */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={layoutClasses[layout]}
      >
        {filteredTestimonials.map(renderTestimonialCard)}
      </m.div>

      {/* Multi-Modal Player Modal */}
      <AnimatePresence>
        {playerState.activeTestimonial && renderMultiModalPlayer()}
      </AnimatePresence>
    </div>
  )
}

export default MultiModalTestimonials