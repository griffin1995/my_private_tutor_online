/**
 * CONTEXT7 SOURCE: /paullecam/react-leaflet - Interactive content patterns
 * CONTEXT7 SOURCE: /web-apis/intersection-observer - Performance optimization with lazy loading
 * 
 * FAQ Rich Media GIF Component
 * Implements professional GIF/animation content with performance and accessibility
 * 
 * FEATURES:
 * - GIF playback with play/pause controls
 * - Lazy loading with intersection observer
 * - Static fallback images for performance
 * - Play on hover functionality
 * - Responsive design with aspect ratio preservation
 * - WCAG 2.1 AA accessibility compliance
 * - Performance optimization with placeholders
 * - Keyboard navigation support
 * - Loading states and error handling
 * 
 * BUSINESS CONTEXT: Animated educational content for premium tutoring service
 * TARGET SEGMENTS: Visual learners requiring animated explanations
 */

'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { FAQRichMediaGif } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /lucide-react - Icon imports for GIF controls
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Download,
  Maximize,
  Volume2,
  VolumeX,
  Loader2,
  AlertTriangle,
  Image as ImageIcon
} from 'lucide-react'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'

interface FAQRichMediaGifProps {
  readonly gif: FAQRichMediaGif
  readonly className?: string
}

interface GifState {
  isLoaded: boolean
  isVisible: boolean
  isPlaying: boolean
  hasError: boolean
  showControls: boolean
  isHovered: boolean
}

/**
 * CONTEXT7 SOURCE: /web-apis/intersection-observer - Lazy loading GIF component
 * Professional GIF player with accessibility and performance features
 */
