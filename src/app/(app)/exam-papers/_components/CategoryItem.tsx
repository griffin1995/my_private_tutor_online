/**
 * CategoryItem Component
 * Recursive category tree item with collapsible subcategories
 * Optimised for performance with React.memo and useCallback
 * Following 2024-2025 React + TypeScript best practices
 */

'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { CategoryItemProps } from '@/types/exam-papers';

const CategoryItem: React.FC<CategoryItemProps> = React.memo(({
	category,
	selectedCategory,
	expandedCategories,
	onCategorySelect,
	toggleCategory,
	level = 0,
}) => {
	const hasChildren = Boolean(
		category.subcategories && category.subcategories.length > 0
	);
	const isExpanded = expandedCategories.has(category.id);
	const isSelected = selectedCategory === category.id;

	// Indentation increases with nesting level
	const marginLeft = level * 16; // 16px = 1rem per level

	// Memoised handlers for performance
	const handleToggle = React.useCallback(() => {
		toggleCategory(category.id);
	}, [toggleCategory, category.id]);

	const handleSelect = React.useCallback(() => {
		onCategorySelect(category.id);
	}, [onCategorySelect, category.id]);

	return (
		<li>
			<Collapsible open={isExpanded} onOpenChange={handleToggle}>
				<div
					className='flex items-center'
					style={{ marginLeft: `${marginLeft}px` }}>
					{hasChildren && (
						<CollapsibleTrigger asChild>
							<button
								className='p-1 hover:bg-neutral-100 flex-shrink-0 transition-transform rounded-none'
								aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.name}`}>
								<ChevronRight
									className={`w-4 h-4 transition-transform ${
										isExpanded ? 'rotate-90' : ''
									}`}
								/>
							</button>
						</CollapsibleTrigger>
					)}
					{!hasChildren && <div className='w-6' />}
					<button
						onClick={handleSelect}
						className={`flex-1 text-left px-3 py-2 transition-colors rounded-none ${
							isSelected
								? 'bg-primary-100 text-primary-900 font-medium'
								: 'text-neutral-600 hover:bg-neutral-100'
						} ${
							level === 0
								? 'font-medium'
								: level === 1
									? 'text-sm'
									: 'text-xs'
						}`}>
						{category.name}
						<span
							className={`text-neutral-500 ml-2 ${
								level === 2 ? 'text-xs' : 'text-sm'
							}`}>
							({category.count})
						</span>
					</button>
				</div>

				{/* Recursively render subcategories with Collapsible animation */}
				{hasChildren && (
					<CollapsibleContent className='mt-1'>
						<ul className='space-y-1'>
							{category.subcategories?.map((subCategory) => (
								<CategoryItem
									key={subCategory.id}
									category={subCategory}
									selectedCategory={selectedCategory}
									expandedCategories={expandedCategories}
									onCategorySelect={onCategorySelect}
									toggleCategory={toggleCategory}
									level={level + 1}
								/>
							))}
						</ul>
					</CollapsibleContent>
				)}
			</Collapsible>
		</li>
	);
});

CategoryItem.displayName = 'CategoryItem';

export default CategoryItem;