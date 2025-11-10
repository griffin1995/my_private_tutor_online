'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
	motion as m,
	LazyMotion,
	domAnimation,
	AnimatePresence,
} from 'framer-motion';
import { TestimonialCard } from './testimonial-card';
import { TestimonialModal } from './testimonial-modal';
import { SkeletonCard } from '../ui/skeleton-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	ChevronLeft,
	ChevronRight,
	Grid3X3,
	List,
	Layers,
	Play,
} from 'lucide-react';
export interface EnhancedTestimonial {
	readonly id: string;
	readonly quote: string;
	readonly author: string;
	readonly role: string;
	readonly avatar: string;
	readonly rating: number;
	readonly featured?: boolean;
	readonly expandable?: boolean;
	readonly fullQuote?: string;
	readonly images?: readonly string[];
	readonly videoTestimonial?: string;
	readonly verificationStatus?: 'verified' | 'pending' | 'unverified';
	readonly helpfulVotes?: number;
	readonly categories?: readonly string[];
	readonly date?: string;
	readonly location?: string;
	readonly subject?: string;
	readonly result?: string;
}
export interface TestimonialsGridProps {
	readonly testimonials: readonly EnhancedTestimonial[];
	readonly layout?: 'masonry' | 'grid' | 'list' | 'carousel';
	readonly columns?: 1 | 2 | 3 | 4;
	readonly showLoadMore?: boolean;
	readonly enableVirtualScroll?: boolean;
	readonly animationStyle?: 'fade' | 'slide' | 'scale' | 'flip';
	readonly loading?: boolean;
	readonly itemsPerPage?: number;
	readonly showLayoutControls?: boolean;
	readonly enableSorting?: boolean;
	readonly className?: string;
}
const animationVariants = {
	fade: {
		container: {
			hidden: {
				opacity: 0,
			},
			visible: {
				opacity: 1,
				transition: {
					delayChildren: 0.1,
					staggerChildren: 0.08,
				},
			},
		},
		item: {
			hidden: {
				opacity: 0,
				y: 20,
			},
			visible: {
				opacity: 1,
				y: 0,
				transition: {
					type: 'spring',
					stiffness: 100,
					damping: 15,
				},
			},
		},
	},
	slide: {
		container: {
			hidden: {},
			visible: {
				transition: {
					delayChildren: 0.1,
					staggerChildren: 0.12,
				},
			},
		},
		item: {
			hidden: {
				x: -60,
				opacity: 0,
			},
			visible: {
				x: 0,
				opacity: 1,
				transition: {
					type: 'spring',
					stiffness: 120,
					damping: 20,
				},
			},
		},
	},
	scale: {
		container: {
			hidden: {},
			visible: {
				transition: {
					delayChildren: 0.15,
					staggerChildren: 0.1,
				},
			},
		},
		item: {
			hidden: {
				scale: 0.8,
				opacity: 0,
			},
			visible: {
				scale: 1,
				opacity: 1,
				transition: {
					type: 'spring',
					stiffness: 100,
					damping: 15,
					duration: 0.6,
				},
			},
		},
	},
	flip: {
		container: {
			hidden: {},
			visible: {
				transition: {
					delayChildren: 0.1,
					staggerChildren: 0.15,
				},
			},
		},
		item: {
			hidden: {
				rotateY: 90,
				opacity: 0,
			},
			visible: {
				rotateY: 0,
				opacity: 1,
				transition: {
					type: 'spring',
					stiffness: 100,
					damping: 20,
					duration: 0.8,
				},
			},
		},
	},
};
{
}
{
}
const gridLayoutClasses = {
	masonry: 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-6',
	grid: {
		1: 'grid grid-cols-1 gap-8',
		2: 'grid grid-cols-1 md:grid-cols-2 gap-8',
		3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
		4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8',
	},
	list: 'flex flex-col space-y-6',
	carousel: 'flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory',
};
export function TestimonialsGrid({
	testimonials,
	layout = 'grid',
	columns = 3,
	showLoadMore = false,
	enableVirtualScroll = false,
	animationStyle = 'fade',
	loading = false,
	itemsPerPage = 12,
	showLayoutControls = false,
	enableSorting = false,
	className = '',
}: TestimonialsGridProps) {
	console.log('[GRID-DEBUG] TestimonialsGrid render:', {
		timestamp: new Date().toISOString(),
		testimonialsCount: testimonials.length,
		layout,
		loading,
		renderCount:
			++TestimonialsGrid.renderCount || (TestimonialsGrid.renderCount = 1),
	});
	const [currentLayout, setCurrentLayout] = useState(layout);
	const [currentColumns, setCurrentColumns] = useState(columns);
	const [visibleItems, setVisibleItems] = useState(itemsPerPage);
	const [sortBy, setSortBy] = useState<'date' | 'rating' | 'helpful'>('date');
	const [selectedTestimonial, setSelectedTestimonial] =
		useState<EnhancedTestimonial | null>(null);
	const gridRef = useRef<HTMLDivElement>(null);
	const handleCardClick = useCallback((testimonial: EnhancedTestimonial) => {
		console.log('[GRID-DEBUG] handleCardClick called:', {
			timestamp: new Date().toISOString(),
			testimonialId: testimonial.id,
			callbackExecutionCount:
				++TestimonialsGrid.cardClickCount || (TestimonialsGrid.cardClickCount = 1),
		});
		setSelectedTestimonial(testimonial);
	}, []);
	const handleModalClose = useCallback(() => {
		console.log('[GRID-DEBUG] handleModalClose called:', {
			timestamp: new Date().toISOString(),
			callbackExecutionCount:
				++TestimonialsGrid.modalCloseCount ||
				(TestimonialsGrid.modalCloseCount = 1),
		});
		setSelectedTestimonial(null);
	}, []);
	const handleLoadMore = useCallback(() => {
		setVisibleItems((prev) => Math.min(prev + itemsPerPage, testimonials.length));
	}, [itemsPerPage, testimonials.length]);
	const handleLayoutChange = useCallback(
		(newLayout: 'masonry' | 'grid' | 'list' | 'carousel') => {
			setCurrentLayout(newLayout);
		},
		[],
	);
	const sortedAndFilteredTestimonials = useMemo(() => {
		console.log('[GRID-DEBUG] sortedAndFilteredTestimonials useMemo executing:', {
			timestamp: new Date().toISOString(),
			testimonialsCount: testimonials.length,
			sortBy,
			memoExecutionCount:
				++TestimonialsGrid.sortMemoCount || (TestimonialsGrid.sortMemoCount = 1),
		});
		const sorted = [...testimonials];
		switch (sortBy) {
			case 'rating':
				sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
				break;
			case 'helpful':
				sorted.sort((a, b) => (b.helpfulVotes || 0) - (a.helpfulVotes || 0));
				break;
			case 'date':
			default:
				sorted.sort((a, b) => {
					const dateA = a.date ? new Date(a.date).getTime() : 0;
					const dateB = b.date ? new Date(b.date).getTime() : 0;
					return dateB - dateA;
				});
				break;
		}
		const featured = sorted.filter((t) => t.featured);
		const regular = sorted.filter((t) => !t.featured);
		return [...featured, ...regular];
	}, [testimonials, sortBy]);
	const displayedTestimonials = useMemo(() => {
		console.log('[GRID-DEBUG] displayedTestimonials useMemo executing:', {
			timestamp: new Date().toISOString(),
			sortedCount: sortedAndFilteredTestimonials.length,
			visibleItems,
			enableVirtualScroll,
			memoExecutionCount:
				++TestimonialsGrid.displayMemoCount ||
				(TestimonialsGrid.displayMemoCount = 1),
		});
		return enableVirtualScroll ?
				sortedAndFilteredTestimonials.slice(0, visibleItems)
			:	sortedAndFilteredTestimonials;
	}, [sortedAndFilteredTestimonials, visibleItems, enableVirtualScroll]);
	const currentVariants = animationVariants[animationStyle];
	const getGridClasses = () => {
		if (currentLayout === 'masonry') return gridLayoutClasses.masonry;
		if (currentLayout === 'list') return gridLayoutClasses.list;
		if (currentLayout === 'carousel') return gridLayoutClasses.carousel;
		return gridLayoutClasses.grid[
			currentColumns as keyof typeof gridLayoutClasses.grid
		];
	};
	const handleScroll = useCallback(() => {
		console.log('[GRID-DEBUG] handleScroll called:', {
			timestamp: new Date().toISOString(),
			enableVirtualScroll,
			hasGridRef: !!gridRef.current,
			callbackExecutionCount:
				++TestimonialsGrid.scrollCount || (TestimonialsGrid.scrollCount = 1),
		});
		if (!enableVirtualScroll || !gridRef.current) return;
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight - 1000) {
			console.log('[GRID-DEBUG] handleScroll triggering setVisibleItems');
			setVisibleItems((prev) =>
				Math.min(prev + itemsPerPage, testimonials.length),
			);
		}
	}, [enableVirtualScroll, itemsPerPage, testimonials.length]);
	useEffect(() => {
		console.log('[GRID-DEBUG] scroll useEffect executing:', {
			timestamp: new Date().toISOString(),
			enableVirtualScroll,
			handleScrollRef: typeof handleScroll,
			effectExecutionCount:
				++TestimonialsGrid.scrollEffectCount ||
				(TestimonialsGrid.scrollEffectCount = 1),
		});
		if (!enableVirtualScroll) {
			console.log('[GRID-DEBUG] Virtual scroll disabled, effect returning early');
			return;
		}
		console.log('[GRID-DEBUG] Adding scroll event listener');
		window.addEventListener('scroll', handleScroll, {
			passive: true,
		});
		return () => {
			console.log('[GRID-DEBUG] scroll useEffect cleanup executing:', {
				timestamp: new Date().toISOString(),
				cleanupExecutionCount:
					++TestimonialsGrid.scrollCleanupCount ||
					(TestimonialsGrid.scrollCleanupCount = 1),
			});
			window.removeEventListener('scroll', handleScroll);
		};
	}, [enableVirtualScroll, handleScroll]);
	if (loading) {
		return (
			<div className={getGridClasses() + ' ' + className}>
				{Array.from(
					{
						length: itemsPerPage,
					},
					(_, index) => (
						<SkeletonCard key={`skeleton-${index}`} />
					),
				)}
			</div>
		);
	}
	return (
		<div className={'testimonials-grid px-6 ' + className}>
			{showLayoutControls && (
				<m.div
					className='flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-primary-100 group'
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.6,
						delay: 0.2,
					}}>
					<div className='flex items-center gap-2'>
						<span className='text-sm font-medium text-primary-700 transition-colors duration-300 group-hover:text-primary-800'>
							Layout:
						</span>
						<div className='flex items-center gap-1 bg-white rounded-lg p-1 border border-primary-200 group-hover:border-accent-300 transition-colors duration-300'>
							<Button
								variant={currentLayout === 'grid' ? 'primary' : 'ghost'}
								size='sm'
								onClick={() => handleLayoutChange('grid')}
								className='h-8 w-8 p-0'
								aria-label='Grid layout'
								aria-pressed={currentLayout === 'grid'}>
								<Grid3X3
									className='h-4 w-4'
									aria-hidden='true'
								/>
							</Button>
							<Button
								variant={currentLayout === 'masonry' ? 'primary' : 'ghost'}
								size='sm'
								onClick={() => handleLayoutChange('masonry')}
								className='h-8 w-8 p-0'
								aria-label='Masonry layout'
								aria-pressed={currentLayout === 'masonry'}>
								<Layers
									className='h-4 w-4'
									aria-hidden='true'
								/>
							</Button>
							<Button
								variant={currentLayout === 'list' ? 'primary' : 'ghost'}
								size='sm'
								onClick={() => handleLayoutChange('list')}
								className='h-8 w-8 p-0'
								aria-label='List layout'
								aria-pressed={currentLayout === 'list'}>
								<List
									className='h-4 w-4'
									aria-hidden='true'
								/>
							</Button>
							<Button
								variant={currentLayout === 'carousel' ? 'primary' : 'ghost'}
								size='sm'
								onClick={() => handleLayoutChange('carousel')}
								className='h-8 w-8 p-0'
								aria-label='Carousel layout'
								aria-pressed={currentLayout === 'carousel'}>
								<Play
									className='h-4 w-4'
									aria-hidden='true'
								/>
							</Button>
						</div>
					</div>

					{enableSorting && (
						<div className='flex items-center gap-2'>
							<label
								htmlFor='sort-testimonials'
								className='text-sm font-medium text-primary-700'>
								Sort:
							</label>
							<select
								id='sort-testimonials'
								value={sortBy}
								onChange={(e) =>
									setSortBy(e.target.value as 'date' | 'rating' | 'helpful')
								}
								className='px-3 py-1 text-sm bg-white border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500'
								aria-label='Sort testimonials by'>
								<option value='date'>Latest</option>
								<option value='rating'>Highest Rated</option>
								<option value='helpful'>Most Helpful</option>
							</select>
						</div>
					)}

					{currentLayout === 'grid' && (
						<div className='flex items-center gap-2'>
							<label
								htmlFor='grid-columns'
								className='text-sm font-medium text-primary-700'>
								Columns:
							</label>
							<select
								id='grid-columns'
								value={currentColumns}
								onChange={(e) =>
									setCurrentColumns(Number(e.target.value) as 1 | 2 | 3 | 4)
								}
								className='px-3 py-1 text-sm bg-white border border-primary-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500'
								aria-label='Number of columns for grid layout'>
								<option value={1}>1</option>
								<option value={2}>2</option>
								<option value={3}>3</option>
								<option value={4}>4</option>
							</select>
						</div>
					)}
				</m.div>
			)}

			<m.div
				className='testimonials-grid-container'
				initial='hidden'
				animate='visible'
				variants={{
					hidden: {
						opacity: 0,
					},
					visible: {
						opacity: 1,
						transition: {
							staggerChildren: 0.08,
							delayChildren: 0.2,
						},
					},
				}}>
				<m.div
					ref={gridRef}
					className={getGridClasses()}
					initial='hidden'
					animate='visible'
					variants={currentVariants.container}>
					<AnimatePresence mode='popLayout'>
						{displayedTestimonials.map((testimonial, index) => (
							<m.div
								key={testimonial.id}
								variants={currentVariants.item}
								initial='hidden'
								animate='visible'
								exit='hidden'
								className={
									'testimonial-card-wrapper ' +
									(currentLayout === 'masonry' ? 'break-inside-avoid mb-6'
									: currentLayout === 'carousel' ? 'flex-none w-80 snap-start'
									: '')
								}>
								<TestimonialCard
									testimonial={testimonial}
									layout={currentLayout}
									enableHover={true}
									showFullContent={currentLayout === 'list'}
									className={currentLayout === 'carousel' ? 'h-full' : ''}
									onCardClick={handleCardClick}
								/>
							</m.div>
						))}
					</AnimatePresence>
				</m.div>
			</m.div>

			{showLoadMore && visibleItems < testimonials.length && (
				<m.div
					initial={{
						opacity: 0,
						y: 15,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.5,
						delay: 0.3,
					}}
					className='flex justify-center mt-12'>
					<m.div
						whileHover={{
							scale: 1.02,
						}}
						whileTap={{
							scale: 0.98,
						}}
						className='group'>
						<Button
							onClick={handleLoadMore}
							variant='secondary'
							size='lg'
							className='px-8 py-3 text-primary-700 border-2 border-primary-200 hover:bg-primary-50 hover:border-accent-500 transition-all duration-300 group-hover:shadow-lg'>
							Load More Testimonials
							<Badge
								variant='secondary'
								className='ml-2 transition-all duration-300 group-hover:bg-accent-100'>
								{testimonials.length - visibleItems} remaining
							</Badge>
						</Button>
					</m.div>
				</m.div>
			)}

			<TestimonialModal
				testimonial={selectedTestimonial}
				onClose={handleModalClose}
			/>
		</div>
	);
}
