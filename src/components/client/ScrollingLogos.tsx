// CONTEXT7 SOURCE: /motion/react - Client Component for animated scrolling logos
// ARCHITECTURE REASON: Motion requires client-side rendering for animations
// PERFORMANCE: Motion library provides smaller bundle and better mobile performance

'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

interface Logo {
	src: string;
	alt: string;
	width: number;
	height: number;
	title: string;
}

interface ScrollingLogosProps {
	logos: Logo[];
}

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
			}}>
			<motion.div
				className='flex gap-8 sm:gap-12 whitespace-nowrap motion-reduce:animate-none'
				animate={inView ? {
					x: ['0%', '-50%'],
				} : { x: '0%' }}
				transition={{
					repeat: inView ? Infinity : 0,
					repeatType: 'loop',
					ease: 'linear',
					duration: 15,
				}}>
				{logos.concat(logos).map((logo, index) => (
					<motion.div
						key={index}
						className='flex-shrink-0 flex items-center justify-center px-3 sm:px-4'
						initial={{ opacity: 0, y: 10 }}
						animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
						transition={{
							delay: (index % logos.length) * 0.05,
							duration: 0.4,
							ease: 'easeOut'
						}}>
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
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
