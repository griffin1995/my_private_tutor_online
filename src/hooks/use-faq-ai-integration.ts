// CONTEXT7 SOURCE: /microsoft/typescript - React hooks patterns for AI system integration
// CONTEXT7 SOURCE: /context7/platform_openai - Custom hooks for AI chat functionality
// IMPLEMENTATION REASON: Official React and OpenAI patterns for AI integration state management
// 
// FAQ AI Integration React Hook
// Custom hook for managing AI chat integration state and functionality
// 
// BUSINESS CONTEXT: £381,600 revenue opportunity through AI automation
// TARGET SEGMENTS: Oxbridge prep, 11+ parents, elite corporate, comparison shoppers

"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  faqAIIntegration, 
  FAQAIUtils,
  type IntentClassification,
  type AIResponseConfig 
} from '@/lib/faq-ai-integration';
import type { FAQQuestion } from '@/lib/cms/cms-faq';

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for AI chat state management
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  confidence?: number;
  usedFAQs?: string[];
  fallbackToHuman?: boolean;
  metadata?: {
    model?: string;
    tokensUsed?: number;
    responseTime?: number;
    intentUsed?: string;
    contextSources?: string[];
  };
}

export interface AISystemStatus {
  ready: boolean;
  initializing: boolean;
  embeddings: number;
  intents: number;
  trainingData: number;
  storageSize: {
    total: number;
    embeddings: number;
    intents: number;
    trainingData: number;
  };
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  systemStatus: AISystemStatus;
  config: AIResponseConfig | null;
  error: string | null;
}

export interface FAQSearchResult {
  question: FAQQuestion;
  similarity: number;
  confidence: number;
}

export interface IntentResult {
  intent: IntentClassification;
  confidence: number;
  explanation: string;
}

