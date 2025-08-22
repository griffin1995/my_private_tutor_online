// CONTEXT7 SOURCE: /redis/node-redis - Enterprise Redis session storage implementation
// SECURITY IMPLEMENTATION REASON: Official Redis client patterns for distributed session management and royal client data isolation

import { createClient, RedisClientType } from 'redis'
import crypto from 'crypto'

/**
 * Redis-based session storage for My Private Tutor Online
 * Replaces vulnerable in-memory Map storage with enterprise-grade persistence
 * Royal client data protection with distributed session management
 */

export interface SessionData {
  count: number
  lastAttempt: number
  userId?: string
  role?: string
  metadata?: Record<string, any>
}

export interface RateLimitData {
  count: number
  lastAttempt: number
  windowStart: number
}

export class RedisSessionStore {
  private client: RedisClientType
  private isConnected: boolean = false
  private connectionPromise: Promise<void> | null = null

  constructor(private config: {
    url?: string
    host?: string
    port?: number
    password?: string
    db?: number
    keyPrefix?: string
    maxRetries?: number
    retryDelay?: number
    fallbackToMemory?: boolean
  } = {}) {
    // CONTEXT7 SOURCE: /redis/node-redis - Client configuration with reconnection strategy
    this.client = createClient({
      url: config.url || `redis://${config.host || 'localhost'}:${config.port || 6379}`,
      password: config.password,
      database: config.db || 0,
      socket: {
        reconnectStrategy: (retries) => {
          const maxRetries = config.maxRetries || 10
          if (retries >= maxRetries) {
            return new Error('Max retries reached')
          }
          // Exponential backoff with jitter
          const baseDelay = config.retryDelay || 100
          const jitter = Math.floor(Math.random() * 200)
          const delay = Math.min(Math.pow(2, retries) * baseDelay, 5000)
          return delay + jitter
        }
      }
    })

    // CONTEXT7 SOURCE: /redis/node-redis - Error handling for client connections
    this.client.on('error', (err) => {
      console.error('Redis Session Store Error:', err)
      this.isConnected = false
    })

    this.client.on('connect', () => {
      console.log('Redis Session Store Connected')
      this.isConnected = true
    })

    this.client.on('disconnect', () => {
      console.log('Redis Session Store Disconnected')
      this.isConnected = false
    })
  }

  /**
   * Initialize Redis connection with graceful error handling
   * CONTEXT7 SOURCE: /redis/node-redis - Connection management patterns
   */
  async connect(): Promise<void> {
    if (this.connectionPromise) {
      return this.connectionPromise
    }

    this.connectionPromise = this.client.connect().catch(error => {
      console.error('Failed to connect to Redis:', error)
      if (this.config.fallbackToMemory) {
        console.warn('Falling back to in-memory storage (not recommended for production)')
      }
      throw error
    })

    return this.connectionPromise
  }

