'use client';

import React from 'react';
interface TestimonialsIntroProps {
	readonly className?: string;
}
export function TestimonialsIntro({ className = '' }: TestimonialsIntroProps) {
	return (
		<section className={`py-12 lg:py-16 ${className}`}>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='max-w-4xl mx-auto text-center'>
					{}
					{}
					<div className='space-y-6'>
						{}
						<div className='space-y-4'>
							<p className='text-lg sm:text-xl leading-relaxed text-gray-700'>
								Since 2010, My Private Tutor Online has helped hundreds of students
								achieve their academic goals.
							</p>

							<p className='text-base sm:text-lg leading-relaxed text-gray-600'>
								We're proud to say we've never spent a penny on marketing or paid
								advertising — our tutors are consistently in demand through personal
								word-of-mouth referrals alone.
							</p>

							<p className='text-base sm:text-lg leading-relaxed text-gray-600'>
								Here's what a selection of families have to say about their experience
								with us. We are always happy to share references for specific tutors
								upon request.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export default TestimonialsIntro;
