'use client';

import { Crown, Award, TrendingUp } from 'lucide-react';
import { getTrustIndicators } from '@/lib/cms';
import { cn } from '@/lib/utils';
interface RoyalTrustIndicatorsProps {
	className?: string;
	variant?: 'horizontal' | 'vertical' | 'grid' | 'premium';
	showDescription?: boolean;
}
const iconMap = {
	'👑': Crown,
	'⭐': Award,
	'📊': TrendingUp,
};
export function RoyalTrustIndicators({
	className,
	variant = 'premium',
	showDescription = true,
}: RoyalTrustIndicatorsProps) {
	const indicators = getTrustIndicators();
	const getIconComponent = (iconString: string) => {
		const IconComponent = iconMap[iconString as keyof typeof iconMap] || Crown;
		return IconComponent;
	};
	const layoutClasses = {
		horizontal:
			'flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center',
		vertical: 'flex flex-col gap-6',
		grid: 'grid grid-cols-1 md:grid-cols-3 gap-6',
		premium: 'grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto',
	};
	const containerClasses = {
		horizontal:
			'bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300',
		vertical:
			'bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300',
		grid:
			'bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300',
		premium:
			'bg-gradient-to-br from-white to-primary-50 rounded-2xl p-8 shadow-premium hover:shadow-royal transition-all duration-500 border border-primary-100 group',
	};
	const itemClasses = {
		horizontal:
			'flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left',
		vertical: 'flex items-center gap-4 text-left',
		grid: 'flex flex-col items-center gap-3 text-center',
		premium: 'flex flex-col items-center gap-4 text-center',
	};
	const iconContainerClasses = {
		horizontal: 'flex-shrink-0 p-3 rounded-full bg-accent-50',
		vertical: 'flex-shrink-0 p-3 rounded-full bg-accent-50',
		grid: 'flex-shrink-0 p-3 rounded-full bg-accent-50',
		premium:
			'flex-shrink-0 p-4 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 group-hover:from-royal-400 group-hover:to-royal-500 transition-all duration-500 shadow-lg',
	};
	const iconClasses = {
		horizontal: 'h-6 w-6 text-accent-600',
		vertical: 'h-6 w-6 text-accent-600',
		grid: 'h-6 w-6 text-accent-600',
		premium:
			'h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300',
	};
	const titleClasses = {
		horizontal: 'font-semibold text-primary-900 text-sm leading-tight',
		vertical: 'font-semibold text-primary-900 text-sm leading-tight',
		grid: 'font-semibold text-primary-900 text-sm leading-tight',
		premium:
			'font-serif font-bold text-primary-900 text-lg leading-tight group-hover:text-royal-700 transition-colours duration-300',
	};
	const descriptionClasses = {
		horizontal: 'text-xs text-primary-600 mt-1 leading-relaxed',
		vertical: 'text-xs text-primary-600 mt-1 leading-relaxed',
		grid: 'text-xs text-primary-600 mt-1 leading-relaxed',
		premium:
			'text-sm text-primary-600 mt-2 leading-relaxed group-hover:text-primary-700 transition-colours duration-300',
	};
	return (
		<div
			className={cn(layoutClasses[variant], className)}
			role='region'
			aria-label='Trust indicators and credentials'>
			{indicators.map((indicator, index) => {
				const IconComponent = getIconComponent(indicator.icon);
				return (
					<div
						key={index}
						className={cn(containerClasses[variant])}
						role='article'
						aria-labelledby={`trust-indicator-${index}-title`}
						aria-describedby={
							showDescription ? `trust-indicator-${index}-desc` : undefined
						}>
						<div className={cn(itemClasses[variant])}>
							<div className={cn(iconContainerClasses[variant])}>
								<IconComponent
									className={cn(iconClasses[variant])}
									aria-hidden='true'
								/>
							</div>
							<div className='flex-1 min-w-0'>
								<h3
									id={`trust-indicator-${index}-title`}
									className={cn(titleClasses[variant])}>
									{indicator.title}
								</h3>
								{showDescription && (
									<p
										id={`trust-indicator-${index}-desc`}
										className={cn(descriptionClasses[variant])}>
										{indicator.description}
									</p>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
export type RoyalTrustIndicatorsVariant =
	| 'horizontal'
	| 'vertical'
	| 'grid'
	| 'premium';
