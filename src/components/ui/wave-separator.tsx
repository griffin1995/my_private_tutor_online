'use client';

import React, { useState } from 'react';
interface WaveSeparatorProps {
	variant?: 'subtle' | 'dramatic' | 'organic' | 'double';
	flip?: boolean;
	color?: string;
	className?: string;
	animate?: boolean;
	ariaLabel?: string;
}
const waveVariants = {
	subtle:
		'M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
	dramatic:
		'M0,64L40,74.7C80,85,160,107,240,112C320,117,400,107,480,90.7C560,75,640,53,720,53.3C800,53,880,75,960,85.3C1040,96,1120,96,1200,85.3C1280,75,1360,53,1400,42.7L1440,32L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z',
	organic:
		'M0,32L34.3,53.3C68.6,75,137,117,206,128C274.3,139,343,117,411,106.7C480,96,549,96,617,106.7C685.7,117,754,139,823,133.3C891.4,128,960,96,1029,85.3C1097.1,75,1166,85,1234,96C1302.9,107,1371,117,1406,122.7L1440,128L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z',
	double:
		'M0,96L34.3,85.3C68.6,75,137,53,206,58.7C274.3,64,343,96,411,106.7C480,117,549,107,617,101.3C685.7,96,754,96,823,90.7C891.4,85,960,75,1029,74.7C1097.1,75,1166,85,1234,90.7C1302.9,96,1371,96,1406,96L1440,96L1440,128L1405.7,122.7C1371.4,117,1303,107,1234,101.3C1165.7,96,1097,96,1029,101.3C960,107,891,117,823,122.7C754.3,128,686,128,617,122.7C548.6,117,480,107,411,96C342.9,85,274,75,206,74.7C137.1,75,69,85,34,90.7L0,96Z',
};
const animationVariants = {
	hidden: {
		pathLength: 0,
		scale: 0.95,
	},
	visible: {
		pathLength: 1,
		scale: 1,
		transition: {
			pathLength: {
				duration: 2,
				ease: 'easeInOut',
			},
			opacity: {
				duration: 0.5,
			},
			scale: {
				duration: 1,
			},
		},
	},
};
export const WaveSeparator: React.FC<WaveSeparatorProps> = ({
	variant = 'subtle',
	flip = false,
	color = 'white',
	className = '',
	animate = false,
	ariaLabel = 'Decorative wave separator',
}) => {
	const baseClasses = `
    w-full 
    max-w-full
    overflow-hidden
    h-12 sm:h-16 md:h-20 lg:h-24
    pointer-events-none
    ${flip ? 'rotate-180' : ''}
    ${className}
  `
		.trim()
		.replace(/\s+/g, ' ');
	const wavePath = waveVariants[variant] || waveVariants.subtle;
	return (
		<div
			className={baseClasses}
			role='img'
			aria-label={ariaLabel}>
			<svg
				className='w-full h-full max-w-full block drop-shadow-sm'
				viewBox='0 0 1440 128'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
				preserveAspectRatio='none'
				style={{
					width: '100%',
					height: '100%',
					maxWidth: '100%',
					display: 'block',
					filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.05))',
				}}>
				<path
					d={wavePath}
					className={`fill-${color}`}
				/>
			</svg>
		</div>
	);
};
