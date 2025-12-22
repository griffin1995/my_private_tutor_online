/**
 * Pagination Component
 * Page navigation with previous/next buttons and numbered pages
 * Optimised for performance with React.memo and memoised handlers
 * Following 2024-2025 React + TypeScript best practices
 */

'use client';

import React, { useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PaginationProps } from '@/types/exam-papers';

const Pagination: React.FC<PaginationProps> = React.memo(({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	// Memoised handlers for performance
	const handlePreviousPage = useCallback(() => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	}, [currentPage, onPageChange]);

	const handleNextPage = useCallback(() => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	}, [currentPage, totalPages, onPageChange]);

	const handlePageSelect = useCallback((page: number) => {
		onPageChange(page);
	}, [onPageChange]);

	// Memoised page numbers array
	const pageNumbers = useMemo(() =>
		Array.from({ length: totalPages }, (_, i) => i + 1),
		[totalPages]
	);

	// Don't render if there's only one page or no pages
	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className='flex items-center justify-center gap-2 mt-8'>
			<Button
				variant='outline'
				size='sm'
				onClick={handlePreviousPage}
				disabled={currentPage === 1}
				className='rounded-none'
				aria-label='Go to previous page'>
				Previous
			</Button>

			{pageNumbers.map((page) => (
				<Button
					key={page}
					variant={currentPage === page ? 'default' : 'outline'}
					size='sm'
					onClick={() => handlePageSelect(page)}
					className='min-w-[2.5rem] rounded-none'
					aria-label={`Go to page ${page}`}
					aria-current={currentPage === page ? 'page' : undefined}>
					{page}
				</Button>
			))}

			<Button
				variant='outline'
				size='sm'
				onClick={handleNextPage}
				disabled={currentPage === totalPages}
				className='rounded-none'
				aria-label='Go to next page'>
				Next
			</Button>
		</div>
	);
});

Pagination.displayName = 'Pagination';

export default Pagination;