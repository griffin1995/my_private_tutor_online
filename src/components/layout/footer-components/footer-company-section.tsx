import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { FooterContent } from '@/lib/services/footer-service-contracts';
interface FooterCompanySectionProps {
	content: FooterContent;
	className?: string;
}
export const FooterCompanySection = React.memo<FooterCompanySectionProps>(
	({ content, className = '' }) => {
		const processedContent = useMemo(
			() => ({
				companyName: content.companyName,
				logo: {
					...content.logo,
					alt: content.logo.alt || `${content.companyName} logo`,
				},
			}),
			[content.companyName, content.logo],
		);
		return (
			<div
				className={`flex flex-col justify-center items-center h-full animate-fade-in-left ${className}`}>
				{/* Mobile & MD: Horizontal logo with name and tagline (full width mobile, 50% at md) */}
				<Link
					href='/'
					className='lg:hidden inline-block group w-full md:w-1/2'
					aria-label={`${processedContent.companyName} homepage`}>
					<Image
						src='/images/logos/logo-name-tagline.png'
						alt={`${processedContent.companyName} - Premium Tutoring Services`}
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
					aria-label={`${processedContent.companyName} homepage`}>
					<Image
						src={processedContent.logo.main}
						alt={processedContent.logo.alt}
						width={processedContent.logo.width}
						height={processedContent.logo.height}
						className='w-auto h-auto lg:max-h-40 object-contain group-hover:scale-110 transition-transform duration-300'
						loading='lazy'
						placeholder='blur'
						blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+'
					/>
				</Link>
			</div>
		);
	},
);
FooterCompanySection.displayName = 'FooterCompanySection';
export default FooterCompanySection;
