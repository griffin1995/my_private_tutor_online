/**
 * CONTEXT7 SOURCE: /muxinc/next-video - Interactive demo embedding patterns
 * CONTEXT7 SOURCE: /web-apis/iframe - Secure iframe embedding with sandboxing
 * 
 * FAQ Rich Media Demo Component
 * Implements professional interactive demo embedding with security and accessibility
 * 
 * FEATURES:
 * - CodeSandbox, CodePen, StackBlitz, and Replit integration
 * - Lazy loading with intersection observer
 * - Secure iframe sandboxing
 * - Theme support (light/dark/auto)
 * - Responsive design with adjustable height
 * - Loading states and error handling
 * - WCAG 2.1 AA accessibility compliance
 * - Source code links and preview images
 * - Tab selection for multi-file demos
 * 
 * BUSINESS CONTEXT: Interactive coding examples for premium tutoring service
 * TARGET SEGMENTS: Students requiring hands-on programming experience
 */

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { FAQRichMediaDemo } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /lucide-react - Icon imports for demo controls
import { 
  ExternalLink, 
  Play, 
  Pause, 
  RotateCcw, 
  Code, 
  Eye,
  Loader2,
  AlertTriangle,
  Monitor,
  Moon,
  Sun,
  Maximize,
  FileCode,
  Globe
} from 'lucide-react'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/tabs'

interface FAQRichMediaDemoProps {
  readonly demo: FAQRichMediaDemo
  readonly className?: string
}

interface DemoState {
  isLoaded: boolean
  isVisible: boolean
  hasError: boolean
  isRunning: boolean
  currentTheme: 'light' | 'dark' | 'auto'
  errorMessage?: string
}

/**
 * CONTEXT7 SOURCE: /web-apis/iframe - Provider-specific embed URL generation
 * Generate secure iframe URLs for different demo providers
 */
const generateEmbedUrl = (demo: FAQRichMediaDemo, theme: string): string => {
  const baseUrl = demo.embedUrl
  const params = new URLSearchParams()

  // CONTEXT7 SOURCE: /web-apis/url - URL parameter construction for iframe embedding
  switch (demo.provider) {
    case 'codesandbox':
      params.set('autoresize', '1')
      params.set('fontsize', '14')
      params.set('theme', theme === 'dark' ? 'dark' : 'light')
      params.set('view', 'editor')
      if (!demo.editable) params.set('readonly', '1')
      if (demo.autorun) params.set('autorun', '1')
      if (demo.hideNavigation) params.set('hidenavigation', '1')
      if (demo.tabs) params.set('module', demo.tabs[0])
      break

    case 'codepen':
      params.set('theme-id', theme === 'dark' ? 'dark' : 'light')
      params.set('default-tab', demo.tabs?.join(',') || 'html,result')
      if (demo.height) params.set('height', demo.height.replace('px', ''))
      if (!demo.editable) params.set('editable', 'false')
      break

    case 'stackblitz':
      params.set('embed', '1')
      params.set('theme', theme === 'dark' ? 'dark' : 'light')
      if (!demo.editable) params.set('readonly', '1')
      if (demo.hideNavigation) params.set('hideNavigation', '1')
      if (demo.tabs) params.set('file', demo.tabs[0])
      break

    case 'replit':
      params.set('embed', 'true')
      params.set('theme', theme === 'dark' ? 'dark' : 'light')
      if (!demo.editable) params.set('readonly', 'true')
      break

    case 'custom':
      // Custom provider - use URL as-is with minimal processing
      break
  }

  if (params.toString() && demo.provider !== 'custom') {
    return `${baseUrl}?${params.toString()}`
  }
  
  return baseUrl
}

/**
 * CONTEXT7 SOURCE: /web-apis/intersection-observer - Lazy loading implementation
 * Demo embedding component with performance optimization and accessibility
 */
