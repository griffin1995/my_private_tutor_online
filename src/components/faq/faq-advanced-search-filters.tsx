'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
	ChevronDown,
	Filter,
	X,
	Search,
	Calendar,
	Star,
	Tag,
	Users,
	Clock,
	RefreshCw,
	BookOpen,
	Zap,
} from 'lucide-react';
import type {
	FAQQuestion,
	FAQCategory,
	FAQSearchFilters,
} from '@/lib/cms/cms-content';
export interface AdvancedSearchFilters extends FAQSearchFilters {
	categories: string[];
	categoryLogic: 'AND' | 'OR';
	dateRange: {
		from?: Date;
		to?: Date;
		preset?: 'today' | 'week' | 'month' | 'quarter' | 'year';
	};
	includeTags: string[];
	excludeTags: string[];
	tagLogic: 'AND' | 'OR';
	minViews?: number;
	minRating?: number;
	minHelpfulness?: number;
	showTrending: boolean;
	contentLength: 'short' | 'medium' | 'long' | 'any';
	answerComplexity: 'basic' | 'intermediate' | 'advanced' | 'any';
	readingTime: {
		min?: number;
		max?: number;
	};
	clientSegments: string[];
	journeyStage: 'awareness' | 'consideration' | 'decision' | 'retention' | 'any';
	featuredOnly: boolean;
	priorityRange: {
		min: number;
		max: number;
	};
	groupBy: 'category' | 'difficulty' | 'popularity' | 'date' | 'none';
	sortBy: 'relevance' | 'date' | 'popularity' | 'alphabetical' | 'priority';
	sortOrder: 'asc' | 'desc';
}
export interface FilterPreset {
	id: string;
	name: string;
	description: string;
	filters: Partial<AdvancedSearchFilters>;
	icon: React.ComponentType<any>;
	category: 'popular' | 'custom' | 'recent';
	usageCount: number;
	lastUsed?: Date;
}
export interface FAQAdvancedSearchFiltersProps {
	categories: FAQCategory[];
	allTags: string[];
	clientSegments: string[];
	filters: AdvancedSearchFilters;
	onFiltersChange: (filters: AdvancedSearchFilters) => void;
	totalResults: number;
	searchQuery: string;
	className?: string;
	showFilterCount?: boolean;
	showPresets?: boolean;
	showSaveFilter?: boolean;
	compact?: boolean;
	allowCustomPresets?: boolean;
	maxSavedFilters?: number;
	showFilterAnalytics?: boolean;
	onPresetSelect?: (preset: FilterPreset) => void;
	onPresetSave?: (
		preset: Omit<FilterPreset, 'id' | 'usageCount' | 'lastUsed'>,
	) => void;
	onFilterReset?: () => void;
	onFilterAnalytics?: (action: string, filterType: string, value: any) => void;
}
const DEFAULT_FILTERS: AdvancedSearchFilters = {
	categories: [],
	categoryLogic: 'OR',
	dateRange: {},
	includeTags: [],
	excludeTags: [],
	tagLogic: 'OR',
	showTrending: false,
	contentLength: 'any',
	answerComplexity: 'any',
	readingTime: {},
	clientSegments: [],
	journeyStage: 'any',
	featuredOnly: false,
	priorityRange: {
		min: 1,
		max: 10,
	},
	groupBy: 'none',
	sortBy: 'relevance',
	sortOrder: 'desc',
};
const DEFAULT_PRESETS: FilterPreset[] = [
	{
		id: 'popular-content',
		name: 'Popular Content',
		description: 'Most viewed and highly rated FAQs',
		filters: {
			minViews: 100,
			minRating: 4,
			showTrending: true,
			sortBy: 'popularity',
			sortOrder: 'desc',
		},
		icon: Star,
		category: 'popular',
		usageCount: 0,
	},
	{
		id: 'recent-updates',
		name: 'Recent Updates',
		description: 'Recently updated or new FAQs',
		filters: {
			dateRange: {
				preset: 'month',
			},
			sortBy: 'date',
			sortOrder: 'desc',
		},
		icon: Clock,
		category: 'popular',
		usageCount: 0,
	},
	{
		id: 'oxbridge-prep',
		name: 'Oxbridge Preparation',
		description: 'Content for Oxbridge preparation clients',
		filters: {
			clientSegments: ['oxbridge_prep'],
			answerComplexity: 'advanced',
			featuredOnly: true,
		},
		icon: BookOpen,
		category: 'popular',
		usageCount: 0,
	},
	{
		id: 'quick-answers',
		name: 'Quick Answers',
		description: 'Brief, easy-to-read responses',
		filters: {
			contentLength: 'short',
			answerComplexity: 'basic',
			readingTime: {
				max: 2,
			},
		},
		icon: Zap,
		category: 'popular',
		usageCount: 0,
	},
];
export function FAQAdvancedSearchFilters({
	categories,
	allTags,
	clientSegments,
	filters,
	onFiltersChange,
	totalResults,
	searchQuery,
	className = '',
	showFilterCount = true,
	showPresets = true,
	showSaveFilter = false,
	compact = false,
	allowCustomPresets = false,
	maxSavedFilters = 10,
	showFilterAnalytics = false,
	onPresetSelect,
	onPresetSave,
	onFilterReset,
	onFilterAnalytics,
}: FAQAdvancedSearchFiltersProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [activeSection, setActiveSection] = useState<string | null>(null);
	const [savedPresets, setSavedPresets] =
		useState<FilterPreset[]>(DEFAULT_PRESETS);
	const [showSaveDialog, setShowSaveDialog] = useState(false);
	const [newPresetName, setNewPresetName] = useState('');
	const [newPresetDescription, setNewPresetDescription] = useState('');
	const trackFilterAction = useCallback(
		(action: string, filterType: string, value: any) => {
			if (showFilterAnalytics && onFilterAnalytics) {
				onFilterAnalytics(action, filterType, value);
			}
		},
		[showFilterAnalytics, onFilterAnalytics],
	);
	const activeFiltersCount = useMemo(() => {
		let count = 0;
		if (filters.categories.length > 0) count++;
		if (
			filters.dateRange.from ||
			filters.dateRange.to ||
			filters.dateRange.preset
		)
			count++;
		if (filters.includeTags.length > 0) count++;
		if (filters.excludeTags.length > 0) count++;
		if (filters.minViews) count++;
		if (filters.minRating) count++;
		if (filters.minHelpfulness) count++;
		if (filters.showTrending) count++;
		if (filters.contentLength !== 'any') count++;
		if (filters.answerComplexity !== 'any') count++;
		if (filters.readingTime.min || filters.readingTime.max) count++;
		if (filters.clientSegments.length > 0) count++;
		if (filters.journeyStage !== 'any') count++;
		if (filters.featuredOnly) count++;
		if (filters.priorityRange.min !== 1 || filters.priorityRange.max !== 10)
			count++;
		return count;
	}, [filters]);
	const updateFilters = useCallback(
		(updates: Partial<AdvancedSearchFilters>) => {
			const newFilters = {
				...filters,
				...updates,
			};
			onFiltersChange(newFilters);
			Object.keys(updates).forEach((key) => {
				trackFilterAction(
					'filter_applied',
					key,
					updates[key as keyof typeof updates],
				);
			});
		},
		[filters, onFiltersChange, trackFilterAction],
	);
	const applyPreset = useCallback(
		(preset: FilterPreset) => {
			const newFilters = {
				...DEFAULT_FILTERS,
				...preset.filters,
			};
			onFiltersChange(newFilters);
			setSavedPresets((prev) =>
				prev.map((p) =>
					p.id === preset.id ?
						{
							...p,
							usageCount: p.usageCount + 1,
							lastUsed: new Date(),
						}
					:	p,
				),
			);
			trackFilterAction('preset_applied', preset.id, preset.name);
			if (onPresetSelect) {
				onPresetSelect(preset);
			}
		},
		[onFiltersChange, trackFilterAction, onPresetSelect],
	);
	const saveCustomPreset = useCallback(() => {
		if (!newPresetName.trim()) return;
		const newPreset: FilterPreset = {
			id: `custom-${Date.now()}`,
			name: newPresetName.trim(),
			description:
				newPresetDescription.trim() || `Custom filter: ${newPresetName}`,
			filters: {
				...filters,
			},
			icon: Tag,
			category: 'custom',
			usageCount: 0,
			lastUsed: new Date(),
		};
		setSavedPresets((prev) => [...prev, newPreset]);
		setShowSaveDialog(false);
		setNewPresetName('');
		setNewPresetDescription('');
		trackFilterAction('preset_saved', 'custom', newPreset.name);
		if (onPresetSave) {
			onPresetSave({
				name: newPreset.name,
				description: newPreset.description,
				filters: newPreset.filters,
				icon: newPreset.icon,
				category: newPreset.category,
			});
		}
	}, [
		newPresetName,
		newPresetDescription,
		filters,
		trackFilterAction,
		onPresetSave,
	]);
	const resetFilters = useCallback(() => {
		onFiltersChange(DEFAULT_FILTERS);
		trackFilterAction('filters_reset', 'all', null);
		if (onFilterReset) {
			onFilterReset();
		}
	}, [onFiltersChange, trackFilterAction, onFilterReset]);
	const toggleSection = useCallback(
		(section: string) => {
			const newSection = activeSection === section ? null : section;
			setActiveSection(newSection);
			trackFilterAction('section_toggle', section, newSection !== null);
		},
		[activeSection, trackFilterAction],
	);
	return (
		<div className={`faq-advanced-filters ${className}`}>
			<div className='filter-header'>
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className='filter-toggle'
					aria-expanded={isExpanded}
					aria-controls='advanced-filters-content'>
					<Filter className='w-4 h-4' />
					<span>Advanced Filters</span>
					{showFilterCount && activeFiltersCount > 0 && (
						<span className='filter-count'>{activeFiltersCount}</span>
					)}
					<ChevronDown
						className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
					/>
				</button>

				{showFilterCount && totalResults > 0 && (
					<div className='results-count'>
						{totalResults.toLocaleString()} result{totalResults !== 1 ? 's' : ''}
						{searchQuery && (
							<span className='search-query'> for "{searchQuery}"</span>
						)}
					</div>
				)}

				{activeFiltersCount > 0 && (
					<button
						onClick={resetFilters}
						className='reset-filters'
						title='Reset all filters'>
						<RefreshCw className='w-4 h-4' />
						Reset
					</button>
				)}
			</div>

			{isExpanded && (
				<div
					id='advanced-filters-content'
					className='filter-content'>
					{showPresets && savedPresets.length > 0 && (
						<div className='filter-section'>
							<h3 className='section-title'>Quick Filters</h3>
							<div className='preset-grid'>
								{savedPresets
									.filter((preset) => preset.category === 'popular')
									.slice(0, compact ? 2 : 4)
									.map((preset) => {
										const IconComponent = preset.icon;
										return (
											<button
												key={preset.id}
												onClick={() => applyPreset(preset)}
												className='preset-button'
												title={preset.description}>
												<IconComponent className='w-4 h-4' />
												<span>{preset.name}</span>
												{preset.usageCount > 0 && (
													<span className='usage-count'>{preset.usageCount}</span>
												)}
											</button>
										);
									})}
							</div>
						</div>
					)}

					<div className='filter-section'>
						<button
							onClick={() => toggleSection('categories')}
							className='section-toggle'
							aria-expanded={activeSection === 'categories'}>
							<span>Categories ({filters.categories.length})</span>
							<ChevronDown
								className={`w-4 h-4 transition-transform ${activeSection === 'categories' ? 'rotate-180' : ''}`}
							/>
						</button>

						{activeSection === 'categories' && (
							<div className='section-content'>
								<div className='logic-selector'>
									<label>
										<input
											type='radio'
											name='categoryLogic'
											value='OR'
											checked={filters.categoryLogic === 'OR'}
											onChange={() =>
												updateFilters({
													categoryLogic: 'OR',
												})
											}
										/>
										Any category (OR)
									</label>
									<label>
										<input
											type='radio'
											name='categoryLogic'
											value='AND'
											checked={filters.categoryLogic === 'AND'}
											onChange={() =>
												updateFilters({
													categoryLogic: 'AND',
												})
											}
										/>
										All categories (AND)
									</label>
								</div>

								<div className='checkbox-grid'>
									{categories.map((category) => (
										<label
											key={category.id}
											className='checkbox-item'>
											<input
												type='checkbox'
												checked={filters.categories.includes(category.id)}
												onChange={(e) => {
													const newCategories =
														e.target.checked ?
															[...filters.categories, category.id]
														:	filters.categories.filter((id) => id !== category.id);
													updateFilters({
														categories: newCategories,
													});
												}}
											/>
											<span>{category.name}</span>
											<span className='item-count'>({category.questions.length})</span>
										</label>
									))}
								</div>
							</div>
						)}
					</div>

					<div className='filter-section'>
						<button
							onClick={() => toggleSection('date')}
							className='section-toggle'
							aria-expanded={activeSection === 'date'}>
							<Calendar className='w-4 h-4' />
							<span>Date Range</span>
						</button>

						{activeSection === 'date' && (
							<div className='section-content'>
								<div className='date-presets'>
									{(['today', 'week', 'month', 'quarter', 'year'] as const).map(
										(preset) => (
											<button
												key={preset}
												onClick={() =>
													updateFilters({
														dateRange: {
															preset,
														},
													})
												}
												className={`preset-chip ${filters.dateRange.preset === preset ? 'active' : ''}`}>
												{preset === 'today' ?
													'Today'
												: preset === 'week' ?
													'This Week'
												: preset === 'month' ?
													'This Month'
												: preset === 'quarter' ?
													'This Quarter'
												:	'This Year'}
											</button>
										),
									)}
								</div>

								<div className='date-inputs'>
									<div className='input-group'>
										<label htmlFor='date-from'>From:</label>
										<input
											id='date-from'
											type='date'
											value={filters.dateRange.from?.toISOString().split('T')[0] || ''}
											onChange={(e) =>
												updateFilters({
													dateRange: {
														...filters.dateRange,
														from: e.target.value ? new Date(e.target.value) : undefined,
														preset: undefined,
													},
												})
											}
										/>
									</div>
									<div className='input-group'>
										<label htmlFor='date-to'>To:</label>
										<input
											id='date-to'
											type='date'
											value={filters.dateRange.to?.toISOString().split('T')[0] || ''}
											onChange={(e) =>
												updateFilters({
													dateRange: {
														...filters.dateRange,
														to: e.target.value ? new Date(e.target.value) : undefined,
														preset: undefined,
													},
												})
											}
										/>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className='filter-section'>
						<button
							onClick={() => toggleSection('tags')}
							className='section-toggle'
							aria-expanded={activeSection === 'tags'}>
							<Tag className='w-4 h-4' />
							<span>
								Tags ({filters.includeTags.length + filters.excludeTags.length})
							</span>
						</button>

						{activeSection === 'tags' && (
							<div className='section-content'>
								<div className='tag-section'>
									<h4>Include Tags</h4>
									<div className='tag-grid'>
										{allTags.map((tag) => (
											<label
												key={`include-${tag}`}
												className='tag-item'>
												<input
													type='checkbox'
													checked={filters.includeTags.includes(tag)}
													onChange={(e) => {
														const newTags =
															e.target.checked ?
																[...filters.includeTags, tag]
															:	filters.includeTags.filter((t) => t !== tag);
														updateFilters({
															includeTags: newTags,
															excludeTags: filters.excludeTags.filter((t) => t !== tag),
														});
													}}
												/>
												<span>{tag}</span>
											</label>
										))}
									</div>
								</div>

								<div className='tag-section'>
									<h4>Exclude Tags</h4>
									<div className='tag-grid'>
										{allTags.map((tag) => (
											<label
												key={`exclude-${tag}`}
												className='tag-item exclude'>
												<input
													type='checkbox'
													checked={filters.excludeTags.includes(tag)}
													onChange={(e) => {
														const newTags =
															e.target.checked ?
																[...filters.excludeTags, tag]
															:	filters.excludeTags.filter((t) => t !== tag);
														updateFilters({
															excludeTags: newTags,
															includeTags: filters.includeTags.filter((t) => t !== tag),
														});
													}}
												/>
												<span>{tag}</span>
											</label>
										))}
									</div>
								</div>
							</div>
						)}
					</div>

					<div className='filter-section'>
						<button
							onClick={() => toggleSection('popularity')}
							className='section-toggle'
							aria-expanded={activeSection === 'popularity'}>
							<Star className='w-4 h-4' />
							<span>Popularity & Engagement</span>
						</button>

						{activeSection === 'popularity' && (
							<div className='section-content'>
								<div className='range-inputs'>
									<div className='input-group'>
										<label htmlFor='min-views'>Minimum Views:</label>
										<input
											id='min-views'
											type='number'
											min='0'
											value={filters.minViews || ''}
											onChange={(e) =>
												updateFilters({
													minViews: e.target.value ? parseInt(e.target.value) : undefined,
												})
											}
										/>
									</div>

									<div className='input-group'>
										<label htmlFor='min-rating'>Minimum Rating:</label>
										<select
											id='min-rating'
											value={filters.minRating || ''}
											onChange={(e) =>
												updateFilters({
													minRating: e.target.value ? parseFloat(e.target.value) : undefined,
												})
											}>
											<option value=''>Any</option>
											<option value='3.0'>3+ Stars</option>
											<option value='4.0'>4+ Stars</option>
											<option value='4.5'>4.5+ Stars</option>
											<option value='5.0'>5 Stars Only</option>
										</select>
									</div>

									<div className='input-group'>
										<label htmlFor='min-helpfulness'>Minimum Helpfulness (%):</label>
										<input
											id='min-helpfulness'
											type='number'
											min='0'
											max='100'
											value={filters.minHelpfulness || ''}
											onChange={(e) =>
												updateFilters({
													minHelpfulness:
														e.target.value ? parseInt(e.target.value) : undefined,
												})
											}
										/>
									</div>
								</div>

								<label className='checkbox-item'>
									<input
										type='checkbox'
										checked={filters.showTrending}
										onChange={(e) =>
											updateFilters({
												showTrending: e.target.checked,
											})
										}
									/>
									<span>Show trending content only</span>
								</label>
							</div>
						)}
					</div>

					<div className='filter-section'>
						<button
							onClick={() => toggleSection('content')}
							className='section-toggle'
							aria-expanded={activeSection === 'content'}>
							<BookOpen className='w-4 h-4' />
							<span>Content Characteristics</span>
						</button>

						{activeSection === 'content' && (
							<div className='section-content'>
								<div className='select-group'>
									<label htmlFor='content-length'>Content Length:</label>
									<select
										id='content-length'
										value={filters.contentLength}
										onChange={(e) =>
											updateFilters({
												contentLength: e.target
													.value as AdvancedSearchFilters['contentLength'],
											})
										}>
										<option value='any'>Any Length</option>
										<option value='short'>Short (&lt; 200 words)</option>
										<option value='medium'>Medium (200-500 words)</option>
										<option value='long'>Long (&gt; 500 words)</option>
									</select>
								</div>

								<div className='select-group'>
									<label htmlFor='answer-complexity'>Answer Complexity:</label>
									<select
										id='answer-complexity'
										value={filters.answerComplexity}
										onChange={(e) =>
											updateFilters({
												answerComplexity: e.target
													.value as AdvancedSearchFilters['answerComplexity'],
											})
										}>
										<option value='any'>Any Complexity</option>
										<option value='basic'>Basic</option>
										<option value='intermediate'>Intermediate</option>
										<option value='advanced'>Advanced</option>
									</select>
								</div>

								<div className='range-group'>
									<label>Reading Time (minutes):</label>
									<div className='range-inputs'>
										<input
											type='number'
											placeholder='Min'
											min='0'
											value={filters.readingTime.min || ''}
											onChange={(e) =>
												updateFilters({
													readingTime: {
														...filters.readingTime,
														min: e.target.value ? parseInt(e.target.value) : undefined,
													},
												})
											}
										/>
										<span>to</span>
										<input
											type='number'
											placeholder='Max'
											min='0'
											value={filters.readingTime.max || ''}
											onChange={(e) =>
												updateFilters({
													readingTime: {
														...filters.readingTime,
														max: e.target.value ? parseInt(e.target.value) : undefined,
													},
												})
											}
										/>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className='filter-section'>
						<button
							onClick={() => toggleSection('audience')}
							className='section-toggle'
							aria-expanded={activeSection === 'audience'}>
							<Users className='w-4 h-4' />
							<span>Audience & Journey ({filters.clientSegments.length})</span>
						</button>

						{activeSection === 'audience' && (
							<div className='section-content'>
								<div className='audience-section'>
									<h4>Client Segments</h4>
									<div className='checkbox-grid'>
										{clientSegments.map((segment) => (
											<label
												key={segment}
												className='checkbox-item'>
												<input
													type='checkbox'
													checked={filters.clientSegments.includes(segment)}
													onChange={(e) => {
														const newSegments =
															e.target.checked ?
																[...filters.clientSegments, segment]
															:	filters.clientSegments.filter((s) => s !== segment);
														updateFilters({
															clientSegments: newSegments,
														});
													}}
												/>
												<span>
													{segment
														.replace('_', ' ')
														.replace(/\b\w/g, (l) => l.toUpperCase())}
												</span>
											</label>
										))}
									</div>
								</div>

								<div className='journey-section'>
									<label htmlFor='journey-stage'>Journey Stage:</label>
									<select
										id='journey-stage'
										value={filters.journeyStage}
										onChange={(e) =>
											updateFilters({
												journeyStage: e.target
													.value as AdvancedSearchFilters['journeyStage'],
											})
										}>
										<option value='any'>Any Stage</option>
										<option value='awareness'>Awareness</option>
										<option value='consideration'>Consideration</option>
										<option value='decision'>Decision</option>
										<option value='retention'>Retention</option>
									</select>
								</div>
							</div>
						)}
					</div>

					<div className='filter-section'>
						<button
							onClick={() => toggleSection('sorting')}
							className='section-toggle'
							aria-expanded={activeSection === 'sorting'}>
							<span>Sorting & Grouping</span>
						</button>

						{activeSection === 'sorting' && (
							<div className='section-content'>
								<div className='sort-controls'>
									<div className='select-group'>
										<label htmlFor='group-by'>Group By:</label>
										<select
											id='group-by'
											value={filters.groupBy}
											onChange={(e) =>
												updateFilters({
													groupBy: e.target.value as AdvancedSearchFilters['groupBy'],
												})
											}>
											<option value='none'>No Grouping</option>
											<option value='category'>Category</option>
											<option value='difficulty'>Difficulty</option>
											<option value='popularity'>Popularity</option>
											<option value='date'>Date</option>
										</select>
									</div>

									<div className='select-group'>
										<label htmlFor='sort-by'>Sort By:</label>
										<select
											id='sort-by'
											value={filters.sortBy}
											onChange={(e) =>
												updateFilters({
													sortBy: e.target.value as AdvancedSearchFilters['sortBy'],
												})
											}>
											<option value='relevance'>Relevance</option>
											<option value='date'>Date</option>
											<option value='popularity'>Popularity</option>
											<option value='alphabetical'>Alphabetical</option>
											<option value='priority'>Priority</option>
										</select>
									</div>

									<div className='select-group'>
										<label htmlFor='sort-order'>Order:</label>
										<select
											id='sort-order'
											value={filters.sortOrder}
											onChange={(e) =>
												updateFilters({
													sortOrder: e.target.value as AdvancedSearchFilters['sortOrder'],
												})
											}>
											<option value='desc'>Descending</option>
											<option value='asc'>Ascending</option>
										</select>
									</div>
								</div>

								<div className='priority-range'>
									<label>Priority Range:</label>
									<div className='range-inputs'>
										<input
											type='number'
											min='1'
											max='10'
											value={filters.priorityRange.min}
											onChange={(e) =>
												updateFilters({
													priorityRange: {
														...filters.priorityRange,
														min: parseInt(e.target.value),
													},
												})
											}
										/>
										<span>to</span>
										<input
											type='number'
											min='1'
											max='10'
											value={filters.priorityRange.max}
											onChange={(e) =>
												updateFilters({
													priorityRange: {
														...filters.priorityRange,
														max: parseInt(e.target.value),
													},
												})
											}
										/>
									</div>
								</div>

								<label className='checkbox-item'>
									<input
										type='checkbox'
										checked={filters.featuredOnly}
										onChange={(e) =>
											updateFilters({
												featuredOnly: e.target.checked,
											})
										}
									/>
									<span>Show featured content only</span>
								</label>
							</div>
						)}
					</div>

					{showSaveFilter && allowCustomPresets && (
						<div className='filter-section'>
							<button
								onClick={() => setShowSaveDialog(!showSaveDialog)}
								className='save-filter-button'>
								<Tag className='w-4 h-4' />
								Save Current Filters
							</button>

							{showSaveDialog && (
								<div className='save-dialog'>
									<div className='input-group'>
										<label htmlFor='preset-name'>Preset Name:</label>
										<input
											id='preset-name'
											type='text'
											value={newPresetName}
											onChange={(e) => setNewPresetName(e.target.value)}
											placeholder='Enter preset name...'
										/>
									</div>

									<div className='input-group'>
										<label htmlFor='preset-description'>Description (optional):</label>
										<textarea
											id='preset-description'
											value={newPresetDescription}
											onChange={(e) => setNewPresetDescription(e.target.value)}
											placeholder='Describe this filter combination...'
											rows={2}
										/>
									</div>

									<div className='dialog-actions'>
										<button
											onClick={saveCustomPreset}
											disabled={!newPresetName.trim()}
											className='save-button'>
											Save Preset
										</button>
										<button
											onClick={() => {
												setShowSaveDialog(false);
												setNewPresetName('');
												setNewPresetDescription('');
											}}
											className='cancel-button'>
											Cancel
										</button>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
