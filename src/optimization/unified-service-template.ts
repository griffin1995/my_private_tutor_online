/**
 * UNIFIED SERVICE ARCHITECTURE TEMPLATE
 * Service Consolidation Pattern for Phase 2 Optimization
 * Coordinated with Performance-Engineer's Caching Strategy
 */

// CONTEXT7 SOURCE: /typescript/handbook - Interface definitions for service contracts
// IMPLEMENTATION REASON: Official TypeScript patterns for type-safe service architecture

import { LRUCache } from 'lru-cache';

/**
 * Core service contract ensuring consistency across all domains
 * Aligned with Performance-Engineer's optimization requirements
 */
export interface ServiceContract<TRequest, TResponse> {
  // Lifecycle methods
  initialize(): Promise<void>;
  shutdown(): Promise<void>;

  // Core execution
  execute(request: TRequest): Promise<TResponse>;

  // Performance optimization hooks
  cache?: CacheStrategy;
  monitor?: PerformanceMonitor;

  // Service metadata
  readonly name: string;
  readonly version: string;
  readonly domain: string;
}

/**
 * Cache strategy interface coordinated with Performance-Engineer
 */
export interface CacheStrategy {
  type: 'stale-while-revalidate' | 'network-first' | 'cache-first' | 'background-sync';
  ttl: number; // Time to live in seconds
  maxSize: number; // Maximum cache entries
  warmup?: string[]; // Keys to pre-warm
}

/**
 * Performance monitoring interface for service metrics
 */
export interface PerformanceMonitor {
  start(operation: string): void;
  end(operation: string): void;
  record(metric: string, value: number): void;
  getMetrics(): PerformanceMetrics;
}

/**
 * Service performance metrics
 */
export interface PerformanceMetrics {
  requestCount: number;
  errorCount: number;
  averageLatency: number;
  cacheHitRate: number;
  p95Latency: number;
}

/**
 * Base service implementation with built-in optimization
 */
export abstract class BaseService<TRequest, TResponse> implements ServiceContract<TRequest, TResponse> {
  protected cacheInstance?: LRUCache<string, TResponse>;
  protected metricsCollector: Map<string, number[]> = new Map();

  constructor(
    public readonly name: string,
    public readonly version: string,
    public readonly domain: string,
    public readonly cache?: CacheStrategy,
    public readonly monitor?: PerformanceMonitor
  ) {
    this.initializeCache();
  }

  /**
   * Initialize cache based on strategy
   */
  private initializeCache(): void {
    if (this.cache) {
      this.cacheInstance = new LRUCache<string, TResponse>({
        max: this.cache.maxSize,
        ttl: this.cache.ttl * 1000, // Convert to milliseconds
        updateAgeOnGet: this.cache.type === 'stale-while-revalidate',
        updateAgeOnHas: this.cache.type === 'stale-while-revalidate',
      });
    }
  }

  /**
   * Service initialization with cache warmup
   */
  async initialize(): Promise<void> {
    console.log(`[${this.name}] Initializing service v${this.version}`);

    // Warm up cache if configured
    if (this.cache?.warmup && this.cacheInstance) {
      await this.warmupCache(this.cache.warmup);
    }

    // Initialize monitoring
    if (this.monitor) {
      this.monitor.start(`${this.name}_init`);
    }

    // Domain-specific initialization
    await this.onInitialize();

    if (this.monitor) {
      this.monitor.end(`${this.name}_init`);
    }

    console.log(`[${this.name}] Service initialized successfully`);
  }

  /**
   * Service shutdown with cleanup
   */
  async shutdown(): Promise<void> {
    console.log(`[${this.name}] Shutting down service`);

    // Clear cache
    if (this.cacheInstance) {
      this.cacheInstance.clear();
    }

    // Domain-specific cleanup
    await this.onShutdown();

    console.log(`[${this.name}] Service shutdown complete`);
  }

