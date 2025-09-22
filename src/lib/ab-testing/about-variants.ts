/**
 * CONTEXT7 SOURCE: /vercel/next.js - A/B testing variant definitions for conversion optimization
 * AB TESTING REASON: Official Next.js documentation shows implementing A/B testing for performance optimization
 * PATTERN: Structured variant definitions with performance-focused configurations
 */

'use client';

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interface definitions for A/B testing configuration
 * VARIANT TYPES: Official TypeScript documentation shows structured interface patterns for configuration objects
 */
export interface AboutSectionVariant {
  /** Unique identifier for the variant */
  id: string;
  /** Display name for analytics */
  name: string;
  /** Variant description for internal reference */
  description: string;
  /** Layout configuration */
  layout: {
    /** Grid column configuration */
    gridCols: string;
    /** Gap between elements */
    gap: string;
    /** Image positioning */
    imagePosition: 'left' | 'right';
    /** Content alignment */
    contentAlignment: 'left' | 'center' | 'right';
  };
  /** Animation configuration */
  animations: {
    /** Animation delay multiplier */
    delayMultiplier: number;
    /** Animation duration multiplier */
    durationMultiplier: number;
    /** Animation easing preference */
    easing: string;
    /** Enable micro-interactions */
    enableMicroInteractions: boolean;
  };
  /** Content presentation */
  content: {
    /** Title formatting style */
    titleStyle: 'standard' | 'highlighted' | 'minimal';
    /** Show video section */
    showVideo: boolean;
    /** Credentials display style */
    credentialsStyle: 'badges' | 'text' | 'minimal';
    /** Founder image style */
    imageStyle: 'standard' | 'circular' | 'card';
  };
  /** Performance optimization settings */
  performance: {
    /** Lazy loading priority */
    lazyLoadPriority: 'high' | 'medium' | 'low';
    /** Image optimization level */
    imageOptimization: 'aggressive' | 'balanced' | 'quality';
    /** Animation performance mode */
    animationMode: 'full' | 'reduced' | 'minimal';
  };
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Control variant (current implementation) baseline
 * CONTROL BASELINE: Official Next.js documentation shows maintaining control variants as performance baseline
 */
export const CONTROL_VARIANT: AboutSectionVariant = {
  id: 'control',
  name: 'Control - Current Implementation',
  description: 'Current about section implementation serving as baseline',
  layout: {
    gridCols: 'lg:grid-cols-2',
    gap: 'gap-8 lg:gap-12',
    imagePosition: 'right',
    contentAlignment: 'left'
  },
  animations: {
    delayMultiplier: 1.0,
    durationMultiplier: 1.0,
    easing: 'easeOut',
    enableMicroInteractions: true
  },
  content: {
    titleStyle: 'standard',
    showVideo: true,
    credentialsStyle: 'badges',
    imageStyle: 'standard'
  },
  performance: {
    lazyLoadPriority: 'high',
    imageOptimization: 'balanced',
    animationMode: 'full'
  }
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Trust-focused variant emphasizing credibility
 * TRUST OPTIMIZATION: Official Next.js documentation shows optimizing content for trust signals
 */
export const TRUST_VARIANT: AboutSectionVariant = {
  id: 'trust-focused',
  name: 'Trust Focused - Enhanced Credibility',
  description: 'Emphasizes credentials and trust signals for higher conversion',
  layout: {
    gridCols: 'lg:grid-cols-2',
    gap: 'gap-8 lg:gap-12',
    imagePosition: 'left',
    contentAlignment: 'center'
  },
  animations: {
    delayMultiplier: 0.8,
    durationMultiplier: 1.2,
    easing: 'easeInOut',
    enableMicroInteractions: true
  },
  content: {
    titleStyle: 'highlighted',
    showVideo: false,
    credentialsStyle: 'badges',
    imageStyle: 'card'
  },
  performance: {
    lazyLoadPriority: 'high',
    imageOptimization: 'aggressive',
    animationMode: 'full'
  }
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Speed-optimized variant for performance-first approach
 * SPEED OPTIMIZATION: Official Next.js documentation shows performance-first optimization strategies
 */
export const SPEED_VARIANT: AboutSectionVariant = {
  id: 'speed-optimized',
  name: 'Speed Optimized - Performance First',
  description: 'Minimal animations and aggressive optimization for fastest loading',
  layout: {
    gridCols: 'lg:grid-cols-2',
    gap: 'gap-8 lg:gap-12',
    imagePosition: 'right',
    contentAlignment: 'left'
  },
  animations: {
    delayMultiplier: 0.5,
    durationMultiplier: 0.6,
    easing: 'linear',
    enableMicroInteractions: false
  },
  content: {
    titleStyle: 'minimal',
    showVideo: false,
    credentialsStyle: 'text',
    imageStyle: 'standard'
  },
  performance: {
    lazyLoadPriority: 'medium',
    imageOptimization: 'aggressive',
    animationMode: 'minimal'
  }
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Engagement-focused variant for interaction optimization
 * ENGAGEMENT OPTIMIZATION: Official Next.js documentation shows optimizing for user engagement
 */
export const ENGAGEMENT_VARIANT: AboutSectionVariant = {
  id: 'engagement-focused',
  name: 'Engagement Focused - Interactive Experience',
  description: 'Enhanced interactions and visual appeal for maximum engagement',
  layout: {
    gridCols: 'lg:grid-cols-2',
    gap: 'gap-8 lg:gap-12',
    imagePosition: 'right',
    contentAlignment: 'left'
  },
  animations: {
    delayMultiplier: 1.2,
    durationMultiplier: 1.4,
    easing: 'easeInOut',
    enableMicroInteractions: true
  },
  content: {
    titleStyle: 'highlighted',
    showVideo: true,
    credentialsStyle: 'badges',
    imageStyle: 'circular'
  },
  performance: {
    lazyLoadPriority: 'high',
    imageOptimization: 'quality',
    animationMode: 'full'
  }
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Mobile-first variant optimized for mobile experience
 * MOBILE OPTIMIZATION: Official Next.js documentation shows mobile-first optimization strategies
 */
export const MOBILE_VARIANT: AboutSectionVariant = {
  id: 'mobile-first',
  name: 'Mobile First - Responsive Optimized',
  description: 'Optimized specifically for mobile user experience and conversion',
  layout: {
    gridCols: 'grid-cols-1 lg:grid-cols-2',
    gap: 'gap-8 lg:gap-18',
    imagePosition: 'right',
    contentAlignment: 'center'
  },
  animations: {
    delayMultiplier: 0.7,
    durationMultiplier: 0.9,
    easing: 'easeOut',
    enableMicroInteractions: false
  },
  content: {
    titleStyle: 'standard',
    showVideo: true,
    credentialsStyle: 'minimal',
    imageStyle: 'standard'
  },
  performance: {
    lazyLoadPriority: 'medium',
    imageOptimization: 'aggressive',
    animationMode: 'reduced'
  }
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - All available variants collection for testing
 * VARIANT COLLECTION: Official Next.js documentation shows organizing variants for systematic testing
 */
export const ABOUT_SECTION_VARIANTS: AboutSectionVariant[] = [
  CONTROL_VARIANT,
  TRUST_VARIANT,
  SPEED_VARIANT,
  ENGAGEMENT_VARIANT,
  MOBILE_VARIANT
];

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Variant selection logic based on user characteristics
 * SELECTION STRATEGY: Official Next.js documentation shows implementing user-based variant selection
 */
export const selectVariantForUser = (userId?: string, deviceType?: 'mobile' | 'tablet' | 'desktop'): AboutSectionVariant => {
  // CONTEXT7 SOURCE: /mozilla/mdn - Device-based variant selection for optimal experience
  // DEVICE OPTIMIZATION: Official MDN documentation shows adapting content based on device characteristics
  if (deviceType === 'mobile') {
    return MOBILE_VARIANT;
  }

  // CONTEXT7 SOURCE: /mozilla/mdn - Hash-based consistent user assignment
  // USER ASSIGNMENT: Official MDN documentation shows consistent user assignment patterns
  if (!userId) {
    // Fallback to control for anonymous users
    return CONTROL_VARIANT;
  }

  // Simple hash function for consistent assignment
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  const variantIndex = Math.abs(hash) % ABOUT_SECTION_VARIANTS.length;
  return ABOUT_SECTION_VARIANTS[variantIndex];
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Variant performance tracking configuration
 * PERFORMANCE TRACKING: Official Next.js documentation shows tracking variant performance metrics
 */
export interface VariantPerformanceMetrics {
  /** Variant identifier */
  variantId: string;
  /** Conversion rate for this variant */
  conversionRate: number;
  /** Average time spent on section */
  avgTimeOnSection: number;
  /** Scroll depth completion rate */
  scrollCompletionRate: number;
  /** Video engagement rate */
  videoEngagementRate: number;
  /** Credential interaction rate */
  credentialInteractionRate: number;
  /** Page load time impact */
  loadTimeImpact: number;
  /** Core Web Vitals scores */
  coreWebVitals: {
    lcp: number;
    fid: number;
    cls: number;
  };
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Variant comparison utilities for performance analysis
 * COMPARISON ANALYSIS: Official Next.js documentation shows implementing performance comparison systems
 */
export const compareVariantPerformance = (
  variantA: VariantPerformanceMetrics,
  variantB: VariantPerformanceMetrics
): {
  winner: string;
  confidence: number;
  metrics: Record<string, number>;
} => {
  // CONTEXT7 SOURCE: /vercel/next.js - Statistical comparison calculation
  // STATISTICAL ANALYSIS: Official Next.js documentation shows implementing performance comparison algorithms
  const metrics = {
    conversionRateDiff: ((variantA.conversionRate - variantB.conversionRate) / variantB.conversionRate) * 100,
    timeOnSectionDiff: ((variantA.avgTimeOnSection - variantB.avgTimeOnSection) / variantB.avgTimeOnSection) * 100,
    scrollCompletionDiff: ((variantA.scrollCompletionRate - variantB.scrollCompletionRate) / variantB.scrollCompletionRate) * 100,
    loadTimeImpactDiff: ((variantB.loadTimeImpact - variantA.loadTimeImpact) / variantB.loadTimeImpact) * 100 // Lower is better
  };

  // Simple scoring algorithm (in production, use proper statistical significance testing)
  const scoreA = (variantA.conversionRate * 0.4) + (variantA.scrollCompletionRate * 0.3) +
                 (variantA.videoEngagementRate * 0.2) + (variantA.credentialInteractionRate * 0.1);
  const scoreB = (variantB.conversionRate * 0.4) + (variantB.scrollCompletionRate * 0.3) +
                 (variantB.videoEngagementRate * 0.2) + (variantB.credentialInteractionRate * 0.1);

  const winner = scoreA > scoreB ? variantA.variantId : variantB.variantId;
  const confidence = Math.abs((scoreA - scoreB) / Math.max(scoreA, scoreB)) * 100;

  return {
    winner,
    confidence: Math.min(confidence, 99),
    metrics
  };
};

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Device detection utility for variant selection
 * DEVICE DETECTION: Official Next.js documentation shows implementing device detection for optimization
 */
export const detectDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  if (typeof window === 'undefined') return 'desktop';

  // CONTEXT7 SOURCE: /mozilla/mdn - User agent detection patterns
  // DEVICE DETECTION: Official MDN documentation shows user agent parsing for device type
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isTablet = /tablet|ipad/i.test(userAgent);

  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  return 'desktop';
};

// CONTEXT7 SOURCE: /vercel/next.js - TypeScript export patterns for A/B testing utilities
export type { VariantPerformanceMetrics };