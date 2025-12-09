'use client';

import type { TutorProfile } from '@/lib/cms/cms-content';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, MessageCircle } from 'lucide-react';
import { EnhancedTutorProfileCard } from './enhanced-tutor-profile';

/** Convert tier string to numeric value for sorting - defined outside component to prevent recreation on every render */
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

/** Empty state configuration for different scenarios */
interface EmptyStateConfig {
	readonly icon?: React.ComponentType<{ className?: string }>;
	readonly title: string;
	readonly description: string;
	readonly actionLabel?: string;
	readonly actionHref?: string;
}

/** Default empty state configurations */
const DEFAULT_EMPTY_STATES: Record<string, EmptyStateConfig> = {
	noTutors: {
		icon: Users,
		title: 'No Tutors Available',
		description: 'Our expert tutors will be available shortly. Please check back soon or contact us for immediate assistance.',
		actionLabel: 'Contact Us',
		actionHref: '/contact',
	},
	noResults: {
		icon: BookOpen,
		title: 'No Matching Tutors',
		description: 'We couldn\'t find any tutors matching your criteria. Try adjusting your filters or browse all available tutors.',
		actionLabel: 'View All Tutors',
		actionHref: '/tutors',
	},
	loading: {
		icon: Users,
		title: 'Loading Tutors',
		description: 'Please wait while we prepare our exceptional tutors for you.',
	},
} as const;

interface EnhancedTutorsGridProps {
	readonly profiles: readonly TutorProfile[];
	readonly showFeatured?: boolean;
	readonly maxProfiles?: number;
	readonly className?: string;
	readonly emptyStateConfig?: EmptyStateConfig;
	readonly emptyStateType?: keyof typeof DEFAULT_EMPTY_STATES;
	readonly variant?: 'default' | 'compact';
	readonly showProfileCounts?: boolean;
}

/** Enhanced empty state component using Card pattern */
const EmptyStateCard: React.FC<{ config: EmptyStateConfig }> = ({ config }) => {
	const IconComponent = config.icon || Users;

	return (
		<Card className="mx-auto max-w-md text-center bg-white border-slate-200 shadow-sm">
			<CardHeader className="pb-4">
				<div className="mx-auto w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
					<IconComponent className="w-8 h-8 text-neutral-400" />
				</div>
				<CardTitle className="text-xl text-primary-700">{config.title}</CardTitle>
				<CardDescription className="text-neutral-600 leading-relaxed">
					{config.description}
				</CardDescription>
			</CardHeader>
			{config.actionLabel && config.actionHref && (
				<CardContent className="pt-0">
					<Button variant="outline" asChild className="border-accent-600/30 text-accent-600 hover:bg-accent-600/10">
						<a href={config.actionHref}>
							{config.actionLabel}
						</a>
					</Button>
				</CardContent>
			)}
		</Card>
	);
};

export const EnhancedTutorsGrid: React.FC<EnhancedTutorsGridProps> = ({
	profiles,
	showFeatured = true,
	maxProfiles,
	className = '',
	emptyStateConfig,
	emptyStateType = 'noTutors',
	variant = 'default',
	showProfileCounts = true,
}) => {
	const sortedProfiles = React.useMemo(() => {
		let filteredProfiles = [...profiles];

		// Sort by tier (elite first), then featured status, then order
		filteredProfiles.sort((a, b) => {
			const tierA = getTierNumber(a.tier);
			const tierB = getTierNumber(b.tier);

			// Primary sort: tier (lower number = higher tier)
			if (tierA !== tierB) {
				return tierA - tierB;
			}

			// Secondary sort: featured status (if enabled)
			if (showFeatured) {
				if (a.featured && !b.featured) return -1;
				if (!a.featured && b.featured) return 1;
			}

			// Tertiary sort: order property
			return a.order - b.order;
		});

		// Apply profile limit if specified
		if (maxProfiles) {
			filteredProfiles = filteredProfiles.slice(0, maxProfiles);
		}

		return filteredProfiles;
	}, [profiles, showFeatured, maxProfiles]);

	// Handle empty state
	if (sortedProfiles.length === 0) {
		const effectiveConfig = emptyStateConfig || DEFAULT_EMPTY_STATES[emptyStateType];

		return (
			<div className={`w-full py-12 ${className}`}>
				<EmptyStateCard config={effectiveConfig} />
			</div>
		);
	}

	// Grid layout based on variant
	const gridClasses = variant === 'compact'
		? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
		: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8';

	return (
		<div className={`w-full lg:py-12 ${className}`}>
			{/* Main grid */}
			<div className={gridClasses}>
				{sortedProfiles.map((profile) => (
					<EnhancedTutorProfileCard
						key={profile.id}
						profile={profile}
						variant={variant}
						className="h-full"
					/>
				))}
			</div>

			{/* Profile count information */}
			{showProfileCounts && maxProfiles && profiles.length > maxProfiles && (
				<Card className="mt-8 bg-neutral-50 border-slate-200">
					<CardContent className="pt-6 text-center">
						<div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
							<Users className="w-4 h-4" />
							<span>
								Showing {maxProfiles} of {profiles.length} exceptional tutors
							</span>
						</div>
						{profiles.length - maxProfiles > 0 && (
							<p className="mt-2 text-xs text-neutral-500">
								{profiles.length - maxProfiles} more tutors available
							</p>
						)}
					</CardContent>
				</Card>
			)}

			{/* Featured tutors indicator */}
			{showFeatured && (
				<div className="mt-6 text-center">
					<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-600/10 text-accent-600 text-sm font-medium border border-accent-600/20">
						<MessageCircle className="w-4 h-4" />
						<span>Elite tutors displayed first</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default EnhancedTutorsGrid;