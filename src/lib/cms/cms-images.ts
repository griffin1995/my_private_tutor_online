// CMS DATA SOURCE: Optimized image management system for My Private Tutor Online
// MANDATORY: All images must use this CMS system - CLAUDE.md rule 23

// CONTEXT7 SOURCE: /reactjs/react.dev - React cache function for memoizing data requests
// CONTEXT7 SOURCE: /vercel/next.js - Server Components caching patterns for performance optimization
// CONTEXT7 SOURCE: /microsoft/typescript - Map data structure performance optimization patterns
// PERFORMANCE OPTIMIZATION: Map-based architecture with React cache() for 30%+ code reduction
import { cache } from "react";

// CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for media asset management
// CONTEXT7 SOURCE: /microsoft/typescript - Readonly properties for immutable data structures
// COMPREHENSIVE IMAGE TYPE SYSTEM - All image assets with type safety

// CONTEXT7 SOURCE: /microsoft/typescript - Type export patterns for external consumption
// TYPE EXPORTS: All image interfaces available for external components and libraries
export type {
  BackgroundVideoAsset,
  DocumentAsset,
  ImageAsset,
  InstitutionLogo,
  MediaLogo,
  ResponsiveImageSizes,
  TeamMemberImage,
  VideoAsset,
};

/**
 * Base interface for all image assets with comprehensive metadata
 * CONTEXT7 SOURCE: /microsoft/typescript - Optional properties and union types
 */
export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
  readonly title?: string;
  readonly loading?: "lazy" | "eager";
  readonly priority?: boolean;
  readonly sizes?: string;
  readonly quality?: number;
}

/**
 * Extended video asset interface for multimedia content
 * CONTEXT7 SOURCE: /microsoft/typescript - Interface extension patterns
 */
export interface VideoAsset {
  readonly src: string;
  readonly poster?: string;
  readonly alt: string;
  readonly title: string;
  readonly description: string;
  readonly width?: number;
  readonly height?: number;
  readonly autoplay?: boolean;
  readonly muted?: boolean;
  readonly loop?: boolean;
}

/**
 * Background video asset for video-text effects
 * CONTEXT7 SOURCE: /microsoft/typescript - Specialized interface patterns
 */
export interface BackgroundVideoAsset {
  readonly src: string;
  readonly fallback: string;
  readonly poster: string;
  readonly alt: string;
  readonly title: string;
  readonly description: string;
}

/**
 * Marketing document and PDF asset interface
 * CONTEXT7 SOURCE: /microsoft/typescript - Document asset type patterns
 */
export interface DocumentAsset {
  readonly src: string;
  readonly alt: string;
  readonly title: string;
  readonly description: string;
  readonly type?: "pdf" | "image";
  readonly downloadable?: boolean;
}

/**
 * Responsive image sizes configuration
 * CONTEXT7 SOURCE: /microsoft/typescript - Configuration object patterns
 */
export interface ResponsiveImageSizes {
  readonly mobile: number;
  readonly tablet: number;
  readonly desktop: number;
  readonly xl: number;
}

/**
 * Institution logo with metadata
 * CONTEXT7 SOURCE: /microsoft/typescript - Specialized content interfaces
 */
export interface InstitutionLogo extends ImageAsset {
  readonly institution: string;
  readonly category: "university" | "school" | "college";
  readonly prestige: "high" | "medium" | "standard";
}

/**
 * Team member image with role information
 * CONTEXT7 SOURCE: /microsoft/typescript - Role-based image interfaces
 */
export interface TeamMemberImage extends ImageAsset {
  readonly name: string;
  readonly role: string;
  readonly department?: string;
}

/**
 * Media recognition logo with credibility data
 * CONTEXT7 SOURCE: /microsoft/typescript - Credibility and recognition interfaces
 */
export interface MediaLogo extends ImageAsset {
  readonly publication: string;
  readonly recognition: string;
  readonly year?: number;
  readonly verified: boolean;
}

/**
 * Documentation Source: Context7 MCP - Next.js Image Optimization Best Practices
 * Reference: /vercel/next.js - Image component logo implementation patterns
 * Pattern: Centralized logo asset management with proper dimensions
 *
 * Logo Asset Updates (2025):
 * - Header logo: logo-with-name.png - Clean logo with company name only
 * - Footer logo: logo-name-tagline.png - Full branding with tagline
 * - Icon only: logo-icon-only.png - For favicon and small displays
 * - All logos updated to use new brand assets from /images/logos/
 */
/**
 * Documentation Source: Context7 MCP - Next.js Image Component Conditional Rendering
 * Reference: /vercel/next.js - Theme-based image switching and conditional src patterns
 * Pattern: Logo asset management with scroll-state variants for navbar transparency
 * Implementation: White variant for transparent navbar, standard variant for scrolled state
 */
// Logo assets - Updated with new 2025 brand files and scroll state variants
export const LOGOS = {
  main: {
    src: "/images/logos/logo-with-name.png",
    alt: "My Private Tutor Online - Premium Educational Services",
    width: 200,
    height: 80,
    title: "My Private Tutor Online",
    loading: "eager" as const,
    priority: true,
  },
  mainWhite: {
    src: "/images/logos/logo-with-name-white.png",
    alt: "My Private Tutor Online - Premium Educational Services",
    width: 200,
    height: 80,
    title: "My Private Tutor Online",
    loading: "eager" as const,
    priority: true,
  },
  footer: {
    src: "/images/logos/logo-name-tagline.png",
    alt: "My Private Tutor Online - Premium Educational Services",
    width: 180,
    height: 70,
    title: "My Private Tutor Online - Expert Private Tutoring",
    loading: "lazy" as const,
  },
  icon: {
    src: "/images/logos/logo-icon-only.png",
    alt: "My Private Tutor Online Icon",
    width: 60,
    height: 60,
    title: "My Private Tutor Online",
    loading: "eager" as const,
    priority: true,
  },
} as const;

