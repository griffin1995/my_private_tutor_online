'use client';

import dynamic from 'next/dynamic';
import { lazy, Suspense, useEffect, useState } from 'react';
const FAQGamificationSystem = lazy(() =>
	import('../faq/faq-gamification-system').then((mod) => ({
		default: mod.FAQGamificationSystem,
	})),
);
const FAQAnalyticsDashboard = lazy(() =>
	import('../analytics/faq-analytics-dashboard').then((mod) => ({
		default: mod.FAQAnalyticsDashboard,
	})),
);
const PerformanceDashboard = lazy(() =>
	import('../performance/PerformanceDashboard').then((mod) => ({
		default: mod.PerformanceDashboard,
	})),
);
const VoiceSearchComponents = lazy(() =>
	Promise.resolve({
		default: () => null,
	}),
);
const AdminDashboard = lazy(() =>
	import('../admin/faq-admin-dashboard')
		.then((mod) => ({
			default: mod.FAQAdminDashboard || (() => null),
		}))
		.catch(() =>
			Promise.resolve({
				default: () => null,
			}),
		),
);
const ChartComponents = lazy(() =>
	Promise.resolve({
		default: () => null,
	}),
);
const QuoteRequestForm = lazy(() =>
	import('../forms/quote-request-form').then((mod) => ({
		default: mod.QuoteRequestForm,
	})),
);
const NewsletterForm = lazy(() =>
	import('../forms/newsletter-form').then((mod) => ({
		default: mod.NewsletterForm,
	})),
);
const LazyTestimonialsSection = dynamic(
	() =>
		import('../sections/testimonials-section').then((mod) => ({
			default: mod.TestimonialsSection,
		})),
	{
		loading: () => (
			<div className='py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-white'>
				<div className='container mx-auto px-4 text-center'>
					<div className='animate-pulse'>
						<div className='h-8 bg-slate-200 rounded w-1/2 mx-auto mb-4'></div>
						<div className='h-4 bg-slate-200 rounded w-1/3 mx-auto mb-8'></div>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className='h-48 bg-slate-200 rounded-xl'></div>
							))}
						</div>
					</div>
				</div>
			</div>
		),
		ssr: false,
		suspense: false,
	},
);
const LazyResultsSection = dynamic(
	() =>
		import('../sections/results-section').then((mod) => ({
			default: mod.ResultsSection,
		})),
	{
		loading: () => (
			<div className='py-16 lg:py-24 bg-white'>
				<div className='container mx-auto px-4 text-center'>
					<div className='animate-pulse'>
						<div className='h-8 bg-slate-200 rounded w-1/2 mx-auto mb-4'></div>
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
							{[1, 2, 3, 4].map((i) => (
								<div
									key={i}
									className='h-24 bg-slate-200 rounded-lg'></div>
							))}
						</div>
					</div>
				</div>
			</div>
		),
	},
);
const LazyServicesCarousel = dynamic(
	() =>
		import('../sections/services-carousel').then((mod) => ({
			default: mod.ServicesCarousel,
		})),
	{
		loading: () => (
			<div className='py-16 lg:py-24 bg-gradient-to-br from-white to-slate-50'>
				<div className='container mx-auto px-4'>
					<div className='animate-pulse'>
						<div className='h-8 bg-slate-200 rounded w-1/3 mx-auto mb-8'></div>
						<div className='flex gap-4 overflow-hidden'>
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className='min-w-80 h-64 bg-slate-200 rounded-xl'></div>
							))}
						</div>
					</div>
				</div>
			</div>
		),
	},
);
const LazyThreePillarsSection = dynamic(
	() =>
		import('../sections/three-pillars-section').then((mod) => ({
			default: mod.ThreePillarsSection,
		})),
	{
		loading: () => (
			<div className='py-16 lg:py-24 bg-white'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<div className='animate-pulse'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto'>
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className='group'>
									<div className='bg-slate-200 shadow-lg overflow-hidden'>
										<div className='relative'>
											<div
												style={{
													aspectRatio: '2/3',
												}}>
												<div className='w-full h-full bg-slate-300'></div>
											</div>
											<div className='absolute inset-0 bg-slate-400/30'></div>
											<div className='absolute inset-0 p-8 pt-32 flex flex-col justify-end'>
												<div className='h-10 bg-slate-300 rounded w-3/4 mb-2'></div>
												<div className='h-6 bg-slate-300 rounded w-2/3 mb-4'></div>
												<div className='h-px bg-slate-300 mb-4'></div>
												<div className='h-20 bg-slate-300 rounded mb-4'></div>
												<div className='h-4 bg-slate-300 rounded w-1/2'></div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		),
		ssr: false,
	},
);
const LazyConsultationForm = dynamic(
	() =>
		import('../forms/consultation-booking-form').then((mod) => ({
			default: mod.ConsultationBookingForm,
		})),
	{
		loading: () => (
			<div className='max-w-2xl mx-auto'>
				<div className='animate-pulse space-y-4'>
					<div className='h-12 bg-slate-200 rounded-lg'></div>
					<div className='h-12 bg-slate-200 rounded-lg'></div>
					<div className='h-32 bg-slate-200 rounded-lg'></div>
					<div className='h-12 bg-slate-200 rounded-lg'></div>
				</div>
			</div>
		),
		ssr: false,
	},
);
const AnalyticsFallback = () => (
	<div className='bg-white rounded-xl border border-slate-200 p-8'>
		<div className='animate-pulse'>
			<div className='h-6 bg-slate-200 rounded w-1/2 mb-4'></div>
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
				{[1, 2, 3, 4].map((i) => (
					<div
						key={i}
						className='h-24 bg-slate-200 rounded-lg'></div>
				))}
			</div>
		</div>
	</div>
);
const GamificationFallback = () => (
	<div className='bg-gradient-to-br from-white via-slate-50 to-white border-2 border-slate-200 rounded-3xl shadow-xl p-6 lg:p-8'>
		<div className='animate-pulse'>
			<div className='h-8 bg-slate-200 rounded w-1/3 mb-6'></div>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
				{[1, 2, 3].map((i) => (
					<div
						key={i}
						className='h-32 bg-slate-200 rounded-xl'></div>
				))}
			</div>
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
				{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
					<div
						key={i}
						className='h-20 bg-slate-200 rounded-xl'></div>
				))}
			</div>
		</div>
	</div>
);
const preloadComponent = (componentImport: () => Promise<any>) => {
	componentImport();
};
const useIntersectionLoader = (loadFunction: () => void, threshold = 0.1) => {
	const [ref, setRef] = useState<HTMLDivElement | null>(null);
	useEffect(() => {
		if (!ref) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					loadFunction();
					observer.disconnect();
				}
			},
			{
				threshold,
				rootMargin: '100px',
			},
		);
		observer.observe(ref);
		return () => observer.disconnect();
	}, [ref, loadFunction, threshold]);
	return setRef;
};
export const LazyFAQGamificationSystem = (props: any) => (
	<Suspense fallback={<GamificationFallback />}>
		<FAQGamificationSystem {...props} />
	</Suspense>
);
export const LazyFAQAnalyticsDashboard = (props: any) => (
	<Suspense fallback={<AnalyticsFallback />}>
		<FAQAnalyticsDashboard {...props} />
	</Suspense>
);
export const LazyPerformanceDashboard = (props: any) => (
	<Suspense fallback={<AnalyticsFallback />}>
		<PerformanceDashboard {...props} />
	</Suspense>
);
export const LazyVoiceSearchComponents = (props: any) => (
	<Suspense
		fallback={<div className='h-16 bg-slate-100 rounded-lg animate-pulse'></div>}>
		<VoiceSearchComponents {...props} />
	</Suspense>
);
export const LazyAdminDashboard = (props: any) => (
	<Suspense fallback={<AnalyticsFallback />}>
		<AdminDashboard {...props} />
	</Suspense>
);
export const LazyChartComponents = (props: any) => (
	<Suspense fallback={<AnalyticsFallback />}>
		<ChartComponents {...props} />
	</Suspense>
);
export const LazyQuoteRequestForm = (props: any) => (
	<Suspense
		fallback={<div className='h-96 bg-slate-100 animate-pulse rounded-xl'></div>}>
		<QuoteRequestForm {...props} />
	</Suspense>
);
export const LazyNewsletterForm = (props: any) => (
	<Suspense
		fallback={<div className='h-32 bg-slate-100 animate-pulse rounded-xl'></div>}>
		<NewsletterForm {...props} />
	</Suspense>
);
export {
	LazyConsultationForm,
	LazyResultsSection,
	LazyServicesCarousel,
	LazyTestimonialsSection,
	LazyThreePillarsSection,
	useIntersectionLoader,
};
export const preloadGamificationSystem = () =>
	preloadComponent(() => import('../faq/faq-gamification-system'));
