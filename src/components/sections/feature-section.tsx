'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
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

	// Standardized animation variants
	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.6, ease: 'easeOut' }
	};

	const slideInLeft = {
		initial: { opacity: 0, x: -30 },
		animate: { opacity: 1, x: 0 },
		transition: { duration: 0.8, ease: 'easeOut' }
	};

	const slideInRight = {
		initial: { opacity: 0, x: 30 },
		animate: { opacity: 1, x: 0 },
		transition: { duration: 0.8, ease: 'easeOut' }
	};

	const scaleIn = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		transition: { duration: 0.8, ease: 'easeOut' }
	};

	return (
		<section className={cn('w-full', className)}>
			{/* Mobile & Tablet Layout: Flex Column (Image first, Text second) */}
			<motion.div
				ref={mobileRef}
				className="flex flex-col lg:hidden"
				{...fadeInUp}
				animate={mobileInView ? fadeInUp.animate : fadeInUp.initial}>
				{/* Image - Always first on mobile/tablet */}
				<motion.div
					className="relative w-full h-44 sm:h-56 md:h-96 overflow-hidden"
					{...scaleIn}
					animate={mobileInView ? scaleIn.animate : scaleIn.initial}
					transition={{ ...scaleIn.transition, delay: 0.1 }}>
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						className="object-cover"
						sizes="(max-width: 1024px) 100vw, 50vw"
						priority
					/>
				</motion.div>

				{/* Text Content - Always second on mobile/tablet */}
				<motion.div
					className="flex flex-col items-center text-center px-6 md:px-8 py-8"
					{...fadeInUp}
					animate={mobileInView ? fadeInUp.animate : fadeInUp.initial}
					transition={{ ...fadeInUp.transition, delay: 0.3 }}>
					<motion.h3
						className="text-balance text-2xl font-semibold sm:text-3xl md:text-4xl mb-4"
						{...fadeInUp}
						animate={mobileInView ? fadeInUp.animate : fadeInUp.initial}
						transition={{ ...fadeInUp.transition, delay: 0.4 }}>
						{title}
					</motion.h3>
					{description && (
						<motion.p
							className="text-muted-foreground mb-6 sm:mb-8 max-w-xl text-sm sm:text-base md:text-lg"
							{...fadeInUp}
							animate={mobileInView ? fadeInUp.animate : fadeInUp.initial}
							transition={{ ...fadeInUp.transition, delay: 0.5 }}>
							{description}
						</motion.p>
					)}
					<motion.div
						className="flex w-full flex-col justify-center gap-2 md:flex-row"
						{...fadeInUp}
						animate={mobileInView ? fadeInUp.animate : fadeInUp.initial}
						transition={{ ...fadeInUp.transition, delay: 0.6 }}>
						{/* Secondary Button - Show as primary styled button on mobile (Learn More) */}
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
					</motion.div>
				</motion.div>
			</motion.div>

			{/* Desktop Layout: Grid (Current behavior maintained exactly) */}
			<motion.div
				ref={desktopRef}
				className={cn(
					'hidden lg:grid items-center gap-0 w-full lg:grid-cols-2',
					imagePosition === 'left' && '[&>*:first-child]:order-2'
				)}
				{...fadeInUp}
				animate={desktopInView ? fadeInUp.animate : fadeInUp.initial}>
				{/* Text Content */}
				<motion.div
					className="flex flex-col items-start justify-center text-left px-8 lg:px-10 xl:px-16 min-h-0"
					{...(imagePosition === 'left' ? slideInRight : slideInLeft)}
					animate={desktopInView ?
						(imagePosition === 'left' ? slideInRight.animate : slideInLeft.animate) :
						(imagePosition === 'left' ? slideInRight.initial : slideInLeft.initial)
					}
					transition={{ ...(imagePosition === 'left' ? slideInRight.transition : slideInLeft.transition), delay: 0.1 }}>
					<motion.h3
						className="my-4 text-balance text-4xl font-semibold lg:text-3xl xl:text-5xl"
						{...fadeInUp}
						animate={desktopInView ? fadeInUp.animate : fadeInUp.initial}
						transition={{ ...fadeInUp.transition, delay: 0.3 }}>
						{title}
					</motion.h3>
					{description && (
						<motion.p
							className="text-muted-foreground mb-6 max-w-xl text-lg lg:text-base xl:text-xl min-w-0"
							{...fadeInUp}
							animate={desktopInView ? fadeInUp.animate : fadeInUp.initial}
							transition={{ ...fadeInUp.transition, delay: 0.4 }}>
							{description}
						</motion.p>
					)}
					<motion.div
						className="flex w-full flex-col justify-start gap-2 sm:flex-row"
						{...fadeInUp}
						animate={desktopInView ? fadeInUp.animate : fadeInUp.initial}
						transition={{ ...fadeInUp.transition, delay: 0.5 }}>
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
					</motion.div>
				</motion.div>

				{/* Image */}
				<motion.div
					className="relative w-full aspect-[4/3] lg:aspect-video overflow-hidden group"
					{...(imagePosition === 'left' ? slideInLeft : slideInRight)}
					animate={desktopInView ?
						(imagePosition === 'left' ? slideInLeft.animate : slideInRight.animate) :
						(imagePosition === 'left' ? slideInLeft.initial : slideInRight.initial)
					}
					transition={{ ...(imagePosition === 'left' ? slideInLeft.transition : slideInRight.transition), delay: 0.2 }}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}>
					<Image
						src={imageSrc}
						alt={imageAlt}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="50vw"
					/>
				</motion.div>
			</motion.div>
		</section>
	);
}

