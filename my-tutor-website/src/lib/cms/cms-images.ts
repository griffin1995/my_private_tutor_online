// CMS DATA SOURCE: Centralised image management for My Private Tutor Online
// MANDATORY: All images must use this CMS system - CLAUDE.md rule 23

// Image asset paths and metadata
export interface ImageAsset {
  src: string
  alt: string
  width?: number
  height?: number
  title?: string
  loading?: 'lazy' | 'eager'
  priority?: boolean
}

// Logo assets
export const LOGOS = {
  main: {
    src: '/uploads/logo.png',
    alt: 'My Private Tutor Online - Premium Educational Services',
    width: 180,
    height: 60,
    title: 'My Private Tutor Online',
    loading: 'eager' as const,
    priority: true
  },
  footer: {
    src: '/uploads/logo.png',
    alt: 'My Private Tutor Online - Premium Educational Services',
    width: 150,
    height: 50,
    title: 'My Private Tutor Online',
    loading: 'lazy' as const
  }
} as const

// Institution logos for credibility - Updated with new 2025 assets
export const INSTITUTION_LOGOS = {
  // Universities
  oxford: {
    src: '/images/logos/oxford-university-logo.jpeg',
    alt: 'University of Oxford logo',
    width: 120,
    height: 80,
    title: 'University of Oxford',
    loading: 'lazy' as const
  },
  cambridge: {
    src: '/images/logos/cambridge-university-logo.png',
    alt: 'University of Cambridge logo', 
    width: 120,
    height: 80,
    title: 'University of Cambridge',
    loading: 'lazy' as const
  },
  harvard: {
    src: '/images/logos/harvard-university-logo.png',
    alt: 'Harvard University logo',
    width: 120,
    height: 80,
    title: 'Harvard University',
    loading: 'lazy' as const
  },
  durham: {
    src: '/images/logos/durham-university-logo.png',
    alt: 'Durham University logo',
    width: 120,
    height: 80,
    title: 'Durham University',
    loading: 'lazy' as const
  },
  edinburgh: {
    src: '/images/logos/edinburgh-university-logo.png',
    alt: 'University of Edinburgh logo',
    width: 120,
    height: 80,
    title: 'University of Edinburgh',
    loading: 'lazy' as const
  },
  stAndrews: {
    src: '/images/logos/st-andrews-university-logo.png',
    alt: 'University of St Andrews logo',
    width: 120,
    height: 80,
    title: 'University of St Andrews',
    loading: 'lazy' as const
  },
  warwick: {
    src: '/images/logos/warwick-university-logo.gif',
    alt: 'University of Warwick logo',
    width: 120,
    height: 80,
    title: 'University of Warwick',
    loading: 'lazy' as const
  },
  lse: {
    src: '/images/logos/lse-logo.png',
    alt: 'London School of Economics logo',
    width: 120,
    height: 80,
    title: 'London School of Economics',
    loading: 'lazy' as const
  },
  kingsCollege: {
    src: '/images/logos/kings-college-logo.jpeg',
    alt: 'King\'s College London logo',
    width: 120,
    height: 80,
    title: 'King\'s College London',
    loading: 'lazy' as const
  },
  // Independent Schools
  eton: {
    src: '/images/logos/eton-college-logo-new.webp',
    alt: 'Eton College logo',
    width: 100,
    height: 80,
    title: 'Eton College',
    loading: 'lazy' as const
  },
  etonAlt: {
    src: '/images/logos/eton-college-logo-alt.png',
    alt: 'Eton College alternative logo',
    width: 100,
    height: 80,
    title: 'Eton College',
    loading: 'lazy' as const
  },
  harrow: {
    src: '/images/logos/harrow-school-logo.avif',
    alt: 'Harrow School logo',
    width: 100,
    height: 80,
    title: 'Harrow School',
    loading: 'lazy' as const
  },
  westminster: {
    src: '/images/logos/westminster-school-logo-new.png',
    alt: 'Westminster School logo',
    width: 100,
    height: 80,
    title: 'Westminster School',
    loading: 'lazy' as const
  },
  stPauls: {
    src: '/images/logos/st-pauls-school-logo-new.jpg',
    alt: 'St Paul\'s School logo',
    width: 100,
    height: 80,
    title: 'St Paul\'s School',
    loading: 'lazy' as const
  },
  brightonCollege: {
    src: '/images/logos/brighton-college-logo.png',
    alt: 'Brighton College logo',
    width: 100,
    height: 80,
    title: 'Brighton College',
    loading: 'lazy' as const
  },
  highgate: {
    src: '/images/logos/highgate-school-logo.png',
    alt: 'Highgate School logo',
    width: 100,
    height: 80,
    title: 'Highgate School',
    loading: 'lazy' as const
  },
  // Legacy entries maintained for compatibility
  leRosey: {
    src: '/images/logos/lerosey-school-logo.avif',
    alt: 'Le Rosey School logo',
    width: 100,
    height: 80,
    title: 'Le Rosey School',
    loading: 'lazy' as const
  }
} as const

