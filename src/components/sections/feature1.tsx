'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Feature1Props {
	title: string;
	description?: string | React.ReactNode;
	imageSrc: string;
	imageAlt: string;
	buttonPrimary: {
		text: string;
		href: string;
	};
	buttonSecondary: {
		text: string;
		href: string;
	};
}

const Feature1 = ({
	title = 'Blocks built with Shadcn & Tailwind',
	description = 'Hundreds of finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.',
	imageSrc = 'https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg',
	imageAlt = 'placeholder hero',
	buttonPrimary = {
		text: 'Get Started',
		href: 'https://shadcnblocks.com',
	},
	buttonSecondary = {
		text: 'Learn More',
		href: 'https://shadcnblocks.com',
	},
}: Feature1Props) => {
	return (
		<section className='py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12'>
			<div className='container px-4 sm:px-6 md:px-8 lg:px-8'>
				<div className='grid items-center gap-6 sm:gap-8 md:grid-cols-2 md:gap-10 lg:gap-12 xl:gap-16'>
					<div className='flex flex-col items-center text-center md:items-start md:text-left'>
						<h3 className='my-4 mt-0 text-balance text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl sm:my-5 md:my-6'>
							{title}
						</h3>
						{description && (
							<p className='text-muted-foreground mb-6 sm:mb-7 md:mb-8 max-w-xl text-sm sm:text-base md:text-lg lg:text-xl'>
								{description}
							</p>
						)}
						<div className='flex w-full flex-col justify-center gap-2 sm:flex-row md:justify-start'>
							<Button asChild style={{ backgroundColor: '#3f4a7e !important', color: '#ffffff !important', borderColor: '#3f4a7e !important', borderRadius: '0 !important' }}>
								<a
									href={buttonPrimary.href}
									target='_blank'>
									{buttonPrimary.text}
								</a>
							</Button>
							<Button
								variant='outline'
								asChild
								style={{ backgroundColor: '#ffffff !important', color: '#3f4a7e !important', borderColor: '#3f4a7e !important', borderRadius: '0 !important' }}>
								<a
									href={buttonSecondary.href}
									target='_blank'>
									{buttonSecondary.text}
								</a>
							</Button>
						</div>
					</div>
					<div className='relative w-full aspect-video md:aspect-[4/3] lg:aspect-video rounded-none overflow-hidden'>
						<Image
							src={imageSrc}
							alt={imageAlt}
							fill
							className='object-cover'
							sizes='(max-width: 768px) 100vw, 50vw'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export { Feature1 };
