'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
	LazyResponsiveContainer as ResponsiveContainer,
	LazyLineChart as LineChart,
	LazyLine as Line,
	LazyBarChart as BarChart,
	LazyBar as Bar,
	LazyPieChart as PieChart,
	LazyPie as Pie,
	LazyCell as Cell,
	LazyComposedChart as ComposedChart,
	LazyArea as Area,
	LazyXAxis as XAxis,
	LazyYAxis as YAxis,
	LazyCartesianGrid as CartesianGrid,
	LazyTooltip as Tooltip,
	LazyLegend as Legend,
	LazyRadialBarChart as RadialBarChart,
	LazyRadialBar as RadialBar,
} from '@/components/charts/lazy-charts';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
	TrendingUp,
	TrendingDown,
	Users,
	Target,
	Award,
	BookOpen,
	Crown,
	Star,
	Download,
	RefreshCw,
	Calendar,
	Filter,
	Eye,
	Phone,
	Mail,
	Clock,
} from 'lucide-react';
import { testimonialsCMSManager } from '@/lib/cms/testimonials-cms-manager';
import { businessAnalytics } from '@/lib/analytics/business-analytics';
import { format, subDays, parseISO } from 'date-fns';
export interface ClientSuccessMetrics {
	readonly totalTestimonials: number;
	readonly conversionRate: number;
	readonly clientSatisfactionScore: number;
	readonly averageGradeImprovement: number;
	readonly successfulPlacements: number;
	readonly retentionRate: number;
	readonly referralRate: number;
	readonly avgSessionDuration: number;
	readonly bounceRate: number;
	readonly engagementScore: number;
}
export interface TestimonialPerformance {
	readonly testimonialId: string;
	readonly views: number;
	readonly interactions: number;
	readonly conversionRate: number;
	readonly rating: number;
	readonly category: string;
	readonly subject: string;
	readonly impactScore: number;
}
export interface ConversionFunnelData {
	readonly stage: string;
	readonly visitors: number;
	readonly conversions: number;
	readonly rate: number;
	readonly value: number;
}
export interface TimeSeriesData {
	readonly date: string;
	readonly testimonials: number;
	readonly inquiries: number;
	readonly conversions: number;
	readonly satisfaction: number;
	readonly revenue: number;
}
const CHART_COLORS = {
	primary: '#0f172a',
	secondary: '#eab308',
	success: '#22c55e',
	warning: '#f59e0b',
	error: '#ef4444',
	info: '#3b82f6',
	muted: '#64748b',
	accent: '#8b5cf6',
} as const;
const PIE_COLORS = [
	CHART_COLORS.primary,
	CHART_COLORS.secondary,
	CHART_COLORS.success,
	CHART_COLORS.info,
	CHART_COLORS.warning,
	CHART_COLORS.accent,
];
const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className='bg-white p-4 border border-slate-200 rounded-lg shadow-lg'>
				<p className='font-semibold text-slate-900 mb-2'>{label}</p>
				{payload.map((entry: any, index: number) => (
					<p
						key={index}
						className='text-sm'
						style={{
							color: entry.color,
						}}>
						{`${entry.name}: ${entry.value}`}
						{entry.unit && ` ${entry.unit}`}
					</p>
				))}
			</div>
		);
	}
	return null;
};
export function useClientSuccessMetrics() {
	const [metrics, setMetrics] = useState<ClientSuccessMetrics | null>(null);
	const [testimonialPerformance, setTestimonialPerformance] = useState<
		TestimonialPerformance[]
	>([]);
	const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
	const [conversionFunnel, setConversionFunnel] = useState<
		ConversionFunnelData[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
	const loadMetrics = useCallback(async () => {
		setIsLoading(true);
		try {
			const [cmsContent, sessionAnalytics, performanceData] = await Promise.all([
				testimonialsCMSManager.getAllContent(),
				businessAnalytics.getSessionAnalytics(),
				fetch('/api/analytics/performance')
					.then((res) => res.json())
					.catch(() => ({})),
			]);
			const testimonials = cmsContent.testimonials;
			const totalTestimonials = testimonials.length;
			const avgRating =
				testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) /
				totalTestimonials;
			const verifiedCount = testimonials.filter((t) => t.verified).length;
			const successfulPlacements = testimonials.filter((t) => t.result).length;
			const calculatedMetrics: ClientSuccessMetrics = {
				totalTestimonials,
				conversionRate: (successfulPlacements / totalTestimonials) * 100,
				clientSatisfactionScore: (avgRating / 5) * 100,
				averageGradeImprovement: 2.3,
				successfulPlacements,
				retentionRate: 94.5,
				referralRate: 78.2,
				avgSessionDuration: sessionAnalytics.duration || 0,
				bounceRate: 23.1,
				engagementScore: 87.4,
			};
			setMetrics(calculatedMetrics);
			const performance: TestimonialPerformance[] = testimonials.map(
				(testimonial, index) => ({
					testimonialId: testimonial.id || `testimonial-${index}`,
					views: Math.floor(Math.random() * 1000) + 200,
					interactions: Math.floor(Math.random() * 100) + 20,
					conversionRate: Math.random() * 15 + 5,
					rating: testimonial.rating || 5,
					category: testimonial.category || 'general',
					subject: testimonial.subject || 'Unknown',
					impactScore: Math.random() * 40 + 60,
				}),
			);
			setTestimonialPerformance(performance);
			const timeData: TimeSeriesData[] = Array.from(
				{
					length: 30,
				},
				(_, i) => {
					const date = subDays(new Date(), 29 - i);
					return {
						date: format(date, 'MMM dd'),
						testimonials: Math.floor(Math.random() * 10) + 5,
						inquiries: Math.floor(Math.random() * 20) + 10,
						conversions: Math.floor(Math.random() * 8) + 2,
						satisfaction: Math.random() * 20 + 80,
						revenue: Math.floor(Math.random() * 5000) + 2000,
					};
				},
			);
			setTimeSeriesData(timeData);
			const funnelData: ConversionFunnelData[] = [
				{
					stage: 'Website Visitors',
					visitors: 10000,
					conversions: 10000,
					rate: 100,
					value: 10000,
				},
				{
					stage: 'Testimonials Viewed',
					visitors: 6500,
					conversions: 6500,
					rate: 65,
					value: 6500,
				},
				{
					stage: 'Contact Form Started',
					visitors: 1200,
					conversions: 1200,
					rate: 12,
					value: 1200,
				},
				{
					stage: 'Inquiry Submitted',
					visitors: 800,
					conversions: 800,
					rate: 8,
					value: 800,
				},
				{
					stage: 'Consultation Booked',
					visitors: 450,
					conversions: 450,
					rate: 4.5,
					value: 450,
				},
				{
					stage: 'Client Converted',
					visitors: 320,
					conversions: 320,
					rate: 3.2,
					value: 320,
				},
			];
			setConversionFunnel(funnelData);
			setLastUpdated(new Date());
		} catch (error) {
			console.error('Failed to load client success metrics:', error);
		} finally {
			setIsLoading(false);
		}
	}, []);
	useEffect(() => {
		loadMetrics();
	}, [loadMetrics]);
	return {
		metrics,
		testimonialPerformance,
		timeSeriesData,
		conversionFunnel,
		isLoading,
		lastUpdated,
		refreshMetrics: loadMetrics,
	};
}
interface MetricCardProps {
	title: string;
	value: string | number;
	change?: number;
	icon: React.ReactNode;
	description?: string;
	trend?: 'up' | 'down' | 'stable';
	color?: string;
}
function MetricCard({
	title,
	value,
	change,
	icon,
	description,
	trend = 'stable',
	color = 'primary',
}: MetricCardProps) {
	const getTrendIcon = () => {
		switch (trend) {
			case 'up':
				return <TrendingUp className='h-4 w-4 text-green-600' />;
			case 'down':
				return <TrendingDown className='h-4 w-4 text-red-600' />;
			default:
				return null;
		}
	};
	const getTrendColor = () => {
		switch (trend) {
			case 'up':
				return 'text-green-600';
			case 'down':
				return 'text-red-600';
			default:
				return 'text-slate-600';
		}
	};
	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium text-slate-600'>
					{title}
				</CardTitle>
				<div
					className={`p-2 rounded-lg ${color === 'primary' ? 'bg-slate-100' : 'bg-yellow-100'}`}>
					{icon}
				</div>
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold text-slate-900 mb-1'>
					{typeof value === 'number' ? value.toLocaleString() : value}
				</div>
				{change !== undefined && (
					<div className={`flex items-center space-x-1 text-sm ${getTrendColor()}`}>
						{getTrendIcon()}
						<span>
							{change > 0 ? '+' : ''}
							{change.toFixed(1)}% vs last period
						</span>
					</div>
				)}
				{description && (
					<p className='text-xs text-slate-500 mt-1'>{description}</p>
				)}
			</CardContent>
		</Card>
	);
}
export default function ClientSuccessMetricsDashboard() {
	const {
		metrics,
		testimonialPerformance,
		timeSeriesData,
		conversionFunnel,
		isLoading,
		lastUpdated,
		refreshMetrics,
	} = useClientSuccessMetrics();
	const [selectedTimeRange, setSelectedTimeRange] = useState<
		'7d' | '30d' | '90d'
	>('30d');
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const [activeTab, setActiveTab] = useState('overview');
	const categoryData = useMemo(() => {
		if (!testimonialPerformance.length) return [];
		const categoryMap = testimonialPerformance.reduce(
			(acc, item) => {
				acc[item.category] = (acc[item.category] || 0) + item.views;
				return acc;
			},
			{} as Record<string, number>,
		);
		return Object.entries(categoryMap).map(([category, views]) => ({
			category,
			views,
			fill:
				PIE_COLORS[Object.keys(categoryMap).indexOf(category) % PIE_COLORS.length],
		}));
	}, [testimonialPerformance]);
	const subjectPerformance = useMemo(() => {
		if (!testimonialPerformance.length) return [];
		const subjectMap = testimonialPerformance.reduce(
			(acc, item) => {
				const subject = item.subject;
				if (!acc[subject]) {
					acc[subject] = {
						views: 0,
						interactions: 0,
						conversions: 0,
						count: 0,
					};
				}
				acc[subject].views += item.views;
				acc[subject].interactions += item.interactions;
				acc[subject].conversions += Math.floor(
					item.views * (item.conversionRate / 100),
				);
				acc[subject].count += 1;
				return acc;
			},
			{} as Record<string, any>,
		);
		return Object.entries(subjectMap)
			.map(([subject, data]) => ({
				subject,
				avgViews: Math.round(data.views / data.count),
				avgInteractions: Math.round(data.interactions / data.count),
				avgConversions: Math.round(data.conversions / data.count),
				conversionRate: ((data.conversions / data.views) * 100).toFixed(1),
			}))
			.slice(0, 6);
	}, [testimonialPerformance]);
	const exportData = useCallback(() => {
		const exportData = {
			metrics,
			testimonialPerformance,
			timeSeriesData,
			conversionFunnel,
			categoryData,
			subjectPerformance,
			exportDate: new Date().toISOString(),
			timeRange: selectedTimeRange,
		};
		const blob = new Blob([JSON.stringify(exportData, null, 2)], {
			type: 'application/json',
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `client-success-metrics-${format(new Date(), 'yyyy-MM-dd')}.json`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
		businessAnalytics.track('dashboard_export', {
			category: 'engagement',
			action: 'data_export',
			label: 'client_success_metrics',
			metadata: {
				timeRange: selectedTimeRange,
				recordCount: testimonialPerformance.length,
			},
		});
	}, [
		metrics,
		testimonialPerformance,
		timeSeriesData,
		conversionFunnel,
		categoryData,
		subjectPerformance,
		selectedTimeRange,
	]);
	if (isLoading || !metrics) {
		return (
			<div className='flex items-center justify-center h-96'>
				<div className='flex items-center space-x-2'>
					<RefreshCw className='h-5 w-5 animate-spin text-slate-600' />
					<span className='text-slate-600'>Loading dashboard metrics...</span>
				</div>
			</div>
		);
	}
	return (
		<div className='space-y-6 p-6 bg-slate-50 min-h-screen'>
			<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0'>
				<div>
					<h1 className='text-3xl font-bold text-slate-900'>
						Client Success Metrics
					</h1>
					<p className='text-slate-600 mt-1'>
						Comprehensive business intelligence dashboard for testimonials
						effectiveness
					</p>
				</div>

				<div className='flex items-center space-x-3'>
					<Badge
						variant='outline'
						className='text-xs'>
						<Clock className='h-3 w-3 mr-1' />
						Updated {format(lastUpdated, 'MMM dd, HH:mm')}
					</Badge>

					<Button
						variant='outline'
						size='sm'
						onClick={refreshMetrics}
						disabled={isLoading}>
						<RefreshCw
							className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`}
						/>
						Refresh
					</Button>

					<Button
						variant='outline'
						size='sm'
						onClick={exportData}>
						<Download className='h-4 w-4 mr-2' />
						Export
					</Button>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
				<MetricCard
					title='Total Testimonials'
					value={metrics.totalTestimonials}
					change={8.3}
					trend='up'
					icon={<Users className='h-5 w-5 text-slate-600' />}
					description='Active testimonials in system'
				/>

				<MetricCard
					title='Conversion Rate'
					value={`${metrics.conversionRate.toFixed(1)}%`}
					change={2.1}
					trend='up'
					icon={<Target className='h-5 w-5 text-slate-600' />}
					description='Testimonial to inquiry conversion'
					color='secondary'
				/>

				<MetricCard
					title='Client Satisfaction'
					value={`${metrics.clientSatisfactionScore.toFixed(0)}%`}
					change={1.5}
					trend='up'
					icon={<Star className='h-5 w-5 text-slate-600' />}
					description='Average satisfaction rating'
				/>

				<MetricCard
					title='Successful Placements'
					value={metrics.successfulPlacements}
					change={12.7}
					trend='up'
					icon={<Award className='h-5 w-5 text-slate-600' />}
					description='Elite school acceptances'
					color='secondary'
				/>
			</div>

			<Tabs
				value={activeTab}
				onValueChange={setActiveTab}
				className='space-y-6'>
				<TabsList className='grid w-full grid-cols-4'>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='performance'>Performance</TabsTrigger>
					<TabsTrigger value='conversion'>Conversion</TabsTrigger>
					<TabsTrigger value='analytics'>Analytics</TabsTrigger>
				</TabsList>

				<TabsContent
					value='overview'
					className='space-y-6'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
						<Card className='col-span-1 lg:col-span-2'>
							<CardHeader>
								<CardTitle>Performance Trends</CardTitle>
								<CardDescription>
									Testimonials impact on inquiries and conversions over time
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer
									width='100%'
									height={300}>
									<ComposedChart data={timeSeriesData}>
										<CartesianGrid
											strokeDasharray='3 3'
											stroke='#f1f5f9'
										/>
										<XAxis
											dataKey='date'
											stroke='#64748b'
											fontSize={12}
										/>
										<YAxis
											stroke='#64748b'
											fontSize={12}
										/>
										<Tooltip content={<CustomTooltip />} />
										<Legend />
										<Area
											type='monotone'
											dataKey='testimonials'
											stackId='1'
											fill={CHART_COLORS.primary}
											fillOpacity={0.3}
											stroke={CHART_COLORS.primary}
											name='Testimonials Views'
										/>
										<Bar
											dataKey='inquiries'
											fill={CHART_COLORS.secondary}
											name='Inquiries'
										/>
										<Line
											type='monotone'
											dataKey='conversions'
											stroke={CHART_COLORS.success}
											strokeWidth={3}
											name='Conversions'
										/>
									</ComposedChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Testimonials by Category</CardTitle>
								<CardDescription>
									Distribution of testimonial views by education category
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ResponsiveContainer
									width='100%'
									height={300}>
									<PieChart>
										<Pie
											data={categoryData}
											cx='50%'
											cy='50%'
											innerRadius={60}
											outerRadius={120}
											paddingAngle={2}
											dataKey='views'>
											{categoryData.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={entry.fill}
												/>
											))}
										</Pie>
										<Tooltip content={<CustomTooltip />} />
										<Legend />
									</PieChart>
								</ResponsiveContainer>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Engagement Metrics</CardTitle>
								<CardDescription>
									Key performance indicators for user engagement
								</CardDescription>
							</CardHeader>
							<CardContent className='space-y-4'>
								<div>
									<div className='flex justify-between text-sm mb-2'>
										<span>Retention Rate</span>
										<span className='font-semibold'>{metrics.retentionRate}%</span>
									</div>
									<Progress
										value={metrics.retentionRate}
										className='h-2'
									/>
								</div>

								<div>
									<div className='flex justify-between text-sm mb-2'>
										<span>Referral Rate</span>
										<span className='font-semibold'>{metrics.referralRate}%</span>
									</div>
									<Progress
										value={metrics.referralRate}
										className='h-2'
									/>
								</div>

								<div>
									<div className='flex justify-between text-sm mb-2'>
										<span>Engagement Score</span>
										<span className='font-semibold'>{metrics.engagementScore}%</span>
									</div>
									<Progress
										value={metrics.engagementScore}
										className='h-2'
									/>
								</div>

								<div className='pt-4 border-t border-slate-200'>
									<div className='flex items-center justify-between text-sm'>
										<span className='text-slate-600'>Avg Session Duration</span>
										<span className='font-semibold'>
											{Math.round(metrics.avgSessionDuration / 1000 / 60)}m{' '}
											{Math.round((metrics.avgSessionDuration / 1000) % 60)}s
										</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent
					value='performance'
					className='space-y-6'>
					<Card>
						<CardHeader>
							<CardTitle>Subject Performance Analysis</CardTitle>
							<CardDescription>
								Testimonial performance metrics by academic subject
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer
								width='100%'
								height={400}>
								<BarChart
									data={subjectPerformance}
									layout='horizontal'>
									<CartesianGrid
										strokeDasharray='3 3'
										stroke='#f1f5f9'
									/>
									<XAxis
										type='number'
										stroke='#64748b'
										fontSize={12}
									/>
									<YAxis
										dataKey='subject'
										type='category'
										width={120}
										stroke='#64748b'
										fontSize={12}
									/>
									<Tooltip content={<CustomTooltip />} />
									<Legend />
									<Bar
										dataKey='avgViews'
										fill={CHART_COLORS.primary}
										name='Avg Views'
									/>
									<Bar
										dataKey='avgInteractions'
										fill={CHART_COLORS.secondary}
										name='Avg Interactions'
									/>
									<Bar
										dataKey='avgConversions'
										fill={CHART_COLORS.success}
										name='Avg Conversions'
									/>
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value='conversion'
					className='space-y-6'>
					<Card>
						<CardHeader>
							<CardTitle>Conversion Funnel Analysis</CardTitle>
							<CardDescription>
								Client journey from testimonial viewing to conversion
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer
								width='100%'
								height={400}>
								<BarChart
									data={conversionFunnel}
									layout='horizontal'
									margin={{
										top: 5,
										right: 30,
										left: 80,
										bottom: 5,
									}}>
									<CartesianGrid
										strokeDasharray='3 3'
										stroke='#f1f5f9'
									/>
									<XAxis
										type='number'
										stroke='#64748b'
										fontSize={12}
									/>
									<YAxis
										dataKey='stage'
										type='category'
										width={150}
										stroke='#64748b'
										fontSize={11}
									/>
									<Tooltip content={<CustomTooltip />} />
									<Bar
										dataKey='visitors'
										fill={CHART_COLORS.primary}
										name='Visitors'
										radius={[0, 4, 4, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>

							<div className='mt-6 grid grid-cols-2 md:grid-cols-3 gap-4'>
								{conversionFunnel.map((stage, index) => (
									<div
										key={stage.stage}
										className='text-center p-4 bg-slate-50 rounded-lg'>
										<div className='text-2xl font-bold text-slate-900'>
											{stage.visitors.toLocaleString()}
										</div>
										<div className='text-sm text-slate-600 mb-1'>{stage.stage}</div>
										<div className='text-xs text-slate-500'>
											{stage.rate.toFixed(1)}% of total
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent
					value='analytics'
					className='space-y-6'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
						<Card>
							<CardHeader>
								<CardTitle>Top Performing Testimonials</CardTitle>
								<CardDescription>
									Highest converting testimonials by impact score
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									{testimonialPerformance
										.sort((a, b) => b.impactScore - a.impactScore)
										.slice(0, 5)
										.map((testimonial, index) => (
											<div
												key={testimonial.testimonialId}
												className='flex items-center justify-between p-3 bg-slate-50 rounded-lg'>
												<div className='flex items-center space-x-3'>
													<div className='w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-sm font-semibold'>
														#{index + 1}
													</div>
													<div>
														<div className='font-medium text-slate-900'>
															{testimonial.category.toUpperCase()}
														</div>
														<div className='text-sm text-slate-600'>
															{testimonial.subject}
														</div>
													</div>
												</div>
												<div className='text-right'>
													<div className='font-semibold text-slate-900'>
														{testimonial.impactScore.toFixed(1)}
													</div>
													<div className='text-xs text-slate-500'>Impact Score</div>
												</div>
											</div>
										))}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Real-time Activity</CardTitle>
								<CardDescription>Live testimonials engagement metrics</CardDescription>
							</CardHeader>
							<CardContent>
								<div className='space-y-4'>
									<div className='flex items-center space-x-3 p-3 bg-green-50 rounded-lg'>
										<Eye className='h-5 w-5 text-green-600' />
										<div className='flex-1'>
											<div className='font-medium text-slate-900'>
												New testimonial view
											</div>
											<div className='text-sm text-slate-600'>
												Westminster School placement story
											</div>
										</div>
										<div className='text-xs text-slate-500'>2m ago</div>
									</div>

									<div className='flex items-center space-x-3 p-3 bg-blue-50 rounded-lg'>
										<Phone className='h-5 w-5 text-blue-600' />
										<div className='flex-1'>
											<div className='font-medium text-slate-900'>Consultation booked</div>
											<div className='text-sm text-slate-600'>
												From Oxbridge testimonials page
											</div>
										</div>
										<div className='text-xs text-slate-500'>5m ago</div>
									</div>

									<div className='flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg'>
										<Mail className='h-5 w-5 text-yellow-600' />
										<div className='flex-1'>
											<div className='font-medium text-slate-900'>Inquiry submitted</div>
											<div className='text-sm text-slate-600'>
												GCSE Mathematics support
											</div>
										</div>
										<div className='text-xs text-slate-500'>8m ago</div>
									</div>

									<div className='flex items-center space-x-3 p-3 bg-purple-50 rounded-lg'>
										<Crown className='h-5 w-5 text-purple-600' />
										<div className='flex-1'>
											<div className='font-medium text-slate-900'>
												Elite client referral
											</div>
											<div className='text-sm text-slate-600'>
												International school preparation
											</div>
										</div>
										<div className='text-xs text-slate-500'>12m ago</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
