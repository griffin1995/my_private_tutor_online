'use client';

/**
 * ALTERNATING ROW BULLETS COMPONENT
 *
 * Flexible bullet point component with multiple variants and icon support.
 * Provides numbered, default, and icon variants with accessibility compliance.
 *
 * @author Claude Code Implementation
 * @version 1.0.0 - November 2025
 */

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { memo } from 'react';
import type {
	AlternatingRowBulletsProps,
	AlternatingRowIcon,
	BulletPoint,
} from './types';

/**
 * Utility to check if item is a string or BulletPoint object
 */
const isBulletPoint = (item: string | BulletPoint): item is BulletPoint => {
	return typeof item === 'object' && 'id' in item;
};

/**
 * Bullets component with variant support and responsive design
 * Supports string arrays and structured BulletPoint objects
 */
const AlternatingRowBullets = memo<AlternatingRowBulletsProps>(
	({ items, variant = 'default', className }) => {
		// Base list classes
		const listClasses = cn('space-y-3 @md:space-y-4', className);

		// Item classes based on variant
		const getItemClasses = (variant: string) => {
			const baseClasses = 'flex items-start gap-3 @md:gap-4';

			switch (variant) {
				case 'numbered':
					return cn(baseClasses, 'relative');
				case 'icons':
					return baseClasses;
				default:
					return baseClasses;
			}
		};

		// Marker classes based on variant
		const getMarkerClasses = (variant: string) => {
			switch (variant) {
				case 'numbered':
					// shadcn/ui Badge will handle the styling
					return 'flex-shrink-0';
				case 'icons':
					return cn('flex-shrink-0 w-5 h-5 @md:w-6 @md:h-6', 'text-accent');
				default:
					return cn(
						'flex-shrink-0 w-2 h-2 @md:w-2.5 @md:h-2.5',
						'rounded-full bg-accent',
						'mt-2 @md:mt-2.5',
					);
			}
		};

		// Text classes
		const textClasses = cn(
			'text-base @md:text-lg leading-relaxed',
			'text-muted-foreground',
		);

		// Render marker based on variant
		const renderMarker = (
			variant: string,
			index: number,
			icon?: AlternatingRowIcon,
		) => {
			const markerClasses = getMarkerClasses(variant);

			switch (variant) {
				case 'numbered':
					return (
						<div
							className={cn(
								// Clean minimal numbered badge - no rounded corners
								'w-6 h-6 @md:w-7 @md:h-7',
								'text-sm @md:text-base font-semibold',
								'bg-accent text-white',
								'inline-flex items-center justify-center',
								markerClasses,
							)}
							aria-hidden='true'>
							{index + 1}
						</div>
					);
				case 'icons':
					if (icon) {
						const IconComponent = icon;
						return (
							<IconComponent
								className={markerClasses}
								aria-hidden='true'
							/>
						);
					}
					// Fallback to check icon for icons variant
					return (
						<Check
							className={markerClasses}
							aria-hidden='true'
						/>
					);
				default:
					return (
						<div
							className={markerClasses}
							aria-hidden='true'
						/>
					);
			}
		};

		// Choose appropriate HTML tag based on variant
		const ListTag = variant === 'numbered' ? 'ol' : 'ul';

		return (
			<ListTag className={listClasses}>
				{items.map((item, index) => {
					const isStructured = isBulletPoint(item);
					const text = isStructured ? item.text : item;
					const icon = isStructured ? item.icon : undefined;
					const itemId = isStructured ? item.id : `bullet-${index}`;
					const itemClassName = isStructured ? item.className : undefined;

					return (
						<li
							key={itemId}
							className={cn(getItemClasses(variant), itemClassName)}>
							{renderMarker(variant, index, icon)}
							<span className={textClasses}>{text}</span>
						</li>
					);
				})}
			</ListTag>
		);
	},
);

AlternatingRowBullets.displayName = 'AlternatingRowBullets';

export { AlternatingRowBullets };
