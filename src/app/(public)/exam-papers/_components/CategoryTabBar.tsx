/**
 * CategoryTabBar Component
 * Horizontal scrollable tabs for medium breakpoint (768px-1023px) only
 * Shows top-level categories as clickable chips with free filter
 * Following 2024-2025 React + TypeScript best practices
 */

'use client';

import React, { useCallback } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { CategoryTabBarProps } from '@/types/exam-papers';
import categoriesData from '@/content/exam-papers/categories.json';
import resourcesData from '@/content/exam-papers/resources.json';

const CategoryTabBar: React.FC<CategoryTabBarProps> = React.memo(({
	selectedCategory,
	onCategorySelect,
	showFreeOnly,
	onFreeFilterChange,
}) => {
	const handleCategorySelect = useCallback((categoryId: string | null) => {
		onCategorySelect(categoryId);
	}, [onCategorySelect]);

	const handleAllResourcesSelect = useCallback(() => {
		onCategorySelect(null);
	}, [onCategorySelect]);

	const handleFreeFilterChange = useCallback((checked: boolean | 'indeterminate') => {
		onFreeFilterChange(checked === true);
	}, [onFreeFilterChange]);

	// Calculate counts from the imported data
	const totalResourcesCount = resourcesData.length;
	const freeResourcesCount = resourcesData.filter(resource => resource.isFree).length;

	return (
		<div className='hidden md:block lg:hidden border-b border-neutral-200 bg-white'>
			{/* Free Resources Filter - Independent checkbox */}
			<div className='px-4 py-3 bg-neutral-50 border-b border-neutral-200'>
				<label className='flex items-center gap-3 cursor-pointer'>
					<Checkbox
						checked={showFreeOnly}
						onCheckedChange={handleFreeFilterChange}
						className='data-[state=checked]:bg-primary-700 data-[state=checked]:border-primary-700'
					/>
					<span className='text-sm font-medium text-neutral-700 select-none'>
						Free Papers
					</span>
					<span className='text-xs text-neutral-500 ml-auto'>
						({freeResourcesCount})
					</span>
				</label>
			</div>

			{/* Horizontal scrollable container */}
			<div className='overflow-x-auto scrollbar-hide'>
				<div className='flex gap-2 p-4 min-w-min'>
					{/* All Resources chip */}
					<button
						onClick={handleAllResourcesSelect}
						className={`flex-shrink-0 px-4 py-2 rounded-none text-sm font-medium transition-colors whitespace-nowrap ${
							selectedCategory === null
								? 'bg-primary-700 text-white'
								: 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
						}`}>
						All Resources ({totalResourcesCount})
					</button>

					{/* Top-level category chips */}
					{categoriesData.map((category) => (
						<button
							key={category.id}
							onClick={() => handleCategorySelect(category.id)}
							className={`flex-shrink-0 px-4 py-2 rounded-none text-sm font-medium transition-colors whitespace-nowrap ${
								selectedCategory === category.id
									? 'bg-primary-700 text-white'
									: 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
							}`}>
							{category.name} ({category.count})
						</button>
					))}
				</div>
			</div>
		</div>
	);
});

CategoryTabBar.displayName = 'CategoryTabBar';

export default CategoryTabBar;