export const preloadAnalyticsDashboard = () =>
	preloadComponent(() => import('../analytics/faq-analytics-dashboard'));
export const preloadPerformanceDashboard = () =>
	preloadComponent(() => import('../performance/PerformanceDashboard'));
export const preloadVoiceSearch = () =>
	preloadComponent(() =>
		Promise.resolve({
			default: () => null,
		}),
	);
export const preloadConsultationForm = () =>
	preloadComponent(() => import('../forms/consultation-booking-form'));
export const preloadTestimonials = () =>
	preloadComponent(() => import('../sections/testimonials-section'));
export const preloadServicesCarousel = () =>
	preloadComponent(() => import('../sections/services-carousel'));
export const preloadThreePillarsSection = () =>
	preloadComponent(() => import('../sections/three-pillars-section'));
export const preloadRouteComponents = (route: string) => {
	switch (route) {
		case '/faq':
			preloadGamificationSystem();
			preloadVoiceSearch();
			break;
		case '/dashboard':
			preloadAnalyticsDashboard();
			preloadPerformanceDashboard();
			break;
		case '/services':
			preloadServicesCarousel();
			preloadConsultationForm();
			break;
		case '/testimonials':
			preloadTestimonials();
			break;
		default:
			preloadConsultationForm();
	}
};
