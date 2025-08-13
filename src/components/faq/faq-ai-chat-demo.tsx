// CONTEXT7 SOURCE: /microsoft/typescript - React component patterns for AI chat integration
// CONTEXT7 SOURCE: /context7/platform_openai - Chat interface patterns for FAQ AI assistance
// IMPLEMENTATION REASON: Official React and OpenAI patterns for AI chat demonstration
// 
// FAQ AI Chat Integration Demo Component
// Demonstrates the AI preparation system in action with real-time chat functionality
// 
// BUSINESS CONTEXT: £381,600 revenue opportunity through AI automation
// TARGET SEGMENTS: Oxbridge prep, 11+ parents, elite corporate, comparison shoppers

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, 
  Bot, 
  User, 
  Search, 
  Brain, 
  Target, 
  Database,
  Loader2,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Download,
  BarChart3,
  Settings
} from 'lucide-react';
import { faqAIIntegration, FAQAIUtils } from '@/lib/faq-ai-integration';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  confidence?: number;
  usedFAQs?: string[];
  fallbackToHuman?: boolean;
  metadata?: any;
}

interface SystemStats {
  embeddings: number;
  intents: number;
  trainingData: number;
  config: any;
  storageSize: {
    embeddings: number;
    intents: number;
    trainingData: number;
    total: number;
  };
}

// CMS DATA SOURCE: Using centralized FAQ content for AI chat demo
export default function FAQAIChatDemo() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [systemReady, setSystemReady] = useState(false);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [isInitializing, setIsInitializing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'chat' | 'analytics' | 'training'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeSystem();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const initializeSystem = async () => {
    setIsInitializing(true);
    try {
      console.log('🚀 Initializing FAQ AI Chat System...');
      
      // Prepare system for chat widget
      const preparation = await FAQAIUtils.prepareForChatWidget();
      setSystemReady(preparation.ready);
      
      // Get system statistics
      const stats = faqAIIntegration.getSystemStats();
      setSystemStats(stats);
      
      if (preparation.ready) {
        // Add welcome message
        const welcomeMessage: ChatMessage = {
          id: 'welcome',
          role: 'system',
          content: `🤖 **FAQ AI Assistant Ready!**

Hello! I'm your AI assistant for My Private Tutor Online. I have access to:
- **${preparation.embeddings}** vectorized FAQ embeddings
- **${preparation.intents}** intent classifications  
- **${preparation.trainingData}** training examples

I can help answer questions about our tutoring services, pricing, tutors, and more. Try asking me something like:
- "What are your tutor tiers?"
- "How much does tutoring cost?"
- "Do you offer Oxbridge preparation?"

How can I assist you today?`,
          timestamp: new Date()
        };
        
        setMessages([welcomeMessage]);
      } else {
        const errorMessage: ChatMessage = {
          id: 'error',
          role: 'system',
          content: '❌ **System Initialization Failed**\n\nThe AI system could not be properly initialized. Please try refreshing the page or contact support.',
          timestamp: new Date()
        };
        setMessages([errorMessage]);
      }
      
    } catch (error) {
      console.error('Failed to initialize system:', error);
      setSystemReady(false);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading || !systemReady) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Show typing indicator
      const typingMessage: ChatMessage = {
        id: 'typing',
        role: 'assistant',
        content: 'Thinking...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, typingMessage]);

      // Get AI response using the integration system
      const response = await faqAIIntegration.generateAIResponse(userMessage.content);
      
      // Remove typing indicator and add actual response
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));

      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: response.response,
        timestamp: new Date(),
        confidence: response.confidence,
        usedFAQs: response.usedFAQs,
        fallbackToHuman: response.fallbackToHuman,
        metadata: response.metadata
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Update stats
      const newStats = faqAIIntegration.getSystemStats();
      setSystemStats(newStats);
      
    } catch (error) {
      console.error('Failed to get AI response:', error);
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: '❌ Sorry, I encountered an error processing your request. Please try again or contact our team directly at info@myprivatetutoronline.com',
        timestamp: new Date(),
        fallbackToHuman: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatStorageSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const exportTrainingData = () => {
    try {
      const data = faqAIIntegration.exportAITrainingData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `faq-ai-training-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export training data:', error);
    }
  };

  const regenerateData = async () => {
    setIsInitializing(true);
    try {
      console.log('🔄 Regenerating AI training data...');
      
      // Clear existing data
      faqAIIntegration.clearAllData();
      
      // Regenerate all data
      await faqAIIntegration.generateFAQEmbeddings();
      await faqAIIntegration.generateTrainingData();
      
      // Update stats
      const stats = faqAIIntegration.getSystemStats();
      setSystemStats(stats);
      
      // Add system message
      const message: ChatMessage = {
        id: `regen_${Date.now()}`,
        role: 'system',
        content: `✅ **AI Data Regenerated Successfully!**

- Generated ${stats.embeddings} new embeddings
- Created ${stats.trainingData} training examples  
- Updated ${stats.intents} intent classifications

The AI system is now updated with the latest FAQ content.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, message]);
      
    } catch (error) {
      console.error('Failed to regenerate data:', error);
    } finally {
      setIsInitializing(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <h3 className="text-lg font-semibold">Initializing FAQ AI System</h3>
          <p className="text-gray-600">Preparing embeddings and training data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-blue-600" />
          FAQ AI Chat Integration Demo
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience our AI-powered FAQ assistant with vectorization, intent classification, and contextual responses.
          Complete preparation for production chatbot integration.
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Embeddings</p>
                <p className="text-2xl font-bold">{systemStats?.embeddings || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Intents</p>
                <p className="text-2xl font-bold">{systemStats?.intents || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Training Data</p>
                <p className="text-2xl font-bold">{systemStats?.trainingData || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              {systemReady ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-red-600" />
              )}
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm font-semibold">
                  {systemReady ? 'Ready' : 'Not Ready'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setSelectedTab('chat')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            selectedTab === 'chat'
              ? 'bg-white shadow-sm text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageCircle className="h-4 w-4" />
          AI Chat Demo
        </button>
        <button
          onClick={() => setSelectedTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            selectedTab === 'analytics'
              ? 'bg-white shadow-sm text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          System Analytics
        </button>
        <button
          onClick={() => setSelectedTab('training')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            selectedTab === 'training'
              ? 'bg-white shadow-sm text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Settings className="h-4 w-4" />
          Training Data
        </button>
      </div>

      {/* Tab Content */}
      {selectedTab === 'chat' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-600" />
              AI Chat Assistant
              {systemReady && (
                <Badge variant="secondary" className="ml-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Ready
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto border rounded-lg p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : message.role === 'system'
                        ? 'bg-gray-200 text-gray-900 border'
                        : 'bg-white text-gray-900 border'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-1">
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      ) : message.role === 'assistant' ? (
                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
                      ) : (
                        <Settings className="h-4 w-4 mt-0.5 flex-shrink-0 text-gray-600" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </div>
                        {message.confidence && (
                          <div className="mt-2 flex items-center gap-2 text-xs opacity-75">
                            <Badge variant="outline" className="text-xs">
                              {Math.round(message.confidence * 100)}% confidence
                            </Badge>
                            {message.usedFAQs && message.usedFAQs.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {message.usedFAQs.length} FAQ sources
                              </Badge>
                            )}
                            {message.fallbackToHuman && (
                              <Badge variant="outline" className="text-xs text-orange-600">
                                Human referral
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-xs opacity-50 text-right">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about tutoring services, pricing, tutors, or anything else..."
                disabled={!systemReady || isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || !systemReady || isLoading}
                className="min-w-[80px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Send'
                )}
              </Button>
            </div>

            {!systemReady && (
              <div className="text-center py-4 text-gray-600">
                <AlertTriangle className="h-5 w-5 mx-auto mb-2 text-orange-600" />
                <p>AI system is not ready. Please refresh the page to retry initialization.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {selectedTab === 'analytics' && systemStats && (
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                System Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Storage Usage */}
              <div>
                <h4 className="font-semibold mb-3">Storage Usage</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">Embeddings</p>
                    <p className="text-lg font-bold text-blue-900">
                      {formatStorageSize(systemStats.storageSize.embeddings)}
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">Intents</p>
                    <p className="text-lg font-bold text-green-900">
                      {formatStorageSize(systemStats.storageSize.intents)}
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-700">Training Data</p>
                    <p className="text-lg font-bold text-purple-900">
                      {formatStorageSize(systemStats.storageSize.trainingData)}
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">Total</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatStorageSize(systemStats.storageSize.total)}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Configuration */}
              <div>
                <h4 className="font-semibold mb-3">AI Configuration</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Model:</strong> {systemStats.config.model}</p>
                    <p className="text-sm"><strong>Temperature:</strong> {systemStats.config.temperature}</p>
                    <p className="text-sm"><strong>Max Tokens:</strong> {systemStats.config.maxTokens}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Top K:</strong> {systemStats.config.topK}</p>
                    <p className="text-sm"><strong>Confidence Threshold:</strong> {systemStats.config.confidenceThreshold}</p>
                    <p className="text-sm"><strong>Fallback to Human:</strong> {systemStats.config.fallbackToHuman ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedTab === 'training' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-gray-600" />
              Training Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={exportTrainingData}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Training Data
              </Button>
              <Button
                onClick={regenerateData}
                variant="outline"
                className="flex items-center gap-2"
                disabled={isInitializing}
              >
                {isInitializing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Regenerate Data
              </Button>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Ready for Production Integration</h4>
              <p className="text-sm text-yellow-700">
                This FAQ AI system is ready for integration with production chatbots. The generated training data, embeddings, 
                and intent classifications can be exported and used with OpenAI GPT models, Pinecone vector databases, 
                or other AI platforms.
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Integration Points Available</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Chat widget for FAQ page header</li>
                <li>• Search enhancement with AI suggestions</li>
                <li>• Contact section AI assistant</li>
                <li>• Floating global chat widget</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}