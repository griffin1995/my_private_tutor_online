# Video Assets Index - August 2025 Update

**Documentation Source**: Context7 MCP - Next.js Video Elements & Static Assets Optimization  
**Reference**: /vercel/next.js - HTML Video Tag Best Practices  
**Reference**: /vercel/next.js - Public Folder Static Asset Management  
**Date**: August 2025 - Updated with client-provided video assets

All video files for My Private Tutor Online website, stored in `public/videos/` following Context7 MCP Next.js optimization patterns.

## Available Videos - Updated August 2025

### 1. **beth-introduction-2025.mp4** ✅ UPDATED
- **Purpose**: Main introduction video featuring Beth
- **Status**: Client-provided updated version (August 2025)
- **Usage**: Homepage "Meet Elizabeth" section per client feedback
- **URL**: `/videos/beth-introduction-2025.mp4`
- **Context7 Reference**: HTML video tag with autoPlay, muted, playsInline

### 2. **elizabeth-introduction.mp4** (ARCHIVED)
- **Purpose**: Alternative introduction by Elizabeth Burrows
- **Status**: Kept for reference, superseded by beth-introduction-2025.mp4
- **URL**: `/videos/elizabeth-introduction.mp4`

### 3. **background-video-2025.mp4** ✅ UPDATED
- **Purpose**: Silent background video for hero sections
- **Status**: Client-provided updated silent version (August 2025)
- **Usage**: Homepage hero section without text overlay per client feedback
- **URL**: `/videos/background-video-2025.mp4`
- **Context7 Reference**: HTML video with autoPlay, muted, loop, playsInline

### 4. **testimonials-parents-2025.mp4** ✅ UPDATED
- **Purpose**: Parent testimonials compilation
- **Status**: Client-provided updated version (August 2025)
- **Usage**: Homepage and testimonials page social proof
- **URL**: `/videos/testimonials-parents-2025.mp4`
- **Context7 Reference**: HTML video with controls, preload="metadata"

### 5. **testimonials-students-2025.mp4** ✅ UPDATED
- **Purpose**: Student testimonials compilation
- **Status**: Client-provided updated version (August 2025)
- **Usage**: Homepage and testimonials page social proof
- **URL**: `/videos/testimonials-students-2025.mp4`
- **Context7 Reference**: HTML video with controls, preload="metadata"

## Implementation in Components

**Documentation Source**: Context7 MCP - Next.js HTML Video Elements Optimization  
**Reference**: /vercel/next.js - Video Tag Attributes & Best Practices

```tsx
/**
 * Context7 MCP Pattern: Next.js HTML Video Component Implementation
 * Reference: /vercel/next.js - HTML Video Tag for Self-Hosted Videos
 * 
 * Key Attributes per Context7 MCP Documentation:
 * - autoPlay: Starts playing when page loads (requires muted for mobile)
 * - muted: Mutes audio by default (required for autoPlay on mobile)
 * - loop: Loops the video playback for background videos
 * - playsInline: Enables inline playback on iOS devices
 * - controls: Displays playback controls for user interaction
 * - preload: Specifies preloading behavior ("none", "metadata", "auto")
 */

// Hero Background Video (Updated August 2025)
export function HeroBackgroundVideo() {
  return (
    <video
      src="/videos/background-video-2025.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover"
      aria-label="Background video showcasing tutoring excellence"
    >
      Your browser does not support the video tag.
    </video>
  )
}

// Beth Introduction Video (Updated August 2025)
export function BethIntroductionVideo() {
  return (
    <video
      src="/videos/beth-introduction-2025.mp4"
      controls
      preload="metadata"
      className="w-full max-w-2xl mx-auto rounded-lg"
      aria-label="Meet Elizabeth - Founder Introduction"
    >
      Your browser does not support the video tag.
    </video>
  )
}

// Testimonial Videos (Updated August 2025)
export function TestimonialVideo({ type }: { type: 'parents' | 'students' }) {
  return (
    <video
      src={`/videos/testimonials-${type}-2025.mp4`}
      controls
      preload="metadata"
      className="w-full max-w-lg rounded-lg shadow-lg"
      aria-label={`${type} testimonials showcasing student success`}
    >
      Your browser does not support the video tag.
    </video>
  )
}
```

## File Naming Convention

Following Next.js static asset best practices:
- **kebab-case**: All lowercase with hyphens
- **descriptive**: Clear purpose identification
- **version-aware**: Include year for time-specific content
- **category-prefixed**: Group related content (testimonials-*)

## Total Storage

- **Total Size**: ~659MB
- **Total Videos**: 5 files
- **Categories**: Introduction (2), Background (1), Testimonials (2)

---

*All videos optimized for web delivery and Cross-browser compatibility*