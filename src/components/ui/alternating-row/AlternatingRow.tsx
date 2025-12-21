'use client';

/**
 * ALTERNATING ROW COMPONENT - MAIN CONTAINER
 *
 * Modern React component implementing 50/50 image-text layouts with advanced
 * TypeScript patterns, container queries, and WCAG 2025 compliance.
 * Follows 2025 best practices with composition pattern and performance optimization.
 *
 * @author Claude Code Implementation
 * @version 1.0.0 - November 2025
 */

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { forwardRef, memo } from 'react';
import type { AlternatingRowProps, AlternatingRowRef } from './types';
import { isAlternatingRowHeader } from './types';

/**
 * Main AlternatingRow component with container queries and responsive design
 * Uses CSS Grid for layout and composition pattern for flexibility
 */
const AlternatingRow = memo(
	forwardRef<AlternatingRowRef, AlternatingRowProps>(
		(
			{
				id,
				variant,
				number,
				icon: Icon,
				image,
				children,
				container = { enabled: true, name: 'alternating-row' },
				card,
				className,
				'aria-label': ariaLabel,
				...dataAttributes
			},
			ref,
		) => {
			// Extract data attributes for HTML
			const dataProps = Object.fromEntries(
				Object.entries(dataAttributes).filter(([key]) => key.startsWith('data-')),
			);

			// Container query setup
			const containerClass =
				container.enabled ?
					`@container${container.name ? `/${container.name}` : ''}`
				:	'';

			// Grid layout classes based on variant
			const gridClasses = cn(
				// Base grid setup
				'grid grid-cols-1 gap-8',
				// Container query responsive grid - no gap for 50/50 layout
				'@lg:grid-cols-2 @lg:gap-0 @xl:gap-0',
				// Image positioning based on variant
				variant === 'right' && '@lg:[&>*:first-child]:order-2',
				// Container query wrapper
				containerClass,
			);

			// Content wrapper classes with responsive padding for full-width layouts
			const contentClasses = cn(
				'flex flex-col justify-center space-y-4 @lg:space-y-6',
				// Responsive padding to center content in 50% column when layout has no padding
				'px-6 @md:px-8 @lg:px-12 @xl:px-16',
				// Vertical padding for mobile (when stacked)
				'py-8 @lg:py-0',
			);

			// Image wrapper classes - clean minimal styling
			const imageClasses = cn(
				'relative overflow-hidden',
				// Full width of grid column
				'w-full',
				// Aspect ratio preservation
				'aspect-[4/3] @md:aspect-[16/10] @lg:aspect-[4/3]',
				// Container query responsive sizing
				'@lg:min-h-[400px] @xl:min-h-[500px]',
			);

			const shouldUseCard = card?.enabled;

			// Process children to pass icon prop to AlternatingRowHeader
			const processedChildren = React.Children.map(children, (child) => {
				if (isAlternatingRowHeader(child)) {
					// Only pass icon prop if it's defined (exactOptionalPropertyTypes compatibility)
					const additionalProps = Icon ? { icon: Icon } : {};
					return React.cloneElement(child, additionalProps);
				return child;
			});

			// Main content
			const mainContent = (
				<div className={gridClasses}>
					{/* Content Section */}
					<div className={contentClasses}>
						{/* Number Badge */}
						{number && (
							<div className='mb-4 @lg:mb-6'>
								<div
									className={cn(
										'inline-flex items-center justify-center',
										'w-10 h-10 @md:w-12 @md:h-12',
										'bg-primary-700 text-white',
										'text-lg @md:text-xl font-semibold',
										'shrink-0',
									)}
									aria-label={`Step ${number}`}>
									{number}
								</div>
							</div>
						)}

						{/* Content Children (Header, Description, Bullets) */}
						<div className='space-y-4 @lg:space-y-6'>{processedChildren}</div>
					</div>

					{/* Image Section */}
					<div className={imageClasses}>
						<Image
							src={image.src}
							alt={image.alt}
							width={image.width || 800}
							height={image.height || 600}
							className={cn('object-cover w-full h-full', image.className)}
							sizes={
								image.sizes ||
								'(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw'
							priority={image.priority || false}
							placeholder={image.src.includes('data:') ? 'blur' : 'empty'}
							{...(image.src.includes('data:') && { blurDataURL: image.src })}
						/>
					</div>
				</div>
			);

			// Render content with or without Card wrapper
			if (shouldUseCard) {
				// Use proper Card component with shadcn/ui styling
				const cardVariantClasses = {
					default: 'bg-card text-card-foreground',
					elevated: 'shadow-lg',
					outline: 'border-2 bg-transparent',
				};

				const cardPaddingClasses = {
					none: 'p-0',
					sm: 'p-4',
					md: 'p-6',
					lg: 'p-8',
				};

				return (
					<Card
						ref={ref}
						className={cn(
							// Let Card component handle base styles
							cardVariantClasses[card?.variant || 'default'],
							// Container query wrapper
							containerClass,
							className,
						)}
						{...dataProps}>
						<CardContent className={cn(cardPaddingClasses[card?.padding || 'md'])}>
							<section
								id={id}
								aria-label={ariaLabel || (number ? `Step ${number}` : undefined)}
								role='region'>
								{mainContent}
							</section>
						</CardContent>
					</Card>
				);

			// Standard implementation without Card wrapper
			return (
				<section
					ref={ref}
					id={id}
					className={cn(
						// Base styles with semantic HTML defaults from @layer base
						'w-full',
						// Container query wrapper
						containerClass,
						className,
					)}
					aria-label={ariaLabel || (number ? `Step ${number}` : undefined)}
					role='region'
					{...dataProps}>
					{mainContent}
				</section>
			);
		},
	),
);

AlternatingRow.displayName = 'AlternatingRow';

export { AlternatingRow };
