'use client';

import * as React from 'react';
import { Root as Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-accessibility';
const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-serif focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-primary-600",
	{
		variants: {
			variant: {
				default:
					'bg-primary-800 text-white shadow-md hover:bg-primary-900 hover:shadow-lg focus-visible:ring-primary-600 transform hover:scale-[1.02] transition-all duration-200',
				accent:
					'bg-gradient-to-r from-accent-800 to-accent-900 text-white shadow-md hover:from-accent-900 hover:to-accent-950 hover:shadow-lg focus-visible:ring-accent-700 transform hover:scale-[1.02] transition-all duration-200',
				destructive:
					'bg-red-600 text-white shadow-md hover:bg-red-700 focus-visible:ring-red-500 transform hover:scale-[1.02]',
				outline:
					'border-2 border-primary-700 bg-transparent text-primary-700 shadow-sm hover:bg-primary-50 hover:border-primary-800 focus-visible:ring-primary-600',
				secondary:
					'bg-neutral-100 text-primary-800 shadow-sm hover:bg-neutral-200 focus-visible:ring-neutral-400',
				ghost:
					'hover:bg-primary-50 hover:text-primary-800 focus-visible:ring-primary-600',
				link:
					'text-accent-700 underline-offset-4 hover:underline hover:text-accent-800 focus-visible:ring-accent-600',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);
function Button({
	className,
	variant,
	size,
	asChild = false,
	loading = false,
	'aria-label': _ariaLabel,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
		loading?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';
	const reducedMotion = useReducedMotion();
	const buttonProps = {
		...props,
		'aria-busy': loading || undefined,
		'aria-disabled': loading || props.disabled || undefined,
		disabled: loading || props.disabled,
	};
	const motionSafeClassName = cn(
		buttonVariants({
			variant,
			size,
			className,
		}),
		reducedMotion && 'transition-none',
	);
	return (
		<Comp
			data-slot='button'
			className={motionSafeClassName}>
		{...buttonProps}>
			{loading && (
				<span
					className='sr-only'
					role='status'
					aria-live='polite'>
					Loading...
				</span>
			)}
			{asChild ?
				<Slottable>{props.children}</Slottable>
			:	props.children}
		</Comp>
	);
export { Button,  };
