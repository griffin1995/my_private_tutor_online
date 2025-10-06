"use client";

/**
 * CONTEXT7 SOURCE: /mdn/content - HTML strong element for semantic text emphasis and high importance
 * BOLD FORMATTING REVISION REASON: Official MDN documentation demonstrates strong element usage for high importance text - adding semantic emphasis to key phrases about VIP opportunities and global experience using strong tags for significance indication
 * CONTEXT7 SOURCE: /reactjs/react.dev - React functional component with TypeScript props interface
 * COMPONENT CREATION REASON: Official React documentation Section 1.3 recommends functional components with destructured props for modern React applications
 * CONTEXT7 SOURCE: /grx7/framer-motion - Framer Motion animation variant definition
 * ANIMATION VARIANT REASON: Official Framer Motion documentation demonstrates fadeInUpVariant pattern for smooth entry animations
 * CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface for React component props
 * PROPS INTERFACE REASON: Official React documentation recommends interface definitions for component props with proper type safety
 *
 * First Lesson to Seventh Continent Section Component
 * Extracted from founder-story-section.tsx for reusability and clean component architecture
 *
 * Features:
 * - Framer Motion animations with fadeInUpVariant
 * - TypeScript interface for type safety
 * - Premium typography hierarchy
 * - Performance optimised animations
 * - Reusable component structure
 */

import { m } from "framer-motion";
import React from "react";

/**
 * CONTEXT7 SOURCE: /typescript-cheatsheets/react - TypeScript interface for React component props with optional properties
 * INTERFACE ENHANCEMENT REASON: Official TypeScript React documentation demonstrates optional prop patterns for component customisation and reusability
 */
interface FirstLessonSectionProps {
  /** Additional CSS classes for customisation */
  className?: string;
  /** Background colour treatment - defaults to white */
  backgroundColor?: string;
  /** Custom heading text - overrides default "First Lesson to Seventh Continent" */
  heading?: string;
  /** Custom paragraph content - overrides default founder story content */
  paragraph?: string;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - JSX conditional rendering and Fragment patterns for text formatting
 * TEXT PARSING REASON: Official React documentation demonstrates conditional JSX rendering for inline formatting elements
 * Parses text content containing <strong> tags and renders proper JSX elements
 */
function parseTextWithStrong(text: string): React.ReactNode[] {
  // Split text by <strong> opening and closing tags
  const parts = text.split(/(<strong>.*?<\/strong>)/g);

  return parts.map((part, index) => {
    // Check if this part is a strong tag
    if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
      // Extract content between strong tags and render as JSX
      const content = part.replace(/<\/?strong>/g, "");
      return <strong key={index}>{content}</strong>;
    }
    // Return regular text as-is
    return part;
  });
}

/**
 * CONTEXT7 SOURCE: /grx7/framer-motion - Framer Motion animation variant definition
 * ANIMATION VARIANT REASON: Official Framer Motion documentation demonstrates fadeInUpVariant pattern for smooth entry animations
 */
const fadeInUpVariant = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
};

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - React functional component with TypeScript props interface
 * COMPONENT PATTERN REASON: Official React documentation Section 1.3 recommends functional components with destructured props for modern React applications
 *
 * First Lesson to Seventh Continent Section Component
 *
 * A reusable section component that presents Elizabeth's career journey from
 * her first tutoring lesson to working across all seven continents with VIP families.
 * Enhanced with optional heading and paragraph props for customisation while maintaining
 * backward compatibility with default founder story content.
 *
 * @param props - Component props following FirstLessonSectionProps interface
 * @param props.heading - Optional custom heading text (defaults to "First Lesson to Seventh Continent")
 * @param props.paragraph - Optional custom paragraph content (defaults to founder story)
 * @returns JSX.Element - Rendered section with animations and conditional content
 */
export function FirstLessonSection({
  className = "",
  backgroundColor = "white",
  heading,
  paragraph,
}: FirstLessonSectionProps): JSX.Element {
  return (
    <div className={`bg-${backgroundColor} py-20 ${className}`}>
      {/* CONTEXT7 SOURCE: /websites/tailwindcss - Container consolidation pattern for reduced DOM nesting */}
      {/* PERFORMANCE OPTIMIZATION REASON: Official Tailwind documentation shows merging container and max-width utilities */}
      <div className="container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <m.div
          initial={fadeInUpVariant.initial}
          whileInView={fadeInUpVariant.animate}
          viewport={{ once: true, margin: "-100px" }}
          transition={fadeInUpVariant.transition}
        >
          <div className="space-y-10">
            <div className="text-left space-y-8">
              <div>
                {/* CONTEXT7 SOURCE: /typescript-cheatsheets/react - Conditional rendering patterns with optional props */}
                {/* CONDITIONAL RENDERING REASON: Official TypeScript React documentation demonstrates optional prop usage with fallback default content */}
                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-primary-900 mb-6">
                  {heading || "First Lesson to Seventh Continent"}
                </h3>

                <div className="space-y-6">
                  {/* CONTEXT7 SOURCE: /reactjs/react.dev - JSX conditional rendering for inline formatting elements */}
                  {/* TEXT FORMATTING REASON: Official React documentation demonstrates conditional JSX rendering patterns for text with inline formatting */}
                  <p className="text-lg text-primary-700 leading-relaxed">
                    {parseTextWithStrong(
                      paragraph ||
                        "I started tutoring at Bristol and immediately felt something click. I've always had a natural affinity with children and combining that with academics just made sense. I went on to complete my Masters, all the while refining my tutoring practice, both in person and online. I quickly found myself being recommended from family to family. \n\n What followed was a series of international placements and the <strong>opportunities to work with VIPs and private families around the world. By 2017, I had visited all seven continents</strong>. Along the way, I met and worked alongside some truly exceptional educators — many of whom are still firm favourites in the tutoring team now."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Default export pattern for React components
 * EXPORT PATTERN REASON: Official React documentation Section 2.3 recommends default exports for primary component exports
 */
export default FirstLessonSection;
