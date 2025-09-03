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

import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { Separator } from "@/components/ui/separator";
import { getVideoByTitle, getVideoPageData } from "@/lib/cms/cms-images";

// CONTEXT7 SOURCE: /microsoft/typescript - Interface with simple prop patterns for component composition
// COMPONENT SIMPLIFICATION: Simplified props interface following TypeScript object literal patterns
interface VideoMasterclassSectionProps {
  readonly title: string;
  readonly layout: "text-left" | "text-right";
}

export function VideoMasterclassSection({ 
  title,
  layout
}: VideoMasterclassSectionProps) {
  // MASTER CMS LOOKUP: Get video data from centralized CMS
  const video = getVideoByTitle(title);
  const layoutData = getVideoPageData(title);

  // ERROR HANDLING: Return null if video or layout data not found
  if (!video || !layoutData) {
    console.error(`Video or layout data not found for title: "${title}"`);
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
      className="relative grid md:grid-cols-2 gap-8 items-center bg-cover bg-center bg-no-repeat py-8"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      {/* Video Section */}
      <div className={`relative z-10 flex justify-center items-center p-8 ${videoGridOrder}`}>
        <div className="relative group">
          <div className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}>
            <span className="text-white group-hover:text-[#D4AF37] font-medium italic transition-colors duration-300">{isFree ? "Watch." : "Buy."}</span>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-black/15 rounded-lg z-10 transition-opacity duration-300 hover:bg-black/0"></div>
            <HeroVideoDialog
              videoSrc={videoUrl}
              thumbnailSrc={thumbnailUrl}
              thumbnailAlt={alt}
              animationStyle={animationStyle}
              isFree={isFree}
              className="w-full max-w-lg mx-auto border border-white border-opacity-50 rounded-lg shadow-xl shadow-white/30 relative"
            />
          </div>
        </div>
      </div>

      {/* Text Content Section */}
      <div className={`relative z-10 w-4/5 mx-auto p-8 ${textAlignment} ${textGridOrder}`}>
        <h2 className="text-4xl font-bold text-white mb-3">
          {title}
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
    </div>
  );
}

export default VideoMasterclassSection;