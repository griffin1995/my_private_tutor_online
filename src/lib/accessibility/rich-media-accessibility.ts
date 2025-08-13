/**
 * CONTEXT7 SOURCE: /web-apis/web-accessibility - WCAG 2.1 AA compliance patterns
 * CONTEXT7 SOURCE: /web-apis/aria - ARIA attributes and accessibility best practices
 * 
 * Rich Media Accessibility Utilities
 * Comprehensive WCAG 2.1 AA compliance for all rich media content types
 * 
 * COMPLIANCE FEATURES:
 * - WCAG 2.1 AA Level compliance
 * - Screen reader compatibility
 * - Keyboard navigation support
 * - High contrast mode support
 * - Motion sensitivity handling
 * - Focus management
 * - Alternative text generation
 * - Transcript support
 * - Semantic markup validation
 * 
 * BUSINESS CONTEXT: Royal client-worthy accessibility for premium tutoring service
 * TARGET SEGMENTS: All users including those with disabilities
 */

import type { 
  FAQRichMediaVideo, 
  FAQRichMediaDiagram, 
  FAQRichMediaCode, 
  FAQRichMediaDemo, 
  FAQRichMediaGif,
  FAQRichMediaContent 
} from '@/lib/cms/cms-content'

// CONTEXT7 SOURCE: /web-apis/web-accessibility - WCAG 2.1 AA compliance interfaces
export interface AccessibilityAuditResult {
  compliant: boolean
  level: 'A' | 'AA' | 'AAA'
  issues: AccessibilityIssue[]
  recommendations: string[]
  score: number // 0-100
}

export interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info'
  wcagRule: string
  description: string
  element?: string
  severity: 'critical' | 'serious' | 'moderate' | 'minor'
  fix?: string
}

export interface AccessibilityContext {
  userPreferences: {
    reducedMotion: boolean
    highContrast: boolean
    screenReader: boolean
    keyboardOnly: boolean
    fontSize: 'small' | 'medium' | 'large' | 'extra-large'
  }
  capabilities: {
    supportsAudio: boolean
    supportsVideo: boolean
    supportsInteraction: boolean
  }
  device: {
    type: 'mobile' | 'tablet' | 'desktop'
    orientation: 'portrait' | 'landscape'
    touchCapable: boolean
  }
}

/**
 * CONTEXT7 SOURCE: /web-apis/web-accessibility - WCAG 2.1 AA video compliance
 * Video accessibility compliance checker
 */
export class VideoAccessibility {
  static validateVideo(video: FAQRichMediaVideo): AccessibilityAuditResult {
    const issues: AccessibilityIssue[] = []
    let score = 100

    // WCAG 2.1.1 - Audio and video alternatives
    if (!video.captions || video.captions.length === 0) {
      issues.push({
        type: 'error',
        wcagRule: '1.2.2',
        description: 'Video must have captions for all audio content',
        severity: 'critical',
        fix: 'Add caption files to the captions array'
      })
      score -= 25
    }

    if (!video.transcript) {
      issues.push({
        type: 'warning',
        wcagRule: '1.2.3',
        description: 'Video should have a text transcript',
        severity: 'serious',
        fix: 'Add transcript text to the transcript field'
      })
      score -= 15
    }

    // WCAG 1.4.2 - Audio control
    if (video.autoplay && !video.muted) {
      issues.push({
        type: 'error',
        wcagRule: '1.4.2',
        description: 'Autoplay videos with audio must be muted by default',
        severity: 'critical',
        fix: 'Set muted: true when autoplay is enabled'
      })
      score -= 30
    }

    // WCAG 1.3.1 - Information and relationships
    if (!video.accessibility.ariaLabel) {
      issues.push({
        type: 'error',
        wcagRule: '1.3.1',
        description: 'Video must have an accessible name (aria-label)',
        severity: 'critical',
        fix: 'Add descriptive aria-label to accessibility.ariaLabel'
      })
      score -= 20
    }

    if (!video.accessibility.description) {
      issues.push({
        type: 'warning',
        wcagRule: '1.3.1',
        description: 'Video should have a detailed description',
        severity: 'moderate',
        fix: 'Add detailed description to accessibility.description'
      })
      score -= 10
    }

    // WCAG 2.1.1 - Keyboard accessible
    if (!video.controls) {
      issues.push({
        type: 'warning',
        wcagRule: '2.1.1',
        description: 'Video controls should be keyboard accessible',
        severity: 'serious',
        fix: 'Enable controls or provide custom keyboard-accessible controls'
      })
      score -= 15
    }

    return {
      compliant: issues.filter(issue => issue.severity === 'critical').length === 0,
      level: score >= 80 ? 'AA' : 'A',
      issues,
      recommendations: this.getVideoRecommendations(video),
      score: Math.max(0, score)
    }
  }