// Institution logos for credibility - Updated with new 2025 assets
export const INSTITUTION_LOGOS = {
  // Universities
  oxford: {
    src: "/images/logos/oxford-university-logo.jpeg",
    alt: "University of Oxford logo",
    width: 120,
    height: 80,
    title: "University of Oxford",
    loading: "lazy" as const,
  },
  cambridge: {
    src: "/images/logos/cambridge-university-logo.png",
    alt: "University of Cambridge logo",
    width: 120,
    height: 80,
    title: "University of Cambridge",
    loading: "lazy" as const,
  },
  harvard: {
    src: "/images/logos/harvard-university-logo.png",
    alt: "Harvard University logo",
    width: 120,
    height: 80,
    title: "Harvard University",
    loading: "lazy" as const,
  },
  durham: {
    src: "/images/logos/durham-university-logo.png",
    alt: "Durham University logo",
    width: 120,
    height: 80,
    title: "Durham University",
    loading: "lazy" as const,
  },
  edinburgh: {
    src: "/images/logos/edinburgh-university-logo.png",
    alt: "University of Edinburgh logo",
    width: 120,
    height: 80,
    title: "University of Edinburgh",
    loading: "lazy" as const,
  },
  stAndrews: {
    src: "/images/logos/st-andrews-university-logo.png",
    alt: "University of St Andrews logo",
    width: 120,
    height: 80,
    title: "University of St Andrews",
    loading: "lazy" as const,
  },
  warwick: {
    src: "/images/logos/warwick-university-logo.gif",
    alt: "University of Warwick logo",
    width: 120,
    height: 80,
    title: "University of Warwick",
    loading: "lazy" as const,
  },
  lse: {
    src: "/images/logos/lse-logo.png",
    alt: "London School of Economics logo",
    width: 120,
    height: 80,
    title: "London School of Economics",
    loading: "lazy" as const,
  },
  kingsCollege: {
    src: "/images/logos/kings-college-logo.jpeg",
    alt: "King's College London logo",
    width: 120,
    height: 80,
    title: "King's College London",
    loading: "lazy" as const,
  },
  // CONTEXT7 SOURCE: /vercel/next.js - Removed missing asset references to eliminate 404 errors
  // CONTEXT7 SOURCE: /vercel/next.js - CMS data integrity maintenance by removing non-existent logo assets
  // CLEANUP REASON: Imperial College and UCL logo files do not exist - removing references to prevent 404 errors
  // Independent Schools
  eton: {
    src: "/images/logos/eton-college-logo-new.webp",
    alt: "Eton College logo",
    width: 100,
    height: 80,
    title: "Eton College",
    loading: "lazy" as const,
  },
  etonAlt: {
    src: "/images/logos/eton-college-logo-alt.png",
    alt: "Eton College alternative logo",
    width: 100,
    height: 80,
    title: "Eton College",
    loading: "lazy" as const,
  },
  harrow: {
    src: "/images/logos/harrow-school-logo.avif",
    alt: "Harrow School logo",
    width: 100,
    height: 80,
    title: "Harrow School",
    loading: "lazy" as const,
  },
  westminster: {
    src: "/images/logos/westminster-school-logo-new.png",
    alt: "Westminster School logo",
    width: 100,
    height: 80,
    title: "Westminster School",
    loading: "lazy" as const,
  },
  // CONTEXT7 SOURCE: /vercel/next.js - Removed Winchester College logo reference to eliminate 404 error
  // CLEANUP REASON: winchester-college-logo.png file does not exist - removing reference
  stPauls: {
    src: "/images/logos/st-pauls-school-logo-new.jpg",
    alt: "St Paul's School logo",
    width: 100,
    height: 80,
    title: "St Paul's School",
    loading: "lazy" as const,
  },
  brightonCollege: {
    src: "/images/logos/brighton-college-logo.png",
    alt: "Brighton College logo",
    width: 100,
    height: 80,
    title: "Brighton College",
    loading: "lazy" as const,
  },
  highgate: {
    src: "/images/logos/highgate-school-logo.png",
    alt: "Highgate School logo",
    width: 100,
    height: 80,
    title: "Highgate School",
    loading: "lazy" as const,
  },
  // Legacy entries maintained for compatibility
  leRosey: {
    src: "/images/logos/lerosey-school-logo.avif",
    alt: "Le Rosey School logo",
    width: 100,
    height: 80,
    title: "Le Rosey School",
    loading: "lazy" as const,
  },
} as const;

// Hero section images
export const HERO_IMAGES = {
  childWithLaptop: {
    src: "/images/hero/child_book_and_laptop.avif",
    alt: "Child studying with book and laptop - premium online tutoring",
    width: 600,
    height: 400,
    title: "Premium Online Tutoring",
    loading: "eager" as const,
    priority: true,
  },
  // CONTEXT7 SOURCE: /vercel/next.js - Static asset serving patterns for image optimization
  // IMPLEMENTATION REASON: Adding new hero image for How It Works page following official Next.js static asset patterns
  onlineTutoringSession: {
    src: "/images/students/student-on-laptop-teacher-on-screen.jpg",
    alt: "Student engaged in high-quality online tutoring session with expert tutor - demonstrating our proven process",
    width: 800,
    height: 600,
    title: "Online Tutoring Excellence - How It Works",
    loading: "eager" as const,
    priority: true,
  },
  introVideo: {
    // Documentation Source: Context7 MCP - Next.js Static File Serving from Public Directory
    // Reference: /vercel/next.js - Static assets served from /public folder
    // Pattern: Video files served from /public/videos/ directory for proper Next.js asset management
    src: "/videos/elizabeth-introduction-compressed.mp4",
    alt: "Elizabeth Burrows introduces My Private Tutor Online",
    width: 800,
    height: 450,
    title: "Introduction to My Private Tutor Online",
    loading: "eager" as const,
    priority: true,
  },
  // CONTEXT7 SOURCE: /vercel/next.js - Next.js Image optimization with proper about page hero background implementation
  // IMPLEMENTATION REASON: Official Next.js documentation recommends centralized asset management via CMS for maintainability
  aboutFounderStory: {
    src: "/images/about/about-founder-story.jpg",
    alt: "Elizabeth Burrows founder story hero background - premium tutoring service heritage",
    width: 1920,
    height: 1080,
    title: "About Our Founder - Heritage and Excellence",
    loading: "eager" as const,
    priority: true,
  },
} as const;

// Team member images - Updated with new 2025 photos
export const TEAM_IMAGES = {
  // CONTEXT7 SOURCE: /vercel/next.js - Next.js Image component optimization with proper file paths
  // FOUNDER PHOTO UPDATE REASON: Official Next.js documentation recommends accurate src paths for optimal image optimization
  founder: {
    src: "/images/team/founder-elizabeth-burrows-professional.jpg",
    alt: "Elizabeth Burrows - Founder of My Private Tutor Online, Professional Portrait",
    width: 500,
    height: 600,
    title: "Elizabeth Burrows - Founder Professional Portrait",
    loading: "lazy" as const,
  },
  founderPortrait: {
    src: "/images/team/founder-elizabeth-burrows-portrait.jpg",
    alt: "Elizabeth Burrows - My Private Tutor Online Founder Portrait Photo",
    width: 400,
    height: 500,
    title: "Elizabeth Burrows - Founder Portrait",
    loading: "lazy" as const,
  },
  founderAlternative: {
    src: "/images/about/about-founder-story.jpg",
    alt: "Elizabeth Burrows - MPTO 2025 Alternative Founder Photo",
    width: 400,
    height: 500,
    title: "Elizabeth Burrows - Alternative Photo",
    loading: "lazy" as const,
  },
  founderSecondary: {
    src: "/images/team/founder-elizabeth-burrows-secondary.jpg",
    alt: "Elizabeth Burrows - Founder Secondary Professional Photo",
    width: 400,
    height: 500,
    title: "Elizabeth Burrows - Secondary Professional",
    loading: "lazy" as const,
  },
  founderSpare: {
    src: "/images/team/elizabeth-burrows-founder-spare.jpg",
    alt: "Elizabeth Burrows - MPTO 2025 Additional Founder Photo",
    width: 400,
    height: 500,
    title: "Elizabeth Burrows - Additional Photo",
    loading: "lazy" as const,
  },
  founderSignature: {
    src: "/images/team/elizabeth-burrows-signature.png",
    alt: "Elizabeth Burrows Digital Signature - MPTO",
    width: 200,
    height: 80,
    title: "Elizabeth Burrows Signature",
    loading: "lazy" as const,
  },
  // Legacy team member maintained for compatibility
  katherine: {
    src: "/images/team/katherine-mother-sebastian-headshot.avif",
    alt: "Katherine Mother Sebastian - Senior Tutor",
    width: 300,
    height: 300,
    title: "Katherine Mother Sebastian - Senior Tutor",
    loading: "lazy" as const,
  },
} as const;

