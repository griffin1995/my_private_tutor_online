/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Intimate positioning utilities for personal narrative presentations
 * INTIMATE STORY REASON: Official Tailwind CSS documentation patterns for place-items-center, gap utilities, and personal-scale layouts
 * PERSONAL NARRATIVE: Creating warmth and connection through sophisticated intimate design
 * STORY-DRIVEN DESIGN: Emotional engagement through architectural storytelling
 */

"use client";

import { Play, Heart, BookOpen, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { m } from 'framer-motion';
import { IntimateStoryShowcaseProps } from './types';
import { 
  useVideoPerformanceOptimization, 
  useVideoLazyLoading,
  VideoBundleOptimizer 
} from '@/lib/performance/video-optimization';
import { useVideoAccessibility } from '@/lib/accessibility/video-a11y';

// CONTEXT7 SOURCE: /microsoft/typescript - Interface moved to centralized types file for consistency
// TYPE ORGANIZATION REASON: Official TypeScript documentation shows centralized type management patterns

export function IntimateStoryShowcase({
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
  story,
  warmthMetrics
}: IntimateStoryShowcaseProps) {

  // CONTEXT7 SOURCE: /vercel/next.js - Performance optimization hooks for video components
  // PERFORMANCE OPTIMIZATION REASON: Official Next.js documentation shows performance tracking patterns
  const videoId = `intimate-story-${title.replace(/\s+/g, '-').toLowerCase()}`;
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
    title: `${title} - Intimate Story Showcase by ${story.authorName}`,
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
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Intimate container utilities for personal-scale presentations
        // INTIMATE CONTAINER SYSTEM: Warm, personal-scale positioning with human connection
        "relative py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30",
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true }}
      onAnimationComplete={() => {
        // CONTEXT7 SOURCE: /vercel/next.js - Render time tracking for performance optimization
        // RENDER TRACKING REASON: Official Next.js documentation shows performance measurement patterns
        trackRender(performance.now());
        announceToScreenReader(`${story.authorName}'s personal story - ${title} intimate showcase loaded`);
      }}
      {...getAccessibilityProps()}
    >
      
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Subtle accent elements for warm atmosphere */}
      {/* WARM ATMOSPHERIC ACCENTS: Soft geometric elements creating personal connection */}
      <div className="absolute top-1/4 left-8 w-32 h-32 bg-[#CA9E5B]/5 rounded-full blur-2xl" />
      <div className="absolute bottom-1/4 right-8 w-24 h-24 bg-[#3F4A7E]/5 rounded-full blur-xl" />
      <div className="absolute top-0 left-1/2 w-px h-16 bg-gradient-to-b from-[#CA9E5B] to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Personal story content positioning */}
          {/* STORY CONTENT: Intimate text layout with personal narrative hierarchy */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            
            {/* Personal introduction */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#3F4A7E] to-[#4A5892] rounded-full">
                  {story.authorImage ? (
                    <img 
                      src={story.authorImage} 
                      alt={story.authorName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-[#3F4A7E]">{story.authorName}</h3>
                  <p className="text-sm text-slate-600">{story.authorRole}</p>
                </div>
              </div>
              
              {/* Personal note */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-[#3F4A7E]/10 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <MessageCircle className="w-5 h-5 text-[#CA9E5B]" />
                  </div>
                  <p className="text-[#3F4A7E] leading-relaxed italic">
                    "{story.personalNote}"
                  </p>
                </div>
              </div>
            </div>

            {/* Title with personal touch */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Heart className="w-6 h-6 text-[#CA9E5B]" />
                <div className="w-12 h-1 bg-[#CA9E5B] rounded-full" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#3F4A7E] leading-tight">
                {title}
              </h2>
            </div>

            {/* Warm metrics */}
            {warmthMetrics && (
              <div className="grid grid-cols-3 gap-6 py-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3F4A7E]">{warmthMetrics.studentsHelped}</div>
                  <div className="text-xs text-slate-600 font-medium">Students Guided</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#CA9E5B]">{warmthMetrics.successRate}</div>
                  <div className="text-xs text-slate-600 font-medium">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#3F4A7E]">{warmthMetrics.personalTouch}</div>
                  <div className="text-xs text-slate-600 font-medium">Personal Approach</div>
                </div>
              </div>
            )}

            {/* Description */}
            <p className="text-lg text-slate-700 leading-relaxed">
              {description}
            </p>

            {/* Journey steps */}
            {story.journey && story.journey.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-[#3F4A7E] flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#CA9E5B]" />
                  Your Learning Journey
                </h4>
                <div className="space-y-3">
                  {story.journey.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3F4A7E]/10 flex items-center justify-center mt-0.5">
                        <span className="text-[#3F4A7E] font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-slate-700 leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features in personal format */}
            <div className="space-y-3">
              <h4 className="font-semibold text-[#3F4A7E]">What You'll Experience</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#CA9E5B]/20 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-[#CA9E5B] rounded-full" />
                    </div>
                    <span className="text-slate-700 text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Intimate CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={() => {
                  // CONTEXT7 SOURCE: /websites/www_w3_org-wai-wcag21 - Accessibility interaction tracking
                  // INTERACTION ACCESSIBILITY REASON: Official WCAG documentation shows accessible interaction patterns
                  const startTime = performance.now();
                  trackInteraction(startTime);
                  announceToScreenReader(`Activating ${ctaText} for ${story.authorName}'s ${title}`);
                  onCTAClick?.();
                }}
                className="bg-[#3F4A7E] hover:bg-[#354369] text-white shadow-lg border-0 px-8 py-4 font-semibold group rounded-xl"
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
                    announceToScreenReader(`Opening journey enrollment page for ${title} with ${story.authorName} in new window`);
                    window.open(paymentUrl, '_blank', 'noopener,noreferrer');
                  }}
                  variant="outline"
                  className="border-2 border-[#CA9E5B] text-[#CA9E5B] hover:bg-[#CA9E5B] hover:text-white px-6 py-4 font-medium rounded-xl"
                  size="lg"
                >
                  Start Your Journey
                </Button>
              )}
            </div>
          </div>

          {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Intimate video positioning */}
          {/* PERSONAL VIDEO: Warm, approachable video placement with personal connection */}
          <div className="col-span-12 lg:col-span-5">
            <div className="sticky top-8">
              <div className="relative">
                {/* Video container with warm styling */}
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-white p-2">
                  <div className="w-full h-full rounded-2xl overflow-hidden">
                    {shouldLoad ? (
                      <HeroVideoDialog
                        videoSrc={optimizedVideoUrl}
                        thumbnailSrc={progressiveVideoSources?.poster || thumbnailUrl}
                        thumbnailAlt={`${title} intimate personal story by ${story.authorName}`}
                        animationStyle="from-top"
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
                          announceToScreenReader(`Playing ${story.authorName}'s personal story about ${title}`);
                        }}
                      />
                    ) : (
                      // CONTEXT7 SOURCE: /vercel/next.js - Loading placeholder for lazy-loaded video
                      // PLACEHOLDER REASON: Official Next.js documentation shows placeholder patterns for lazy loading
                      <div className="w-full h-full bg-gradient-to-br from-[#3F4A7E]/10 to-[#CA9E5B]/10 flex items-center justify-center">
                        <div className="animate-pulse flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-[#3F4A7E]/20 rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-[#3F4A7E]/60" />
                          </div>
                          <div className="text-[#3F4A7E]/60 text-sm font-medium">Loading personal story...</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Warm overlay badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {duration && (
                      <Badge className="bg-[#3F4A7E] text-white border-0 shadow-sm px-3 py-1 text-xs font-medium">
                        {duration}
                      </Badge>
                    )}
                    {priceRange && (
                      <Badge className="bg-[#CA9E5B] text-white border-0 shadow-sm px-3 py-1 text-xs font-bold">
                        {priceRange}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Floating personal touch elements */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#CA9E5B]/10 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-[#CA9E5B]/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
}