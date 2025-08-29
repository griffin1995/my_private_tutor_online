/**
 * CONTEXT7 SOURCE: /context7/mermaid_js - Interactive diagram rendering with Mermaid.js
 * CONTEXT7 SOURCE: /context7/mermaid_js - Flowchart themes and configuration patterns
 * 
 * FAQ Rich Media Diagram Component
 * Implements professional Mermaid.js diagrams with accessibility and interactivity
 * 
 * FEATURES:
 * - Flowchart, sequence, class, state, gantt, and other diagram types
 * - Interactive diagrams with click events and zoom functionality
 * - Theme support (default, dark, neutral, forest)
 * - WCAG 2.1 AA accessibility with detailed descriptions
 * - Export functionality (SVG, PNG)
 * - Responsive design with mobile optimization
 * - Error handling with fallback content
 * - Performance optimization with lazy rendering
 * 
 * BUSINESS CONTEXT: Educational diagram content for premium tutoring service
 * TARGET SEGMENTS: All client segments requiring visual explanations
 */

'use client'

// CONTEXT7 SOURCE: /context7/mermaid_js - Dynamic import patterns for Mermaid.js
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { FAQRichMediaDiagram } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /lucide-react - Icon imports for diagram controls
import { 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Maximize, 
  Eye, 
  Code,
  AlertTriangle,
  Loader2
} from 'lucide-react'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'

// CONTEXT7 SOURCE: /context7/mermaid_js - Lazy loading Mermaid to reduce initial bundle size
let mermaid: any = null

interface FAQRichMediaDiagramProps {
  readonly diagram: FAQRichMediaDiagram
  readonly className?: string
}

interface DiagramState {
  isLoading: boolean
  hasError: boolean
  errorMessage?: string
  isInteractive: boolean
  zoomLevel: number
  renderedSvg?: string
}

/**
 * CONTEXT7 SOURCE: /context7/mermaid_js - Mermaid.js configuration and initialization
 * Professional diagram renderer with accessibility and performance features
 */
