/**
 * CONTEXT7 SOURCE: /formidablelabs/prism-react-renderer - Syntax highlighting with React integration
 * CONTEXT7 SOURCE: /formidablelabs/prism-react-renderer - Theme configuration and token handling
 * 
 * FAQ Rich Media Code Component
 * Implements professional syntax highlighting with copy functionality and accessibility
 * 
 * FEATURES:
 * - Syntax highlighting with Prism React Renderer
 * - Multiple theme support (dracula, github, vscode, atom, material)
 * - Copy to clipboard functionality with feedback
 * - Line numbering and line highlighting
 * - Collapsible code blocks
 * - File name display and metadata
 * - WCAG 2.1 AA accessibility compliance
 * - Mobile-responsive design
 * - Keyboard navigation support
 * 
 * BUSINESS CONTEXT: Code examples and technical content for premium tutoring service
 * TARGET SEGMENTS: Students requiring programming and technical instruction
 */

'use client'

// CONTEXT7 SOURCE: /formidablelabs/prism-react-renderer - Highlight component and themes
import { Highlight, themes } from 'prism-react-renderer'
import { useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { FAQRichMediaCode } from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /lucide-react - Icon imports for code block controls
import { 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Code2, 
  Download,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { Button } from '@/ui/button'
import { Badge } from '@/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/ui/collapsible'

interface FAQRichMediaCodeProps {
  readonly code: FAQRichMediaCode
  readonly className?: string
}

interface CodeState {
  isCopied: boolean
  isCollapsed: boolean
  isFullscreen: boolean
  selectedLines: Set<number>
}

/**
 * CONTEXT7 SOURCE: /formidablelabs/prism-react-renderer - Theme mapping for different styles
 * Theme configuration for syntax highlighting
 */
const getThemeConfig = (themeName: string) => {
  const themeMap = {
    dracula: themes.dracula,
    github: themes.github,
    vscode: themes.vsDark,
    atom: themes.oneDark,
    material: themes.palenight
  }
  return themeMap[themeName as keyof typeof themeMap] || themes.github
}

/**
 * CONTEXT7 SOURCE: /formidablelabs/prism-react-renderer - Language display names
 * Human-readable language names for display
 */
const getLanguageLabel = (language: string): string => {
  const languageLabels: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    jsx: 'React JSX',
    tsx: 'React TSX',
    python: 'Python',
    java: 'Java',
    csharp: 'C#',
    cpp: 'C++',
    css: 'CSS',
    html: 'HTML',
    json: 'JSON',
    yaml: 'YAML',
    sql: 'SQL',
    bash: 'Bash',
    powershell: 'PowerShell',
    php: 'PHP',
    ruby: 'Ruby',
    go: 'Go',
    rust: 'Rust',
    swift: 'Swift',
    kotlin: 'Kotlin',
    dart: 'Dart',
    r: 'R',
    matlab: 'MATLAB',
    latex: 'LaTeX',
    markdown: 'Markdown'
  }
  return languageLabels[language.toLowerCase()] || language.toUpperCase()
}

/**
 * CONTEXT7 SOURCE: /formidablelabs/prism-react-renderer - Code highlighting component with accessibility
 * Professional code block with advanced features and premium styling
 */
export function FAQRichMediaCodeHighlighter({ code, className }: FAQRichMediaCodeProps) {
  const [state, setState] = useState<CodeState>({
    isCopied: false,
    isCollapsed: code.collapsible || false,
    isFullscreen: false,
    selectedLines: new Set()
  })

  const codeRef = useRef<HTMLPreElement>(null)
  const theme = getThemeConfig(code.theme || 'github')

  // CONTEXT7 SOURCE: /web-apis/clipboard - Copy to clipboard functionality
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code.code)
      setState(prev => ({ ...prev, isCopied: true }))
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setState(prev => ({ ...prev, isCopied: false }))
      }, 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
      
      // Fallback: Select text for manual copying
      if (codeRef.current) {
        const range = document.createRange()
        range.selectNodeContents(codeRef.current)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
    }
  }, [code.code])

  // CONTEXT7 SOURCE: /web-apis/dom - Download code as file
  const handleDownload = useCallback(() => {
    const blob = new Blob([code.code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    // Use filename if provided, otherwise generate from language
    const extension = getFileExtension(code.language)
    link.download = code.fileName || `code-snippet.${extension}`
    link.click()
    URL.revokeObjectURL(url)
  }, [code.code, code.fileName, code.language])

  // CONTEXT7 SOURCE: /web-apis/dom - Toggle fullscreen view
  const toggleFullscreen = useCallback(() => {
    setState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }))
  }, [])

  // CONTEXT7 SOURCE: /formidablelabs/prism-react-renderer - Line highlighting logic
  const isLineHighlighted = useCallback((lineNumber: number): boolean => {
    if (!code.highlightLines) return false
    return code.highlightLines.includes(lineNumber)
  }, [code.highlightLines])

  // Helper function to get file extension from language
  const getFileExtension = (language: string): string => {
    const extensions: Record<string, string> = {
      javascript: 'js',
      typescript: 'ts',
      jsx: 'jsx',
      tsx: 'tsx',
      python: 'py',
      java: 'java',
      csharp: 'cs',
      cpp: 'cpp',
      css: 'css',
      html: 'html',
      json: 'json',
      yaml: 'yml',
      sql: 'sql',
      bash: 'sh',
      php: 'php',
      ruby: 'rb',
      go: 'go',
      rust: 'rs',
      swift: 'swift',
      kotlin: 'kt',
      dart: 'dart'
    }
    return extensions[language.toLowerCase()] || 'txt'
  }

  // CONTEXT7 SOURCE: /react - Effect for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Copy shortcut (Ctrl/Cmd + C when code is focused)
      if ((event.ctrlKey || event.metaKey) && event.key === 'c' && code.copyable) {
        const selection = window.getSelection()
        const codeContainer = codeRef.current?.closest('.code-container')
        if (selection && codeContainer?.contains(selection.anchorNode)) {
          handleCopy()
          event.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleCopy, code.copyable])

  const renderCodeHeader = () => (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-muted border-b">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-muted-foreground" />
          <Badge variant="secondary" className="text-xs">
            {getLanguageLabel(code.language)}
          </Badge>
        </div>
        
        {code.fileName && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground min-w-0">
            <FileText className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{code.fileName}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        {code.collapsible && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setState(prev => ({ ...prev, isCollapsed: !prev.isCollapsed }))}
            aria-label={state.isCollapsed ? 'Expand code' : 'Collapse code'}
          >
            {state.isCollapsed ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </Button>
        )}

        <Button
          size="sm"
          variant="ghost"
          onClick={toggleFullscreen}
          aria-label={state.isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {state.isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={handleDownload}
          aria-label="Download code"
        >
          <Download className="w-4 h-4" />
        </Button>

        {code.copyable && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className={cn(
              "transition-colors",
              state.isCopied && "text-green-600 hover:text-green-600"
            )}
            aria-label={state.isCopied ? 'Code copied!' : 'Copy code to clipboard'}
          >
            {state.isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>
    </div>
  )

  const renderCodeContent = () => (
    // CONTEXT7 SOURCE: /formidablelabs/prism-react-renderer - Highlight component usage
    <Highlight
      theme={theme}
      code={code.code}
      language={code.language as any}
    >
      {({ className: hlClassName, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          ref={codeRef}
          className={cn(
            "overflow-auto text-sm leading-relaxed code-container",
            hlClassName
          )}
          style={{
            ...style,
            margin: 0,
            padding: '1rem',
            maxHeight: code.maxHeight || (state.isFullscreen ? '80vh' : '500px'),
            backgroundColor: style.backgroundColor || 'transparent'
          }}
          tabIndex={0}
          role="region"
          aria-label={`${getLanguageLabel(code.language)} code block`}
        >
          {tokens.map((line, lineIndex) => {
            const lineNumber = (code.startLine || 1) + lineIndex
            const isHighlighted = isLineHighlighted(lineNumber)
            
            return (
              <div
                key={lineIndex}
                {...getLineProps({ line })}
                className={cn(
                  "table-row",
                  isHighlighted && "bg-yellow-100/20 border-l-2 border-yellow-400"
                )}
              >
                {code.showLineNumbers && (
                  <span 
                    className="table-cell pr-4 text-right text-muted-foreground select-none sticky left-0 bg-inherit"
                    style={{ minWidth: '3rem' }}
                  >
                    {lineNumber}
                  </span>
                )}
                <span className="table-cell">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )

  const renderMetadata = () => {
    if (!code.metadata) return null

    return (
      <div className="px-4 py-2 bg-muted/50 border-t text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-4">
          {code.metadata.author && (
            <span>Author: {code.metadata.author}</span>
          )}
          {code.metadata.version && (
            <span>Version: {code.metadata.version}</span>
          )}
          {code.metadata.lastModified && (
            <span>
              Modified: {new Date(code.metadata.lastModified).toLocaleDateString()}
            </span>
          )}
          {code.metadata.dependencies && code.metadata.dependencies.length > 0 && (
            <span>
              Dependencies: {code.metadata.dependencies.join(', ')}
            </span>
          )}
        </div>
      </div>
    )
  }

  if (state.isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background">
        <div className="h-full flex flex-col">
          {renderCodeHeader()}
          <div className="flex-1 overflow-hidden">
            {renderCodeContent()}
          </div>
          {renderMetadata()}
        </div>
      </div>
    )
  }

  const codeBlock = (
    <div className={cn(
      "border rounded-lg overflow-hidden bg-background",
      className
    )}>
      {renderCodeHeader()}
      <CollapsibleContent>
        {renderCodeContent()}
        {renderMetadata()}
      </CollapsibleContent>

      {/* CONTEXT7 SOURCE: /web-apis/web-accessibility - Accessibility information */}
      <div className="sr-only">
        <p>{code.accessibility.description}</p>
        <p>Use Ctrl+C to copy the code when focused</p>
      </div>
    </div>
  )

  if (code.collapsible) {
    return (
      <Collapsible
        open={!state.isCollapsed}
        onOpenChange={(open) => setState(prev => ({ ...prev, isCollapsed: !open }))}
      >
        {codeBlock}
      </Collapsible>
    )
  }

  return codeBlock
}

/**
 * CONTEXT7 SOURCE: /formidablelabs/prism-react-renderer - Code wrapper for FAQ contexts
 * FAQ-specific wrapper with context-appropriate styling
 */
export function FAQCode({ code, className }: FAQRichMediaCodeProps) {
  return (
    <div className={cn("my-6", className)}>
      {code.title && (
        <h4 className="font-semibold text-lg mb-3 text-foreground">
          {code.title}
        </h4>
      )}
      
      <FAQRichMediaCodeHighlighter code={code} />
    </div>
  )
}

export default FAQCode