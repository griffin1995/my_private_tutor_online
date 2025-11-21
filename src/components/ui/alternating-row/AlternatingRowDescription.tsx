'use client';

/**
 * ALTERNATING ROW DESCRIPTION COMPONENT
 *
 * Semantic paragraph component with responsive typography and rich text support.
 * Leverages @layer base styles from globals.css for consistent text styling.
 *
 * @author Claude Code Implementation
 * @version 1.0.0 - November 2025
 */

import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import type { AlternatingRowDescriptionProps } from './types';

/**
 * Description component with responsive typography and rich text support
 * Automatically handles paragraph spacing and line height from @layer base
 */
const AlternatingRowDescription = memo<AlternatingRowDescriptionProps>(({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        // Base paragraph styles come from @layer base in globals.css
        // Responsive text sizing with container queries
        'text-base @md:text-lg @lg:text-xl',
        // Enhanced line height for readability
        'leading-relaxed @lg:leading-relaxed',
        // Text color from @layer base (--color-neutral-grey-800)
        'text-muted-foreground',
        // Responsive spacing
        'space-y-4 @lg:space-y-6',
        // Allow custom classes to override
        className
      )}
    >
      {/* Handle both string and ReactNode content */}
      {typeof children === 'string' ? (
        // Split paragraphs for string content
        children.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {paragraph.split('\n').map((line, lineIndex, lines) => (
              <React.Fragment key={lineIndex}>
                {line}
                {lineIndex < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        ))
      ) : (
        // Pass through ReactNode content directly
        children
      )}
    </div>
  );
});

AlternatingRowDescription.displayName = 'AlternatingRowDescription';

export { AlternatingRowDescription };