export function FAQRichMediaDiagramRenderer({ diagram, className }: FAQRichMediaDiagramProps) {
  const [state, setState] = useState<DiagramState>({
    isLoading: true,
    hasError: false,
    isInteractive: false,
    zoomLevel: 1
  })
  
  const [showSource, setShowSource] = useState(false)
  const diagramRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // CONTEXT7 SOURCE: /context7/mermaid_js - Mermaid initialization and configuration
  const initializeMermaid = useCallback(async () => {
    try {
      if (!mermaid) {
        const mermaidModule = await import('mermaid')
        mermaid = mermaidModule.default
        
        // CONTEXT7 SOURCE: /context7/mermaid_js - Configuration for security and accessibility
        mermaid.initialize({
          startOnLoad: false,
          theme: diagram.theme || 'default',
          securityLevel: 'loose', // Required for interactive features
          fontFamily: diagram.configuration?.fontFamily || 'Inter, system-ui, sans-serif',
          fontSize: diagram.configuration?.fontSize || 16,
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'cardinal'
          },
          sequence: {
            useMaxWidth: true,
            wrap: true
          },
          gantt: {
            useMaxWidth: true,
            fontSize: diagram.configuration?.fontSize || 14
          },
          mindmap: {
            useMaxWidth: true
          }
        })
      }
    } catch (error) {
      console.error('Failed to initialize Mermaid:', error)
      setState(prev => ({ 
        ...prev, 
        hasError: true, 
        isLoading: false,
        errorMessage: 'Failed to load diagram renderer'
      }))
    }
  }, [diagram.theme, diagram.configuration])

  // CONTEXT7 SOURCE: /context7/mermaid_js - Diagram rendering with error handling
  const renderDiagram = useCallback(async () => {
    if (!mermaid || !diagramRef.current) return

    try {
      setState(prev => ({ ...prev, isLoading: true, hasError: false }))

      // CONTEXT7 SOURCE: /context7/mermaid_js - Diagram validation and rendering
      const diagramId = `faq-diagram-${diagram.id}`
      
      // Clear previous content
      diagramRef.current.innerHTML = ''
      
      // CONTEXT7 SOURCE: /context7/mermaid_js - SVG rendering with custom configuration
      const { svg, bindFunctions } = await mermaid.render(diagramId, diagram.definition)
      
      if (diagramRef.current) {
        diagramRef.current.innerHTML = svg
        
        // CONTEXT7 SOURCE: /context7/mermaid_js - Binding interactive functions for click events
        if (bindFunctions && diagram.interactive) {
          bindFunctions(diagramRef.current)
          setState(prev => ({ ...prev, isInteractive: true }))
        }

        // Apply custom styles
        const svgElement = diagramRef.current.querySelector('svg')
        if (svgElement) {
          svgElement.setAttribute('width', '100%')
          svgElement.setAttribute('height', 'auto')
          svgElement.style.maxWidth = '100%'
          
          // CONTEXT7 SOURCE: /context7/mermaid_js - Accessibility attributes for diagrams
          svgElement.setAttribute('role', 'img')
          svgElement.setAttribute('aria-label', diagram.accessibility.ariaLabel)
          if (diagram.accessibility.longDescription) {
            svgElement.setAttribute('aria-describedby', `${diagramId}-description`)
          }
        }

        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          renderedSvg: svg 
        }))
      }
    } catch (error) {
      console.error('Diagram rendering error:', error)
      setState(prev => ({ 
        ...prev, 
        hasError: true, 
        isLoading: false,
        errorMessage: error instanceof Error ? error.message : 'Rendering failed'
      }))
    }
  }, [mermaid, diagram])

  // CONTEXT7 SOURCE: /react - Effect hook for Mermaid initialization and rendering
  useEffect(() => {
    initializeMermaid().then(() => {
      renderDiagram()
    })
  }, [initializeMermaid, renderDiagram])

  // CONTEXT7 SOURCE: /web-apis/dom - Zoom functionality implementation
  const handleZoom = useCallback((direction: 'in' | 'out' | 'reset') => {
    if (!diagramRef.current) return

    let newZoomLevel = state.zoomLevel
    switch (direction) {
      case 'in':
        newZoomLevel = Math.min(state.zoomLevel * 1.2, 3)
        break
      case 'out':
        newZoomLevel = Math.max(state.zoomLevel / 1.2, 0.5)
        break
      case 'reset':
        newZoomLevel = 1
        break
    }

    const svgElement = diagramRef.current.querySelector('svg')
    if (svgElement) {
      svgElement.style.transform = `scale(${newZoomLevel})`
      svgElement.style.transformOrigin = 'top left'
    }

    setState(prev => ({ ...prev, zoomLevel: newZoomLevel }))
  }, [state.zoomLevel])

  // CONTEXT7 SOURCE: /web-apis/dom - Export functionality for diagrams
  const handleExport = useCallback(async (format: 'svg' | 'png') => {
    if (!state.renderedSvg) return

    try {
      if (format === 'svg') {
        const blob = new Blob([state.renderedSvg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${diagram.title || 'diagram'}.svg`
        link.click()
        URL.revokeObjectURL(url)
      } else if (format === 'png') {
        // Convert SVG to PNG using canvas
        const svgElement = diagramRef.current?.querySelector('svg')
        if (!svgElement) return

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()

        const svgData = new XMLSerializer().serializeToString(svgElement)
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
        const svgUrl = URL.createObjectURL(svgBlob)

        img.onload = () => {
          canvas.width = img.width * 2 // Higher resolution
          canvas.height = img.height * 2
          ctx?.scale(2, 2)
          ctx?.drawImage(img, 0, 0)
          
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = url
              link.download = `${diagram.title || 'diagram'}.png`
              link.click()
              URL.revokeObjectURL(url)
            }
          }, 'image/png')
          
          URL.revokeObjectURL(svgUrl)
        }

        img.src = svgUrl
      }
    } catch (error) {
      console.error('Export failed:', error)
    }
  }, [state.renderedSvg, diagram.title])

  // CONTEXT7 SOURCE: /context7/mermaid_js - Diagram type badge rendering
  const getDiagramTypeBadge = useCallback(() => {
    const typeLabels = {
      flowchart: 'Flowchart',
      sequence: 'Sequence',
      class: 'Class Diagram',
      state: 'State Diagram',
      gantt: 'Gantt Chart',
      pie: 'Pie Chart',
      journey: 'User Journey',
      mindmap: 'Mind Map'
    }

    return (
      <Badge variant="secondary" className="mb-3">
        {typeLabels[diagram.diagramType] || diagram.diagramType}
      </Badge>
    )
  }, [diagram.diagramType])

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
              Diagram Rendering Failed
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {state.errorMessage || 'Unable to render the diagram. Please check the diagram definition.'}
            </p>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setShowSource(!showSource)}
              >
                <Code className="w-4 h-4 mr-1" />
                {showSource ? 'Hide' : 'View'} Source
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={renderDiagram}
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Retry
              </Button>
            </div>
            {showSource && (
              <pre className="mt-3 p-3 bg-muted rounded text-xs overflow-x-auto">
                <code>{diagram.definition}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header with title and controls */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          {getDiagramTypeBadge()}
          <h4 className="font-semibold text-lg text-foreground">
            {diagram.title}
          </h4>
        </div>
        
        <div className="flex items-center gap-1">
          {diagram.zoomable && (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleZoom('out')}
                disabled={state.zoomLevel <= 0.5}
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleZoom('reset')}
                aria-label="Reset zoom"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleZoom('in')}
                disabled={state.zoomLevel >= 3}
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </>
          )}
          
          {diagram.exportable && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleExport('svg')}
              disabled={!state.renderedSvg}
              aria-label="Export diagram"
            >
              <Download className="w-4 h-4" />
            </Button>
          )}
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowSource(!showSource)}
            aria-label={showSource ? 'Hide source code' : 'View source code'}
          >
            <Code className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Diagram container */}
      <div 
        ref={containerRef}
        className="relative border rounded-lg bg-background overflow-hidden"
        style={{
          minHeight: '200px',
          backgroundColor: diagram.configuration?.backgroundColor
        }}
      >
        {state.isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Rendering diagram...</span>
            </div>
          </div>
        )}
        
        <div 
          ref={diagramRef} 
          className="p-4 overflow-auto"
          style={{
            minHeight: '200px',
            width: diagram.configuration?.width || '100%'
          }}
        />

        {state.isInteractive && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-background/90">
              Interactive
            </Badge>
          </div>
        )}
      </div>

      {/* Source code view */}
      {showSource && (
        <div className="border rounded-lg">
          <div className="bg-muted px-3 py-2 border-b">
            <span className="text-sm font-medium">Diagram Definition</span>
          </div>
          <pre className="p-4 text-xs overflow-x-auto">
            <code className="language-mermaid">{diagram.definition}</code>
          </pre>
        </div>
      )}

      {/* CONTEXT7 SOURCE: /web-apis/web-accessibility - Accessibility support */}
      <div className="sr-only">
        <p>{diagram.accessibility.description}</p>
        {diagram.accessibility.longDescription && (
          <div id={`faq-diagram-${diagram.id}-description`}>
            {diagram.accessibility.longDescription}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /context7/mermaid_js - Diagram wrapper for FAQ contexts
 * FAQ-specific wrapper with context-appropriate styling
 */
export function FAQDiagram({ diagram, className }: FAQRichMediaDiagramProps) {
  return (
    <div className={cn("my-6", className)}>
      <FAQRichMediaDiagramRenderer diagram={diagram} />
    </div>
  )
}

export default FAQDiagram