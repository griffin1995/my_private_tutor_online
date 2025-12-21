'use client';

import type { JSX } from 'react';
import { ResponsiveImage } from '@/components/ui/responsive-image';
import { PullQuote } from './pull-quote';
import { cn } from '@/lib/utils';
import useMeasure from 'react-use-measure';
import { HeadingText, BodyText } from '@/components/ui/typography';

interface StorySectionProps {
  /** Unique identifier for the section */
  id: string;
  /** Section title */
  title: string;
  /** Full content as single string with paragraph breaks */
  fullContent: string;
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
  fullContent,
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

  // Hooks for measuring element dimensions
  const [textContainerRef, textBounds] = useMeasure();
  const [quoteRef, quoteBounds] = useMeasure();

  // Calculate dynamic quote position (centered vertically in text content)
  const centerY = textBounds.height > 0 && quoteBounds.height > 0
    ? (textBounds.height / 2) - (quoteBounds.height / 2)
    : 0;

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
            <HeadingText
              variant="primary"
              level={2}
              className="pb-2 mb-3 text-2xl sm:text-3.5xl"
              responsive>
              {title}
            </HeadingText>

            {/* Content container with float-based pull quote */}
            <div className="relative text-left" ref={textContainerRef}>
              {/* Float-based pull quote with calculated vertical offset */}
              {pullQuote && (
                <div
                  ref={quoteRef}
                  style={{
                    float: pullQuotePosition,
                    marginTop: centerY > 0 ? `${centerY}px` : '12px',
                    width: '320px',
                    marginLeft: pullQuotePosition === 'right' ? '24px' : '0',
                    marginRight: pullQuotePosition === 'left' ? '24px' : '0',
                    marginBottom: '24px',
                    shapeOutside: quoteBounds.width > 0 && quoteBounds.height > 0
                      ? 'margin-box'
                      : 'none',
                    clear: 'both',
                    zIndex: 10
                  } as React.CSSProperties}
                >
                  <PullQuote position={pullQuotePosition} disableFloat={true}>
                    {pullQuote}
                  </PullQuote>
                </div>
              )}

              {/* Text content without artificial margins - allows natural flow */}
              <BodyText
                variant="default"
                responsive>
                {fullContent.split('\n\n').map((paragraph, index) => (
                  <span key={index}>
                    {paragraph}
                    {index < fullContent.split('\n\n').length - 1 && (
                      <>
                        <br />
                        <br />
                      </>
                    )}
                  </span>
                ))}
              </BodyText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
