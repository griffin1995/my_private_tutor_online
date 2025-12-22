'use client';

import React from 'react';
import {
	OrganizationJsonLd,
	WebPageJsonLd,
	LocalBusinessJsonLd,
	CourseJsonLd,
	SocialProfileJsonLd,
} from 'next-seo';
const OrganizationSchema: React.FC = () => {
	return (
		<OrganizationJsonLd
			type='EducationalOrganization'
			id='https://myprivatetutoronline.co.uk/#organization'
			logo='https://myprivatetutoronline.co.uk/images/logo/logo-full.png'
			legalName='My Private Tutor Online Ltd'
			name='My Private Tutor Online'
			description='Premium tutoring service with royal endorsements, serving elite families across the UK since 2010. Featured in Tatler Address Book 2025.'
			address={{
				streetAddress: 'Mayfair Office',
				addressLocality: 'London',
				addressRegion: 'Greater London',
				postalCode: 'W1K',
				addressCountry: 'GB',
			}}
			contactPoint={[
				{
					telephone: '+44-20-7123-4567',
					contactType: 'customer service',
					email: 'enquiries@myprivatetutoronline.co.uk',
					areaServed: 'GB',
					availableLanguage: ['English'],
					hoursAvailable: [
						{
							dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
							opens: '09:00',
							closes: '18:00',
						},
						{
							dayOfWeek: ['Saturday'],
							opens: '10:00',
							closes: '16:00',
						},
					],
				},
				{
					telephone: '+44-7700-900123',
					contactType: 'emergency contact',
					contactOption: 'HearingImpairedSupported',
					areaServed: 'GB',
					availableLanguage: 'English',
				},
			]}
			sameAs={[
				'https://www.linkedin.com/company/my-private-tutor-online',
				'https://twitter.com/myprivatetutoronline',
				'https://www.facebook.com/myprivatetutoronline',
			]}
			url='https://myprivatetutoronline.co.uk/'
			foundingDate='2010-01-01'
			numberOfEmployees={{
				minValue: 50,
				maxValue: 100,
			}}
			priceRange='£££'
			currenciesAccepted={['GBP']}
			paymentAccepted={['Credit Card', 'Debit Card', 'Bank Transfer', 'PayPal']}
			keywords='premium tutoring, royal endorsed education, Oxbridge preparation, elite tutoring services, private tuition UK'
		/>
	);
};
const LocalBusinessSchema: React.FC = () => {
	return (
		<LocalBusinessJsonLd
			type='EducationalOrganization'
			id='https://myprivatetutoronline.co.uk/#localbusiness'
			name='My Private Tutor Online'
			description='Royal endorsed premium tutoring service in London, specialising in Oxbridge preparation and elite education since 2010.'
			url='https://myprivatetutoronline.co.uk/'
			telephone='+44-20-7123-4567'
			address={{
				streetAddress: 'Mayfair Office',
				addressLocality: 'London',
				addressRegion: 'Greater London',
				postalCode: 'W1K',
				addressCountry: 'GB',
			}}
			geo={{
				latitude: '51.5074',
				longitude: '-0.1278',
			}}
			images={[
				'https://myprivatetutoronline.co.uk/images/hero/hero-main.webp',
				'https://myprivatetutoronline.co.uk/images/about/royal-endorsement.webp',
				'https://myprivatetutoronline.co.uk/images/testimonials/success-stories.webp',
			]}
			openingHours={[
				{
					dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
					opens: '09:00',
					closes: '18:00',
				},
				{
					dayOfWeek: 'Saturday',
					opens: '10:00',
					closes: '16:00',
				},
			]}
			priceRange='£££'
			servesCuisine='Education'
			aggregateRating={{
				ratingValue: '4.9',
				ratingCount: '247',
			}}
			review={[
				{
					reviewRating: {
						ratingValue: '5',
					},
					author: {
						type: 'Person',
						name: 'Lady Catherine M.',
					},
					reviewBody:
						'Exceptional tutoring service. Our daughter achieved A* grades across all subjects and secured her place at Cambridge. The royal endorsement truly reflects the quality of education provided.',
				},
			]}
		/>
	);
};
interface CourseSchemaProps {
	courseName: string;
	courseDescription: string;
	subject: string;
	level: string;
	duration?: string;
}

