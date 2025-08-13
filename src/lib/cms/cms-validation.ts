/**
 * CMS CONTENT VALIDATION SYSTEM
 * CONTEXT7 SOURCE: /colinhacks/zod - Schema validation patterns for data integrity
 * CONTEXT7 SOURCE: /colinhacks/zod - Type inference patterns for TypeScript integration
 * CONTEXT7 SOURCE: /colinhacks/zod - Advanced validation patterns for complex data structures
 * 
 * PHASE 1 TASK 8: Comprehensive content validation for testimonials system
 * Ensures all testimonial content meets quality standards and prevents broken content
 * from reaching production, maintaining royal client service standards.
 * 
 * BUSINESS IMPACT: Prevents content errors that could damage £400,000+ revenue opportunity
 * QUALITY ASSURANCE: Enterprise-grade validation for elite service delivery
 */

import { z } from 'zod'

// CONTEXT7 SOURCE: /colinhacks/zod - Base schema definitions for reusable validation patterns
const UrlSchema = z.string().url('Invalid URL format')
const EmailSchema = z.string().email('Invalid email format')
const PhoneSchema = z.string().min(10, 'Phone number too short').max(20, 'Phone number too long')
const NonEmptyStringSchema = z.string().min(1, 'Field cannot be empty')
const RatingSchema = z.number().min(1).max(5)
const DateSchema = z.string().datetime('Invalid date format').optional()

// CONTEXT7 SOURCE: /colinhacks/zod - Enum schemas for controlled vocabularies
const IconTypeSchema = z.enum(['crown', 'award', 'shield', 'trophy', 'medal', 'star'])
const BackgroundVariantSchema = z.enum(['gradient', 'image', 'video', 'solid', 'slate', 'white', 'transparent'])
const SizeVariantSchema = z.enum(['compact', 'standard', 'full'])
const ButtonVariantSchema = z.enum(['premium', 'default', 'secondary'])
const CategorySchema = z.enum(['parent', 'student', 'educator'])
const SchoolTierSchema = z.enum(['elite', 'premium', 'standard'])
const SchoolCategorySchema = z.enum(['independent', 'grammar', 'university'])

// CONTEXT7 SOURCE: /colinhacks/zod - Complex object validation schemas
const TestimonialSchema = z.object({
  quote: NonEmptyStringSchema,
  author: NonEmptyStringSchema,
  role: NonEmptyStringSchema,
  avatar: NonEmptyStringSchema,
  rating: RatingSchema,
  verified: z.boolean().optional(),
  date: DateSchema,
  location: z.string().optional(),
  subject: z.string().optional(),
  result: z.string().optional()
})

const TrustIndicatorSchema = z.object({
  id: NonEmptyStringSchema,
  iconType: IconTypeSchema,
  text: NonEmptyStringSchema,
  description: z.string().optional(),
  featured: z.boolean().optional(),
  url: z.string().optional()
})

const CustomCredentialSchema = z.object({
  icon: IconTypeSchema,
  text: NonEmptyStringSchema
})

const VideoTestimonialSchema = z.object({
  id: NonEmptyStringSchema,
  title: NonEmptyStringSchema,
  description: NonEmptyStringSchema,
  thumbnailUrl: UrlSchema,
  videoUrl: UrlSchema,
  duration: NonEmptyStringSchema,
  category: CategorySchema,
  featured: z.boolean(),
  testimonial: TestimonialSchema.optional()
})

const SchoolSchema = z.object({
  id: NonEmptyStringSchema,
  name: NonEmptyStringSchema,
  logoUrl: UrlSchema,
  description: NonEmptyStringSchema,
  tier: SchoolTierSchema,
  category: SchoolCategorySchema,
  founded: z.number().min(1000).max(new Date().getFullYear()).optional(),
  notable: z.string().optional(),
  websiteUrl: UrlSchema.optional(),
  location: z.string().optional()
})

