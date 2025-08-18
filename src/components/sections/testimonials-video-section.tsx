/**
 * CONTEXT7 SOURCE: /muxinc/next-video - Next Video component integration for testimonial videos
 * Reference: Use Video Component with Local Files and Custom Player patterns
 * Pattern: Video testimonials gallery with responsive grid layout
 * 
 * Component Architecture:
 * - Client Component boundary for video interactions
 * - Grid layout for multiple testimonial videos
 * - Responsive design with mobile-first approach
 * - Context7 verified video gallery patterns
 * 
 * Performance Optimisations:
 * - Lazy loading for testimonial videos
 * - Optimized poster images for thumbnails
 * - Grid layout with proper spacing
 * 
 * Interactive Features:
 * - Video thumbnails with play overlay
 * - Responsive grid for different screen sizes
 * - Accessibility features for screen readers
 */

"use client"

// CONTEXT7 SOURCE: /muxinc/next-video - React component patterns for video galleries
// IMPLEMENTATION REASON: Official React documentation demonstrates component composition for video content
import { m } from 'framer-motion'
import { Play, Star } from 'lucide-react'
import { useState } from 'react'

// CONTEXT7 SOURCE: /muxinc/next-video - Video testimonial data structure
// VIDEO DATA REASON: Using CMS video content structure for testimonial display
interface TestimonialVideo {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly videoSrc: string
  readonly thumbnailSrc: string
  readonly duration?: number
  readonly featured?: boolean
  readonly category?: 'all' | '11+' | 'GCSE' | 'A-Level' | 'Oxbridge' | 'International'
  readonly testimonialAuthor?: string
  readonly testimonialRole?: string
  readonly viewCount?: number
  readonly rating?: number
  readonly uploadDate?: string
}

interface TestimonialsVideoSectionProps {
  /** Additional CSS classes for styling customisation */
  className?: string
  /** Background colour class (default: bg-slate-50) */
  backgroundColor?: string
  /** Custom section title */
  title?: string
  /** Custom section description */
  description?: string
  /** Array of testimonial videos */
  videos?: TestimonialVideo[]
  /** Maximum number of videos to display */
  maxVideos?: number
}

/**
 * CONTEXT7 SOURCE: /muxinc/next-video - React functional component with video gallery
 * TESTIMONIAL VIDEOS REASON: Official video gallery patterns enable testimonial video display
 * 
 * Component Features:
 * - Grid layout for multiple testimonial videos
 * - Video thumbnails with play overlay buttons
 * - Responsive design for all device sizes
 * - Featured video highlighting with enhanced styling
 * - Video metadata display (author, role, rating)
 * - Accessibility-first markup with proper video controls
 */
export function TestimonialsVideoSection({ 
  className = "",
  backgroundColor = "bg-slate-50",
  title = "Hear From Our Families",
  description = "Watch real testimonials from parents and students who have achieved exceptional results with My Private Tutor Online.",
  videos = [
    {
      id: 'parents-testimonials-2025',
      title: 'Parent Success Stories 2025',
      description: 'Real parents sharing their transformative experiences with My Private Tutor Online',
      videoSrc: '/videos/testimonials-parents-2025-compressed.mp4',
      thumbnailSrc: '/images/video-placeholders/placeholder_for_introductionary_video.png',
      duration: 180,
      featured: true,
      category: 'all',
      testimonialAuthor: 'Various Parents',
      testimonialRole: 'MPTO Families',
      rating: 5
    },
    {
      id: 'students-testimonials-2025',
      title: 'Student Success Stories 2025',
      description: 'Students sharing their academic achievements with MPTO expert tutors',
      videoSrc: '/videos/testimonials-students-2025-compressed.mp4',
      thumbnailSrc: '/images/video-placeholders/placeholder_for_introductionary_video.png',
      duration: 165,
      featured: true,
      category: 'all',
      testimonialAuthor: 'MPTO Students',
      testimonialRole: 'Academic Achievers',
      rating: 5
    }
  ],
  maxVideos = 4
}: TestimonialsVideoSectionProps) {
  
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  
  // Limit videos to display
  const displayVideos = videos.slice(0, maxVideos)
  
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  return (
    <section className={`py-16 lg:py-24 ${backgroundColor} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
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

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayVideos.map((video, index) => (
              <m.div
                key={video.id}
                className="group relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.2
                }}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 30 }
                }}
              >
                {/* Video Thumbnail Container */}
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-200 group-hover:border-accent-400/60 transition-all duration-500">
                  
                  {/* Featured Badge */}
                  {video.featured && (
                    <div className="absolute top-4 left-4 z-20">
                      <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-accent-600 text-white rounded-full text-sm font-semibold shadow-lg">
                        <Star className="w-4 h-4 fill-current" />
                        Featured
                      </div>
                    </div>
                  )}
                  
                  {/* Duration Badge */}
                  {video.duration && (
                    <div className="absolute top-4 right-4 z-20">
                      <div className="px-2 py-1 bg-black/70 text-white rounded text-sm font-medium">
                        {formatDuration(video.duration)}
                      </div>
                    </div>
                  )}
                  
                  {/* Video Thumbnail */}
                  <div 
                    className="relative w-full cursor-pointer"
                    style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}
                    onClick={() => setSelectedVideo(selectedVideo === video.id ? null : video.id)}
                  >
                    {selectedVideo === video.id ? (
                      /* CONTEXT7 SOURCE: /muxinc/next-video - HTML5 video element for testimonial playback */
                      /* VIDEO PLAYBACK REASON: Official HTML5 video patterns for user-controlled testimonial viewing */
                      <video
                        className="absolute inset-0 w-full h-full object-cover"
                        controls
                        autoPlay
                        poster={video.thumbnailSrc}
                        preload="metadata"
                        aria-label={video.title}
                      >
                        <source src={video.videoSrc} type="video/mp4" />
                        <p className="text-slate-600 p-4">
                          Your browser does not support the video tag.
                        </p>
                      </video>
                    ) : (
                      <>
                        {/* Thumbnail Image */}
                        <img
                          src={video.thumbnailSrc}
                          alt={video.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        
                        {/* Play Overlay */}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/20 transition-all duration-300">
                          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-accent-600 ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Video Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-primary-900 mb-3 group-hover:text-primary-800 transition-colors duration-300">
                      {video.title}
                    </h3>
                    
                    <p className="text-primary-700 leading-relaxed mb-4">
                      {video.description}
                    </p>
                    
                    {/* Video Metadata */}
                    <div className="flex items-center justify-between text-sm text-primary-600">
                      <div className="flex items-center gap-2">
                        {video.testimonialAuthor && (
                          <span className="font-medium">{video.testimonialAuthor}</span>
                        )}
                        {video.testimonialRole && (
                          <span className="text-primary-500">• {video.testimonialRole}</span>
                        )}
                      </div>
                      
                      {video.rating && (
                        <div className="flex items-center gap-1">
                          {[...Array(video.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-accent-500 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </m.div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12">
            <m.p
              className="text-lg text-primary-700 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.6
              }}
            >
              Ready to join our community of successful families?
            </m.p>
            
            <m.button
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.8
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
            </m.button>
          </div>
        </div>
      </div>
    </section>
  )
}

// Export types for documentation and reuse
export type { TestimonialsVideoSectionProps, TestimonialVideo }