// CMS DATA SOURCE: Custom hook for FAQ AI integration functionality
export function useFAQAIIntegration() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    systemStatus: {
      ready: false,
      initializing: true,
      embeddings: 0,
      intents: 0,
      trainingData: 0,
      storageSize: {
        total: 0,
        embeddings: 0,
        intents: 0,
        trainingData: 0
      }
    },
    config: null,
    error: null
  });

  const initializingRef = useRef(false);

  // Initialize the AI system on mount
  useEffect(() => {
    if (!initializingRef.current) {
      initializingRef.current = true;
      initializeAISystem();
    }
  }, []);

  /**
   * CONTEXT7 SOURCE: /context7/platform_openai - AI system initialization patterns
   * IMPLEMENTATION REASON: Official patterns for AI system setup and configuration
   */
  const initializeAISystem = useCallback(async () => {
    setChatState(prev => ({
      ...prev,
      systemStatus: { ...prev.systemStatus, initializing: true },
      error: null
    }));

    try {
      console.log('🤖 Initializing FAQ AI Integration System...');

      // Prepare system for chat widget integration
      const preparation = await FAQAIUtils.prepareForChatWidget();
      
      // Get system statistics and configuration
      const stats = faqAIIntegration.getSystemStats();
      
      setChatState(prev => ({
        ...prev,
        systemStatus: {
          ready: preparation.ready,
          initializing: false,
          embeddings: preparation.embeddings,
          intents: preparation.intents,
          trainingData: preparation.trainingData,
          storageSize: stats.storageSize
        },
        config: stats.config
      }));

      // Add welcome message if system is ready
      if (preparation.ready) {
        const welcomeMessage: ChatMessage = {
          id: `welcome_${Date.now()}`,
          role: 'system',
          content: `🤖 **AI Assistant Ready!**

I have access to ${preparation.embeddings} vectorized FAQ items and ${preparation.trainingData} training examples. I can help with:

• Service information and tutoring approach
• Tutor qualifications and tier system  
• Pricing and package details
• Scheduling and booking process
• Academic subjects and exam preparation
• University admissions support

How can I assist you today?`,
          timestamp: new Date()
        };

        setChatState(prev => ({
          ...prev,
          messages: [welcomeMessage]
        }));
      }

      console.log('✅ FAQ AI Integration System initialized successfully');

    } catch (error) {
      console.error('❌ Failed to initialize FAQ AI system:', error);
      
      setChatState(prev => ({
        ...prev,
        systemStatus: { ...prev.systemStatus, initializing: false, ready: false },
        error: error instanceof Error ? error.message : 'Failed to initialize AI system'
      }));
    }
  }, []);

  /**
   * CONTEXT7 SOURCE: /context7/platform_openai - Chat completion patterns for conversational AI
   * IMPLEMENTATION REASON: Official OpenAI patterns for generating contextual responses
   */
  const sendMessage = useCallback(async (content: string): Promise<void> => {
    if (!content.trim() || chatState.isLoading || !chatState.systemStatus.ready) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null
    }));

    try {
      // Show typing indicator
      const typingMessage: ChatMessage = {
        id: 'typing',
        role: 'assistant',
        content: '💭 Thinking...',
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, typingMessage]
      }));

      // Get AI response
      const response = await faqAIIntegration.generateAIResponse(content);

      // Remove typing indicator and add AI response
      setChatState(prev => ({
        ...prev,
        messages: prev.messages
          .filter(msg => msg.id !== 'typing')
          .concat([{
            id: `ai_${Date.now()}`,
            role: 'assistant',
            content: response.response,
            timestamp: new Date(),
            confidence: response.confidence,
            usedFAQs: response.usedFAQs,
            fallbackToHuman: response.fallbackToHuman,
            metadata: response.metadata
          }]),
        isLoading: false
      }));

    } catch (error) {
      console.error('Failed to send message:', error);

      // Remove typing indicator and show error
      setChatState(prev => ({
        ...prev,
        messages: prev.messages
          .filter(msg => msg.id !== 'typing')
          .concat([{
            id: `error_${Date.now()}`,
            role: 'assistant',
            content: '❌ I apologize, but I encountered an error processing your request. Please try again or contact our team directly at info@myprivatetutoronline.com',
            timestamp: new Date(),
            fallbackToHuman: true
          }]),
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to process message'
      }));
    }
  }, [chatState.isLoading, chatState.systemStatus.ready]);

  /**
   * CONTEXT7 SOURCE: /pinecone-io/pinecone-ts-client - Semantic search patterns for FAQ matching
   * IMPLEMENTATION REASON: Official Pinecone patterns for vector similarity search
   */
  const searchFAQs = useCallback(async (
    query: string, 
    options?: {
      topK?: number;
      category?: string;
      clientSegment?: string;
      minConfidence?: number;
    }
  ): Promise<FAQSearchResult[]> => {
    if (!chatState.systemStatus.ready) {
      console.warn('AI system not ready for FAQ search');
      return [];
    }

    try {
      const results = await faqAIIntegration.searchSimilarFAQs(query, options);
      return results;
    } catch (error) {
      console.error('Failed to search FAQs:', error);
      return [];
    }
  }, [chatState.systemStatus.ready]);

  /**
   * CONTEXT7 SOURCE: /context7/platform_openai - Intent classification for user queries
   * IMPLEMENTATION REASON: Official OpenAI patterns for natural language understanding
   */
  const classifyIntent = useCallback(async (query: string): Promise<IntentResult | null> => {
    if (!chatState.systemStatus.ready) {
      console.warn('AI system not ready for intent classification');
      return null;
    }

    try {
      const result = await faqAIIntegration.classifyIntent(query);
      return result;
    } catch (error) {
      console.error('Failed to classify intent:', error);
      return null;
    }
  }, [chatState.systemStatus.ready]);

  /**
   * Clear all chat messages
   */
  const clearMessages = useCallback(() => {
    setChatState(prev => ({
      ...prev,
      messages: [],
      error: null
    }));
  }, []);

  /**
   * Regenerate AI training data
   */
  const regenerateTrainingData = useCallback(async (): Promise<void> => {
    setChatState(prev => ({
      ...prev,
      systemStatus: { ...prev.systemStatus, initializing: true },
      error: null
    }));

    try {
      console.log('🔄 Regenerating AI training data...');

      // Clear existing data
      faqAIIntegration.clearAllData();
      
      // Regenerate embeddings and training data
      await faqAIIntegration.generateFAQEmbeddings();
      await faqAIIntegration.generateTrainingData();
      
      // Update system status
      const stats = faqAIIntegration.getSystemStats();
      
      setChatState(prev => ({
        ...prev,
        systemStatus: {
          ready: true,
          initializing: false,
          embeddings: stats.embeddings,
          intents: stats.intents,
          trainingData: stats.trainingData,
          storageSize: stats.storageSize
        }
      }));

      console.log('✅ Training data regenerated successfully');

    } catch (error) {
      console.error('❌ Failed to regenerate training data:', error);
      
      setChatState(prev => ({
        ...prev,
        systemStatus: { ...prev.systemStatus, initializing: false },
        error: error instanceof Error ? error.message : 'Failed to regenerate training data'
      }));
    }
  }, []);

  /**
   * Export AI training data
   */
  const exportTrainingData = useCallback(() => {
    try {
      const data = faqAIIntegration.exportAITrainingData();
      
      // Create downloadable blob
      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: 'application/json' 
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `faq-ai-training-data-${new Date().toISOString().split('T')[0]}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      
      return data;
    } catch (error) {
      console.error('Failed to export training data:', error);
      throw error;
    }
  }, []);

  /**
   * Get chat integration configuration
   */
  const getChatIntegrationPoints = useCallback(() => {
    return FAQAIUtils.getChatIntegrationPoints();
  }, []);

  /**
   * Update AI configuration
   */
  const updateConfig = useCallback(async (newConfig: Partial<AIResponseConfig>): Promise<void> => {
    try {
      // Create new engine with updated config
      const updatedEngine = new (await import('@/lib/faq-ai-integration')).FAQAIIntegrationEngine(newConfig);
      
      // Update state
      setChatState(prev => ({
        ...prev,
        config: { ...prev.config, ...newConfig } as AIResponseConfig
      }));

      console.log('✅ AI configuration updated');

    } catch (error) {
      console.error('❌ Failed to update AI configuration:', error);
      throw error;
    }
  }, []);

  /**
   * Get system performance metrics
   */
  const getPerformanceMetrics = useCallback(() => {
    if (!chatState.systemStatus.ready) {
      return null;
    }

    const messages = chatState.messages.filter(msg => msg.role === 'assistant' && msg.metadata);
    
    if (messages.length === 0) {
      return null;
    }

    const totalResponseTime = messages.reduce((sum, msg) => 
      sum + (msg.metadata?.responseTime || 0), 0
    );
    
    const totalTokens = messages.reduce((sum, msg) => 
      sum + (msg.metadata?.tokensUsed || 0), 0
    );

    const averageConfidence = messages.reduce((sum, msg) => 
      sum + (msg.confidence || 0), 0
    ) / messages.length;

    const fallbackRate = messages.filter(msg => msg.fallbackToHuman).length / messages.length;

    return {
      totalMessages: messages.length,
      averageResponseTime: totalResponseTime / messages.length,
      totalTokensUsed: totalTokens,
      averageConfidence,
      fallbackRate,
      systemUptime: Date.now() - (messages[0]?.timestamp.getTime() || Date.now())
    };
  }, [chatState.messages, chatState.systemStatus.ready]);

  return {
    // State
    messages: chatState.messages,
    isLoading: chatState.isLoading,
    systemStatus: chatState.systemStatus,
    config: chatState.config,
    error: chatState.error,

    // Actions
    sendMessage,
    clearMessages,
    searchFAQs,
    classifyIntent,
    initializeAISystem,
    regenerateTrainingData,
    exportTrainingData,
    updateConfig,

    // Utilities
    getChatIntegrationPoints,
    getPerformanceMetrics,

    // Computed values
    isReady: chatState.systemStatus.ready && !chatState.systemStatus.initializing,
    hasError: !!chatState.error,
    messageCount: chatState.messages.length
  };
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Utility hook for FAQ AI search functionality
 * IMPLEMENTATION REASON: Official React patterns for search-specific AI functionality
 */
export function useFAQAISearch() {
  const [searchResults, setSearchResults] = useState<FAQSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchFAQs = useCallback(async (
    query: string,
    options?: {
      topK?: number;
      category?: string;
      clientSegment?: string;
      minConfidence?: number;
    }
  ) => {
    if (!query.trim()) {
      setSearchResults([]);
      return [];
    }

    setIsSearching(true);
    setSearchQuery(query);

    try {
      const results = await faqAIIntegration.searchSimilarFAQs(query, options);
      setSearchResults(results);
      return results;
    } catch (error) {
      console.error('FAQ AI search failed:', error);
      setSearchResults([]);
      return [];
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setSearchQuery('');
  }, []);

  return {
    searchResults,
    isSearching,
    searchQuery,
    searchFAQs,
    clearSearch,
    hasResults: searchResults.length > 0
  };
}

/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Intent classification hook patterns
 * IMPLEMENTATION REASON: Official React patterns for AI intent analysis
 */
export function useFAQAIIntent() {
  const [currentIntent, setCurrentIntent] = useState<IntentResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeIntent = useCallback(async (query: string): Promise<IntentResult | null> => {
    if (!query.trim()) {
      setCurrentIntent(null);
      return null;
    }

    setIsAnalyzing(true);

    try {
      const result = await faqAIIntegration.classifyIntent(query);
      setCurrentIntent(result);
      return result;
    } catch (error) {
      console.error('Intent analysis failed:', error);
      setCurrentIntent(null);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const clearIntent = useCallback(() => {
    setCurrentIntent(null);
  }, []);

  return {
    currentIntent,
    isAnalyzing,
    analyzeIntent,
    clearIntent,
    hasIntent: !!currentIntent
  };
}

export default useFAQAIIntegration;