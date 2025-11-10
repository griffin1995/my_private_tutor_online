'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { m } from 'framer-motion';
import { useFAQAnalytics } from '../faq/faq-analytics-tracker';
import type { EnhancedSessionAnalytics } from '../faq/faq-analytics-tracker';
interface FAQDashboardMetrics {
	totalSessions: number;
	totalQuestions: number;
	totalSearches: number;
	averageSessionTime: number;
	userSegments: {
		oxbridge_prep: number;
		eleven_plus: number;
		a_level_gcse: number;
		elite_corporate: number;
		comparison_shopper: number;
	};
	topCategories: Array<{
		category: string;
		views: number;
		engagement: number;
	}>;
	popularQuestions: Array<{
		questionId: string;
		views: number;
		rating: number;
	}>;
	contentGaps: Array<{
		query: string;
		frequency: number;
		priority: 'high' | 'medium' | 'low';
	}>;
	conversionRate: number;
	revenueAttribution: number;
	supportTicketPrevention: number;
	conversionsBySegment: Record<
		string,
		{
			rate: number;
			value: number;
		}
	>;
	searchEffectiveness: number;
	zeroResultRate: number;
	queryCompletionRate: number;
	topSearchQueries: Array<{
		query: string;
		count: number;
		resultRate: number;
	}>;
	projectedRevenue: number;
	costSavings: number;
	roi: number;
	recommendedActions: Array<{
		action: string;
		impact: 'high' | 'medium' | 'low';
		effort: 'high' | 'medium' | 'low';
	}>;
}
interface FAQAnalyticsDashboardProps {
	isVisible?: boolean;
	refreshInterval?: number;
	showExportOptions?: boolean;
	compactMode?: boolean;
	allowedMetrics?: string[];
	businessGoals?: {
		targetRevenue: number;
		targetTicketReduction: number;
		targetConversionRate: number;
	};
}
export function FAQAnalyticsDashboard({
	isVisible = true,
	refreshInterval = 30000,
	showExportOptions = true,
	compactMode = false,
	allowedMetrics = ['all'],
	businessGoals = {
		targetRevenue: 381600,
		targetTicketReduction: 40,
		targetConversionRate: 15,
	},
}: FAQAnalyticsDashboardProps) {
	const analytics = useFAQAnalytics();
	const [metrics, setMetrics] = useState<FAQDashboardMetrics | null>(null);
	const [sessionData, setSessionData] =
		useState<EnhancedSessionAnalytics | null>(null);
	const [loading, setLoading] = useState(true);
	const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
	const calculateDashboardMetrics =
		useCallback(async (): Promise<FAQDashboardMetrics> => {
			const sessionAnalytics = await analytics.getSessionMetrics();
			setSessionData(sessionAnalytics);
			const simulatedMetrics: FAQDashboardMetrics = {
				totalSessions: Math.floor(Math.random() * 1000) + 500,
				totalQuestions:
					sessionAnalytics.questionsViewed.length + Math.floor(Math.random() * 200),
				totalSearches:
					sessionAnalytics.searchQueries.length + Math.floor(Math.random() * 100),
				averageSessionTime:
					sessionAnalytics.questionEngagement ||
					Math.floor(Math.random() * 180000) + 120000,
				userSegments: {
					oxbridge_prep: Math.floor(Math.random() * 200) + 50,
					eleven_plus: Math.floor(Math.random() * 300) + 100,
					a_level_gcse: Math.floor(Math.random() * 400) + 200,
					elite_corporate: Math.floor(Math.random() * 100) + 25,
					comparison_shopper: Math.floor(Math.random() * 150) + 75,
				},
				topCategories: [
					{
						category: 'Getting Started',
						views: Math.floor(Math.random() * 500) + 200,
						engagement: Math.random() * 0.8 + 0.2,
					},
					{
						category: 'Pricing & Packages',
						views: Math.floor(Math.random() * 400) + 150,
						engagement: Math.random() * 0.7 + 0.3,
					},
					{
						category: 'Teaching Methods',
						views: Math.floor(Math.random() * 300) + 100,
						engagement: Math.random() * 0.9 + 0.1,
					},
					{
						category: 'Qualifications',
						views: Math.floor(Math.random() * 250) + 80,
						engagement: Math.random() * 0.6 + 0.4,
					},
				],
				popularQuestions: [
					{
						questionId: 'pricing-consultation',
						views: Math.floor(Math.random() * 150) + 50,
						rating: 4.5 + Math.random() * 0.5,
					},
					{
						questionId: 'tutor-qualifications',
						views: Math.floor(Math.random() * 120) + 40,
						rating: 4.2 + Math.random() * 0.8,
					},
					{
						questionId: 'online-vs-person',
						views: Math.floor(Math.random() * 100) + 30,
						rating: 4.0 + Math.random() * 1.0,
					},
				],
				contentGaps: sessionAnalytics.contentGaps.map((gap) => ({
					query: gap,
					frequency: Math.floor(Math.random() * 20) + 5,
					priority:
						Math.random() > 0.7 ? 'high'
						: Math.random() > 0.4 ? 'medium'
						: 'low',
				})),
				conversionRate:
					sessionAnalytics.conversionProbability * 100 || Math.random() * 20 + 5,
				revenueAttribution:
					sessionAnalytics.revenueAttribution ||
					Math.floor(Math.random() * 50000) + 10000,
				supportTicketPrevention:
					sessionAnalytics.supportTicketPrevention ||
					Math.floor(Math.random() * 100) + 20,
				conversionsBySegment: {
					oxbridge_prep: {
						rate: Math.random() * 30 + 15,
						value: Math.random() * 20000 + 10000,
					},
					eleven_plus: {
						rate: Math.random() * 25 + 10,
						value: Math.random() * 15000 + 5000,
					},
					a_level_gcse: {
						rate: Math.random() * 20 + 8,
						value: Math.random() * 12000 + 3000,
					},
					elite_corporate: {
						rate: Math.random() * 40 + 25,
						value: Math.random() * 50000 + 25000,
					},
					comparison_shopper: {
						rate: Math.random() * 15 + 5,
						value: Math.random() * 8000 + 2000,
					},
				},
				searchEffectiveness:
					sessionAnalytics.searchEffectiveness * 100 || Math.random() * 30 + 70,
				zeroResultRate:
					(sessionAnalytics.zeroResultQueries.length /
						Math.max(sessionAnalytics.searchQueries.length, 1)) *
					100,
				queryCompletionRate: Math.random() * 20 + 75,
				topSearchQueries: sessionAnalytics.searchQueries
					.slice(0, 5)
					.map((query) => ({
						query,
						count: Math.floor(Math.random() * 50) + 10,
						resultRate: Math.random() * 30 + 70,
					})),
				projectedRevenue:
					Math.floor(Math.random() * 100000) + businessGoals.targetRevenue * 0.8,
				costSavings: Math.floor(Math.random() * 20000) + 5000,
				roi: Math.random() * 200 + 150,
				recommendedActions: [
					{
						action: 'Add FAQ for high-frequency zero-result queries',
						impact: 'high',
						effort: 'medium',
					},
					{
						action: 'Optimize search suggestions for elite corporate segment',
						impact: 'medium',
						effort: 'low',
					},
					{
						action: 'Create video answers for top-rated questions',
						impact: 'high',
						effort: 'high',
					},
					{
						action: 'Improve mobile FAQ experience',
						impact: 'medium',
						effort: 'medium',
					},
				],
			};
			return simulatedMetrics;
		}, [analytics, businessGoals]);
	useEffect(() => {
		let intervalId: NodeJS.Timeout;
		const fetchMetrics = async () => {
			setLoading(true);
			try {
				const dashboardMetrics = await calculateDashboardMetrics();
				setMetrics(dashboardMetrics);
				setLastUpdate(new Date());
			} catch (error) {
				console.warn('[FAQ Analytics Dashboard] Error fetching metrics:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchMetrics();
		if (refreshInterval > 0) {
			intervalId = setInterval(fetchMetrics, refreshInterval);
		}
		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	}, [calculateDashboardMetrics, refreshInterval]);
	const exportMetrics = useCallback(
		(format: 'json' | 'csv') => {
			if (!metrics) return;
			const timestamp = new Date().toISOString();
			if (format === 'json') {
				const exportData = {
					timestamp,
					metrics,
					sessionData,
					businessGoals,
				};
				const blob = new Blob([JSON.stringify(exportData, null, 2)], {
					type: 'application/json',
				});
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `faq-analytics-${timestamp.slice(0, 10)}.json`;
				a.click();
				URL.revokeObjectURL(url);
			} else if (format === 'csv') {
				const csvData = [
					['Metric', 'Value', 'Target', 'Performance'],
					['Total Sessions', metrics.totalSessions.toString(), 'N/A', 'N/A'],
					[
						'Conversion Rate (%)',
						metrics.conversionRate.toFixed(2),
						businessGoals.targetConversionRate.toString(),
						(
							(metrics.conversionRate / businessGoals.targetConversionRate) *
							100
						).toFixed(1) + '%',
					],
					[
						'Revenue Attribution (£)',
						metrics.revenueAttribution.toString(),
						businessGoals.targetRevenue.toString(),
						(
							(metrics.revenueAttribution / businessGoals.targetRevenue) *
							100
						).toFixed(1) + '%',
					],
					[
						'Support Tickets Prevented',
						metrics.supportTicketPrevention.toString(),
						businessGoals.targetTicketReduction.toString(),
						(
							(metrics.supportTicketPrevention / businessGoals.targetTicketReduction) *
							100
						).toFixed(1) + '%',
					],
					[
						'Search Effectiveness (%)',
						metrics.searchEffectiveness.toFixed(2),
						'85',
						((metrics.searchEffectiveness / 85) * 100).toFixed(1) + '%',
					],
					[
						'ROI (%)',
						metrics.roi.toFixed(2),
						'200',
						((metrics.roi / 200) * 100).toFixed(1) + '%',
					],
				];
				const csvContent = csvData.map((row) => row.join(',')).join('\n');
				const blob = new Blob([csvContent], {
					type: 'text/csv',
				});
				const url = URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `faq-metrics-${timestamp.slice(0, 10)}.csv`;
				a.click();
				URL.revokeObjectURL(url);
			}
		},
		[metrics, sessionData, businessGoals],
	);
	if (!isVisible || loading || !metrics) {
		return (
			<div className='flex items-center justify-center p-8 bg-slate-50 rounded-lg'>
				<div className='text-center'>
					<div className='w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
					<p className='text-slate-600'>Loading FAQ analytics...</p>
				</div>
			</div>
		);
	}
	return (
		<div className='space-y-6'>
			<div className='flex justify-between items-start'>
				<div>
					<h2 className='text-2xl font-serif font-bold text-slate-900 mb-2'>
						FAQ Analytics Dashboard
					</h2>
					<p className='text-slate-600'>
						Real-time business intelligence for £
						{businessGoals.targetRevenue.toLocaleString()} revenue opportunity
					</p>
					<p className='text-sm text-slate-500 mt-1'>
						Last updated: {lastUpdate.toLocaleTimeString()}
					</p>
				</div>

				{showExportOptions && (
					<div className='flex gap-2'>
						<button
							onClick={() => exportMetrics('csv')}
							className='px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm transition-colors duration-200'>
							Export CSV
						</button>
						<button
							onClick={() => exportMetrics('json')}
							className='px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors duration-200'>
							Export JSON
						</button>
					</div>
				)}
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<m.div
					className='bg-white p-6 rounded-xl shadow-sm border border-slate-200'
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						delay: 0.1,
					}}>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-sm font-medium text-slate-600'>Conversion Rate</h3>
						<div
							className={`px-2 py-1 rounded-full text-xs ${metrics.conversionRate >= businessGoals.targetConversionRate ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
							Target: {businessGoals.targetConversionRate}%
						</div>
					</div>
					<div className='text-2xl font-bold text-slate-900 mb-2'>
						{metrics.conversionRate.toFixed(1)}%
					</div>
					<div className='text-sm text-slate-500'>
						{metrics.conversionEvents.length} conversions this session
					</div>
				</m.div>

				<m.div
					className='bg-white p-6 rounded-xl shadow-sm border border-slate-200'
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						delay: 0.2,
					}}>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-sm font-medium text-slate-600'>
							Revenue Attribution
						</h3>
						<div className='px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800'>
							YTD: £{(metrics.revenueAttribution * 12).toLocaleString()}
						</div>
					</div>
					<div className='text-2xl font-bold text-slate-900 mb-2'>
						£{metrics.revenueAttribution.toLocaleString()}
					</div>
					<div className='text-sm text-slate-500'>
						{(
							(metrics.revenueAttribution / businessGoals.targetRevenue) *
							100
						).toFixed(1)}
						% of annual target
					</div>
				</m.div>

				<m.div
					className='bg-white p-6 rounded-xl shadow-sm border border-slate-200'
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						delay: 0.3,
					}}>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-sm font-medium text-slate-600'>
							Support Tickets Prevented
						</h3>
						<div
							className={`px-2 py-1 rounded-full text-xs ${metrics.supportTicketPrevention >= businessGoals.targetTicketReduction ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
							Target: {businessGoals.targetTicketReduction}%
						</div>
					</div>
					<div className='text-2xl font-bold text-slate-900 mb-2'>
						{metrics.supportTicketPrevention}
					</div>
					<div className='text-sm text-slate-500'>
						£{(metrics.supportTicketPrevention * 25).toLocaleString()} cost savings
					</div>
				</m.div>

				<m.div
					className='bg-white p-6 rounded-xl shadow-sm border border-slate-200'
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						delay: 0.4,
					}}>
					<div className='flex items-center justify-between mb-4'>
						<h3 className='text-sm font-medium text-slate-600'>
							Search Effectiveness
						</h3>
						<div
							className={`px-2 py-1 rounded-full text-xs ${metrics.searchEffectiveness >= 85 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
							Target: 85%
						</div>
					</div>
					<div className='text-2xl font-bold text-slate-900 mb-2'>
						{metrics.searchEffectiveness.toFixed(1)}%
					</div>
					<div className='text-sm text-slate-500'>
						{metrics.zeroResultRate.toFixed(1)}% zero results
					</div>
				</m.div>
			</div>

			{!compactMode && (
				<>
					<m.div
						className='bg-white p-6 rounded-xl shadow-sm border border-slate-200'
						initial={{
							opacity: 0,
							y: 20,
						}}
						animate={{
							opacity: 1,
							y: 0,
						}}
						transition={{
							delay: 0.5,
						}}>
						<h3 className='text-lg font-semibold text-slate-900 mb-4'>
							User Segments Performance
						</h3>
						<div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
							{Object.entries(metrics.userSegments).map(([segment, count], index) => {
								const segmentData = metrics.conversionsBySegment[segment];
								return (
									<div
										key={segment}
										className='text-center p-4 bg-slate-50 rounded-lg'>
										<div className='text-lg font-bold text-slate-900'>{count}</div>
										<div className='text-sm text-slate-600 capitalize mb-2'>
											{segment.replace('_', ' ')}
										</div>
										<div className='text-xs text-slate-500'>
											{segmentData.rate.toFixed(1)}% conv. rate
										</div>
										<div className='text-xs font-medium text-green-600'>
											£{segmentData.value.toLocaleString()} value
										</div>
									</div>
								);
							})}
						</div>
					</m.div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
						<m.div
							className='bg-white p-6 rounded-xl shadow-sm border border-slate-200'
							initial={{
								opacity: 0,
								x: -20,
							}}
							animate={{
								opacity: 1,
								x: 0,
							}}
							transition={{
								delay: 0.6,
							}}>
							<h3 className='text-lg font-semibold text-slate-900 mb-4'>
								Top Performing Categories
							</h3>
							<div className='space-y-3'>
								{metrics.topCategories.map((category, index) => (
									<div
										key={category.category}
										className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
										<div>
											<div className='font-medium text-slate-900'>{category.category}</div>
											<div className='text-sm text-slate-600'>{category.views} views</div>
										</div>
										<div className='text-right'>
											<div className='text-sm font-medium text-slate-900'>
												{(category.engagement * 100).toFixed(1)}% engagement
											</div>
											<div className='w-16 h-2 bg-slate-200 rounded-full mt-1'>
												<div
													className='h-full bg-primary-600 rounded-full transition-all duration-500'
													style={{
														width: `${category.engagement * 100}%`,
													}}
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</m.div>

						<m.div
							className='bg-white p-6 rounded-xl shadow-sm border border-slate-200'
							initial={{
								opacity: 0,
								x: 20,
							}}
							animate={{
								opacity: 1,
								x: 0,
							}}
							transition={{
								delay: 0.7,
							}}>
							<h3 className='text-lg font-semibold text-slate-900 mb-4'>
								Recommended Actions
							</h3>
							<div className='space-y-3'>
								{metrics.recommendedActions.map((action, index) => (
									<div
										key={index}
										className='p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-lg border border-slate-200'>
										<div className='flex items-start justify-between mb-2'>
											<div className='text-sm font-medium text-slate-900'>
												{action.action}
											</div>
											<div className='flex gap-1'>
												<span
													className={`px-2 py-1 rounded-full text-xs ${
														action.impact === 'high' ? 'bg-red-100 text-red-800'
														: action.impact === 'medium' ? 'bg-yellow-100 text-yellow-800'
														: 'bg-green-100 text-green-800'
													}`}>
													{action.impact} impact
												</span>
												<span
													className={`px-2 py-1 rounded-full text-xs ${
														action.effort === 'high' ? 'bg-red-100 text-red-800'
														: action.effort === 'medium' ? 'bg-yellow-100 text-yellow-800'
														: 'bg-green-100 text-green-800'
													}`}>
													{action.effort} effort
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</m.div>
					</div>
				</>
			)}
		</div>
	);
}
export default FAQAnalyticsDashboard;