// Hero section images
export const HERO_IMAGES = {
  childWithLaptop: {
    src: '/images/hero/child_book_and_laptop.avif',
    alt: 'Child studying with book and laptop - premium online tutoring',
    width: 600,
    height: 400,
    title: 'Premium Online Tutoring',
    loading: 'eager' as const,
    priority: true
  },
  introVideo: {
    src: '/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.mp4',
    alt: 'Elizabeth Burrows introduces My Private Tutor Online',
    width: 800,
    height: 450,
    title: 'Introduction to My Private Tutor Online',
    loading: 'eager' as const,
    priority: true
  }
} as const

// Team member images - Updated with new 2025 photos
export const TEAM_IMAGES = {
  founder: {
    src: '/images/team/elizabeth-burrows-founder-main.jpg',
    alt: 'Elizabeth Burrows - Founder of My Private Tutor Online',
    width: 400,
    height: 400,
    title: 'Elizabeth Burrows - Founder',
    loading: 'lazy' as const
  },
  founderAlt: {
    src: '/images/team/elizabeth-burrows-founder-alt.jpg',
    alt: 'Elizabeth Burrows - My Private Tutor Online Founder Alternative Photo',
    width: 400,
    height: 400,
    title: 'Elizabeth Burrows - Founder Alternative',
    loading: 'lazy' as const
  },
  founderSpare: {
    src: '/images/team/elizabeth-burrows-founder-spare.jpg',
    alt: 'Elizabeth Burrows - MPTO 2025 Additional Photo',
    width: 400,
    height: 400,
    title: 'Elizabeth Burrows - Additional Photo',
    loading: 'lazy' as const
  },
  founderSignature: {
    src: '/images/team/elizabeth-burrows-signature.png',
    alt: 'Elizabeth Burrows Digital Signature - MPTO',
    width: 200,
    height: 80,
    title: 'Elizabeth Burrows Signature',
    loading: 'lazy' as const
  },
  // Legacy team member maintained for compatibility
  katherine: {
    src: '/images/team/katherine-mother-sebastian-headshot.avif',
    alt: 'Katherine Mother Sebastian - Senior Tutor',
    width: 300,
    height: 300,
    title: 'Katherine Mother Sebastian - Senior Tutor',
    loading: 'lazy' as const
  }
} as const

// Testimonial images - Enhanced with media recognition
export const TESTIMONIAL_IMAGES = {
  schoolGuide: {
    src: '/images/testimonials/schoolguide-testimonial.avif',
    alt: 'School Guide testimonial for My Private Tutor Online',
    width: 400,
    height: 300,
    title: 'School Guide Review',
    loading: 'lazy' as const
  }
} as const

