// CONTEXT7 SOURCE: /microsoft/typescript - Jest testing patterns for AI integration systems
// CONTEXT7 SOURCE: /colinhacks/zod - Schema validation testing for AI data structures
// IMPLEMENTATION REASON: Official TypeScript and Zod patterns for comprehensive AI system testing
//
// FAQ AI Integration System Tests
// Complete test suite for vectorization, intent classification, and training data generation
//
// BUSINESS CONTEXT: Ensuring AI system reliability for £381,600 revenue opportunity

import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import {
  FAQAIIntegrationEngine,
  faqAIIntegration,
  FAQAIUtils,
  type FAQEmbedding,
  type IntentClassification,
  type ChatTrainingData,
  type AIResponseConfig
} from '@/lib/faq-ai-integration';

// Mock localStorage for testing
const mockLocalStorage = {
  store: {} as { [key: string]: string },
  getItem: jest.fn((key: string) => mockLocalStorage.store[key] || null),
  setItem: jest.fn((key: string, value: string) => {
    mockLocalStorage.store[key] = value;
  }),
  removeItem: jest.fn((key: string) => {
    delete mockLocalStorage.store[key];
  }),
  clear: jest.fn(() => {
    mockLocalStorage.store = {};
  })
};

// Mock window.localStorage
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

// Mock FAQ content for testing
jest.mock('@/lib/cms/cms-faq', () => ({
  getFAQContent: jest.fn(() => ({
    hero: {
      title: "Test FAQ",
      subtitle: "Test subtitle",
      description: "Test description",
      searchPlaceholder: "Search...",
      backgroundImageKey: "test"
    },
    categories: [
      {
        id: 'service',
        title: 'About the Service',
        name: 'Service Overview',
        description: 'Test service description',
        icon: 'Globe',
        color: '#0f172a',
        order: 1,
        isVisible: true,
        requiresAuth: false,
        analytics: {
          totalViews: 0,
          averageRating: 0,
          popularityRank: 1,
          lastUpdated: "2025-08-11T00:00:00.000Z"
        },
        questions: [
          {
            id: 'test-question-1',
            question: 'What is My Private Tutor Online?',
            answer: 'Test answer about our tutoring service.',
            category: 'service',
            subcategory: 'overview',
            tags: ['service', 'tutoring', 'online'],
            priority: 8,
            searchKeywords: ['tutor', 'service', 'online'],
            relatedFAQs: [],
            lastUpdated: "2025-08-11T00:00:00.000Z",
            createdDate: "2010-01-01T00:00:00.000Z",
            featured: true,
            analytics: {
              views: 0,
              helpful: 0,
              notHelpful: 0,
              lastViewed: undefined,
              trending: false,
              searchRank: undefined
            },
            clientSegment: 'all' as const,
            difficulty: 'basic' as const,
            estimatedReadTime: 1
          }
        ],
        subcategories: [
          {
            id: 'overview',
            name: 'Service Overview',
            description: 'General information',
            order: 1,
            questionCount: 1
          }
        ]
      }
    ],
    contact: {
      title: 'Still Have Questions?',
      description: 'Contact us',
      phone: '+44 20 7123 4567',
      email: 'info@myprivatetutoronline.com',
      buttons: []
    }
  }))
}));

