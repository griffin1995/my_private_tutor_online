/**
 * CONTEXT7 SOURCE: /typescript/handbook - Advanced type definitions for video player components
 * TYPE DEFINITIONS: Official TypeScript documentation recommends comprehensive interface definitions for complex components
 * 
 * CONTEXT7 SOURCE: /cookpete/react-player - ReactPlayer configuration types and options
 * PLAYER CONFIG: Official ReactPlayer documentation shows proper typing for configuration objects
 * 
 * OptimizedVideoPlayer TypeScript Definitions
 * Comprehensive type definitions for the OptimizedVideoPlayer component system
 * 
 * Features:
 * - Complete prop interfaces with proper typing
 * - YouTube configuration types from ReactPlayer
 * - Accessibility-focused callback definitions
 * - Performance optimization option types
 * - Variant-specific styling configurations
 * - Error handling and state management types
 */

import React from 'react'

// CONTEXT7 SOURCE: /cookpete/react-player - Official ReactPlayer configuration interface
// CONFIG TYPES: Official ReactPlayer documentation shows comprehensive config object typing
export interface ReactPlayerConfig {
  youtube?: {
    playerVars?: {
      showinfo?: 0 | 1
      playsinline?: 0 | 1
      modestbranding?: 0 | 1
      rel?: 0 | 1
      controls?: 0 | 1
      autoplay?: 0 | 1
      mute?: 0 | 1
      start?: number
      end?: number
      loop?: 0 | 1
      fs?: 0 | 1
      cc_load_policy?: 0 | 1
      iv_load_policy?: 1 | 3
      disablekb?: 0 | 1
      enablejsapi?: 0 | 1
      origin?: string
      widget_referrer?: string
    }
    embedOptions?: {
      host?: string
      onUnstarted?: (event: YouTubePlayerEvent) => void
      onError?: (event: YouTubeErrorEvent) => void
    }
  }
  vimeo?: {
    playerOptions?: {
      autopause?: boolean
      autoplay?: boolean
      background?: boolean
      byline?: boolean
      color?: string
      controls?: boolean
      dnt?: boolean
      height?: number
      keyboard?: boolean
      loop?: boolean
      maxheight?: number
      maxwidth?: number
      muted?: boolean
      pip?: boolean
      playsinline?: boolean
      portrait?: boolean
      responsive?: boolean
      speed?: boolean
      texttrack?: string
      title?: boolean
      transparent?: boolean
      width?: number
    }
  }
  file?: {
    attributes?: React.VideoHTMLAttributes<HTMLVideoElement>
    tracks?: Array<{
      kind: string
      src: string
      srcLang: string
      default?: boolean
      label?: string
    }>
    forceVideo?: boolean
    forceAudio?: boolean
    forceHLS?: boolean
    forceDASH?: boolean
    forceFLV?: boolean
    hlsOptions?: HLSPlayerOptions
    dashOptions?: DASHPlayerOptions
    flvOptions?: FLVPlayerOptions
  }
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Event handler type definitions for React components
// EVENT HANDLERS: Official React documentation shows proper callback function typing
export interface VideoPlayerCallbacks {
  onReady?: (player: ReactPlayerInstance) => void
  onStart?: () => void
  onPlay?: () => void
  onPause?: () => void
  onBuffer?: () => void
  onBufferEnd?: () => void
  onEnded?: () => void
  onError?: (error: VideoPlayerError) => void
  onProgress?: (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => void
  onDuration?: (duration: number) => void
  onSeek?: (seconds: number) => void
  onPlaybackRateChange?: (playbackRate: number) => void
  onPlaybackQualityChange?: (quality: string) => void
}

// CONTEXT7 SOURCE: /thebuilder/react-intersection-observer - Lazy loading configuration types
// LAZY LOADING: Official react-intersection-observer documentation shows proper option typing
export interface LazyLoadingOptions {
  enableLazyLoading?: boolean
  preloadMargin?: string
  threshold?: number | number[]
  fallbackInView?: boolean
  triggerOnce?: boolean
  skip?: boolean
  trackVisibility?: boolean
  delay?: number
}

// CONTEXT7 SOURCE: /w3c/wcag - Accessibility configuration for video players
// ACCESSIBILITY: Official WCAG documentation recommends comprehensive accessibility options
export interface AccessibilityOptions {
  ariaLabel?: string
  ariaDescription?: string
  keyboardControls?: boolean
  focusManagement?: boolean
  screenReaderSupport?: boolean
  captionsEnabled?: boolean
  transcriptAvailable?: boolean
  audioDescription?: boolean
}

// CONTEXT7 SOURCE: /typescript/handbook - Union types for component variants
// VARIANT TYPES: Official TypeScript documentation shows proper union type definitions
export type VideoPlayerVariant = 'hero' | 'thumbnail-card' | 'testimonial'
export type VideoPlayerSize = 'small' | 'medium' | 'large' | 'full'
export type VideoPlayerAspectRatio = '16:9' | '4:3' | '1:1' | '9:16' | 'custom'
export type VideoPlayerQuality = 'auto' | 'small' | 'medium' | 'large' | 'hd720' | 'hd1080' | 'highres'

// CONTEXT7 SOURCE: /typescript/handbook - Comprehensive interface for main component props
// MAIN INTERFACE: Official TypeScript documentation recommends detailed prop interface definitions
export interface OptimizedVideoPlayerProps extends VideoPlayerCallbacks, LazyLoadingOptions, AccessibilityOptions {
  // Core video properties
  videoId: string
  title: string
  thumbnail?: string
  
