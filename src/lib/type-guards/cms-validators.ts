/**
 * CONTEXT7 SOURCE: /microsoft/typescript - CMS content type validation for synchronous architecture
 * CMS VALIDATION: Comprehensive type guards to protect synchronous CMS patterns from async contamination
 *
 * CONTEXT7 SOURCE: /microsoft/typescript - Advanced interface validation with template literals
 * INTERFACE VALIDATION: Strict validation for CMS content structures and metadata
 *
 * CMS Content Validation Guards
 * Critical protection for synchronous CMS architecture integrity
 *
 * Features:
 * - Synchronous content validation guards
 * - CMS structure integrity checks
 * - Video metadata validation
 * - Blog content type validation
 * - Navigation structure validation
 * - Service content validation
 * - Testimonial data validation
 * - Image metadata validation
 */

import {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  hasProperty,
  isNonNull,
  ValidationResult,
  validateSafely,
  NonEmptyString,
  isNonEmptyString
} from './index'

// CONTEXT7 SOURCE: /microsoft/typescript - CMS base content interface validation
// BASE VALIDATION: Core CMS content structure validation for all content types
export interface CMSBaseContent {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly slug: string
  readonly published: boolean
  readonly createdAt: string
  readonly updatedAt: string
  readonly metadata?: Record<string, unknown>
}

