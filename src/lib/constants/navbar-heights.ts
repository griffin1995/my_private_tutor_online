/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Constants and type definitions for enterprise-grade applications
 * CONSTANTS_ARCHITECTURE_REASON: Official TypeScript documentation patterns for centralized constant management
 * CONTEXT7 SOURCE: /websites/tailwindcss - CSS custom properties and responsive design patterns
 * RESPONSIVE_DESIGN_REASON: Official Tailwind CSS documentation for responsive breakpoint calculations
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Type-safe constant object with readonly properties
// TYPE_SAFETY_REASON: Official TypeScript documentation for creating immutable constant definitions
export const NAVBAR_HEIGHTS = {
  mobile: '5.5rem',   // 88px - base mobile navbar height
  tablet: '6.25rem',  // 100px - large screens breakpoint
  desktop: '7rem'     // 112px - extra large screens breakpoint
} as const;

// CONTEXT7 SOURCE: /microsoft/typescript - Keyof type operator for type-safe key access
// TYPE_EXTRACTION_REASON: Official TypeScript documentation for extracting keys from const assertions
export type NavbarHeightKey = keyof typeof NAVBAR_HEIGHTS;

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Template literal types for CSS calc expressions
 * TEMPLATE_LITERAL_TYPES_REASON: Official TypeScript documentation for type-safe string template construction
 */
export type ViewportCalcExpression = `h-[calc(100${ViewportUnit}-${string})]`;

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic viewport units (dvh) for accurate viewport height
 * DYNAMIC_VIEWPORT_REASON: Official Tailwind CSS documentation Section 3.4+ shows dvh units adapt to browser UI changes
 * BROWSER_FALLBACK_REASON: Progressive enhancement with vh fallback for older browser compatibility
 *
 * Utility function for calculating remaining viewport height after navbar using dynamic viewport units
 * Returns responsive className string with browser fallbacks and dvh support
 */
export const calculateRemainingViewport = (): string => {
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Progressive enhancement with fallback patterns
  // PROGRESSIVE_ENHANCEMENT_REASON: Official Tailwind CSS documentation for browser compatibility strategies
  //
  // BROWSER SUPPORT STRATEGY:
  // 1. vh fallback for older browsers (iOS Safari < 15.4, Chrome < 108)
  // 2. dvh units for modern browsers with dynamic viewport support
  // 3. Tailwind CSS 3.4+ native support for dvh utilities
  //
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - CSS custom properties for multiple value declarations
  // FALLBACK_IMPLEMENTATION_REASON: Official CSS documentation shows multiple value declarations for progressive enhancement
  return [
    // Legacy viewport height fallback
    `h-[calc(100vh-${NAVBAR_HEIGHTS.mobile})]`,
    `lg:h-[calc(100vh-${NAVBAR_HEIGHTS.tablet})]`,
    `xl:h-[calc(100vh-${NAVBAR_HEIGHTS.desktop})]`,
    // Modern dynamic viewport height (overrides fallback when supported)
    `h-[calc(100dvh-${NAVBAR_HEIGHTS.mobile})]`,
    `lg:h-[calc(100dvh-${NAVBAR_HEIGHTS.tablet})]`,
    `xl:h-[calc(100dvh-${NAVBAR_HEIGHTS.desktop})]`
  ].join(' ');
};

/**
 * CONTEXT7 SOURCE: /websites/tailwindcss - Margin utilities for proper section spacing
 * MARGIN_CLEARANCE_REASON: Official Tailwind CSS documentation for margin-top spacing calculations
 *
 * Utility function for margin-top clearance to position content after fixed navbar
 * Returns responsive className string for proper navbar clearance
 */
