'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import {
	X,
	Star,
	Shield,
	MapPin,
	Calendar,
	Play,
	ThumbsUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { EnhancedTestimonial } from './testimonials-grid';
interface TestimonialModalProps {
	readonly testimonial: EnhancedTestimonial | null;
	readonly onClose: () => void;
}
const modalVariants = {
	hidden: {
		opacity: 0,
		scale: 0.75,
		y: 100,
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 30,
		},
	},
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: {
			type: 'spring',
			stiffness: 300,
			damping: 30,
		},
	},
	exit: {
		opacity: 0,
		scale: 0.75,
		y: 100,
		transition: {
			type: 'spring',
			stiffness: 400,
			damping: 40,
		},
	},
};
const backdropVariants = {
	hidden: {
		opacity: 0,
		backdropFilter: 'blur(0px)',
	},
	visible: {
		opacity: 1,
		backdropFilter: 'blur(8px)',
		transition: {
			duration: 0.3,
			ease: 'easeOut',
		},
	},
	exit: {
		opacity: 0,
		backdropFilter: 'blur(0px)',
		transition: {
			duration: 0.2,
			ease: 'easeIn',
		},
	},
};
const contentVariants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.1,
			duration: 0.4,
			ease: 'easeOut',
		},
	},
};
export function TestimonialModal({
	testimonial,
	onClose,
}: TestimonialModalProps) {
	console.log('[MODAL-DEBUG] TestimonialModal render:', {
		timestamp: new Date().toISOString(),
		testimonialId: testimonial?.id || 'null',
		onCloseRef: typeof onClose,
		renderCount:
			++TestimonialModal.renderCount || (TestimonialModal.renderCount = 1),
	});
	const onCloseRef = useRef(onClose);
	onCloseRef.current = onClose;
	const handleBackdropClick = useCallback((e: React.MouseEvent) => {
		console.log('[MODAL-DEBUG] handleBackdropClick called:', {
			timestamp: new Date().toISOString(),
			targetEquals: e.target === e.currentTarget,
		});
		if (e.target === e.currentTarget) {
			console.log('[MODAL-DEBUG] handleBackdropClick executing onClose');
			onCloseRef.current();
		}
	}, []);
	useEffect(() => {
		console.log('[MODAL-DEBUG] useEffect executing:', {
			timestamp: new Date().toISOString(),
			testimonialPresent: !!testimonial,
			testimonialId: testimonial?.id || 'null',
			effectExecutionCount:
				++TestimonialModal.effectCount || (TestimonialModal.effectCount = 1),
		});
		const handleEscape = (e: KeyboardEvent) => {
			console.log('[MODAL-DEBUG] handleEscape called:', {
				timestamp: new Date().toISOString(),
				key: e.key,
			});
			if (e.key === 'Escape') {
				console.log('[MODAL-DEBUG] handleEscape executing onClose');
				onCloseRef.current();
			}
		};
		if (testimonial) {
			console.log(
				'[MODAL-DEBUG] Adding event listeners and setting body overflow',
			);
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		} else {
			console.log('[MODAL-DEBUG] Testimonial is null, restoring body overflow');
			document.body.style.overflow = 'unset';
		}
		return () => {
			console.log('[MODAL-DEBUG] useEffect cleanup executing:', {
				timestamp: new Date().toISOString(),
				cleanupExecutionCount:
					++TestimonialModal.cleanupCount || (TestimonialModal.cleanupCount = 1),
			});
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [testimonial]);
	if (!testimonial) return null;
	return (
		<AnimatePresence mode='wait'>
			<m.div
				className='fixed inset-0 z-50 flex items-center justify-center p-4'
				style={{
					backgroundColor: 'rgba(0, 0, 0, 0.5)',
				}}
				variants={backdropVariants}
				initial='hidden'
				animate='visible'
				exit='exit'
				onClick={handleBackdropClick}
				role='dialog'
				aria-modal='true'
				aria-labelledby='testimonial-modal-title'
				aria-describedby='testimonial-modal-content'>
				<m.div
					className='bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'
					variants={modalVariants}
					initial='hidden'
					animate='visible'
					exit='exit'
					onClick={(e) => e.stopPropagation()}>

					<div className='sticky top-0 bg-white border-b border-primary-100 p-8 flex items-center justify-between rounded-t-3xl'>
						<div className='flex items-center gap-4'>
							<Avatar className='w-16 h-16 border-2 border-white shadow-lg'>
								<AvatarImage
									src={testimonial.avatar}
									alt={testimonial.author}
								/>
								<AvatarFallback className='bg-gradient-to-br from-accent-500 to-accent-600 text-white font-semibold text-lg'>
									{testimonial.author
										.split(' ')
										.map((n) => n[0])
										.join('')}
								</AvatarFallback>
							</Avatar>
							<div>
								<h3
									id='testimonial-modal-title'
									className='text-xl font-semibold text-primary-900 mb-1'>
									{testimonial.author}
								</h3>
								<p className='text-sm text-primary-600'>{testimonial.role}</p>
							</div>
						</div>

						<Button
							variant='ghost'
							size='sm'
							onClick={() => {
								console.log('[MODAL-DEBUG] Close button clicked:', {
									timestamp: new Date().toISOString(),
								});
								onClose();
							}}
							className='p-2 hover:bg-primary-50 rounded-full'
							aria-label='Close testimonial modal'>
							<X
								className='w-5 h-5'
								aria-hidden='true'
							/>
						</Button>
					</div>

					<div className='p-8 space-y-8'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-1'>
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`w-6 h-6 ${i < testimonial.rating ? 'text-accent-500 fill-current' : 'text-primary-200'}`}
									/>
								))}
								<span className='ml-2 text-lg font-medium text-primary-600'>
									{testimonial.rating}.0
								</span>
							</div>

							<div className='flex items-center gap-2'>
								{testimonial.verificationStatus === 'verified' && (
									<Badge
										variant='outline'
										className='bg-emerald-50 text-emerald-700 border-emerald-200'>
										<Shield className='w-3 h-3 mr-1' />
										Verified
									</Badge>
								)}

								{testimonial.featured && (
									<Badge className='bg-gradient-to-r from-accent-500 to-accent-600 text-white'>
										Featured
									</Badge>
								)}

								{testimonial.videoTestimonial && (
									<Button
										size='sm'
										className='p-2 bg-primary-100 hover:bg-accent-500 text-primary-600 hover:text-white rounded-full'
										aria-label='Play video testimonial'>
										<Play
											className='w-4 h-4'
											aria-hidden='true'
										/>
									</Button>
								)}
							</div>
						</div>


						<div
							id='testimonial-modal-content'
							className='prose prose-lg max-w-none'>
							<blockquote className='text-primary-700 leading-relaxed text-lg border-l-4 border-accent-500 pl-6 italic'>
								"{testimonial.quote}"
							</blockquote>

							{testimonial.fullQuote &&
								testimonial.fullQuote !== testimonial.quote && (
									<div className='mt-4 text-primary-600 leading-relaxed'>
										{testimonial.fullQuote}
									</div>
								)}
						</div>


						{(testimonial.subject || testimonial.result) && (
							<div className='flex flex-wrap gap-3'>
								{testimonial.subject && (
									<Badge
										variant='secondary'
										className='px-3 py-1'>
										Subject: {testimonial.subject}
									</Badge>
								)}
								{testimonial.result && (
									<Badge
										variant='outline'
										className='px-3 py-1 border-emerald-200 text-emerald-700 bg-emerald-50'>
										Result: {testimonial.result}
									</Badge>
								)}
							</div>
						)}


						<div className='flex flex-wrap items-center gap-6 text-sm text-primary-500 pt-4 border-t border-primary-100'>
							{testimonial.location && (
								<div className='flex items-center gap-2'>
									<MapPin className='w-4 h-4' />
									<span>{testimonial.location}</span>
								</div>
							)}

							{testimonial.date && (
								<div className='flex items-center gap-2'>
									<Calendar className='w-4 h-4' />
									<span>{new Date(testimonial.date).toLocaleDateString()}</span>
								</div>
							)}
						</div>


						{testimonial.helpfulVotes !== undefined && (
							<div className='flex items-center justify-center pt-4 border-t border-primary-100'>
								<Button
									variant='outline'
									className='flex items-center gap-2 px-6 py-2 hover:bg-accent-50 hover:border-accent-200'
									aria-label={`Mark testimonial as helpful (${testimonial.helpfulVotes} people found this helpful)`}>
									<ThumbsUp
										className='w-4 h-4'
										aria-hidden='true'
									/>
									<span>Helpful ({testimonial.helpfulVotes})</span>
								</Button>
							</div>
						)}
					</div>
				</m.div>
			</m.div>
		</AnimatePresence>
	);
}
