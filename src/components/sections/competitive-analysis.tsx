'use client';

import { m } from 'framer-motion';
import {
	Crown,
	Shield,
	Award,
	Target,
	TrendingUp,
	Users,
	CheckCircle,
	X,
	ChevronRight,
	Star,
	Lock,
	BookOpen,
	BarChart3,
} from 'lucide-react';
import { Section } from '@/components/layout/section';
export interface CompetitiveAnalysisProps {
	readonly title?: string;
	readonly description?: string;
	readonly competitiveData: readonly CompetitiveAnalysisItem[];
	readonly showComparisons?: boolean;
	readonly highlightedCategories?: readonly CompetitiveAnalysisItem['category'][];
	readonly layout?: 'comparison' | 'advantages' | 'mixed';
	readonly className?: string;
}
export interface CompetitiveAnalysisItem {
	readonly category:
		| 'pricing'
		| 'service_quality'
		| 'credentials'
		| 'exclusivity'
		| 'results';
	readonly metricName: string;
	readonly ourAdvantage: string;
	readonly industryAverage?: string;
	readonly competitorComparison?: string;
	readonly justification: string;
	readonly supportingEvidence: readonly string[];
	readonly clientSegment:
		| 'oxbridge_prep'
		| '11_plus'
		| 'elite_corporate'
		| 'comparison_shopper'
		| 'all';
	readonly priority: number;
}
const categoryConfig: Record<
	CompetitiveAnalysisItem['category'],
	{
		icon: React.ReactElement;
		color: string;
		bgColor: string;
		label: string;
	}
