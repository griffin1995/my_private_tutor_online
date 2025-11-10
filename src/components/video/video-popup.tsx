'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
interface VideoPopupProps {
	isOpen: boolean;
	onClose: () => void;
	videoUrl: string;
	title: string;
	poster?: string;
	className?: string;
}
export function VideoPopup({
	isOpen,
	onClose,
	videoUrl,
	title,
	poster,
	className,
}: VideoPopupProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (isOpen) {
			modalRef.current?.focus();
			document.querySelectorAll('video').forEach((video) => {
				if (video !== videoRef.current) {
					video.pause();
				}
			});
		}
	}, [isOpen]);
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			handleClose();
		}
	};
	const handleClose = () => {
		if (videoRef.current) {
			videoRef.current.pause();
			videoRef.current.currentTime = 0;
		}
		onClose();
	};
	if (!isOpen) return null;
	return (
		<>
			<div
				className='fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4'
				onClick={handleClose}
				role='dialog'
				aria-modal='true'
				aria-labelledby='video-title'>
				<div
					ref={modalRef}
					className={cn(
						'relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden',
						'focus:outline-none focus:ring-2 focus:ring-amber-500',
						className,
					)}
					onClick={(e) => e.stopPropagation()}
					onKeyDown={handleKeyDown}
					tabIndex={-1}>
					<div className='flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50'>
						<h2
							id='video-title'
							className='text-lg font-semibold text-slate-900 truncate pr-4'>
							{title}
						</h2>
						<Button
							variant='ghost'
							size='sm'
							onClick={handleClose}
							className='shrink-0 hover:bg-slate-200'
							aria-label='Close video'>
							<X className='h-5 w-5' />
						</Button>
					</div>

					<div className='relative bg-black'>
						<div className='aspect-video'>
							<video
								ref={videoRef}
								src={videoUrl}
								poster={poster}
								controls
								autoPlay
								className='w-full h-full object-contain'
								aria-label={`Video: ${title}`}
								onError={(e) => {
									console.error('Video playback error:', e);
								}}>
								<p className='text-white text-center p-8'>
									Your browser does not support the video element. Please try a different
									browser or contact support.
								</p>
							</video>
						</div>
					</div>

					<div className='p-4 bg-slate-50 border-t border-slate-200'>
						<p className='text-sm text-slate-600 text-center'>
							Press ESC to close or click outside the video
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
export type { VideoPopupProps };
