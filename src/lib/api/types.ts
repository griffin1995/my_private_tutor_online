// Context7 MCP Documentation Source: /microsoft/typescript
// Reference: TypeScript utility types and API response patterns
// Purpose: Type-safe API responses for premium tutoring service

/**
 * Standard API response wrapper
 * Provides consistent structure for all API endpoints
 */
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
  metadata?: ApiMetadata
}

/**
 * API error structure with detailed information
 */
export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
  field?: string // For field-specific validation errors
  timestamp: string
}

/**
 * API response metadata
 */
export interface ApiMetadata {
  requestId: string
  timestamp: string
  version: string
  rateLimit?: {
    remaining: number
    resetTime: string
  }
  pagination?: PaginationMetadata
}

/**
 * Pagination metadata for list responses
 */
export interface PaginationMetadata {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrevious: boolean
}

/**
 * Contact form submission response
 */
export interface ContactFormResponse {
  submissionId: string
  status: 'received' | 'processing' | 'completed'
  estimatedResponseTime: string // ISO date string
  assignedConsultant?: {
    name: string
    email: string
    phone: string
  }
}

/**
 * Newsletter subscription response
 */
export interface NewsletterResponse {
  subscriptionId: string
  status: 'subscribed' | 'pending_confirmation'
  confirmationRequired: boolean
  preferences: {
    frequency: 'weekly' | 'monthly'
    topics: string[]
  }
}

/**
 * Consultation booking response
 */
export interface ConsultationBookingResponse {
  bookingId: string
  status: 'confirmed' | 'pending' | 'cancelled'
  consultationDetails: {
    date: string // ISO date string
    time: string // ISO time string
    duration: number // minutes
    type: 'online' | 'phone' | 'in-person'
    meetingLink?: string
    location?: string
  }
  consultant: {
    name: string
    title: string
    email: string
    phone: string
    bio: string
  }
  preparationMaterials?: {
    title: string
    url: string
    type: 'pdf' | 'video' | 'article'
  }[]
}

/**
 * File upload response
 */
export interface FileUploadResponse {
  fileId: string
  filename: string
  url: string
  size: number
  mimeType: string
  dimensions?: {
    width: number
    height: number
  }
  altText?: string
  category: string
}

/**
 * Admin authentication response
 */
export interface AuthResponse {
  token: string
  refreshToken: string
  expiresAt: string // ISO date string
  user: {
    id: string
    email: string
    role: 'admin'
    permissions: string[]
    lastLogin: string // ISO date string
  }
}

/**
 * Health check response
 */
export interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy'
  timestamp: string
  version: string
  uptime: number // seconds
  services: {
    database: ServiceStatus
    email: ServiceStatus
    fileStorage: ServiceStatus
    cms: ServiceStatus
  }
}

export interface ServiceStatus {
  status: 'operational' | 'degraded' | 'down'
  responseTime?: number // milliseconds
  lastChecked: string // ISO date string
  error?: string
}

/**
 * Content management responses
 */
export interface ContentResponse {
  contentId: string
  type: 'page' | 'post' | 'media' | 'testimonial'
  status: 'draft' | 'published' | 'archived'
  title: string
  slug: string
  content: Record<string, any>
  metadata: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    author: string
    version: number
  }
}

export interface MediaResponse {
  mediaId: string
  filename: string
  originalName: string
  url: string
  thumbnailUrl?: string
  size: number
  mimeType: string
  dimensions?: {
    width: number
    height: number
  }
  altText: string
  category: string
  uploadedAt: string
  uploadedBy: string
}

/**
 * Analytics response types
 */
export interface AnalyticsResponse {
  period: {
    start: string
    end: string
  }
  metrics: {
    pageViews: number
    uniqueVisitors: number
    sessionDuration: number // seconds
    bounceRate: number // percentage 0-100
    conversions: number
  }
  topPages: {
    path: string
    views: number
    uniqueViews: number
  }[]
  referrers: {
    source: string
    visits: number
  }[]
  devices: {
    type: 'desktop' | 'mobile' | 'tablet'
    count: number
  }[]
}

/**
 * Error response types
 */
export type ValidationErrorResponse = ApiResponse<null> & {
  error: ApiError & {
    code: 'VALIDATION_ERROR'
    details: {
      fieldErrors: Record<string, string[]>
      generalErrors: string[]
    }
  }
}

export type AuthErrorResponse = ApiResponse<null> & {
  error: ApiError & {
    code: 'AUTHENTICATION_ERROR' | 'AUTHORIZATION_ERROR' | 'TOKEN_EXPIRED'
  }
}

