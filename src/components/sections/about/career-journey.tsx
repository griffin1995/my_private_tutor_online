'use client';

import type { JSX } from 'react';
import { StorySection } from './story-section';

interface CareerJourneyProps {
  /** CMS content for the career milestones section */
  careerMilestones: {
    readonly title: string;
    readonly firstLesson: {
      readonly heading: string;
      readonly content: string;
    };
    readonly seventhContinent: {
      readonly heading: string;
      readonly content: string;
    };
  };
}

/**
 * Career Journey Section - "First Lesson to Seventh Continent"
 *
 * Features:
 * - Global journey imagery
 * - Pull quote about international work and seven continents
 * - Right-aligned text layout
 * - Combined first lesson and global expansion story
 */
export function CareerJourney({
  careerMilestones
}: CareerJourneyProps): JSX.Element {

  // Combine the first lesson and seventh continent content
  const combinedContent = `${careerMilestones.firstLesson.content} ${careerMilestones.seventhContinent.content}`;

  // Split for pull quote positioning
  const contentParts = combinedContent.split('What followed was');
  const firstParagraph = contentParts[0].trim();
  const remainingContent = `What followed was${contentParts[1] || ''}`.trim();

  const pullQuoteText = "What followed was a series of international placements and opportunities to work with royalty, VIPs and private families. By 2017, I had visited all seven continents.";

  return (
    <StorySection
      id="first-lesson-to-seventh-continent"
      title="First Lesson to Seventh Continent"
      content={[firstParagraph, remainingContent]}
      imageSrc="/images/about/1st-lesson-to-7th-continent.png"
      imageAlt="Global education journey - Elizabeth Burrows teaching experience across seven continents, showcasing international VIP family placements and worldwide tutoring expertise"
      pullQuote={pullQuoteText}
      pullQuotePosition="right"
      layout="image-left"
      textAlign="right"
    />
  );
}