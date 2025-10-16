'use client';

import { TutorProfilesSection } from '@/lib/cms/cms-content';
import React from 'react';
import { TutorsGrid } from './tutors-grid';
interface TutorsSectionProps {
	readonly data: TutorProfilesSection;
	readonly showFeaturedOnly?: boolean;
	readonly maxProfiles?: number;
	readonly showViewAllButton?: boolean;
	readonly className?: string;
}
export const TutorsSection: React.FC<TutorsSectionProps> = ({
	data,
	showFeaturedOnly = false,
	maxProfiles,
	showViewAllButton = true,
	className = '',
}) => {
	const profilesToShow = React.useMemo(() => {
		if (showFeaturedOnly) {
			return data.profiles.filter((profile) => profile.featured);
		}
		return data.profiles;
	}, [data.profiles, showFeaturedOnly]);
	const backgroundClasses = React.useMemo(() => {
		switch (data.backgroundStyle) {
			case 'dark':
				return 'bg-primary-700 text-white';
			case 'gradient':
				return 'bg-gradient-to-br from-accent-50 to-accent-100';
			case 'light':
			default:
				return 'bg-neutral-50';
		}
	}, [data.backgroundStyle]);
	return (
		<section className={`py-16 lg:py-24 ${backgroundClasses} ${className}`}>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				{}
				{}
				{}
				{}
				{}
				{}
				{}
				<div className='mx-auto max-w-3xl text-center mb-12 lg:mb-16'>
					<h2
						className={`mb-4 ${data.backgroundStyle === 'dark' ? 'text-white' : ''}`}>
						{data.title}
					</h2>

					{}
					{}
					{}
					{data.subtitle && (
						<p
							className={`mb-6 ${data.backgroundStyle === 'dark' ? 'text-accent-400' : 'text-accent-600'}`}>
							{data.subtitle}
						</p>
					)}

					{}
					{}
					{}
					{data.description && (
						<div
							className={data.backgroundStyle === 'dark' ? 'text-white' : ''}
							dangerouslySetInnerHTML={{
								__html: `<p>${data.description.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />')}</p>`,
							}}
						/>
					)}
				</div>

				{}
				<div className='mb-12 lg:mb-16'>
					<TutorsGrid
						profiles={profilesToShow}
						showFeatured={!showFeaturedOnly}
						maxProfiles={maxProfiles}
					/>
				</div>

				{}
				{showViewAllButton && data.showAllButton && profilesToShow.length > 0 && (
					<div className='text-center'>
						{}
						{}
						{}
						{}
						{}
						{}
						<a
							href={data.showAllButton.href}
							className='inline-flex items-center justify-center px-8 py-3 rounded-lg transition-colors duration-200 bg-white border-2 border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2'>
							{}
							{}
							Meet Some of our Team
							<svg
								className='ml-2 h-4 w-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 5l7 7-7 7'
								/>
							</svg>
						</a>
					</div>
				)}
			</div>
		</section>
	);
};
export default TutorsSection;
