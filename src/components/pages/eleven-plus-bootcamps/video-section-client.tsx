'use client';

import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { VideoPopup } from '@/components/video/video-popup';
import { useVideoPopup } from '@/hooks/use-video-popup';
import { getElevenPlusBootcampsContent } from '@/lib/cms/cms-content';

export function VideoSectionClient() {
	const { isOpen, closeVideo } = useVideoPopup();
	const data = getElevenPlusBootcampsContent();
	const { video } = data.content;

	return (
		<>
			<figure className="w-full max-w-lg">
				<HeroVideoDialog
					videoSrc={video.videoSrc}
					thumbnailSrc={video.thumbnailSrc}
					thumbnailAlt={video.thumbnailAlt}
					animationStyle="from-center"
					className="w-full"
				/>
				<figcaption className="sr-only">
					{video.figcaption}
				</figcaption>
			</figure>

			{/* Video Popup */}
			<VideoPopup
				isOpen={isOpen}
				onClose={closeVideo}
				videoUrl={video.videoSrc}
				title={video.title}
				poster={video.poster}
			/>
		</>
	);
}