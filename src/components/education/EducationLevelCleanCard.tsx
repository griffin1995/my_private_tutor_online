/**
 * Education Level Clean Card Component
 * CONTEXT7 SOURCE: /websites/react_dev - React memo pattern for optimized component rendering
 * COMPONENT CREATION REASON: Official React documentation demonstrates memo wrapping for performance optimization
 *
 * CONTEXT7 SOURCE: /grx7/framer-motion - Motion component animations with initial, animate, and transition
 * ANIMATION REASON: Official Framer Motion documentation for clean card entrance animations
 *
 * CONTEXT7 SOURCE: /radix-ui/website - Separator component for visual content division
 * SEPARATOR REASON: Official Radix UI documentation for horizontal separators in content organization
 *
 * Pattern: Brand-Compliant Clean Card Component for Education Level Display
 * Architecture:
 * - Uses established design token system (token-primary, token-secondary, token-neutral)
 * - Royal client typography standards (Playfair Display headings, Source Serif 4 body)
 * - Clean magazine aesthetic matching homepage redesign
 * - Scannable layout with clear visual hierarchy
 * - Performance optimized with React memo
 *
 * Design Features:
 * - White background with subtle borders (token-ui-border)
 * - Professional shadow system (shadow-subtle-md to shadow-depth-md)
 * - Clean bullet points with token-secondary accent
 * - Brand-compliant CTA button with token-primary colors
 * - Smooth entrance animations via Framer Motion
 * - Optional image/icon support
 *
 * Brand Compliance:
 * - Follows DESIGN-SYSTEM.md royal client standards
 * - Uses DESIGN_TOKEN_QUICK_REFERENCE.md token patterns
 * - Matches Premium Design Patterns clean aesthetic
 * - WCAG 2.1 AA accessibility compliant
 */

"use client"

// CONTEXT7 SOURCE: /websites/react_dev - React memo for component optimization
// PERFORMANCE REASON: Official React documentation pattern for preventing unnecessary re-renders
import { memo } from 'react';

// CONTEXT7 SOURCE: /grx7/framer-motion - Motion component for animations
// ANIMATION REASON: Official Framer Motion documentation for declarative animations
import { motion } from 'framer-motion';

// CONTEXT7 SOURCE: /radix-ui/website - Separator component for visual division
// SEPARATOR REASON: Official Radix UI documentation for content separation
import { Separator } from "@/components/ui/separator";

// Next.js Image for optimized image loading
import Image from 'next/image';

// Icon for checkmarks - using Lucide React
import { CheckCircle } from 'lucide-react';

// CONTEXT7 SOURCE: /microsoft/typescript - Strict TypeScript interface definitions
// TYPE SAFETY REASON: Official TypeScript handbook for proper type definitions
interface EducationLevelCleanCardProps {
  readonly title: string;
  readonly description: string;
  readonly bulletPoints: readonly string[];
  readonly imageSrc?: string;
  readonly imageAlt?: string;
  readonly ctaLabel: string;
  readonly ctaAction: () => void;
  readonly className?: string;
}

// CONTEXT7 SOURCE: /websites/react_dev - React.memo for memoized functional component
// PERFORMANCE OPTIMIZATION REASON: Official React documentation demonstrates memo wrapping pattern
const EducationLevelCleanCardComponent = memo(function EducationLevelCleanCard({
  title,
  description,
  bulletPoints,
  imageSrc,
  imageAlt,
  ctaLabel,
  ctaAction,
  className = ""
}: EducationLevelCleanCardProps) {
  return (
    // CONTEXT7 SOURCE: /grx7/framer-motion - Motion.div with initial, animate, transition properties
    // ANIMATION IMPLEMENTATION REASON: Official Framer Motion documentation for entrance animations
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`bg-white border-2 border-token-ui-border rounded-xl p-8
                  shadow-subtle-md hover:shadow-depth-md transition-all duration-300 ${className}`}
    >
      {/* Optional Icon/Image */}
      {imageSrc && (
        <div className="mb-6">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
        </div>
      )}

      {/* Title - Playfair Display (Royal Standard) */}
      {/* DESIGN SYSTEM COMPLIANCE: DESIGN-SYSTEM.md mandates font-heading for all headings */}
      <h3 className="font-heading text-2xl font-bold text-token-primary-dark mb-4">
        {title}
      </h3>

      {/* Description - Source Serif 4 (Royal Standard) */}
      {/* DESIGN SYSTEM COMPLIANCE: DESIGN-SYSTEM.md mandates font-body for all body text */}
      <p className="font-body text-base text-token-neutral-700 leading-relaxed mb-6">
        {description}
      </p>

      {/* Clean Separator */}
      {/* CONTEXT7 SOURCE: /radix-ui/website - Separator component for visual content division */}
      {/* SEPARATOR USAGE REASON: Official Radix UI documentation demonstrates horizontal separator pattern */}
      <Separator className="bg-token-ui-border my-4" />

      {/* Bullet Points with Brand Colors */}
      <ul className="space-y-3 mb-6">
        {bulletPoints.map((point, idx) => (
          <li key={idx} className="flex items-start gap-3">
            {/* DESIGN TOKEN COMPLIANCE: Using token-secondary for accent elements */}
            <CheckCircle className="w-5 h-5 text-token-secondary flex-shrink-0 mt-0.5" />
            <span className="font-body text-token-neutral-800">{point}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button with Brand Colors */}
      {/* DESIGN TOKEN COMPLIANCE: Using token-primary for primary actions per DESIGN_TOKEN_QUICK_REFERENCE.md */}
      <button
        onClick={ctaAction}
        className="w-full bg-token-primary hover:bg-token-primary-dark
                   text-white font-semibold py-3 px-6 rounded-lg
                   transition-colors duration-200 shadow-primary-subtle hover:shadow-primary-depth"
      >
        {ctaLabel}
      </button>
    </motion.div>
  );
});

// Set display name for debugging
EducationLevelCleanCardComponent.displayName = 'EducationLevelCleanCard';

// CONTEXT7 SOURCE: /websites/react_dev - Export memoized component for optimal performance
// EXPORT REASON: Official React documentation recommends exporting memoized component
export const EducationLevelCleanCard = EducationLevelCleanCardComponent;
export default EducationLevelCleanCard;
