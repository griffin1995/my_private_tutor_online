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

  const pullQuoteText = "Working for Forbes Middle East reinforced what I knew: the right educational support doesn't just help people ace exams — it shapes their choices, their confidence and their future.";

  return (
    <StorySection
      id="global-education-view"
      title={globalExperience.title}
      fullContent={globalExperience.content}
      imageSrc="/images/team/founder-elizabeth-burrows-professional.jpg"
      imageAlt="Elizabeth Burrows Professional Portrait - Forbes Middle East Online Editor and education expert, showcasing her business journalism background"
      pullQuote={pullQuoteText}
      pullQuotePosition="left"
      layout="image-right"
      textAlign="left"
    />
  );
}