export const getNavbarClearance = (): string => {
  // CONTEXT7 SOURCE: /websites/tailwindcss - Margin utilities with responsive breakpoints
  // SPACING_UTILITIES_REASON: Official Tailwind CSS documentation for responsive margin calculations
  return `mt-[${NAVBAR_HEIGHTS.mobile}] lg:mt-[${NAVBAR_HEIGHTS.tablet}] xl:mt-[${NAVBAR_HEIGHTS.desktop}]`;
};

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic viewport units with clearance positioning
 * DVH_INTEGRATION_REASON: Official Tailwind CSS documentation Section 3.4+ for mobile-first responsive design
 * CSS_VARIABLES_REASON: Official Tailwind CSS documentation for dynamic styling with CSS variables
 *
 * Utility function for combined dynamic viewport and clearance classes
 * Returns complete className string for full section positioning with mobile browser compatibility
 */
export const getFullSectionClasses = (): string => {
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Overflow handling with dynamic viewport units
  // VIEWPORT_OVERFLOW_FIX_REASON: Dynamic viewport units with overflow-hidden prevent mobile browser scroll issues
  return `w-full ${calculateRemainingViewport()} ${getNavbarClearance()} flex flex-col overflow-hidden`;
};

/**
 * CONTEXT7 SOURCE: /websites/tailwindcss - Height utilities for spacer elements
 * SPACER_ELEMENT_REASON: Official Tailwind CSS documentation for fixed header layout spacing patterns
 *
 * Utility function for navbar spacer div height
 * Returns responsive className string matching navbar height for content positioning
 */
export const getNavbarSpacerHeight = (): string => {
  // CONTEXT7 SOURCE: /websites/tailwindcss - Height utilities with responsive breakpoints
  // SPACER_HEIGHT_REASON: Official Tailwind CSS documentation for consistent spacing with fixed headers
  return `h-[${NAVBAR_HEIGHTS.mobile}] lg:h-[${NAVBAR_HEIGHTS.tablet}] xl:h-[${NAVBAR_HEIGHTS.desktop}]`;
};

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic viewport units for mobile-optimized hero sections
 * MOBILE_VIEWPORT_FIX_REASON: Official Tailwind CSS documentation shows dvh units prevent mobile browser UI overflow issues
 * SPACER_LAYOUT_REASON: Official Tailwind CSS documentation for clean sequential positioning after spacer elements
 *
 * Utility function for hero section classes when using spacer div approach with dynamic viewport support
 * Returns section classes with dvh units and browser fallbacks, without margin-top clearance (handled by spacer div)
 */
export const getHeroSectionClasses = (): string => {
  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Flexbox layout with dynamic viewport height calculations
  // MOBILE_OPTIMIZATION_REASON: Dynamic viewport units solve iOS Safari address bar and Android keyboard overlay issues
  return `w-full ${calculateRemainingViewport()} flex flex-col overflow-hidden`;
};

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Type-safe getter functions for constant access
 * ACCESSOR_FUNCTIONS_REASON: Official TypeScript documentation for functional constant access patterns
 *
 * Get specific navbar height by breakpoint key
 * @param key - The breakpoint key (mobile, tablet, desktop)
 * @returns The navbar height value for the specified breakpoint
 */
export const getNavbarHeight = (key: NavbarHeightKey): string => {
  return NAVBAR_HEIGHTS[key];
};

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Object.entries with type safety for iteration
 * OBJECT_ITERATION_REASON: Official TypeScript documentation for type-safe object iteration
 *
 * Get all navbar heights as an array of [key, value] tuples
 * @returns Array of navbar height entries for programmatic access
 */
export const getNavbarHeightEntries = (): Array<[NavbarHeightKey, string]> => {
  return Object.entries(NAVBAR_HEIGHTS) as Array<[NavbarHeightKey, string]>;
};

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - String literal union types for viewport unit variants
 * TYPE_SAFETY_REASON: Official TypeScript documentation for creating type-safe viewport unit options
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dynamic viewport unit types for CSS compatibility
 * VIEWPORT_UNIT_TYPES_REASON: Official Tailwind CSS documentation Section 3.4+ defines viewport unit variants
 */
