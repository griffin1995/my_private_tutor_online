import { Button } from '@/components/ui/button';
import { NewHeroVideoDialog } from '@/components/ui/new-hero-video-dialog';
import { cn } from '@/lib/utils';

/**
 * Testimonial video content - hardcoded for now
 * TODO: Wire to Payload CMS TestimonialVideos collection
 */
const TESTIMONIAL_VIDEOS = [
	{
		id: 'parent-testimonials',
		title: 'Parent Testimonials',
		description:
			'Hear from parents about their experience with My Private Tutor Online',
		videoSrc: '/media/testimonials/parent/video.mp4',
		thumbnailSrc: '/media/testimonials/parent/thumbnail.jpg',
	},
	{
		id: 'student-testimonials',
		title: 'Student Testimonials',
		description:
			'Hear from students about their success with My Private Tutor Online',
		videoSrc: '/media/testimonials/student/video.mp4',
		thumbnailSrc: '/media/testimonials/student/thumbnail.jpg',
	},
] as const;

interface VideoTestimonialsSectionProps {
	backgroundColor?: string;
	className?: string;
	showMoreButton?: boolean;
}

export function VideoTestimonialsSection({
	backgroundColor = 'bg-white',
	className,
	showMoreButton = false,
}: VideoTestimonialsSectionProps) {
	return (
		<section
			className={cn('py-12 lg:py-16', backgroundColor, className)}
		>
			<div className="container">
				<div className="mx-auto max-w-7xl">
					<div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
						{TESTIMONIAL_VIDEOS.map((video) => (
							<div key={video.id} className="relative">
								<NewHeroVideoDialog
									videoSrc={video.videoSrc}
									thumbnailSrc={video.thumbnailSrc}
									thumbnailAlt={video.description}
									className="w-full overflow-hidden border border-primary/20 shadow-lg transition-all duration-300 hover:border-gold hover:shadow-xl"
									animationStyle="from-center"
								/>
							</div>
						))}
					</div>

					{/* "Hear more from our clients" button - conditionally rendered */}
					{showMoreButton && (
						<div className="mt-8 flex justify-center lg:mt-12">
							<Button size="lg">Hear more from our clients</Button>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export default VideoTestimonialsSection;
