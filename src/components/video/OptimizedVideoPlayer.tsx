'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Play, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type {
	OptimizedVideoPlayerProps,
	VideoPlayerState,
	VideoPlayerError,
	ReactPlayerInstance,
} from './OptimizedVideoPlayer.types';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), {
	ssr: false,
	loading: () => (
		<div className='flex items-center justify-center w-full h-full bg-slate-100 rounded-lg'>
			<Loader2 className='w-8 h-8 text-slate-400 animate-spin' />
		</div>
	),
});
const defaultYouTubeConfig = {
	youtube: {
		playerVars: {
			showinfo: 0,
			playsinline: 1,
			modestbranding: 1,
			rel: 0,
			controls: 1,
			autoplay: 0,
		},
	},
};
export const OptimizedVideoPlayer = React.memo<OptimizedVideoPlayerProps>(
	({
		videoId,
		title,
		thumbnail,
		variant = 'hero',
		className,
		onReady,
		onPlay,
		onPause,
		light = true,
		config = defaultYouTubeConfig,
		enableLazyLoading = true,
		preloadMargin = '200px 0px',
		autoPlay = false,
		muted = true,
		controls = true,
		width = '100%',
		height = '100%',
		aspectRatio = '16/9',
	}) => {
		const { ref: intersectionRef, inView } = useInView({
			triggerOnce: true,
			rootMargin: preloadMargin,
			skip: !enableLazyLoading,
			fallbackInView: true,
		});
		const [playerState, setPlayerState] = useState<VideoPlayerState>({
			isPlaying: false,
			isReady: false,
			hasError: false,
			isLoading: false,
			isModalOpen: false,
			isMuted: muted ?? true,
			volume: 0.8,
			played: 0,
			loaded: 0,
			duration: 0,
			playbackRate: 1,
			pip: false,
			seeking: false,
			fullscreen: false,
		});
		const [error, setError] = useState<VideoPlayerError | null>(null);
		const playerRef = useRef<any>(null);
		const containerRef = useRef<HTMLDivElement>(null);
		const handleReady = useCallback(
			(player: ReactPlayerInstance) => {
				setPlayerState((prev) => ({
					...prev,
					isReady: true,
					isLoading: false,
				}));
				if (onReady) {
					onReady();
				}
			},
			[onReady],
		);
		const handlePlay = useCallback(() => {
			setPlayerState((prev) => ({
				...prev,
				isPlaying: true,
			}));
			if (onPlay) {
				onPlay();
			}
		}, [onPlay]);
		const handlePause = useCallback(() => {
			setPlayerState((prev) => ({
				...prev,
				isPlaying: false,
			}));
			if (onPause) {
				onPause();
			}
		}, [onPause]);
		const handleProgress = useCallback(
			(state: {
				played: number;
				playedSeconds: number;
				loaded: number;
				loadedSeconds: number;
			}) => {
				setPlayerState((prev) => ({
					...prev,
					played: state.played,
					loaded: state.loaded,
				}));
			},
			[],
		);
		const handleDuration = useCallback((duration: number) => {
			setPlayerState((prev) => ({
				...prev,
				duration,
			}));
		}, []);
		const handleError = useCallback(
			(error: VideoPlayerError | Error | string) => {
				console.error('OptimizedVideoPlayer error:', error);
				const videoError: VideoPlayerError = {
					type: 'unknown',
					message: error?.message || 'Video playback failed',
					code: error?.code,
					details: error,
					timestamp: Date.now(),
					videoId,
					recoverable: true,
				};
				setError(videoError);
				setPlayerState((prev) => ({
					...prev,
					hasError: true,
					isLoading: false,
				}));
			},
			[videoId],
		);
		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent) => {
				switch (event.key) {
					case 'Enter':
					case ' ':
						event.preventDefault();
						if (variant === 'hero') {
							setPlayerState((prev) => ({
								...prev,
								isModalOpen: true,
							}));
						}
						break;
					case 'Escape':
						if (playerState.isModalOpen) {
							event.preventDefault();
							setPlayerState((prev) => ({
								...prev,
								isModalOpen: false,
							}));
						}
						break;
				}
			},
			[variant, playerState.isModalOpen],
		);
		useEffect(() => {
			if (playerState.isModalOpen) {
				document.body.style.overflow = 'hidden';
				const handleEscapeKey = (e: KeyboardEvent) => {
					if (e.key === 'Escape') {
						setPlayerState((prev) => ({
							...prev,
							isModalOpen: false,
						}));
					}
				};
				document.addEventListener('keydown', handleEscapeKey);
				return () => {
					document.body.style.overflow = 'unset';
					document.removeEventListener('keydown', handleEscapeKey);
				};
			}
		}, [playerState.isModalOpen]);
		const getVideoUrl = useCallback(() => {
			if (videoId.startsWith('http')) {
				return videoId;
			}
			return `https://www.youtube.com/watch?v=${videoId}`;
		}, [videoId]);
		if (!inView && enableLazyLoading) {
			return (
				<div
					ref={intersectionRef}
					className={cn(
						'flex items-center justify-center bg-slate-100 rounded-lg',
						variant === 'hero' && 'aspect-video',
						variant === 'thumbnail-card' && 'aspect-video',
						variant === 'testimonial' && 'aspect-video',
						className,
					)}
					style={{
						aspectRatio,
					}}>
					<Loader2 className='w-8 h-8 text-slate-400 animate-spin' />
				</div>
			);
		}
		if (playerState.hasError && error) {
			return (
				<div
					className={cn(
						'flex items-center justify-center bg-slate-100 rounded-lg text-slate-600',
						variant === 'hero' && 'aspect-video',
						variant === 'thumbnail-card' && 'aspect-video',
						variant === 'testimonial' && 'aspect-video',
						className,
					)}
					style={{
						aspectRatio,
					}}
					role='alert'
					aria-live='polite'>
					<div className='text-center p-4'>
						<p className='font-medium mb-2'>Video unavailable</p>
						<p className='text-sm text-slate-500'>
							{error.recoverable ?
								'Please try again later'
							:	'This video cannot be played'}
						</p>
						{error.recoverable && (
							<button
								onClick={() => {
									setError(null);
									setPlayerState((prev) => ({
										...prev,
										hasError: false,
										isLoading: true,
									}));
								}}
								className='mt-2 text-sm text-primary-600 hover:text-primary-800 underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1'
								aria-label='Retry video loading'>
								Try again
							</button>
						)}
					</div>
				</div>
			);
		}
		const customThumbnail =
			thumbnail ?
				<div className='relative w-full h-full'>
					<Image
						src={thumbnail}
						alt={`${title} video thumbnail`}
						fill
						className='object-cover rounded-lg'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						priority={variant === 'hero'}
					/>
					<div className='absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colours'>
						<div className='flex items-center justify-center w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300'>
							<Play
								className='w-6 h-6 text-primary-900 ml-1'
								fill='currentColor'
							/>
						</div>
					</div>
				</div>
			:	light;
		if (variant === 'hero') {
			return (
				<>
					<div
						ref={containerRef}
						className={cn('relative cursor-pointer', className)}
						onClick={() =>
							setPlayerState((prev) => ({
								...prev,
								isModalOpen: true,
							}))
						}
						onKeyDown={handleKeyDown}
						tabIndex={0}
						role='button'
						aria-label={`Play video: ${title}`}
						style={{
							aspectRatio,
						}}>
						<ReactPlayer
							ref={playerRef}
							url={getVideoUrl()}
							light={customThumbnail}
							width={width}
							height={height}
							config={config}
							onReady={handleReady}
							onPlay={handlePlay}
							onPause={handlePause}
							onProgress={handleProgress}
							onDuration={handleDuration}
							onError={handleError}
							playing={false}
							controls={false}
							className='rounded-lg overflow-hidden'
						/>
					</div>

					{playerState.isModalOpen && (
						<div
							className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm'
							onClick={() =>
								setPlayerState((prev) => ({
									...prev,
									isModalOpen: false,
								}))
							}>
							<button
								className='absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colours focus:outline-none focus:ring-2 focus:ring-white/50'
								onClick={() =>
									setPlayerState((prev) => ({
										...prev,
										isModalOpen: false,
									}))
								}
								aria-label='Close video'>
								<X className='w-5 h-5' />
							</button>

							<div
								className='relative w-full max-w-6xl mx-4 aspect-video'
								onClick={(e) => e.stopPropagation()}>
								<ReactPlayer
									url={getVideoUrl()}
									width='100%'
									height='100%'
									config={config}
									playing={playerState.isModalOpen}
									controls={controls}
									muted={muted}
									autoPlay={autoPlay}
									onReady={handleReady}
									onPlay={handlePlay}
									onPause={handlePause}
									onProgress={handleProgress}
									onDuration={handleDuration}
									onError={handleError}
									className='rounded-lg overflow-hidden'
								/>
							</div>
						</div>
					)}
				</>
			);
		}
		return (
			<div
				ref={containerRef}
				className={cn('relative', className)}
				style={{
					aspectRatio,
				}}>
				<ReactPlayer
					ref={playerRef}
					url={getVideoUrl()}
					light={customThumbnail}
					width={width}
					height={height}
					config={config}
					onReady={handleReady}
					onPlay={handlePlay}
					onPause={handlePause}
					onProgress={handleProgress}
					onDuration={handleDuration}
					onError={handleError}
					playing={playerState.isPlaying}
					controls={controls}
					muted={muted}
					autoPlay={autoPlay}
					className='rounded-lg overflow-hidden'
				/>
			</div>
		);
	},
);
OptimizedVideoPlayer.displayName = 'OptimizedVideoPlayer';
export type { OptimizedVideoPlayerProps };
export default OptimizedVideoPlayer;