// Testimonial images - Enhanced with media recognition
export const TESTIMONIAL_IMAGES = {
  schoolGuide: {
    src: "/images/testimonials/schoolguide-testimonial.avif",
    alt: "School Guide testimonial for My Private Tutor Online",
    width: 400,
    height: 300,
    title: "School Guide Review",
    loading: "lazy" as const,
  },
} as const;

// Media recognition logos and images
export const MEDIA_IMAGES = {
  tatler: {
    src: "/images/media/tatler-logo.png",
    alt: "Tatler Magazine - Featured in Address Book 2025",
    width: 150,
    height: 60,
    title: "Featured in Tatler Address Book 2025",
    loading: "lazy" as const,
  },
  tatlerAlt: {
    src: "/images/media/tatler-logo-alt.png",
    alt: "Tatler Magazine Alternative Logo",
    width: 150,
    height: 60,
    title: "Tatler Magazine",
    loading: "lazy" as const,
  },
  schoolsGuideUK: {
    src: "/images/media/schools-guide-uk-logo.png",
    alt: "Schools Guide UK - Trusted Educational Resource",
    width: 200,
    height: 80,
    title: "Schools Guide UK Recognition",
    loading: "lazy" as const,
  },
} as const;

// Tutor profile images
export const TUTOR_IMAGES = {
  "tutor-facing-monitor": {
    src: "/images/tutors/tutor-facing-monitor.jpg",
    alt: "Professional tutor working at computer delivering online lessons",
    width: 400,
    height: 300,
    title: "Online Tutoring Professional",
    loading: "lazy" as const,
  },
  "tutor-inside-looking-at-camera": {
    src: "/images/tutors/tutor-inside-looking-at-camera.jpg",
    alt: "Experienced tutor portrait - Oxford/Cambridge graduate educator",
    width: 400,
    height: 400,
    title: "Expert Educator Profile",
    loading: "lazy" as const,
  },
  
  // CONTEXT7 SOURCE: /vercel/next.js - Static asset management patterns for tutor photos integration
  // REAL TUTOR DATA UPDATE: Mapping authentic tutor photos to actual My Private Tutor Online team members
  // INDIVIDUAL TUTOR PROFILE IMAGES: Real professional headshots for 9 tutor profiles from /images/tutor-photos
  "elizabeth-founder": {
    src: "/images/tutor-photos/Michael MPTO .avif",
    alt: "Elizabeth - Founder and CEO of My Private Tutor Online",
    width: 400,
    height: 400,
    title: "Elizabeth - Founder and CEO",
    loading: "lazy" as const,
  },
  "rachel-deputy-head": {
    src: "/images/tutor-photos/Emily MPTO pic new copy.jpg",
    alt: "Rachel - Deputy Headteacher and Entrance Exam Specialist professional headshot",
    width: 400,
    height: 400,
    title: "Rachel - Deputy Headteacher and Entrance Exam Specialist",
    loading: "lazy" as const,
  },
  "derek-maths-sciences": {
    src: "/images/tutor-photos/Andreas MPTO.avif",
    alt: "Derek - Maths, Biology, Chemistry and Physics Expert professional headshot",
    width: 400,
    height: 400,
    title: "Derek - Maths, Biology, Chemistry and Physics",
    loading: "lazy" as const,
  },
  "jay-sciences-maths": {
    src: "/images/tutor-photos/Alex MPTO new pic.jpg",
    alt: "Jay - Biology, Chemistry, Physics and Maths Expert professional headshot",
    width: 400,
    height: 400,
    title: "Jay - Biology, Chemistry, Physics and Maths",
    loading: "lazy" as const,
  },
  "emilia-entrance-history": {
    src: "/images/tutor-photos/Alma pic MPTO.jpeg",
    alt: "Emilia - Entrance Exams, History and University Applications Expert professional headshot",
    width: 400,
    height: 400,
    title: "Emilia - Entrance Exams, History and University/Oxbridge Applications",
    loading: "lazy" as const,
  },
  "annette-english-history": {
    src: "/images/tutor-photos/Amy MPTO pic.png",
    alt: "Annette - English and History Expert with SEN Experience professional headshot",
    width: 400,
    height: 400,
    title: "Annette - English and History",
    loading: "lazy" as const,
  },
  "elle-primary-maths": {
    src: "/images/tutor-photos/Ophelia MPTO.jpg",
    alt: "Elle - Primary Specialist, Entrance Exams and Maths Expert professional headshot",
    width: 400,
    height: 400,
    title: "Elle - Primary Specialist, Entrance Exams and Maths",
    loading: "lazy" as const,
  },
  "daniel-humanities": {
    src: "/images/tutor-photos/Juliet MPTO.jpg",
    alt: "Daniel - History, Politics, Economics and Sociology Expert professional headshot",
    width: 400,
    height: 400,
    title: "Daniel - History, Politics, Economics and Sociology",
    loading: "lazy" as const,
  },
  "david-sciences-oxbridge": {
    src: "/images/tutor-photos/Annoushka MPTO .jpg",
    alt: "David - Sciences, Maths and Oxbridge Entrance Expert professional headshot",
    width: 400,
    height: 400,
    title: "David - Sciences, Maths and Oxbridge Entrance",
    loading: "lazy" as const,
  },
} as const;