export type ViewportUnit = 'vh' | 'dvh' | 'lvh' | 'svh';

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Viewport unit utility function with fallback support
 * VIEWPORT_CALCULATION_FLEXIBILITY_REASON: Official Tailwind CSS documentation enables custom viewport unit selection
 * BROWSER_COMPATIBILITY_REASON: Support for different viewport units based on browser capabilities
 *
 * Advanced utility function for calculating remaining viewport height with custom unit selection
 * @param unit - The viewport unit to use (vh, dvh, lvh, svh)
 * @param includeFallback - Whether to include vh fallback for dvh/lvh/svh units
 * @returns Responsive className string with specified viewport unit
 */
export const calculateRemainingViewportWithUnit = (
  unit: ViewportUnit = 'dvh',
  includeFallback: boolean = true
): string => {
  // CONTEXT7 SOURCE: /microsoft/typescript - Conditional logic with type-safe string literal unions
  // TYPE_SAFETY_REASON: Official TypeScript documentation for exhaustive conditional checks
  const baseClasses = [
    `h-[calc(100${unit}-${NAVBAR_HEIGHTS.mobile})]`,
    `lg:h-[calc(100${unit}-${NAVBAR_HEIGHTS.tablet})]`,
    `xl:h-[calc(100${unit}-${NAVBAR_HEIGHTS.desktop})]`
  ];

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Progressive enhancement patterns
  // FALLBACK_STRATEGY_REASON: Official Tailwind CSS documentation for browser compatibility implementation
  if (includeFallback && (unit === 'dvh' || unit === 'lvh' || unit === 'svh')) {
    const fallbackClasses = [
      `h-[calc(100vh-${NAVBAR_HEIGHTS.mobile})]`,
      `lg:h-[calc(100vh-${NAVBAR_HEIGHTS.tablet})]`,
      `xl:h-[calc(100vh-${NAVBAR_HEIGHTS.desktop})]`
    ];
    return [...fallbackClasses, ...baseClasses].join(' ');
  }

  return baseClasses.join(' ');
};

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Browser feature detection for dynamic viewport units
 * FEATURE_DETECTION_REASON: Official CSS documentation patterns for progressive enhancement
 * JAVASCRIPT_COMPATIBILITY_REASON: Runtime browser support detection for optimal viewport unit selection
 *
 * Utility function to detect browser support for dynamic viewport units
 * @returns Boolean indicating dvh support availability
 */
export const supportsDynamicViewport = (): boolean => {
  // CONTEXT7 SOURCE: /microsoft/typescript - Type guards and runtime feature detection
  // RUNTIME_SAFETY_REASON: Official TypeScript documentation for safe DOM API access
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false; // SSR environment - assume no support for safety
  }

  try {
    // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - CSS.supports API for feature detection
    // FEATURE_DETECTION_IMPLEMENTATION_REASON: Official Web APIs documentation for CSS feature queries
    return CSS.supports('height', '100dvh');
  } catch (error) {
    // Fallback for browsers without CSS.supports
    return false;
  }
};

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Adaptive viewport calculation with runtime detection
 * ADAPTIVE_ENHANCEMENT_REASON: Official Tailwind CSS documentation for responsive design with feature detection
 *
 * Smart utility function that automatically selects the best viewport unit based on browser support
 * @returns Responsive className string with optimal viewport unit for current browser
 */
export const calculateAdaptiveViewport = (): string => {
  // CONTEXT7 SOURCE: /microsoft/typescript - Conditional logic based on runtime feature detection
  // RUNTIME_ADAPTATION_REASON: Official TypeScript documentation for dynamic behavior based on environment capabilities
  const useDvh = supportsDynamicViewport();
  return useDvh
    ? calculateRemainingViewportWithUnit('dvh', true)
    : calculateRemainingViewportWithUnit('vh', false);
};