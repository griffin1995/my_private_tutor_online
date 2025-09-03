/**
 * COMPREHENSIVE VIDEO CMS - Single Source of Truth
 * All video-related data consolidated from:
 * - VIDEO_CONTENT (testimonials)
 * - MASTERCLASS_VIDEOS (educational content)
 * - BACKGROUND_VIDEOS (hero/background videos)
 * - VIDEO_PLACEHOLDERS (placeholder images)
 * - VIDEO_PAGE_SECTIONS (layout data)
 */

interface ComprehensiveVideoRecord {
  // Core Identity
  readonly id: string;
  readonly title: string;
  readonly description: string;
  
  // Video Sources & Assets
  readonly videoUrl: string | null;           // Primary video URL (YouTube, local, etc.)
  readonly src: string | null;                // Local video file path
  readonly thumbnailUrl: string | null;       // Main thumbnail for video players
  readonly poster: string | null;             // Poster/hero image for video players
  readonly backgroundImage: string | null;    // Background image for section/page displays
  readonly fallback: string | null;           // Fallback video source
  
  // Content & Metadata  
  readonly author: string | null;             // "Elizabeth Burrows"
  readonly authorRole: string | null;         // "Founder, My Private Tutor Online"
  readonly testimonialAuthor: string | null;  // For testimonial videos
  readonly testimonialRole: string | null;    // For testimonial videos
  readonly duration: number | null;           // Minutes
  readonly category: "free" | "premium" | "background" | "testimonial" | "placeholder" | "all" | "Oxbridge" | "paid";
  
  // Pricing & Access
  readonly isFree: boolean;
  readonly price: string | null;              // "£49.99"
  readonly paymentUrl: string | null;         // Stripe/payment link
  
  // Display Properties
  readonly alt: string;                       // Accessibility text
  readonly featured: boolean;                 // Show on featured lists
  readonly width: number | null;              // For placeholder images
  readonly height: number | null;             // For placeholder images
  readonly loading: "lazy" | "eager" | null;  // Image loading strategy
  
  // Usage Context
  readonly usageTypes: Array<"page-section" | "masterclass" | "background" | "testimonial" | "placeholder">;
  
  // Page-Specific Layout Data (optional - only if used on specific pages)
  readonly layouts: {
    readonly videoPage?: {
      readonly position: "text-left" | "text-right";
      // backgroundImage moved to top-level field
      readonly badge: { readonly text: string; readonly type: "free" | "premium" };
      readonly content: {
        readonly paragraphs: readonly string[];
        readonly bulletPoints: readonly string[];
      };
      readonly animationStyle: string;
    };
    readonly masterclassPage?: {
      // Future: Masterclass-specific layout data
      readonly displayOrder?: number;
      readonly featuredOnHome?: boolean;
    };
  } | null;
}