describe('FAQ AI Integration Engine', () => {
  let aiEngine: FAQAIIntegrationEngine;

  beforeEach(() => {
    mockLocalStorage.clear();
    aiEngine = new FAQAIIntegrationEngine();
  });

  describe('System Initialization', () => {
    it('should initialize with default configuration', () => {
      const stats = aiEngine.getSystemStats();
      expect(stats.config.model).toBe('gpt-4o-mini');
      expect(stats.config.temperature).toBe(0.7);
      expect(stats.config.maxTokens).toBe(500);
      expect(stats.config.topK).toBe(5);
      expect(stats.config.confidenceThreshold).toBe(0.7);
      expect(stats.config.fallbackToHuman).toBe(true);
    });

    it('should initialize with custom configuration', () => {
      const customConfig: Partial<AIResponseConfig> = {
        model: 'gpt-4o',
        temperature: 0.5,
        maxTokens: 1000,
        topK: 10,
        confidenceThreshold: 0.8,
        fallbackToHuman: false
      };

      const customEngine = new FAQAIIntegrationEngine(customConfig);
      const stats = customEngine.getSystemStats();
      
      expect(stats.config.model).toBe('gpt-4o');
      expect(stats.config.temperature).toBe(0.5);
      expect(stats.config.maxTokens).toBe(1000);
      expect(stats.config.topK).toBe(10);
      expect(stats.config.confidenceThreshold).toBe(0.8);
      expect(stats.config.fallbackToHuman).toBe(false);
    });
  });

  describe('FAQ Embeddings Generation', () => {
    it('should generate embeddings for FAQ content', async () => {
      await aiEngine.generateFAQEmbeddings();
      const stats = aiEngine.getSystemStats();

      // Should have embeddings for question, answer, and combined content
      expect(stats.embeddings).toBeGreaterThan(0);
      expect(stats.embeddings).toBe(3); // 3 embeddings per question (question, answer, combined)
    });

    it('should create valid embedding objects', async () => {
      await aiEngine.generateFAQEmbeddings();
      const data = aiEngine.exportAITrainingData();
      
      expect(data.embeddings).toBeDefined();
      expect(data.embeddings.length).toBeGreaterThan(0);

      const embedding = data.embeddings[0];
      expect(embedding).toHaveProperty('id');
      expect(embedding).toHaveProperty('questionId');
      expect(embedding).toHaveProperty('content');
      expect(embedding).toHaveProperty('contentType');
      expect(embedding).toHaveProperty('embedding');
      expect(embedding).toHaveProperty('metadata');
      expect(embedding).toHaveProperty('createdAt');
      expect(embedding).toHaveProperty('updatedAt');

      // Validate embedding vector
      expect(Array.isArray(embedding.embedding)).toBe(true);
      expect(embedding.embedding.length).toBe(1536); // OpenAI embedding dimension
      expect(embedding.embedding.every(val => typeof val === 'number')).toBe(true);
    });

    it('should persist embeddings to storage', async () => {
      await aiEngine.generateFAQEmbeddings();
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'faq_ai_embeddings',
        expect.any(String)
      );

      const storedData = mockLocalStorage.getItem('faq_ai_embeddings');
      expect(storedData).toBeDefined();
      
      const parsedData = JSON.parse(storedData as string);
      expect(Array.isArray(parsedData)).toBe(true);
      expect(parsedData.length).toBeGreaterThan(0);
    });
  });

  describe('Intent Classification', () => {
    it('should initialize intent classifications', () => {
      const stats = aiEngine.getSystemStats();
      expect(stats.intents).toBeGreaterThan(0);
    });

    it('should classify user intents correctly', async () => {
      const result = await aiEngine.classifyIntent('What is My Private Tutor Online?');
      
      expect(result).toBeDefined();
      expect(result).toHaveProperty('intent');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('explanation');
      
      expect(result!.confidence).toBeGreaterThan(0);
      expect(result!.confidence).toBeLessThanOrEqual(1);
    });

    it('should handle greeting intents', async () => {
      const result = await aiEngine.classifyIntent('Hello');
      
      expect(result).toBeDefined();
      expect(result!.intent.name).toBe('Greeting');
      expect(result!.confidence).toBeGreaterThan(0.5);
    });

    it('should handle goodbye intents', async () => {
      const result = await aiEngine.classifyIntent('Thank you, goodbye');
      
      expect(result).toBeDefined();
      expect(result!.intent.name).toBe('Goodbye');
      expect(result!.confidence).toBeGreaterThan(0.5);
    });

    it('should return null for low confidence queries', async () => {
      const result = await aiEngine.classifyIntent('asdfghjkl random nonsense');
      expect(result).toBeNull();
    });
  });

  describe('Training Data Generation', () => {
    it('should generate training data from FAQ content', async () => {
      await aiEngine.generateTrainingData();
      const stats = aiEngine.getSystemStats();

      expect(stats.trainingData).toBeGreaterThan(0);
    });

    it('should create valid training data objects', async () => {
      await aiEngine.generateTrainingData();
      const data = aiEngine.exportAITrainingData();
      
      expect(data.trainingData).toBeDefined();
      expect(data.trainingData.length).toBeGreaterThan(0);

      const trainingExample = data.trainingData[0];
      expect(trainingExample).toHaveProperty('id');
      expect(trainingExample).toHaveProperty('input');
      expect(trainingExample).toHaveProperty('intent');
      expect(trainingExample).toHaveProperty('output');
      expect(trainingExample).toHaveProperty('context');
      expect(trainingExample).toHaveProperty('metadata');
      expect(trainingExample).toHaveProperty('createdAt');
      expect(trainingExample).toHaveProperty('updatedAt');

      // Validate metadata structure
      expect(trainingExample.metadata).toHaveProperty('quality');
      expect(trainingExample.metadata).toHaveProperty('source');
      expect(trainingExample.metadata).toHaveProperty('difficulty');
      expect(trainingExample.metadata).toHaveProperty('clientSegment');
      expect(trainingExample.metadata).toHaveProperty('validated');
    });
  });

  describe('Semantic Search', () => {
    beforeEach(async () => {
      await aiEngine.generateFAQEmbeddings();
    });

    it('should find similar FAQs', async () => {
      const results = await aiEngine.searchSimilarFAQs('tutoring service information');
      
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      
      if (results.length > 0) {
        const result = results[0];
        expect(result).toHaveProperty('question');
        expect(result).toHaveProperty('similarity');
        expect(result).toHaveProperty('confidence');
        
        expect(result.similarity).toBeGreaterThan(0);
        expect(result.similarity).toBeLessThanOrEqual(1);
        expect(result.confidence).toBeGreaterThan(0);
        expect(result.confidence).toBeLessThanOrEqual(1);
      }
    });

    it('should respect search options', async () => {
      const results = await aiEngine.searchSimilarFAQs('tutoring service', {
        topK: 2,
        category: 'service',
        minConfidence: 0.3
      });
      
      expect(results.length).toBeLessThanOrEqual(2);
      results.forEach(result => {
        expect(result.confidence).toBeGreaterThanOrEqual(0.3);
      });
    });

    it('should return empty array for no matches', async () => {
      const results = await aiEngine.searchSimilarFAQs('complete nonsense query', {
        minConfidence: 0.9
      });
      
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });
  });

  describe('AI Response Generation', () => {
    beforeEach(async () => {
      await aiEngine.generateFAQEmbeddings();
      await aiEngine.generateTrainingData();
    });

    it('should generate AI responses', async () => {
      const response = await aiEngine.generateAIResponse('What is My Private Tutor Online?');
      
      expect(response).toBeDefined();
      expect(response).toHaveProperty('response');
      expect(response).toHaveProperty('confidence');
      expect(response).toHaveProperty('usedFAQs');
      expect(response).toHaveProperty('fallbackToHuman');
      expect(response).toHaveProperty('metadata');

      expect(typeof response.response).toBe('string');
      expect(response.response.length).toBeGreaterThan(0);
      expect(response.confidence).toBeGreaterThan(0);
      expect(response.confidence).toBeLessThanOrEqual(1);
      expect(Array.isArray(response.usedFAQs)).toBe(true);
      expect(typeof response.fallbackToHuman).toBe('boolean');
    });

    it('should include metadata in responses', async () => {
      const response = await aiEngine.generateAIResponse('Hello');
      
      expect(response.metadata).toBeDefined();
      expect(response.metadata).toHaveProperty('model');
      expect(response.metadata).toHaveProperty('tokensUsed');
      expect(response.metadata).toHaveProperty('responseTime');
      expect(response.metadata).toHaveProperty('contextSources');

      expect(Array.isArray(response.metadata.contextSources)).toBe(true);
      expect(typeof response.metadata.responseTime).toBe('number');
      expect(response.metadata.responseTime).toBeGreaterThan(0);
    });

    it('should fallback to human for low confidence queries', async () => {
      const lowConfidenceEngine = new FAQAIIntegrationEngine({
        confidenceThreshold: 0.95,
        fallbackToHuman: true
      });

      const response = await lowConfidenceEngine.generateAIResponse('random nonsense query');
      
      expect(response.fallbackToHuman).toBe(true);
      expect(response.response).toContain('info@myprivatetutoronline.com');
    });
  });

  describe('Data Export and Management', () => {
    beforeEach(async () => {
      await aiEngine.generateFAQEmbeddings();
      await aiEngine.generateTrainingData();
    });

    it('should export complete training data', () => {
      const exportData = aiEngine.exportAITrainingData();
      
      expect(exportData).toHaveProperty('embeddings');
      expect(exportData).toHaveProperty('intents');
      expect(exportData).toHaveProperty('trainingData');
      expect(exportData).toHaveProperty('config');
      expect(exportData).toHaveProperty('metadata');

      expect(exportData.metadata).toHaveProperty('exportDate');
      expect(exportData.metadata).toHaveProperty('version');
      expect(exportData.metadata).toHaveProperty('totalQuestions');
      expect(exportData.metadata).toHaveProperty('totalEmbeddings');
      expect(exportData.metadata).toHaveProperty('totalIntents');
      expect(exportData.metadata).toHaveProperty('totalTrainingExamples');

      expect(exportData.embeddings.length).toBeGreaterThan(0);
      expect(exportData.intents.length).toBeGreaterThan(0);
      expect(exportData.trainingData.length).toBeGreaterThan(0);
    });

    it('should provide system statistics', () => {
      const stats = aiEngine.getSystemStats();
      
      expect(stats).toHaveProperty('embeddings');
      expect(stats).toHaveProperty('intents');
      expect(stats).toHaveProperty('trainingData');
      expect(stats).toHaveProperty('config');
      expect(stats).toHaveProperty('storageSize');

      expect(stats.storageSize).toHaveProperty('embeddings');
      expect(stats.storageSize).toHaveProperty('intents');
      expect(stats.storageSize).toHaveProperty('trainingData');
      expect(stats.storageSize).toHaveProperty('total');

      expect(typeof stats.storageSize.total).toBe('number');
      expect(stats.storageSize.total).toBeGreaterThan(0);
    });

    it('should clear all data', () => {
      const statsBefore = aiEngine.getSystemStats();
      expect(statsBefore.embeddings).toBeGreaterThan(0);

      aiEngine.clearAllData();

      const statsAfter = aiEngine.getSystemStats();
      expect(statsAfter.embeddings).toBe(0);
      expect(statsAfter.intents).toBe(0);
      expect(statsAfter.trainingData).toBe(0);

      // Check localStorage was cleared
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('faq_ai_embeddings');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('faq_ai_intents');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('faq_ai_training_data');
    });
  });

  describe('FAQ AI Utils', () => {
    it('should prepare system for chat widget', async () => {
      const preparation = await FAQAIUtils.prepareForChatWidget();
      
      expect(preparation).toHaveProperty('ready');
      expect(preparation).toHaveProperty('embeddings');
      expect(preparation).toHaveProperty('intents');
      expect(preparation).toHaveProperty('trainingData');

      expect(typeof preparation.ready).toBe('boolean');
      expect(typeof preparation.embeddings).toBe('number');
      expect(typeof preparation.intents).toBe('number');
      expect(typeof preparation.trainingData).toBe('number');

      if (preparation.ready) {
        expect(preparation.embeddings).toBeGreaterThan(0);
        expect(preparation.trainingData).toBeGreaterThan(0);
      }
    });

    it('should provide chat integration points', () => {
      const integrationPoints = FAQAIUtils.getChatIntegrationPoints();
      
      expect(integrationPoints).toHaveProperty('faqPageHeader');
      expect(integrationPoints).toHaveProperty('faqSearchArea');
      expect(integrationPoints).toHaveProperty('faqFooter');
      expect(integrationPoints).toHaveProperty('globalChat');

      // Validate structure of integration points
      Object.values(integrationPoints).forEach(point => {
        expect(point).toHaveProperty('position');
        expect(point).toHaveProperty('component');
        expect(point).toHaveProperty('props');
      });
    });
  });

  describe('Data Validation and Schema Compliance', () => {
    beforeEach(async () => {
      await aiEngine.generateFAQEmbeddings();
      await aiEngine.generateTrainingData();
    });

    it('should validate embedding schema compliance', () => {
      const data = aiEngine.exportAITrainingData();
      
      data.embeddings.forEach(embedding => {
        // Test required fields
        expect(embedding.id).toBeDefined();
        expect(embedding.questionId).toBeDefined();
        expect(embedding.content).toBeDefined();
        expect(embedding.contentType).toBeDefined();
        expect(embedding.embedding).toBeDefined();
        expect(embedding.metadata).toBeDefined();
        expect(embedding.createdAt).toBeDefined();
        expect(embedding.updatedAt).toBeDefined();

        // Test field types
        expect(typeof embedding.id).toBe('string');
        expect(typeof embedding.questionId).toBe('string');
        expect(typeof embedding.content).toBe('string');
        expect(['question', 'answer', 'combined']).toContain(embedding.contentType);
        expect(Array.isArray(embedding.embedding)).toBe(true);
        expect(embedding.embedding.length).toBe(1536);
        
        // Test metadata structure
        expect(embedding.metadata.category).toBeDefined();
        expect(embedding.metadata.priority).toBeDefined();
        expect(embedding.metadata.clientSegment).toBeDefined();
        expect(Array.isArray(embedding.metadata.tags)).toBe(true);
        expect(['basic', 'intermediate', 'advanced']).toContain(embedding.metadata.difficulty);
      });
    });

    it('should validate intent schema compliance', () => {
      const data = aiEngine.exportAITrainingData();
      
      data.intents.forEach(intent => {
        // Test required fields
        expect(intent.id).toBeDefined();
        expect(intent.name).toBeDefined();
        expect(intent.description).toBeDefined();
        expect(intent.category).toBeDefined();
        expect(intent.keywords).toBeDefined();
        expect(intent.patterns).toBeDefined();
        expect(intent.confidence).toBeDefined();
        expect(intent.responses).toBeDefined();
        expect(intent.followUpQuestions).toBeDefined();
        expect(intent.businessPriority).toBeDefined();

        // Test field types and constraints
        expect(typeof intent.id).toBe('string');
        expect(typeof intent.name).toBe('string');
        expect(typeof intent.description).toBe('string');
        expect(Array.isArray(intent.keywords)).toBe(true);
        expect(Array.isArray(intent.patterns)).toBe(true);
        expect(Array.isArray(intent.responses)).toBe(true);
        expect(Array.isArray(intent.followUpQuestions)).toBe(true);
        expect(typeof intent.confidence).toBe('number');
        expect(intent.confidence).toBeGreaterThanOrEqual(0);
        expect(intent.confidence).toBeLessThanOrEqual(1);
        expect(['high', 'medium', 'low']).toContain(intent.businessPriority);
      });
    });

    it('should validate training data schema compliance', () => {
      const data = aiEngine.exportAITrainingData();
      
      data.trainingData.forEach(training => {
        // Test required fields
        expect(training.id).toBeDefined();
        expect(training.input).toBeDefined();
        expect(training.intent).toBeDefined();
        expect(training.output).toBeDefined();
        expect(training.context).toBeDefined();
        expect(training.metadata).toBeDefined();
        expect(training.createdAt).toBeDefined();
        expect(training.updatedAt).toBeDefined();

        // Test field types
        expect(typeof training.id).toBe('string');
        expect(typeof training.input).toBe('string');
        expect(typeof training.intent).toBe('string');
        expect(typeof training.output).toBe('string');
        expect(Array.isArray(training.context)).toBe(true);
        
        // Test metadata structure
        expect(training.metadata.quality).toBeDefined();
        expect(training.metadata.source).toBeDefined();
        expect(training.metadata.difficulty).toBeDefined();
        expect(training.metadata.clientSegment).toBeDefined();
        expect(typeof training.metadata.validated).toBe('boolean');
        expect(['high', 'medium', 'low']).toContain(training.metadata.quality);
        expect(['faq', 'synthetic', 'real_conversation']).toContain(training.metadata.source);
      });
    });
  });
});

