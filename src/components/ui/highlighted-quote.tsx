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
 * BRAND-CONSISTENT HIGHLIGHTING STRATEGY:
 * HIGHLIGHT ACTION: Gold (#CA9E5B) - Premium background highlighting for key value propositions
 * UNDERLINE ACTION: Navy (#1e40af) - Professional underlines for supporting emphasis
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
          padding={4}
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
          padding={4}
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
          padding={3}
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
          padding={4}
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
          padding={4}
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
          padding={4}
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
          padding={3}
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
          padding={3}
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
          padding={3}
          animationDuration={1400}
        >
          cultivate independence
        </Highlighter>
        {afterPhrase}
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
                padding={3}
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
                padding={3}
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
  return (
    <div className={className}>
      {/* 
       * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Semantic HTML blockquote with responsive typography
       * BLOCKQUOTE REASON: Official HTML documentation demonstrates semantic blockquote for brand messages
       */}
      <blockquote className="text-xl lg:text-2xl font-serif text-primary-700 italic leading-relaxed">
        {renderHighlightedMessage(quote, useHighlighting)}
      </blockquote>
      
      {/* 
       * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Conditional rendering pattern for attribution
       * CITE ELEMENT REASON: Official HTML documentation shows cite element for proper attribution
       */}
      {author && (
        <cite className="text-lg font-semibold text-primary-900 not-italic">
          &mdash; {author}{role && `, ${role}`}
        </cite>
      )}
    </div>
  )
}

export default HighlightedQuote