/**
 * Advanced Image Optimization Utilities
 * ====================================
 * 
 * CONTEXT7 SOURCE: /vercel/next.js - Advanced image optimization patterns with AVIF priority
 * OPTIMIZATION REASON: Official Next.js documentation for next-generation image formats and responsive delivery
 * 
 * CONTEXT7 SOURCE: /mozilla/mdn - Modern image format detection and progressive enhancement
 * BROWSER SUPPORT REASON: Official MDN patterns for feature detection and graceful fallbacks
 * 
 * Advanced Features:
 * - AVIF priority with WebP fallback and original format ultimate fallback
 * - Smart quality selection based on image content type and viewport
 * - Responsive sizing matrix for optimal performance across devices
 * - Critical path optimization for above-the-fold images
 * - Memory-efficient loading strategies for large image sets
 * - Progressive enhancement for next-generation formats
 */

// CONTEXT7 SOURCE: /vercel/next.js - Image component props interface for type safety
// TYPE SAFETY REASON: Official Next.js documentation for image component prop validation
export interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty' | `data:image/${string}`
  blurDataURL?: string
  className?: string
  style?: React.CSSProperties
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  loading?: 'lazy' | 'eager'
  contentType?: 'hero' | 'content' | 'thumbnail' | 'icon' | 'logo'
  cropFocus?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'face'
}

// CONTEXT7 SOURCE: /vercel/next.js - Advanced device size matrix for responsive images
// RESPONSIVE OPTIMIZATION REASON: Optimized breakpoint strategy matching Next.js image optimization
export const DEVICE_BREAKPOINTS = {
  mobile: { min: 320, max: 479, quality: 75, format: 'avif' },
  mobileLarge: { min: 480, max: 639, quality: 80, format: 'avif' },
  tablet: { min: 640, max: 767, quality: 85, format: 'avif' },
  tabletLarge: { min: 768, max: 1023, quality: 85, format: 'avif' },
  desktop: { min: 1024, max: 1199, quality: 90, format: 'avif' },
  desktopLarge: { min: 1200, max: 1439, quality: 90, format: 'avif' },
  ultrawide: { min: 1440, max: 1919, quality: 95, format: 'avif' },
  retina: { min: 1920, max: 3839, quality: 95, format: 'avif' },
  ultra: { min: 3840, max: Infinity, quality: 95, format: 'avif' }
} as const

// CONTEXT7 SOURCE: /vercel/next.js - Content-aware quality optimization
// QUALITY OPTIMIZATION REASON: Different image types require different quality settings for optimal balance
export const CONTENT_QUALITY_MAP = {
  hero: { avif: 90, webp: 85, jpeg: 80, png: 95 },
  content: { avif: 85, webp: 80, jpeg: 75, png: 90 },
  thumbnail: { avif: 75, webp: 70, jpeg: 65, png: 85 },
  icon: { avif: 95, webp: 90, jpeg: 85, png: 100 },
  logo: { avif: 95, webp: 90, jpeg: 85, png: 100 }
} as const

