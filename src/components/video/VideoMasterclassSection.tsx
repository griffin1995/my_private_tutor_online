'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Play, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import {
	getMasterclassVideo,
	type VideoMasterclass,
} from '@/lib/cms/cms-images';
interface VideoMasterclassSectionProps {
	readonly video?: VideoMasterclass;
	readonly videoId?: string;
	readonly layout: 'text-left' | 'text-right';
	readonly className?: string;
}
interface VideoModalProps {
	readonly videoUrl: string;
	readonly thumbnailUrl: string;
	readonly alt: string;
	readonly watchCirclePosition: string;
}
function VideoModal({
	videoUrl,
	thumbnailUrl,
	alt,
	watchCirclePosition,
}: VideoModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Dialog.Root
			open={isOpen}
			onOpenChange={setIsOpen}>
			<div className='relative group'>
				{}
				<div
					className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}>
					<span className='text-white group-hover:text-[#D4AF37] font-medium italic transition-colors duration-300'>
						Watch.
					</span>
				</div>

				{}
				{}
				<Dialog.Trigger asChild>
					<div className='w-full max-w-lg mx-auto cursor-pointer'>
						<div className='relative border border-white border-opacity-50 rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] overflow-hidden group-hover:border-opacity-100 transition-all duration-300'>
							{}
							{}
							{}
							<img
								src={thumbnailUrl}
								alt={alt}
								style={{
									aspectRatio: '16/9',
								}}
								className='w-full h-full object-cover'
							/>

							{}
							<div className='absolute inset-0 flex items-center justify-center'>
								<div className='bg-black/60 rounded-full p-6 group-hover:bg-black/80 group-hover:scale-110 transition-all duration-300'>
									<Play className='w-12 h-12 text-white fill-white' />
								</div>
							</div>
						</div>
					</div>
				</Dialog.Trigger>
			</div>

			{}
			{}
			<Dialog.Portal>
				{}
				{}
				<Dialog.Overlay className='fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999]' />

				{}
				{}
				<Dialog.Content className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[10000] w-[90vw] max-w-6xl'>
					{}
					<Dialog.Close className='absolute -top-12 right-0 flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50'>
						<X className='w-6 h-6' />
					</Dialog.Close>

					{}
					<div
						className='relative w-full'
						style={{
							aspectRatio: '16/9',
						}}>
						{}
						{}
						{videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ?
							<iframe
								src={videoUrl}
								className='w-full h-full shadow-2xl border border-white rounded-lg'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
								allowFullScreen
								title={alt}
							/>
						:	<video
								src={videoUrl}
								className='w-full h-full shadow-2xl object-contain border border-white rounded-lg'
								controls
								autoPlay
								playsInline
								preload='metadata'
							/>
						}
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
export function VideoMasterclassSection({
	video: directVideo,
	videoId,
	layout,
	className = '',
}: VideoMasterclassSectionProps) {
	const DEBUG_MODE = process.env.NODE_ENV === 'development';
	let videoData: VideoMasterclass | undefined;
	let transformedVideo: any;
	if (directVideo) {
		videoData = directVideo;
		transformedVideo = {
			title: videoData.title,
			videoUrl: videoData.youtubeUrl || '',
			thumbnailUrl: videoData.thumbnailImage,
			backgroundImage: videoData.backgroundImage,
			alt: videoData.title,
			duration: '15',
			author: 'Elizabeth Burrows',
			isFree: !videoData.isPaid,
			price: videoData.isPaid ? 'Premium Content' : undefined,
			paymentUrl: videoData.purchaseLink,
			layouts: {
				videoPage: {
					badge: {
						text: videoData.isPaid ? 'Premium' : 'Free',
					},
					content: {
						paragraphs: [videoData.description],
						bulletPoints: videoData.bulletPoints || [
							'Expert guidance from Elizabeth Burrows',
							'Based on 15 years of tutoring experience',
							'Practical strategies for academic success',
							'Proven methodology for educational excellence',
						],
					},
					animationStyle: 'fade',
				},
			},
		};
		if (DEBUG_MODE) {
			console.group(
				'\n============================================================\n📍 PHASE 1: VideoMasterclassSection Data Transformation\n============================================================',
			);
			console.log('✅ Batch Mode Active: Using direct video object');
			console.log('📊 Source VideoMasterclass:', videoData);
			console.log('📊 Transformed Video Object:', transformedVideo);
			console.log('🔍 Critical Property Mapping:');
			console.log('  youtubeUrl (source):', videoData.youtubeUrl);
			console.log('  ➡️ videoUrl (transformed):', transformedVideo.videoUrl);
			console.log('  videoUrl type:', typeof transformedVideo.videoUrl);
			console.log('  videoUrl length:', transformedVideo.videoUrl?.length || 0);
			console.log('  videoUrl trimmed:', transformedVideo.videoUrl?.trim());
			console.groupEnd();
		}
	} else if (videoId) {
		transformedVideo = getMasterclassVideo(videoId);
		if (!transformedVideo) {
			console.error(`Video not found for videoId: "${videoId}"`);
			return null;
		}
		if (DEBUG_MODE) {
			console.group(
				'\n============================================================\n📍 PHASE 1: VideoMasterclassSection Legacy Lookup\n============================================================',
			);
			console.log('✅ Legacy Mode Active: Using videoId lookup');
			console.log('📊 Video ID:', videoId);
			console.log('📊 Retrieved Video:', transformedVideo);
			console.groupEnd();
		}
	} else {
		console.error(
			"VideoMasterclassSection requires either 'video' or 'videoId' prop",
		);
		return null;
	}
	const video = transformedVideo;
	const layoutData = video?.layouts?.videoPage;
	if (!layoutData) {
		console.error(`Layout data not found for video`);
		return null;
	}
	const {
		videoUrl,
		thumbnailUrl,
		alt,
		duration,
		author,
		isFree,
		price,
		backgroundImage,
	} = video;
	if (DEBUG_MODE) {
		console.group(
			'\n============================================================\n📍 PHASE 1: VideoMasterclassSection Extracted Properties\n============================================================',
		);
		console.log('📊 Layout Data:', layoutData);
		console.log('🔍 Extracted Properties:');
		console.log('  videoUrl:', videoUrl);
		console.log('  videoUrl type:', typeof videoUrl);
		console.log('  videoUrl truthy?:', !!videoUrl);
		console.log('  videoUrl.trim() !== ""?:', videoUrl && videoUrl.trim() !== '');
		console.log('  thumbnailUrl:', thumbnailUrl);
		console.log('  alt:', alt);
		console.log('  isFree:', isFree);
		console.log('  backgroundImage:', backgroundImage);
		console.groupEnd();
	}
	const { badge, content, animationStyle } = layoutData;
	const isTextLeft = layout === 'text-left';
	const textAlignment = isTextLeft ? '' : 'text-right';
	const badgeAlignment = isTextLeft ? '' : 'justify-end';
	const bulletAlignment = isTextLeft ? '' : 'justify-end';
	const videoGridOrder = isTextLeft ? 'order-2' : 'order-1';
	const textGridOrder = isTextLeft ? 'order-1' : 'order-2';
	const watchCirclePosition = isTextLeft ? '-right-24' : '-left-24';
	return (
		<div
			className={`relative grid md:grid-cols-2 gap-8 items-center bg-cover bg-center bg-no-repeat ${className}`}
			style={{
				backgroundImage: `url('${backgroundImage}')`,
			}}>
			{}
			<div
				className='absolute inset-0 z-0'
				style={{
					background: `radial-gradient(circle at ${isTextLeft ? 'bottom left' : 'bottom right'}, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.1) 80%, transparent 90%)`,
				}}
			/>
			{}
			{}
			{}
			{(
				(() => {
					const hasVideoUrl = videoUrl && videoUrl.trim() !== '';
					const isPaidVideo = !isFree && !hasVideoUrl;
					const shouldShowVideo = hasVideoUrl || isPaidVideo;
					if (DEBUG_MODE) {
						console.group('\n🎯 CRITICAL CONDITIONAL: Video Visibility Decision');
						console.log('  videoUrl value:', videoUrl);
						console.log('  hasVideoUrl:', hasVideoUrl);
						console.log('  isFree:', isFree);
						console.log('  isPaidVideo (no URL, requires purchase):', isPaidVideo);
						console.log(
							'  Decision: Video will be',
							shouldShowVideo ? 'VISIBLE ✅' : 'HIDDEN ❌',
						);
						console.groupEnd();
					}
					return shouldShowVideo;
				})()
			) ?
				<div
					className={`relative z-10 flex justify-center items-center p-8 ${videoGridOrder}`}
					ref={(node) => {
						if (DEBUG_MODE && node) {
							console.group(
								'\n============================================================\n📍 PHASE 2: VideoMasterclassSection - Video Container Context\n============================================================',
							);
							console.log('📦 Video Container Element:', node);
							const rect = node.getBoundingClientRect();
							const computed = window.getComputedStyle(node);
							console.log('Container Dimensions:', {
								width: rect.width,
								height: rect.height,
							});
							console.log('Container Classes:', node.className);
							console.log('Container Position:', {
								position: computed.position,
								zIndex: computed.zIndex,
								display: computed.display,
							});
							console.groupEnd();
						}
					}}>
					{}
					{}
					{isFree && videoUrl && videoUrl.trim() !== '' ?
						<VideoModal
							videoUrl={videoUrl}
							thumbnailUrl={thumbnailUrl}
							alt={alt}
							watchCirclePosition={watchCirclePosition}
						/>
					:	<a
							href={video.paymentUrl || '#'}
							target='_blank'
							rel='noopener noreferrer'
							className='relative group cursor-pointer'>
							<div
								className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}>
								<span className='!text-white group-hover:!text-[#D4AF37] font-medium italic transition-colors duration-300'>
									Buy.
								</span>
							</div>
							<div className='relative'>
								{}
								{}
								<div className='absolute inset-0 bg-black/15 rounded-lg z-10 transition-opacity duration-300 group-hover:bg-black/0'></div>
								<div className='w-full max-w-lg mx-auto border border-white border-opacity-50 rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative overflow-hidden'>
									{}
									{}
									<img
										src={thumbnailUrl}
										alt={alt}
										className='w-full h-full object-cover drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
										style={{
											aspectRatio: '16/9',
										}}
									/>
								</div>
							</div>
						</a>
					}
				</div>
			:	<div
					className={`relative z-10 flex justify-center items-center p-8 ${videoGridOrder}`}>
					<div className='w-full max-w-lg mx-auto h-0'>{}</div>
				</div>
			}

			{}
			<div
				className={`relative z-10 w-4/5 mx-auto p-8 ${textAlignment} ${textGridOrder}`}>
				<h2 className='text-4xl font-bold text-white mb-3'>{video.title}</h2>

				{}
				{}
				<Separator className='bg-gray-300 my-3' />

				<div className={`flex items-center gap-4 mb-4 ${badgeAlignment}`}>
					<span className='text-white text-sm font-medium'>{badge.text}</span>
					<Separator
						orientation='vertical'
						className='flex-shrink-0 bg-gray-300 h-4'
					/>
					<span className='text-white text-sm font-medium'>{duration} minutes</span>
					<Separator
						orientation='vertical'
						className='flex-shrink-0 bg-gray-300 h-4'
					/>
					{video.isFree ?
						<span className='text-white text-sm font-medium'>Watch</span>
					:	<a
							href={video.paymentUrl || '#'}
							target='_blank'
							rel='noopener noreferrer'
							className='!text-white text-sm font-medium hover:!text-[#CA9E5B] hover:underline transition-all duration-300 cursor-pointer'>
							Purchase
						</a>
					}
				</div>

				<Separator
					orientation='horizontal'
					className='bg-gray-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full my-3'
				/>

				{}
				{}
				{}
				{}
				{content.paragraphs.map((paragraph, index) => {
					const processedText = paragraph
						.replace(/\n\n/g, '<br><br>')
						.replace(/\n/g, '<br>');
					return (
						<div
							key={index}
							className='text-white mb-4'
							dangerouslySetInnerHTML={{
								__html: processedText,
							}}
						/>
					);
				})}

				<Separator className='bg-gray-300 my-3' />

				{}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2'>
					{content.bulletPoints.map((bulletPoint, index) => (
						<div
							key={index}
							className={`flex items-start space-x-2 ${bulletAlignment}`}>
							{isTextLeft ?
								<>
									<span className='text-[#D4AF37] mt-1.5 text-xs'>•</span>
									<span className='text-[#D4AF37] text-sm'>{bulletPoint}</span>
								</>
							:	<>
									<span className='text-[#D4AF37] text-sm'>{bulletPoint}</span>
									<span className='text-[#D4AF37] mt-1.5 text-xs'>•</span>
								</>
							}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
export default VideoMasterclassSection;
