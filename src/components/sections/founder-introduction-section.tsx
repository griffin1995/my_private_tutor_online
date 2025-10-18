'use client';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { Blockquote } from 'flowbite-react';
import { m } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
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
			className='py-20 lg:py-28 bg-gradient-to-br from-[#0A1128] to-[#1B2A41] relative overflow-hidden'
			style={{
				backgroundImage: `
          linear-gradient(135deg, #F5F1EB 0%, rgba(139,69,19,0.1) 100%),
          radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 1px),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
			}}>
			<div className='w-full max-w-6xl mx-auto text-center'>
				{' '}
				<div className='container mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center mb-12' data-standalone-quote>
					<Blockquote className='border-l-neutral-300'>
						{/* Quote icon */}
						<svg
							className='mb-6 h-14 w-14 fill-primary-700'
							aria-hidden='true'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 18 14'>
							<path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
						</svg>

						{/* Bespoke Experience Quote */}
						<p className='italic'>
							&quot;<strong>A truly bespoke</strong> experience — Elizabeth personally
							pairs each student with a <u>carefully selected tutor</u> from her
							boutique team.&quot;
						</p>

						{/* Author with avatar */}
						<figcaption className='mt-4 flex items-center justify-center space-x-3'>
							<cite className='text-neutral-600'>Academic Insight</cite>
						</figcaption>
					</Blockquote>
				</div>
			<div className="w-full max-w-4xl mx-auto">
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
