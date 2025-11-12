'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Highlighter } from '@/components/magicui/highlighter';
const parseDescription = (text: string): JSX.Element => {
	const paragraphs = text.split('\n\n');
	return (
		<>
			{paragraphs.map((paragraph, index) => {
				if (paragraph.includes('two princes and the princess')) {
					return (
						<p
							key={index}
							className={
								index > 0 ? 'mt-4 text-gray-700 italic' : 'text-gray-700 italic'
							}>
							"Hi Elizabeth, I found out today that{' '}
							<Highlighter
								action='highlight'
								color='#eab308'
								strokeWidth={2}
								iterations={1}
								padding={4}>
								the two princes and the princess
							</Highlighter>{' '}
							have all been offered places at Le Rosey for next year. The family is
							delighted and would like me to pass on their sincerest thanks to you and
							the team for all your hard work."
						</p>
					);
				}
				const parts = paragraph.split(/(\*\*[^*]+\*\*)/);
				return (
					<p
						key={index}
						className={index > 0 ? 'mt-4 text-gray-700' : 'text-gray-700'}>
						{parts.map((part, partIndex) => {
							if (part.startsWith('**') && part.endsWith('**')) {
								const boldText = part.slice(2, -2);
								return (
									<strong
										key={partIndex}
										className='font-semibold'>
										{boldText}
									</strong>
								);
							}
							return part;
						})}
					</p>
				);
			})}
		</>
	);
};
interface TrustIndicator {
	icon: string;
	title: string;
	subtitle?: string;
	description: string;
	imageUrl?: string;
	imageAlt?: string;
}
interface TrustIndicatorsGridProps {
	indicators: TrustIndicator[];
	studentImages: Record<
		string,
		{
			src: string;
			alt: string;
			width: number;
			height: number;
		}
	>;
}
export function TrustIndicatorsGrid({
	indicators,
	studentImages,
}: TrustIndicatorsGridProps) {
	console.log(
		'[DEBUG-TrustIndicatorsGrid] Component rendered with indicators:',
		{
			indicatorsType: typeof indicators,
			isArray: Array.isArray(indicators),
			indicatorsLength:
				Array.isArray(indicators) ? indicators.length : 'not array',
			indicators: indicators,
		},
	);
	if (!indicators || !Array.isArray(indicators)) {
		console.warn(
			'[DEBUG-TrustIndicatorsGrid] indicators prop is not a valid array:',
			indicators,
		);
		return (
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='text-center text-gray-500'>
					<p>Loading trust indicators...</p>
				</div>
			</div>
		);
	}
	if (indicators.length === 0) {
		console.warn('[DEBUG-TrustIndicatorsGrid] indicators array is empty');
		return (
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<div className='text-center text-gray-500'>
					<p>No trust indicators available.</p>
				</div>
			</div>
		);
	}
	console.log('[DEBUG-TrustIndicatorsGrid] Valid indicators array found:', {
		length: indicators.length,
		firstIndicator: indicators[0]?.title || 'No title',
	});
	const getImageForIndicator = (indicator: TrustIndicator, index: number) => {
		console.log('[DEBUG-TrustIndicatorsGrid] getImageForIndicator called:', {
			index,
			indicatorTitle: indicator?.title || 'No title',
			hasImageUrl: !!indicator?.imageUrl,
			hasImageAlt: !!indicator?.imageAlt,
			studentImagesAvailable:
				studentImages ? Object.keys(studentImages).length : 0,
		});
		if (indicator.imageUrl && indicator.imageAlt) {
			console.log(
				'[DEBUG-TrustIndicatorsGrid] Using CMS imageUrl:',
				indicator.imageUrl,
			);
			return {
				src: indicator.imageUrl,
				alt: indicator.imageAlt,
				width: 600,
				height: 400,
			};
		}
		if (!studentImages || Object.keys(studentImages).length === 0) {
			console.warn(
				'[DEBUG-TrustIndicatorsGrid] studentImages prop is undefined or empty, using fallback image',
			);
			console.log(
				'[DEBUG-TrustIndicatorsGrid] studentImages received:',
				studentImages,
			);
			return {
				src: '/images/placeholder.svg',
				alt: 'Placeholder image for trust indicator',
				width: 400,
				height: 300,
			};
		}
		let imageKey: string;
		if (indicator.title.includes('Built on Trust')) {
			imageKey = 'student-teacher-inside-comfortable';
		} else if (indicator.title.includes('Examiner insight')) {
			imageKey = 'student-inside-holding-pencil';
		} else if (
			indicator.title.includes('By Invitation Only') ||
			indicator.title.includes('Discretion')
		) {
			imageKey = 'adult-student-with-teacher';
		} else if (indicator.title.includes('Global Network')) {
			imageKey = 'student-on-laptop-teacher-on-screen';
		} else {
			const imageKeys = Object.keys(studentImages);
			imageKey =
				imageKeys[index % imageKeys.length] || 'student-teacher-inside-comfortable';
		}
		console.log('[DEBUG-TrustIndicatorsGrid] Selected imageKey:', imageKey);
		const selectedImage = studentImages[imageKey];
		console.log(
			'[DEBUG-TrustIndicatorsGrid] Selected image from studentImages:',
			selectedImage,
		);
		if (!selectedImage) {
			console.warn(
				`[DEBUG-TrustIndicatorsGrid] Image key '${imageKey}' not found in studentImages, using fallback`,
			);
			console.log(
				'[DEBUG-TrustIndicatorsGrid] Available keys:',
				Object.keys(studentImages),
			);
			const availableKeys = Object.keys(studentImages);
			if (availableKeys.length > 0) {
				const fallbackImage = studentImages[availableKeys[0]];
				console.log(
					'[DEBUG-TrustIndicatorsGrid] Using fallback image:',
					fallbackImage,
				);
				return fallbackImage;
			}
			console.warn(
				'[DEBUG-TrustIndicatorsGrid] No images available at all - using placeholder',
			);
			return {
				src: '/images/placeholder.svg',
				alt: 'Placeholder image for trust indicator',
				width: 400,
				height: 300,
			};
		}
		console.log(
			'[DEBUG-TrustIndicatorsGrid] Returning selected image:',
			selectedImage,
		);
		return selectedImage;
	};
	return (
		<div className='w-full pt-16'>
			{}
			{}
			<div className='flex flex-col gap-0'>
				{indicators.slice(0, 4).map((indicator, index) => {
					const studentImage = getImageForIndicator(indicator, index);
					const isOddRow = index % 2 === 0;
					return (
						<div
							key={index}
							className='grid grid-cols-1 lg:grid-cols-2 gap-0'
							style={{
								minHeight: 'clamp(350px, 40vh, 500px)',
							}}>
							{}
							{}
							{isOddRow ?
								<>
									{}
									<motion.div
										className='trust-image relative w-full h-full overflow-hidden group'
										initial={{
											opacity: 0,
											scale: 1.05,
										}}
										whileInView={{
											opacity: 1,
											scale: 1,
										}}
										viewport={{
											once: true,
											margin: '-100px',
										}}
										transition={{
											duration: 0.8,
											ease: 'easeOut',
										}}>
										<Image
											src={studentImage.src}
											alt={indicator.title}
											fill
											className='object-cover transition-transform duration-300 ease-out group-hover:scale-105'
											sizes='(max-width: 1024px) 100vw, 50vw'
											priority={index < 2}
										/>
										{}
										{}
										<div className='absolute inset-0 bg-gradient-to-r from-transparent to-black/20' />
										{}
										{}
										<div className='absolute inset-0 border-2 border-transparent group-hover:border-yellow-400/50 group-hover:shadow-lg group-hover:shadow-yellow-400/25 transition-all duration-300 ease-out' />
									</motion.div>

									{}
									<motion.div
										className='trust-content flex items-center justify-center bg-[rgba(63,74,126,0.03)] hover:scale-[1.01] transform transition-all duration-300 rounded-lg shadow-sm hover:shadow-md'
										initial={{
											opacity: 0,
											x: 20,
										}}
										whileInView={{
											opacity: 1,
											x: 0,
										}}
										viewport={{
											once: true,
											margin: '-100px',
										}}
										transition={{
											duration: 0.8,
											delay: 0.2,
											ease: 'easeOut',
										}}>
										{}
										{}
										{}
										{}
										{}
										<div className='max-w-xl text-right p-4 sm:p-6 md:p-8'>
											{}
											{}
											{}
											{}
											{}
											<h3
												className='font-serif text-xl font-semibold text-[rgba(63,74,126,1)] pb-2 mb-3 border-b border-[rgba(63,74,126,0.15)]'
												style={{
													fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
													lineHeight: '1.2',
													letterSpacing: '-0.025em',
												}}>
												{indicator.title}
											</h3>
											{indicator.subtitle && (
												<h4
													className='font-semibold text-primary-700 mb-6'
													style={{
														fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
														lineHeight: '1.3',
														letterSpacing: '-0.01em',
													}}>
													{indicator.subtitle}
												</h4>
											)}
											{}
											{}
											<div
												className='text-gray-700 leading-relaxed'
												style={{
													fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
													lineHeight: '1.6',
													letterSpacing: '0.01em',
												}}>
												{parseDescription(indicator.description)}
											</div>
										</div>
									</motion.div>
								</>
							:	<>
									{}
									<motion.div
										className='trust-content flex items-center justify-center bg-[rgba(63,74,126,0.03)] hover:scale-[1.01] transform transition-all duration-300 rounded-lg shadow-sm hover:shadow-md order-2 lg:order-1'
										initial={{
											opacity: 0,
											x: -20,
										}}
										whileInView={{
											opacity: 1,
											x: 0,
										}}
										viewport={{
											once: true,
											margin: '-100px',
										}}
										transition={{
											duration: 0.8,
											delay: 0.2,
											ease: 'easeOut',
										}}>
										{}
										{}
										{}
										{}
										{}
										<div className='max-w-xl text-left p-4 sm:p-6 md:p-8'>
											{}
											{}
											{}
											{}
											{}
											<h3
												className='font-serif text-xl font-semibold'
												style={{
													fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
													lineHeight: '1.2',
													letterSpacing: '-0.025em',
												}}>
												{indicator.title}
											</h3>
											{indicator.subtitle && (
												<h4
													className='font-semibold text-primary-700 mb-6'
													style={{
														fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
														lineHeight: '1.3',
														letterSpacing: '-0.01em',
													}}>
													{indicator.subtitle}
												</h4>
											)}
											{}
											{}
											<div
												className='text-gray-700 leading-relaxed'
												style={{
													fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
													lineHeight: '1.6',
													letterSpacing: '0.01em',
												}}>
												{parseDescription(indicator.description)}
											</div>
										</div>
									</motion.div>

									{}
									<motion.div
										className='trust-image relative w-full h-full order-1 lg:order-2 overflow-hidden group'
										initial={{
											opacity: 0,
											scale: 1.05,
										}}
										whileInView={{
											opacity: 1,
											scale: 1,
										}}
										viewport={{
											once: true,
											margin: '-100px',
										}}
										transition={{
											duration: 0.8,
											ease: 'easeOut',
										}}>
										<Image
											src={studentImage.src}
											alt={indicator.title}
											fill
											className='object-cover transition-transform duration-300 ease-out group-hover:scale-105'
											sizes='(max-width: 1024px) 100vw, 50vw'
											priority={index < 2}
										/>
									</motion.div>
								</>
							}
						</div>
					);
				})}
			</div>
		</div>
	);
}
