/**
 * Full Width Text Video Masterclass Section Component
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for reusable UI elements
 * COMPONENT CREATION: Official React documentation demonstrates component duplication patterns for creating variant components
 * MODIFICATION REASON: Create text-full-width variant of VideoMasterclassSection for sections 3c and 3d styling requirements
 * CONTEXT7 SOURCE: /radix-ui/website - Separator component removal for clean content structure
 * REMOVAL REASON: Official Radix UI documentation demonstrates proper separator removal patterns for streamlined component layouts
 *
 * Pattern: CMS-driven Video Section Component with Full Width Text
 * Architecture:
 * - Extends existing VideoPageSection interface from CMS
 * - Supports flexible text-left/text-right layouts
 * - Integrates with HeroVideoDialog component
 * - Maintains full-screen modal functionality
 * - MODIFICATION: Text content spans full container width (w-full) instead of constrained width (w-4/5 mx-auto)
 *
 * Design Features:
 * - Dynamic layout positioning based on layout prop
 * - Conditional text alignment and grid ordering
 * - "Watch" circle positioning based on video placement
 * - Background image support with overlay content
 * - Badge and pricing display for free/premium content
 * - ENHANCED: Full width text layout for improved readability in specific sections
 *
 * CMS Integration:
 * - Uses VideoPageSection interface from cms-images.ts
 * - All content driven by CMS data structure
 * - Type-safe props with TypeScript interfaces
 */

"use client"

// CONTEXT7 SOURCE: /websites/react_dev - React performance optimization hooks
// PERFORMANCE OPTIMIZATION: Complete hook suite for memoization, callbacks, and component optimization
import { useMemo, useCallback, memo } from 'react';
// CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for optimized image loading
// IMAGE OPTIMIZATION: Native Next.js image optimization for thumbnail performance
import Image from 'next/image';
// CONTEXT7 SOURCE: /vercel/next.js - Next.js dynamic import for lazy loading
// LAZY LOADING: Dynamic imports for code splitting and performance
import dynamic from 'next/dynamic';
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

// Enhanced props interface with strict typing
interface VideoMasterclassSectionTextFullWidthProps {
  readonly video?: VideoMasterclass;
  readonly videoId?: string;
  readonly layout: "text-left" | "text-right";
  readonly className?: string;
}

