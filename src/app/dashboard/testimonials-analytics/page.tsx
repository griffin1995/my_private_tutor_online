import type { Metadata } from 'next';
import TestimonialsExecutiveDashboard from '@/components/analytics/testimonials-executive-dashboard';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, TrendingUp, Crown, Shield } from 'lucide-react';
export const metadata: Metadata = {
	title: 'Testimonials Analytics Dashboard | My Private Tutor Online',
	description:
		'Executive dashboard for testimonials performance analytics, conversion metrics, and business intelligence reporting.',
	robots: 'noindex, nofollow',
};
const DashboardSkeleton = () => (
	<div className='space-y-6'>
		<div className='flex items-center justify-between'>
			<div>
				<Skeleton className='h-8 w-64 mb-2' />
				<Skeleton className='h-4 w-96' />
			</div>
			<div className='flex space-x-2'>
				<Skeleton className='h-9 w-24' />
				<Skeleton className='h-9 w-24' />
			</div>
		</div>

		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
			{[...Array(4)].map((_, i) => (
				<Card key={i}>
					<CardContent className='p-6'>
						<div className='flex items-center justify-between'>
							<div className='space-y-2'>
								<Skeleton className='h-4 w-20' />
								<Skeleton className='h-8 w-16' />
								<Skeleton className='h-3 w-12' />
							</div>
							<Skeleton className='h-12 w-12 rounded-full' />
						</div>
					</CardContent>
				</Card>
			))}
		</div>

		<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
			<Card>
				<CardHeader>
					<Skeleton className='h-6 w-32' />
					<Skeleton className='h-4 w-48' />
				</CardHeader>
				<CardContent>
					<Skeleton className='h-64 w-full' />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<Skeleton className='h-6 w-40' />
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className='flex justify-between'>
								<Skeleton className='h-4 w-24' />
								<Skeleton className='h-4 w-16' />
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
);
const DashboardHeader = () => (
	<div className='border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
		<div className='container mx-auto px-4 py-6'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center space-x-4'>
					<div className='flex items-center space-x-2'>
						<Crown className='h-8 w-8 text-yellow-600' />
						<div>
							<h1 className='text-2xl font-bold text-foreground'>
								My Private Tutor Online
							</h1>
							<p className='text-sm text-muted-foreground'>
								Executive Analytics Dashboard
							</p>
						</div>
					</div>
				</div>

				<div className='flex items-center space-x-4'>
					<div className='flex items-center space-x-2 text-sm text-muted-foreground'>
						<Shield className='h-4 w-4' />
						<span>Secure Dashboard</span>
					</div>

					<div className='flex items-center space-x-2 text-sm'>
						<div className='h-2 w-2 bg-green-500 rounded-full animate-pulse' />
						<span className='text-muted-foreground'>Live Data</span>
					</div>
				</div>
			</div>
		</div>
	</div>
);
const QuickStats = () => (
	<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
		<Card>
			<CardContent className='p-6'>
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-sm font-medium text-muted-foreground'>
							Analytics Status
						</p>
						<p className='text-2xl font-bold text-green-600'>Active</p>
						<p className='text-sm text-muted-foreground'>
							Real-time tracking enabled
						</p>
					</div>
					<div className='p-3 rounded-full bg-green-50'>
						<TrendingUp className='w-6 h-6 text-green-600' />
					</div>
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardContent className='p-6'>
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-sm font-medium text-muted-foreground'>
							Data Collection
						</p>
						<p className='text-2xl font-bold text-blue-600'>Premium</p>
						<p className='text-sm text-muted-foreground'>Advanced insights enabled</p>
					</div>
					<div className='p-3 rounded-full bg-blue-50'>
						<BarChart3 className='w-6 h-6 text-blue-600' />
					</div>
				</div>
			</CardContent>
		</Card>

		<Card>
			<CardContent className='p-6'>
				<div className='flex items-center justify-between'>
					<div>
						<p className='text-sm font-medium text-muted-foreground'>Service Level</p>
						<p className='text-2xl font-bold text-yellow-600'>Royal</p>
						<p className='text-sm text-muted-foreground'>
							Executive reporting active
						</p>
					</div>
					<div className='p-3 rounded-full bg-yellow-50'>
						<Crown className='w-6 h-6 text-yellow-600' />
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
);
export default function TestimonialsAnalyticsPage() {
	return (
		<div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
			<DashboardHeader />

			<main className='container mx-auto px-4 py-8'>
				<QuickStats />

				<Suspense fallback={<DashboardSkeleton />}>
					<TestimonialsExecutiveDashboard />
				</Suspense>

				{}
				<div className='mt-12 pt-8 border-t border-border/40'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-muted-foreground'>
						<div>
							<h3 className='font-semibold text-foreground mb-2'>
								Analytics Features
							</h3>
							<ul className='space-y-1'>
								<li>• Real-time performance tracking</li>
								<li>• AI-powered optimization insights</li>
								<li>• ROI analysis and reporting</li>
								<li>• User segment analytics</li>
								<li>• Conversion attribution</li>
							</ul>
						</div>

						<div>
							<h3 className='font-semibold text-foreground mb-2'>
								Business Intelligence
							</h3>
							<ul className='space-y-1'>
								<li>• Executive dashboard reporting</li>
								<li>• Performance anomaly detection</li>
								<li>• Competitive advantage analysis</li>
								<li>• Revenue impact measurement</li>
								<li>• Strategic recommendations</li>
							</ul>
						</div>

						<div>
							<h3 className='font-semibold text-foreground mb-2'>Data Security</h3>
							<ul className='space-y-1'>
								<li>• Privacy-compliant tracking</li>
								<li>• Secure data processing</li>
								<li>• Executive-only access</li>
								<li>• Encrypted data transmission</li>
								<li>• GDPR compliant analytics</li>
							</ul>
						</div>
					</div>

					<div className='mt-8 pt-4 border-t border-border/40 text-center text-xs text-muted-foreground'>
						<p>
							© 2025 My Private Tutor Online. Executive Analytics Dashboard. All data
							is processed securely and in compliance with privacy regulations.
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
