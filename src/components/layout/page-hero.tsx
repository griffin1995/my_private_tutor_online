'use client';

import { type ReactNode, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
	NAVBAR_HEIGHTS,
	calculateRemainingViewport,
	supportsDynamicViewport,
} from '@/lib/constants/navbar-heights';
interface PageHeroProps {
	children: ReactNode;
	className?: string;
	background?: 'white' | 'gradient' | 'image' | 'video';
	backgroundImage?: string;
	backgroundVideo?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
	alignment?: 'left' | 'center' | 'right';
	verticalAlignment?: 'top' | 'center' | 'bottom';
	overlay?: boolean;
	overlayOpacity?: 'light' | 'medium' | 'dark';
	hasStaticNavbar?: boolean;
}

export function PageHero({
	children,
	className,
	background = 'gradient',
	backgroundImage,
	backgroundVideo,
	size = 'lg',
	alignment = 'center',
	verticalAlignment = 'center',
	overlay = false,
	overlayOpacity = 'medium',
	hasStaticNavbar = false,
}: PageHeroProps) {
	const [dynamicViewport, setDynamicViewport] = useState(false);
	useEffect(() => {
		const detectViewport = () => {
			setDynamicViewport(supportsDynamicViewport());
		};
		detectViewport();
		window.addEventListener('resize', detectViewport);
		return () => window.removeEventListener('resize', detectViewport);
	}, []);
	const sizeClasses = {
		sm: 'min-h-[400px] py-16',
		md: 'min-h-[500px] py-20',
		lg: 'min-h-[600px] py-24',
		xl: 'min-h-[700px] py-32',
		full:
			hasStaticNavbar ?
				[`${calculateRemainingViewport()} w-full overflow-hidden`].join(' ')
			:	['h-screen w-full overflow-hidden'].join(' '),
	};
	const backgroundClasses = {
		white: 'bg-white',
		gradient: 'bg-gradient-to-br from-white via-primary-50 to-accent-50',
		image: 'bg-cover bg-center bg-no-repeat',
		video: 'relative overflow-hidden',
	};
	const alignmentClasses = {
		left: 'text-left',
		center: 'text-center',
		right: 'text-right',
	};
	const verticalAlignmentClasses = {
		top: 'justify-start items-start',
		center: 'justify-center items-center',
		bottom: 'justify-end items-end',
	};
	const overlayClasses = {
		light: 'bg-black/20',
		medium: 'bg-black/40',
		dark: 'bg-black/60',
	};
	return (
		<section
			className={cn(
				'relative flex',
				sizeClasses[size],
				backgroundClasses[background],
				verticalAlignmentClasses[verticalAlignment],
				size === 'full' ? 'w-screen -ml-[50vw] left-1/2 relative' : '',
				size === 'full' && hasStaticNavbar ?
					`mt-[${NAVBAR_HEIGHTS.mobile}] lg:mt-[${NAVBAR_HEIGHTS.tablet}] xl:mt-[${NAVBAR_HEIGHTS.desktop}]`
				:	'',
				className,
			)}
			style={{
				backgroundImage:
					background === 'image' && backgroundImage ?
						`url(${backgroundImage})`
					:	undefined,
			}}
			role='banner'
			aria-label='Page hero section'
			data-dynamic-viewport={dynamicViewport ? 'true' : 'false'}
			data-viewport-overflow-fix='dvh-enabled'
			suppressHydrationWarning>
			{background === 'video' && backgroundVideo && (
				<>
					<video
						autoPlay
						muted
						loop
						playsInline
						preload='auto'
						disablePictureInPicture
						controls={false}
						className='absolute inset-0 w-full h-full max-w-none object-contain z-0'
						data-dynamic-viewport-video='true'
						style={{
							maxWidth: 'none',
							objectFit: 'contain',
							transform: 'scale(0.9)',
							transformOrigin: 'center',
						}}
						aria-label='Background video'
						onError={(e) => {
							console.warn('Video playback error:', e);
							const video = e.currentTarget;
							video.style.display = 'none';
							const section = video.closest('section');
							if (section) {
								section.style.backgroundImage =
									'url(/images/hero/landing-page.avif)';
								section.style.backgroundSize = 'cover';
								section.style.backgroundPosition = 'center';
							}
						}}
						onCanPlayThrough={(e) => {
							e.currentTarget.play().catch(console.warn);
						}}
					>
						<source
							src={backgroundVideo}
							type='video/mp4'
						/>
						{!backgroundVideo.includes('compressed-') && (
							<source
								src={backgroundVideo.replace('.mp4', '.webm')}
								type='video/webm'
							/>
						)}
						Your browser does not support the video tag.
					</video>
					<div
						className='absolute inset-0 bg-white -z-10'
						aria-hidden='true'
					/>
				</>
			)}

			{overlay && (
				<div
					className={cn('absolute inset-0 z-10', overlayClasses[overlayOpacity])}
					aria-hidden='true'
				/>
			)}

			<div className='relative z-20 w-full flex flex-col justify-center overflow-hidden'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className={cn(alignmentClasses[alignment], 'overflow-hidden')}>
						<div className='w-full @container'>
							<div className='overflow-hidden'>{children}</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

type PageHeroBackground = 'white' | 'gradient' | 'image' | 'video';
type PageHeroSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
type PageHeroAlignment = 'left' | 'center' | 'right';
type PageHeroVerticalAlignment = 'top' | 'center' | 'bottom';
type PageHeroOverlayOpacity = 'light' | 'medium' | 'dark';
