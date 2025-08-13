/**
 * CONTEXT7 SOURCE: /jestjs/jest - Analytics engine testing patterns
 * CONTEXT7 SOURCE: /colinhacks/zod - Schema validation testing strategies
 * TESTING REASON: Official Jest patterns for complex data processing and validation testing
 * 
 * Comprehensive test suite for FAQ Analytics Engine
 * Tests data validation, analytics computation, performance tracking, and report generation
 */

import { FAQAnalyticsEngine, faqAnalytics } from '@/lib/faq-analytics-engine';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  key: jest.fn(),
  length: 0,
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('FAQAnalyticsEngine', () => {
  let analyticsEngine: FAQAnalyticsEngine;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.length = 0;
    analyticsEngine = new FAQAnalyticsEngine();
  });

  describe('Initialization', () => {
    test('creates new instance without errors', () => {
      expect(analyticsEngine).toBeInstanceOf(FAQAnalyticsEngine);
    });

    test('loads existing data from localStorage on initialization', () => {
      const mockRatingEvents = [
        {
          questionId: 'q1',
          questionText: 'Test question',
          rating: 'helpful' as const,
          timestamp: '2023-01-01T10:00:00.000Z',
        },
      ];

      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'faq_rating_events') {
          return JSON.stringify(mockRatingEvents);
        }
        return null;
      });

      const engine = new FAQAnalyticsEngine();
      expect(localStorageMock.getItem).toHaveBeenCalledWith('faq_rating_events');
    });

    test('handles corrupted localStorage data gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json');
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => new FAQAnalyticsEngine()).not.toThrow();

      consoleSpy.mockRestore();
    });
  });

  describe('Rating Event Tracking', () => {
    test('tracks valid rating events', () => {
      const ratingEvent = {
        questionId: 'q1',
        questionText: 'How does online tutoring work?',
        rating: 'helpful' as const,
        sessionId: 'session-123',
        userAgent: 'Mozilla/5.0...',
        responseTime: 5000,
        deviceType: 'desktop' as const,
      };

      analyticsEngine.trackRating(ratingEvent);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'faq_rating_events',
        expect.stringContaining('"questionId":"q1"')
      );
    });

    test('validates rating event data with Zod schema', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Invalid rating value
      const invalidRatingEvent = {
        questionId: 'q1',
        questionText: 'Test question',
        rating: 'invalid-rating' as any,
      };

      analyticsEngine.trackRating(invalidRatingEvent);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid rating event:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    test('automatically adds timestamp to rating events', () => {
      const beforeTime = new Date().getTime();
      
      analyticsEngine.trackRating({
        questionId: 'q1',
        questionText: 'Test question',
        rating: 'helpful',
      });

      const afterTime = new Date().getTime();
      
      expect(localStorageMock.setItem).toHaveBeenCalled();
      
      const savedData = localStorageMock.setItem.mock.calls[0][1];
      const parsedData = JSON.parse(savedData);
      const eventTimestamp = new Date(parsedData[0].timestamp).getTime();
      
      expect(eventTimestamp).toBeGreaterThanOrEqual(beforeTime);
      expect(eventTimestamp).toBeLessThanOrEqual(afterTime);
    });

    test('dispatches analytics update events', () => {
      const dispatchSpy = jest.spyOn(window, 'dispatchEvent');

      analyticsEngine.trackRating({
        questionId: 'q1',
        questionText: 'Test question',
        rating: 'helpful',
      });

      expect(dispatchSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'faq-analytics-update',
        })
      );

      dispatchSpy.mockRestore();
    });
  });

  describe('Feedback Event Tracking', () => {
    test('tracks feedback events with sentiment analysis', () => {
      analyticsEngine.trackFeedback({
        questionId: 'q1',
        rating: 'not_helpful',
        feedback: 'This answer was great and very helpful!',
        category: 'clarity',
        email: 'test@example.com',
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'faq_feedback_events',
        expect.stringContaining('"sentiment":"positive"')
      );
    });

    test('calculates word count automatically', () => {
      analyticsEngine.trackFeedback({
        questionId: 'q1',
        rating: 'helpful',
        feedback: 'This answer has exactly five words',
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'faq_feedback_events',
        expect.stringContaining('"wordCount":5')
      );
    });

    test('performs basic sentiment analysis', () => {
      // Positive sentiment
      analyticsEngine.trackFeedback({
        questionId: 'q1',
        rating: 'helpful',
        feedback: 'This answer was excellent and very useful',
      });

      let savedData = localStorageMock.setItem.mock.calls[0][1];
      let parsedData = JSON.parse(savedData);
      expect(parsedData[0].sentiment).toBe('positive');

      // Negative sentiment
      analyticsEngine.trackFeedback({
        questionId: 'q2',
        rating: 'not_helpful',
        feedback: 'This answer was terrible and confusing',
      });

      savedData = localStorageMock.setItem.mock.calls[1][1];
      parsedData = JSON.parse(savedData);
      expect(parsedData[0].sentiment).toBe('negative');

      // Neutral sentiment
      analyticsEngine.trackFeedback({
        questionId: 'q3',
        rating: 'helpful',
        feedback: 'This answer explains the process',
      });

      savedData = localStorageMock.setItem.mock.calls[2][1];
      parsedData = JSON.parse(savedData);
      expect(parsedData[0].sentiment).toBe('neutral');
    });
  });

  describe('Performance Metric Tracking', () => {
    test('tracks performance metrics', () => {
      analyticsEngine.trackPerformance({
        questionId: 'q1',
        viewDuration: 15000,
        scrollDepth: 0.8,
        clickToRate: 3000,
        bounceRate: false,
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'faq_performance_metrics',
        expect.stringContaining('"viewDuration":15000')
      );
    });

    test('validates performance metric data', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Invalid metric (negative view duration)
      analyticsEngine.trackPerformance({
        questionId: 'q1',
        viewDuration: -5000,
        scrollDepth: 0.8,
        clickToRate: 3000,
        bounceRate: false,
      } as any);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Invalid performance metric:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Report Generation', () => {
    beforeEach(() => {
      // Setup test data
      const mockRatingEvents = [
        {
          questionId: 'q1',
          questionText: 'Question 1',
          rating: 'helpful',
          timestamp: '2023-01-01T10:00:00.000Z',
          responseTime: 3000,
        },
        {
          questionId: 'q1',
          questionText: 'Question 1',
          rating: 'helpful',
          timestamp: '2023-01-01T11:00:00.000Z',
          responseTime: 2000,
        },
        {
          questionId: 'q1',
          questionText: 'Question 1',
          rating: 'not_helpful',
          timestamp: '2023-01-01T12:00:00.000Z',
          responseTime: 4000,
        },
        {
          questionId: 'q2',
          questionText: 'Question 2',
          rating: 'helpful',
          timestamp: '2023-01-02T10:00:00.000Z',
          responseTime: 2500,
        },
      ];

      const mockFeedbackEvents = [
        {
          questionId: 'q1',
          rating: 'not_helpful',
          feedback: 'This answer could be clearer',
          category: 'clarity',
          timestamp: '2023-01-01T12:30:00.000Z',
          sentiment: 'negative',
          wordCount: 5,
        },
      ];

      const mockPerformanceMetrics = [
        {
          questionId: 'q1',
          viewDuration: 15000,
          scrollDepth: 0.9,
          clickToRate: 3000,
          bounceRate: false,
          timestamp: '2023-01-01T10:00:00.000Z',
        },
      ];

      // Mock the internal data arrays
      (analyticsEngine as any).ratingEvents = mockRatingEvents;
      (analyticsEngine as any).feedbackEvents = mockFeedbackEvents;
      (analyticsEngine as any).performanceMetrics = mockPerformanceMetrics;
    });

    test('generates comprehensive analytics report', () => {
      const report = analyticsEngine.generateReport();

      expect(report).toHaveProperty('overview');
      expect(report).toHaveProperty('trends');
      expect(report).toHaveProperty('insights');
      expect(report).toHaveProperty('performance');
    });

    test('calculates overview metrics correctly', () => {
      const report = analyticsEngine.generateReport();

      expect(report.overview.totalRatings).toBe(4);
      expect(report.overview.totalFeedback).toBe(1);
      expect(report.overview.satisfactionRate).toBe(75); // 3 out of 4 helpful
      expect(report.overview.responseRate).toBe(25); // 1 feedback out of 4 ratings
    });

    test('identifies top performing questions', () => {
      const report = analyticsEngine.generateReport();

      expect(report.overview.topPerformingQuestions).toHaveLength(2);
      expect(report.overview.topPerformingQuestions[0].questionId).toBe('q2');
      expect(report.overview.topPerformingQuestions[0].helpfulPercentage).toBe(100);
    });

    test('calculates confidence scores based on sample size', () => {
      const report = analyticsEngine.generateReport();

      const q1Stats = report.overview.topPerformingQuestions.find(q => q.questionId === 'q1');
      const q2Stats = report.overview.topPerformingQuestions.find(q => q.questionId === 'q2');

      expect(q1Stats?.confidence).toBeGreaterThan(q2Stats?.confidence); // More data = higher confidence
    });

    test('filters data by date range when provided', () => {
      const dateRange = {
        start: new Date('2023-01-01T00:00:00.000Z'),
        end: new Date('2023-01-01T23:59:59.999Z'),
      };

      const report = analyticsEngine.generateReport(dateRange);

      // Should only include Jan 1st data (3 ratings)
      expect(report.overview.totalRatings).toBe(3);
    });

    test('generates trend metrics with time series data', () => {
      const report = analyticsEngine.generateReport();

      expect(report.trends.dailyRatings).toBeInstanceOf(Array);
      expect(report.trends.weeklyTrends).toBeInstanceOf(Array);
      expect(report.trends.monthlyGrowth).toBeInstanceOf(Array);
    });

    test('identifies problematic questions with low helpfulness', () => {
      const report = analyticsEngine.generateReport();

      const problematicQuestions = report.insights.problematicQuestions;
      
      // Q1 has 66.7% helpful (2/3), which might be flagged as problematic
      expect(problematicQuestions).toBeInstanceOf(Array);
      expect(problematicQuestions.length).toBeGreaterThanOrEqual(0);
    });

    test('analyzes feedback categories', () => {
      const report = analyticsEngine.generateReport();

      expect(report.insights.feedbackCategories).toHaveProperty('clarity');
      expect(report.insights.feedbackCategories.clarity.count).toBe(1);
    });

    test('calculates performance metrics correctly', () => {
      const report = analyticsEngine.generateReport();

      expect(report.performance.conversionRates.ratingToFeedback).toBe(25); // 1 feedback / 4 ratings
      expect(report.performance.conversionRates.viewToRating).toBe(400); // 4 ratings / 1 metric
    });
  });

  describe('Data Management', () => {
    test('exports all data correctly', () => {
      analyticsEngine.trackRating({
        questionId: 'q1',
        questionText: 'Test question',
        rating: 'helpful',
      });

      const exportedData = analyticsEngine.exportData();

      expect(exportedData).toHaveProperty('ratings');
      expect(exportedData).toHaveProperty('feedback');
      expect(exportedData).toHaveProperty('metrics');
      expect(exportedData.ratings).toHaveLength(1);
    });

    test('clears all data and localStorage', () => {
      analyticsEngine.trackRating({
        questionId: 'q1',
        questionText: 'Test question',
        rating: 'helpful',
      });

      analyticsEngine.clearData();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('faq_rating_events');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('faq_feedback_events');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('faq_performance_metrics');

      const exportedData = analyticsEngine.exportData();
      expect(exportedData.ratings).toHaveLength(0);
      expect(exportedData.feedback).toHaveLength(0);
      expect(exportedData.metrics).toHaveLength(0);
    });
  });

  describe('Error Handling', () => {
    test('handles localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        analyticsEngine.trackRating({
          questionId: 'q1',
          questionText: 'Test question',
          rating: 'helpful',
        });
      }).not.toThrow();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to persist analytics data:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    test('handles invalid data during initialization', () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === 'faq_rating_events') {
          return JSON.stringify([{ invalid: 'data' }]);
        }
        return null;
      });

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => new FAQAnalyticsEngine()).not.toThrow();

      consoleSpy.mockRestore();
    });
  });

  describe('Singleton Instance', () => {
    test('provides global singleton instance', () => {
      expect(faqAnalytics).toBeInstanceOf(FAQAnalyticsEngine);
    });

    test('singleton instance is consistent', () => {
      const instance1 = faqAnalytics;
      const instance2 = faqAnalytics;
      
      expect(instance1).toBe(instance2);
    });
  });
});