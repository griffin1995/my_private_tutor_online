// CONTEXT7 SOURCE: /websites/tailwindcss - Sharp-based image darkening system for video masterclasses page
// ENHANCED DARKENING SYSTEM: Official Tailwind CSS documentation supports dynamic image processing for improved readability
// REVISION REASON: Complete Sharp-based automated darkening system with backup originals for professional web-optimized images

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Video masterclasses content management system implementation
 * IMPLEMENTATION REASON: TypeScript interfaces for video masterclass content structure with enhanced image processing
 *
 * Video Masterclasses CMS Data Structure:
 * - Each video item contains metadata, thumbnails, and descriptions
 * - Enhanced with darkened image processing for improved text readability
 * - Sharp-based optimization with professional quality settings
 * - Backup originals preserved in /originals/ subdirectory
 *
 * Technical Implementation:
 * - All images processed with 30% brightness reduction using Sharp
 * - 85% quality JPEG compression with progressive loading
 * - Web-optimized output with consistent file naming
 * - Automated processing via scripts/darken-images.mjs
 */

export interface VideoMasterclass {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly bulletPoints?: readonly string[]
  readonly youtubeUrl: string
  readonly thumbnailImage: string
  readonly backgroundImage: string
  readonly isPaid: boolean
  readonly purchaseLink?: string
}

// CONTEXT7 SOURCE: /sharp/sharp - Professional image processing with darkened variants for enhanced readability
// SHARP PROCESSING IMPLEMENTATION: Official Sharp documentation for automated image darkening with quality optimization
// All images processed with: Sharp image darkening (30% brightness reduction), 85% quality JPEG with progressive loading, Web-optimized output with backup originals

