import { PageLayout } from '@/components/layout/page-layout';
import { SimpleHero } from '@/components/layout/simple-hero';
import { TierDescriptions } from '@/components/sections/tier-descriptions';
import { TestimonialsVideoSection } from '@/components/sections/testimonials-video-section';
import { TutorsSection } from '@/components/tutors/tutors-section';
import { getTutorsHeroImage } from '@/lib/cms/cms-images';
import type { JSX } from 'react';
export const metadata = {
	title: 'Meet the Team | My Private Tutor Online',
	description:
		'Our tutors are handpicked by Elizabeth for their exceptional education pedigree, personalised approach and proven track record. Includes Oxbridge alumni and top UK school educators.',
	keywords:
		'expert tutors, Oxbridge alumni, private tutoring, GCSE tutors, A Level tutors, IB exam tutors',
};

// Tutor profiles section (complete structure with all profiles converted from object to array)
const TUTOR_PROFILES_SECTION = {
	title: 'Meet a Snapshot of Our Specialists ',
	subtitle: null,
	description: (
		<>
			Handpicked by Elizabeth for their academic excellence, teaching expertise and
			proven results, our tutors include{' '}
			<strong>
				Oxbridge alumni, Heads of Department at leading schools and official
				examiners.
			</strong>
			<br />
			<br />
			Each brings <strong>deep subject knowledge and extensive experience</strong>.
			Here’s a glimpse of the calibre and range within our team — covering every
			age and academic stage.
			<br />
			<br />
			If you don’t see what you’re looking for, we’ll connect you with the right
			expert once you complete our short enquiry form.
		</>
	) as JSX.Element,
	profiles: [
		{
			id: 'alma-maths-science',
			name: 'Alma',
			title: 'Maths & Science Specialist',
			tier: 'tier-one',
			badge: '🎓',
			education: {
				university: 'UCL',
				degree: 'First-Class MSci Astrophysics',
				additionalQualifications: [
					'PGCE (Secondary Maths), IoE',
					'Cognitive Psychology, Cambridge',
				],
				grade: 'First Class',
				graduationYear: '2020',
			},
			specializations: [
				'Mathematics',
				'Science',
				'Astrophysics',
				'International Baccalaureate (IB)',
			],
			experience: {
				yearsTeaching: 8,
				description:
					'10,000+ hours of online tutoring with classroom experience across independents, grammars, academies & state schools',
				totalStudents: 500,
				onlineHours: 10000,
			},
			achievements: [
				{
					title: 'Official Examiner',
					description: 'Examiner for GCSE & A Level Maths and Science',
					year: '2024',
				},
				{
					title: 'IB Expert',
					description: 'International Baccalaureate (IB) expert',
					year: '2023',
				},
				{
					title: 'Extensive Teaching Experience',
					description:
						'Classroom experience across independents, grammars, academies & state schools',
					year: '2025',
				},
			],
			image: {
				key: 'alma-maths-science',
				alt: 'Alma - Maths & Science Specialist',
				professionalHeadshot: true,
			},
			bio: 'Alma holds a First-Class MSci in Astrophysics from UCL, a PGCE in Secondary Maths from IoE, and studied Cognitive Psychology at Cambridge. As an official examiner for GCSE & A Level Maths and Science, she brings 10,000+ hours of online tutoring experience with classroom expertise across independents, grammars, academies & state schools.',
			testimonial: {
				quote:
					"She's making a huge difference to both my kids… they come away from lessons really buoyant.",
				author: 'Parent',
				context: 'Mathematics tutoring',
			},
			availability: {
				status: 'available',
				nextAvailable: '2025-01-15',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'First-Class MSci Astrophysics',
					institution: 'UCL',
					year: '2020',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'PGCE (Secondary Maths)',
					institution: 'Institute of Education',
					year: '2021',
					verified: true,
				},
				{
					type: 'certification',
					title: 'Enhanced DBS Check',
					institution: 'Disclosure and Barring Service',
					year: '2024',
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Scientific and methodical, building understanding through practical application',
				methodology: [
					'Problem-based learning',
					'Scientific methodology',
					'IB preparation',
				],
				strengthAreas: [
					'Advanced mathematics',
					'Science integration',
					'International curricula',
				],
			},
			subjectExpertise: [
				{
					subject: 'Mathematics',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 8,
				},
				{
					subject: 'Physics',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 8,
				},
				{
					subject: 'Chemistry',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 6,
				},
				{
					subject: 'IB Mathematics',
					level: 'IB',
					examBoards: ['IB'],
					yearsExperience: 5,
				},
			],
			featured: true,
			order: 1,
		},

		{
			id: 'john-history',
			name: 'John',
			title: 'History Specialist',
			tier: 'tier-one',
			badge: '📜',
			education: {
				university: 'University of Birmingham',
				degree: 'BA History (First Class)',
				additionalQualifications: ['PGCE, Secondary History'],
				grade: 'First Class',
				graduationYear: null,
			},
			specializations: [
				'History (GCSE & A Level)',
				'Exam preparation and essay technique',
				'Revision and study strategy',
			],
			experience: {
				yearsTeaching: '16+',
				description:
					'16+ years teaching experience\n11 years as Head of History\n4 years at Uppingham School (top independent school)\nCurrent Assistant Director of Studies with Senior Leadership responsibilities',
				totalStudents: null,
				eliteSchools: [
					<>
						11 years as <strong>Head of History</strong>
					</>,
					<>
						4 years at <strong>Uppingham School</strong>
					</>,
					<>
						Current <strong>Assistant Director of Studies</strong> with Senior
						Leadership responsibilities
					</>,
				] as JSX.Element[],
			},
			achievements: [
				{
					title: 'GCSE & A Level History Examiner',
					description: null,
					year: null,
				},
			],
			image: {
				key: 'john-history',
				alt: 'John - History Specialist',
				professionalHeadshot: true,
			},
			bio: (
				<>
					John is an accomplished History educator with over sixteen years of
					classroom experience, including more than a decade leading History
					departments. He currently serves as <strong>Head of History</strong> and{' '}
					<strong>Assistant Director of Studies</strong> at a high-performing state
					school, following four years at <strong>Uppingham School</strong>, one of
					the UK’s leading independent schools.
					<br />
					<br />A <strong>seasoned GCSE and A Level examiner</strong>, John combines
					his deep subject expertise with a sharp understanding of assessment
					criteria. His teaching is rigorous yet engaging, helping students develop
					both critical thinking and exam precision. He also designs and leads{' '}
					<strong>intensive revision courses</strong>, where students have achieved
					remarkable improvements — including{' '}
					<strong>one pupil who rose from a D to an A grade.</strong>
					<br />
					<br />
					With his blend of leadership experience, examiner insight, and proven
					results, John offers exceptional academic guidance for students aiming for
					top grades in History.
				</>
			) as JSX.Element,
			testimonial: {
				quote:
					'John’s sessions have really turned around History for me. His feedback is so clear and his enthusiasm makes even tough topics enjoyable.',
				author: 'A-Level History Student',
				context: 'null',
			},
			availability: {
				status: 'available',
				nextAvailable: null,
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA History (First Class)',
					institution: 'University of Birmingham',
					year: null,
					verified: true,
				},
				{
					type: 'qualification',
					title: 'PGCE, Secondary History',
					institution: null,
					year: null,
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Rigorous yet engaging, combining deep subject expertise with exam precision and leadership experience',
				methodology: ['Exam preparation', 'Essay technique', 'Revision strategy'],
				strengthAreas: [
					'History subject expertise',
					'Exam insight',
					'Leadership in teaching',
				],
			},
			subjectExpertise: [
				{
					subject: 'History',
					level: 'A-Level & GCSE',
					examBoards: [],
					yearsExperience: 16,
				},
			],
			featured: true,
			order: 2,
		},
		{
			id: 'emily-entrance-history',
			name: 'Emily',
			title: 'Entrance Exam Expert',
			tier: 'tier-one',
			badge: '🏛️',
			education: {
				university: 'Cambridge & Oxford',
				degree: 'BA History, Cambridge',
				additionalQualifications: ['PGCE, Oxford'],
				grade: 'First Class',
				graduationYear: '2018',
			},
			specializations: [
				'Entrance Exams (11+ and 13+)',
				'Elite School Preparation',
			],
			experience: {
				yearsTeaching: 8,
				description:
					'Former teacher at Latymer, Merchant Taylors, North London Collegiate with official 11+ examiner experience',
				totalStudents: 200,
				eliteSchools: [
					'Staff member at Latymer (top 10 London grammar)',
					'Staff member at Merchant Taylors (leading independent school)',
					'Staff member at North London Collegiate (top 3 girls’ school in the UK)',
				],
			},
			achievements: [
				{
					title: 'Official 11+ Examiner',
					description: 'Official 11+ examiner and assisted identifying top scholars',
					year: '2024',
				},
			],
			image: {
				key: 'emily-entrance-history',
				alt: 'Emily - Entrance Exam Expert, History & Politics',
				professionalHeadshot: true,
			},
			bio: 'Emily holds a BA History from Cambridge and PGCE from Oxford. A former teacher at Latymer, Merchant Taylors, and North London Collegiate, she serves as an official 11+ examiner. She has supported their admissions process and has insider knowledge of what the most oversubscribed schools are looking for in candidates. Her students consistently win places at top institutions including Eton, Harrow, and other prestigious institutions.',
			testimonial: {
				quote:
					"Offers from St Paul's, Westminster, Highgate and UCS. We can't believe it!",
				author: 'Parent',
				context: 'Independent school entrance success',
			},
			availability: {
				status: 'limited',
				nextAvailable: '2025-02-01',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA History',
					institution: 'University of Cambridge',
					year: '2018',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'PGCE',
					institution: 'University of Oxford',
					year: '2019',
					verified: true,
				},
				{
					type: 'certification',
					title: 'Enhanced DBS Check',
					institution: 'Disclosure and Barring Service',
					year: '2024',
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Elite preparation with strategic entrance exam technique and historical analysis',
				methodology: [
					'Entrance exam strategy',
					'Historical analysis',
					'Elite school preparation',
				],
				strengthAreas: [
					'11+ and 13+ preparation',
					'Elite school admissions',
					'Historical research',
				],
			},
			subjectExpertise: [
				{
					subject: 'History',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 7,
				},
				{
					subject: 'Politics',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 6,
				},
				{
					subject: '11+ Preparation',
					level: '11+',
					examBoards: ['CEM', 'GL Assessment'],
					yearsExperience: 5,
				},
				{
					subject: '13+ Preparation',
					level: '13+',
					examBoards: ['Common Entrance'],
					yearsExperience: 5,
				},
			],
			featured: true,
			order: 3,
		},
		{
			id: 'michael-primary',
			name: 'Michael',
			title: 'Primary & 11+/13+ Specialist',
			tier: 'tier-two',
			badge: '✏️',
			education: {
				university: 'Professional Teaching Qualification',
				degree: 'PGCE Primary',
				grade: 'Outstanding',
				graduationYear: '2002',
			},
			specializations: [
				'Primary Education',
				'11+ Preparation',
				'13+ Preparation',
				'English',
			],
			experience: {
				yearsTeaching: 22,
				description:
					'English Subject Lead with outstanding success guiding students into competitive grammars and independents',
				totalStudents: 800,
				grammarSuccess: ['Tiffin', 'Sutton', 'Wallington'],
			},
			achievements: [
				{
					title: 'English Subject Lead',
					description: 'English Subject Lead with 22+ years in the classroom',
					year: '2024',
				},
				{
					title: 'Grammar School Success',
					description:
						'Outstanding success guiding students into competitive grammars including Tiffin, Sutton, Wallington',
					year: '2025',
				},
			],
			image: {
				key: 'michael-primary',
				alt: 'Michael - Primary & 11+/13+ Specialist',
				professionalHeadshot: true,
			},
			bio: 'Michael holds a PGCE Primary qualification with 22+ years of classroom experience. As English Subject Lead, he has achieved outstanding success guiding students into competitive grammar schools and independent schools, including Tiffin, Sutton, and Wallington.',
			testimonial: {
				quote:
					'So patient, kind and encouraging. Charlie is so proud of his 11+ offers (as are we!).',
				author: 'Parent',
				context: '11+ preparation success',
			},
			availability: {
				status: 'available',
				nextAvailable: '2025-01-20',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'PGCE Primary',
					institution: 'Professional Teaching Authority',
					year: '2002',
					verified: true,
				},
				{
					type: 'certification',
					title: 'Enhanced DBS Check',
					institution: 'Disclosure and Barring Service',
					year: '2024',
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Patient and encouraging, building confidence through structured primary education',
				methodology: ['Primary pedagogy', '11+ preparation', 'Confidence building'],
				strengthAreas: [
					'Grammar school preparation',
					'Primary English',
					'Student encouragement',
				],
			},
			subjectExpertise: [
				{
					subject: 'Primary Education',
					level: 'Primary',
					examBoards: ['National Curriculum'],
					yearsExperience: 22,
				},
				{
					subject: '11+ Preparation',
					level: '11+',
					examBoards: ['CEM', 'GL Assessment'],
					yearsExperience: 15,
				},
				{
					subject: '13+ Preparation',
					level: '13+',
					examBoards: ['Common Entrance'],
					yearsExperience: 12,
				},
			],
			featured: false,
			order: 4,
		},
		{
			id: 'juliet-maths-sen',
			name: 'Juliet',
			title: 'Maths, SEN & International Teaching Expert',
			tier: 'tier-two',
			badge: '🧮',
			education: {
				university: 'Professional Teaching Qualification',
				degree: 'BSc Maths',
				additionalQualifications: ['MA Education', 'PGCE Secondary'],
				grade: 'Honours',
				graduationYear: '1995',
			},
			specializations: [
				'Mathematics',
				'Special Educational Needs (SEN)',
				'Business Studies',
				'Economics',
			],
			experience: {
				yearsTeaching: 30,
				description:
					'30+ years international teaching, including Headteacher roles, particularly excels with number-averse and SEN students',
				totalStudents: 1200,
				internationalExperience: true,
				headteacherExperience: true,
			},
			achievements: [
				{
					title: 'International Headteacher',
					description:
						'30+ years international teaching, including Headteacher roles',
					year: '2024',
				},
				{
					title: 'SEN Specialist',
					description: 'Particularly excels with number-averse and SEN students',
					year: '2025',
				},
				{
					title: 'Multi-Subject Expert',
					description: 'Teaches Maths, Business Studies, Economics',
					year: '2023',
				},
			],
			image: {
				key: 'juliet-maths-sen',
				alt: 'Juliet - Maths, SEN & International Teaching Expert',
				professionalHeadshot: true,
			},
			bio: 'Juliet holds a BSc Maths, MA Education, and PGCE Secondary qualification. With 30+ years of international teaching experience including Headteacher roles, she particularly excels with number-averse and SEN students, teaching Maths, Business Studies, and Economics.',
			testimonial: {
				quote:
					"If Kate keeps progressing like this, they'll move her up a set after Christmas – hooray!",
				author: 'Parent',
				context: 'Mathematics improvement with SEN support',
			},
			availability: {
				status: 'available',
				nextAvailable: '2025-01-25',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BSc Mathematics',
					institution: 'Professional Teaching Authority',
					year: '1995',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'MA Education',
					institution: 'Professional Teaching Authority',
					year: '1997',
					verified: true,
				},
				{
					type: 'certification',
					title: 'Enhanced DBS Check',
					institution: 'Disclosure and Barring Service',
					year: '2024',
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Patient and adaptive, specialising in building mathematical confidence for all learning styles',
				methodology: [
					'SEN support strategies',
					'Number confidence building',
					'International best practices',
				],
				strengthAreas: [
					'Special needs mathematics',
					'International curricula',
					'Leadership experience',
				],
			},
			subjectExpertise: [
				{
					subject: 'Mathematics',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 30,
				},
				{
					subject: 'Business Studies',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 20,
				},
				{
					subject: 'Economics',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 18,
				},
			],
			featured: false,
			order: 5,
		},
		{
			id: 'andreas-languages',
			name: 'Andreas',
			title: 'Modern Languages Specialist',
			tier: 'tier-two',
			badge: '🌍',
			education: {
				university: 'Professional Teaching Qualification',
				degree: 'BA Spanish & German',
				additionalQualifications: ['QTS in Spanish and German'],
				grade: 'Honours',
				graduationYear: '2010',
			},
			specializations: [
				'Spanish',
				'German',
				'Modern Languages',
				'A Level Language Courses',
			],
			experience: {
				yearsTeaching: 15,
				description:
					'Fluent in six languages, delivers entire A Level language courses where schools do not offer them',
				totalStudents: 300,
				languagesFluent: 6,
			},
			achievements: [
				{
					title: 'Multilingual Expert',
					description: 'Fluent in six languages',
					year: '2025',
				},
				{
					title: 'Complete Course Delivery',
					description:
						'Delivers entire A Level language courses where schools do not offer them',
					year: '2024',
				},
				{
					title: 'QTS Qualified',
					description: 'QTS in Spanish and German',
					year: '2010',
				},
			],
			image: {
				key: 'andreas-languages',
				alt: 'Andreas - Modern Languages Specialist',
				professionalHeadshot: true,
			},
			bio: 'Andreas holds a BA Spanish & German degree with QTS in Spanish and German. Fluent in six languages, he delivers entire A Level language courses where schools do not offer them, providing comprehensive language education to students.',
			testimonial: {
				quote:
					"I got a 9 in Portuguese and an 8 in Spanish – amazing after being told I'd struggle to get a 7!",
				author: 'Student',
				context: 'A Level language success',
			},
			availability: {
				status: 'available',
				nextAvailable: '2025-01-22',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA Spanish & German',
					institution: 'Professional Teaching Authority',
					year: '2010',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'QTS Spanish and German',
					institution: 'Professional Teaching Authority',
					year: '2010',
					verified: true,
				},
				{
					type: 'certification',
					title: 'Enhanced DBS Check',
					institution: 'Disclosure and Barring Service',
					year: '2024',
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Immersive and comprehensive, delivering complete language education programmes',
				methodology: [
					'Complete course delivery',
					'Multilingual approach',
					'Cultural integration',
				],
				strengthAreas: [
					'A Level language courses',
					'Multiple language fluency',
					'Independent course design',
				],
			},
			subjectExpertise: [
				{
					subject: 'Spanish',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 15,
				},
				{
					subject: 'German',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 15,
				},
				{
					subject: 'Portuguese',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 10,
				},
			],
			featured: false,
			order: 6,
		},
		{
			id: 'ophelia-classics',
			name: 'Ophelia',
			title: '11+, Entrance Exams & Classics Expert',
			tier: 'tier-three',
			badge: '🏛️',
			education: {
				university: 'University of Cambridge',
				degree: 'BA Classics, Cambridge',
				grade: 'First Class',
				graduationYear: '2019',
			},
			specializations: [
				'Classics',
				'11+ Preparation',
				'Entrance Exams',
				'Oxbridge Preparation',
			],
			experience: {
				yearsTeaching: 6,
				description:
					'11+ and entrance exam success across Harrow, Westminster and more, with Oxbridge personal statement & interview coaching',
				totalStudents: 150,
				eliteSchoolSuccess: ['Harrow', 'Westminster'],
			},
			achievements: [
				{
					title: 'Elite School Success',
					description:
						'11+ and entrance exam success across Harrow, Westminster and more',
					year: '2024',
				},
				{
					title: 'Rapid Improvement',
					description: 'Improved 11+ student scores from 20% to 80% in 2 months',
					year: '2024',
				},
				{
					title: 'Oxbridge Coaching',
					description: 'Oxbridge personal statement & interview coaching',
					year: '2023',
				},
			],
			image: {
				key: 'ophelia-classics',
				alt: 'Ophelia - 11+, Entrance Exams & Classics Expert',
				professionalHeadshot: true,
			},
			bio: 'Ophelia holds a BA Classics from Cambridge University. She specialises in 11+ and entrance exam preparation with success across elite schools including Harrow and Westminster. She provides Oxbridge personal statement and interview coaching, with proven ability to improve student scores dramatically.',
			testimonial: {
				quote:
					'Without Ophelia there is no way I would have won my place at Cambridge.',
				author: 'Student',
				context: 'Oxbridge admission success',
			},
			availability: {
				status: 'limited',
				nextAvailable: '2025-02-05',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA Classics',
					institution: 'University of Cambridge',
					year: '2019',
					verified: true,
				},
				{
					type: 'certification',
					title: 'Enhanced DBS Check',
					institution: 'Disclosure and Barring Service',
					year: '2024',
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Classical education with strategic entrance exam preparation and university coaching',
				methodology: [
					'Classical methodology',
					'Entrance exam strategy',
					'University interview preparation',
				],
				strengthAreas: [
					'Classics education',
					'Elite school preparation',
					'Oxbridge coaching',
				],
			},
			subjectExpertise: [
				{
					subject: 'Classics',
					level: 'A-Level',
					examBoards: ['AQA', 'OCR'],
					yearsExperience: 6,
				},
				{
					subject: '11+ Preparation',
					level: '11+',
					examBoards: ['CEM', 'GL Assessment'],
					yearsExperience: 5,
				},
				{
					subject: 'Latin',
					level: 'A-Level',
					examBoards: ['AQA', 'OCR'],
					yearsExperience: 6,
				},
			],
			featured: false,
			order: 7,
		},
		{
			id: 'annoushka-english',
			name: 'Annoushka',
			title: 'English & Entrance Exams Specialist',
			tier: 'tier-three',
			badge: '📘',
			education: {
				university: 'University of Oxford',
				degree: 'BA English, Oxford',
				additionalQualifications: ['CELTA Qualified'],
				grade: 'First Class',
				graduationYear: '2017',
			},
			specializations: [
				'English',
				'Entrance Exams',
				'Independent School Preparation',
				'CELTA Teaching',
			],
			experience: {
				yearsTeaching: 8,
				description:
					'Teaches online and in North London area with classroom experience in UK and international private schools',
				totalStudents: 250,
				teachingAreas: ['Online', 'North London'],
				internationalExperience: true,
			},
			achievements: [
				{
					title: 'Elite School Placements',
					description:
						'Students regularly win places at Westminster, Cheltenham Ladies, Benenden',
					year: '2025',
				},
				{
					title: 'International Experience',
					description:
						'Classroom experience in UK and international private schools',
					year: '2024',
				},
				{
					title: 'CELTA Qualified',
					description: 'CELTA Qualified for English language teaching',
					year: '2018',
				},
			],
			image: {
				key: 'annoushka-english',
				alt: 'Annoushka - English & Entrance Exams Specialist',
				professionalHeadshot: true,
			},
			bio: 'Annoushka holds a BA English from Oxford and is CELTA qualified. Teaching both online and in the North London area, she has classroom experience in UK and international private schools. Her students regularly win places at prestigious institutions including Westminster, Cheltenham Ladies, and Benenden.',
			testimonial: {
				quote:
					"Seb comes out of lessons beaming – I caught him teaching his friends Annoushka's times tables tricks!",
				author: 'Parent',
				context: 'Engaging teaching methods',
			},
			availability: {
				status: 'available',
				nextAvailable: '2025-01-28',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA English',
					institution: 'University of Oxford',
					year: '2017',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'CELTA',
					institution: 'Cambridge Assessment English',
					year: '2018',
					verified: true,
				},
				{
					type: 'certification',
					title: 'Enhanced DBS Check',
					institution: 'Disclosure and Barring Service',
					year: '2024',
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Engaging and interactive, creating enthusiasm for learning with effective techniques',
				methodology: [
					'Interactive learning',
					'Memorable techniques',
					'Student engagement',
				],
				strengthAreas: [
					'Independent school preparation',
					'English literature',
					'Student motivation',
				],
			},
			subjectExpertise: [
				{
					subject: 'English Literature',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 8,
				},
				{
					subject: 'English Language',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel'],
					yearsExperience: 8,
				},
			],
			featured: false,
			order: 8,
		},
		{
			id: 'alex-admissions',
			name: 'Alex',
			title: 'University Admissions & English Expert',
			tier: 'tier-three',
			badge: '⚖️',
			education: {
				university: 'Cambridge & Harvard',
				degree: 'BA Law, Cambridge',
				additionalQualifications: ['MA, Harvard (Bioethics & AI Liability)'],
				grade: 'First Class',
				graduationYear: '2020',
			},
			specializations: [
				'University Admissions',
				'Law',
				'English',
				'International Admissions',
			],
			experience: {
				yearsTeaching: 5,
				description:
					'British & US admissions expert with Oxbridge & Ivy League success, 10,000+ tutoring hours',
				totalStudents: 200,
				tutoringHours: 10000,
				admissionsSuccess: ['Oxbridge', 'Ivy League'],
			},
			achievements: [
				{
					title: 'Top 1% SAT Scorer',
					description: 'Top 1% SAT scorer with extensive testing expertise',
					year: '2023',
				},
				{
					title: 'Dual Admissions Expert',
					description:
						'British & US admissions expert – Oxbridge & Ivy League success',
					year: '2024',
				},
				{
					title: 'Multi-Qualification Specialist',
					description: 'Specialist in SAT, LNAT, IB, A-level, IGCSE, AP, HSC',
					year: '2025',
				},
			],
			image: {
				key: 'alex-admissions',
				alt: 'Alex - University Admissions & English Expert',
				professionalHeadshot: true,
			},
			bio: 'Alex holds a BA Law from Cambridge and MA from Harvard in Bioethics & AI Liability. As a British & US admissions expert with Oxbridge & Ivy League success, Alex is a top 1% SAT scorer with 10,000+ tutoring hours and specialises in multiple qualification systems including SAT, LNAT, IB, A-level, IGCSE, AP, and HSC.',
			testimonial: {
				quote:
					'I got 28 in my LNAT and a UCL offer – please tell him thank you so much!',
				author: 'Student',
				context: 'LNAT and university admission success',
			},
			availability: {
				status: 'limited',
				nextAvailable: '2025-02-10',
			},
			credentials: [
				{
					type: 'qualification',
					title: 'BA Law',
					institution: 'University of Cambridge',
					year: '2020',
					verified: true,
				},
				{
					type: 'qualification',
					title: 'MA (Bioethics & AI Liability)',
					institution: 'Harvard University',
					year: '2022',
					verified: true,
				},
				{
					type: 'certification',
					title: 'Enhanced DBS Check',
					institution: 'Disclosure and Barring Service',
					year: '2024',
					verified: true,
				},
			],
			teachingStyle: {
				approach:
					'Strategic and comprehensive, combining academic excellence with admissions expertise',
				methodology: [
					'University preparation',
					'Standardised test strategy',
					'International admissions',
				],
				strengthAreas: [
					'University admissions',
					'Standardised testing',
					'International qualifications',
				],
			},
			subjectExpertise: [
				{
					subject: 'English Literature',
					level: 'A-Level',
					examBoards: ['AQA', 'Edexcel', 'OCR'],
					yearsExperience: 5,
				},
				{
					subject: 'Law',
					level: 'University',
					examBoards: ['LNAT'],
					yearsExperience: 5,
				},
				{
					subject: 'SAT Preparation',
					level: 'International',
					examBoards: ['College Board'],
					yearsExperience: 4,
				},
			],
			featured: false,
			order: 9,
		},
	],
	showAllButton: {
		text: 'Meet Some of our Team',
		href: '/meet-our-tutors',
	},
	backgroundStyle: 'light',
} as const;

