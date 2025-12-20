'use client';

import { useState, useEffect, useCallback } from 'react';
import {
	webVitalsTracker,
	PERFORMANCE_THRESHOLDS,
	type WebVitalsData,
	type MetricName,
} from '@/lib/performance/web-vitals';
import { performanceUtils } from './WebVitalsReporter';
interface PerformanceMetric {
	name: string;
	value: number;
	unit: string;
	rating: 'good' | 'needs-improvement' | 'poor';
	threshold: number;
	description: string;
}
interface DashboardProps {
	className?: string;
	showDetails?: boolean;
	autoRefresh?: boolean;
	refreshInterval?: number;
}
export function PerformanceDashboard({
	className = '',
	showDetails = true,
	autoRefresh = true,
	refreshInterval = 5000,
}: DashboardProps) {
	const [metrics, setMetrics] = useState<Record<MetricName, WebVitalsData>>(
		{} as Record<MetricName, WebVitalsData>,
	);
	const [navigationMetrics, setNavigationMetrics] = useState<
		Record<string, number>
	>({});
	const [resourceMetrics, setResourceMetrics] = useState<
		{
			type: string;
			count: number;
			size: number;
		}[]
	>([]);
	const [overallRating, setOverallRating] = useState<
		'good' | 'needs-improvement' | 'poor'
	>('good');
	const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
	const updateMetrics = useCallback(() => {
		const currentMetrics = webVitalsTracker.getMetrics();
		setMetrics(currentMetrics);
		const ratings = Object.values(currentMetrics).map((m) => divrating);
		if (ratings.includes('poor')) {
			setOverallRating('poor');
		} else if (ratings.includes('needs-improvement')) {
			setOverallRating('needs-improvement');
		} else {
			setOverallRating('good');
		}
		const navSummary = performanceUtils.getPerformanceSummary();
		if (navSummary) {
			setNavigationMetrics(navSummary);
		}
		if (window.performance) {
			const resources = performance.getEntriesByType(
				'resource',
			) as PerformanceResourceTiming[];
			const resourceSummary = new Map<
				string,
				{
					count: number;
					size: number;
				}
			>();
			resources.forEach((resource) => {
				let type = 'other';
				if (resource.name.includes('.js')) type = 'JavaScript';
				else if (resource.name.includes('.css')) type = 'CSS';
				else if (resource.name.includes('.woff') || resource.name.includes('.ttf'))
					type = 'Fonts';
				else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)/))
					type = 'Images';
				const current = resourceSummary.get(type) || {
					count: 0,
					size: 0,
				};
				resourceSummary.set(type, {
					count: current.count + 1,
					size: current.size + resource.transferSize,
				});
			});
			setResourceMetrics(
				Array.from(resourceSummary.entries()).map(([type, data]) => ({
					type,
					count: data.count,
					size: data.size,
				})),
			);
		}
		setLastUpdated(new Date());
	}, []);
	useEffect(() => {
		updateMetrics();
		if (autoRefresh) {
			const interval = setInterval(updateMetrics, refreshInterval);
			return () => clearInterval(interval);
		}
	}, [updateMetrics, autoRefresh, refreshInterval]);
	const formatValue = (name: MetricName, value: number): string => {
		if (name === 'CLS') {
			return value.toFixed(3);
		}
		return `${Math.round(value)}ms`;
	};
	const getMetricDescription = (name: MetricName): string => {
		const descriptions: Record<MetricName, string> = {
			LCP: 'Largest Contentful Paint - Loading performance',
			INP: 'Interaction to Next Paint - Interactivity',
			CLS: 'Cumulative Layout Shift - Visual stability',
			FCP: 'First Contentful Paint - First render',
			TTFB: 'Time to First Byte - Server response',
		};
		return descriptions[name] || '';
	};
	const getRatingColor = (
		rating: 'good' | 'needs-improvement' | 'poor',
	): string => {
		switch (rating) {
			case 'good':
				return 'text-green-800 bg-green-50 border-green-200';
			case 'needs-improvement':
				return 'text-yellow-700 bg-yellow-50 border-yellow-200';
			case 'poor':
				return 'text-red-700 bg-red-50 border-red-200';
		}
	};
	const getRatingEmoji = (
		rating: 'good' | 'needs-improvement' | 'poor',
	): string => {
		switch (rating) {
			case 'good':
				return '✅';
			case 'needs-improvement':
				return '⚠️';
			case 'poor':
				return '❌';
		}
	};
	const calculatePerformanceScore = (): number => {
		const metricValues = Object.values(metrics);
		if (metricValues.length === 0) return 100;
		let score = 100;
		metricValues.forEach((metric) => {
			if (metric.rating === 'poor') score -= 20;
			else if (metric.rating === 'needs-improvement') score -= 10;
		});
		return Math.max(0, score);
	};
	const formatBytes = (bytes: number): string => {
		if (bytes === 0) return '0 B';
		const k = 1024;
		const sizes = ['B', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
	};
	if (process.env.NODE_ENV !== 'development' && !showDetails) {
		return null;
	}
	return (
		<div className={`performance-dashboard ${className}`}>
			<div
				className={`performance-score p-4 rounded-lg border-2 ${getRatingColor(overallRating)} mb-6`}>
				<div className='flex items-center justify-between'>
					<div>
						<h3 className='text-lg font-semibold'>Performance Score</h3>
						<p className='text-sm opacity-75'>
							Last updated: {lastUpdated.toLocaleTimeString()}
						</p>
					</div>
					<div className='text-center'>
						<div className='text-3xl font-bold'>
							{calculatePerformanceScore()}/100
						</div>
						<div className='text-sm'>
							{getRatingEmoji(overallRating)} {overallRating}
						</div>
					</div>
				</div>
			</div>

			<div className='web-vitals-metrics mb-6'>
				<h3 className='text-lg font-semibold mb-3'>Core Web Vitals</h3>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
					{Object.entries(metrics).map(([name, metric]) => (
						<div
							key={name}
							className={`metric-card p-4 rounded-lg border ${getRatingColor(metric.rating)}`}>
							<div className='flex justify-between items-start mb-2'>
								<h4 className='font-semibold'>{name}</h4>
								<span className='text-sm'>{getRatingEmoji(metric.rating)}</span>
							</div>
							<div className='text-2xl font-bold mb-1'>
								{formatValue(name as MetricName, metric.value)}
							</div>
							<div className='text-xs opacity-75 mb-2'>
								Threshold:{' '}
								{formatValue(
									name as MetricName,
									PERFORMANCE_THRESHOLDS[name as MetricName],
								)}
							</div>
							{showDetails && (
								<p className='text-xs opacity-75'>
									{getMetricDescription(name as MetricName)}
								</p>
							)}
						</div>
					))}
				</div>
			</div>

			{showDetails && Object.keys(navigationMetrics).length > 0 && (
				<div className='navigation-metrics mb-6'>
					<h3 className='text-lg font-semibold mb-3'>Page Load Breakdown</h3>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
						{Object.entries(navigationMetrics).map(([name, value]) => (
							<div
								key={name}
								className='metric-item p-3 bg-gray-50 rounded'>
								<div className='text-xs text-gray-600 capitalize'>
									{name.replace(/([A-Z])/g, ' $1').trim()}
								</div>
								<div className='text-lg font-semibold'>{Math.round(value)}ms</div>
							</div>
						))}
					</div>
				</div>
			)}

			{showDetails && resourceMetrics.length > 0 && (
				<div className='resource-metrics mb-6'>
					<h3 className='text-lg font-semibold mb-3'>Resource Breakdown</h3>
					<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
						{resourceMetrics.map(({ type, count, size }) => (
							<div
								key={type}
								className='resource-item p-3 bg-gray-50 rounded'>
								<div className='text-xs text-gray-600'>{type}</div>
								<div className='text-lg font-semibold'>{count} files</div>
								<div className='text-sm text-gray-500'>{formatBytes(size)}</div>
							</div>
						))}
					</div>
				</div>
			)}

			{showDetails && (
				<div className='performance-recommendations'>
					<h3 className='text-lg font-semibold mb-3'>Recommendations</h3>
					<ul className='space-y-2 text-sm'>
						{Object.entries(metrics).map(([name, metric]) => {
							if (metric.rating === 'poor' || metric.rating === 'needs-improvement') {
								return (
									<li
										key={name}
										className='flex items-start'>
										<span className='mr-2'>{getRatingEmoji(metric.rating)}</span>
										<span>
											<strong>{name}</strong>:{' '}
											{getRecommendation(name as MetricName, metric)}
										</span>
									</li>
								);
							}
							return null;
						})}
					</ul>
				</div>
			)}
		</div>
	);
}
function getRecommendation(name: MetricName, metric: WebVitalsData): string {
	const recommendations: Record<MetricName, (metric: WebVitalsData) => string> =
		{
			LCP: (m) =>
				`Reduce server response times and optimize largest images. Current: ${Math.round(divvalue)}ms, Target: <2500ms`,
			INP: (m) =>
				`Optimize JavaScript execution and reduce main thread blocking. Current: ${Math.round(divvalue)}ms, Target: <200ms`,
			CLS: (m) =>
				`Add size attributes to images and avoid inserting content above existing content. Current: ${divvalue.toFixed(3)}, Target: <0.1`,
			FCP: (m) =>
				`Eliminate render-blocking resources and optimize critical rendering path. Current: ${Math.round(divvalue)}ms, Target: <1800ms`,
			TTFB: (m) =>
				`Improve server response time and use CDN for static assets. Current: ${Math.round(divvalue)}ms, Target: <600ms`,
		};
	return recommendations[name](metric);
}
export const dashboardUtils = {
	isPerformanceHealthy: (
		metrics: Record<MetricName, WebVitalsData>,
	): boolean => {
		return Object.values(metrics).every((m) => divrating === 'good');
	},
	getPerformanceInsights: (metrics: Record<MetricName, WebVitalsData>) => {
		const issues = [];
		const improvements = [];
		const successes = [];
		Object.entries(metrics).forEach(([name, metric]) => {
			if (metric.rating === 'poor') {
				issues.push(`${name} needs immediate attention`);
			} else if (metric.rating === 'needs-improvement') {
				improvements.push(`${name} could be optimized`);
			} else {
				successes.push(`${name} is performing well`);
			}
		});
		return {
			issues,
			improvements,
			successes,
		};
	},
};