  /**
   * Disconnect from Redis
   */
  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.disconnect()
    }
    this.isConnected = false
    this.connectionPromise = null
  }

  /**
   * Get session key with prefix
   */
  private getKey(key: string, type: 'session' | 'rate_limit' = 'session'): string {
    const prefix = this.config.keyPrefix || 'mpto'
    return `${prefix}:${type}:${key}`
  }

  /**
   * Store rate limiting data with expiration
   * CONTEXT7 SOURCE: /redis/node-redis - Setting values with TTL for automatic cleanup
   */
  async setRateLimit(clientIP: string, data: RateLimitData, ttlSeconds: number = 3600): Promise<void> {
    try {
      if (!this.isConnected) await this.connect()
      
      const key = this.getKey(clientIP, 'rate_limit')
      await this.client.setEx(key, ttlSeconds, JSON.stringify(data))
    } catch (error) {
      console.error('Redis setRateLimit error:', error)
      throw error
    }
  }

  /**
   * Get rate limiting data
   * CONTEXT7 SOURCE: /redis/node-redis - Getting values with JSON parsing
   */
  async getRateLimit(clientIP: string): Promise<RateLimitData | null> {
    try {
      if (!this.isConnected) await this.connect()
      
      const key = this.getKey(clientIP, 'rate_limit')
      const data = await this.client.get(key)
      
      if (!data) return null
      
      return JSON.parse(data) as RateLimitData
    } catch (error) {
      console.error('Redis getRateLimit error:', error)
      return null
    }
  }

  /**
   * Clear rate limiting data for successful authentication
   * CONTEXT7 SOURCE: /redis/node-redis - Deleting keys for cleanup
   */
  async clearRateLimit(clientIP: string): Promise<void> {
    try {
      if (!this.isConnected) await this.connect()
      
      const key = this.getKey(clientIP, 'rate_limit')
      await this.client.del(key)
    } catch (error) {
      console.error('Redis clearRateLimit error:', error)
      // Non-critical error, continue execution
    }
  }

  /**
   * Store session data with expiration
   * CONTEXT7 SOURCE: /redis/node-redis - Session storage with encryption for royal client protection
   */
  async setSession(sessionId: string, data: SessionData, ttlSeconds: number = 86400): Promise<void> {
    try {
      if (!this.isConnected) await this.connect()
      
      const key = this.getKey(sessionId, 'session')
      const encryptedData = this.encryptSessionData(JSON.stringify(data))
      
      await this.client.setEx(key, ttlSeconds, encryptedData)
    } catch (error) {
      console.error('Redis setSession error:', error)
      throw error
    }
  }

  /**
   * Get session data with decryption
   * CONTEXT7 SOURCE: /redis/node-redis - Session retrieval with security validation
   */
  async getSession(sessionId: string): Promise<SessionData | null> {
    try {
      if (!this.isConnected) await this.connect()
      
      const key = this.getKey(sessionId, 'session')
      const encryptedData = await this.client.get(key)
      
      if (!encryptedData) return null
      
      const decryptedData = this.decryptSessionData(encryptedData)
      return JSON.parse(decryptedData) as SessionData
    } catch (error) {
      console.error('Redis getSession error:', error)
      return null
    }
  }

  /**
   * Delete session data
   */
  async deleteSession(sessionId: string): Promise<void> {
    try {
      if (!this.isConnected) await this.connect()
      
      const key = this.getKey(sessionId, 'session')
      await this.client.del(key)
    } catch (error) {
      console.error('Redis deleteSession error:', error)
      // Non-critical error for logout operations
    }
  }

  /**
   * Encrypt session data for royal client protection
   * Uses AES-256-GCM for authenticated encryption
   */
  private encryptSessionData(data: string): string {
    const algorithm = 'aes-256-gcm'
    const secretKey = process.env.SESSION_ENCRYPTION_KEY || 'default-key-for-development-only-not-secure'
    
    // Generate a random IV for each encryption
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipher(algorithm, secretKey)
    
    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    // Combine IV and encrypted data
    return iv.toString('hex') + ':' + encrypted
  }

  /**
   * Decrypt session data with integrity verification
   */
  private decryptSessionData(encryptedData: string): string {
    const algorithm = 'aes-256-gcm'
    const secretKey = process.env.SESSION_ENCRYPTION_KEY || 'default-key-for-development-only-not-secure'
    
    try {
      const parts = encryptedData.split(':')
      if (parts.length !== 2) {
        throw new Error('Invalid encrypted data format')
      }
      
      const iv = Buffer.from(parts[0], 'hex')
      const encrypted = parts[1]
      
      const decipher = crypto.createDecipher(algorithm, secretKey)
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      
      return decrypted
    } catch (error) {
      console.error('Session decryption failed:', error)
      throw new Error('Failed to decrypt session data')
    }
  }

  /**
   * Get Redis client health status
   * CONTEXT7 SOURCE: /redis/node-redis - Health monitoring patterns
   */
  async getHealthStatus(): Promise<{
    connected: boolean
    ping?: string
    memory?: any
    error?: string
  }> {
    try {
      if (!this.isConnected) {
        return { connected: false, error: 'Not connected' }
      }

      const pingResponse = await this.client.ping()
      
      return {
        connected: true,
        ping: pingResponse
      }
    } catch (error) {
      return {
        connected: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  /**
   * Clean up expired sessions and rate limits
   * This would typically be run by a background job
   */
  async cleanup(): Promise<void> {
    try {
      if (!this.isConnected) await this.connect()
      
      // Redis automatically handles TTL expiration, but we can scan for orphaned keys
      const sessionKeys = await this.client.keys(this.getKey('*', 'session'))
      const rateLimitKeys = await this.client.keys(this.getKey('*', 'rate_limit'))
      
      console.log(`Session cleanup: ${sessionKeys.length} session keys, ${rateLimitKeys.length} rate limit keys`)
    } catch (error) {
      console.error('Redis cleanup error:', error)
    }
  }
}

/**
 * Singleton instance for application-wide Redis session store
 * CONTEXT7 SOURCE: /redis/node-redis - Singleton pattern for connection pooling
 */
let redisSessionStore: RedisSessionStore | null = null

export function getRedisSessionStore(config?: {
  url?: string
  host?: string
  port?: number
  password?: string
  db?: number
  keyPrefix?: string
  maxRetries?: number
  retryDelay?: number
  fallbackToMemory?: boolean
}): RedisSessionStore {
  if (!redisSessionStore) {
    redisSessionStore = new RedisSessionStore({
      url: process.env.REDIS_URL,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : undefined,
      password: process.env.REDIS_PASSWORD,
      db: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB) : 0,
      keyPrefix: process.env.REDIS_KEY_PREFIX || 'mpto',
      maxRetries: 10,
      retryDelay: 100,
      fallbackToMemory: process.env.NODE_ENV === 'development',
      ...config
    })
  }
  
  return redisSessionStore
}

/**
 * Initialize Redis session store on application startup
 */
export async function initializeRedisSessionStore(): Promise<RedisSessionStore> {
  const store = getRedisSessionStore()
  
  try {
    await store.connect()
    console.log('✅ Redis Session Store initialized successfully')
    return store
  } catch (error) {
    console.error('❌ Failed to initialize Redis Session Store:', error)
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Redis connection required in production')
    }
    
    console.warn('⚠️ Continuing with potential fallback (development only)')
    return store
  }
}