describe('Integration with Existing FAQ System', () => {
  it('should integrate with CMS FAQ content structure', async () => {
    const aiEngine = new FAQAIIntegrationEngine();
    await aiEngine.generateFAQEmbeddings();
    
    const data = aiEngine.exportAITrainingData();
    
    // Should have embeddings for the mocked FAQ data
    expect(data.embeddings.length).toBe(3); // question, answer, combined for 1 FAQ
    expect(data.embeddings[0].questionId).toBe('test-question-1');
    expect(data.embeddings[0].metadata.category).toBe('service');
  });

  it('should maintain compatibility with FAQ analytics', () => {
    const aiEngine = new FAQAIIntegrationEngine();
    const stats = aiEngine.getSystemStats();
    
    // Should have compatible data structure for analytics
    expect(typeof stats.embeddings).toBe('number');
    expect(typeof stats.intents).toBe('number');
    expect(typeof stats.trainingData).toBe('number');
    expect(stats.storageSize.total).toBeGreaterThanOrEqual(0);
  });
});

describe('Performance and Scalability', () => {
  it('should handle multiple concurrent requests', async () => {
    const aiEngine = new FAQAIIntegrationEngine();
    await aiEngine.generateFAQEmbeddings();

    // Test concurrent search requests
    const searchPromises = [
      aiEngine.searchSimilarFAQs('tutoring'),
      aiEngine.searchSimilarFAQs('pricing'),
      aiEngine.searchSimilarFAQs('service')
    ];

    const results = await Promise.all(searchPromises);
    
    results.forEach(result => {
      expect(Array.isArray(result)).toBe(true);
    });
  });

  it('should have reasonable response times', async () => {
    const aiEngine = new FAQAIIntegrationEngine();
    await aiEngine.generateFAQEmbeddings();

    const startTime = Date.now();
    const response = await aiEngine.generateAIResponse('What is your service?');
    const endTime = Date.now();
    
    const responseTime = endTime - startTime;
    expect(responseTime).toBeLessThan(5000); // Should respond within 5 seconds
    expect(response.metadata.responseTime).toBeLessThan(responseTime);
  });
});

