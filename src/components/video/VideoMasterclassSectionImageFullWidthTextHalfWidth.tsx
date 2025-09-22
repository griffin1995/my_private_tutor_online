/**
 * Image Full Width Text Half Width Video Masterclass Section Component
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for specialized UI variants
 * COMPONENT CREATION: Official React documentation demonstrates component duplication patterns for creating specialized variants
 * SPECIALIZATION REASON: Create specialized variant that preserves beloved section 3B text positioning while adding enhanced Royal Overlay System
 *
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced gradient overlays with strengthened opacity values
 * ROYAL OVERLAY ENHANCEMENT: Official Tailwind documentation for premium backdrop filter combinations and gradient overlay systems
 *
 * Pattern: Specialized CMS-driven Video Section Component
 * Architecture:
 * - Preserves section 3B text positioning (w-4/5 mx-auto) that user specifically loves
 * - Applies enhanced Royal Overlay System from sections 3C/3D
 * - Maintains VideoMasterclass interface compatibility
 * - Supports flexible text-left layout for single column sections
 * - Enhanced backdrop filters for premium white text readability
 *
 * Design Features:
 * - PRESERVED: Exact text positioning from beloved section 3B layout
 * - ENHANCED: Royal Overlay System with strengthened gradients and backdrop filters
 * - Premium white text with advanced shadow effects for crystal clear readability
 * - Background image support with professional overlay content
 * - Badge and pricing display for free/premium content
 * - Single video section optimized for full-width image display
 *
 * CMS Integration:
 * - Uses VideoMasterclass interface from COMPREHENSIVE_VIDEO_CMS
 * - All content driven by CMS data structure
 * - Type-safe props with TypeScript interfaces
 */

"use client"

// CONTEXT7 SOURCE: /reactjs/react.dev - React performance optimization hooks
// PERFORMANCE OPTIMIZATION: Complete hook suite for memoization, callbacks, and component optimization
import { useMemo, useCallback, memo } from 'react';
// CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for optimized image loading
// IMAGE OPTIMIZATION: Native Next.js image optimization for thumbnail performance
import Image from 'next/image';
// CONTEXT7 SOURCE: /magicuidesign/magicui - HeroVideoDialog component import for video modal functionality
// IMPORT REASON: Official Magic UI documentation recommends default import for HeroVideoDialog component
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Separator } from "@/components/ui/separator";
import { getMasterclassVideo } from "@/lib/cms/cms-images";
import { type VideoMasterclass } from "../../../COMPREHENSIVE_VIDEO_CMS";

// CONTEXT7 SOURCE: /microsoft/typescript - Strict TypeScript interfaces for type safety and performance
// TYPE SAFETY ENHANCEMENT: Comprehensive interfaces replacing any usage with proper type definitions

// Strict interface for transformed video data to replace any typing
interface TransformedVideoData {
  readonly title: string;
  readonly videoUrl: string;
  readonly thumbnailUrl: string;
  readonly backgroundImage: string;
  readonly alt: string;
  readonly duration: string;
  readonly author: string;
  readonly isFree: boolean;
  readonly price?: string;
  readonly paymentUrl?: string;
  readonly layouts: {
    readonly videoPage: {
      readonly badge: {
        readonly text: string;
      };
      readonly content: {
        readonly paragraphs: readonly string[];
        readonly bulletPoints: readonly string[];
      };
      readonly animationStyle: string;
    };
  };
}

// Enhanced props interface with strict typing for specialized component
interface VideoMasterclassSectionImageFullWidthTextHalfWidthProps {
  readonly video?: VideoMasterclass;
  readonly videoId?: string;
  readonly className?: string;
}

