'use client';

import React, { useState } from 'react';
import {
	LazyLineChart as LineChart,
	LazyLine as Line,
	LazyXAxis as XAxis,
	LazyYAxis as YAxis,
	LazyCartesianGrid as CartesianGrid,
	LazyTooltip as Tooltip,
	LazyLegend as Legend,
	LazyPieChart as PieChart,
	LazyPie as Pie,
	LazyCell as Cell,
	LazyResponsiveContainer as ResponsiveContainer,
} from '@/components/charts/lazy-charts';
interface SearchAnalyticsProps {
	searchData: {
		timestamp: string;
		queryVolume: number;
		zeroResultQueries: number;
		averageResponseTime: number;
	}[];
	languageDistribution: {
		language: string;
		percentage: number;
	}[];
}
const FAQSearchAnalyticsDashboard: React.FC<SearchAnalyticsProps> = ({
	searchData,
	languageDistribution,
}) => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const COLORS = ['#0f172a', '#eab308', '#ffffff', '#64748b', '#334155'];
	const getAggregatedMetrics = () => {
		const totalQueries = searchData.reduce(
			(sum, entry) => sum + entry.queryVolume,
			0,
		);
		const zeroResultRate =
			(searchData.reduce((sum, entry) => sum + entry.zeroResultQueries, 0) /
				totalQueries) *
			100;
		return {
			totalQueries,
			zeroResultRate: parseFloat(zeroResultRate.toFixed(2)),
			averageResponseTime:
				searchData.reduce((sum, entry) => sum + entry.averageResponseTime, 0) /
				searchData.length,
		};
	};
	const aggregatedMetrics = getAggregatedMetrics();
	return (
		<div className='faq-search-analytics-dashboard'>
			<h2>FAQ Search Performance Dashboard</h2>

			<div className='dashboard-grid'>
				<div className='chart-container line-chart'>
					<h3>Search Query Volume</h3>
					<ResponsiveContainer
						width='100%'
						height={300}>
						<LineChart
							data={searchData}
							margin={{
								top: 5,
								right: 30,
								left: 20,
								bottom: 5,
							}}
							accessibilityLayer>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='timestamp' />
							<YAxis
								label={{
									value: 'Queries',
									angle: -90,
									position: 'insideLeft',
								}}
							/>
							<Tooltip />
							<Legend />
							<Line
								type='monotone'
								dataKey='queryVolume'
								stroke='#0f172a'
								activeDot={{
									r: 8,
								}}
							/>
							<Line
								type='monotone'
								dataKey='zeroResultQueries'
								stroke='#eab308'
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className='chart-container pie-chart'>
					<h3>Language Distribution</h3>
					<ResponsiveContainer
						width='100%'
						height={300}>
						<PieChart accessibilityLayer>
							<Pie
								data={languageDistribution}
								cx='50%'
								cy='50%'
								labelLine={false}
								outerRadius={80}
								fill='#8884d8'
								dataKey='percentage'
								activeIndex={activeIndex !== null ? activeIndex : undefined}
								onMouseEnter={(_, index) => setActiveIndex(index)}
								onMouseLeave={() => setActiveIndex(null)}>
								{languageDistribution.map((_, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className='metrics-summary'>
				<div className='metric-card'>
					<h4>Total Queries</h4>
					<p>{aggregatedMetrics.totalQueries}</p>
				</div>
				<div className='metric-card'>
					<h4>Zero Result Rate</h4>
					<p>{aggregatedMetrics.zeroResultRate}%</p>
				</div>
				<div className='metric-card'>
					<h4>Avg. Response Time</h4>
					<p>{aggregatedMetrics.averageResponseTime.toFixed(2)}ms</p>
				</div>
			</div>
		</div>
	);
};
export default FAQSearchAnalyticsDashboard;
