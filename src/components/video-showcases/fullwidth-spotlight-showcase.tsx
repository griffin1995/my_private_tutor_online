/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-width layout utilities for dramatic spotlight presentations
 * SPOTLIGHT SHOWCASE REASON: Official Tailwind CSS documentation patterns for inset-0, col-span-full, and dramatic positioning
 * THEATRICAL PRESENTATION: Breaking all conventional boundaries for maximum visual impact
 * FULL-WIDTH DOMINANCE: Complete screen real estate utilization for premium content
 */

"use client";

import { Play, Star, Trophy, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { m } from 'framer-motion';
import { FullwidthSpotlightShowcaseProps } from './types';
import { 
  useVideoPerformanceOptimization, 
  useVideoLazyLoading,
  VideoBundleOptimizer 
} from '@/lib/performance/video-optimization';
import { useVideoAccessibility } from '@/lib/accessibility/video-a11y';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface moved to centralized types file for consistency
// TYPE ORGANIZATION REASON: Official TypeScript documentation shows centralized type management patterns

export function FullwidthSpotlightShowcase({
  title,
  description,
  videoUrl,
  thumbnailUrl,
  duration,
  priceRange,
  features,
  ctaText,
  onCTAClick,
  paymentUrl,
  className,
  spotlight,
  backgroundImage,
  isPopular = false
}: FullwidthSpotlightShowcaseProps) {

  // CONTEXT7 SOURCE: /vercel/next.js - Performance optimization hooks for video components
  // PERFORMANCE OPTIMIZATION REASON: Official Next.js documentation shows performance tracking patterns
  const videoId = `fullwidth-spotlight-${title.replace(/\s+/g, '-').toLowerCase()}`;
  const {
    metrics,
    trackVideoLoad,
    trackVideoComplete,
    trackRender,
    trackInteraction,
    registerForLazyLoading
  } = useVideoPerformanceOptimization(videoId, {
    enableMetrics: true,
    trackVideoLoad: true,
    trackInteractionLatency: true,
    trackRenderTime: true
  });

  // CONTEXT7 SOURCE: /vercel/next.js - Lazy loading hook for performance optimization
  // LAZY LOADING REASON: Official Next.js documentation shows Intersection Observer patterns
  const { elementRef, shouldLoad } = useVideoLazyLoading({
    rootMargin: '100px 0px',
    threshold: 0.1,
    enabled: true
  });

  // CONTEXT7 SOURCE: /websites/www_w3_org-wai-wcag21 - Video accessibility management for WCAG 2.1 AA compliance
  // ACCESSIBILITY REASON: Official WCAG documentation shows video accessibility patterns
  const {
    announceToScreenReader,
    setupKeyboardNavigation,
    validateAccessibility,
    getAccessibilityProps
  } = useVideoAccessibility({
    videoId,
    title: `${title} - Fullwidth Spotlight Showcase`,
    enableAnnouncements: true,
    enableKeyboardNavigation: true,
    enableFocusManagement: true
  });

  // CONTEXT7 SOURCE: /vercel/next.js - Performance-optimized video source handling
  // VIDEO OPTIMIZATION REASON: Official Next.js documentation shows video optimization patterns
  const optimizedVideoUrl = videoUrl ? VideoBundleOptimizer.optimizeVideoSource(videoUrl, 'high') : undefined;
  const progressiveVideoSources = videoUrl ? VideoBundleOptimizer.createProgressiveVideoSource(videoUrl) : undefined;

  return (
    <m.div
      ref={elementRef}
      className={cn(
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Full-width container utilities for theatrical presentation
        // SPOTLIGHT CONTAINER SYSTEM: Complete viewport utilization with dramatic depth
        "relative col-span-full w-full min-h-[80vh] flex items-center justify-center overflow-hidden",
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.0, ease: "easeOut" }}
      viewport={{ once: true }}
      onAnimationComplete={() => {
        // CONTEXT7 SOURCE: /vercel/next.js - Render time tracking for performance optimization
        // RENDER TRACKING REASON: Official Next.js documentation shows performance measurement patterns
        trackRender(performance.now());
        announceToScreenReader(`${spotlight.headline} - ${title} fullwidth spotlight showcase loaded`);
      }}
      {...getAccessibilityProps()}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background image utilities with sophisticated overlays */}
      {/* THEATRICAL BACKGROUND: Full-screen background with Metallic Blue dominance */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : null}
        {/* Metallic Blue dominant overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#3F4A7E] via-[#3F4A7E]/95 to-[#2F3A5E]" />
        {/* Sophisticated pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#CA9E5B]/10 to-transparent" />
      </div>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Geometric accent elements for architectural depth */}
      {/* ARCHITECTURAL ACCENTS: Sophisticated geometric elements with Aztec Gold highlights */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#CA9E5B] via-[#CA9E5B]/50 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-[#CA9E5B] via-[#CA9E5B]/50 to-transparent" />
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#CA9E5B]/30 to-transparent" />
      
      {/* Popular indicator */}
      {isPopular && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
          <Badge className="bg-gradient-to-r from-[#CA9E5B] to-[#B8873A] text-white border-0 shadow-2xl px-6 py-3 text-lg font-bold">
            <Star className="w-5 h-5 mr-2 fill-current" />
            Most Popular Choice
          </Badge>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-12 gap-12 items-center max-w-7xl mx-auto">
          
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Spotlight content positioning with dramatic typography */}
          {/* SPOTLIGHT CONTENT: Theatrical text presentation with brand color hierarchy */}
          <div className="col-span-12 lg:col-span-6 space-y-10 text-center lg:text-left">
            
            {/* Spotlight headline */}
            <div className="space-y-6">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <div className="w-16 h-1 bg-[#CA9E5B] rounded-full" />
                <Trophy className="w-8 h-8 text-[#CA9E5B]" />
                <div className="w-16 h-1 bg-[#CA9E5B] rounded-full" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#CA9E5B] uppercase tracking-wider">
                  {spotlight.headline}
                </h3>
                <h2 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-tight">
                  {title}
                </h2>
                <p className="text-xl lg:text-2xl text-white/90 font-light">
                  {spotlight.subheading}
                </p>
              </div>
            </div>

            {/* Metrics showcase */}
            {spotlight.metrics && spotlight.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {spotlight.metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-3">
                      {metric.icon || <Users className="w-8 h-8 text-[#CA9E5B]" />}
                    </div>
                    <div className="text-4xl font-bold text-white">{metric.value}</div>
                    <div className="text-[#CA9E5B] font-medium text-sm uppercase tracking-wide">{metric.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {description}
            </p>

            {/* Features in spotlight format */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.slice(0, 6).map((feature, index) => (
                <div key={index} className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="flex-shrink-0 w-2 h-2 bg-[#CA9E5B] rounded-full" />
                  <span className="text-white/90 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Spotlight CTA */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-8">
              <Button
                onClick={() => {
                  // CONTEXT7 SOURCE: /websites/www_w3_org-wai-wcag21 - Accessibility interaction tracking
                  // INTERACTION ACCESSIBILITY REASON: Official WCAG documentation shows accessible interaction patterns
                  const startTime = performance.now();
                  trackInteraction(startTime);
                  announceToScreenReader(`Activating ${ctaText} for ${spotlight.headline} - ${title}`);
                  onCTAClick?.();
                }}
                className="bg-[#CA9E5B] hover:bg-[#B8873A] text-white shadow-2xl border-0 px-12 py-6 text-xl font-bold group rounded-2xl"
                size="lg"
              >
                <Play className="w-6 h-6 mr-4 group-hover:scale-125 transition-transform duration-300" />
                {ctaText}
                <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              {paymentUrl && priceRange && (
                <div className="flex flex-col items-center sm:items-start gap-2">
                  <Button
                    onClick={() => {
                      // CONTEXT7 SOURCE: /websites/www_w3_org-wai-wcag21 - Accessible external link handling
                      // EXTERNAL LINK ACCESSIBILITY REASON: Official WCAG documentation shows accessible external navigation patterns
                      announceToScreenReader(`Opening instant access page for ${title} in new window`);
                      window.open(paymentUrl, '_blank', 'noopener,noreferrer');
                    }}
                    variant="outline"
                    className="border-3 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#3F4A7E] px-8 py-6 text-xl font-bold rounded-2xl"
                    size="lg"
                  >
                    Get Instant Access
                  </Button>
                  <span className="text-[#CA9E5B] font-bold text-lg">{priceRange}</span>
                </div>
              )}
            </div>
          </div>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Video positioning for spotlight presentation */}
          {/* SPOTLIGHT VIDEO: Dramatic video placement with sophisticated framing */}
          <div className="col-span-12 lg:col-span-6">
            <div className="relative">
              {/* Main spotlight video */}
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#CA9E5B]/50 bg-black/20 backdrop-blur-sm">
                {shouldLoad ? (
                  <HeroVideoDialog
                    videoSrc={optimizedVideoUrl}
                    thumbnailSrc={progressiveVideoSources?.poster || thumbnailUrl}
                    thumbnailAlt={`${title} fullwidth spotlight showcase`}
                    animationStyle="from-bottom"
                    className="w-full h-full"
                    onVideoLoad={() => {
                      // CONTEXT7 SOURCE: /vercel/next.js - Video load tracking for performance optimization
                      // VIDEO LOAD TRACKING REASON: Official Next.js documentation shows video performance patterns
                      trackVideoLoad();
                    }}
                    onVideoPlay={() => {
                      // CONTEXT7 SOURCE: /vercel/next.js - Video interaction tracking
                      // INTERACTION TRACKING REASON: Official Next.js documentation shows user interaction measurement
                      const startTime = performance.now();
                      trackInteraction(startTime);
                      announceToScreenReader(`Playing ${title} spotlight masterclass preview`);
                    }}
                  />
                ) : (
                  // CONTEXT7 SOURCE: /vercel/next.js - Loading placeholder for lazy-loaded video
                  // PLACEHOLDER REASON: Official Next.js documentation shows placeholder patterns for lazy loading
                  <div className="w-full h-full bg-gradient-to-br from-[#3F4A7E]/20 to-[#CA9E5B]/20 flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="w-10 h-10 text-white/60" />
                      </div>
                      <div className="text-white/60 text-lg font-medium">Loading spotlight video...</div>
                    </div>
                  </div>
                )}
                
                {/* Sophisticated overlay elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
                
                {/* Duration and price overlay */}
                <div className="absolute bottom-6 left-6 flex items-center gap-4 z-10">
                  {duration && (
                    <Badge className="bg-black/80 backdrop-blur-sm text-white border border-[#CA9E5B]/50 px-4 py-2 text-sm font-bold">
                      {duration}
                    </Badge>
                  )}
                  {priceRange && (
                    <Badge className="bg-[#CA9E5B] text-white border-0 shadow-lg px-4 py-2 text-sm font-bold">
                      {priceRange}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#CA9E5B]/20 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#3F4A7E]/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}