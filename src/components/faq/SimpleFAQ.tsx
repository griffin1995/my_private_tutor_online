'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import FlexSearch from 'flexsearch';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { PageLayout } from '@/components/layout/page-layout';
import { getFaqIconComponent } from '@/components/faq/FaqIcons';
import type { FAQCategory, FAQQuestion } from '@/lib/cms/cms-content';

interface SimpleFAQProps {
	readonly categories: readonly FAQCategory[];
	readonly hero: {
		readonly title: string;
		readonly subtitle: string;
		readonly description: string;
	};
	readonly contact: {
		readonly title: string;
		readonly description: string;
		readonly phone: string;
		readonly email: string;
	};
}

interface SearchResult {
	readonly question: FAQQuestion;
	readonly category: FAQCategory;
	readonly score: number;
}

export function SimpleFAQ({ categories, hero, contact }: SimpleFAQProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchResults, setSearchResults] = useState<readonly SearchResult[]>([]);
	const [searchIndex, setSearchIndex] = useState<FlexSearch.Index | null>(null);

	// Initialize FlexSearch index
	const indexData = useMemo(() => {
		const index = new FlexSearch.Index({
			tokenize: 'forward',
			encode: 'simple',
			threshold: 0.3,
		});

		const items: Array<{
			id: string;
			question: FAQQuestion;
			category: FAQCategory;
			searchText: string;
		}> = [];

		categories.forEach((category) => {
			category.questions.forEach((question) => {
				const searchText = `${question.question} ${question.answer} ${category.title}`.toLowerCase();
				const id = `${category.id}-${question.id}`;

				items.push({
					id,
					question,
					category,
					searchText,
				});

				index.add(id, searchText);
			});
		});

		return { index, items };
	}, [categories]);

	// Update search index when data changes
	useEffect(() => {
		setSearchIndex(indexData.index);
	}, [indexData]);

	// Perform search with FlexSearch
	const performSearch = useCallback((query: string) => {
		if (!query.trim() || !searchIndex) {
			setSearchResults([]);
			return;
		}

		const searchTerm = query.toLowerCase();
		const results = searchIndex.search(searchTerm);

		const searchResults: SearchResult[] = results
			.map((id) => {
				const item = indexData.items.find((item) => item.id === id);
				if (!item) return null;

				// Calculate basic score based on query match
				let score = 0;
				if (item.question.question.toLowerCase().includes(searchTerm)) {
					score += 10; // Higher score for question matches
				}
				if (item.question.answer.toLowerCase().includes(searchTerm)) {
					score += 5; // Lower score for answer matches
				}
				if (item.category.title.toLowerCase().includes(searchTerm)) {
					score += 3; // Category match
				}

				return {
					question: item.question,
					category: item.category,
					score,
				};
			})
			.filter((result): result is SearchResult => result !== null)
			.sort((a, b) => b.score - a.score);

		setSearchResults(searchResults);
	}, [searchIndex, indexData.items]);

	// Filter categories based on search
	const filteredCategories = useMemo(() => {
		if (!searchQuery.trim()) {
			return categories;
		}

		if (searchResults.length === 0) {
			return [];
		}

		// Group search results by category
		const resultsByCategory = new Map<string, FAQQuestion[]>();
		searchResults.forEach(({ question, category }) => {
			const existing = resultsByCategory.get(category.id) || [];
			existing.push(question);
			resultsByCategory.set(category.id, existing);
		});

		// Return categories with their matching questions
		return categories
			.map((category) => ({
				...category,
				questions: resultsByCategory.get(category.id) || [],
			}))
			.filter((category) => category.questions.length > 0);
	}, [categories, searchQuery, searchResults]);

	const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearchQuery(query);
		performSearch(query);
	}, [performSearch]);

	const clearSearch = useCallback(() => {
		setSearchQuery('');
		setSearchResults([]);
	}, []);

	const totalResults = useMemo(() => {
		return filteredCategories.reduce((sum, cat) => sum + cat.questions.length, 0);
	}, [filteredCategories]);

	return (
		<PageLayout
			background='white'
			showHeader={true}
			showFooter={true}
		>
			<div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
				{/* Hero Section */}
				<section className='bg-gradient-to-r from-primary-900 to-primary-800 text-white py-16 lg:py-24'>
					<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						<h1 className='text-3xl lg:text-5xl font-serif font-bold mb-6'>
							{hero.title}
						</h1>
						<p className='text-lg lg:text-xl text-primary-100 mb-8 max-w-2xl mx-auto'>
							{hero.subtitle}
						</p>
					</div>
				</section>

				{/* Search Section */}
				<section className='py-8 bg-white border-b border-slate-200'>
					<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
						<div className='relative max-w-2xl mx-auto'>
							<label htmlFor='faq-search' className='sr-only'>
								Search frequently asked questions
							</label>
							<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5' />
							<input
								id='faq-search'
								type='text'
								placeholder='Search frequently asked questions...'
								value={searchQuery}
								onChange={handleSearchChange}
								className={cn(
									'w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg',
									'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
									'text-slate-900 placeholder-slate-500',
									'transition-all duration-200',
								)}
							/>
						</div>

						{/* Search Results Info */}
						{searchQuery && (
							<div className='text-center mt-4'>
								<p className='text-sm text-slate-600'>
									{totalResults} result{totalResults !== 1 ? 's' : ''} found for "{searchQuery}"
								</p>
								<button
									onClick={clearSearch}
									className='ml-2 text-sm text-primary-600 hover:text-primary-700 underline'
								>
									Clear search
								</button>
							</div>
						)}
					</div>
				</section>

				{/* FAQ Content */}
				<main className='py-12'>
					<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
						{filteredCategories.length === 0 && searchQuery ? (
							// No results state
							<div className='text-center py-12'>
								<div className='text-6xl mb-4'>🤔</div>
								<h2 className='text-2xl font-serif font-semibold text-slate-900 mb-4'>
									No results found
								</h2>
								<p className='text-slate-600 mb-6'>
									We couldn't find any questions matching "{searchQuery}". Try different keywords or browse all categories.
								</p>
								<button
									onClick={clearSearch}
									className='bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200'
								>
									Show all questions
								</button>
							</div>
						) : (
							// FAQ Categories
							<div className='space-y-8'>
								{filteredCategories.map((category) => (
									<section key={category.id} className='space-y-4'>
										<div className='flex items-center space-x-3 mb-6'>
											{(() => {
												const IconComponent = getFaqIconComponent(category.title);
												return (
													<IconComponent
														width={32}
														height={32}
														aria-label={`${category.title} icon`}
														className='flex-shrink-0'
													/>
												);
											})()}
											<h2 className='text-2xl font-serif font-bold text-slate-900'>
												{category.title}
											</h2>
											<span className='bg-slate-100 text-slate-600 text-sm px-3 py-1 rounded-full'>
												{category.questions.length} question{category.questions.length !== 1 ? 's' : ''}
											</span>
										</div>

										<Accordion type='multiple' className='space-y-2'>
											{category.questions.map((question, index) => (
												<AccordionItem
													key={`${category.id}-${index}`}
													value={`${category.id}-${index}`}
													className='bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'
												>
													<AccordionTrigger className='px-6 py-4 text-left font-medium text-slate-900 hover:text-primary-700'>
														{question.question}
													</AccordionTrigger>
													<AccordionContent className='px-6 pb-4'>
														<div className='prose prose-slate max-w-none'>
															<p className='text-slate-700 leading-relaxed whitespace-pre-line'>
																{question.answer}
															</p>
														</div>
													</AccordionContent>
												</AccordionItem>
											))}
										</Accordion>
									</section>
								))}
							</div>
						)}
					</div>
				</main>

				{/* Contact Section */}
				<section className='bg-slate-50 py-16'>
					<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
						<h2 className='text-3xl font-serif font-bold text-slate-900 mb-4'>
							{contact.title}
						</h2>
						<p className='text-lg text-slate-600 mb-8 max-w-2xl mx-auto'>
							{contact.description}
						</p>

						<div className='grid md:grid-cols-2 gap-6 max-w-2xl mx-auto'>
							<a
								href={`mailto:${contact.email}`}
								className={cn(
									'bg-white border border-slate-200 rounded-lg p-6',
									'hover:border-primary-300 hover:shadow-lg transition-all duration-200',
									'group focus:ring-2 focus:ring-primary-500 focus:outline-none',
								)}
							>
								<div className='text-primary-600 mb-3 group-hover:text-primary-700'>
									<svg className='w-8 h-8 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
										/>
									</svg>
								</div>
								<h3 className='font-semibold text-slate-900 mb-2'>Email Us</h3>
								<p className='text-slate-600 text-sm'>{contact.email}</p>
							</a>

							<a
								href={`tel:${contact.phone}`}
								className={cn(
									'bg-white border border-slate-200 rounded-lg p-6',
									'hover:border-primary-300 hover:shadow-lg transition-all duration-200',
									'group focus:ring-2 focus:ring-primary-500 focus:outline-none',
								)}
							>
								<div className='text-primary-600 mb-3 group-hover:text-primary-700'>
									<svg className='w-8 h-8 mx-auto' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
										/>
									</svg>
								</div>
								<h3 className='font-semibold text-slate-900 mb-2'>Call Us</h3>
								<p className='text-slate-600 text-sm'>{contact.phone}</p>
							</a>
						</div>
					</div>
				</section>
			</div>
		</PageLayout>
	);
}