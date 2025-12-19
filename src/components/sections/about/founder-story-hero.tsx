'use client';

import type { JSX } from 'react';
import { StorySection } from './story-section';

interface FounderStoryHeroProps {
  /** CMS content for the personal introduction section */
  personalIntroduction: {
    readonly heading: string;
    readonly content: string;
  };
}

/**
 * Founder Story Hero Section - "Meet Elizabeth, A Different Kind of Educator"
 *
 * Features:
 * - Above-the-fold priority loading
 * - Pull quote highlighting unique educational background
 * - Right-aligned text layout
 * - Primary image positioning
 */
export function FounderStoryHero({
  personalIntroduction
}: FounderStoryHeroProps): JSX.Element {

  // Split content into paragraphs and extract pull quote
  const contentParts = personalIntroduction.content.split('I moved through six different schools');
  const firstParagraph = contentParts[0].trim();
  const remainingContent = `I moved through six different schools${contentParts[1] || ''}`.trim();

  const pullQuoteText = "I moved through six different schools growing up, across private, state, faith, co-educational and single-sex (including a boys' school run by monks — yes, really).";

  return (
    <StorySection
      id="meet-elizabeth"
      title={personalIntroduction.heading}
      content={[firstParagraph, remainingContent]}
      imageSrc="/images/about/meet-elizabeth-a-different-kind-of-educator.webp"
      imageAlt="Elizabeth Burrows - Founder and CEO of My Private Tutor Online, personal portrait showcasing her approachable and professional demeanour"
      pullQuote={pullQuoteText}
      pullQuotePosition="right"
      layout="image-left"
      textAlign="right"
      priority={true}
    />
  );
}