// Recognition card component for About Section with motion animations
// ARCHITECTURE: Reusable card component with optimised Framer Motion integration
// DESIGN SYSTEM: Implements brand design tokens for consistent visual presentation

'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { CaptionText } from '@/components/ui/typography';
import Image from 'next/image';

interface RecognitionCardProps {
	headerText: string;
	contentType: 'logo';
	logoImage: {
		url: string;
		alt: string;
	};
	footerText?: string;
	animationDelay: number;
	index: number;
}

/**
 * Recognition Card Component
 *
 * Displays brand achievement and recognition cards with logo imagery
 * Features hover effects and staggered animation for enhanced visual appeal
 *
 * @param headerText - Card header text for recognition context
 * @param contentType - Display mode specification (currently supports 'logo')
 * @param logoImage - Brand logo image with URL and accessibility attributes
 * @param footerText - Optional footer text for additional context
 * @param animationDelay - Timing offset for staggered animation sequence
 * @param index - Card position index for animation coordination
 */
export function RecognitionCard({
	headerText,
	contentType,
	logoImage,
	footerText,
	animationDelay,
	index,
}: RecognitionCardProps) {
	// Intersection observer for individual card animation trigger
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});

	// Animation configuration for card content transitions
	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.6, ease: "easeOut" }
	};

	const scaleIn = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		transition: { duration: 0.6, ease: "easeOut" }
	};

	return (
		<AspectRatio ratio={1 / 1}>
			<motion.div
				ref={ref}
				className='w-full h-full'
				{...fadeInUp}
				animate={inView ? fadeInUp.animate : fadeInUp.initial}
				transition={{ ...fadeInUp.transition, delay: animationDelay }}
				whileHover={{
					scale: 1.02,
					y: -2,
					boxShadow: '0 8px 24px rgba(202,158,91,0.2)',
					transition: { duration: 0.3, ease: "easeOut" },
				}}
				whileTap={{ scale: 0.98 }}>
				<Card className='group relative w-full h-full p-4 sm:p-5 border border-accent-600/30 shadow-md backdrop-blur-md font-condensed uppercase tracking-wide bg-gradient-to-br from-white/90 via-white/70 grid grid-rows-[20%_60%_20%] items-center gap-2 sm:gap-3 md:gap-4 rounded-none'>
					{/* Header Text Section */}
					<motion.div
						{...scaleIn}
						animate={inView ? scaleIn.animate : scaleIn.initial}
						transition={{ ...scaleIn.transition, delay: animationDelay + 0.2 }}>
						<CaptionText
							variant="default"
							className="text-center font-semibold text-primary-900 leading-[1.4] tracking-tight"
							responsive>
							{headerText}
						</CaptionText>
					</motion.div>

					{/* Logo Image Display Section */}
					<motion.div
						className='relative w-full h-auto flex items-center justify-center p-3'
						{...scaleIn}
						animate={inView ? scaleIn.animate : scaleIn.initial}
						transition={{ ...scaleIn.transition, delay: animationDelay + 0.3 }}>
						<Image
							src={logoImage.url}
							alt={logoImage.alt}
							width={200}
							height={120}
							className='w-full h-auto object-contain filter group-hover:brightness-110 transition-all duration-300'
							loading='lazy'
							quality={85}
						/>
					</motion.div>

					{/* Optional Footer Text Section */}
					{footerText ?
						<motion.div
							{...scaleIn}
							animate={inView ? scaleIn.animate : scaleIn.initial}
							transition={{ ...scaleIn.transition, delay: animationDelay + 0.4 }}>
							<CaptionText
								variant="default"
								className="text-center font-semibold text-primary-900 leading-[1.4] tracking-tight"
								responsive>
								{footerText}
							</CaptionText>
						</motion.div>
					:	<div />}
				</Card>
			</motion.div>
		</AspectRatio>
	);
}
