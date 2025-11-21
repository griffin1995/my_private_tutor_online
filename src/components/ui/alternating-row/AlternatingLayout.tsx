'use client';

/**
 * ALTERNATING LAYOUT CONTAINER COMPONENT
 *
 * Container component for multiple AlternatingRow components with spacing control,
 * container query configuration, and responsive design orchestration.
 *
 * @author Claude Code Implementation
 * @version 1.0.0 - November 2025
 */

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import React, { memo } from 'react';
import type { AlternatingLayoutProps } from './types';

/**
 * Layout container for multiple alternating rows with configurable spacing
 * Provides semantic section structure and container query setup
 */
const AlternatingLayout = memo<AlternatingLayoutProps>(
	({
		children,
		spacing = 'normal',
		containerType = 'container-queries',
		maxWidth = 'container',
		showSeparators = false,
		separatorConfig = {
			variant: 'default',
			spacing: 'md',
			width: 70,
		},
		className,
	}) => {
		// Spacing configuration - removes y-spacing on large screens for 50/50 layout (Nov 21, 2025 fix)
		const getSpacingClasses = (spacing: string) => {
			switch (spacing) {
				case 'tight':
					return 'space-y-0 @lg:space-y-0';
				case 'loose':
					return 'space-y-0 @lg:space-y-0 @xl:space-y-0';
				case 'normal':
				default:
					return 'space-y-0 @lg:space-y-0';
			}
		};

		// Container width configuration with automatic padding control
		const getMaxWidthClasses = (maxWidth: 'container' | 'full' | 'none') => {
			switch (maxWidth) {
				case 'full':
					return 'w-full px-0'; // Zero x-axis padding for full width
				case 'none':
					return '';
				case 'container':
				default:
					return 'container mx-auto px-4 @md:px-6 @lg:px-8';
			}
		};

		// Container query setup
		const getContainerClasses = (containerType: string) => {
			switch (containerType) {
				case 'container-queries':
					return '@container';
				case 'normal':
				default:
					return '';
			}
		};

		// Separator styling configuration
		const getSeparatorClasses = () => {
			const { variant, spacing: sepSpacing, width } = separatorConfig;

			const spacingClasses = {
				sm: 'my-8',
				md: 'my-12',
				lg: 'my-16',
			};

			// Note: Separator uses bg-*, not border-* properties
			// Custom border styles need to be applied via style attribute
			const variantClasses = {
				default: '',
				dashed: '', // Will be handled via inline style
				dotted: '', // Will be handled via inline style
			};

			// Predefined width classes for Tailwind JIT compatibility
			const widthClasses = {
				50: 'w-1/2',
				60: 'w-3/5',
				70: 'w-[70%]',
				80: 'w-4/5',
				90: 'w-[90%]',
				100: 'w-full',
			};

			return {
				spacing: spacingClasses[sepSpacing || 'md'],
				variant: variantClasses[variant || 'default'],
				width: widthClasses[width as keyof typeof widthClasses] || widthClasses[70],
			};
		};

		const separatorClasses = getSeparatorClasses();

		// Convert children to array and add separators
		const childrenArray = React.Children.toArray(children);
		const childrenWithSeparators =
			showSeparators ?
				childrenArray.reduce<React.ReactNode[]>((acc, child, index) => {
					acc.push(child);
					// Add separator after each child except the last one
					if (index < childrenArray.length - 1) {
						const { variant } = separatorConfig;

						// Handle dashed/dotted variants with proper implementation
						const separatorStyle =
							variant === 'dashed' || variant === 'dotted' ?
								{
									background: `repeating-linear-gradient(
              90deg,
              hsl(var(--border)),
              hsl(var(--border)) ${variant === 'dashed' ? '8px' : '2px'},
              transparent ${variant === 'dashed' ? '8px' : '2px'},
              transparent ${variant === 'dashed' ? '16px' : '6px'}
            )`,
									height: '1px',
								}
							:	undefined;

						acc.push(
							<Separator
								key={`separator-${index}`}
								className={cn(
									'mx-auto',
									variant === 'default' ? 'bg-border/60' : '',
									separatorClasses.spacing,
									separatorClasses.width,
								)}
								style={separatorStyle}
							/>,
						);
					}
					return acc;
				}, [])
			:	childrenArray;

		return (
			<section
				className={cn(
					// Base layout structure
					'w-full',
					// Container query wrapper
					getContainerClasses(containerType),
					// Width constraints with automatic padding control
					getMaxWidthClasses(maxWidth || 'container'),
					// Vertical spacing between rows (only when no separators)
					!showSeparators && getSpacingClasses(spacing),
					// Responsive padding - no y-padding on large screens (50/50 layout)
					'py-0 @md:py-0 @lg:py-0 @xl:py-0',
					// Allow custom classes
					className,
				)}
				role='region'
				aria-label='Content sections'>
				{/* Render children with optional separators */}
				<div className={showSeparators ? '' : getSpacingClasses(spacing)}>
					{childrenWithSeparators}
				</div>
			</section>
		);
	},
);

AlternatingLayout.displayName = 'AlternatingLayout';

export { AlternatingLayout };