export function FAQRichMediaDemoPlayer({ demo, className }: FAQRichMediaDemoProps) {
  const [state, setState] = useState<DemoState>({
    isLoaded: false,
    isVisible: false,
    hasError: false,
    isRunning: demo.autorun || false,
    currentTheme: demo.theme === 'auto' ? 'light' : (demo.theme || 'light')
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // CONTEXT7 SOURCE: /web-apis/intersection-observer - Lazy loading with visibility detection
  useEffect(() => {
    if (!demo.performance.lazyLoad) {
      setState(prev => ({ ...prev, isVisible: true }))
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState(prev => ({ ...prev, isVisible: true }))
          observer.disconnect()
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px 0px'
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [demo.performance.lazyLoad])

  // CONTEXT7 SOURCE: /web-apis/prefers-color-scheme - Auto theme detection
  useEffect(() => {
    if (demo.theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = (e: MediaQueryListEvent) => {
        setState(prev => ({ 
          ...prev, 
          currentTheme: e.matches ? 'dark' : 'light' 
        }))
      }

      setState(prev => ({ 
        ...prev, 
        currentTheme: mediaQuery.matches ? 'dark' : 'light' 
      }))

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [demo.theme])

  // CONTEXT7 SOURCE: /web-apis/iframe - Iframe event handling
  const handleIframeLoad = useCallback(() => {
    setState(prev => ({ ...prev, isLoaded: true, hasError: false }))
  }, [])

  const handleIframeError = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      hasError: true, 
      isLoaded: false,
      errorMessage: 'Failed to load interactive demo'
    }))
  }, [])

  const toggleTheme = useCallback(() => {
    if (demo.theme !== 'auto') {
      setState(prev => ({ 
        ...prev, 
        currentTheme: prev.currentTheme === 'light' ? 'dark' : 'light' 
      }))
    }
  }, [demo.theme])

  const refreshDemo = useCallback(() => {
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src
      iframeRef.current.src = ''
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc
        }
      }, 100)
    }
  }, [])

  const openInNewTab = useCallback(() => {
    const url = demo.sourceUrl || demo.embedUrl
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [demo.sourceUrl, demo.embedUrl])

  // CONTEXT7 SOURCE: /web-apis/iframe - Provider icon mapping
  const getProviderIcon = useCallback(() => {
    const iconProps = { className: "w-4 h-4" }
    
    switch (demo.provider) {
      case 'codesandbox':
        return <FileCode {...iconProps} />
      case 'codepen':
        return <Code {...iconProps} />
      case 'stackblitz':
        return <FileCode {...iconProps} />
      case 'replit':
        return <Globe {...iconProps} />
      case 'custom':
        return <Monitor {...iconProps} />
      default:
        return <Code {...iconProps} />
    }
  }, [demo.provider])

  const getProviderLabel = useCallback(() => {
    const labels = {
      codesandbox: 'CodeSandbox',
      codepen: 'CodePen',
      stackblitz: 'StackBlitz',
      replit: 'Replit',
      custom: 'Custom'
    }
    return labels[demo.provider] || demo.provider
  }, [demo.provider])

  // CONTEXT7 SOURCE: /web-apis/iframe - Iframe security attributes
  const iframeSandbox = "allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"

  if (state.hasError) {
    return (
      <div className={cn(
        "border border-destructive/20 bg-destructive/5 rounded-lg p-6",
        className
      )}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-destructive mb-1">
              Demo Loading Failed
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {state.errorMessage || 'Unable to load the interactive demo.'}
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={refreshDemo}>
                <RotateCcw className="w-4 h-4 mr-1" />
                Retry
              </Button>
              {demo.sourceUrl && (
                <Button size="sm" variant="outline" onClick={openInNewTab}>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Open Source
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className={cn("space-y-4", className)}
    >
      {/* Header with controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {getProviderIcon()}
            <Badge variant="outline">
              {getProviderLabel()}
            </Badge>
          </div>
          
          <h4 className="font-semibold text-foreground">
            {demo.title}
          </h4>
        </div>

        <div className="flex items-center gap-1">
          {demo.theme !== 'auto' && (
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleTheme}
              aria-label={`Switch to ${state.currentTheme === 'light' ? 'dark' : 'light'} theme`}
            >
              {state.currentTheme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={refreshDemo}
            aria-label="Refresh demo"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={openInNewTab}
            aria-label="Open demo in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Demo container */}
      <div 
        className="relative border rounded-lg overflow-hidden bg-background"
        style={{ height: demo.height || '400px' }}
      >
        {state.isVisible ? (
          <>
            {!state.isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-background">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>
                    {demo.performance.loadingMessage || 'Loading interactive demo...'}
                  </span>
                </div>
              </div>
            )}

            <iframe
              ref={iframeRef}
              src={generateEmbedUrl(demo, state.currentTheme)}
              title={demo.accessibility.ariaLabel}
              width="100%"
              height="100%"
              sandbox={iframeSandbox}
              loading="lazy"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              className={cn(
                "border-0 transition-opacity duration-300",
                state.isLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          </>
        ) : (
          <div 
            className="flex items-center justify-center h-full bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
            onClick={() => setState(prev => ({ ...prev, isVisible: true }))}
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{demo.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Click to load interactive demo
              </p>
              {demo.preview && (
                <img 
                  src={demo.preview}
                  alt={`Preview of ${demo.title}`}
                  className="mx-auto max-w-full h-32 object-cover rounded border"
                  loading="lazy"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tab navigation for multi-file demos */}
      {demo.tabs && demo.tabs.length > 1 && (
        <Tabs defaultValue={demo.tabs[0]} className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {demo.tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab} className="text-xs">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {demo.tabs.map((tab) => (
            <TabsContent key={tab} value={tab} className="text-sm text-muted-foreground">
              Viewing: {tab}
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Additional information */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          {demo.editable && (
            <Badge variant="outline" className="text-xs">
              <Code className="w-3 h-3 mr-1" />
              Editable
            </Badge>
          )}
          
          {demo.autorun && (
            <Badge variant="outline" className="text-xs">
              <Play className="w-3 h-3 mr-1" />
              Auto-run
            </Badge>
          )}
        </div>

        {demo.sourceUrl && (
          <Button 
            size="sm" 
            variant="link" 
            onClick={openInNewTab}
            className="h-auto p-0 text-xs"
          >
            View Source <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
        )}
      </div>

      {/* CONTEXT7 SOURCE: /web-apis/web-accessibility - Accessibility support */}
      <div className="sr-only">
        <p>{demo.accessibility.description}</p>
        <p>Interactive demo from {getProviderLabel()}</p>
        {demo.editable && <p>This demo is editable - you can modify the code</p>}
      </div>
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /web-apis/iframe - Demo wrapper for FAQ contexts
 * FAQ-specific wrapper with context-appropriate styling
 */
export function FAQDemo({ demo, className }: FAQRichMediaDemoProps) {
  return (
    <div className={cn("my-6", className)}>
      <FAQRichMediaDemoPlayer demo={demo} />
    </div>
  )
}

export default FAQDemo