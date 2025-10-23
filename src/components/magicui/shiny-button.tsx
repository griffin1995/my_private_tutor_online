'use client';

import React from 'react';
import { cn } from '@/lib/utils';
interface ShinyButtonProps {
	text: string;
	className?: string;
	variant?: 'default' | 'orange' | 'blue';
}
const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
	({ text, className, variant = 'default', ...props }, ref) => {
		const variantClasses = {
			default:
				'border-accent-600 bg-[linear-gradient(110deg,#eab308,45%,#fbbf24,55%,#eab308)] focus:ring-accent-400',
			orange:
				'border-accent-600 bg-[linear-gradient(110deg,#ca9e5b,45%,#e5c457,55%,#ca9e5b)] focus:ring-accent-600/60',
			blue:
				'border-blue-600 bg-[linear-gradient(110deg,#3b82f6,45%,#60a5fa,55%,#3b82f6)] focus:ring-blue-400',
		};
		return (
			<button
				ref={ref}
				className={cn(
					'animate-shimmer inline-flex h-12 items-center justify-center rounded-md px-6 font-medium text-white transition-colours focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white shadow-lg',
					variantClasses[variant],
					className,
				)}
				{...props}>
				{text}
			</button>
		);
	},
);
ShinyButton.displayName = 'ShinyButton';
export { ShinyButton };
