'use client';

import { m } from 'framer-motion';
import {
	Crown,
	Target,
	Building,
	Calculator,
	Clock,
	CheckCircle,
	Quote,
	ArrowRight,
	Star,
	Users,
	BookOpen,
	Award,
	TrendingUp,
	Shield,
} from 'lucide-react';
import { Section } from '@/components/layout/section';
export interface CaseStudiesProps {
	readonly title?: string;
	readonly description?: string;
	readonly caseStudies: readonly CaseStudyItem[];
	readonly showInvestmentDetails?: boolean;
	readonly showTestimonials?: boolean;
	readonly filterBySegment?: CaseStudyItem['category'];
	readonly maxItems?: number;
	readonly layout?: 'cards' | 'detailed' | 'testimonial';
	readonly className?: string;
}
export interface CaseStudyItem {
	readonly id: string;
	readonly category:
		| 'oxbridge_prep'
		| '11_plus'
		| 'elite_corporate'
		| 'comparison_shopper';
	readonly anonymizedTitle: string;
	readonly level: string;
	readonly subject?: string;
	readonly initialPosition: string;
	readonly finalOutcome: string;
	readonly duration: string;
	readonly investment: {
		readonly tier: 'essentials' | 'premium' | 'elite';
		readonly approxValue?: string;
	};
	readonly keyInterventions: readonly string[];
	readonly clientTestimonial?: string;
	readonly verified: boolean;
	readonly featured: boolean;
}
const segmentConfig: Record<
	CaseStudyItem['category'],
	{
		icon: React.ReactElement;
		color: string;
		bgColor: string;
		borderColor: string;
		label: string;
		description: string;
	}
