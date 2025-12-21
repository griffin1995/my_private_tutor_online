'use client';

import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { FirstLessonSection } from '@/components/sections/about/FirstLessonSection';
import { VideoMasterclassGrid } from '@/components/video/VideoMasterclassGrid';
import {
	getFeaturedVideoMasterclasses,
	getUcasVideoMasterclasses,
	getCultureVideoMasterclasses,
} from '@/lib/cms/video-masterclasses';
import React from 'react';

export default function VideoPage() {
	// Use CMS functions to get video data synchronously
	const featuredVideos = getFeaturedVideoMasterclasses();
	const ucasVideos = getUcasVideoMasterclasses();
	const cultureVideos = getCultureVideoMasterclasses();

	const videoHeroImage = {
		src: '/images/hero/video-masterclasses.jpg',
	};

	return (
		<React.Fragment>
			<section id='video-hero'>
				<SimpleHero
					backgroundImage={videoHeroImage.src}
					h1="Video Masterclasses &"
					h1AccentText="Educational Content"
					h2="A trusted guide to British education, culture, and university preparation"
					decorativeStyle="none"
				/>
			</section>

			<PageLayout
				background='white'
				showHeader={true}
				showFooter={true}
				containerSize='full'
				verticalSpacing='none'
				className='space-y-0'
				footerProps={{
					showContactForm: true,
				}}>
				<section id='featured-free-section'>
					<FirstLessonSection
						heading="The Parent's Roadmap to Effective Academic Help"
						paragraph="Access two complimentary masterclasses to benefit from Elizabeth Burrows' expert guidance, distilled from 15+ years in international education.

The journey of supporting a child through their education is fraught with complexity and uncertainty. <strong>When is a wobble a warning sign, and when is it just a blip?</strong> In a competitive, fast-changing curriculum, even engaged parents can feel unsure. The modern educational landscape presents unique challenges, with increasingly competitive environments. Understanding when and how to provide effective academic support requires deep insight into child development, learning psychology, and educational systems—knowledge that extends far beyond traditional parenting experience. Gain clarity and confidence from Elizabeth in these two complimentary seminars."
					/>
				</section>

				<VideoMasterclassGrid videos={featuredVideos} />

				<section id='ucas-section'>
					<FirstLessonSection
						heading="University Admissions: Decoding Britain's Most Complex Educational Process"
						paragraph="The British university admissions system represents one of the most intricate and high-stakes processes that families will ever navigate. UCAS applications are governed by unwritten rules, implicit expectations, and nuanced requirements that can confound even highly educated parents. The personal statement alone - a 4,000 character document that can determine a young person's entire future - operates according to criteria that are rarely made explicit. The stakes are particularly high for competitive courses and prestigious institutions, where the margin for error is virtually nonexistent. Understanding university selection strategies, reference requirements, and timeline management requires intimate knowledge of how admissions departments actually evaluate candidates. Elizabeth Burrows has helped countless students secure offers from Oxbridge and top Russell Group universities. Unlock her expertise in these two masterclasses, as delivered at London School of Economics."
						showConnectorArrow={true}
					/>
				</section>

				<VideoMasterclassGrid videos={ucasVideos} />

				<section id='british-culture-section'>
					<FirstLessonSection
						heading="Reading Between the Lines: Navigating Britain's Educational Culture"
						paragraph='Cultural literacy is the unspoken foundation of success in British education. Literary knowledge, shared references and historical context quietly shape classroom discussion, exam questions and peer dynamics. International families often find capable children disadvantaged by these invisible cues, affecting interviews, seminar participation and confidence. Equally decisive is social navigation: the centuries-old codes that govern schools and universities - from dining etiquette in boarding houses to admissions protocols and teacher expectations. Social fluency influences opportunities, relationships and perceived fit as much as grades. In these two masterclasses Elizabeth Burrows guide explores the cultural capital and institutional conventions students must decode, helping families bridge gaps academic ability alone cannot close.'
						showConnectorArrow={true}
					/>
				</section>

				<VideoMasterclassGrid videos={cultureVideos} />
			</PageLayout>
		</React.Fragment>
	);
}