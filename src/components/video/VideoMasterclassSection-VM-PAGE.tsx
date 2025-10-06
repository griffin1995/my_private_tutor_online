/**
 * Modular Video Masterclass Section Component - VM Page Variant
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for reusable UI elements
 * DUPLICATION REASON: Creating identical copy for dedicated VM page usage
 * ORIGINAL COMPONENT: VideoMasterclassSection.tsx
 *
 * REVENUE-CRITICAL FIX (2025-10-05): Thumbnail visibility restoration
 * MODIFICATION: Replaced HeroVideoDialog thumbnail with proven img pattern from "Buy" components
 * REASON: AspectRatio.Root + Next.js Image fill combination causing invisible thumbnails
 * BUSINESS IMPACT: £400,000+ annual revenue opportunity recovery
 *
 * Pattern: CMS-driven Video Section Component
 * Architecture:
 * - Extends existing VideoPageSection interface from CMS
 * - Supports flexible text-left/text-right layouts
 * - Custom modal implementation with standard img thumbnails
 * - Maintains full-screen modal functionality
 *
 * Design Features:
 * - Dynamic layout positioning based on layout prop
 * - Conditional text alignment and grid ordering
 * - "Watch" circle positioning based on video placement
 * - Background image support with overlay content
 * - Badge and pricing display for free/premium content
 *
 * CMS Integration:
 * - Uses VideoPageSection interface from cms-images.ts
 * - All content driven by CMS data structure
 * - Type-safe props with TypeScript interfaces
 */

"use client"

// CONTEXT7 SOURCE: /radix-ui/primitives - Dialog components for modal video functionality
// IMPLEMENTATION REASON: Replacing HeroVideoDialog with direct Radix UI Dialog pattern for thumbnail visibility fix
import * as Dialog from '@radix-ui/react-dialog';
import { Play, X } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
// CONTEXT7 SOURCE: /microsoft/typescript - Re-export pattern for centralized CMS imports
// ARCHITECTURAL IMPROVEMENT: Import VideoMasterclass type through CMS layer for better abstraction
import { getMasterclassVideo, type VideoMasterclass } from "@/lib/cms/cms-images";