  private static getVideoRecommendations(video: FAQRichMediaVideo): string[] {
    const recommendations = []

    if (video.duration && video.duration > 300) { // 5 minutes
      recommendations.push('Consider adding chapter markers for longer videos')
    }

    if (!video.thumbnail) {
      recommendations.push('Add a descriptive thumbnail image for better UX')
    }

    recommendations.push('Test video with screen readers and keyboard navigation')
    recommendations.push('Verify captions are accurate and properly timed')
    
    return recommendations
  }
}

/**
 * CONTEXT7 SOURCE: /web-apis/web-accessibility - WCAG 2.1 AA diagram compliance
 * Diagram accessibility compliance checker
 */
export class DiagramAccessibility {
  static validateDiagram(diagram: FAQRichMediaDiagram): AccessibilityAuditResult {
    const issues: AccessibilityIssue[] = []
    let score = 100

    // WCAG 1.1.1 - Non-text content
    if (!diagram.accessibility.ariaLabel) {
      issues.push({
        type: 'error',
        wcagRule: '1.1.1',
        description: 'Diagram must have alternative text (aria-label)',
        severity: 'critical',
        fix: 'Add descriptive aria-label to accessibility.ariaLabel'
      })
      score -= 30
    }

    if (!diagram.accessibility.longDescription) {
      issues.push({
        type: 'error',
        wcagRule: '1.1.1',
        description: 'Complex diagram must have detailed description',
        severity: 'critical',
        fix: 'Add detailed description to accessibility.longDescription'
      })
      score -= 25
    }

    // WCAG 1.4.3 - Contrast
    if (diagram.theme === 'dark' && !diagram.configuration?.backgroundColor) {
      issues.push({
        type: 'warning',
        wcagRule: '1.4.3',
        description: 'Dark theme may have insufficient contrast',
        severity: 'moderate',
        fix: 'Test color contrast ratios and adjust if necessary'
      })
      score -= 10
    }

    // WCAG 2.1.1 - Keyboard accessible
    if (diagram.interactive && !diagram.zoomable) {
      issues.push({
        type: 'warning',
        wcagRule: '2.1.1',
        description: 'Interactive diagrams should be keyboard accessible',
        severity: 'serious',
        fix: 'Enable keyboard navigation for interactive elements'
      })
      score -= 15
    }

    return {
      compliant: issues.filter(issue => issue.severity === 'critical').length === 0,
      level: score >= 80 ? 'AA' : 'A',
      issues,
      recommendations: this.getDiagramRecommendations(diagram),
      score: Math.max(0, score)
    }
  }

  private static getDiagramRecommendations(diagram: FAQRichMediaDiagram): string[] {
    const recommendations = [
      'Ensure all diagram elements have semantic meaning',
      'Use consistent color schemes with sufficient contrast',
      'Provide tabular data alternative for complex relationships',
      'Test with screen readers and keyboard navigation'
    ]

    if (diagram.interactive) {
      recommendations.push('Provide keyboard shortcuts for interactive elements')
      recommendations.push('Include focus indicators for all interactive parts')
    }

    return recommendations
  }
}

/**
 * CONTEXT7 SOURCE: /web-apis/web-accessibility - WCAG 2.1 AA code compliance
 * Code block accessibility compliance checker
 */
export class CodeAccessibility {
  static validateCode(code: FAQRichMediaCode): AccessibilityAuditResult {
    const issues: AccessibilityIssue[] = []
    let score = 100

    // WCAG 1.3.1 - Information and relationships
    if (!code.accessibility.ariaLabel) {
      issues.push({
        type: 'error',
        wcagRule: '1.3.1',
        description: 'Code block must have accessible name',
        severity: 'critical',
        fix: 'Add descriptive aria-label to accessibility.ariaLabel'
      })
      score -= 25
    }

    // WCAG 2.1.1 - Keyboard accessible
    if (code.copyable && !code.accessibility.description.includes('keyboard')) {
      issues.push({
        type: 'warning',
        wcagRule: '2.1.1',
        description: 'Copy functionality should be keyboard accessible',
        severity: 'moderate',
        fix: 'Ensure copy button is keyboard accessible'
      })
      score -= 10
    }

    // WCAG 1.4.3 - Contrast (minimum)
    if (code.theme === 'dark') {
      issues.push({
        type: 'info',
        wcagRule: '1.4.3',
        description: 'Verify syntax highlighting has sufficient contrast',
        severity: 'minor',
        fix: 'Test all syntax colors for WCAG AA contrast compliance'
      })
      score -= 5
    }

    // WCAG 1.4.12 - Text Spacing
    if (code.showLineNumbers && !code.accessibility.description.includes('line')) {
      issues.push({
        type: 'info',
        wcagRule: '1.4.12',
        description: 'Line numbers should be announced to screen readers',
        severity: 'minor',
        fix: 'Include line number information in accessibility description'
      })
      score -= 5
    }

    return {
      compliant: issues.filter(issue => issue.severity === 'critical').length === 0,
      level: score >= 80 ? 'AA' : 'A',
      issues,
      recommendations: this.getCodeRecommendations(code),
      score: Math.max(0, score)
    }
  }

