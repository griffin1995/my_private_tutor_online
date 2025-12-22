/**
 * CategorySidebar Component
 * Left sidebar with category tree and free filter checkbox
 * Optimised for performance with proper state management
 * Following 2024-2025 React + TypeScript best practices
 */

'use client';

import React, { useState, useCallback } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { CategorySidebarProps } from '@/types/exam-papers';
import CategoryItem from './CategoryItem';
import categoriesData from '@/content/exam-papers/categories.json';
import resourcesData from '@/content/exam-papers/resources.json';

const CategorySidebar: React.FC<CategorySidebarProps> = React.memo(({
	selectedCategory,
	onCategorySelect,
	showFreeOnly,
	onFreeFilterChange,
}) => {
	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
		new Set()
	);

	const toggleCategory = useCallback((categoryId: string) => {
		setExpandedCategories(prev => {
			const newExpanded = new Set(prev);
			if (newExpanded.has(categoryId)) {
				newExpanded.delete(categoryId);
			} else {
				newExpanded.add(categoryId);
			}
			return newExpanded;
		});
	}, []);

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
		<aside className='hidden lg:block pr-4 sm:pr-6 lg:pr-8 border-r border-neutral-200'>
			<div className='py-4 sm:py-6 lg:py-6'>
				<h2 className='font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-4 px-2 sm:px-3 md:px-3 text-neutral-600'>
					Categories
				</h2>

				{/* Free Resources Filter - Independent checkbox above categories */}
				<div className='mb-4 pb-4 border-b border-neutral-200'>
					<label className='flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-neutral-50 transition-colors rounded-none'>
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

				<nav aria-label='Resource categories'>
					<ul className='space-y-2'>
						{/* All Resources option */}
						<li>
							<button
								onClick={handleAllResourcesSelect}
								className={`w-full text-left px-3 py-2 transition-colors rounded-none ${
									selectedCategory === null
										? 'bg-primary-100 text-primary-900 font-medium'
										: '!text-neutral-600 hover:bg-neutral-100'
								}`}>
								All Resources
								<span className='text-sm text-neutral-500 ml-2'>
									({totalResourcesCount})
								</span>
							</button>
						</li>

						{/* Recursive category tree */}
						{categoriesData.map((category) => (
							<CategoryItem
								key={category.id}
								category={category}
								selectedCategory={selectedCategory}
								expandedCategories={expandedCategories}
								onCategorySelect={handleCategorySelect}
								toggleCategory={toggleCategory}
								level={0}
							/>
						))}
					</ul>
				</nav>
			</div>
		</aside>
	);
});

CategorySidebar.displayName = 'CategorySidebar';

export default CategorySidebar;