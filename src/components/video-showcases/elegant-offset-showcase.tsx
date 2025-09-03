/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Elegant offset positioning utilities for luxury presentations
 * ELEGANT OFFSET REASON: Official Tailwind CSS documentation patterns for transform, -translate-y, and sophisticated asymmetric layouts
 * LUXURY POSITIONING: Premium content presentation with architectural elegance
 * REFINED ASYMMETRY: Sophisticated offset design breaking conventional card structures
 */

"use client";

import { Play, Crown, Sparkles, Award, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { m } from 'framer-motion';
import { ElegantOffsetShowcaseProps } from './types';
import { 
  useVideoPerformanceOptimization, 
  useVideoLazyLoading,
  VideoBundleOptimizer 
} from '@/lib/performance/video-optimization';
import { useVideoAccessibility } from '@/lib/accessibility/video-a11y';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface moved to centralized types file for consistency
// TYPE ORGANIZATION REASON: Official TypeScript documentation shows centralized type management patterns

export function ElegantOffsetShowcase({
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
  elegance,
  offsetDirection = 'up'
}: ElegantOffsetShowcaseProps) {

  // CONTEXT7 SOURCE: /vercel/next.js - Performance optimization hooks for video components
  // PERFORMANCE OPTIMIZATION REASON: Official Next.js documentation shows performance tracking patterns
  const videoId = `elegant-offset-${title.replace(/\s+/g, '-').toLowerCase()}`;
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
    title: `${elegance.premiumBadge} - ${title} - Elegant Offset Showcase`,
    enableAnnouncements: true,
    enableKeyboardNavigation: true,
    enableFocusManagement: true
  });

  // CONTEXT7 SOURCE: /vercel/next.js - Performance-optimized video source handling
  // VIDEO OPTIMIZATION REASON: Official Next.js documentation shows video optimization patterns
  const optimizedVideoUrl = videoUrl ? VideoBundleOptimizer.optimizeVideoSource(videoUrl, 'high') : undefined;
  const progressiveVideoSources = videoUrl ? VideoBundleOptimizer.createProgressiveVideoSource(videoUrl) : undefined;
  
  const isOffsetUp = offsetDirection === 'up';

  return (
    <m.div
      ref={elementRef}
      className={cn(
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Elegant container utilities for luxury positioning
        // ELEGANT CONTAINER SYSTEM: Sophisticated offset positioning with premium aesthetics
        "relative py-24 overflow-hidden",
        className
      )}
      initial={{ opacity: 0, x: 40, y: isOffsetUp ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      viewport={{ once: true }}
      onAnimationComplete={() => {
        // CONTEXT7 SOURCE: /vercel/next.js - Render time tracking for performance optimization
        // RENDER TRACKING REASON: Official Next.js documentation shows performance measurement patterns
        trackRender(performance.now());
        announceToScreenReader(`${elegance.premiumBadge} - ${title} elegant offset showcase loaded`);
      }}
      {...getAccessibilityProps()}
    >
      
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Luxury background utilities with Metallic Blue dominance */}
      {/* ELEGANT BACKGROUND: Premium gradient system with architectural sophistication */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#3F4A7E] to-slate-800" />
      
      {/* Sophisticated overlay patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_30%,rgba(202,158,91,0.05)_50%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(63,74,126,0.3)_100%)]" />
      
      {/* Elegant geometric accents */}
      <div className="absolute top-1/4 right-8 w-1 h-32 bg-gradient-to-b from-[#CA9E5B] to-transparent" />
      <div className="absolute bottom-1/4 left-8 w-1 h-24 bg-gradient-to-t from-[#CA9E5B] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-16 items-center">
          
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Luxury content positioning */}
          {/* ELEGANT CONTENT: Premium text layout with sophisticated typography hierarchy */}
          <div className="col-span-12 lg:col-span-6 space-y-10">
            
            {/* Premium badge and exclusive note */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Crown className="w-8 h-8 text-[#CA9E5B]" />
                <Badge className="bg-gradient-to-r from-[#CA9E5B] to-[#B8873A] text-white border-0 shadow-lg px-6 py-2 text-sm font-bold uppercase tracking-wide">
                  {elegance.premiumBadge}
                </Badge>
              </div>
              
              <p className="text-[#CA9E5B] text-lg font-medium italic leading-relaxed">
                {elegance.exclusiveNote}
              </p>
            </div>

            {/* Elegant title */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Sparkles className="w-6 h-6 text-[#CA9E5B]" />
                <div className="w-20 h-px bg-[#CA9E5B]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                {title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-xl text-white/90 leading-relaxed">
              {description}
            </p>

            {/* Luxury features */}
            <div className="space-y-6">
              <h4 className="text-[#CA9E5B] font-semibold text-lg flex items-center gap-2">
                <Award className="w-5 h-5" />
                Exclusive Benefits
              </h4>
              <div className="space-y-4">
                {elegance.luxuryFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#CA9E5B]/20 border border-[#CA9E5B]/30 flex items-center justify-center mt-1 group-hover:bg-[#CA9E5B]/30 transition-colors duration-300">
                      <ChevronRight className="w-4 h-4 text-[#CA9E5B]" />
                    </div>
                    <span className="text-white/90 leading-relaxed font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Standard features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-white/60 rounded-full mt-2.5" />
                  <span className="text-white/80 text-sm leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            {/* Elegant CTA */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <Button
                onClick={() => {
                  // CONTEXT7 SOURCE: /websites/www_w3_org-wai-wcag21 - Accessibility interaction tracking
                  // INTERACTION ACCESSIBILITY REASON: Official WCAG documentation shows accessible interaction patterns
                  const startTime = performance.now();
                  trackInteraction(startTime);
                  announceToScreenReader(`Activating ${ctaText} for ${elegance.premiumBadge} premium content - ${title}`);
                  onCTAClick?.();
                }}
                className="bg-gradient-to-r from-[#CA9E5B] to-[#B8873A] hover:from-[#B8873A] hover:to-[#A67B33] text-white shadow-2xl border-0 px-10 py-6 text-lg font-bold group rounded-2xl"
                size="lg"
              >
                <Play className="w-6 h-6 mr-4 group-hover:scale-125 transition-transform duration-300" />
                {ctaText}
              </Button>
              
              {paymentUrl && (
                <div className="flex flex-col items-start gap-2">
                  <Button
                    onClick={() => {
                      // CONTEXT7 SOURCE: /websites/www_w3_org-wai-wcag21 - Accessible external link handling
                      // EXTERNAL LINK ACCESSIBILITY REASON: Official WCAG documentation shows accessible external navigation patterns
                      announceToScreenReader(`Opening exclusive access page for ${elegance.premiumBadge} - ${title} in new window`);
                      window.open(paymentUrl, '_blank', 'noopener,noreferrer');
                    }}
                    variant="outline"
                    className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#3F4A7E] px-8 py-6 text-lg font-bold rounded-2xl"
                    size="lg"
                  >
                    Exclusive Access
                  </Button>
                  {priceRange && (
                    <span className="text-[#CA9E5B] font-bold text-lg ml-2">{priceRange}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Elegant video offset positioning */}
          {/* OFFSET VIDEO: Sophisticated video placement with luxury framing */}
          <div className="col-span-12 lg:col-span-6">
            <div className={cn(
              "relative",
              isOffsetUp ? "lg:-mt-24" : "lg:mt-24"
            )}>
              <div className="relative">
                {/* Elegant video frame */}
                <div className="relative aspect-[5/6] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm border border-[#CA9E5B]/20 p-3">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    {shouldLoad ? (
                      <HeroVideoDialog
                        videoSrc={optimizedVideoUrl}
                        thumbnailSrc={progressiveVideoSources?.poster || thumbnailUrl}
                        thumbnailAlt={`${elegance.premiumBadge} - ${title} elegant offset showcase`}
                        animationStyle={isOffsetUp ? "from-top" : "from-bottom"}
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
                          announceToScreenReader(`Playing ${elegance.premiumBadge} premium content - ${title}`);
                        }}
                      />
                    ) : (
                      // CONTEXT7 SOURCE: /vercel/next.js - Loading placeholder for lazy-loaded video
                      // PLACEHOLDER REASON: Official Next.js documentation shows placeholder patterns for lazy loading
                      <div className="w-full h-full bg-gradient-to-br from-[#3F4A7E]/10 to-[#CA9E5B]/10 flex items-center justify-center">
                        <div className="animate-pulse flex flex-col items-center gap-4">
                          <div className="w-16 h-16 bg-[#CA9E5B]/20 rounded-full flex items-center justify-center border-2 border-[#CA9E5B]/30">
                            <Play className="w-8 h-8 text-[#CA9E5B]/60" />
                          </div>
                          <div className="text-[#CA9E5B]/60 text-sm font-bold uppercase tracking-wide">Loading premium content...</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Luxury overlay elements */}
                  <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
                    {duration && (
                      <Badge className="bg-black/80 backdrop-blur-sm text-white border border-[#CA9E5B]/50 px-4 py-2 text-sm font-bold">
                        {duration}
                      </Badge>
                    )}
                    {priceRange && (
                      <Badge className="bg-gradient-to-r from-[#CA9E5B] to-[#B8873A] text-white border-0 shadow-lg px-4 py-2 text-sm font-bold">
                        {priceRange}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Floating elegant accents */}
                <div className={cn(
                  "absolute w-32 h-32 bg-[#CA9E5B]/10 rounded-full blur-2xl -z-10",
                  isOffsetUp ? "-top-16 -left-16" : "-bottom-16 -right-16"
                )} />
                <div className={cn(
                  "absolute w-24 h-24 bg-white/5 rounded-full blur-xl -z-10",
                  isOffsetUp ? "-bottom-12 -right-12" : "-top-12 -left-12"
                )} />
                
                {/* Premium indicator */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-[#CA9E5B] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Premium Content
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}