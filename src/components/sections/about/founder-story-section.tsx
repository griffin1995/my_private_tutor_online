'use client';

// Hardcoded image data - detached from CMS
const GOING_AGAINST_GRAIN_IMAGE = {
	src: '/images/about/going-against-the-grain.webp',
	alt: 'Cambridge University - prestigious academic institution representing educational excellence and Going Against the Grain philosophy',
	width: 1920,
	height: 1080,
	title: 'Going Against the Grain - Cambridge University',
	loading: 'eager' as const,
	priority: true,
} as const;
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import type { JSX } from 'react';
import { ThreePillarsSection } from 'src/components/sections/three-pillars-section';
interface FounderStorySectionProps {
	backgroundColor?: string;
	className?: string;
}
export function FounderStorySection({
	backgroundColor = 'white',
	className = '',
}: FounderStorySectionProps): JSX.Element {
	// Using hardcoded image data instead of CMS function
	return (
		<section
			id='founder-story'
			className={`relative bg-${backgroundColor} pb-8 lg:pb-12 ${className}`}
			aria-labelledby='founder-story-heading'>
			<div className='container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-none'></div>

			<div className='w-full'>
				<div className='grid lg:grid-cols-2 gap-0 lg:grid-rows-1 lg:auto-rows-fr lg:items-stretch'>
					<div className='order-2 lg:order-1'>
						<div className='hidden lg:block relative w-full h-full'>
							<Image
								src='/images/about/meet-elizabeth-a-different-kind-of-educator.webp'
								alt='Elizabeth Burrows - Founder and CEO of My Private Tutor Online, personal portrait showcasing her approachable and professional demeanour'
								fill
								className='object-cover'
								placeholder='blur'
								blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
								loading='lazy'
								quality={90}
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						</div>
					</div>

					<div className='order-1 lg:order-2 bg-primary-700/5 transition-all duration-300  px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 lg:py-20 min-h-[300px] sm:min-h-[400px] lg:min-h-[550px] flex flex-col justify-center items-end'>
						<div className='max-w-full sm:max-w-6xl text-right p-2 sm:p-4 md:p-8'>
							<h2 className='pb-2 mb-3 text-2xl sm:text-3.5xl'>
								Meet Elizabeth, A Different Kind of Educator
							</h2>

							{/* Container for paragraph and pull quote */}
							<div className='text-left'>
								<p>
									Considering how unconventional my own schooling was, I often find
									myself chuckling that I&apos;m in my second decade of a career in
									education. My path through school wasn&apos;t linear; I think
									that&apos;s one of the reasons families trust me. I&apos;m motivated by
									helping children when it feels like there are no straight lines, only a
									confusing jumble of squiggles. That&apos;s when my team and I can make
									a real impact.
									{/* Pull Quote - Floated Right, positioned in middle of text */}
									<span
										data-magazine-pull-quote
										className='float-right w-80 ml-6 mb-6 mt-2 text-left inline-block border-l-2 border-neutral-grey-300 pl-4 pr-2 italic text-neutral-grey-600'>
										<svg
											className='mb-3 h-10 w-10 ml-auto fill-primary-700/40'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 18 14'>
											<path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
										</svg>
										<span className='text-2xl lg:text-2xl font-semibold'>
											I moved through six different schools growing up, across private,
											state, faith, co-educational and single-sex (including a boys&apos;
											school run by monks — yes, really).
										</span>
									</span>
									<br />
									<br />
									I moved through six different schools growing up, across private,
									state, faith, co-educational and single-sex systems (including a
									boys&apos; school run by monks — yes, really). My learning could have
									easily suffered, especially since I have Dyspraxia, but one constant
									made a huge difference: my tutor.
									<br />
									<br />
									She not only gave me academic consistency but something far more
									valuable — a quiet confidence and the belief that excellence was
									achievable, even in turbulent times.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='w-full'>
				<div className='grid lg:grid-cols-2 gap-0 lg:grid-rows-1 lg:auto-rows-fr lg:items-stretch'>
					<div className='order-2 lg:order-1 bg-primary-700/5 transition-all duration-300  px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 lg:py-20 min-h-[300px] sm:min-h-[400px] lg:min-h-[550px] flex flex-col justify-center'>
						<div className='max-w-full sm:max-w-6xl text-left p-2 sm:p-4 md:p-8'>
							<h2 className='pb-2 mb-3 text-2xl sm:text-3.5xl'>
								Going Against the Grain
							</h2>

							{/* Container for paragraph and pull quote */}
							<div className='text-left'>
								<p>
									By Sixth Form, I was achieving top grades. I hadn&apos;t planned to
									apply to Oxbridge, but when my headmistress pulled me aside to ask if
									I&apos;d considered it, something inside me switched on. I loved a
									challenge, and applying to Cambridge to read English and Theatre with
									Education Studies was certainly that.
									<br />
									<br />
									But my offer letter was as much cause for agitation as celebration. You
									see, I had already fallen in love with another course and city:
									Bristol. My elder sister was studying languages there and although I
									had doggedly courted a Cambridge offer, I hadn&apos;t considered a
									world in which I would actually receive one. What to do? Who turns down
									Cambridge? 17-year-old me.
									{/* Pull Quote - Floated Left, positioned in middle of text */}
									<span
										data-magazine-pull-quote
										className='float-left w-80 mr-6 mb-6 mt-2 text-left inline-block border-l-2 border-neutral-grey-300 pl-4 pr-2 italic text-neutral-grey-600'>
										<svg
											className='mb-3 h-10 w-10 ml-auto fill-primary-700/40'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 18 14'>
											<path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
										</svg>
										<span className='text-2xl lg:text-2xl font-semibold'>
											Who turns down Cambridge? 17-year-old me.
										</span>
									</span>
									It was an agonising decision, but even then I knew it was the right
									one.
									<br />
									<br />
									Looking back, I realise that dilemma helped define my ethos towards
									education:{' '}
									<strong>
										work as hard as you can to give yourself the luxury of choice, then
										have the confidence to pick what&apos;s right for you — even if
										it&apos;s not what&apos;s expected.
									</strong>
								</p>
							</div>
						</div>
					</div>

					<div className='order-1 lg:order-2'>
						<div className='hidden lg:block relative w-full h-full'>
							<Image
								src={GOING_AGAINST_GRAIN_IMAGE.src}
								alt={GOING_AGAINST_GRAIN_IMAGE.alt}
								fill
								className='object-cover'
								placeholder='blur'
								blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
								loading='lazy'
								quality={90}
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						</div>
						<AspectRatio
							ratio={16 / 9}
							className='lg:hidden'>
							<Image
								src={GOING_AGAINST_GRAIN_IMAGE.src}
								alt={GOING_AGAINST_GRAIN_IMAGE.alt}
								fill
								className='object-cover'
								placeholder='blur'
								blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
								loading='lazy'
								quality={90}
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						</AspectRatio>
					</div>
				</div>
			</div>

			<div className='w-full'>
				<div className='grid lg:grid-cols-2 gap-0 lg:grid-rows-1 lg:auto-rows-fr lg:items-stretch'>
					<div className='order-1 lg:order-1'>
						<div className='hidden lg:block relative w-full h-full'>
							<Image
								src='/images/about/1st-lesson-to-7th-continent.png'
								alt='Global education journey - Elizabeth Burrows teaching experience across seven continents, showcasing international VIP family placements and worldwide tutoring expertise'
								fill
								className='object-cover'
								placeholder='blur'
								blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
								loading='lazy'
								quality={90}
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						</div>
						<AspectRatio
							ratio={16 / 9}
							className='lg:hidden'>
							<Image
								src='/images/about/1st-lesson-to-7th-continent.png'
								alt='Global education journey - Elizabeth Burrows teaching experience across seven continents, showcasing international VIP family placements and worldwide tutoring expertise'
								fill
								className='object-cover'
								placeholder='blur'
								blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
								loading='lazy'
								quality={90}
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						</AspectRatio>
					</div>

					<div className='order-2 lg:order-2 bg-primary-700/5 transition-all duration-300  px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 lg:py-20 min-h-[300px] sm:min-h-[400px] lg:min-h-[550px] flex flex-col justify-center items-end'>
						<div className='max-w-full sm:max-w-6xl text-right p-2 sm:p-4 md:p-8'>
							<h2 className='pb-2 mb-3 text-2xl sm:text-3.5xl'>
								First Lesson to Seventh Continent
							</h2>

							{/* Container for paragraph and pull quote */}
							<div className='text-left'>
								<p>
									I started tutoring at Bristol and immediately felt something click.
									I&apos;ve always had a natural affinity with children and combining
									that with academics just made sense. I went on to complete my Masters,
									all the while refining my tutoring practice, both in person and online.
									I quickly found myself being recommended from family to family. What
									followed was a series of international placements and the opportunities
									to work with VIPs and private families around the world. By 2017, I had
									visited all seven continents.
									{/* Pull Quote - Floated Right, positioned in middle of text */}
									<span
										data-magazine-pull-quote
										className='float-right w-80 ml-6 mb-6 mt-2 text-left inline-block border-l-2 border-neutral-grey-300 pl-4 pr-2 italic text-neutral-grey-600'>
										<svg
											className='mb-3 h-10 w-10 ml-auto fill-primary-700/40'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 18 14'>
											<path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
										</svg>
										<span className='text-2xl lg:text-2xl font-semibold'>
											What followed was a series of international placements and
											opportunities to work with royalty, VIPs and private families. By
											2017, I had visited all seven continents.
										</span>
									</span>
									Along the way, I met and worked alongside some truly exceptional
									educators — many of whom are still firm favourites in the tutoring team
									now.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='w-full'>
				<div className='grid lg:grid-cols-2 gap-0 lg:grid-rows-1 lg:auto-rows-fr lg:items-stretch'>
					<div className='order-2 lg:order-1 bg-primary-700/5 transition-all duration-300  px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-12 lg:py-20 min-h-[300px] sm:min-h-[400px] lg:min-h-[550px] flex flex-col justify-center'>
						<div className='max-w-full sm:max-w-6xl text-left p-2 sm:p-4 md:p-8'>
							<h2 className='pb-2 mb-3 text-2xl sm:text-3.5xl'>
								A Global View of What Education Can Do
							</h2>

							{/* Container for paragraph and pull quote */}
							<div className='text-left'>
								<p>
									Keen to put my English degree to good use, during this time I also
									worked at{' '}
									<strong>
										<em>Forbes Middle East</em>
									</strong>{' '}
									as Online Editor. I covered a range of subjects, including education.
									Conducting interviews with business moguls and CEOs reinforced what I
									already knew: the right educational support doesn&apos;t just help
									people ace exams — it shapes their choices, their confidence and their
									future.
									{/* Pull Quote - Floated Left, positioned in middle of text */}
									<span
										data-magazine-pull-quote
										className='float-left w-80 mr-6 mb-6 mt-2 text-left inline-block border-l-2 border-neutral-grey-300 pl-4 pr-2 italic text-neutral-grey-600'>
										<svg
											className='mb-3 h-10 w-10 ml-auto fill-primary-700/40'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 18 14'>
											<path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
										</svg>
										<span className='text-2xl lg:text-2xl font-semibold'>
											Working for Forbes Middle East reinforced what I knew: the right
											educational support doesn&apos;t just help people ace exams — it
											shapes their choices, their confidence and their future.
										</span>
									</span>
									These leaders had turned their fortunes around through education. What
									could be more exciting and important?
								</p>
							</div>
						</div>
					</div>

					<div className='order-1 lg:order-2'>
						<div className='hidden lg:block relative w-full h-full'>
							<Image
								src='/images/team/founder-elizabeth-burrows-professional.jpg'
								alt='Elizabeth Burrows Professional Portrait - Forbes Middle East Online Editor and education expert, showcasing her business journalism background'
								fill
								className='object-cover'
								placeholder='blur'
								blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
								loading='lazy'
								quality={90}
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						</div>
						<AspectRatio
							ratio={16 / 9}
							className='lg:hidden'>
							<Image
								src='/images/team/founder-elizabeth-burrows-professional.jpg'
								alt='Elizabeth Burrows Professional Portrait - Forbes Middle East Online Editor and education expert, showcasing her business journalism background'
								fill
								className='object-cover'
								placeholder='blur'
								blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
								loading='lazy'
								quality={90}
								sizes='(max-width: 768px) 100vw, 50vw'
							/>
						</AspectRatio>
					</div>
				</div>
			</div>

			<div className='mx-auto max-w-6xl text-center py-8 sm:px-6 lg:px-8 mt-7 lg:mt-10'>
				<h2 className='mb-8'>Results That Matter</h2>

				<div className='space-y-6'>
					<p>
						Since founding My Private Tutor Online more than 15 years ago, my team and
						I have helped hundreds of families through key academic transitions — from
						entrance exams to Oxbridge interviews, international moves to last-minute
						GCSE turnarounds. We&apos;re rightly proud of our stellar track record.
					</p>
				</div>
			</div>

			<section className='w-full bg-white py-0'>
				<div className='mx-auto  px-4 sm:px-6 lg:px-12'>
					<ThreePillarsSection className='bg-white' />
				</div>
			</section>

			<div className='mx-auto max-w-6xl text-center px-4 sm:px-6 lg:px-8'>
				<div className='space-y-6'>
					<p>
						Tutoring isn’t just about good grades. It’s about having someone in your
						corner who sees what you’re capable of, even before you do. That’s the
						kind of guidance I had growing up, and it’s what I aim to offer every
						family who works with us. If you&apos;re looking for more than a tutor —
						if you’re seeking a trusted partner to help navigate the terrain, whether
						calm or chaotic — I’d love to hear from you.
					</p>
				</div>

				<div className='flex flex-col items-center pt-8 mt-8 border-t border-primary-100'>
					<p>
						<strong>Elizabeth Burrows, Founder & CEO</strong>
					</p>
					<Image
						src='/images/team/elizabeth-burrows-signature.png'
						alt='Elizabeth Burrows Signature'
						width={400}
						height={120}
						className='w-2/3 opacity-90 mb-3'
					/>
				</div>
			</div>

			<div className='container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-none'></div>
		</section>
	);
}
export default FounderStorySection;