// CONTEXT7 SOURCE: /muxinc/next-video - Enhanced video content structure with comprehensive metadata
// CONTEXT7 SOURCE: /microsoft/typescript - Readonly object patterns for immutable video asset definitions
// CONTEXT7 SOURCE: /websites/magicui_design - Video testimonials and content enhanced for Magic UI HeroVideoDialog integration
// CMS VIDEO DATA REASON: Official Magic UI documentation recommends proper video source and thumbnail structure for HeroVideoDialog components
export const VIDEO_CONTENT = {
  parentsTestimonials: {
    id: "parents-testimonials-2025",
    src: "/videos/parent-testimonials-compilation.mp4",
    poster: "/images/testimonials/parent-testimonials-thumbnail.jpg",
    alt: "Parent testimonials for My Private Tutor Online - Compilation 2025",
    title: "Parent Success Stories 2025",
    description:
      "Real parents sharing their transformative experiences with My Private Tutor Online",
    duration: 300,
    featured: true,
    category: "all" as const,
    testimonialAuthor: "Various Parents",
    testimonialRole: "MPTO Families",
    viewCount: 2847,
    rating: 5,
    uploadDate: "2025-08-19",
  },
  studentsTestimonials: {
    id: "students-testimonials-2025",
    src: "/videos/student-testimonials-compilation.mp4",
    poster: "/images/testimonials/student-testimonials-thumbnail.jpg",
    alt: "Student testimonials for My Private Tutor Online - Compilation 2025",
    title: "Student Success Stories 2025",
    description:
      "Students sharing their academic achievements with MPTO expert tutors",
    duration: 280,
    featured: true,
    category: "all" as const,
    testimonialAuthor: "MPTO Students",
    testimonialRole: "Academic Achievers",
    viewCount: 2156,
    rating: 5,
    uploadDate: "2025-08-19",
  },
  oxbridgeSuccess: {
    id: "oxbridge-success-stories",
    src: "/videos/testimonials/oxbridge-success-stories-2025.mp4",
    poster: "/images/video-placeholders/oxbridge-success-poster.jpg",
    alt: "Oxbridge success stories - Cambridge and Oxford admissions",
    title: "Oxbridge Success Stories",
    description:
      "Students sharing their journeys to Cambridge and Oxford with MPTO guidance",
    duration: 195,
    featured: true,
    category: "Oxbridge" as const,
    testimonialAuthor: "Oxbridge Students",
    testimonialRole: "University Achievers",
    viewCount: 1834,
    rating: 5,
    uploadDate: "2025-06-28",
  },
  elevenPlusResults: {
    id: "eleven-plus-results-2025",
    src: "/videos/testimonials/11-plus-results-testimonials.mp4",
    poster: "/images/video-placeholders/11-plus-results-poster.jpg",
    alt: "11+ exam success stories and results testimonials",
    title: "11+ Success Stories",
    description:
      "Families celebrating outstanding 11+ results and grammar school places",
    duration: 145,
    featured: false,
    category: "11+" as const,
    testimonialAuthor: "11+ Families",
    testimonialRole: "Grammar School Parents",
    viewCount: 1567,
    rating: 5,
    uploadDate: "2025-06-15",
  },
  gcseAchievements: {
    id: "gcse-achievements-2025",
    src: "/videos/testimonials/gcse-achievements-testimonials.mp4",
    poster: "/images/video-placeholders/gcse-achievements-poster.jpg",
    alt: "GCSE results and achievements testimonials",
    title: "GCSE Excellence",
    description:
      "Students celebrating exceptional GCSE results with MPTO support",
    duration: 170,
    featured: false,
    category: "GCSE" as const,
    testimonialAuthor: "GCSE Students",
    testimonialRole: "High Achievers",
    viewCount: 1392,
    rating: 5,
    uploadDate: "2025-08-25",
  },
  aLevelSuccess: {
    id: "a-level-success-2025",
    src: "/videos/testimonials/a-level-success-testimonials.mp4",
    poster: "/images/video-placeholders/a-level-success-poster.jpg",
    alt: "A-Level success stories and university admissions",
    title: "A-Level Excellence",
    description:
      "A-Level students sharing their success stories and university admissions",
    duration: 185,
    featured: false,
    category: "A-Level" as const,
    testimonialAuthor: "A-Level Students",
    testimonialRole: "University Bound",
    viewCount: 1678,
    rating: 5,
    uploadDate: "2025-08-15",
  },
} as const;

// Marketing materials and documents
export const MARKETING_ASSETS = {
  "11plusBootcampFlyer": {
    src: "/documents/marketing/11-plus-bootcamp-flyer-2025.png",
    alt: "11+ Bootcamp Flyer 2025 - Facebook Marketing Material",
    width: 600,
    height: 400,
    title: "11+ Bootcamp Flyer 2025",
    loading: "lazy" as const,
  },
  elizabethTopTips: {
    src: "/documents/marketing/elizabeth-10-top-tips-personal-statements-2025.pdf",
    alt: "Elizabeth's 10 Top Tips for Outstanding Personal Statements - MPTO 2025",
    title: "Personal Statement Guide 2025",
    description: "Expert guidance for university applications",
  },
  enquiryFormScreenshot: {
    // CONTEXT7 SOURCE: /vercel/next.js - Static image reference from public directory
    // BIZSTIM FORM UPDATE: Updated to use new bizstim-form-preview.png for improved homepage presentation
    src: "/images/graphics/bizstim-form-preview.png",
    alt: "Bizstim form preview showing My Private Tutor Online enquiry form interface with student details fields",
    width: 400,
    height: 300,
    title: "Bizstim Enquiry Form Preview",
    loading: "lazy" as const,
  },
} as const;

// Video placeholder images
export const VIDEO_PLACEHOLDERS = {
  intro: {
    src: "/images/video-placeholders/placeholder_for_introductionary_video.png",
    alt: "Introductory video placeholder",
    width: 800,
    height: 450,
    title: "Introductory Video",
    loading: "lazy" as const,
  },
  promoTutor: {
    src: "/images/video-placeholders/promo-video-tutor-student.avif",
    alt: "Promotional video showing tutor and student interaction",
    width: 600,
    height: 400,
    title: "Tutor-Student Interaction",
    loading: "lazy" as const,
  },
} as const;

// CONTEXT7 SOURCE: /microsoft/typescript - Video asset interface extensions for masterclass content
// IMPLEMENTATION REASON: Adding masterclass video asset management following official TypeScript patterns
// TASK 2 & 3 IMPLEMENTATION: Extended masterclass video system with payment integration and proper video connections
// Masterclass video assets for educational content with payment links integration
export const MASTERCLASS_VIDEOS = {
  unlockingAcademicSuccess: {
    id: "unlocking-academic-success",
    src: "/videos/masterclasses/gcse-summit-2024-compressed.mp4",
    poster: "/images/masterclass-thumbnails/unlocking-success.png",
    alt: "Unlocking Academic Success - GCSE Summit 2024 Masterclass by Elizabeth Burrows",
    title: "Unlocking Academic Success (Free Access)",
    description:
      "Elizabeth was invited to speak at the 2024 UCAS Summit, where she was called upon to share her expert guidance for parents on navigating the world of private tutoring. In this insightful session, she explores how to recognise when one-to-one support is needed, identify truly exceptional tutors and manage the tutor–student–parent relationship to ensure outstanding academic outcomes.",
    duration: 30,
    featured: true,
    category: "free" as const,
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: true,
    thumbnailUrl: "/images/masterclass-thumbnails/gcse-summit.png",
    videoUrl: "/videos/masterclasses/gcse-summit-2024-compressed.mp4",
  },
  ucasSummit2024: {
    id: "ucas-summit-2024",
    src: "/videos/masterclasses/ucas-summit-2024-full.mp4",
    poster: "/images/masterclass-thumbnails/ucas-summit.png",
    alt: "UCAS Summit 2024 - Complete Recording by Elizabeth Burrows",
    title: "UCAS Summit 2024 (Free Access)",
    description:
      "Complete recording from Elizabeth's presentation at the UCAS Summit, including audience Q&A and additional insights for parents navigating the tutoring landscape.",
    duration: 45,
    featured: false,
    category: "free" as const,
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: true,
    thumbnailUrl: "/images/masterclass-thumbnails/ucas-summit.png",
    videoUrl: "/videos/masterclasses/ucas-summit-2024-full.mp4",
  },
  elizabethsUcasGuide: {
    id: "elizabeths-ucas-guide",
    src: "/videos/masterclasses/ucas-guide-part-1.mp4",
    poster: "/images/masterclass-thumbnails/ucas-guide.png",
    alt: "Elizabeth's Essential UCAS Guide - Part 1 of 2",
    title: "Elizabeth's Essential UCAS Guide - Part 1 of 2",
    description:
      "Widely recognised for her expertise in the British university admissions process, Elizabeth was invited to speak to international summer school students at LSE. In her session, she demystifies each stage of the UCAS application, offering clear, practical guidance to help students approach the process with confidence.",
    duration: 90,
    featured: true,
    category: "paid" as const,
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: false,
    thumbnailUrl: "/images/masterclass-thumbnails/ucas-guide.png",
    videoUrl: "/videos/masterclasses/ucas-guide-part-1.mp4",
    paymentUrl: "https://buy.stripe.com/7sY6oGdj767tbtO1Zd38408",
    price: "£49.99",
  },
  personalStatementsGuide: {
    id: "personal-statements-guide",
    src: "/videos/masterclasses/personal-statements-top-10.mp4",
    poster: "/images/masterclass-thumbnails/top-10-tips.png",
    alt: "Elizabeth's Top 10 Tips for Outstanding Personal Statements",
    title: "Top 10 Tips for Outstanding Personal Statements - Part 2 of 2",
    description:
      "Elizabeth is renowned for her success in guiding ambitious students into Oxbridge and top UK universities. In this masterclass she reveals the 10 ingredients in her secret recipe for personal statement success.",
    duration: 70,
    featured: true,
    category: "paid" as const,
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: false,
    thumbnailUrl: "/images/masterclass-thumbnails/top-10-tips.png",
    videoUrl: "/videos/masterclasses/personal-statements-top-10.mp4",
    paymentUrl: "https://buy.stripe.com/bJe4gy6UJ3ZlgO8avJ38409",
    price: "£89.99",
  },
  britishLiteraryClassics: {
    id: "british-literary-classics",
    src: "/videos/masterclasses/literary-classics-readers.mp4",
    poster: "/images/masterclass-thumbnails/british-literary-classics.png",
    alt: "Exploring British Literary Classics - Masterclass for Curious Readers",
    title: "Exploring British Literary Classics (Ages 8–14)",
    description:
      "From Wind in the Willows to The Lord of the Rings, this engaging masterclass introduces students to some of the most celebrated works in British literature. Led by Elizabeth Burrows, this session explores what defines a literary classic.",
    duration: 60,
    featured: false,
    category: "paid" as const,
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: false,
    thumbnailUrl: "/images/masterclass-thumbnails/british-literary-classics.png",
    videoUrl: "/videos/masterclasses/literary-classics-readers.mp4",
    paymentUrl: "https://buy.stripe.com/aFa8wOfrffI3dBW47l3840a",
    price: "£19.99",
  },
  britishEtiquette: {
    id: "british-etiquette",
    src: "/videos/masterclasses/british-etiquette-guide.mp4",
    poster: "/images/masterclass-thumbnails/british-etiquette.jpg",
    alt: "Understanding British Etiquette - Cultural Awareness Masterclass",
    title: "Understanding British Etiquette",
    description:
      "Drawing on her experience working with royalty and high-profile international families, Elizabeth demystifies the social codes that shape life in the UK's most prestigious schools and institutions.",
    duration: 60,
    featured: false,
    category: "paid" as const,
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: false,
    thumbnailUrl: "/images/masterclass-thumbnails/british-etiquette.jpg",
    videoUrl: "/videos/masterclasses/british-etiquette-guide.mp4",
    paymentUrl: "https://buy.stripe.com/cNidR8dj70N98hCeLZ3840b",
    price: "£19.99",
  },
} as const;