// Media recognition logos and images
export const MEDIA_IMAGES = {
  tatler: {
    src: '/images/media/tatler-logo.png',
    alt: 'Tatler Magazine - Featured in Address Book 2025',
    width: 150,
    height: 60,
    title: 'Featured in Tatler Address Book 2025',
    loading: 'lazy' as const
  },
  tatlerAlt: {
    src: '/images/media/tatler-logo-alt.png',
    alt: 'Tatler Magazine Alternative Logo',
    width: 150,
    height: 60,
    title: 'Tatler Magazine',
    loading: 'lazy' as const
  },
  schoolsGuideUK: {
    src: '/images/media/schools-guide-uk-logo.png',
    alt: 'Schools Guide UK - Trusted Educational Resource',
    width: 200,
    height: 80,
    title: 'Schools Guide UK Recognition',
    loading: 'lazy' as const
  }
} as const

// Tutor profile images
export const TUTOR_IMAGES = {
  'tutor-facing-monitor': {
    src: '/images/tutors/tutor-facing-monitor.jpg',
    alt: 'Professional tutor working at computer delivering online lessons',
    width: 400,
    height: 300,
    title: 'Online Tutoring Professional',
    loading: 'lazy' as const
  },
  'tutor-inside-looking-at-camera': {
    src: '/images/tutors/tutor-inside-looking-at-camera.jpg',
    alt: 'Experienced tutor portrait - Oxford/Cambridge graduate educator',
    width: 400,
    height: 400,
    title: 'Expert Educator Profile',
    loading: 'lazy' as const
  }
} as const

// Video testimonials and content
export const VIDEO_CONTENT = {
  parentsTestimonials: {
    src: '/videos/testimonials/parents-testimonials-mpto-2025.mp4',
    poster: '/images/video-placeholders/parents-testimonials-poster.jpg',
    alt: 'Parent testimonials for My Private Tutor Online - July 2025',
    title: 'Parent Success Stories 2025',
    description: 'Real parents sharing their experiences with MPTO tutoring services'
  },
  studentsTestimonials: {
    src: '/videos/testimonials/students-testimonials-mpto-2025.mp4',
    poster: '/images/video-placeholders/students-testimonials-poster.jpg',
    alt: 'Student testimonials for My Private Tutor Online - 2025',
    title: 'Student Success Stories 2025',
    description: 'Students sharing their academic achievements with MPTO tutors'
  }
} as const

// Marketing materials and documents
export const MARKETING_ASSETS = {
  '11plusBootcampFlyer': {
    src: '/documents/marketing/11-plus-bootcamp-flyer-2025.png',
    alt: '11+ Bootcamp Flyer 2025 - Facebook Marketing Material',
    width: 600,
    height: 400,
    title: '11+ Bootcamp Flyer 2025',
    loading: 'lazy' as const
  },
  'elizabethTopTips': {
    src: '/documents/marketing/elizabeth-10-top-tips-personal-statements-2025.pdf',
    alt: 'Elizabeth\'s 10 Top Tips for Outstanding Personal Statements - MPTO 2025',
    title: 'Personal Statement Guide 2025',
    description: 'Expert guidance for university applications'
  },
  'enquiryFormScreenshot': {
    src: '/images/graphics/enquiry-form-screenshot-footer.png',
    alt: 'Enquiry Form Screenshot - MPTO July 2025 for Website Footer',
    width: 400,
    height: 300,
    title: 'Enquiry Form Preview',
    loading: 'lazy' as const
  }
} as const

// Video placeholder images
export const VIDEO_PLACEHOLDERS = {
  intro: {
    src: '/images/video-placeholders/placeholder_for_introductionary_video.png',
    alt: 'Introductory video placeholder',
    width: 800,
    height: 450,
    title: 'Introductory Video',
    loading: 'lazy' as const
  },
  promoTutor: {
    src: '/images/video-placeholders/promo-video-tutor-student.avif',
    alt: 'Promotional video showing tutor and student interaction',
    width: 600,
    height: 400,
    title: 'Tutor-Student Interaction',
    loading: 'lazy' as const
  }
} as const

