'use client';

import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { PageFooter } from './page-footer';
import { PageHeader } from './page-header';
interface PageHeaderProps {
	className?: string;
	variant?: 'transparent' | 'solid' | 'glass';
	showCTA?: boolean;
	fixed?: boolean;
	isHomepage?: boolean;
}
interface PageFooterProps {
	className?: string;
	variant?: 'default' | 'minimal' | 'premium';
	showBackToTop?: boolean;
	showContactForm?: boolean;
}
interface PageLayoutProps {
	children: ReactNode;
	className?: string;
	background?: 'white' | 'gradient' | 'pattern' | 'dark' | 'transparent';
	showHeader?: boolean;
	showFooter?: boolean;
	headerProps?: PageHeaderProps;
	footerProps?: PageFooterProps;
	containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
	verticalSpacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}
export function PageLayout({
	children,
	className,
	background = 'white',
	showHeader = true,
	showFooter = true,
	headerProps,
	footerProps,
	containerSize = 'full',
	verticalSpacing = 'lg',
}: PageLayoutProps) {
	const backgroundClasses = {
		white: 'bg-white',
		gradient: 'bg-gradient-to-br from-white via-primary-50 to-accent-50',
		pattern:
			'bg-white bg-gradient-to-r from-primary-50/30 via-white to-accent-50/30',
		dark: 'bg-primary-900',
		transparent: 'bg-transparent',
	};
	const containerSizeClasses = {
		sm: 'max-w-2xl',
		md: 'max-w-4xl',
		lg: 'max-w-6xl',
		xl: 'max-w-7xl',
		'2xl': 'max-w-screen-2xl',
		full: 'max-w-none',
	};
	const verticalSpacingClasses = {
		none: '',
		sm: 'py-0',
		md: 'py-0',
		lg: 'py-0',
		xl: 'py-0',
	};
	return (
		<div
			className={cn(
				'min-h-screen flex flex-col overflow-x-hidden',
				backgroundClasses[background],
				className,
			)}>
			{showHeader && <PageHeader {...headerProps} />}

			<main
				className='flex-1'
				role='main'
				id='main-content'
				tabIndex={-1}>
				<div
					className={cn(
						'mx-auto',
						containerSize !== 'full' && 'px-4 sm:px-6 lg:px-8',
						containerSizeClasses[containerSize],
						verticalSpacingClasses[verticalSpacing],
					)}>
					{children}
				</div>
			</main>

			{}
			{showFooter && <PageFooter {...footerProps} />}
		</div>
	);
}
export function SkipToContent() {
	return (
		<a
			href='#main-content'
			className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-900 text-white px-4 py-2 rounded-md z-50 focus:z-50'
			style={{
				zIndex: 1600,
			}}>
			Skip to main content
		</a>
	);
}
export type PageLayoutBackground =
	| 'white'
	| 'gradient'
	| 'pattern'
	| 'dark'
	| 'transparent';
export type PageLayoutContainerSize =
	| 'sm'
	| 'md'
	| 'lg'
	| 'xl'
	| '2xl'
	| 'full';
export type PageLayoutVerticalSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';
