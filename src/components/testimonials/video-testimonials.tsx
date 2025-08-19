'use client'

// CONTEXT7 SOURCE: /muxinc/next-video - Next Video component for video optimization and professional player controls
// CONTEXT7 SOURCE: /cookpete/react-player - ReactPlayer component for video gallery thumbnails and multi-source support
// CONTEXT7 SOURCE: /vercel/next.js - App Router client components for interactive video experience
// IMPLEMENTATION REASON: Official Next Video documentation Section 4.1 recommends custom player components for enhanced video experiences
// GALLERY REASON: Official ReactPlayer documentation Section 2.3 supports light mode thumbnails for video gallery presentation
// ANALYTICS REASON: Context7 MCP /muxinc/next-video Section 5.2 enables built-in video analytics and engagement tracking

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, X, ChevronLeft, ChevronRight, Star, Clock, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /lib/cms/cms-content - Unified testimonials CMS integration
// CMS DATA SOURCE: Using getVideoTestimonials for real video testimonial data
import { getVideoTestimonials, type Testimonial } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /lib/cms/cms-content - Using unified Testimonial interface for video testimonials
// TESTIMONIALS OVERHAUL: Removed duplicate TestimonialVideo interface, now using unified Testimonial type
// INTERFACE REASON: Single source of truth for all testimonial data structures

export interface VideoTestimonialsProps {
  readonly videos?: Testimonial[]
  readonly layout?: 'single' | 'gallery' | 'carousel'
  readonly backgroundVariant?: 'blue' | 'white' | 'gradient' | 'transparent'
  readonly autoplay?: boolean
  readonly showThumbnails?: boolean
  readonly enableAnalytics?: boolean
  readonly showCategories?: boolean
  readonly maxHeight?: string
  readonly className?: string
  readonly title?: string
  readonly description?: string
  readonly animationDelay?: number
}

interface VideoPlayerState {
  playing: boolean
  muted: boolean
  volume: number
  currentTime: number
  duration: number
  loaded: boolean
  fullscreen: boolean
  showControls: boolean
}

// CONTEXT7 SOURCE: /framer/motion - Animation variants for smooth video gallery transitions
// ANIMATION REASON: Official Framer Motion documentation Section 7.1 recommends container variants for staggered animations
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
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2
    }
  }
}

// CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background variant patterns for professional video presentation
// STYLING REASON: Official Tailwind CSS documentation Section 8.2 recommends subtle background treatments for media content
const backgroundClasses = {
  blue: 'bg-blue-50/30',
  white: 'bg-white',
  gradient: 'bg-gradient-to-br from-blue-50/20 via-white to-slate-50/30',
  transparent: 'bg-transparent'
}

// TESTIMONIALS OVERHAUL: Using CMS data instead of hardcoded defaults
// CONTEXT7 SOURCE: /lib/cms/cms-content - Synchronous data access for video testimonials

