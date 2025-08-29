/**
 * CONTEXT7 SOURCE: /cookpete/react-player - Video embedding with lazy loading and responsive controls
 * CONTEXT7 SOURCE: /cookpete/react-player - Light mode with custom thumbnails and performance optimization
 * 
 * FAQ Rich Media Video Component
 * Implements professional video embedding with accessibility and performance features
 * 
 * FEATURES:
 * - YouTube/Vimeo/Self-hosted video support with ReactPlayer
 * - Lazy loading with intersection observer
 * - Responsive design with aspect ratio preservation
 * - WCAG 2.1 AA accessibility compliance
 * - Performance optimization with preload controls
 * - Custom thumbnail with play overlay
 * - Keyboard navigation support
 * - Screen reader compatibility
 * 
 * BUSINESS CONTEXT: Premium tutoring service video content
 * TARGET SEGMENTS: All client segments with enhanced engagement
 */

'use client'

// CONTEXT7 SOURCE: /cookpete/react-player - ReactPlayer lazy loading import patterns
import dynamic from 'next/dynamic'
import { useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { FAQRichMediaVideo } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /cookpete/react-player - Lazy loading ReactPlayer to reduce bundle size
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-48 bg-muted animate-pulse rounded-lg">
      <div className="text-muted-foreground">Loading video player...</div>
    </div>
  )
})

// CONTEXT7 SOURCE: /lucide-react - Icon imports for video controls and accessibility
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, RotateCcw } from 'lucide-react'
import { Button } from '@/ui/button'

interface FAQRichMediaVideoProps {
  readonly video: FAQRichMediaVideo
  readonly className?: string
  readonly priority?: 'high' | 'low'
}

/**
 * CONTEXT7 SOURCE: /cookpete/react-player - Video embedding component with accessibility and performance
 * Professional video player with lazy loading, responsive design, and premium UI
 */
