'use client';

import { Card, CardContent } from '@/components/ui/card';
interface SkeletonCardProps {
	readonly variant?: 'testimonial' | 'compact' | 'list';
	readonly className?: string;
const skeletonVariants = {
	loading: {
		opacity: [0.6, 1, 0.6],
		transition: {
			repeat: Infinity,
		},
	},
};
const shimmerVariants = {
	shimmer: {
		x: [-100, 100],
		transition: {
			repeat: Infinity,
		},
	},
};
function SkeletonCard({
	variant = 'testimonial',
	className = '',
}: SkeletonCardProps) {
	const SkeletonElement = ({
		className = '',
		children,
	}: {
		className?: string;
		children?: React.ReactNode;
	}) => (
		<div
			className={`bg-primary-100 rounded-lg relative overflow-hidden ${className}`}>
			<div
				className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent'
			/>
			{children}
		</div>
	);
	if (variant === 'compact') {
		return (
			<Card
				className={`bg-white/80 backdrop-blur-sm border-2 border-primary-100 rounded-3xl ${className}`}>
				<CardContent className='p-6'>
					<div className='flex items-center justify-between mb-4'>
						<div className='flex items-center gap-1'>
							{[...Array(5)].map((_, i) => (
								<SkeletonElement
									key={i}
									className='w-5 h-5 rounded-full'
								/>
							))}
						</div>
						<SkeletonElement className='w-16 h-6 rounded-full' />
					</div>

					<div className='space-y-2 mb-4'>
						<SkeletonElement className='w-full h-4' />
						<SkeletonElement className='w-4/5 h-4' />
						<SkeletonElement className='w-3/5 h-4' />
					</div>

					<div className='flex items-center gap-3'>
						<SkeletonElement className='w-10 h-10 rounded-full' />
						<div className='flex-1 space-y-2'>
							<SkeletonElement className='w-3/4 h-4' />
							<SkeletonElement className='w-1/2 h-3' />
						</div>
					</div>
				</CardContent>
			</Card>
		);
	if (variant === 'list') {
		return (
			<Card
				className={`bg-white/80 backdrop-blur-sm border-2 border-primary-100 rounded-3xl ${className}`}>
				<CardContent className='p-8 flex flex-col md:flex-row md:gap-8'>
					<div className='flex-1 mb-6 md:mb-0'>
						<div className='flex items-center justify-between mb-6'>
							<div className='flex items-center gap-1'>
								{[...Array(5)].map((_, i) => (
									<SkeletonElement
										key={i}
										className='w-5 h-5 rounded-full'
									/>
								))}
							</div>
							<SkeletonElement className='w-20 h-6 rounded-full' />
						</div>

						<div className='space-y-3 mb-6'>
							<SkeletonElement className='w-full h-5' />
							<SkeletonElement className='w-full h-5' />
							<SkeletonElement className='w-full h-5' />
							<SkeletonElement className='w-4/5 h-5' />
							<SkeletonElement className='w-3/4 h-5' />
						</div>

						<div className='flex flex-wrap gap-2'>
							<SkeletonElement className='w-16 h-6 rounded-full' />
							<SkeletonElement className='w-20 h-6 rounded-full' />
						</div>
					</div>

					<div className='md:w-1/3 md:border-l md:border-primary-100 md:pl-8'>
						<div className='flex items-start gap-4 mb-4'>
							<SkeletonElement className='w-12 h-12 rounded-full' />
							<div className='flex-1 space-y-2'>
								<SkeletonElement className='w-3/4 h-5' />
								<SkeletonElement className='w-full h-4' />
							</div>
						</div>

						<div className='space-y-3'>
							<div className='flex items-center gap-2'>
								<SkeletonElement className='w-4 h-4 rounded' />
								<SkeletonElement className='w-20 h-3' />
							</div>
							<div className='flex items-center gap-2'>
								<SkeletonElement className='w-4 h-4 rounded' />
								<SkeletonElement className='w-24 h-3' />
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		);
	return (
		<Card
			className={`h-full bg-white/80 backdrop-blur-sm border-2 border-primary-100 rounded-3xl ${className}`}>
			<CardContent className='p-8 h-full flex flex-col'>
				<div className='flex items-center justify-between mb-6'>
					<div className='flex items-center gap-1'>
						{[...Array(5)].map((_, i) => (
							<SkeletonElement
								key={i}
								className='w-5 h-5 rounded-full'
							/>
						))}
						<SkeletonElement className='w-8 h-4 ml-2' />
					</div>
					<div className='flex items-center gap-2'>
						<SkeletonElement className='w-16 h-6 rounded-full' />
						<SkeletonElement className='w-8 h-8 rounded-full' />
					</div>
				</div>

				<div className='relative flex-1 mb-6'>
					<SkeletonElement className='absolute -top-2 -left-2 w-8 h-8 rounded' />
					<div className='relative z-10 space-y-3 pl-4'>
						<SkeletonElement className='w-full h-4' />
						<SkeletonElement className='w-full h-4' />
						<SkeletonElement className='w-4/5 h-4' />
						<SkeletonElement className='w-3/4 h-4' />
						<SkeletonElement className='w-2/3 h-4' />

						<SkeletonElement className='w-24 h-6 mt-4' />
					</div>
				</div>

				<div className='border-t border-primary-100 pt-6'>
					<div className='flex items-start gap-4'>
						<SkeletonElement className='w-12 h-12 rounded-full' />
						<div className='flex-1 space-y-2'>
							<SkeletonElement className='w-3/4 h-4' />
							<SkeletonElement className='w-full h-3' />

							<div className='flex flex-wrap items-center gap-3 pt-2'>
								<div className='flex items-center gap-1'>
									<SkeletonElement className='w-3 h-3 rounded' />
									<SkeletonElement className='w-16 h-3' />
								</div>
								<div className='flex items-center gap-1'>
									<SkeletonElement className='w-3 h-3 rounded' />
									<SkeletonElement className='w-20 h-3' />
								</div>
							</div>
						</div>
					</div>

					<div className='flex items-center justify-between mt-4 pt-4 border-t border-primary-50'>
						<SkeletonElement className='w-16 h-8 rounded-lg' />
						<SkeletonElement className='w-8 h-8 rounded' />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default SkeletonCard;
