'use client';

import dynamic from 'next/dynamic';
import { lazy, Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Type-safe null component that satisfies React.ComponentType
const NullComponent: React.ComponentType = () => null;

// Standardized loading skeletons with Motion animations
const StandardSkeleton = ({ className }: { className?: string }) => (
	<motion.div
		className={`bg-slate-200 rounded ${className}`}
		initial={{ opacity: 0.6 }}
		animate={{ opacity: [0.6, 1, 0.6] }}
		transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
	/>
);

const SectionLoadingSkeleton = ({
	title = true,
	subtitle = true,
	content,
	className = 'py-16 lg:py-24',
	background = 'bg-white'
}: {
	title?: boolean;
	subtitle?: boolean;
	content: 'grid' | 'cards' | 'form' | 'carousel';
	className?: string;
	background?: string;
}) => (
	<div className={`${className} ${background}`}>
		<div className='container mx-auto px-4'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className='text-center mb-12'>
				{title && (
					<StandardSkeleton className='h-8 w-1/2 mx-auto mb-4' />
				)}
				{subtitle && (
					<StandardSkeleton className='h-4 w-1/3 mx-auto mb-8' />
				)}
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
				className={
					content === 'grid' ? 'grid grid-cols-1 md:grid-cols-3 gap-6' :
					content === 'cards' ? 'grid grid-cols-2 md:grid-cols-4 gap-4' :
					content === 'carousel' ? 'flex gap-4 overflow-hidden' :
					'max-w-2xl mx-auto space-y-4'
				}>
				{content === 'grid' && [1, 2, 3].map((i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}>
						<StandardSkeleton className='h-48 w-full rounded-xl' />
					</motion.div>
				))}
				{content === 'cards' && [1, 2, 3, 4].map((i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}>
						<StandardSkeleton className='h-24 w-full rounded-lg' />
					</motion.div>
				))}
				{content === 'carousel' && [1, 2, 3].map((i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}>
						<StandardSkeleton className='min-w-80 h-64 rounded-xl' />
					</motion.div>
				))}
				{content === 'form' && (
					<>
						<StandardSkeleton className='h-12 w-full rounded-lg' />
						<StandardSkeleton className='h-12 w-full rounded-lg' />
						<StandardSkeleton className='h-32 w-full rounded-lg' />
						<StandardSkeleton className='h-12 w-full rounded-lg' />
					</>
				)}
			</motion.div>
		</div>
	</div>
);