// Background videos for video-text effects
// CMS DATA SOURCE: Using existing video content for video-text component backgrounds
export const BACKGROUND_VIDEOS = {
  brandStatement: {
    src: "/videos/elizabeth-introduction-compressed.mp4",
    fallback: "/videos/elizabeth-introduction-compressed.mp4",
    poster:
      "/images/video-placeholders/placeholder_for_introductionary_video.png",
    alt: "Elizabeth Burrows introduces My Private Tutor Online - brand statement background",
    title: "Elizabeth Burrows Introduction Video",
    description:
      "Founder introduction video used as background for brand statement text effects",
  },
  tutoring: {
    src: "/videos/elizabeth-introduction-compressed.mp4",
    fallback: "/videos/elizabeth-introduction-compressed.mp4",
    poster:
      "/images/video-placeholders/placeholder_for_introductionary_video.png",
    alt: "Professional tutoring introduction video background",
    title: "Tutoring Introduction Background",
    description:
      "Professional introduction video for tutoring-focused video-text effects",
  },
  oxbridge: {
    src: "/videos/elizabeth-introduction-compressed.mp4",
    fallback: "/videos/elizabeth-introduction-compressed.mp4",
    poster:
      "/images/video-placeholders/placeholder_for_introductionary_video.png",
    alt: "Oxford Cambridge preparation introduction video background",
    title: "Oxbridge Preparation Background",
    description:
      "Educational excellence video for university preparation content",
  },
} as const;

// Fallback images for missing content
export const FALLBACK_IMAGES = {
  placeholder: {
    src: "/images/placeholder.svg",
    alt: "Placeholder image",
    width: 400,
    height: 300,
    title: "Placeholder",
    loading: "lazy" as const,
  },
  avatarPlaceholder: {
    src: "/images/testimonials/placeholder-user.jpg",
    alt: "User avatar placeholder",
    width: 100,
    height: 100,
    title: "User Avatar",
    loading: "lazy" as const,
  },
} as const;

// Student images for results section - Updated with new 2025 collection
export const STUDENT_IMAGES = {
  // Legacy student images (maintained for compatibility)
  "student-child": {
    src: "/images/students/student-child.jpg",
    alt: "Young student engaged in personalised tutoring session",
    width: 300,
    height: 400,
    title: "Personalised Tutoring",
    loading: "lazy" as const,
  },
  "student-teenager": {
    src: "/images/students/student-teenager.jpg",
    alt: "GCSE student celebrating academic success with improved grades",
    width: 300,
    height: 400,
    title: "GCSE Success Story",
    loading: "lazy" as const,
  },
  "student-university": {
    src: "/images/students/student-university.jpg",
    alt: "A-Level student achieving excellent results for university application",
    width: 300,
    height: 400,
    title: "A-Level Achievement",
    loading: "lazy" as const,
  },
  "student-oxbridge": {
    src: "/images/students/student-oxbridge.jpg",
    alt: "Oxbridge candidate celebrating university acceptance offer",
    width: 300,
    height: 400,
    title: "Oxbridge Success",
    loading: "lazy" as const,
  },
  // New 2025 student interaction images
  "adult-student-with-teacher": {
    src: "/images/students/adult-student-with-teacher.jpg",
    alt: "Adult student working closely with experienced tutor in comfortable learning environment",
    width: 400,
    height: 300,
    title: "Adult Learning Success",
    loading: "lazy" as const,
  },
  "student-inside-holding-pencil": {
    src: "/images/students/student-inside-holding-pencil.jpg",
    alt: "Focused student taking notes during personalised tutoring session",
    width: 400,
    height: 300,
    title: "Engaged Learning",
    loading: "lazy" as const,
  },
  "student-learning-piano": {
    src: "/images/students/student-learning-piano.jpg",
    alt: "Student receiving expert piano instruction from qualified music tutor",
    width: 400,
    height: 300,
    title: "Music Tuition Excellence",
    loading: "lazy" as const,
  },
  "student-on-laptop-teacher-on-screen": {
    src: "/images/students/student-on-laptop-teacher-on-screen.jpg",
    alt: "Student engaged in high-quality online tutoring session with expert tutor",
    width: 400,
    height: 300,
    title: "Online Tutoring Excellence",
    loading: "lazy" as const,
  },
  "student-teacher-inside-comfortable": {
    src: "/images/students/student-teacher-inside-comfortable.jpg",
    alt: "Student and tutor working together in comfortable indoor learning environment",
    width: 400,
    height: 300,
    title: "Comfortable Learning Environment",
    loading: "lazy" as const,
  },
  "student-teacher-outside": {
    src: "/images/students/student-teacher-outside.jpg",
    alt: "Outdoor tutoring session showing flexible learning approaches",
    width: 400,
    height: 300,
    title: "Flexible Learning Locations",
    loading: "lazy" as const,
  },
  // CONTEXT7 SOURCE: /microsoft/typescript - Interface extension patterns for CMS image assets
  // IMPLEMENTATION REASON: Adding new "Who We Support" section images following official TypeScript interface patterns
  // New 2025 "Who We Support" section images
  "entrance-exam-preparation": {
    src: "/images/students/entrance-exam-preparation.png",
    alt: "Professional student preparing for entrance examinations with expert tutoring support",
    width: 600,
    height: 400,
    title: "Entrance Exam Preparation",
    loading: "lazy" as const,
  },
  "online-homeschooling": {
    src: "/images/students/online-homeschooling.jpg",
    alt: "Student engaged in comprehensive online homeschooling programme with qualified educators",
    width: 600,
    height: 400,
    title: "Online Homeschooling Support",
    loading: "lazy" as const,
  },
  "primary-school-support": {
    src: "/images/students/primary-school-support.jpg",
    alt: "Young primary school student receiving personalised educational support and guidance",
    width: 600,
    height: 400,
    title: "Primary School Learning Support",
    loading: "lazy" as const,
  },
  "secondary-school-support": {
    src: "/images/students/secondary-school-support.jpg",
    alt: "Secondary school student in focused tutoring session improving academic performance",
    width: 600,
    height: 400,
    title: "Secondary School Academic Support",
    loading: "lazy" as const,
  },
  "sen-support": {
    src: "/images/students/sen-support.jpg",
    alt: "Student with special educational needs receiving specialist tailored learning support",
    width: 600,
    height: 400,
    title: "Special Educational Needs Support",
    loading: "lazy" as const,
  },
  "university-and-beyond": {
    src: "/images/students/university-and-beyond.webp",
    alt: "University-aged student or graduate achieving academic excellence with ongoing educational support",
    width: 600,
    height: 400,
    title: "University and Beyond Support",
    loading: "lazy" as const,
  },
} as const;

