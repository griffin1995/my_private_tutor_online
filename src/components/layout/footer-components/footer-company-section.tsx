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
				{}
				{}
				<Link
					href='/'
					className='inline-block group'
					aria-label={`${processedContent.companyName} homepage`}>
					<Image
						src={processedContent.logo.main}
						alt={processedContent.logo.alt}
						width={processedContent.logo.width}
						height={processedContent.logo.height}
						className='w-auto h-auto max-h-40 object-contain group-hover:scale-110 transition-transform duration-300'
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
