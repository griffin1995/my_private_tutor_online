/**
 * CONTEXT7 SOURCE: /grx7/framer-motion - Skeleton loading animations with pulse effects
 * CONTEXT7 SOURCE: /context7/react_dev - React component patterns for loading states
 * CONTEXT7 SOURCE: /context7/tailwindcss - Skeleton styling with shimmer effects and responsive design
 * 
 * COMPONENT CREATION REASON: Task 5 implementation - Professional loading skeleton for testimonials grid
 * LOADING STATE REASON: Enhanced user experience during content loading with animated placeholders
 * PERFORMANCE IMPACT: Perceived performance improvement supporting premium user experience
 * 
 * Features:
 * - Animated skeleton placeholders with pulse effects
 * - Responsive design matching testimonial card layout
 * - GPU-accelerated shimmer animations
 * - Accessibility-friendly loading indicators
 * - Multiple skeleton variants for different content types
 * - Royal client-ready professional presentation
 */

'use client'

import { m } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

interface SkeletonCardProps {
  readonly variant?: 'testimonial' | 'compact' | 'list'
  readonly className?: string
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Skeleton animation variants for smooth loading presentation
// ANIMATION VARIANTS REASON: Professional loading states that maintain visual continuity
const skeletonVariants = {
  loading: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// CONTEXT7 SOURCE: /grx7/framer-motion - Shimmer effect animation for premium loading experience
// SHIMMER ANIMATION REASON: Sophisticated loading indicator that matches premium service standards
const shimmerVariants = {
  shimmer: {
    x: [-100, 100],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export function SkeletonCard({ 
  variant = 'testimonial',
  className = '' 
}: SkeletonCardProps) {

  // CONTEXT7 SOURCE: /context7/tailwindcss - Skeleton base styling with rounded corners and subtle backgrounds
  // BASE STYLING REASON: Consistent visual hierarchy matching actual testimonial card styling
  const SkeletonElement = ({ className = '', children }: { className?: string, children?: React.ReactNode }) => (
    <m.div
      className={`bg-primary-100 rounded-lg relative overflow-hidden ${className}`}
      variants={skeletonVariants}
      animate="loading"
    >
      {/* CONTEXT7 SOURCE: /grx7/framer-motion - Shimmer overlay effect for premium loading animation */}
      {/* SHIMMER OVERLAY REASON: Professional loading animation that indicates active processing */}
      <m.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        variants={shimmerVariants}
        animate="shimmer"
      />
      {children}
    </m.div>
  )

  if (variant === 'compact') {
    return (
      <Card className={`bg-white/80 backdrop-blur-sm border-2 border-primary-100 rounded-3xl ${className}`}>
        <CardContent className="p-6">
          {/* Rating and badges */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <SkeletonElement key={i} className="w-5 h-5 rounded-full" />
              ))}
            </div>
            <SkeletonElement className="w-16 h-6 rounded-full" />
          </div>

          {/* Quote */}
          <div className="space-y-2 mb-4">
            <SkeletonElement className="w-full h-4" />
            <SkeletonElement className="w-4/5 h-4" />
            <SkeletonElement className="w-3/5 h-4" />
          </div>

          {/* Author */}
          <div className="flex items-center gap-3">
            <SkeletonElement className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <SkeletonElement className="w-3/4 h-4" />
              <SkeletonElement className="w-1/2 h-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'list') {
    return (
      <Card className={`bg-white/80 backdrop-blur-sm border-2 border-primary-100 rounded-3xl ${className}`}>
        <CardContent className="p-8 flex flex-col md:flex-row md:gap-8">
          {/* Left section */}
          <div className="flex-1 mb-6 md:mb-0">
            {/* Rating and badges */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <SkeletonElement key={i} className="w-5 h-5 rounded-full" />
                ))}
              </div>
              <SkeletonElement className="w-20 h-6 rounded-full" />
            </div>

            {/* Quote */}
            <div className="space-y-3 mb-6">
              <SkeletonElement className="w-full h-5" />
              <SkeletonElement className="w-full h-5" />
              <SkeletonElement className="w-full h-5" />
              <SkeletonElement className="w-4/5 h-5" />
              <SkeletonElement className="w-3/4 h-5" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <SkeletonElement className="w-16 h-6 rounded-full" />
              <SkeletonElement className="w-20 h-6 rounded-full" />
            </div>
          </div>

          {/* Right section */}
          <div className="md:w-1/3 md:border-l md:border-primary-100 md:pl-8">
            {/* Author */}
            <div className="flex items-start gap-4 mb-4">
              <SkeletonElement className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonElement className="w-3/4 h-5" />
                <SkeletonElement className="w-full h-4" />
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <SkeletonElement className="w-4 h-4 rounded" />
                <SkeletonElement className="w-20 h-3" />
              </div>
              <div className="flex items-center gap-2">
                <SkeletonElement className="w-4 h-4 rounded" />
                <SkeletonElement className="w-24 h-3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Default testimonial variant
  return (
    <Card className={`h-full bg-white/80 backdrop-blur-sm border-2 border-primary-100 rounded-3xl ${className}`}>
      <CardContent className="p-8 h-full flex flex-col">
        {/* CONTEXT7 SOURCE: /context7/tailwindcss - Header section skeleton with ratings and badges */}
        {/* HEADER SKELETON REASON: Match testimonial card header layout for visual consistency */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <SkeletonElement key={i} className="w-5 h-5 rounded-full" />
            ))}
            <SkeletonElement className="w-8 h-4 ml-2" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonElement className="w-16 h-6 rounded-full" />
            <SkeletonElement className="w-8 h-8 rounded-full" />
          </div>
        </div>

        {/* CONTEXT7 SOURCE: /context7/tailwindcss - Quote section skeleton with varying line lengths */}
        {/* QUOTE SKELETON REASON: Natural text-like loading pattern that mirrors actual testimonial content */}
        <div className="relative flex-1 mb-6">
          <SkeletonElement className="absolute -top-2 -left-2 w-8 h-8 rounded" />
          <div className="relative z-10 space-y-3 pl-4">
            <SkeletonElement className="w-full h-4" />
            <SkeletonElement className="w-full h-4" />
            <SkeletonElement className="w-4/5 h-4" />
            <SkeletonElement className="w-3/4 h-4" />
            <SkeletonElement className="w-2/3 h-4" />
            
            {/* Expand button placeholder */}
            <SkeletonElement className="w-24 h-6 mt-4" />
          </div>
        </div>

        {/* CONTEXT7 SOURCE: /context7/tailwindcss - Author section skeleton with avatar and details */}
        {/* AUTHOR SKELETON REASON: Professional author section placeholder matching card layout */}
        <div className="border-t border-primary-100 pt-6">
          <div className="flex items-start gap-4">
            <SkeletonElement className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <SkeletonElement className="w-3/4 h-4" />
              <SkeletonElement className="w-full h-3" />
              
              {/* Metadata placeholders */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-1">
                  <SkeletonElement className="w-3 h-3 rounded" />
                  <SkeletonElement className="w-16 h-3" />
                </div>
                <div className="flex items-center gap-1">
                  <SkeletonElement className="w-3 h-3 rounded" />
                  <SkeletonElement className="w-20 h-3" />
                </div>
              </div>
            </div>
          </div>

          {/* Engagement actions placeholder */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary-50">
            <SkeletonElement className="w-16 h-8 rounded-lg" />
            <SkeletonElement className="w-8 h-8 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}