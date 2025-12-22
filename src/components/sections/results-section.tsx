'use client';

import Image from 'next/image';
import { Award, Crown, Users, School, TrendingUp, Shield } from 'lucide-react';
import CountUp from 'react-countup';
import { getResultsStatistics } from '@/lib/cms/cms-content';
import { HeadingText, BodyText } from '@/components/ui/typography';
interface ResultsSectionProps {
	title?: string;
	description?: string;
	backgroundColor?: string;
	className?: string;
	showDescription?: boolean;
}
export function ResultsSection({
	title = 'Results that Speak for Themselves (No styling revisions made yet, only moved)',
	description,
	backgroundColor = 'bg-gradient-to-br from-slate-50 via-white to-blue-50/30',
	className = '',
	showDescription = false,
}: ResultsSectionProps) {
	const resultsStats = getResultsStatistics();
	return (
		<section
			className={`py-20 lg:py-32 ${backgroundColor} ${className} relative overflow-hidden`}>
			<div className='absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/10 to-transparent opacity-60' />
			<div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-accent-50/20 to-transparent' />

			<div className='container mx-auto px-6 lg:px-12 max-w-7xl relative'>
				<div
					className='text-center mb-16 lg:mb-20'>
					<div className='flex items-center justify-center mb-8'>
						<div className='h-px bg-gradient-to-r from-transparent via-accent-300 to-transparent flex-1 max-w-24' />
						<Crown className='w-8 h-8 text-accent-600 mx-6' />
						<div className='h-px bg-gradient-to-r from-transparent via-accent-300 to-transparent flex-1 max-w-24' />
					</div>

					<HeadingText
						variant="primary"
						level={2}
						className="font-black text-transparent bg-gradient-to-r from-primary-950 via-primary-800 to-primary-950 bg-clip-text mb-6 leading-tight"
						responsive
					>
						{title}
					</HeadingText>

					<BodyText
						variant="large"
						className="text-primary-700 font-medium max-w-4xl mx-auto mb-4"
						responsive
					>
						Trusted by Royal Families • Featured in Tatler Address Book 2025
					</BodyText>

					{showDescription && description && (
						<BodyText
							variant="large"
							className="text-primary-600 max-w-4xl mx-auto leading-relaxed"
							responsive
						>
							{description}
						</BodyText>
					)}
				</div>

				<div
					className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto'>
					{resultsStats.map((stat, index) => (
						<div
							key={index}
							className='group relative'>
							<div className='relative p-8 lg:p-10 bg-white rounded-2xl shadow-lg shadow-primary-900/5 border border-primary-100/50 backdrop-blur-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary-900/10 group-hover:-translate-y-2 group-hover:scale-[1.02] overflow-hidden'>
								<div className='absolute inset-0 bg-gradient-to-br from-accent-50/30 via-transparent to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

								<div className='relative mb-6 lg:mb-8'>
									{stat.imageUrl ?
										<div className='relative w-20 h-20 lg:w-24 lg:h-24 mx-auto group-hover:scale-105 transition-transform duration-500'>
											<Image
												src={stat.imageUrl}
												alt={stat.imageAlt || `${stat.label} - ${stat.description}`}
												fill
												className='rounded-full object-cover shadow-lg shadow-accent-500/25 group-hover:shadow-xl group-hover:shadow-accent-500/40 transition-all duration-500'
												sizes='(max-width: 768px) 80px, 96px'
											/>
											<div className='absolute inset-0 rounded-full bg-gradient-to-br from-accent-400/20 via-transparent to-accent-600/20 group-hover:from-accent-400/30 group-hover:to-accent-600/30 transition-all duration-500' />
										</div>
									: (
										<>
											<div className='absolute inset-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-500' />

											<div className='relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-accent-400 via-accent-500 to-accent-600 flex items-center justify-center shadow-lg shadow-accent-500/25 group-hover:shadow-xl group-hover:shadow-accent-500/40 transition-all duration-500 mx-auto'>
												{(() => {
													const iconProps = {
														className: 'w-10 h-10 lg:w-12 lg:h-12 text-white drop-shadow-sm',
														'aria-hidden': 'true' as const,
													};
													switch (stat.lucideIcon) {
														case 'Users':
															return <Users {...iconProps} />;
														case 'School':
															return <School {...iconProps} />;
														case 'TrendingUp':
															return <TrendingUp {...iconProps} />;
														case 'Shield':
															return <Shield {...iconProps} />;
														default:
															return <Award {...iconProps} />;
													}
												})()}
											</div>
										</>
									)}

									<div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gradient-to-b from-accent-300 to-transparent opacity-30' />
								</div>

								<div className='text-center relative z-10'>
									<HeadingText
										variant="primary"
										level={3}
										className="font-black text-primary-900 mb-3 tracking-tight tabular-nums"
										responsive
									>
										{isInView && (
											<CountUp
												end={parseInt(stat.number.replace(/[^0-9]/g, '')) || 0}
												duration={2.5}
												delay={index * 0.3}
												suffix={stat.number.replace(/[0-9]/g, '').replace(/[^%+]/g, '')}
												preserveValue
											/>
										)}
										{!parseInt(stat.number.replace(/[^0-9]/g, '')) && stat.number}
									</HeadingText>

									<BodyText
										variant="default"
										className="text-primary-700 leading-relaxed font-medium max-w-sm mx-auto"
										responsive
									>
										<span className='sr-only'>
											{stat.lucideIcon === 'Users' && 'Families icon: '}
											{stat.lucideIcon === 'School' && 'School building icon: '}
											{stat.lucideIcon === 'TrendingUp' && 'Upward trend icon: '}
											{stat.lucideIcon === 'Shield' && 'Shield icon: '}
											{!stat.lucideIcon && 'Award icon: '}
										</span>
										{stat.description}
									</BodyText>
								</div>

								<div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-accent-400 to-transparent rounded-full opacity-60 group-hover:opacity-100 group-hover:w-24 transition-all duration-500' />
							</div>
						</div>
					))}
				</div>

				<div
					className='text-center mt-16 lg:mt-20'>
					<div className='inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent-50 via-accent-100/50 to-accent-50 rounded-full border border-accent-200/50 shadow-lg shadow-accent-500/10'>
						<Crown className='w-5 h-5 text-accent-600' />
						<span className='text-sm font-semibold text-primary-800 tracking-wide'>
							Endorsed by Royal Families Worldwide
						</span>
						<Crown className='w-5 h-5 text-accent-600' />
					</div>
				</div>
			</div>
		</section>
	);
}