const ButtonSchema = z.object({
  text: NonEmptyStringSchema,
  href: NonEmptyStringSchema,
  variant: ButtonVariantSchema.optional()
})

// CONTEXT7 SOURCE: /colinhacks/zod - Nested object validation for complex page structures
const HeroContentSchema = z.object({
  title: NonEmptyStringSchema,
  subtitle: NonEmptyStringSchema,
  description: NonEmptyStringSchema,
  backgroundVariant: BackgroundVariantSchema.optional(),
  size: SizeVariantSchema.optional(),
  showCredentials: z.boolean().optional(),
  customCredentials: z.array(CustomCredentialSchema).optional()
})

const IntroContentSchema = z.object({
  introContent: z.object({
    intro: NonEmptyStringSchema,
    callToAction: NonEmptyStringSchema
  }),
  trustIndicators: z.array(TrustIndicatorSchema),
  backgroundVariant: BackgroundVariantSchema,
  showWaveSeparator: z.boolean()
})

const CTAContentSchema = z.object({
  title: NonEmptyStringSchema,
  description: NonEmptyStringSchema,
  primaryButton: ButtonSchema.extend({
    variant: ButtonVariantSchema
  }),
  secondaryButton: ButtonSchema.optional(),
  testimonial: TestimonialSchema.optional(),
  backgroundVariant: BackgroundVariantSchema
})

// CONTEXT7 SOURCE: /colinhacks/zod - Main content validation schema combining all sections
const TestimonialsPageContentSchema = z.object({
  hero: HeroContentSchema,
  intro: IntroContentSchema,
  testimonials: z.array(TestimonialSchema).min(1, 'At least one testimonial required'),
  videos: z.array(VideoTestimonialSchema),
  schools: z.array(SchoolSchema),
  cta: CTAContentSchema
})

// Content section schemas for individual validation
const ContentSectionSchemas = {
  hero: HeroContentSchema,
  intro: IntroContentSchema,
  testimonials: z.array(TestimonialSchema),
  videos: z.array(VideoTestimonialSchema),
  schools: z.array(SchoolSchema),
  cta: CTAContentSchema,
  testimonial: TestimonialSchema,
  trustIndicator: TrustIndicatorSchema,
  school: SchoolSchema,
  video: VideoTestimonialSchema
}

// CONTEXT7 SOURCE: /colinhacks/zod - Type inference for TypeScript integration
export type ValidatedTestimonialsContent = z.infer<typeof TestimonialsPageContentSchema>
export type ValidatedTestimonial = z.infer<typeof TestimonialSchema>
export type ValidatedSchool = z.infer<typeof SchoolSchema>
export type ValidatedVideo = z.infer<typeof VideoTestimonialSchema>
export type ValidatedTrustIndicator = z.infer<typeof TrustIndicatorSchema>

// Validation result interface
export interface TestimonialsValidationResult {
  readonly isValid: boolean
  readonly errors: readonly string[]
  readonly warnings: readonly string[]
  readonly validatedData?: any
  readonly performanceMetrics: {
    readonly validationTime: number
    readonly schemaComplexity: number
    readonly errorCount: number
  }
}

// Content quality analysis
export interface ContentQualityAnalysis {
  readonly overallScore: number // 0-100
  readonly seoScore: number // 0-100
  readonly accessibilityScore: number // 0-100
  readonly performanceScore: number // 0-100
  readonly recommendations: readonly string[]
  readonly issues: readonly {
    readonly type: 'error' | 'warning' | 'info'
    readonly message: string
    readonly field?: string
  }[]
}

/**
 * CONTEXT7 SOURCE: /colinhacks/zod - Main validation function implementation
 * Validates testimonials content against comprehensive schemas
 */