> = {
	exclusivity: {
		icon: <Crown className='w-6 h-6' />,
		color: 'text-purple-700',
		bgColor: 'bg-purple-100',
		label: 'Exclusivity',
	},
	credentials: {
		icon: <Shield className='w-6 h-6' />,
		color: 'text-blue-700',
		bgColor: 'bg-blue-100',
		label: 'Credentials',
	},
	service_quality: {
		icon: <Star className='w-6 h-6' />,
		color: 'text-green-700',
		bgColor: 'bg-green-100',
		label: 'Service Quality',
	},
	results: {
		icon: <TrendingUp className='w-6 h-6' />,
		color: 'text-red-700',
		bgColor: 'bg-red-100',
		label: 'Results',
	},
	pricing: {
		icon: <BarChart3 className='w-6 h-6' />,
		color: 'text-gold-700',
		bgColor: 'bg-gold-100',
		label: 'Value Proposition',
	},
};
const getSegmentBadge = (segment: CompetitiveAnalysisItem['clientSegment']) => {
	const segmentConfig = {
		oxbridge_prep: {
			label: 'Oxbridge Prep',
			color: 'bg-purple-100 text-purple-800',
		},
		'11_plus': {
			label: '11+ Parents',
			color: 'bg-blue-100 text-blue-800',
		},
		elite_corporate: {
			label: 'Elite Corporate',
			color: 'bg-gold-100 text-gold-800',
		},
		comparison_shopper: {
			label: 'Logic-Driven',
			color: 'bg-green-100 text-green-800',
		},
		all: {
			label: 'All Clients',
			color: 'bg-slate-100 text-slate-800',
		},
	};
	const config = segmentConfig[segment];
	return (
		<span
			className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
			{config.label}
		</span>
	);
};
export function CompetitiveAnalysis({
	title = 'Why Premium Investment Delivers Superior Results',
	description = 'Our competitive advantages that justify investment in exceptional educational outcomes',
	competitiveData,
	showComparisons = true,
	highlightedCategories = ['exclusivity', 'credentials', 'results'],
	layout = 'mixed',
	className = '',
}: CompetitiveAnalysisProps) {
	const sortedData = [...competitiveData]
		.filter(
			(item) =>
				highlightedCategories.length === 0 ||
				highlightedCategories.includes(item.category),
		)
		.sort((a, b) => a.priority - b.priority);
	return (
		<Section className={`py-16 lg:py-24 ${className}`}>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				{}
				<m.div
					className='text-center mb-16'
					initial={{
						opacity: 0,
						y: 20,
					}}
					whileInView={{
						opacity: 1,
						y: 0,
					}}
					transition={{
						duration: 0.6,
					}}
					viewport={{
						once: true,
					}}>
					<h2 className='text-4xl lg:text-5xl font-serif font-bold text-slate-900 mb-6'>
						{title}
					</h2>
					<p className='text-xl text-slate-700 max-w-4xl mx-auto leading-relaxed'>
						{description}
					</p>
				</m.div>

				{}
				<div className='space-y-8'>
					{sortedData.map((item, index) => {
						const config = categoryConfig[item.category];
						return (
							<m.div
								key={`${item.category}-${item.metricName}`}
								className='bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden'
								initial={{
									opacity: 0,
									y: 30,
								}}
								whileInView={{
									opacity: 1,
									y: 0,
								}}
								transition={{
									duration: 0.5,
									delay: index * 0.1,
								}}
								viewport={{
									once: true,
								}}>
								<div className='p-8'>
									{}
									<div className='flex items-start justify-between mb-6'>
										<div className='flex items-center gap-3'>
											<div className={`p-3 rounded-lg ${config.bgColor} ${config.color}`}>
												{config.icon}
											</div>
											<div>
												<h3 className='text-xl font-bold text-slate-900'>
													{item.metricName}
												</h3>
												<p className='text-sm text-slate-600'>{config.label}</p>
											</div>
										</div>
										{getSegmentBadge(item.clientSegment)}
									</div>

									{}
									{showComparisons &&
										(item.industryAverage || item.competitorComparison) && (
											<div className='grid md:grid-cols-3 gap-4 mb-6'>
												{}
												<div className='bg-green-50 border border-green-200 rounded-lg p-4'>
													<div className='flex items-center gap-2 mb-2'>
														<CheckCircle className='w-4 h-4 text-green-600' />
														<span className='text-sm font-medium text-green-800'>
															Our Approach
														</span>
													</div>
													<p className='text-sm text-green-700 font-medium'>
														{item.ourAdvantage}
													</p>
												</div>

												{}
												{item.industryAverage && (
													<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
														<div className='flex items-center gap-2 mb-2'>
															<BarChart3 className='w-4 h-4 text-yellow-600' />
															<span className='text-sm font-medium text-yellow-800'>
																Industry Average
															</span>
														</div>
														<p className='text-sm text-yellow-700'>{item.industryAverage}</p>
													</div>
												)}

												{}
												{item.competitorComparison && (
													<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
														<div className='flex items-center gap-2 mb-2'>
															<X className='w-4 h-4 text-red-600' />
															<span className='text-sm font-medium text-red-800'>
																Typical Competitors
															</span>
														</div>
														<p className='text-sm text-red-700'>
															{item.competitorComparison}
														</p>
													</div>
												)}
											</div>
										)}

									{}
									<div className='mb-6'>
										<h4 className='text-lg font-semibold text-slate-900 mb-3'>
											Why This Matters
										</h4>
										<p className='text-slate-700 leading-relaxed'>{item.justification}</p>
									</div>

									{}
									<div>
										<h4 className='text-lg font-semibold text-slate-900 mb-3'>
											Supporting Evidence
										</h4>
										<div className='grid md:grid-cols-2 gap-3'>
											{item.supportingEvidence.map((evidence, evidenceIndex) => (
												<div
													key={evidenceIndex}
													className='flex items-start gap-3 p-3 bg-slate-50 rounded-lg'>
													<ChevronRight className='w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0' />
													<span className='text-sm text-slate-700'>{evidence}</span>
												</div>
											))}
										</div>
									</div>
								</div>
							</m.div>
						);
					})}
				</div>

				{}
				<m.div
					className='mt-16 text-center'
					initial={{
						opacity: 0,
					}}
					whileInView={{
						opacity: 1,
					}}
					transition={{
						duration: 0.6,
						delay: 0.3,
					}}
					viewport={{
						once: true,
					}}>
					<div className='inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gold-100 to-gold-200 rounded-full border border-gold-300'>
						<Lock className='w-5 h-5 text-gold-700' />
						<span className='text-gold-800 font-medium'>
							Premium positioning through measurable competitive advantages
						</span>
					</div>
				</m.div>
			</div>
		</Section>
	);
}
export default CompetitiveAnalysis;
