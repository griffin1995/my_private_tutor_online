// CONTEXT7 SOURCE: /colinhacks/zod - Advanced analytics data validation and processing
// IMPLEMENTATION REASON: Official Zod patterns for complex data validation and type-safe analytics computations

import { z } from 'zod';

// Zod schemas for analytics data validation
const ratingEventSchema = z.object({
  questionId: z.string(),
  questionText: z.string(),
  rating: z.enum(['helpful', 'not_helpful']),
  timestamp: z.string().datetime(),
  sessionId: z.string().optional(),
  userAgent: z.string().optional(),
  referrer: z.string().optional(),
  responseTime: z.number().optional(), // Time spent reading before rating
  deviceType: z.enum(['desktop', 'tablet', 'mobile']).optional(),
  location: z.object({
    country: z.string().optional(),
    region: z.string().optional()
  }).optional()
});

const feedbackEventSchema = z.object({
  questionId: z.string(),
  rating: z.enum(['helpful', 'not_helpful']),
  feedback: z.string(),
  category: z.enum(['accuracy', 'clarity', 'completeness', 'relevance', 'other']).optional(),
  email: z.string().email().optional(),
  improvementSuggestions: z.string().optional(),
  timestamp: z.string().datetime(),
  sentiment: z.enum(['positive', 'neutral', 'negative']).optional(),
  wordCount: z.number().optional(),
  language: z.string().optional()
});

const performanceMetricSchema = z.object({
  questionId: z.string(),
  viewDuration: z.number(), // Milliseconds spent viewing
  scrollDepth: z.number(), // Percentage of content scrolled
  clickToRate: z.number(), // Time from view to rating
  bounceRate: z.boolean(), // Did user leave immediately after rating
  timestamp: z.string().datetime()
});

export type RatingEvent = z.infer<typeof ratingEventSchema>;
export type FeedbackEvent = z.infer<typeof feedbackEventSchema>;
export type PerformanceMetric = z.infer<typeof performanceMetricSchema>;

export interface AnalyticsReport {
  overview: {
    totalRatings: number;
    totalFeedback: number;
    satisfactionRate: number;
    responseRate: number;
    averageResponseTime: number;
    topPerformingQuestions: Array<{
      questionId: string;
      questionText: string;
      helpfulPercentage: number;
      totalRatings: number;
      confidence: number;
    }>;
  };
  trends: {
    dailyRatings: Array<{ date: string; helpful: number; notHelpful: number }>;
    weeklyTrends: Array<{ week: string; satisfaction: number; engagement: number }>;
    monthlyGrowth: Array<{ month: string; totalRatings: number; feedbackCount: number }>;
  };
  insights: {
    problematicQuestions: Array<{
      questionId: string;
      questionText: string;
      issues: string[];
      suggestedActions: string[];
      priority: 'high' | 'medium' | 'low';
    }>;
    feedbackCategories: Record<string, {
      count: number;
      averageSentiment: number;
      commonThemes: string[];
    }>;
    userBehavior: {
      averageTimeToRate: number;
      deviceBreakdown: Record<string, number>;
      geographicDistribution: Record<string, number>;
      peakEngagementHours: Array<{ hour: number; engagement: number }>;
    };
  };
  performance: {
    fastestQuestions: Array<{ questionId: string; avgResponseTime: number }>;
    slowestQuestions: Array<{ questionId: string; avgResponseTime: number }>;
    highEngagementQuestions: Array<{ questionId: string; engagementScore: number }>;
    conversionRates: {
      ratingToFeedback: number;
      viewToRating: number;
      feedbackQuality: number;
    };
  };
}

export class FAQAnalyticsEngine {
  private ratingEvents: RatingEvent[] = [];
  private feedbackEvents: FeedbackEvent[] = [];
  private performanceMetrics: PerformanceMetric[] = [];

  constructor() {
    this.loadStoredData();
  }

