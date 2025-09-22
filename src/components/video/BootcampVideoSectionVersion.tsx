/**
 * Bootcamp Video Section Version Component  
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for reusable UI elements
 * IMPLEMENTATION REASON: Official React documentation Section 2.1 recommends component composition patterns for specialized bootcamp video sections
 * 
 * Pattern: Comprehensive Programme Data Video Section Component
 * Architecture:
 * - Uses comprehensive bootcamp programme data with detailed content sections
 * - Supports flexible text-left/text-right layouts with Radix UI Separators
 * - Integrates with existing background images from video CMS
 * - Maintains "Buy" circle functionality for paid bootcamp content
 * 
 * Design Features:
 * - Dynamic layout positioning based on layout prop
 * - Comprehensive programme content with target audience, teaching approach, and assessment information
 * - "Buy" circle positioning for paid bootcamp content with updated £395 pricing
 * - Background image support with overlay content
 * - Radix UI Separator components for clean content division
 * - Conditional availability notices for limited spaces
 * 
 * Programme Data Integration:
 * - kickstarterProgramme → 11+ Kickstarter (Y4&5 focus, index 1)
 * - intensiveProgramme → 11+ Intensive (Y6 focus, index 0)
 * - All content driven by comprehensive bootcampProgrammes array
 * - Type-safe props with TypeScript interfaces
 * - Updated Stripe URLs and pricing structure
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
// PROGRAMME DATA REASON: Official TypeScript patterns for readonly object literals with comprehensive programme information
const bootcampProgrammes = [
  {
    title: "11+ Intensive",
    duration: "5 Days", 
    target: "Perfect for students entering Y6 September 2025",
    description: "Our 11+ Intensive is the perfect runway for students sitting exams in autumn 2025. We tackle a different discipline each day: English, Maths, Verbal Reasoning, Non Verbal Reasoning and Interview Technique.",
    teaching: "This course will test children's existing knowledge - identifying weak spots for improvement - and challenge them with 'stretch' tasks, teaching them how to deal with even the toughest questions.",
    approach: "Taught by our 11+ specialists, this course will troubleshoot trickier topics and teach tips, tricks and shortcuts for scoring more marks. Particular focus will be paid to exam technique, with timed drills to ensure students walk into the exam feeling confident they can succeed.",
    assessment: "The course is sculpted around the major 11+ assessment boards - GL, CEM and ISEB - and uses real exam questions from more difficult papers to challenge even the brightest students without overwhelming them.",
    price: "£395",
    coursePack: "per 5-day course (including course pack with hundreds of questions)",
    availability: "",
    stripeUrl: "https://buy.stripe.com/6oUdR8enb9jF69u395new"
  },
  {
    title: "11+ Kickstarter",
    duration: "5 Days",
    target: "Perfect for students entering Y4 & 5 September 2025",
    description: "Our 11+ Kickstarter is a fun and thorough introduction to 11+ curriculum, ideal for students will little to no experience of entrance exams.",
    teaching: "The programme is led by our 11+ specialists. Both qualified teachers, our two experts will share their insider 11+ knowledge, gleaned from decades of coaching candidates and writing real entrance exam papers.",
    approach: "Each day they will familiarise students with a different discipline: English, Maths, Verbal Reasoning, Non Verbal Reasoning and Interview Technique. It's a brilliant opportunity for Year 4/5 students to lay the groundwork for future success.",
    assessment: "The course is sculpted around the major 11+ assessment boards - GL, CEM and ISEB - and uses real exam tasks to introduce students to common question types.",
    price: "£395", 
    coursePack: "per 5-day course (including course pack with hundreds of questions)",
    availability: "Spaces are strictly limited. Waiting lists will be in operation.",
    stripeUrl: "https://buy.stripe.com/7sYbJ0cf3brN69u395new"
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
  const programmeIndex = videoId === "intensiveProgramme" ? 0 : 1; // Intensive = index 0, Kickstarter = index 1
  const programme = bootcampProgrammes[programmeIndex];
  
  // CONTEXT7 SOURCE: /microsoft/typescript - Background image lookup with mapped object access
  // IMAGE LOOKUP REASON: Official TypeScript patterns for static asset mapping
  const backgroundImage = programmeBackgroundImages[videoId];
  const thumbnailImage = programmeThumbnailImages[videoId];

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Responsive flex layout with basis utilities
  // PATTERN VALIDATION: Official Tailwind CSS documentation demonstrates md:flex with basis-1/2 for 50/50 layouts
  const isTextLeft = layout === "text-left";
  const textAlignment = isTextLeft ? "" : "text-right";
  const badgeAlignment = isTextLeft ? "" : "justify-end";
  const flexDirection = isTextLeft ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse";
  const watchCirclePosition = isTextLeft ? "-right-24" : "-left-24";

  return (
    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Block-level flex container pattern
    // OPTIMAL STRUCTURE: Using flex instead of grid for cleaner 50/50 layout
    <div
      className={`relative flex ${flexDirection} items-center bg-cover bg-center bg-no-repeat ${className}`}
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Simple overlay pattern for text readability */}
      {/* OVERLAY SIMPLIFICATION: Using linear gradient for cleaner implementation */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flex basis responsive pattern */}
      {/* VIDEO SECTION: Using basis-full on mobile, basis-1/2 on desktop for 50% width */}
      <div className="relative z-10 flex basis-full md:basis-1/2 justify-center items-center p-8">
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

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flex basis responsive pattern */}
      {/* TEXT SECTION: Using basis-full on mobile, basis-1/2 on desktop for 50% width */}
      <div className={`relative z-10 flex flex-col basis-full md:basis-1/2 justify-center px-8 py-12 ${textAlignment}`}>
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Content vertical centering */}
        {/* HEADING: Properly centered content within flex container */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          {programme.title}
        </h2>
        
        {/* CONTEXT7 SOURCE: /websites/radix-ui-primitives - Separator component horizontal usage for visual content division */}
        {/* SEPARATOR REASON: Official Radix UI Separator documentation demonstrates horizontal separator after headings for content organization */}
        <Separator className="bg-gray-300 my-3" />
        
        {/* Target Audience */}
        <p className="text-white text-lg font-semibold mb-4">
          {programme.target}
        </p>
        
        <Separator className="bg-gray-300 my-4" />
        
        {/* Main Description */}
        <p className="text-white text-base leading-relaxed mb-4">
          {programme.description}
        </p>
        
        <Separator className="bg-gray-300 my-4" />
        
        {/* Teaching Approach */}
        <p className="text-white text-base leading-relaxed mb-4">
          {programme.teaching}
        </p>
        
        {/* Additional Approach Information */}
        <p className="text-white text-base leading-relaxed mb-4">
          {programme.approach}
        </p>
        
        <Separator className="bg-gray-300 my-4" />
        
        {/* Assessment Boards */}
        <p className="text-white text-base leading-relaxed mb-4">
          {programme.assessment}
        </p>
        
        <Separator className="bg-gray-300 my-4" />
        
        {/* Pricing Information */}
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
            {programme.price} {programme.coursePack}
          </a>
        </div>
        
        {/* Availability Notice (Only for Kickstarter) */}
        {programme.availability && (
          <>
            <Separator className="bg-gray-300 my-4" />
            <p className="text-white text-sm italic font-medium">
              {programme.availability}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default BootcampVideoSectionVersion;