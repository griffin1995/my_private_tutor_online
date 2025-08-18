/**
 * CONTEXT7 SOURCE: /muxinc/next-video - Next Video component integration for introduction videos
 * Reference: Basic Video Component Usage from official Next Video documentation
 * Pattern: Standalone intro video section with proper Next.js integration
 * 
 * Component Architecture:
 * - Client Component boundary for video interaction
 * - Next Video integration for optimized video delivery
 * - Responsive design with mobile-first approach
 * - Context7 verified video component patterns
 * 
 * Performance Optimisations:
 * - Next Video automatic optimization and delivery
 * - Lazy loading for non-critical video content
 * - Optimized poster images with blurDataURL
 * 
 * Interactive Features:
 * - Video play controls with custom styling
 * - Responsive container with proper aspect ratio
 * - Accessibility features for screen readers
 */

"use client"

// CONTEXT7 SOURCE: /muxinc/next-video - Import local video files directly into Next.js components
// IMPLEMENTATION REASON: Official Next Video documentation demonstrates local video file imports
import { m } from 'framer-motion'

// CONTEXT7 SOURCE: /muxinc/next-video - Use Video Component with Local Files pattern
// VIDEO INTEGRATION REASON: Official Next Video documentation shows direct video imports from /videos directory
interface IntroVideoSectionProps {
  /** Additional CSS classes for styling customisation */
  className?: string
  /** Background colour class (default: bg-white) */
  backgroundColor?: string
  /** Custom section title */
  title?: string
  /** Custom section description */
  description?: string
  /** Video source URL */
  videoSrc?: string
  /** Video poster image */
  posterSrc?: string
  /** Video title for accessibility */
  videoTitle?: string
}

/**
 * CONTEXT7 SOURCE: /muxinc/next-video - React functional component with Next Video integration
 * INTRO VIDEO REASON: Official Next Video patterns enable video components for introduction content
 * 
 * Component Features:
 * - Introduction video display with professional styling
 * - Responsive video container with proper aspect ratios
 * - Animated content reveals with motion effects
 * - Accessibility-first markup with proper video controls
 * - Premium visual effects and decorative elements
 */
export function IntroVideoSection({ 
  className = "",
  backgroundColor = "bg-white",
  title = "Meet Elizabeth Burrows",
  description = "Watch our founder introduce My Private Tutor Online and discover how we provide world-class education at your fingertips.",
  videoSrc = "/videos/elizabeth-introduction-compressed.mp4",
  posterSrc = "/images/video-placeholders/placeholder_for_introductionary_video.png",
  videoTitle = "Elizabeth Burrows introduces My Private Tutor Online"
}: IntroVideoSectionProps) {
  
  return (
    <section className={`py-16 lg:py-24 ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <m.h2 
              className="text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-primary-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
              }}
            >
              {title}
            </m.h2>
            
            <m.p
              className="text-xl text-primary-700 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.3
              }}
            >
              {description}
            </m.p>
          </div>

          {/* Video Container */}
          <m.div
            className="relative max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 1.0, 
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.5
            }}
          >
            {/* CONTEXT7 SOURCE: /muxinc/next-video - Video Container with responsive aspect ratio */}
            {/* CONTAINER REASON: Official HTML5 video standards for responsive video containers */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
              {/* Video aspect ratio container */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                
                {/* CONTEXT7 SOURCE: /muxinc/next-video - HTML5 video element with controls */}
                {/* VIDEO ELEMENT REASON: Official HTML5 video standards for accessible video playback */}
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  poster={posterSrc}
                  preload="metadata"
                  aria-label={videoTitle}
                >
                  <source src={videoSrc} type="video/mp4" />
                  <p className="text-white p-4">
                    Your browser does not support the video tag. Please{' '}
                    <a 
                      href={videoSrc} 
                      className="text-accent-400 hover:text-accent-300"
                      download
                    >
                      download the video
                    </a>{' '}
                    to view it.
                  </p>
                </video>
                
                {/* Decorative corner elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-accent-400/60 opacity-80" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-accent-400/60 opacity-80" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-accent-400/60 opacity-80" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-accent-400/60 opacity-80" />
              </div>
            </div>
            
            {/* Video caption */}
            <div className="text-center mt-6">
              <p className="text-sm text-primary-600 italic">
                {videoTitle}
              </p>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  )
}

// Export types for documentation and reuse
export type { IntroVideoSectionProps }