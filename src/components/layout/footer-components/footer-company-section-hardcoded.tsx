'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Hardcoded company data - no CMS dependency
const COMPANY_DATA = {
	companyName: 'My Private Tutor Online',
	logo: {
		main: '/images/logos/logo-with-name.png',
		alt: 'My Private Tutor Online - Premium Tutoring Services',
		width: 320,
		height: 160,
	},
} as const;

interface FooterCompanySectionHardcodedProps {
	className?: string;
}

export const FooterCompanySectionHardcoded: React.FC<FooterCompanySectionHardcodedProps> = ({
	className = ''
}) => {
	return (
		<div
			className={`flex flex-col justify-center items-center h-full animate-fade-in-left ${className}`}>

			{/* Mobile & MD: Horizontal logo with name and tagline (full width mobile, 50% at md) */}
			<Link
				href='/'
				className='lg:hidden inline-block group w-full md:w-1/2'
				aria-label={`${COMPANY_DATA.companyName} homepage`}>
				<Image
					src='/images/logos/logo-name-tagline.png'
					alt={`${COMPANY_DATA.companyName} - Premium Tutoring Services`}
					width={800}
					height={200}
					className='w-full h-auto max-h-24 object-contain group-hover:scale-105 transition-transform duration-300'
					loading='lazy'
					placeholder='blur'
					blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+'
				/>
			</Link>

			{/* LG+: Standard vertical logo */}
			<Link
				href='/'
				className='hidden lg:inline-block group'
				aria-label={`${COMPANY_DATA.companyName} homepage`}>
				<Image
					src={COMPANY_DATA.logo.main}
					alt={COMPANY_DATA.logo.alt}
					width={COMPANY_DATA.logo.width}
					height={COMPANY_DATA.logo.height}
					className='w-auto h-auto lg:max-h-40 object-contain group-hover:scale-110 transition-transform duration-300'
					loading='lazy'
					placeholder='blur'
					blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+'
				/>
			</Link>
		</div>
	);
};

