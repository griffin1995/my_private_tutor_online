'use client';

import React from 'react';
import { VideoMasterclassSection } from './VideoMasterclassSection';
import { type VideoMasterclass } from '@/lib/cms/video-masterclasses';
interface VideoMasterclassGridProps {
	readonly videos: readonly VideoMasterclass[];
	readonly className?: string;
}

export function VideoMasterclassGrid({
	videos,
	className = 'py-32',
}: VideoMasterclassGridProps) {
	const DEBUG_MODE = process.env.NODE_ENV === 'development';
	if (DEBUG_MODE) {
		console.group(
			'\n============================================================\n📍 PHASE 1: VideoMasterclassGrid Component Rendering\n============================================================',
		);
		console.log('✅ Component Mounted: VideoMasterclassGrid');
		console.log('📊 Videos Received:', videos?.length || 0);
		console.log('📊 Videos Array:', videos);
		console.log('📊 Class Name:', className);
		if (!videos || videos.length === 0) {
			console.error(
				'❌ No videos array or empty array received in VideoMasterclassGrid',
			);
		} else {
			console.log(
				'✅ Will render',
				videos.length,
				'VideoMasterclassSection components',
			);
		}
		console.groupEnd();
	}
	return (
		<React.Fragment>
			{videos.map((video, index) => {
				const layout = index % 2 === 0 ? 'text-left' : 'text-right';
				if (DEBUG_MODE) {
					console.group(`\n🎬 Rendering Video ${index}:`);
					console.log('  Video ID:', video.id);
					console.log('  Video Title:', video.title);
					console.log('  Layout:', layout);
					console.log('  Video Object:', video);
					console.groupEnd();
				}
				return (
					<VideoMasterclassSection
						key={video.id}
						video={video}
						layout={layout}
						className={className}
					/>
				);
			})}
		</React.Fragment>
	);
}