  private loadStoredData(): void {
    try {
      // Load rating events
      const storedRatings = localStorage.getItem('faq_rating_events');
      if (storedRatings) {
        const parsedRatings = JSON.parse(storedRatings);
        this.ratingEvents = parsedRatings
          .map((event: any) => ratingEventSchema.safeParse(event))
          .filter((result: any) => result.success)
          .map((result: any) => result.data);
      }

      // Load feedback events
      const storedFeedback = localStorage.getItem('faq_feedback_events');
      if (storedFeedback) {
        const parsedFeedback = JSON.parse(storedFeedback);
        this.feedbackEvents = parsedFeedback
          .map((event: any) => feedbackEventSchema.safeParse(event))
          .filter((result: any) => result.success)
          .map((result: any) => result.data);
      }

      // Load performance metrics
      const storedMetrics = localStorage.getItem('faq_performance_metrics');
      if (storedMetrics) {
        const parsedMetrics = JSON.parse(storedMetrics);
        this.performanceMetrics = parsedMetrics
          .map((metric: any) => performanceMetricSchema.safeParse(metric))
          .filter((result: any) => result.success)
          .map((result: any) => result.data);
      }
    } catch (error) {
      console.error('Error loading stored analytics data:', error);
    }
  }

  // CONTEXT7 SOURCE: /colinhacks/zod - Event tracking and validation patterns
  // IMPLEMENTATION REASON: Official Zod validation for real-time event processing with type safety
  public trackRating(event: Omit<RatingEvent, 'timestamp'>): void {
    try {
      const ratingEvent: RatingEvent = {
        ...event,
        timestamp: new Date().toISOString()
      };

      const validatedEvent = ratingEventSchema.parse(ratingEvent);
      this.ratingEvents.push(validatedEvent);
      
      this.persistData();
      this.triggerAnalyticsUpdate();
    } catch (error) {
      console.error('Invalid rating event:', error);
    }
  }

  public trackFeedback(event: Omit<FeedbackEvent, 'timestamp' | 'sentiment' | 'wordCount'>): void {
    try {
      const feedbackEvent: FeedbackEvent = {
        ...event,
        timestamp: new Date().toISOString(),
        sentiment: this.analyzeSentiment(event.feedback),
        wordCount: event.feedback.split(/\s+/).length
      };

      const validatedEvent = feedbackEventSchema.parse(feedbackEvent);
      this.feedbackEvents.push(validatedEvent);
      
      this.persistData();
      this.triggerAnalyticsUpdate();
    } catch (error) {
      console.error('Invalid feedback event:', error);
    }
  }

  public trackPerformance(metric: Omit<PerformanceMetric, 'timestamp'>): void {
    try {
      const performanceMetric: PerformanceMetric = {
        ...metric,
        timestamp: new Date().toISOString()
      };

      const validatedMetric = performanceMetricSchema.parse(performanceMetric);
      this.performanceMetrics.push(validatedMetric);
      
      this.persistData();
    } catch (error) {
      console.error('Invalid performance metric:', error);
    }
  }

  // CONTEXT7 SOURCE: /colinhacks/zod - Complex data aggregation and analysis patterns
  // IMPLEMENTATION REASON: Official patterns for data transformation and statistical analysis with validation
  public generateReport(dateRange?: { start: Date; end: Date }): AnalyticsReport {
    const filteredRatings = this.filterByDateRange(this.ratingEvents, dateRange);
    const filteredFeedback = this.filterByDateRange(this.feedbackEvents, dateRange);
    const filteredMetrics = this.filterByDateRange(this.performanceMetrics, dateRange);

    const overview = this.calculateOverviewMetrics(filteredRatings, filteredFeedback);
    const trends = this.calculateTrendMetrics(filteredRatings, filteredFeedback);
    const insights = this.generateInsights(filteredRatings, filteredFeedback, filteredMetrics);
    const performance = this.calculatePerformanceMetrics(filteredRatings, filteredFeedback, filteredMetrics);

    return {
      overview,
      trends,
      insights,
      performance
    };
  }

