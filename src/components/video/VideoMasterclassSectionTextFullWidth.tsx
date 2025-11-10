'use client';

import { useMemo, useCallback, memo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import HeroVideoDialog from '@/components/magicui/hero-video-dialog';
import { Separator } from '@/components/ui/separator';
import { getMasterclassVideo } from '@/lib/cms/cms-images';
import { type VideoMasterclass } from '../../../COMPREHENSIVE_VIDEO_CMS';
interface TransformedVideoData {
	readonly title: string;
	readonly videoUrl: string;
	readonly thumbnailUrl: string;
	readonly backgroundImage: string;
	readonly alt: string;
	readonly duration: string;
	readonly author: string;
	readonly isFree: boolean;
	readonly price?: string;
	readonly paymentUrl?: string;
	readonly layouts: {
		readonly videoPage: {
			readonly badge: {
				readonly text: string;
			};
			readonly content: {
				readonly paragraphs: readonly string[];
				readonly bulletPoints: readonly string[];
			};
			readonly animationStyle: string;
		};
	};
}
interface VideoMasterclassSectionTextFullWidthProps {
	readonly video?: VideoMasterclass;
	readonly videoId?: string;
	readonly layout: 'text-left' | 'text-right';
	readonly className?: string;
}
const VideoMasterclassSectionTextFullWidthComponent = memo(
	function VideoMasterclassSectionTextFullWidth({
		video: directVideo,
		videoId,
		layout,
		className = '',
	}: VideoMasterclassSectionTextFullWidthProps) {
		const transformedVideo: TransformedVideoData | null = useMemo(() => {
			let videoData: VideoMasterclass | undefined;
			if (!directVideo && !videoId) {
				console.error(
					"VideoMasterclassSectionTextFullWidth requires either 'video' or 'videoId' prop",
				);
				return null;
			}
			if (directVideo) {
				videoData = directVideo;
				return {
					title: videoData.title,
					videoUrl: videoData.youtubeUrl,
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
				} as const;
			} else if (videoId) {
				const legacyVideo = getMasterclassVideo(videoId);
				if (!legacyVideo) {
					console.error(`Video not found for videoId: "${videoId}"`);
					return null;
				}
				return legacyVideo;
			}
			return null;
		}, [directVideo, videoId]);
		if (!transformedVideo) {
			return null;
		}
		const video = transformedVideo;
		const layoutData = video.layouts.videoPage;
		if (!layoutData) {
			console.error(`Layout data not found for video`);
			return null;
		}
		const {
			videoUrl,
			thumbnailUrl,
			alt,
			author,
			isFree,
			price,
			backgroundImage,
		} = video;
		const handlePurchaseClick = useCallback(
			(e: React.MouseEvent) => {
				if (video.paymentUrl) {
					e.preventDefault();
					window.open(video.paymentUrl, '_blank', 'noopener,noreferrer');
				}
			},
			[video.paymentUrl],
		);
		const { content, animationStyle } = layoutData;
		const layoutConfig = useMemo(() => {
			const isTextLeft = layout === 'text-left';
			return {
				isTextLeft,
				textAlignment: isTextLeft ? '' : 'text-right',
				bulletAlignment: isTextLeft ? '' : 'justify-end',
				videoGridOrder: isTextLeft ? 'order-2' : 'order-1',
				textGridOrder: isTextLeft ? 'order-1' : 'order-2',
				watchCirclePosition: isTextLeft ? '-right-24' : '-left-24',
				backgroundStyle: {
					backgroundImage: backgroundImage ? `url('${backgroundImage}')` : undefined,
				},
			} as const;
		}, [layout, backgroundImage]);
		const {
			isTextLeft,
			textAlignment,
			bulletAlignment,
			videoGridOrder,
			textGridOrder,
			watchCirclePosition,
			backgroundStyle,
		} = layoutConfig;
		return (
			<div
				className={`relative flex flex-col md:flex-row bg-cover bg-center bg-no-repeat ${className}`}
				style={backgroundStyle}>
				<div className='absolute inset-0 bg-gradient-to-br from-slate-900/65 via-slate-900/50 to-slate-900/70 backdrop-blur-[2px] backdrop-brightness-75 backdrop-contrast-110 backdrop-filter' />
				{videoUrl && videoUrl.trim() !== '' && (
					<div
						className={`relative z-10 flex justify-center items-center p-8 md:w-1/2 ${videoGridOrder}`}>
						{isFree ?
							<div className='relative group'>
								<div
									className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}>
									<span className='text-white group-hover:text-[#D4AF37] font-medium italic transition-colors duration-300'>
										Watch.
									</span>
								</div>
								<HeroVideoDialog
									videoSrc={videoUrl}
									thumbnailSrc={thumbnailUrl}
									thumbnailAlt={alt}
									animationStyle={animationStyle}
									isFree={isFree}
									className='w-full max-w-lg mx-auto border border-white border-opacity-50 rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
								/>
							</div>
						:	<a
								href={video.paymentUrl || '#'}
								target='_blank'
								rel='noopener noreferrer'
								className='relative group cursor-pointer block'
								onClick={handlePurchaseClick}>
								<div
									className={`absolute ${watchCirclePosition} top-1/2 -translate-y-1/2 translate-y-8 w-32 h-32 border border-white group-hover:border-[#D4AF37] rounded-full flex items-center justify-center transition-colors duration-300`}>
									<span className='!text-white group-hover:!text-[#D4AF37] font-medium italic transition-colors duration-300'>
										Buy.
									</span>
								</div>
								<div className='relative'>
									<div className='absolute inset-0 bg-black/15 rounded-lg z-10 transition-opacity duration-300 group-hover:bg-black/0'></div>
									<div className='w-full max-w-lg mx-auto border border-white border-opacity-50 rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] relative overflow-hidden'>
										<Image
											src={thumbnailUrl}
											alt={alt}
											width={640}
											height={360}
											className='w-full h-full object-cover drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]'
											style={{
												aspectRatio: '16/9',
											}}
											priority={false}
											loading='lazy'
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px'
											quality={75}
										/>
									</div>
								</div>
							</a>
						}
					</div>
				)}

				<div
					className={`relative z-10 flex-1 px-6 md:px-8 py-8 ${textAlignment} ${textGridOrder}`}
					style={{
						WebkitFontSmoothing: 'antialiased',
						fontSmoothing: 'antialiased',
					}}>
					<h2 className='text-4xl font-bold text-white mb-3 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] tracking-tight'>
						{video.title}
					</h2>

					<Separator className='bg-gray-300 my-3' />

					{content.paragraphs.map((paragraph, index) => {
						const processedText = paragraph
							.replace(/\n\n/g, '<br><br>')
							.replace(/\n/g, '<br>');
						return (
							<div
								key={index}
								className='text-white mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] leading-relaxed tracking-wide'
								dangerouslySetInnerHTML={{
									__html: processedText,
								}}
							/>
						);
					})}

					<Separator className='bg-gray-300 my-3' />

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2'>
						{content.bulletPoints.map((bulletPoint, index) => (
							<div
								key={index}
								className={`flex items-start gap-2 w-full ${bulletAlignment}`}>
								{isTextLeft ?
									<>
										<span className='text-white/80 mt-1 text-sm flex-shrink-0 select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]'>
											•
										</span>
										<span className='text-white text-sm leading-relaxed drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] tracking-wide'>
											{bulletPoint}
										</span>
									</>
								:	<>
										<span className='text-white text-sm leading-relaxed text-right flex-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] tracking-wide'>
											{bulletPoint}
										</span>
										<span className='text-white/80 mt-1 text-sm flex-shrink-0 select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]'>
											•
										</span>
									</>
								}
							</div>
						))}
					</div>
				</div>
			</div>
		);
	},
	(prevProps, nextProps) => {
		return (
			prevProps.videoId === nextProps.videoId &&
			prevProps.layout === nextProps.layout &&
			prevProps.className === nextProps.className &&
			prevProps.video?.id === nextProps.video?.id
		);
	},
);
export const VideoMasterclassSectionTextFullWidth =
	VideoMasterclassSectionTextFullWidthComponent;
export default VideoMasterclassSectionTextFullWidth;
