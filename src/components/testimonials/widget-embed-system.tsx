'use client'

// CONTEXT7 SOURCE: /vercel/react-tweet - Widget embedding system with multiple export patterns
// EMBEDDING ARCHITECTURE: Following react-tweet widget embedding patterns for cross-platform compatibility
// CONTEXT7 SOURCE: /uniswap/widgets - Configurable widget system for external integration
// WIDGET CONFIGURATION: Based on Uniswap widgets configuration pattern for customizable embedding

import React, { useEffect, useRef, useState } from 'react'
import { TestimonialsSocialWidget, SocialWidgetConfig, defaultWidgetConfigs } from './testimonials-social-widget'

// CONTEXT7 SOURCE: /vercel/react-tweet - Widget configuration types for external embedding
// CONFIGURATION TYPES: Comprehensive widget configuration interface for external sites
export interface WidgetEmbedConfig extends SocialWidgetConfig {
  containerId?: string
  apiEndpoint?: string
  trackingId?: string
  version?: string
  lazy?: boolean
  placeholder?: string
  errorMessage?: string
  retryAttempts?: number
  cacheTimeout?: number
  crossOrigin?: boolean
  allowFullscreen?: boolean
}

export interface WidgetEmbedOptions {
  config: WidgetEmbedConfig
  onLoad?: (widget: HTMLElement) => void
  onError?: (error: Error) => void
  onAnalytics?: (event: string, data: any) => void
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Widget initialization patterns
// INITIALIZATION: Widget factory pattern for programmatic embedding
export class TestimonialsWidgetEmbed {
  private config: WidgetEmbedConfig
  private container: HTMLElement | null = null
  private widget: React.ReactElement | null = null
  private onAnalytics?: (event: string, data: any) => void
  private retryCount = 0

  constructor(options: WidgetEmbedOptions) {
    this.config = { ...options.config }
    this.onAnalytics = options.onAnalytics
    
    // Validate required config
    this.validateConfig()
  }

  private validateConfig(): void {
    if (!this.config.format) {
      throw new Error('Widget format is required')
    }
    
    if (!['compact', 'card', 'carousel', 'testimonial-strip', 'floating-badge'].includes(this.config.format)) {
      throw new Error(`Invalid widget format: ${this.config.format}`)
    }
  }

  // CONTEXT7 SOURCE: /vercel/react-tweet - Container initialization pattern
  public async embed(containerId: string): Promise<void> {
    try {
      this.container = document.getElementById(containerId)
      
      if (!this.container) {
        throw new Error(`Container element with ID "${containerId}" not found`)
      }

      // Set loading state
      if (this.config.placeholder) {
        this.container.innerHTML = this.config.placeholder
      }

      // Initialize widget
      await this.initializeWidget()
      
      // Track embedding
      this.onAnalytics?.('widget_embedded', {
        containerId,
        format: this.config.format,
        theme: this.config.theme
      })
    } catch (error) {
      console.error('Widget embedding failed:', error)
      this.handleError(error as Error)
    }
  }

  private async initializeWidget(): Promise<void> {
    if (!this.container) return

    try {
      // Create React root if not exists
      const { createRoot } = await import('react-dom/client')
      const root = createRoot(this.container)
      
      // Render widget
      const widget = React.createElement(TestimonialsSocialWidget, {
        config: this.config,
        onAnalytics: this.onAnalytics,
        className: 'embedded-widget'
      })

      root.render(widget)
      this.widget = widget
      
    } catch (error) {
      throw new Error(`Failed to initialize widget: ${error}`)
    }
  }

  private handleError(error: Error): void {
    if (!this.container) return

    if (this.retryCount < (this.config.retryAttempts || 3)) {
      this.retryCount++
      setTimeout(() => this.initializeWidget(), 1000 * this.retryCount)
      return
    }

    // Show error message
    const errorMessage = this.config.errorMessage || 'Failed to load testimonials widget'
    this.container.innerHTML = `
      <div class="widget-error" style="
        padding: 16px; 
        border: 1px solid #ef4444; 
        border-radius: 8px; 
        background-color: #fef2f2; 
        color: #991b1b; 
        font-size: 14px;
      ">
        <p>${errorMessage}</p>
        <button onclick="location.reload()" style="
          margin-top: 8px; 
          padding: 4px 8px; 
          background: #dc2626; 
          color: white; 
          border: none; 
          border-radius: 4px; 
          cursor: pointer;
        ">
          Retry
        </button>
      </div>
    `

    this.onAnalytics?.('widget_error', {
      error: error.message,
      retryCount: this.retryCount
    })
  }

