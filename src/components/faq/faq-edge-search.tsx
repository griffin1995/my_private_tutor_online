'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Search, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
interface SearchResult {
	question: {
		id: string;
		question: string;
		answer: string;
		priority: number;
		featured: boolean;
	};
	category: {
		id: string;
		title: string;
	};
	score: number;
	highlighted: {
		question: string;
		answer: string;
	};
}
interface SearchResponse {
	results: SearchResult[];
	metadata: {
		query: string;
		totalResults: number;
		executionTime: number;
		cached: boolean;
	};
}
const ITEMS_PER_PAGE = 20;
const VIRTUAL_SCROLL_THRESHOLD = 100;
export function FAQEdgeSearch() {
	const [searchQuery, setSearchQuery] = useState('');
	const [results, setResults] = useState<SearchResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [metadata, setMetadata] = useState<SearchResponse['metadata'] | null>(
		null,
	);
	const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
	const [hasMore, setHasMore] = useState(false);
	const [offset, setOffset] = useState(0);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const loadingMoreRef = useRef(false);
	const debouncedQuery = useDebounce(searchQuery, 300);
	const performSearch = useCallback(async (query: string, searchOffset = 0) => {
		if (!query || query.length < 2) {
			setResults([]);
			setMetadata(null);
			setHasMore(false);
			return;
		}
		if (loadingMoreRef.current && searchOffset > 0) return;
		if (searchOffset === 0) {
			setLoading(true);
		} else {
			loadingMoreRef.current = true;
		}
		try {
			const params = new URLSearchParams({
				q: query,
				limit: ITEMS_PER_PAGE.toString(),
				offset: searchOffset.toString(),
			});
			const response = await fetch(`/api/faq/search?${params}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error('Search request failed');
			}
			const data: SearchResponse = await response.json();
			if (searchOffset === 0) {
				setResults(data.results);
			} else {
				setResults((prev) => [...prev, ...data.results]);
			}
			setMetadata(data.metadata);
			setHasMore(data.metadata.totalResults > searchOffset + data.results.length);
			setOffset(searchOffset + data.results.length);
			if (data.metadata.executionTime > 100) {
				console.warn(
					`FAQ search took ${data.metadata.executionTime}ms (target: <100ms)`,
				);
			}
		} catch (error) {
			console.error('Search error:', error);
			setResults([]);
			setMetadata(null);
		} finally {
			setLoading(false);
			loadingMoreRef.current = false;
		}
	}, []);
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setOffset(0);
	};
	const toggleExpanded = (id: string) => {
		setExpandedItems((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	};
	const handleScroll = useCallback(() => {
		if (!scrollContainerRef.current || !hasMore || loadingMoreRef.current) return;
		const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
		if (scrollHeight - scrollTop - clientHeight < VIRTUAL_SCROLL_THRESHOLD) {
			performSearch(debouncedQuery, offset);
		}
	}, [debouncedQuery, offset, hasMore, performSearch]);
	useEffect(() => {
		if (debouncedQuery) {
			setOffset(0);
			performSearch(debouncedQuery, 0);
		} else {
			setResults([]);
			setMetadata(null);
		}
	}, [debouncedQuery, performSearch]);
	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;
		container.addEventListener('scroll', handleScroll);
		return () => container.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);
	return (
		<div className='w-full'>
			<div className='relative'>
				<label
					htmlFor='faq-edge-search'
					className='sr-only'>
					Search frequently asked questions
				</label>
				<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5' />
				<input
					id='faq-edge-search'
					type='text'
					placeholder='Search FAQ questions...'
					value={searchQuery}
					onChange={handleSearchChange}
					className={cn(
						'w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg',
						'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
						'text-slate-900 placeholder-slate-500',
						'transition-all duration-200',
					)}
					aria-describedby='search-status'
				/>
				{loading && offset === 0 && (
					<Loader2 className='absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 h-5 w-5 animate-spin' />
				)}
			</div>

			{metadata && (
				<div
					id='search-status'
					className='mt-2 text-sm text-slate-600'>
					<span>{metadata.totalResults} results found</span>
					{metadata.executionTime && (
						<span className='ml-2 text-slate-400'>({metadata.executionTime}ms)</span>
					)}
					{metadata.cached && <span className='ml-2 text-green-600'>• Cached</span>}
				</div>
			)}

			<div
				ref={scrollContainerRef}
				className='mt-6 space-y-3 max-h-[600px] overflow-y-auto'
				role='region'
				aria-label='Search results'
				aria-live='polite'>
				{results.length === 0 && debouncedQuery && !loading && (
					<div className='text-center py-8 text-slate-600'>
						No results found for "{debouncedQuery}"
					</div>
				)}

				{results.map((result) => (
					<div
						key={result.question.id}
						className='bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
						<button
							onClick={() => toggleExpanded(result.question.id)}
							className='w-full px-6 py-4 text-left flex items-start justify-between group'
							aria-expanded={expandedItems.has(result.question.id)}>
							<div className='flex-1 pr-4'>
								<div className='flex items-start gap-3'>
									<div className='flex-1'>
										<h3
											className='font-medium text-slate-900 group-hover:text-primary-700'
											dangerouslySetInnerHTML={{
												__html: result.highlighted.question,
											}}
										/>
										<p className='text-sm text-slate-500 mt-1'>{result.category.title}</p>
									</div>
									{result.question.featured && (
										<span className='px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded'>
											Featured
										</span>
									)}
								</div>
							</div>
							<div className='flex-shrink-0 ml-2'>
								{expandedItems.has(result.question.id) ?
									<ChevronUp className='h-5 w-5 text-slate-400' />
								:	<ChevronDown className='h-5 w-5 text-slate-400' />}
							</div>
						</button>

						{expandedItems.has(result.question.id) && (
							<div className='px-6 pb-4 border-t border-slate-100'>
								<div
									className='prose prose-slate max-w-none mt-4'
									dangerouslySetInnerHTML={{
										__html: result.highlighted.answer,
									}}
								/>
							</div>
						)}
					</div>
				))}

				{hasMore && (
					<div className='text-center py-4'>
						<Loader2 className='h-6 w-6 text-primary-500 animate-spin mx-auto' />
						<span className='text-sm text-slate-600 mt-2'>Loading more...</span>
					</div>
				)}
			</div>
		</div>
	);
}
