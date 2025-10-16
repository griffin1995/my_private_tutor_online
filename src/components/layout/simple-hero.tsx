'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
interface SimpleHeroProps {
	backgroundImage: string;
	h1: React.ReactNode;
	h2: string;
	className?: string;
	decorativeStyle?: 'lines' | 'dots' | 'none';
	textVerticalOffset?: 'default' | 'lower' | 'higher' | 'much-lower';
}
const heroContainerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.4,
			staggerChildren: 0.3,
			when: 'beforeChildren',
		},
	},
};
const heroItemVariants = {
	hidden: {
		opacity: 0,
		y: -100,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: 'easeOut',
		},
	},
};
export function SimpleHero({
	backgroundImage,
	h1,
	h2,
	className,
	decorativeStyle = 'lines',
	textVerticalOffset = 'default',
}: SimpleHeroProps) {
	return (
		<section
			data-hero-section
			className={cn('relative h-screen w-screen overflow-hidden', className)}
			role='banner'
			aria-label='Hero section'>
			{}
			{}
			{}
			{}
			{}
			{}
			<div
				className='absolute inset-0'
				aria-hidden='true'>
				<div
					className='absolute inset-0'
					style={{
						backgroundImage: `url(${backgroundImage})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						animation: 'heroZoom 10s ease-out 0s 1 normal none running',
						filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
					}}
				/>
				<style
					dangerouslySetInnerHTML={{
						__html: `
            @keyframes heroZoom {
              0% { transform: scale(1.25); }
              100% { transform: scale(1); }
            }
          `,
					}}
				/>
			</div>

			{}
			{}
			{}

			{}
			{}
			{}
			<div
				className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 shadow-inner'
				style={{
					opacity: 0.618,
				}}
				aria-hidden='true'
			/>

			{}
			{}
			{}
			<div
				className='absolute inset-0 bg-gradient-radial from-blue-900/30 via-slate-900/20 to-black/50 mix-blend-multiply'
				style={{
					opacity: 0.382,
				}}
				aria-hidden='true'
			/>

			{}
			{}
			{}
			<div
				className='absolute inset-0 bg-gradient-conic from-amber-400/10 via-yellow-300/5 to-amber-600/15'
				style={{
					opacity: 0.25,
				}}
				aria-hidden='true'
			/>

			{}
			{}
			{}
			<div
				className='absolute inset-0 bg-gradient-radial from-amber-500/15 via-transparent to-transparent'
				style={{
					background: `radial-gradient(circle at 50% 40%, #CA9E5B15 0%, transparent 60%)`,
					opacity: 0.3,
				}}
				aria-hidden='true'
			/>

			{}
			{}
			<div className='relative z-10 flex flex-col items-center justify-center h-full px-4 text-center'>
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				<motion.div
					variants={heroContainerVariants}
					initial='hidden'
					animate='visible'
					className={cn(
						'w-[80vw] max-w-screen-xl mx-auto',
						textVerticalOffset === 'much-lower' ?
							'pt-28 sm:pt-32 md:pt-36 lg:pt-44 xl:pt-48'
						: textVerticalOffset === 'lower' ? 'pt-16 lg:pt-20'
						: textVerticalOffset === 'higher' ? 'pt-8'
						: 'pt-12',
					)}>
					{}
					{}
					{}
					{}
					{}
					<motion.div
						variants={heroItemVariants}
						className='mb-[26px]'>
						<h1>{h1}</h1>
					</motion.div>

					{}
					{}
					{}
					{}
					{}
					{}
					{}
					<motion.div variants={heroItemVariants}>
						<h2 className='text-white text-center max-w-full mx-auto px-4'>{h2}</h2>
					</motion.div>
				</motion.div>

				{}
				{}
				<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center'>
					<div
						className='flex flex-col items-center cursor-pointer'
						onClick={() => {
							window.scrollTo({
								top: window.innerHeight,
								behavior: 'smooth',
							});
						}}>
						{}
						{}
						{}
						{}
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							className='text-white'
							style={{
								opacity: 0.7,
							}}>
							<path
								d='M7 10l5 5 5-5'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>

						{}
						{}
						{}
						{}
						<span
							className='text-xs font-serif tracking-widest uppercase text-white mt-2'
							style={{
								opacity: 0.6,
								letterSpacing: '0.1em',
							}}>
							SCROLL
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
export type { SimpleHeroProps };
