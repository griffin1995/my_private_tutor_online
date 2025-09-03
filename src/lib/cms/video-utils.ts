// CONTEXT7 SOURCE: /microsoft/typescript - Utility function patterns for URL parsing and video ID extraction
// IMPLEMENTATION REASON: Official TypeScript documentation Section 5.2 demonstrates string manipulation patterns for robust URL parsing
// DATABASE OPTIMIZATION: CMS video ID extraction system for seamless OptimizedVideoPlayer integration

/**
 * Video ID extraction and CMS utility functions for OptimizedVideoPlayer integration
 * Maintains synchronous architecture while providing robust video URL parsing
 * 
 * CRITICAL: All functions are synchronous to maintain homepage stability
 * NO async patterns - direct function calls only
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Regular expression patterns for URL parsing
// URL PARSING OPTIMIZATION: Efficient regex patterns for different YouTube URL formats
const YOUTUBE_URL_PATTERNS = {
  // Standard YouTube URLs: youtube.com/watch?v=VIDEO_ID
  standard: /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i,
  // Embed URLs: youtube.com/embed/VIDEO_ID  
  embed: /youtube\.com\/embed\/([^"&?\/\s]{11})/i,
  // Short URLs: youtu.be/VIDEO_ID
  short: /youtu\.be\/([^"&?\/\s]{11})/i
} as const;

/**
 * Extract video ID from various YouTube URL formats
 * CONTEXT7 SOURCE: /microsoft/typescript - String manipulation patterns with null safety
 * PERFORMANCE OPTIMIZATION: Single function handles all YouTube URL variants
 * 
 * Supported formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID  
 * - https://www.youtube.com/embed/VIDEO_ID?si=PARAM
 * - Direct video ID strings
 * 
 * @param url - YouTube URL or video ID string
 * @returns Clean video ID or null if invalid
 */
