'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	priority?: boolean;
	className?: string;
	sizes?: string;
	quality?: number;
}

/**
 * High-performance image component with AVIF/WebP fallbacks and lazy loading
 * Automatically serves next-gen formats with JPEG fallback
 */
export function OptimizedImage({
	src,
	alt,
	width,
	height,
	priority = false,
	className = '',
	sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
	quality = 85,
}: OptimizedImageProps) {
	const [imageError, setImageError] = useState(false);
	const [isInView, setIsInView] = useState(priority);

	// Parse the original src to create optimized paths
	const getOptimizedPaths = (originalSrc: string) => {
		// Check if this is one of our problematic large images
		const needsOptimization = [
			'primary-school-support',
			'eleven-plus-intensive-exam-preparation',
			'unlocking-academic-success-background',
			'Ms. Adebayo'
		].some(name => originalSrc.includes(name));

		if (!needsOptimization) {
			return { src: originalSrc, sources: [] };
		}

		// Extract path components
		const pathParts = originalSrc.split('/');
		const filename = pathParts.pop()!;
		const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
		const directory = pathParts.join('/');

		// Build optimized paths
		const optimizedBase = `${directory}/optimized/${nameWithoutExt}`;

		return {
			src: `${optimizedBase}.jpg`, // Fallback
			sources: [
				{ srcSet: `${optimizedBase}.avif`, type: 'image/avif' },
				{ srcSet: `${optimizedBase}.webp`, type: 'image/webp' },
			],
		};
	};

	const { src: optimizedSrc, sources } = getOptimizedPaths(src);

	// Intersection Observer for lazy loading (if not priority)
	useEffect(() => {
		if (priority) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsInView(true);
						observer.disconnect();
					}
				});
			},
			{
				rootMargin: '50px', // Start loading 50px before entering viewport
			}
		);

		const element = document.querySelector(`[data-image-src="${src}"]`);
		if (element) {
			observer.observe(element);
		}

		return () => observer.disconnect();
	}, [src, priority]);

	// Use picture element for modern format support
	if (sources.length > 0 && !imageError) {
		return (
			<picture data-image-src={src}>
				{sources.map((source, index) => (
					<source
						key={index}
						srcSet={isInView ? source.srcSet : undefined}
						type={source.type}
					/>
				))}
				<img
					src={isInView ? optimizedSrc : undefined}
					alt={alt}
					width={width}
					height={height}
					className={className}
					loading={priority ? 'eager' : 'lazy'}
					onError={() => setImageError(true)}
					style={{
						maxWidth: '100%',
						height: 'auto',
					}}
				/>
			</picture>
		);
	}

	// Fallback to Next.js Image component
	return (
		<div data-image-src={src}>
			<Image
				src={imageError ? src : optimizedSrc}
				alt={alt}
				width={width || 1920}
				height={height || 1080}
				priority={priority}
				className={className}
				sizes={sizes}
				quality={quality}
				loading={priority ? 'eager' : 'lazy'}
				placeholder="blur"
				blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwABmX/9k="
			/>
		</div>
	);
}