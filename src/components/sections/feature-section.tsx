import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FeatureSectionProps {
	title: string;
	description: string | ReactNode;
	imageSrc: string;
	imageAlt: string;
	imagePosition?: 'left' | 'right';
	primaryAction: {
		text: string;
		href: string;
	};
	secondaryAction: {
		text: string;
		href: string;
	};
	className?: string;
}

export function FeatureSection({
	title,
	description,
	imageSrc,
	imageAlt,
	imagePosition = 'right',
	primaryAction,
	secondaryAction,
	className,
}: FeatureSectionProps) {
	const isExternal = (href: string) =>
		href.startsWith('http') || href.startsWith('https');

	return (
		<section className={cn('w-full', className)}>
			<div
				className={cn(
					'grid items-center gap-8 md:grid-cols-2 md:gap-0 w-full',
					imagePosition === 'left' && 'md:[&>*:first-child]:order-2'
				)}
			>
					{/* Text Content */}
					<div className="flex flex-col items-center text-center md:items-start md:text-left px-6 md:px-8 lg:px-12 xl:px-16">
						<h3 className="my-4 mt-0 text-balance text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl sm:my-5 md:my-6">
							{title}
						</h3>
						{description && (
							<p className="text-muted-foreground mb-6 sm:mb-7 md:mb-8 max-w-xl text-sm sm:text-base md:text-lg lg:text-xl">
								{description}
							</p>
						)}
						<div className="flex w-full flex-col justify-center gap-2 sm:flex-row md:justify-start">
							{isExternal(primaryAction.href) ? (
								<Button asChild className="rounded-none">
									<a
										href={primaryAction.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										{primaryAction.text}
									</a>
								</Button>
							) : (
								<Button asChild className="rounded-none">
									<Link href={primaryAction.href}>{primaryAction.text}</Link>
								</Button>
							)}
							{isExternal(secondaryAction.href) ? (
								<Button variant="outline" asChild className="rounded-none">
									<a
										href={secondaryAction.href}
										target="_blank"
										rel="noopener noreferrer"
									>
										{secondaryAction.text}
									</a>
								</Button>
							) : (
								<Button variant="outline" asChild className="rounded-none">
									<Link href={secondaryAction.href}>
										{secondaryAction.text}
									</Link>
								</Button>
							)}
						</div>
					</div>

					{/* Image */}
					<div className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-video overflow-hidden">
						<Image
							src={imageSrc}
							alt={imageAlt}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</div>
			</div>
		</section>
	);
}

export default FeatureSection;
