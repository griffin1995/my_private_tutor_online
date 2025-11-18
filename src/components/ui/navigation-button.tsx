'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import { CheckIcon, PlusIcon } from 'lucide-react';
interface NavigationButtonProps {
	buttonColor: string;
	buttonTextColor: string;
	initialText: string;
	changeText: string;
	href: string;
	className?: string;
}
export const NavigationButton: React.FC<NavigationButtonProps> = ({
	buttonColor,
	buttonTextColor,
	initialText,
	changeText,
	href,
	className = '',
}) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	return (
		<Link
			href={href}
			className={`block ${className}`}>
			<AnimatePresence mode='wait'>
				{isHovered ?
					<m.button
						className='relative flex w-[200px] items-center justify-center overflow-hidden bg-white p-[10px] outline outline-1 outline-black transition-all duration-200'
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						exit={{
							opacity: 0,
						}}>
						<m.span
							key='action'
							className='relative block h-full w-full font-semibold'
							initial={{
								y: -50,
							}}
							animate={{
								y: 0,
							}}
							style={{
								color: `${buttonColor} !important`,
							}}>
							<span className='flex items-center justify-center gap-2'>
								<CheckIcon className='h-4 w-4' />
								{changeText}
							</span>
						</m.span>
					</m.button>
				:	<m.button
						className='relative flex w-[200px] cursor-pointer items-center justify-center border-none p-[10px] transition-all duration-200 hover:shadow-lg'
						style={{
							backgroundColor: buttonColor,
							color: `${buttonTextColor} !important`,
						}}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						exit={{
							opacity: 0,
						}}>
						<m.span
							key='reaction'
							className='relative block font-semibold'
							initial={{
								x: 0,
							}}
							exit={{
								x: 50,
								transition: {
									duration: 0.1,
								},
							}}>
							<span className='flex items-center justify-center gap-2'>
								<PlusIcon className='h-4 w-4' />
								{initialText}
							</span>
						</m.span>
					</m.button>
				}
			</AnimatePresence>
		</Link>
	);
};
