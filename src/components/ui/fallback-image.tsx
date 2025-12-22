'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface FallbackImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  loading?: 'lazy' | 'eager';
  onError?: () => void;
  onLoad?: () => void;

/**
 * Enhanced Image component with robust fallback support
 *
 * Features:
 * - Automatic fallback on load errors
 * - State management for error handling
 * - Proper SSR/hydration support
 * - Debug logging for development
 * - Full Next.js Image component compatibility
 */
export function FallbackImage({
  src,
  fallbackSrc = '/images/blog/education-insights-header.jpg',
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
  loading = 'lazy',
  onError,
  onLoad
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Reset state when src prop changes
  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      // Debug logging for development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[FallbackImage] Failed to load: ${imgSrc}`);
        console.log(`[FallbackImage] Falling back to: ${fallbackSrc}`);

      setImgSrc(fallbackSrc);
      setHasError(true);
      onError?.();
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  return (
    <div className="relative">
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        sizes={sizes}
        priority={priority}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        // Ensure image optimization is enabled
        quality={85}
      />

      {/* Loading skeleton */}
      {isLoading && (
        <div
          className="absolute inset-0 bg-muted animate-pulse"
          style={{ width, height }}
          aria-label="Loading image..."
        />
      )}
    </div>
  );

/**
 * Get category-specific fallback images for better contextual defaults
 */
export function getCategoryFallback(category: string): string {
  const fallbacks: Record<string, string> = {
    'school-applications': '/images/blog/selective-schools-admissions.jpg',
    'exam-preparation': '/images/blog/revision-techniques-research.jpg',
    'child-wellbeing': '/images/blog/motivating-child-without-pressure.jpg',
    'home-schooling': '/images/blog/homeschooling-excellence.jpg',
    '11-plus-exams': '/images/blog/navigating-entry-points.jpg',
    'a-levels': '/images/blog/gcse-a-level-success-year-7.jpg',
    'gcses': '/images/blog/gcse-a-level-success-year-7.jpg',
    'nursery-pre-prep': '/images/blog/independent-school-interviews.jpg',
    'oxbridge': '/images/blog/personalised-tutoring-cognitive-science.jpg',
    'primary': '/images/blog/study-routine-without-burnout.jpg',
    'secondary': '/images/blog/study-routine-without-burnout.jpg',
    'university-applications': '/images/blog/personalised-tutoring-cognitive-science.jpg',
    'common-entrance': '/images/blog/independent-school-interviews.jpg',
    'summer-learning': '/images/blog/motivating-child-without-pressure.jpg',
  };

  return fallbacks[category] || '/images/blog/education-insights-header.jpg';
}

/**
 * Validate image path to ensure it's not empty, null, or undefined
 */
export function validateImagePath(imagePath: string | null | undefined): boolean {
  return Boolean(
    imagePath &&
    imagePath.trim() !== '' &&
    !imagePath.includes('undefined') &&
    !imagePath.includes('null') &&
    imagePath !== 'null' &&
    imagePath !== 'undefined'
  );
}
