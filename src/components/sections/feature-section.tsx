'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { HeadingText, BodyText } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface FeatureSectionProps {
	title: string;
	description: string | ReactNode;
	imageSrc: string;
	imageAlt: string;
	imagePosition?: 'left' | 'right';
	primaryAction: {
		text: string;
		href: string;
	};
	secondaryAction: {
		text: string;
		href: string;
	};
	className?: string;
}

export function FeatureSection({
	title,
	description,
	imageSrc,
	imageAlt,
	imagePosition = 'right',
	primaryAction,
	secondaryAction,
	className,
}: FeatureSectionProps) {
	const isExternal = (href: string) =>
		href.startsWith('http') || href.startsWith('https');

	// Standardized intersection observer for mobile/tablet layout
	const { ref: mobileRef, inView: mobileInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});

	// Separate intersection observer for desktop layout
	const { ref: desktopRef, inView: desktopInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});


	return (
		<section className={cn('w-full', className)}>
			{/* Mobile & Tablet Layout: Flex Column (Image first, Text second) */}
			<div
				ref={mobileRef}
				className="flex flex-col lg:hidden">
		{/* Image - Always first on mobile/tablet */}
				<div
					className="relative w-full h-44 sm:h-56 md:h-96 overflow-hidden">
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						className="object-cover"
						sizes="(max-width: 1024px) 100vw, 50vw"
						priority
					/>
				</div>

				{/* Text Content - Always second on mobile/tablet */}
				<div
					className="flex flex-col items-center text-center px-6 md:px-8 py-8">
					<div>
						<HeadingText
							variant="primary"
							level={3}
							className="text-balance mb-4"
							responsive>
							{title}
						</HeadingText>
					</div>
					{description && (
						<div>
							<BodyText
								variant="large"
								className="text-muted-foreground mb-6 sm:mb-8 max-w-xl"
								responsive>
								{description}
							</BodyText>
						</div>
					)}
					{/* Secondary Button - Show as primary styled button on mobile (Learn More) */}
					<div
						className="flex w-full flex-col justify-center gap-2 md:flex-row">
		{isExternal(secondaryAction.href) ? (
							<Button asChild className="rounded-none w-full md:w-auto">
								<a
									href={secondaryAction.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									{secondaryAction.text}
								</a>
							</Button>
						) : (
							<Button asChild className="rounded-none w-full md:w-auto">
								<Link href={secondaryAction.href}>{secondaryAction.text}</Link>
							</Button>
						)}

						{/* Primary Button - Hidden on mobile, visible on tablet as outline (Get Started) */}
						{isExternal(primaryAction.href) ? (
							<Button variant="outline" asChild className="rounded-none hidden md:flex md:w-auto">
								<a
									href={primaryAction.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									{primaryAction.text}
								</a>
							</Button>
						) : (
							<Button variant="outline" asChild className="rounded-none hidden md:flex md:w-auto">
								<Link href={primaryAction.href}>{primaryAction.text}</Link>
							</Button>
						)}
					</div>
				</div>
			</div>

			{/* Desktop Layout: Grid (Current behavior maintained exactly) */}
			<div
				ref={desktopRef}
				className={cn(
					'hidden lg:grid items-center gap-0 w-full lg:grid-cols-2',
					imagePosition === 'left' && '[&>*:first-child]:order-2'
				)}>
				{/* Text Content */}
				<div
					className="flex flex-col items-start justify-center text-left px-8 lg:px-10 xl:px-16 min-h-0">
					<div>
						<HeadingText
							variant="primary"
							level={3}
							className="my-4 text-balance"
							responsive>
							{title}
						</HeadingText>
					</div>
					{description && (
						<div>
							<BodyText
								variant="large"
								className="text-muted-foreground mb-6 max-w-xl min-w-0"
								responsive>
								{description}
							</BodyText>
						</div>
					)}
					<div
						className="flex w-full flex-col justify-start gap-2 sm:flex-row">
		{isExternal(primaryAction.href) ? (
							<Button asChild className="rounded-none">
								<a
									href={primaryAction.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									{primaryAction.text}
								</a>
							</Button>
						) : (
							<Button asChild className="rounded-none">
								<Link href={primaryAction.href}>{primaryAction.text}</Link>
							</Button>
						)}
						{isExternal(secondaryAction.href) ? (
							<Button variant="outline" asChild className="rounded-none">
								<a
									href={secondaryAction.href}
									target="_blank"
									rel="noopener noreferrer"
								>
									{secondaryAction.text}
								</a>
							</Button>
						) : (
							<Button variant="outline" asChild className="rounded-none">
								<Link href={secondaryAction.href}>
									{secondaryAction.text}
								</Link>
							</Button>
						)}
					</div>
				</div>

				{/* Image */}
				<div
					className="relative w-full aspect-[4/3] lg:aspect-video overflow-hidden group">
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="50vw"
					/>
				</div>
			</div>
		</section>
	);
}

