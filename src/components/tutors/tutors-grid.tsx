'use client';

import type { TutorProfile } from '@/lib/cms/cms-content';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, MessageCircle, AlertCircle } from 'lucide-react';
import { TutorProfileCard } from './tutor-profile';

/** Convert tier string to numeric value for sorting */
const TIER_PRIORITIES: Record<string, number> = {
	'tier-one': 1,
	'tier-two': 2,
	'tier-three': 3,
};

const getTierPriority = (tier?: TutorProfile['tier']): number => {
	return tier ? TIER_PRIORITIES[tier] : 999;
};

/** Empty state configuration for different scenarios */
interface EmptyStateConfig {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	actionLabel?: string;
	actionHref?: string;
	variant: 'default' | 'warning' | 'error';
}

const EMPTY_STATE_CONFIGS: Record<string, EmptyStateConfig> = {
	noTutors: {
		icon: Users,
		title: 'No Tutors Available',
		description: 'Our expert tutors will be available shortly. Please check back soon or contact us for immediate assistance.',
		actionLabel: 'Contact Us',
		actionHref: '/contact',
		variant: 'default',
	},
	noResults: {
		icon: BookOpen,
		title: 'No Matching Tutors',
		description: 'We couldn\'t find any tutors matching your criteria. Try adjusting your filters or browse all available tutors.',
		actionLabel: 'View All Tutors',
		actionHref: '/tutors',
		variant: 'default',
	},
	loading: {
		icon: Users,
		title: 'Loading Tutors',
		description: 'Please wait while we prepare our exceptional tutors for you.',
		variant: 'default',
	},
	error: {
		icon: AlertCircle,
		title: 'Unable to Load Tutors',
		description: 'We\'re experiencing technical difficulties. Please refresh the page or try again later.',
		actionLabel: 'Refresh Page',
		actionHref: '#',
		variant: 'error',
	},
};

/** Sorting configuration */
interface SortingConfig {
	byTier: boolean;
	byFeatured: boolean;
	byOrder: boolean;
}

/** Grid layout configuration based on variant */
interface GridLayoutConfig {
	containerClasses: string;
	gridClasses: string;
	cardVariant: 'default' | 'compact';
}

const GRID_LAYOUTS: Record<string, GridLayoutConfig> = {
	default: {
		containerClasses: 'w-full lg:py-12',
		gridClasses: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8',
		cardVariant: 'default',
	},
	compact: {
		containerClasses: 'w-full py-8',
		gridClasses: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
		cardVariant: 'compact',
	},
	featured: {
		containerClasses: 'w-full py-12',
		gridClasses: 'grid grid-cols-1 md:grid-cols-2 gap-8',
		cardVariant: 'default',
	},
};

/** Component props */
interface TutorsGridProps {
	profiles: TutorProfile[];
	showFeatured?: boolean;
	maxProfiles?: number;
	className?: string;
	emptyStateType?: 'noTutors' | 'noResults' | 'loading' | 'error';
	customEmptyState?: Partial<EmptyStateConfig>;
	variant?: 'default' | 'compact' | 'featured';
	showProfileCounts?: boolean;
	sortingConfig?: Partial<SortingConfig>;
}

/** Empty state component using Card pattern */
const EmptyStateCard: React.FC<{ config: EmptyStateConfig; className?: string }> = ({
	config,
	className = ''
}) => {
	const IconComponent = config.icon;

	const variantStyles: Record<string, string> = {
		default: 'border-slate-200',
		warning: 'border-amber-200 bg-amber-50/30',
		error: 'border-red-200 bg-red-50/30',
	};

	const iconStyles: Record<string, string> = {
		default: 'text-neutral-400',
		warning: 'text-amber-500',
		error: 'text-red-500',
	};

	const handleActionClick = (href: string) => {
		if (href === '#') {
			window.location.reload();
		}
	};

	return (
		<Card className={`mx-auto max-w-md text-center bg-white shadow-sm ${variantStyles[config.variant]} ${className}`}>
			<CardHeader className="pb-4">
				<div className="mx-auto w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-4">
					<IconComponent className={`w-8 h-8 ${iconStyles[config.variant]}`} />
				</div>
				<CardTitle className="text-xl text-primary-700">{config.title}</CardTitle>
				<CardDescription className="text-neutral-600 leading-relaxed">
					{config.description}
				</CardDescription>
			</CardHeader>
			{config.actionLabel && config.actionHref && (
				<CardContent className="pt-0">
					{config.actionHref === '#' ? (
						<Button
							variant="outline"
							className="border-accent-600/30 text-accent-600 hover:bg-accent-600/10"
							onClick={() => handleActionClick(config.actionHref!)}
						>
							{config.actionLabel}
						</Button>
					) : (
						<Button
							variant="outline"
							asChild
							className="border-accent-600/30 text-accent-600 hover:bg-accent-600/10"
						>
							<a href={config.actionHref}>
								{config.actionLabel}
							</a>
						</Button>
					)}
				</CardContent>
			)}
		</Card>
	);
};

