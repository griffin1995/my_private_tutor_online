'use client';

import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import React from 'react';
import { Testimonial10NoRole } from '../education/testimonial-section';
import HeroVideoDialog from '../magicui/hero-video-dialog';

interface FounderIntroductionSectionProps {
	children?: React.ReactNode;
export function FounderIntroductionSection({}: FounderIntroductionSectionProps = {}) {
	// Standardized intersection observer for testimonial
	const { ref: testimonialRef, inView: testimonialInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});

	// Separate intersection observer for video
	const { ref: videoRef, inView: videoInView } = useInView({
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

	const scaleIn = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		transition: { duration: 0.8, ease: 'easeOut' }
	};

	return (
		<section
			id='founder-introduction-elizabeth-video'
			className='py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16'>
			<div className='w-full max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-6xl xl:max-w-7xl mx-auto text-center px-4 sm:px-6 md:px-8'>
				<div
					ref={testimonialRef}
					>Testimonial10NoRole
						quote='A truly bespoke experience — Elizabeth personally pairs each student with a carefully selected tutor from her boutique team.'
						author={{
							name: 'Academic Insight',
							avatar: {
								src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
								alt: 'Academic Insight',
							},
					/>
				</div>

				<div
					ref={videoRef}
					className='w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto'>
		{...scaleIn}
					<HeroVideoDialog
						videoSrc='/videos/compressed-elizabeth-introduction-sound.mp4'
						thumbnailSrc='/images/video-thumbnails/introduction-video-thumbnail-2025.png'
						thumbnailAlt='Elizabeth Burrows Introduction Video - Founder of My Private Tutor Online'
						animationStyle='from-center'
						borderColor='gold'
						className='w-full'
					/>
				</div>
			</div>
		</section>
	);