// {
// 	id: 'amy-english',
// 	name: 'Amy',
// 	title: 'English Language & Literature Specialist',
// 	tier: 'tier-one',
// 	badge: '📚',
// 	education: {
// 		university: 'Professional Teaching Qualification',
// 		degree: 'LLB (Hons) Law',
// 		additionalQualifications: ['PGCE Secondary English'],
// 		grade: 'Honours',
// 		graduationYear: '2015',
// 	},
// 	specializations: [
// 		'English Language',
// 		'English Literature',
// 		'Law',
// 		'Academic Writing',
// 	],
// 	experience: {
// 		yearsTeaching: 10,
// 		description:
// 			'Head of English and Media Studies with proven record of rapid grade improvement',
// 		totalStudents: 400,
// 	},
// 	achievements: [
// 		{
// 			title: 'Official Examiner',
// 			description: 'Examiner for GCSE & A Level English',
// 			year: '2024',
// 		},
// 		{
// 			title: 'Head of English',
// 			description: 'Head of English and Media Studies',
// 			year: '2023',
// 		},
// 		{
// 			title: 'Rapid Improvement',
// 			description: 'Proven record of rapid grade improvement',
// 			year: '2024',
// 		},
// 	],
// 	image: {
// 		key: 'amy-english',
// 		alt: 'Amy - English Language & Literature Specialist',
// 		professionalHeadshot: true,
// 	},
// 	bio: 'Amy holds an LLB (Hons) Law degree and PGCE Secondary English qualification. As Head of English and Media Studies and official examiner for GCSE & A Level English, she has established a proven record of rapid grade improvement with her students.',
// 	testimonial: {
// 		quote:
// 			'Jake has jumped from a U to two marks off a B – incredible progress in just a month.',
// 		author: 'Parent',
// 		context: 'English grade improvement',
// 	},
// 	availability: {
// 		status: 'available',
// 		nextAvailable: '2025-01-18',
// 	},
// 	credentials: [
// 		{
// 			type: 'qualification',
// 			title: 'LLB (Hons) Law',
// 			institution: 'Professional Teaching Authority',
// 			year: '2015',
// 			verified: true,
// 		},
// 		{
// 			type: 'qualification',
// 			title: 'PGCE Secondary English',
// 			institution: 'Professional Teaching Authority',
// 			year: '2016',
// 			verified: true,
// 		},
// 		{
// 			type: 'certification',
// 			title: 'Enhanced DBS Check',
// 			institution: 'Disclosure and Barring Service',
// 			year: '2024',
// 			verified: true,
// 		},
// 	],
// 	teachingStyle: {
// 		approach:
// 			'Analytical and supportive, focusing on rapid improvement through targeted techniques',
// 		methodology: [
// 			'Analytical writing',
// 			'Literature analysis',
// 			'Examination technique',
// 		],
// 		strengthAreas: [
// 			'Grade improvement',
// 			'Literature analysis',
// 			'Academic writing',
// 		],
// 	},
// 	subjectExpertise: [
// 		{
// 			subject: 'English Literature',
// 			level: 'A-Level',
// 			examBoards: ['AQA', 'Edexcel', 'OCR'],
// 			yearsExperience: 10,
// 		},
// 		{
// 			subject: 'English Language',
// 			level: 'A-Level',
// 			examBoards: ['AQA', 'Edexcel', 'OCR'],
// 			yearsExperience: 10,
// 		},
// 	],
// 	featured: true,
// 	order: 2,
// },
export default function MeetOurTutorsPage() {
	const tutorProfilesSection = TUTOR_PROFILES_SECTION;

	const tutorsHeroImage = getTutorsHeroImage();
	return (
		<>
			<PageLayout
				showHeader={true}
				showFooter={true}
				containerSize='full'
				verticalSpacing='default'>
				<SimpleHero
					backgroundImage={tutorsHeroImage.src}
					h1="Meet Our"
					h1AccentText="Tutors"
					h2="Excellence Through Expertise"
					decorativeStyle="lines"
				/>
				<TutorsSection
					data={tutorProfilesSection}
					showFeaturedOnly={false}
					showViewAllButton={false}
				/>

				<TierDescriptions
					title='Understanding Our Tutor Tiers'
					subtitle="Clear transparency about tutor qualifications and pricing to help you choose the right level of expertise for your child's needs."
					showExpandable={false}
				/>

				<TestimonialsVideoSection
					backgroundColor='bg-neutral-50'
					title='Hear From Our Families'
					description='Watch real testimonials from parents and students who have achieved exceptional results with My Private Tutor Online.'
					maxVideos={2}
				/>
			</PageLayout>
		</>
	);
}
