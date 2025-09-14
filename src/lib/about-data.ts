/**
 * CONTEXT7 SOURCE: /vercel/next.js - React cache function for memoizing data fetching operations
 * DATA CACHING REASON: Official Next.js documentation shows using React.cache() to deduplicate and cache data access
 * PATTERN: Memoized content access with synchronous CMS patterns to prevent homepage failures
 */

import { cache } from 'react';

/**
 * CONTEXT7 SOURCE: /vercel/next.js - TypeScript interface patterns for cached data structures
 * INTERFACE DESIGN REASON: Official Next.js documentation recommends type-safe interfaces for cached data
 */
interface AboutContentData {
  /** Main heading text */
  title: string;
  /** Formatted title with line breaks */
  formattedTitle: string;
  /** Founder introduction paragraph */
  founderIntro: string;
  /** Company evolution paragraph */
  companyEvolution: string;
  /** Current ethos paragraph */
  currentEthos: string;
  /** Video introduction text */
  videoIntroText: string;
  /** Founder image details */
  founderImage: {
    url: string;
    alt: string;
  };
  /** Brand credentials */
  credentials: {
    tatler: string;
    schoolGuide: string;
    royal: string;
  };
}

/**
 * CONTEXT7 SOURCE: /vercel/next.js - React cache memoization for static content access
 * CACHING STRATEGY REASON: Official Next.js documentation shows cache() prevents redundant data fetching
 * SYNCHRONOUS PATTERN: Maintains synchronous CMS architecture to prevent August 2025 homepage failures
 */
export const getAboutContent = cache((): AboutContentData => {
  // CONTEXT7 SOURCE: /vercel/next.js - Synchronous data return patterns for static content
  // SYNCHRONOUS REQUIREMENT: Direct data return prevents loading states and homepage failures
  return {
    title: "World-Class Education, At Your Fingertips",
    formattedTitle: "World-Class Education,\nAt Your Fingertips.",
    founderIntro: `At the heart of My Private Tutor Online is a singular vision: academic support that is both exceptional and deeply personal. Founded in 2010 by Elizabeth Burrows—a Cambridge-accepted educator and former Forbes journalist—the company began not as a business, but as a trusted network of elite colleagues she met throughout her international tutoring career.`,
    companyEvolution: `What started as a circle of personal recommendations has since evolved—organically and exclusively—into one of the UK's most respected names in specialist private tutoring. As testament, My Private Tutor Online is honoured to be featured in Tatler's Address Book and recognised as School Guide's 'Top Pick' for private tuition.`,
    currentEthos: `15 years later, the ethos remains the same: every tutor is handpicked, every match thoughtfully made, and every family accommodated directly by Elizabeth and her team.`,
    videoIntroText: "Meet Elizabeth, here to help your child thrive",
    founderImage: {
      url: "/images/team/elizabeth-burrows-founder-spare.jpg",
      alt: "Elizabeth Burrows, Founder of My Private Tutor Online"
    },
    credentials: {
      tatler: "Address Book",
      schoolGuide: "'Top Pick'",
      royal: "Trusted by Royal Clientele"
    }
  };
});

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Cache function for video resource management
 * VIDEO CACHING REASON: Official Next.js documentation shows memoizing resource access for performance
 */
export const getAboutVideoData = cache(() => {
  return {
    videoSrc: "elizabeth-introduction-sound.mp4",
    thumbnailSrc: "/images/video-thumbnails/introduction-video-thumbnail-2025.png",
    thumbnailAlt: "Elizabeth Burrows Introduction Video - Founder of My Private Tutor Online",
    animationStyle: "from-center" as const
  };
});

/**
 * CONTEXT7 SOURCE: /vercel/next.js - Cache function for performance monitoring data
 * MONITORING CACHING REASON: Official Next.js documentation shows caching frequently accessed configuration
 */
export const getAboutPerformanceConfig = cache(() => {
  return {
    animationDurations: {
      heading: 0.8,
      content: 0.8,
      image: 1.0,
      credentials: 0.8
    },
    animationEase: [0.25, 0.46, 0.45, 0.94] as const,
    delayOffsets: {
      heading: 0.1,
      firstParagraph: 0.6,
      video: 0.7,
      secondParagraph: 0.8,
      thirdParagraph: 1.0,
      image: 0.3,
      credentials: 1.2
    }
  };
});

// CONTEXT7 SOURCE: /vercel/next.js - TypeScript export patterns for cached data types
export type { AboutContentData };