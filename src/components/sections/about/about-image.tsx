/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for founder image display
 * COMPONENT EXTRACTION REASON: Official React documentation shows separating complex UI elements for better testability
 * PATTERN: Reusable founder image component with responsive animations and magnetic interactions
 * MODIFICATION: Credentials section removed (Tatler, School Guide UK, Royal Clientele badges) per requirements
 */

"use client";

import { m } from "framer-motion";
import Image from "next/image";

// CONTEXT7 SOURCE: /vercel/next.js - Import cached data access functions
// DATA CACHING INTEGRATION: Official Next.js documentation shows importing cached functions for optimized data access
import { getAboutContent, getAboutPerformanceConfig } from '@/lib/about-data';

// CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring integration for image loading tracking
// PERFORMANCE TRACKING: Official Next.js documentation shows monitoring image loading performance
import { useAboutSectionPerformance } from '@/lib/performance/about-monitoring';

// CONTEXT7 SOURCE: /vercel/next.js - Image optimization utilities for responsive sizing and performance
// IMAGE OPTIMIZATION INTEGRATION: Official Next.js documentation shows using optimization utilities for responsive images
import {
  generateResponsiveSizes,
  getOptimalQuality,
  generateOptimizedAltText,
  getOptimalLoadingStrategy,
  generateBlurDataURL
} from '@/lib/image-optimization';

// CONTEXT7 SOURCE: /reactjs/react.dev - Enhanced animation hook integration for micro-interactions
// ENHANCED ANIMATIONS: Official React documentation shows integrating custom hooks for animation management
import { useEnhancedAnimations } from '@/lib/hooks/useEnhancedAnimations';

// CONTEXT7 SOURCE: /framer/motion - Magnetic interaction effects for enhanced user experience
// MAGNETIC INTERACTIONS: Official Framer Motion documentation shows implementing magnetic cursor effects
import { createMagneticEffect, createScrollVariants } from '@/lib/animations/micro-interactions';

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript interface patterns for flexible component props
 * INTERFACE DESIGN REASON: Official React documentation recommends comprehensive prop interfaces for reusable components
 */
