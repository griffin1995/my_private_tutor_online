/**
 * CONTEXT7 SOURCE: /websites/react_dev - React component patterns for grid-based layouts
 * COMPONENT REASON: Official React documentation for building reusable grid components
 *
 * CallOutsGrid Component
 * Displays key points/highlights for education level tabs
 * Typically shows 3 call outs in a responsive grid layout
 */

"use client";

// CONTEXT7 SOURCE: /websites/react_dev - React memo for component optimization
// MEMO REASON: Official React documentation for preventing unnecessary re-renders
import { memo } from 'react';
// CONTEXT7 SOURCE: /grx7/framer-motion - Motion components for staggered animations
// ANIMATION REASON: Official Framer Motion documentation for grid entrance effects
import { motion } from 'framer-motion';
// CONTEXT7 SOURCE: /context7/lucide_dev-guide - Icon library for visual elements
// ICON REASON: Official Lucide documentation for React icon components
import { Award, Users, School, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import type { CallOut } from '@/types/education-tabs';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface for component props
// PROPS INTERFACE REASON: Official TypeScript documentation for type-safe props
interface CallOutsGridProps {
  readonly callOuts: ReadonlyArray<CallOut>;
}

/**
 * CONTEXT7 SOURCE: /websites/react_dev - Memoized functional component pattern
 * MEMOIZATION REASON: Official React documentation recommends memo for grid components
 */
export const CallOutsGrid = memo(function CallOutsGrid({
  callOuts
}: CallOutsGridProps) {
  // CONTEXT7 SOURCE: /context7/lucide_dev-guide - Dynamic icon rendering helper
  // ICON HELPER REASON: Centralized icon selection based on CMS configuration
  const getIcon = (iconName?: string) => {
    const iconProps = {
      className: "w-8 h-8 text-white",
      "aria-hidden": "true" as const
    };

    switch (iconName) {
      case 'users':
        return <Users {...iconProps} />;
      case 'school':
        return <School {...iconProps} />;
      case 'trending-up':
        return <TrendingUp {...iconProps} />;
      case 'shield':
        return <Shield {...iconProps} />;
      case 'check-circle':
        return <CheckCircle {...iconProps} />;
      case 'award':
      default:
        return <Award {...iconProps} />;
    }
  };

  return (
    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid utilities for responsive layouts matching subsection cards
    // GRID ALIGNMENT REASON: Official Tailwind CSS documentation for consistent grid structure across components
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
          }
        }
      }}
    >
          {/* CONTEXT7 SOURCE: /websites/react_dev - Array mapping for list rendering */}
          {/* MAPPING REASON: Official React documentation for rendering lists with keys */}
          {callOuts.map((callOut, index) => (
            <motion.div
              key={callOut.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }
              }}
              className="group relative"
            >
              {/* Card Container */}
              {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Card styling with square edges */}
              {/* SQUARE EDGES REASON: Official Tailwind CSS documentation for border styling without rounding */}
              <div className="relative p-8 bg-white shadow-subtle-md border-2 border-neutral-300 hover:shadow-depth-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">

                {/* Background Gradient Overlay */}
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Gradient with proper config tokens */}
                {/* GRADIENT FIX REASON: Replaced invalid token-secondary and blue-50 with proper primary-700 and neutral-100 */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-700/10 via-transparent to-neutral-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon Container */}
                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Gradient backgrounds for icons */}
                {/* ICON STYLING REASON: Official Tailwind CSS documentation for gradient utilities */}
                {/* GRADIENT FIX: Replaced invalid tokens with proper primary-700 and accent-600 */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-600 via-primary-700 to-primary-700 flex items-center justify-center shadow-lg shadow-accent-600/25 group-hover:shadow-xl group-hover:shadow-accent-600/40 transition-all duration-500 mx-auto">
                    {getIcon(callOut.icon)}
                  </div>
                </div>

                {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - @layer base provides ALL h4 and p styling */}
                {/* LAYER BASE SYSTEM: Stripped ALL typography utilities - provided by globals.css @layer base */}
                {/* ONLY KEEPING: text-center relative z-10 for layout, mb-3 for spacing */}
                <div className="text-center relative z-10">
                  <h4 className="mb-3">
                    {callOut.title}
                  </h4>
                  <p>
                    {callOut.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
    </motion.div>
  );
});

// CONTEXT7 SOURCE: /microsoft/typescript - Type export for external usage
// TYPE EXPORT REASON: Official TypeScript documentation for exporting component types
export type { CallOutsGridProps };