  // Component configuration
  variant?: VideoPlayerVariant
  className?: string
  
  // ReactPlayer configuration
  light?: boolean | React.ReactElement
  config?: ReactPlayerConfig
  
  // Playback controls
  autoPlay?: boolean
  muted?: boolean
  controls?: boolean
  loop?: boolean
  playsinline?: boolean
  
  // Dimensions and styling  
  width?: string | number
  height?: string | number
  aspectRatio?: VideoPlayerAspectRatio | string
  size?: VideoPlayerSize
  
  // Performance options
  preload?: 'none' | 'metadata' | 'auto'
  quality?: VideoPlayerQuality
  
  // Modal and interaction
  modalEnabled?: boolean
  clickToPlay?: boolean
  doubleClickToFullscreen?: boolean
  
  // Advanced options
  pip?: boolean // Picture-in-picture
  playbackRates?: number[]
  volume?: number
  seek?: number
  
  // Custom styling
  thumbnailClassName?: string
  playerClassName?: string
  controlsClassName?: string
}

// CONTEXT7 SOURCE: /typescript/handbook - State interface for internal component state
// STATE MANAGEMENT: Official TypeScript documentation shows proper state type definitions
export interface VideoPlayerState {
  isPlaying: boolean
  isReady: boolean
  hasError: boolean
  isLoading: boolean
  isModalOpen: boolean
  isMuted: boolean
  volume: number
  played: number
  loaded: number
  duration: number
  playbackRate: number
  pip: boolean
  seeking: boolean
  fullscreen: boolean
}

// CONTEXT7 SOURCE: /typescript/handbook - Error handling type definitions
// ERROR HANDLING: Official TypeScript documentation recommends comprehensive error type definitions
export interface VideoPlayerError {
  type: 'network' | 'decode' | 'src_not_supported' | 'permission' | 'unknown'
  message: string
  code?: number
  details?: Record<string, unknown>
  timestamp: number
  videoId: string
  recoverable: boolean
}

// CONTEXT7 SOURCE: /typescript/handbook - Event type definitions for video player
// EVENT TYPES: Official TypeScript documentation shows proper event type definitions  
export interface VideoPlayerEvents {
  onVideoReady?: (state: VideoPlayerState) => void
  onVideoStart?: (state: VideoPlayerState) => void
  onVideoPlay?: (state: VideoPlayerState) => void
  onVideoPause?: (state: VideoPlayerState) => void
  onVideoEnd?: (state: VideoPlayerState) => void
  onVideoError?: (error: VideoPlayerError) => void
  onVideoProgress?: (state: VideoPlayerState) => void
  onVideoSeek?: (state: VideoPlayerState) => void
  onVideoBuffer?: (state: VideoPlayerState) => void
  onVideoBufferEnd?: (state: VideoPlayerState) => void
  onVolumeChange?: (volume: number, muted: boolean) => void
  onPlaybackRateChange?: (rate: number) => void
  onFullscreenChange?: (isFullscreen: boolean) => void
  onPictureInPictureChange?: (isPip: boolean) => void
}

// CONTEXT7 SOURCE: /typescript/handbook - Component reference interface for imperative API
// REF INTERFACE: Official TypeScript documentation shows proper ref interface definitions
export interface VideoPlayerRef {
  // Playback control methods
  play: () => void
  pause: () => void
  stop: () => void
  seekTo: (seconds: number, type?: 'seconds' | 'fraction') => void
  