export const COMPREHENSIVE_VIDEO_CMS: Record<string, ComprehensiveVideoRecord> = {
  // ===== EDUCATIONAL/MASTERCLASS VIDEOS =====
  unlockingAcademicSuccess: {
    id: "unlocking-academic-success",
    title: "Unlocking Academic Success", // USER CHOICE: Without "(Free Access)"
    description: "Elizabeth Burrows was invited to speak at the GCSE Summit 2024, where she addressed parents of GCSE-aged students on how to effectively navigate gaps in knowledge and rebuild lost confidence through one-to-one tuition. In this masterclass Elizabeth shares practical strategies and insights into the most common challenges families face when considering tutoring — from framing tutoring in a positive light for reluctant tutees to determining your child's true potential. Her session offers clear, reassuring guidance to help parents feel more confident in supporting their teens through GCSEs, IBs and A Levels.", // USER CHOICE: Long version
    videoUrl: "https://www.youtube.com/embed/r4Ngy75Z4Zg?si=_mfgyzSJM0BIzXTW", // From Master CMS
    src: null, // MASTERCLASS_VIDEOS had empty src
    thumbnailUrl: "/videos/unlocking-academic-success-thumbnail.png", // USER CHOICE: Current videos page thumbnail
    poster: "/images/masterclass-thumbnails/unlocking-success.png", // From MASTERCLASS_VIDEOS
    backgroundImage: "/images/pexels-kindelmedia-7579201.jpg", // Background for this video
    fallback: null,
    author: "Elizabeth Burrows",
    authorRole: "Founder, My Private Tutor Online", 
    testimonialAuthor: null,
    testimonialRole: null,
    duration: 30,
    category: "free",
    isFree: true,
    price: null,
    paymentUrl: null,
    alt: "Unlocking Academic Success - GCSE Summit 2024 Masterclass by Elizabeth Burrows",
    featured: true,
    width: null,
    height: null,
    loading: null,
    usageTypes: ["page-section", "masterclass"],
    layouts: {
      videoPage: {
        position: "text-left",
        badge: { text: "Free Access", type: "free" },
        content: {
          paragraphs: [
            "Elizabeth Burrows shares practical strategies from the GCSE Summit 2024 on how to effectively navigate gaps in knowledge and rebuild lost confidence through one-to-one tuition.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          ],
          bulletPoints: [
            "Recognising when one-to-one support is needed",
            "Identifying truly exceptional tutors",
            "Managing tutor-student-parent relationships", 
            "Practical guidance for academic outcomes"
          ]
        },
        animationStyle: "top-in-bottom-out"
      }
    }
  },

  ucasSummit2024: {
    id: "ucas-summit-2024",
    title: "UCAS Summit 2024",
    description: "Complete recording from Elizabeth's presentation at the GCSE Summit 2024, where she addressed parents of GCSE-aged students on how to effectively navigate gaps in knowledge and rebuild lost confidence through one-to-one tuition. This comprehensive recording includes audience Q&A and additional insights for parents navigating the tutoring landscape.",
    videoUrl: "https://www.youtube.com/embed/IfF9zSzuceY?si=7_tmYovUVVfqLX0D",
    src: "/videos/gcse-summit-2024-elizabeth-burrows.mp4",
    thumbnailUrl: "/images/masterclass-thumbnails/gcse-summit-2024.png",
    poster: "/images/masterclass-thumbnails/gcse-summit-2024.png",
    backgroundImage: "/images/pexels-shkrabaanthony-5306492.jpg",
    fallback: null,
    author: "Elizabeth Burrows",
    authorRole: "Founder, My Private Tutor Online",
    testimonialAuthor: null,
    testimonialRole: null,
    duration: 45,
    category: "free",
    isFree: true,
    price: null,
    paymentUrl: null,
    alt: "UCAS Summit 2024 - Complete Recording by Elizabeth Burrows featuring GCSE Summit 2024 content",
    featured: false,
    width: null,
    height: null,
    loading: null,
    usageTypes: ["masterclass"],
    layouts: {
      videoPage: {
        position: "text-left",
        badge: { text: "Free Access", type: "free" },
        content: {
          paragraphs: [
            "Complete recording from Elizabeth's presentation at the GCSE Summit 2024, addressing parents on how to effectively navigate gaps in knowledge and rebuild lost confidence through one-to-one tuition.",
            "This comprehensive recording includes audience Q&A and additional insights for parents navigating the tutoring landscape.",
            "Learn practical strategies from Elizabeth's 15+ years of experience helping families through the British education system."
          ],
          bulletPoints: [
            "Complete GCSE Summit 2024 presentation recording",
            "Live audience Q&A session included", 
            "Expert guidance for parents and students",
            "Practical strategies for knowledge gap navigation"
          ]
        },
        animationStyle: "top-in-bottom-out"
      }
    }
  },

  elizabethsUcasGuide: {
    id: "elizabeths-ucas-guide",
    title: "Elizabeth's Essential UCAS Guide - Part 1/2",
    description: "Widely recognised for her expertise in the British university admissions process, Elizabeth was invited to speak to international summer school students at LSE. In her session, she demystifies each stage of the UCAS application, offering clear, practical guidance to help students approach the process with confidence.",
    videoUrl: null, // USER CHOICE: Empty
    src: null,
    thumbnailUrl: "/images/masterclass-thumbnails/ucas-guide.png", // USER CHOICE: ucas-guide.png
    poster: "/images/masterclass-thumbnails/ucas-guide.png",
    backgroundImage: "/images/pexels-isabella-mendes-107313-11286592.jpg", // Background for this video
    fallback: null,
    author: "Elizabeth Burrows",
    authorRole: "Founder, My Private Tutor Online",
    testimonialAuthor: null,
    testimonialRole: null,
    duration: 90,
    category: "premium",
    isFree: false,
    price: "£49.99",
    paymentUrl: "https://buy.stripe.com/7sY6oGdj767tbtO1Zd38408",
    alt: "Elizabeth's Essential UCAS Guide - Part 1/2",
    featured: true,
    width: null,
    height: null,
    loading: null,
    usageTypes: ["page-section", "masterclass"],
    layouts: {
      videoPage: {
        position: "text-right",
        badge: { text: "£49.99", type: "premium" },
        content: {
          paragraphs: [
            "Elizabeth demystifies each stage of the UCAS application, offering clear, practical guidance to help students approach the process with confidence.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          ],
          bulletPoints: [
            "Understanding UCAS application timelines",
            "Writing compelling personal statements",
            "Choosing the right universities",
            "Preparing for admission interviews"
          ]
        },
        animationStyle: "top-in-bottom-out"
      }
    }
  },

  personalStatementsGuide: {
    id: "personal-statements-guide",
    title: "Top 10 Tips for Outstanding Personal Statements - Part 2/2",
    description: "Elizabeth is renowned for her success in guiding ambitious students into Oxbridge and top UK universities. In this masterclass she reveals the 10 ingredients in her secret recipe for personal statement success.",
    videoUrl: null,
    src: null,
    thumbnailUrl: "/images/masterclass-thumbnails/top-10-tips.png",
    poster: "/images/masterclass-thumbnails/top-10-tips.png",
    backgroundImage: "/images/pexels-shkrabaanthony-5306492.jpg",
    fallback: null,
    author: "Elizabeth Burrows",
    authorRole: "Founder, My Private Tutor Online",
    testimonialAuthor: null,
    testimonialRole: null,
    duration: 70,
    category: "premium",
    isFree: false,
    price: "£89.99",
    paymentUrl: "https://buy.stripe.com/bJe4gy6UJ3ZlgO8avJ38409",
    alt: "Elizabeth's Top 10 Tips for Outstanding Personal Statements",
    featured: true,
    width: null,
    height: null,
    loading: null,
    usageTypes: ["masterclass"],
    layouts: {
      videoPage: {
        position: "text-right",
        badge: { text: "£89.99", type: "premium" },
        content: {
          paragraphs: [
            "Elizabeth is renowned for her success in guiding ambitious students into Oxbridge and top UK universities. In this masterclass she reveals the 10 ingredients in her secret recipe for personal statement success.",
            "Each year her private students secure places at the best British universities, including UCL, LSE, Imperial and Edinburgh.",
            "Learn from Elizabeth's proven track record and discover the strategic approach that has helped hundreds of students achieve their university ambitions."
          ],
          bulletPoints: [
            "Elizabeth's secret 10-ingredient personal statement recipe",
            "Real Oxford Medicine personal statement case study",
            "New 2025 UCAS format structured response guidance",
            "Advanced writing techniques for standout applications"
          ]
        },
        animationStyle: "top-in-bottom-out"
      }
    }
  },

  britishLiteraryClassics: {
    id: "british-literary-classics",
    title: "Exploring British Literary Classics (8–14)",
    description: "From Wind in the Willows to The Lord of the Rings, this engaging masterclass introduces students to some of the most celebrated works in British literature. Led by Elizabeth Burrows, this session explores what defines a literary classic.",
    videoUrl: null,
    src: null,
    thumbnailUrl: "/images/masterclass-thumbnails/british-literary-classics.png",
    poster: "/images/masterclass-thumbnails/british-literary-classics.png",
    backgroundImage: "/images/pexels-this-and-no-internet-25-288559-29659893.jpg",
    fallback: null,
    author: "Elizabeth Burrows",
    authorRole: "Founder, My Private Tutor Online",
    testimonialAuthor: null,
    testimonialRole: null,
    duration: 60,
    category: "premium",
    isFree: false,
    price: "£19.99",
    paymentUrl: "https://buy.stripe.com/aFa8wOfrffI3dBW47l3840a",
    alt: "Exploring British Literary Classics - Masterclass for Curious Readers",
    featured: false,
    width: null,
    height: null,
    loading: null,
    usageTypes: ["masterclass"],
    layouts: {
      videoPage: {
        position: "text-left",
        badge: { text: "£19.99", type: "premium" },
        content: {
          paragraphs: [
            "From Wind in the Willows to The Lord of the Rings, this engaging masterclass introduces students to some of the most celebrated works in British literature.",
            "Led by Elizabeth Burrows, this session explores what defines a literary classic and examines key themes and cultural significance.",
            "Perfect for curious and aspiring readers aged 8-14, delivered to an international student audience with partial Mandarin subtitles."
          ],
          bulletPoints: [
            "What defines a literary classic explored",
            "Key British literary genres and conventions",
            "Themes and cultural significance analysis",
            "60-minute recorded masterclass with Mandarin subtitles"
          ]
        },
        animationStyle: "top-in-bottom-out"
      }
    }
  },

  britishEtiquette: {
    id: "british-etiquette",
    title: "Understanding British Etiquette",
    description: "Drawing on her experience working with royalty and high-profile international families, Elizabeth demystifies the social codes that shape life in the UK's most prestigious schools and institutions.",
    videoUrl: null,
    src: null,
    thumbnailUrl: "/images/masterclass-thumbnails/british-etiquette.jpg",
    poster: "/images/masterclass-thumbnails/british-etiquette.jpg",
    backgroundImage: "/images/pexels-gsn-travel-28448938.jpg",
    fallback: null,
    author: "Elizabeth Burrows",
    authorRole: "Founder, My Private Tutor Online",
    testimonialAuthor: null,
    testimonialRole: null,
    duration: 60,
    category: "premium",
    isFree: false,
    price: "£19.99",
    paymentUrl: "https://buy.stripe.com/cNidR8dj70N98hCeLZ3840b",
    alt: "Understanding British Etiquette - Cultural Awareness Masterclass",
    featured: false,
    width: null,
    height: null,
    loading: null,
    usageTypes: ["masterclass"],
    layouts: {
      videoPage: {
        position: "text-right",
        badge: { text: "£19.99", type: "premium" },
        content: {
          paragraphs: [
            "Drawing on her experience working with royalty and high-profile international families, Elizabeth demystifies the social codes that shape life in the UK's most prestigious schools and institutions.",
            "This masterclass provides essential cultural awareness for international families navigating British educational and social environments.",
            "Perfect for building confidence and cultural fluency in formal British settings, delivered with partial Mandarin subtitles."
          ],
          bulletPoints: [
            "Greetings, introductions, and dining etiquette mastery",
            "Cross-cultural etiquette understanding and adaptation",
            "Social grace and cultural fluency development",
            "Confidence-building for formal British environments"
          ]
        },
        animationStyle: "top-in-bottom-out"
      }
    }
  },

  // ===== TESTIMONIAL VIDEOS =====
  parentsTestimonials: {
    id: "parents-testimonials-2025",
    title: "Parent Success Stories 2025",
    description: "Real parents sharing their transformative experiences with My Private Tutor Online",
    videoUrl: null,
    src: "/videos/parents-testimonials-2025.mp4",
    thumbnailUrl: null,
    poster: "/images/testimonials/parent-testimonials-thumbnail.jpg?v=20250831",
    backgroundImage: null,
    fallback: null,
    author: null,
    authorRole: null,
    testimonialAuthor: "Various Parents",
    testimonialRole: "MPTO Families",
    duration: 109,
    category: "testimonial",
    isFree: true,
    price: null,
    paymentUrl: null,
    alt: "Parent testimonials for My Private Tutor Online - Compilation 2025",
    featured: true,
    width: null,
    height: null,
    loading: null,
    usageTypes: ["testimonial"],
    layouts: null
  },

  studentsTestimonials: {
    id: "students-testimonials-2025",
    title: "Student Success Stories 2025",
    description: "Students sharing their academic achievements with MPTO expert tutors",
    videoUrl: null,
    src: "/videos/students-testimonials-2025.mp4",
    thumbnailUrl: null,
    poster: "/images/testimonials/student-testimonials-thumbnail.jpg?v=20250831",
    backgroundImage: null,
    fallback: null,
    author: null,
    authorRole: null,
    testimonialAuthor: "MPTO Students",
    testimonialRole: "Academic Achievers",
    duration: 137,
    category: "testimonial",
    isFree: true,
    price: null,
    paymentUrl: null,
    alt: "Student testimonials for My Private Tutor Online - Compilation 2025",
    featured: true,
    width: null,
    height: null,
    loading: null,
    usageTypes: ["testimonial"],
    layouts: null
  },

  // ===== BACKGROUND/HERO VIDEOS =====
  brandStatement: {
    id: "brand-statement",
    title: "Elizabeth Burrows Introduction Video - Enhanced Audio",
    description: "Founder introduction video with sound used as background for brand statement text effects",
    videoUrl: null,
    src: "/videos/elizabeth-introduction-sound.mp4",
    thumbnailUrl: null,
    poster: "/images/video-placeholders/placeholder_for_introductionary_video.png",
    backgroundImage: null,
    fallback: "/videos/elizabeth-introduction-sound.mp4",
    author: "Elizabeth Burrows",
    authorRole: "Founder, My Private Tutor Online",
    testimonialAuthor: null,
    testimonialRole: null,
    duration: null,
    category: "background",
    isFree: true,
    price: null,
    paymentUrl: null,
    alt: "Elizabeth Burrows introduces My Private Tutor Online - brand statement background with audio",
    featured: false,
    width: null,
    height: null,
    loading: null,
    usageTypes: ["background"],
    layouts: null
  },

  tutoringBackground: {
    id: "tutoring-background",
    title: "Tutoring Introduction Background - Enhanced",
    description: "Professional introduction video with sound for tutoring-focused video-text effects",
    videoUrl: null,
    src: "/videos/elizabeth-introduction-sound.mp4",
    thumbnailUrl: null,
    poster: "/images/video-placeholders/placeholder_for_introductionary_video.png",
    backgroundImage: null,
    fallback: "/videos/elizabeth-introduction-sound.mp4",
    author: "Elizabeth Burrows",
    authorRole: "Founder, My Private Tutor Online",
    testimonialAuthor: null,
    testimonialRole: null,
    duration: null,
    category: "background",
    isFree: true,
    price: null,
    paymentUrl: null,
    alt: "Professional tutoring introduction video background with enhanced audio",
    featured: false,
    width: null,
    height: null,
    loading: null,
    usageTypes: ["background"],
    layouts: null
  },

  oxbridgeBackground: {
    id: "oxbridge-background",
    title: "Oxbridge Preparation Background - Enhanced",
    description: "Educational excellence video with sound for university preparation content",
    videoUrl: null,
    src: "/videos/elizabeth-introduction-sound.mp4",
    thumbnailUrl: null,
    poster: "/images/video-placeholders/placeholder_for_introductionary_video.png",
    backgroundImage: null,
    fallback: "/videos/elizabeth-introduction-sound.mp4",
    author: "Elizabeth Burrows",
    authorRole: "Founder, My Private Tutor Online",
    testimonialAuthor: null,
    testimonialRole: null,
    duration: null,
    category: "background",
    isFree: true,
    price: null,
    paymentUrl: null,
    alt: "Oxford Cambridge preparation introduction video background with enhanced audio",
    featured: false,
    width: null,
    height: null,
    loading: null,
    usageTypes: ["background"],
    layouts: null
  },

  // ===== PLACEHOLDER IMAGES =====
  introPlaceholder: {
    id: "intro-placeholder",
    title: "Introductory Video",
    description: "Placeholder image for introductory video content",
    videoUrl: null,
    src: "/images/video-placeholders/placeholder_for_introductionary_video.png",
    thumbnailUrl: "/images/video-placeholders/placeholder_for_introductionary_video.png",
    poster: null,
    backgroundImage: null,
    fallback: null,
    author: null,
    authorRole: null,
    testimonialAuthor: null,
    testimonialRole: null,
    duration: null,
    category: "placeholder",
    isFree: true,
    price: null,
    paymentUrl: null,
    alt: "Introductory video placeholder",
    featured: false,
    width: 800,
    height: 450,
    loading: "lazy",
    usageTypes: ["placeholder"],
    layouts: null
  }
} as const;

/**
 * Helper functions for accessing Comprehensive Video CMS data
 */

export const getVideosByCategory = (category: ComprehensiveVideoRecord['category']) => 
  Object.values(COMPREHENSIVE_VIDEO_CMS).filter(video => video.category === category);

export const getVideosByUsage = (usageType: string) =>
  Object.values(COMPREHENSIVE_VIDEO_CMS).filter(video => 
    video.usageTypes.includes(usageType as any)
  );

export const getVideoByTitle = (title: string) =>
  Object.values(COMPREHENSIVE_VIDEO_CMS).find(video => video.title === title);

export const getVideoById = (id: string) =>
  COMPREHENSIVE_VIDEO_CMS[id];

export const getVideoPageData = (title: string) => {
  const video = getVideoByTitle(title);
  return video?.layouts?.videoPage || null;
};

export const getFreeVideos = () => getVideosByCategory("free");
export const getPremiumVideos = () => getVideosByCategory("premium"); 
export const getTestimonialVideos = () => getVideosByCategory("testimonial");
export const getBackgroundVideos = () => getVideosByCategory("background");
export const getPlaceholderImages = () => getVideosByCategory("placeholder");

export const getFeaturedVideos = () =>
  Object.values(COMPREHENSIVE_VIDEO_CMS).filter(video => video.featured);

export const getVideosWithPayment = () =>
  Object.values(COMPREHENSIVE_VIDEO_CMS).filter(video => video.paymentUrl);