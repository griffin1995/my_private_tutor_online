'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { BodyText, CaptionText } from '@/components/ui/typography';

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
		<section className='py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14'>
			<div className='w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col items-center text-center'>
					<BodyText
						variant="large"
						className='mb-6 sm:mb-7 md:mb-8 max-w-3xl sm:max-w-4xl md:max-w-5xl px-4 sm:px-6 md:px-8 font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'
						responsive>
						&ldquo;{quote}&rdquo;
					</BodyText>
					<div className='flex items-center gap-2 sm:gap-3 md:gap-4'>
						<Avatar className='size-10 sm:size-12 md:size-14 lg:size-16'>
							<AvatarFallback className='bg-transparent text-black'>
								<Search className='w-1/2 h-1/2' />
							</AvatarFallback>
						</Avatar>
						<div className='text-left'>
							<CaptionText
								variant="default"
								className='font-medium'
								responsive>
								{author.name}
							</CaptionText>
							<CaptionText
								variant="default"
								className='text-muted-foreground'
								responsive>
								{author.role}
							</CaptionText>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

interface Testimonial10NoRoleProps {
	quote?: string;
	author?: {
		name: string;
		avatar: {
			src: string;
			alt: string;
		};
	};
}

export const Testimonial10NoRole = ({
	quote,
	author,
}: Testimonial10NoRoleProps) => {
	// Standardized intersection observer
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: '-50px 0px',
	});

	// Standardized animation variants
	const fadeInUp = {
		initial: { opacity: 0, y: 20 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.6, ease: "easeOut" }
	};

	const scaleIn = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		transition: { duration: 0.6, ease: "easeOut" }
	};

	return (
		<section
			ref={ref}
			className='py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14'>
			<div className='w-full max-w-none mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex flex-col items-center text-center'>
					<div>
						<BodyText
							variant="large"
							className='mb-6 sm:mb-7 md:mb-8 max-w-3xl sm:max-w-4xl md:max-w-5xl px-4 sm:px-6 md:px-8 font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'
							responsive>
							"{quote}"
						</BodyText>
					</div>
					<div
						className='flex items-center gap-2 sm:gap-3 md:gap-4'>
						<div>
							<Avatar className='size-10 sm:size-12 md:size-14 lg:size-16'>
								<AvatarFallback className='bg-transparent text-black'>
									<Search className='w-1/2 h-1/2' />
								</AvatarFallback>
							</Avatar>
						</div>
						<div>
							<CaptionText
								variant="default"
								className='font-medium'
								responsive>
								{author.name}
							</CaptionText>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

;
