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
			<div className='container p-0 m-0'>
				<div className='bg-accent flex w-full flex-col gap-16 overflow-hidden rounded-none px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8'>
					<div className='flex-1'>
						<h3 className='mb-3 text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6'>
							{heading}
						</h3>
						<p className='text-muted-foreground max-w-xl lg:text-lg'>{description}</p>
					</div>
					<div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
						{buttons.secondary && (
							<Button
								variant='outline'
								size='lg'
								className='rounded-none h-12 px-7 py-3 text-base'
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
								size='lg'
								className='rounded-none bg-primary-700 text-white hover:bg-primary-800 hover:text-white h-12 px-7 py-3 text-base'>
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
