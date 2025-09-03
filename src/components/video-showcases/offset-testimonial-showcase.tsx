/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Offset positioning utilities for asymmetric sophisticated layouts
 * OFFSET TESTIMONIAL REASON: Official Tailwind CSS documentation patterns for transform, translate, and grid positioning
 * ELEGANT ASYMMETRY: Breaking conventional card structures with sophisticated offset positioning
 * TESTIMONIAL INTEGRATION: Seamless blend of video content with social proof
 */

"use client";

import { Play, Quote, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { m } from 'framer-motion';
import { OffsetTestimonialShowcaseProps } from './types';
import { 
  useVideoPerformanceOptimization, 
  useVideoLazyLoading,
  VideoBundleOptimizer 
} from '@/lib/performance/video-optimization';
import { useVideoAccessibility } from '@/lib/accessibility/video-a11y';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface moved to centralized types file for consistency
// TYPE ORGANIZATION REASON: Official TypeScript documentation shows centralized type management patterns

export function OffsetTestimonialShowcase({
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
  testimonial,
  stats = [],
  alignment = 'right'
}: OffsetTestimonialShowcaseProps) {
  
  // CONTEXT7 SOURCE: /vercel/next.js - Performance optimization hooks for video components
  // PERFORMANCE OPTIMIZATION REASON: Official Next.js documentation shows performance tracking patterns
  const videoId = `offset-testimonial-${title.replace(/\s+/g, '-').toLowerCase()}`;
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
    title: `${title} - Offset Testimonial Showcase`,
    enableAnnouncements: true,
    enableKeyboardNavigation: true,
    enableFocusManagement: true
  });

  // CONTEXT7 SOURCE: /vercel/next.js - Performance-optimized video source handling
  // VIDEO OPTIMIZATION REASON: Official Next.js documentation shows video optimization patterns
  const optimizedVideoUrl = videoUrl ? VideoBundleOptimizer.optimizeVideoSource(videoUrl, 'high') : undefined;
  const progressiveVideoSources = videoUrl ? VideoBundleOptimizer.createProgressiveVideoSource(videoUrl) : undefined;
  
  const isLeftAligned = alignment === 'left';

  return (
    <m.div
      ref={elementRef}
      className={cn(
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container utilities for sophisticated spacing
        // OFFSET CONTAINER SYSTEM: Asymmetric positioning with architectural precision
        "relative py-24 overflow-hidden",
        className
      )}
      initial={{ opacity: 0, x: isLeftAligned ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      onAnimationComplete={() => {
        // CONTEXT7 SOURCE: /vercel/next.js - Render time tracking for performance optimization
        // RENDER TRACKING REASON: Official Next.js documentation shows performance measurement patterns
        trackRender(performance.now());
        announceToScreenReader(`${title} offset testimonial showcase loaded`);
      }}
      {...getAccessibilityProps()}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Background gradient utilities for Metallic Blue dominance */}
      {/* SOPHISTICATED BACKGROUND: Metallic Blue with architectural accent lines */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white" />
      
      {/* Architectural accent elements */}
      <div className={cn(
        "absolute top-0 w-2 h-full bg-gradient-to-b from-[#3F4A7E] to-transparent",
        isLeftAligned ? "right-1/3" : "left-1/3"
      )} />
      <div className={cn(
        "absolute top-1/4 w-full h-px bg-gradient-to-r from-transparent via-[#CA9E5B] to-transparent opacity-30"
      )} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={cn(
          "grid grid-cols-12 gap-12 items-center",
          isLeftAligned ? "lg:grid-flow-col-dense" : ""
        )}>
          
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid positioning for sophisticated video placement */}
          {/* VIDEO OFFSET POSITIONING: Asymmetric video placement with sophisticated scaling */}
          <div className={cn(
            "col-span-12 lg:col-span-6",
            isLeftAligned ? "lg:col-start-7" : "lg:col-start-1"
          )}>
            <div className={cn(
              "relative",
              isLeftAligned ? "lg:-ml-16" : "lg:-mr-16"
            )}>
              {/* Video container with sophisticated shadow */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-[#3F4A7E]/10">
                  {shouldLoad ? (
                    <HeroVideoDialog
                      videoSrc={optimizedVideoUrl}
                      thumbnailSrc={progressiveVideoSources?.poster || thumbnailUrl}
                      thumbnailAlt={`${title} offset testimonial showcase`}
                      animationStyle={isLeftAligned ? "from-left" : "from-right"}
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
                        announceToScreenReader(`Playing ${title} masterclass preview`);
                      }}
                    />
                  ) : (
                    // CONTEXT7 SOURCE: /vercel/next.js - Loading placeholder for lazy-loaded video
                    // PLACEHOLDER REASON: Official Next.js documentation shows placeholder patterns for lazy loading
                    <div className="w-full h-full bg-gradient-to-br from-[#3F4A7E]/20 to-[#CA9E5B]/20 flex items-center justify-center">
                      <div className="animate-pulse flex flex-col items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white/60" />
                        </div>
                        <div className="text-white/60 text-sm">Loading video...</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Elegant overlay badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-3 z-10">
                    {duration && (
                      <Badge className="bg-[#3F4A7E] text-white border-0 shadow-lg w-fit">
                        <Clock className="w-3 h-3 mr-2" />
                        {duration}
                      </Badge>
                    )}
                    {priceRange && (
                      <Badge className="bg-[#CA9E5B] text-white border-0 shadow-lg w-fit font-semibold">
                        {priceRange}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Floating testimonial card - key offset feature */}
                <div className={cn(
                  "absolute -bottom-8 bg-white rounded-2xl shadow-xl border border-[#3F4A7E]/10 p-6 max-w-sm z-20",
                  isLeftAligned ? "-right-8 lg:-right-16" : "-left-8 lg:-left-16"
                )}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#3F4A7E] to-[#4A5892] rounded-full flex items-center justify-center">
                        <Quote className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[#3F4A7E] text-sm leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="text-xs">
                        <span className="font-semibold text-[#CA9E5B]">{testimonial.author}</span>
                        <br />
                        <span className="text-slate-600">{testimonial.role}</span>
                        {testimonial.institution && (
                          <>
                            <br />
                            <span className="text-slate-500">{testimonial.institution}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Typography utilities for sophisticated content layout */}
          {/* CONTENT POSITIONING: Elegant text layout with Metallic Blue hierarchy */}
          <div className={cn(
            "col-span-12 lg:col-span-6 space-y-8",
            isLeftAligned ? "lg:col-start-1" : "lg:col-start-7"
          )}>
            
            {/* Stats section */}
            {stats.length > 0 && (
              <div className="flex gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#3F4A7E]">{stat.value}</div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Title with sophisticated hierarchy */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-1 bg-[#CA9E5B] rounded-full" />
                <Award className="w-5 h-5 text-[#CA9E5B]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#3F4A7E] leading-tight">
                {title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-700 leading-relaxed">
              {description}
            </p>

            {/* Features in elegant list format */}
            <div className="space-y-3">
              {features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#3F4A7E]/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-[#3F4A7E] rounded-full" />
                  </div>
                  <span className="text-slate-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA section with sophisticated button design */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={() => {
                  // CONTEXT7 SOURCE: /websites/www_w3_org-wai-wcag21 - Accessibility interaction tracking
                  // INTERACTION ACCESSIBILITY REASON: Official WCAG documentation shows accessible interaction patterns
                  const startTime = performance.now();
                  trackInteraction(startTime);
                  announceToScreenReader(`Activating ${ctaText} for ${title}`);
                  onCTAClick?.();
                }}
                className="bg-[#3F4A7E] hover:bg-[#354369] text-white shadow-lg border-0 px-8 py-4 text-lg font-semibold group rounded-xl"
                size="lg"
              >
                <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                {ctaText}
              </Button>
              
              {paymentUrl && (
                <Button
                  onClick={() => {
                    // CONTEXT7 SOURCE: /websites/www_w3_org-wai-wcag21 - Accessible external link handling
                    // EXTERNAL LINK ACCESSIBILITY REASON: Official WCAG documentation shows accessible external navigation patterns
                    announceToScreenReader(`Opening purchase page for ${title} in new window`);
                    window.open(paymentUrl, '_blank', 'noopener,noreferrer');
                  }}
                  variant="outline"
                  className="border-2 border-[#CA9E5B] text-[#CA9E5B] hover:bg-[#CA9E5B] hover:text-white px-6 py-4 text-lg font-medium rounded-xl"
                  size="lg"
                >
                  Purchase Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}