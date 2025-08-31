// CONTEXT7 SOURCE: /vercel/next.js - Video fallback patterns for deployment reliability
// IMPLEMENTATION REASON: Temporary solution for video 404 issues on Vercel deployment

/**
 * Video fallback configuration for production deployment issues
 * Provides GitHub raw URLs as temporary CDN solution
 */
export const VIDEO_FALLBACK_CONFIG = {
  // Primary Vercel URLs (preferred)
  primary: {
    'background-video-2025.mp4': '/videos/background-video-2025.mp4',
    'landing-page-hero-background.mp4': '/videos/landing-page-hero-background.mp4', 
    'elizabeth-introduction-sound.mp4': '/videos/elizabeth-introduction-sound.mp4',
  },
  // GitHub raw URLs (fallback)
  fallback: {
    'background-video-2025.mp4': 'https://raw.githubusercontent.com/griffin1995/my_private_tutor_online/master/public/videos/background-video-2025.mp4',
    'landing-page-hero-background.mp4': 'https://raw.githubusercontent.com/griffin1995/my_private_tutor_online/master/public/videos/landing-page-hero-background.mp4',
    'elizabeth-introduction-sound.mp4': 'https://raw.githubusercontent.com/griffin1995/my_private_tutor_online/master/public/videos/elizabeth-introduction-sound.mp4',
  }
} as const;

/**
 * Get video URL with automatic fallback support
 * @param filename - Video filename (e.g., 'background-video-2025.mp4')
 * @returns Primary URL or fallback URL if primary fails
 */
export function getVideoUrl(filename: string): string {
  // For now, return GitHub raw URL directly to resolve immediate 404 issues
  // TODO: Implement proper fallback detection once Vercel deployment is resolved
  const fallbackUrl = VIDEO_FALLBACK_CONFIG.fallback[filename as keyof typeof VIDEO_FALLBACK_CONFIG.fallback];
  return fallbackUrl || `/videos/${filename}`;
}

/**
 * Video loading error handler for React components
 * @param event - Video error event
 * @param fallbackUrl - Alternative video source
 */
export function handleVideoError(event: React.SyntheticEvent<HTMLVideoElement>, fallbackUrl?: string): void {
  const video = event.currentTarget;
  if (fallbackUrl && video.src !== fallbackUrl) {
    video.src = fallbackUrl;
    video.load();
  }
}

/**
 * Check if video URL is accessible (for monitoring)
 * @param url - Video URL to check
 * @returns Promise<boolean>
 */
export async function checkVideoAccessibility(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}