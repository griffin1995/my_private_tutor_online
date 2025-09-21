/**
 * CONTEXT7 SOURCE: /facebook/react - Component extraction for performance optimization
 * EXTRACTION REASON: Official React documentation recommends component separation for bundle optimization
 * PHASE 2 OPTIMIZATION: Extract heavy inline Three Pillars section for dynamic loading
 *
 * Three Pillars Section - Academic Achievement Showcase
 * Displays key performance metrics in card format
 * Optimized for lazy loading and improved LCP
 *
 * PERFORMANCE BENEFITS:
 * - Reduced main bundle size through code splitting
 * - Image optimization with Next.js Image component
 * - Layout preservation during loading
 * - Ultra-lazy loading (client-side only)
 */

"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

// CONTEXT7 SOURCE: /facebook/react - Component props interface for type safety
// TYPE SAFETY REASON: Official React documentation requires proper prop typing
interface ThreePillarsSectionProps {
  className?: string;
  showImages?: boolean;
}

// CONTEXT7 SOURCE: /facebook/react - Data structure for pillar content
// DATA STRUCTURE REASON: Official React patterns for component data organization
interface PillarData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  stats: string[];
}

// CONTEXT7 SOURCE: /facebook/react - Static data for Three Pillars content
// STATIC DATA REASON: Official React documentation shows component-level data for performance
const pillarsData: PillarData[] = [
  {
    id: "pillar-1",
    title: "95% pass rate",
    subtitle: "11+ Grammar & Independent School Success",
    description:
      "Students achieving offers from at least one of their first choice schools, including Eton, St Paul's, Westminster, Highgate, Queen Elizabeth's, NLCS, Henrietta Barnett, Wilson's and more.",
    imageUrl: "/images/graphics/stat-pass-rate-new.jpg",
    imageAlt: "Royal endorsement and school success",
    stats: ["• Recent application cycles"],
  },
  {
    id: "pillar-2",
    title: "94% 2+ grade growth",
    subtitle: "GCSE Grade Growth",
    description:
      "Our GCSE students consistently improve by two or more full levels during their time with us.",
    imageUrl: "/images/graphics/stat-grade-improvement-new.jpg",
    imageAlt: "Exam insights and grade improvement",
    stats: ["• Long-term tracking across multiple academic years"],
  },
  {
    id: "pillar-3",
    title: "Top 2% of test takers",
    subtitle: "Top 2% Test Performance",
    description:
      "From 7+ entrance all the way through to A Levels, our tutees frequently score in the top 2% of candidates. For example, one of our current students obtained the highest GCSE Science score in all of Asia.",
    imageUrl: "/images/graphics/stat-top-performers-new.jpg",
    imageAlt: "Trust and exceptional test performance",
    stats: ["• Recent examination cycles"],
  },
];

// CONTEXT7 SOURCE: /facebook/react - Main component with performance optimizations
// PERFORMANCE REASON: Official React documentation for optimized rendering patterns
export const ThreePillarsSection: React.FC<ThreePillarsSectionProps> = ({
  className = "",
  showImages = true,
}) => {
  return (
    // CONTEXT7 SOURCE: /inikulin/parse5 - HTML5 semantic section elements proper usage
    // SEMANTIC FIX REASON: Official HTML5 specification shows section elements should have semantic meaning, not be used solely for styling
    // Converting inner section to div to avoid double section nesting - outer section provides semantic meaning, inner div provides styling container
    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Padding directional utilities for top-only spacing
    // PADDING OPTIMIZATION REASON: Official Tailwind CSS documentation shows pt-<number> utilities for top padding only, removing bottom padding for About page layout optimization
    <div className={`pt-16 lg:pt-24 bg-white ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Responsive grid layout */}
        {/* GRID LAYOUT REASON: Official Tailwind CSS documentation for responsive card layouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {pillarsData.map((pillar) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              showImage={showImages}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// CONTEXT7 SOURCE: /facebook/react - Individual pillar card component
// CARD COMPONENT REASON: Official React documentation for component composition patterns
interface PillarCardProps {
  pillar: PillarData;
  showImage: boolean;
}

const PillarCard: React.FC<PillarCardProps> = ({ pillar, showImage }) => {
  return (
    <div className="group">
      <div className="bg-white shadow-lg overflow-hidden">
        <div className="relative">
          {/* CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component for optimization */}
          {/* IMAGE OPTIMIZATION REASON: Official Next.js documentation for performance */}
          {showImage && (
            <div style={{ aspectRatio: "2/3" }}>
              <Image
                src={pillar.imageUrl}
                alt={pillar.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={false} // Below-fold content
                loading="lazy"
              />
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Content */}
          <div className="absolute inset-0 p-8 pt-32 flex flex-col justify-end">
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss - Typography hierarchy */}
            {/* TYPOGRAPHY REASON: Official Tailwind CSS documentation for text scaling */}
            <h1 className="text-4xl font-bold text-white mb-2">
              {pillar.title}
            </h1>

            <h2 className="text-xl text-white/90 mb-4">{pillar.subtitle}</h2>

            {/* CONTEXT7 SOURCE: /radix-ui/primitives - Separator component for visual division */}
            {/* SEPARATOR REASON: Official Radix UI documentation for horizontal separator */}
            <Separator className="bg-white/30 mb-4" />

            <p className="text-white text-lg mb-4">{pillar.description}</p>

            {/* Stats */}
            <ul className="text-white text-base">
              {pillar.stats.map((stat, index) => (
                <li key={index} className="text-white">
                  {stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// CONTEXT7 SOURCE: /facebook/react - Component memoization for performance
// MEMOIZATION REASON: Official React documentation for preventing unnecessary re-renders
export const MemoizedThreePillarsSection = React.memo(ThreePillarsSection);

// Export both versions for flexibility
export default ThreePillarsSection;
