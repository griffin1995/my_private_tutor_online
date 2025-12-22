'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
interface CarouselItem {
	id: string | number;
	content: React.ReactNode;
}

interface CarouselProps {
	items: CarouselItem[];
	className?: string;
	autoPlay?: boolean;
	autoPlayInterval?: number;
	showArrows?: boolean;
	showDots?: boolean;
	centerMode?: boolean;
	loading?: boolean;
	error?: string | null;
	onError?: (error: Error) => void;
}

export function Carousel({
	items,
	className,
	autoPlay = false,
	autoPlayInterval = 5000,
	showArrows = true,
	showDots = true,
	centerMode = false,
	loading = false,
	error = null,
	onError,
}: CarouselProps) {
	// Error state
	if (error) {
		return (
			<div className="flex items-center justify-center p-8 text-center" role="alert">
				<div className="text-red-600">
					<p className="text-lg font-semibold mb-2">Carousel Error</p>
					<p className="text-sm">{error}</p>
				</div>
			</div>
		);
	}

	// Loading state
	if (loading) {
		return (
			<div className="flex items-center justify-center p-8" aria-label="Loading carousel">
				<div className="animate-pulse flex space-x-4">
					<div className="rounded-full bg-primary-200 h-4 w-4"></div>
					<div className="rounded-full bg-primary-200 h-4 w-4"></div>
					<div className="rounded-full bg-primary-200 h-4 w-4"></div>
				</div>
				<span className="sr-only">Loading carousel content</span>
			</div>
		);
	}

	// Early return for edge cases
	if (!items || items.length === 0) {
		return (
			<div className="flex items-center justify-center p-8 text-center">
				<p className="text-gray-500">No items to display</p>
			</div>
		);
	}

	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const handlePrevious = useCallback(() => {
		try {
			setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
		} catch (err) {
			const error = err instanceof Error ? err : new Error('Navigation error');
			onError?.(error);
		}
	}, [items.length, onError]);

	const handleNext = useCallback(() => {
		try {
			setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
		} catch (err) {
			const error = err instanceof Error ? err : new Error('Navigation error');
			onError?.(error);
		}
	}, [items.length, onError]);
	useEffect(() => {
		if (!autoPlay || isHovered) return;
		const interval = setInterval(() => {
			handleNext();
		}, autoPlayInterval);
		return () => clearInterval(interval);
	}, [autoPlay, autoPlayInterval, isHovered, handleNext]);
	const getItemStyle = (index: number) => {
		if (!centerMode) return {};
		const diff = index - currentIndex;
		const isActive = diff === 0;
		const isPrev =
			diff === -1 || (currentIndex === 0 && index === items.length - 1);
		const isNext =
			diff === 1 || (currentIndex === items.length - 1 && index === 0);
		if (isActive) {
			return {
				transform: 'scale(1.1) translateX(0)',
				zIndex: 3,
			};
		} else if (isPrev) {
			return {
				transform: 'scale(0.9) translateX(-60%)',
				opacity: 0.7,
				zIndex: 2,
			};
		} else if (isNext) {
			return {
				transform: 'scale(0.9) translateX(60%)',
				opacity: 0.7,
				zIndex: 2,
			};
		} else {
			return {
				transform: 'scale(0.8)',
				zIndex: 1,
			};
		}
	};
	// Keyboard navigation handler
	const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
		try {
			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault();
					handlePrevious();
					break;
				case 'ArrowRight':
					event.preventDefault();
					handleNext();
					break;
				case 'Home':
					event.preventDefault();
					setCurrentIndex(0);
					break;
				case 'End':
					event.preventDefault();
					setCurrentIndex(items.length - 1);
					break;
			}
		} catch (err) {
			const error = err instanceof Error ? err : new Error('Keyboard navigation error');
			onError?.(error);
		}
	}, [handlePrevious, handleNext, items.length, onError]);

	return (
		<div
			role="region"
			aria-label="Image carousel"
			aria-roledescription="carousel"
			className={cn('relative', className)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onKeyDown={handleKeyDown}
			tabIndex={0}>
			<div className='relative overflow-hidden' aria-live="polite" aria-atomic="false">
				<div
					className={cn(
						'flex transition-all duration-500',
						centerMode ? 'justify-center' : '',
					)}>
					{centerMode ? (
						<div className='relative flex items-center justify-center h-[400px] w-full'>
							{items.map((item, index) => (
								<div
									key={item.id}
									className='absolute w-full max-w-lg px-4'
									style={getItemStyle(index)}
									aria-hidden={index !== currentIndex}
									aria-current={index === currentIndex ? 'true' : 'false'}>
									{item.content}
								</div>
							))}
						</div>
					) : (
						<AnimatePresence mode='wait'>
							<div
								key={currentIndex}
								className='w-full'
								role="group"
								aria-label={`Slide ${currentIndex + 1} of ${items.length}`}>
								{items[currentIndex]?.content}
							</div>
						</AnimatePresence>
					)}
				</div>
			</div>

			{showArrows && (
				<div>
					<button
						onClick={handlePrevious}
						className='absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-primary-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110'
						aria-label={`Go to previous slide, currently showing slide ${currentIndex + 1} of ${items.length}`}
						disabled={!autoPlay && items.length <= 1}>
						<ChevronLeft className='w-6 h-6' />
					</button>
					<button
						onClick={handleNext}
						className='absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-primary-900 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110'
						aria-label={`Go to next slide, currently showing slide ${currentIndex + 1} of ${items.length}`}
						disabled={!autoPlay && items.length <= 1}>
						<ChevronRight className='w-6 h-6' />
					</button>
				</div>
			)}

			{showDots && (
				<div className='flex justify-center gap-2 mt-6' role="group" aria-label="Carousel pagination">
					{items.map((_, index) => (
						<button
							key={index}
							onClick={() => setCurrentIndex(index)}
							className={cn(
								'w-2 h-2 rounded-full transition-all duration-300',
								currentIndex === index ? 'w-8 bg-accent-600' : (
									'bg-primary-300 hover:bg-primary-400'
								),
							)}
							aria-label={`Go to slide ${index + 1}${currentIndex === index ? ' (current)' : ''}`}
							aria-current={currentIndex === index ? 'true' : 'false'}
							aria-pressed={currentIndex === index}
						/>
					))}
				</div>
			)}
		</div>
	);
}
