'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AnimatePresence, m } from 'framer-motion';
import Fuse from 'fuse.js';
import {
	ChevronDown,
	ChevronUp,
	Filter,
	RotateCcw,
	Search,
	X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
export interface Testimonial {
	readonly quote: string;
	readonly author: string;
	readonly role: string;
	readonly avatar?: string;
	readonly rating: number;
	readonly verified?: boolean;
	readonly date?: string;
	readonly location?: string;
	readonly subject?: string;
	readonly result?: string;
	readonly category?: string;
	readonly grade?: string;
	readonly year?: number;
	readonly featured?: boolean;
}
export interface FilterConfiguration {
	categories: string[];
	subjects: string[];
	gradeOptions: string[];
	locationOptions: string[];
	yearRange: {
		min: number;
		max: number;
	};
}
export interface FilterState {
	category: string;
	subject: string;
	grade: string;
	location: string;
	year: string;
	searchQuery: string;
}
export interface TestimonialsFilterProps {
	testimonials: Testimonial[];
	onFilterChange: (filteredTestimonials: Testimonial[]) => void;
	filterConfig?: FilterConfiguration;
	showSearch?: boolean;
	showAdvancedFilters?: boolean;
	enableAnalytics?: boolean;
	className?: string;
}
const fuseOptions = {
	includeScore: true,
	threshold: 0.4,
	ignoreLocation: true,
	keys: [
		{
			name: 'quote',
			weight: 0.4,
		},
		{
			name: 'author',
			weight: 0.3,
		},
		{
			name: 'role',
			weight: 0.2,
		},
		{
			name: 'subject',
			weight: 0.1,
		},
	],
};
const defaultFilterConfig: FilterConfiguration = {
	categories: ['11+', 'GCSE', 'A-Level', 'Oxbridge', 'International', 'IB'],
	subjects: [
		'Mathematics',
		'English',
		'Sciences',
		'Languages',
		'Humanities',
		'Arts',
	],
	gradeOptions: ['A*', 'A', 'B+', 'Significant Improvement', 'Grade Boundaries'],
	locationOptions: ['London', 'South East', 'International', 'Worldwide'],
	yearRange: {
		min: 2020,
		max: 2024,
	},
};
export function TestimonialsFilter({
	testimonials,
	onFilterChange,
	filterConfig = defaultFilterConfig,
	showSearch = true,
	showAdvancedFilters = true,
	enableAnalytics = false,
	className = '',
}: TestimonialsFilterProps) {
	const [filterState, setFilterState] = useState<FilterState>({
		category: 'all',
		subject: 'all',
		grade: 'all',
		location: 'all',
		year: 'all',
		searchQuery: '',
	});
	const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const fuse = useMemo(
		() => new Fuse(testimonials, fuseOptions),
		[testimonials],
	);
	const filteredTestimonials = useMemo(() => {
		let filtered = [...testimonials];
		if (filterState.searchQuery.trim()) {
			const searchResults = fuse.search(filterState.searchQuery.trim());
			filtered = searchResults.map((result) => result.item);
		}
		if (filterState.category !== 'all') {
			filtered = filtered.filter((testimonial) => {
				const category = testimonial.category || testimonial.role;
				return category.toLowerCase().includes(filterState.category.toLowerCase());
			});
		}
		if (filterState.subject !== 'all') {
			filtered = filtered.filter((testimonial) =>
				testimonial.subject
					?.toLowerCase()
					.includes(filterState.subject.toLowerCase()),
			);
		}
		if (filterState.grade !== 'all') {
			filtered = filtered.filter(
				(testimonial) =>
					testimonial.grade
						?.toLowerCase()
						.includes(filterState.grade.toLowerCase()) ||
					testimonial.result
						?.toLowerCase()
						.includes(filterState.grade.toLowerCase()),
			);
		}
		if (filterState.location !== 'all') {
			filtered = filtered.filter((testimonial) =>
				testimonial.location
					?.toLowerCase()
					.includes(filterState.location.toLowerCase()),
			);
		}
		if (filterState.year !== 'all') {
			const targetYear = parseInt(filterState.year);
			filtered = filtered.filter(
				(testimonial) =>
					testimonial.year === targetYear ||
					(testimonial.date &&
						new Date(testimonial.date).getFullYear() === targetYear),
			);
		}
		return filtered;
	}, [testimonials, filterState, fuse]);
	const handleFilterChange = useCallback(
		(key: keyof FilterState, value: string) => {
			setFilterState((prev) => ({
				...prev,
				[key]: value,
			}));
			if (enableAnalytics) {
				console.log(`Filter used: ${key} = ${value}`);
			}
		},
		[enableAnalytics],
	);
	useEffect(() => {
		const active: string[] = [];
		Object.entries(filterState).forEach(([key, value]) => {
			if (value && value !== 'all' && value.trim()) {
				if (key === 'searchQuery') {
					active.push(`Search: "${value}"`);
				} else {
					active.push(`${key}: ${value}`);
				}
			}
		});
		setActiveFilters(active);
	}, [filterState]);
	useEffect(() => {
		onFilterChange(filteredTestimonials);
	}, [filteredTestimonials, onFilterChange]);
	const clearAllFilters = useCallback(() => {
		setFilterState({
			category: 'all',
			subject: 'all',
			grade: 'all',
			location: 'all',
			year: 'all',
			searchQuery: '',
		});
	}, []);
	const removeFilter = useCallback((key: keyof FilterState) => {
		setFilterState((prev) => ({
			...prev,
			[key]: key === 'searchQuery' ? '' : 'all',
		}));
	}, []);
	const containerVariants = {
		hidden: {
			opacity: 0,
			y: -20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				staggerChildren: 0.1,
			},
		},
	};
	const itemVariants = {
		hidden: {
			opacity: 0,
			scale: 0.95,
		},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.3,
			},
		},
	};
	return (
		<m.section
			className={`relative bg-white py-12 border-b border-slate-100/50 ${className}`}
			variants={containerVariants}
			initial='hidden'
			animate='visible'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<m.div
					className='max-w-6xl mx-auto'
					variants={itemVariants}>
					<div className='text-center mb-8'>
						<h2 className='text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-4'>
							Student Success Stories
						</h2>
						<div className='text-lg text-primary-600 max-w-3xl mx-auto space-y-4'>
							<p>
								Since 2010, My Private Tutor Online has helped hundreds of students
								achieve their academic goals.
							</p>
							<p>
								We're proud to say we've never spent a penny on marketing or paid
								advertising —{' '}
								<strong>
									our tutors are consistently in demand through personal word-of-mouth
									referrals alone.
								</strong>
							</p>
							<p>
								Here's what a selection of families have to say about their experience
								with us. We are always happy to share references for specific tutors
								upon request.
							</p>
						</div>
					</div>

					{showSearch && (
						<m.div
							className='relative mb-6'
							variants={itemVariants}>
							<div className='relative max-w-md mx-auto'>
								<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5' />
								<Input
									type='text'
									placeholder='Search testimonials...'
									value={filterState.searchQuery}
									onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
									className='pl-12 pr-4 py-3 w-full rounded-2xl border-2 border-primary-100 focus:border-accent-500 focus:ring-accent-500/20 text-base'
								/>
							</div>
						</m.div>
					)}

					<m.div
						className='mb-6'
						variants={itemVariants}>
						<div className='flex flex-wrap gap-3 justify-center mb-4'>
							<Badge
								variant={filterState.category === 'all' ? 'default' : 'outline'}
								onClick={() => handleFilterChange('category', 'all')}
								className='cursor-pointer px-6 py-3 text-sm font-medium hover:scale-105 transition-all duration-200'>
								All Stories
							</Badge>
							{filterConfig.categories.map((category) => (
								<Badge
									key={category}
									variant={
										filterState.category === category.toLowerCase() ?
											'default'
										:	'outline'
									}
									onClick={() => handleFilterChange('category', category.toLowerCase())}
									className='cursor-pointer px-6 py-3 text-sm font-medium hover:scale-105 transition-all duration-200'>
									{category}
								</Badge>
							))}
						</div>
					</m.div>

					{showAdvancedFilters && (
						<m.div
							className='mb-6'
							variants={itemVariants}>
							<div className='text-center'>
								<Button
									variant='ghost'
									onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
									className='text-primary-600 hover:text-primary-900 hover:bg-primary-50 px-6 py-2 rounded-xl'>
									<Filter className='w-4 h-4 mr-2' />
									Advanced Filters
									{isAdvancedOpen ?
										<ChevronUp className='w-4 h-4 ml-2' />
									:	<ChevronDown className='w-4 h-4 ml-2' />}
								</Button>
							</div>
						</m.div>
					)}

					<AnimatePresence>
						{isAdvancedOpen && (
							<m.div
								initial={{
									opacity: 0,
									height: 0,
								}}
								animate={{
									opacity: 1,
									height: 'auto',
								}}
								exit={{
									opacity: 0,
									height: 0,
								}}
								transition={{
									duration: 0.4,
								}}
								className='mb-6'>
								<Card className='bg-slate-50/50 border border-primary-100 rounded-2xl overflow-hidden'>
									<CardContent className='p-6'>
										<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
											<div>
												<label className='block text-sm font-semibold text-primary-700 mb-2'>
													Subject
												</label>
												<select
													value={filterState.subject}
													onChange={(e) => handleFilterChange('subject', e.target.value)}
													className='w-full px-4 py-2 rounded-xl border border-primary-200 focus:border-accent-500 focus:ring-accent-500/20 bg-white text-primary-900'>
													<option value='all'>All Subjects</option>
													{filterConfig.subjects.map((subject) => (
														<option
															key={subject}
															value={subject.toLowerCase()}>
															{subject}
														</option>
													))}
												</select>
											</div>

											<div>
												<label className='block text-sm font-semibold text-primary-700 mb-2'>
													Grade Achievement
												</label>
												<select
													value={filterState.grade}
													onChange={(e) => handleFilterChange('grade', e.target.value)}
													className='w-full px-4 py-2 rounded-xl border border-primary-200 focus:border-accent-500 focus:ring-accent-500/20 bg-white text-primary-900'>
													<option value='all'>All Grades</option>
													{filterConfig.gradeOptions.map((grade) => (
														<option
															key={grade}
															value={grade.toLowerCase()}>
															{grade}
														</option>
													))}
												</select>
											</div>

											<div>
												<label className='block text-sm font-semibold text-primary-700 mb-2'>
													Location
												</label>
												<select
													value={filterState.location}
													onChange={(e) => handleFilterChange('location', e.target.value)}
													className='w-full px-4 py-2 rounded-xl border border-primary-200 focus:border-accent-500 focus:ring-accent-500/20 bg-white text-primary-900'>
													<option value='all'>All Locations</option>
													{filterConfig.locationOptions.map((location) => (
														<option
															key={location}
															value={location.toLowerCase()}>
															{location}
														</option>
													))}
												</select>
											</div>

											<div>
												<label className='block text-sm font-semibold text-primary-700 mb-2'>
													Year
												</label>
												<select
													value={filterState.year}
													onChange={(e) => handleFilterChange('year', e.target.value)}
													className='w-full px-4 py-2 rounded-xl border border-primary-200 focus:border-accent-500 focus:ring-accent-500/20 bg-white text-primary-900'>
													<option value='all'>All Years</option>
													{Array.from(
														{
															length:
																filterConfig.yearRange.max - filterConfig.yearRange.min + 1,
														},
														(_, i) => filterConfig.yearRange.max - i,
													).map((year) => (
														<option
															key={year}
															value={year.toString()}>
															{year}
														</option>
													))}
												</select>
											</div>
										</div>
									</CardContent>
								</Card>
							</m.div>
						)}
					</AnimatePresence>

					{activeFilters.length > 0 && (
						<m.div
							className='mb-6'
							variants={itemVariants}>
							<div className='flex flex-wrap items-center gap-3 justify-center'>
								<span className='text-sm font-medium text-primary-600'>
									Active Filters:
								</span>
								{activeFilters.map((filter, index) => {
									const [key] = filter.split(':');
									const filterKey = key
										.toLowerCase()
										.replace(' ', '') as keyof FilterState;
									return (
										<Badge
											key={index}
											variant='secondary'
											className='px-3 py-1 text-xs bg-accent-100 text-accent-800 hover:bg-accent-200 cursor-pointer group'
											onClick={() => removeFilter(filterKey)}>
											{filter}
											<X className='w-3 h-3 ml-1 group-hover:scale-110 transition-transform' />
										</Badge>
									);
								})}
								<Button
									variant='ghost'
									size='sm'
									onClick={clearAllFilters}
									className='text-primary-600 hover:text-primary-900 hover:bg-primary-50 px-3 py-1 text-xs rounded-lg'>
									<RotateCcw className='w-3 h-3 mr-1' />
									Clear All
								</Button>
							</div>
						</m.div>
					)}

					<m.div
						className='text-center mb-4'
						variants={itemVariants}>
						<p className='text-sm text-primary-600'>
							Showing{' '}
							<span className='font-semibold text-primary-900'>
								{filteredTestimonials.length}
							</span>{' '}
							of{' '}
							<span className='font-semibold text-primary-900'>
								{testimonials.length}
							</span>{' '}
							testimonials
						</p>
					</m.div>
				</m.div>
			</div>
		</m.section>
	);
}
