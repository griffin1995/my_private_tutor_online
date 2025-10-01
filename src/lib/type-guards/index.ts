/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Advanced type guard patterns and validation systems
 * TYPE GUARDS: Official TypeScript documentation recommends comprehensive type guard functions for runtime validation
 *
 * CONTEXT7 SOURCE: /microsoft/typescript - Type predicates and user-defined type guards
 * VALIDATION: Advanced validation patterns using type predicates and runtime checks
 *
 * Comprehensive Type Guards and Validation Systems
 * Implementation for Phase 2.2 TypeScript Coverage Completion
 *
 * Features:
 * - Advanced type guard functions for runtime validation
 * - Generic type validation utilities
 * - CMS content validation guards
 * - Video player type validation
 * - Analytics data validation
 * - Error handling type guards
 * - Union type discrimination
 * - Template literal type guards
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Basic primitive type guards
// PRIMITIVE VALIDATION: Official TypeScript documentation shows proper primitive type checking
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value)
}

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced type guard for non-null values
// NON-NULL VALIDATION: TypeScript handbook shows proper null/undefined checking patterns
export function isNonNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

export function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined
}

export function isNotEmpty(value: unknown): value is NonNullable<unknown> {
  return value !== null && value !== undefined && value !== ''
}

// CONTEXT7 SOURCE: /microsoft/typescript - Array and object validation guards
// COLLECTION VALIDATION: Advanced validation for arrays and objects with type constraints
export function isNonEmptyArray<T>(value: unknown): value is [T, ...T[]] {
  return Array.isArray(value) && value.length > 0
}

export function isObjectWithKeys<K extends string>(
  value: unknown,
  keys: readonly K[]
): value is Record<K, unknown> {
  if (!isObject(value)) return false
  return keys.every(key => key in value)
}

export function hasProperty<K extends PropertyKey>(
  value: unknown,
  property: K
): value is Record<K, unknown> {
  return isObject(value) && property in value
}

