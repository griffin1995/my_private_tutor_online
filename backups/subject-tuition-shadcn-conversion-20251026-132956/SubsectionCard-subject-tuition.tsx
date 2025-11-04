'use client';

import { memo } from 'react';
import { Separator } from '@radix-ui/react-separator';
import { motion } from 'framer-motion';
import HeroVideoDialogSubjectTuition from '@/components/magicui/hero-video-dialog-subject-tuition';
import type { SubsectionCard as SubsectionCardType } from '@/types/education-tabs';
interface SubsectionCardProps {
	readonly card: SubsectionCardType;
	readonly index?: number;
}
export const SubsectionCardSubjectTuition = memo(function SubsectionCardSubjectTuition({
	card,
	index = 0,
}: SubsectionCardProps) {
	return (
		<motion.div
			initial={{
				opacity: 0,
				y: 20,
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			transition={{
				duration: 0.5,
				delay: index * 0.1,
			}}
			className='bg-white border-2 border-neutral-300 p-8 shadow-subtle-md hover:shadow-depth-md transition-all duration-300'>
			{}
			{}
			{}
			<h3 className='mb-4'>{card.heading}</h3>

			{}
			{}
			{}
			<Separator className='bg-neutral-300 my-4' />

			{}
			{}
			{}
			<div className='mb-6 whitespace-pre-line'>{card.mainTextBody}</div>

			{}
			{}
			{}
			{card.videos && card.videos.length > 0 && (
				<div className='mt-6 space-y-4'>
					{}
					{}
					{card.videos.map((video) => (
						<div
							key={video.id}
							className='w-full'>
							{}
							{}
							<HeroVideoDialogSubjectTuition
								videoSrc={video.youtubeUrl}
								thumbnailSrc={video.thumbnailSrc}
								thumbnailAlt={video.thumbnailAlt}
								animationStyle='from-center'
								isFree={video.isFree}
								purchaseLink={video.purchaseLink}
								className='w-full'
							/>
						</div>
					))}
				</div>
			)}
		</motion.div>
	);
});
export type { SubsectionCardProps };
