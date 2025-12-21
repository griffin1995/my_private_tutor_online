// CONTEXT7 SOURCE: /motion - Client Component for animated scrolling logos
// ARCHITECTURE REASON: Motion requires client-side rendering for animations
// PERFORMANCE: Motion library provides excellent animations with good performance

'use client';

import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface Logo {
	src: string;
	alt: string;
	width: number;
	height: number;
	title: string;

interface ScrollingLogosProps {
	logos: Logo[];

export function ScrollingLogos({ logos }: ScrollingLogosProps) {
	// Intersection observer for performance optimization
	const { ref, inView } = useInView({
		triggerOnce: false,
		threshold: 0.1,
		rootMargin: '50px 0px',
	});

	return (
		<div
			ref={ref}
			className='w-full max-w-7xl mx-auto overflow-hidden bg-white px-4 sm:px-6 lg:px-8 relative'
			style={{
				WebkitMaskImage:
					'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
				maskImage:
					'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
				WebkitMaskRepeat: 'no-repeat',
				maskRepeat: 'no-repeat',
			<div className='flex gap-8 sm:gap-12 whitespace-nowrap'>
				{logos.concat(logos).map((logo, index) => (
					<div
						key={index}
						className='flex-shrink-0 flex items-center justify-center px-3 sm:px-4'>
						<Image
							src={logo.src}
							alt={logo.alt}
							width={logo.width}
							height={logo.height}
							title={logo.title}
							loading='lazy'
							className='h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300'
							sizes='(max-width: 768px) 80px, (max-width: 1200px) 100px, 120px'
						/>
					</div>
				))}
			</div>
		</div>
	);
