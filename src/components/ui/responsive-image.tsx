'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { FallbackImage } from '@/components/ui/fallback-image';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  fallbackSrc?: string;
  /** Use fill behavior for responsive containers */
  fill?: boolean;
  /** Use aspect ratio for mobile devices (16:9 default) */
  aspectRatio?: number;
  /** Responsive sizes attribute for Next.js Image optimization */
  sizes?: string;
  /** Width and height for non-fill images */
  width?: number;
  height?: number;
  /** Object fit for fill images */
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  /** Quality setting for image optimization */
  quality?: number;

/**
 * ResponsiveImage component following 2024-2025 Next.js best practices
 *
 * Features:
 * - Responsive behavior: fill on large screens, aspect ratio on mobile
 * - Automatic WebP/AVIF conversion via Next.js Image
 * - Proper loading strategies (lazy by default, priority for above-fold)
 * - Consistent sizing patterns across devices
 * - Built on existing FallbackImage for error handling
 *
 * Usage:
 * - Above-the-fold images: set priority={true}
 * - Large screens: uses fill with parent positioning
 * - Mobile screens: uses AspectRatio wrapper for consistent sizing
 */
export function ResponsiveImage({
  src,
  alt,
  priority = false,
  className = '',
  fallbackSrc,
  fill = true,
  aspectRatio = 16/9,
  sizes = '(max-width: 768px) 100vw, 50vw',
  width = 1920,
  height = 1080,
  objectFit = 'cover',
  quality = 90,
}: ResponsiveImageProps): JSX.Element {

  // For fill images, parent must have position relative/absolute/fixed
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(`object-${objectFit}`, className)}
        sizes={sizes}
        priority={priority}
        loading={priority ? 'eager' : 'lazy'}
        quality={quality}
        placeholder="blur"
        blurDataURL={generateBlurDataURL()}
      />
    );

  // For non-fill images, use standard responsive behavior
  return (
    <FallbackImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('w-full h-auto', className)}
      sizes={sizes}
      priority={priority}
      fallbackSrc={fallbackSrc}
      loading={priority ? 'eager' : 'lazy'}
    />
  );

/**
 * Optimized blur data URL generator for faster initial load
 * Shorter than the current 500+ character blur URLs in the component
 */
export const generateBlurDataURL = (width: number = 8, height: number = 6): string => {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>`
  ).toString('base64')}`;
};

/**
 * Standard image configuration for founder story images
 */
export const FOUNDER_STORY_IMAGE_CONFIG = {
  sizes: '(max-width: 768px) 100vw, 50vw',
  quality: 90,
  aspectRatio: 16/9,
  blurDataURL: generateBlurDataURL(),
} as const;