'use client';

import type { JSX } from 'react';
import { ThreePillarsSection } from 'src/components/sections/three-pillars-section';

interface ResultsSectionProps {
  /** CMS content for the results section */
  resultsThatMatter: {
    readonly title: string;
    readonly content: string;
  };
}

/**
 * Results Section Component
 *
 * Features:
 * - Centered layout with maximum width constraint
 * - Clean typography and spacing
 * - Responsive padding
 * - Includes Three Pillars achievement cards
 */
export function ResultsSection({
  resultsThatMatter
}: ResultsSectionProps): JSX.Element {

  return (
    <>
      <div className="mx-auto max-w-6xl text-center py-8 sm:px-6 lg:px-8 mt-7 lg:mt-10">
        <h2 className="mb-8">{resultsThatMatter.title}</h2>

        <div className="space-y-6">
          <p>{resultsThatMatter.content}</p>
        </div>
      </div>

      {/* Three Pillars Cards Section */}
      <section className="w-full bg-white py-0">
        <div className="mx-auto px-4 sm:px-6 lg:px-12">
          <ThreePillarsSection className="bg-white" />
        </div>
      </section>
    </>
  );
}