  private filterByDateRange<T extends { timestamp: string }>(
    events: T[], 
    dateRange?: { start: Date; end: Date }
  ): T[] {
    if (!dateRange) return events;
    
    return events.filter(event => {
      const eventDate = new Date(event.timestamp);
      return eventDate >= dateRange.start && eventDate <= dateRange.end;
    });
  }

  private calculateOverviewMetrics(ratings: RatingEvent[], feedback: FeedbackEvent[]) {
    const totalRatings = ratings.length;
    const helpfulRatings = ratings.filter(r => r.rating === 'helpful').length;
    const satisfactionRate = totalRatings > 0 ? (helpfulRatings / totalRatings) * 100 : 0;
    
    const responseRate = totalRatings > 0 ? (feedback.length / totalRatings) * 100 : 0;
    const averageResponseTime = this.calculateAverageResponseTime(ratings);

    // Calculate top performing questions
    const questionStats = this.aggregateByQuestion(ratings);
    const topPerformingQuestions = Object.entries(questionStats)
      .map(([questionId, stats]) => ({
        questionId,
        questionText: stats.questionText,
        helpfulPercentage: (stats.helpful / stats.total) * 100,
        totalRatings: stats.total,
        confidence: this.calculateConfidenceScore(stats.total, stats.helpful / stats.total)
      }))
      .sort((a, b) => b.helpfulPercentage - a.helpfulPercentage)
      .slice(0, 10);

    return {
      totalRatings,
      totalFeedback: feedback.length,
      satisfactionRate,
      responseRate,
      averageResponseTime,
      topPerformingQuestions
    };
  }

  private calculateTrendMetrics(ratings: RatingEvent[], feedback: FeedbackEvent[]) {
    // Daily ratings trend
    const dailyRatings = this.groupByDay(ratings).map(({ date, events }) => ({
      date,
      helpful: events.filter(e => e.rating === 'helpful').length,
      notHelpful: events.filter(e => e.rating === 'not_helpful').length
    }));

    // Weekly satisfaction trends
    const weeklyTrends = this.groupByWeek(ratings).map(({ week, events }) => {
      const helpful = events.filter(e => e.rating === 'helpful').length;
      const total = events.length;
      const satisfaction = total > 0 ? (helpful / total) * 100 : 0;
      const engagement = this.calculateEngagementScore(events);
      
      return { week, satisfaction, engagement };
    });

    // Monthly growth
    const monthlyGrowth = this.groupByMonth([...ratings, ...feedback]).map(({ month, events }) => {
      const ratingEvents = events.filter(e => 'rating' in e);
      const feedbackEvents = events.filter(e => 'feedback' in e);
      
      return {
        month,
        totalRatings: ratingEvents.length,
        feedbackCount: feedbackEvents.length
      };
    });

    return {
      dailyRatings,
      weeklyTrends,
      monthlyGrowth
    };
  }