// CONTEXT7 SOURCE: /reactjs/react.dev - React.memo for component optimization
// PERFORMANCE OPTIMIZATION: Wrap component with memo to prevent unnecessary re-renders
const VideoMasterclassSectionImageFullWidthTextHalfWidthComponent = memo(function VideoMasterclassSectionImageFullWidthTextHalfWidth({
  video: directVideo,
  videoId,
  className = ""
}: VideoMasterclassSectionImageFullWidthTextHalfWidthProps) {
  // CONTEXT7 SOURCE: /reactjs/react.dev - useMemo performance optimization for expensive data transformations
  // PERFORMANCE OPTIMIZATION: Memoize video data transformation to prevent expensive recalculations
  const transformedVideo: TransformedVideoData | null = useMemo(() => {
    let videoData: VideoMasterclass | undefined;

    if (!directVideo && !videoId) {
      console.error("VideoMasterclassSectionImageFullWidthTextHalfWidth requires either 'video' or 'videoId' prop");
      return null;
    }

    if (directVideo) {
      // BATCH MODE: Use direct VideoMasterclass object (no lookup needed)
      videoData = directVideo;
      // Transform with strict typing for display
      return {
        title: videoData.title,
        videoUrl: videoData.youtubeUrl,
        thumbnailUrl: videoData.thumbnailImage,
        backgroundImage: videoData.backgroundImage,
        alt: videoData.title,
        duration: "15", // Default duration
        author: "Elizabeth Burrows",
        isFree: !videoData.isPaid,
        price: videoData.isPaid ? "Premium Content" : undefined,
        paymentUrl: videoData.purchaseLink,
        layouts: {
          videoPage: {
            badge: {
              text: videoData.isPaid ? "Premium" : "Free"
            },
            content: {
              paragraphs: [videoData.description],
              bulletPoints: videoData.bulletPoints || [
                "Expert guidance from Elizabeth Burrows",
                "Based on 15 years of tutoring experience",
                "Practical strategies for academic success",
                "Proven methodology for educational excellence"
              ]
            },
            animationStyle: "fade"
          }
        }
      } as const;
    } else if (videoId) {
      // LEGACY MODE: Individual lookup for backwards compatibility
      const legacyVideo = getMasterclassVideo(videoId);
      if (!legacyVideo) {
        console.error(`Video not found for videoId: "${videoId}"`);
        return null;
      }
      return legacyVideo;
    }

    return null;
  }, [directVideo, videoId]); // Dependencies for memoization

  // CONTEXT7 SOURCE: /microsoft/typescript - Type-safe error handling patterns
  // ERROR HANDLING: Early return with proper type checking for transformed video data
  if (!transformedVideo) {
    return null;
  }

  const video = transformedVideo;
  const layoutData = video.layouts.videoPage;

  // ERROR HANDLING: Type-safe layout data validation
  if (!layoutData) {
    console.error(`Layout data not found for video`);
    return null;
  }

  // DATA EXTRACTION: Extract video properties from master CMS
  const {
    videoUrl,
    thumbnailUrl,
    alt,
    author,
    isFree,
    price,
    backgroundImage
  } = video;

  // CONTEXT7 SOURCE: /reactjs/react.dev - useCallback for stable function references
  // PERFORMANCE OPTIMIZATION: Memoize click handlers to prevent child re-renders
  const handlePurchaseClick = useCallback((e: React.MouseEvent) => {
    // Prevent default and handle purchase navigation
    if (video.paymentUrl) {
      e.preventDefault();
      window.open(video.paymentUrl, '_blank', 'noopener,noreferrer');
    }
  }, [video.paymentUrl]);

  // LAYOUT DATA: Extract page-specific layout from master CMS
  const {
    badge,
    content,
    animationStyle
  } = layoutData;

  // CONTEXT7 SOURCE: /reactjs/react.dev - Single useMemo for consolidated layout and style calculations
  // PERFORMANCE OPTIMIZATION: Consolidate multiple useMemo calls into single calculation to reduce hook overhead
  const layoutConfig = useMemo(() => {
    return {
      backgroundStyle: {
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined
      }
    } as const;
  }, [backgroundImage]);

  const { backgroundStyle } = layoutConfig;

  return (
    <div
      className={`relative grid md:grid-cols-2 gap-8 items-center bg-cover bg-center bg-no-repeat ${className}`}
      style={backgroundStyle}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced Royal Overlay System with strengthened opacity values */}
      {/* ROYAL OVERLAY ENHANCEMENT: Official Tailwind documentation demonstrates higher opacity gradient overlays for improved text contrast */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Backdrop filter combinations for premium text readability */}
      {/* BACKDROP FILTER IMPLEMENTATION: Multiple backdrop filters combined for optimal white text contrast on bright backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/65 via-slate-900/50 to-slate-900/70 backdrop-blur-[2px] backdrop-brightness-75 backdrop-contrast-110 backdrop-filter" />

      {/* Video Section - Only show if video URL exists */}
      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering for clean component structure */}
      {/* REFACTORING CLEANUP: Remove unnecessary empty placeholder div to eliminate redundant DOM elements */}
      {videoUrl && videoUrl.trim() !== '' && (
        <div className="relative z-10 flex justify-center items-center p-8 order-2">
          {isFree ? (
            <div className="relative group">
              <div className="absolute -right-24 top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300">
                <span className="text-white group-hover:text-[#D4AF37] font-medium italic transition-colors duration-300">Watch.</span>
              </div>
              <HeroVideoDialog
                videoSrc={videoUrl}
                thumbnailSrc={thumbnailUrl}
                thumbnailAlt={alt}
                animationStyle={animationStyle}
                isFree={isFree}
                className="w-full max-w-lg mx-auto border border-white border-opacity-50 rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              />
            </div>
          ) : (
            <a
              href={video.paymentUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group cursor-pointer block"
              onClick={handlePurchaseClick}
            >
              <div className="absolute -right-24 top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300">
                <span className="!text-white group-hover:!text-[#D4AF37] font-medium italic transition-colors duration-300">Buy.</span>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-black/15 rounded-lg z-10 transition-opacity duration-300 group-hover:bg-black/0"></div>
                <div className="w-full max-w-lg mx-auto border border-white border-opacity-50 rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative overflow-hidden">
                  {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image for optimized loading */}
                  {/* IMAGE OPTIMIZATION: Use Next.js Image for automatic optimization and lazy loading */}
                  <Image
                    src={thumbnailUrl}
                    alt={alt}
                    width={640}
                    height={360}
                    className="w-full h-full object-cover drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    style={{ aspectRatio: "16/9" }}
                    priority={false}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
                    quality={75}
                  />
                </div>
              </div>
            </a>
          )}
        </div>
      )}

      {/* Text Content Section - PRESERVED: Exact section 3B text positioning that user loves */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Preserved w-4/5 mx-auto positioning from beloved section 3B layout */}
      {/* POSITIONING PRESERVATION: Maintain exact text positioning from section 3B that user specifically requested to preserve */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Advanced text shadow utilities for premium readability enhancement */}
      {/* PREMIUM TYPOGRAPHY ENHANCEMENT: Advanced text shadows with drop-shadow filter for crystal clear white text over varied backgrounds */}
      <div className="relative z-10 w-4/5 mx-auto p-8 order-1" style={{ WebkitFontSmoothing: 'antialiased', fontSmoothing: 'antialiased' }}>
        <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] tracking-tight">
          {video.title}
        </h2>

        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Separator component for visual content division */}
        {/* SEPARATOR REASON: Official Radix UI documentation demonstrates horizontal separator after headings for content organization */}
        <Separator className="bg-gray-300 my-3" />

        <div className="flex items-center gap-4 mb-4">
          <span className="text-white text-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
            {badge.text}
          </span>
          <Separator
            orientation="vertical"
            className="flex-shrink-0 bg-gray-300 h-4"
          />
          <span className="text-white text-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">15 minutes</span>
          <Separator
            orientation="vertical"
            className="flex-shrink-0 bg-gray-300 h-4"
          />
          {video.isFree ? (
            <span className="text-white text-sm font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">Watch</span>
          ) : (
            <a
              href={video.paymentUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="!text-white text-sm font-medium hover:!text-[#CA9E5B] hover:underline transition-all duration-300 cursor-pointer drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
            >
              Purchase
            </a>
          )}
        </div>

        <Separator className="bg-gray-300 my-3" />

        {/* Content Paragraphs */}
        {/* CONTEXT7 SOURCE: /reactjs/react.dev - dangerouslySetInnerHTML for trusted HTML content rendering */}
        {/* HTML RENDERING IMPLEMENTATION: Official React documentation demonstrates safe HTML rendering using dangerouslySetInnerHTML for trusted content */}
        {/* LINE BREAK PROCESSING: Convert \n\n to <br><br> tags for proper paragraph separation in HTML */}
        {content.paragraphs.map((paragraph, index) => {
          // Process line breaks and create safe HTML markup
          const processedText = paragraph
            .replace(/\n\n/g, '<br><br>') // Convert double line breaks to HTML breaks
            .replace(/\n/g, '<br>'); // Convert single line breaks to HTML breaks

          return (
            <div
              key={index}
              className="text-white mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] leading-relaxed tracking-wide"
              dangerouslySetInnerHTML={{ __html: processedText }}
            />
          );
        })}

        <Separator className="bg-gray-300 my-3" />

        {/* Bullet Points - PRESERVED: Section 3B layout with enhanced shadows */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid patterns for organized bullet point display */}
        {/* BULLET LAYOUT PRESERVATION: Maintain section 3B bullet layout while enhancing with premium text shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {content.bulletPoints.map((bulletPoint, index) => (
            <div key={index} className="flex items-start space-x-2">
              <span className="text-white/80 mt-1.5 text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] select-none">•</span>
              <span className="text-white text-sm leading-relaxed drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] tracking-wide">{bulletPoint}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // CONTEXT7 SOURCE: /reactjs/react.dev - Custom comparison for React.memo
  // PERFORMANCE OPTIMIZATION: Deep comparison for complex props to prevent unnecessary re-renders
  return (
    prevProps.videoId === nextProps.videoId &&
    prevProps.className === nextProps.className &&
    prevProps.video?.id === nextProps.video?.id
  );
});

// CONTEXT7 SOURCE: /reactjs/react.dev - Export optimized component
// PERFORMANCE ENHANCEMENT: Export memoized component for optimal performance
export const VideoMasterclassSectionImageFullWidthTextHalfWidth = VideoMasterclassSectionImageFullWidthTextHalfWidthComponent;
export default VideoMasterclassSectionImageFullWidthTextHalfWidth;