// Background videos for video-text effects
// CMS DATA SOURCE: Using existing video content for video-text component backgrounds
export const BACKGROUND_VIDEOS = {
  brandStatement: {
    src: '/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.mp4',
    fallback: '/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.webm',
    poster: '/images/video-placeholders/placeholder_for_introductionary_video.png',
    alt: 'Elizabeth Burrows introduces My Private Tutor Online - brand statement background',
    title: 'Elizabeth Burrows Introduction Video',
    description: 'Founder introduction video used as background for brand statement text effects'
  },
  tutoring: {
    src: '/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.mp4',
    fallback: '/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.webm',
    poster: '/images/video-placeholders/placeholder_for_introductionary_video.png',
    alt: 'Professional tutoring introduction video background',
    title: 'Tutoring Introduction Background',
    description: 'Professional introduction video for tutoring-focused video-text effects'
  },
  oxbridge: {
    src: '/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.mp4',
    fallback: '/Elizabeth-Burrows-introduces-My-Private-Tutor-Online.webm',
    poster: '/images/video-placeholders/placeholder_for_introductionary_video.png', 
    alt: 'Oxford Cambridge preparation introduction video background',
    title: 'Oxbridge Preparation Background',
    description: 'Educational excellence video for university preparation content'
  }
} as const

// Fallback images for missing content
export const FALLBACK_IMAGES = {
  placeholder: {
    src: '/images/placeholder.svg',
    alt: 'Placeholder image',
    width: 400,
    height: 300,
    title: 'Placeholder',
    loading: 'lazy' as const
  },
  avatarPlaceholder: {
    src: '/images/testimonials/placeholder-user.jpg',
    alt: 'User avatar placeholder',
    width: 100,
    height: 100,
    title: 'User Avatar',
    loading: 'lazy' as const
  }
} as const

// Student images for results section - Updated with new 2025 collection
export const STUDENT_IMAGES = {
  // Legacy student images (maintained for compatibility)
  'student-child': {
    src: '/images/students/student-child.jpg',
    alt: 'Young student engaged in personalised tutoring session',
    width: 300,
    height: 400,
    title: 'Personalised Tutoring',
    loading: 'lazy' as const
  },
  'student-teenager': {
    src: '/images/students/student-teenager.jpg',
    alt: 'GCSE student celebrating academic success with improved grades',
    width: 300,
    height: 400,
    title: 'GCSE Success Story',
    loading: 'lazy' as const
  },
  'student-university': {
    src: '/images/students/student-university.jpg',
    alt: 'A-Level student achieving excellent results for university application',
    width: 300,
    height: 400,
    title: 'A-Level Achievement',
    loading: 'lazy' as const
  },
  'student-oxbridge': {
    src: '/images/students/student-oxbridge.jpg',
    alt: 'Oxbridge candidate celebrating university acceptance offer',
    width: 300,
    height: 400,
    title: 'Oxbridge Success',
    loading: 'lazy' as const
  },
  // New 2025 student interaction images
  'adult-student-with-teacher': {
    src: '/images/students/adult-student-with-teacher.jpg',
    alt: 'Adult student working closely with experienced tutor in comfortable learning environment',
    width: 400,
    height: 300,
    title: 'Adult Learning Success',
    loading: 'lazy' as const
  },
  'student-inside-holding-pencil': {
    src: '/images/students/student-inside-holding-pencil.jpg',
    alt: 'Focused student taking notes during personalised tutoring session',
    width: 400,
    height: 300,
    title: 'Engaged Learning',
    loading: 'lazy' as const
  },
  'student-learning-piano': {
    src: '/images/students/student-learning-piano.jpg',
    alt: 'Student receiving expert piano instruction from qualified music tutor',
    width: 400,
    height: 300,
    title: 'Music Tuition Excellence',
    loading: 'lazy' as const
  },
  'student-on-laptop-teacher-on-screen': {
    src: '/images/students/student-on-laptop-teacher-on-screen.jpg',
    alt: 'Student engaged in high-quality online tutoring session with expert tutor',
    width: 400,
    height: 300,
    title: 'Online Tutoring Excellence',
    loading: 'lazy' as const
  },
  'student-teacher-inside-comfortable': {
    src: '/images/students/student-teacher-inside-comfortable.jpg',
    alt: 'Student and tutor working together in comfortable indoor learning environment',
    width: 400,
    height: 300,
    title: 'Comfortable Learning Environment',
    loading: 'lazy' as const
  },
  'student-teacher-outside': {
    src: '/images/students/student-teacher-outside.jpg',
    alt: 'Outdoor tutoring session showing flexible learning approaches',
    width: 400,
    height: 300,
    title: 'Flexible Learning Locations',
    loading: 'lazy' as const
  }
} as const