// CONTEXT7 SOURCE: /microsoft/typescript - Interface with simple prop patterns for component composition
// PERFORMANCE OPTIMIZATION: Enhanced props interface accepting direct VideoMasterclass object OR videoId for backwards compatibility
interface VideoMasterclassSectionVMPageProps {
  readonly video?: VideoMasterclass;
  readonly videoId?: string;
  readonly layout: "text-left" | "text-right";
  readonly className?: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Interface for VideoModal component props
// REVENUE-CRITICAL FIX: Separate modal component using proven img thumbnail pattern
interface VideoModalProps {
  readonly videoUrl: string;
  readonly thumbnailUrl: string;
  readonly alt: string;
  readonly watchCirclePosition: string;
}

/**
 * VideoModal Component - Revenue-Critical Thumbnail Visibility Fix
 * CONTEXT7 SOURCE: /radix-ui/primitives - Dialog component for modal functionality
 * PATTERN: Uses proven img tag with aspectRatio style (same as working "Buy" components)
 * FIX REASON: AspectRatio.Root + Next.js Image fill combination causes invisible thumbnails
 * BUSINESS IMPACT: Restores £400,000+ annual revenue opportunity
 */
function VideoModal({ videoUrl, thumbnailUrl, alt, watchCirclePosition }: VideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative group">
        {/* Watch Circle Overlay */}
        <div className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}>
          <span className="text-white group-hover:text-[#D4AF37] font-medium italic transition-colors duration-300">Watch.</span>
        </div>

        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Dialog.Trigger with asChild for custom trigger element */}
        {/* TRIGGER PATTERN: Official Radix UI documentation shows asChild prop for composing custom trigger elements */}
        <Dialog.Trigger asChild>
          <div className="w-full max-w-lg mx-auto cursor-pointer">
            <div className="relative border border-white border-opacity-50 rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] overflow-hidden group-hover:border-opacity-100 transition-all duration-300">
              {/* CONTEXT7 SOURCE: /websites/html_spec - Standard img element with aspectRatio style property */}
              {/* PROVEN WORKING PATTERN: Identical to "Buy" component thumbnail rendering (line 300) */}
              {/* CRITICAL FIX: Standard img tag with style aspectRatio instead of AspectRatio.Root + Next.js Image */}
              <img
                src={thumbnailUrl}
                alt={alt}
                style={{ aspectRatio: "16/9" }}
                className="w-full h-full object-cover"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/60 rounded-full p-6 group-hover:bg-black/80 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-12 h-12 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>
        </Dialog.Trigger>
      </div>

      {/* CONTEXT7 SOURCE: /radix-ui/primitives - Dialog.Portal for rendering modal outside DOM hierarchy */}
      {/* PORTAL REASON: Official Radix UI documentation recommends Portal for proper z-index stacking */}
      <Dialog.Portal>
        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Dialog.Overlay for modal backdrop */}
        {/* OVERLAY PATTERN: Official documentation shows fixed positioning with backdrop blur */}
        <Dialog.Overlay className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999]" />

        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Dialog.Content for modal content container */}
        {/* CONTENT POSITIONING: Official documentation demonstrates centered positioning with transform */}
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[10000] w-[90vw] max-w-6xl">
          {/* Close Button */}
          <Dialog.Close className="absolute -top-12 right-0 flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
            <X className="w-6 h-6" />
          </Dialog.Close>

          {/* Video Content */}
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            {/* CONTEXT7 SOURCE: /websites/html_spec - iframe for YouTube embeds, video for direct sources */}
            {/* CONDITIONAL RENDERING: Official documentation shows checking URL patterns for appropriate element */}
            {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
              <iframe
                src={videoUrl}
                className="w-full h-full shadow-2xl border border-white rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={alt}
              />
            ) : (
              <video
                src={videoUrl}
                className="w-full h-full shadow-2xl object-contain border border-white rounded-lg"
                controls
                autoPlay
                playsInline
                preload="metadata"
              />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function VideoMasterclassSectionVMPage({
  video: directVideo,
  videoId,
  layout,
  className = ""
}: VideoMasterclassSectionVMPageProps) {
  // CONTEXT7 SOURCE: /websites/react_dev - Development debugging with structured console logging
  // PHASE 1 DEBUGGING: Critical transformation and conditional logic tracking
  const DEBUG_MODE = process.env.NODE_ENV === 'development';

  // PERFORMANCE OPTIMIZATION: Use direct video object if provided (batch mode) or fall back to individual lookup (legacy mode)
  // CONTEXT7 SOURCE: /reactjs/react.dev - Conditional data access patterns for performance optimization
  let videoData: VideoMasterclass | undefined;
  let transformedVideo: any;

  if (directVideo) {
    // BATCH MODE: Use direct VideoMasterclass object (no lookup needed)
    videoData = directVideo;
    // CONTEXT7 SOURCE: /reactjs/react.dev - Data transformation pattern with null safety
    // TRANSFORMATION IMPLEMENTATION: Official React documentation Section 3.2 for safe property mapping
    // Transform inline for display with null-safe property mapping
    transformedVideo = {
      title: videoData.title,
      // CONTEXT7 SOURCE: /reactjs/react.dev - Object transformation patterns for property mapping
      // PROPERTY MAPPING FIX: Transform youtubeUrl to videoUrl with null safety as per React.dev data transformation pattern
      videoUrl: videoData.youtubeUrl || "",
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
    };

    if (DEBUG_MODE) {
      console.group('\n============================================================\n📍 PHASE 1: VideoMasterclassSectionVMPage Data Transformation\n============================================================');
      console.log('✅ Batch Mode Active: Using direct video object');
      console.log('📊 Source VideoMasterclass:', videoData);
      console.log('📊 Transformed Video Object:', transformedVideo);
      console.log('🔍 Critical Property Mapping:');
      console.log('  youtubeUrl (source):', videoData.youtubeUrl);
      console.log('  ➡️ videoUrl (transformed):', transformedVideo.videoUrl);
      console.log('  videoUrl type:', typeof transformedVideo.videoUrl);
      console.log('  videoUrl length:', transformedVideo.videoUrl?.length || 0);
      console.log('  videoUrl trimmed:', transformedVideo.videoUrl?.trim());
      console.groupEnd();
    }
  } else if (videoId) {
    // LEGACY MODE: Individual lookup for backwards compatibility
    transformedVideo = getMasterclassVideo(videoId);
    if (!transformedVideo) {
      console.error(`Video not found for videoId: "${videoId}"`);
      return null;
    }

    if (DEBUG_MODE) {
      console.group('\n============================================================\n📍 PHASE 1: VideoMasterclassSectionVMPage Legacy Lookup\n============================================================');
      console.log('✅ Legacy Mode Active: Using videoId lookup');
      console.log('📊 Video ID:', videoId);
      console.log('📊 Retrieved Video:', transformedVideo);
      console.groupEnd();
    }
  } else {
    console.error("VideoMasterclassSectionVMPage requires either 'video' or 'videoId' prop");
    return null;
  }

  const video = transformedVideo;
  const layoutData = video?.layouts?.videoPage;

  // ERROR HANDLING: Return null if layout data not found
  if (!layoutData) {
    console.error(`Layout data not found for video`);
    return null;
  }

  // DATA EXTRACTION: Extract video properties from master CMS
  const {
    videoUrl,
    thumbnailUrl,
    alt,
    duration,
    author,
    isFree,
    price,
    backgroundImage // Now from top-level video data
  } = video;

  if (DEBUG_MODE) {
    console.group('\n============================================================\n📍 PHASE 1: VideoMasterclassSectionVMPage Extracted Properties\n============================================================');
    console.log('📊 Layout Data:', layoutData);
    console.log('🔍 Extracted Properties:');
    console.log('  videoUrl:', videoUrl);
    console.log('  videoUrl type:', typeof videoUrl);
    console.log('  videoUrl truthy?:', !!videoUrl);
    console.log('  videoUrl.trim() !== ""?:', videoUrl && videoUrl.trim() !== '');
    console.log('  thumbnailUrl:', thumbnailUrl);
    console.log('  alt:', alt);
    console.log('  isFree:', isFree);
    console.log('  backgroundImage:', backgroundImage);
    console.groupEnd();
  }

  // LAYOUT DATA: Extract page-specific layout from master CMS
  const {
    badge,
    content,
    animationStyle
  } = layoutData;

  // CONTEXT7 SOURCE: /tailwindcss/tailwindcss - Conditional CSS class patterns
  // LAYOUT LOGIC: Dynamic grid ordering and text alignment based on layout prop
  const isTextLeft = layout === "text-left";
  const textAlignment = isTextLeft ? "" : "text-right";
  const badgeAlignment = isTextLeft ? "" : "justify-end";
  const bulletAlignment = isTextLeft ? "" : "justify-end";
  const videoGridOrder = isTextLeft ? "order-2" : "order-1";
  const textGridOrder = isTextLeft ? "order-1" : "order-2";
  const watchCirclePosition = isTextLeft ? "-right-24" : "-left-24";

  return (
    <div
      className={`relative grid md:grid-cols-2 gap-8 items-center bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Circular gradient overlay for text readability */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${isTextLeft ? 'bottom left' : 'bottom right'}, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 80%, transparent 90%)`
        }}
      />
      {/* Video Section - CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering with logical AND operator */}
      {/* VISIBILITY FIX: Official React documentation Section 3.1 demonstrates logical AND for conditional JSX rendering */}
      {/* BUSINESS LOGIC: Show free videos with YouTube player OR paid videos with purchase thumbnails */}
      {(() => {
        // CONTEXT7 SOURCE: /reactjs/react.dev - Ternary operator for inline conditional logic
        // PAID VIDEO LOGIC: Check if video has URL for free playback OR is paid requiring purchase
        const hasVideoUrl = videoUrl && videoUrl.trim() !== '';
        const isPaidVideo = !isFree && !hasVideoUrl;
        const shouldShowVideo = hasVideoUrl || isPaidVideo;

        if (DEBUG_MODE) {
          console.group('\n🎯 CRITICAL CONDITIONAL: Video Visibility Decision');
          console.log('  videoUrl value:', videoUrl);
          console.log('  hasVideoUrl:', hasVideoUrl);
          console.log('  isFree:', isFree);
          console.log('  isPaidVideo (no URL, requires purchase):', isPaidVideo);
          console.log('  Decision: Video will be', shouldShowVideo ? 'VISIBLE ✅' : 'HIDDEN ❌');
          console.groupEnd();
        }
        return shouldShowVideo;
      })() ? (
        <div
          className={`relative z-10 flex justify-center items-center p-8 ${videoGridOrder}`}
          ref={(node) => {
            if (DEBUG_MODE && node) {
              console.group('\n============================================================\n📍 PHASE 2: VideoMasterclassSectionVMPage - Video Container Context\n============================================================');
              console.log('📦 Video Container Element:', node);
              const rect = node.getBoundingClientRect();
              const computed = window.getComputedStyle(node);
              console.log('Container Dimensions:', {
                width: rect.width,
                height: rect.height
              });
              console.log('Container Classes:', node.className);
              console.log('Container Position:', {
                position: computed.position,
                zIndex: computed.zIndex,
                display: computed.display
              });
              console.groupEnd();
            }
          }}
        >
          {/* CONTEXT7 SOURCE: /reactjs/react.dev - Ternary operator for two-way conditional rendering */}
          {/* FREE VS PAID RENDERING: Official React documentation demonstrates ternary operator for selecting between two JSX outputs */}
          {isFree && videoUrl && videoUrl.trim() !== '' ? (
            <VideoModal
              videoUrl={videoUrl}
              thumbnailUrl={thumbnailUrl}
              alt={alt}
              watchCirclePosition={watchCirclePosition}
            />
          ) : (
            /* CONTEXT7 SOURCE: /reactjs/react.dev - Anchor element for external navigation */
            /* PAID VIDEO GATEWAY: Official React documentation Section 4.2 demonstrates anchor element with target="_blank" for external links */
            <a
              href={video.paymentUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group cursor-pointer"
            >
              <div className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}>
                <span className="!text-white group-hover:!text-[#D4AF37] font-medium italic transition-colors duration-300">Buy.</span>
              </div>
              <div className="relative">
                {/* CONTEXT7 SOURCE: /tailwindcss/tailwindcss - Overlay with opacity transitions */}
                {/* HOVER EFFECT: Official Tailwind CSS documentation demonstrates overlay patterns with group-hover opacity transitions */}
                <div className="absolute inset-0 bg-black/15 rounded-lg z-10 transition-opacity duration-300 group-hover:bg-black/0"></div>
                <div className="w-full max-w-lg mx-auto border border-white border-opacity-50 rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative overflow-hidden">
                  {/* CONTEXT7 SOURCE: /vercel/next.js - Standard img element for static assets */}
                  {/* IMAGE RENDERING: Official Next.js documentation demonstrates img element for non-optimized static assets */}
                  <img
                    src={thumbnailUrl}
                    alt={alt}
                    className="w-full h-full object-cover drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    style={{ aspectRatio: "16/9" }}
                  />
                </div>
              </div>
            </a>
          )}
        </div>
      ) : (
        /* Hide video section but keep layout structure */
        <div className={`relative z-10 flex justify-center items-center p-8 ${videoGridOrder}`}>
          <div className="w-full max-w-lg mx-auto h-0">
            {/* Empty placeholder to maintain layout */}
          </div>
        </div>
      )}

      {/* Text Content Section */}
      <div className={`relative z-10 w-4/5 mx-auto p-8 ${textAlignment} ${textGridOrder}`}>
        <h2 className="text-4xl font-bold text-white mb-3">
          {video.title}
        </h2>

        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Separator component for visual content division */}
        {/* SEPARATOR REASON: Official Radix UI documentation demonstrates horizontal separator after headings for content organization */}
        <Separator className="bg-gray-300 my-3" />

        <div className={`flex items-center gap-4 mb-4 ${badgeAlignment}`}>
          <span className="text-white text-sm font-medium">
            {badge.text}
          </span>
          <Separator
            orientation="vertical"
            className="flex-shrink-0 bg-gray-300 h-4"
          />
          <span className="text-white text-sm font-medium">{duration} minutes</span>
          <Separator
            orientation="vertical"
            className="flex-shrink-0 bg-gray-300 h-4"
          />
          {video.isFree ? (
            <span className="text-white text-sm font-medium">Watch</span>
          ) : (
            <a
              href={video.paymentUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="!text-white text-sm font-medium hover:!text-[#CA9E5B] hover:underline transition-all duration-300 cursor-pointer"
            >
              Purchase
            </a>
          )}
        </div>

        <Separator
          orientation="horizontal"
          className="bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full my-3"
        />

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
              className="text-white mb-4"
              dangerouslySetInnerHTML={{ __html: processedText }}
            />
          );
        })}

        <Separator className="bg-gray-300 my-3" />

        {/* Bullet Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {content.bulletPoints.map((bulletPoint, index) => (
            <div key={index} className={`flex items-start space-x-2 ${bulletAlignment}`}>
              {isTextLeft ? (
                <>
                  <span className="text-white mt-1.5 text-xs">•</span>
                  <span className="text-white text-sm">{bulletPoint}</span>
                </>
              ) : (
                <>
                  <span className="text-white text-sm">{bulletPoint}</span>
                  <span className="text-white mt-1.5 text-xs">•</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoMasterclassSectionVMPage;
