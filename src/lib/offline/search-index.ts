/**
 * CONTEXT7 SOURCE: /facebook/react - Client-side search indexing for offline FAQ functionality
 * OFFLINE SEARCH: Comprehensive local search index for royal client offline experience
 * 
 * Search Index - Premium Offline Search System
 * Features:
 * - Full-text search with fuzzy matching
 * - Weighted scoring for relevance ranking
 * - Stemming and keyword extraction
 * - Category and tag filtering
 * - Voice search support
 * - Search analytics and suggestions
 */

import { cacheManager } from './cache-manager';

// CONTEXT7 SOURCE: /microsoft/typescript - Type definitions for search functionality
// TYPE SAFETY: Complete interfaces for search operations and results
export interface SearchIndexEntry {
  id: string;
  type: 'question' | 'category' | 'tag';
  title: string;
  content: string;
  category: string;
  subcategory?: string;
  tags: string[];
  keywords: string[];
  weight: number;
  lastUpdated: number;
  popularity: number;
  metadata: Record<string, any>;
}

export interface SearchResult {
  id: string;
  type: 'question' | 'category' | 'tag';
  title: string;
  snippet: string;
  score: number;
  highlights: string[];
  category: string;
  metadata: Record<string, any>;
}

export interface SearchOptions {
  query: string;
  filters?: {
    categories?: string[];
    tags?: string[];
    type?: ('question' | 'category' | 'tag')[];
    minScore?: number;
  };
  fuzzy?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'relevance' | 'popularity' | 'date';
  includeSnippets?: boolean;
  highlightMatches?: boolean;
}

export interface SearchStats {
  totalQueries: number;
  averageResponseTime: number;
  popularQueries: Array<{ query: string; count: number }>;
  noResultQueries: Array<{ query: string; count: number }>;
  lastIndexUpdate: number;
  indexSize: number;
  cacheHitRate: number;
}

export interface VoiceSearchOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
  maxAlternatives?: number;
}

