'use client';

import { useState, useCallback, useEffect, useMemo } from 'react';
import { m } from 'framer-motion';
import {
	Play,
	Pause,
	RotateCcw,
	RotateCw,
	Filter,
	Search,
	X,
} from 'lucide-react';
import SchoolCard from './school-card';
import SchoolModal from './school-modal';
import {
	EliteSchool,
	SchoolCategory,
	eliteSchoolsDatabase,
	getSchoolsByCategory,
	getFeaturedSchools,
	getTopSchoolsByPrestige,
	trackSchoolInteraction,
} from '@/lib/cms/schools-data';
import GradientOverlay from '@/components/ui/gradient-overlay';
interface EliteSchoolsCarouselProps {
	schools?: readonly EliteSchool[];
	title?: string;
	description?: string;
	displayMode?: 'logos' | 'text' | 'mixed';
	categories?: readonly SchoolCategory[];
	showControls?: boolean;
	autoPlay?: boolean;
	pauseOnHover?: boolean;
	showModal?: boolean;
	showSearch?: boolean;
	showCategoryFilter?: boolean;
	animationSpeed?: 'slow' | 'medium' | 'fast';
	backgroundVariant?: 'blue' | 'white' | 'gradient';
	className?: string;
	onSchoolClick?: (school: EliteSchool) => void;
	showHoverStats?: boolean;
}
const ANIMATION_SPEEDS = {
	slow: 60,
	medium: 45,
	fast: 30,
} as const;
const carouselVariants = {
	animate: (duration: number) => ({
		x: ['0%', '-100%'],
		transition: {
			x: {
				repeat: Infinity,
				repeatType: 'loop' as const,
				duration,
				ease: 'linear',
			},
		},
	}),
};
const containerVariants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2,
		},
	},
};
const itemVariants = {
	hidden: {
		opacity: 0,
		y: 30,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
		},
	},
};
export function EliteSchoolsCarousel({
	schools = eliteSchoolsDatabase,
	title = 'Prestigious Schools & Universities',
	description = 'Our students have secured places at the most prestigious educational institutions worldwide',
	displayMode = 'mixed',
	categories = ['university', 'grammar', 'independent', 'international'],
	showControls = true,
	autoPlay = true,
	pauseOnHover = true,
	showModal = true,
	showSearch = false,
	showCategoryFilter = false,
	animationSpeed = 'medium',
	backgroundVariant = 'blue',
	className = '',
	onSchoolClick,
	showHoverStats = true,
}: EliteSchoolsCarouselProps) {
	const [isPlaying, setIsPlaying] = useState(autoPlay);
	const [isPaused, setIsPaused] = useState(false);
	const [selectedSchool, setSelectedSchool] = useState<EliteSchool | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<
		SchoolCategory | 'all'
	>('all');
	const [currentDirection, setCurrentDirection] = useState<
		'forward' | 'reverse'
	>('forward');
	const filteredSchools = useMemo(() => {
		let filtered = schools;
		if (selectedCategory !== 'all') {
			filtered = filtered.filter((school) => school.category === selectedCategory);
		}
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(school) =>
					school.name.toLowerCase().includes(query) ||
					school.shortName?.toLowerCase().includes(query) ||
					school.location.toLowerCase().includes(query) ||
					school.city.toLowerCase().includes(query) ||
					school.subjects?.some((subject) =>
						subject.toLowerCase().includes(query),
					) ||
					school.specialisms?.some((specialism) =>
						specialism.toLowerCase().includes(query),
					),
			);
		}
		return [...filtered].sort((a, b) => {
			const priorityA = a.priority || 999;
			const priorityB = b.priority || 999;
			if (priorityA !== priorityB) return priorityA - priorityB;
			return b.prestigeScore - a.prestigeScore;
		});
	}, [schools, selectedCategory, searchQuery]);
	const tripleSchools = useMemo(() => {
		return [...filteredSchools, ...filteredSchools, ...filteredSchools];
	}, [filteredSchools]);
	const handlePlayPause = useCallback(() => {
		setIsPlaying(!isPlaying);
		trackSchoolInteraction({
			schoolId: 'carousel-controls',
			interactionType: isPlaying ? 'click' : 'click',
			timestamp: new Date(),
			metadata: {
				action: isPlaying ? 'pause' : 'play',
			},
		});
	}, [isPlaying]);
	const handleDirectionChange = useCallback(() => {
		setCurrentDirection((current) =>
			current === 'forward' ? 'reverse' : 'forward',
		);
		trackSchoolInteraction({
			schoolId: 'carousel-controls',
			interactionType: 'click',
			timestamp: new Date(),
			metadata: {
				action: 'direction_change',
				direction: currentDirection === 'forward' ? 'reverse' : 'forward',
			},
		});
	}, [currentDirection]);
	const handleSchoolClick = useCallback(
		(school: EliteSchool) => {
			if (showModal) {
				setSelectedSchool(school);
				setIsModalOpen(true);
			}
			onSchoolClick?.(school);
		},
		[showModal, onSchoolClick],
	);
	const handleModalClose = useCallback(() => {
		setIsModalOpen(false);
		setSelectedSchool(null);
	}, []);
	const handleMouseEnter = useCallback(() => {
		if (pauseOnHover) {
			setIsPaused(true);
		}
	}, [pauseOnHover]);
	const handleMouseLeave = useCallback(() => {
		if (pauseOnHover) {
			setIsPaused(false);
		}
	}, [pauseOnHover]);
	const handleCarouselTouchStart = useCallback(() => {
		if (pauseOnHover) {
			setIsPaused(true);
		}
	}, [pauseOnHover]);
	const handleCarouselTouchEnd = useCallback(() => {
		if (pauseOnHover) {
			setTimeout(() => setIsPaused(false), 300);
		}
	}, [pauseOnHover]);
	const handleCategoryChange = useCallback(
		(category: SchoolCategory | 'all') => {
			setSelectedCategory(category);
			trackSchoolInteraction({
				schoolId: 'carousel-filter',
				interactionType: 'click',
				timestamp: new Date(),
				metadata: {
					filter_type: 'category',
					category,
				},
			});
		},
		[],
	);
	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchQuery(e.target.value);
		},
		[],
	);
	const clearSearch = useCallback(() => {
		setSearchQuery('');
	}, []);
	const backgroundClasses = {
		blue: 'bg-blue-50/40',
		white: 'bg-white',
		gradient: 'bg-gradient-to-br from-blue-50 to-primary-50/30',
	};
	const patternColors = {
		blue: '#3b82f6',
		white: '#475569',
		gradient: '#3b82f6',
	};
	return (
		<>
			<section
				className={`relative ${backgroundClasses[backgroundVariant]} py-20 ${className}`}>
				{}
				<div
					className='absolute inset-0 opacity-[0.02] pointer-events-none'
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='45' height='45' viewBox='0 0 45 45' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${encodeURIComponent(patternColors[backgroundVariant])}' fill-opacity='1'%3E%3Cpath d='M22.5 7.5l-3.75 3.75L15 7.5l3.75-3.75L22.5 7.5zm7.5 7.5l-3.75 3.75L22.5 15l3.75-3.75L30 15z'/%3E%3C/g%3E%3C/svg%3E")`,
						backgroundSize: '45px 45px',
					}}
				/>

				{}
				{backgroundVariant !== 'white' && (
					<GradientOverlay
						direction='radial'
						from='blue-100/15'
						to='transparent'
						height='h-full'
						className='top-0'
					/>
				)}

				<div className='relative container mx-auto px-4 sm:px-6 lg:px-8'>
					<m.div
						className='text-center mb-16'
						variants={containerVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{
							once: true,
						}}>
						<m.h2
							className='text-3xl lg:text-4xl font-serif font-bold text-primary-900 mb-4 uppercase tracking-wide'
							variants={itemVariants}>
							{title}
						</m.h2>
						<m.p
							className='text-primary-600 max-w-2xl mx-auto'
							variants={itemVariants}>
							{description}
						</m.p>

						{}
						{(showControls || showSearch || showCategoryFilter) && (
							<m.div
								className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8'
								variants={itemVariants}>
								{}
								{showSearch && (
									<div className='relative'>
										<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400' />
										<input
											type='text'
											placeholder='Search schools...'
											value={searchQuery}
											onChange={handleSearchChange}
											className='pl-10 pr-10 py-2 border border-primary-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors'
										/>
										{searchQuery && (
											<button
												onClick={clearSearch}
												className='absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-primary-100 rounded-full transition-colors'>
												<X className='h-3 w-3 text-primary-400' />
											</button>
										)}
									</div>
								)}

								{}
								{showCategoryFilter && (
									<div className='flex items-center gap-2'>
										<Filter className='h-4 w-4 text-primary-600' />
										<select
											value={selectedCategory}
											onChange={(e) =>
												handleCategoryChange(e.target.value as SchoolCategory | 'all')
											}
											className='px-3 py-2 border border-primary-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors'>
											<option value='all'>All Categories</option>
											<option value='university'>Universities</option>
											<option value='grammar'>Grammar Schools</option>
											<option value='independent'>Independent Schools</option>
											<option value='international'>International Schools</option>
										</select>
									</div>
								)}

								{}
								{showControls && (
									<div className='flex items-center gap-2'>
										<button
											onClick={handlePlayPause}
											className='p-2 rounded-full bg-white/80 border border-primary-200 hover:bg-white hover:border-accent-300 transition-all duration-200 backdrop-blur-sm'
											aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}>
											{isPlaying ?
												<Pause className='h-4 w-4 text-primary-600' />
											:	<Play className='h-4 w-4 text-primary-600' />}
										</button>

										<button
											onClick={handleDirectionChange}
											className='p-2 rounded-full bg-white/80 border border-primary-200 hover:bg-white hover:border-accent-300 transition-all duration-200 backdrop-blur-sm'
											aria-label={
												currentDirection === 'forward' ? 'Reverse direction' : (
													'Forward direction'
												)
											}>
											{currentDirection === 'forward' ?
												<RotateCcw className='h-4 w-4 text-primary-600' />
											:	<RotateCw className='h-4 w-4 text-primary-600' />}
										</button>
									</div>
								)}
							</m.div>
						)}
					</m.div>

					{}
					{}
					<m.div
						className='w-full overflow-hidden'
						variants={itemVariants}
						initial='hidden'
						whileInView='visible'
						viewport={{
							once: true,
						}}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						onTouchStart={handleCarouselTouchStart}
						onTouchEnd={handleCarouselTouchEnd}>
						<m.div
							className='flex gap-6 whitespace-nowrap py-8'
							variants={carouselVariants}
							animate={isPlaying && !isPaused ? 'animate' : undefined}
							custom={
								currentDirection === 'reverse' ?
									-ANIMATION_SPEEDS[animationSpeed]
								:	ANIMATION_SPEEDS[animationSpeed]
							}
							style={{
								transform: currentDirection === 'reverse' ? 'scaleX(-1)' : 'scaleX(1)',
							}}>
							{tripleSchools.map((school, index) => (
								<div
									key={`${school.id}-${index}`}
									style={{
										transform:
											currentDirection === 'reverse' ? 'scaleX(-1)' : 'scaleX(1)',
									}}>
									{}
									{}
									{}
									<SchoolCard
										school={school}
										displayMode={displayMode}
										size='standard'
										interactive={false}
										showMetadata={false}
										className=''
										showHoverStats={false}
									/>
								</div>
							))}
						</m.div>
					</m.div>

					{}
					{(searchQuery || selectedCategory !== 'all') && (
						<m.div
							className='text-center mt-8'
							variants={itemVariants}
							initial='hidden'
							whileInView='visible'
							viewport={{
								once: true,
							}}>
							<p className='text-primary-600 text-sm'>
								Showing {filteredSchools.length} school
								{filteredSchools.length !== 1 ? 's' : ''}
								{selectedCategory !== 'all' &&
									` in ${selectedCategory.replace('_', ' ')}`}
								{searchQuery && ` matching "${searchQuery}"`}
							</p>
						</m.div>
					)}
				</div>

				{}
				{}
			</section>

			{}
			{}
			{showModal && (
				<SchoolModal
					school={selectedSchool}
					isOpen={isModalOpen}
					onClose={handleModalClose}
				/>
			)}
		</>
	);
}
export default EliteSchoolsCarousel;