export function FAQRichMediaGifPlayer({ gif, className }: FAQRichMediaGifProps) {
  const [state, setState] = useState<GifState>({
    isLoaded: false,
    isVisible: false,
    isPlaying: gif.autoplay || false,
    hasError: false,
    showControls: false,
    isHovered: false
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const gifRef = useRef<HTMLImageElement>(null)
  const staticRef = useRef<HTMLImageElement>(null)

  // CONTEXT7 SOURCE: /web-apis/intersection-observer - Lazy loading implementation
  useEffect(() => {
    if (!gif.performance.lazyLoad) {
      setState(prev => ({ ...prev, isVisible: true }))
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState(prev => ({ ...prev, isVisible: true }))
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
  }, [gif.performance.lazyLoad])

  // CONTEXT7 SOURCE: /web-apis/dom - Image load handling
  const handleGifLoad = useCallback(() => {
    setState(prev => ({ ...prev, isLoaded: true, hasError: false }))
  }, [])

  const handleGifError = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      hasError: true, 
      isLoaded: false 
    }))
  }, [])

  const handleStaticLoad = useCallback(() => {
    if (!state.isLoaded) {
      setState(prev => ({ ...prev, isLoaded: true }))
    }
  }, [state.isLoaded])

  // CONTEXT7 SOURCE: /web-apis/dom - Play/pause functionality
  const togglePlayback = useCallback(() => {
    if (!gifRef.current) return

    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
    
    // Force reload GIF to restart animation
    if (!state.isPlaying && gifRef.current) {
      const currentSrc = gifRef.current.src
      gifRef.current.src = ''
      gifRef.current.src = currentSrc
    }
  }, [state.isPlaying])

  const restartGif = useCallback(() => {
    if (gifRef.current) {
      const currentSrc = gifRef.current.src
      gifRef.current.src = ''
      setTimeout(() => {
        if (gifRef.current) {
          gifRef.current.src = currentSrc
          setState(prev => ({ ...prev, isPlaying: true }))
        }
      }, 50)
    }
  }, [])

  // CONTEXT7 SOURCE: /web-apis/dom - Download functionality
  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(gif.url)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${gif.title.replace(/\s+/g, '-').toLowerCase()}.gif`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download GIF:', error)
    }
  }, [gif.url, gif.title])

  // CONTEXT7 SOURCE: /web-apis/dom - Mouse event handlers for play on hover
  const handleMouseEnter = useCallback(() => {
    setState(prev => ({ ...prev, isHovered: true, showControls: true }))
    
    if (gif.playOnHover && !state.isPlaying) {
      setState(prev => ({ ...prev, isPlaying: true }))
      if (gifRef.current) {
        const currentSrc = gifRef.current.src
        gifRef.current.src = ''
        gifRef.current.src = currentSrc
      }
    }
  }, [gif.playOnHover, state.isPlaying])

  const handleMouseLeave = useCallback(() => {
    setState(prev => ({ ...prev, isHovered: false, showControls: false }))
    
    if (gif.playOnHover && state.isPlaying) {
      setState(prev => ({ ...prev, isPlaying: false }))
    }
  }, [gif.playOnHover, state.isPlaying])

  // CONTEXT7 SOURCE: /react - Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault()
        togglePlayback()
        break
      case 'r':
        event.preventDefault()
        restartGif()
        break
    }
  }, [togglePlayback, restartGif])

  // CONTEXT7 SOURCE: /web-apis/dom - Placeholder rendering
  const renderPlaceholder = () => {
    const placeholderColor = gif.performance.placeholder === 'color' ? 'bg-muted' : 'bg-transparent'
    
    return (
      <div className={cn(
        "flex items-center justify-center text-muted-foreground",
        placeholderColor
      )}>
        <div className="text-center">
          <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Loading animation...</p>
        </div>
      </div>
    )
  }

  // CONTEXT7 SOURCE: /web-apis/dom - Controls overlay
  const renderControls = () => {
    if (!gif.controls || (!state.showControls && !state.isHovered)) return null

    return (
      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors group">
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-1 bg-black/80 rounded px-2 py-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={togglePlayback}
              className="text-white hover:bg-white/20 h-6 w-6 p-0"
              aria-label={state.isPlaying ? 'Pause animation' : 'Play animation'}
            >
              {state.isPlaying ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3" />
              )}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={restartGif}
              className="text-white hover:bg-white/20 h-6 w-6 p-0"
              aria-label="Restart animation"
            >
              <RotateCcw className="w-3 h-3" />
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleDownload}
              className="text-white hover:bg-white/20 h-6 w-6 p-0"
              aria-label="Download GIF"
            >
              <Download className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Play button overlay for paused state */}
        {!state.isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              className="rounded-full w-16 h-16 bg-white/90 text-slate-900 hover:bg-white hover:scale-105 transition-all"
              onClick={togglePlayback}
              aria-label="Play animation"
            >
              <Play className="w-6 h-6 ml-1" />
            </Button>
          </div>
        )}
      </div>
    )
  }

  if (state.hasError) {
    return (
      <div className={cn(
        "border border-destructive/20 bg-destructive/5 rounded-lg p-6 text-center",
        className
      )}>
        <AlertTriangle className="w-8 h-8 text-destructive mx-auto mb-2" />
        <h4 className="font-semibold text-destructive mb-1">
          Failed to Load Animation
        </h4>
        <p className="text-sm text-muted-foreground mb-3">
          The GIF animation could not be loaded.
        </p>
        <Button size="sm" variant="outline" onClick={handleDownload}>
          <Download className="w-4 h-4 mr-1" />
          Try Download
        </Button>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-lg border bg-background", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="img"
      aria-label={gif.accessibility.ariaLabel}
      style={{
        width: gif.width ? `${gif.width}px` : 'auto',
        height: gif.height ? `${gif.height}px` : 'auto',
        maxWidth: '100%'
      }}
    >
      {state.isVisible ? (
        <>
          {/* Static fallback image */}
          {gif.staticUrl && (!state.isPlaying || !state.isLoaded) && (
            <img
              ref={staticRef}
              src={gif.staticUrl}
              alt={gif.accessibility.altText}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-300",
                state.isPlaying && state.isLoaded ? "opacity-0" : "opacity-100"
              )}
              onLoad={handleStaticLoad}
              loading={gif.performance.lazyLoad ? "lazy" : "eager"}
            />
          )}

          {/* Animated GIF */}
          {state.isPlaying && (
            <img
              ref={gifRef}
              src={gif.url}
              alt={gif.accessibility.altText}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                state.isLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={handleGifLoad}
              onError={handleGifError}
              loading="lazy"
            />
          )}

          {/* Loading state */}
          {!state.isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              {gif.performance.placeholder === 'blur' ? (
                <div className="w-full h-full bg-muted animate-pulse" />
              ) : (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              )}
            </div>
          )}

          {renderControls()}

          {/* Performance indicator */}
          {gif.performance.optimized && (
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                Optimized
              </Badge>
            </div>
          )}
        </>
      ) : (
        renderPlaceholder()
      )}

      {/* CONTEXT7 SOURCE: /web-apis/web-accessibility - Screen reader content */}
      <div className="sr-only">
        <p>{gif.accessibility.description}</p>
        <p>
          Animation controls: Press space or enter to play/pause, 
          press R to restart. Use mouse to hover for additional controls.
        </p>
      </div>
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /web-apis/dom - GIF wrapper for FAQ contexts
 * FAQ-specific wrapper with context-appropriate styling
 */
export function FAQGif({ gif, className }: FAQRichMediaGifProps) {
  return (
    <div className={cn("my-6", className)}>
      {gif.title && (
        <h4 className="font-semibold text-lg mb-3 text-foreground">
          {gif.title}
        </h4>
      )}
      
      <FAQRichMediaGifPlayer gif={gif} />
      
      {/* Additional information */}
      <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {gif.autoplay && (
            <Badge variant="outline" className="text-xs">
              Auto-play
            </Badge>
          )}
          {gif.loop && (
            <Badge variant="outline" className="text-xs">
              Loops
            </Badge>
          )}
          {gif.playOnHover && (
            <Badge variant="outline" className="text-xs">
              Hover to play
            </Badge>
          )}
        </div>

        {gif.width && gif.height && (
          <span className="text-xs">
            {gif.width} × {gif.height}
          </span>
        )}
      </div>
    </div>
  )
}

export default FAQGif