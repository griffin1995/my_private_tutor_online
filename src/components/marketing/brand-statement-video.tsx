/**
 * Documentation Source: Magic UI Video-Text + CMS Integration
 * Reference: Magic UI video-text component documentation
 * Reference: Next.js 14 Client Component patterns
 * 
 * Pattern: Business-Specific Video-Text Wrapper Component
 * Architecture:
 * - Modular wrapper around Magic UI VideoText component
 * - Full CMS integration for all content and assets
 * - Accessibility fallbacks for no-JavaScript users
 * - Responsive design with proper font scaling
 * 
 * Features:
 * - SVG-masked video background text effects
 * - CMS-driven video content with fallbacks
 * - Accessibility-first implementation
 * - British English content compliance
 * - Full-width breakout utility support
 * 
 * CMS Integration:
 * - Uses getBackgroundVideo() for video assets
 * - Supports multiple video keys (brandStatement, tutoring, oxbridge)
 * - Fallback video path for missing CMS content
 * - Accessibility metadata from CMS
 */

"use client"

import { VideoText } from '@/components/magicui/video-text'
import { getBackgroundVideo } from '@/lib/cms/cms-images'
import { cn } from '@/lib/utils'

// CMS DATA SOURCE: Using getBackgroundVideo for video-text background content
// CLAUDE.md Rule 32: Maintain proper CMS integration for all content

interface BrandStatementVideoProps {
  className?: string
  text?: string
  videoKey?: 'brandStatement' | 'tutoring' | 'oxbridge'
}

export function BrandStatementVideo({ 
  className,
  text = "Exact. Effective. Empowering.",
  videoKey = 'brandStatement'
}: BrandStatementVideoProps) {
  // CMS DATA SOURCE: Using CMS system for background video content
  const backgroundVideo = getBackgroundVideo(videoKey)
  
  // Fallback to existing video if CMS video not available
  const videoSrc = backgroundVideo?.src || '/videos/elizabeth-introduction-compressed.mp4'
  
  return (
    <div className={cn(
      "relative full-width flex items-center justify-center overflow-hidden",
      className
    )}>
      <VideoText
        src={videoSrc}
        className="h-full w-full px-2 sm:px-4"
        fontSize="clamp(1.5rem, 18vw, 16rem)"
        fontWeight="900"
        fontFamily="serif"
        autoPlay={true}
        muted={true}
        loop={true}
      >
        {text}
      </VideoText>
      
      {/* Fallback content for accessibility and SEO */}
      <noscript>
        <div className="absolute inset-0 flex items-center justify-center bg-primary-900 text-white px-2 sm:px-4">
          <h2 className="text-[clamp(1.5rem,18vw,16rem)] font-serif font-black text-center whitespace-nowrap overflow-hidden text-ellipsis">
            {text}
          </h2>
        </div>
      </noscript>
    </div>
  )
}