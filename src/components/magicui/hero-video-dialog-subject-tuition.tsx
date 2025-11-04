/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { CirclePlay, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils';

type AnimationStyle =
	| 'from-bottom'
	| 'from-center'
	| 'from-top'
	| 'from-left'
	| 'from-right'
	| 'fade'
	| 'top-in-bottom-out'
	| 'left-in-right-out';

interface HeroVideoDialogProps {
	animationStyle?: AnimationStyle;
	videoSrc: string;
	thumbnailSrc: string;
	thumbnailAlt?: string;
	className?: string;
	isFree?: boolean;
	purchaseLink?: string;
}

const animationVariants = {
	'from-bottom': {
		initial: { y: '100%', opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: '100%', opacity: 0 },
	},
	'from-center': {
		initial: { scale: 0.5, opacity: 0 },
		animate: { scale: 1, opacity: 1 },
		exit: { scale: 0.5, opacity: 0 },
	},
	'from-top': {
		initial: { y: '-100%', opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: '-100%', opacity: 0 },
	},
	'from-left': {
		initial: { x: '-100%', opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: '-100%', opacity: 0 },
	},
	'from-right': {
		initial: { x: '100%', opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: '100%', opacity: 0 },
	},
	fade: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	'top-in-bottom-out': {
		initial: { y: '-100%', opacity: 0 },
		animate: { y: 0, opacity: 1 },
		exit: { y: '100%', opacity: 0 },
	},
	'left-in-right-out': {
		initial: { x: '-100%', opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: '100%', opacity: 0 },
	},
};

export function HeroVideoDialogSubjectTuition({
	animationStyle = 'from-center',
	videoSrc,
	thumbnailSrc,
	thumbnailAlt = 'Video thumbnail',
	className,
	isFree = true,
	purchaseLink,
}: HeroVideoDialogProps) {
	const [isVideoOpen, setIsVideoOpen] = useState(false);
	const selectedAnimation = animationVariants[animationStyle];

	const isPaidVideo = !!purchaseLink;

	const handleClick = () => {
		if (isPaidVideo) {
			// Redirect to purchase link for paid videos
			window.open(purchaseLink, '_blank', 'noopener,noreferrer');
		} else {
			// Open video modal for free videos
			setIsVideoOpen(true);
		}
	};

	return (
		<div className={cn('relative', className)}>
			<button
				type='button'
				aria-label={isPaidVideo ? 'Purchase video access' : 'Play video'}
				className='group relative cursor-pointer border-0 bg-transparent p-0 w-full'
				onClick={handleClick}>
				<img
					src={thumbnailSrc}
					alt={thumbnailAlt}
					width={1920}
					height={1080}
					className='w-full aspect-video object-cover border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]'
				/>
				{/* Play button overlay - always vertically centered */}
				{(isFree || isPaidVideo) && (
					<div className='absolute inset-0 transition-all duration-200 ease-out'>
						{/* Play button - absolutely centered */}
						<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
							<CirclePlay
								size={100}
								strokeWidth={0.5}
								className='text-white group-hover:text-accent-600 transition-colors duration-300'
							/>
						</div>
						{/* "Buy." text - positioned below center */}
						{isPaidVideo && (
							<div className='absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[70px]'>
								<span className='text-white group-hover:text-accent-600 transition-colors duration-300 text-xl italic font-serif'>
									Buy.
								</span>
							</div>
						)}
					</div>
				)}
			</button>
			{/* Only render video modal for free videos */}
			{!isPaidVideo && (
				<AnimatePresence>
					{isVideoOpen && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md'
							role='button'
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
									setIsVideoOpen(false);
								}
							}}
							onClick={() => setIsVideoOpen(false)}>
							<motion.div
								{...selectedAnimation}
								transition={{ type: 'spring', damping: 30, stiffness: 300 }}
								className='relative mx-4 aspect-video w-full max-w-4xl md:mx-0'>
								<motion.button
									className='absolute -top-16 right-0 bg-neutral-900/50 p-2 text-xl text-white ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black'
									onClick={() => setIsVideoOpen(false)}>
									<X className='size-5' />
								</motion.button>
								<div className='relative isolate z-[1] size-full overflow-hidden border-2 border-white'>
									{videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be') ? (
										<iframe
											src={videoSrc}
											title='Hero Video player'
											className='size-full'
											allowFullScreen
											allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
										/>
									) : (
										<video
											src={videoSrc}
											className='size-full object-contain'
											controls
											autoPlay
											muted
											playsInline
											preload='metadata'
										/>
									)}
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			)}
		</div>
	);
}

export default HeroVideoDialogSubjectTuition;