  // Volume control methods
  setVolume: (volume: number) => void
  mute: () => void
  unmute: () => void
  
  // Playback rate methods
  setPlaybackRate: (rate: number) => void
  
  // State getter methods
  getCurrentTime: () => number
  getSecondsLoaded: () => number
  getDuration: () => number
  getInternalPlayer: () => ReactPlayerInstance | null
  
  // Fullscreen and PiP methods
  requestFullscreen: () => void
  exitFullscreen: () => void
  requestPictureInPicture: () => void
  exitPictureInPicture: () => void
  
  // State information
  isPlaying: () => boolean
  isMuted: () => boolean
  getVolume: () => number
  getPlaybackRate: () => number
}

// CONTEXT7 SOURCE: /microsoft/typescript - Enhanced CMS video integration type definitions
// DATABASE OPTIMIZATION: Extended type definitions for video-utils.ts and CMS integration compatibility
// CMS VIDEO INTEGRATION: Type definitions for seamless video database optimization with OptimizedVideoPlayer

// CONTEXT7 SOURCE: /microsoft/typescript - Video metadata interface for CMS integration
// CMS METADATA: Official TypeScript documentation recommends structured interfaces for data objects
export interface VideoMetadata {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly videoId: string | null
  readonly thumbnailUrl: string
  readonly duration: number
  readonly isFree: boolean
  readonly price?: string
  readonly paymentUrl?: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - Video search result interface for database queries
// SEARCH RESULTS: Enhanced interface for video database search and filtering operations
export interface VideoSearchResult extends VideoMetadata {
  readonly key: string
  readonly category: 'free' | 'paid'
  readonly featured: boolean
  readonly masterclassAuthor: string
  readonly masterclassRole: string
}

// CONTEXT7 SOURCE: /microsoft/typescript - CMS video utility function types
// UTILITY TYPES: Function signature definitions for video-utils.ts integration
export interface VideoUtilityFunctions {
  extractVideoId: (url: string) => string | null
  getVideoMetadata: (videoKey: string) => VideoMetadata | null
  isVideoFree: (videoKey: string) => boolean
  getVideoUrlForPlayer: (videoKey: string) => string | null
  getFreeVideos: () => VideoMetadata[]
  getPaidVideos: () => VideoMetadata[]
  isValidVideoUrl: (url: string) => boolean
  formatVideoDuration: (seconds: number) => string
  getAllVideoIds: () => readonly string[]
  getVideoById: (videoId: string) => VideoSearchResult | null
}

// CONTEXT7 SOURCE: /microsoft/typescript - Enhanced OptimizedVideoPlayer props with CMS integration
// CMS INTEGRATION: Extended props interface for seamless CMS video database integration
export interface OptimizedVideoPlayerPropsWithCMS extends Omit<OptimizedVideoPlayerProps, 'videoId'> {
  // CMS video integration options
  videoKey?: string // Key from MASTERCLASS_VIDEOS CMS data
  videoId?: string // Direct video ID or extracted from URL
  videoUrl?: string // Full video URL for automatic ID extraction
  
