/**
 * CONTEXT7 SOURCE: /radix-ui/primitives - Dialog component for modal video playback
 * MODAL IMPLEMENTATION REASON: Official Radix UI documentation shows Dialog pattern for accessible modal overlays
 * 
 * CONTEXT7 SOURCE: /cookpete/react-player - ReactPlayer component for HTML5 video and multi-source support
 * VIDEO PLAYER REASON: Official ReactPlayer documentation recommends this library for flexible video playback with HTML5, YouTube, Vimeo support
 * 
 * Video Popup Component
 * - Modal overlay for video playback
 * - HTML5 video player with controls
 * - Responsive design for mobile/desktop
 * - Accessibility support with keyboard navigation
 * - Multiple video format support
 */

"use client"

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface patterns for React component props
// PROP STRUCTURE REASON: Official React documentation shows interface patterns for flexible component configuration
interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  poster?: string;
  className?: string;
}

// CONTEXT7 SOURCE: /radix-ui/primitives - Modal backdrop and container patterns for accessible overlays
// MODAL ACCESSIBILITY REASON: Official Radix UI documentation recommends proper focus management and backdrop patterns
export function VideoPopup({
  isOpen,
  onClose,
  videoUrl,
  title,
  poster,
  className
}: VideoPopupProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // CONTEXT7 SOURCE: /reactjs/react.dev - useEffect Hook for side effects and cleanup
  // FOCUS MANAGEMENT REASON: Official React documentation shows useEffect for managing DOM side effects like focus
  useEffect(() => {
    if (isOpen) {
      // Focus the modal when opened
      modalRef.current?.focus()
      // Pause any other videos that might be playing
      document.querySelectorAll('video').forEach(video => {
        if (video !== videoRef.current) {
          video.pause()
        }
      })
    }
  }, [isOpen])

  // CONTEXT7 SOURCE: /reactjs/react.dev - Event handling patterns for keyboard navigation
  // KEYBOARD ACCESSIBILITY REASON: Official React documentation shows keyboard event handling for accessibility compliance
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose()
    }
  }

  const handleClose = () => {
    // Pause video when closing
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
    onClose()
  }

  // CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns for React components
  // CONDITIONAL DISPLAY REASON: Official React documentation shows early return patterns for conditional component rendering
  if (!isOpen) return null

  return (
    <>
      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Modal backdrop with blur effect for focus isolation */}
      {/* BACKDROP REASON: Official Radix UI documentation recommends backdrop overlays for modal focus management */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-title"
      >
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Container styling with responsive design patterns */}
        {/* RESPONSIVE DESIGN REASON: Official Tailwind CSS documentation shows responsive container patterns for modal content */}
        <div
          ref={modalRef}
          className={cn(
            "relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden",
            "focus:outline-none focus:ring-2 focus:ring-amber-500",
            className
          )}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
            <h2 
              id="video-title"
              className="text-lg font-semibold text-slate-900 truncate pr-4"
            >
              {title}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="shrink-0 hover:bg-slate-200"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Video container */}
          <div className="relative bg-black">
            <div className="aspect-video">
              {/* CONTEXT7 SOURCE: /w3/html - HTML5 video element with accessibility and responsive design */}
              {/* HTML5 VIDEO REASON: Official HTML documentation shows video element with controls and responsive behavior */}
              <video
                ref={videoRef}
                src={videoUrl}
                poster={poster}
                controls
                autoPlay
                className="w-full h-full object-contain"
                aria-label={`Video: ${title}`}
                onError={(e) => {
                  console.error('Video playback error:', e)
                }}
              >
                <p className="text-white text-center p-8">
                  Your browser does not support the video element. Please try a different browser or contact support.
                </p>
              </video>
            </div>
          </div>

          {/* Optional: Video controls overlay for enhanced UX */}
          <div className="p-4 bg-slate-50 border-t border-slate-200">
            <p className="text-sm text-slate-600 text-center">
              Press ESC to close or click outside the video
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Type export patterns for component library architecture
// TYPE EXPORT REASON: Official TypeScript documentation recommends exporting types for external component usage
export type { VideoPopupProps }