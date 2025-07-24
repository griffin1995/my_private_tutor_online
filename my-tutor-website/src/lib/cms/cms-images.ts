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

// Institution logos for credibility
export const INSTITUTION_LOGOS = {
  oxford: {
    src: '/images/logos/university-of-oxford-logo.avif',
    alt: 'University of Oxford logo',
    width: 120,
    height: 80,
    title: 'University of Oxford',
    loading: 'lazy' as const
  },
  cambridge: {
    src: '/images/logos/university-of-cambridge-logo.avif',
    alt: 'University of Cambridge logo', 
    width: 120,
    height: 80,
    title: 'University of Cambridge',
    loading: 'lazy' as const
  },
  eton: {
    src: '/images/logos/eton-college-logo.avif',
    alt: 'Eton College logo',
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
    src: '/images/logos/westminster-school-logo.avif',
    alt: 'Westminster School logo',
    width: 100,
    height: 80,
    title: 'Westminster School',
    loading: 'lazy' as const
  },
  stPauls: {
    src: '/images/logos/st-pauls-school-logo.avif',
    alt: 'St Paul\'s School logo',
    width: 100,
    height: 80,
    title: 'St Paul\'s School',
    loading: 'lazy' as const
  },
  harvard: {
    src: '/images/logos/harvard-college-logo.avif',
    alt: 'Harvard College logo',
    width: 100,
    height: 80,
    title: 'Harvard College',
    loading: 'lazy' as const
  },
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

// Team member images
export const TEAM_IMAGES = {
  founder: {
    src: '/images/team/founder_headshot.avif',
    alt: 'Founder headshot - My Private Tutor Online',
    width: 300,
    height: 300,
    title: 'Company Founder',
    loading: 'lazy' as const
  },
  katherine: {
    src: '/images/team/katherine-mother-sebastian-headshot.avif',
    alt: 'Katherine Mother Sebastian - Senior Tutor',
    width: 300,
    height: 300,
    title: 'Katherine Mother Sebastian - Senior Tutor',
    loading: 'lazy' as const
  }
} as const

// Testimonial images
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

// Student images for results section
export const STUDENT_IMAGES = {
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
    console.error('Image missing alt text:', image.src)
    return false
  }
  
  // Check for meaningful alt text (not just filename)
  if (image.alt.includes('.jpg') || image.alt.includes('.png') || image.alt.includes('.avif')) {
    console.warn('Alt text appears to be filename:', image.alt)
    return false
  }
  
  // Check for dimensions for layout stability
  if (!image.width || !image.height) {
    console.warn('Image missing dimensions for CLS prevention:', image.src)
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

// Export default images object for direct access
export default {
  logos: LOGOS,
  institutions: INSTITUTION_LOGOS,
  hero: HERO_IMAGES,
  team: TEAM_IMAGES,
  testimonials: TESTIMONIAL_IMAGES,
  videoPlaceholders: VIDEO_PLACEHOLDERS,
  backgroundVideos: BACKGROUND_VIDEOS,
  students: STUDENT_IMAGES,
  fallbacks: FALLBACK_IMAGES,
  getMainLogo,
  getFooterLogo,
  getInstitutionLogos,
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