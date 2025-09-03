/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Advanced positioning utilities for unique video showcase layouts
 * INDIVIDUAL SHOWCASE REASON: Official Tailwind CSS documentation patterns for col-start, row-start, place-items for architectural positioning
 * METALLIC BLUE DOMINANCE: Primary brand color (#3F4A7E) creating visual authority and trust
 * AZTEC GOLD ACCENTS: Strategic luxury highlights (#CA9E5B) for premium positioning
 */

"use client";

import { Play, Star, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { m } from 'framer-motion';
import { CinematicHeroShowcaseProps, BrandColor, AnimationStyle } from './types';
import { 
  useVideoPerformanceOptimization, 
  useVideoLazyLoading,
  VideoBundleOptimizer 
} from '@/lib/performance/video-optimization';

export function CinematicHeroShowcase({
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
  achievements = []
}: CinematicHeroShowcaseProps) {
  // CONTEXT7 SOURCE: /vercel/next.js - Performance optimization hooks for video components
  // PERFORMANCE OPTIMIZATION REASON: Official Next.js documentation shows performance tracking patterns
  const videoId = `cinematic-hero-${title.replace(/\s+/g, '-').toLowerCase()}`;
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

  // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Color variables for brand consistency
  // BRAND COLOR IMPLEMENTATION: Metallic Blue primary with Aztec Gold strategic accents
  const brandColors = {
    metallicBlue: '#3F4A7E',
    aztecGold: '#CA9E5B'
  };

  // CONTEXT7 SOURCE: /vercel/next.js - Performance-optimized video source handling
  // VIDEO OPTIMIZATION REASON: Official Next.js documentation shows video optimization patterns
  const optimizedVideoUrl = videoUrl ? VideoBundleOptimizer.optimizeVideoSource(videoUrl, 'high') : undefined;
  const progressiveVideoSources = videoUrl ? VideoBundleOptimizer.createProgressiveVideoSource(videoUrl) : undefined;

  return (
    <m.div
      ref={elementRef}
      className={cn(
        // CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid positioning for cinematic hero placement
        // CINEMATIC HERO LAYOUT: Full-width positioning with architectural sophistication
        "relative col-span-full grid grid-cols-12 gap-8 py-20",
        // Metallic Blue dominant background
        "bg-gradient-to-br from-[#3F4A7E] via-[#4A5892] to-[#3F4A7E]",
        className
      )}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      onAnimationComplete={() => {
        // CONTEXT7 SOURCE: /vercel/next.js - Render time tracking for performance optimization
        // RENDER TRACKING REASON: Official Next.js documentation shows performance measurement patterns
        trackRender(performance.now());
      }}
    >
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Absolute positioning for sophisticated overlay elements */}
      {/* PREMIUM OVERLAY SYSTEM: Architectural depth with Aztec Gold accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      
      {/* Aztec Gold accent lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#CA9E5B] via-transparent to-[#CA9E5B] opacity-60" />
      <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-[#CA9E5B] via-transparent to-[#CA9E5B] opacity-40" />

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Grid column positioning for video content */}
      {/* VIDEO HERO POSITIONING: Cinematic placement with sophisticated aspect ratios */}
      <div className="relative col-span-12 lg:col-span-7 order-2 lg:order-1">
        <div className="relative">
          {/* Main video showcase - Performance optimized */}
          <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#CA9E5B]/30">
            {shouldLoad ? (
              <HeroVideoDialog
                videoSrc={optimizedVideoUrl}
                thumbnailSrc={progressiveVideoSources?.poster || thumbnailUrl}
                thumbnailAlt={`${title} cinematic showcase`}
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
            
            {/* Video overlay badges - Aztec Gold accents */}
            <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
              {priceRange && (
                <Badge className="bg-[#CA9E5B] text-white border-0 shadow-lg px-4 py-2 text-sm font-bold">
                  {priceRange}
                </Badge>
              )}
              {duration && (
                <Badge className="bg-black/70 backdrop-blur-sm text-white border border-[#CA9E5B]/50 px-3 py-1 text-xs">
                  {duration}
                </Badge>
              )}
            </div>
            
            {/* Featured indicator */}
            <div className="absolute top-6 right-6 z-10">
              <Badge className="bg-gradient-to-r from-[#CA9E5B] to-[#B8873A] text-white border-0 shadow-lg">
                <Star className="w-4 h-4 mr-1 fill-current" />
                Featured Masterclass
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Text content positioning with sophisticated typography */}
      {/* CONTENT HERO POSITIONING: Architectural text layout with brand color hierarchy */}
      <div className="relative col-span-12 lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center space-y-8 z-10">
        
        {/* Achievement badges */}
        {achievements.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-[#CA9E5B]/30">
                <Award className="w-4 h-4 text-[#CA9E5B]" />
                <span className="text-white text-sm font-medium">{achievement}</span>
              </div>
            ))}
          </div>
        )}

        {/* Title - Metallic Blue emphasis on white text */}
        <div className="space-y-4">
          <h2 className="text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
            {title}
          </h2>
          <div className="w-24 h-1 bg-[#CA9E5B] rounded-full" />
        </div>

        {/* Description */}
        <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
          {description}
        </p>

        {/* Features showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 bg-[#CA9E5B] rounded-full mt-2.5" />
              <span className="text-white/90 text-sm leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>

        {/* Testimonial integration */}
        {testimonial && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[#CA9E5B]/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-[#CA9E5B] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-white/90 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="text-sm">
                  <span className="text-[#CA9E5B] font-semibold">{testimonial.author}</span>
                  <span className="text-white/70 ml-2">{testimonial.role}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA section */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            onClick={onCTAClick}
            className="bg-[#CA9E5B] hover:bg-[#B8873A] text-white shadow-lg border-0 px-8 py-4 text-lg font-semibold group"
            size="lg"
          >
            <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            {ctaText}
          </Button>
          
          {paymentUrl && (
            <Button
              onClick={() => window.open(paymentUrl, '_blank', 'noopener,noreferrer')}
              variant="outline"
              className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-[#CA9E5B] px-6 py-4 text-lg font-medium"
              size="lg"
            >
              Purchase Access
            </Button>
          )}
        </div>
      </div>
    </m.div>
  );
}