export function validateTestimonialContent(
  content: unknown, 
  section?: keyof typeof ContentSectionSchemas
): TestimonialsValidationResult {
  const startTime = performance.now()
  const errors: string[] = []
  const warnings: string[] = []
  let validatedData: any = null
  let isValid = false

  try {
    // Select appropriate schema
    const schema = section 
      ? ContentSectionSchemas[section] 
      : TestimonialsPageContentSchema

    // CONTEXT7 SOURCE: /colinhacks/zod - Schema parsing with error handling
    const result = schema.safeParse(content)
    
    if (result.success) {
      isValid = true
      validatedData = result.data
    } else {
      // Extract detailed error information
      result.error.issues.forEach(issue => {
        const path = issue.path.join('.')
        const errorMessage = path 
          ? `${path}: ${issue.message}` 
          : issue.message
        errors.push(errorMessage)
      })
    }

    // Additional business logic validation
    if (isValid && validatedData) {
      const businessValidation = validateBusinessRules(validatedData)
      warnings.push(...businessValidation.warnings)
      if (businessValidation.errors.length > 0) {
        errors.push(...businessValidation.errors)
        isValid = false
      }
    }

  } catch (error) {
    errors.push(`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  const validationTime = performance.now() - startTime

  return {
    isValid,
    errors,
    warnings,
    validatedData: isValid ? validatedData : undefined,
    performanceMetrics: {
      validationTime,
      schemaComplexity: calculateSchemaComplexity(section),
      errorCount: errors.length
    }
  }
}

/**
 * Validate specific content sections
 */
export function validateContentSection<T extends keyof typeof ContentSectionSchemas>(
  content: unknown,
  section: T
): TestimonialsValidationResult {
  return validateTestimonialContent(content, section)
}

/**
 * CONTEXT7 SOURCE: /colinhacks/zod - Business rules validation beyond schema validation
 * Additional validation for business-specific requirements
 */
function validateBusinessRules(content: any): { errors: string[], warnings: string[] } {
  const errors: string[] = []
  const warnings: string[] = []

  // Royal client quality standards
  if (content.testimonials) {
    content.testimonials.forEach((testimonial: any, index: number) => {
      // Minimum quote length for meaningful testimonials
      if (testimonial.quote && testimonial.quote.length < 50) {
        warnings.push(`Testimonial ${index + 1}: Quote may be too short for meaningful impact`)
      }
      
      // Maximum quote length for readability
      if (testimonial.quote && testimonial.quote.length > 500) {
        warnings.push(`Testimonial ${index + 1}: Quote may be too long for optimal readability`)
      }
      
      // Rating validation for verified testimonials
      if (testimonial.verified && testimonial.rating < 4) {
        warnings.push(`Testimonial ${index + 1}: Low rating for verified testimonial may impact credibility`)
      }
      
      // Author credibility check
      if (!testimonial.role || testimonial.role.length < 3) {
        warnings.push(`Testimonial ${index + 1}: Author role should be more descriptive for credibility`)
      }
    })
  }

  // School validation for elite standards
  if (content.schools) {
    const eliteSchools = content.schools.filter((school: any) => school.tier === 'elite')
    if (eliteSchools.length === 0) {
      warnings.push('No elite schools present - consider adding for premium positioning')
    }
  }

  // Video content validation
  if (content.videos) {
    const featuredVideos = content.videos.filter((video: any) => video.featured)
    if (featuredVideos.length === 0) {
      warnings.push('No featured videos - consider highlighting best testimonials')
    }
    if (featuredVideos.length > 3) {
      warnings.push('Too many featured videos may dilute impact')
    }
  }

  // Trust indicators validation
  if (content.intro && content.intro.trustIndicators) {
    const featuredIndicators = content.intro.trustIndicators.filter((indicator: any) => indicator.featured)
    if (featuredIndicators.length < 2) {
      warnings.push('Consider featuring more trust indicators for credibility')
    }
  }

  return { errors, warnings }
}

/**
 * Calculate schema complexity for performance metrics
 */
function calculateSchemaComplexity(section?: keyof typeof ContentSectionSchemas): number {
  const complexityScores = {
    hero: 20,
    intro: 30,
    testimonials: 25,
    videos: 35,
    schools: 25,
    cta: 15,
    testimonial: 15,
    trustIndicator: 10,
    school: 20,
    video: 25
  }

  return section ? complexityScores[section] : 100 // Full page complexity
}

/**
 * CONTEXT7 SOURCE: /colinhacks/zod - Content quality analysis for SEO and accessibility
 * Comprehensive quality analysis for content optimization
 */
export function analyzeContentQuality(content: unknown): ContentQualityAnalysis {
  const issues: ContentQualityAnalysis['issues'] = []
  const recommendations: string[] = []
  
  let seoScore = 100
  let accessibilityScore = 100
  let performanceScore = 100

  try {
    const validationResult = validateTestimonialContent(content)
    
    if (!validationResult.isValid) {
      seoScore -= 20
      accessibilityScore -= 15
      validationResult.errors.forEach(error => {
        issues.push({ type: 'error', message: error })
      })
    }

    // SEO Analysis
    if (validationResult.validatedData) {
      const data = validationResult.validatedData

      // Title optimization
      if (data.hero && data.hero.title) {
        if (data.hero.title.length < 30) {
          seoScore -= 10
          recommendations.push('Consider longer, more descriptive title for SEO')
        }
        if (data.hero.title.length > 60) {
          seoScore -= 5
          recommendations.push('Title may be too long for search snippets')
        }
      }

      // Description optimization
      if (data.hero && data.hero.description) {
        if (data.hero.description.length < 120) {
          seoScore -= 10
          recommendations.push('Description should be longer for better SEO')
        }
      }

      // Testimonial diversity
      if (data.testimonials) {
        const locations = new Set(data.testimonials.map((t: any) => t.location).filter(Boolean))
        if (locations.size < 3) {
          seoScore -= 5
          recommendations.push('Add testimonials from diverse locations for broader appeal')
        }
      }

      // Accessibility Analysis
      if (data.videos) {
        data.videos.forEach((video: any, index: number) => {
          if (!video.description || video.description.length < 20) {
            accessibilityScore -= 5
            issues.push({
              type: 'warning',
              message: `Video ${index + 1} needs better description for accessibility`,
              field: `videos[${index}].description`
            })
          }
        })
      }

      // Performance Analysis
      const contentSize = JSON.stringify(data).length
      if (contentSize > 50000) {
        performanceScore -= 15
        recommendations.push('Consider content optimization for faster loading')
      }

      if (data.testimonials && data.testimonials.length > 20) {
        performanceScore -= 10
        recommendations.push('Consider pagination for large testimonial lists')
      }
    }

  } catch (error) {
    issues.push({
      type: 'error',
      message: `Analysis error: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
    seoScore = 0
    accessibilityScore = 0
    performanceScore = 0
  }

  const overallScore = Math.round((seoScore + accessibilityScore + performanceScore) / 3)

  return {
    overallScore,
    seoScore,
    accessibilityScore,
    performanceScore,
    recommendations,
    issues
  }
}

/**
 * Sanitize content for safe display
 * CONTEXT7 SOURCE: /colinhacks/zod - Data sanitization patterns for security
 */
export function sanitizeTestimonialContent(content: unknown): any {
  const validation = validateTestimonialContent(content)
  
  if (!validation.isValid || !validation.validatedData) {
    throw new Error(`Content validation failed: ${validation.errors.join(', ')}`)
  }

  // Return validated and sanitized data
  return validation.validatedData
}

// Export schemas for direct use
export {
  TestimonialsPageContentSchema,
  TestimonialSchema,
  SchoolSchema,
  VideoTestimonialSchema,
  TrustIndicatorSchema,
  HeroContentSchema,
  IntroContentSchema,
  CTAContentSchema,
  ContentSectionSchemas
}