  /**
   * Execute with caching and monitoring
   */
  async execute(request: TRequest): Promise<TResponse> {
    const startTime = Date.now();
    const cacheKey = this.getCacheKey(request);

    try {
      // Check cache first
      if (this.cacheInstance && cacheKey) {
        const cached = this.cacheInstance.get(cacheKey);
        if (cached !== undefined) {
          this.recordMetric('cache_hit', 1);
          this.recordMetric('latency', Date.now() - startTime);
          return cached;
        }
        this.recordMetric('cache_miss', 1);
      }

      // Execute domain logic
      if (this.monitor) {
        this.monitor.start(`${this.name}_execute`);
      }

      const response = await this.executeCore(request);

      if (this.monitor) {
        this.monitor.end(`${this.name}_execute`);
      }

      // Update cache
      if (this.cacheInstance && cacheKey) {
        this.cacheInstance.set(cacheKey, response);
      }

      this.recordMetric('latency', Date.now() - startTime);
      this.recordMetric('success', 1);

      return response;

    } catch (error) {
      this.recordMetric('error', 1);
      this.recordMetric('latency', Date.now() - startTime);
      throw error;
    }
  }

  /**
   * Abstract methods for domain implementation
   */
  protected abstract onInitialize(): Promise<void>;
  protected abstract onShutdown(): Promise<void>;
  protected abstract executeCore(request: TRequest): Promise<TResponse>;
  protected abstract getCacheKey(request: TRequest): string | null;
  protected abstract warmupCache(keys: string[]): Promise<void>;

  /**
   * Record performance metrics
   */
  protected recordMetric(metric: string, value: number): void {
    if (!this.metricsCollector.has(metric)) {
      this.metricsCollector.set(metric, []);
    }
    this.metricsCollector.get(metric)!.push(value);

    if (this.monitor) {
      this.monitor.record(metric, value);
    }
  }

  /**
   * Get service metrics
   */
  public getMetrics(): PerformanceMetrics {
    const latencies = this.metricsCollector.get('latency') || [];
    const hits = this.metricsCollector.get('cache_hit') || [];
    const misses = this.metricsCollector.get('cache_miss') || [];
    const errors = this.metricsCollector.get('error') || [];
    const successes = this.metricsCollector.get('success') || [];

    const totalRequests = successes.length + errors.length;
    const cacheAttempts = hits.length + misses.length;

    return {
      requestCount: totalRequests,
      errorCount: errors.length,
      averageLatency: latencies.reduce((a, b) => a + b, 0) / (latencies.length || 1),
      cacheHitRate: cacheAttempts > 0 ? hits.length / cacheAttempts : 0,
      p95Latency: this.calculatePercentile(latencies, 95),
    };
  }

  /**
   * Calculate percentile for metrics
   */
  private calculatePercentile(values: number[], percentile: number): number {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index];
  }
}

/**
 * EXAMPLE: Unified CMS Service Implementation
 * Consolidating 15+ CMS services into one
 */
export class UnifiedCMSService extends BaseService<CMSRequest, CMSResponse> {
  constructor() {
    super(
      'UnifiedCMSService',
      '2.0.0',
      'tutoring',
      {
        type: 'stale-while-revalidate',
        ttl: 3600, // 1 hour
        maxSize: 1000,
        warmup: ['homepage', 'tutoring', 'about', 'testimonials']
      },
      undefined // Will inject monitor
    );
  }

  protected async onInitialize(): Promise<void> {
    // Initialize CMS connections
    console.log('[CMS] Establishing content connections');
    // Implementation here
  }

  protected async onShutdown(): Promise<void> {
    // Clean up CMS connections
    console.log('[CMS] Closing content connections');
    // Implementation here
  }

  protected async executeCore(request: CMSRequest): Promise<CMSResponse> {
    // Unified CMS logic replacing multiple services
    switch (request.type) {
      case 'content':
        return this.fetchContent(request);
      case 'images':
        return this.fetchImages(request);
      case 'faq':
        return this.fetchFAQ(request);
      default:
        throw new Error(`Unknown CMS request type: ${request.type}`);
    }
  }

  protected getCacheKey(request: CMSRequest): string | null {
    // Generate cache key based on request
    if (request.cacheable === false) return null;
    return `cms:${request.type}:${request.key}`;
  }

  protected async warmupCache(keys: string[]): Promise<void> {
    console.log(`[CMS] Warming up cache with ${keys.length} keys`);

    for (const key of keys) {
      try {
        await this.execute({
          type: 'content',
          key,
          cacheable: true
        } as CMSRequest);
      } catch (error) {
        console.warn(`[CMS] Failed to warmup ${key}:`, error);
      }
    }
  }