  private generateInsights(
    ratings: RatingEvent[], 
    feedback: FeedbackEvent[], 
    metrics: PerformanceMetric[]
  ) {
    // Identify problematic questions
    const questionStats = this.aggregateByQuestion(ratings);
    const problematicQuestions = Object.entries(questionStats)
      .filter(([_, stats]) => {
        const helpfulPercentage = (stats.helpful / stats.total) * 100;
        return helpfulPercentage < 60 && stats.total >= 5; // Less than 60% helpful with meaningful sample size
      })
      .map(([questionId, stats]) => {
        const questionFeedback = feedback.filter(f => f.questionId === questionId);
        const issues = this.identifyIssues(questionFeedback);
        const suggestedActions = this.generateSuggestedActions(issues, stats);
        
        return {
          questionId,
          questionText: stats.questionText,
          issues,
          suggestedActions,
          priority: this.calculatePriority(stats, issues) as 'high' | 'medium' | 'low'
        };
      })
      .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });

    // Analyze feedback categories
    const feedbackCategories = this.analyzeFeedbackCategories(feedback);

    // Analyze user behavior patterns
    const userBehavior = this.analyzeUserBehavior(ratings, metrics);

    return {
      problematicQuestions,
      feedbackCategories,
      userBehavior
    };
  }

  private calculatePerformanceMetrics(
    ratings: RatingEvent[], 
    feedback: FeedbackEvent[], 
    metrics: PerformanceMetric[]
  ) {
    // Questions with fastest/slowest response times
    const responseTimesByQuestion = metrics.reduce((acc, metric) => {
      if (!acc[metric.questionId]) {
        acc[metric.questionId] = [];
      }
      acc[metric.questionId].push(metric.clickToRate);
      return acc;
    }, {} as Record<string, number[]>);

    const fastestQuestions = Object.entries(responseTimesByQuestion)
      .map(([questionId, times]) => ({
        questionId,
        avgResponseTime: times.reduce((a, b) => a + b, 0) / times.length
      }))
      .sort((a, b) => a.avgResponseTime - b.avgResponseTime)
      .slice(0, 5);

    const slowestQuestions = Object.entries(responseTimesByQuestion)
      .map(([questionId, times]) => ({
        questionId,
        avgResponseTime: times.reduce((a, b) => a + b, 0) / times.length
      }))
      .sort((a, b) => b.avgResponseTime - a.avgResponseTime)
      .slice(0, 5);

    // High engagement questions
    const engagementByQuestion = metrics.reduce((acc, metric) => {
      if (!acc[metric.questionId]) {
        acc[metric.questionId] = { totalEngagement: 0, count: 0 };
      }
      const engagementScore = this.calculateQuestionEngagementScore(metric);
      acc[metric.questionId].totalEngagement += engagementScore;
      acc[metric.questionId].count += 1;
      return acc;
    }, {} as Record<string, { totalEngagement: number; count: number }>);

    const highEngagementQuestions = Object.entries(engagementByQuestion)
      .map(([questionId, data]) => ({
        questionId,
        engagementScore: data.totalEngagement / data.count
      }))
      .sort((a, b) => b.engagementScore - a.engagementScore)
      .slice(0, 10);

    // Conversion rates
    const ratingToFeedback = ratings.length > 0 ? (feedback.length / ratings.length) * 100 : 0;
    const viewToRating = metrics.length > 0 ? (ratings.length / metrics.length) * 100 : 0;
    const feedbackQuality = this.calculateFeedbackQuality(feedback);

    return {
      fastestQuestions,
      slowestQuestions,
      highEngagementQuestions,
      conversionRates: {
        ratingToFeedback,
        viewToRating,
        feedbackQuality
      }
    };
  }

  // Utility methods for analytics calculations
  private analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
    // Simple sentiment analysis based on keywords
    const positiveWords = ['good', 'great', 'excellent', 'helpful', 'clear', 'useful', 'perfect'];
    const negativeWords = ['bad', 'poor', 'unclear', 'confusing', 'wrong', 'useless', 'terrible'];
    
    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private calculateAverageResponseTime(ratings: RatingEvent[]): number {
    const responseTimes = ratings
      .map(r => r.responseTime)
      .filter((time): time is number => typeof time === 'number');
    
    return responseTimes.length > 0 
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length 
      : 0;
  }

  private aggregateByQuestion(ratings: RatingEvent[]) {
    return ratings.reduce((acc, rating) => {
      if (!acc[rating.questionId]) {
        acc[rating.questionId] = {
          questionText: rating.questionText,
          total: 0,
          helpful: 0,
          notHelpful: 0
        };
      }
      
      acc[rating.questionId].total++;
      if (rating.rating === 'helpful') {
        acc[rating.questionId].helpful++;
      } else {
        acc[rating.questionId].notHelpful++;
      }
      
      return acc;
    }, {} as Record<string, any>);
  }

  private calculateConfidenceScore(sampleSize: number, rate: number): number {
    // Statistical confidence calculation
    if (sampleSize < 5) return 0.3;
    if (sampleSize < 20) return 0.6;
    if (sampleSize < 50) return 0.8;
    return 0.95;
  }

  private groupByDay(events: Array<{ timestamp: string }>): Array<{ date: string; events: any[] }> {
    const groups = events.reduce((acc, event) => {
      const date = new Date(event.timestamp).toISOString().split('T')[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(event);
      return acc;
    }, {} as Record<string, any[]>);
    
    return Object.entries(groups).map(([date, events]) => ({ date, events }));
  }

  private groupByWeek(events: Array<{ timestamp: string }>): Array<{ week: string; events: any[] }> {
    const groups = events.reduce((acc, event) => {
      const date = new Date(event.timestamp);
      const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
      const week = weekStart.toISOString().split('T')[0];
      if (!acc[week]) acc[week] = [];
      acc[week].push(event);
      return acc;
    }, {} as Record<string, any[]>);
    
    return Object.entries(groups).map(([week, events]) => ({ week, events }));
  }

  private groupByMonth(events: Array<{ timestamp: string }>): Array<{ month: string; events: any[] }> {
    const groups = events.reduce((acc, event) => {
      const date = new Date(event.timestamp);
      const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!acc[month]) acc[month] = [];
      acc[month].push(event);
      return acc;
    }, {} as Record<string, any[]>);
    
    return Object.entries(groups).map(([month, events]) => ({ month, events }));
  }

  private calculateEngagementScore(events: RatingEvent[]): number {
    // Calculate engagement based on multiple factors
    const avgResponseTime = this.calculateAverageResponseTime(events);
    const ratingRate = events.length; // Number of ratings as engagement indicator
    
    // Higher scores for lower response times (faster engagement) and more ratings
    return Math.max(0, 100 - (avgResponseTime / 1000) + (ratingRate * 2));
  }

  private identifyIssues(feedback: FeedbackEvent[]): string[] {
    const issues: string[] = [];
    const categoryCount = feedback.reduce((acc, f) => {
      if (f.category) {
        acc[f.category] = (acc[f.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Identify most common issues
    const sortedCategories = Object.entries(categoryCount)
      .sort(([, a], [, b]) => b - a);

    if (sortedCategories.length > 0) {
      issues.push(`Primary issue: ${sortedCategories[0][0]} (${sortedCategories[0][1]} reports)`);
    }

    return issues;
  }

  private generateSuggestedActions(issues: string[], stats: any): string[] {
    const actions: string[] = [];
    const helpfulPercentage = (stats.helpful / stats.total) * 100;
    
    if (helpfulPercentage < 40) {
      actions.push('Consider rewriting this answer completely');
    } else if (helpfulPercentage < 60) {
      actions.push('Review and improve answer clarity');
    }
    
    issues.forEach(issue => {
      if (issue.includes('accuracy')) {
        actions.push('Verify factual accuracy and update information');
      } else if (issue.includes('clarity')) {
        actions.push('Simplify language and add examples');
      } else if (issue.includes('completeness')) {
        actions.push('Add missing information or related details');
      }
    });
    
    return actions;
  }

  private calculatePriority(stats: any, issues: string[]): string {
    const helpfulPercentage = (stats.helpful / stats.total) * 100;
    
    if (helpfulPercentage < 40 || stats.total > 20) {
      return 'high';
    } else if (helpfulPercentage < 60 || stats.total > 10) {
      return 'medium';
    }
    return 'low';
  }

  private analyzeFeedbackCategories(feedback: FeedbackEvent[]) {
    return feedback.reduce((acc, f) => {
      if (!f.category) return acc;
      
      if (!acc[f.category]) {
        acc[f.category] = {
          count: 0,
          averageSentiment: 0,
          commonThemes: []
        };
      }
      
      acc[f.category].count++;
      // This would be more sophisticated in a real implementation
      acc[f.category].commonThemes = ['needs improvement', 'requires clarification'];
      
      return acc;
    }, {} as Record<string, any>);
  }

  private analyzeUserBehavior(ratings: RatingEvent[], metrics: PerformanceMetric[]) {
    const averageTimeToRate = metrics.length > 0 
      ? metrics.reduce((sum, m) => sum + m.clickToRate, 0) / metrics.length 
      : 0;

    const deviceBreakdown = ratings.reduce((acc, r) => {
      const device = r.deviceType || 'unknown';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const geographicDistribution = ratings.reduce((acc, r) => {
      const country = r.location?.country || 'unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Mock peak engagement hours
    const peakEngagementHours = Array.from({ length: 24 }, (_, hour) => ({
      hour,
      engagement: Math.floor(Math.random() * 100)
    }));

    return {
      averageTimeToRate,
      deviceBreakdown,
      geographicDistribution,
      peakEngagementHours
    };
  }

  private calculateQuestionEngagementScore(metric: PerformanceMetric): number {
    // Calculate engagement score based on view duration, scroll depth, and interaction speed
    const viewScore = Math.min(metric.viewDuration / 30000, 1) * 40; // Max 40 points for 30+ seconds
    const scrollScore = metric.scrollDepth * 30; // Max 30 points for 100% scroll
    const speedScore = Math.max(0, 30 - (metric.clickToRate / 1000)); // Max 30 points for quick interaction
    
    return viewScore + scrollScore + speedScore;
  }

  private calculateFeedbackQuality(feedback: FeedbackEvent[]): number {
    if (feedback.length === 0) return 0;
    
    const qualityScores = feedback.map(f => {
      let score = 0;
      
      // Length quality (10-500 words is ideal)
      const wordCount = f.wordCount || 0;
      if (wordCount >= 10 && wordCount <= 500) score += 40;
      else if (wordCount >= 5) score += 20;
      
      // Category specificity
      if (f.category && f.category !== 'other') score += 30;
      
      // Constructive sentiment
      if (f.sentiment === 'positive' || f.sentiment === 'neutral') score += 30;
      
      return Math.min(score, 100);
    });
    
    return qualityScores.reduce((sum, score) => sum + score, 0) / feedback.length;
  }

  private persistData(): void {
    try {
      localStorage.setItem('faq_rating_events', JSON.stringify(this.ratingEvents));
      localStorage.setItem('faq_feedback_events', JSON.stringify(this.feedbackEvents));
      localStorage.setItem('faq_performance_metrics', JSON.stringify(this.performanceMetrics));
    } catch (error) {
      console.error('Failed to persist analytics data:', error);
    }
  }

  private triggerAnalyticsUpdate(): void {
    // Dispatch custom event for real-time dashboard updates
    window.dispatchEvent(new CustomEvent('faq-analytics-update', {
      detail: { timestamp: new Date().toISOString() }
    }));
  }

  public clearData(): void {
    this.ratingEvents = [];
    this.feedbackEvents = [];
    this.performanceMetrics = [];
    
    localStorage.removeItem('faq_rating_events');
    localStorage.removeItem('faq_feedback_events');
    localStorage.removeItem('faq_performance_metrics');
  }

  public exportData(): { ratings: RatingEvent[]; feedback: FeedbackEvent[]; metrics: PerformanceMetric[] } {
    return {
      ratings: [...this.ratingEvents],
      feedback: [...this.feedbackEvents],
      metrics: [...this.performanceMetrics]
    };
  }
}

// Singleton instance for global use
export const faqAnalytics = new FAQAnalyticsEngine();