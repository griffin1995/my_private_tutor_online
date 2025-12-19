'use client';

import { m } from 'framer-motion';
import React from 'react';
import { HeadingText, BodyText } from '@/components/ui/typography';
interface FirstLessonSectionProps {
	className?: string;
	backgroundColor?: string;
	heading?: string;
	paragraph?: string;
	showConnectorArrow?: boolean;
}
function parseTextWithStrong(text: string): React.ReactNode[] {
	const parts = text.split(/(<strong>.*?<\/strong>)/g);
	return parts.map((part, index) => {
		if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
			const content = part.replace(/<\/?strong>/g, '');
			return <strong key={index}>{content}</strong>;
		}
		return part;
	});
}
const fadeInUpVariant = {
	initial: {
		opacity: 0,
		y: 30,
	},
	animate: {
		opacity: 1,
		y: 0,
	},
	transition: {
		duration: 0.8,
	},
};
export function FirstLessonSection({
	className = '',
	backgroundColor = 'white',
	heading,
	paragraph,
	showConnectorArrow = false,
}: FirstLessonSectionProps): JSX.Element {
	return (
		<div className={`bg-${backgroundColor} py-20 ${className}`}>
			<div className='container mx-auto max-w-6xl px-6 sm:px-8 lg:px-12'>
				<m.div
					initial={fadeInUpVariant.initial}
					whileInView={fadeInUpVariant.animate}
					viewport={{
						once: true,
						margin: '-100px',
					}}
					transition={fadeInUpVariant.transition}>
					<div className='space-y-10'>
						{showConnectorArrow && (
							<svg
								width='48'
								height='48'
								viewBox='0 0 48 48'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className='opacity-80 hover:opacity-100 transition-opacity duration-300 block mx-auto'>
								{/* Arrow pointing right */}
								<path
									d='M8 24 C12 20, 20 20, 24 24 C28 28, 36 28, 40 24'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									fill='none'
									className='text-primary-900'
								/>
								<path
									d='M36 20 L40 24 L36 28'
									stroke='currentColor'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
									fill='none'
									className='text-primary-900'
								/>
							</svg>
						)}
						<div className='text-left space-y-8'>
							<div>
								<HeadingText
									variant="secondary"
									level={3}
									className="text-primary-900 mb-6"
									responsive
								>
									{heading || 'First Lesson to Seventh Continent'}
								</HeadingText>

								<div className='space-y-6'>
									<BodyText
										variant="large"
										className="text-primary-700"
									>
										{parseTextWithStrong(
											paragraph ||
												"I started tutoring at Bristol and immediately felt something click. I've always had a natural affinity with children and combining that with academics just made sense. I went on to complete my Masters, all the while refining my tutoring practice, both in person and online. I quickly found myself being recommended from family to family.  What followed was a series of international placements and the <strong>opportunities to work with VIPs and private families around the world. By 2017, I had visited all seven continents</strong>. Along the way, I met and worked alongside some truly exceptional educators — many of whom are still firm favourites in the tutoring team now.",
										)}
									</BodyText>
								</div>
							</div>
						</div>
					</div>
				</m.div>
			</div>
		</div>
	);
}