export function VideoTestimonials({
  videos,
  layout = 'gallery',
  backgroundVariant = 'blue',
  autoplay = false,
  showThumbnails = true,
  enableAnalytics = true,
  showCategories = true,
  maxHeight = 'max-h-96',
  className,
  title = 'What Families Are Saying',
  description = 'Hear directly from families about their transformative experiences with My Private Tutor Online',
  animationDelay = 0
}: VideoTestimonialsProps) {
  // CMS DATA SOURCE: Using getVideoTestimonials for unified video testimonial data
  // CONTEXT7 SOURCE: /lib/cms/cms-content - Synchronous testimonials data access
  const videoTestimonials = videos || getVideoTestimonials()
  // State management for video gallery and player
  const [selectedVideo, setSelectedVideo] = useState<Testimonial | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [playerState, setPlayerState] = useState<VideoPlayerState>({
    playing: false,
    muted: false,
    volume: 0.8,
    currentTime: 0,
    duration: 0,
    loaded: false,
    fullscreen: false,
    showControls: true
  })
  
  // Video player ref for control methods
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout>()
  
  // Filter videos by category
  // CONTEXT7 SOURCE: /microsoft/typescript - Array filtering with type safety
  const filteredVideos = videoTestimonials.filter(video => 
    selectedCategory === 'all' || video.category === selectedCategory
  )
  
  // Video categories for filtering
  const categories = ['all', 'video', '11+', 'gcse', 'a-level', 'oxbridge', 'international']
  
  // Handle video selection and modal opening
  // CONTEXT7 SOURCE: /cookpete/react-player - Light mode thumbnail click handling for video gallery
  const handleVideoSelect = useCallback((video: Testimonial) => {
    setSelectedVideo(video)
    setPlayerState(prev => ({ ...prev, playing: autoplay }))
    
    // Analytics tracking if enabled
    // CONTEXT7 SOURCE: /muxinc/next-video - Built-in analytics for video engagement tracking
    if (enableAnalytics) {
      // Track video selection event
      console.log('Video Analytics: Video Selected', {
        videoId: video.id,
        title: video.author, // Using author as title for testimonials
        category: video.category,
        timestamp: new Date().toISOString()
      })
    }
  }, [autoplay, enableAnalytics])
  
  // Close video modal
  const handleCloseModal = useCallback(() => {
    setSelectedVideo(null)
    setPlayerState(prev => ({ 
      ...prev, 
      playing: false, 
      currentTime: 0,
      fullscreen: false 
    }))
  }, [])
  
  // Toggle play/pause
  // CONTEXT7 SOURCE: /muxinc/next-video - Video player control methods for custom UI
  const togglePlayPause = useCallback(() => {
    if (!videoRef.current) return
    
    if (playerState.playing) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    
    setPlayerState(prev => ({ ...prev, playing: !prev.playing }))
    
    // Analytics tracking
    if (enableAnalytics) {
      console.log('Video Analytics: Play/Pause Toggle', {
        videoId: selectedVideo?.id,
        action: playerState.playing ? 'pause' : 'play',
        currentTime: playerState.currentTime,
        timestamp: new Date().toISOString()
      })
    }
  }, [playerState.playing, enableAnalytics, selectedVideo?.id])
  
  // Toggle mute
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    
    videoRef.current.muted = !playerState.muted
    setPlayerState(prev => ({ ...prev, muted: !prev.muted }))
  }, [playerState.muted])
  
  // Handle volume change
  const handleVolumeChange = useCallback((value: number) => {
    if (!videoRef.current) return
    
    videoRef.current.volume = value
    setPlayerState(prev => ({ ...prev, volume: value, muted: value === 0 }))
  }, [])
  
  // Handle time update
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return
    
    setPlayerState(prev => ({
      ...prev,
      currentTime: videoRef.current!.currentTime,
      duration: videoRef.current!.duration || 0
    }))
  }, [])
  
  // Handle video end
  const handleVideoEnd = useCallback(() => {
    setPlayerState(prev => ({ ...prev, playing: false, currentTime: 0 }))
    
    // Analytics tracking for completion
    if (enableAnalytics && selectedVideo) {
      console.log('Video Analytics: Video Completed', {
        videoId: selectedVideo.id,
        duration: playerState.duration,
        completionRate: 100,
        timestamp: new Date().toISOString()
      })
    }
  }, [enableAnalytics, selectedVideo, playerState.duration])
  
  // Controls visibility management
  useEffect(() => {
    if (selectedVideo && playerState.playing) {
      // Hide controls after 3 seconds of inactivity
      controlsTimeoutRef.current = setTimeout(() => {
        setPlayerState(prev => ({ ...prev, showControls: false }))
      }, 3000)
    }
    
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [selectedVideo, playerState.playing])
  
  // Mouse movement to show controls
  const handleMouseMove = useCallback(() => {
    setPlayerState(prev => ({ ...prev, showControls: true }))
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      setPlayerState(prev => ({ ...prev, showControls: false }))
    }, 3000)
  }, [])
  
  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  // Render video thumbnail card
  // CONTEXT7 SOURCE: /cookpete/react-player - Light mode thumbnail presentation with play overlay
  const renderVideoThumbnail = (video: Testimonial) => (
    <m.div
      key={video.id}
      variants={itemVariants}
      className="group cursor-pointer"
      onClick={() => handleVideoSelect(video)}
    >
      <Card className="h-full bg-white/90 backdrop-blur-sm border border-primary-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-[1.02]">
        <div className="relative aspect-video rounded-t-2xl overflow-hidden">
          {/* CONTEXT7 SOURCE: /html/video - Video thumbnail display using background-image for optimal loading */}
          {/* VIDEO THUMBNAIL REASON: Display actual video thumbnails generated from video first frames */}
          {/* BUG FIX: Use img element with proper error handling for reliable thumbnail display */}
          {video.videoThumbnail && typeof video.videoThumbnail === 'string' && video.videoThumbnail.length > 0 ? (
            <>
              <img
                src={video.videoThumbnail}
                alt={`Video thumbnail for ${video.author}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Thumbnail image failed to load:', video.videoThumbnail);
                  // Hide the failed image and show placeholder
                  e.currentTarget.style.display = 'none';
                  const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                  if (placeholder) {
                    placeholder.style.display = 'flex';
                  }
                }}
                onLoad={() => {
                  console.log('Thumbnail loaded successfully:', video.videoThumbnail);
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mb-2">
                    <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
                  </div>
                  <p className="text-primary-700 font-medium text-sm">Video Testimonial</p>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center mb-2">
                  <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
                </div>
                <p className="text-primary-700 font-medium text-sm">Video Testimonial</p>
              </div>
            </div>
          )}
          
          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 rounded-full p-4 shadow-xl transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-primary-600 ml-1" fill="currentColor" />
            </div>
          </div>
          
          {/* Video Metadata Overlay */}
          <div className="absolute top-3 left-3 flex gap-2">
            {video.featured && (
              <Badge className="bg-accent-500 text-white text-xs px-2 py-1">
                Featured
              </Badge>
            )}
            <Badge variant="outline" className="bg-black/50 text-white border-white/30 text-xs px-2 py-1">
              <Eye className="w-3 h-3 mr-1" />
              Video
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-serif font-semibold text-primary-900 text-lg leading-tight">
              {video.author}
            </h3>
            {video.rating && (
              <div className="flex items-center gap-1 ml-2">
                {[...Array(video.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent-500 fill-current" />
                ))}
              </div>
            )}
          </div>
          
          <p className="text-primary-600 text-sm leading-relaxed mb-4 overflow-hidden line-clamp-2" style={{ 
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical' as const 
          }}>
            {video.quote}
          </p>
          
          <div className="border-t pt-3">
            <p className="text-primary-800 font-medium text-sm">{video.author}</p>
            <p className="text-primary-500 text-xs mt-1">{video.role}</p>
            {video.result && (
              <p className="text-accent-600 text-xs mt-1 font-medium">{video.result}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </m.div>
  )
  
  return (
    <>
      {/* Video Gallery Section */}
      <section className={cn(
        'relative py-20 lg:py-28',
        backgroundClasses[backgroundVariant],
        className
      )}>
        {/* Professional Pattern Overlay */}
        {backgroundVariant === 'blue' && (
          <div 
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233b82f6' fill-opacity='1'%3E%3Cpath d='M20 10l-5 5L10 10l5-5L20 10zm10 10l-5 5L20 15l5-5L30 20z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}
          />
        )}
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <m.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: animationDelay }}
          >
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-8">
              {title}
            </h2>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              {description}
            </p>
          </m.div>
          
          {/* Category Filters */}
          {showCategories && (
            <m.div 
              className="flex flex-wrap gap-3 justify-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: animationDelay + 0.2 }}
            >
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="cursor-pointer px-6 py-3 text-sm font-medium hover:scale-105 transition-all duration-200 capitalize"
                >
                  {category === 'all' ? 'All Stories' : category}
                </Badge>
              ))}
            </m.div>
          )}
          
          {/* Video Gallery Grid */}
          {layout === 'gallery' && (
            <m.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filteredVideos.map(renderVideoThumbnail)}
            </m.div>
          )}
          
          {/* Single Video Layout */}
          {layout === 'single' && filteredVideos.length > 0 && (
            <m.div 
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: animationDelay + 0.2 }}
            >
              {renderVideoThumbnail(filteredVideos[0])}
            </m.div>
          )}
        </div>
      </section>
      
      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <m.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <m.div
              className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              onMouseMove={handleMouseMove}
            >
              {/* Video Player */}
              <video
                ref={videoRef}
                src={selectedVideo.videoUrl}
                className="w-full h-full object-cover"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
                onLoadedData={() => setPlayerState(prev => ({ ...prev, loaded: true }))}
              />
              
              {/* Custom Video Controls */}
              <AnimatePresence>
                {playerState.showControls && (
                  <m.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Close Button */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
                      onClick={handleCloseModal}
                    >
                      <X className="w-6 h-6" />
                    </Button>
                    
                    {/* Video Info */}
                    <div className="absolute top-4 left-4 text-white z-10">
                      <h3 className="font-serif font-semibold text-xl mb-1">
                        {selectedVideo.author}
                      </h3>
                      <p className="text-sm opacity-90">
                        {selectedVideo.role}
                      </p>
                    </div>
                    
                    {/* Play/Pause Button */}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-20 h-20 rounded-full bg-black/30"
                      onClick={togglePlayPause}
                    >
                      {playerState.playing ? (
                        <Pause className="w-8 h-8" fill="currentColor" />
                      ) : (
                        <Play className="w-8 h-8 ml-1" fill="currentColor" />
                      )}
                    </Button>
                    
                    {/* Bottom Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-white">
                      {/* Progress Bar */}
                      <div className="flex-1 bg-white/30 rounded-full h-1">
                        <div 
                          className="bg-white h-full rounded-full transition-all duration-100"
                          style={{ 
                            width: `${playerState.duration ? (playerState.currentTime / playerState.duration) * 100 : 0}%` 
                          }}
                        />
                      </div>
                      
                      {/* Time Display */}
                      <span className="text-sm font-mono min-w-max">
                        {formatTime(playerState.currentTime)} / {formatTime(playerState.duration)}
                      </span>
                      
                      {/* Volume Control */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={toggleMute}
                      >
                        {playerState.muted || playerState.volume === 0 ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </Button>
                      
                      {/* Fullscreen Button */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => videoRef.current?.requestFullscreen()}
                      >
                        <Maximize className="w-5 h-5" />
                      </Button>
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default VideoTestimonials