interface AboutImageProps {
  /** URL for the founder image */
  founderImageUrl?: string;
  /** Alt text for accessibility */
  founderImageAlt?: string;
  /** Animation delay offset for staggered reveals */
  animationDelay?: number;
  /** Custom className for styling overrides */
  className?: string;
  /** Show credential badges - DEPRECATED: Credentials section removed */
  showCredentials?: boolean;
  /** Conversion tracker for analytics and A/B testing */
  conversionTracker?: any;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition for founder image display
 * EXTRACTION REASON: Official React documentation shows how to extract visual components for better separation of concerns
 * PATTERN: Founder image component with responsive animations and magnetic interactions
 */
export function AboutImage({
  founderImageUrl,
  founderImageAlt,
  animationDelay = 0.3,
  className = "",
  showCredentials = false,
  conversionTracker
}: AboutImageProps) {
  // CONTEXT7 SOURCE: /vercel/next.js - Using cached data access for performance optimization
  // CACHED DATA ACCESS: Official Next.js documentation shows accessing cached data to prevent redundant computations
  const contentData = getAboutContent();
  const performanceConfig = getAboutPerformanceConfig();

  const imageUrl = founderImageUrl || contentData.founderImage.url;
  const imageAlt = founderImageAlt || contentData.founderImage.alt;

  // CONTEXT7 SOURCE: /vercel/next.js - Performance monitoring hook integration for image tracking
  // PERFORMANCE TRACKING: Official Next.js documentation shows using hooks for performance monitoring
  const performance = useAboutSectionPerformance();

  // CONTEXT7 SOURCE: /vercel/next.js - Image load event handler for performance tracking
  // LOAD TRACKING: Official Next.js documentation shows tracking image load events
  const handleImageLoad = () => {
    if (performance) {
      performance.markImageLoaded();
    }

    // CONTEXT7 SOURCE: /vercel/next.js - Conversion tracking for founder image visibility
    // FOUNDER IMAGE TRACKING: Official Next.js documentation shows tracking key visual element loading for conversion optimization
    if (conversionTracker) {
      conversionTracker.trackEvent('founder_image_view', {
        imageUrl: imageUrl,
        loadTime: performance?.getMetrics?.()?.imageLoadTime || 0,
        timestamp: Date.now(),
        variant: conversionTracker.getCurrentVariant()
      });
    }
  };

  // CONTEXT7 SOURCE: /reactjs/react.dev - Enhanced animation hooks for micro-interactions and performance optimization
  // ANIMATION HOOKS: Official React documentation shows using custom hooks for complex state management
  const imageAnimation = useEnhancedAnimations({
    threshold: 0.3,
    rootMargin: '-50px',
    delay: animationDelay,
    trackingName: 'founder-image',
    enableMicroInteractions: true
  });

  // CONTEXT7 SOURCE: /reactjs/react.dev - Component cleanup patterns for unused state management
  // CLEANUP REASON: Official React documentation shows removing unused animation hooks when conditional content is removed

  // CONTEXT7 SOURCE: /framer/motion - Magnetic effect configuration for founder image interaction
  // MAGNETIC INTERACTION: Official Framer Motion documentation shows implementing magnetic cursor effects
  const magneticEffect = createMagneticEffect(0.15);

  // CONTEXT7 SOURCE: /framer/motion - Scroll variants for optimized animations
  // SCROLL OPTIMIZATION: Official Framer Motion documentation shows optimized scroll-based animations
  const scrollVariants = createScrollVariants('right');

  // CONTEXT7 SOURCE: /vercel/next.js - Optimized image properties generation for responsive delivery
  // IMAGE OPTIMIZATION INTEGRATION: Official Next.js documentation shows using optimization utilities for enhanced image performance
  const responsiveSizes = generateResponsiveSizes('hero');
  const optimalQuality = getOptimalQuality('hero', 'avif');
  const optimizedAlt = generateOptimizedAltText(imageAlt, 'hero', contentData.title);
  const loadingStrategy = getOptimalLoadingStrategy('hero', true);
  const blurDataURL = generateBlurDataURL(600, 800, '#f8fafc');
  return (
    <div
      className={`relative min-h-0 flex flex-col space-y-8 ${className}`}
      role="region"
      aria-labelledby="about-image-heading"
    >
      {/* CONTEXT7 SOURCE: /mozilla/mdn - Hidden heading for accessibility context */}
      {/* ACCESSIBILITY INTEGRATION: Official MDN documentation shows using hidden headings for screen reader context */}
      <h3 id="about-image-heading" className="sr-only">
        About My Private Tutor Online - Founder
      </h3>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Image component with enhanced micro-interactions and magnetic effects */}
      <m.div
        ref={imageAnimation.ref}
        animate={imageAnimation.controls}
        className="relative w-full flex items-center justify-center bg-transparent cursor-pointer border-2 border-primary-100 transition-all duration-300 hover:border-primary-200 hover:scale-[1.02]"
        style={{ height: "fit-content" }}
        role="img"
        aria-label="Founder portrait section"
        {...magneticEffect}
        onAnimationComplete={() => {
          // CONTEXT7 SOURCE: /framer/motion - Image animation completion tracking for performance monitoring
          // IMAGE TRACKING: Official Framer Motion documentation shows tracking image animation completion
          imageAnimation.cleanupTracking();
          if (conversionTracker) {
            conversionTracker.trackEvent('scroll_milestone', {
              milestone: 'founder_image_animated',
              timestamp: Date.now(),
              variant: conversionTracker.getCurrentVariant()
            });
          }
        }}
      >
        <Image
          src={imageUrl}
          alt={optimizedAlt}
          width={600}
          height={800}
          className="object-contain w-full h-auto max-w-full"
          style={{
            filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))",
            backgroundColor: "transparent",
            maxHeight: "500px",
          }}
          sizes={responsiveSizes}
          quality={optimalQuality}
          priority={loadingStrategy.priority}
          loading={loadingStrategy.loading}
          placeholder="blur"
          blurDataURL={blurDataURL}
          onLoad={handleImageLoad}
        />
      </m.div>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Component modification patterns for element removal
       * REMOVAL REASON: Official React documentation Section on conditional rendering shows removing conditional content blocks
       * CREDENTIALS SECTION REMOVED: Tatler Address Book badge, School Guide UK 'Top Pick' badge, and "Trusted by Royal Clientele" text removed per requirements
       */}
    </div>
  );
}

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript export patterns for component reusability
export type { AboutImageProps };