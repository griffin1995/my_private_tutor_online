'use client';

import { m } from 'framer-motion';
import {
	TrendingUp,
	Award,
	Crown,
	Target,
	BookOpen,
	Heart,
	CheckCircle,
	AlertCircle,
	BarChart3,
	Users,
	Shield,
	Star,
	DollarSign,
	Calendar,
} from 'lucide-react';
import { Section } from '@/components/layout/section';
import { StatsTrio } from './stats-trio';
import { Separator } from '@/components/ui/separator';
export interface ResultsDocumentationProps {
	readonly title?: string;
	readonly description?: string;
	readonly results: readonly ResultsDocumentationItem[];
	readonly showVerificationBadges?: boolean;
	readonly showConfidenceIntervals?: boolean;
	readonly layout?: 'grid' | 'list' | 'featured';
	readonly maxItems?: number;
	readonly className?: string;
}
export interface ResultsDocumentationItem {
	readonly category:
		| 'grade_improvement'
		| 'university_placement'
		| 'exam_success'
		| 'roi_analysis';
	readonly metric: string;
	readonly value: string;
	readonly description: string;
	readonly sampleSize?: number;
	readonly timeframe: string;
	readonly verificationLevel: 'verified' | 'estimated' | 'projected';
	readonly confidenceInterval?: string;
	readonly icon?: string;
	readonly priority: number;
}
const iconMap: Record<string, React.ReactElement> = {
	TrendingUp: <TrendingUp className='w-8 h-8' />,
	Award: <Award className='w-8 h-8' />,
	Crown: <Crown className='w-8 h-8' />,
	Target: <Target className='w-8 h-8' />,
	BookOpen: <BookOpen className='w-8 h-8' />,
	Heart: <Heart className='w-8 h-8' />,
	BarChart3: <BarChart3 className='w-8 h-8' />,
	Users: <Users className='w-8 h-8' />,
	Shield: <Shield className='w-8 h-8' />,
	Star: <Star className='w-8 h-8' />,
};
const getVerificationBadge = (
	level: ResultsDocumentationItem['verificationLevel'],
) => {
	switch (level) {
		case 'verified':
			return (
				<div className='inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full'>
					<CheckCircle className='w-3 h-3' />
					Verified
				</div>
			);
		case 'estimated':
			return (
				<div className='inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full'>
					<AlertCircle className='w-3 h-3' />
					Estimated
				</div>
			);
		case 'projected':
			return (
				<div className='inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full'>
					<BarChart3 className='w-3 h-3' />
					Projected
				</div>
			);
		default:
			return null;
	}
};
const getCategoryStyle = (category: ResultsDocumentationItem['category']) => {
	const baseStyle = 'text-white border-2';
	switch (category) {
		case 'grade_improvement':
			return `${baseStyle} border-slate-400 bg-primary-700`;
		case 'university_placement':
			return `${baseStyle} border-slate-300 bg-primary-700`;
		case 'exam_success':
			return `${baseStyle} border-slate-400 bg-primary-700`;
		case 'roi_analysis':
			return `${baseStyle} border-slate-300 bg-primary-700`;
		default:
			return `${baseStyle} border-slate-400 bg-primary-700`;
	}
};
export function ResultsDocumentation({
	title = 'Results That Drive Decisions',
	description = 'Verifiable outcomes and competitive advantages that justify premium investment',
	results,
	showVerificationBadges = false,
	showConfidenceIntervals = false,
	layout = 'grid',
	maxItems,
	className = '',
}: ResultsDocumentationProps) {
	const sortedResults = [...results]
		.sort((a, b) => a.priority - b.priority)
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
				<div
					className={`grid gap-6 ${
						layout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3'
						: layout === 'list' ? 'grid-cols-1 max-w-4xl mx-auto'
						: 'md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
					}`}>
					{sortedResults.map((result, index) => (
						<m.div
							key={`${result.category}-${result.metric}`}
							className={`p-6 rounded-xl border-2 ${getCategoryStyle(result.category)} 
                         hover:shadow-lg transition-all duration-300 flex flex-col h-full`}
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
							}}
							whileHover={{
								scale: 1.02,
							}}>
							{}
							<div className='flex items-start justify-between mb-6 h-20'>
								<div className='p-3 rounded-lg bg-white/20 backdrop-blur-sm text-white'>
									{result.icon && iconMap[result.icon] ?
										iconMap[result.icon]
									:	<BarChart3 className='w-8 h-8' />}
								</div>
							</div>

							{}
							<div className='mb-6 h-24'>
								<div className='text-3xl font-bold mb-2 text-white'>{result.value}</div>
								<h3 className='text-lg font-semibold text-white'>{result.metric}</h3>
							</div>

							<Separator className='bg-white/30 mb-6' />

							{}
							<p className='text-sm leading-relaxed mb-6 text-white flex-1'>
								{result.description}
							</p>

							{}
							<div className='space-y-2 text-xs text-white mt-auto'>
								<div className='flex items-center gap-1 text-white'>
									<Calendar className='w-3 h-3 text-white' />
									<span className='text-white'>{result.timeframe}</span>
								</div>
							</div>
						</m.div>
					))}
				</div>

				{}
				{false && (
					<m.div
						className='mt-12'
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
						<StatsTrio
							showAnimation={false}
							variant='default'
						/>
					</m.div>
				)}
			</div>
		</Section>
	);
}
export default ResultsDocumentation;
