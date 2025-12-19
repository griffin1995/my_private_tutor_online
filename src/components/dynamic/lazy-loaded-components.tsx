'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

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

const preloadComponent = (componentImport: () => Promise<any>) => {
	componentImport();
};

export {
	LazyServicesCarousel,
};

const preloadServicesCarousel = () =>
	preloadComponent(() => import('../sections/services-carousel'));