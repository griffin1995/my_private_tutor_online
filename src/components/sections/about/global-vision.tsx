'use client';

import type { JSX } from 'react';
import { StorySection } from './story-section';

interface GlobalVisionProps {
  /** CMS content for the global experience section */
  globalExperience: {
    readonly title: string;
    readonly content: string;
  };
}

/**
 * Global Vision Section - "A Global View of What Education Can Do"
 *
 * Features:
 * - Professional Forbes Middle East portrait
 * - Pull quote about educational support impact
 * - Left-aligned text layout
 * - Business journalism background emphasis
 */
export function GlobalVision({
  globalExperience
}: GlobalVisionProps): JSX.Element {

  // Split content for pull quote positioning
  const contentParts = globalExperience.content.split('the right educational support doesn\'t just help people ace exams');
  const firstParagraph = contentParts[0].trim();
  const remainingContent = contentParts[1] ? `the right educational support doesn't just help people ace exams${contentParts[1]}` : '';

  const pullQuoteText = "Working for Forbes Middle East reinforced what I knew: the right educational support doesn't just help people ace exams — it shapes their choices, their confidence and their future.";

  return (
    <StorySection
      id="global-education-view"
      title={globalExperience.title}
      content={[firstParagraph, remainingContent]}
      imageSrc="/images/team/founder-elizabeth-burrows-professional.jpg"
      imageAlt="Elizabeth Burrows Professional Portrait - Forbes Middle East Online Editor and education expert, showcasing her business journalism background"
      pullQuote={pullQuoteText}
      pullQuotePosition="left"
      layout="image-right"
      textAlign="left"
    />
  );
}