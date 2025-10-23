'use client';

import type { TutorProfilesSection } from '@/lib/cms/cms-content';
import React, { type JSX } from 'react';
import { TutorsGrid } from './tutors-grid';
interface TutorsSectionProps {
	readonly data: TutorProfilesSection;
	readonly showFeaturedOnly?: boolean;
	readonly maxProfiles?: number;
	readonly showViewAllButton?: boolean;
	readonly className?: string;
}
interface TutorProfilesSection {
	readonly title: string;
	readonly subtitle: string | null;
	readonly description: string | JSX.Element;
	readonly profiles: readonly TutorProfile[];
	readonly showAllButton?: {
		readonly text: string;
		readonly href: string;
	};
	readonly backgroundStyle?: 'light' | 'dark' | 'gradient';
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
		<section className={`py-6 lg:py-12 ${backgroundClasses} ${className}`}>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				<div className='mx-auto max-w-3xl text-center '>
					<h2
						className={`mb-4 ${data.backgroundStyle === 'dark' ? 'text-white' : ''}`}>
						{data.title}
					</h2>

					{data.subtitle && (
						<p
							className={`mb-6 ${
								data.backgroundStyle === 'dark' ? 'text-accent-400' : 'text-accent-600'
							}`}>
							{data.subtitle}
						</p>
					)}

					{data.description && (
						<div className={data.backgroundStyle === 'dark' ? 'text-white' : ''}>
							{data.description}
						</div>
					)}
				</div>

				<TutorsGrid
					profiles={profilesToShow}
					showFeatured={!showFeaturedOnly}
					maxProfiles={maxProfiles}
				/>

				{showViewAllButton && data.showAllButton && profilesToShow.length > 0 && (
					<div className='text-center'>
						<a
							href={data.showAllButton.href}
							className='inline-flex items-center justify-center px-8 py-3 rounded-lg transition-colors duration-200 bg-white border-2 border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2'>
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
