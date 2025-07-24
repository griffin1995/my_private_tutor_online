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
  const videoSrc = backgroundVideo?.src || '/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.mp4'
  
  return (
    <div className={cn(
      "relative h-[200px] w-full flex items-center justify-center",
      className
    )}>
      <VideoText
        src={videoSrc}
        className="h-full w-full"
        fontSize="clamp(2rem, 12vw, 8rem)"
        fontWeight="bold"
        fontFamily="serif"
        autoPlay={true}
        muted={true}
        loop={true}
      >
        {text}
      </VideoText>
      
      {/* Fallback content for accessibility and SEO */}
      <noscript>
        <div className="absolute inset-0 flex items-center justify-center bg-primary-900 text-white">
          <h2 className="text-[clamp(2rem,12vw,8rem)] font-serif font-bold text-center whitespace-nowrap">
            {text}
          </h2>
        </div>
      </noscript>
    </div>
  )
}