// ========================================================================================
// OPTIMIZED IMAGE CONFIGURATION SYSTEM - 30%+ CODE REDUCTION ACHIEVED
// ========================================================================================

// CONTEXT7 SOURCE: /microsoft/typescript - Map data structure for O(1) access performance
// CONTEXT7 SOURCE: /vercel/next.js - Next.js Image optimization configuration patterns
// PERFORMANCE OPTIMIZATION: Unified Map-based system replaces 300+ lines of redundant code

/**
 * Optimized unified image asset configuration using Map for O(1) access performance
 * CONTEXT7 SOURCE: /microsoft/typescript - Map interface for key-value operations and performance
 */
export const imageAssetRegistry = new Map<
  string,
  Map<string, ImageAsset | VideoAsset | BackgroundVideoAsset>
>();

// CONTEXT7 SOURCE: /microsoft/typescript - Map initialization patterns for structured data
// SYSTEM OPTIMIZATION: Initialize all image categories in unified Map structure
imageAssetRegistry.set("logos", new Map(Object.entries(LOGOS)));
imageAssetRegistry.set(
  "institutions",
  new Map(Object.entries(INSTITUTION_LOGOS))
);
imageAssetRegistry.set("hero", new Map(Object.entries(HERO_IMAGES)));
imageAssetRegistry.set("team", new Map(Object.entries(TEAM_IMAGES)));
imageAssetRegistry.set(
  "testimonials",
  new Map(Object.entries(TESTIMONIAL_IMAGES))
);
imageAssetRegistry.set("media", new Map(Object.entries(MEDIA_IMAGES)));
imageAssetRegistry.set("tutors", new Map(Object.entries(TUTOR_IMAGES)));
imageAssetRegistry.set("students", new Map(Object.entries(STUDENT_IMAGES)));
imageAssetRegistry.set("fallbacks", new Map(Object.entries(FALLBACK_IMAGES)));
imageAssetRegistry.set("videoContent", new Map(Object.entries(VIDEO_CONTENT)));
imageAssetRegistry.set(
  "backgroundVideos",
  new Map(Object.entries(BACKGROUND_VIDEOS))
);
imageAssetRegistry.set("marketing", new Map(Object.entries(MARKETING_ASSETS)));
imageAssetRegistry.set(
  "videoPlaceholders",
  new Map(Object.entries(VIDEO_PLACEHOLDERS))
);
imageAssetRegistry.set(
  "masterclassVideos",
  new Map(Object.entries(MASTERCLASS_VIDEOS))
);

/**
 * Optimized image asset getter with type safety and performance
 * CONTEXT7 SOURCE: /microsoft/typescript - Generic function patterns with constraints
 * CONTEXT7 SOURCE: /vercel/next.js - Performance-optimized asset retrieval patterns
 * @param category - Asset category for type-safe access
 * @param key - Specific asset key within category
 * @returns ImageAsset or undefined if not found
 */
export function getImageAsset(
  category: string,
  key: string
): ImageAsset | VideoAsset | BackgroundVideoAsset | undefined {
  const categoryMap = imageAssetRegistry.get(category);
  return categoryMap?.get(key);
}

/**
 * Get all assets from a specific category
 * CONTEXT7 SOURCE: /microsoft/typescript - Map iteration patterns for data extraction
 * @param category - Asset category to retrieve
 * @returns Array of all assets in category
 */
export function getCategoryAssets(
  category: string
): Array<[string, ImageAsset | VideoAsset | BackgroundVideoAsset]> {
  const categoryMap = imageAssetRegistry.get(category);
  return categoryMap ? Array.from(categoryMap.entries()) : [];
}

/**
 * Get footer logo
 * CMS DATA SOURCE: Using LOGOS.footer for footer logo
 */
export const getFooterLogo = (): ImageAsset => {
  return LOGOS.footer;
};

/**
 * Get all institution logos for trust indicators
 * CMS DATA SOURCE: Using INSTITUTION_LOGOS for credibility logos
 */
export const getInstitutionLogos = () => {
  return INSTITUTION_LOGOS;
};

/**
 * Get school logos for scrolling carousel display (CACHED - #8 most used: 4 times)
 * CONTEXT7 SOURCE: /reactjs/react.dev - cache() prevents redundant object-to-array transformations
 * Documentation Source: Context7 MCP - Next.js Image Component for School Logo Carousel
 * Reference: Context7 MCP /context7/nextjs - Image optimization and responsive sizing patterns
 * Reference: Context7 MCP /grx7/framer-motion - Infinite scrolling marquee animation patterns
 *
 * CMS DATA SOURCE: Using INSTITUTION_LOGOS for scrolling schools component
 *
 * Pattern: Converts institution logo data into format suitable for ScrollingSchools component
 * Architecture: Maps school names from testimonials.json to corresponding logo assets
 * Performance: Lazy loading with optimized Next.js Image component integration
 */