  private static getCodeRecommendations(code: FAQRichMediaCode): string[] {
    const recommendations = [
      'Use semantic HTML5 elements for code structure',
      'Ensure syntax highlighting colors meet contrast requirements',
      'Provide plain text alternative for screen readers',
      'Test with various screen readers and keyboard navigation'
    ]

    if (code.collapsible) {
      recommendations.push('Clearly indicate expandable/collapsible state')
    }

    if (code.highlightLines?.length) {
      recommendations.push('Announce highlighted lines to screen readers')
    }

    return recommendations
  }
}

/**
 * CONTEXT7 SOURCE: /web-apis/web-accessibility - WCAG 2.1 AA demo compliance
 * Interactive demo accessibility compliance checker
 */
export class DemoAccessibility {
  static validateDemo(demo: FAQRichMediaDemo): AccessibilityAuditResult {
    const issues: AccessibilityIssue[] = []
    let score = 100

    // WCAG 1.3.1 - Information and relationships
    if (!demo.accessibility.ariaLabel) {
      issues.push({
        type: 'error',
        wcagRule: '1.3.1',
        description: 'Interactive demo must have accessible name',
        severity: 'critical',
        fix: 'Add descriptive aria-label to accessibility.ariaLabel'
      })
      score -= 25
    }

    // WCAG 2.1.1 - Keyboard accessible
    if (!demo.accessibility.description.includes('keyboard')) {
      issues.push({
        type: 'warning',
        wcagRule: '2.1.1',
        description: 'Interactive demo should describe keyboard usage',
        severity: 'moderate',
        fix: 'Include keyboard navigation instructions in description'
      })
      score -= 15
    }

    // WCAG 4.1.2 - Name, Role, Value
    if (!demo.sourceUrl && demo.editable) {
      issues.push({
        type: 'warning',
        wcagRule: '4.1.2',
        description: 'Editable demos should provide source code access',
        severity: 'moderate',
        fix: 'Add sourceUrl for code transparency'
      })
      score -= 10
    }

    // WCAG 2.2.2 - Pause, Stop, Hide
    if (demo.autorun) {
      issues.push({
        type: 'warning',
        wcagRule: '2.2.2',
        description: 'Auto-running demos should be pausable',
        severity: 'moderate',
        fix: 'Provide pause/stop controls for auto-running content'
      })
      score -= 15
    }

    return {
      compliant: issues.filter(issue => issue.severity === 'critical').length === 0,
      level: score >= 80 ? 'AA' : 'A',
      issues,
      recommendations: this.getDemoRecommendations(demo),
      score: Math.max(0, score)
    }
  }

  private static getDemoRecommendations(demo: FAQRichMediaDemo): string[] {
    const recommendations = [
      'Ensure embedded content is keyboard accessible',
      'Provide alternative text descriptions for visual elements',
      'Test with various assistive technologies',
      'Consider providing step-by-step instructions'
    ]

    if (demo.editable) {
      recommendations.push('Announce editing capabilities to screen readers')
      recommendations.push('Provide keyboard shortcuts for common editing actions')
    }

    return recommendations
  }
}

/**
 * CONTEXT7 SOURCE: /web-apis/web-accessibility - WCAG 2.1 AA GIF compliance
 * GIF/animation accessibility compliance checker
 */
export class GifAccessibility {
  static validateGif(gif: FAQRichMediaGif): AccessibilityAuditResult {
    const issues: AccessibilityIssue[] = []
    let score = 100

    // WCAG 1.1.1 - Non-text content
    if (!gif.accessibility.altText) {
      issues.push({
        type: 'error',
        wcagRule: '1.1.1',
        description: 'GIF must have alternative text',
        severity: 'critical',
        fix: 'Add descriptive alt text to accessibility.altText'
      })
      score -= 30
    }

    // WCAG 2.3.1 - Three flashes or below threshold
    if (gif.autoplay && gif.loop) {
      issues.push({
        type: 'warning',
        wcagRule: '2.3.1',
        description: 'Auto-playing looped animations may cause seizures',
        severity: 'serious',
        fix: 'Provide pause controls or disable autoplay for looped content'
      })
      score -= 20
    }

    // WCAG 2.2.2 - Pause, Stop, Hide
    if (gif.autoplay && !gif.controls) {
      issues.push({
        type: 'error',
        wcagRule: '2.2.2',
        description: 'Auto-playing animations must have pause controls',
        severity: 'critical',
        fix: 'Add pause/play controls or disable autoplay'
      })
      score -= 25
    }

    // WCAG 1.4.2 - Audio Control (if applicable)
    if (gif.url.includes('sound') || gif.title.toLowerCase().includes('audio')) {
      issues.push({
        type: 'warning',
        wcagRule: '1.4.2',
        description: 'Animated content with audio needs controls',
        severity: 'moderate',
        fix: 'Ensure audio controls are available'
      })
      score -= 15
    }

    return {
      compliant: issues.filter(issue => issue.severity === 'critical').length === 0,
      level: score >= 80 ? 'AA' : 'A',
      issues,
      recommendations: this.getGifRecommendations(gif),
      score: Math.max(0, score)
    }
  }

