'use client';

import type { JSX } from 'react';
import { StorySection } from './story-section';

interface GoingAgainstGrainProps {
  /** CMS content for the going against the grain section */
  goingAgainstTheGrain: {
    readonly title: string;
    readonly content: string;
  };
}

/**
 * Going Against the Grain Section
 *
 * Features:
 * - Cambridge University image highlighting educational choices
 * - Pull quote about turning down Cambridge
 * - Left-aligned text layout
 * - Image on right side
 */
export function GoingAgainstGrain({
  goingAgainstTheGrain
}: GoingAgainstGrainProps): JSX.Element {

  // Split content to position pull quote appropriately
  const contentParts = goingAgainstTheGrain.content.split('Who turns down Cambridge?');
  const firstParagraph = `${contentParts[0].trim()} Who turns down Cambridge? 17-year-old me.`;
  const remainingContent = contentParts[1]?.trim() || '';

  const pullQuoteText = "Who turns down Cambridge? 17-year-old me.";

  return (
    <StorySection
      id="going-against-grain"
      title={goingAgainstTheGrain.title}
      content={[firstParagraph, remainingContent]}
      imageSrc="/images/about/going-against-the-grain.webp"
      imageAlt="Cambridge University - prestigious academic institution representing educational excellence and Going Against the Grain philosophy"
      pullQuote={pullQuoteText}
      pullQuotePosition="left"
      layout="image-right"
      textAlign="left"
    />
  );
}