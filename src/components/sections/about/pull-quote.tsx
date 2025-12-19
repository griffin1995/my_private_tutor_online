'use client';

import type { JSX } from 'react';
import { cn } from '@/lib/utils';

interface PullQuoteProps {
  children: string;
  className?: string;
  /** Position of the quote: 'left' or 'right' */
  position?: 'left' | 'right';
  /** Disable default float behavior for dynamic positioning */
  disableFloat?: boolean;
}

/**
 * Accessible pull quote component following WCAG 2.2 standards
 *
 * Features:
 * - Semantic HTML with proper ARIA roles
 * - Responsive positioning (left/right float)
 * - Consistent styling with design system
 * - Accessible markup for screen readers
 */
export function PullQuote({
  children,
  className = '',
  position = 'right',
  disableFloat = false
}: PullQuoteProps): JSX.Element {
  const floatClass = !disableFloat ? (position === 'left' ? 'float-left mr-6' : 'float-right ml-6') : '';

  return (
    <aside
      role="doc-pullquote"
      aria-label="Key quote from text"
      className={cn(
        'w-80 mb-6 mt-2 text-left inline-block border-l-2 border-neutral-grey-300 pl-4 pr-2 italic text-neutral-grey-600',
        floatClass,
        className
      )}
      data-magazine-pull-quote
    >
      <svg
        className="mb-3 h-10 w-10 ml-auto fill-primary-700/40"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 14"
      >
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
      </svg>
      <blockquote className="text-semantic-body-large lg:text-semantic-body-large font-semibold border-l-0 pl-0">
        {children}
      </blockquote>
    </aside>
  );
}