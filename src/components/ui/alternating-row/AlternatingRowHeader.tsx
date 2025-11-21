'use client';

/**
 * ALTERNATING ROW HEADER COMPONENT
 *
 * Semantic heading component with responsive typography and accessibility support.
 * Leverages @layer base styles from globals.css while allowing utility overrides.
 *
 * @author Claude Code Implementation
 * @version 1.0.0 - November 2025
 */

import { cn } from '@/lib/utils';
import { memo } from 'react';
import type { AlternatingRowHeaderProps } from './types';

/**
 * Header component with semantic heading levels and responsive typography
 * Uses composition pattern for flexible content structure
 */
const AlternatingRowHeader = memo<AlternatingRowHeaderProps>(
	({ children, level = 2, icon, className }) => {
		// Dynamic heading tag based on level
		const HeadingTag = `h${level}` as const;
		const IconComponent = icon;

		// Responsive typography classes based on heading level
		const getHeadingClasses = (level: number) => {
			const baseClasses = 'font-bold leading-tight tracking-tight';

			switch (level) {
				case 1:
					return cn(baseClasses, 'text-3xl @md:text-4xl @lg:text-5xl @xl:text-6xl');
				case 2:
					return cn(baseClasses, 'text-2xl @md:text-3xl @lg:text-4xl @xl:text-5xl');
				case 3:
					return cn(baseClasses, 'text-xl @md:text-2xl @lg:text-3xl @xl:text-4xl');
				case 4:
					return cn(baseClasses, 'text-lg @md:text-xl @lg:text-2xl @xl:text-3xl');
				case 5:
					return cn(baseClasses, 'text-base @md:text-lg @lg:text-xl @xl:text-2xl');
				case 6:
					return cn(baseClasses, 'text-sm @md:text-base @lg:text-lg @xl:text-xl');
				default:
					return cn(baseClasses, 'text-2xl @md:text-3xl @lg:text-4xl @xl:text-5xl');
			}
		};

		return (
			<HeadingTag
				className={cn(
					// Base heading styles come from @layer base in globals.css
					// Responsive typography based on level
					getHeadingClasses(level),
					// Custom margin bottom for content flow
					'mb-4 @lg:mb-6',
					// Flex layout for icon + text alignment
					icon && 'flex items-center gap-3',
					// Allow custom classes to override
					className,
				)}>
				{IconComponent && (
					<IconComponent
						className={cn(
							'w-8 h-8 @md:w-10 @md:h-10 @lg:w-12 @lg:h-12',
							'shrink-0'
						)}
						aria-hidden="true"
					/>
				)}
				{children}
			</HeadingTag>
		);
	},
);

AlternatingRowHeader.displayName = 'AlternatingRowHeader';

export { AlternatingRowHeader };