export type RateLimitErrorResponse = ApiResponse<null> & {
  error: ApiError & {
    code: 'RATE_LIMIT_EXCEEDED'
    details: {
      limit: number
      resetTime: string
    }
  }
}

/**
 * Type guards for API responses
 */
export const isSuccessResponse = <T>(response: ApiResponse<T>): response is ApiResponse<T> & { success: true, data: T } => {
  return response.success === true && response.data !== undefined
}

export const isErrorResponse = <T>(response: ApiResponse<T>): response is ApiResponse<T> & { success: false, error: ApiError } => {
  return response.success === false && response.error !== undefined
}

export const isValidationError = (response: ApiResponse<any>): response is ValidationErrorResponse => {
  return isErrorResponse(response) && response.error.code === 'VALIDATION_ERROR'
}

export const isAuthError = (response: ApiResponse<any>): response is AuthErrorResponse => {
  return isErrorResponse(response) && ['AUTHENTICATION_ERROR', 'AUTHORIZATION_ERROR', 'TOKEN_EXPIRED'].includes(response.error.code)
}

export const isRateLimitError = (response: ApiResponse<any>): response is RateLimitErrorResponse => {
  return isErrorResponse(response) && response.error.code === 'RATE_LIMIT_EXCEEDED'
}

/**
 * API client error handling
 */
export class ApiClientError extends Error {
  constructor(
    public response: ApiResponse<any>,
    public statusCode?: number
  ) {
    super(response.error?.message || 'API request failed')
    this.name = 'ApiClientError'
  }
}

export class ValidationError extends ApiClientError {
  constructor(public response: ValidationErrorResponse) {
    super(response)
    this.name = 'ValidationError'
  }

  getFieldErrors(): Record<string, string[]> {
    return this.response.error.details.fieldErrors || {}
  }

  getGeneralErrors(): string[] {
    return this.response.error.details.generalErrors || []
  }
}

export class AuthenticationError extends ApiClientError {
  constructor(public response: AuthErrorResponse) {
    super(response)
    this.name = 'AuthenticationError'
  }
}

export class RateLimitError extends ApiClientError {
  constructor(public response: RateLimitErrorResponse) {
    super(response)
    this.name = 'RateLimitError'
  }

  getResetTime(): Date {
    return new Date(this.response.error.details.resetTime)
  }

  getLimit(): number {
    return this.response.error.details.limit
  }
}

/**
 * HTTP status codes for API responses
 */
export const HttpStatusCode = {
  // Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  
  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  
  // Server Errors
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504
} as const

export type HttpStatusCode = typeof HttpStatusCode[keyof typeof HttpStatusCode]

/**
 * Standard error codes used across the API
 */
export const ApiErrorCode = {
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  
  // Authentication & Authorization
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  
  // Resource Management
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  RESOURCE_ALREADY_EXISTS: 'RESOURCE_ALREADY_EXISTS',
  RESOURCE_LOCKED: 'RESOURCE_LOCKED',
  
  // Rate Limiting
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // File Management
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  UNSUPPORTED_FILE_TYPE: 'UNSUPPORTED_FILE_TYPE',
  FILE_UPLOAD_FAILED: 'FILE_UPLOAD_FAILED',
  
  // External Services
  EMAIL_SERVICE_ERROR: 'EMAIL_SERVICE_ERROR',
  PAYMENT_SERVICE_ERROR: 'PAYMENT_SERVICE_ERROR',
  CALENDAR_SERVICE_ERROR: 'CALENDAR_SERVICE_ERROR',
  
  // General
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  MAINTENANCE_MODE: 'MAINTENANCE_MODE'
} as const

export type ApiErrorCode = typeof ApiErrorCode[keyof typeof ApiErrorCode]

/**
 * Utility functions for creating consistent API responses
 */
export const createSuccessResponse = <T>(
  data: T,
  metadata?: Partial<ApiMetadata>
): ApiResponse<T> => ({
  success: true,
  data,
  metadata: {
    requestId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    ...metadata
  }
})

export const createErrorResponse = (
  error: Omit<ApiError, 'timestamp'>,
  metadata?: Partial<ApiMetadata>
): ApiResponse<null> => ({
  success: false,
  error: {
    ...error,
    timestamp: new Date().toISOString()
  },
  metadata: {
    requestId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    ...metadata
  }
})

// Export type utilities
export type ExtractResponseData<T> = T extends ApiResponse<infer U> ? U : never
export type ApiEndpoint<TRequest = unknown, TResponse = unknown> = (request: TRequest) => Promise<ApiResponse<TResponse>>