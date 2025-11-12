'use client';

import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { TutorProfile } from '@/lib/cms/cms-content';
import { getImageAsset } from '@/lib/cms/cms-images';
import { X } from 'lucide-react';
import React from 'react';

interface TutorProfileCardProps {
	readonly profile: TutorProfile;
	readonly featured?: boolean;
	readonly className?: string;
}

export const TutorProfileCard: React.FC<TutorProfileCardProps> = ({
	profile,
	featured,
	className = '',
}) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const tutorImage = getImageAsset('tutors', profile.image.key);

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<div
					className={`group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer ${className}`}>
					<div className='p-6'>
						<div className='flex flex-col items-center space-y-4 w-full'>
							<div className='w-33 h-33 rounded-full overflow-hidden ring-2 ring-accent-600/20 group-hover:ring-accent-600/40 transition-all duration-300'>
								<img
									src={tutorImage?.src || '/images/tutors/tutor-placeholder.jpg'}
									alt={profile.image.alt}
									className='w-full h-full object-cover object-center'
								/>
							</div>

							<div className='text-center space-y-2'>
								<h3 className='text-primary-900'>{profile.name}</h3>
								<p className='text-accent-600 font-medium'>{profile.title}</p>
							</div>

							<div className='text-center'>
								<span className='text-sm text-neutral-600 group-hover:text-accent-600 transition-colors duration-300'>
									Click to view profile →
								</span>
							</div>
						</div>
					</div>
				</div>
			</DialogTrigger>

			<DialogContent className='w-screen h-screen max-w-none p-0 overflow-y-auto'>
				{/* Close Button - Fixed Position */}
				<DialogClose className='fixed top-4 right-4 sm:top-6 sm:right-6 z-50 rounded-full bg-white/90 backdrop-blur-sm p-2 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-600 focus:ring-offset-2'>
					<X className='h-6 w-6 text-neutral-600 hover:text-primary-900' />
					<span className='sr-only'>Close</span>
				</DialogClose>

				{/* Content Container with Padding */}
				<div className='max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16'>
					{/* Header Section */}
					<div className='flex flex-col md:flex-row items-center md:items-start gap-6 mb-8'>
						<div className='w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden ring-4 ring-accent-600/30 flex-shrink-0'>
							<img
								src={tutorImage?.src || '/images/tutors/tutor-placeholder.jpg'}
								alt={profile.image.alt}
								className='w-full h-full object-cover object-center'
							/>
						</div>

						<div className='text-center md:text-left flex-1'>
							<h2 className='text-primary-900 mb-2'>{profile.name}</h2>
							<p className='text-xl sm:text-2xl text-accent-600 font-semibold mb-4'>
								{profile.title}
							</p>

							{profile.badge && (
								<span className='inline-block text-4xl mb-4'>{profile.badge}</span>
							)}
						</div>
					</div>

					{/* Content Grid */}
					<div className='space-y-8'>
						{/* Education Section */}
						<div className='bg-neutral-50 rounded-xl p-6'>
							<h3 className='mb-4 flex items-center text-primary-900'>
								<svg
									className='mr-2 h-5 w-5 text-accent-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
									/>
								</svg>
								Education
							</h3>

							<div className='space-y-2'>
								<p className='font-semibold text-primary-900'>
									{profile.education.degree}
								</p>
								<p className='text-neutral-700'>{profile.education.university}</p>
								{profile.education.grade && (
									<p className='text-accent-600 font-medium'>
										{profile.education.grade}
									</p>
								)}
								{profile.education.additionalQualifications && (
									<div className='mt-3'>
										<p className='font-medium text-neutral-900 mb-2'>
											Additional Qualifications:
										</p>
										<ul className='list-disc list-inside ml-2 space-y-1 text-neutral-700'>
											{profile.education.additionalQualifications.map(
												(qual, index) => (
													<li key={index}>{qual}</li>
												),
											)}
										</ul>
									</div>
								)}
							</div>
						</div>

						{/* Experience Section */}
						<div className='bg-neutral-50 rounded-xl p-6'>
							<h3 className='mb-4 flex items-center text-primary-900'>
								<svg
									className='mr-2 h-5 w-5 text-accent-600'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
								Experience
							</h3>

							<div className='space-y-2'>
								<p className='text-neutral-700'>
									<span className='font-semibold text-primary-900'>
										{profile.experience.yearsTeaching} years
									</span>{' '}
									teaching experience
								</p>
								{profile.experience.totalStudents && (
									<p className='text-neutral-700'>
										<span className='font-semibold text-primary-900'>
											{profile.experience.totalStudents}+
										</span>{' '}
										students taught
									</p>
								)}
								{profile.experience.onlineHours && (
									<p className='text-neutral-700'>
										<span className='font-semibold text-primary-900'>
											{profile.experience.onlineHours}+
										</span>{' '}
										online tutoring hours
									</p>
								)}
								{profile.experience.eliteSchools && (
									<div className='mt-3'>
										<ul className='list-disc list-inside ml-2 space-y-1 text-neutral-700'>
											{profile.experience.eliteSchools.map((school, index) => (
												<li key={index}>{school}</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>

						{/* About Section */}
						{profile.bio && (
							<div>
								<h3 className='mb-4 text-primary-900'>
									About {profile.name.split(' ')[0]}
								</h3>
								<div className='text-neutral-700 leading-relaxed'>{profile.bio}</div>
							</div>
						)}

						{/* Specializations Section */}
						<div>
							<h3 className='mb-4 text-primary-900'>Specialisations</h3>
							<div className='flex flex-wrap gap-2'>
								{profile.specializations.map((specialization, index) => (
									<span
										key={index}
										className='inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-accent-600/10 text-accent-600 border border-accent-600/30 transition-all duration-300 hover:bg-accent-600/20'>
										{specialization}
									</span>
								))}
							</div>
						</div>

						{/* Key Achievement Section */}
						{profile.achievements && profile.achievements.length > 0 && (
							<div className='bg-accent-600/5 rounded-xl p-6 border border-accent-600/20'>
								<h3 className='mb-4 text-primary-900'>Key Achievement</h3>
								<div className='flex items-start gap-3'>
									<svg
										className='h-6 w-6 text-accent-600 mt-0.5 flex-shrink-0'
										fill='currentColor'
										viewBox='0 0 20 20'>
										<path
											fillRule='evenodd'
											d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z'
											clipRule='evenodd'
										/>
									</svg>
									<div>
										<h4 className='text-accent-600 font-semibold mb-2'>
											{profile.achievements[0].title}
										</h4>
										<p className='text-neutral-700'>
											{profile.achievements[0].description}
										</p>
									</div>
								</div>
							</div>
						)}

						{/* Testimonial Section */}
						{profile.testimonial && (
							<div className='bg-neutral-50 rounded-xl p-6 border-l-4 border-accent-600'>
								<h3 className='mb-4 text-primary-900'>Student Testimonial</h3>
								<blockquote className='italic text-neutral-700 mb-3 text-lg'>
									&quot;{profile.testimonial.quote}&quot;
								</blockquote>
								<cite className='text-neutral-600 not-italic'>
									— {profile.testimonial.author}
									{profile.testimonial.context && (
										<span>, {profile.testimonial.context}</span>
									)}
								</cite>
							</div>
						)}

						{/* CTA Button */}
						<div className='pt-6'>
							<Button
								variant='default'
								asChild
								className='w-full sm:w-auto px-8 py-6 text-base sm:text-lg bg-accent-600 hover:bg-accent-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
								<a
									href='https://www.bizstim.com/inquiry/my-private-tutor-online/64fdd7e8febbf49c3f18ec855e7b1f02a7ad87311b0ede5991704ae603ed5fef6da333482f3c2ca69a6023d329ef65549ccabecc6bdc73a878e4f2141562cceb9uE20ScSAiO9T5yRIbx7FZ54JW5tLEWIl1aGPLme4-k~'
									target='_blank'
									rel='noopener noreferrer'>
									Book Consultation with {profile.name.split(' ')[0]}
								</a>
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default TutorProfileCard;
