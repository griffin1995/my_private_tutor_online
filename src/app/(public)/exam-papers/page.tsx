/**
 * Exam Papers Page
 * Main page component for browsing and filtering exam papers
 * Modernised following 2024-2025 React + TypeScript best practices
 * Extracted from monolithic structure to component-based architecture
 */

'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageLayout from '@/components/layout/page-layout';
import SimpleHero from '@/components/layout/simple-hero';
import CategorySidebar from './_components/CategorySidebar';
import CategoryTabBar from './_components/CategoryTabBar';
import ResourceCard from './_components/ResourceCard';
import Pagination from './_components/Pagination';
import { FilterState } from '@/types/exam-papers';
import resourcesData from '@/content/exam-papers/resources.json';

// Constants
const ITEMS_PER_PAGE = 12;

/**
 * Helper function to get all subcategory IDs recursively
 */
const getAllSubcategoryIds = (categories: any[]): Set<string> => {
	const ids = new Set<string>();

	const findAndCollectIds = (cats: any[]): void => {
		cats.forEach(cat => {
			ids.add(cat.id);
			if (cat.subcategories) {
				findAndCollectIds(cat.subcategories);
			}
		});
	};

	findAndCollectIds(categories);
	return ids;
};

export default function ResourcesPage() {
	// State management
	const [filterState, setFilterState] = useState<FilterState>({
		selectedCategory: null,
		searchQuery: '',
		showFreeOnly: false,
		currentPage: 1,
	});

	// Memoised handlers for performance
	const handleCategorySelect = useCallback((categoryId: string | null) => {
		setFilterState(prev => ({
			...prev,
			selectedCategory: categoryId,
			currentPage: 1, // Reset to first page on category change
		}));
	}, []);

	const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setFilterState(prev => ({
			...prev,
			searchQuery: e.target.value,
			currentPage: 1, // Reset to first page on search
		}));
	}, []);

	const handleFreeFilterChange = useCallback((value: boolean) => {
		setFilterState(prev => ({
			...prev,
			showFreeOnly: value,
			currentPage: 1, // Reset to first page on filter change
		}));
	}, []);

	const handlePageChange = useCallback((page: number) => {
		setFilterState(prev => ({
			...prev,
			currentPage: page,
		}));
	}, []);

	const handleClearFilters = useCallback(() => {
		setFilterState({
			selectedCategory: null,
			searchQuery: '',
			showFreeOnly: false,
			currentPage: 1,
		});
	}, []);

	// Memoised filtered resources for performance
	const filteredResources = useMemo(() => {
		let filtered = [...resourcesData];

		// Filter by search query
		if (filterState.searchQuery) {
			const query = filterState.searchQuery.toLowerCase();
			filtered = filtered.filter(resource =>
				resource.title.toLowerCase().includes(query) ||
				resource.description.toLowerCase().includes(query) ||
				resource.category.toLowerCase().includes(query)
			);
		}

		// Filter by category
		if (filterState.selectedCategory) {
			// Import categories data dynamically for category filtering
			import('@/content/exam-papers/categories.json').then(categoriesData => {
				const allCategoryIds = getAllSubcategoryIds(categoriesData.default);
				if (allCategoryIds.has(filterState.selectedCategory!)) {
					filtered = filtered.filter(resource => {
						// Check if resource belongs to selected category or its subcategories
						return resource.category.startsWith(filterState.selectedCategory!) ||
							resource.category === filterState.selectedCategory;
					});
				}
			});
		}

		// Filter by free only
		if (filterState.showFreeOnly) {
			filtered = filtered.filter(resource => resource.isFree);
		}

		return filtered;
	}, [filterState]);

	// Pagination calculations
	const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
	const startIndex = (filterState.currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedResources = filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	// Check if filters are active
	const hasActiveFilters = Boolean(
		filterState.selectedCategory ||
		filterState.searchQuery ||
		filterState.showFreeOnly
	);

	return (
		<>
			<SimpleHero
				title='Premium Exam Papers'
				description='Comprehensive collection of past papers, practice tests, and study resources for all major examination boards'
			/>

			<PageLayout>
				<div className='space-y-6 sm:space-y-8 md:space-y-10'>
					{/* Search Section */}
					<div className='bg-neutral-50 border-y border-neutral-200'>
						<div className='flex items-center justify-center py-5 sm:py-6 md:py-7 lg:py-8 xl:py-9 2xl:py-10'>
							<div className='max-w-2xl mx-auto w-full'>
								<div className='relative flex items-center'>
									<Search className='absolute left-3 sm:left-4 md:left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5' />
									<Input
										type='search'
										placeholder='Search for resources, subjects, or topics...'
										className='pl-10 sm:pl-12 md:pl-12 py-2 sm:py-3 md:py-3 text-sm sm:text-base md:text-lg w-full rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:ring-0 focus:ring-offset-0 focus:outline-none'
										value={filterState.searchQuery}
										onChange={handleSearchChange}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Category Tab Bar for MD breakpoint */}
					<CategoryTabBar
						selectedCategory={filterState.selectedCategory}
						onCategorySelect={handleCategorySelect}
						showFreeOnly={filterState.showFreeOnly}
						onFreeFilterChange={handleFreeFilterChange}
					/>

					{/* Main Content Layout */}
					<div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-0 border-t border-b border-neutral-200'>
						{/* Sidebar for LG+ breakpoint */}
						<CategorySidebar
							selectedCategory={filterState.selectedCategory}
							onCategorySelect={handleCategorySelect}
							showFreeOnly={filterState.showFreeOnly}
							onFreeFilterChange={handleFreeFilterChange}
						/>

						{/* Main Content Area */}
						<div className='p-3 sm:p-4 md:p-6 bg-neutral-100'>
							{/* Results count and filters */}
							<div className='mb-6 flex items-center justify-between flex-wrap gap-4'>
								<div className='text-sm text-neutral-600'>
									Showing {paginatedResources.length} of {filteredResources.length} resources
									{hasActiveFilters && (
										<span className='ml-2 text-xs text-neutral-500'>
											(filtered)
										</span>
									)}
								</div>
								{hasActiveFilters && (
									<Button
										variant='outline'
										size='sm'
										onClick={handleClearFilters}
										className='text-sm'>
										Clear all filters
									</Button>
								)}
							</div>

							{/* Resources Grid */}
							{paginatedResources.length > 0 ? (
								<>
									<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 md:gap-6 mb-8'>
										{paginatedResources.map((resource) => (
											<ResourceCard key={resource.id} resource={resource} />
										))}
									</div>

									{/* Pagination */}
									<Pagination
										currentPage={filterState.currentPage}
										totalPages={totalPages}
										onPageChange={handlePageChange}
									/>
								</>
							) : (
								/* No results message */
								<div className='text-center py-12 sm:py-16 md:py-16'>
									<p className='text-lg sm:text-xl md:text-2xl text-neutral-600 mb-3 sm:mb-4 md:mb-4'>
										No resources found matching your criteria
									</p>
									<Button
										variant='outline'
										onClick={handleClearFilters}>
										Clear filters
									</Button>
								</div>
							)}
						</div>
					</div>
				</div>
			</PageLayout>
		</>
	);
}