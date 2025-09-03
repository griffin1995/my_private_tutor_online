# Master Video CMS Design

## Current Fragmented Structure
- `VIDEO_CONTENT` - General video content
- `VIDEO_PLACEHOLDERS` - Placeholder images  
- `VIDEO_PAGE_SECTIONS` - Video page layout data
- `MASTERCLASS_VIDEOS` - Masterclass specific data
- `BACKGROUND_VIDEOS` - Background/hero videos

## Proposed Master Structure

```typescript
interface MasterVideoRecord {
  // Core Identity
  id: string;
  title: string;
  description: string;
  
  // Video Sources
  videoUrl: string;           // Primary video URL (YouTube, local, etc.)
  thumbnailUrl: string;       // Main thumbnail
  posterUrl?: string;         // Poster/hero image
  
  // Content & Metadata  
  author: string;             // "Elizabeth Burrows"
  authorRole: string;         // "Founder, My Private Tutor Online"
  duration: number;           // Minutes
  category: "free" | "premium" | "background" | "testimonial";
  
  // Pricing & Access
  isFree: boolean;
  price?: string;             // "£49.99"
  paymentUrl?: string;        // Stripe/payment link
  
  // Display Properties
  alt: string;                // Accessibility text
  featured: boolean;          // Show on featured lists
  
  // Page-Specific Layouts (optional - only if used on specific pages)
  layouts?: {
    videoPage?: {
      position: "text-left" | "text-right";
      backgroundImage: string;
      badge: { text: string; type: "free" | "premium" };
      content: {
        paragraphs: string[];
        bulletPoints: string[];
      };
    };
    masterclassPage?: {
      // Masterclass specific layout data
    };
    // Add other page layouts as needed
  };
  
  // Technical Properties
  animationStyle?: string;    // "top-in-bottom-out"
  viewCount?: number;
  rating?: number;
  uploadDate?: string;
  
  // Usage Context
  usageTypes: Array<"page-section" | "masterclass" | "background" | "testimonial" | "placeholder">;
}

export const MASTER_VIDEO_CMS: Record<string, MasterVideoRecord> = {
  unlockingAcademicSuccess: {
    id: "unlocking-academic-success",
    title: "Unlocking Academic Success",
    description: "Elizabeth Burrows shares practical strategies from the GCSE Summit 2024...",
    videoUrl: "https://www.youtube.com/embed/r4Ngy75Z4Zg?si=_mfgyzSJM0BIzXTW",
    thumbnailUrl: "/videos/unlocking-academic-success-thumbnail.png",
    author: "Elizabeth Burrows",
    authorRole: "Founder, My Private Tutor Online",
    duration: 30,
    category: "free",
    isFree: true,
    alt: "Unlocking Academic Success - GCSE Summit 2024 Masterclass by Elizabeth Burrows",
    featured: true,
    usageTypes: ["page-section", "masterclass"],
    layouts: {
      videoPage: {
        position: "text-left",
        backgroundImage: "/images/pexels-kindelmedia-7579201.jpg",
        badge: { text: "Free Access", type: "free" },
        content: {
          paragraphs: [...],
          bulletPoints: [...]
        }
      }
    }
  },
  // ... other videos
};
```

## Helper Functions

```typescript
// Get all videos of a specific category
export const getVideosByCategory = (category: MasterVideoRecord['category']) => 
  Object.values(MASTER_VIDEO_CMS).filter(video => video.category === category);

// Get videos for a specific usage type  
export const getVideosByUsage = (usageType: string) =>
  Object.values(MASTER_VIDEO_CMS).filter(video => video.usageTypes.includes(usageType));

// Get video by title (for VideoMasterclassSection)
export const getVideoByTitle = (title: string) =>
  Object.values(MASTER_VIDEO_CMS).find(video => video.title === title);

// Get video page layout data
export const getVideoPageData = (videoId: string) =>
  MASTER_VIDEO_CMS[videoId]?.layouts?.videoPage;
```

## Benefits
1. **Single source of truth** - All video data in one place
2. **Flexible usage** - Each page/component gets only what it needs
3. **Easy maintenance** - Update once, reflects everywhere
4. **Type safety** - Consistent interfaces across the app
5. **Extensible** - Easy to add new video types or page layouts