export function isCMSBaseContent(value: unknown): value is CMSBaseContent {
  return (
    isObject(value) &&
    hasProperty(value, 'id') &&
    isNonEmptyString(value.id) &&
    hasProperty(value, 'title') &&
    isNonEmptyString(value.title) &&
    hasProperty(value, 'description') &&
    isString(value.description) &&
    hasProperty(value, 'slug') &&
    isNonEmptyString(value.slug) &&
    hasProperty(value, 'published') &&
    isBoolean(value.published) &&
    hasProperty(value, 'createdAt') &&
    isString(value.createdAt) &&
    hasProperty(value, 'updatedAt') &&
    isString(value.updatedAt)
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Video content validation for MASTERCLASS_VIDEOS
// VIDEO VALIDATION: Strict validation for video content structure and metadata
export interface CMSVideoContent extends CMSBaseContent {
  readonly videoId: string | null
  readonly thumbnailUrl: string
  readonly duration: number
  readonly isFree: boolean
  readonly price?: string
  readonly paymentUrl?: string
  readonly category: 'free' | 'paid'
  readonly featured: boolean
  readonly masterclassAuthor: string
  readonly masterclassRole: string
  readonly tags: readonly string[]
}

export function isCMSVideoContent(value: unknown): value is CMSVideoContent {
  return (
    isCMSBaseContent(value) &&
    hasProperty(value, 'videoId') &&
    (isString(value.videoId) || value.videoId === null) &&
    hasProperty(value, 'thumbnailUrl') &&
    isNonEmptyString(value.thumbnailUrl) &&
    hasProperty(value, 'duration') &&
    isNumber(value.duration) &&
    value.duration >= 0 &&
    hasProperty(value, 'isFree') &&
    isBoolean(value.isFree) &&
    hasProperty(value, 'category') &&
    isString(value.category) &&
    ['free', 'paid'].includes(value.category) &&
    hasProperty(value, 'featured') &&
    isBoolean(value.featured) &&
    hasProperty(value, 'masterclassAuthor') &&
    isNonEmptyString(value.masterclassAuthor) &&
    hasProperty(value, 'masterclassRole') &&
    isNonEmptyString(value.masterclassRole) &&
    hasProperty(value, 'tags') &&
    isArray(value.tags) &&
    value.tags.every(tag => isString(tag))
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Blog content validation
// BLOG VALIDATION: Type validation for blog posts and articles
export interface CMSBlogContent extends CMSBaseContent {
  readonly content: string
  readonly excerpt: string
  readonly featuredImage?: string
  readonly author: string
  readonly category: string
  readonly tags: readonly string[]
  readonly readingTime: number
  readonly seoTitle?: string
  readonly seoDescription?: string
  readonly canonicalUrl?: string
}

export function isCMSBlogContent(value: unknown): value is CMSBlogContent {
  return (
    isCMSBaseContent(value) &&
    hasProperty(value, 'content') &&
    isNonEmptyString(value.content) &&
    hasProperty(value, 'excerpt') &&
    isString(value.excerpt) &&
    hasProperty(value, 'author') &&
    isNonEmptyString(value.author) &&
    hasProperty(value, 'category') &&
    isNonEmptyString(value.category) &&
    hasProperty(value, 'tags') &&
    isArray(value.tags) &&
    value.tags.every(tag => isString(tag)) &&
    hasProperty(value, 'readingTime') &&
    isNumber(value.readingTime) &&
    value.readingTime > 0
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Service content validation
// SERVICE VALIDATION: Type validation for tutoring services and offerings
export interface CMSServiceContent extends CMSBaseContent {
  readonly serviceType: 'tuition' | 'assessment' | 'consultation' | 'workshop'
  readonly subjects: readonly string[]
  readonly levels: readonly string[]
  readonly pricing: {
    readonly hourly?: number
    readonly package?: number
    readonly currency: string
  }
  readonly availability: boolean
  readonly duration?: number
  readonly maxStudents?: number
  readonly qualifications: readonly string[]
  readonly features: readonly string[]
}

export function isCMSServiceContent(value: unknown): value is CMSServiceContent {
  return (
    isCMSBaseContent(value) &&
    hasProperty(value, 'serviceType') &&
    isString(value.serviceType) &&
    ['tuition', 'assessment', 'consultation', 'workshop'].includes(value.serviceType) &&
    hasProperty(value, 'subjects') &&
    isArray(value.subjects) &&
    value.subjects.every(subject => isString(subject)) &&
    hasProperty(value, 'levels') &&
    isArray(value.levels) &&
    value.levels.every(level => isString(level)) &&
    hasProperty(value, 'pricing') &&
    isObject(value.pricing) &&
    hasProperty(value.pricing, 'currency') &&
    isNonEmptyString(value.pricing.currency) &&
    hasProperty(value, 'availability') &&
    isBoolean(value.availability) &&
    hasProperty(value, 'qualifications') &&
    isArray(value.qualifications) &&
    value.qualifications.every(qual => isString(qual)) &&
    hasProperty(value, 'features') &&
    isArray(value.features) &&
    value.features.every(feature => isString(feature))
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Testimonial content validation
// TESTIMONIAL VALIDATION: Type validation for client testimonials and reviews
export interface CMSTestimonialContent extends CMSBaseContent {
  readonly clientName: string
  readonly clientRole?: string
  readonly clientLocation?: string
  readonly clientImage?: string
  readonly testimonial: string
  readonly rating: number
  readonly verified: boolean
  readonly serviceType: string
  readonly subject?: string
  readonly outcome?: string
  readonly featured: boolean
  readonly videoTestimonial?: string
  readonly consentGiven: boolean
}

export function isCMSTestimonialContent(value: unknown): value is CMSTestimonialContent {
  return (
    isCMSBaseContent(value) &&
    hasProperty(value, 'clientName') &&
    isNonEmptyString(value.clientName) &&
    hasProperty(value, 'testimonial') &&
    isNonEmptyString(value.testimonial) &&
    hasProperty(value, 'rating') &&
    isNumber(value.rating) &&
    value.rating >= 1 &&
    value.rating <= 5 &&
    hasProperty(value, 'verified') &&
    isBoolean(value.verified) &&
    hasProperty(value, 'serviceType') &&
    isNonEmptyString(value.serviceType) &&
    hasProperty(value, 'featured') &&
    isBoolean(value.featured) &&
    hasProperty(value, 'consentGiven') &&
    isBoolean(value.consentGiven)
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Navigation structure validation
// NAVIGATION VALIDATION: Type validation for site navigation and menu structures
export interface CMSNavigationItem {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly external?: boolean
  readonly icon?: string
  readonly description?: string
  readonly children?: readonly CMSNavigationItem[]
  readonly order: number
  readonly visible: boolean
}

export function isCMSNavigationItem(value: unknown): value is CMSNavigationItem {
  return (
    isObject(value) &&
    hasProperty(value, 'id') &&
    isNonEmptyString(value.id) &&
    hasProperty(value, 'label') &&
    isNonEmptyString(value.label) &&
    hasProperty(value, 'href') &&
    isNonEmptyString(value.href) &&
    hasProperty(value, 'order') &&
    isNumber(value.order) &&
    hasProperty(value, 'visible') &&
    isBoolean(value.visible) &&
    // Recursive validation for children if present
    (!hasProperty(value, 'children') ||
      (isArray(value.children) && value.children.every(child => isCMSNavigationItem(child))))
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Image metadata validation
// IMAGE VALIDATION: Type validation for image content and metadata
export interface CMSImageMetadata {
  readonly src: string
  readonly alt: string
  readonly width?: number
  readonly height?: number
  readonly placeholder?: string
  readonly caption?: string
  readonly credit?: string
  readonly optimized: boolean
  readonly formats: readonly string[]
  readonly sizes?: readonly string[]
}

export function isCMSImageMetadata(value: unknown): value is CMSImageMetadata {
  return (
    isObject(value) &&
    hasProperty(value, 'src') &&
    isNonEmptyString(value.src) &&
    hasProperty(value, 'alt') &&
    isString(value.alt) &&
    hasProperty(value, 'optimized') &&
    isBoolean(value.optimized) &&
    hasProperty(value, 'formats') &&
    isArray(value.formats) &&
    value.formats.every(format => isString(format)) &&
    (!hasProperty(value, 'width') || isNumber(value.width)) &&
    (!hasProperty(value, 'height') || isNumber(value.height)) &&
    (!hasProperty(value, 'sizes') ||
      (isArray(value.sizes) && value.sizes.every(size => isString(size))))
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - CMS collection validation
// COLLECTION VALIDATION: Validation for CMS content collections and arrays
export function isCMSContentCollection<T>(
  value: unknown,
  itemValidator: (item: unknown) => item is T
): value is readonly T[] {
  return isArray(value) && value.every(item => itemValidator(item))
}

// CONTEXT7 SOURCE: /microsoft/typescript - CMS content union type discrimination
// UNION DISCRIMINATION: Type guards for discriminating different CMS content types
export type CMSContent =
  | CMSVideoContent
  | CMSBlogContent
  | CMSServiceContent
  | CMSTestimonialContent

export function isCMSContent(value: unknown): value is CMSContent {
  return (
    isCMSVideoContent(value) ||
    isCMSBlogContent(value) ||
    isCMSServiceContent(value) ||
    isCMSTestimonialContent(value)
  )
}

export function discriminateCMSContentType(content: CMSContent): {
  type: 'video' | 'blog' | 'service' | 'testimonial'
  content: CMSContent
} {
  if (isCMSVideoContent(content)) {
    return { type: 'video', content }
  }
  if (isCMSBlogContent(content)) {
    return { type: 'blog', content }
  }
  if (isCMSServiceContent(content)) {
    return { type: 'service', content }
  }
  if (isCMSTestimonialContent(content)) {
    return { type: 'testimonial', content }
  }
  throw new Error('Unknown CMS content type')
}

// CONTEXT7 SOURCE: /microsoft/typescript - Safe CMS content access patterns
// SAFE ACCESS: Type-safe utilities for accessing CMS content without runtime errors
export function validateCMSContentSafely<T extends CMSContent>(
  value: unknown,
  validator: (v: unknown) => v is T,
  contentType: string
): ValidationResult<T> {
  return validateSafely(value, validator, `Invalid ${contentType} content structure`)
}

export function getCMSContentSafely<T extends CMSContent>(
  collection: readonly unknown[],
  predicate: (item: unknown) => item is T,
  errorMessage?: string
): ValidationResult<readonly T[]> {
  const validItems: T[] = []
  const errors: string[] = []

  for (let i = 0; i < collection.length; i++) {
    const item = collection[i]
    if (predicate(item)) {
      validItems.push(item)
    } else {
      errors.push(`Item at index ${i} failed validation`)
    }
  }

  if (errors.length > 0) {
    return {
      success: false,
      error: errorMessage || `CMS collection validation failed: ${errors.join(', ')}`,
      received: collection
    }
  }

  return { success: true, data: validItems }
}

// CONTEXT7 SOURCE: /microsoft/typescript - CMS data integrity assertions
// INTEGRITY ASSERTIONS: Assertion functions for CMS data integrity validation
export function assertCMSContentIntegrity(value: unknown): asserts value is CMSContent {
  if (!isCMSContent(value)) {
    throw new TypeError('Invalid CMS content structure detected')
  }
}

export function assertSynchronousCMSAccess<T>(
  accessor: () => T,
  errorMessage?: string
): T {
  try {
    const result = accessor()
    if (result instanceof Promise) {
      throw new Error('Async CMS access detected - violates synchronous architecture')
    }
    return result
  } catch (error) {
    throw new Error(
      errorMessage ||
      `CMS access violation: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - CMS configuration validation
// CONFIG VALIDATION: Validation for CMS configuration and settings
export interface CMSConfiguration {
  readonly baseUrl: string
  readonly apiVersion: string
  readonly cacheEnabled: boolean
  readonly cacheTtl: number
  readonly synchronousOnly: true // Enforces synchronous access patterns
  readonly validation: {
    readonly strict: boolean
    readonly throwOnError: boolean
  }
  readonly features: {
    readonly videoSupport: boolean
    readonly blogSupport: boolean
    readonly testimonialSupport: boolean
    readonly navigationSupport: boolean
  }
}

export function isCMSConfiguration(value: unknown): value is CMSConfiguration {
  return (
    isObject(value) &&
    hasProperty(value, 'baseUrl') &&
    isNonEmptyString(value.baseUrl) &&
    hasProperty(value, 'apiVersion') &&
    isNonEmptyString(value.apiVersion) &&
    hasProperty(value, 'cacheEnabled') &&
    isBoolean(value.cacheEnabled) &&
    hasProperty(value, 'cacheTtl') &&
    isNumber(value.cacheTtl) &&
    hasProperty(value, 'synchronousOnly') &&
    value.synchronousOnly === true &&
    hasProperty(value, 'validation') &&
    isObject(value.validation) &&
    hasProperty(value.validation, 'strict') &&
    isBoolean(value.validation.strict) &&
    hasProperty(value.validation, 'throwOnError') &&
    isBoolean(value.validation.throwOnError) &&
    hasProperty(value, 'features') &&
    isObject(value.features)
  )
}