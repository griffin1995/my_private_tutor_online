'use client';

import { m } from 'framer-motion';
import React from 'react';
interface FirstLessonSectionProps {
	className?: string;
	backgroundColor?: string;
	heading?: string;
	paragraph?: string;
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
}: FirstLessonSectionProps): JSX.Element {
	return (
		<div className={`bg-${backgroundColor} py-20 ${className}`}>
			{}
			{}
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
						<div className='text-left space-y-8'>
							<div>
								{}
								{}
								<h3 className='text-2xl lg:text-3xl font-serif font-bold text-primary-900 mb-6'>
									{heading || 'First Lesson to Seventh Continent'}
								</h3>

								<div className='space-y-6'>
									{}
									{}
									<p className='text-lg text-primary-700 leading-relaxed'>
										{parseTextWithStrong(
											paragraph ||
												"I started tutoring at Bristol and immediately felt something click. I've always had a natural affinity with children and combining that with academics just made sense. I went on to complete my Masters, all the while refining my tutoring practice, both in person and online. I quickly found myself being recommended from family to family.  What followed was a series of international placements and the <strong>opportunities to work with VIPs and private families around the world. By 2017, I had visited all seven continents</strong>. Along the way, I met and worked alongside some truly exceptional educators — many of whom are still firm favourites in the tutoring team now.",
										)}
									</p>
								</div>
							</div>
						</div>
					</div>
				</m.div>
			</div>
		</div>
	);
}
export default FirstLessonSection;
