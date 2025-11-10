'use client';

import * as React from 'react';
import * as AspectRatioPrimitive from '@radix-ui/react-aspect-ratio';
import { cn } from '@/lib/utils';
export interface AspectRatioProps
	extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
	ratio?: number;
	className?: string;
	children?: React.ReactNode;
	errorFallback?: React.ReactNode;
	loadingPlaceholder?: React.ReactNode;
}
const AspectRatio = React.forwardRef<
	React.ElementRef<typeof AspectRatioPrimitive.Root>,
	AspectRatioProps
>(
	(
		{
			ratio = 16 / 9,
			className,
			children,
			errorFallback,
			loadingPlaceholder,
			...props
		},
		ref,
	) => {
		const [hasError, setHasError] = React.useState(false);
		const [isLoading, setIsLoading] = React.useState(true);
		const handleError = React.useCallback(() => {
			setHasError(true);
			setIsLoading(false);
		}, []);
		const handleLoad = React.useCallback(() => {
			setIsLoading(false);
			setHasError(false);
		}, []);
		return (
			<AspectRatioPrimitive.Root
				ref={ref}
				ratio={ratio}
				data-slot='aspect-ratio'
				className={cn(
					'relative overflow-hidden rounded-md',
					hasError && 'bg-muted border border-border',
					className,
				)}
				{...props}>
				{isLoading && loadingPlaceholder && !hasError && (
					<div
						data-slot='aspect-ratio-loading'
						className='absolute inset-0 flex items-center justify-center'>
						{loadingPlaceholder}
					</div>
				)}

				{hasError && errorFallback ?
					<div
						data-slot='aspect-ratio-error'
						className='absolute inset-0 flex items-center justify-center text-muted-foreground'
						role='alert'
						aria-live='polite'
						aria-label='Content failed to load'>
						{errorFallback}
					</div>
				:	React.Children.map(children, (child) => {
						if (React.isValidElement(child)) {
							if (child.type === 'video' || child.type === 'img') {
								return React.cloneElement(child as React.ReactElement<any>, {
									onError: handleError,
									onLoad: handleLoad,
									onLoadStart: () => setIsLoading(true),
									onCanPlay: child.type === 'video' ? handleLoad : undefined,
									className: cn(
										'w-full h-full transition-opacity duration-300',
										!child.props.className?.includes('object-') && 'object-cover',
										isLoading && 'opacity-0',
										!isLoading && !hasError && 'opacity-100',
										child.props.className,
									),
								});
							}
							return child;
						}
						return child;
					})
				}
			</AspectRatioPrimitive.Root>
		);
	},
);
AspectRatio.displayName = 'AspectRatio';
export const VideoAspectRatio: React.FC<Omit<AspectRatioProps, 'ratio'>> = (
	props,
) => (
	<AspectRatio
		ratio={16 / 9}
		{...props}
	/>
);
export const SquareAspectRatio: React.FC<Omit<AspectRatioProps, 'ratio'>> = (
	props,
) => (
	<AspectRatio
		ratio={1}
		{...props}
	/>
);
export const PortraitAspectRatio: React.FC<Omit<AspectRatioProps, 'ratio'>> = (
	props,
) => (
	<AspectRatio
		ratio={4 / 5}
		{...props}
	/>
);
export { AspectRatio };