export function extractVideoId(url: string): string | null {
  if (!url || typeof url !== 'string') {
    return null;
  }

  const trimmedUrl = url.trim();
  
  // CONTEXT7 SOURCE: /microsoft/typescript - String length validation patterns
  // DIRECT ID CHECK: If already a clean 11-character YouTube ID, return directly
  if (trimmedUrl.length === 11 && /^[A-Za-z0-9_-]{11}$/.test(trimmedUrl)) {
    return trimmedUrl;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Regular expression matching patterns for URL parsing
  // PATTERN MATCHING: Try each regex pattern for maximum compatibility
  for (const pattern of Object.values(YOUTUBE_URL_PATTERNS)) {
    const match = trimmedUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Get video metadata from CMS by video key
 * CONTEXT7 SOURCE: /microsoft/typescript - Object property access with type safety
 * SYNCHRONOUS ARCHITECTURE: Direct property access without loading states
 * 
 * @param videoKey - Key from MASTERCLASS_VIDEOS object
 * @returns Video metadata object or null if not found
 */
export function getVideoMetadata(videoKey: string): {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly videoId: string | null;
  readonly thumbnailUrl: string;
  readonly duration: number;
  readonly isFree: boolean;
  readonly price?: string;
  readonly paymentUrl?: string;
} | null {
  // CONTEXT7 SOURCE: /microsoft/typescript - Dynamic import patterns for CMS integration
  // CMS INTEGRATION: Import MASTERCLASS_VIDEOS directly to maintain synchronous pattern
  const { MASTERCLASS_VIDEOS } = require('./cms-images');
  
  // CONTEXT7 SOURCE: /microsoft/typescript - Object property access with keyof operator
  // TYPE SAFETY: Safe property access using keyof for video key validation
  const video = MASTERCLASS_VIDEOS[videoKey as keyof typeof MASTERCLASS_VIDEOS];
  
  if (!video) {
    return null;
  }

  // CONTEXT7 SOURCE: /microsoft/typescript - Object destructuring with type inference
  // METADATA EXTRACTION: Extract and normalize video data for OptimizedVideoPlayer
  const videoId = extractVideoId(video.videoUrl || video.src);
  
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    videoId,
    thumbnailUrl: video.thumbnailUrl,
    duration: video.duration,
    isFree: video.isFree,
    price: video.price,
    paymentUrl: video.paymentUrl,
  } as const;
}

/**
 * Check if video is free content
 * CONTEXT7 SOURCE: /microsoft/typescript - Boolean return patterns with CMS integration  
 * PAYMENT STATUS: Quick access to free/paid status for conditional rendering
 * 
 * @param videoKey - Key from MASTERCLASS_VIDEOS object
 * @returns Boolean indicating if video is free content
 */
export function isVideoFree(videoKey: string): boolean {
  const metadata = getVideoMetadata(videoKey);
  return metadata?.isFree ?? false;
}

/**
 * Get video URL formatted for ReactPlayer consumption
 * CONTEXT7 SOURCE: /cookpete/react-player - URL formatting for ReactPlayer component
 * REACTPLAYER INTEGRATION: Official documentation recommends full YouTube URLs
 * 
 * @param videoKey - Key from MASTERCLASS_VIDEOS object  
 * @returns Full YouTube URL for ReactPlayer or null if invalid
 */
export function getVideoUrlForPlayer(videoKey: string): string | null {
  const metadata = getVideoMetadata(videoKey);
  
  if (!metadata?.videoId) {
    return null;
  }

  // CONTEXT7 SOURCE: /cookpete/react-player - YouTube URL construction patterns
  // URL CONSTRUCTION: Official ReactPlayer documentation shows proper YouTube URL format
  return `https://www.youtube.com/watch?v=${metadata.videoId}`;
}

/**
 * Get all free videos for public access
 * CONTEXT7 SOURCE: /microsoft/typescript - Array filtering patterns with object mapping
 * CONTENT FILTERING: Extract only free content for public video galleries
 * 
 * @returns Array of free video metadata for public consumption
 */
export function getFreeVideos(): Array<{
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly videoId: string | null;
  readonly thumbnailUrl: string;
  readonly duration: number;
}> {
  const { MASTERCLASS_VIDEOS } = require('./cms-images');
  
  // CONTEXT7 SOURCE: /microsoft/typescript - Object filtering with Array.filter and Object.entries
  // FREE CONTENT FILTER: Extract only videos marked as free content
  return Object.entries(MASTERCLASS_VIDEOS)
    .filter(([_, video]) => video.isFree)
    .map(([key, video]) => {
      const videoId = extractVideoId(video.videoUrl || video.src);
      return {
        id: video.id,
        title: video.title,
        description: video.description,
        videoId,
        thumbnailUrl: video.thumbnailUrl,
        duration: video.duration,
      };
    });
}

/**
 * Get all paid videos with payment information
 * CONTEXT7 SOURCE: /microsoft/typescript - Array filtering patterns with payment data
 * PAID CONTENT: Extract premium content with payment integration data
 * 
 * @returns Array of paid video metadata with payment URLs and pricing
 */
export function getPaidVideos(): Array<{
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly videoId: string | null;
  readonly thumbnailUrl: string;
  readonly duration: number;
  readonly price: string;
  readonly paymentUrl: string;
}> {
  const { MASTERCLASS_VIDEOS } = require('./cms-images');
  
  // CONTEXT7 SOURCE: /microsoft/typescript - Object filtering with payment data extraction
  // PAID CONTENT FILTER: Extract only videos marked as paid with payment information
  return Object.entries(MASTERCLASS_VIDEOS)
    .filter(([_, video]) => !video.isFree && video.price && video.paymentUrl)
    .map(([key, video]) => {
      const videoId = extractVideoId(video.videoUrl || video.src);
      return {
        id: video.id,
        title: video.title,
        description: video.description,
        videoId,
        thumbnailUrl: video.thumbnailUrl,
        duration: video.duration,
        price: video.price!,
        paymentUrl: video.paymentUrl!,
      };
    });
}

/**
 * Validate video URL format for ReactPlayer compatibility
 * CONTEXT7 SOURCE: /cookpete/react-player - URL validation patterns
 * URL VALIDATION: Ensure URLs are compatible with ReactPlayer component
 * 
 * @param url - Video URL to validate
 * @returns Boolean indicating ReactPlayer compatibility
 */
export function isValidVideoUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // CONTEXT7 SOURCE: /cookpete/react-player - Supported URL patterns for validation
  // COMPATIBILITY CHECK: ReactPlayer supports YouTube URLs and local video files
  return (
    extractVideoId(url) !== null || // YouTube URLs
    url.startsWith('/videos/') ||   // Local video files
    url.startsWith('http') && url.includes('.mp4') // Direct MP4 URLs
  );
}

/**
 * Get video duration in human readable format
 * CONTEXT7 SOURCE: /microsoft/typescript - Number formatting patterns for time display
 * TIME FORMATTING: Convert duration seconds to MM:SS format for UI display
 * 
 * @param seconds - Duration in seconds
 * @returns Formatted duration string (e.g. "4:32")
 */
export function formatVideoDuration(seconds: number): string {
  if (typeof seconds !== 'number' || seconds < 0) {
    return '0:00';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  // CONTEXT7 SOURCE: /microsoft/typescript - String padding patterns for time display
  // TIME DISPLAY: Ensure seconds are always 2 digits for consistent formatting
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * Extract all video IDs from CMS for batch processing
 * CONTEXT7 SOURCE: /microsoft/typescript - Object transformation patterns for bulk operations
 * BATCH PROCESSING: Extract all video IDs for preloading or cache warming
 * 
 * @returns Array of all video IDs in the CMS system
 */
export function getAllVideoIds(): readonly string[] {
  const { MASTERCLASS_VIDEOS } = require('./cms-images');
  
  // CONTEXT7 SOURCE: /microsoft/typescript - Array mapping with null filtering
  // ID EXTRACTION: Extract valid video IDs from all CMS entries
  return Object.values(MASTERCLASS_VIDEOS)
    .map(video => extractVideoId(video.videoUrl || video.src))
    .filter((id): id is string => id !== null);
}

/**
 * Get video by ID for direct access
 * CONTEXT7 SOURCE: /microsoft/typescript - Object searching patterns with find operation
 * DIRECT ACCESS: Find video by ID for component integration
 * 
 * @param videoId - YouTube video ID to search for
 * @returns Video metadata if found, null otherwise
 */
export function getVideoById(videoId: string): {
  readonly key: string;
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly videoId: string;
  readonly thumbnailUrl: string;
  readonly duration: number;
  readonly isFree: boolean;
  readonly price?: string;
  readonly paymentUrl?: string;
} | null {
  const { MASTERCLASS_VIDEOS } = require('./cms-images');
  
  // CONTEXT7 SOURCE: /microsoft/typescript - Object.entries with Array.find for searching
  // VIDEO SEARCH: Find video entry by matching extracted video ID
  const entry = Object.entries(MASTERCLASS_VIDEOS).find(([key, video]) => {
    const extractedId = extractVideoId(video.videoUrl || video.src);
    return extractedId === videoId;
  });
  
  if (!entry) {
    return null;
  }
  
  const [key, video] = entry;
  return {
    key,
    id: video.id,
    title: video.title,
    description: video.description,
    videoId,
    thumbnailUrl: video.thumbnailUrl,
    duration: video.duration,
    isFree: video.isFree,
    price: video.price,
    paymentUrl: video.paymentUrl,
  };
}

// CONTEXT7 SOURCE: /microsoft/typescript - Export patterns for utility function modules
// UTILITY EXPORTS: All video utility functions for external consumption
export const videoUtils = {
  extractVideoId,
  getVideoMetadata,
  isVideoFree,
  getVideoUrlForPlayer,
  getFreeVideos,
  getPaidVideos,
  isValidVideoUrl,
  formatVideoDuration,
  getAllVideoIds,
  getVideoById,
} as const;

// Default export for convenience
export default videoUtils;