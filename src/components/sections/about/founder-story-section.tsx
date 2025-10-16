'use client';

import { ThreePillarsSection } from 'src/components/sections/three-pillars-section.tsx';
import { Blockquote } from 'flowbite-react';
import { FirstLessonSection } from './FirstLessonSection';
import { getGoingAgainstGrainImage } from '@/lib/cms/cms-images';
import Image from 'next/image';
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
interface FounderStorySectionProps {
	backgroundColor?: string;
	className?: string;
}
export function FounderStorySection({
	backgroundColor = 'white',
	className = '',
}: FounderStorySectionProps): JSX.Element {
	const goingAgainstGrainImage = getGoingAgainstGrainImage();
	return (
		<section
			id='founder-story'
			className={`relative bg-${backgroundColor} pb-8 lg:pb-12 ${className}`}
			aria-labelledby='founder-story-heading'>
			{}
			{}

			{}
			{}
			{}
			{}
			<div className='container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-none'></div>

			{}
			{}
			{}
			<div className='w-full '>
				<div className='grid lg:grid-cols-2 gap-0 lg:grid-rows-1 auto-rows-fr items-stretch'>
					<div className='order-2 lg:order-1'>
						{}
						{}
						<div className='relative w-full h-full aspect-[17/9] lg:aspect-auto'>
							{}
							{}
							<Image
								src='/images/team/founder-elizabeth-burrows-portrait.jpg'
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

					<div className='order-1 lg:order-2 bg-primary-700/5 transition-all duration-300  px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 min-h-[450px] lg:min-h-[550px] flex flex-col justify-center items-end'>
						{}
						{}
						{}
						{}
						<div className='max-w-6xl text-right p-8 '>
							<h2 className='pb-2 mb-3'>
								Meet Elizabeth, A Different Kind of Educator
							</h2>
							<p>
								Considering how unconventional my own schooling was, I often find myself
								chuckling that I&apos;m in my second decade of a career in education.{' '}
								<strong>
									My path through school wasn&apos;t linear; I think that&apos;s one of
									the reasons families trust me.
								</strong>{' '}
								I&apos;m motivated by helping children when it feels like there are no
								straight lines, only a confusing jumble of squiggles. That&apos;s when
								my team and I can make a real impact.
							</p>{' '}
							<div className='grid grid-cols-1 md:grid-cols-2 md:gap-6'>
								{}
								{}
								<p>
									<strong>
										I moved through six different schools growing up, across private,
										state, faith, co-educational and single-sex systems (including a
										boys&apos; school run by monks — yes, really
									</strong>
									). My learning could have easily suffered, especially since I have{' '}
									<strong>Dyspraxia</strong>, but one constant made a huge difference: my
									tutor. She not only gave me academic consistency but something far more
									valuable — a quiet confidence and the belief that excellence was
									achievable, even in turbulent times.
								</p>
								<Blockquote data-pull-quote>
									{}
									{}
									<svg
										className='mb-3 h-14 w-14 ml-auto fill-primary-700/40'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 18 14'>
										<path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
									</svg>
									<p>
										This is an example Pull Quote for Beth! That is roughly the same
										amount of characters as the bolded section provided! and some extra
										characters to actually reach roughly the same!
									</p>
								</Blockquote>
							</div>
							<p>
								<strong>
									I moved through six different schools growing up, across private,
									state, faith, co-educational and single-sex systems (including a
									boys&apos; school run by monks — yes, really
								</strong>
								). My learning could have easily suffered, especially since I have{' '}
								<strong>Dyspraxia</strong>, but one constant made a huge difference: my
								tutor. She not only gave me academic consistency but something far more
								valuable — a quiet confidence and the belief that excellence was
								achievable, even in turbulent times.
							</p>
						</div>
					</div>
				</div>
			</div>

			{}
			{}
			{}
			{}
			{}
			<div className='w-full mb-10'>
				<div className='grid lg:grid-cols-2 gap-0 lg:grid-rows-1 auto-rows-fr items-stretch'>
					<div className='bg-primary-700/5 transition-all duration-300  px-8 sm:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 min-h-[450px] lg:min-h-[550px] flex flex-col justify-center'>
						{}
						{}
						{}
						{}
						<div className='max-w-6xl text-left p-8'>
							<h2 className='pb-2 mb-3'>Going Against the Grain</h2>

							<div className='space-y-6'>
								<p>
									By Sixth Form, I was achieving top grades. I hadn&apos;t planned to
									apply to Oxbridge, but when my headmistress pulled me aside to ask if
									I&apos;d considered it, something inside me switched on.{' '}
									<strong>
										I loved a challenge, and applying to Cambridge to read English and
										Theatre with Education Studies was certainly that.
									</strong>
								</p>

								<p>
									But my offer letter was as much cause for agitation as celebration. You
									see, I had already fallen in love with another course and city:
									Bristol. My elder sister was studying languages there and although I
									had doggedly courted a Cambridge offer, I hadn&apos;t considered a
									world in which I would actually receive one. What to do?{' '}
									<strong>Who turns down Cambridge? 17 year-old me.</strong>
									It was an agonising decision, but even then I knew it was the right
									one. Looking back, I realise that dilemma helped define my ethos
									towards education:{' '}
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
						{}
						{}
						<div className='relative w-full h-full aspect-[17/9] lg:aspect-auto'>
							{}
							{}
							{}
							{}
							<Image
								src={goingAgainstGrainImage.src}
								alt={goingAgainstGrainImage.alt}
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
				</div>
			</div>

			{}
			{}
			{}
			<FirstLessonSection />

			{}
			{}
			{}
			<div className='w-full'>
				{}
				<div className='block md:hidden'>
					<div className='bg-white px-6 sm:px-8 py-12 sm:py-16'>
						<div className='max-w-4xl mx-auto'>
							{}
							{}
							<h2 className='mb-6'>A Global View of What Education Can Do</h2>

							<div className='space-y-4'>
								{}
								{}
								{}
								{}
								<p>
									Keen to put my English degree to good use, during this time I also
									worked at{' '}
									<strong>
										<em>Forbes Middle East</em>
									</strong>{' '}
									as Online Editor. I covered a range of subjects, including education.
									Conducting interviews with business moguls and CEOs reinforced what I
									already knew:{' '}
									<strong>
										the right educational support doesn&apos;t just help people ace exams
										— it shapes their choices
									</strong>
									, their confidence and their future. These leaders had turned their
									fortunes around through education. What could be more exciting and
									important?
								</p>
							</div>
						</div>
					</div>

					{}
					<div className='relative h-[300px] sm:h-[400px] w-full'>
						{}
						{}
						<Image
							src='/images/team/founder-elizabeth-burrows-professional.jpg'
							alt='Elizabeth Burrows Professional Portrait - Forbes Middle East Online Editor and education expert, showcasing her business journalism background'
							fill
							className='object-cover'
							placeholder='blur'
							blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
							loading='lazy'
							quality={90}
							sizes='100vw'
						/>
					</div>
				</div>

				{}
				<div className='hidden md:block relative h-[600px] w-full'>
					{}
					{}
					<Image
						src='/images/team/founder-elizabeth-burrows-professional.jpg'
						alt='Elizabeth Burrows Professional Portrait - Forbes Middle East Online Editor and education expert, showcasing her business journalism background'
						fill
						className='object-cover'
						placeholder='blur'
						blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAVGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
						loading='lazy'
						quality={90}
						sizes='100vw'
						priority={false}
					/>

					{}
					{}
					<div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent'></div>

					{}
					{}
					<div className='absolute inset-x-0 bottom-0 flex items-end z-10 p-8 sm:p-10 lg:p-12'>
						<div className='w-full'>
							<div className='max-w-4xl px-4 sm:px-6'>
								{}
								{}
								{}
								<h2 className='text-white'>A Global View of What Education Can Do</h2>

								<div className='text-white/90 space-y-4'>
									{}
									{}
									{}
									{}
									<p className='text-white'>
										Keen to put my English degree to good use, during this time I also
										worked at{' '}
										<strong>
											<em>Forbes Middle East</em>
										</strong>{' '}
										as Online Editor. I covered a range of subjects, including education.
										Conducting interviews with business moguls and CEOs reinforced what I
										already knew:{' '}
										<strong>
											the right educational support doesn&apos;t just help people ace exams
											— it shapes their choices
										</strong>
										, their confidence and their future. These leaders had turned their
										fortunes around through education. What could be more exciting and
										important?
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{}
			<div className='mx-auto max-w-6xl text-center py-8 sm:px-6 lg:px-8 mt-7 lg:mt-10'>
				{}
				{}
				<h2 className='mb-8'>Results That Matter</h2>

				<div className='space-y-6'>
					<p>
						Since founding My Private Tutor Online more than 15 years ago, my team and
						I have helped hundreds of families through key academic transitions …
					</p>
				</div>
			</div>

			{}
			<section className='w-full bg-primary-50 py-0'>
				<div className='mx-auto  px-4 sm:px-6 lg:px-12'>
					<ThreePillarsSection />
				</div>
			</section>

			{}
			<div className='mx-auto max-w-6xl text-center px-4 sm:px-6 lg:px-8'>
				{}
				{}
				<div className='space-y-6'>
					<p>
						Tutoring isn't just about good grades. It's about having someone in your
						corner who sees what you're capable of …
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

			{}
			{}
			{}
			{}

			{}
			{}
			{}
			{}

			{}
			{}
			<div className='container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-none'>
				{}
				{}
				{}
				{}
			</div>

			{}
			{}
		</section>
	);
}
export default FounderStorySection;
