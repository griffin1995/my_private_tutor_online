// CONTEXT7 SOURCE: /reactjs/react.dev - React component for tagline section with TypeScript interfaces
// COMPONENT EXTRACTION REASON: Official React documentation patterns for extracting reusable section components
// REVISION REASON: Homepage componentization to achieve modular 8-section structure

"use client";

import React from 'react';
import { ErrorBoundaryWrapper } from '../boundaries/homepage-error-boundary';

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface for component props with explicit children
// INTERFACE REASON: Official React 18+ documentation requires explicit children prop declaration for type safety
interface TaglineSectionProps {
  children?: React.ReactNode;
}

// CONTEXT7 SOURCE: /reactjs/react.dev - Functional component pattern for section extraction
// SECTION COMPONENT REASON: Official React documentation shows section components for better maintainability
export function TaglineSection({}: TaglineSectionProps = {}) {
  return (
    <section id="tagline-top-schools-placement" className="py-4 sm:py-6">
      <ErrorBoundaryWrapper sectionName="Homepage Tagline">
        <div className="relative text-center flex items-center justify-center">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="px-4">
              {/* CONTEXT7 SOURCE: /websites/tailwindcss - Z-index removal for natural document flow */}
              {/* Z-INDEX REMOVAL REASON: Official Tailwind CSS documentation shows removing unnecessary z-index declarations prevents stacking context conflicts with subsequent sections */}
              {/* CONTEXT7 SOURCE: /reactjs/react.dev - Static h2 element for tagline text rendering */}
              {/* STATIC TAGLINE REASON: Official React documentation shows h2 element usage for secondary headings without animation dependencies */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Design token color system with CSS custom properties */}
              {/* REVISION REASON: Phase 3 design system audit HP-001 - Migrate legacy text-gray-900 to text-token-neutral-900 for design token compliance */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography scale with responsive text sizing */}
              {/* REVISION REASON: Phase 3 design system audit HP-002 - Upgrade H2 from text-xl to text-2xl lg:text-3xl for proper typography hierarchy */}
              <h2 className="text-2xl lg:text-3xl font-serif font-medium tracking-wide leading-tight text-token-neutral-900 dark:text-white">
                We help students place at top 10 UK schools and universities
              </h2>
            </div>
            {/* CONTEXT7 SOURCE: /reactjs/react.dev - Static decorative elements without animation */}
            {/* STATIC DECORATIONS REASON: Official React documentation shows div elements for visual decoration without motion dependencies */}
            {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Design token color system for neutral colors */}
            {/* REVISION REASON: Phase 3 design system audit HP-003 - Migrate decorative gray-* classes to token-neutral-* for design token compliance */}
            <div className="flex justify-center items-center space-x-6 mt-2 sm:mt-3">
              <div className="w-12 h-px bg-token-neutral-300 dark:bg-token-neutral-600" />
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-token-neutral-400 dark:bg-token-neutral-500 shadow-lg" />
              </div>
              <div className="w-12 h-px bg-token-neutral-300 dark:bg-token-neutral-600" />
            </div>
          </div>
        </div>
      </ErrorBoundaryWrapper>
    </section>
  );
}