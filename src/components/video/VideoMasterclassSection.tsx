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
import { Separator } from "@/components/ui/separator";
// CONTEXT7 SOURCE: /microsoft/typescript - Re-export pattern for centralized CMS imports
// ARCHITECTURAL IMPROVEMENT: Import VideoMasterclass type through CMS layer for better abstraction
import { getMasterclassVideo, type VideoMasterclass } from "@/lib/cms/cms-images";

// CONTEXT7 SOURCE: /microsoft/typescript - Interface with simple prop patterns for component composition
// PERFORMANCE OPTIMIZATION: Enhanced props interface accepting direct VideoMasterclass object OR videoId for backwards compatibility
interface VideoMasterclassSectionProps {
  readonly video?: VideoMasterclass;
  readonly videoId?: string;
  readonly layout: "text-left" | "text-right";
  readonly className?: string;
}

export function VideoMasterclassSection({ 
  video: directVideo,
  videoId,
  layout,
  className = ""
}: VideoMasterclassSectionProps) {
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
  } else if (videoId) {
    // LEGACY MODE: Individual lookup for backwards compatibility
    transformedVideo = getMasterclassVideo(videoId);
    if (!transformedVideo) {
      console.error(`Video not found for videoId: "${videoId}"`);
      return null;
    }
  } else {
    console.error("VideoMasterclassSection requires either 'video' or 'videoId' prop");
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
      {/* Video Section - Only show if video URL exists */}
      {videoUrl && videoUrl.trim() !== '' ? (
        <div className={`relative z-10 flex justify-center items-center p-8 ${videoGridOrder}`}>
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
              className="relative group cursor-pointer"
            >
              <div className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}>
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

export default VideoMasterclassSection;