> = {
	oxbridge_prep: {
		icon: <Crown className='w-6 h-6' />,
		color: 'text-purple-700',
		bgColor: 'bg-purple-50',
		borderColor: 'border-purple-200',
		label: 'Oxbridge Preparation',
		description: 'Elite university preparation with insider expertise',
	},
	'11_plus': {
		icon: <Target className='w-6 h-6' />,
		color: 'text-blue-700',
		bgColor: 'bg-blue-50',
		borderColor: 'border-blue-200',
		label: '11+ Success',
		description: 'Grammar school preparation with proven methodology',
	},
	elite_corporate: {
		icon: <Building className='w-6 h-6' />,
		color: 'text-gold-700',
		bgColor: 'bg-gold-50',
		borderColor: 'border-gold-200',
		label: 'Elite Corporate',
		description: 'Ultra-high net worth families requiring complete discretion',
	},
	comparison_shopper: {
		icon: <Calculator className='w-6 h-6' />,
		color: 'text-green-700',
		bgColor: 'bg-green-50',
		borderColor: 'border-green-200',
		label: 'Logic-Driven Investment',
		description: 'Quantifiable ROI with clear value proposition analysis',
	},
};
const getTierBadge = (tier: CaseStudyItem['investment']['tier']) => {
	const tierConfig = {
		essentials: {
			label: 'Essentials',
			color: 'bg-slate-100 text-slate-800',
		},
		premium: {
			label: 'Premium',
			color: 'bg-blue-100 text-blue-800',
		},
		elite: {
			label: 'Elite',
			color: 'bg-gold-100 text-gold-800',
		},
	};
	const config = tierConfig[tier];
	return (
		<span
			className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${config.color}`}>
			{config.label} Service
		</span>
	);
};
export function CaseStudies({
	title = 'Transformational Outcomes Through Strategic Investment',
	description = 'Anonymized case studies demonstrating measurable ROI and academic transformation across client segments',
	caseStudies,
	showInvestmentDetails = true,
	showTestimonials = true,
	filterBySegment,
	maxItems,
	layout = 'detailed',
	className = '',
}: CaseStudiesProps) {
	const filteredCaseStudies = caseStudies
		.filter((study) => !filterBySegment || study.category === filterBySegment)
		.filter((study) => study.verified)
		.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
		.slice(0, maxItems);
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
				<div className='space-y-12'>
					{filteredCaseStudies.map((caseStudy, index) => {
						const config = segmentConfig[caseStudy.category];
						return (
							<m.div
								key={caseStudy.id}
								className={`bg-white rounded-2xl shadow-lg border-2 ${config.borderColor} overflow-hidden`}
								initial={{
									opacity: 0,
									y: 40,
								}}
								whileInView={{
									opacity: 1,
									y: 0,
								}}
								transition={{
									duration: 0.6,
									delay: index * 0.2,
								}}
								viewport={{
									once: true,
								}}>
								{}
								<div className={`${config.bgColor} border-b ${config.borderColor} p-6`}>
									<div className='flex items-start justify-between mb-4'>
										<div className='flex items-center gap-4'>
											<div className={`p-3 bg-white rounded-lg ${config.color}`}>
												{config.icon}
											</div>
											<div>
												<h3 className='text-xl font-bold text-slate-900'>
													{caseStudy.anonymizedTitle}
												</h3>
												<p className='text-slate-600'>
													{config.label} • {caseStudy.level}
												</p>
											</div>
										</div>

										<div className='flex flex-col items-end gap-2'>
											{getTierBadge(caseStudy.investment.tier)}
											{caseStudy.featured && (
												<div className='inline-flex items-center gap-1 px-2 py-1 bg-gold-100 text-gold-800 text-xs font-medium rounded-full'>
													<Star className='w-3 h-3' />
													Featured
												</div>
											)}
										</div>
									</div>

									<p
										className={`text-sm ${config.color.replace('text-', 'text-').replace('-700', '-600')}`}>
										{config.description}
									</p>
								</div>

								{}
								<div className='p-6'>
									{}
									<div className='grid md:grid-cols-3 gap-6 mb-8'>
										{}
										<div className='space-y-3'>
											<div className='flex items-center gap-2 text-red-600'>
												<div className='w-2 h-2 bg-red-600 rounded-full'></div>
												<span className='text-sm font-semibold'>Initial Position</span>
											</div>
											<p className='text-slate-700 text-sm'>{caseStudy.initialPosition}</p>
										</div>

										{}
										<div className='flex items-center justify-center'>
											<ArrowRight className='w-8 h-8 text-slate-400' />
										</div>

										{}
										<div className='space-y-3'>
											<div className='flex items-center gap-2 text-green-600'>
												<div className='w-2 h-2 bg-green-600 rounded-full'></div>
												<span className='text-sm font-semibold'>Final Outcome</span>
											</div>
											<p className='text-slate-700 text-sm font-medium'>
												{caseStudy.finalOutcome}
											</p>
										</div>
									</div>

									{}
									<div className='grid md:grid-cols-3 gap-6 mb-8'>
										{}
										<div className='flex items-center gap-3'>
											<Clock className='w-5 h-5 text-slate-500' />
											<div>
												<p className='text-sm font-medium text-slate-900'>Duration</p>
												<p className='text-sm text-slate-600'>{caseStudy.duration}</p>
											</div>
										</div>

										{}
										{caseStudy.subject && (
											<div className='flex items-center gap-3'>
												<BookOpen className='w-5 h-5 text-slate-500' />
												<div>
													<p className='text-sm font-medium text-slate-900'>Focus Area</p>
													<p className='text-sm text-slate-600'>{caseStudy.subject}</p>
												</div>
											</div>
										)}

										{}
										{showInvestmentDetails && caseStudy.investment.approxValue && (
											<div className='flex items-center gap-3'>
												<TrendingUp className='w-5 h-5 text-slate-500' />
												<div>
													<p className='text-sm font-medium text-slate-900'>
														Investment Range
													</p>
													<p className='text-sm text-slate-600'>
														{caseStudy.investment.approxValue}
													</p>
												</div>
											</div>
										)}
									</div>

									{}
									<div className='mb-8'>
										<h4 className='text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2'>
											<Award className='w-5 h-5' />
											Key Interventions
										</h4>
										<div className='grid md:grid-cols-2 gap-3'>
											{caseStudy.keyInterventions.map(
												(intervention, interventionIndex) => (
													<div
														key={interventionIndex}
														className='flex items-start gap-3 p-3 bg-slate-50 rounded-lg'>
														<CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
														<span className='text-sm text-slate-700'>{intervention}</span>
													</div>
												),
											)}
										</div>
									</div>

									{}
									{showTestimonials && caseStudy.clientTestimonial && (
										<div className='bg-slate-50 rounded-lg p-6'>
											<div className='flex items-start gap-4'>
												<Quote className='w-6 h-6 text-slate-400 flex-shrink-0 mt-1' />
												<div>
													<p className='text-slate-700 italic leading-relaxed'>
														"{caseStudy.clientTestimonial}"
													</p>
													<p className='text-sm text-slate-500 mt-3'>
														— Anonymized Client Feedback
													</p>
												</div>
											</div>
										</div>
									)}
								</div>

								{}
								<div className={`${config.bgColor} border-t ${config.borderColor} p-4`}>
									<div className='flex items-center justify-center gap-2 text-sm'>
										<Shield className='w-4 h-4 text-green-600' />
										<span className='text-slate-600'>
											Verified outcome • Client privacy maintained • Results independently
											tracked
										</span>
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
						delay: 0.4,
					}}
					viewport={{
						once: true,
					}}>
					<div className='inline-flex items-center gap-3 px-6 py-3 bg-slate-100 rounded-full'>
						<Shield className='w-5 h-5 text-slate-600' />
						<span className='text-slate-700 text-sm'>
							All case studies anonymized for client privacy while maintaining outcome
							verification
						</span>
					</div>
				</m.div>
			</div>
		</Section>
	);
}
export default CaseStudies;