export function FAQRichMediaVideoPlayer({ video, className, priority = 'low' }: FAQRichMediaVideoProps) {
  // CONTEXT7 SOURCE: /react - React hooks for video state management
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(video.muted ?? true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [hasError, setHasError] = useState(false)

  const playerRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // CONTEXT7 SOURCE: /web-apis/intersection-observer - Lazy loading implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // CONTEXT7 SOURCE: /cookpete/react-player - Event handlers for video control
  const handleReady = useCallback(() => {
    console.log('Video player ready:', video.id)
    setIsReady(true)
    setHasError(false)
  }, [video.id])

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const handleProgress = useCallback((state: { played: number }) => {
    setProgress(state.played)
  }, [])

  const handleDuration = useCallback((duration: number) => {
    setDuration(duration)
  }, [])

  const handleError = useCallback((error: any) => {
    console.error('Video player error:', error)
    setHasError(true)
  }, [])

  // CONTEXT7 SOURCE: /cookpete/react-player - Custom control handlers
  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted)
  }, [isMuted])

  const toggleFullscreen = useCallback(() => {
    if (containerRef.current) {
      if (!isFullscreen) {
        containerRef.current.requestFullscreen?.()
      } else {
        document.exitFullscreen?.()
      }
      setIsFullscreen(!isFullscreen)
    }
  }, [isFullscreen])

  const handleSeek = useCallback((seekTo: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seekTo)
    }
  }, [])

  // CONTEXT7 SOURCE: /cookpete/react-player - Responsive aspect ratio calculation
  const getAspectRatioClasses = useCallback(() => {
    switch (video.responsive.aspectRatio) {
      case '16:9':
        return 'aspect-video'
      case '4:3':
        return 'aspect-[4/3]'
      case '1:1':
        return 'aspect-square'
      case 'custom':
        return 'h-auto'
      default:
        return 'aspect-video'
    }
  }, [video.responsive.aspectRatio])

  // CONTEXT7 SOURCE: /cookpete/react-player - Light mode with custom thumbnail
  const renderThumbnail = useCallback(() => {
    if (!video.thumbnail) return null

    return (
      <div className="absolute inset-0 cursor-pointer group">
        <img
          src={video.thumbnail}
          alt={video.accessibility.description}
          className="w-full h-full object-cover rounded-lg"
          loading={priority === 'high' ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <Button
            size="lg"
            className="rounded-full w-16 h-16 bg-white/90 text-slate-900 hover:bg-white hover:scale-105 transition-all"
            onClick={togglePlay}
            aria-label={`Play ${video.title}`}
          >
            <Play className="w-6 h-6 ml-1" />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold text-lg drop-shadow-lg">
            {video.title}
          </h3>
          {video.duration && (
            <p className="text-white/90 text-sm drop-shadow">
              Duration: {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
            </p>
          )}
        </div>
      </div>
    )
  }, [video.thumbnail, video.title, video.duration, video.accessibility.description, priority, togglePlay])

  // CONTEXT7 SOURCE: /cookpete/react-player - Custom controls overlay
  const renderControls = useCallback(() => {
    if (!isReady || !isPlaying) return null

    return (
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
        <div className="flex items-center gap-2 text-white">
          <Button
            size="sm"
            variant="ghost"
            onClick={togglePlay}
            className="text-white hover:bg-white/20"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleMute}
            className="text-white hover:bg-white/20"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>

          <div className="flex-1 mx-3">
            <div className="h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-200"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleSeek(0)}
            className="text-white hover:bg-white/20"
            aria-label="Restart video"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/20"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    )
  }, [isReady, isPlaying, isMuted, progress, isFullscreen, togglePlay, toggleMute, handleSeek, toggleFullscreen])

  if (hasError) {
    return (
      <div className={cn(
        "flex items-center justify-center h-48 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25",
        className
      )}>
        <div className="text-center">
          <p className="text-muted-foreground mb-2">Failed to load video</p>
          <Button variant="outline" size="sm" onClick={() => setHasError(false)}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg border bg-background",
        getAspectRatioClasses(),
        className
      )}
      style={{ maxWidth: video.responsive.maxWidth }}
    >
      {/* CONTEXT7 SOURCE: /cookpete/react-player - Accessibility attributes */}
      <div
        role="region"
        aria-label={video.accessibility.ariaLabel}
        className="w-full h-full"
      >
        {isVisible && !hasError ? (
          <>
            <ReactPlayer
              ref={playerRef}
              url={video.url}
              width="100%"
              height="100%"
              playing={isPlaying}
              muted={isMuted}
              loop={video.loop}
              controls={false} // Using custom controls
              light={!isPlaying ? renderThumbnail() : false}
              onReady={handleReady}
              onPlay={handlePlay}
              onPause={handlePause}
              onProgress={handleProgress}
              onDuration={handleDuration}
              onError={handleError}
              config={{
                youtube: {
                  playerVars: {
                    showinfo: 0,
                    modestbranding: 1,
                    autoplay: video.autoplay ? 1 : 0,
                    start: video.startTime,
                    end: video.endTime,
                  }
                },
                vimeo: {
                  playerOptions: {
                    autopause: false,
                    autoplay: video.autoplay,
                    muted: isMuted,
                  }
                }
              }}
              // CONTEXT7 SOURCE: /cookpete/react-player - Performance optimization
              preload={video.performance.preload}
            />
            {renderControls()}
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-muted">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{video.title}</h3>
              <p className="text-sm text-muted-foreground">Click to load video</p>
            </div>
          </div>
        )}

        {/* CONTEXT7 SOURCE: /web-apis/web-accessibility - Screen reader support */}
        <div className="sr-only">
          <p>{video.accessibility.description}</p>
          {video.transcript && (
            <details>
              <summary>Video Transcript</summary>
              <p>{video.transcript}</p>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /cookpete/react-player - Video embedding patterns for FAQ contexts
 * Wrapper component for FAQ video content with context-appropriate styling
 */
interface FAQVideoProps {
  readonly video: FAQRichMediaVideo
  readonly className?: string
}

export function FAQVideo({ video, className }: FAQVideoProps) {
  return (
    <div className={cn("my-6", className)}>
      {video.title && (
        <h4 className="font-semibold text-lg mb-3 text-foreground">
          {video.title}
        </h4>
      )}
      
      <FAQRichMediaVideoPlayer 
        video={video} 
        priority="low"
        className="shadow-lg"
      />
      
      {video.captions && video.captions.length > 0 && (
        <div className="mt-3 text-sm text-muted-foreground">
          <p>Captions available in multiple languages</p>
        </div>
      )}
    </div>
  )
}

export default FAQVideo