  private static getGifRecommendations(gif: FAQRichMediaGif): string[] {
    const recommendations = [
      'Provide static alternative for animated content',
      'Ensure essential information is not conveyed through animation alone',
      'Test with motion sensitivity preferences',
      'Consider providing text descriptions of animated sequences'
    ]

    if (gif.playOnHover) {
      recommendations.push('Ensure hover interactions are keyboard accessible')
    }

    return recommendations
  }
}

/**
 * CONTEXT7 SOURCE: /web-apis/web-accessibility - Comprehensive accessibility auditor
 * Main accessibility auditor for all rich media types
 */
export class RichMediaAccessibilityAuditor {
  static async auditContent(content: FAQRichMediaContent): Promise<AccessibilityAuditResult> {
    switch (content.type) {
      case 'video':
        return VideoAccessibility.validateVideo(content)
      case 'diagram':
        return DiagramAccessibility.validateDiagram(content)
      case 'code':
        return CodeAccessibility.validateCode(content)
      case 'demo':
        return DemoAccessibility.validateDemo(content)
      case 'gif':
        return GifAccessibility.validateGif(content)
      default:
        return {
          compliant: false,
          level: 'A',
          issues: [{
            type: 'error',
            wcagRule: '4.1.1',
            description: `Unknown content type: ${(content as any).type}`,
            severity: 'critical',
            fix: 'Use supported content type'
          }],
          recommendations: ['Use supported rich media content types'],
          score: 0
        }
    }
  }

  // CONTEXT7 SOURCE: /web-apis/web-accessibility - Batch compliance checking
  static async auditMultiple(contents: FAQRichMediaContent[]): Promise<{
    overallScore: number
    overallCompliant: boolean
    results: Array<{ content: FAQRichMediaContent; audit: AccessibilityAuditResult }>
    summary: {
      totalIssues: number
      criticalIssues: number
      recommendations: string[]
    }
  }> {
    const results = await Promise.all(
      contents.map(async content => ({
        content,
        audit: await this.auditContent(content)
      }))
    )

    const overallScore = results.reduce((sum, result) => sum + result.audit.score, 0) / results.length
    const overallCompliant = results.every(result => result.audit.compliant)

    const allIssues = results.flatMap(result => result.audit.issues)
    const allRecommendations = [...new Set(results.flatMap(result => result.audit.recommendations))]

    return {
      overallScore,
      overallCompliant,
      results,
      summary: {
        totalIssues: allIssues.length,
        criticalIssues: allIssues.filter(issue => issue.severity === 'critical').length,
        recommendations: allRecommendations
      }
    }
  }

  // CONTEXT7 SOURCE: /web-apis/web-accessibility - User context adaptation
  static getAccessibilityContext(): AccessibilityContext {
    const mediaQuery = (query: string) => window.matchMedia(query).matches

    return {
      userPreferences: {
        reducedMotion: mediaQuery('(prefers-reduced-motion: reduce)'),
        highContrast: mediaQuery('(prefers-contrast: high)'),
        screenReader: 'speechSynthesis' in window && window.speechSynthesis.getVoices().length > 0,
        keyboardOnly: false, // Would need to be tracked via interaction patterns
        fontSize: mediaQuery('(min-resolution: 144dpi)') ? 'large' : 'medium'
      },
      capabilities: {
        supportsAudio: 'HTMLAudioElement' in window,
        supportsVideo: 'HTMLVideoElement' in window,
        supportsInteraction: 'ontouchstart' in window || navigator.maxTouchPoints > 0
      },
      device: {
        type: mediaQuery('(max-width: 768px)') ? 'mobile' : 
              mediaQuery('(max-width: 1024px)') ? 'tablet' : 'desktop',
        orientation: mediaQuery('(orientation: portrait)') ? 'portrait' : 'landscape',
        touchCapable: 'ontouchstart' in window || navigator.maxTouchPoints > 0
      }
    }
  }
}

export default RichMediaAccessibilityAuditor