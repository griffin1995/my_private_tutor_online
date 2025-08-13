/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Testing patterns for React components and hooks
 * TESTING REASON: Official React documentation emphasizes comprehensive testing for complex systems
 * 
 * FAQ Recommendation Engine Test Suite - ML System Testing
 * Features:
 * - TF-IDF algorithm accuracy testing
 * - User behaviour tracking validation
 * - Client segmentation logic testing
 * - Performance benchmarking
 * - A/B testing framework validation
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import { 
  FAQRecommendationEngine, 
  TFIDFCalculator, 
  BehaviourTracker,
  TextProcessor,
  ClientSegment 
} from '@/lib/faq-recommendation-engine'
import { FAQABTestingManager, StatisticalAnalyzer } from '@/lib/faq-ab-testing'
import { FAQRecommendationOptimiser, DeviceCapabilityDetector } from '@/lib/faq-recommendation-optimiser'
import type { FAQQuestion, FAQCategory } from '@/lib/types'

// CONTEXT7 SOURCE: /reactjs/react.dev - Test data setup patterns
// TEST DATA: Comprehensive test dataset for recommendation testing
const mockFAQData: FAQCategory[] = [
  {
    id: 'tutoring-basics',
    title: 'Tutoring Basics',
    description: 'Essential information about our tutoring services',
    icon: 'BookOpen',
    questions: [
      {
        id: 'q1',
        question: 'What subjects do you offer tutoring for?',
        answer: 'We offer tutoring for Mathematics, English, Science, and more specialized subjects including A-level and university preparation.',
        category: 'tutoring-basics',
        tags: ['subjects', 'curriculum', 'mathematics', 'english', 'science'],
        difficulty: 'basic',
        clientSegment: 'all',
        featured: true,
        relatedFAQs: ['q2', 'q3'],
        analytics: {
          views: 1500,
          helpful: 120,
          notHelpful: 8,
          trending: true,
          lastViewed: '2025-01-10T12:00:00Z'
        }
      },
      {
        id: 'q2',
        question: 'How do I book a tutoring session?',
        answer: 'You can book a session through our online booking system, by phone, or via email. We offer flexible scheduling options.',
        category: 'tutoring-basics',
        tags: ['booking', 'scheduling', 'online', 'phone', 'email'],
        difficulty: 'basic',
        clientSegment: 'all',
        featured: false,
        relatedFAQs: ['q1', 'q4'],
        analytics: {
          views: 1200,
          helpful: 95,
          notHelpful: 12,
          trending: false,
          lastViewed: '2025-01-10T11:30:00Z'
        }
      }
    ]
  },
  {
    id: 'pricing-payments',
    title: 'Pricing & Payments',
    description: 'Information about our pricing structure and payment options',
    icon: 'Banknote',
    questions: [
      {
        id: 'q3',
        question: 'What are your tutoring rates?',
        answer: 'Our rates vary by subject and level. We offer competitive pricing with packages available for regular sessions.',
        category: 'pricing-payments',
        tags: ['rates', 'pricing', 'packages', 'cost'],
        difficulty: 'basic',
        clientSegment: 'comparison_shopper',
        featured: true,
        relatedFAQs: ['q4', 'q5'],
        analytics: {
          views: 2000,
          helpful: 180,
          notHelpful: 15,
          trending: true,
          lastViewed: '2025-01-10T13:00:00Z'
        }
      },
      {
        id: 'q4',
        question: 'Do you offer payment plans?',
        answer: 'Yes, we offer flexible payment plans including monthly packages and term-based payments to make tutoring more affordable.',
        category: 'pricing-payments',
        tags: ['payment', 'plans', 'monthly', 'affordable', 'flexible'],
        difficulty: 'intermediate',
        clientSegment: 'comparison_shopper',
        featured: false,
        relatedFAQs: ['q3'],
        analytics: {
          views: 800,
          helpful: 65,
          notHelpful: 5,
          trending: false,
          lastViewed: '2025-01-10T10:45:00Z'
        }
      }
    ]
  }
]

