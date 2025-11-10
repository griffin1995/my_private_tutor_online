'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getMainLogo, getMainLogoWhite } from '@/lib/cms/cms-images';
interface LogoSectionProps {
	isTransparent: boolean;
	isHomepage: boolean;
	className?: string;
}
export function LogoSection({
	isTransparent,
	isHomepage,
	className,
}: LogoSectionProps) {
	const standardLogo = getMainLogo();
	const whiteLogo = getMainLogoWhite();
	const logoVariants = {
		initial: {
			opacity: 0,
			scale: 0.95,
		},
		animate: {
			opacity: 1,
			scale: 1,
		},
		exit: {
			opacity: 0,
			scale: 0.95,
		},
	};
	const logoTransition = {
		duration: 0.3,
		ease: 'easeInOut',
	};
	const currentLogo = isTransparent ? whiteLogo : standardLogo;
	const logoSrc = currentLogo?.src || '/images/logos/logo-with-name.png';
	const logoAlt =
		isTransparent ?
			'My Private Tutor Online - White Logo'
		:	'My Private Tutor Online';
	const glowColor =
		isTransparent ?
			'hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'
		:	'hover:drop-shadow-[0_0_8px_rgba(37,99,235,0.2)]';
	return (
		<div className={cn('flex-shrink-0', className)}>
			<Link
				href='/'
				className='block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-lg'
				aria-label='My Private Tutor Online - Navigate to homepage'>
				<motion.div
					className='relative'
					whileHover={{
						scale: 1.05,
					}}
					whileTap={{
						scale: 0.98,
					}}
					transition={{
						type: 'spring',
						stiffness: 400,
						damping: 25,
						duration: 0.15,
					}}>
					<AnimatePresence mode='wait'>
						<motion.div
							key={isTransparent ? 'white-logo' : 'standard-logo'}
							variants={logoVariants}
							initial='initial'
							animate='animate'
							exit='exit'
							transition={logoTransition}
							className='relative'>
							<Image
								src={logoSrc}
								alt={logoAlt}
								width={175}
								height={100}
								priority
								className={cn(
									'h-12 lg:h-16 xl:h-20 w-auto object-contain',
									'will-change-transform',
									glowColor,
									'hover:brightness-110 active:brightness-95',
								)}
								loading='eager'
								style={{
									aspectRatio: '175/100',
									maxWidth: 'none',
								}}
							/>

							<div
								className={cn(
									'absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300',
									'hover:opacity-100 pointer-events-none',
									isTransparent ?
										'bg-gradient-to-r from-white/5 via-white/10 to-white/5'
									:	'bg-gradient-to-r from-primary-500/5 via-primary-600/10 to-primary-500/5',
								)}
								aria-hidden='true'
							/>
						</motion.div>
					</AnimatePresence>
				</motion.div>
			</Link>
		</div>
	);
}
export type { LogoSectionProps };