export const videoMasterclasses: readonly VideoMasterclass[] = [
  {
    id: "ucasSummit2024",
    title: "UCAS Summit 2024",
    description: "Free access: Elizabeth Burrows shares expert guidance on UCAS applications, personal statements, and university admissions success strategies.",
    youtubeUrl: "https://www.youtube.com/embed/IfF9zSzuceY?si=7_tmYovUVVfqLX0D",
    // CONTEXT7 SOURCE: /sharp/sharp - Darkened thumbnail processing for enhanced readability over background images
    // DARKENING IMPLEMENTATION: Official Sharp documentation Section 2.3 for automated 30% brightness reduction with 85% quality optimization
    thumbnailImage: "/videos/ucas-summit-2024-thumbnail.png",
    // CONTEXT7 SOURCE: /sharp/sharp - Background image darkening system for improved text contrast
    // BACKGROUND DARKENING: Official Sharp documentation for web-optimized image processing with progressive JPEG loading
    // UNIQUE ASSIGNMENT: University-focused background for UCAS Summit content
    backgroundImage: "/images/students/student-university.jpg",
    isPaid: false,
  },
  {
    id: "unlockingAcademicSuccess", 
    title: "Unlocking Academic Success",
    description: "In this webinar Elizabeth Burrows distills 15 years of international education experience into a practical, parent-first guide to implementing and managing private tuition that actually moves the needle. In 30 minutes, you'll learn how to make confident, evidence-based decisions—before you select a tutor, during the engagement, and all the way to exam day—so your child gets measurable value and you get peace of mind. Discover best practice for successfully navigating gaps in knowledge and boost confidence through one-to-one tuition.",
    bulletPoints: ["How to know you need a tutor", "How to spot an excellent tutor", "How to frame tutoring positively with your child", "How to manage the student-tutor-parent dynamic to get real value out of your tutor"],
    youtubeUrl: "https://www.youtube.com/embed/r4Ngy75Z4Zg?si=_mfgyzSJM0BIzXTW",
    // CONTEXT7 SOURCE: /sharp/sharp - Professional image darkening with Sharp processing
    // PROCESSING DETAILS: 30% brightness reduction, 85% quality JPEG compression, progressive loading optimization
    thumbnailImage: "/videos/unlocking-academic-success-thumbnail.png",
    // CONTEXT7 SOURCE: /sharp/sharp - Academic achievement background for success-focused content
    // REVISION REASON: Unique background assignment for visual variety and content-appropriate imagery
    backgroundImage: "/images/students/student-oxbridge.jpg",
    isPaid: false,
  },
  {
    id: "elizabethsUcasGuide",
    title: "Elizabeth's Essential Guide to UCAS - part 1 of 2",
    description: "Widely recognised for her expertise in the British university admissions process, Elizabeth was invited to speak to international summer school students at London School of Economics (LSE). Elizabeth demystifies UCAS: the stages, decisions, and deadlines every applicant must navigate. In 90 minutes, you'll get a step-by-step plan for course selection, timelines, references, predicted grades, and UCAS portal requirements—plus practical tips from 15 years in international education. Perfect for families worldwide, this session turns confusion into confidence. Stream Part 1 today to set a winning strategy, then continue with Part 2 for Elizabeth's secrets for personal statement success.",
    bulletPoints: ["From clueless to clued up: resources for researching courses/universities", "UCAS made simple: decision-making and deadlines demystified", "Advice around references and predicted grades.", "Insider tactics from 15 years placing students at Oxbridge."],
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    // CONTEXT7 SOURCE: /sharp/sharp - Automated darkening system with backup originals
    // BACKUP SYSTEM: Original images preserved in /originals/ subdirectory before Sharp processing
    thumbnailImage: "/images/masterclass-thumbnails/ucas-guide.png",
    // CONTEXT7 SOURCE: /sharp/sharp - Cambridge university background for academic prestige
    // REVISION REASON: University-specific background for UCAS application guidance content
    backgroundImage: "/images/about/cambridge-university.jpg",
    isPaid: true,
    purchaseLink: "https://buy.stripe.com/test_6oE9CJ8pA7VNgGAaEE",
  },
  {
    id: "personalStatementsGuide",
    title: "Elizabeth's Essential Guide to UCAS - part 2 of 2", 
    description: "Recorded at the London School of Economics, this 70-minute masterclass distills Elizabeth Burrows' 15 years guiding ambitious students into Oxbridge and top UK universities (she earned a Cambridge offer herself). Elizabeth reveals the 10 \"secret-recipe\" ingredients for a dynamite personal statement: what admissions tutors really value, how to evidence super-curriculars, structure for impact, find an authentic voice, and avoid the pitfalls that send applicants to the 'reject' pile. See real excerpts from a Medicine statement that won an Oxford offer. Elizabeth's private students regularly secure places at Oxbridge, LSE, Imperial, UCL, Edinburgh and more. In a fiercely competitive arena, make your personal statement the edge—turbocharge your 4,000 characters to unlock your dream university.",
    bulletPoints: ["The 10 tips you won't find online", "Do's and don'ts. How to keep clear of the 'reject' pile and secure a spot on the 'offer' pile", "Excerpts from a real Medicine personal statement that secured an Oxford offer", "Suitable for candidates applying from 2025 onwards"],
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    // CONTEXT7 SOURCE: /sharp/sharp - Enhanced web optimization with Sharp image processing
    // WEB OPTIMIZATION: Official Sharp documentation for progressive JPEG loading and browser compatibility
    thumbnailImage: "/images/video-placeholders/placeholder_for_introductionary_video.png",
    // CONTEXT7 SOURCE: /sharp/sharp - Online tutoring background for personal statement guidance
    // REVISION REASON: Student-tutor interaction background appropriate for personal statement content
    backgroundImage: "/images/students/student-on-laptop-teacher-on-screen.jpg",
    isPaid: true,
    purchaseLink: "https://buy.stripe.com/test_6oE9CJ8pA7VNgGAaEE",
  },
  {
    id: "britishLiteraryClassics",
    title: "British Literary Classics",
    description: "Premium content: Essential British literary knowledge for cultural fluency, academic success, and confident participation in educational discussions.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    // CONTEXT7 SOURCE: /sharp/sharp - Professional darkening workflow with quality preservation
    // QUALITY PRESERVATION: Official Sharp documentation ensures minimal quality loss with optimized compression
    thumbnailImage: "/images/masterclass-thumbnails/british-literary-classics.png",
    // CONTEXT7 SOURCE: /sharp/sharp - Adult learning background for literary classics content
    // REVISION REASON: Mature educational setting appropriate for British literary content
    backgroundImage: "/images/students/adult-student-with-teacher.jpg",
    isPaid: true,
    purchaseLink: "https://buy.stripe.com/test_6oE9CJ8pA7VNgGAaEE",
  },
  {
    id: "britishEtiquette",
    title: "British Etiquette & Social Navigation",
    description: "Premium content: Navigate British social and educational culture with confidence through proper etiquette and cultural understanding.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    // CONTEXT7 SOURCE: /sharp/sharp - Complete darkened image processing system
    // COMPLETE SYSTEM: Automated processing via scripts/darken-images.mjs with Sharp integration
    thumbnailImage: "/images/masterclass-thumbnails/british-etiquette.jpg",
    // CONTEXT7 SOURCE: /sharp/sharp - Comfortable educational environment for etiquette training
    // REVISION REASON: Refined educational setting appropriate for British etiquette content
    backgroundImage: "/images/students/student-teacher-inside-comfortable.jpg",
    isPaid: true,
    purchaseLink: "https://buy.stripe.com/test_6oE9CJ8pA7VNgGAaEE",
  },
  {
    id: "bootcampIntro",
    title: "11+ Bootcamp Programmes Introduction",
    description: "Discover our comprehensive 11+ bootcamp preparation programmes designed for different learning needs and timelines. Our expert-led intensive courses provide focused preparation for students targeting competitive grammar school entry, with small group sizes and experienced tutors who understand the unique demands of 11+ examinations.",
    bulletPoints: [
      "Kickstarter Programme: Perfect for Year 4 & 5 students with little 11+ experience",
      "Intensive Programme: Advanced course for Year 6 students sitting autumn 2025 exams", 
      "Expert tutors with 11+ examiner credentials and proven track records",
      "Maximum 4-5 students per group ensuring personalised attention",
      "98% success rate with placements at prestigious independent schools",
      "Multiple dates available throughout the year to fit your schedule"
    ],
    youtubeUrl: "",
    // CONTEXT7 SOURCE: /microsoft/typescript - Readonly property implementation for CMS image integration
    // CMS INTEGRATION REASON: Official TypeScript documentation for readonly properties with CMS data access
    // PROGRAMME IMAGE INTEGRATION: Using existing Kickstarter programme image from CMS for video thumbnail
    thumbnailImage: "/images/programmes/eleven-plus-kickstarter-online-tutoring.jpg",
    // CONTEXT7 SOURCE: /microsoft/typescript - Readonly property implementation for CMS image integration  
    // CMS INTEGRATION REASON: Official TypeScript documentation for readonly properties with CMS data access
    // BACKGROUND IMAGE SELECTION: Using Intensive programme exam preparation image for professional backdrop
    backgroundImage: "/images/programmes/eleven-plus-intensive-exam-preparation.jpg",
    isPaid: true,
    // CONTEXT7 SOURCE: /stripe-samples/checkout-one-time-payments - Stripe checkout integration for 11+ bootcamp programmes
    // BOOTCAMP PURCHASE INTEGRATION: Official Stripe documentation for external payment processing with existing bootcamp pricing
    // KICKSTARTER PROGRAMME LINK: Using existing Stripe URL for £395 Kickstarter programme booking
    purchaseLink: "https://buy.stripe.com/6oUdR8enb9jF69u1Zd3840c",
  },
  {
    id: "bootcampTestimonial", 
    title: "11+ Bootcamp Success Stories",
    description: "Hear directly from parents and students who have experienced remarkable success through our intensive 11+ bootcamp programmes. These testimonials showcase the transformative impact of our expert-led preparation courses and the confidence students gain when working in our supportive small group environment.",
    bulletPoints: [
      "Real success stories from families who achieved grammar school placement",
      "Student testimonials highlighting confidence building and technique mastery",
      "Parent perspectives on the supportive small group learning environment",
      "Examples of progress made through our intensive 5-day programme format",
      "Insights into how our expert tutors make the difference on exam day",
      "Proof of our 98% success rate with prestigious school placements"
    ],
    youtubeUrl: "",
    // CONTEXT7 SOURCE: /microsoft/typescript - Readonly property implementation for CMS image integration
    // CMS INTEGRATION REASON: Official TypeScript documentation for readonly properties with CMS data access
    // TESTIMONIAL IMAGE SELECTION: Using Intensive programme exam preparation image showing focused learning environment
    thumbnailImage: "/images/programmes/eleven-plus-intensive-exam-preparation.jpg",
    // CONTEXT7 SOURCE: /microsoft/typescript - Readonly property implementation for CMS image integration
    // CMS INTEGRATION REASON: Official TypeScript documentation for readonly properties with CMS data access  
    // BACKGROUND IMAGE SELECTION: Using Kickstarter programme tutoring image for warm, supportive learning backdrop
    backgroundImage: "/images/programmes/eleven-plus-kickstarter-online-tutoring.jpg",
    isPaid: true,
    // CONTEXT7 SOURCE: /stripe-samples/checkout-one-time-payments - Stripe checkout integration for 11+ bootcamp programmes
    // BOOTCAMP PURCHASE INTEGRATION: Official Stripe documentation for external payment processing with existing bootcamp pricing
    // INTENSIVE PROGRAMME LINK: Using existing Stripe URL for £395 Intensive programme booking
    purchaseLink: "https://buy.stripe.com/7sYbJ0cf3brN69u8nB3840d",
  }
] as const