// CMS Functions for image retrieval

/**
 * Get main site logo
 * CMS DATA SOURCE: Using LOGOS.main for header logo
 */
export const getMainLogo = (): ImageAsset => {
  return LOGOS.main
}

/**
 * Get footer logo
 * CMS DATA SOURCE: Using LOGOS.footer for footer logo
 */
export const getFooterLogo = (): ImageAsset => {
  return LOGOS.footer
}

/**
 * Get all institution logos for trust indicators
 * CMS DATA SOURCE: Using INSTITUTION_LOGOS for credibility logos
 */
export const getInstitutionLogos = () => {
  return INSTITUTION_LOGOS
}

/**
 * Get media recognition images
 * CMS DATA SOURCE: Using MEDIA_IMAGES for press and media logos
 */
export const getMediaImages = () => {
  return MEDIA_IMAGES
}

/**
 * Get tutor profile images
 * CMS DATA SOURCE: Using TUTOR_IMAGES for tutor profile photos
 */
export const getTutorImages = () => {
  return TUTOR_IMAGES
}

/**
 * Get video testimonial content
 * CMS DATA SOURCE: Using VIDEO_CONTENT for testimonial videos
 */
export const getVideoContent = () => {
  return VIDEO_CONTENT
}

/**
 * Get marketing assets and materials
 * CMS DATA SOURCE: Using MARKETING_ASSETS for promotional materials
 */
export const getMarketingAssets = () => {
  return MARKETING_ASSETS
}

/**
 * Get hero section image
 * CMS DATA SOURCE: Using HERO_IMAGES.childWithLaptop for hero image
 */
export const getHeroImage = (): ImageAsset => {
  return HERO_IMAGES.childWithLaptop
}

/**
 * Get intro video asset
 * CMS DATA SOURCE: Using HERO_IMAGES.introVideo for introduction video
 */
export const getIntroVideo = (): ImageAsset => {
  return HERO_IMAGES.introVideo
}

/**
 * Get team member images
 * CMS DATA SOURCE: Using TEAM_IMAGES for team member photos
 */
export const getTeamImages = () => {
  return TEAM_IMAGES
}

/**
 * Get testimonial images
 * CMS DATA SOURCE: Using TESTIMONIAL_IMAGES for testimonial photos
 */
export const getTestimonialImages = () => {
  return TESTIMONIAL_IMAGES
}

/**
 * Get video placeholder images
 * CMS DATA SOURCE: Using VIDEO_PLACEHOLDERS for video thumbnails
 */
export const getVideoPlaceholders = () => {
  return VIDEO_PLACEHOLDERS
}

/**
 * Get background video for video-text effects
 * CMS DATA SOURCE: Using BACKGROUND_VIDEOS for video-text component backgrounds
 */
export const getBackgroundVideo = (videoKey: keyof typeof BACKGROUND_VIDEOS) => {
  return BACKGROUND_VIDEOS[videoKey]
}

/**
 * Get all background videos
 * CMS DATA SOURCE: Using BACKGROUND_VIDEOS for complete video inventory
 */
