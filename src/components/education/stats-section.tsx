'use client';

import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { memo } from 'react';

/**
 * Individual statistics item interface
 */
interface StatsItem {
	/** Unique identifier for the statistic */
	readonly id: string;
	/** The main statistic value (e.g., "94%", "15 years") */
	readonly value: string;
	/** Descriptive label for the statistic */
	readonly label: string;
	/** Optional additional description */
	readonly description?: string;
}

interface StatsSectionProps {
	/** Array of statistics to display - automatically centers regardless of count */
	readonly stats?: readonly StatsItem[];
	/** Optional heading for the statistics section */
	readonly heading?: string;
	/** Optional description text */
	readonly description?: string;
	/** Optional call-to-action link */
	readonly link?: {
		readonly text: string;
		readonly url: string;
	};
	/** Custom CSS classes for the container */
	readonly className?: string;
	/** Minimum width for each stat item in pixels (default: 280px) */
	readonly minItemWidth?: number;
}

/**
 * Modern stats section component with dynamic centering and responsive design.
 *
 * Features:
 * - Auto-centering grid that adapts to any number of stats (1-∞)
 * - CSS Grid with auto-fit for true responsive behavior
 * - TypeScript-first with comprehensive interfaces
 * - Follows project's November 2025 responsive standards
 * - Royal client-worthy presentation quality
 */
export const StatsSection = memo(({
	stats = [],
	heading,
	description,
	link,
	className,
	minItemWidth = 280,
}: StatsSectionProps) => {
	// Filter out invalid stats while preserving immutability
	const validStats = stats.filter(stat => stat.value && stat.label);

	// Return null if no valid stats to display
	if (validStats.length === 0) {
		return null;
	}

	return (
		<section className={cn('py-6 sm:py-7 md:py-8', className)}>
			{/* Optional header content */}
			{(heading || description) && (
				<div className='mb-8 text-center'>
					{heading && (
						<h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-700 mb-4'>
							{heading}
						</h2>
					)}
					{description && (
						<p className='text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto'>
							{description}
						</p>
					)}
				</div>
			)}

			{/* Dynamic stats grid with auto-fit centering */}
			<div
				className={cn(
					'grid gap-4 sm:gap-6 md:gap-8',
					'place-items-center max-w-6xl mx-auto',
					'justify-center'
				)}
				style={{
					gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}px, 1fr))`,
				}}
			>
				{validStats.map((stat) => (
					<div
						key={stat.id}
						className='flex flex-col gap-3 sm:gap-4 md:gap-5 text-center max-w-sm'
					>
						{/* Statistic value with responsive typography */}
						<div className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-primary-700'>
							{stat.value}
						</div>

						{/* Statistic label */}
						<p className='text-base sm:text-lg md:text-xl font-medium text-muted-foreground leading-relaxed'>
							{stat.label}
						</p>

						{/* Optional description */}
						{stat.description && (
							<p className='text-sm sm:text-base text-muted-foreground leading-relaxed'>
								{stat.description}
							</p>
						)}
					</div>
				))}
			</div>

			{/* Optional link */}
			{link && (
				<div className='mt-8 text-center'>
					<a
						href={link.url}
						className='inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200'
					>
						{link.text}
						<ArrowRight className='w-4 h-4' />
					</a>
				</div>
			)}
		</section>
	);
});

StatsSection.displayName = 'StatsSection';

export type { StatsItem, StatsSectionProps };
