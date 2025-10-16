'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	BarChart3,
	TrendingUp,
	MessageSquare,
	ThumbsUp,
	ThumbsDown,
	Filter,
	Download,
	Eye,
	EyeOff,
	Trash2,
	Flag,
	Clock,
	Users,
	Search,
	AlertTriangle,
	CheckCircle,
	XCircle,
	Mail,
	Calendar,
} from 'lucide-react';
import { z } from 'zod';
const adminFilterSchema = z.object({
	dateRange: z.enum(['today', 'week', 'month', 'quarter', 'year', 'all']),
	ratingFilter: z.enum(['all', 'helpful', 'not_helpful']),
	feedbackFilter: z.enum(['all', 'with_feedback', 'no_feedback']),
	statusFilter: z.enum(['all', 'pending', 'approved', 'flagged', 'archived']),
	searchQuery: z.string().max(100).optional(),
	sortBy: z.enum(['date', 'rating', 'feedback_length', 'question_id']),
	sortOrder: z.enum(['asc', 'desc']),
});
type AdminFilterData = z.infer<typeof adminFilterSchema>;
interface FeedbackEntry {
	id: string;
	questionId: string;
	questionText: string;
	rating: 'helpful' | 'not_helpful';
	feedback?: string;
	email?: string;
	category?: string;
	improvementSuggestions?: string;
	timestamp: string;
	userAgent: string;
	status: 'pending' | 'approved' | 'flagged' | 'archived';
	moderatorNotes?: string;
	ipAddress?: string;
	gdprConsent: boolean;
}
interface AnalyticsData {
	totalRatings: number;
	helpfulRatings: number;
	notHelpfulRatings: number;
	totalFeedback: number;
	averageRating: number;
	feedbackByCategory: Record<string, number>;
	ratingsOverTime: Array<{
		date: string;
		helpful: number;
		notHelpful: number;
	}>;
	topQuestions: Array<{
		questionId: string;
		questionText: string;
		totalRatings: number;
		helpfulPercentage: number;
	}>;
	recentFeedback: FeedbackEntry[];
	responseTime: number;
	userSatisfaction: number;
}
export function FAQAdminDashboard() {
	const [feedbackData, setFeedbackData] = useState<FeedbackEntry[]>([]);
	const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState<AdminFilterData>({
		dateRange: 'month',
		ratingFilter: 'all',
		feedbackFilter: 'all',
		statusFilter: 'all',
		searchQuery: '',
		sortBy: 'date',
		sortOrder: 'desc',
	});
	const [selectedEntry, setSelectedEntry] = useState<FeedbackEntry | null>(null);
	const [showFilters, setShowFilters] = useState(false);
	useEffect(() => {
		const loadFeedbackData = () => {
			setLoading(true);
			const allFeedback: FeedbackEntry[] = [];
			for (let i = 0; i < localStorage.length; i++) {
				const key = localStorage.key(i);
				if (key?.startsWith('faq_feedback_')) {
					try {
						const feedbackArray = JSON.parse(localStorage.getItem(key) || '[]');
						allFeedback.push(
							...feedbackArray.map((item: any, index: number) => ({
								...item,
								id: `${key}_${index}`,
								status: item.status || 'pending',
							})),
						);
					} catch (error) {
						console.error('Error parsing feedback data:', error);
					}
				}
			}
			const analytics = generateAnalytics(allFeedback);
			setFeedbackData(allFeedback);
			setAnalytics(analytics);
			setLoading(false);
		};
		loadFeedbackData();
	}, []);
	const generateAnalytics = (data: FeedbackEntry[]): AnalyticsData => {
		const now = new Date();
		const filteredData = data.filter((item) => {
			const itemDate = new Date(item.timestamp);
			const daysDiff = Math.floor(
				(now.getTime() - itemDate.getTime()) / (1000 * 60 * 60 * 24),
			);
			switch (filters.dateRange) {
				case 'today':
					return daysDiff === 0;
				case 'week':
					return daysDiff <= 7;
				case 'month':
					return daysDiff <= 30;
				case 'quarter':
					return daysDiff <= 90;
				case 'year':
					return daysDiff <= 365;
				default:
					return true;
			}
		});
		const totalRatings = filteredData.length;
		const helpfulRatings = filteredData.filter(
			(item) => item.rating === 'helpful',
		).length;
		const notHelpfulRatings = totalRatings - helpfulRatings;
		const totalFeedback = filteredData.filter(
			(item) => item.feedback && item.feedback.length > 0,
		).length;
		const feedbackByCategory = filteredData.reduce(
			(acc, item) => {
				if (item.category) {
					acc[item.category] = (acc[item.category] || 0) + 1;
				}
				return acc;
			},
			{} as Record<string, number>,
		);
		const ratingsOverTime = Array.from(
			{
				length: 30,
			},
			(_, i) => {
				const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
				const dateString = date.toISOString().split('T')[0];
				const dayData = filteredData.filter(
					(item) => item.timestamp.split('T')[0] === dateString,
				);
				return {
					date: dateString,
					helpful: dayData.filter((item) => item.rating === 'helpful').length,
					notHelpful: dayData.filter((item) => item.rating === 'not_helpful').length,
				};
			},
		).reverse();
		const questionStats = filteredData.reduce(
			(acc, item) => {
				if (!acc[item.questionId]) {
					acc[item.questionId] = {
						questionId: item.questionId,
						questionText: item.questionText,
						totalRatings: 0,
						helpfulCount: 0,
					};
				}
				acc[item.questionId].totalRatings++;
				if (item.rating === 'helpful') {
					acc[item.questionId].helpfulCount++;
				}
				return acc;
			},
			{} as Record<string, any>,
		);
		const topQuestions = Object.values(questionStats)
			.map((q: any) => ({
				...q,
				helpfulPercentage:
					q.totalRatings > 0 ?
						Math.round((q.helpfulCount / q.totalRatings) * 100)
					:	0,
			}))
			.sort((a: any, b: any) => b.totalRatings - a.totalRatings)
			.slice(0, 10);
		return {
			totalRatings,
			helpfulRatings,
			notHelpfulRatings,
			totalFeedback,
			averageRating: totalRatings > 0 ? helpfulRatings / totalRatings : 0,
			feedbackByCategory,
			ratingsOverTime,
			topQuestions,
			recentFeedback: filteredData
				.sort(
					(a, b) =>
						new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
				)
				.slice(0, 10),
			responseTime: 24,
			userSatisfaction:
				totalRatings > 0 ? (helpfulRatings / totalRatings) * 100 : 0,
		};
	};
	const filteredFeedback = useMemo(() => {
		return feedbackData
			.filter((item) => {
				if (
					filters.ratingFilter !== 'all' &&
					item.rating !== filters.ratingFilter
				) {
					return false;
				}
				if (
					filters.feedbackFilter === 'with_feedback' &&
					(!item.feedback || item.feedback.length === 0)
				) {
					return false;
				}
				if (
					filters.feedbackFilter === 'no_feedback' &&
					item.feedback &&
					item.feedback.length > 0
				) {
					return false;
				}
				if (
					filters.statusFilter !== 'all' &&
					item.status !== filters.statusFilter
				) {
					return false;
				}
				if (filters.searchQuery && filters.searchQuery.length > 0) {
					const searchLower = filters.searchQuery.toLowerCase();
					return (
						item.questionText.toLowerCase().includes(searchLower) ||
						(item.feedback && item.feedback.toLowerCase().includes(searchLower)) ||
						(item.email && item.email.toLowerCase().includes(searchLower))
					);
				}
				return true;
			})
			.sort((a, b) => {
				let aVal, bVal;
				switch (filters.sortBy) {
					case 'date':
						aVal = new Date(a.timestamp).getTime();
						bVal = new Date(b.timestamp).getTime();
						break;
					case 'rating':
						aVal = a.rating === 'helpful' ? 1 : 0;
						bVal = b.rating === 'helpful' ? 1 : 0;
						break;
					case 'feedback_length':
						aVal = a.feedback?.length || 0;
						bVal = b.feedback?.length || 0;
						break;
					case 'question_id':
						aVal = a.questionId;
						bVal = b.questionId;
						break;
					default:
						return 0;
				}
				const result =
					aVal > bVal ? 1
					: aVal < bVal ? -1
					: 0;
				return filters.sortOrder === 'desc' ? -result : result;
			});
	}, [feedbackData, filters]);
	const updateEntryStatus = (
		entryId: string,
		newStatus: FeedbackEntry['status'],
		notes?: string,
	) => {
		setFeedbackData((prev) =>
			prev.map((item) =>
				item.id === entryId ?
					{
						...item,
						status: newStatus,
						moderatorNotes: notes,
					}
				:	item,
			),
		);
		console.log(`Updated entry ${entryId} to status: ${newStatus}`);
	};
	const exportData = () => {
		const headers = [
			'Date',
			'Question ID',
			'Question Text',
			'Rating',
			'Feedback',
			'Category',
			'Email',
			'Status',
		];
		const csvData = [
			headers.join(','),
			...filteredFeedback.map((item) =>
				[
					new Date(item.timestamp).toLocaleDateString(),
					item.questionId,
					`"${item.questionText.replace(/"/g, '""')}"`,
					item.rating,
					`"${(item.feedback || '').replace(/"/g, '""')}"`,
					item.category || '',
					item.email || '',
					item.status,
				].join(','),
			),
		].join('\n');
		const blob = new Blob([csvData], {
			type: 'text/csv',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `faq_feedback_${new Date().toISOString().split('T')[0]}.csv`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	};
	if (loading) {
		return (
			<div className='min-h-screen bg-slate-50 flex items-center justify-center'>
				<div className='flex items-center gap-3'>
					<div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin' />
					<span className='text-lg text-slate-600'>Loading dashboard...</span>
				</div>
			</div>
		);
	}
	return (
		<div className='min-h-screen bg-slate-50'>
			{}
			<div className='bg-white border-b border-slate-200'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-2xl font-bold text-slate-900'>
								FAQ Analytics Dashboard
							</h1>
							<p className='text-slate-600 mt-1'>
								Monitor and manage FAQ feedback and ratings
							</p>
						</div>
						<div className='flex gap-3'>
							<button
								onClick={() => setShowFilters(!showFilters)}
								className='flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors'>
								<Filter className='w-4 h-4' />
								Filters
							</button>
							<button
								onClick={exportData}
								className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
								<Download className='w-4 h-4' />
								Export Data
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
				{}
				<AnimatePresence>
					{showFilters && (
						<motion.div
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
							className='bg-white rounded-lg border border-slate-200 p-6 mb-6 overflow-hidden'>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
								<div>
									<label className='block text-sm font-medium text-slate-700 mb-1'>
										Date Range
									</label>
									<select
										value={filters.dateRange}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												dateRange: e.target.value as any,
											}))
										}
										className='w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
										<option value='today'>Today</option>
										<option value='week'>Past Week</option>
										<option value='month'>Past Month</option>
										<option value='quarter'>Past Quarter</option>
										<option value='year'>Past Year</option>
										<option value='all'>All Time</option>
									</select>
								</div>

								<div>
									<label className='block text-sm font-medium text-slate-700 mb-1'>
										Rating Filter
									</label>
									<select
										value={filters.ratingFilter}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												ratingFilter: e.target.value as any,
											}))
										}
										className='w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
										<option value='all'>All Ratings</option>
										<option value='helpful'>Helpful Only</option>
										<option value='not_helpful'>Not Helpful Only</option>
									</select>
								</div>

								<div>
									<label className='block text-sm font-medium text-slate-700 mb-1'>
										Feedback Filter
									</label>
									<select
										value={filters.feedbackFilter}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												feedbackFilter: e.target.value as any,
											}))
										}
										className='w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
										<option value='all'>All Entries</option>
										<option value='with_feedback'>With Feedback</option>
										<option value='no_feedback'>Ratings Only</option>
									</select>
								</div>

								<div>
									<label className='block text-sm font-medium text-slate-700 mb-1'>
										Status
									</label>
									<select
										value={filters.statusFilter}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												statusFilter: e.target.value as any,
											}))
										}
										className='w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
										<option value='all'>All Status</option>
										<option value='pending'>Pending Review</option>
										<option value='approved'>Approved</option>
										<option value='flagged'>Flagged</option>
										<option value='archived'>Archived</option>
									</select>
								</div>
							</div>

							<div className='mt-4'>
								<label className='block text-sm font-medium text-slate-700 mb-1'>
									Search
								</label>
								<div className='relative'>
									<Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4' />
									<input
										type='text'
										value={filters.searchQuery}
										onChange={(e) =>
											setFilters((prev) => ({
												...prev,
												searchQuery: e.target.value,
											}))
										}
										placeholder='Search questions, feedback, or emails...'
										className='w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
									/>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{}
				{analytics && (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
						<div className='bg-white rounded-lg border border-slate-200 p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-slate-600'>Total Ratings</p>
									<p className='text-2xl font-bold text-slate-900'>
										{analytics.totalRatings.toLocaleString()}
									</p>
								</div>
								<div className='p-3 bg-blue-50 rounded-full'>
									<Users className='w-6 h-6 text-blue-600' />
								</div>
							</div>
						</div>

						<div className='bg-white rounded-lg border border-slate-200 p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-slate-600'>Satisfaction Rate</p>
									<p className='text-2xl font-bold text-slate-900'>
										{analytics.userSatisfaction.toFixed(1)}%
									</p>
								</div>
								<div className='p-3 bg-green-50 rounded-full'>
									<ThumbsUp className='w-6 h-6 text-green-600' />
								</div>
							</div>
						</div>

						<div className='bg-white rounded-lg border border-slate-200 p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-slate-600'>Detailed Feedback</p>
									<p className='text-2xl font-bold text-slate-900'>
										{analytics.totalFeedback.toLocaleString()}
									</p>
								</div>
								<div className='p-3 bg-purple-50 rounded-full'>
									<MessageSquare className='w-6 h-6 text-purple-600' />
								</div>
							</div>
						</div>

						<div className='bg-white rounded-lg border border-slate-200 p-6'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='text-sm font-medium text-slate-600'>Avg Response Time</p>
									<p className='text-2xl font-bold text-slate-900'>
										{analytics.responseTime}h
									</p>
								</div>
								<div className='p-3 bg-orange-50 rounded-full'>
									<Clock className='w-6 h-6 text-orange-600' />
								</div>
							</div>
						</div>
					</div>
				)}

				{}
				<div className='bg-white rounded-lg border border-slate-200 overflow-hidden'>
					<div className='px-6 py-4 border-b border-slate-200'>
						<div className='flex items-center justify-between'>
							<h2 className='text-lg font-semibold text-slate-900'>Recent Feedback</h2>
							<span className='text-sm text-slate-500'>
								Showing {filteredFeedback.length} of {feedbackData.length} entries
							</span>
						</div>
					</div>

					<div className='overflow-x-auto'>
						<table className='w-full'>
							<thead className='bg-slate-50'>
								<tr>
									<th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
										Date
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
										Question
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
										Rating
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
										Feedback
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
										Status
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-slate-200'>
								{filteredFeedback.map((entry) => (
									<tr
										key={entry.id}
										className='hover:bg-slate-50 transition-colors'>
										<td className='px-6 py-4 whitespace-nowrap text-sm text-slate-900'>
											{new Date(entry.timestamp).toLocaleDateString()}
										</td>
										<td className='px-6 py-4 text-sm text-slate-900'>
											<div
												className='max-w-xs truncate'
												title={entry.questionText}>
												{entry.questionText}
											</div>
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<div
												className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${entry.rating === 'helpful' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
												{entry.rating === 'helpful' ?
													<ThumbsUp className='w-3 h-3' />
												:	<ThumbsDown className='w-3 h-3' />}
												{entry.rating === 'helpful' ? 'Helpful' : 'Not Helpful'}
											</div>
										</td>
										<td className='px-6 py-4 text-sm text-slate-600'>
											{entry.feedback ?
												<div
													className='max-w-xs truncate'
													title={entry.feedback}>
													{entry.feedback}
												</div>
											:	<span className='text-slate-400 italic'>No feedback</span>}
										</td>
										<td className='px-6 py-4 whitespace-nowrap'>
											<select
												value={entry.status}
												onChange={(e) => updateEntryStatus(entry.id, e.target.value as any)}
												className={`text-xs font-medium border-0 rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
													entry.status === 'pending' ? 'bg-yellow-100 text-yellow-800'
													: entry.status === 'approved' ? 'bg-green-100 text-green-800'
													: entry.status === 'flagged' ? 'bg-red-100 text-red-800'
													: 'bg-slate-100 text-slate-800'
												}`}>
												<option value='pending'>Pending</option>
												<option value='approved'>Approved</option>
												<option value='flagged'>Flagged</option>
												<option value='archived'>Archived</option>
											</select>
										</td>
										<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
											<button
												onClick={() => setSelectedEntry(entry)}
												className='text-blue-600 hover:text-blue-900 transition-colors'>
												<Eye className='w-4 h-4' />
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{filteredFeedback.length === 0 && (
						<div className='text-center py-12'>
							<MessageSquare className='mx-auto h-12 w-12 text-slate-400' />
							<h3 className='mt-2 text-sm font-medium text-slate-900'>
								No feedback found
							</h3>
							<p className='mt-1 text-sm text-slate-500'>
								No entries match your current filter criteria.
							</p>
						</div>
					)}
				</div>
			</div>

			{}
			<AnimatePresence>
				{selectedEntry && (
					<motion.div
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity: 1,
						}}
						exit={{
							opacity: 0,
						}}
						className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'
						onClick={() => setSelectedEntry(null)}>
						<motion.div
							initial={{
								scale: 0.95,
								opacity: 0,
							}}
							animate={{
								scale: 1,
								opacity: 1,
							}}
							exit={{
								scale: 0.95,
								opacity: 0,
							}}
							onClick={(e) => e.stopPropagation()}
							className='bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
							<div className='p-6 border-b border-slate-200'>
								<div className='flex items-center justify-between'>
									<h3 className='text-lg font-semibold text-slate-900'>
										Feedback Details
									</h3>
									<button
										onClick={() => setSelectedEntry(null)}
										className='text-slate-400 hover:text-slate-600'>
										<XCircle className='w-5 h-5' />
									</button>
								</div>
							</div>

							<div className='p-6 space-y-4'>
								<div>
									<label className='block text-sm font-medium text-slate-700 mb-1'>
										Question
									</label>
									<p className='text-sm text-slate-900'>{selectedEntry.questionText}</p>
								</div>

								<div className='grid grid-cols-2 gap-4'>
									<div>
										<label className='block text-sm font-medium text-slate-700 mb-1'>
											Rating
										</label>
										<div
											className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${selectedEntry.rating === 'helpful' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
											{selectedEntry.rating === 'helpful' ?
												<ThumbsUp className='w-3 h-3' />
											:	<ThumbsDown className='w-3 h-3' />}
											{selectedEntry.rating === 'helpful' ? 'Helpful' : 'Not Helpful'}
										</div>
									</div>

									<div>
										<label className='block text-sm font-medium text-slate-700 mb-1'>
											Date
										</label>
										<p className='text-sm text-slate-900'>
											{new Date(selectedEntry.timestamp).toLocaleString()}
										</p>
									</div>
								</div>

								{selectedEntry.category && (
									<div>
										<label className='block text-sm font-medium text-slate-700 mb-1'>
											Category
										</label>
										<p className='text-sm text-slate-900 capitalize'>
											{selectedEntry.category.replace('_', ' ')}
										</p>
									</div>
								)}

								{selectedEntry.feedback && (
									<div>
										<label className='block text-sm font-medium text-slate-700 mb-1'>
											Feedback
										</label>
										<p className='text-sm text-slate-900 whitespace-pre-wrap'>
											{selectedEntry.feedback}
										</p>
									</div>
								)}

								{selectedEntry.improvementSuggestions && (
									<div>
										<label className='block text-sm font-medium text-slate-700 mb-1'>
											Improvement Suggestions
										</label>
										<p className='text-sm text-slate-900 whitespace-pre-wrap'>
											{selectedEntry.improvementSuggestions}
										</p>
									</div>
								)}

								{selectedEntry.email && (
									<div>
										<label className='block text-sm font-medium text-slate-700 mb-1'>
											Email
										</label>
										<div className='flex items-center gap-2'>
											<Mail className='w-4 h-4 text-slate-400' />
											<a
												href={`mailto:${selectedEntry.email}`}
												className='text-sm text-blue-600 hover:text-blue-800'>
												{selectedEntry.email}
											</a>
										</div>
									</div>
								)}

								<div className='pt-4 border-t border-slate-200'>
									<div className='flex gap-4'>
										<button
											onClick={() => updateEntryStatus(selectedEntry.id, 'approved')}
											className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'>
											<CheckCircle className='w-4 h-4' />
											Approve
										</button>
										<button
											onClick={() => updateEntryStatus(selectedEntry.id, 'flagged')}
											className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors'>
											<Flag className='w-4 h-4' />
											Flag
										</button>
										<button
											onClick={() => updateEntryStatus(selectedEntry.id, 'archived')}
											className='flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors'>
											<Trash2 className='w-4 h-4' />
											Archive
										</button>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
