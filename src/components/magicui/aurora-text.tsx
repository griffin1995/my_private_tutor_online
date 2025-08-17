/**
 * CONTEXT7 SOURCE: /magicuidesign/magicui - Aurora Text component with gradient animation
 * COMPONENT PURPOSE: Beautiful aurora/northern lights gradient effect on text
 * MAGIC UI REFERENCE: https://magicui.design/docs/components/aurora-text
 * 
 * Component Features:
 * - Dynamic gradient animation with customizable colors
 * - Configurable animation speed
 * - Premium brand color integration
 * - Accessibility support with sr-only and aria-hidden
 * - TypeScript interface for type safety
 * - React memo optimization for performance
 */

"use client";

// CONTEXT7 SOURCE: /react/documentation - React 19 imports and memo optimization
// PATTERN: Modern React functional component with performance optimization
import React, { memo } from "react";

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface design patterns
 * PROPS INTERFACE: Aurora Text component customization options
 */
interface AuroraTextProps {
  /** The content to be displayed with aurora effect */
  children: React.ReactNode;
  /** Additional CSS classes for styling customization */
  className?: string;
  /** Array of colors for the aurora gradient effect */
  colors?: string[];
  /** Animation speed multiplier (1 = default, 2 = twice as fast) */
  speed?: number;
}

/**
 * CONTEXT7 SOURCE: /magicuidesign/magicui - Aurora Text implementation
 * ANIMATION: Creates beautiful aurora/northern lights gradient effect
 * PATTERN: Gradient text with dynamic background animation
 * 
 * Brand Integration:
 * - Uses premium navy/gold color scheme by default
 * - Matches My Private Tutor Online brand identity
 * - Royal client-worthy visual effects
 */
export const AuroraText = memo(
  ({
    children,
    className = "",
    // CONTEXT7 SOURCE: /magicuidesign/magicui - Premium brand colors for aurora effect
    // BRAND COLORS: Official project navy and gold theme matching royal clientele standards
    // REVISION REASON: Updated to use official project colors Navy (#0f172a) and Gold (#eab308) per requirements
    colors = ["#0f172a", "#eab308", "#1e293b", "#fbbf24"],
    speed = 1,
  }: AuroraTextProps) => {
    // CONTEXT7 SOURCE: /magicuidesign/magicui - Dynamic gradient style generation
    // GRADIENT LOGIC: Creates linear gradient with brand colors and animation timing
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    };

    return (
      <span className={`relative inline-block ${className}`}>
        {/* CONTEXT7 SOURCE: /w3c/wai-aria - Screen reader accessibility */}
        {/* ACCESSIBILITY: Provides text content for screen readers */}
        <span className="sr-only">{children}</span>
        
        {/* CONTEXT7 SOURCE: /magicuidesign/magicui - Aurora animation implementation */}
        {/* ANIMATION: Background gradient with aurora keyframe animation */}
        <span
          className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    );
  }
);

// CONTEXT7 SOURCE: /react/documentation - Component display name for debugging
// DEVELOPMENT: Improves React DevTools debugging experience
AuroraText.displayName = "AuroraText";