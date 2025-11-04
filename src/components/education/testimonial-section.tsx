'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial10Props {
	quote?: string;
	author?: {
		name: string;
		role: string;
		avatar: {
			src: string;
			alt: string;
		};
	};
}

export const Testimonial10 = ({
	// quote = 'Testimonial quote text goes here. This is where the customer feedback or testimonial content will be displayed.',
	// author = {
	// 	name: 'Testimonial Author Name',
	// 	role: 'Testimonial Author Role',
	// 	avatar: {
	// 		src: 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp',
	// 		alt: 'Testimonial Author Avatar',
	// 	},
	// },
	quote,
	author,
}: Testimonial10Props) => {
	return (
		<section className='py-4 sm:py-6 md:py-8'>
			<div className='w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col items-center text-center'>
					<p className='mb-6 sm:mb-7 md:mb-8 max-w-3xl sm:max-w-4xl md:max-w-5xl px-4 sm:px-6 md:px-8 font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>
						&ldquo;{quote}&rdquo;
					</p>
					<div className='flex items-center gap-2 sm:gap-3 md:gap-4'>
						<Avatar className='size-10 sm:size-12 md:size-14 lg:size-16'>
							<AvatarImage
								src={author.avatar.src}
								alt={author.avatar.alt}
							/>
							<AvatarFallback>{author.name}</AvatarFallback>
						</Avatar>
						<div className='text-left'>
							<p className='text-xs sm:text-sm md:text-base font-medium'>{author.name}</p>
							<p className='text-muted-foreground text-xs sm:text-sm md:text-base'>{author.role}</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export type { Testimonial10Props };
