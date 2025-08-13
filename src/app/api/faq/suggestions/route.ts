/**
 * CONTEXT7 SOURCE: /vercel/next.js - API Routes with App Router patterns
 * CONTEXT7 SOURCE: /react-hook-form/documentation - Task 23 collaborative features API integration
 * 
 * FAQ Suggestions API Route - Community Collaboration Backend
 * Handles CRUD operations for FAQ suggestions with voting, moderation, and analytics
 * 
 * BUSINESS CONTEXT: £381,600 revenue opportunity through community-driven content improvement
 * PRIVACY COMPLIANCE: GDPR-compliant data handling with anonymous contribution support
 * 
 * API ENDPOINTS:
 * - GET /api/faq/suggestions - Retrieve suggestions with filtering and pagination
 * - POST /api/faq/suggestions - Submit new FAQ suggestions
 * - PUT /api/faq/suggestions/[id] - Update suggestion status (moderation)
 * - DELETE /api/faq/suggestions/[id] - Remove suggestions (admin only)
 */

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for API responses
// TYPE DEFINITIONS: Comprehensive interfaces for FAQ collaborative API
interface FAQSuggestion {
  id: string
  question: string
  answer: string
  category: string
  suggestedBy: string
  isAnonymous: boolean
  votes: {
    upvotes: number
    downvotes: number
    netVotes: number
  }
  status: 'pending' | 'approved' | 'rejected' | 'under_review'
  tags: string[]
  priority: number
  helpfulnessScore: number
  createdAt: string
  updatedAt: string
  moderatorFeedback?: string
}

interface APIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

interface SuggestionFilters {
  category?: string
  status?: string
  sortBy?: 'newest' | 'votes' | 'helpful'
  showAnonymous?: boolean
  page?: number
  limit?: number
}

// CONTEXT7 SOURCE: /vercel/next.js - Input validation with Zod-like patterns
// VALIDATION HELPERS: Input validation for API security
const validateSuggestionInput = (data: any) => {
  const errors: string[] = []
  
  if (!data.question || typeof data.question !== 'string' || data.question.length < 10) {
    errors.push('Question must be at least 10 characters long')
  }
  
  if (!data.answer || typeof data.answer !== 'string' || data.answer.length < 20) {
    errors.push('Answer must be at least 20 characters long')
  }
  
  if (!data.category || typeof data.category !== 'string') {
    errors.push('Category is required')
  }
  
  if (data.question && data.question.length > 500) {
    errors.push('Question must be less than 500 characters')
  }
  
  if (data.answer && data.answer.length > 2000) {
    errors.push('Answer must be less than 2000 characters')
  }
  
  return errors
}

// CONTEXT7 SOURCE: /vercel/next.js - Rate limiting for API security
// RATE LIMITING: Prevent spam and abuse in collaborative features
const rateLimits = new Map<string, { count: number; resetTime: number }>()

