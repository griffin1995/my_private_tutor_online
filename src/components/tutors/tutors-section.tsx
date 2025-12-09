'use client';

import type { TutorProfilesSection } from '@/lib/cms/cms-content';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { TutorsGrid } from './tutors-grid';

interface TutorsSectionProps {
	data: TutorProfilesSection;
	showFeaturedOnly?: boolean;
	maxProfiles?: number;
	className?: string;
}

// Section header component
const SectionHeader: React.FC<{ data: TutorProfilesSection }> = ({ data }) => {
	return (
		<div className="mx-auto max-w-3xl text-center mb-8">
			<h2 className="mb-4 text-primary-900">{data.title}</h2>

			{data.subtitle && (
				<p className="mb-6 text-lg text-neutral-700">{data.subtitle}</p>
			)}

			{data.description && (
				<div className={`text-base text-neutral-600 ${data.backgroundStyle || ''}`}>
					{data.description}
				</div>
			)}
		</div>
	);
};

// Action button component
const ActionButton: React.FC<{
	showAllButton: TutorProfilesSection['showAllButton'];
	hasProfiles: boolean;
}> = ({ showAllButton, hasProfiles }) => {
	if (!showAllButton || !hasProfiles) {
		return null;
	}

	const buttonText = showAllButton.label || 'Meet Some of our Team';

	return (
		<div className="mt-8 text-center">
			<Button
				variant="outline"
				size="default"
				asChild
				className="border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 transition-all duration-200 focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
			>
				<a href={showAllButton.href}>
					{buttonText}
					<ChevronRight className="ml-2 h-4 w-4" />
				</a>
			</Button>
		</div>
	);
};

// Main tutors section component
export const TutorsSection: React.FC<TutorsSectionProps> = ({
	data,
	showFeaturedOnly = false,
	maxProfiles,
	className = '',
}) => {
	// Filter profiles based on featured flag
	const profilesToShow = React.useMemo(() => {
		if (showFeaturedOnly) {
			return data.profiles.filter((profile) => profile.featured);
		}
		return data.profiles;
	}, [data.profiles, showFeaturedOnly]);

	const hasProfiles = profilesToShow.length > 0;

	// Determine grid empty state configuration
	const emptyStateType = showFeaturedOnly ? 'noResults' : 'noTutors';

	return (
		<section className={`py-6 lg:py-12 ${className}`} aria-labelledby="tutors-section-title">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Section Header */}
				<div id="tutors-section-title">
					<SectionHeader data={data} />
				</div>

				{/* Tutors Grid */}
				<TutorsGrid
					profiles={profilesToShow}
					showFeatured={!showFeaturedOnly}
					maxProfiles={maxProfiles}
					variant="default"
					showProfileCounts={true}
					emptyStateType={emptyStateType}
				/>

				{/* Action Button */}
				<ActionButton
					showAllButton={data.showAllButton}
					hasProfiles={hasProfiles}
				/>
			</div>
		</section>
	);
};

export default TutorsSection;