'use client';

import { useState, useCallback } from 'react';
import { m } from 'framer-motion';
import {
	Star,
	Quote,
	Play,
	ThumbsUp,
	Shield,
	MapPin,
	Calendar,
	ChevronDown,
	ChevronUp,
	ExternalLink,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { EnhancedTestimonial } from './testimonials-grid';
interface TestimonialCardProps {
	readonly testimonial: EnhancedTestimonial;
	readonly layout?: 'masonry' | 'grid' | 'list' | 'carousel';
	readonly enableHover?: boolean;
	readonly showFullContent?: boolean;
	readonly className?: string;
	readonly onCardClick?: (testimonial: EnhancedTestimonial) => void;
}
const cardVariants = {
	initial: {
		y: 0,
		scale: 1,
		boxShadow:
			'0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
	},
	hover: {
		y: -8,
		scale: 1.02,
		boxShadow:
			'0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)',
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 20,
		},
	},
	tap: {
		scale: 0.98,
		transition: {
			type: 'spring',
			stiffness: 400,
			damping: 25,
		},
	},
};
const expandVariants = {
	collapsed: {
		opacity: 0,
		height: 0,
		transition: {
			duration: 0.3,
			ease: 'easeOut',
		},
	},
	expanded: {
		opacity: 1,
		height: 'auto',
		transition: {
			duration: 0.4,
			ease: 'easeOut',
		},
	},
};
const iconVariants = {
	initial: {
		scale: 1,
		rotate: 0,
	},
	hover: {
		scale: 1.1,
		rotate: 5,
		transition: {
			type: 'spring',
			stiffness: 400,
			damping: 15,
		},
	},
};
export function TestimonialCard({
	testimonial,
	layout = 'grid',
	enableHover = true,
	showFullContent = false,
	className = '',
	onCardClick,
}: TestimonialCardProps) {
	const [isExpanded, setIsExpanded] = useState(showFullContent);
	const [imageIndex, setImageIndex] = useState(0);
	const [hasVoted, setHasVoted] = useState(false);
	const handleExpandToggle = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			setIsExpanded(!isExpanded);
		},
		[isExpanded],
	);
	const handleVote = useCallback(
		(e: React.MouseEvent) => {
			e.stopPropagation();
			setHasVoted(!hasVoted);
		},
		[hasVoted],
	);
	const handleVideoPlay = useCallback((e: React.MouseEvent) => {
		e.stopPropagation();
	}, []);
	const handleCardClick = useCallback(
		(e: React.MouseEvent) => {
			if (
				(e.target as Element).closest('button') ||
				(e.target as Element).closest('[role="button"]')
			) {
				return;
			}
			if (onCardClick) {
				onCardClick(testimonial);
			}
		},
		[onCardClick, testimonial],
	);
	const shouldTruncate =
		testimonial.quote.length > 150 && !showFullContent && !isExpanded;
	const displayQuote =
		shouldTruncate ?
			testimonial.quote.substring(0, 150) + '...'
		:	testimonial.quote;
	const getCardClasses = () => {
		const baseClasses = `h-full bg-white/90 backdrop-blur-sm border-2 border-brand-metallic-blue-100 rounded-3xl overflow-hidden group transition-all duration-300 ${onCardClick ? 'cursor-pointer hover:border-brand-metallic-blue-200 hover:shadow-lg' : ''}`;
		switch (layout) {
			case 'list':
				return `${baseClasses} flex flex-col md:flex-row`;
			case 'carousel':
				return `${baseClasses} w-full min-h-[400px]`;
			default:
				return baseClasses;
		}
	};
	return (
		<m.div
			className={`testimonial-card ${className}`}
			variants={enableHover ? cardVariants : undefined}
			initial='initial'
			whileHover={enableHover ? 'hover' : undefined}
			whileTap={enableHover ? 'tap' : undefined}
			onClick={handleCardClick}>
			<Card className={getCardClasses()}>
				<CardContent
					className={`p-8 h-full flex flex-col ${layout === 'list' ? 'md:flex-row md:gap-8' : ''}`}>
					<div
						className={`flex items-center justify-between mb-6 ${layout === 'list' ? 'md:mb-4' : ''}`}>
						<div className='flex items-center gap-1'>
							{[...Array(5)].map((_, i) => (
								<m.div
									key={i}
									variants={iconVariants}
									whileHover='hover'>
									<Star
										className={`w-5 h-5 ${i < testimonial.rating ? 'text-brand-aztec-gold-600 fill-current' : 'text-brand-metallic-blue-200'}`}
									/>
								</m.div>
							))}
							<span className='ml-2 text-sm font-medium text-brand-metallic-blue-600 font-source-serif'>
								{testimonial.rating}.0
							</span>
						</div>

						<div className='flex items-center gap-2'>
							{testimonial.verificationStatus === 'verified' && (
								<m.div
									variants={iconVariants}
									whileHover='hover'>
									<Badge
										variant='outline'
										className='bg-emerald-50 text-emerald-700 border-emerald-200'>
										<Shield className='w-3 h-3 mr-1' />
										Verified
									</Badge>
								</m.div>
							)}

							{testimonial.featured && (
								<Badge className='bg-gradient-to-r from-brand-aztec-gold-500 to-brand-aztec-gold-600 text-white font-source-serif'>
									Featured
								</Badge>
							)}

							{testimonial.videoTestimonial && (
								<m.button
									onClick={handleVideoPlay}
									className='p-2 bg-brand-metallic-blue-100 hover:bg-brand-aztec-gold-500 text-brand-metallic-blue-600 hover:text-white rounded-full transition-all duration-300'
									variants={iconVariants}
									whileHover='hover'
									whileTap={{
										scale: 0.9,
									}}
									aria-label='Play video testimonial'>
									<Play
										className='w-4 h-4'
										aria-hidden='true'
									/>
								</m.button>
							)}
						</div>
					</div>

					<div
						className={`relative flex-1 mb-6 ${layout === 'list' ? 'md:flex-1' : ''}`}>
						<Quote className='absolute -top-2 -left-2 w-8 h-8 text-brand-aztec-gold-500/20' />

						<div className='relative z-10'>
							<p className='text-brand-metallic-blue-700 leading-relaxed font-medium text-base lg:text-lg mb-4 font-source-serif'>
								{displayQuote}
							</p>

							{testimonial.expandable && testimonial.fullQuote && !showFullContent && (
								<m.div
									id={`testimonial-content-${testimonial.id}`}
									initial='collapsed'
									animate={isExpanded ? 'expanded' : 'collapsed'}
									variants={expandVariants}
									className='overflow-hidden'>
									<p className='text-primary-600 leading-relaxed'>
										{testimonial.fullQuote}
									</p>
								</m.div>
							)}

							{testimonial.expandable && !showFullContent && (
								<Button
									variant='ghost'
									size='sm'
									onClick={handleExpandToggle}
									className='mt-2 text-accent-600 hover:text-accent-700 hover:bg-accent-50 p-0 h-auto'
									aria-expanded={isExpanded}
									aria-controls={`testimonial-content-${testimonial.id}`}>
									{isExpanded ?
										<>
											Show Less{' '}
											<ChevronUp
												className='w-4 h-4 ml-1'
												aria-hidden='true'
											/>
										</>
									:	<>
											Read More{' '}
											<ChevronDown
												className='w-4 h-4 ml-1'
												aria-hidden='true'
											/>
										</>
									}
								</Button>
							)}

							{testimonial.images && testimonial.images.length > 0 && (
								<div className='mt-4'>
									<img
										src={testimonial.images[imageIndex]}
										alt={`${testimonial.author} testimonial`}
										className='w-full h-32 object-cover rounded-lg mb-2'
									/>
									{testimonial.images.length > 1 && (
										<div className='flex gap-1'>
											{testimonial.images.map((_, index) => (
												<button
													key={index}
													onClick={(e) => {
														e.stopPropagation();
														setImageIndex(index);
													}}
													className={`w-2 h-2 rounded-full transition-colors ${index === imageIndex ? 'bg-accent-500' : 'bg-primary-200 hover:bg-primary-300'}`}
													aria-label={`View image ${index + 1} of ${testimonial.images.length}`}
													aria-pressed={index === imageIndex}
												/>
											))}
										</div>
									)}
								</div>
							)}

							{(testimonial.subject || testimonial.result) && (
								<div className='mt-4 flex flex-wrap gap-2'>
									{testimonial.subject && (
										<Badge
											variant='secondary'
											className='text-xs'>
											{testimonial.subject}
										</Badge>
									)}
									{testimonial.result && (
										<Badge
											variant='outline'
											className='text-xs border-emerald-200 text-emerald-700 bg-emerald-50'>
											{testimonial.result}
										</Badge>
									)}
								</div>
							)}
						</div>
					</div>

					<div
						className={`border-t border-primary-100 pt-6 ${layout === 'list' ? 'md:border-t-0 md:border-l md:pl-8 md:pt-0' : ''}`}>
						<div className='flex items-start gap-4'>
							<Avatar className='w-12 h-12 border-2 border-white shadow-lg'>
								<AvatarImage
									src={testimonial.avatar}
									alt={testimonial.author}
								/>
								<AvatarFallback className='bg-gradient-to-br from-accent-500 to-accent-600 text-white font-semibold'>
									{testimonial.author
										.split(' ')
										.map((n) => n[0])
										.join('')}
								</AvatarFallback>
							</Avatar>

							<div className='flex-1 min-w-0'>
								<h4 className='font-semibold text-primary-900 mb-1 truncate'>
									{testimonial.author}
								</h4>
								<p className='text-sm text-primary-600 mb-2 line-clamp-2'>
									{testimonial.role}
								</p>

								<div className='flex flex-wrap items-center gap-3 text-xs text-primary-500'>
									{testimonial.location && (
										<div className='flex items-center gap-1'>
											<MapPin className='w-3 h-3' />
											<span>{testimonial.location}</span>
										</div>
									)}

									{testimonial.date && (
										<div className='flex items-center gap-1'>
											<Calendar className='w-3 h-3' />
											<span>{new Date(testimonial.date).toLocaleDateString()}</span>
										</div>
									)}
								</div>
							</div>
						</div>

						{(testimonial.helpfulVotes !== undefined || testimonial.expandable) && (
							<div className='flex items-center justify-between mt-4 pt-4 border-t border-primary-50'>
								{testimonial.helpfulVotes !== undefined && (
									<m.button
										onClick={handleVote}
										className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${hasVoted ? 'bg-accent-50 text-accent-600 border border-accent-200' : 'text-primary-600 hover:bg-primary-50 border border-transparent hover:border-primary-200'}`}
										whileHover={{
											scale: 1.05,
										}}
										whileTap={{
											scale: 0.95,
										}}
										aria-label={`${hasVoted ? 'Remove helpful vote' : 'Mark as helpful'} (${testimonial.helpfulVotes} people found this helpful)`}
										aria-pressed={hasVoted}>
										<ThumbsUp
											className='w-4 h-4'
											aria-hidden='true'
										/>
										<span>{testimonial.helpfulVotes}</span>
									</m.button>
								)}

							</div>
						)}
					</div>
				</CardContent>
			</Card>
		</m.div>
	);
}