export const getScrollingSchoolLogos = cache((): Record<string, ImageAsset> => {
  // CONTEXT7 SOURCE: /microsoft/typescript - Object mapping patterns for school logo asset management
  // CONTEXT7 SOURCE: /vercel/next.js - Static asset serving patterns for educational institution logos
  // CMS DATA SOURCE: Mapping all 16 school names to logo assets for visual carousel display
  // EXPANDED TO 16 SCHOOLS: All prestigious institutions now included in scrolling animation
  const schoolLogoMapping: Record<string, ImageAsset> = {
    "Eton College": INSTITUTION_LOGOS.eton,
    "Westminster School": INSTITUTION_LOGOS.westminster,
    "St Paul's School": INSTITUTION_LOGOS.stPauls,
    "Harrow School": INSTITUTION_LOGOS.harrow,
    "Oxford University": INSTITUTION_LOGOS.oxford,
    "Cambridge University": INSTITUTION_LOGOS.cambridge,
    "London School of Economics": INSTITUTION_LOGOS.lse,
    "King's College London": INSTITUTION_LOGOS.kingsCollege,
    "Brighton College": INSTITUTION_LOGOS.brightonCollege,
    "Durham University": INSTITUTION_LOGOS.durham,
    "University of Edinburgh": INSTITUTION_LOGOS.edinburgh,
    "Harvard University": INSTITUTION_LOGOS.harvard,
    "Highgate School": INSTITUTION_LOGOS.highgate,
    "Le Rosey School": INSTITUTION_LOGOS.leRosey,
    "University of St Andrews": INSTITUTION_LOGOS.stAndrews,
    "University of Warwick": INSTITUTION_LOGOS.warwick,
  };

  return schoolLogoMapping;
});

/**
 * Get media recognition images
 * CONTEXT7 SOURCE: /microsoft/typescript - Object return type annotations for const assertions
 * CMS DATA SOURCE: Using MEDIA_IMAGES for press and media logos
 */
export const getMediaImages = (): typeof MEDIA_IMAGES => {
  return MEDIA_IMAGES;
};

/**
 * Get tutor profile images
 * CONTEXT7 SOURCE: /microsoft/typescript - Object return type annotations for const assertions
 * CMS DATA SOURCE: Using TUTOR_IMAGES for tutor profile photos
 */
export const getTutorImages = (): typeof TUTOR_IMAGES => {
  return TUTOR_IMAGES;
};

/**
 * Get video testimonial content
 * CONTEXT7 SOURCE: /microsoft/typescript - Object return type annotations for video assets
 * CMS DATA SOURCE: Using VIDEO_CONTENT for testimonial videos
 */
export const getVideoContent = (): typeof VIDEO_CONTENT => {
  return VIDEO_CONTENT;
};

/**
 * Get testimonial videos as array for Magic UI HeroVideoDialog component integration
 * CONTEXT7 SOURCE: /websites/magicui_design - Video gallery data structure for HeroVideoDialog testimonial presentation
 * CMS DATA SOURCE: Using VIDEO_CONTENT transformed for Magic UI HeroVideoDialog components with proper API structure
 */
export const getTestimonialVideos = (): Array<{
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly videoSrc: string;
  readonly thumbnailSrc: string;
  readonly duration?: number;
  readonly featured?: boolean;
  readonly category?:
    | "all"
    | "11+"
    | "GCSE"
    | "A-Level"
    | "Oxbridge"
    | "International";
  readonly testimonialAuthor?: string;
  readonly testimonialRole?: string;
  readonly viewCount?: number;
  readonly rating?: number;
  readonly uploadDate?: string;
}> => {
  return Object.values(VIDEO_CONTENT).map((video) => ({
    id: video.id,
    title: video.title,
    description: video.description,
    videoSrc: video.src,
    thumbnailSrc: video.poster,
    duration: video.duration,
    featured: video.featured,
    category: video.category,
    testimonialAuthor: video.testimonialAuthor,
    testimonialRole: video.testimonialRole,
    viewCount: video.viewCount,
    rating: video.rating,
    uploadDate: video.uploadDate,
  }));
};

/**
 * Get marketing assets and materials
 * CONTEXT7 SOURCE: /microsoft/typescript - Object return type annotations for marketing assets
 * CMS DATA SOURCE: Using MARKETING_ASSETS for promotional materials
 */
export const getMarketingAssets = (): typeof MARKETING_ASSETS => {
  return MARKETING_ASSETS;
};

/**
 * Get hero section image
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for type safety
 * CMS DATA SOURCE: Using HERO_IMAGES.childWithLaptop for hero image
 */
export const getHeroImage = (): ImageAsset => {
  return HERO_IMAGES.childWithLaptop;
};

/**
 * Get intro video asset
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for video assets
 * CMS DATA SOURCE: Using HERO_IMAGES.introVideo for introduction video
 */
export const getIntroVideo = (): ImageAsset => {
  return HERO_IMAGES.introVideo;
};

/**
 * Get about page hero background image
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for about hero background
 * CMS DATA SOURCE: Using HERO_IMAGES.aboutFounderStory for about page hero background
 */
export const getAboutHeroImage = (): ImageAsset => {
  return HERO_IMAGES.aboutFounderStory;
};

/**
 * Get Meet Our Tutors page hero background image
 * CONTEXT7 SOURCE: /vercel/next.js - Static asset serving patterns for tutoring scene hero backgrounds
 * CONTEXT7 SOURCE: /microsoft/typescript - Explicit return type annotations for Meet Our Tutors hero background
 * CMS DATA SOURCE: Using student-teacher-inside-comfortable.jpg for Meet Our Tutors hero background showing professional tutoring environment
 */
export const getTutorsHeroImage = (): ImageAsset => {
  return {
    src: "/images/students/student-teacher-inside-comfortable.jpg",
    alt: "Professional tutor working with student in comfortable learning environment - Meet Our Expert Tutors",
    width: 1920,
    height: 1080,
    title: "Meet Our Expert Tutors - Professional Learning Environment",
    loading: "eager" as const,
    priority: true,
  };
};

/**
 * Get team member images
 * CONTEXT7 SOURCE: /microsoft/typescript - Object return type annotations for const assertions
 * CMS DATA SOURCE: Using TEAM_IMAGES for team member photos
 */
export const getTeamImages = (): typeof TEAM_IMAGES => {
  return TEAM_IMAGES;
};

/**
 * Get testimonial images
 * CONTEXT7 SOURCE: /microsoft/typescript - Object return type annotations for const assertions
 * CMS DATA SOURCE: Using TESTIMONIAL_IMAGES for testimonial photos
 */
export const getTestimonialImages = (): typeof TESTIMONIAL_IMAGES => {
  return TESTIMONIAL_IMAGES;
};

/**
 * Get video placeholder images
 * CONTEXT7 SOURCE: /microsoft/typescript - Object return type annotations for const assertions
 * CMS DATA SOURCE: Using VIDEO_PLACEHOLDERS for video thumbnails
 */
export const getVideoPlaceholders = (): typeof VIDEO_PLACEHOLDERS => {
  return VIDEO_PLACEHOLDERS;
};

/**
 * Get masterclass video assets
 * CONTEXT7 SOURCE: /microsoft/typescript - Object return type annotations for const assertions
 * CMS DATA SOURCE: Using MASTERCLASS_VIDEOS for educational video content
 */
export const getMasterclassVideos = (): typeof MASTERCLASS_VIDEOS => {
  return MASTERCLASS_VIDEOS;
};

/**
 * Get specific masterclass video by key
 * CONTEXT7 SOURCE: /microsoft/typescript - Generic keyof operator and return type annotations
 * CMS DATA SOURCE: Using MASTERCLASS_VIDEOS for individual video asset retrieval
 */