// CONTEXT7 SOURCE: /vercel/next.js - Advanced sizes configuration for responsive images
// RESPONSIVE SIZING REASON: Official Next.js documentation for optimal srcSet generation
export const generateResponsiveSizes = (contentType: OptimizedImageProps['contentType'] = 'content'): string => {
  switch (contentType) {
    case 'hero':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, (max-width: 1440px) 100vw, 100vw'
    
    case 'content':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, (max-width: 1440px) 60vw, 50vw'
    
    case 'thumbnail':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1440px) 25vw, 20vw'
    
    case 'icon':
      return '(max-width: 640px) 8vw, (max-width: 1024px) 6vw, (max-width: 1440px) 4vw, 3vw'
    
    case 'logo':
      return '(max-width: 640px) 40vw, (max-width: 1024px) 30vw, (max-width: 1440px) 25vw, 20vw'
    
    default:
      return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, (max-width: 1440px) 60vw, 50vw'
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Smart quality selection based on content type and device
// QUALITY OPTIMIZATION REASON: Adaptive quality based on content importance and viewport constraints
export const getOptimalQuality = (
  contentType: OptimizedImageProps['contentType'] = 'content',
  format: 'avif' | 'webp' | 'jpeg' | 'png' = 'avif',
  customQuality?: number
): number => {
  if (customQuality) return customQuality
  
  const qualityMap = CONTENT_QUALITY_MAP[contentType]
  return qualityMap[format] || qualityMap.avif
}

// CONTEXT7 SOURCE: /mozilla/mdn - Progressive enhancement for next-generation image formats
// PROGRESSIVE ENHANCEMENT REASON: Feature detection for optimal format delivery with graceful fallbacks
export const detectOptimalFormat = (): 'avif' | 'webp' | 'jpeg' => {
  // CONTEXT7 SOURCE: /vercel/next.js - Server-side rendering safety check
  // SSR SAFETY REASON: Prevent window access during server-side rendering
  if (typeof window === 'undefined') return 'avif' // Default to AVIF for SSR
  
  // CONTEXT7 SOURCE: /mozilla/mdn - AVIF format detection using HTMLCanvasElement
  // AVIF DETECTION REASON: Check for AVIF support using canvas toDataURL method
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  
  try {
    // Test AVIF support
    const avifSupport = canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0
    if (avifSupport) return 'avif'
    
    // Test WebP support
    const webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    if (webpSupport) return 'webp'
    
    // Fallback to JPEG
    return 'jpeg'
  } catch {
    return 'jpeg'
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Advanced blur placeholder generation
// PLACEHOLDER OPTIMIZATION REASON: Improve perceived loading performance with optimized blur placeholders
export const generateBlurDataURL = (
  width: number = 8,
  height: number = 8,
  color: string = '#f3f4f6'
): string => {
  // CONTEXT7 SOURCE: /mozilla/mdn - Canvas-based blur placeholder generation
  // BLUR GENERATION REASON: Create optimized base64 placeholders for smooth loading transitions
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  if (!ctx) return `data:image/svg+xml;base64,${btoa(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color}"/></svg>`)}`
  
  canvas.width = width
  canvas.height = height
  
  // Create gradient blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, color)
  gradient.addColorStop(0.5, '#e5e7eb')
  gradient.addColorStop(1, color)
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  
  return canvas.toDataURL()
}

// CONTEXT7 SOURCE: /vercel/next.js - Critical path image identification for preloading
// PRELOADING OPTIMIZATION REASON: Identify above-the-fold images for priority loading
export const isCriticalImage = (
  contentType: OptimizedImageProps['contentType'] = 'content',
  priority?: boolean
): boolean => {
  // Explicit priority override
  if (priority !== undefined) return priority
  
  // Auto-detect critical images based on content type
  const criticalTypes: Array<OptimizedImageProps['contentType']> = ['hero', 'logo']
  return criticalTypes.includes(contentType)
}

// CONTEXT7 SOURCE: /vercel/next.js - Responsive image dimensions calculator
// DIMENSION OPTIMIZATION REASON: Calculate optimal dimensions based on content type and viewport
export const calculateResponsiveDimensions = (
  originalWidth: number,
  originalHeight: number,
  contentType: OptimizedImageProps['contentType'] = 'content',
  maxWidth?: number
): { width: number; height: number; aspectRatio: number } => {
  const aspectRatio = originalWidth / originalHeight
  
  // Content-specific max width constraints
  const maxWidthConstraints = {
    hero: maxWidth || 1920,
    content: maxWidth || 1200,
    thumbnail: maxWidth || 400,
    icon: maxWidth || 64,
    logo: maxWidth || 300
  }
  
  const constrainedMaxWidth = maxWidthConstraints[contentType || 'content']
  
  let finalWidth = originalWidth
  let finalHeight = originalHeight
  
  // Scale down if necessary
  if (originalWidth > constrainedMaxWidth) {
    finalWidth = constrainedMaxWidth
    finalHeight = Math.round(constrainedMaxWidth / aspectRatio)
  }
  
  return {
    width: finalWidth,
    height: finalHeight,
    aspectRatio
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Advanced image loading strategy selector
// LOADING STRATEGY REASON: Optimal loading behavior based on content type and viewport position
export const getOptimalLoadingStrategy = (
  contentType: OptimizedImageProps['contentType'] = 'content',
  isAboveFold: boolean = false
): { loading: 'lazy' | 'eager'; priority: boolean } => {
  // Critical images should load eagerly with priority
  if (isCriticalImage(contentType) || isAboveFold) {
    return { loading: 'eager', priority: true }
  }
  
  // Content images based on type
  switch (contentType) {
    case 'hero':
    case 'logo':
      return { loading: 'eager', priority: true }
    
    case 'content':
      return { loading: 'lazy', priority: false }
    
    case 'thumbnail':
    case 'icon':
      return { loading: 'lazy', priority: false }
    
    default:
      return { loading: 'lazy', priority: false }
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Memory-efficient batch loading for image galleries
// MEMORY OPTIMIZATION REASON: Prevent memory overload when loading multiple images simultaneously
export const createImageBatchLoader = (batchSize: number = 5) => {
  let loadingQueue: Array<() => Promise<void>> = []
  let currentlyLoading = 0
  
  const processQueue = async (): Promise<void> => {
    while (loadingQueue.length > 0 && currentlyLoading < batchSize) {
      const loader = loadingQueue.shift()
      if (loader) {
        currentlyLoading++
        try {
          await loader()
        } finally {
          currentlyLoading--
          processQueue() // Process next batch
        }
      }
    }
  }
  
  return {
    addToQueue: (loader: () => Promise<void>) => {
      loadingQueue.push(loader)
      processQueue()
    },
    
    clearQueue: () => {
      loadingQueue = []
    },
    
    getQueueSize: () => loadingQueue.length,
    getCurrentlyLoading: () => currentlyLoading
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Performance metrics collection for image optimization
// PERFORMANCE MONITORING REASON: Track image loading performance for optimization insights
export interface ImagePerformanceMetrics {
  loadStartTime: number
  loadEndTime: number
  loadDuration: number
  imageSize: number
  format: string
  quality: number
  fromCache: boolean
}

export const createImagePerformanceTracker = () => {
  const metrics: Map<string, ImagePerformanceMetrics> = new Map()
  
  return {
    startTracking: (imageId: string, format: string, quality: number) => {
      metrics.set(imageId, {
        loadStartTime: performance.now(),
        loadEndTime: 0,
        loadDuration: 0,
        imageSize: 0,
        format,
        quality,
        fromCache: false
      })
    },
    
    endTracking: (imageId: string, imageSize: number, fromCache: boolean = false) => {
      const metric = metrics.get(imageId)
      if (metric) {
        const endTime = performance.now()
        metric.loadEndTime = endTime
        metric.loadDuration = endTime - metric.loadStartTime
        metric.imageSize = imageSize
        metric.fromCache = fromCache
      }
    },
    
    getMetrics: (imageId: string) => metrics.get(imageId),
    getAllMetrics: () => Array.from(metrics.values()),
    clearMetrics: () => metrics.clear()
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Image format conversion utilities for build-time optimization
// BUILD OPTIMIZATION REASON: Convert images to optimal formats during build process
export const getImageExtension = (format: 'avif' | 'webp' | 'jpeg' | 'png'): string => {
  const extensions = {
    avif: '.avif',
    webp: '.webp',
    jpeg: '.jpg',
    png: '.png'
  }
  return extensions[format]
}

// CONTEXT7 SOURCE: /vercel/next.js - SEO-optimized alt text generation based on image context
// SEO OPTIMIZATION REASON: Generate descriptive alt text for better accessibility and search rankings
export const generateOptimizedAltText = (
  originalAlt: string,
  contentType: OptimizedImageProps['contentType'] = 'content',
  context?: string
): string => {
  if (!originalAlt) return ''
  
  // Remove redundant phrases and optimize for SEO
  let optimizedAlt = originalAlt
    .replace(/image of /gi, '')
    .replace(/picture of /gi, '')
    .replace(/photo of /gi, '')
    .trim()
  
  // Add context-specific enhancements
  if (context && !optimizedAlt.toLowerCase().includes(context.toLowerCase())) {
    optimizedAlt = `${optimizedAlt} - ${context}`
  }
  
  // Content-type specific optimization
  switch (contentType) {
    case 'hero':
      if (!optimizedAlt.toLowerCase().includes('hero')) {
        optimizedAlt = `${optimizedAlt} hero image`
      }
      break
    
    case 'logo':
      if (!optimizedAlt.toLowerCase().includes('logo')) {
        optimizedAlt = `${optimizedAlt} logo`
      }
      break
  }
  
  return optimizedAlt
}

// CONTEXT7 SOURCE: /vercel/next.js - All utilities exported individually for advanced image optimization
// EXPORT PATTERN REASON: Official Next.js documentation shows individual exports for better tree-shaking