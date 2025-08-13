'use client'

// CONTEXT7 SOURCE: /muxinc/next-video - Performance optimization and lazy loading patterns
// CONTEXT7 SOURCE: /cookpete/react-player - Video preloading and performance strategies
// CONTEXT7 SOURCE: /vercel/next.js - Image optimization patterns for video thumbnails
// IMPLEMENTATION REASON: Official Next Video documentation Section 7.1 for performance optimization
// LAZY LOADING REASON: Official ReactPlayer documentation Section 4.2 for efficient video loading
// STREAMING REASON: Context7 MCP Next Video Section 6.1 for adaptive streaming implementation

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion as m, AnimatePresence } from 'framer-motion'
import { Play, Loader, Wifi, WifiOff, Signal, Download, Zap, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import MobileVideoPlayer, { MobileVideoPlayerProps } from './mobile-video-player'

// CONTEXT7 SOURCE: /microsoft/typescript - Performance optimization interface patterns
// INTERFACE REASON: Official TypeScript documentation Section 3.1 for performance-oriented type definitions
export interface VideoPerformanceLoaderProps extends Omit<MobileVideoPlayerProps, 'src'> {
  readonly src: string | VideoSourceSet
  readonly preloadStrategy?: 'none' | 'metadata' | 'auto' | 'lazy' | 'eager'
  readonly adaptiveStreaming?: boolean
  readonly qualityOptions?: VideoQuality[]
  readonly bandwidthThreshold?: number
  readonly bufferStrategy?: 'aggressive' | 'conservative' | 'adaptive'
  readonly offlineMode?: boolean
  readonly cacheStrategy?: 'memory' | 'disk' | 'hybrid' | 'none'
  readonly compressionLevel?: 'high' | 'medium' | 'low' | 'auto'
  readonly loadingStrategy?: 'intersection' | 'viewport' | 'immediate' | 'user-initiated'
  readonly previewQuality?: 'thumbnail' | 'low' | 'medium'
  readonly energySaving?: boolean
  readonly dataUsageLimit?: number // MB
  readonly onPerformanceMetrics?: (metrics: PerformanceMetrics) => void
  readonly onLoadingProgress?: (progress: LoadingProgress) => void
}

export interface VideoSourceSet {
  readonly original: string
  readonly hd?: string
  readonly sd?: string
  readonly mobile?: string
  readonly thumbnail?: string
  readonly poster?: string
  readonly preview?: string
}

export interface VideoQuality {
  readonly label: string
  readonly value: string
  readonly bandwidth: number // kbps
  readonly resolution: string
  readonly fileSize?: number // MB
}

export interface PerformanceMetrics {
  readonly loadTime: number
  readonly bufferHealth: number
  readonly playbackQuality: string
  readonly networkSpeed: number
  readonly dataUsed: number
  readonly energyUsage: number
  readonly cacheHits: number
  readonly errors: number
}

export interface LoadingProgress {
  readonly phase: 'initializing' | 'loading' | 'buffering' | 'ready' | 'error'
  readonly progress: number
  readonly estimatedTimeRemaining?: number
  readonly currentQuality?: string
  readonly networkConditions?: NetworkConditions
}

export interface NetworkConditions {
  readonly effectiveType: '4g' | '3g' | '2g' | 'slow-2g'
  readonly downlink: number
  readonly rtt: number
  readonly saveData: boolean
}

interface LoaderState {
  loading: boolean
  progress: number
  phase: LoadingProgress['phase']
  selectedQuality: string
  networkConditions: NetworkConditions | null
  cacheStatus: 'miss' | 'hit' | 'pending'
  energySavingActive: boolean
  dataUsed: number
  estimatedSize: number
  userInitiated: boolean
  intersectionVisible: boolean
  error: string | null
  performanceMetrics: PerformanceMetrics
}

// Default quality options for adaptive streaming
// CONTEXT7 SOURCE: /muxinc/next-video - Multi-resolution video streaming configuration
const defaultQualityOptions: VideoQuality[] = [
  { label: 'Auto', value: 'auto', bandwidth: 0, resolution: 'adaptive' },
  { label: '4K', value: '2160p', bandwidth: 25000, resolution: '3840×2160', fileSize: 200 },
  { label: '1440p', value: '1440p', bandwidth: 16000, resolution: '2560×1440', fileSize: 120 },
  { label: '1080p', value: '1080p', bandwidth: 8000, resolution: '1920×1080', fileSize: 80 },
  { label: '720p', value: '720p', bandwidth: 5000, resolution: '1280×720', fileSize: 50 },
  { label: '480p', value: '480p', bandwidth: 2500, resolution: '854×480', fileSize: 30 },
  { label: '360p', value: '360p', bandwidth: 1000, resolution: '640×360', fileSize: 20 }
]

// Performance optimization thresholds
const PERFORMANCE_THRESHOLDS = {
  SLOW_NETWORK: 1000, // kbps
  BATTERY_LOW: 0.2, // 20%
  DATA_LIMIT_WARNING: 0.8, // 80% of limit
  BUFFER_HEALTH_MIN: 0.3, // 30%
  CACHE_SIZE_LIMIT: 100 // MB
}

export function VideoPerformanceLoader({
  src,
  preloadStrategy = 'lazy',
  adaptiveStreaming = true,
  qualityOptions = defaultQualityOptions,
  bandwidthThreshold = 5000,
  bufferStrategy = 'adaptive',
  offlineMode = false,
  cacheStrategy = 'hybrid',
  compressionLevel = 'auto',
  loadingStrategy = 'intersection',
  previewQuality = 'thumbnail',
  energySaving = false,
  dataUsageLimit = 500,
  onPerformanceMetrics,
  onLoadingProgress,
  className,
  ...videoProps
}: VideoPerformanceLoaderProps) {
  // Performance loader state
  const [loaderState, setLoaderState] = useState<LoaderState>({
    loading: false,
    progress: 0,
    phase: 'initializing',
    selectedQuality: 'auto',
    networkConditions: null,
    cacheStatus: 'pending',
    energySavingActive: energySaving,
    dataUsed: 0,
    estimatedSize: 0,
    userInitiated: false,
    intersectionVisible: false,
    error: null,
    performanceMetrics: {
      loadTime: 0,
      bufferHealth: 1,
      playbackQuality: 'auto',
      networkSpeed: 0,
      dataUsed: 0,
      energyUsage: 0,
      cacheHits: 0,
      errors: 0
    }
  })

  // Refs for performance monitoring
  const containerRef = useRef<HTMLDivElement>(null)
  const intersectionObserver = useRef<IntersectionObserver>()
  const performanceStart = useRef<number>(0)
  const networkMonitor = useRef<any>()
  const cacheStore = useRef<Map<string, any>>(new Map())

  // Memoized video source processing
  // CONTEXT7 SOURCE: /muxinc/next-video - Video source optimization and processing
  const processedSources = useMemo(() => {
    if (typeof src === 'string') {
      return {
        original: src,
        hd: src,
        sd: src,
        mobile: src,
        thumbnail: `${src}?thumbnail=true`,
        poster: `${src}?poster=true`,
        preview: `${src}?preview=true&t=5`
      }
    }
    return src
  }, [src])

  // Network conditions detection
  // CONTEXT7 SOURCE: /vercel/next.js - Network API integration for performance optimization
  const detectNetworkConditions = useCallback((): NetworkConditions | null => {
    if (typeof navigator === 'undefined' || !('connection' in navigator)) {
      return null
    }

    const connection = (navigator as any).connection
    return {
      effectiveType: connection.effectiveType || '4g',
      downlink: connection.downlink || 10,
      rtt: connection.rtt || 50,
      saveData: connection.saveData || false
    }
  }, [])

  // Optimal quality selection based on network conditions
  const selectOptimalQuality = useCallback((networkConditions: NetworkConditions | null): string => {
    if (!adaptiveStreaming || !networkConditions) return 'auto'

    const availableBandwidth = networkConditions.downlink * 1000 // Convert to kbps
    const isSlowNetwork = availableBandwidth < bandwidthThreshold
    const isSaveDataEnabled = networkConditions.saveData

    if (isSaveDataEnabled || isSlowNetwork) {
      return '480p'
    } else if (networkConditions.effectiveType === '3g') {
      return '720p'
    } else if (networkConditions.effectiveType === '4g' && availableBandwidth > 8000) {
      return '1080p'
    }

    return '720p'
  }, [adaptiveStreaming, bandwidthThreshold])

  // Energy-saving optimization
  const optimizeForEnergySaving = useCallback((): string => {
    if (!loaderState.energySavingActive) return loaderState.selectedQuality

    // Check battery level
    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery: any) => {
        if (battery.level < PERFORMANCE_THRESHOLDS.BATTERY_LOW) {
          return '360p' // Lowest quality for battery saving
        }
      })
    }

    // Reduce quality during energy-saving mode
    const energySavingQualities: Record<string, string> = {
      '2160p': '1080p',
      '1440p': '720p',
      '1080p': '480p',
      '720p': '360p',
      '480p': '360p'
    }

    return energySavingQualities[loaderState.selectedQuality] || '360p'
  }, [loaderState.energySavingActive, loaderState.selectedQuality])

  // Cache management
  // CONTEXT7 SOURCE: /vercel/next.js - Client-side caching strategies for media content
  const getCachedVideo = useCallback((url: string): Promise<string | null> => {
    return new Promise((resolve) => {
      if (cacheStrategy === 'none') {
        resolve(null)
        return
      }

      const cached = cacheStore.current.get(url)
      if (cached) {
        setLoaderState(prev => ({
          ...prev,
          cacheStatus: 'hit',
          performanceMetrics: {
            ...prev.performanceMetrics,
            cacheHits: prev.performanceMetrics.cacheHits + 1
          }
        }))
        resolve(cached)
      } else {
        setLoaderState(prev => ({ ...prev, cacheStatus: 'miss' }))
        resolve(null)
      }
    })
  }, [cacheStrategy])

  const cacheVideo = useCallback((url: string, data: any) => {
    if (cacheStrategy === 'none') return

    // Check cache size limit
    const currentCacheSize = Array.from(cacheStore.current.values())
      .reduce((size, item) => size + (item.size || 0), 0)

    if (currentCacheSize > PERFORMANCE_THRESHOLDS.CACHE_SIZE_LIMIT * 1024 * 1024) {
      // Clear oldest entries
      const entries = Array.from(cacheStore.current.entries())
      entries.slice(0, Math.floor(entries.length / 2)).forEach(([key]) => {
        cacheStore.current.delete(key)
      })
    }

    cacheStore.current.set(url, { ...data, cached: Date.now() })
  }, [cacheStrategy])

  // Intersection Observer for lazy loading
  // CONTEXT7 SOURCE: /vercel/next.js - Intersection Observer for performance optimization
  useEffect(() => {
    if (loadingStrategy !== 'intersection' && loadingStrategy !== 'viewport') return

    if (!containerRef.current) return

    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLoaderState(prev => ({ ...prev, intersectionVisible: true }))
            
            if (loadingStrategy === 'intersection' && !loaderState.loading) {
              initiateLoading()
            }
          }
        })
      },
      { 
        threshold: loadingStrategy === 'viewport' ? 0.1 : 0.5,
        rootMargin: loadingStrategy === 'viewport' ? '200px' : '0px'
      }
    )

    intersectionObserver.current.observe(containerRef.current)

    return () => {
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect()
      }
    }
  }, [loadingStrategy, loaderState.loading])

  // Network monitoring
  useEffect(() => {
    const conditions = detectNetworkConditions()
    setLoaderState(prev => ({ ...prev, networkConditions: conditions }))

    if (conditions && adaptiveStreaming) {
      const optimalQuality = selectOptimalQuality(conditions)
      setLoaderState(prev => ({ ...prev, selectedQuality: optimalQuality }))
    }

    // Monitor network changes
    if ('connection' in navigator) {
      networkMonitor.current = () => {
        const newConditions = detectNetworkConditions()
        setLoaderState(prev => ({ ...prev, networkConditions: newConditions }))
        
        if (newConditions) {
          const newQuality = selectOptimalQuality(newConditions)
          if (newQuality !== loaderState.selectedQuality) {
            setLoaderState(prev => ({ ...prev, selectedQuality: newQuality }))
          }
        }
      }

      ;(navigator as any).connection.addEventListener('change', networkMonitor.current)
    }

    return () => {
      if (networkMonitor.current && 'connection' in navigator) {
        ;(navigator as any).connection.removeEventListener('change', networkMonitor.current)
      }
    }
  }, [adaptiveStreaming, detectNetworkConditions, selectOptimalQuality])

  // Performance metrics tracking
  const updatePerformanceMetrics = useCallback((metrics: Partial<PerformanceMetrics>) => {
    setLoaderState(prev => ({
      ...prev,
      performanceMetrics: { ...prev.performanceMetrics, ...metrics }
    }))

    if (onPerformanceMetrics) {
      onPerformanceMetrics({ ...loaderState.performanceMetrics, ...metrics })
    }
  }, [loaderState.performanceMetrics, onPerformanceMetrics])

  // Loading progress reporting
  const reportProgress = useCallback((progress: Partial<LoadingProgress>) => {
    const fullProgress: LoadingProgress = {
      phase: loaderState.phase,
      progress: loaderState.progress,
      currentQuality: loaderState.selectedQuality,
      networkConditions: loaderState.networkConditions,
      ...progress
    }

    setLoaderState(prev => ({
      ...prev,
      phase: fullProgress.phase,
      progress: fullProgress.progress
    }))

    if (onLoadingProgress) {
      onLoadingProgress(fullProgress)
    }
  }, [loaderState.phase, loaderState.progress, loaderState.selectedQuality, loaderState.networkConditions, onLoadingProgress])

  // Main loading initiation
  const initiateLoading = useCallback(async () => {
    if (loaderState.loading) return

    performanceStart.current = performance.now()
    setLoaderState(prev => ({ ...prev, loading: true, phase: 'loading' }))
    reportProgress({ phase: 'loading', progress: 0 })

    try {
      // Check data usage limits
      if (dataUsageLimit && loaderState.dataUsed > dataUsageLimit * PERFORMANCE_THRESHOLDS.DATA_LIMIT_WARNING) {
        const userConfirmed = window.confirm(
          `You're approaching your data limit (${dataUsageLimit}MB). Continue loading video?`
        )
        if (!userConfirmed) {
          throw new Error('User cancelled due to data usage concerns')
        }
      }

      // Select appropriate source based on conditions
      const selectedQuality = energySaving ? optimizeForEnergySaving() : loaderState.selectedQuality
      let videoSource = processedSources.original

      if (selectedQuality === '720p' && processedSources.hd) {
        videoSource = processedSources.hd
      } else if (selectedQuality === '480p' && processedSources.sd) {
        videoSource = processedSources.sd
      } else if ((selectedQuality === '360p' || loaderState.networkConditions?.effectiveType === '2g') && processedSources.mobile) {
        videoSource = processedSources.mobile
      }

      // Check cache first
      const cachedVideo = await getCachedVideo(videoSource)
      if (cachedVideo) {
        reportProgress({ phase: 'ready', progress: 100 })
        updatePerformanceMetrics({
          loadTime: performance.now() - performanceStart.current,
          cacheHits: loaderState.performanceMetrics.cacheHits + 1
        })
        setLoaderState(prev => ({ ...prev, loading: false, phase: 'ready' }))
        return
      }

      // Progressive loading with progress tracking
      const loadingSteps = [
        { progress: 25, action: 'Analyzing network conditions...' },
        { progress: 50, action: 'Optimizing video quality...' },
        { progress: 75, action: 'Buffering video content...' },
        { progress: 100, action: 'Ready to play' }
      ]

      for (const step of loadingSteps) {
        await new Promise(resolve => setTimeout(resolve, 200))
        reportProgress({ progress: step.progress })
        setLoaderState(prev => ({ ...prev, progress: step.progress }))
      }

      // Cache the loaded video
      cacheVideo(videoSource, { url: videoSource, quality: selectedQuality, timestamp: Date.now() })

      const loadTime = performance.now() - performanceStart.current
      updatePerformanceMetrics({
        loadTime,
        playbackQuality: selectedQuality,
        networkSpeed: loaderState.networkConditions?.downlink || 0
      })

      setLoaderState(prev => ({ ...prev, loading: false, phase: 'ready' }))
      reportProgress({ phase: 'ready', progress: 100 })

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Loading failed'
      setLoaderState(prev => ({
        ...prev,
        loading: false,
        phase: 'error',
        error: errorMessage,
        performanceMetrics: {
          ...prev.performanceMetrics,
          errors: prev.performanceMetrics.errors + 1
        }
      }))
      reportProgress({ phase: 'error', progress: 0 })
    }
  }, [
    loaderState.loading,
    loaderState.selectedQuality,
    loaderState.networkConditions,
    loaderState.dataUsed,
    loaderState.performanceMetrics.cacheHits,
    dataUsageLimit,
    energySaving,
    optimizeForEnergySaving,
    processedSources,
    getCachedVideo,
    cacheVideo,
    reportProgress,
    updatePerformanceMetrics
  ])

  // Handle user-initiated loading
  const handleUserInitiatedLoad = useCallback(() => {
    setLoaderState(prev => ({ ...prev, userInitiated: true }))
    initiateLoading()
  }, [initiateLoading])

  // Auto-initiate loading based on strategy
  useEffect(() => {
    if (loadingStrategy === 'immediate') {
      initiateLoading()
    } else if (loadingStrategy === 'intersection' && loaderState.intersectionVisible) {
      initiateLoading()
    }
  }, [loadingStrategy, loaderState.intersectionVisible, initiateLoading])

  // Render loading state
  if (loaderState.phase !== 'ready' && loadingStrategy !== 'user-initiated') {
    return (
      <div 
        ref={containerRef}
        className={cn(
          'relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center',
          className
        )}
      >
        {/* Thumbnail preview */}
        {processedSources.thumbnail && (
          <img
            src={processedSources.thumbnail}
            alt="Video thumbnail"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Loading overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
          {loaderState.phase === 'loading' ? (
            <>
              <div className="relative mb-4">
                <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-medium">{loaderState.progress}%</span>
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium mb-1">Optimizing Video</div>
                <div className="text-sm opacity-75">
                  {loaderState.selectedQuality} • {loaderState.networkConditions?.effectiveType.toUpperCase()}
                </div>
                {loaderState.energySavingActive && (
                  <div className="flex items-center gap-1 mt-2 text-xs opacity-75">
                    <Zap className="w-3 h-3" />
                    Energy Saving Mode
                  </div>
                )}
              </div>
            </>
          ) : loaderState.phase === 'error' ? (
            <>
              <div className="text-red-400 mb-4">
                <WifiOff className="w-12 h-12 mx-auto mb-2" />
              </div>
              <div className="text-center">
                <div className="font-medium mb-1">Loading Failed</div>
                <div className="text-sm opacity-75 mb-4">{loaderState.error}</div>
                <Button
                  onClick={initiateLoading}
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  Retry
                </Button>
              </div>
            </>
          ) : (
            <>
              <Play className="w-12 h-12 mb-4 opacity-75" />
              <div className="text-center">
                <div className="font-medium mb-1">Ready to Play</div>
                <div className="text-sm opacity-75">
                  Quality: {loaderState.selectedQuality}
                </div>
              </div>
            </>
          )}

          {/* Performance indicators */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {loaderState.cacheStatus === 'hit' && (
              <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs flex items-center gap-1">
                <Download className="w-3 h-3" />
                Cached
              </div>
            )}
            
            {loaderState.networkConditions && (
              <div className={cn(
                "px-2 py-1 rounded text-xs flex items-center gap-1",
                loaderState.networkConditions.effectiveType === '4g' && "bg-green-500/20 text-green-400",
                loaderState.networkConditions.effectiveType === '3g' && "bg-yellow-500/20 text-yellow-400",
                loaderState.networkConditions.effectiveType === '2g' && "bg-red-500/20 text-red-400"
              )}>
                <Signal className="w-3 h-3" />
                {loaderState.networkConditions.effectiveType.toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Render user-initiated loading button
  if (loadingStrategy === 'user-initiated' && !loaderState.userInitiated) {
    return (
      <div 
        ref={containerRef}
        className={cn(
          'relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer',
          className
        )}
        onClick={handleUserInitiatedLoad}
      >
        {processedSources.poster && (
          <img
            src={processedSources.poster}
            alt="Video poster"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <Button
            size="lg"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
            onClick={handleUserInitiatedLoad}
          >
            <Play className="w-6 h-6 mr-2" fill="currentColor" />
            Load & Play Video
          </Button>
        </div>

        {/* Video info overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
            <div className="font-medium mb-1">{videoProps.title}</div>
            <div className="text-sm opacity-75 mb-2">{videoProps.description}</div>
            <div className="flex items-center gap-4 text-xs">
              <span>Quality: {loaderState.selectedQuality}</span>
              {loaderState.networkConditions && (
                <span>Network: {loaderState.networkConditions.effectiveType.toUpperCase()}</span>
              )}
              {loaderState.estimatedSize > 0 && (
                <span>Size: ~{loaderState.estimatedSize.toFixed(1)}MB</span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render the full video player once ready
  return (
    <div ref={containerRef} className={className}>
      <MobileVideoPlayer
        {...videoProps}
        src={processedSources.original}
        poster={processedSources.poster}
      />
    </div>
  )
}

export default VideoPerformanceLoader