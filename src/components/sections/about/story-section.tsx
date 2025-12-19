'use client';

import type { JSX } from 'react';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { PullQuote } from './pull-quote';
import { cn } from '@/lib/utils';

interface StorySectionProps {
  /** Unique identifier for the section */
  id: string;
  /** Section title */
  title: string;
  /** Main content paragraphs */
  content: string[];
  /** Image source */
  imageSrc: string;
  /** Image alt text */
  imageAlt: string;
  /** Pull quote text (optional) */
  pullQuote?: string;
  /** Pull quote position */
  pullQuotePosition?: 'left' | 'right';
  /** Layout order: 'image-left' or 'image-right' */
  layout?: 'image-left' | 'image-right';
  /** Text alignment */
  textAlign?: 'left' | 'right';
  /** Background color class */
  backgroundColor?: string;
  /** Priority loading for above-the-fold images */
  priority?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * Reusable story section component with responsive grid layout
 *
 * Features:
 * - Responsive two-column grid layout
 * - Configurable image and text positioning
 * - Optional pull quotes with positioning
 * - Consistent spacing and typography
 * - Optimized image loading
 */
export function StorySection({
  id,
  title,
  content,
  imageSrc,
  imageAlt,
  pullQuote,
  pullQuotePosition = 'right',
  layout = 'image-left',
  textAlign = 'left',
  backgroundColor = 'primary-700/5',
  priority = false,
  className = ''
}: StorySectionProps): JSX.Element {

  // Determine grid order based on layout
  const imageOrder = layout === 'image-left' ? 'order-1 lg:order-1' : 'order-1 lg:order-2';
  const contentOrder = layout === 'image-left' ? 'order-2 lg:order-2' : 'order-2 lg:order-1';

  // Text alignment classes
  const textAlignClass = textAlign === 'right' ? 'text-right' : 'text-left';
  const contentAlignClass = textAlign === 'right' ? 'items-end' : 'items-start';

  return (
    <div className={cn('w-full', className)}>
      <div className="grid lg:grid-cols-2 gap-0 lg:grid-rows-1 lg:auto-rows-fr lg:items-stretch">
        {/* Image Section */}
        <div className={cn(imageOrder, 'relative min-h-[300px] sm:min-h-[400px] lg:min-h-[550px] aspect-[4/3] sm:aspect-[3/2] lg:aspect-auto')}>
          <ResponsiveImage
            src={imageSrc}
            alt={imageAlt}
            priority={priority}
            objectFit="cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Content Section */}
        <div className={cn(
          contentOrder,
          `bg-${backgroundColor}`,
          'transition-all duration-300 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 lg:py-20 min-h-[300px] sm:min-h-[400px] lg:min-h-[550px] flex flex-col justify-center',
          contentAlignClass
        )}>
          <div className={cn(
            'max-w-full sm:max-w-6xl p-2 sm:p-4 md:p-8',
            textAlignClass
          )}>
            <h2 className="pb-2 mb-3 text-2xl sm:text-3.5xl">
              {title}
            </h2>

            <div className="text-left">
              {content.map((paragraph, index) => (
                <div key={index}>
                  {/* Insert pull quote after first paragraph if it exists */}
                  {index === 0 && pullQuote && (
                    <PullQuote position={pullQuotePosition}>
                      {pullQuote}
                    </PullQuote>
                  )}

                  <p className="mb-4">
                    {paragraph}
                  </p>

                  {/* Add line breaks between paragraphs for readability */}
                  {index < content.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}