// CONTEXT7 SOURCE: /microsoft/typescript - Union type discrimination guards
// UNION DISCRIMINATION: Official patterns for discriminating union types safely
export function isVideoPlayerError(value: unknown): value is {
  type: 'network' | 'decode' | 'src_not_supported' | 'permission' | 'unknown'
  message: string
  code?: number
  details?: Record<string, unknown>
  timestamp: number
  videoId: string
  recoverable: boolean
} {
  return (
    isObject(value) &&
    hasProperty(value, 'type') &&
    isString(value.type) &&
    ['network', 'decode', 'src_not_supported', 'permission', 'unknown'].includes(value.type) &&
    hasProperty(value, 'message') &&
    isString(value.message) &&
    hasProperty(value, 'timestamp') &&
    isNumber(value.timestamp) &&
    hasProperty(value, 'videoId') &&
    isString(value.videoId) &&
    hasProperty(value, 'recoverable') &&
    isBoolean(value.recoverable)
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - CMS content validation guards
// CMS VALIDATION: Type guards for synchronous CMS architecture protection
export function isCMSContent(value: unknown): value is {
  readonly title: string
  readonly description: string
  readonly content: Record<string, unknown>
  readonly metadata?: Record<string, unknown>
} {
  return (
    isObject(value) &&
    hasProperty(value, 'title') &&
    isString(value.title) &&
    hasProperty(value, 'description') &&
    isString(value.description) &&
    hasProperty(value, 'content') &&
    isObject(value.content)
  )
}

export function isValidVideoMetadata(value: unknown): value is {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly videoId: string | null
  readonly thumbnailUrl: string
  readonly duration: number
  readonly isFree: boolean
  readonly price?: string
  readonly paymentUrl?: string
} {
  return (
    isObject(value) &&
    hasProperty(value, 'id') &&
    isString(value.id) &&
    hasProperty(value, 'title') &&
    isString(value.title) &&
    hasProperty(value, 'description') &&
    isString(value.description) &&
    hasProperty(value, 'videoId') &&
    (isString(value.videoId) || value.videoId === null) &&
    hasProperty(value, 'thumbnailUrl') &&
    isString(value.thumbnailUrl) &&
    hasProperty(value, 'duration') &&
    isNumber(value.duration) &&
    hasProperty(value, 'isFree') &&
    isBoolean(value.isFree)
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Analytics event validation guards
// ANALYTICS VALIDATION: Type-safe analytics event validation for performance monitoring
export function isAnalyticsEvent(value: unknown): value is {
  readonly type: string
  readonly timestamp: number
  readonly userId?: string
  readonly sessionId?: string
  readonly metadata?: Record<string, unknown>
} {
  return (
    isObject(value) &&
    hasProperty(value, 'type') &&
    isString(value.type) &&
    hasProperty(value, 'timestamp') &&
    isNumber(value.timestamp)
  )
}

export function isPerformanceMetric(value: unknown): value is {
  readonly name: string
  readonly value: number
  readonly timestamp: number
  readonly tags?: Record<string, string>
  readonly metadata?: Record<string, unknown>
} {
  return (
    isObject(value) &&
    hasProperty(value, 'name') &&
    isString(value.name) &&
    hasProperty(value, 'value') &&
    isNumber(value.value) &&
    hasProperty(value, 'timestamp') &&
    isNumber(value.timestamp)
  )
}

// CONTEXT7 SOURCE: /microsoft/typescript - Error type validation guards
// ERROR VALIDATION: Comprehensive error type validation for monitoring systems
export function isErrorLike(value: unknown): value is {
  readonly name: string
  readonly message: string
  readonly stack?: string
} {
  return (
    isObject(value) &&
    hasProperty(value, 'name') &&
    isString(value.name) &&
    hasProperty(value, 'message') &&
    isString(value.message)
  )
}

export function isStandardError(value: unknown): value is Error {
  return value instanceof Error
}

export function isErrorWithCode(value: unknown): value is Error & { code: string } {
  return isStandardError(value) && 'code' in value && isString((value as any).code)
}

// CONTEXT7 SOURCE: /microsoft/typescript - Generic validation utility functions
// GENERIC VALIDATION: Advanced generic type validation patterns
export function validateObjectShape<T extends Record<string, unknown>>(
  value: unknown,
  shape: { [K in keyof T]: (v: unknown) => v is T[K] }
): value is T {
  if (!isObject(value)) return false

  return Object.entries(shape).every(([key, validator]) => {
    const propertyValue = value[key]
    return validator(propertyValue)
  })
}

export function createArrayValidator<T>(
  itemValidator: (value: unknown) => value is T
) {
  return (value: unknown): value is T[] => {
    return isArray(value) && value.every(item => itemValidator(item))
  }
}

export function createUnionValidator<T extends readonly unknown[]>(
  ...validators: { [K in keyof T]: (value: unknown) => value is T[K] }
) {
  return (value: unknown): value is T[number] => {
    return validators.some(validator => validator(value))
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Template literal type guards
// TEMPLATE LITERALS: Advanced template literal type validation patterns
export function isEmailFormat(value: unknown): value is `${string}@${string}.${string}` {
  return isString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isUUIDFormat(value: unknown): value is `${string}-${string}-${string}-${string}-${string}` {
  return isString(value) && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)
}

export function isYouTubeVideoId(value: unknown): value is string {
  return isString(value) && /^[a-zA-Z0-9_-]{11}$/.test(value)
}

export function isYouTubeURL(value: unknown): value is string {
  if (!isString(value)) return false
  try {
    const url = new URL(value)
    return (
      (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') &&
      url.pathname === '/watch' &&
      isYouTubeVideoId(url.searchParams.get('v'))
    ) || (
      (url.hostname === 'youtu.be') &&
      isYouTubeVideoId(url.pathname.slice(1))
    )
  } catch {
    return false
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Assertion functions for type narrowing
// ASSERTION FUNCTIONS: TypeScript assertion functions for runtime type validation
export function assertIsString(value: unknown, message?: string): asserts value is string {
  if (!isString(value)) {
    throw new TypeError(message || `Expected string, got ${typeof value}`)
  }
}

export function assertIsNumber(value: unknown, message?: string): asserts value is number {
  if (!isNumber(value)) {
    throw new TypeError(message || `Expected number, got ${typeof value}`)
  }
}

export function assertIsObject(value: unknown, message?: string): asserts value is Record<string, unknown> {
  if (!isObject(value)) {
    throw new TypeError(message || `Expected object, got ${typeof value}`)
  }
}

export function assertIsNonNull<T>(value: T | null | undefined, message?: string): asserts value is T {
  if (!isNonNull(value)) {
    throw new TypeError(message || 'Expected non-null value')
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Result type pattern for validation
// RESULT PATTERN: Safe validation results without throwing errors
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; received: unknown }

export function validateSafely<T>(
  value: unknown,
  validator: (v: unknown) => v is T,
  errorMessage?: string
): ValidationResult<T> {
  if (validator(value)) {
    return { success: true, data: value }
  }
  return {
    success: false,
    error: errorMessage || 'Validation failed',
    received: value
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Type-safe JSON parsing
// JSON VALIDATION: Safe JSON parsing with type validation
export function parseJSONSafely<T>(
  jsonString: string,
  validator: (value: unknown) => value is T
): ValidationResult<T> {
  try {
    const parsed = JSON.parse(jsonString)
    return validateSafely(parsed, validator, 'Parsed JSON does not match expected type')
  } catch (error) {
    return {
      success: false,
      error: `JSON parsing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      received: jsonString
    }
  }
}

// CONTEXT7 SOURCE: /microsoft/typescript - Branded type validation
// BRANDED TYPES: Advanced branded type patterns for enhanced type safety
export type Brand<T, B> = T & { readonly __brand: B }

export function createBrandValidator<T, B>(
  baseValidator: (value: unknown) => value is T,
  brandValidator: (value: T) => boolean,
  brandName: string
) {
  return (value: unknown): value is Brand<T, B> => {
    return baseValidator(value) && brandValidator(value)
  }
}

// Common branded types for the application
export type PositiveNumber = Brand<number, 'PositiveNumber'>
export type NonEmptyString = Brand<string, 'NonEmptyString'>
export type VideoId = Brand<string, 'VideoId'>
export type UserId = Brand<string, 'UserId'>

export const isPositiveNumber = createBrandValidator<number, 'PositiveNumber'>(
  isNumber,
  (n) => n > 0,
  'PositiveNumber'
)

export const isNonEmptyString = createBrandValidator<string, 'NonEmptyString'>(
  isString,
  (s) => s.length > 0,
  'NonEmptyString'
)

export const isValidVideoId = createBrandValidator<string, 'VideoId'>(
  isString,
  (s) => isYouTubeVideoId(s) || /^[a-zA-Z0-9_-]+$/.test(s),
  'VideoId'
)

export const isValidUserId = createBrandValidator<string, 'UserId'>(
  isString,
  (s) => isUUIDFormat(s) || /^user_[a-zA-Z0-9_-]+$/.test(s),
  'UserId'
)