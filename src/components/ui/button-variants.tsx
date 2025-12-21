'use client';

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Link from 'next/link';

/**
 * Modern Button Variants using CVA (Class Variance Authority)
 * Based on 2025 best practices and Tailwind CSS 4 patterns
 */

const buttonVariants = cva(
	// Base styles - always applied
	[
		'inline-flex items-center justify-center font-medium transition-colors',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
		'disabled:pointer-events-none disabled:opacity-50',
		'font-display' // Use brand font
	],
	{
		variants: {
			variant: {
				// Blue button - brand blue bg, white text
				blue: [
					'bg-primary-700 text-white border border-primary-700',
					'hover:bg-primary-800 hover:border-primary-800',
					'focus-visible:ring-primary-600',
					'active:bg-primary-900'
				],
				// Light button - white bg, blue border and text
				light: [
					'bg-white text-primary-700 border border-primary-700',
					'hover:bg-primary-50 hover:text-primary-800',
					'focus-visible:ring-primary-600',
					'active:bg-primary-100'
				],
				// Gold button - brand gold bg, white text
				gold: [
					'bg-accent-600 text-white border border-accent-600',
					'hover:bg-accent-700 hover:border-accent-700',
					'focus-visible:ring-accent-500',
					'active:bg-accent-800'
				],
				// Light gold - white bg, gold border and text
				'light-gold': [
					'bg-white text-accent-700 border border-accent-600',
					'hover:bg-accent-50 hover:text-accent-800',
					'focus-visible:ring-accent-500',
					'active:bg-accent-100'
				],
				// Ghost variants for subtle interactions
				'ghost-blue': [
					'bg-transparent text-primary-700 border border-transparent',
					'hover:bg-primary-50 hover:text-primary-800',
					'focus-visible:ring-primary-600'
				],
				'ghost-gold': [
					'bg-transparent text-accent-700 border border-transparent',
					'hover:bg-accent-50 hover:text-accent-800',
					'focus-visible:ring-accent-500'
				]
			},
			size: {
				sm: 'px-3 py-1.5 text-sm',
				default: 'px-4 py-2 text-base',
				lg: 'px-6 py-3 text-lg',
				xl: 'px-8 py-4 text-xl',
				icon: 'h-10 w-10 p-0'
		},
		defaultVariants: {
			variant: 'blue',
			size: 'default'
);

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	href?: string;

/**
 * Modern Button Component with CVA Variants
 *
 * Examples:
 * <Button variant="blue">Primary Action</Button>
 * <Button variant="light">Secondary Action</Button>
 * <Button variant="gold">Premium Action</Button>
 * <Button variant="light-gold">Premium Secondary</Button>
 * <Button variant="ghost-blue" size="sm">Subtle Action</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, href, ...props }, ref) => {
		const buttonClasses = cn(buttonVariants({ variant, size }), className);

		// If href is provided, render as Link
		if (href) {
			return (
				<Link href={href} className={buttonClasses}>
					{props.children}
				</Link>
			);

		// If asChild is true, render children directly (for advanced composition)
		if (asChild) {
			return React.cloneElement(props.children as React.ReactElement, {
				className: buttonClasses,
				ref,
				...props
			});

		// Default button element
		return (
			<button className={buttonClasses} ref={ref} {...props} />
		);
);

Button.displayName = 'Button';

export { Button,  };