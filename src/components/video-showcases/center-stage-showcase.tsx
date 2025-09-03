/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Center stage positioning utilities for dramatic focus presentations
 * CENTER STAGE REASON: Official Tailwind CSS documentation patterns for place-items-center, justify-center, and theatrical positioning
 * TRANSFORMATION FOCUS: Dramatic center positioning for maximum impact and attention
 * THEATRICAL PRESENTATION: Stage-like presentation commanding complete attention
 */

"use client";

import { Play, Zap, Target, TrendingUp, Users, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { m } from 'framer-motion';
import { CenterStageShowcaseProps } from './types';
import { 
  useVideoPerformanceOptimization, 
  useVideoLazyLoading,
  VideoBundleOptimizer 
} from '@/lib/performance/video-optimization';
import { useVideoAccessibility } from '@/lib/accessibility/video-a11y';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface moved to centralized types file for consistency
// TYPE ORGANIZATION REASON: Official TypeScript documentation shows centralized type management patterns

export function CenterStageShowcase({
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
  transformation
}: CenterStageShowcaseProps) {

  // CONTEXT7 SOURCE: /vercel/next.js - Performance optimization hooks for video components
  // PERFORMANCE OPTIMIZATION REASON: Official Next.js documentation shows performance tracking patterns
  const videoId = `center-stage-${title.replace(/\s+/g, '-').toLowerCase()}`;
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
    title: `${title} - Center Stage Transformation Showcase`,
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
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Center stage container utilities for dramatic presentation
        // CENTER STAGE CONTAINER SYSTEM: Complete focus positioning with theatrical impact
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
      onAnimationComplete={() => {
        // CONTEXT7 SOURCE: /vercel/next.js - Render time tracking for performance optimization
        // RENDER TRACKING REASON: Official Next.js documentation shows performance measurement patterns
        trackRender(performance.now());
        announceToScreenReader(`${title} center stage transformation showcase loaded`);
      }}
      {...getAccessibilityProps()}
    >
      
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Dramatic background utilities for center stage effect */}
      {/* THEATRICAL BACKGROUND: Center stage lighting effect with Metallic Blue dominance */}
      <div className="absolute inset-0 bg-gradient-radial from-[#3F4A7E] via-[#2F3A5E] to-black" />
      
      {/* Stage lighting effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(202,158,91,0.1)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(63,74,126,0.2)_60deg,transparent_120deg,rgba(202,158,91,0.1)_180deg,transparent_240deg,rgba(63,74,126,0.2)_300deg,transparent_360deg)]" />
      
      {/* Spotlight beams */}
      <div className="absolute top-0 left-1/2 w-2 h-32 bg-gradient-to-b from-[#CA9E5B] to-transparent transform -translate-x-1/2 blur-sm" />
      <div className="absolute bottom-0 left-1/2 w-2 h-32 bg-gradient-to-t from-[#CA9E5B] to-transparent transform -translate-x-1/2 blur-sm" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Center stage title positioning */}
          {/* STAGE TITLE: Dramatic center-focused typography with transformation emphasis */}
          <div className="space-y-8">
            <div className="flex items-center justify-center gap-6">
              <div className="w-24 h-1 bg-[#CA9E5B] rounded-full" />
              <Target className="w-12 h-12 text-[#CA9E5B]" />
              <div className="w-24 h-1 bg-[#CA9E5B] rounded-full" />
            </div>
            
            <h2 className="text-6xl lg:text-8xl font-serif font-bold text-white leading-tight">
              {title}
            </h2>
            
            <p className="text-2xl lg:text-3xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Before/After transformation showcase */}
          {/* TRANSFORMATION STAGE: Dramatic before/after presentation with center focus */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Before state */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-slate-600 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-8 h-8 text-white/60" />
                  </div>
                  <h3 className="text-xl font-bold text-white/70">Before</h3>
                  <p className="text-white/60 leading-relaxed">{transformation.beforeAfter.before}</p>
                </div>
              </div>
            </div>

            {/* Center video showcase */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#CA9E5B] bg-gradient-to-br from-[#CA9E5B]/20 to-transparent backdrop-blur-sm p-2">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  {shouldLoad ? (
                    <HeroVideoDialog
                      videoSrc={optimizedVideoUrl}
                      thumbnailSrc={progressiveVideoSources?.poster || thumbnailUrl}
                      thumbnailAlt={`${title} center stage transformation showcase`}
                      animationStyle="from-center"
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
                        announceToScreenReader(`Playing ${title} center stage transformation video`);
                      }}
                    />
                  ) : (
                    // CONTEXT7 SOURCE: /vercel/next.js - Loading placeholder for lazy-loaded video
                    // PLACEHOLDER REASON: Official Next.js documentation shows placeholder patterns for lazy loading
                    <div className="w-full h-full bg-gradient-to-br from-[#3F4A7E]/10 to-[#CA9E5B]/10 flex items-center justify-center">
                      <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-[#CA9E5B]/20 rounded-full flex items-center justify-center border-4 border-[#CA9E5B]/30">
                          <Play className="w-10 h-10 text-[#CA9E5B]/60" />
                        </div>
                        <div className="text-[#CA9E5B]/60 text-lg font-bold uppercase tracking-wide">Loading transformation...</div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Center stage badges */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-[#CA9E5B] to-[#B8873A] text-white border-0 shadow-2xl px-6 py-3 text-lg font-bold">
                    <Zap className="w-5 h-5 mr-2" />
                    Transformation
                  </Badge>
                </div>
                
                {/* Duration and price */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-10">
                  {duration && (
                    <Badge className="bg-black/80 backdrop-blur-sm text-white border border-[#CA9E5B]/50 px-3 py-2 text-sm font-bold">
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
              
              {/* Transformation arrow */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-16 bg-[#CA9E5B] rounded-full flex items-center justify-center shadow-2xl">
                  <ArrowDown className="w-8 h-8 text-white animate-bounce" />
                </div>
              </div>
            </div>

            {/* After state */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#CA9E5B]/20 to-[#CA9E5B]/10 backdrop-blur-sm rounded-3xl p-8 border border-[#CA9E5B]/30">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#CA9E5B] rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">After</h3>
                  <p className="text-white/90 leading-relaxed">{transformation.beforeAfter.after}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Impact metrics showcase */}
          {/* TRANSFORMATION METRICS: Dramatic results presentation with center focus */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transformation.impactMetrics.map((metric, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="text-center space-y-3">
                  <div className="text-4xl font-bold text-[#CA9E5B]">{metric.value}</div>
                  <div className="text-white font-semibold">{metric.label}</div>
                  <div className="text-sm text-white/70">{metric.improvement}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Key transformations */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold text-white">Key Transformations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transformation.keyTransformations.map((transform, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#CA9E5B] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-white/90 leading-relaxed">{transform}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 justify-center">
                <div className="flex-shrink-0 w-2 h-2 bg-[#CA9E5B] rounded-full" />
                <span className="text-white/80 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Center stage CTA */}
          <div className="space-y-8 pt-12">
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Button
                onClick={() => {
                  // CONTEXT7 SOURCE: /websites/www_w3_org-wai-wcag21 - Accessibility interaction tracking
                  // INTERACTION ACCESSIBILITY REASON: Official WCAG documentation shows accessible interaction patterns
                  const startTime = performance.now();
                  trackInteraction(startTime);
                  announceToScreenReader(`Activating ${ctaText} for ${title} transformation showcase`);
                  onCTAClick?.();
                }}
                className="bg-gradient-to-r from-[#CA9E5B] to-[#B8873A] hover:from-[#B8873A] hover:to-[#A67B33] text-white shadow-2xl border-0 px-16 py-8 text-2xl font-bold group rounded-3xl"
                size="lg"
              >
                <Play className="w-8 h-8 mr-6 group-hover:scale-125 transition-transform duration-300" />
                {ctaText}
              </Button>
              
              {paymentUrl && (
                <Button
                  onClick={() => {
                    // CONTEXT7 SOURCE: /websites/www_w3_org-wai-wcag21 - Accessible external link handling
                    // EXTERNAL LINK ACCESSIBILITY REASON: Official WCAG documentation shows accessible external navigation patterns
                    announceToScreenReader(`Opening transformation enrollment page for ${title} in new window`);
                    window.open(paymentUrl, '_blank', 'noopener,noreferrer');
                  }}
                  variant="outline"
                  className="border-3 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-[#3F4A7E] px-12 py-8 text-xl font-bold rounded-3xl"
                  size="lg"
                >
                  Start Transformation
                </Button>
              )}
            </div>
            
            {priceRange && (
              <p className="text-[#CA9E5B] text-2xl font-bold">
                Transform Your Future • {priceRange}
              </p>
            )}
          </div>
        </div>
      </div>
    </m.div>
  );
}