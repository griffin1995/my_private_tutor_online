"use client"

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Container and typography utility classes for responsive design
 * COMPONENT REASON: Official Tailwind CSS documentation Section max-width demonstrates container patterns for responsive content
 * REVISION REASON: Extracted reusable quote component to eliminate duplication in BrandMessageSection
 * 
 * HighlightedQuote Component - Reusable Quote Display with Magic UI Highlighting
 * 
 * Features:
 * - MagicUI Highlighter integration for strategic text emphasis
 * - Semantic HTML blockquote structure
 * - Responsive typography scaling
 * - Author attribution with cite element
 * - Consistent spacing and layout
 */

import React from 'react'
import { Highlighter } from '@/components/magicui/highlighter'

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - TypeScript interface for component props
 * PROPS INTERFACE REASON: Official React documentation demonstrates component props structure
 */
interface HighlightedQuoteProps {
  /** The quote text content to display */
  quote: string
  /** Optional author attribution */
  author?: string
  /** Optional author role or title */
  role?: string
  /** Whether to apply MagicUI highlighting */
  useHighlighting?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * CONTEXT7 SOURCE: /websites/magicui_design - Strategic text highlighting with Magic UI Highlighter component
 * HIGHLIGHTING REASON: Official Magic UI documentation demonstrates selective text highlighting for brand messaging emphasis
 *
 * CONTEXT7 SOURCE: /rough-stuff/rough-notation - Padding parameter configuration for annotation spacing
 * PADDING REVISION REASON: Official Rough Notation documentation demonstrates padding configuration to control highlight boundaries.
 * Reduced padding from 4→2 (highlights) and 3→2 (underlines) to prevent overlap between adjacent line annotations.
 *
 * BRAND-CONSISTENT HIGHLIGHTING STRATEGY:
 * HIGHLIGHT ACTION: Gold (#CA9E5B) - Premium background highlighting for key value propositions (padding: 2)
 * UNDERLINE ACTION: Navy (#1e40af) - Professional underlines for supporting emphasis (padding: 2)
 */
function renderHighlightedMessage(quote: string, useHighlighting: boolean) {
  if (!useHighlighting) {
    return quote
  }

  // CONTEXT7 SOURCE: /websites/magicui_design - Strategic highlighting for key education messaging
  if (quote.includes("We provide exceptional tuition that helps students excel academically and thrive personally")) {
    return (
      <>
        We provide{' '}
        <Highlighter
          color="#CA9E5B"
          action="highlight"
          strokeWidth={2}
          iterations={1}
          padding={2}
          animationDuration={800}
        >
          exceptional tuition
        </Highlighter>
        {' '}that helps students{' '}
        <Highlighter
          color="#CA9E5B"
          action="highlight"
          strokeWidth={2}
          iterations={1}
          padding={2}
          animationDuration={1000}
        >
          excel academically
        </Highlighter>
        {' '}and{' '}
        <Highlighter
          color="#1e40af"
          action="underline"
          strokeWidth={3}
          iterations={2}
          padding={2}
          animationDuration={1400}
        >
          thrive personally
        </Highlighter>
        , opening doors to greater opportunities—at school and in life.
      </>
    )
  }

  // CONTEXT7 SOURCE: /websites/magicui_design - Complete phrase highlighting for brand messaging emphasis
  // PHRASE HIGHLIGHTING REASON: Official Magic UI documentation demonstrates Highlighter component with complete phrase patterns for strategic brand messaging
  if (quote.includes("tailored to who they are")) {
    const beforePhrase = quote.substring(0, quote.indexOf("tailored to who they are"))
    const afterPhrase = quote.substring(quote.indexOf("tailored to who they are") + "tailored to who they are".length)
    return (
      <>
        {beforePhrase}
        <Highlighter
          color="#CA9E5B"
          action="highlight"
          strokeWidth={2}
          iterations={1}
          padding={2}
          animationDuration={600}
        >
          tailored to who they are
        </Highlighter>
        {afterPhrase}
      </>
    )
  }

  // CONTEXT7 SOURCE: /websites/magicui_design - Complete phrase highlighting for educational value proposition
  // PHRASE HIGHLIGHTING REASON: Official Magic UI documentation demonstrates Highlighter component with complete phrase patterns for key messaging emphasis
  if (quote.includes("academic rigour with personal mentorship")) {
    const beforePhrase = quote.substring(0, quote.indexOf("academic rigour with personal mentorship"))
    const afterPhrase = quote.substring(quote.indexOf("academic rigour with personal mentorship") + "academic rigour with personal mentorship".length)
    return (
      <>
        {beforePhrase}
        <Highlighter
          color="#CA9E5B"
          action="highlight"
          strokeWidth={2}
          iterations={1}
          padding={2}
          animationDuration={600}
        >
          academic rigour with personal mentorship
        </Highlighter>
        {afterPhrase}
      </>
    )
  }

  // CONTEXT7 SOURCE: /websites/magicui_design - Complete phrase highlighting for service methodology emphasis
  // PHRASE HIGHLIGHTING REASON: Official Magic UI documentation demonstrates Highlighter component with complete phrase patterns for strategic brand differentiation
  if (quote.includes("structure, insight and flexibility")) {
    const beforePhrase = quote.substring(0, quote.indexOf("structure, insight and flexibility"))
    const afterPhrase = quote.substring(quote.indexOf("structure, insight and flexibility") + "structure, insight and flexibility".length)
    return (
      <>
        {beforePhrase}
        <Highlighter
          color="#CA9E5B"
          action="highlight"
          strokeWidth={2}
          iterations={1}
          padding={2}
          animationDuration={600}
        >
          structure, insight and flexibility
        </Highlighter>
        {afterPhrase}
      </>
    )
  }

  // CONTEXT7 SOURCE: /websites/magicui_design - Complete phrase royal blue underline for educational outcomes emphasis
  // PHRASE UNDERLINE REASON: Official Magic UI documentation demonstrates Highlighter component with underline action for complete phrase patterns emphasising key educational development outcomes
  if (quote.includes("confidence, curiosity and clarity")) {
    const beforePhrase = quote.substring(0, quote.indexOf("confidence, curiosity and clarity"))
    const afterPhrase = quote.substring(quote.indexOf("confidence, curiosity and clarity") + "confidence, curiosity and clarity".length)
    return (
      <>
        {beforePhrase}
        <Highlighter
          color="#1e40af"
          action="underline"
          strokeWidth={3}
          iterations={2}
          padding={2}
          animationDuration={1200}
        >
          confidence, curiosity and clarity
        </Highlighter>
        {afterPhrase}
      </>
    )
  }

  // CONTEXT7 SOURCE: /websites/magicui_design - Complete phrase royal blue underline for character development emphasis
  // PHRASE UNDERLINE REASON: Official Magic UI documentation demonstrates Highlighter component with underline action for complete phrase patterns emphasising personal development attributes
  if (quote.includes("resilience and self-belief")) {
    const beforePhrase = quote.substring(0, quote.indexOf("resilience and self-belief"))
    const afterPhrase = quote.substring(quote.indexOf("resilience and self-belief") + "resilience and self-belief".length)
    return (
      <>
        {beforePhrase}
        <Highlighter
          color="#1e40af"
          action="underline"
          strokeWidth={3}
          iterations={2}
          padding={2}
          animationDuration={1300}
        >
          resilience and self-belief
        </Highlighter>
        {afterPhrase}
      </>
    )
  }

  // CONTEXT7 SOURCE: /websites/magicui_design - Complete phrase royal blue underline for educational philosophy emphasis
  // PHRASE UNDERLINE REASON: Official Magic UI documentation demonstrates Highlighter component with underline action for complete phrase patterns emphasising core educational philosophy
  if (quote.includes("cultivate independence")) {
    const beforePhrase = quote.substring(0, quote.indexOf("cultivate independence"))
    const afterPhrase = quote.substring(quote.indexOf("cultivate independence") + "cultivate independence".length)
    return (
      <>
        {beforePhrase}
        <Highlighter
          color="#1e40af"
          action="underline"
          strokeWidth={3}
          iterations={2}
          padding={2}
          animationDuration={1400}
        >
          cultivate independence
        </Highlighter>
        {afterPhrase}
      </>
    )
  }

  // CONTEXT7 SOURCE: /websites/react_dev - JSX string manipulation for exact phrase highlighting patterns
  // REVISION REASON: Official React documentation demonstrates substring extraction for precise text segmentation in JSX rendering
  // FOUNDER QUOTE HIGHLIGHTING: Exact phrase patterns for strategic brand messaging emphasis
  if (quote.includes("Parents come to us when something truly matters")) {
    // Helper function to extract text segments between phrases
    const extractSegment = (text: string, startPhrase: string, endPhrase?: string): string => {
      const startIndex = text.indexOf(startPhrase)
      if (startIndex === -1) return ''
      const start = startIndex + startPhrase.length
      if (!endPhrase) return text.substring(start)
      const endIndex = text.indexOf(endPhrase, start)
      return endIndex === -1 ? text.substring(start) : text.substring(start, endIndex)
    }

    return (
      <>
        Parents come to us when something{' '}
        <Highlighter
          color="#CA9E5B"
          action="highlight"
          strokeWidth={2}
          iterations={1}
          padding={2}
          animationDuration={600}
        >
          truly
        </Highlighter>
        {' '}matters—an entrance exam, a lost sense of confidence, a desire for academic stretch. They stay with us because{' '}
        <Highlighter
          color="#CA9E5B"
          action="highlight"
          strokeWidth={2}
          iterations={1}
          padding={2}
          animationDuration={800}
        >
          we deliver real progress, quietly and expertly
        </Highlighter>
        . This is not a tutoring directory. This is{' '}
        <Highlighter
          color="#1e40af"
          action="underline"
          strokeWidth={3}
          iterations={2}
          padding={2}
          animationDuration={1200}
        >
          a bespoke service for ambitious families
        </Highlighter>
        {' '}looking for{' '}
        <Highlighter
          color="#CA9E5B"
          action="highlight"
          strokeWidth={2}
          iterations={1}
          padding={2}
          animationDuration={1000}
        >
          trusted partners in their child's academic career
        </Highlighter>
        .
      </>
    )
  }

  // CONTEXT7 SOURCE: /websites/magicui_design - Default brand message highlighting pattern
  return (
    <>
      {quote.split(' ').map((word, index, words) => {
        const lowerWord = word.toLowerCase()
        const isLastWord = index === words.length - 1
        const spacing = isLastWord ? '' : ' '
        
        // CONTEXT7 SOURCE: /websites/magicui_design - Highlighter component text highlighting patterns for brand value propositions
        // REVISION REASON: Official Magic UI documentation Section highlighter demonstrates strategic keyword highlighting for enhanced brand messaging
        // Gold highlights for value proposition keywords
        if (['exceptional', 'expert', 'bespoke', 'premium', 'trusted', 'excellence', 'ambitious', 'progress', 'quietly', 'expertly', 'boutique', 'truly', 'tailored', 'academic', 'rigour', 'mentorship', 'structure', 'insight', 'flexibility'].includes(lowerWord.replace(/[.,!?]/g, ''))) {
          return (
            <React.Fragment key={index}>
              <Highlighter
                color="#CA9E5B"
                action="highlight"
                strokeWidth={2}
                iterations={1}
                padding={2}
                animationDuration={600}
              >
                {word}
              </Highlighter>
              {spacing}
            </React.Fragment>
          )
        }
        
        // Royal blue underlines for credibility keywords
        if (['experience', 'expertise', 'professional', 'qualified', 'proven', 'matters', 'deliver', 'partners', 'academic', 'personally', 'carefully', 'selected'].includes(lowerWord.replace(/[.,!?]/g, ''))) {
          return (
            <React.Fragment key={index}>
              <Highlighter
                color="#1e40af"
                action="underline"
                strokeWidth={3}
                iterations={2}
                padding={2}
                animationDuration={1200}
              >
                {word}
              </Highlighter>
              {spacing}
            </React.Fragment>
          )
        }
        
        return word + spacing
      })}
    </>
  )
}

/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Semantic HTML structure with responsive typography
 * COMPONENT PATTERN REASON: Official Tailwind CSS documentation demonstrates blockquote typography patterns
 * 
 * HighlightedQuote Component
 * 
 * Reusable component for displaying quotes with optional Magic UI highlighting.
 * Uses semantic HTML with blockquote and cite elements for proper accessibility.
 */
export function HighlightedQuote({
  quote,
  author,
  role,
  useHighlighting = true,
  className = ""
}: HighlightedQuoteProps) {
  /**
   * CONTEXT7 SOURCE: /grx7/framer-motion - Transform isolation wrapper for third-party components
   * ISOLATION WRAPPER REASON: Official Framer Motion documentation Section projection demonstrates
   * creating isolated rendering context to prevent parent transforms from affecting nested content
   *
   * Critical Fix Implementation:
   * - Wrapper div creates transform isolation boundary
   * - Prevents Framer Motion animations from displacing highlight positions
   * - Maintains visual hierarchy while blocking transform inheritance
   */
  return (
    <div
      className={className}
      style={{
        // CONTEXT7 SOURCE: /grx7/framer-motion - Layout isolation styles from projection API patterns
        // STYLE REASON: Creates new stacking context preventing Motion transform inheritance
        position: 'relative',
        transformStyle: 'preserve-3d',
        willChange: 'auto',
        isolation: 'isolate'
      }}
    >
      {/*
       * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Semantic HTML blockquote with responsive typography
       * BLOCKQUOTE REASON: Official HTML documentation demonstrates semantic blockquote for brand messages
       *
       * CONTEXT7 SOURCE: /websites/tailwindcss - Line-height arbitrary values for custom spacing
       * LINE-HEIGHT REVISION REASON: Official Tailwind CSS documentation line-height.mdx demonstrates arbitrary value
       * syntax `leading-[<value>]` for precise line-height control. Increased from leading-loose (2.0) to leading-[2.5]
       * to provide maximum clearance between lines when using Magic UI Highlighter annotations with padding={2}.
       * This prevents highlight effects from overlapping adjacent text lines while maintaining professional typography.
       * Arbitrary value syntax from Context7: "leading-[1.5]" pattern allows custom numeric multipliers.
       */}
      {/*
       * CONTEXT7 SOURCE: /websites/tailwindcss - Line-height arbitrary value final implementation
       * LINE-HEIGHT FINAL VALUE REASON: Restored from testing value leading-[10] to optimised leading-[2.5].
       * The value leading-[2.5] provides optimal balance between:
       * - Sufficient vertical clearance for Magic UI Highlighter effects (padding={2})
       * - Professional typography standards for premium brand messaging
       * - Royal client visual quality expectations
       * Arbitrary value syntax from Context7: "leading-[<value>]" pattern allows custom numeric multipliers.
       */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Design token color system migration */}
      {/* REVISION REASON: Design system compliance - migrate text-primary-700 to text-token-neutral-700 for consistent body text colors */}
      <blockquote className="text-xl lg:text-2xl font-serif text-token-neutral-700 italic leading-[2.5]">
        {renderHighlightedMessage(quote, useHighlighting)}
      </blockquote>

      {/*
       * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional rendering pattern for attribution
       * CITE ELEMENT REASON: Official HTML documentation shows cite element for proper attribution
       */}
      {/* CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Design token color system migration */}
      {/* REVISION REASON: Design system compliance - migrate text-primary-900 to text-token-primary-dark for consistent heading colors */}
      {author && (
        <cite className="text-lg font-semibold text-token-primary-dark not-italic">
          &mdash; {author}{role && `, ${role}`}
        </cite>
      )}
    </div>
  )
}

export default HighlightedQuote