const CourseSchema: React.FC<CourseSchemaProps> = ({
	courseName,
	courseDescription,
	subject,
	level,
	duration = 'PT12W',
}) => {
	return (
		<CourseJsonLd
			courseName={courseName}
			description={courseDescription}
			provider={{
				name: 'My Private Tutor Online',
				url: 'https://myprivatetutoronline.co.uk',
			}}
			teaches={[subject]}
			timeRequired={duration}
			courseMode='Online'
			educationalLevel={level}
			instructor={{
				name: 'Expert Oxbridge Tutors',
				description:
					'PhD-qualified tutors from Oxford and Cambridge universities with proven track records in elite education.',
			}}
			offers={{
				price: '150.00',
				priceCurrency: 'GBP',
				availability: 'InStock',
				url: `https://myprivatetutoronline.co.uk/subject-tuition/${subject.toLowerCase()}`,
				validFrom: new Date().toISOString(),
			}}
			hasCourseInstance={{
				courseMode: 'Online',
				courseWorkload: 'PT3H',
				instructor: {
					name: 'Oxbridge Specialist Tutors',
				},
			}}
		/>
	);
};
interface WebPageSchemaProps {
	pageTitle: string;
	pageDescription: string;
	pageUrl: string;
	lastReviewed?: string;
	pageType?: 'HomePage' | 'AboutPage' | 'ContactPage' | 'ServicePage';
}

const WebPageSchema: React.FC<WebPageSchemaProps> = ({
	pageTitle,
	pageDescription,
	pageUrl,
	lastReviewed = new Date().toISOString(),
	pageType = 'WebPage',
}) => {
	return (
		<WebPageJsonLd
			description={pageDescription}
			id={`${pageUrl}#webpage`}
			lastReviewed={lastReviewed}
			reviewedBy={{
				type: 'Organization',
				name: 'My Private Tutor Online Editorial Team',
			}}
			mainEntity={{
				'@type': pageType,
				name: pageTitle,
				description: pageDescription,
				url: pageUrl,
				inLanguage: 'en-GB',
				isPartOf: {
					'@type': 'WebSite',
					name: 'My Private Tutor Online',
					url: 'https://myprivatetutoronline.co.uk',
				},
			}}
			breadcrumb={{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{
						'@type': 'ListItem',
						position: 1,
						name: 'Home',
						item: 'https://myprivatetutoronline.co.uk',
					},
					{
						'@type': 'ListItem',
						position: 2,
						name: pageTitle,
						item: pageUrl,
					},
				],
			}}
		/>
	);
};
const SocialProfileSchema: React.FC = () => {
	return (
		<SocialProfileJsonLd
			type='Organization'
			name='My Private Tutor Online'
			url='https://myprivatetutoronline.co.uk'
			sameAs={[
				'https://www.linkedin.com/company/my-private-tutor-online',
				'https://twitter.com/myprivatetutoronline',
				'https://www.facebook.com/myprivatetutoronline',
				'https://www.instagram.com/myprivatetutoronline',
				'https://www.youtube.com/c/myprivatetutoronline',
			]}
		/>
	);
};
interface SchemaMarkupProps {
	pageTitle: string;
	pageDescription: string;
	pageUrl: string;
	pageType?: 'HomePage' | 'AboutPage' | 'ContactPage' | 'ServicePage';
	courseData?: {
		courseName: string;
		courseDescription: string;
		subject: string;
		level: string;
		duration?: string;
	};
	includeOrganization?: boolean;
	includeLocalBusiness?: boolean;
	includeSocialProfile?: boolean;
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({
	pageTitle,
	pageDescription,
	pageUrl,
	pageType = 'WebPage',
	courseData,
	includeOrganization = true,
	includeLocalBusiness = false,
	includeSocialProfile = false,
}) => {
	return (
		<>
			<WebPageSchema
				pageTitle={pageTitle}
				pageDescription={pageDescription}
				pageUrl={pageUrl}
				pageType={pageType}
			/>

			{includeOrganization && <OrganizationSchema />}

			{includeLocalBusiness && <LocalBusinessSchema />}

			{courseData && (
				<CourseSchema
					courseName={courseData.courseName}
					courseDescription={courseData.courseDescription}
					subject={courseData.subject}
					level={courseData.level}
					duration={courseData.duration}
				/>
			)}

			{includeSocialProfile && <SocialProfileSchema />}
		</>
	);
};