export const getBackgroundVideos = () => {
  return BACKGROUND_VIDEOS
}

/**
 * Get fallback image for missing assets
 * CMS DATA SOURCE: Using FALLBACK_IMAGES.placeholder for missing images
 */
export const getFallbackImage = (): ImageAsset => {
  return FALLBACK_IMAGES.placeholder
}

/**
 * Get avatar placeholder for testimonials without images
 * CMS DATA SOURCE: Using FALLBACK_IMAGES.avatarPlaceholder for missing avatars
 */
export const getAvatarPlaceholder = (): ImageAsset => {
  return FALLBACK_IMAGES.avatarPlaceholder
}

/**
 * Get student images for results section
 * CMS DATA SOURCE: Using STUDENT_IMAGES for results section photos
 */
export const getStudentImages = () => {
  return STUDENT_IMAGES
}

// Image optimization utilities

/**
 * Generate responsive image sizes for different breakpoints
 */
export const generateResponsiveSizes = (baseWidth: number) => {
  return {
    mobile: Math.round(baseWidth * 0.5),
    tablet: Math.round(baseWidth * 0.75),
    desktop: baseWidth,
    xl: Math.round(baseWidth * 1.25)
  }
}

/**
 * Generate srcset for responsive images
 */
export const generateSrcSet = (src: string, sizes: Record<string, number>) => {
  return Object.entries(sizes)
    .map(([_, width]) => `${src}?w=${width} ${width}w`)
    .join(', ')
}

/**
 * Get optimized image props for Next.js Image component
 */
export const getOptimizedImageProps = (
  image: ImageAsset,
  customSizes?: string
) => {
  return {
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    title: image.title,
    loading: image.loading,
    priority: image.priority,
    sizes: customSizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  }
}

/**
 * Validate image accessibility requirements
 */
export const validateImageAccessibility = (image: ImageAsset): boolean => {
  // Check for required alt text
  if (!image.alt || image.alt.trim().length === 0) {
    // Image missing alt text
    return false
  }
  
  // Check for meaningful alt text (not just filename)
  if (image.alt.includes('.jpg') || image.alt.includes('.png') || image.alt.includes('.avif')) {
    // Alt text appears to be filename
    return false
  }
  
  // Check for dimensions for layout stability
  if (!image.width || !image.height) {
    // Image missing dimensions for CLS prevention
  }
  
  return true
}

/**
 * Get all image assets for preloading critical images
 */
export const getCriticalImages = (): ImageAsset[] => {
  const allImages = [
    ...Object.values(LOGOS),
    ...Object.values(HERO_IMAGES)
  ]
  
  return allImages.filter(image => image.priority === true)
}

// Export default images object for direct access - Updated with 2025 assets
export default {
  logos: LOGOS,
  institutions: INSTITUTION_LOGOS,
  hero: HERO_IMAGES,
  team: TEAM_IMAGES,
  testimonials: TESTIMONIAL_IMAGES,
  media: MEDIA_IMAGES,
  tutors: TUTOR_IMAGES,
  videoContent: VIDEO_CONTENT,
  marketingAssets: MARKETING_ASSETS,
  videoPlaceholders: VIDEO_PLACEHOLDERS,
  backgroundVideos: BACKGROUND_VIDEOS,
  students: STUDENT_IMAGES,
  fallbacks: FALLBACK_IMAGES,
  getMainLogo,
  getFooterLogo,
  getInstitutionLogos,
  getMediaImages,
  getTutorImages,
  getVideoContent,
  getMarketingAssets,
  getHeroImage,
  getIntroVideo,
  getTeamImages,
  getTestimonialImages,
  getVideoPlaceholders,
  getBackgroundVideo,
  getBackgroundVideos,
  getStudentImages,
  getFallbackImage,
  getAvatarPlaceholder,
  generateResponsiveSizes,
  generateSrcSet,
  getOptimizedImageProps,
  validateImageAccessibility,
  getCriticalImages
}