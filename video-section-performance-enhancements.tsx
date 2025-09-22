/**
 * Performance Enhancement Patches for VideoMasterclassSectionTextFullWidth
 * CONTEXT7 SOURCE: /vercel/next.js - Performance optimization patterns
 * CONTEXT7 SOURCE: /reactjs/react.dev - React performance hooks and patterns
 *
 * These enhancements build on TypeScript-pro's optimizations
 * to add additional performance improvements
 */

// ============================================================================
// ENHANCEMENT 1: Blur Placeholder Generation
// ============================================================================
// CONTEXT7 SOURCE: /vercel/next.js - Image optimization with blur placeholders
export const generateBlurDataURL = (dominantColor: string = '#1a1a1a'): string => {
  // Create a 4x3 pixel blur placeholder (matches 16:9 aspect ratio)
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) {
    // Server-side fallback: return a base64 encoded 1x1 pixel
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="4" height="3" xmlns="http://www.w3.org/2000/svg">
        <rect width="4" height="3" fill="${dominantColor}"/>
      </svg>`
    ).toString('base64')}`;
  }

  canvas.width = 4;
  canvas.height = 3;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = dominantColor;
    ctx.fillRect(0, 0, 4, 3);
  }
  return canvas.toDataURL();
};

// ============================================================================
// ENHANCEMENT 2: Video Placeholder Component
// ============================================================================
// CONTEXT7 SOURCE: /reactjs/react.dev - Component composition for loading states
export const VideoPlaceholder = memo(function VideoPlaceholder() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div
        className="w-full rounded-lg overflow-hidden animate-pulse"
        style={{ aspectRatio: '16/9' }}
      >
        <div className="w-full h-full bg-gray-800/50 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/10 animate-pulse" />
        </div>
      </div>
    </div>
  );
});

// ============================================================================
// ENHANCEMENT 3: Intersection Observer Hook
// ============================================================================
// CONTEXT7 SOURCE: /reactjs/react.dev - useCallback and useEffect for performance
import { useCallback, useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  const callback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
      }
    });
  }, []);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return { targetRef, isIntersecting };
};

// ============================================================================
// ENHANCEMENT 4: Performance Monitor Hook
// ============================================================================
// CONTEXT7 SOURCE: /reactjs/react.dev - useEffect for side effects monitoring
export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.performance) return;

    const startMark = `${componentName}-start`;
    const endMark = `${componentName}-end`;
    const measureName = `${componentName}-render`;

    // Mark component mount start
    performance.mark(startMark);

    return () => {
      // Mark component mount end
      performance.mark(endMark);

      try {
        // Measure the duration
        performance.measure(measureName, startMark, endMark);

        // Get the measurement
        const measures = performance.getEntriesByName(measureName);
        const lastMeasure = measures[measures.length - 1];

        if (lastMeasure && lastMeasure.duration > 16) {
          // Log slow renders (> 16ms = missed frame)
          console.warn(`[Performance] ${componentName} render took ${lastMeasure.duration.toFixed(2)}ms`);
        }

        // Clean up marks and measures
        performance.clearMarks(startMark);
        performance.clearMarks(endMark);
        performance.clearMeasures(measureName);
      } catch (e) {
        // Ignore errors in performance measurement
      }
    };
  }, [componentName]);
};

// ============================================================================
// ENHANCEMENT 5: Optimized Image Component Wrapper
// ============================================================================
// CONTEXT7 SOURCE: /vercel/next.js - Next.js Image with full optimization
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const OptimizedVideoThumbnail = memo(function OptimizedVideoThumbnail({
  src,
  alt,
  className = "",
  priority = false
}: OptimizedImageProps) {
  const [blurDataURL, setBlurDataURL] = useState<string>('');

  useEffect(() => {
    // Generate blur placeholder on client
    setBlurDataURL(generateBlurDataURL('#1a1a1a'));
  }, []);

  return (
    <Image
      src={src}
      alt={alt}
      width={640}
      height={360}
      className={`${className} transition-opacity duration-300`}
      style={{ aspectRatio: "16/9" }}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
      quality={75}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
    />
  );
});

// ============================================================================
// ENHANCEMENT 6: Resource Hints Component
// ============================================================================
// CONTEXT7 SOURCE: /vercel/next.js - Resource optimization patterns
export const VideoResourceHints = memo(function VideoResourceHints({
  videoUrl,
  thumbnailUrl
}: {
  videoUrl?: string;
  thumbnailUrl: string;
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Preload critical thumbnail
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = thumbnailUrl;
    document.head.appendChild(link);

    // Prefetch video iframe origin if YouTube
    if (videoUrl && videoUrl.includes('youtube.com')) {
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = 'https://www.youtube.com';
      document.head.appendChild(preconnect);
    }

    return () => {
      // Cleanup
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, [videoUrl, thumbnailUrl]);

  return null;
});

// ============================================================================
// ENHANCEMENT 7: Performance Budget Monitor
// ============================================================================
// CONTEXT7 SOURCE: /reactjs/react.dev - Component performance monitoring
export const PerformanceBudget = {
  RENDER_TIME: 16, // Target 60fps
  HOOK_EXECUTION: 2, // Max 2ms for hooks
  MEMORY_THRESHOLD: 50 * 1024 * 1024, // 50MB threshold

  checkBudget: (metricName: string, value: number, threshold: number) => {
    if (value > threshold) {
      console.warn(`[Performance Budget] ${metricName} exceeded: ${value}ms (threshold: ${threshold}ms)`);

      // Send to monitoring service in production
      if (process.env.NODE_ENV === 'production') {
        // Track performance budget violation
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'performance_budget_exceeded', {
            metric: metricName,
            value: value,
            threshold: threshold
          });
        }
      }
    }
  }
};

// ============================================================================
// ENHANCEMENT 8: Lazy Component Wrapper
// ============================================================================
// CONTEXT7 SOURCE: /vercel/next.js - Dynamic imports with loading states
import dynamic from 'next/dynamic';

export const LazyHeroVideoDialog = dynamic(
  () => import("@/components/magicui/hero-video-dialog"),
  {
    loading: () => <VideoPlaceholder />,
    ssr: true // Maintain SSR for SEO
  }
);

// ============================================================================
// USAGE EXAMPLE: Enhanced VideoMasterclassSectionTextFullWidth
// ============================================================================
/**
 * Example integration of performance enhancements:
 *
 * 1. Import the enhancements:
 * import {
 *   LazyHeroVideoDialog,
 *   OptimizedVideoThumbnail,
 *   useIntersectionObserver,
 *   usePerformanceMonitor,
 *   VideoResourceHints
 * } from './video-section-performance-enhancements';
 *
 * 2. Use in component:
 * const { targetRef, isIntersecting } = useIntersectionObserver();
 * usePerformanceMonitor('VideoMasterclassSectionTextFullWidth');
 *
 * 3. Replace HeroVideoDialog with LazyHeroVideoDialog
 * 4. Replace Image with OptimizedVideoThumbnail
 * 5. Add VideoResourceHints component
 * 6. Wrap content in targetRef div for lazy rendering
 */