  // Domain-specific methods
  private async fetchContent(request: CMSRequest): Promise<CMSResponse> {
    // Content fetching logic
    return {} as CMSResponse;
  }

  private async fetchImages(request: CMSRequest): Promise<CMSResponse> {
    // Image fetching logic
    return {} as CMSResponse;
  }

  private async fetchFAQ(request: CMSRequest): Promise<CMSResponse> {
    // FAQ fetching logic
    return {} as CMSResponse;
  }
}

/**
 * Service Registry with Dependency Injection
 * Coordinated with Performance-Engineer's optimization
 */
export class ServiceRegistry {
  private static instance: ServiceRegistry;
  private services: Map<string, ServiceContract<any, any>> = new Map();
  private monitors: Map<string, PerformanceMonitor> = new Map();

  private constructor() {}

  public static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  /**
   * Register a service with optional monitor injection
   */
  public register<T extends ServiceContract<any, any>>(
    name: string,
    service: T,
    monitor?: PerformanceMonitor
  ): void {
    this.services.set(name, service);
    if (monitor) {
      this.monitors.set(name, monitor);
    }
    console.log(`[Registry] Registered service: ${name}`);
  }

  /**
   * Get a registered service
   */
  public get<T extends ServiceContract<any, any>>(name: string): T | undefined {
    return this.services.get(name) as T;
  }

  /**
   * Initialize all registered services
   */
  public async initializeAll(): Promise<void> {
    console.log('[Registry] Initializing all services...');

    const initPromises = Array.from(this.services.values()).map(service =>
      service.initialize()
    );

    await Promise.all(initPromises);

    console.log('[Registry] All services initialized');
  }

  /**
   * Shutdown all registered services
   */
  public async shutdownAll(): Promise<void> {
    console.log('[Registry] Shutting down all services...');

    const shutdownPromises = Array.from(this.services.values()).map(service =>
      service.shutdown()
    );

    await Promise.all(shutdownPromises);

    console.log('[Registry] All services shut down');
  }

  /**
   * Get performance metrics for all services
   */
  public getAllMetrics(): Map<string, PerformanceMetrics> {
    const metrics = new Map<string, PerformanceMetrics>();

    this.services.forEach((service, name) => {
      if ('getMetrics' in service) {
        metrics.set(name, (service as any).getMetrics());
      }
    });

    return metrics;
  }
}

// Type definitions for domain services
export interface CMSRequest {
  type: 'content' | 'images' | 'faq';
  key: string;
  cacheable?: boolean;
}

export interface CMSResponse {
  data: any;
  metadata?: {
    cached?: boolean;
    timestamp?: number;
  };
}

/**
 * USAGE EXAMPLE: Service initialization in app
 */
export async function initializeServices(): Promise<void> {
  const registry = ServiceRegistry.getInstance();

  // Register unified services
  registry.register('cms', new UnifiedCMSService());
  // registry.register('analytics', new UnifiedAnalyticsService());
  // registry.register('booking', new BookingService());
  // registry.register('auth', new AuthenticationService());

  // Initialize all services
  await registry.initializeAll();

  // Services are now ready for use
  const cmsService = registry.get<UnifiedCMSService>('cms');
  if (cmsService) {
    const response = await cmsService.execute({
      type: 'content',
      key: 'homepage',
      cacheable: true
    });
    console.log('CMS Response:', response);
  }
}

/**
 * Export coordination points for Performance-Engineer
 */
export const OPTIMIZATION_COORDINATION = {
  cacheStrategies: {
    cms: 'stale-while-revalidate',
    booking: 'network-first',
    analytics: 'background-sync',
    admin: 'cache-first'
  },

  bundleAlignment: {
    cms: 'domains/tutoring/services',
    booking: 'domains/booking/services',
    analytics: 'domains/analytics/services',
    admin: 'domains/admin/services'
  },

  performanceTargets: {
    cacheHitRate: 0.6, // 60% minimum
    p95Latency: 100, // 100ms p95
    errorRate: 0.01, // 1% maximum
  }
};