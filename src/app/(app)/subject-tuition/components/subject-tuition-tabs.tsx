'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
	BookOpen,
	GraduationCap,
	Heart,
	Laptop,
	MapPin,
	School,
	Trophy,
	type LucideIcon,
} from 'lucide-react';
import type { SubjectTuitionContent } from '@/lib/cms/cms-content';
import { EducationLevelContent } from './education-level-content';

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
	School,
	GraduationCap,
	Trophy,
	BookOpen,
	Laptop,
	Heart,
	MapPin,
};

type EducationLevelValue =
	| 'primary-school'
	| 'secondary-school'
	| 'entrance-exams'
	| 'university-admissions'
	| 'online-homeschooling'
	| 'sen-support'
	| 'london-in-person';

interface SubjectTuitionTabsProps {
	content: SubjectTuitionContent;
}

export function SubjectTuitionTabs({ content }: SubjectTuitionTabsProps) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	// Get current tab from URL or default to first level
	const defaultTab = content.educationLevels[0]?.value || 'primary-school';
	const currentTab =
		(searchParams.get('tab') as EducationLevelValue) || defaultTab;
	const [selectedTab, setSelectedTab] =
		useState<EducationLevelValue>(currentTab);

	// Update local state when URL changes
	useEffect(() => {
		const urlTab =
			(searchParams.get('tab') as EducationLevelValue) || defaultTab;
		setSelectedTab(urlTab);
	}, [searchParams, defaultTab]);

	// Handle tab changes with URL updates
	const handleTabChange = useCallback(
		(value: string) => {
			const newTab = value as EducationLevelValue;
			setSelectedTab(newTab);

			// Update URL with new tab parameter
			const params = new URLSearchParams(searchParams.toString());
			params.set('tab', newTab);

			// Use window.history.pushState for Next.js 15 compatibility
			window.history.pushState(null, '', `${pathname}?${params.toString()}`);
		},
		[searchParams, pathname],
	);

	return (
		<main className="flex-1 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white">
			<div className="w-full mx-auto">
				<Tabs
					value={selectedTab}
					onValueChange={handleTabChange}
					className="w-full"
					orientation="horizontal"
				>
					<div className="w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8 pt-8">
						<TabsList className="flex h-auto w-full flex-wrap gap-2 bg-primary-700 p-2 rounded-none">
							{content.educationLevels.map((level) => {
								const IconComponent = iconMap[level.icon];
								return (
									<TabsTrigger
										key={level.value}
										value={level.value}
										className={cn(
											'px-4 py-3 transition-all duration-200 ease-in-out',
											'data-[state=active]:bg-white data-[state=active]:text-primary-700',
											'data-[state=inactive]:bg-transparent data-[state=inactive]:text-white',
											'rounded-none flex items-center gap-2',
										)}
									>
										{IconComponent && <IconComponent className="h-4 w-4" />}
										{level.label}
									</TabsTrigger>
								);
							})}
						</TabsList>
					</div>

					{content.educationLevels.map((level) => (
						<TabsContent
							key={level.value}
							value={level.value}
							className="mt-0 focus-visible:outline-none"
						>
							<div className="mx-auto w-full max-w-none px-4 sm:px-6 lg:px-8">
								<EducationLevelContent level={level} />
							</div>
						</TabsContent>
					))}
				</Tabs>
			</div>
		</main>
	);
}