describe('FAQ Recommendation Engine', () => {
  let engine: FAQRecommendationEngine
  let sessionId: string

  beforeEach(() => {
    engine = new FAQRecommendationEngine()
    sessionId = 'test-session-123'
    engine.initialize(mockFAQData)
    engine.initializeUserSession(sessionId, 'comparison_shopper', 'direct')
  })

  describe('TF-IDF Calculator', () => {
    let tfidfCalculator: TFIDFCalculator
    let textProcessor: TextProcessor

    beforeEach(() => {
      tfidfCalculator = new TFIDFCalculator()
      textProcessor = new TextProcessor()
      const questions = mockFAQData.flatMap(cat => cat.questions)
      tfidfCalculator.buildVocabulary(questions)
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing text processing functionality
    it('should correctly tokenize text', () => {
      const text = 'What are your tutoring rates for mathematics?'
      const tokens = textProcessor.tokenize(text)
      
      expect(tokens).toContain('tutoring')
      expect(tokens).toContain('rates')
      expect(tokens).toContain('mathematics')
      expect(tokens).not.toContain('what') // Stop word should be filtered
      expect(tokens).not.toContain('are') // Stop word should be filtered
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing TF-IDF vector generation
    it('should generate TF-IDF vectors with correct structure', () => {
      const question = mockFAQData[0].questions[0]
      const vector = tfidfCalculator.generateTFIDFVector(question)
      
      expect(vector.documentId).toBe(question.id)
      expect(vector.magnitude).toBeGreaterThan(0)
      expect(vector.terms.size).toBeGreaterThan(0)
      
      // Check that important terms have TF-IDF scores
      const hasSubjectTerms = Array.from(vector.terms.keys()).some(term => 
        ['tutoring', 'mathematics', 'subjects'].includes(term)
      )
      expect(hasSubjectTerms).toBe(true)
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing cosine similarity calculation
    it('should calculate cosine similarity between similar documents', () => {
      const q1 = mockFAQData[0].questions[0] // About subjects
      const q3 = mockFAQData[1].questions[0] // About rates
      
      const vector1 = tfidfCalculator.generateTFIDFVector(q1)
      const vector2 = tfidfCalculator.generateTFIDFVector(q3)
      
      const similarity = tfidfCalculator.calculateCosineSimilarity(vector1, vector2)
      
      expect(similarity).toBeGreaterThanOrEqual(0)
      expect(similarity).toBeLessThanOrEqual(1)
      
      // Similar documents should have higher similarity than random content
      expect(similarity).toBeGreaterThan(0.1) // Some similarity due to common tutoring terms
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing identical document similarity
    it('should return 1.0 similarity for identical documents', () => {
      const question = mockFAQData[0].questions[0]
      const vector = tfidfCalculator.generateTFIDFVector(question)
      
      const similarity = tfidfCalculator.calculateCosineSimilarity(vector, vector)
      expect(similarity).toBeCloseTo(1.0, 5)
    })
  })

  describe('Behaviour Tracker', () => {
    let behaviourTracker: BehaviourTracker

    beforeEach(() => {
      behaviourTracker = new BehaviourTracker()
      behaviourTracker.initializeSession(sessionId, 'comparison_shopper', 'search')
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing user behaviour tracking
    it('should track user session initialization', () => {
      const behaviour = behaviourTracker.getBehaviour(sessionId)
      
      expect(behaviour).toBeDefined()
      expect(behaviour!.sessionId).toBe(sessionId)
      expect(behaviour!.clientSegment).toBe('comparison_shopper')
      expect(behaviour!.entryPoint).toBe('search')
      expect(behaviour!.viewedQuestions).toHaveLength(0)
      expect(behaviour!.searchQueries).toHaveLength(0)
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing question view tracking
    it('should track question views and time spent', () => {
      const questionId = 'q1'
      const timeSpent = 45

      behaviourTracker.trackQuestionView(sessionId, questionId, timeSpent)
      
      const behaviour = behaviourTracker.getBehaviour(sessionId)
      expect(behaviour!.viewedQuestions).toContain(questionId)
      expect(behaviour!.timeSpent.get(questionId)).toBe(timeSpent)
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing search query tracking
    it('should track search queries', () => {
      const searchQueries = ['tutoring rates', 'mathematics help', 'payment plans']
      
      searchQueries.forEach(query => {
        behaviourTracker.trackSearchQuery(sessionId, query)
      })
      
      const behaviour = behaviourTracker.getBehaviour(sessionId)
      expect(behaviour!.searchQueries).toHaveLength(3)
      expect(behaviour!.searchQueries).toEqual(searchQueries.map(q => q.toLowerCase()))
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing recommendation click tracking
    it('should track recommendation clicks', () => {
      const questionId = 'q2'
      
      behaviourTracker.trackRecommendationClick(sessionId, questionId)
      behaviourTracker.trackRecommendationClick(sessionId, questionId)
      
      const behaviour = behaviourTracker.getBehaviour(sessionId)
      expect(behaviour!.clickThroughRate.get(questionId)).toBe(2)
    })
  })

  describe('Recommendation Generation', () => {
    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing core recommendation functionality
    it('should generate content-based recommendations', () => {
      const targetQuestion = mockFAQData[0].questions[0] // About subjects
      const recommendations = engine.generateRecommendations(targetQuestion, sessionId)
      
      expect(recommendations).toBeDefined()
      expect(recommendations.length).toBeGreaterThan(0)
      expect(recommendations.length).toBeLessThanOrEqual(5) // Max recommendations
      
      // Should not include the target question
      const recommendedIds = recommendations.map(r => r.question.id)
      expect(recommendedIds).not.toContain(targetQuestion.id)
      
      // Should have similarity scores
      recommendations.forEach(rec => {
        expect(rec.score).toBeGreaterThanOrEqual(0)
        expect(rec.score).toBeLessThanOrEqual(1)
        expect(rec.confidence).toBeGreaterThanOrEqual(0)
        expect(rec.confidence).toBeLessThanOrEqual(1)
        expect(['content_similarity', 'user_behaviour', 'client_segment', 'trending', 'helpful'])
          .toContain(rec.reason)
      })
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing client segmentation
    it('should prioritize recommendations for client segment', () => {
      const targetQuestion = mockFAQData[1].questions[0] // Pricing question
      const recommendations = engine.generateRecommendations(targetQuestion, sessionId)
      
      // Should include questions relevant to 'comparison_shopper' segment
      const hasSegmentRelevantRecs = recommendations.some(rec => 
        rec.question.clientSegment === 'comparison_shopper' || 
        rec.question.clientSegment === 'all'
      )
      expect(hasSegmentRelevantRecs).toBe(true)
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing performance requirements
    it('should generate recommendations within performance threshold', () => {
      const targetQuestion = mockFAQData[0].questions[0]
      const startTime = Date.now()
      
      const recommendations = engine.generateRecommendations(targetQuestion, sessionId)
      
      const endTime = Date.now()
      const duration = endTime - startTime
      
      expect(duration).toBeLessThan(100) // <100ms requirement
      expect(recommendations).toBeDefined()
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing related questions functionality
    it('should find related questions', () => {
      const questionId = 'q1'
      const related = engine.getRelatedQuestions(questionId, 3)
      
      expect(related).toBeDefined()
      expect(related.length).toBeGreaterThan(0)
      expect(related.length).toBeLessThanOrEqual(3)
      
      // Should not include the original question
      const relatedIds = related.map(r => r.question.id)
      expect(relatedIds).not.toContain(questionId)
      
      // Should be content-similarity based
      related.forEach(rec => {
        expect(rec.reason).toBe('content_similarity')
      })
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing popular in category functionality
    it('should find popular questions in category', () => {
      const categoryId = 'tutoring-basics'
      const popular = engine.getPopularInCategory(categoryId, [], 5)
      
      expect(popular).toBeDefined()
      expect(popular.length).toBeGreaterThan(0)
      
      // All results should be from the specified category
      popular.forEach(rec => {
        expect(rec.question.category).toBe(categoryId)
        expect(rec.reason).toBe('trending')
      })
      
      // Should be sorted by popularity (views)
      for (let i = 1; i < popular.length; i++) {
        expect(popular[i-1].question.analytics.views)
          .toBeGreaterThanOrEqual(popular[i].question.analytics.views)
      }
    })
  })

  describe('A/B Testing Framework', () => {
    let abManager: FAQABTestingManager

    beforeEach(() => {
      abManager = new FAQABTestingManager()
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing A/B test creation
    it('should create A/B test experiments', () => {
      const experimentConfig = {
        id: 'test-experiment',
        name: 'Recommendation Algorithm Test',
        description: 'Test different recommendation strategies',
        startDate: new Date(),
        minSampleSize: 100,
        significanceLevel: 0.05,
        powerLevel: 0.8,
        primaryMetric: 'conversionRate' as const,
        isActive: true,
        variants: [
          {
            id: 'control',
            name: 'Control',
            description: 'Current algorithm',
            config: { maxRecommendations: 5, contentWeight: 0.6, behaviourWeight: 0.4 },
            weight: 0.5,
            isActive: true
          },
          {
            id: 'treatment',
            name: 'Treatment',
            description: 'New algorithm',
            config: { maxRecommendations: 3, contentWeight: 0.8, behaviourWeight: 0.2 },
            weight: 0.5,
            isActive: true
          }
        ]
      }

      expect(() => {
        abManager.createExperiment(experimentConfig)
      }).not.toThrow()
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing user assignment
    it('should assign users to variants consistently', () => {
      const experimentConfig = {
        id: 'consistency-test',
        name: 'Consistency Test',
        description: 'Test user assignment consistency',
        startDate: new Date(),
        minSampleSize: 100,
        significenceLevel: 0.05,
        powerLevel: 0.8,
        primaryMetric: 'conversionRate' as const,
        isActive: true,
        variants: [
          {
            id: 'variant-a',
            name: 'Variant A',
            description: 'First variant',
            config: { maxRecommendations: 5 },
            weight: 0.5,
            isActive: true
          },
          {
            id: 'variant-b',
            name: 'Variant B', 
            description: 'Second variant',
            config: { maxRecommendations: 3 },
            weight: 0.5,
            isActive: true
          }
        ]
      }

      abManager.createExperiment(experimentConfig)

      const userId = 'test-user-123'
      const sessionId = 'test-session-456'
      
      // Multiple assignments should be consistent
      const variant1 = abManager.assignUserToVariant(userId, sessionId, 'consistency-test')
      const variant2 = abManager.assignUserToVariant(userId, sessionId, 'consistency-test')
      
      expect(variant1).toBe(variant2)
      expect(['variant-a', 'variant-b']).toContain(variant1)
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing statistical analysis
    it('should perform statistical analysis', () => {
      // Test Z-test calculation
      const result = StatisticalAnalyzer.calculateZTest(50, 1000, 60, 1000)
      
      expect(result.zScore).toBeDefined()
      expect(result.pValue).toBeDefined()
      expect(result.isSignificant).toBeDefined()
      expect(result.pValue).toBeGreaterThanOrEqual(0)
      expect(result.pValue).toBeLessThanOrEqual(1)
    })
  })

  describe('Performance Optimization', () => {
    let optimiser: FAQRecommendationOptimiser

    beforeEach(() => {
      optimiser = new FAQRecommendationOptimiser()
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing device capability detection
    it('should detect device capabilities', () => {
      const detector = DeviceCapabilityDetector.getInstance()
      const capabilities = detector.detectDeviceCapabilities()
      
      expect(capabilities.deviceType).toMatch(/^(mobile|tablet|desktop)$/)
      expect(capabilities.connectionType).toMatch(/^(slow-2g|2g|3g|4g|5g|wifi)$/)
      expect(capabilities.memoryConstraint).toMatch(/^(low|normal|high)$/)
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing optimized recommendation generation
    it('should generate recommendations with performance metrics', async () => {
      const targetQuestion = mockFAQData[0].questions[0]
      
      const result = await optimiser.generateOptimizedRecommendations(
        engine,
        targetQuestion,
        sessionId
      )
      
      expect(result.recommendations).toBeDefined()
      expect(result.metrics).toBeDefined()
      expect(result.metrics.recommendationTime).toBeGreaterThan(0)
      expect(result.metrics.batteryImpact).toMatch(/^(low|medium|high)$/)
      expect(result.metrics.timestamp).toBeInstanceOf(Date)
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing performance reporting
    it('should provide performance reports', () => {
      const report = optimiser.getPerformanceReport()
      
      expect(report.averageResponseTime).toBeDefined()
      expect(report.cacheHitRate).toBeDefined()
      expect(report.batteryImpact).toBeDefined()
      expect(report.currentStrategy).toBeDefined()
      expect(report.deviceCapabilities).toBeDefined()
    })
  })

  describe('Error Handling', () => {
    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing error scenarios
    it('should handle empty categories gracefully', () => {
      const emptyEngine = new FAQRecommendationEngine()
      emptyEngine.initialize([])
      
      const targetQuestion = mockFAQData[0].questions[0]
      const recommendations = emptyEngine.generateRecommendations(targetQuestion, sessionId)
      
      expect(recommendations).toEqual([])
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing invalid session handling
    it('should handle invalid session IDs', () => {
      const targetQuestion = mockFAQData[0].questions[0]
      const recommendations = engine.generateRecommendations(targetQuestion, 'invalid-session')
      
      expect(recommendations).toBeDefined()
      // Should still return recommendations even with invalid session
    })

    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing malformed question data
    it('should handle malformed question data', () => {
      const malformedQuestion = {
        id: 'malformed',
        question: '',
        answer: '',
        category: '',
        tags: [],
        difficulty: 'basic',
        clientSegment: 'all',
        featured: false,
        relatedFAQs: [],
        analytics: {
          views: 0,
          helpful: 0,
          notHelpful: 0,
          trending: false,
          lastViewed: ''
        }
      } as FAQQuestion

      const recommendations = engine.generateRecommendations(malformedQuestion, sessionId)
      
      expect(recommendations).toBeDefined()
      expect(Array.isArray(recommendations)).toBe(true)
    })
  })

  describe('Integration Testing', () => {
    // CONTEXT7 SOURCE: /reactjs/react.dev - Testing end-to-end recommendation flow
    it('should provide complete recommendation flow', () => {
      // Simulate user interaction flow
      const targetQuestion = mockFAQData[0].questions[0]
      
      // 1. Generate initial recommendations
      const recommendations = engine.generateRecommendations(targetQuestion, sessionId)
      expect(recommendations.length).toBeGreaterThan(0)
      
      // 2. Track user viewing a recommendation
      const viewedQuestionId = recommendations[0].question.id
      engine.trackQuestionView(sessionId, viewedQuestionId, 30)
      
      // 3. Track user searching
      engine.trackSearchQuery(sessionId, 'payment plans')
      
      // 4. Track recommendation click
      engine.trackRecommendationClick(sessionId, viewedQuestionId)
      
      // 5. Generate new recommendations based on behaviour
      const newRecommendations = engine.generateRecommendations(targetQuestion, sessionId)
      expect(newRecommendations).toBeDefined()
      
      // Behaviour should influence new recommendations
      expect(newRecommendations.some(rec => rec.reason === 'user_behaviour')).toBe(true)
    })
  })
})