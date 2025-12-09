'use client';

import { m } from 'framer-motion';
import {
	ArrowRight,
	Award,
	CheckCircle,
	ChevronRight,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react';
import { PageLayout } from '@/components/layout/page-layout';
import { ServicesPerformanceMonitor } from '@/components/services/ServicesPerformanceMonitor';
import { MobileEnhancements } from '@/components/services/MobileEnhancements';
import { Globe as MagicUIGlobe } from '@/components/magicui/globe';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import {
	LazyArea as Area,
	LazyAreaChart as AreaChart,
	LazyCartesianGrid as CartesianGrid,
	LazyCell as Cell,
	LazyPie as Pie,
	LazyPieChart as PieChart,
	LazyPolarAngleAxis as PolarAngleAxis,
	LazyPolarGrid as PolarGrid,
	LazyPolarRadiusAxis as PolarRadiusAxis,
	LazyRadarChart as RadarChart,
	LazyRadar as RechartsRadar,
	LazyResponsiveContainer as ResponsiveContainer,
	LazyTooltip as Tooltip,
	LazyXAxis as XAxis,
	LazyYAxis as YAxis,
} from '@/components/charts/lazy-charts';

// ============================================================================
// HARDCODED DATA - ALL CMS CONTENT FOR SERVICES PAGE
// ============================================================================

interface ServiceFeature {
	feature: string;
}

interface ServiceData {
	title: string;
	description: string;
	features: ServiceFeature[];
	icon: string;
	ctaText?: string;
	ctaLink?: string;
	featureImageUrl?: string;
	featureImageAlt?: string;
}

// Services data - all tutoring services offered
const SERVICES_DATA: ServiceData[] = [
	{
		title: 'Primary',
		description:
			'Comprehensive support for primary school students across all core subjects and entrance exam preparation',
		icon: '🌟',
		features: [
			{ feature: 'All core subjects covered' },
			{ feature: 'Early exam preparation' },
			{ feature: 'Learning foundation building' },
			{ feature: 'Progress tracking' },
		],
		ctaText: 'Learn More',
		ctaLink: '#contact',
	},
	{
		title: 'Secondary',
		description:
			'Expert secondary education support covering GCSE, A-Level and IB programmes for academic excellence',
		icon: '📚',
		features: [
			{ feature: 'GCSE & A-Level mastery' },
			{ feature: 'IB programme support' },
			{ feature: 'Exam technique development' },
			{ feature: 'Subject specialist tutors' },
		],
		ctaText: 'Learn More',
		ctaLink: '#contact',
	},
	{
		title: 'Entrance Exams',
		description:
			'Specialist preparation for competitive UK school entry examinations (4+, 7+, 11+, 13+, 16+)',
		icon: '🎯',
		features: [
			{ feature: 'Mathematical reasoning' },
			{ feature: 'English comprehension' },
			{ feature: 'Verbal & non-verbal reasoning' },
			{ feature: 'Mock exam practice' },
		],
		ctaText: 'Learn More',
		ctaLink: '#contact',
	},
	{
		title: 'Uni & Beyond',
		description:
			'Complete university application support including Oxbridge admissions and undergraduate academic writing',
		icon: '🎓',
		features: [
			{ feature: 'UCAS application support' },
			{ feature: 'Oxbridge interview coaching' },
			{ feature: 'Personal statement guidance' },
			{ feature: 'University essay support' },
		],
		ctaText: 'Learn More',
		ctaLink: '#contact',
		featureImageUrl: '/images/graphics/feature-oxbridge-success.jpg',
		featureImageAlt:
			'Oxbridge success - University admissions coaching and academic writing support',
	},
	{
		title: 'Online Homeschooling',
		description:
			'Comprehensive online education programmes providing structured homeschooling with qualified teachers',
		icon: '💻',
		features: [
			{ feature: 'Full curriculum delivery' },
			{ feature: 'Qualified teacher support' },
			{ feature: 'Flexible learning schedules' },
			{ feature: 'Progress monitoring' },
		],
		ctaText: 'Learn More',
		ctaLink: '#contact',
	},
	{
		title: 'SEN Support',
		description:
			'Specialist educational needs support with experienced tutors trained in learning differences and disabilities',
		icon: '🤝',
		features: [
			{ feature: 'Learning differences expertise' },
			{ feature: 'Individualised learning plans' },
			{ feature: 'Multi-sensory teaching' },
			{ feature: 'Confidence building' },
		],
		ctaText: 'Learn More',
		ctaLink: '#contact',
	},
	{
		title: 'London In-Person',
		description: 'Premium face-to-face tutoring sessions available across London',
		icon: '🏛️',
		features: [
			{ feature: 'Elite London tutors' },
			{ feature: 'Flexible location options' },
			{ feature: 'Premium service level' },
			{ feature: 'Immediate availability' },
		],
		ctaText: 'Learn More',
		ctaLink: '#contact',
	},
];

interface GlobalLocationData {
	country: string;
	students: number;
	lat: number;
	lng: number;
}
function ServicesPageClient({ services }: { services: ServiceData[] }) {
	const globalLocations: GlobalLocationData[] = [
		{
			country: 'United Kingdom',
			students: 850,
			lat: 51.5074,
			lng: -0.1278,
		},
		{
			country: 'United States',
			students: 320,
			lat: 40.7128,
			lng: -74.006,
		},
		{
			country: 'Canada',
			students: 180,
			lat: 43.6532,
			lng: -79.3832,
		},
		{
			country: 'Australia',
			students: 240,
			lat: -33.8688,
			lng: 151.2093,
		},
		{
			country: 'Singapore',
			students: 160,
			lat: 1.3521,
			lng: 103.8198,
		},
		{
			country: 'UAE',
			students: 95,
			lat: 25.2048,
			lng: 55.2708,
		},
		{
			country: 'Hong Kong',
			students: 78,
			lat: 22.3193,
			lng: 114.1694,
		},
	];
	const successRateData = [
		{
			name: 'Success',
			value: 94,
			fill: '#eab308',
		},
		{
			name: 'Remaining',
			value: 6,
			fill: '#e2e8f0',
		},
	];
	const completionData = [
		{
			name: 'Jan',
			rate: 82,
		},
		{
			name: 'Feb',
			rate: 85,
		},
		{
			name: 'Mar',
			rate: 87,
		},
		{
			name: 'Apr',
			rate: 87,
		},
		{
			name: 'May',
			rate: 87,
		},
		{
			name: 'Jun',
			rate: 87,
		},
	];
	const radarData = [
		{
			subject: 'Teaching Quality',
			A: 5,
			fullMark: 5,
		},
		{
			subject: 'Student Support',
			A: 4.8,
			fullMark: 5,
		},
		{
			subject: 'Results Delivery',
			A: 4.9,
			fullMark: 5,
		},
		{
			subject: 'Communication',
			A: 4.7,
			fullMark: 5,
		},
		{
			subject: 'Flexibility',
			A: 4.6,
			fullMark: 5,
		},
	];
	return (
		<PageLayout
			background='white'
			showHeader={true}
			showFooter={true}
			containerSize='full'>
			<ServicesPerformanceMonitor />

			<MobileEnhancements />

			<m.section
				className='relative min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-accent-700 overflow-hidden'
				initial={{
					opacity: 0,
				}}
				animate={{
					opacity: 1,
				}}
				transition={{
					duration: 0.8,
				}}>
				<div className='absolute inset-0 opacity-10'>
					<div
						className='absolute inset-0'
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 15l-7.5 7.5L15 15l7.5-7.5L30 15zm15 15l-7.5 7.5L30 30l7.5-7.5L45 30z'/%3E%3C/g%3E%3C/svg%3E")`,
							backgroundSize: '60px 60px',
						}}
					/>
				</div>

				<div className='relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20'>
					<div className='grid lg:grid-cols-2 gap-16 items-center'>
						<m.div
							className='text-white'
							initial={{
								opacity: 0,
								x: -50,
							}}
							animate={{
								opacity: 1,
								x: 0,
							}}
							transition={{
								duration: 0.8,
								delay: 0.2,
							}}>
							<h1 className='text-5xl lg:text-7xl font-serif font-bold mb-6 leading-tight'>
								Premium
								<span className='text-accent-400'> Tutoring</span>
								<br />
								Services
							</h1>
							<p className='text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed'>
								Bespoke educational excellence for discerning families. Over 15 years of
								proven results with royal endorsements.
							</p>

							<div className='grid grid-cols-3 gap-8 mb-10'>
								<div className='text-center'>
									<div className='text-3xl lg:text-4xl font-bold text-accent-400'>
										94%
									</div>
									<div className='text-white/80 text-sm'>Success Rate</div>
								</div>
								<div className='text-center'>
									<div className='text-3xl lg:text-4xl font-bold text-accent-400'>
										1,800+
									</div>
									<div className='text-white/80 text-sm'>Students Taught</div>
								</div>
								<div className='text-center'>
									<div className='text-3xl lg:text-4xl font-bold text-accent-400'>
										15
									</div>
									<div className='text-white/80 text-sm'>Years Experience</div>
								</div>
							</div>

							<m.button
								className='inline-flex items-center px-8 py-4 bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300'
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{
									scale: 0.95,
								}}>
								Explore Our Services
								<ArrowRight className='ml-2 h-5 w-5' />
							</m.button>
						</m.div>

						<m.div
							className='relative h-[500px] lg:h-[600px]'
							initial={{
								opacity: 0,
								scale: 0.8,
							}}
							animate={{
								opacity: 1,
								scale: 1,
							}}
							transition={{
								duration: 1,
								delay: 0.4,
							}}>
							<div className='absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20'>
								<div className='p-6'>
									<h3 className='text-xl font-bold text-white mb-4 text-center'>
										Global Tutoring Reach
									</h3>
									<div className='h-[400px] lg:h-[500px] flex items-center justify-center'>
										<MagicUIGlobe />
									</div>
									<div className='mt-4 text-center text-white/80 text-sm'>
										Teaching students across {globalLocations.length} countries
									</div>
								</div>
							</div>
						</m.div>
					</div>
				</div>
			</m.section>

			<section className='py-20 bg-slate-50'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<m.div
						className='text-center mb-16'
						initial={{
							opacity: 0,
							y: 30,
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
						<h2 className='text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4'>
							Excellence in Numbers
						</h2>
						<p className='text-xl text-primary-700 max-w-3xl mx-auto'>
							Our commitment to premium education delivers measurable results that
							speak to our reputation among elite families.
						</p>
					</m.div>

					<div className='grid md:grid-cols-3 gap-12'>
						<m.div
							className='bg-white rounded-2xl shadow-lg p-8'
							initial={{
								opacity: 0,
								y: 30,
							}}
							whileInView={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 0.6,
								delay: 0.1,
							}}
							viewport={{
								once: true,
							}}>
							<h3 className='text-xl font-bold text-primary-900 mb-4 text-center'>
								Student Success Rate
							</h3>
							<div className='h-64'>
								<ResponsiveContainer
									width='100%'
									height='100%'>
									<PieChart>
										<Pie
											data={successRateData}
											cx='50%'
											cy='50%'
											innerRadius={60}
											outerRadius={90}
											startAngle={90}
											endAngle={450}
											dataKey='value'>
											{successRateData.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={entry.fill}
												/>
											))}
										</Pie>
										<text
											x='50%'
											y='50%'
											textAnchor='middle'
											dominantBaseline='middle'
											className='fill-primary-900 text-2xl font-bold'>
											94%
										</text>
									</PieChart>
								</ResponsiveContainer>
							</div>
							<p className='text-center text-primary-600 mt-4'>
								94% of students improve by at least two grades at GCSE
							</p>
						</m.div>

						<m.div
							className='bg-white rounded-2xl shadow-lg p-8'
							initial={{
								opacity: 0,
								y: 30,
							}}
							whileInView={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 0.6,
								delay: 0.2,
							}}
							viewport={{
								once: true,
							}}>
							<h3 className='text-xl font-bold text-primary-900 mb-4 text-center'>
								Course Completion
							</h3>
							<div className='h-64'>
								<ResponsiveContainer
									width='100%'
									height='100%'>
									<AreaChart data={completionData}>
										<CartesianGrid strokeDasharray='3 3' />
										<XAxis dataKey='name' />
										<YAxis domain={[80, 90]} />
										<Tooltip />
										<Area
											type='monotone'
											dataKey='rate'
											stroke='#eab308'
											fill='#eab308'
											fillOpacity={0.6}
										/>
									</AreaChart>
								</ResponsiveContainer>
							</div>
							<p className='text-center text-primary-600 mt-4'>
								87% completion rate across all our programmes
							</p>
						</m.div>

						<m.div
							className='bg-white rounded-2xl shadow-lg p-8'
							initial={{
								opacity: 0,
								y: 30,
							}}
							whileInView={{
								opacity: 1,
								y: 0,
							}}
							transition={{
								duration: 0.6,
								delay: 0.3,
							}}
							viewport={{
								once: true,
							}}>
							<h3 className='text-xl font-bold text-primary-900 mb-4 text-center'>
								Service Quality Metrics
							</h3>
							<div className='h-64'>
								<ResponsiveContainer
									width='100%'
									height='100%'>
									<RadarChart data={radarData}>
										<PolarGrid />
										<PolarAngleAxis dataKey='subject' />
										<PolarRadiusAxis
											angle={90}
											domain={[0, 5]}
										/>
										<RechartsRadar
											name='Quality'
											dataKey='A'
											stroke='#eab308'
											fill='#eab308'
											fillOpacity={0.3}
										/>
									</RadarChart>
								</ResponsiveContainer>
							</div>
							<p className='text-center text-primary-600 mt-4'>
								Comprehensive quality assessment across all service areas
							</p>
						</m.div>
					</div>
				</div>
			</section>

			<section className='py-20 bg-white'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<m.div
						className='text-center mb-16'
						initial={{
							opacity: 0,
							y: 30,
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
						<h2 className='text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4'>
							Our Premium Services
						</h2>
						<p className='text-xl text-primary-700 max-w-3xl mx-auto'>
							Discover our comprehensive range of bespoke tutoring services, each
							tailored to meet the exacting standards of discerning families.
						</p>
					</m.div>

					<div className='max-w-4xl mx-auto'>
						<Accordion.Root
							type='single'
							collapsible
							className='space-y-4'>
							{services.map((service, index) => (
								<m.div
									key={index}
									initial={{
										opacity: 0,
										x: -30,
									}}
									whileInView={{
										opacity: 1,
										x: 0,
									}}
									transition={{
										duration: 0.6,
										delay: index * 0.1,
									}}
									viewport={{
										once: true,
									}}>
									<Accordion.Item
										value={`panel${index}`}
										className='bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden'>
										<Accordion.Header>
											<Accordion.Trigger className='w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-inset'>
												<div className='flex items-center space-x-4'>
													<div className='text-3xl'>{service.icon}</div>
													<div>
														<h3 className='text-xl font-bold text-primary-900'>
															{service.title}
														</h3>
														<p className='text-primary-600 mt-1'>
															Premium {service.title.toLowerCase()} education services
														</p>
													</div>
												</div>
												<ChevronDown className='h-5 w-5 text-primary-700 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180' />
											</Accordion.Trigger>
										</Accordion.Header>
										<Accordion.Content className='overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'>
											<div className='px-6 pb-6 pl-20'>
												<p className='text-primary-600 mb-6 leading-relaxed'>
													{service.description}
												</p>

												<div className='grid md:grid-cols-2 gap-6'>
													<div>
														<h4 className='font-semibold text-primary-900 mb-3'>
															Key Features:
														</h4>
														<ul className='space-y-2'>
															{service.features.map((feature, featureIndex) => (
																<li
																	key={featureIndex}
																	className='flex items-start space-x-2'>
																	<CheckCircle className='h-5 w-5 text-accent-600 mt-0.5 flex-shrink-0' />
																	<span className='text-primary-700'>{feature.feature}</span>
																</li>
															))}
														</ul>
													</div>

													<div className='bg-accent-50 rounded-lg p-6'>
														<h4 className='font-semibold text-primary-900 mb-3'>
															Perfect For:
														</h4>
														<p className='text-primary-700 mb-4'>
															Ages{' '}
															{service.title.includes('Primary') ?
																'5-11'
															: service.title.includes('Secondary') ?
																'11-18'
															:	'16+'}
														</p>
														<m.button
															className='inline-flex items-center px-6 py-2 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg transition-colors duration-200'
															whileHover={{
																scale: 1.05,
															}}
															whileTap={{
																scale: 0.95,
															}}>
															Learn More
															<ChevronRight className='ml-1 h-4 w-4' />
														</m.button>
													</div>
												</div>
											</div>
										</Accordion.Content>
									</Accordion.Item>
								</m.div>
							))}
						</Accordion.Root>
					</div>
				</div>
			</section>

			<section className='py-20 bg-gradient-to-br from-primary-50 to-accent-50'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<m.div
						className='text-center mb-16'
						initial={{
							opacity: 0,
							y: 30,
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
						<h2 className='text-4xl lg:text-5xl font-serif font-bold text-primary-900 mb-4'>
							Why Choose Our Services
						</h2>
						<p className='text-xl text-primary-700 max-w-3xl mx-auto'>
							Our commitment to excellence has earned the trust of royal families and
							discerning clients worldwide.
						</p>
					</m.div>

					<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
						{[
							{
								icon: Award,
								title: 'Royal Endorsements',
								description:
									'Trusted by members of the Royal Family and featured in Tatler Address Book 2025',
								stats: '15+ Years',
							},
							{
								icon: Users,
								title: 'Global Reach',
								description:
									'Students across 7 countries with personalised online and in-person tutoring',
								stats: '1,800+ Students',
							},
							{
								icon: TrendingUp,
								title: 'Proven Results',
								description:
									'94% success rate with students achieving target grades or higher',
								stats: '94% Success',
							},
							{
								icon: Star,
								title: 'Premium Quality',
								description:
									'Bespoke educational programmes tailored to individual learning styles',
								stats: '4.9/5 Rating',
							},
						].map((feature, index) => (
							<m.div
								key={index}
								className='group relative'
								initial={{
									opacity: 0,
									y: 30,
								}}
								whileInView={{
									opacity: 1,
									y: 0,
								}}
								transition={{
									duration: 0.6,
									delay: index * 0.1,
								}}
								viewport={{
									once: true,
								}}
								whileHover={{
									y: -10,
								}}>
								<div className='bg-white rounded-2xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full border border-white/50'>
									<m.div
										className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl mb-6 shadow-lg'
										whileHover={{
											rotate: 360,
										}}
										transition={{
											duration: 0.6,
										}}>
										<feature.icon className='h-8 w-8 text-white' />
									</m.div>

									<h3 className='text-xl font-bold text-primary-900 mb-3 group-hover:text-accent-700 transition-colors duration-200'>
										{feature.title}
									</h3>

									<p className='text-primary-600 mb-4 leading-relaxed'>
										{feature.description}
									</p>

									<div className='mt-auto pt-4 border-t border-accent-100'>
										<div className='text-2xl font-bold text-accent-600'>
											{feature.stats}
										</div>
									</div>
								</div>
							</m.div>
						))}
					</div>
				</div>
			</section>

			<section className='py-20 bg-gradient-to-r from-primary-900 via-primary-800 to-accent-700'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
					<m.div
						className='text-center max-w-4xl mx-auto'
						initial={{
							opacity: 0,
							y: 30,
						}}
						whileInView={{
							opacity: 1,
							y: 0,
						}}
						transition={{
							duration: 0.8,
						}}
						viewport={{
							once: true,
						}}>
						<h2 className='text-4xl lg:text-6xl font-serif font-bold text-white mb-8'>
							Ready to Begin Your
							<span className='text-accent-400'> Educational Journey?</span>
						</h2>

						<p className='text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed'>
							Join over 1,800 students who have achieved exceptional results with our
							premium tutoring services. Book your consultation today.
						</p>

						<div className='flex flex-col sm:flex-row gap-6 justify-center'>
							<m.button
								className='px-10 py-4 bg-accent-500 hover:bg-accent-600 text-primary-900 font-bold rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300'
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{
									scale: 0.95,
								}}>
								Request Free Consultation
							</m.button>

							<m.button
								className='px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-primary-900 font-bold rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300'
								whileHover={{
									scale: 1.05,
								}}
								whileTap={{
									scale: 0.95,
								}}>
								Download Prospectus
							</m.button>
						</div>
					</m.div>
				</div>
			</section>
		</PageLayout>
	);
}
export default function ServicesPage() {
	return <ServicesPageClient services={SERVICES_DATA} />;
}
