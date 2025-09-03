/**
 * Modular Video Masterclass Section Component
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for reusable UI elements
 * IMPLEMENTATION REASON: Official React documentation Section 2.1 recommends component composition patterns for modular video sections
 * 
 * Pattern: CMS-driven Video Section Component
 * Architecture:
 * - Extends existing VideoPageSection interface from CMS
 * - Supports flexible text-left/text-right layouts
 * - Integrates with HeroVideoDialog component
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

// CONTEXT7 SOURCE: /magicuidesign/magicui - HeroVideoDialog component import for video modal functionality
// IMPORT REASON: Official Magic UI documentation recommends default import for HeroVideoDialog component
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
// CONTEXT7 SOURCE: /radix-ui/primitives - Separator component for visual content division
// IMPORT REASON: Official Radix UI documentation recommends Separator for content organization
import { Separator } from "@/components/ui/separator";
// CONTEXT7 SOURCE: /lucide/lucide-react - AlertTriangle icon for error states
// IMPORT REASON: Official Lucide documentation recommends AlertTriangle for user-facing error messages
import { AlertTriangle, RefreshCw } from "lucide-react";
import { getMasterclassVideo } from "@/lib/cms/cms-images";

// CONTEXT7 SOURCE: /microsoft/typescript - Interface with simple prop patterns for component composition
// COMPONENT SIMPLIFICATION: Simplified props interface following TypeScript object literal patterns
interface VideoMasterclassSectionProps {
  readonly videoId: string;
  readonly layout: "text-left" | "text-right";
  readonly className?: string;
}

export function VideoMasterclassSection({ 
  videoId,
  layout,
  className = ""
}: VideoMasterclassSectionProps) {
  // MASTER CMS LOOKUP: Get video data from centralized CMS
  const video = getMasterclassVideo(videoId);
  const layoutData = video?.layouts?.videoPage;

  // CONTEXT7 SOURCE: /reactjs/react.dev - Error boundary patterns for graceful failure handling
  // ERROR HANDLING REASON: Official React documentation Section 5.1 recommends user-facing error states instead of null returns
  if (!video || !layoutData) {
    console.error(`Video or layout data not found for videoId: "${videoId}"`);
    return (
      <div className={`relative grid md:grid-cols-2 gap-8 items-center bg-slate-50 ${className}`}>
        <div className="col-span-full text-center py-16 px-8">
          <AlertTriangle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Content Temporarily Unavailable
          </h3>
          <p className="text-slate-600 mb-6 max-w-md mx-auto">
            We apologise for the inconvenience. This masterclass content is currently being updated. Please try refreshing the page or return shortly.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colours"
            aria-label="Refresh page to reload content"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Page
          </button>
        </div>
      </div>
    );
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
    // CONTEXT7 SOURCE: /w3c/wcag - Semantic section element with proper ARIA labelling
    // ACCESSIBILITY REASON: Official WCAG 2.1 guidelines recommend section elements with descriptive labels for screen readers
    <section 
      className={`relative grid md:grid-cols-2 gap-8 items-center bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
      aria-labelledby={`video-title-${videoId}`}
      role="region"
    >
      {/* CONTEXT7 SOURCE: /w3c/wcag - Skip link for keyboard navigation */}
      {/* ACCESSIBILITY REASON: Official WCAG 2.1 guidelines recommend skip links for efficient keyboard navigation */}
      <a 
        href={`#video-content-${videoId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:rounded focus:font-medium"
      >
        Skip to {video.title} content
      </a>
      {/* Video Section */}
      <div className={`relative z-10 flex justify-center items-center p-8 ${videoGridOrder}`}>
        {isFree ? (
          <div className="relative group">
            {/* CONTEXT7 SOURCE: /w3c/wcag - ARIA labels for decorative elements */}
            {/* ACCESSIBILITY REASON: Official WCAG 2.1 guidelines recommend aria-hidden for decorative visual elements */}
            <div 
              className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}
              aria-hidden="true"
            >
              <span className="text-white group-hover:text-[#D4AF37] font-medium italic transition-colors duration-300">Watch.</span>
            </div>
            <HeroVideoDialog
              videoSrc={videoUrl}
              thumbnailSrc={thumbnailUrl}
              thumbnailAlt={`View ${video.title} - ${duration} minute masterclass by ${author}`}
              animationStyle={animationStyle}
              isFree={isFree}
              className="w-full max-w-lg mx-auto border border-white border-opacity-50 rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            />
          </div>
        ) : (
          <a 
            href={video.paymentUrl || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
            aria-label={`Purchase access to ${video.title} masterclass - ${duration} minutes by ${author}`}
          >
            {/* CONTEXT7 SOURCE: /w3c/wcag - ARIA labels for decorative elements */}
            {/* ACCESSIBILITY REASON: Official WCAG 2.1 guidelines recommend aria-hidden for decorative visual elements */}
            <div 
              className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}
              aria-hidden="true"
            >
              <span className="!text-white group-hover:!text-[#D4AF37] font-medium italic transition-colors duration-300">Buy.</span>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-black/15 rounded-lg z-10 transition-opacity duration-300 group-hover:bg-black/0"></div>
              <div className="w-full max-w-lg mx-auto border border-white border-opacity-50 rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative overflow-hidden">
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

      {/* Text Content Section */}
      {/* CONTEXT7 SOURCE: /w3c/wcag - Semantic HTML structure for content sections */}
      {/* ACCESSIBILITY REASON: Official WCAG 2.1 guidelines recommend proper heading hierarchy and semantic markup */}
      <div id={`video-content-${videoId}`} className={`relative z-10 w-4/5 mx-auto p-8 ${textAlignment} ${textGridOrder}`} role="region" aria-labelledby={`video-title-${videoId}`}>
        <h2 id={`video-title-${videoId}`} className="text-4xl font-bold text-white mb-3 focus:outline-none" tabIndex={0}>
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
              className="!text-white text-sm font-medium hover:!text-[#CA9E5B] hover:underline transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 focus:ring-offset-transparent rounded-sm"
              aria-label={`Purchase access to ${video.title}`}
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
        {content.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-white mb-4">
            {paragraph}
          </p>
        ))}
        
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
    </section>
  );
}

export default VideoMasterclassSection;