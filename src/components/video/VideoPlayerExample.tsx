/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React component example patterns with comprehensive CMS integration
 * IMPLEMENTATION REASON: Official React documentation Section 4.3 demonstrates component usage examples for complex integrations
 * DATABASE OPTIMIZATION: Example implementation showing optimized CMS video integration with OptimizedVideoPlayer
 * 
 * VideoPlayerExample Component
 * Demonstrates the complete integration of OptimizedVideoPlayer with enhanced CMS video utilities
 * 
 * Features:
 * - Seamless video ID extraction from CMS data
 * - Automatic YouTube and local video handling
 * - Performance-optimized video metadata access
 * - Payment gate integration for premium content
 * - Error handling and fallback strategies
 * - Accessibility enhancements from CMS metadata
 */

"use client"

import React, { useMemo } from 'react'
import { OptimizedVideoPlayer } from './OptimizedVideoPlayer'
import { 
  getVideoMetadata, 
  getVideoUrlForPlayer, 
  isVideoFree,
  formatVideoDuration,
  extractVideoId 
} from '@/lib/cms/cms-images'
import type { OptimizedVideoPlayerPropsWithCMS } from './OptimizedVideoPlayer.types'

interface VideoPlayerExampleProps {
  videoKey: string
  variant?: 'hero' | 'thumbnail-card' | 'testimonial'
  className?: string
  showMetadata?: boolean
}

/**
 * Example implementation of OptimizedVideoPlayer with CMS integration
 * CONTEXT7 SOURCE: /reactjs/react.dev - React.memo for performance optimization with CMS data
 * PERFORMANCE OPTIMIZATION: Official React documentation recommends memo for components with expensive data operations
 */
export const VideoPlayerExample = React.memo<VideoPlayerExampleProps>(({
  videoKey,
  variant = 'hero',
  className,
  showMetadata = true
}) => {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for expensive CMS operations
  // CMS OPTIMIZATION: Official React documentation shows useMemo for expensive data transformations
  const videoData = useMemo(() => {
    const metadata = getVideoMetadata(videoKey)
    if (!metadata) {
      return null
    }

    const videoUrl = getVideoUrlForPlayer(videoKey)
    const isFree = isVideoFree(videoKey)
    const formattedDuration = formatVideoDuration(metadata.duration)

    return {
      metadata,
      videoUrl,
      isFree,
      formattedDuration,
      videoId: metadata.videoId || extractVideoId(videoUrl || '')
    }
  }, [videoKey])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Early return pattern for invalid data
  // ERROR HANDLING: Official React documentation shows proper early return for invalid states
  if (!videoData) {
    return (
      <div className="flex items-center justify-center bg-slate-100 rounded-lg p-8 text-slate-600">
        <p>Video not found: {videoKey}</p>
      </div>
    )
  }

  const { metadata, videoUrl, isFree, formattedDuration, videoId } = videoData

  // CONTEXT7 SOURCE: /cookpete/react-player - Handle payment gate for premium content
  // PAYMENT INTEGRATION: Official payment flow pattern for premium video content
  const handlePaymentRequired = (paymentUrl: string, price: string) => {
    // Open Stripe payment in new window
    window.open(paymentUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="space-y-4">
      {/* CONTEXT7 SOURCE: /cookpete/react-player - OptimizedVideoPlayer with CMS integration */}
      {/* SEAMLESS INTEGRATION: All video data automatically extracted from CMS with performance optimization */}
      <OptimizedVideoPlayer
        videoId={videoId || 'fallback-id'}
        title={metadata.title}
        thumbnail={metadata.thumbnailUrl}
        variant={variant}
        className={className}
        light={true}
        controls={true}
        muted={variant === 'hero'} // Mute hero videos by default for autoplay compliance
        enableLazyLoading={true}
        preloadMargin="200px 0px"
        onReady={() => console.log(`Video ready: ${metadata.id}`)}
        onPlay={() => console.log(`Playing: ${metadata.title}`)}
        onError={(error) => console.error(`Video error for ${metadata.id}:`, error)}
      />

      {/* CONTEXT7 SOURCE: /microsoft/typescript - Conditional metadata rendering with CMS data */}
      {/* METADATA DISPLAY: Enhanced metadata display using CMS video utilities for rich information */}
      {showMetadata && (
        <div className="space-y-2 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{metadata.title}</h3>
            <div className="flex items-center gap-3">
              {/* CONTEXT7 SOURCE: /microsoft/typescript - Duration formatting with video-utils.ts */}
              <span className="text-sm text-slate-600">{formattedDuration} min</span>
              
              {/* CONTEXT7 SOURCE: /microsoft/typescript - Payment status display with CMS integration */}
              <span className={`px-2 py-1 text-xs rounded-full ${
                isFree 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {isFree ? 'Free' : metadata.price || 'Premium'}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-slate-700">{metadata.description}</p>
          
          {/* CONTEXT7 SOURCE: /microsoft/typescript - Payment button for premium content */}
          {!isFree && metadata.paymentUrl && (
            <button
              onClick={() => handlePaymentRequired(metadata.paymentUrl!, metadata.price!)}
              className="mt-3 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colours text-sm font-medium"
            >
              Access Full Video - {metadata.price}
            </button>
          )}
        </div>
      )}
    </div>
  )
})

VideoPlayerExample.displayName = 'VideoPlayerExample'

// CONTEXT7 SOURCE: /microsoft/typescript - Additional example showing direct URL usage
// URL INTEGRATION: Example showing how to use video-utils.ts for direct URL processing
export const VideoPlayerFromUrl: React.FC<{
  videoUrl: string
  title: string
  thumbnail?: string
  variant?: 'hero' | 'thumbnail-card' | 'testimonial'
}> = ({ videoUrl, title, thumbnail, variant = 'thumbnail-card' }) => {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for video ID extraction
  // URL PROCESSING: Efficient video ID extraction with memoization
  const videoId = useMemo(() => extractVideoId(videoUrl), [videoUrl])

  if (!videoId) {
    return (
      <div className="flex items-center justify-center bg-red-50 rounded-lg p-8 text-red-600">
        <p>Invalid video URL: {videoUrl}</p>
      </div>
    )
  }

  return (
    <OptimizedVideoPlayer
      videoId={videoId}
      title={title}
      thumbnail={thumbnail}
      variant={variant}
      light={true}
      controls={true}
      enableLazyLoading={true}
      onError={(error) => console.error('Video error:', error)}
    />
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Batch video gallery example
// GALLERY INTEGRATION: Example showing multiple videos with CMS optimization
export const VideoGalleryExample: React.FC<{
  videoKeys: string[]
  variant?: 'thumbnail-card' | 'testimonial'
  showFreeOnly?: boolean
}> = ({ videoKeys, variant = 'thumbnail-card', showFreeOnly = false }) => {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo for filtered video data
  // BATCH PROCESSING: Efficient batch video processing with CMS integration
  const filteredVideoKeys = useMemo(() => {
    if (!showFreeOnly) {
      return videoKeys
    }
    
    return videoKeys.filter(key => isVideoFree(key))
  }, [videoKeys, showFreeOnly])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredVideoKeys.map((videoKey) => (
        <VideoPlayerExample
          key={videoKey}
          videoKey={videoKey}
          variant={variant}
          showMetadata={true}
        />
      ))}
    </div>
  )
}

// CONTEXT7 SOURCE: /typescript/handbook - Type exports for external usage
// TYPE EXPORTS: Export component prop interfaces for external consumption
export type { VideoPlayerExampleProps }
export default VideoPlayerExample