  // Metadata override options (if not using CMS)
  metadata?: Partial<VideoMetadata>
  
  // Payment integration for paid videos
  enablePaymentGate?: boolean
  onPaymentRequired?: (paymentUrl: string, price: string) => void
  
  // CMS-specific styling
  showDuration?: boolean
  showPrice?: boolean
  showAuthor?: boolean
  
  // Enhanced accessibility with CMS data
  useMetadataForAccessibility?: boolean
}

// CONTEXT7 SOURCE: /microsoft/typescript - Video validation result interface
// VALIDATION: Comprehensive validation result type for video URL and metadata verification
export interface VideoValidationResult {
  isValid: boolean
  videoId: string | null
  videoType: 'youtube' | 'local' | 'external' | 'invalid'
  errors: string[]
  warnings: string[]
  metadata?: VideoMetadata
}

// CONTEXT7 SOURCE: /microsoft/typescript - Video player analytics interface for performance tracking
// ANALYTICS: Enhanced analytics interface for video performance monitoring and database optimization insights
export interface VideoPlayerAnalytics {
  videoId: string
  sessionId: string
  startTime: number
  endTime?: number
  duration: number
  watchTime: number
  completionRate: number
  interactions: {
    play: number
    pause: number
    seek: number
    volumeChange: number
    fullscreen: number
    pictureInPicture: number
  }
  errors: VideoPlayerError[]
  performance: {
    loadTime: number
    firstPlay: number
    bufferEvents: number
    averageBitrate?: number
  }
  metadata: VideoMetadata
}

// CONTEXT7 SOURCE: /microsoft/typescript - YouTube Player API event interfaces
// YOUTUBE EVENTS: Official YouTube Player API documentation provides structured event definitions
export interface YouTubePlayerEvent {
  readonly target: YouTubePlayer
  readonly data: number
}

export interface YouTubeErrorEvent {
  readonly target: YouTubePlayer
  readonly data: YouTubeErrorCode
}

export interface YouTubePlayer {
  playVideo(): void
  pauseVideo(): void
  stopVideo(): void
  seekTo(seconds: number, allowSeekAhead?: boolean): void
  getCurrentTime(): number
  getDuration(): number
  getVideoUrl(): string
  getPlayerState(): YouTubePlayerState
  getPlaybackRate(): number
  setPlaybackRate(suggestedRate: number): void
  mute(): void
  unMute(): void
  isMuted(): boolean
  setVolume(volume: number): void
  getVolume(): number
}

// CONTEXT7 SOURCE: /microsoft/typescript - YouTube Player state constants
// PLAYER STATES: Official YouTube Player API state enumeration
export enum YouTubePlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5
}

// CONTEXT7 SOURCE: /microsoft/typescript - YouTube Player error codes
// ERROR CODES: Official YouTube Player API error code enumeration
export enum YouTubeErrorCode {
  INVALID_PARAMETER = 2,
  HTML5_ERROR = 5,
  VIDEO_NOT_FOUND = 100,
  EMBEDDING_NOT_ALLOWED = 101,
  EMBEDDING_NOT_ALLOWED_IN_DISGUISE = 150
}

// CONTEXT7 SOURCE: /microsoft/typescript - ReactPlayer instance interface
// REACT PLAYER: ReactPlayer component instance interface definition
export interface ReactPlayerInstance {
  seekTo(amount: number, type?: 'seconds' | 'fraction'): void
  getCurrentTime(): number
  getSecondsLoaded(): number
  getDuration(): number
  getInternalPlayer(key?: string): unknown
  showPreview(): void
}

// CONTEXT7 SOURCE: /microsoft/typescript - HLS player configuration options
// HLS OPTIONS: HTTP Live Streaming player configuration interface
export interface HLSPlayerOptions {
  readonly enableWorker?: boolean
  readonly lowLatencyMode?: boolean
  readonly backBufferLength?: number
  readonly maxBufferLength?: number
  readonly maxMaxBufferLength?: number
  readonly maxBufferSize?: number
  readonly maxBufferHole?: number
  readonly highBufferWatchdogPeriod?: number
  readonly nudgeOffset?: number
  readonly nudgeMaxRetry?: number
  readonly maxFragLookUpTolerance?: number
  readonly liveSyncDurationCount?: number
  readonly liveMaxLatencyDurationCount?: number
  readonly liveDurationInfinity?: boolean
  readonly enableSoftwareAES?: boolean
  readonly manifestLoadingTimeOut?: number
  readonly manifestLoadingMaxRetry?: number
  readonly manifestLoadingRetryDelay?: number
  readonly levelLoadingTimeOut?: number
  readonly levelLoadingMaxRetry?: number
  readonly levelLoadingRetryDelay?: number
  readonly fragLoadingTimeOut?: number
  readonly fragLoadingMaxRetry?: number
  readonly fragLoadingRetryDelay?: number
  readonly startFragPrefetch?: boolean
  readonly testBandwidth?: boolean
  readonly progressive?: boolean
  readonly lowLatencyMode?: boolean
}

// CONTEXT7 SOURCE: /microsoft/typescript - DASH player configuration options
// DASH OPTIONS: Dynamic Adaptive Streaming over HTTP player configuration interface
export interface DASHPlayerOptions {
  readonly debug?: {
    readonly logLevel?: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL'
  }
  readonly streaming?: {
    readonly retryAttempts?: {
      readonly MPD?: number
      readonly XLinkExpansion?: number
      readonly InitialRepresentation?: number
      readonly MediaSegment?: number
      readonly BitstreamSwitching?: number
      readonly FragmentedText?: number
      readonly lowLatencyReductionFactor?: number
    }
    readonly retryIntervals?: {
      readonly MPD?: number
      readonly XLinkExpansion?: number
      readonly InitialRepresentation?: number
      readonly MediaSegment?: number
      readonly BitstreamSwitching?: number
      readonly FragmentedText?: number
      readonly lowLatencyReductionFactor?: number
    }
    readonly abandonLoadTimeout?: number
    readonly wallclockTimeUpdateInterval?: number
    readonly manifestUpdateRetryInterval?: number
    readonly cacheInitSegments?: boolean
    readonly bufferToKeep?: number
    readonly bufferPruningInterval?: number
    readonly stableBufferTime?: number
    readonly bufferTimeAtTopQuality?: number
    readonly bufferTimeAtTopQualityLongForm?: number
    readonly longFormContentDurationThreshold?: number
    readonly fastSwitchEnabled?: boolean
    readonly movingAverageMethod?: 'slidingWindow' | 'exponential'
    readonly jumpGaps?: boolean
    readonly smallGapLimit?: number
    readonly liveDelay?: number
    readonly useSuggestedPresentationDelay?: boolean
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - FLV player configuration options
// FLV OPTIONS: Flash Live Video player configuration interface
export interface FLVPlayerOptions {
  readonly type?: 'flv' | 'mp4' | 'm4v' | 'm4a' | 'aac'
  readonly isLive?: boolean
  readonly cors?: boolean
  readonly withCredentials?: boolean
  readonly hasAudio?: boolean
  readonly hasVideo?: boolean
  readonly duration?: number
  readonly filesize?: number
  readonly enableWorker?: boolean
  readonly enableStashBuffer?: boolean
  readonly stashInitialSize?: number
  readonly lazyLoad?: boolean
  readonly lazyLoadMaxDuration?: number
  readonly lazyLoadRecoverDuration?: number
  readonly deferLoadAfterSourceOpen?: boolean
  readonly seekType?: 'range' | 'param' | 'custom'
  readonly seekParamStart?: string
  readonly seekParamEnd?: string
  readonly rangeLoadZeroStart?: boolean
  readonly customSeekHandler?: (currentTime: number) => string | undefined
  readonly reuseRedirectedURL?: boolean
  readonly referrerPolicy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'
}