describe('Error Handling and Resilience', () => {
  it('should handle malformed queries gracefully', async () => {
    const aiEngine = new FAQAIIntegrationEngine();
    
    // Test with empty query
    const emptyResponse = await aiEngine.generateAIResponse('');
    expect(emptyResponse.fallbackToHuman).toBe(true);
    
    // Test with very long query
    const longQuery = 'a'.repeat(10000);
    const longResponse = await aiEngine.generateAIResponse(longQuery);
    expect(longResponse).toBeDefined();
    expect(typeof longResponse.response).toBe('string');
  });

  it('should handle storage errors gracefully', () => {
    // Mock localStorage failure
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('Storage quota exceeded');
    });

    const aiEngine = new FAQAIIntegrationEngine();
    
    // Should not throw despite storage error
    expect(() => aiEngine.clearAllData()).not.toThrow();
  });

  it('should provide fallback responses for system failures', async () => {
    const aiEngine = new FAQAIIntegrationEngine({
      fallbackToHuman: true,
      confidenceThreshold: 0.99 // Very high threshold to force fallbacks
    });

    const response = await aiEngine.generateAIResponse('test query');
    
    // Should fallback to human when confidence is low
    expect(response.fallbackToHuman).toBe(true);
    expect(response.response).toContain('info@myprivatetutoronline.com');
    expect(response.confidence).toBeGreaterThan(0.8); // High confidence in fallback
  });
});