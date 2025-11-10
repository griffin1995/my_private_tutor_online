'use client';

import ClientSuccessMetricsDashboard from '@/components/dashboards/client-success-metrics-dashboard';
import { PageLayout } from '@/components/layout/page-layout';

export default function DashboardPage() {
	return (
		<PageLayout
			background='slate'
			className='min-h-screen'>
			{}
			<div className='bg-white border-b border-slate-200'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					<div className='flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
						<div>
							<h1 className='text-3xl font-bold text-slate-900'>
								Business Intelligence Dashboard
							</h1>
							<p className='mt-2 text-slate-600'>
								Comprehensive analytics for My Private Tutor Online's client success
								metrics
							</p>
						</div>

						<div className='flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4'>
							<div className='flex items-center space-x-2 text-sm text-slate-500'>
								<div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
								<span>Live Data</span>
							</div>

							<div className='text-sm text-slate-500'>
								Royal Client Standards • Enterprise Grade Analytics
							</div>
						</div>
					</div>
				</div>
			</div>

			{}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='space-y-8'>
					{}
					<div className='bg-white rounded-lg border border-slate-200 p-6'>
						<div className='flex items-start space-x-4'>
							<div className='flex-shrink-0'>
								<div className='w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center'>
									<svg
										className='w-6 h-6 text-slate-600'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
										/>
									</svg>
								</div>
							</div>

							<div className='flex-1'>
								<h2 className='text-xl font-semibold text-slate-900'>
									Client Success Metrics Overview
								</h2>
								<p className='mt-1 text-slate-600'>
									This dashboard provides comprehensive insights into testimonials
									effectiveness, client conversion rates, and business performance
									metrics. Data is updated in real-time and integrated with our premium
									tutoring service analytics.
								</p>

								<div className='mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4'>
									<div className='bg-slate-50 p-4 rounded-lg'>
										<div className='text-2xl font-bold text-slate-900'>£400,000+</div>
										<div className='text-sm text-slate-600'>Revenue Opportunity</div>
									</div>

									<div className='bg-slate-50 p-4 rounded-lg'>
										<div className='text-2xl font-bold text-slate-900'>15+ Years</div>
										<div className='text-sm text-slate-600'>Service Excellence</div>
									</div>

									<div className='bg-slate-50 p-4 rounded-lg'>
										<div className='text-2xl font-bold text-slate-900'>Elite</div>
										<div className='text-sm text-slate-600'>Royal Client Standards</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{}
					<ClientSuccessMetricsDashboard />

					{}
					<div className='bg-white rounded-lg border border-slate-200 p-6'>
						<div className='flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
							<div className='text-sm text-slate-600'>
								<p className='font-semibold text-slate-900 mb-1'>
									Dashboard Information
								</p>
								<p>
									This business intelligence system integrates with our comprehensive
									CMS, analytics tracking, and testimonials management system to provide
									actionable insights for executive decision-making and performance
									optimization.
								</p>
							</div>

							<div className='flex flex-col space-y-2 lg:items-end'>
								<div className='text-sm text-slate-500'>
									Powered by Recharts & Next.js
								</div>
								<div className='text-xs text-slate-400'>
									Task 12: Client Success Metrics Dashboard Complete
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageLayout>
	);
}
