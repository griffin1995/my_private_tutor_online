// CONTEXT7 SOURCE: /framer/motion - Recognition card component for About Section
// ARCHITECTURE REASON: Reusable card component with hardcoded data and Framer Motion animations
// DESIGN SYSTEM COMPLIANCE: Uses design tokens (primary-900) instead of hardcoded colors

'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import { m } from 'framer-motion';
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
 * RecognitionCard Component
 *
 * Displays recognition/achievement cards in the About Section
 * Supports both logo images (Tatler, Schools Guide) and icons (Royal Crown)
 *
 * @param headerText - Card header (e.g., "As featured in")
 * @param contentType - Display mode: 'logo' for images, 'icon' for SVG icons
 * @param logoImage - Logo image data from Payload Media collection
 * @param logoMaxWidth - CSS max-width for logo (default: 156px)
 * @param iconPath - Path to SVG icon for icon mode
 * @param iconAlt - Accessibility alt text for icon
 * @param footerText - Optional footer text (e.g., "Royal Clientele")
 * @param animationDelay - Stagger delay for Framer Motion animation
 * @param index - Card position for tracking
 */
export function RecognitionCard({
	headerText,
	contentType,
	logoImage,
	footerText,
	animationDelay,
	index,
}: RecognitionCardProps) {
	return (
		<AspectRatio ratio={1 / 1}>
			<m.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6, delay: animationDelay, ease: 'easeOut' }}
				whileHover={{
					scale: 1.02,
					y: -2,
					boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
					transition: { duration: 0.3, ease: 'easeOut' },
				}}
				className='w-full h-full'>
				<Card className='group relative w-full h-full p-4 sm:p-5 border border-yellow-300/30 shadow-md backdrop-blur-md font-condensed uppercase tracking-wide bg-gradient-to-br from-white/90 via-white/70 grid grid-rows-[20%_60%_20%] items-center gap-2 sm:gap-3 md:gap-4 rounded-none'>
					{/* Row 1: Header Text */}
					<m.p
						className='text-center font-semibold text-primary-900 text-sm leading-[1.4] tracking-tight'
						initial={{ opacity: 0, scale: 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.4,
							delay: animationDelay + 0.6,
							ease: 'easeOut',
						}}>
						{headerText}
					</m.p>

					{/* Row 2: Content - Logo Image (all same size now) */}
					<div className='relative w-full h-auto flex items-center justify-center p-3'>
						<Image
							src={logoImage.url}
							alt={logoImage.alt}
							width={200}
							height={120}
							className='w-full h-auto object-contain filter group-hover:brightness-110 transition-all duration-300'
							loading='lazy'
							quality={85}
						/>
					</div>

					{/* Row 3: Footer Text (optional) */}
					{footerText ?
						<m.p
							className='text-center font-semibold text-primary-900 text-sm leading-[1.4] tracking-tight'
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{
								duration: 0.4,
								delay: animationDelay + 0.6,
								ease: 'easeOut',
							}}>
							{footerText}
						</m.p>
					:	<div />}
				</Card>
			</m.div>
		</AspectRatio>
	);
}

export type { RecognitionCardProps };
