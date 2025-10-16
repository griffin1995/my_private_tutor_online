'use client';

import * as AspectRatio from '@radix-ui/react-aspect-ratio';
import { AnimatePresence, m } from 'framer-motion';
import { CirclePlay, CirclePoundSterling, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
	videoSrc: string;
	thumbnailSrc: string;
	thumbnailAlt?: string;
	className?: string;
	animationStyle?: AnimationStyle;
	isFree?: boolean;
}
const animationVariants = {
	'from-bottom': {
		initial: {
			opacity: 0,
			y: '100%',
		},
		animate: {
			opacity: 1,
			y: 0,
		},
		exit: {
			opacity: 0,
			y: '100%',
		},
	},
	'from-center': {
		initial: {
			opacity: 0,
			scale: 0.8,
		},
		animate: {
			opacity: 1,
			scale: 1,
		},
		exit: {
			opacity: 0,
			scale: 0.8,
		},
	},
	'from-top': {
		initial: {
			opacity: 0,
			y: '-100%',
		},
		animate: {
			opacity: 1,
			y: 0,
		},
		exit: {
			opacity: 0,
			y: '-100%',
		},
	},
	'from-left': {
		initial: {
			opacity: 0,
			x: '-100%',
		},
		animate: {
			opacity: 1,
			x: 0,
		},
		exit: {
			opacity: 0,
			x: '-100%',
		},
	},
	'from-right': {
		initial: {
			opacity: 0,
			x: '100%',
		},
		animate: {
			opacity: 1,
			x: 0,
		},
		exit: {
			opacity: 0,
			x: '100%',
		},
	},
	fade: {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
		},
		exit: {
			opacity: 0,
		},
	},
	'top-in-bottom-out': {
		initial: {
			opacity: 0,
			y: '-100%',
		},
		animate: {
			opacity: 1,
			y: 0,
		},
		exit: {
			opacity: 0,
			y: '100%',
		},
	},
	'left-in-right-out': {
		initial: {
			opacity: 0,
			x: '-100%',
		},
		animate: {
			opacity: 1,
			x: 0,
		},
		exit: {
			opacity: 0,
			x: '100%',
		},
	},
};
export function HeroVideoDialog({
	videoSrc,
	thumbnailSrc,
	thumbnailAlt = 'Video thumbnail',
	className = '',
	animationStyle = 'from-center',
	isFree = true,
}: HeroVideoDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [portalContainer, setPortalContainer] = useState<Element | null>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const DEBUG_MODE = process.env.NODE_ENV === 'development';
	const renderDebug = {
		container: (label: string, element: HTMLElement) => {
			if (!DEBUG_MODE) return;
			console.group(`📦 ${label}`);
			const rect = element.getBoundingClientRect();
			const computed = window.getComputedStyle(element);
			console.log('Dimensions:', {
				width: rect.width,
				height: rect.height,
				top: rect.top,
				left: rect.left,
			});
			console.log('Computed styles:', {
				width: computed.width,
				height: computed.height,
				position: computed.position,
				display: computed.display,
				overflow: computed.overflow,
			});
			console.log('Element:', element);
			console.groupEnd();
		},
		image: (label: string, img: HTMLImageElement) => {
			if (!DEBUG_MODE) return;
			console.group(`🖼️ ${label}`);
			console.log('Natural:', {
				width: img.naturalWidth,
				height: img.naturalHeight,
			});
			console.log('Client:', {
				width: img.clientWidth,
				height: img.clientHeight,
			});
			console.log('BoundingRect:', {
				width: img.getBoundingClientRect().width,
				height: img.getBoundingClientRect().height,
			});
			const computed = window.getComputedStyle(img);
			console.log('Computed:', {
				width: computed.width,
				height: computed.height,
				position: computed.position,
				display: computed.display,
				visibility: computed.visibility,
				opacity: computed.opacity,
				transform: computed.transform,
			});
			console.log('Src:', img.src);
			console.log('Complete:', img.complete);
			console.log('Element:', img);
			console.groupEnd();
		},
	};
	if (DEBUG_MODE) {
		console.group(
			'\n============================================================\n📍 PHASE 1: HeroVideoDialog Component Mount\n============================================================',
		);
		console.log('✅ HeroVideoDialog Component Mounted');
		console.log('📊 Props Received:');
		console.log('  videoSrc:', videoSrc);
		console.log('  videoSrc type:', typeof videoSrc);
		console.log('  videoSrc truthy?:', !!videoSrc);
		console.log('  thumbnailSrc:', thumbnailSrc);
		console.log('  thumbnailAlt:', thumbnailAlt);
		console.log('  className:', className);
		console.log('  animationStyle:', animationStyle);
		console.log('  isFree:', isFree);
		if (!videoSrc || videoSrc.trim() === '') {
			console.error('❌ HeroVideoDialog received empty or invalid videoSrc!');
		} else {
			console.log('✅ HeroVideoDialog has valid videoSrc');
		}
		console.groupEnd();
	}
	const handleOpen = () => {
		setIsOpen(true);
	};
	const handleClose = () => {
		setIsOpen(false);
		if (videoRef.current) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
		}
	};
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleOpen();
		}
	};
	const handleModalKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			handleClose();
		}
	};
	useEffect(() => {
		if (typeof window !== 'undefined') {
			setPortalContainer(document.body);
		}
	}, []);
	useEffect(() => {
		if (typeof window === 'undefined') return;
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			const handleKeyDown = (e: KeyboardEvent) => {
				if (e.key === 'Escape') handleClose();
			};
			document.addEventListener('keydown', handleKeyDown);
			return () => {
				document.body.style.overflow = 'unset';
				document.removeEventListener('keydown', handleKeyDown);
			};
		} else {
			document.body.style.overflow = 'unset';
			return undefined;
		}
	}, [isOpen]);
	return (
		<>
			{}
			{}
			{}
			{}
			<div className='w-full'>
				<AspectRatio.Root
					ratio={16 / 9}
					className={`relative w-full ${className}`}
					ref={(node) => {
						if (DEBUG_MODE && node) {
							console.group(
								'\n============================================================\n📍 PHASE 2: AspectRatio.Root Direct Mount\n============================================================',
							);
							renderDebug.container('AspectRatio.Root Container', node);
							const rect = node.getBoundingClientRect();
							console.log('AspectRatio Calculation Check:', {
								expectedHeight: rect.width / (16 / 9),
								actualHeight: rect.height,
								ratio: rect.width / rect.height,
								expectedRatio: 16 / 9,
							});
							console.log('Applied className:', `relative w-full ${className}`);
							console.groupEnd();
						}
					}}>
					{}
					{}
					{}
					{}
					<div
						className='relative cursor-pointer group w-full h-full overflow-hidden border border-gray-300 hover:border-gray-400 transition-colors duration-300 rounded-lg'
						onClick={handleOpen}
						onKeyDown={handleKeyDown}
						tabIndex={0}
						role='button'
						aria-label={`Play video: ${thumbnailAlt}`}
						ref={(node) => {
							if (DEBUG_MODE && node) {
								console.group(
									'\n============================================================\n📍 PHASE 2: Interactive Container Mounted\n============================================================',
								);
								renderDebug.container('Interactive Container (group wrapper)', node);
								console.log(
									'Container has pointer events?',
									window.getComputedStyle(node).pointerEvents,
								);
								console.log('Container cursor:', window.getComputedStyle(node).cursor);
								console.groupEnd();
							}
						}}>
						{}
						{}
						{}
						{}
						{}
						{}
						<Image
							src={thumbnailSrc}
							alt={thumbnailAlt}
							fill
							className='object-contain bg-gray-900'
							style={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								width: '100%',
								height: '100%',
							}}
							priority
							quality={75}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							ref={(img) => {
								if (DEBUG_MODE && img) {
									setTimeout(() => {
										console.group(
											'\n============================================================\n📍 PHASE 2: Image Element Mounted (Ref Callback)\n============================================================',
										);
										renderDebug.image('Next.js Image Element State', img);
										console.groupEnd();
									}, 100);
								}
							}}
							onLoadStart={() => {
								if (DEBUG_MODE) {
									console.log('\n🔄 Image load started:', thumbnailSrc);
								}
							}}
							onLoad={(e) => {
								if (DEBUG_MODE) {
									const target = e.target as HTMLImageElement;
									console.group(
										'\n============================================================\n📍 PHASE 2: Image onLoad Event\n============================================================',
									);
									console.log('✅ Image loaded successfully');
									console.log('Image src:', thumbnailSrc);
									console.log('Natural dimensions:', {
										naturalWidth: target.naturalWidth,
										naturalHeight: target.naturalHeight,
									});
									renderDebug.image('Image Element on Load', target);
									console.groupEnd();
								}
							}}
							onLoadingComplete={(img) => {
								if (DEBUG_MODE) {
									console.group(
										'\n============================================================\n📍 PHASE 2: Image onLoadingComplete Event\n============================================================',
									);
									console.log('✅ Next.js Image optimization complete');
									console.log('Image natural width:', img.naturalWidth);
									console.log('Image natural height:', img.naturalHeight);
									console.log('Image src:', thumbnailSrc);
									renderDebug.image('Image Element on LoadingComplete', img);
									console.groupEnd();
								}
							}}
							onError={(e) => {
								if (DEBUG_MODE) {
									console.group(
										'\n============================================================\n❌ PHASE 2: Image Load Error\n============================================================',
									);
									console.error('Failed to load:', thumbnailSrc);
									console.error('Error event:', e);
									console.groupEnd();
								}
							}}
						/>

						{}
						{}
						<div className='absolute inset-0 flex items-center justify-center transition-colours z-20'>
							{isFree && (
								<CirclePlay
									size={100}
									strokeWidth={0.5}
									className='text-white group-hover:text-[#CA9E5B] transition-colors duration-300'
								/>
							)}
						</div>
					</div>
				</AspectRatio.Root>
			</div>

			{}
			{portalContainer &&
				createPortal(
					<AnimatePresence>
						{isOpen && (
							<m.div
								className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm'
								initial={{
									opacity: 0,
								}}
								animate={{
									opacity: 1,
								}}
								exit={{
									opacity: 0,
								}}
								onClick={handleClose}
								onKeyDown={handleModalKeyDown}
								tabIndex={-1}>
								{}
								<button
									className='absolute top-4 right-4 z-[10000] flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colours focus:outline-none focus:ring-2 focus:ring-white/50'
									onClick={handleClose}
									aria-label='Close video'>
									<X className='w-6 h-6' />
								</button>

								{}
								<m.div
									className='relative w-full max-w-6xl mx-4'
									variants={animationVariants[animationStyle]}
									initial='initial'
									animate='animate'
									exit='exit'
									transition={{
										duration: 0.4,
										ease: 'easeInOut',
									}}
									onClick={(e) => e.stopPropagation()}>
									{}
									{}
									<AspectRatio.Root
										ratio={16 / 9}
										className='w-full'>
										{}
										{videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be') ?
											<iframe
												src={videoSrc}
												className='w-full h-full shadow-2xl border border-white'
												allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
												allowFullScreen
												title='Video player'
											/>
										:	<video
												ref={videoRef}
												src={videoSrc}
												className='w-full h-full shadow-2xl object-contain border border-white'
												controls
												autoPlay
												muted
												playsInline
												preload='metadata'
												onLoadedData={() => {
													if (videoRef.current) {
														videoRef.current.play();
													}
												}}
											/>
										}
									</AspectRatio.Root>
								</m.div>
							</m.div>
						)}
					</AnimatePresence>,
					portalContainer,
				)}
		</>
	);
}
export default HeroVideoDialog;
