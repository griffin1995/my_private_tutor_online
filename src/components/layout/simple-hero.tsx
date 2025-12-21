'use client';

import { cn } from '@/lib/utils';
import { DisplayText, HeadingText, CaptionText } from '@/components/ui/typography';
interface SimpleHeroProps {
	backgroundImage: string;
	h1: string;
	h1AccentText?: string; // Optional accent text to highlight in gold
	h2: string;
	className?: string;
	decorativeStyle?: 'lines' | 'dots' | 'none';
	textVerticalOffset?: 'default' | 'lower' | 'higher' | 'much-lower';
}

export function SimpleHero({
	backgroundImage,
	h1,
	h1AccentText,
	h2,
	className,
	decorativeStyle = 'lines',
	textVerticalOffset = 'default',
}: SimpleHeroProps) {
	return (
		<section
			data-hero-section
			className={cn('relative h-screen w-screen overflow-hidden', className)}
			role='banner'
			aria-label='Hero section'>
			<div
				className='absolute inset-0'
				aria-hidden='true'>
				<div
					className='absolute inset-0'
					style={{
						backgroundImage: `url(${backgroundImage})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						animation: 'heroZoom 15s ease-out 0s 1 normal none running',
					}}
				/>
				<style
					dangerouslySetInnerHTML={{
						__html: `
            @keyframes heroZoom {
              0% { transform: scale(1.25); }
              100% { transform: scale(1); }
            }
          `,
					}}
				/>
			</div>

			{/* Layer 1: Navy scrim for text contrast (WCAG 4.5:1) */}
			<div
				className='absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/50 to-transparent'
				aria-hidden='true'
			/>

			{/* Layer 2: Brand gold accent for warmth and cohesion with blog cards */}
			<div
				className='absolute inset-0 bg-gradient-to-t from-accent-600/70 via-accent-600/20 to-transparent mix-blend-soft-light'
				aria-hidden='true'
			/>

			{/* Dot pattern texture overlay - Premium editorial aesthetic with radial fade */}
			<div
				className='absolute inset-0'
				aria-hidden='true'
				style={{
					backgroundImage:
						'radial-gradient(circle at 2px 2px, rgb(255, 255, 255) 1px, transparent 0)',
					backgroundSize: '20px 20px',
					opacity: 0.1,
					maskImage: 'radial-gradient(800px circle at center, white, transparent)',
					WebkitMaskImage:
						'radial-gradient(800px circle at center, white, transparent)',
				}}
			/>
			<div className='relative z-10 flex flex-col items-center justify-center h-full px-4 text-center'>
				<div
					className={cn(
						'w-[80vw] max-w-screen-xl mx-auto',
						textVerticalOffset === 'much-lower' ?
							'pt-28 sm:pt-32 md:pt-36 lg:pt-44 xl:pt-48'
						: textVerticalOffset === 'lower' ? 'pt-16 lg:pt-20'
						: textVerticalOffset === 'higher' ? 'pt-8'
						: 'pt-12',
					)}>
					<div
						className='mb-[26px]'>
						<DisplayText
							variant="hero"
							alignment="center"
							className="text-white uppercase tracking-wider drop-shadow-lg"
							responsive
						>
							{h1}{h1AccentText && <> <span className="text-accent-600">{h1AccentText}</span></>}
						</DisplayText>
					</div>

					<div>
						<HeadingText
							variant="secondary"
							level={2}
							alignment="center"
							className="font-light text-white max-w-full mx-auto px-4 tracking-wide drop-shadow-md normal-case"
							responsive
						>
							{h2}
						</HeadingText>
					</div>
				</div>

				<div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center'>
					<div
						className='flex flex-col items-center cursor-pointer'
						onClick={() => {
							window.scrollTo({
								top: window.innerHeight,
								behavior: 'smooth',
							});
						}}>
						<svg
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							className='text-white opacity-70'>
							<path
								d='M7 10l5 5 5-5'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>

						<CaptionText
							variant="small"
							className="font-serif tracking-widest uppercase text-white mt-2 opacity-60"
							responsive>
							SCROLL
						</CaptionText>
					</div>
				</div>
			</div>
		</section>
	);
}