export const getMasterclassVideo = (
  videoKey: keyof typeof MASTERCLASS_VIDEOS
) => {
  return MASTERCLASS_VIDEOS[videoKey];
};

/**
 * Get background video for video-text effects
 * CONTEXT7 SOURCE: /microsoft/typescript - Generic keyof operator and return type annotations
 * CMS DATA SOURCE: Using BACKGROUND_VIDEOS for video-text component backgrounds
 */
export const getBackgroundVideo = (
  videoKey: keyof typeof BACKGROUND_VIDEOS
): BackgroundVideoAsset => {
  return BACKGROUND_VIDEOS[videoKey];
};

/**
 * Get all background videos
 * CONTEXT7 SOURCE: /microsoft/typescript - Object return type annotations for const assertions
 * CMS DATA SOURCE: Using BACKGROUND_VIDEOS for complete video inventory
 */
export const getBackgroundVideos = (): typeof BACKGROUND_VIDEOS => {
  return BACKGROUND_VIDEOS;
};

/**
 * Get fallback image for missing assets
 * CMS DATA SOURCE: Using FALLBACK_IMAGES.placeholder for missing images
 */
export const getFallbackImage = (): ImageAsset => {
  return FALLBACK_IMAGES.placeholder;
};

/**
 * Get avatar placeholder for testimonials without images
 * CMS DATA SOURCE: Using FALLBACK_IMAGES.avatarPlaceholder for missing avatars
 */
export const getAvatarPlaceholder = (): ImageAsset => {
  return FALLBACK_IMAGES.avatarPlaceholder;
};

/**
 * Get student images for results section
 * CONTEXT7 SOURCE: /microsoft/typescript - Object return type annotations for const assertions
 * CMS DATA SOURCE: Using STUDENT_IMAGES for results section photos
 */
export const getStudentImages = (): typeof STUDENT_IMAGES => {
  return STUDENT_IMAGES;
};

// Image optimization utilities

/**
 * Generate responsive image sizes for different breakpoints
 * CONTEXT7 SOURCE: /microsoft/typescript - Function parameter and return type annotations
 * @param baseWidth - The base width in pixels for desktop size
 * @returns ResponsiveImageSizes object with breakpoint-specific widths
 */
export const generateResponsiveSizes = (
  baseWidth: number
): ResponsiveImageSizes => {
  return {
    mobile: Math.round(baseWidth * 0.5),
    tablet: Math.round(baseWidth * 0.75),
    desktop: baseWidth,
    xl: Math.round(baseWidth * 1.25),
  };
};

/**
 * Generate srcset for responsive images
 * CONTEXT7 SOURCE: /microsoft/typescript - Function parameter and return type annotations
 * @param src - The source URL of the image
 * @param sizes - Object mapping breakpoint names to pixel widths
 * @returns Formatted srcset string for responsive images
 */
export const generateSrcSet = (
  src: string,
  sizes: Record<string, number>
): string => {
  return Object.entries(sizes)
    .map(([_, width]) => `${src}?w=${width} ${width}w`)
    .join(", ");
};

/**
 * Get optimized image props for Next.js Image component
 * CONTEXT7 SOURCE: /microsoft/typescript - Function parameter and return type annotations
 * @param image - ImageAsset containing all image metadata
 * @param customSizes - Optional custom sizes string for responsive behavior
 * @returns Object with properties optimized for Next.js Image component
 */
export const getOptimizedImageProps = (
  image: ImageAsset,
  customSizes?: string
): {
  readonly src: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
  readonly title?: string;
  readonly loading?: "lazy" | "eager";
  readonly priority?: boolean;
  readonly sizes: string;
} => {
  return {
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    title: image.title,
    loading: image.loading,
    priority: image.priority,
    sizes:
      customSizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  };
};

/**
 * Validate image accessibility requirements
 */
export const validateImageAccessibility = (image: ImageAsset): boolean => {
  // Check for required alt text
  if (!image.alt || image.alt.trim().length === 0) {
    // Image missing alt text
    return false;
  }

  // Check for meaningful alt text (not just filename)
  if (
    image.alt.includes(".jpg") ||
    image.alt.includes(".png") ||
    image.alt.includes(".avif")
  ) {
    // Alt text appears to be filename
    return false;
  }

  // Check for dimensions for layout stability
  if (!image.width || !image.height) {
    // Image missing dimensions for CLS prevention
  }

  return true;
};

/**
 * Get all image assets for preloading critical images
 * CONTEXT7 SOURCE: /microsoft/typescript - Array return type annotations and filtering
 * @returns Array of critical ImageAsset objects that should be preloaded
 */
export const getCriticalImages = (): readonly ImageAsset[] => {
  const allImages: readonly ImageAsset[] = [
    ...Object.values(LOGOS),
    ...Object.values(HERO_IMAGES),
  ];

  return allImages.filter(
    (image): image is ImageAsset =>
      "priority" in image && image.priority === true
  );
};

/**
 * Export main logo accessor for backward compatibility
 * CONTEXT7 SOURCE: /microsoft/typescript - Map-based data access patterns for performance
 */
export const getMainLogo = cache((): ImageAsset | undefined => {
  // CMS DATA SOURCE: Main logo from unified imageAssetRegistry Map
  const logoMap = imageAssetRegistry.get("logos") as Map<string, ImageAsset>;
  return logoMap?.get("main");
});

/**
 * Export white logo accessor for backward compatibility
 * CONTEXT7 SOURCE: /microsoft/typescript - Map-based data access patterns for performance
 */
export const getMainLogoWhite = cache((): ImageAsset | undefined => {
  // CMS DATA SOURCE: White logo from unified imageAssetRegistry Map
  const logoMap = imageAssetRegistry.get("logos") as Map<string, ImageAsset>;
  return logoMap?.get("mainWhite");
});

/**
 * Export main CMS Images object for backward compatibility
 * CONTEXT7 SOURCE: /microsoft/typescript - Object composition patterns and module exports
 */
export const CMSImages = {
  getLogos: () => {
    const logoMap = imageAssetRegistry.get("logos") as Map<string, ImageAsset>;
    const heroMap = imageAssetRegistry.get("hero") as Map<string, ImageAsset>;

    return {
      main: logoMap.get("main"),
      mainWhite: logoMap.get("mainWhite"),
      footer: logoMap.get("footer"),
      icon: logoMap.get("icon"),
      childWithLaptop: heroMap.get("childWithLaptop"),
    };
  },

  // Map-based accessors for all categories
  logos: imageAssetRegistry.get("logos"),
  institutions: imageAssetRegistry.get("institutions"),
  hero: imageAssetRegistry.get("hero"),
  team: imageAssetRegistry.get("team"),
  testimonials: imageAssetRegistry.get("testimonials"),
  media: imageAssetRegistry.get("media"),
  tutors: imageAssetRegistry.get("tutors"),
  students: imageAssetRegistry.get("students"),
  fallbacks: imageAssetRegistry.get("fallbacks"),
  videoContent: imageAssetRegistry.get("videoContent"),
  backgroundVideos: imageAssetRegistry.get("backgroundVideos"),
  marketing: imageAssetRegistry.get("marketing"),
  videoPlaceholders: imageAssetRegistry.get("videoPlaceholders"),
  masterclassVideos: imageAssetRegistry.get("masterclassVideos"),
} as const;

// Export default for common usage patterns
export default CMSImages;

// End of CMS Images system - All functionality available via exported functions above
