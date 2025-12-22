'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { HeadingText, BodyText, CaptionText } from '@/components/ui/typography';
interface SectionProps {
	children: ReactNode;
	className?: string;
	background?:
		| 'white'
		| 'grey'
		| 'gradient'
		| 'accent'
		| 'primary'
		| 'transparent';
	padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
	containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
	id?: string;
	ariaLabel?: string;
	as?: 'section' | 'div' | 'article' | 'aside';
}

export function Section({
	children,
	className,
	background = 'white',
	padding = 'lg',
	containerSize = 'xl',
	id,
	ariaLabel,
	as: Component = 'section',
}: SectionProps) {
	const backgroundClasses = {
		white: 'bg-white',
		grey: 'bg-primary-50',
		gradient: 'bg-gradient-to-br from-white via-primary-50 to-accent-50',
		accent: 'bg-accent-50',
		primary: 'bg-primary-900 text-white',
		transparent: 'bg-transparent',
	};
	const paddingClasses = {
		none: '',
		sm: 'py-8',
		md: 'py-12',
		lg: 'py-16',
		xl: 'py-24',
	};
	const containerSizeClasses = {
		sm: 'max-w-2xl',
		md: 'max-w-4xl',
		lg: 'max-w-6xl',
		xl: 'max-w-7xl',
		'2xl': 'max-w-screen-2xl',
		full: 'max-w-none',
	};
	return (
		<Component
			id={id}
			className={cn(
				'relative',
				backgroundClasses[background],
				paddingClasses[padding],
				className,
			)}
			aria-label={ariaLabel}
			role={Component === 'div' ? 'region' : undefined}>
			<div
				className={cn(
					'mx-auto px-4 sm:px-6 lg:px-8',
					containerSizeClasses[containerSize],
				)}>
				{children}
			</div>
		</Component>
	);
}

interface SectionHeaderProps {
	title: string;
	subtitle?: string;
	description?: string;
	className?: string;
	alignment?: 'left' | 'center' | 'right';
	titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function SectionHeader({
	title,
	subtitle,
	description,
	className,
	alignment = 'center',
	titleAs: TitleComponent = 'h2',
}: SectionHeaderProps) {
	const alignmentClasses = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right',
	};
	const containerClasses = {
		left: 'max-w-none',
		center: 'max-w-3xl mx-auto',
		right: 'max-w-none ml-auto',
	};
	return (
		<div
			className={cn(
				containerClasses[alignment],
				alignmentClasses[alignment],
				'mb-12 lg:mb-16',
				className,
			)}>
			{subtitle && (
				<div className='mb-4'>
					<CaptionText
						as="span"
						className='inline-flex items-center px-3 py-1 bg-accent-100 text-accent-700 font-medium rounded-full'>
		{subtitle}
					</CaptionText>
				</div>
			)}

			<HeadingText
				as={TitleComponent}
				variant="primary"
				responsive
				className='mb-4'>
		{title}
			</HeadingText>

			{description && (
				<BodyText
					variant="large"
					className='text-primary-600 leading-relaxed max-w-2xl mx-auto'
					alignment="center">
					{description}
				</BodyText>
			)}
		</div>
	);
}

type SectionBackground =
	| 'white'
	| 'grey'
	| 'gradient'
	| 'accent'
	| 'primary'
	| 'transparent';
type SectionPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type SectionContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
type SectionAlignment = 'left' | 'center' | 'right';
