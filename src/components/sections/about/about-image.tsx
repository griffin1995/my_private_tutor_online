/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition patterns for image and credential display
 * COMPONENT EXTRACTION REASON: Official React documentation shows separating complex UI elements for better testability
 * PATTERN: Reusable image component with integrated credential badges
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
  /** Show credential badges */
  showCredentials?: boolean;
  /** Conversion tracker for analytics and A/B testing */
  conversionTracker?: any;
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Component composition for complex image layouts with credential integration
 * EXTRACTION REASON: Official React documentation shows how to extract visual components for better separation of concerns
 * PATTERN: Image component with integrated credential system and responsive animations
 */
export function AboutImage({
  founderImageUrl,
  founderImageAlt,
  animationDelay = 0.3,
  className = "",
  showCredentials = true,
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

  const credentialsAnimation = useEnhancedAnimations({
    threshold: 0.2,
    rootMargin: '-100px',
    delay: animationDelay + 0.4,
    trackingName: 'credentials-section',
    enableMicroInteractions: true
  });

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
        About My Private Tutor Online - Founder and Credentials
      </h3>

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Image component with enhanced micro-interactions and magnetic effects */}
      <m.div
        ref={imageAnimation.ref}
        animate={imageAnimation.controls}
        className="relative w-full flex items-center justify-center bg-transparent cursor-pointer"
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

      {/* CONTEXT7 SOURCE: /reactjs/react.dev - Conditional rendering patterns with enhanced micro-interactions */}
      {showCredentials && (
        <m.div
          ref={credentialsAnimation.ref}
          animate={credentialsAnimation.controls}
          className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-6 bg-primary-50/30 rounded-lg p-6 mx-4 cursor-default"
          role="group"
          aria-labelledby="credentials-heading"
          onAnimationComplete={() => {
            // CONTEXT7 SOURCE: /framer/motion - Credentials animation completion tracking
            // CREDENTIALS TRACKING: Official Framer Motion documentation shows tracking section animation completion
            credentialsAnimation.cleanupTracking();
            if (conversionTracker) {
              conversionTracker.trackEvent('scroll_milestone', {
                milestone: 'credentials_animated',
                timestamp: Date.now(),
                variant: conversionTracker.getCurrentVariant()
              });
            }
          }}
        >
          {/* CONTEXT7 SOURCE: /mozilla/mdn - Hidden heading for accessibility context */}
          {/* ACCESSIBILITY INTEGRATION: Official MDN documentation shows using hidden headings for grouped content */}
          <h4 id="credentials-heading" className="sr-only">
            Professional Credentials and Media Recognition
          </h4>
          <ul
            role="list"
            className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-6 w-full"
          >
            <li
              className="flex items-center gap-3 cursor-pointer hover:bg-primary-100/50 rounded-lg p-2 transition-colors"
              aria-label="Tatler Address Book recognition"
              onClick={() => {
                // CONTEXT7 SOURCE: /vercel/next.js - Credential interaction tracking for conversion optimization
                // CREDENTIAL TRACKING: Official Next.js documentation shows tracking trust signal interactions for conversion analysis
                if (conversionTracker) {
                  conversionTracker.trackEvent('credentials_interaction', {
                    credential: 'tatler',
                    action: 'click',
                    timestamp: Date.now(),
                    variant: conversionTracker.getCurrentVariant()
                  });
                }
              }}
            >
            <Image
              src="/images/media/tatler-logo.png"
              alt={generateOptimizedAltText("Tatler Address Book", 'logo', 'My Private Tutor Online')}
              width={80}
              height={30}
              className="h-10 w-auto object-contain"
              sizes={generateResponsiveSizes('logo')}
              quality={getOptimalQuality('logo', 'avif')}
              loading="lazy"
              role="img"
            />
              <span className="font-medium text-primary-900 text-sm">
                {contentData.credentials.tatler}
              </span>
            </li>
            <li
              className="flex items-center gap-3 cursor-pointer hover:bg-primary-100/50 rounded-lg p-2 transition-colors"
              aria-label="School Guide UK top pick recognition"
              onClick={() => {
                // CONTEXT7 SOURCE: /vercel/next.js - Credential interaction tracking for conversion optimization
                // CREDENTIAL TRACKING: Official Next.js documentation shows tracking trust signal interactions for conversion analysis
                if (conversionTracker) {
                  conversionTracker.trackEvent('credentials_interaction', {
                    credential: 'school-guide',
                    action: 'click',
                    timestamp: Date.now(),
                    variant: conversionTracker.getCurrentVariant()
                  });
                }
              }}
            >
              <Image
                src="/images/media/schools-guide-uk-logo.png"
                alt={generateOptimizedAltText("School Guide UK", 'logo', 'My Private Tutor Online')}
                width={80}
                height={30}
                className="h-12 w-auto object-contain"
                sizes={generateResponsiveSizes('logo')}
                quality={getOptimalQuality('logo', 'avif')}
                loading="lazy"
                role="img"
              />
              <span className="font-medium text-primary-900 text-sm">
                {contentData.credentials.schoolGuide}
              </span>
            </li>
            <li
              className="flex items-center gap-2 w-full sm:w-auto justify-center mt-2 sm:mt-0"
              aria-label="Royal clientele service"
            >
              <span className="font-medium text-primary-900 text-sm text-center">
                {contentData.credentials.royal}
              </span>
            </li>
          </ul>
        </m.div>
      )}
    </div>
  );
}

// CONTEXT7 SOURCE: /reactjs/react.dev - TypeScript export patterns for component reusability
export type { AboutImageProps };