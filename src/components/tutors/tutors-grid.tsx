'use client';

import { TutorProfile } from '@/lib/cms/cms-content';
import React from 'react';
import { TutorProfileCard } from './tutor-profile';
interface TutorsGridProps {
	readonly profiles: readonly TutorProfile[];
	readonly showFeatured?: boolean;
	readonly maxProfiles?: number;
	readonly className?: string;
}
export const TutorsGrid: React.FC<TutorsGridProps> = ({
	profiles,
	showFeatured = true,
	maxProfiles,
	className = '',
}) => {
	const getTierNumber = (tier?: string): number => {
		switch (tier) {
			case 'tier-one':
				return 1;
			case 'tier-two':
				return 2;
			case 'tier-three':
				return 3;
			default:
				return 999;
		}
	};
	const sortedProfiles = React.useMemo(() => {
		let filteredProfiles = [...profiles];
		filteredProfiles.sort((a, b) => {
			const tierA = getTierNumber(a.tier);
			const tierB = getTierNumber(b.tier);
			if (tierA !== tierB) {
				return tierA - tierB;
			}
			if (showFeatured) {
				if (a.featured && !b.featured) return -1;
				if (!a.featured && b.featured) return 1;
			}
			return a.order - b.order;
		});
		if (maxProfiles) {
			filteredProfiles = filteredProfiles.slice(0, maxProfiles);
		}
		return filteredProfiles;
	}, [profiles, showFeatured, maxProfiles]);
	if (sortedProfiles.length === 0) {
		return (
			<div className='text-center py-12'>
				<p>No tutor profiles available.</p>
			</div>
		);
	}
	return (
		<div className={`w-full pt-4 lg:pt-6${className}`}>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
				{sortedProfiles.map((profile) => (
					<TutorProfileCard
						key={profile.id}
						profile={profile}
						featured={profile.featured}
						className='h-full'
					/>
				))}
			</div>

			{maxProfiles && profiles.length > maxProfiles && (
				<div className='mt-8 text-center'>
					<p className='mb-4'>
						Showing {maxProfiles} of {profiles.length} tutors
					</p>
				</div>
			)}
		</div>
	);
};
export default TutorsGrid;