/** Profile count information component */
const ProfileCountInfo: React.FC<{ showing: number; total: number }> = ({
	showing,
	total
}) => {
	const remaining = total - showing;

	return (
		<Card className="mt-8 bg-neutral-50 border-slate-200">
			<CardContent className="pt-6 text-center">
				<div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
					<Users className="w-4 h-4" />
					<span>
						Showing {showing} of {total} exceptional tutor{total !== 1 ? 's' : ''}
					</span>
				</div>
				{remaining > 0 && (
					<p className="mt-2 text-xs text-neutral-500">
						{remaining} more tutor{remaining !== 1 ? 's' : ''} available
					</p>
				)}
			</CardContent>
		</Card>
	);
};

/** Featured tutors indicator */
const FeaturedIndicator: React.FC<{ showFeatured: boolean; hasEliteTutors: boolean }> = ({
	showFeatured,
	hasEliteTutors
}) => {
	if (!showFeatured && !hasEliteTutors) return null;

	const message = hasEliteTutors
		? 'Elite tutors displayed first'
		: 'Featured tutors highlighted';

	return (
		<div className="mt-6 text-center">
			<div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-600/10 text-accent-600 text-sm font-medium border border-accent-600/20">
				<MessageCircle className="w-4 h-4" />
				<span>{message}</span>
			</div>
		</div>
	);
};

/** Main tutors grid component */
export const TutorsGrid: React.FC<TutorsGridProps> = ({
	profiles,
	showFeatured = true,
	maxProfiles,
	className = '',
	emptyStateType = 'noTutors',
	customEmptyState,
	variant = 'default',
	showProfileCounts = true,
	sortingConfig = {},
}) => {
	const sorting: SortingConfig = {
		byTier: true,
		byFeatured: showFeatured,
		byOrder: true,
		...sortingConfig,
	};

	const sortedProfiles = React.useMemo(() => {
		let filteredProfiles = [...profiles];

		filteredProfiles.sort((a, b) => {
			if (sorting.byTier) {
				const tierA = getTierPriority(a.tier);
				const tierB = getTierPriority(b.tier);
				if (tierA !== tierB) {
					return tierA - tierB;
				}
			}

			if (sorting.byFeatured) {
				if (a.featured && !b.featured) return -1;
				if (!a.featured && b.featured) return 1;
			}

			if (sorting.byOrder) {
				return a.order - b.order;
			}

			return 0;
		});

		if (maxProfiles && maxProfiles > 0) {
			filteredProfiles = filteredProfiles.slice(0, maxProfiles);
		}

		return filteredProfiles;
	}, [profiles, sorting, maxProfiles]);

	const hasEliteTutors = React.useMemo(() => {
		return sortedProfiles.some(profile => profile.tier === 'tier-one');
	}, [sortedProfiles]);

	if (sortedProfiles.length === 0) {
		const baseConfig = EMPTY_STATE_CONFIGS[emptyStateType || 'noTutors'];
		const effectiveConfig: EmptyStateConfig = {
			...baseConfig,
			...customEmptyState,
		};

		return (
			<div className={`w-full py-12 ${className}`}>
				<EmptyStateCard config={effectiveConfig} />
			</div>
		);
	}

	const layout = GRID_LAYOUTS[variant];

	return (
		<div className={`${layout.containerClasses} ${className}`}>
			<div className={layout.gridClasses}>
				{sortedProfiles.map((profile) => (
					<TutorProfileCard
						key={profile.id}
						profile={profile}
						variant={layout.cardVariant}
						className="h-full"
					/>
				))}
			</div>

			{showProfileCounts && maxProfiles && profiles.length > maxProfiles && (
				<ProfileCountInfo
					showing={sortedProfiles.length}
					total={profiles.length}
				/>
			)}

			<FeaturedIndicator
				showFeatured={sorting.byFeatured}
				hasEliteTutors={hasEliteTutors}
			/>
		</div>
	);
};

export default TutorsGrid;