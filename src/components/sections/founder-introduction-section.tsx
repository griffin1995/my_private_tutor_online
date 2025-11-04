'use client';

import { m } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { Testimonial10NoRole } from '../education/testimonial-section';
import HeroVideoDialog from '../magicui/hero-video-dialog';

<m.div
	initial={{
		opacity: 0,
		scale: 0.8,
		y: -10,
	}}
	whileInView={{
		opacity: 1,
		scale: 1,
		y: 0,
	}}
	transition={{
		duration: 0.4,
		delay: 1.0,
		ease: 'easeOut',
	}}
	className='mb-2 relative w-[100px] h-[100px]'>
	<Image
		src='/icons/royal-crown.svg'
		alt='Royal Crown Icon'
		fill
		className='transition-all duration-300 group-hover:scale-110'
	/>
</m.div>;
interface FounderIntroductionSectionProps {
	children?: React.ReactNode;
}
export function FounderIntroductionSection({}: FounderIntroductionSectionProps = {}) {
	return (
		<section
			id='founder-introduction-elizabeth-video'
			className='py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16'>
			<div className='w-full max-w-4xl sm:max-w-5xl md:max-w-6xl lg:max-w-6xl xl:max-w-7xl mx-auto text-center px-4 sm:px-6 md:px-8'>
				<Testimonial10NoRole
					quote='A truly bespoke experience — Elizabeth personally pairs each student with a carefully selected tutor from her boutique team.'
					author={{
						name: 'Academic Insight',
						avatar: {
							src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
							alt: 'Academic Insight',
						},
					}}
				/>
				<div className='w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto'>
					<HeroVideoDialog
						videoSrc='/videos/compressed-elizabeth-introduction-sound.mp4'
						thumbnailSrc='/images/video-thumbnails/introduction-video-thumbnail-2025.png'
						thumbnailAlt='Elizabeth Burrows Introduction Video - Founder of My Private Tutor Online'
						animationStyle='from-center'
						className='w-full border border-accent-600'
					/>
				</div>
			</div>
		</section>
	);
}