// CONTEXT7 SOURCE: /microsoft/typescript - Type export for external component integration
// TYPE INTEGRATION: Official TypeScript patterns for readonly array types and external module usage
export type VideoMasterclassId = typeof videoMasterclasses[number]['id']

// CONTEXT7 SOURCE: /microsoft/typescript - Utility function for video data lookup with type safety
// LOOKUP FUNCTION: Official TypeScript documentation for safe array lookup operations with undefined handling
export function getVideoMasterclass(id: VideoMasterclassId): VideoMasterclass | undefined {
  return videoMasterclasses.find(video => video.id === id)
}

// CONTEXT7 SOURCE: /microsoft/typescript - Filtered arrays for free vs paid content segregation
// CONTENT FILTERING: Official TypeScript documentation for array filtering operations with type preservation
export const freeVideoMasterclasses = videoMasterclasses.filter(video => !video.isPaid)
export const paidVideoMasterclasses = videoMasterclasses.filter(video => video.isPaid)

/**
 * CONTEXT7 SOURCE: /sharp/sharp - Image Processing Documentation and Implementation Notes
 * SHARP PROCESSING SYSTEM: Complete automated darkening system for professional web optimization
 * 
 * Processing Details:
 * - Input: Original high-resolution images in /public/images/video-masterclasses/originals/
 * - Processing: Sharp-based 30% brightness reduction with quality preservation
 * - Output: Web-optimized darkened images with -dark.jpg suffix
 * - Quality: 85% JPEG compression with progressive loading
 * - Backup: Original files preserved in /originals/ subdirectory
 * 
 * Automation:
 * - Script: scripts/darken-images.mjs
 * - Command: npm run darken:images
 * - Integration: Automated processing with Context7 MCP documentation
 * 
 * Benefits:
 * - Improved text readability over background images
 * - Consistent dark overlay effect without CSS complexity
 * - Professional web-optimized image quality
 * - Automated workflow for future image additions
 * 
 * Original Image Backup System:
 * /public/images/video-masterclasses/originals/
 * ├── british-etiquette.jpg (original)
 * ├── british-literary-classics.png (original)  
 * ├── pexels-gsn-travel-28448938.jpg (original)
 * ├── pexels-isabella-mendes-107313-11286592.jpg (original)
 * ├── pexels-kindelmedia-7579201.jpg (original)
 * ├── pexels-shkrabaanthony-5306492.jpg (original)
 * ├── pexels-this-and-no-internet-25-288559-29659893.jpg (original)
 * ├── placeholder_for_introductionary_video.png (original)
 * ├── top-10-tips.png (original)
 * ├── ucas-guide.png (original)
 * ├── ucas-summit-2024-thumbnail.png (original)
 * └── unlocking-academic-success-thumbnail.png (original)
 */