// CONTEXT7 SOURCE: /facebook/react - Search index implementation
// SEARCH INDEX: Core search engine for offline FAQ functionality
export class SearchIndex {
  private static instance: SearchIndex;
  private index: Map<string, SearchIndexEntry> = new Map();
  private keywords: Map<string, Set<string>> = new Map(); // keyword -> document IDs
  private categories: Map<string, Set<string>> = new Map(); // category -> document IDs
  private stats: SearchStats = {
    totalQueries: 0,
    averageResponseTime: 0,
    popularQueries: [],
    noResultQueries: [],
    lastIndexUpdate: 0,
    indexSize: 0,
    cacheHitRate: 0
  };
  private queryCache: Map<string, SearchResult[]> = new Map();
  private stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'how', 'what', 'where', 'when', 'why'
  ]);

  private constructor() {
    this.loadFromCache();
  }

  // CONTEXT7 SOURCE: /facebook/react - Singleton pattern for search index
  // SINGLETON: Ensure single search index instance across application
  public static getInstance(): SearchIndex {
    if (!SearchIndex.instance) {
      SearchIndex.instance = new SearchIndex();
    }
    return SearchIndex.instance;
  }

  // CONTEXT7 SOURCE: /facebook/react - Index building from FAQ data
  // INDEX BUILDING: Create searchable index from FAQ content
  public async buildIndex(faqData: any[]): Promise<void> {
    console.log('🔍 Building search index from FAQ data...');
    const startTime = Date.now();

    this.index.clear();
    this.keywords.clear();
    this.categories.clear();

    try {
      // Process FAQ categories
      for (const category of faqData) {
        // Index category itself
        await this.addToIndex({
          id: `category_${category.id}`,
          type: 'question',
          title: category.title,
          content: category.description || '',
          category: category.id,
          tags: category.tags || [],
          keywords: this.extractKeywords(category.title + ' ' + (category.description || '')),
          weight: 1.0,
          lastUpdated: Date.now(),
          popularity: category.popularity || 0,
          metadata: {
            icon: category.icon,
            color: category.color,
            questionCount: category.questions?.length || 0
          }
        });

        // Index questions within category
        if (category.questions) {
          for (const question of category.questions) {
            await this.addToIndex({
              id: question.id,
              type: 'question',
              title: question.question,
              content: question.answer,
              category: category.id,
              subcategory: question.subcategory,
              tags: [...(category.tags || []), ...(question.tags || [])],
              keywords: this.extractKeywords(question.question + ' ' + question.answer),
              weight: this.calculateWeight(question),
              lastUpdated: question.lastUpdated || Date.now(),
              popularity: question.popularity || 0,
              metadata: {
                difficulty: question.difficulty,
                estimatedReadTime: question.estimatedReadTime,
                relatedQuestions: question.relatedQuestions || [],
                hasVideo: !!question.videoUrl,
                hasImages: !!(question.images && question.images.length > 0)
              }
            });
          }
        }
      }

      // Update statistics
      this.stats.lastIndexUpdate = Date.now();
      this.stats.indexSize = this.index.size;

      // Cache the index
      await this.saveToCache();

      const buildTime = Date.now() - startTime;
      console.log(`✅ Search index built successfully in ${buildTime}ms. Indexed ${this.index.size} items.`);

    } catch (error) {
      console.error('❌ Failed to build search index:', error);
      throw error;
    }
  }

  // CONTEXT7 SOURCE: /facebook/react - Search execution with ranking
  // SEARCH EXECUTION: Perform search with relevance scoring and filtering
  public async search(options: SearchOptions): Promise<SearchResult[]> {
    const startTime = Date.now();
    const cacheKey = this.getCacheKey(options);

    // Check cache first
    if (this.queryCache.has(cacheKey)) {
      this.stats.cacheHitRate = (this.stats.cacheHitRate * 0.9) + (1 * 0.1);
      return this.queryCache.get(cacheKey)!;
    }

    try {
      const {
        query,
        filters = {},
        fuzzy = true,
        limit = 20,
        offset = 0,
        sortBy = 'relevance',
        includeSnippets = true,
        highlightMatches = true
      } = options;

      // Normalize and tokenize query
      const normalizedQuery = this.normalizeQuery(query);
      const queryTokens = this.tokenize(normalizedQuery);
      
      if (queryTokens.length === 0) {
        return [];
      }

      // Find matching documents
      const candidates = new Map<string, number>(); // document ID -> score

      // Search by keywords
      for (const token of queryTokens) {
        const matchingDocs = this.findMatchingDocuments(token, fuzzy);
        
        for (const [docId, score] of matchingDocs) {
          const currentScore = candidates.get(docId) || 0;
          candidates.set(docId, currentScore + score);
        }
      }

      // Convert to search results
      const results: SearchResult[] = [];
      
      for (const [docId, score] of candidates) {
        const doc = this.index.get(docId);
        if (!doc) continue;

        // Apply filters
        if (!this.passesFilters(doc, filters)) continue;

        // Calculate final score
        const finalScore = this.calculateFinalScore(doc, queryTokens, score);
        
        if (filters.minScore && finalScore < filters.minScore) continue;

        // Generate snippet
        const snippet = includeSnippets 
          ? this.generateSnippet(doc.content, queryTokens, 150)
          : '';

        // Generate highlights
        const highlights = highlightMatches 
          ? this.generateHighlights(doc.title, queryTokens)
          : [];

        results.push({
          id: doc.id,
          type: doc.type,
          title: doc.title,
          snippet,
          score: finalScore,
          highlights,
          category: doc.category,
          metadata: doc.metadata
        });
      }

      // Sort results
      this.sortResults(results, sortBy);

      // Apply pagination
      const paginatedResults = results.slice(offset, offset + limit);

      // Cache results
      this.queryCache.set(cacheKey, paginatedResults);
      
      // Update statistics
      this.updateSearchStats(query, paginatedResults.length, Date.now() - startTime);

      return paginatedResults;

    } catch (error) {
      console.error('Search execution failed:', error);
      return [];
    }
  }

  // CONTEXT7 SOURCE: /facebook/react - Voice search implementation
  // VOICE SEARCH: Speech recognition integration for hands-free search
  public async voiceSearch(options: VoiceSearchOptions = {}): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      const SpeechRecognition = (window as any).SpeechRecognition || 
                                (window as any).webkitSpeechRecognition;
      
      const recognition = new SpeechRecognition();
      
      recognition.lang = options.language || 'en-US';
      recognition.continuous = options.continuous || false;
      recognition.interimResults = options.interimResults || false;
      recognition.maxAlternatives = options.maxAlternatives || 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript.trim());
      };

      recognition.onerror = (event: any) => {
        reject(new Error(`Speech recognition error: ${event.error}`));
      };

      recognition.onend = () => {
        // Recognition ended without result
      };

      recognition.start();
    });
  }

  // CONTEXT7 SOURCE: /facebook/react - Search suggestions and autocomplete
  // SEARCH SUGGESTIONS: Generate smart suggestions based on index and query history
  public async getSuggestions(partialQuery: string, limit: number = 5): Promise<string[]> {
    const normalizedQuery = this.normalizeQuery(partialQuery);
    const suggestions = new Set<string>();

    // Get suggestions from popular queries
    for (const { query } of this.stats.popularQueries) {
      if (query.toLowerCase().includes(normalizedQuery) && suggestions.size < limit) {
        suggestions.add(query);
      }
    }

    // Get suggestions from document titles
    for (const doc of this.index.values()) {
      if (suggestions.size >= limit) break;
      
      const title = doc.title.toLowerCase();
      if (title.includes(normalizedQuery)) {
        suggestions.add(doc.title);
      }
    }

    // Get suggestions from keywords
    for (const keyword of this.keywords.keys()) {
      if (suggestions.size >= limit) break;
      
      if (keyword.includes(normalizedQuery)) {
        suggestions.add(keyword);
      }
    }

    return Array.from(suggestions).slice(0, limit);
  }

  // CONTEXT7 SOURCE: /facebook/react - Search analytics and metrics
  // SEARCH ANALYTICS: Comprehensive search performance tracking
  public getSearchStats(): SearchStats {
    return { ...this.stats };
  }

  public clearCache(): void {
    this.queryCache.clear();
    console.log('🧹 Search cache cleared');
  }

  // CONTEXT7 SOURCE: /facebook/react - Private helper methods for search functionality
  // PRIVATE HELPERS: Internal utilities for search operations

  private async addToIndex(entry: SearchIndexEntry): Promise<void> {
    this.index.set(entry.id, entry);

    // Index keywords
    for (const keyword of entry.keywords) {
      if (!this.keywords.has(keyword)) {
        this.keywords.set(keyword, new Set());
      }
      this.keywords.get(keyword)!.add(entry.id);
    }

    // Index categories
    if (!this.categories.has(entry.category)) {
      this.categories.set(entry.category, new Set());
    }
    this.categories.get(entry.category)!.add(entry.id);
  }

  private extractKeywords(text: string): string[] {
    const tokens = this.tokenize(text);
    const keywords = new Set<string>();

    for (const token of tokens) {
      if (token.length >= 3 && !this.stopWords.has(token)) {
        keywords.add(token);
        
        // Add stems (simple stemming)
        const stem = this.simpleStem(token);
        if (stem !== token) {
          keywords.add(stem);
        }
      }
    }

    return Array.from(keywords);
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 0);
  }

  private normalizeQuery(query: string): string {
    return query.toLowerCase().trim();
  }

  private simpleStem(word: string): string {
    // Simple stemming rules
    if (word.endsWith('ing') && word.length > 4) {
      return word.slice(0, -3);
    }
    if (word.endsWith('ed') && word.length > 3) {
      return word.slice(0, -2);
    }
    if (word.endsWith('s') && word.length > 2) {
      return word.slice(0, -1);
    }
    return word;
  }

  private findMatchingDocuments(token: string, fuzzy: boolean): Map<string, number> {
    const matches = new Map<string, number>();

    // Exact keyword matches
    if (this.keywords.has(token)) {
      for (const docId of this.keywords.get(token)!) {
        matches.set(docId, 1.0);
      }
    }

    // Fuzzy matches if enabled
    if (fuzzy) {
      for (const keyword of this.keywords.keys()) {
        if (keyword.includes(token) || token.includes(keyword)) {
          const similarity = this.calculateSimilarity(token, keyword);
          if (similarity > 0.6) {
            for (const docId of this.keywords.get(keyword)!) {
              const currentScore = matches.get(docId) || 0;
              matches.set(docId, Math.max(currentScore, similarity));
            }
          }
        }
      }
    }

    return matches;
  }

  private calculateSimilarity(str1: string, str2: string): number {
    // Simple Jaccard similarity
    const set1 = new Set(str1.split(''));
    const set2 = new Set(str2.split(''));
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  }

  private calculateWeight(question: any): number {
    let weight = 1.0;

    // Boost popular questions
    if (question.popularity > 50) weight += 0.3;
    else if (question.popularity > 20) weight += 0.2;
    else if (question.popularity > 10) weight += 0.1;

    // Boost recent questions
    if (question.lastUpdated) {
      const ageInDays = (Date.now() - question.lastUpdated) / (1000 * 60 * 60 * 24);
      if (ageInDays < 30) weight += 0.2;
      else if (ageInDays < 90) weight += 0.1;
    }

    // Boost questions with rich content
    if (question.videoUrl) weight += 0.1;
    if (question.images && question.images.length > 0) weight += 0.1;

    return weight;
  }

  private passesFilters(doc: SearchIndexEntry, filters: any): boolean {
    if (filters.categories && !filters.categories.includes(doc.category)) {
      return false;
    }

    if (filters.tags && !doc.tags.some(tag => filters.tags.includes(tag))) {
      return false;
    }

    if (filters.type && !filters.type.includes(doc.type)) {
      return false;
    }

    return true;
  }

  private calculateFinalScore(doc: SearchIndexEntry, queryTokens: string[], baseScore: number): number {
    let score = baseScore * doc.weight;

    // Boost for title matches
    const titleTokens = this.tokenize(doc.title);
    const titleMatches = queryTokens.filter(token => 
      titleTokens.some(titleToken => titleToken.includes(token))
    ).length;
    
    score += (titleMatches / queryTokens.length) * 0.5;

    // Boost for popularity
    score += (doc.popularity / 100) * 0.2;

    // Boost for recency
    const ageInDays = (Date.now() - doc.lastUpdated) / (1000 * 60 * 60 * 24);
    if (ageInDays < 30) score += 0.1;

    return score;
  }

  private generateSnippet(content: string, queryTokens: string[], maxLength: number): string {
    const sentences = content.split(/[.!?]+/);
    let bestSentence = '';
    let bestScore = 0;

    for (const sentence of sentences) {
      const sentenceTokens = this.tokenize(sentence);
      const matches = queryTokens.filter(token =>
        sentenceTokens.some(sentenceToken => sentenceToken.includes(token))
      ).length;

      if (matches > bestScore) {
        bestScore = matches;
        bestSentence = sentence;
      }
    }

    return bestSentence.length > maxLength 
      ? bestSentence.substring(0, maxLength) + '...'
      : bestSentence;
  }

  private generateHighlights(title: string, queryTokens: string[]): string[] {
    const highlights: string[] = [];
    const titleLower = title.toLowerCase();

    for (const token of queryTokens) {
      const index = titleLower.indexOf(token);
      if (index !== -1) {
        highlights.push(title.substring(index, index + token.length));
      }
    }

    return highlights;
  }

  private sortResults(results: SearchResult[], sortBy: string): void {
    switch (sortBy) {
      case 'relevance':
        results.sort((a, b) => b.score - a.score);
        break;
      case 'popularity':
        results.sort((a, b) => (b.metadata.popularity || 0) - (a.metadata.popularity || 0));
        break;
      case 'date':
        results.sort((a, b) => (b.metadata.lastUpdated || 0) - (a.metadata.lastUpdated || 0));
        break;
    }
  }

  private updateSearchStats(query: string, resultCount: number, responseTime: number): void {
    this.stats.totalQueries++;
    this.stats.averageResponseTime = (this.stats.averageResponseTime * 0.9) + (responseTime * 0.1);

    // Update popular queries
    const existingQuery = this.stats.popularQueries.find(q => q.query === query);
    if (existingQuery) {
      existingQuery.count++;
    } else {
      this.stats.popularQueries.push({ query, count: 1 });
    }

    // Track no-result queries
    if (resultCount === 0) {
      const existingNoResult = this.stats.noResultQueries.find(q => q.query === query);
      if (existingNoResult) {
        existingNoResult.count++;
      } else {
        this.stats.noResultQueries.push({ query, count: 1 });
      }
    }

    // Keep only top queries
    this.stats.popularQueries.sort((a, b) => b.count - a.count);
    this.stats.popularQueries = this.stats.popularQueries.slice(0, 50);
    
    this.stats.noResultQueries.sort((a, b) => b.count - a.count);
    this.stats.noResultQueries = this.stats.noResultQueries.slice(0, 20);
  }

  private getCacheKey(options: SearchOptions): string {
    return JSON.stringify({
      query: options.query,
      filters: options.filters,
      fuzzy: options.fuzzy,
      limit: options.limit,
      offset: options.offset,
      sortBy: options.sortBy
    });
  }

  private async saveToCache(): Promise<void> {
    try {
      const indexData = {
        index: Array.from(this.index.entries()),
        keywords: Array.from(this.keywords.entries()).map(([key, value]) => [key, Array.from(value)]),
        categories: Array.from(this.categories.entries()).map(([key, value]) => [key, Array.from(value)]),
        stats: this.stats
      };

      await cacheManager.set('FAQ_SEARCH', '/search/index', indexData, { priority: 'high' });
    } catch (error) {
      console.warn('Failed to save search index to cache:', error);
    }
  }

  private async loadFromCache(): Promise<void> {
    try {
      const cached = await cacheManager.get('FAQ_SEARCH', '/search/index');
      if (cached) {
        const indexData = cached.data;
        
        this.index = new Map(indexData.index);
        this.keywords = new Map(indexData.keywords.map(([key, value]: [string, string[]]) => [key, new Set(value)]));
        this.categories = new Map(indexData.categories.map(([key, value]: [string, string[]]) => [key, new Set(value)]));
        this.stats = indexData.stats || this.stats;

        console.log('🔍 Search index loaded from cache');
      }
    } catch (error) {
      console.warn('Failed to load search index from cache:', error);
    }
  }
}

// CONTEXT7 SOURCE: /facebook/react - Export singleton instance for application use
// SINGLETON EXPORT: Global search index instance for FAQ offline functionality
export const searchIndex = SearchIndex.getInstance();