// Special skeleton for ThreePillars component with unique aspect ratio
const ThreePillarsSkeleton = () => (
	<div className='py-16 lg:py-24 bg-white'>
		<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className='grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto'>
				{[1, 2, 3].map((i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, y: 30, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						transition={{
							duration: 0.8,
							ease: 'easeOut',
							delay: i * 0.15 // Staggered delay matching real component
						}}
						className='group shadow-xl overflow-hidden'>
						<div className='relative w-full aspect-[8/5] sm:aspect-[2/1] md:aspect-[5/2] lg:h-full lg:min-h-[710px] bg-slate-300'>
							<div className='absolute inset-0 p-8 lg:p-12 flex flex-col'>
								<div className='flex-shrink-0 lg:h-32 lg:flex lg:items-end lg:pb-2'>
									<StandardSkeleton className='h-10 lg:h-16 w-3/4' />
								</div>
								<div className='flex-shrink-0 py-6'>
									<StandardSkeleton className='h-px w-full' />
								</div>
								<div className='flex-1 lg:h-80 flex flex-col justify-center lg:justify-start'>
									<StandardSkeleton className='h-20 lg:h-24 w-full mb-4' />
									<StandardSkeleton className='h-16 lg:h-20 w-5/6' />
								</div>
								<div className='flex-shrink-0 lg:h-24 lg:flex lg:items-start lg:pt-6'>
									<StandardSkeleton className='h-4 w-1/2' />
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	</div>
);

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
		default: NullComponent,
	}),
);
const AdminDashboard = lazy(() =>
	import('../admin/faq-admin-dashboard')
		.then((mod) => ({
			default: mod.FAQAdminDashboard || NullComponent,
		}))
		.catch(() =>
			Promise.resolve({
				default: NullComponent,
			}),
		),
);
const ChartComponents = lazy(() =>
	Promise.resolve({
		default: NullComponent,
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
			<SectionLoadingSkeleton
				content="grid"
				background="bg-gradient-to-br from-slate-50 to-white"
			/>
		),
		ssr: false,
	},
);
const LazyResultsSection = dynamic(
	() =>
		import('../sections/results-section').then((mod) => ({
			default: mod.ResultsSection,
		})),
	{
		loading: () => (
			<SectionLoadingSkeleton
				content="cards"
				background="bg-white"
			/>
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
			<SectionLoadingSkeleton
				content="carousel"
				background="bg-gradient-to-br from-white to-slate-50"
			/>
		),
	},
);
const LazyThreePillarsSection = dynamic(
	() =>
		import('../sections/three-pillars-section').then((mod) => ({
			default: mod.ThreePillarsSection,
		})),
	{
		loading: () => <ThreePillarsSkeleton />,
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
			<SectionLoadingSkeleton
				content="form"
				title={false}
				subtitle={false}
				className="py-8"
			/>
		),
		ssr: false,
	},
);
const AnalyticsFallback = () => (
	<div className='bg-white rounded-xl border border-slate-200 p-8'>
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}>
			<StandardSkeleton className='h-6 w-1/2 mb-4' />
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
				{[1, 2, 3, 4].map((i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.05 }}>
						<StandardSkeleton className='h-24 w-full rounded-lg' />
					</motion.div>
				))}
			</div>
		</motion.div>
	</div>
);
const GamificationFallback = () => (
	<div className='bg-gradient-to-br from-white via-slate-50 to-white border-2 border-slate-200 rounded-3xl shadow-xl p-6 lg:p-8'>
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}>
			<StandardSkeleton className='h-8 w-1/3 mb-6' />
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
				{[1, 2, 3].map((i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}>
						<StandardSkeleton className='h-32 w-full rounded-xl' />
					</motion.div>
				))}
			</div>
			<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
				{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
					<motion.div
						key={i}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.3, ease: 'easeOut', delay: 0.5 + i * 0.05 }}>
						<StandardSkeleton className='h-20 w-full rounded-xl' />
					</motion.div>
				))}
			</div>
		</motion.div>
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
			(entries) => {
				const entry = entries[0];
				if (entry && entry.isIntersecting) {
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
const LazyFAQGamificationSystem = (props: any) => (
	<Suspense fallback={<GamificationFallback />}>
		<FAQGamificationSystem {...props} />
	</Suspense>
);
const LazyFAQAnalyticsDashboard = (props: any) => (
	<Suspense fallback={<AnalyticsFallback />}>
		<FAQAnalyticsDashboard {...props} />
	</Suspense>
);
const LazyPerformanceDashboard = (props: any) => (
	<Suspense fallback={<AnalyticsFallback />}>
		<PerformanceDashboard {...props} />
	</Suspense>
);
const LazyVoiceSearchComponents = (props: any) => (
	<Suspense
		fallback={
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}>
				<StandardSkeleton className='h-16 w-full rounded-lg' />
			</motion.div>
		}>
		<VoiceSearchComponents {...props} />
	</Suspense>
);
const LazyAdminDashboard = (props: any) => (
	<Suspense fallback={<AnalyticsFallback />}>
		<AdminDashboard {...props} />
	</Suspense>
);
const LazyChartComponents = (props: any) => (
	<Suspense fallback={<AnalyticsFallback />}>
		<ChartComponents {...props} />
	</Suspense>
);
const LazyQuoteRequestForm = (props: any) => (
	<Suspense
		fallback={
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}
				className='max-w-2xl mx-auto space-y-4'>
				<StandardSkeleton className='h-12 w-full rounded-lg' />
				<StandardSkeleton className='h-12 w-full rounded-lg' />
				<StandardSkeleton className='h-32 w-full rounded-lg' />
				<StandardSkeleton className='h-12 w-full rounded-lg' />
			</motion.div>
		}>
		<QuoteRequestForm {...props} />
	</Suspense>
);
const LazyNewsletterForm = (props: any) => (
	<Suspense
		fallback={
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.6, ease: 'easeOut' }}>
				<StandardSkeleton className='h-32 w-full rounded-xl' />
			</motion.div>
		}>
		<NewsletterForm {...props} />
	</Suspense>
);
export {
	LazyTestimonialsSection,
	LazyResultsSection,
	LazyServicesCarousel,
	LazyThreePillarsSection,
	LazyConsultationForm,
	LazyFAQGamificationSystem,
	LazyFAQAnalyticsDashboard,
	LazyPerformanceDashboard,
	LazyVoiceSearchComponents,
	LazyAdminDashboard,
	LazyChartComponents,
	LazyQuoteRequestForm,
	LazyNewsletterForm,
	preloadRouteComponents,
	useIntersectionLoader,
};
const preloadGamificationSystem = () =>
	preloadComponent(() => import('../faq/faq-gamification-system'));
const preloadAnalyticsDashboard = () =>
	preloadComponent(() => import('../analytics/faq-analytics-dashboard'));
const preloadPerformanceDashboard = () =>
	preloadComponent(() => import('../performance/PerformanceDashboard'));
const preloadVoiceSearch = () =>
	preloadComponent(() =>
		Promise.resolve({
			default: () => null,
		}),
	);
const preloadConsultationForm = () =>
	preloadComponent(() => import('../forms/consultation-booking-form'));
const preloadTestimonials = () =>
	preloadComponent(() => import('../sections/testimonials-section'));
const preloadServicesCarousel = () =>
	preloadComponent(() => import('../sections/services-carousel'));
const preloadThreePillarsSection = () =>
	preloadComponent(() => import('../sections/three-pillars-section'));
const preloadRouteComponents = (route: string) => {
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
