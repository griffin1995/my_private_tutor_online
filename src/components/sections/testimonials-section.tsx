'use client';

import { Award } from 'lucide-react';
import { Carousel } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
interface TestimonialData {
	quote: string;
	author: string;
	role: string;
	rating?: number;
}
interface TestimonialsSectionProps {
	testimonials?: TestimonialData[];
	className?: string;
	backgroundColor?: string;
	title?: string;
	description?: string;
	autoPlay?: boolean;
	autoPlayInterval?: number;
}
export function TestimonialsSection({
	testimonials = [],
	className = '',
	backgroundColor = 'bg-white',
	title = 'Success Stories',
	description = 'Hear from families who have experienced the transformative power of personalised tutoring',
	autoPlay = true,
	autoPlayInterval = 5000,
}: TestimonialsSectionProps) {
	const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
	if (safeTestimonials.length === 0) {
		return (
			<section className={`py-16 lg:py-24 ${className} relative`}>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
					<div className='text-center'>
						<h2 className='text-4xl lg:text-5xl font-serif font-black text-primary-900 mb-4 tracking-tight'>
							{title}
						</h2>
						<p className='text-xl text-primary-700 max-w-3xl mx-auto'>
							{description}
						</p>
						<p className='text-lg text-primary-600 mt-6 italic'>
							More testimonials coming soon...
						</p>
					</div>
				</div>
			</section>
		);
	}
	return (
		<section
			className={`py-16 lg:py-24 overflow-hidden ${className} relative`}
			style={{
				background:
					'linear-gradient(180deg, #fafafa 0%, #f5f5f5 25%, #e5e5e5 50%, #d4d4d4 75%, #a3a3a3 100%)',
			}}>
			{}
			{}
			{}
			<div
				className='absolute inset-0 bg-depth-neutral opacity-80'
				aria-hidden='true'
			/>
			<div
				className='absolute inset-0 bg-glow-navy opacity-15 animate-pulse-slow'
				aria-hidden='true'
			/>
			<div
				className='absolute inset-0 bg-shimmer-luxury opacity-5 animate-shimmer'
				aria-hidden='true'
			/>

			{}
			<div
				className='absolute top-0 left-0 w-full h-2 bg-separator-subtle opacity-40'
				aria-hidden='true'
			/>
			<div
				className='absolute bottom-0 left-0 w-full h-2 bg-separator-gold opacity-30'
				aria-hidden='true'
			/>

			{}
			{}
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10'>
				{}
				{}
				{}
				{}
				{}
				<div
					className='text-center mb-12 shadow-depth-md backdrop-blur-sm rounded-2xl py-8 px-6 relative overflow-hidden group'
					style={{
						background:
							'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 38.2%, rgba(241, 245, 249, 0.85) 61.8%, rgba(226, 232, 240, 0.8) 100%)',
					}}>
					{}
					<div className='absolute inset-0 bg-overlay-light opacity-60' />
					<div className='absolute inset-0 bg-glow-gold opacity-20 animate-pulse-slow' />
					<div className='absolute inset-0 bg-shimmer-luxury opacity-0 group-hover:opacity-15 transition-opacity duration-500' />

					{}
					<div className='absolute inset-0 rounded-2xl bg-separator-subtle opacity-40' />

					{}
					<div className='relative z-10'>
						{}
						{}
						{}
						{}
						<h2 className='text-4xl lg:text-5xl font-serif font-black text-primary-900 mb-4 tracking-tight drop-shadow-sm'>
							{title}
						</h2>
						{}
						{}
						<p className='text-xl font-normal text-primary-700 max-w-3xl mx-auto mb-12 tracking-normal'>
							{description}
						</p>
					</div>
				</div>

				{}
				{}
				<Carousel
					centerMode={true}
					autoPlay={autoPlay}
					autoPlayInterval={autoPlayInterval}
					showDots={true}
					items={safeTestimonials.map((testimonial, index) => ({
						id: index,
						content: (
							<>
								{}
								{}
								{}
								{}
								{}
								{}
								<Card
									className='h-full shadow-impact-md hover:shadow-impact-lg transition-all duration-500 border-0 backdrop-blur-sm relative overflow-hidden group'
									style={{
										background:
											'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 38.2%, rgba(241, 245, 249, 0.9) 61.8%, rgba(226, 232, 240, 0.85) 100%)',
									}}>
									{}
									<div className='absolute inset-0 bg-overlay-light opacity-60' />
									<div className='absolute inset-0 bg-glow-navy opacity-10 animate-pulse-slow' />
									<div className='absolute inset-0 bg-shimmer-luxury opacity-0 group-hover:opacity-20 transition-opacity duration-500' />

									{}
									<div className='absolute inset-0 rounded-lg bg-separator-subtle opacity-30' />
									<CardContent className='p-8 relative z-10'>
										<div className='flex flex-col items-center text-center'>
											<div className='mb-6'>
												{}
												{}
												{}
												{}
												{}
												{}
												<div className='flex justify-center mb-4 relative'>
													{}
													<div className='absolute inset-0 bg-glow-gold opacity-40 blur-md animate-pulse-slow rounded-full scale-150' />

													{}
													<div className='relative z-10 flex justify-center gap-1'>
														{[...Array(testimonial.rating || 5)].map((_, i) => (
															<div
																key={i}
																className='relative group'>
																{}
																<Award
																	className='w-5 h-5 text-accent-600 fill-current drop-shadow-accent-glow transition-all duration-300 group-hover:scale-110 group-hover:text-accent-500'
																	style={{
																		filter: 'drop-shadow(0 2px 4px rgba(202, 158, 91, 0.4))',
																	}}
																/>

																{}
																<div className='absolute inset-0 bg-shimmer-luxury opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-full animate-shimmer' />
															</div>
														))}
													</div>
												</div>

												{}
												{}
												{}
												{}
												<blockquote className='text-lg font-normal text-primary-700 italic leading-relaxed tracking-wide'>
													&ldquo;{testimonial.quote}&rdquo;
												</blockquote>
											</div>

											{}
											{}
											<div className='mt-4'>
												{}
												{}
												<p className='text-sm font-medium text-primary-600 tracking-wide'>
													{testimonial.author} - {testimonial.role}
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</>
						),
					}))}
					className='max-w-6xl mx-auto'
				/>
			</div>
		</section>
	);
}
export type { TestimonialsSectionProps, TestimonialData };
