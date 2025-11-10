'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
	m,
	AnimatePresence,
	useAnimation,
	useMotionValue,
	useTransform,
} from 'framer-motion';
import {
	Search,
	Filter,
	X,
	Clock,
	Star,
	Target,
	ChevronRight,
	AlertCircle,
	Sparkles,
	Zap,
	Camera,
	ScanLine,
	Mic,
	Volume2,
} from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Section } from '@/components/layout/section';
import { FAQRecommendationEngine } from '@/lib/faq-recommendation-engine';
import { useFAQSearch, type SearchFilters } from '@/lib/search/use-faq-search';
import { useFAQAnalytics } from './faq-analytics-tracker';
import { FAQVisualSearch } from './faq-visual-search';
import { FAQVoiceSearch } from './faq-voice-search';
import type { FAQQuestion, FAQCategory } from '@/lib/cms/cms-content';
import { cn } from '@/lib/utils';
import { FAQErrorBoundary } from '@/components/error-boundary/FAQErrorBoundary';
import { FAQErrorFallback } from './faq-error-fallback';
import { useErrorRecovery } from '@/hooks/use-error-recovery';
interface FAQEnhancedSearchProps {
	questions: FAQQuestion[];
	categories: FAQCategory[];
	initialQuery?: string;
	initialFilters?: SearchFilters;
	showPerformanceStats?: boolean;
	className?: string;
	placeholder?: string;
	maxSuggestions?: number;
	ariaLabel?: string;
	ariaDescribedBy?: string;
	onSearchAnnounce?: (message: string) => void;
}
export function FAQEnhancedSearch({
	questions,
	categories,
	initialQuery = '',
	initialFilters = {},
	showPerformanceStats = false,
	className,
	placeholder = 'Search FAQ questions and answers...',
	maxSuggestions = 5,
	ariaLabel = 'Search frequently asked questions',
	ariaDescribedBy,
	onSearchAnnounce,
}: FAQEnhancedSearchProps) {
	const {
		handleError,
		isRecovering,
		retry,
		clearError,
		fallbackActive,
		errorMessage,
		canRetry,
	} = useErrorRecovery({
		component: 'FAQEnhancedSearch',
		feature: 'FAQ Search System',
		maxRetries: 3,
		enableFallback: true,
		enableReporting: true,
		enableAnalytics: true,
	});
	const {
		state,
		search,
		clearSearch,
		setQuery,
		setFilters,
		getSuggestions,
		selectSuggestion,
		highlightQuery,
		getPerformanceReport,
	} = useFAQSearch(questions, categories, {
		debounceMs: 150,
		maxSuggestions,
		enableAnalytics: true,
		performanceTracking: true,
		autoSearch: true,
		minQueryLength: 2,
		onError: (error) => {
			handleError(error, {
				searchQuery: state?.query,
				searchFilters: state?.filters,
				component: 'FAQSearch',
			});
		},
	});
	const [showFilters, setShowFilters] = useState(false);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [focusedSuggestion, setFocusedSuggestion] = useState(-1);
	const [isSearchActive, setIsSearchActive] = useState(false);
	const [suggestionHoverIndex, setSuggestionHoverIndex] = useState(-1);
	const [searchAnnouncement, setSearchAnnouncement] = useState('');
	const [searchResultsCount, setSearchResultsCount] = useState(0);
	const [showVisualSearch, setShowVisualSearch] = useState(false);
	const [visualSearchResults, setVisualSearchResults] = useState<any[]>([]);
	const [showVoiceSearch, setShowVoiceSearch] = useState(false);
	const [voiceSearchEnabled, setVoiceSearchEnabled] = useState(false);
	const searchProgress = useMotionValue(0);
	const searchScale = useTransform(searchProgress, [0, 1], [1, 1.02]);
	const searchGlow = useTransform(
		searchProgress,
		[0, 1],
		['0px 0px 0px rgba(59, 130, 246, 0)', '0px 0px 20px rgba(59, 130, 246, 0.3)'],
	);
	const searchControls = useAnimation();
	const filterControls = useAnimation();
	const suggestionControls = useAnimation();
	const searchInputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLDivElement>(null);
	const liveRegionRef = useRef<HTMLDivElement>(null);
	const descriptionRef = useRef<HTMLDivElement>(null);
	const searchContainerVariants = {
		idle: {
			scale: 1,
			boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
			borderColor: 'rgba(148, 163, 184, 0.5)',
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
		active: {
			scale: 1.02,
			boxShadow: '0 10px 25px rgba(59, 130, 246, 0.2)',
			borderColor: 'rgba(59, 130, 246, 1)',
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
		searching: {
			scale: 1.01,
			boxShadow: [
				'0 10px 25px rgba(59, 130, 246, 0.2)',
				'0 10px 25px rgba(59, 130, 246, 0.4)',
				'0 10px 25px rgba(59, 130, 246, 0.2)',
			],
			transition: {
				duration: 2,
				repeat: Infinity,
				ease: 'easeInOut',
			},
		},
	};
	const suggestionItemVariants = {
		hidden: {
			opacity: 0,
			x: -20,
			scale: 0.95,
			transition: {
				duration: 0.2,
			},
		},
		visible: {
			opacity: 1,
			x: 0,
			scale: 1,
			transition: {
				duration: 0.3,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
		hover: {
			x: 5,
			scale: 1.02,
			backgroundColor: 'rgba(59, 130, 246, 0.1)',
			transition: {
				duration: 0.2,
				ease: 'easeOut',
			},
		},
		tap: {
			scale: 0.98,
			transition: {
				duration: 0.1,
			},
		},
	};
	const filterPanelVariants = {
		collapsed: {
			height: 0,
			opacity: 0,
			y: -20,
			transition: {
				height: {
					duration: 0.3,
					ease: [0.04, 0.62, 0.23, 0.98],
				},
				opacity: {
					duration: 0.2,
				},
				y: {
					duration: 0.2,
				},
			},
		},
		expanded: {
			height: 'auto',
			opacity: 1,
			y: 0,
			transition: {
				height: {
					duration: 0.4,
					ease: [0.04, 0.62, 0.23, 0.98],
				},
				opacity: {
					duration: 0.3,
					delay: 0.1,
				},
				y: {
					duration: 0.3,
					delay: 0.1,
				},
			},
		},
	};
	const resultsStaggerVariants = {
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
	useEffect(() => {
		if (initialQuery) {
			setQuery(initialQuery);
		}
		if (Object.keys(initialFilters).length > 0) {
			setFilters(initialFilters);
		}
	}, [initialQuery, initialFilters, setQuery, setFilters]);
	const handleInputChange = (value: string) => {
		setQuery(value);
		setShowSuggestions(value.length > 0);
		setFocusedSuggestion(-1);
		if (value.length > 0) {
			setIsSearchActive(true);
			searchControls.start('active');
			searchProgress.set(1);
		} else {
			setIsSearchActive(false);
			searchControls.start('idle');
			searchProgress.set(0);
		}
		if (value.length > 2 && state.isSearching) {
			searchControls.start('searching');
		}
	};
	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (!showSuggestions || state.suggestions.length === 0) return;
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				setFocusedSuggestion((prev) =>
					prev < state.suggestions.length - 1 ? prev + 1 : 0,
				);
				break;
			case 'ArrowUp':
				event.preventDefault();
				setFocusedSuggestion((prev) =>
					prev > 0 ? prev - 1 : state.suggestions.length - 1,
				);
				break;
			case 'Enter':
				event.preventDefault();
				if (focusedSuggestion >= 0) {
					selectSuggestion(state.suggestions[focusedSuggestion]);
					setShowSuggestions(false);
				} else if (state.query.trim()) {
					search(state.query, state.filters);
					setShowSuggestions(false);
				}
				break;
			case 'Escape':
				setShowSuggestions(false);
				setFocusedSuggestion(-1);
				searchInputRef.current?.blur();
				break;
		}
	};
	const handleSuggestionClick = async (suggestion: string) => {
		await suggestionControls.start({
			scale: [1, 0.95, 1.1, 1],
			transition: {
				duration: 0.3,
				ease: 'easeInOut',
			},
		});
		selectSuggestion(suggestion);
		setShowSuggestions(false);
		setSuggestionHoverIndex(-1);
		searchInputRef.current?.focus();
		searchControls.start({
			boxShadow: [
				'0 10px 25px rgba(34, 197, 94, 0.3)',
				'0 4px 6px rgba(0, 0, 0, 0.1)',
			],
			transition: {
				duration: 0.6,
				ease: 'easeOut',
			},
		});
	};
	const handleSuggestionHover = (index: number, isHovering: boolean) => {
		setSuggestionHoverIndex(isHovering ? index : -1);
		setFocusedSuggestion(isHovering ? index : -1);
	};
	const handleFilterChange = (key: string, value: string) => {
		const newFilters = {
			...state.filters,
		};
		if (value === 'all' || value === '') {
			delete newFilters[key as keyof SearchFilters];
		} else {
			newFilters[key as keyof SearchFilters] = value;
		}
		setFilters(newFilters);
	};
	const handleClearSearch = () => {
		clearSearch();
		setShowSuggestions(false);
		setFocusedSuggestion(-1);
		searchInputRef.current?.focus();
	};
	const handleVisualSearchResults = useCallback(
		(results: any[]) => {
			setVisualSearchResults(results);
			if (!state.query.trim()) {
				setShowSuggestions(false);
			}
		},
		[state.query],
	);
	const handleOCRText = useCallback(
		(extractedText: string) => {
			if (extractedText.trim()) {
				setQuery(extractedText.trim());
				setShowVisualSearch(false);
			}
		},
		[setQuery],
	);
	const handleToggleVisualSearch = useCallback(() => {
		setShowVisualSearch((prev) => !prev);
		if (!showVisualSearch) {
			setShowSuggestions(false);
			setFocusedSuggestion(-1);
			setShowVoiceSearch(false);
		}
	}, [showVisualSearch]);
	const handleToggleVoiceSearch = useCallback(() => {
		setShowVoiceSearch((prev) => !prev);
		if (!showVoiceSearch) {
			setShowSuggestions(false);
			setFocusedSuggestion(-1);
			setShowVisualSearch(false);
		}
	}, [showVoiceSearch]);
	const handleVoiceSearchQuery = useCallback(
		(query: string) => {
			if (query?.trim()) {
				setQuery(query.trim());
				setShowSuggestions(false);
				setTimeout(() => {
					search(query.trim(), state.filters);
				}, 100);
			}
		},
		[setQuery, search, state.filters],
	);
	const handleVoiceCategorySelect = useCallback(
		(categoryId: string) => {
			handleFilterChange('category', categoryId);
			setShowVoiceSearch(false);
		},
		[handleFilterChange],
	);
	const handleVoiceQuestionSelect = useCallback(
		(questionId: string) => {
			const question = questions.find((q) => q.id === questionId);
			if (question) {
				setQuery(question.question);
				setShowSuggestions(false);
			}
		},
		[questions, setQuery],
	);
	const performanceReport = getPerformanceReport();
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const voiceSupported =
				'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
			setVoiceSearchEnabled(voiceSupported);
		}
	}, []);
	const isCompactMode = className?.includes('compact');
	return (
		<FAQErrorBoundary
			faqContext={{
				searchQuery: state?.query,
				categoryId: state?.filters?.category,
				filters: state?.filters,
				searchResults: state?.results,
				userType: 'visitor',
				feature: 'search',
			}}
			enableSearchFallback={true}
			enableThemeFallback={true}
			enableCachedResults={true}
			showAlternatives={true}
			contactSupport={true}
			onError={(error, errorInfo) => {
				handleError(error, {
					errorInfo,
					searchState: state,
					component: 'FAQEnhancedSearch',
				});
			}}
			fallback={
				fallbackActive ?
					<FAQErrorFallback
						errorCategory='search'
						affectedFeatures={['search', 'voice-search', 'visual-search']}
						enabledFallbacks={['basic-search', 'category-browse']}
						enableBasicSearch={true}
						enableCategoryBrowsing={true}
						onRetry={() => {
							clearError();
							retry();
						}}
						onFallbackActivated={(fallbackType) => {
							console.log('Activated fallback:', fallbackType);
						}}
					/>
				:	undefined
			}>
			<div
				className={cn(
					'relative',
					isCompactMode ? 'max-w-full' : 'max-w-4xl mx-auto',
					className,
				)}>
				{}
				{}
				<div className='relative'>
					<m.div
						className='relative'
						variants={searchContainerVariants}
						animate={searchControls}
						style={{
							scale: searchScale,
							boxShadow: searchGlow,
						}}>
						{}
						<m.div
							className={cn(
								'absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400',
								isCompactMode ? 'w-4 h-4' : 'w-5 h-5',
							)}
							animate={
								isSearchActive ?
									{
										scale: [1, 1.1, 1],
										color: [
											'rgb(148, 163, 184)',
											'rgb(59, 130, 246)',
											'rgb(59, 130, 246)',
										],
									}
								:	{}
							}
							transition={{
								duration: 0.6,
								ease: 'easeInOut',
							}}>
							<Search />
						</m.div>

						<Input
							ref={searchInputRef}
							type='search'
							placeholder={placeholder}
							value={state.query}
							onChange={(e) => handleInputChange(e.target.value)}
							onKeyDown={handleKeyDown}
							onFocus={() => {
								setShowSuggestions(state.suggestions.length > 0);
								setIsSearchActive(true);
								searchControls.start('active');
								searchProgress.set(1);
							}}
							onBlur={() => {
								setTimeout(() => {
									if (!state.query) {
										setIsSearchActive(false);
										searchControls.start('idle');
										searchProgress.set(0);
									}
								}, 200);
							}}
							className={cn(
								'border-2 border-transparent rounded-xl transition-all duration-300 bg-white/90 backdrop-blur-sm',
								isCompactMode ? 'pl-10 pr-16 h-10 text-sm' : 'pl-12 pr-24 h-14 text-lg',
							)}
							aria-label='Search FAQ questions and answers'
							aria-expanded={showSuggestions}
							aria-autocomplete='list'
							role='combobox'
						/>

						<div
							className={cn(
								'absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center',
								isCompactMode ? 'space-x-1' : 'space-x-2',
							)}>
							{}
							{!isCompactMode && voiceSearchEnabled && (
								<Button
									type='button'
									variant='ghost'
									size='sm'
									onClick={handleToggleVoiceSearch}
									className={cn(
										'p-0 hover:bg-purple-50 transition-colors duration-200',
										isCompactMode ? 'h-6 w-6' : 'h-8 w-8',
										showVoiceSearch && 'bg-purple-100 text-purple-600',
									)}
									title='Voice Search'
									aria-label='Toggle voice search mode'>
									<Mic
										className={cn(
											isCompactMode ? 'w-3 h-3' : 'w-4 h-4',
											showVoiceSearch && 'text-purple-600',
										)}
									/>
								</Button>
							)}

							{}
							{!isCompactMode && (
								<Button
									type='button'
									variant='ghost'
									size='sm'
									onClick={handleToggleVisualSearch}
									className={cn(
										'p-0 hover:bg-blue-50 transition-colors duration-200',
										isCompactMode ? 'h-6 w-6' : 'h-8 w-8',
										showVisualSearch && 'bg-blue-100 text-blue-600',
									)}
									title='Visual Search'
									aria-label='Toggle visual search mode'>
									<Camera
										className={cn(
											isCompactMode ? 'w-3 h-3' : 'w-4 h-4',
											showVisualSearch && 'text-blue-600',
										)}
									/>
								</Button>
							)}

							{}
							{state.lastSearchTime > 0 && !isCompactMode && (
								<Badge
									variant='outline'
									className={cn(
										'text-xs h-6',
										performanceReport.meetsTargets ?
											'text-green-700 border-green-300'
										:	'text-amber-700 border-amber-300',
									)}>
									<Clock className='w-3 h-3 mr-1' />
									{Math.round(state.lastSearchTime)}ms
								</Badge>
							)}

							{}
							{state.isSearching && (
								<div
									className={cn(
										'animate-spin border-2 border-accent-500 border-t-transparent rounded-full',
										isCompactMode ? 'w-4 h-4' : 'w-5 h-5',
									)}
								/>
							)}

							{}
							{state.query && (
								<Button
									type='button'
									variant='ghost'
									size='sm'
									onClick={handleClearSearch}
									className={cn(
										'p-0 hover:bg-slate-100',
										isCompactMode ? 'h-6 w-6' : 'h-8 w-8',
									)}
									aria-label='Clear search'>
									<X className={isCompactMode ? 'w-3 h-3' : 'w-4 h-4'} />
								</Button>
							)}
						</div>
					</m.div>

					{}
					{}
					<AnimatePresence>
						{showSuggestions && state.suggestions.length > 0 && (
							<m.div
								ref={suggestionsRef}
								initial={{
									opacity: 0,
									y: -20,
									scale: 0.95,
								}}
								animate={{
									opacity: 1,
									y: 0,
									scale: 1,
									transition: {
										duration: 0.3,
										ease: [0.25, 0.46, 0.45, 0.94],
									},
								}}
								exit={{
									opacity: 0,
									y: -20,
									scale: 0.95,
									transition: {
										duration: 0.2,
									},
								}}
								className='absolute top-full left-0 right-0 z-50 mt-2 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl overflow-hidden'
								role='listbox'>
								<m.div
									variants={resultsStaggerVariants}
									initial='hidden'
									animate='visible'>
									{state.suggestions.map((suggestion, index) => (
										<m.button
											key={suggestion}
											variants={suggestionItemVariants}
											whileHover='hover'
											whileTap='tap'
											onClick={() => handleSuggestionClick(suggestion)}
											onMouseEnter={() => handleSuggestionHover(index, true)}
											onMouseLeave={() => handleSuggestionHover(index, false)}
											className={cn(
												'w-full text-left px-4 py-3 border-b border-slate-100 last:border-b-0 flex items-center transition-colors duration-200',
												focusedSuggestion === index && 'bg-accent-50 text-accent-900',
												suggestionHoverIndex === index && 'bg-blue-50',
											)}
											role='option'
											aria-selected={focusedSuggestion === index}
											animate={suggestionControls}>
											<m.div
												className='w-4 h-4 mr-3'
												animate={
													suggestionHoverIndex === index ?
														{
															rotate: [0, 180, 360],
															scale: [1, 1.2, 1],
														}
													:	{}
												}
												transition={{
													duration: 0.6,
													ease: 'easeInOut',
												}}>
												<Sparkles className='w-4 h-4 text-slate-400' />
											</m.div>
											<span
												dangerouslySetInnerHTML={{
													__html: highlightQuery(suggestion, state.query),
												}}
											/>

											{}
											<m.div
												className='ml-auto'
												initial={{
													opacity: 0,
													x: -10,
												}}
												animate={
													suggestionHoverIndex === index ?
														{
															opacity: 1,
															x: 0,
														}
													:	{
															opacity: 0,
															x: -10,
														}
												}
												transition={{
													duration: 0.2,
													ease: 'easeOut',
												}}>
												<div className='w-2 h-2 bg-accent-400 rounded-full' />
											</m.div>
										</m.button>
									))}
								</m.div>
							</m.div>
						)}
					</AnimatePresence>
				</div>

				{}
				{}
				<AnimatePresence>
					{showVoiceSearch && voiceSearchEnabled && (
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
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
							className='mt-6'>
							<div className='bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 rounded-xl p-6 border border-purple-200'>
								<div className='flex items-center justify-between mb-4'>
									<div className='flex items-center space-x-2'>
										<Mic className='w-5 h-5 text-purple-600' />
										<h3 className='text-lg font-semibold text-slate-900'>Voice Search</h3>
										<Badge
											variant='secondary'
											className='text-xs'>
											Powered by Web Speech API
										</Badge>
									</div>
									<Button
										variant='ghost'
										size='sm'
										onClick={() => setShowVoiceSearch(false)}
										className='text-slate-500 hover:text-slate-700'>
										<X className='w-4 h-4' />
									</Button>
								</div>

								<FAQVoiceSearch
									questions={questions}
									categories={categories}
									onSearchQuery={handleVoiceSearchQuery}
									onCategorySelect={handleVoiceCategorySelect}
									onQuestionSelect={handleVoiceQuestionSelect}
									className='mt-4'
									enableTTS={true}
									enableAnalytics={true}
									debugMode={false}
								/>
							</div>
						</m.div>
					)}
				</AnimatePresence>

				{}
				{}
				<AnimatePresence>
					{showVisualSearch && (
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
								ease: [0.25, 0.46, 0.45, 0.94],
							}}
							className='mt-6'>
							<div className='bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 rounded-xl p-6 border border-blue-200'>
								<div className='flex items-center justify-between mb-4'>
									<div className='flex items-center space-x-2'>
										<ScanLine className='w-5 h-5 text-blue-600' />
										<h3 className='text-lg font-semibold text-slate-900'>
											Visual Search
										</h3>
										<Badge
											variant='secondary'
											className='text-xs'>
											Powered by OCR
										</Badge>
									</div>
									<Button
										variant='ghost'
										size='sm'
										onClick={() => setShowVisualSearch(false)}
										className='text-slate-500 hover:text-slate-700'>
										<X className='w-4 h-4' />
									</Button>
								</div>

								<FAQVisualSearch
									questions={questions}
									categories={categories}
									onSearchResults={handleVisualSearchResults}
									onOCRText={handleOCRText}
									className='mt-4'
									placeholder='Upload a screenshot or image of your issue for instant FAQ matching...'
								/>
							</div>
						</m.div>
					)}
				</AnimatePresence>

				{}
				{}
				{}
				{!isCompactMode && (
					<div className='flex flex-col sm:flex-row items-center justify-between mt-6 gap-4'>
						<div className='flex items-center space-x-4'>
							<Button
								variant={showFilters ? 'default' : 'outline'}
								onClick={() => setShowFilters(!showFilters)}
								className='h-10'>
								<Filter className='w-4 h-4 mr-2' />
								Filters
								{Object.keys(state.filters).length > 0 && (
									<Badge className='ml-2 bg-accent-600 text-white'>
										{Object.keys(state.filters).length}
									</Badge>
								)}
							</Button>

							{}
							{Object.entries(state.filters).map(([key, value]) => (
								<Badge
									key={key}
									variant='secondary'
									className='flex items-center space-x-1'>
									<span className='capitalize'>
										{key}: {value}
									</span>
									<button
										onClick={() => handleFilterChange(key, '')}
										className='ml-1 text-slate-500 hover:text-slate-700'>
										<X className='w-3 h-3' />
									</button>
								</Badge>
							))}
						</div>

						{}
						{state.hasSearched && (
							<div className='text-sm text-slate-600'>
								{state.results.length} result{state.results.length !== 1 ? 's' : ''}{' '}
								found
								{state.query && (
									<span className='ml-1 font-medium'>for "{state.query}"</span>
								)}
							</div>
						)}
					</div>
				)}

				{}
				{}
				{!isCompactMode && (
					<AnimatePresence>
						{showFilters && (
							<m.div
								variants={filterPanelVariants}
								initial='collapsed'
								animate='expanded'
								exit='collapsed'
								className='bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-xl p-6 mt-4 border border-slate-200 shadow-lg backdrop-blur-sm'
								style={{
									overflow: 'hidden',
								}}>
								<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
									{}
									<div>
										<label className='block text-sm font-medium text-slate-700 mb-2'>
											Category
										</label>
										<Select
											value={state.filters.category || 'all'}
											onValueChange={(value) => handleFilterChange('category', value)}>
											<SelectTrigger>
												<SelectValue placeholder='All Categories' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='all'>All Categories</SelectItem>
												{categories.map((category) => (
													<SelectItem
														key={category.id}
														value={category.id}>
														<span className='flex items-center'>
															<span className='mr-2'>{category.icon}</span>
															{category.name}
														</span>
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>

									{}
									<div>
										<label className='block text-sm font-medium text-slate-700 mb-2'>
											Difficulty
										</label>
										<Select
											value={state.filters.difficulty || 'all'}
											onValueChange={(value) => handleFilterChange('difficulty', value)}>
											<SelectTrigger>
												<SelectValue placeholder='All Difficulties' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='all'>All Difficulties</SelectItem>
												<SelectItem value='basic'>Basic</SelectItem>
												<SelectItem value='intermediate'>Intermediate</SelectItem>
												<SelectItem value='advanced'>Advanced</SelectItem>
											</SelectContent>
										</Select>
									</div>

									{}
									<div>
										<label className='block text-sm font-medium text-slate-700 mb-2'>
											Client Type
										</label>
										<Select
											value={state.filters.clientSegment || 'all'}
											onValueChange={(value) =>
												handleFilterChange('clientSegment', value)
											}>
											<SelectTrigger>
												<SelectValue placeholder='All Clients' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='all'>All Clients</SelectItem>
												<SelectItem value='oxbridge_prep'>Oxbridge Prep</SelectItem>
												<SelectItem value='11_plus'>11+ Parents</SelectItem>
												<SelectItem value='elite_corporate'>Elite Corporate</SelectItem>
												<SelectItem value='comparison_shopper'>
													Comparison Shoppers
												</SelectItem>
											</SelectContent>
										</Select>
									</div>

									{}
									<div>
										<label className='block text-sm font-medium text-slate-700 mb-2'>
											Results
										</label>
										<Select
											value={state.filters.limit?.toString() || '20'}
											onValueChange={(value) => handleFilterChange('limit', value)}>
											<SelectTrigger>
												<SelectValue placeholder='Results per page' />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value='10'>10 Results</SelectItem>
												<SelectItem value='20'>20 Results</SelectItem>
												<SelectItem value='50'>50 Results</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</m.div>
						)}
					</AnimatePresence>
				)}

				{}
				{!isCompactMode &&
					showPerformanceStats &&
					state.performanceStats.totalSearches > 0 && (
						<m.div
							className='bg-slate-100 rounded-lg p-4 mt-4'
							initial={{
								opacity: 0,
							}}
							animate={{
								opacity: 1,
							}}
							transition={{
								duration: 0.3,
							}}>
							<div className='flex items-center justify-between text-sm'>
								<div className='flex items-center space-x-4'>
									<div className='flex items-center space-x-1'>
										<Zap className='w-4 h-4 text-accent-600' />
										<span>
											Avg: {Math.round(state.performanceStats.averageSearchTime)}ms
										</span>
									</div>
									<div>Searches: {state.performanceStats.totalSearches}</div>
									<Badge
										variant={performanceReport.meetsTargets ? 'default' : 'destructive'}
										size='sm'>
										{state.performanceStats.performanceRating}
									</Badge>
								</div>

								{!performanceReport.meetsTargets &&
									performanceReport.recommendations.length > 0 && (
										<button
											className='text-amber-600 text-xs underline'
											onClick={() =>
												console.log(
													'Performance recommendations:',
													performanceReport.recommendations,
												)
											}>
											View Recommendations
										</button>
									)}
							</div>
						</m.div>
					)}

				{}
				{!isCompactMode && state.error && (
					<m.div
						initial={{
							opacity: 0,
							y: -10,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						className='bg-red-50 border border-red-200 rounded-lg p-4 mt-4 flex items-center space-x-2'>
						<AlertCircle className='w-5 h-5 text-red-600' />
						<span className='text-red-800'>{state.error}</span>
					</m.div>
				)}

				{}
				{}
				{!isCompactMode && state.hasSearched && (
					<m.div
						className='mt-8'
						variants={resultsStaggerVariants}
						initial='hidden'
						animate='visible'>
						{state.results.length > 0 ?
							<div className='space-y-6'>
								{state.results.map((result, index) => (
									<m.div
										key={result.item.id}
										variants={{
											hidden: {
												opacity: 0,
												y: 30,
												scale: 0.95,
												rotateX: -5,
											},
											visible: {
												opacity: 1,
												y: 0,
												scale: 1,
												rotateX: 0,
												transition: {
													duration: 0.6,
													delay: index * 0.08,
													ease: [0.25, 0.46, 0.45, 0.94],
													type: 'spring',
													stiffness: 300,
													damping: 25,
												},
											},
										}}
										whileHover={{
											y: -5,
											scale: 1.02,
											boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
											transition: {
												duration: 0.3,
												ease: 'easeOut',
											},
										}}
										whileTap={{
											scale: 0.98,
											transition: {
												duration: 0.1,
											},
										}}>
										<Card className='bg-white border-2 border-slate-100 hover:border-slate-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300'>
											<CardContent className='p-6'>
												<div className='flex items-start justify-between mb-4'>
													<div className='flex-1'>
														{}
														<h3
															className='text-xl font-semibold text-slate-900 mb-3'
															dangerouslySetInnerHTML={{
																__html: result.highlighted.question,
															}}
														/>

														{}
														<div className='flex flex-wrap items-center gap-3 mb-4'>
															{result.category && (
																<Link
																	href={`/faq/${result.category.id}`}
																	className='flex items-center space-x-2 text-sm text-accent-600 hover:text-accent-700 transition-colors'>
																	<span>{result.category.icon}</span>
																	<span>{result.category.name}</span>
																</Link>
															)}

															{result.item.difficulty && (
																<Badge
																	variant={
																		result.item.difficulty === 'advanced' ? 'destructive'
																		: result.item.difficulty === 'intermediate' ?
																			'default'
																		:	'secondary'
																	}>
																	{result.item.difficulty}
																</Badge>
															)}

															{result.item.featured && (
																<Badge variant='outline'>
																	<Star className='w-3 h-3 mr-1' />
																	Featured
																</Badge>
															)}

															{result.score && (
																<Badge
																	variant='outline'
																	className='text-xs'>
																	<Target className='w-3 h-3 mr-1' />
																	{Math.round((1 - result.score) * 100)}% match
																</Badge>
															)}
														</div>
													</div>
												</div>

												{}
												<div className='prose prose-slate max-w-none mb-4'>
													<p
														className='text-slate-700 leading-relaxed'
														dangerouslySetInnerHTML={{
															__html:
																result.highlighted.answer.length > 300 ?
																	`${result.highlighted.answer.slice(0, 300)}...`
																:	result.highlighted.answer,
														}}
													/>
												</div>

												{}
												{result.highlighted.tags.length > 0 && (
													<div className='flex flex-wrap gap-2 mb-4'>
														{result.highlighted.tags.slice(0, 5).map((tag, tagIndex) => (
															<Badge
																key={tagIndex}
																variant='outline'
																size='sm'
																className='text-xs'>
																<span
																	dangerouslySetInnerHTML={{
																		__html: tag,
																	}}
																/>
															</Badge>
														))}
													</div>
												)}

												{}
												<div className='flex items-center justify-between'>
													<div className='text-sm text-slate-500'>
														Priority: {result.item.priority}/10
														{result.item.lastUpdated && (
															<span className='ml-2'>
																Updated:{' '}
																{new Date(result.item.lastUpdated).toLocaleDateString()}
															</span>
														)}
													</div>

													{result.category && (
														<Link
															href={`/faq/${result.category.id}#${result.item.id}`}
															className='flex items-center space-x-2 text-sm text-accent-600 hover:text-accent-700 transition-colors font-medium'>
															<span>View Full Answer</span>
															<ChevronRight className='w-4 h-4' />
														</Link>
													)}
												</div>
											</CardContent>
										</Card>
									</m.div>
								))}
							</div>
						:	<m.div
								className='text-center py-16'
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
								}}>
								<AlertCircle className='w-16 h-16 text-slate-300 mx-auto mb-6' />
								<h3 className='text-2xl font-semibold text-slate-900 mb-4'>
									No results found
								</h3>
								<p className='text-lg text-slate-600 mb-8 max-w-2xl mx-auto'>
									{state.query ?
										`We couldn't find any FAQ items matching "${state.query}". Try adjusting your search terms or filters.`
									:	'Try entering a search query to find relevant FAQ items.'}
								</p>

								{}
								{categories.length > 0 && (
									<div>
										<p className='text-sm font-semibold text-slate-700 mb-4'>
											Browse by category:
										</p>
										<div className='flex flex-wrap justify-center gap-3'>
											{categories.slice(0, 6).map((category) => (
												<button
													key={category.id}
													onClick={() => handleFilterChange('category', category.id)}
													className='inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm text-slate-700 transition-colors'>
													<span>{category.icon}</span>
													<span>{category.name}</span>
												</button>
											))}
										</div>
									</div>
								)}
							</m.div>
						}
					</m.div>
				)}
			</div>
		</FAQErrorBoundary>
	);
}
