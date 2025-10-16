'use client';

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
				<h2>
					&quot;A truly bespoke experience — Elizabeth personally pairs each student
					with a carefully selected tutor from her boutique team.&quot;
				</h2>
				<p className='text-sm mt-2'>– Academic Insight</p>
				{}
				<div
					className='absolute top-3/4 right-1/4 w-1 h-1 bg-[#D4AF37] opacity-40 hidden lg:block animate-pulse'
					style={{
						animationDelay: '1s',
					}}></div>
				<div
					className='absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-[#D4AF37] opacity-25 hidden lg:block animate-pulse'
					style={{
						animationDelay: '2s',
					}}></div>
				{}
				<div className='absolute top-1/6 right-1/3 w-3 h-0.5 bg-[#D4AF37] opacity-20 hidden lg:block transform rotate-45'></div>
				<div className='absolute bottom-1/6 left-1/3 w-0.5 h-3 bg-[#D4AF37] opacity-20 hidden lg:block'></div>
				{}
				<div
					className='max-w-4xl mx-auto text-center relative z-10'
					style={{
						marginTop: '64px',
						marginBottom: '64px',
						gap: '21px',
					}}>
					{}
					<m.div
						className='relative w-full max-w-2xl mx-auto cursor-pointer group'
						role='region'
						aria-label='Elizabeth Burrows introduction video section'
						initial={{
							opacity: 0,
							y: 20,
							scale: 0.95,
						}}
						whileInView={{
							opacity: 1,
							y: 0,
							scale: 1,
						}}
						viewport={{
							once: true,
							margin: '-100px',
						}}
						transition={{
							duration: 0.6,
							delay: 0.1,
							ease: 'easeOut',
						}}
						style={{
							background: 'transparent',
							border: 'none',
							boxShadow: `
                4px 8px 16px rgba(30,58,95,0.2),
                0 0 20px rgba(212,175,55,0.1)
              `,
							padding: 'calc(16px * 1.618)',
							borderLeft: '4px solid #D4AF37',
						}}
						whileHover={{
							y: -2,
							scale: 1.02,
							boxShadow: `
                6px 12px 24px rgba(30,58,95,0.3),
                0 0 30px rgba(212,175,55,0.3)
              `,
							transition: {
								duration: 0.3,
								ease: 'easeOut',
							},
						}}>
						<HeroVideoDialog
							videoSrc='/videos/compressed-elizabeth-introduction-sound.mp4'
							thumbnailSrc='/images/video-thumbnails/introduction-video-thumbnail-2025.png'
							thumbnailAlt='Elizabeth Burrows Introduction Video - Founder of My Private Tutor Online'
							animationStyle='from-center'
							className='w-full'
						/>
					</m.div>
				</div>
			</div>
		</section>
	);
}