  // CONTEXT7 SOURCE: /vercel/react-tweet - Widget cleanup patterns
  public destroy(): void {
    if (this.container) {
      this.container.innerHTML = ''
      this.container = null
    }
    this.widget = null
  }

  public updateConfig(newConfig: Partial<WidgetEmbedConfig>): void {
    this.config = { ...this.config, ...newConfig }
    if (this.container) {
      this.initializeWidget()
    }
  }
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Global widget interface for external sites
// GLOBAL INTERFACE: Window-level widget interface for external embedding
declare global {
  interface Window {
    TestimonialsWidget?: {
      embed: (containerId: string, config: WidgetEmbedConfig) => Promise<TestimonialsWidgetEmbed>
      configure: (config: Partial<WidgetEmbedConfig>) => void
      analytics: (event: string, data: any) => void
      version: string
    }
  }
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Widget loader component for React applications  
// LOADER COMPONENT: React component wrapper for embedding widgets
export interface WidgetLoaderProps {
  config: WidgetEmbedConfig
  onLoad?: (embed: TestimonialsWidgetEmbed) => void
  onError?: (error: Error) => void
  className?: string
}

export const TestimonialsWidgetLoader: React.FC<WidgetLoaderProps> = ({
  config,
  onLoad,
  onError,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [embed, setEmbed] = useState<TestimonialsWidgetEmbed | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initializeEmbed = async () => {
      if (!containerRef.current) return

      try {
        setIsLoading(true)
        setError(null)

        const embedInstance = new TestimonialsWidgetEmbed({
          config,
          onLoad: () => {
            setIsLoading(false)
            onLoad?.(embedInstance)
          },
          onError: (err) => {
            setError(err)
            setIsLoading(false)
            onError?.(err)
          },
          onAnalytics: (event, data) => {
            // Forward analytics to parent
            config.trackingId && console.log('Widget Analytics:', { event, data, trackingId: config.trackingId })
          }
        })

        // Generate unique container ID
        const containerId = `testimonials-widget-${Date.now()}`
        containerRef.current.id = containerId

        await embedInstance.embed(containerId)
        setEmbed(embedInstance)
        setIsLoading(false)
        
      } catch (err) {
        const error = err as Error
        setError(error)
        setIsLoading(false)
        onError?.(error)
      }
    }

    initializeEmbed()

    // Cleanup on unmount
    return () => {
      if (embed) {
        embed.destroy()
      }
    }
  }, [config, embed, onLoad, onError])

  if (isLoading) {
    return (
      <div className={`widget-loading ${className}`} ref={containerRef}>
        {config.placeholder || (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-sm text-gray-600">Loading testimonials...</span>
          </div>
        )}
      </div>
    )
  }

  if (error) {
    return (
      <div className={`widget-error ${className}`}>
        <div className="p-4 border border-red-300 rounded-lg bg-red-50 text-red-700">
          <p className="text-sm">{config.errorMessage || error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return <div className={`testimonials-widget-container ${className}`} ref={containerRef} />
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Configuration builder for external integration
// CONFIGURATION BUILDER: Helper functions for creating widget configurations
export const WidgetConfigBuilder = {
  // Create compact widget configuration
  compact(overrides?: Partial<SocialWidgetConfig>): WidgetEmbedConfig {
    return {
      ...defaultWidgetConfigs.compact,
      ...overrides,
      lazy: true,
      placeholder: '<div class="widget-placeholder">Loading testimonials...</div>',
      errorMessage: 'Unable to load testimonials at this time.',
      retryAttempts: 3,
      cacheTimeout: 300000, // 5 minutes
      crossOrigin: true
    }
  },

  // Create card widget configuration
  card(overrides?: Partial<SocialWidgetConfig>): WidgetEmbedConfig {
    return {
      ...defaultWidgetConfigs.card,
      ...overrides,
      lazy: true,
      placeholder: '<div class="widget-placeholder">Loading testimonials...</div>',
      errorMessage: 'Unable to load testimonials at this time.',
      retryAttempts: 3,
      cacheTimeout: 300000,
      crossOrigin: true
    }
  },

  // Create carousel widget configuration
  carousel(overrides?: Partial<SocialWidgetConfig>): WidgetEmbedConfig {
    return {
      ...defaultWidgetConfigs.carousel,
      ...overrides,
      lazy: false, // Carousel needs immediate loading for auto-rotation
      placeholder: '<div class="widget-placeholder">Loading carousel...</div>',
      errorMessage: 'Unable to load testimonials carousel.',
      retryAttempts: 2,
      cacheTimeout: 600000, // 10 minutes
      crossOrigin: true
    }
  },

  // Create floating badge configuration
  floating(overrides?: Partial<SocialWidgetConfig>): WidgetEmbedConfig {
    return {
      ...defaultWidgetConfigs.floating,
      ...overrides,
      lazy: true,
      placeholder: '', // No placeholder for floating widgets
      errorMessage: '',
      retryAttempts: 1,
      cacheTimeout: 1800000, // 30 minutes
      crossOrigin: true
    }
  },

  // Create custom configuration
  custom(config: SocialWidgetConfig, embedOptions?: Partial<WidgetEmbedConfig>): WidgetEmbedConfig {
    return {
      ...config,
      lazy: true,
      placeholder: '<div class="widget-placeholder">Loading...</div>',
      errorMessage: 'Unable to load widget at this time.',
      retryAttempts: 3,
      cacheTimeout: 300000,
      crossOrigin: true,
      ...embedOptions
    }
  }
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Widget analytics tracking
// ANALYTICS: Built-in analytics tracking for widget performance
export const WidgetAnalytics = {
  track(event: string, data: any, trackingId?: string): void {
    if (typeof window === 'undefined') return

    // Send to parent analytics if available
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({
        type: 'testimonials-widget-analytics',
        event,
        data,
        trackingId,
        timestamp: Date.now()
      }, '*')
    }

    // Send to Google Analytics if available
    if ('gtag' in window) {
      (window as any).gtag('event', event, {
        custom_parameter: JSON.stringify(data),
        tracking_id: trackingId
      })
    }

    // Send to custom analytics endpoint if configured
    if (trackingId && data.apiEndpoint) {
      fetch(`${data.apiEndpoint}/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, data, trackingId })
      }).catch(console.error)
    }
  }
}

// CONTEXT7 SOURCE: /vercel/react-tweet - Global widget initialization
// GLOBAL INITIALIZATION: Auto-initialize widgets on page load
if (typeof window !== 'undefined') {
  window.TestimonialsWidget = {
    embed: async (containerId: string, config: WidgetEmbedConfig) => {
      const embed = new TestimonialsWidgetEmbed({
        config,
        onAnalytics: (event, data) => WidgetAnalytics.track(event, data, config.trackingId)
      })
      
      await embed.embed(containerId)
      return embed
    },
    
    configure: (config: Partial<WidgetEmbedConfig>) => {
      // Update default configurations
      Object.assign(defaultWidgetConfigs, config)
    },
    
    analytics: (event: string, data: any) => {
      WidgetAnalytics.track(event, data)
    },
    
    version: '1.0.0'
  }

  // Auto-initialize widgets with data attributes
  document.addEventListener('DOMContentLoaded', () => {
    const widgets = document.querySelectorAll('[data-testimonials-widget]')
    
    widgets.forEach(async (element) => {
      const format = element.getAttribute('data-format') || 'card'
      const theme = element.getAttribute('data-theme') || 'light'
      const maxTestimonials = parseInt(element.getAttribute('data-max') || '1')
      
      const config = WidgetConfigBuilder.custom({
        format: format as any,
        theme: theme as any,
        maxTestimonials,
        showRatings: element.getAttribute('data-ratings') !== 'false',
        showAvatars: element.getAttribute('data-avatars') !== 'false',
        showLocation: element.getAttribute('data-location') === 'true',
        autoRotate: element.getAttribute('data-autorotate') === 'true',
        showCTA: element.getAttribute('data-cta') !== 'false',
        ctaText: element.getAttribute('data-cta-text') || undefined,
        ctaLink: element.getAttribute('data-cta-link') || undefined
      })

      try {
        await window.TestimonialsWidget!.embed(element.id, config)
      } catch (error) {
        console.error('Auto-initialization failed:', error)
      }
    })
  })
}

export default TestimonialsWidgetLoader