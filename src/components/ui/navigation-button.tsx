'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * CONTEXT7 SOURCE: /joe-bell/cva - Enhanced CVA Navigation Button with Design Token Integration
 * DESIGN TOKEN MIGRATION: Converted from hardcoded color props to semantic design tokens
 * ENHANCEMENT: Type-safe variants following 2025 design system standards
 */

const navigationButtonVariants = cva(
	'relative flex w-[200px] items-center justify-center p-[10px] transition-all duration-200 cursor-pointer border-none font-semibold',
	{
		variants: {
			variant: {
				// Primary brand navy variant
				primary: 'bg-primary-700 text-white hover:shadow-lg',
				// Secondary brand gold variant
				secondary: 'bg-accent-600 text-white hover:shadow-lg',
				// Neutral variant
				neutral: 'bg-neutral-100 text-neutral-800 hover:shadow-lg',
				// Outline variants
				'outline-primary': 'bg-transparent border-2 border-primary-700 text-primary-700 hover:bg-primary-50',
				'outline-secondary': 'bg-transparent border-2 border-accent-600 text-accent-600 hover:bg-accent-50',
			},
			state: {
				initial: '',
				hovered: 'bg-white outline outline-1 outline-primary-700',
			},
		},
		compoundVariants: [
			// Primary variant hover state
			{
				variant: 'primary',
				state: 'hovered',
				class: 'text-primary-700',
			},
			// Secondary variant hover state
			{
				variant: 'secondary',
				state: 'hovered',
				class: 'text-accent-600',
			},
			// Neutral variant hover state
			{
				variant: 'neutral',
				state: 'hovered',
				class: 'text-neutral-800',
			},
			// Outline variants hover state
			{
				variant: ['outline-primary', 'outline-secondary'],
				state: 'hovered',
				class: 'outline-neutral-800',
			},
		],
		defaultVariants: {
			variant: 'primary',
			state: 'initial',
		},
);

interface NavigationButtonProps extends VariantProps<typeof navigationButtonVariants> {
	initialText: string;
	changeText: string;
	href: string;
	className?: string;

export const NavigationButton: React.FC<NavigationButtonProps> = ({
	variant = 'primary',
	initialText,
	changeText,
	href,
	className = '',
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<Link
			href={href}
			className={cn('block', className)}>
		{isHovered ? (
				<button
					className={cn(
						navigationButtonVariants({
							variant,
							state: 'hovered'
						}),
						'overflow-hidden'
					)}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					<span
						key='action'
						className='relative block h-full w-full'>
						<span className='flex items-center justify-center gap-2'>
							<CheckIcon className='h-4 w-4' />
							{changeText}
						</span>
					</span>
				</button>
			) : (
				<button
					className={navigationButtonVariants({ variant, state: 'initial' })}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}>
					<span
						key='reaction'
						className='relative block'>
						<span className='flex items-center justify-center gap-2'>
							<PlusIcon className='h-4 w-4' />
							{initialText}
						</span>
					</span>
				</button>
			)}
		</Link>
	);
};