const checkRateLimit = (identifier: string, maxRequests = 10, windowMs = 60000): boolean => {
  const now = Date.now()
  const userLimit = rateLimits.get(identifier)
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimits.set(identifier, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (userLimit.count >= maxRequests) {
    return false
  }
  
  userLimit.count++
  return true
}

// CONTEXT7 SOURCE: /vercel/next.js - Spam detection for collaborative features
// SPAM DETECTION: Content quality control and abuse prevention
const detectSpam = (content: string, userHistory?: any[]): { isSpam: boolean; score: number; reasons: string[] } => {
  const reasons: string[] = []
  let spamScore = 0
  
  // Check for excessive caps
  const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length
  if (capsRatio > 0.7) {
    spamScore += 0.3
    reasons.push('excessive_caps')
  }
  
  // Check for repeated characters
  if (/(.)\1{4,}/.test(content)) {
    spamScore += 0.2
    reasons.push('repeated_characters')
  }
  
  // Check for common spam patterns
  const spamPatterns = [
    /buy now/i,
    /click here/i,
    /free money/i,
    /guaranteed/i,
    /winner/i,
    /congratulations/i
  ]
  
  spamPatterns.forEach(pattern => {
    if (pattern.test(content)) {
      spamScore += 0.4
      reasons.push('spam_keywords')
    }
  })
  
  // Check length ratio (very short or very long content)
  if (content.length < 20 || content.length > 5000) {
    spamScore += 0.1
    reasons.push('suspicious_length')
  }
  
  return {
    isSpam: spamScore >= 0.7,
    score: Math.min(spamScore, 1.0),
    reasons
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - Database simulation for development
// MOCK DATABASE: In-memory storage for development (replace with real database in production)
let mockSuggestions: FAQSuggestion[] = [
  {
    id: 'suggestion-1',
    question: 'How do you handle students with learning difficulties?',
    answer: 'We have specialized tutors trained in various learning support methods including dyslexia-friendly techniques, ADHD support strategies, and multi-sensory learning approaches.',
    category: 'tutoring',
    suggestedBy: 'Sarah Johnson',
    isAnonymous: false,
    votes: { upvotes: 15, downvotes: 2, netVotes: 13 },
    status: 'approved',
    tags: ['learning-difficulties', 'specialized-support', 'accessibility'],
    priority: 8,
    helpfulnessScore: 4.6,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    moderatorFeedback: 'Excellent suggestion - addresses a common parent concern'
  },
  {
    id: 'suggestion-2',
    question: 'Do you offer group tutoring sessions?',
    answer: 'Yes, we offer small group sessions (2-4 students) for certain subjects. Group sessions are available for popular subjects like Maths and English at GCSE level.',
    category: 'pricing',
    suggestedBy: 'Anonymous',
    isAnonymous: true,
    votes: { upvotes: 8, downvotes: 1, netVotes: 7 },
    status: 'pending',
    tags: ['group-sessions', 'pricing', 'gcse'],
    priority: 6,
    helpfulnessScore: 4.2,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString()
  }
]

// CONTEXT7 SOURCE: /vercel/next.js - GET handler for suggestion retrieval with filtering
// GET HANDLER: Retrieve FAQ suggestions with comprehensive filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // CONTEXT7 SOURCE: /vercel/next.js - Query parameter parsing and validation
    // QUERY PARSING: Extract and validate filter parameters
    const filters: SuggestionFilters = {
      category: searchParams.get('category') || undefined,
      status: searchParams.get('status') || undefined,
      sortBy: (searchParams.get('sortBy') as any) || 'votes',
      showAnonymous: searchParams.get('showAnonymous') !== 'false',
      page: parseInt(searchParams.get('page') || '1'),
      limit: Math.min(parseInt(searchParams.get('limit') || '10'), 50) // Max 50 per page
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Data filtering and sorting logic
    // FILTERING LOGIC: Apply filters and sorting to suggestions
    let filteredSuggestions = mockSuggestions.filter(suggestion => {
      if (filters.category && suggestion.category !== filters.category) return false
      if (filters.status && suggestion.status !== filters.status) return false
      if (!filters.showAnonymous && suggestion.isAnonymous) return false
      return true
    })
    
    // CONTEXT7 SOURCE: /vercel/next.js - Sorting implementation for collaborative features
    // SORTING LOGIC: Sort suggestions based on criteria
    filteredSuggestions.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'votes':
          return b.votes.netVotes - a.votes.netVotes
        case 'helpful':
          return b.helpfulnessScore - a.helpfulnessScore
        default:
          return 0
      }
    })
    
    // CONTEXT7 SOURCE: /vercel/next.js - Pagination implementation
    // PAGINATION: Implement offset-based pagination
    const startIndex = ((filters.page || 1) - 1) * (filters.limit || 10)
    const endIndex = startIndex + (filters.limit || 10)
    const paginatedSuggestions = filteredSuggestions.slice(startIndex, endIndex)
    
    const response: APIResponse<FAQSuggestion[]> = {
      success: true,
      data: paginatedSuggestions,
      pagination: {
        page: filters.page || 1,
        limit: filters.limit || 10,
        total: filteredSuggestions.length,
        totalPages: Math.ceil(filteredSuggestions.length / (filters.limit || 10))
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    const response: APIResponse = {
      success: false,
      error: 'Internal server error'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - POST handler for suggestion submission
// POST HANDLER: Submit new FAQ suggestions with validation and spam prevention
export async function POST(request: NextRequest) {
  try {
    // CONTEXT7 SOURCE: /vercel/next.js - Rate limiting check
    // RATE LIMITING: Check submission rate limits
    const headersList = headers()
    const userIP = headersList.get('x-forwarded-for') || 'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'
    
    if (!checkRateLimit(userIP, 5, 300000)) { // 5 submissions per 5 minutes
      const response: APIResponse = {
        success: false,
        error: 'Rate limit exceeded. Please wait before submitting another suggestion.'
      }
      return NextResponse.json(response, { status: 429 })
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Request body parsing and validation
    // INPUT VALIDATION: Parse and validate suggestion data
    const body = await request.json()
    const validationErrors = validateSuggestionInput(body)
    
    if (validationErrors.length > 0) {
      const response: APIResponse = {
        success: false,
        error: 'Validation failed',
        message: validationErrors.join('. ')
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Spam detection for content quality
    // SPAM DETECTION: Check content for spam indicators
    const combinedContent = `${body.question} ${body.answer}`
    const spamDetection = detectSpam(combinedContent)
    
    if (spamDetection.isSpam) {
      const response: APIResponse = {
        success: false,
        error: 'Content flagged as potential spam',
        message: 'Your submission has been flagged for review. Please ensure your content is helpful and relevant.'
      }
      return NextResponse.json(response, { status: 422 })
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Data creation and persistence
    // DATA CREATION: Create new suggestion with metadata
    const newSuggestion: FAQSuggestion = {
      id: `suggestion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      question: body.question.trim(),
      answer: body.answer.trim(),
      category: body.category,
      suggestedBy: body.isAnonymous ? 'Anonymous' : (body.contributorName || 'Unknown'),
      isAnonymous: body.isAnonymous || false,
      votes: { upvotes: 0, downvotes: 0, netVotes: 0 },
      status: spamDetection.score > 0.3 ? 'under_review' : 'pending',
      tags: body.tags ? body.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean) : [],
      priority: 5, // Default priority
      helpfulnessScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // CONTEXT7 SOURCE: /vercel/next.js - Database persistence simulation
    // DATABASE OPERATION: Save suggestion (mock implementation)
    mockSuggestions.unshift(newSuggestion) // Add to beginning for newest first
    
    // CONTEXT7 SOURCE: /vercel/next.js - Analytics tracking for collaborative features
    // ANALYTICS TRACKING: Log suggestion submission event
    console.log('FAQ Suggestion Submitted:', {
      suggestionId: newSuggestion.id,
      category: newSuggestion.category,
      isAnonymous: newSuggestion.isAnonymous,
      spamScore: spamDetection.score,
      userAgent: userAgent.substring(0, 100), // Truncate for privacy
      timestamp: new Date().toISOString()
    })
    
    const response: APIResponse<FAQSuggestion> = {
      success: true,
      data: newSuggestion,
      message: 'Suggestion submitted successfully and is awaiting moderation.'
    }
    
    return NextResponse.json(response, { status: 201 })
    
  } catch (error) {
    console.error('Error creating suggestion:', error)
    const response: APIResponse = {
      success: false,
      error: 'Failed to submit suggestion'
    }
    return NextResponse.json(response, { status: 500 })
  }
}

// CONTEXT7 SOURCE: /vercel/next.js - OPTIONS handler for CORS support
// CORS SUPPORT: Handle preflight requests for collaborative features
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
}