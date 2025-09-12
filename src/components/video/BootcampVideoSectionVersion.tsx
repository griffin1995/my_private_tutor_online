/**
 * Bootcamp Video Section Version Component  
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for reusable UI elements
 * IMPLEMENTATION REASON: Official React documentation Section 2.1 recommends component composition patterns for specialized bootcamp video sections
 * 
 * Pattern: Hardcoded Programme Data Video Section Component
 * Architecture:
 * - Uses hardcoded bootcamp programme data from page component
 * - Supports flexible text-left/text-right layouts
 * - Integrates with existing background images from video CMS
 * - Maintains full-screen modal functionality for paid content
 * 
 * Design Features:
 * - Dynamic layout positioning based on layout prop
 * - Programme-specific content from hardcoded data
 * - "Buy" circle positioning for paid bootcamp content
 * - Background image support with overlay content
 * - Programme pricing and date information display
 * 
 * Programme Data Integration:
 * - kickstarterProgramme → Elite School Focus (index 1)
 * - intensiveProgramme → Intensive 11+ Preparation (index 0)
 * - All content driven by hardcoded bootcampProgrammes array
 * - Type-safe props with TypeScript interfaces
 */

"use client"

import { Separator } from "@/components/ui/separator";

// CONTEXT7 SOURCE: /microsoft/typescript - Interface with simple prop patterns for component composition
// COMPONENT SPECIALIZATION: Specialized props interface for bootcamp programme video sections
interface BootcampVideoSectionVersionProps {
  readonly videoId: "kickstarterProgramme" | "intensiveProgramme";
  readonly layout: "text-left" | "text-right";
  readonly className?: string;
}

// CONTEXT7 SOURCE: /microsoft/typescript - Hardcoded programme data matching page component structure
// PROGRAMME DATA REASON: Official TypeScript patterns for readonly object literals with programme information
const bootcampProgrammes = [
  {
    title: "Intensive 11+ Preparation",
    duration: "5 Days", 
    format: "In-Person & Online",
    groupSize: "Max 8 students",
    description:
      "Comprehensive preparation covering all 11+ subjects with expert tutors",
    features: [
      "Mathematics problem-solving techniques",
      "English comprehension and creative writing", 
      "Verbal and non-verbal reasoning",
      "Mock examinations with detailed feedback",
      "Confidence building and exam technique",
    ],
    price: "£750",
    dates: [
      "Half Term: 17-21 February 2025",
      "Easter: 7-11 April 2025", 
      "Summer: 28 July - 1 August 2025",
    ],
    stripeUrl: "https://buy.stripe.com/6oUdR8enb9jF69u1Zd3840c"
  },
  {
    title: "Elite School Focus",
    duration: "3 Days",
    format: "In-Person Only", 
    groupSize: "Max 6 students",
    description:
      "Targeted preparation for top-tier independent schools (Eton, Westminster, St Paul's)",
    features: [
      "School-specific paper analysis",
      "Advanced problem-solving strategies",
      "Interview preparation and technique", 
      "Past paper practice with time management",
      "Individual feedback sessions",
    ],
    price: "£550", 
    dates: ["February: 24-26 February 2025", "May: 26-28 May 2025"],
    stripeUrl: "https://buy.stripe.com/7sYbJ0cf3brN69u8nB3840d"
  },
] as const;

// CONTEXT7 SOURCE: /microsoft/typescript - Background image mapping for programme video sections
// IMAGE MAPPING REASON: Official TypeScript patterns for static image mapping with CMS integration
const programmeBackgroundImages = {
  kickstarterProgramme: "/images/programmes/eleven-plus-intensive-exam-preparation.jpg",
  intensiveProgramme: "/images/programmes/eleven-plus-kickstarter-online-tutoring.jpg"
} as const;

const programmeThumbnailImages = {
  kickstarterProgramme: "/images/programmes/eleven-plus-kickstarter-online-tutoring.jpg", 
  intensiveProgramme: "/images/programmes/eleven-plus-intensive-exam-preparation.jpg"
} as const;

export function BootcampVideoSectionVersion({ 
  videoId,
  layout,
  className = ""
}: BootcampVideoSectionVersionProps) {
  
  // CONTEXT7 SOURCE: /microsoft/typescript - Programme data mapping with array indexing
  // DATA MAPPING REASON: Official TypeScript patterns for hardcoded data lookup with type safety
  const programmeIndex = videoId === "intensiveProgramme" ? 0 : 1; // Intensive = index 0, Elite School Focus = index 1
  const programme = bootcampProgrammes[programmeIndex];
  
  // CONTEXT7 SOURCE: /microsoft/typescript - Background image lookup with mapped object access
  // IMAGE LOOKUP REASON: Official TypeScript patterns for static asset mapping
  const backgroundImage = programmeBackgroundImages[videoId];
  const thumbnailImage = programmeThumbnailImages[videoId];

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
      {/* Video Section */}
      <div className={`relative z-10 flex justify-center items-center p-8 ${videoGridOrder}`}>
        <a 
          href={programme.stripeUrl} 
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
                src={thumbnailImage}
                alt={`${programme.title} - 11+ Bootcamp Programme`}
                className="w-full h-full object-cover drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                style={{ aspectRatio: "16/9" }}
              />
            </div>
          </div>
        </a>
      </div>

      {/* Text Content Section */}
      <div className={`relative z-10 w-4/5 mx-auto p-8 ${textAlignment} ${textGridOrder}`}>
        <h2 className="text-4xl font-bold text-white mb-3">
          {programme.title}
        </h2>
        
        {/* CONTEXT7 SOURCE: /radix-ui/primitives - Separator component for visual content division */}
        {/* SEPARATOR REASON: Official Radix UI documentation demonstrates horizontal separator after headings for content organization */}
        <Separator className="bg-gray-300 my-3" />
        
        <div className={`flex items-center gap-4 mb-4 ${badgeAlignment}`}>
          <span className="text-white text-sm font-medium">
            Premium Programme
          </span>
          <Separator
            orientation="vertical"
            className="flex-shrink-0 bg-gray-300 h-4"
          />
          <span className="text-white text-sm font-medium">{programme.duration}</span>
          <Separator
            orientation="vertical"
            className="flex-shrink-0 bg-gray-300 h-4"
          />
          <a 
            href={programme.stripeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="!text-white text-sm font-medium hover:!text-[#CA9E5B] hover:underline transition-all duration-300 cursor-pointer"
          >
            {programme.price}
          </a>
        </div>
        
        <Separator
          orientation="horizontal"
          className="bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full my-3"
        />
        
        {/* Content Description */}
        <p className="text-white mb-4">
          {programme.description}
        </p>
        
        {/* Programme Details */}
        <p className="text-white mb-4">
          <strong>{programme.format}</strong> • <strong>{programme.groupSize}</strong>
        </p>
        
        {/* Available Dates */}
        <div className="text-white mb-4">
          <strong>Available Dates:</strong>
          <ul className="mt-2 space-y-1">
            {programme.dates.map((date, index) => (
              <li key={index} className="text-sm">• {date}</li>
            ))}
          </ul>
        </div>
        
        <Separator className="bg-gray-300 my-3" />
        
        {/* Programme Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
          {programme.features.map((feature, index) => (
            <div key={index} className={`flex items-start space-x-2 ${bulletAlignment}`}>
              {isTextLeft ? (
                <>
                  <span className="text-white mt-1.5 text-xs">•</span>
                  <span className="text-white text-sm">{feature}</span>
                </>
              ) : (
                <>
                  <span className="text-white text-sm">{feature}</span>
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

export default BootcampVideoSectionVersion;