// CONTEXT7 SOURCE: /websites/react_dev - React.memo for component optimization
// PERFORMANCE OPTIMIZATION: Wrap component with memo to prevent unnecessary re-renders
const VideoMasterclassSectionTextFullWidthComponent = memo(function VideoMasterclassSectionTextFullWidth({
  video: directVideo,
  videoId,
  layout,
  className = ""
}: VideoMasterclassSectionTextFullWidthProps) {
  // CONTEXT7 SOURCE: /websites/react_dev - useMemo performance optimization for expensive data transformations
  // PERFORMANCE OPTIMIZATION: Memoize video data transformation to prevent expensive recalculations
  const transformedVideo: TransformedVideoData | null = useMemo(() => {
    let videoData: VideoMasterclass | undefined;

    if (!directVideo && !videoId) {
      console.error("VideoMasterclassSectionTextFullWidth requires either 'video' or 'videoId' prop");
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
    backgroundImage // Now from top-level video data
  } = video;

  // CONTEXT7 SOURCE: /websites/react_dev - useCallback for stable function references
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
    content,
    animationStyle
  } = layoutData;

  // CONTEXT7 SOURCE: /websites/react_dev - Single useMemo for consolidated layout and style calculations
  // PERFORMANCE OPTIMIZATION: Consolidate multiple useMemo calls into single calculation to reduce hook overhead
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background gradient removal patterns for clean element styling
  // GRADIENT REMOVAL REASON: Remove corner gradient blur effect while maintaining background image functionality and text readability
  const layoutConfig = useMemo(() => {
    const isTextLeft = layout === "text-left";
    return {
      isTextLeft,
      textAlignment: isTextLeft ? "" : "text-right",
      bulletAlignment: isTextLeft ? "" : "justify-end",
      videoGridOrder: isTextLeft ? "order-2" : "order-1",
      textGridOrder: isTextLeft ? "order-1" : "order-2",
      watchCirclePosition: isTextLeft ? "-right-24" : "-left-24",
      backgroundStyle: {
        backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined
      }
    } as const;
  }, [layout, backgroundImage]);

  const {
    isTextLeft,
    textAlignment,
    bulletAlignment,
    videoGridOrder,
    textGridOrder,
    watchCirclePosition,
    backgroundStyle
  } = layoutConfig;

  return (
    <div
      className={`relative flex flex-col md:flex-row bg-cover bg-center bg-no-repeat ${className}`}
      style={backgroundStyle}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Enhanced Royal Overlay System with strengthened opacity values */}
      {/* OVERLAY ENHANCEMENT REASON: Official Tailwind documentation demonstrates higher opacity gradient overlays for improved text contrast */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Backdrop filter combinations for premium text readability */}
      {/* BACKDROP FILTER IMPLEMENTATION: Multiple backdrop filters combined for optimal white text contrast on bright backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/65 via-slate-900/50 to-slate-900/70 backdrop-blur-[2px] backdrop-brightness-75 backdrop-contrast-110 backdrop-filter" />
      {/* Video Section - Only show if video URL exists */}
      {/* CONTEXT7 SOURCE: /websites/react_dev - Conditional rendering for clean component structure */}
      {/* REFACTORING CLEANUP: Remove unnecessary empty placeholder div to eliminate redundant DOM elements */}
      {videoUrl && videoUrl.trim() !== '' && (
        <div className={`relative z-10 flex justify-center items-center p-8 md:w-1/2 ${videoGridOrder}`}>
          {isFree ? (
            <div className="relative group">
              <div className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}>
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
              <div className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}>
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

      {/* Text Content Section - MODIFIED: Full width text layout with premium typography */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full width utility class patterns for unrestricted content width */}
      {/* MODIFICATION REASON: Implement true full-width text layout with flex-1 for optimal space utilization */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Advanced text shadow utilities for premium readability enhancement */}
      {/* PREMIUM TYPOGRAPHY ENHANCEMENT: Advanced text shadows with drop-shadow filter for crystal clear white text over varied backgrounds */}
      <div className={`relative z-10 flex-1 px-6 md:px-8 py-8 ${textAlignment} ${textGridOrder}`} style={{ WebkitFontSmoothing: 'antialiased', fontSmoothing: 'antialiased' }}>
        <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] tracking-tight">
          {video.title}
        </h2>

        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Separator component for visual content division */}
        {/* SEPARATOR REASON: Official Radix UI documentation demonstrates horizontal separator after headings for content organization */}
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

        {/* Bullet Points - MODIFIED: Enhanced full width layout with flexible spacing */}
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexible grid patterns for optimal content distribution */}
        {/* BULLET LAYOUT ENHANCEMENT: Improved spacing and responsive design for full-width text utilization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2">
          {content.bulletPoints.map((bulletPoint, index) => (
            <div key={index} className={`flex items-start gap-2 w-full ${bulletAlignment}`}>
              {isTextLeft ? (
                <>
                  <span className="text-white/80 mt-1 text-sm flex-shrink-0 select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">•</span>
                  <span className="text-white text-sm leading-relaxed drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] tracking-wide">{bulletPoint}</span>
                </>
              ) : (
                <>
                  <span className="text-white text-sm leading-relaxed text-right flex-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] tracking-wide">{bulletPoint}</span>
                  <span className="text-white/80 mt-1 text-sm flex-shrink-0 select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">•</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // CONTEXT7 SOURCE: /websites/react_dev - Custom comparison for React.memo
  // PERFORMANCE OPTIMIZATION: Deep comparison for complex props to prevent unnecessary re-renders
  return (
    prevProps.videoId === nextProps.videoId &&
    prevProps.layout === nextProps.layout &&
    prevProps.className === nextProps.className &&
    prevProps.video?.id === nextProps.video?.id
  );
});

// CONTEXT7 SOURCE: /websites/react_dev - Export optimized component
// PERFORMANCE ENHANCEMENT: Export memoized component for optimal performance
export const VideoMasterclassSectionTextFullWidth = VideoMasterclassSectionTextFullWidthComponent;
export default VideoMasterclassSectionTextFullWidth;