import { Button } from '@/components/ui/button';
import { MessageCircleIcon, ArrowRightIcon } from 'lucide-react';

interface Cta10Props {
	heading: string;
	description: string;
	buttons?: {
		primary?: {
			text: string;
			url: string;
		};
		secondary?: {
			text: string;
			url: string;
		};
	};
}

const Cta10 = ({
	heading = 'Call to Action',
	description = 'Build faster with our collection of pre-built blocks. Speed up your development and ship features in record time.',
	buttons = {
		primary: {
			text: 'Buy Now',
			url: 'https://www.shadcnblocks.com',
		},
	},
}: Cta10Props) => {
	return (
		<section className='py-10'>
			<div className='w-full px-4 sm:px-6 lg:px-8'>
				<div className='bg-accent grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-center gap-4 overflow-hidden rounded-none px-4 sm:px-6 lg:px-8 py-16'>
					<div className='hidden lg:block'></div>
					<div className='text-center'>
						<h3 className='mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6'>
							{heading}
						</h3>
						<p className='text-muted-foreground max-w-xl lg:text-lg mx-auto'>{description}</p>
					</div>
					<div className='flex justify-center lg:justify-self-end flex-col gap-2'>
						{buttons.secondary && (
							<Button
								variant='outline'
								size='default'
								className='rounded-none h-10 px-6 py-2 text-sm'
								asChild>
								<a href={buttons.secondary.url}>
									<ArrowRightIcon />
									{buttons.secondary.text}
								</a>
							</Button>
						)}
						{buttons.primary && (
							<Button
								asChild
								variant='default'
								size='default'
								className='rounded-none bg-primary-700 text-white hover:bg-primary-800 hover:text-white h-10 px-6 py-2 text-sm'>
								<a href={buttons.primary.url}>
									<MessageCircleIcon />
									{buttons.primary.text}
								</a>
							</Button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export { Cta10 };
