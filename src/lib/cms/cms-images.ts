import { cache } from 'react';
import {
	getVideoMasterclass,
	videoMasterclasses,
	type VideoMasterclass,
} from '../../../COMPREHENSIVE_VIDEO_CMS';
export type { VideoMasterclass };
interface ImageAsset {
	readonly src: string;
	readonly alt: string;
	readonly width?: number;
	readonly height?: number;
	readonly title?: string;
	readonly loading?: 'lazy' | 'eager';
	readonly priority?: boolean;
	readonly sizes?: string;
	readonly quality?: number;
}
interface VideoAsset {
	readonly src: string;
	readonly poster?: string;
	readonly alt: string;
	readonly title: string;
	readonly description: string;
	readonly width?: number;
	readonly height?: number;
	readonly autoplay?: boolean;
	readonly muted?: boolean;
	readonly loop?: boolean;
}
interface VideoPageSection extends VideoAsset {
	readonly id: string;
	readonly videoUrl: string;
	readonly thumbnailUrl: string;
	readonly animationStyle:
		| 'from-center'
		| 'from-left'
		| 'from-right'
		| 'top-in-bottom-out'
		| 'fade';
	readonly duration: number;
	readonly isFree: boolean;
	readonly price?: string;
	readonly paymentUrl?: string;
	readonly featured: boolean;
	readonly category: 'free' | 'paid';
	readonly masterclassAuthor: string;
	readonly masterclassRole: string;
	readonly backgroundImage: string;
	readonly layout: 'text-left' | 'text-right';
	readonly badge: {
		readonly text: string;
		readonly type: 'free' | 'premium';
	};
	readonly content: {
		readonly paragraphs: readonly string[];
		readonly bulletPoints: readonly string[];
		readonly subtitle?: string;
		readonly disclaimer?: string;
	};
}
interface BackgroundVideoAsset {
	readonly src: string;
	readonly fallback: string;
	readonly poster: string;
	readonly alt: string;
	readonly title: string;
	readonly description: string;
}
interface DocumentAsset {
	readonly src: string;
	readonly alt: string;
	readonly title: string;
	readonly description: string;
	readonly type?: 'pdf' | 'image';
	readonly downloadable?: boolean;
}
interface ResponsiveImageSizes {
	readonly mobile: number;
	readonly tablet: number;
	readonly desktop: number;
	readonly xl: number;
}
interface InstitutionLogo extends ImageAsset {
	readonly institution: string;
	readonly category: 'university' | 'school' | 'college';
	readonly prestige: 'high' | 'medium' | 'standard';
	readonly level: 'primary-school' | 'secondary-school' | 'university';
	readonly location?: string;
}
interface TeamMemberImage extends ImageAsset {
	readonly name: string;
	readonly role: string;
	readonly department?: string;
}
interface MediaLogo extends ImageAsset {
	readonly publication: string;
	readonly recognition: string;
	readonly year?: number;
	readonly verified: boolean;
}
const LOGOS = {
	main: {
		src: '/images/logos/logo-with-name.png',
		alt: 'My Private Tutor Online - Premium Educational Services',
		width: 200,
		height: 80,
		title: 'My Private Tutor Online',
		loading: 'eager' as const,
		priority: true,
	},
	mainWhite: {
		src: '/images/logos/logo-with-name-white.png',
		alt: 'My Private Tutor Online - Premium Educational Services',
		width: 200,
		height: 80,
		title: 'My Private Tutor Online',
		loading: 'eager' as const,
		priority: true,
	},
	footer: {
		src: '/images/logos/logo-with-name.png',
		alt: 'My Private Tutor Online - Premium Educational Services',
		width: 180,
		height: 70,
		title: 'My Private Tutor Online - Expert Private Tutoring',
		loading: 'lazy' as const,
	},
	icon: {
		src: '/images/logos/logo-with-name.png',
		alt: 'My Private Tutor Online Icon',
		width: 60,
		height: 60,
		title: 'My Private Tutor Online',
		loading: 'eager' as const,
		priority: true,
	},
} as const;
const INSTITUTION_LOGOS = {
	oxford: {
		src: '/images/logos/oxford-university-logo.jpeg',
		alt: 'University of Oxford logo',
		width: 120,
		height: 80,
		title: 'University of Oxford',
		loading: 'lazy' as const,
		institution: 'University of Oxford',
		category: 'university' as const,
		prestige: 'high' as const,
		level: 'university' as const,
		location: 'Oxford, England',
	},
	cambridge: {
		src: '/images/logos/cambridge-university-logo.png',
		alt: 'University of Cambridge logo',
		width: 120,
		height: 80,
		title: 'University of Cambridge',
		loading: 'lazy' as const,
		institution: 'University of Cambridge',
		category: 'university' as const,
		prestige: 'high' as const,
		level: 'university' as const,
		location: 'Cambridge, England',
	},
	durham: {
		src: '/images/logos/durham-university-logo.png',
		alt: 'Durham University logo',
		width: 120,
		height: 80,
		title: 'Durham University',
		loading: 'lazy' as const,
		institution: 'Durham University',
		category: 'university' as const,
		prestige: 'high' as const,
		level: 'university' as const,
		location: 'Durham, England',
	},
	edinburgh: {
		src: '/images/logos/edinburgh-university-logo.png',
		alt: 'University of Edinburgh logo',
		width: 120,
		height: 80,
		title: 'University of Edinburgh',
		loading: 'lazy' as const,
		institution: 'University of Edinburgh',
		category: 'university' as const,
		prestige: 'high' as const,
		level: 'university' as const,
		location: 'Edinburgh, Scotland',
	},
	stAndrews: {
		src: '/images/logos/st-andrews-university-logo.png',
		alt: 'University of St Andrews logo',
		width: 120,
		height: 80,
		title: 'University of St Andrews',
		loading: 'lazy' as const,
		institution: 'University of St Andrews',
		category: 'university' as const,
		prestige: 'high' as const,
		level: 'university' as const,
		location: 'St Andrews, Scotland',
	},
	warwick: {
		src: '/images/logos/warwick-university-logo.gif',
		alt: 'University of Warwick logo',
		width: 120,
		height: 80,
		title: 'University of Warwick',
		loading: 'lazy' as const,
		institution: 'University of Warwick',
		category: 'university' as const,
		prestige: 'high' as const,
		level: 'university' as const,
		location: 'Coventry, England',
	},
	lse: {
		src: '/images/logos/lse-logo.png',
		alt: 'London School of Economics logo',
		width: 120,
		height: 80,
		title: 'London School of Economics',
		loading: 'lazy' as const,
		institution: 'London School of Economics',
		category: 'university' as const,
		prestige: 'high' as const,
		level: 'university' as const,
		location: 'London, England',
	},
	kingsCollege: {
		src: '/images/logos/kings-college-logo.jpeg',
		alt: "King's College London logo",
		width: 120,
		height: 80,
		title: "King's College London",
		loading: 'lazy' as const,
		institution: "King's College London",
		category: 'university' as const,
		prestige: 'high' as const,
		level: 'university' as const,
		location: 'London, England',
	},
	eton: {
		src: '/images/logos/eton-college-logo.webp',
		alt: 'Eton College logo',
		width: 100,
		height: 80,
		title: 'Eton College',
		loading: 'lazy' as const,
		institution: 'Eton College',
		category: 'school' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Windsor, Berkshire, England',
	},
	etonAlt: {
		src: '/images/logos/eton-college-logo-alt.png',
		alt: 'Eton College alternative logo',
		width: 100,
		height: 80,
		title: 'Eton College',
		loading: 'lazy' as const,
		institution: 'Eton College',
		category: 'school' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Windsor, Berkshire, England',
	},
	harrow: {
		src: '/images/logos/harrow-school-logo.avif',
		alt: 'Harrow School logo',
		width: 100,
		height: 80,
		title: 'Harrow School',
		loading: 'lazy' as const,
		institution: 'Harrow School',
		category: 'school' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Harrow on the Hill, London, England',
	},
	westminster: {
		src: '/images/logos/westminster-school-logo.png',
		alt: 'Westminster School logo',
		width: 100,
		height: 80,
		title: 'Westminster School',
		loading: 'lazy' as const,
		institution: 'Westminster School',
		category: 'school' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Westminster, London, England',
	},
	stPauls: {
		src: '/images/logos/st-pauls-school-logo.jpg',
		alt: "St Paul's School logo",
		width: 100,
		height: 80,
		title: "St Paul's School",
		loading: 'lazy' as const,
		institution: "St Paul's School",
		category: 'school' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Barnes, London, England',
	},
	brightonCollege: {
		src: '/images/logos/brighton-college-logo.png',
		alt: 'Brighton College logo',
		width: 100,
		height: 80,
		title: 'Brighton College',
		loading: 'lazy' as const,
		institution: 'Brighton College',
		category: 'college' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Brighton, East Sussex, England',
	},
	highgate: {
		src: '/images/logos/highgate-school-logo.png',
		alt: 'Highgate School logo',
		width: 100,
		height: 80,
		title: 'Highgate School',
		loading: 'lazy' as const,
		institution: 'Highgate School',
		category: 'school' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Highgate, North London, England',
	},
	henriettaBarnett: {
		src: '/images/logos/school-henrietta-barnett.png',
		alt: 'Henrietta Barnett School logo',
		width: 100,
		height: 80,
		title: 'Henrietta Barnett School',
		loading: 'lazy' as const,
		institution: 'Henrietta Barnett School',
		category: 'school' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Hampstead Garden Suburb, London, England',
	},
	latymerSchool: {
		src: '/images/logos/school-latymer-shield.svg',
		alt: 'Latymer School shield logo',
		width: 100,
		height: 80,
		title: 'Latymer School',
		loading: 'lazy' as const,
		institution: 'Latymer School',
		category: 'school' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Edmonton, North London, England',
	},
	queenElizabeths: {
		src: '/images/logos/school-queen-elizabeths.png',
		alt: "Queen Elizabeth's School shield logo",
		width: 100,
		height: 80,
		title: "Queen Elizabeth's School",
		loading: 'lazy' as const,
		institution: "Queen Elizabeth's School",
		category: 'school' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Barnet, Hertfordshire, England',
	},
	tiffinSchool: {
		src: '/images/logos/school-tiffins-shield.jpeg',
		alt: 'Tiffin School logo',
		width: 100,
		height: 80,
		title: 'Tiffin School',
		loading: 'lazy' as const,
		institution: 'Tiffin School',
		category: 'school' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Kingston upon Thames, Surrey, England',
	},
	leRosey: {
		src: '/images/logos/lerosey-school-logo.avif',
		alt: 'Le Rosey School logo',
		width: 100,
		height: 80,
		title: 'Le Rosey School',
		loading: 'lazy' as const,
		institution: 'Institut Le Rosey',
		category: 'school' as const,
		prestige: 'high' as const,
		level: 'secondary-school' as const,
		location: 'Rolle, Switzerland',
	},
} as const;
const HERO_IMAGES = {
	childWithLaptop: {
		src: '/images/hero/landing-page.avif',
		alt: 'Child studying with book and laptop - premium online tutoring',
		width: 600,
		height: 400,
		title: 'Premium Online Tutoring',
		loading: 'eager' as const,
		priority: true,
	},
	onlineTutoringSession: {
		src: '/images/students/student-on-laptop-teacher-on-screen.jpg',
		alt: 'Student engaged in high-quality online tutoring session with expert tutor - demonstrating our proven process',
		width: 800,
		height: 600,
		title: 'Online Tutoring Excellence - How It Works',
		loading: 'eager' as const,
		priority: true,
	},
	introVideo: {
		src: '/videos/elizabeth-introduction-sound.mp4',
		alt: 'Elizabeth Burrows introduces My Private Tutor Online with audio narration',
		width: 800,
		height: 450,
		title: 'Introduction to My Private Tutor Online - With Sound',
		loading: 'eager' as const,
		priority: true,
	},
	aboutFounderStory: {
		src: '/images/about/about-founder-story.jpg',
		alt: 'Elizabeth Burrows founder story hero background - premium tutoring service heritage',
		width: 1920,
		height: 1080,
		title: 'About Our Founder - Heritage and Excellence',
		loading: 'eager' as const,
		priority: true,
	},
	goingAgainstGrainPhilosophy: {
		src: '/images/about/cambridge-university.jpg',
		alt: 'Cambridge University - prestigious academic institution representing educational excellence and Going Against the Grain philosophy',
		width: 1920,
		height: 1080,
		title: 'Going Against the Grain - Cambridge University',
		loading: 'eager' as const,
		priority: true,
	},
} as const;
export const TEAM_IMAGES = {
	founder: {
		src: '/images/team/founder-elizabeth-burrows-professional.jpg',
		alt: 'Elizabeth Burrows - Founder of My Private Tutor Online, Professional Portrait',
		width: 500,
		height: 600,
		title: 'Elizabeth Burrows - Founder Professional Portrait',
		loading: 'lazy' as const,
	},
	founderPortrait: {
		src: '/images/team/founder-elizabeth-burrows-portrait.jpg',
		alt: 'Elizabeth Burrows - My Private Tutor Online Founder Portrait Photo',
		width: 400,
		height: 500,
		title: 'Elizabeth Burrows - Founder Portrait',
		loading: 'lazy' as const,
	},
	founderAlternative: {
		src: '/images/about/about-founder-story.jpg',
		alt: 'Elizabeth Burrows - MPTO 2025 Alternative Founder Photo',
		width: 400,
		height: 500,
		title: 'Elizabeth Burrows - Alternative Photo',
		loading: 'lazy' as const,
	},
	founderSecondary: {
		src: '/images/team/founder-elizabeth-burrows-secondary.jpg',
		alt: 'Elizabeth Burrows - Founder Secondary Professional Photo',
		width: 400,
		height: 500,
		title: 'Elizabeth Burrows - Secondary Professional',
		loading: 'lazy' as const,
	},
	founderSpare: {
		src: '/images/team/elizabeth-burrows-founder-spare.jpg',
		alt: 'Elizabeth Burrows - MPTO 2025 Additional Founder Photo',
		width: 400,
		height: 500,
		title: 'Elizabeth Burrows - Additional Photo',
		loading: 'lazy' as const,
	},
	founderSignature: {
		src: '/images/team/elizabeth-burrows-signature.png',
		alt: 'Elizabeth Burrows Digital Signature - MPTO',
		width: 200,
		height: 80,
		title: 'Elizabeth Burrows Signature',
		loading: 'lazy' as const,
	},
	katherine: {
		src: '/images/team/katherine-mother-sebastian-headshot.avif',
		alt: 'Katherine Mother Sebastian - Senior Tutor',
		width: 300,
		height: 300,
		title: 'Katherine Mother Sebastian - Senior Tutor',
		loading: 'lazy' as const,
	},
} as const;
export const TESTIMONIAL_IMAGES = {
	schoolGuide: {
		src: '/images/testimonials/schoolguide-testimonial.avif',
		alt: 'School Guide testimonial for My Private Tutor Online',
		width: 400,
		height: 300,
		title: 'School Guide Review',
		loading: 'lazy' as const,
	},
} as const;
export const MEDIA_IMAGES = {
	tatler: {
		src: '/images/media/tatler-logo.png',
		alt: 'Tatler Magazine - Featured in Address Book 2025',
		width: 150,
		height: 60,
		title: 'Featured in Tatler Address Book 2025',
		loading: 'lazy' as const,
	},
	tatlerAlt: {
		src: '/images/media/tatler-logo-alt.png',
		alt: 'Tatler Magazine Alternative Logo',
		width: 150,
		height: 60,
		title: 'Tatler Magazine',
		loading: 'lazy' as const,
	},
	schoolsGuideUK: {
		src: '/images/media/schools-guide-uk-logo.png',
		alt: 'Schools Guide UK - Trusted Educational Resource',
		width: 200,
		height: 80,
		title: 'Schools Guide UK Recognition',
		loading: 'lazy' as const,
	},
} as const;
export const TUTOR_IMAGES = {
	'john-history': {
		src: '/images/tutors/john.png',
		alt: 'John - History Specialist, University of Birmingham First-Class BA History, PGCE, Secondary History',
		width: 400,
		height: 300,
		title: 'Online Tutoring Professional',
		loading: 'lazy' as const,
	},
	'tutor-facing-monitor': {
		src: '/images/tutors/tutor-facing-monitor.jpg',
		alt: 'Professional tutor working at computer delivering online lessons',
		width: 400,
		height: 300,
		title: 'Online Tutoring Professional',
		loading: 'lazy' as const,
	},
	'tutor-inside-looking-at-camera': {
		src: '/images/tutors/tutor-inside-looking-at-camera.jpg',
		alt: 'Experienced tutor portrait - Oxford/Cambridge graduate educator',
		width: 400,
		height: 400,
		title: 'Expert Educator Profile',
		loading: 'lazy' as const,
	},
	'alma-maths-science': {
		src: '/images/tutors/alma.jpg',
		alt: 'Alma - Maths & Science Specialist, UCL First-Class MSci Astrophysics, Official GCSE & A Level Examiner',
		width: 400,
		height: 400,
		title: 'Alma - Maths & Science Specialist',
		loading: 'lazy' as const,
	},
	'amy-english': {
		src: '/images/tutors/amy.jpg',
		alt: 'Amy - English Language & Literature Specialist, LLB (Hons) Law, Head of English & Media Studies',
		width: 400,
		height: 400,
		title: 'Amy - English Language & Literature Specialist',
		loading: 'lazy' as const,
	},
	'emily-entrance-history': {
		src: '/images/tutors/emily.jpg',
		alt: 'Emily - Entrance Exam Expert, History & Politics, Cambridge BA History, Oxford PGCE, Official 11+ Examiner',
		width: 400,
		height: 400,
		title: 'Emily - Entrance Exam Expert, History & Politics',
		loading: 'lazy' as const,
	},
	'michael-primary': {
		src: '/images/tutors/michael.jpg',
		alt: 'Michael - Primary & 11+/13+ Specialist, PGCE Primary, English Subject Lead with 22+ years experience',
		width: 400,
		height: 400,
		title: 'Michael - Primary & 11+/13+ Specialist',
		loading: 'lazy' as const,
	},
	'juliet-maths-sen': {
		src: '/images/tutors/juliet.jpg',
		alt: 'Juliet - Maths, SEN & International Teaching Expert, BSc Maths, MA Education, 30+ years international experience',
		width: 400,
		height: 400,
		title: 'Juliet - Maths, SEN & International Teaching Expert',
		loading: 'lazy' as const,
	},
	'andreas-languages': {
		src: '/images/tutors/andreas.jpg',
		alt: 'Andreas - Modern Languages Specialist, BA Spanish & German, QTS qualified, fluent in six languages',
		width: 400,
		height: 400,
		title: 'Andreas - Modern Languages Specialist',
		loading: 'lazy' as const,
	},
	'ophelia-classics': {
		src: '/images/tutors/ophelia.jpg',
		alt: 'Ophelia - 11+, Entrance Exams & Classics Expert, BA Classics Cambridge, elite school success at Harrow & Westminster',
		width: 400,
		height: 400,
		title: 'Ophelia - 11+, Entrance Exams & Classics Expert',
		loading: 'lazy' as const,
	},
	'annoushka-english': {
		src: '/images/tutors/annoushka.jpg',
		alt: 'Annoushka - English & Entrance Exams Specialist, BA English Oxford, CELTA qualified, Westminster & Cheltenham Ladies success',
		width: 400,
		height: 400,
		title: 'Annoushka - English & Entrance Exams Specialist',
		loading: 'lazy' as const,
	},
	'alex-admissions': {
		src: '/images/tutors/alex.jpg',
		alt: 'Alex - University Admissions & English Expert, BA Law Cambridge, MA Harvard, British & US admissions expert',
		width: 400,
		height: 400,
		title: 'Alex - University Admissions & English Expert',
		loading: 'lazy' as const,
	},
	'rachel-deputy-head': {
		src: '/images/tutors/old_backup/rachel.avif',
		alt: 'Rachel - Deputy Headteacher and Entrance Exam Specialist professional headshot (legacy)',
		width: 400,
		height: 400,
		title: 'Rachel - Deputy Headteacher and Entrance Exam Specialist (Legacy)',
		loading: 'lazy' as const,
	},
	'derek-maths-sciences': {
		src: '/images/tutors/old_backup/derek.avif',
		alt: 'Derek - Maths, Biology, Chemistry and Physics Expert professional headshot (legacy)',
		width: 400,
		height: 400,
		title: 'Derek - Maths, Biology, Chemistry and Physics (Legacy)',
		loading: 'lazy' as const,
	},
	'jay-sciences-maths': {
		src: '/images/tutors/old_backup/jay.avif',
		alt: 'Jay - Biology, Chemistry, Physics and Maths Expert professional headshot (legacy)',
		width: 400,
		height: 400,
		title: 'Jay - Biology, Chemistry, Physics and Maths (Legacy)',
		loading: 'lazy' as const,
	},
	'emilia-entrance-history': {
		src: '/images/tutors/old_backup/emilia.avif',
		alt: 'Emilia - Entrance Exams, History and University Applications Expert professional headshot (legacy)',
		width: 400,
		height: 400,
		title:
			'Emilia - Entrance Exams, History and University/Oxbridge Applications (Legacy)',
		loading: 'lazy' as const,
	},
	'annette-english-history': {
		src: '/images/tutors/old_backup/annette.avif',
		alt: 'Annette - English and History Expert with SEN Experience professional headshot (legacy)',
		width: 400,
		height: 400,
		title: 'Annette - English and History Expert with SEN Experience (Legacy)',
		loading: 'lazy' as const,
	},
	'elle-primary-maths': {
		src: '/images/tutors/old_backup/elle.avif',
		alt: 'Elle - Primary Specialist, Entrance Exams and Maths Expert professional headshot (legacy)',
		width: 400,
		height: 400,
		title: 'Elle - Primary Specialist, Entrance Exams and Maths (Legacy)',
		loading: 'lazy' as const,
	},
	'daniel-humanities': {
		src: '/images/tutors/old_backup/daniel.avif',
		alt: 'Daniel - History, Politics, Economics and Sociology Expert professional headshot (legacy)',
		width: 400,
		height: 400,
		title: 'Daniel - History, Politics, Economics and Sociology (Legacy)',
		loading: 'lazy' as const,
	},
	'david-sciences-oxbridge': {
		src: '/images/tutors/old_backup/david.avif',
		alt: 'David - Sciences, Maths and Oxbridge Entrance Expert professional headshot (legacy)',
		width: 400,
		height: 400,
		title: 'David - Sciences, Maths and Oxbridge Entrance (Legacy)',
		loading: 'lazy' as const,
	},
} as const;
export const PROGRAMME_IMAGES = {
	'eleven-plus-kickstarter': {
		src: '/images/programmes/eleven-plus-kickstarter-online-tutoring.jpg',
		alt: '11+ Kickstarter Programme - Mother and young son working together at computer, demonstrating supportive online tutoring approach for foundational 11+ preparation with expert guidance',
		width: 600,
		height: 300,
		title: '11+ Kickstarter Programme - Online Tutoring',
		loading: 'lazy' as const,
	},
	'eleven-plus-intensive': {
		src: '/images/programmes/eleven-plus-intensive-exam-preparation.jpg',
		alt: '11+ Intensive Programme - Student hands completing exam answer sheet with pencil, demonstrating focused exam preparation technique and multiple choice testing skills for entrance examinations',
		width: 600,
		height: 300,
		title: '11+ Intensive Programme - Exam Preparation',
		loading: 'lazy' as const,
	},
} as const;
export const MARKETING_ASSETS = {
	'11plusBootcampFlyer': {
		src: '/documents/marketing/11-plus-bootcamp-flyer-2025.png',
		alt: '11+ Bootcamp Flyer 2025 - Facebook Marketing Material',
		width: 600,
		height: 400,
		title: '11+ Bootcamp Flyer 2025',
		loading: 'lazy' as const,
	},
	elizabethTopTips: {
		src: '/documents/marketing/elizabeth-10-top-tips-personal-statements-2025.pdf',
		alt: "Elizabeth's 10 Top Tips for Outstanding Personal Statements - MPTO 2025",
		title: 'Personal Statement Guide 2025',
		description: 'Expert guidance for university applications',
	},
	enquiryFormScreenshot: {
		src: '/images/graphics/bizstim-form-preview.png',
		alt: 'Bizstim form preview showing My Private Tutor Online enquiry form interface with student details fields',
		width: 400,
		height: 300,
		title: 'Bizstim Enquiry Form Preview',
		loading: 'lazy' as const,
	},
} as const;
export const VIDEO_PLACEHOLDERS = {
	intro: {
		src: '/images/video-placeholders/placeholder_for_introductionary_video.png',
		alt: 'Introductory video placeholder',
		width: 800,
		height: 450,
		title: 'Introductory Video',
		loading: 'lazy' as const,
	},
	promoTutor: {
		src: '/images/video-placeholders/promo-video-tutor-student.avif',
		alt: 'Promotional video showing tutor and student interaction',
		width: 600,
		height: 400,
		title: 'Tutor-Student Interaction',
		loading: 'lazy' as const,
	},
} as const;
interface MasterVideoRecord {
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly videoUrl: string | null;
	readonly src: string | null;
	readonly thumbnailUrl: string | null;
	readonly poster: string | null;
	readonly backgroundImage: string | null;
	readonly fallback: string | null;
	readonly author: string | null;
	readonly authorRole: string | null;
	readonly testimonialAuthor: string | null;
	readonly testimonialRole: string | null;
	readonly duration: number | null;
	readonly category:
		| 'free'
		| 'premium'
		| 'background'
		| 'testimonial'
		| 'placeholder'
		| 'all'
		| 'Oxbridge'
		| 'paid';
	readonly isFree: boolean;
	readonly price: string | null;
	readonly paymentUrl: string | null;
	readonly alt: string;
	readonly featured: boolean;
	readonly width: number | null;
	readonly height: number | null;
	readonly loading: 'lazy' | 'eager' | null;
	readonly usageTypes: Array<
		'page-section' | 'masterclass' | 'background' | 'testimonial' | 'placeholder'
	>;
	readonly layouts: {
		readonly videoPage?: {
			readonly position: 'text-left' | 'text-right';
			readonly badge: {
				readonly text: string;
				readonly type: 'free' | 'premium';
			};
			readonly content: {
				readonly paragraphs: readonly string[];
				readonly bulletPoints: readonly string[];
			};
			readonly animationStyle: string;
		};
		readonly masterclassPage?: {
			readonly displayOrder?: number;
			readonly featuredOnHome?: boolean;
		};
	} | null;
}
const transformVideoMasterclassToRecord = (
	video: VideoMasterclass,
): MasterVideoRecord => {
	return {
		id: video.id,
		title: video.title,
		description: video.description,
		videoUrl: video.youtubeUrl || '',
		src: video.youtubeUrl || '',
		thumbnailUrl: video.thumbnailImage,
		poster: video.thumbnailImage,
		backgroundImage: video.backgroundImage,
		fallback: null,
		author: 'Elizabeth Burrows',
		authorRole: 'Founder of My Private Tutor Online',
		testimonialAuthor: null,
		testimonialRole: null,
		duration:
			video.id === 'ucasSummit2024'
				? 45
				: video.id === 'unlockingAcademicSuccess'
				? 30
				: 25,
		category: video.isPaid ? 'paid' : 'free',
		isFree: !video.isPaid,
		price: video.isPaid ? '£25.00' : null,
		paymentUrl: video.purchaseLink || null,
		alt: `${video.title} - Educational masterclass video`,
		featured: !video.isPaid,
		width: 800,
		height: 450,
		loading: 'lazy',
		usageTypes: ['page-section', 'masterclass'],
		layouts: {
			videoPage: {
				position:
					video.id === 'elizabethsUcasGuide' ||
					video.id === 'personalStatementsGuide' ||
					video.id === 'britishEtiquette'
						? 'text-right'
						: 'text-left',
				badge: {
					text: video.isPaid ? 'Premium Content' : 'Free Access',
					type: video.isPaid ? 'premium' : 'free',
				},
				content: {
					paragraphs: [
						video.description,
						video.isPaid
							? 'This comprehensive masterclass provides expert guidance with proven strategies used by successful families.'
							: 'Access this valuable content at no cost as part of our commitment to supporting all families.',
					],
					bulletPoints:
						video.id === 'ucasSummit2024'
							? [
									'UCAS application strategy',
									'Personal statement guidance',
									'University selection tips',
									'Interview preparation',
							  ]
							: video.id === 'unlockingAcademicSuccess'
							? [
									'Academic excellence strategies',
									'Tutor selection guidance',
									'Educational support methods',
									'Confidence building techniques',
							  ]
							: video.id === 'elizabethsUcasGuide'
							? [
									'Comprehensive UCAS guidance',
									'Application strategy framework',
									'Personal statement methodology',
									'University success planning',
							  ]
							: video.id === 'personalStatementsGuide'
							? [
									'Personal statement mastery',
									'Expert writing techniques',
									'Compelling application creation',
									'University offer securing',
							  ]
							: video.id === 'britishLiteraryClassics'
							? [
									'Essential British literature knowledge',
									'Cultural fluency development',
									'Academic discussion confidence',
									'Educational excellence support',
							  ]
							: [
									'British cultural navigation',
									'Educational etiquette mastery',
									'Social confidence building',
									'Institutional protocol understanding',
							  ],
				},
				animationStyle: 'from-center',
			},
		},
	};
};
const COMPREHENSIVE_VIDEO_CMS: Record<string, MasterVideoRecord> = {
	...Object.fromEntries(
		videoMasterclasses.map((video) => [
			video.id,
			transformVideoMasterclassToRecord(video),
		]),
	),
	'parents-testimonials-2025': {
		id: 'parents-testimonials-2025',
		title: 'Parent Testimonials 2025',
		description:
			'Hear from parents about their experience with My Private Tutor Online',
		videoUrl: '/videos/parents-testimonials-2025.mp4',
		src: '/videos/parents-testimonials-2025.mp4',
		thumbnailUrl: '/images/testimonials/parent-testimonials-thumbnail.jpg',
		poster: '/images/testimonials/parent-testimonials-thumbnail.jpg',
		backgroundImage: null,
		fallback: null,
		author: null,
		authorRole: null,
		testimonialAuthor: null,
		testimonialRole: null,
		duration: 180,
		category: 'testimonial',
		isFree: true,
		price: null,
		paymentUrl: null,
		alt: 'Parent testimonials video - My Private Tutor Online',
		featured: true,
		width: 800,
		height: 450,
		loading: 'lazy',
		usageTypes: ['testimonial'],
		layouts: null,
	},
	'students-testimonials-2025': {
		id: 'students-testimonials-2025',
		title: 'Student Testimonials 2025',
		description:
			'Hear from students about their success with My Private Tutor Online',
		videoUrl: '/videos/students-testimonials-2025.mp4',
		src: '/videos/students-testimonials-2025.mp4',
		thumbnailUrl: '/images/testimonials/student-testimonials-thumbnail.jpg',
		poster: '/images/testimonials/student-testimonials-thumbnail.jpg',
		backgroundImage: null,
		fallback: null,
		author: null,
		authorRole: null,
		testimonialAuthor: null,
		testimonialRole: null,
		duration: 150,
		category: 'testimonial',
		isFree: true,
		price: null,
		paymentUrl: null,
		alt: 'Student testimonials video - My Private Tutor Online',
		featured: true,
		width: 800,
		height: 450,
		loading: 'lazy',
		usageTypes: ['testimonial'],
		layouts: null,
	},
	placeholder: {
		id: 'placeholder',
		title: 'Video Placeholder',
		description: 'Placeholder for video content',
		videoUrl: null,
		src: '/images/video-placeholders/placeholder_for_introductionary_video.png',
		thumbnailUrl: null,
		poster: null,
		backgroundImage: null,
		fallback: null,
		author: null,
		authorRole: null,
		testimonialAuthor: null,
		testimonialRole: null,
		duration: null,
		category: 'placeholder',
		isFree: true,
		price: null,
		paymentUrl: null,
		alt: 'Video placeholder',
		featured: false,
		width: 800,
		height: 450,
		loading: 'lazy',
		usageTypes: ['placeholder'],
		layouts: null,
	},
};
const getVideoFromInternalCMS = (id: string): MasterVideoRecord | undefined => {
	return COMPREHENSIVE_VIDEO_CMS[id];
};
const getVideosByCategory = (category: any) =>
	Object.values(COMPREHENSIVE_VIDEO_CMS).filter(
		(video) => video.category === category,
	);
const getVideosByUsage = (usageType: string) =>
	Object.values(COMPREHENSIVE_VIDEO_CMS).filter(
		(video) => video.usageTypes && video.usageTypes.includes(usageType as any),
	);
const getVideoByTitle = (title: string) =>
	Object.values(COMPREHENSIVE_VIDEO_CMS).find((video) => video.title === title);
const getVideoPageData = (title: string) => {
	const video = getVideoByTitle(title);
	return video?.layouts?.videoPage;
};
const FALLBACK_IMAGES = {
	placeholder: {
		src: '/images/placeholder.svg',
		alt: 'Placeholder image',
		width: 400,
		height: 300,
		title: 'Placeholder',
		loading: 'lazy' as const,
	},
	avatarPlaceholder: {
		src: '/images/testimonials/placeholder-user.jpg',
		alt: 'User avatar placeholder',
		width: 100,
		height: 100,
		title: 'User Avatar',
		loading: 'lazy' as const,
	},
} as const;
export const STUDENT_IMAGES = {
	'student-child': {
		src: '/images/students/student-child.jpg',
		alt: 'Young student engaged in personalised tutoring session',
		width: 300,
		height: 400,
		title: 'Personalised Tutoring',
		loading: 'lazy' as const,
	},
	'student-teenager': {
		src: '/images/students/student-teenager.jpg',
		alt: 'GCSE student celebrating academic success with improved grades',
		width: 300,
		height: 400,
		title: 'GCSE Success Story',
		loading: 'lazy' as const,
	},
	'student-university': {
		src: '/images/students/student-university.jpg',
		alt: 'A-Level student achieving excellent results for university application',
		width: 300,
		height: 400,
		title: 'A-Level Achievement',
		loading: 'lazy' as const,
	},
	'student-oxbridge': {
		src: '/images/students/student-oxbridge.jpg',
		alt: 'Oxbridge candidate celebrating university acceptance offer',
		width: 300,
		height: 400,
		title: 'Oxbridge Success',
		loading: 'lazy' as const,
	},
	'adult-student-with-teacher': {
		src: '/images/students/adult-student-with-teacher.jpg',
		alt: 'Adult student working closely with experienced tutor in comfortable learning environment',
		width: 400,
		height: 300,
		title: 'Adult Learning Success',
		loading: 'lazy' as const,
	},
	'student-inside-holding-pencil': {
		src: '/images/students/student-inside-holding-pencil.jpg',
		alt: 'Focused student taking notes during personalised tutoring session',
		width: 400,
		height: 300,
		title: 'Engaged Learning',
		loading: 'lazy' as const,
	},
	'student-learning-piano': {
		src: '/images/students/student-learning-piano.jpg',
		alt: 'Student receiving expert piano instruction from qualified music tutor',
		width: 400,
		height: 300,
		title: 'Music Tuition Excellence',
		loading: 'lazy' as const,
	},
	'student-on-laptop-teacher-on-screen': {
		src: '/images/students/student-on-laptop-teacher-on-screen.jpg',
		alt: 'Student engaged in high-quality online tutoring session with expert tutor',
		width: 400,
		height: 300,
		title: 'Online Tutoring Excellence',
		loading: 'lazy' as const,
	},
	'student-teacher-inside-comfortable': {
		src: '/images/students/student-teacher-inside-comfortable.jpg',
		alt: 'Student and tutor working together in comfortable indoor learning environment',
		width: 400,
		height: 300,
		title: 'Comfortable Learning Environment',
		loading: 'lazy' as const,
	},
	'student-teacher-outside': {
		src: '/images/students/student-teacher-outside.jpg',
		alt: 'Outdoor tutoring session showing flexible learning approaches',
		width: 400,
		height: 300,
		title: 'Flexible Learning Locations',
		loading: 'lazy' as const,
	},
	'entrance-exam-preparation': {
		src: '/images/students/entrance-exam-preparation.jpg',
		alt: 'Professional student preparing for entrance examinations with expert tutoring support',
		width: 600,
		height: 400,
		title: 'Entrance Exam Preparation',
		loading: 'lazy' as const,
	},
	'online-homeschooling': {
		src: '/images/students/online-homeschooling.jpg',
		alt: 'Student engaged in comprehensive online homeschooling programme with qualified educators',
		width: 600,
		height: 400,
		title: 'Online Homeschooling Support',
		loading: 'lazy' as const,
	},
	'primary-school-support': {
		src: '/images/students/primary-school-support.webp',
		alt: 'Young primary school student receiving personalised educational support and guidance',
		width: 1920,
		height: 1080,
		title: 'Primary School Learning Support',
		loading: 'lazy' as const,
	},
	'secondary-school-support': {
		src: '/images/students/secondary-school-support.jpg',
		alt: 'Secondary school student in focused tutoring session improving academic performance',
		width: 600,
		height: 400,
		title: 'Secondary School Academic Support',
		loading: 'lazy' as const,
	},
	'sen-support': {
		src: '/images/students/sen-support.jpg',
		alt: 'Student with special educational needs receiving specialist tailored learning support',
		width: 600,
		height: 400,
		title: 'Special Educational Needs Support',
		loading: 'lazy' as const,
	},
	'university-and-beyond': {
		src: '/images/students/university-and-beyond.webp',
		alt: 'University-aged student or graduate achieving academic excellence with ongoing educational support',
		width: 600,
		height: 400,
		title: 'University and Beyond Support',
		loading: 'lazy' as const,
	},
	'london-in-person-tuition': {
		src: '/images/students/london-in-person-tuition-2025.jpg',
		alt: 'Professional in-person tutoring session in London showing expert educator working with student in premium learning environment',
		width: 600,
		height: 400,
		title: 'London In-Person Tutoring Excellence',
		loading: 'lazy' as const,
	},
} as const;
const imageAssetRegistry = new Map<
	string,
	Map<string, ImageAsset | VideoAsset | BackgroundVideoAsset>
>();
imageAssetRegistry.set('logos', new Map(Object.entries(LOGOS)));
imageAssetRegistry.set(
	'institutions',
	new Map(Object.entries(INSTITUTION_LOGOS)),
);
imageAssetRegistry.set('hero', new Map(Object.entries(HERO_IMAGES)));
imageAssetRegistry.set('team', new Map(Object.entries(TEAM_IMAGES)));
imageAssetRegistry.set(
	'testimonials',
	new Map(Object.entries(TESTIMONIAL_IMAGES)),
);
imageAssetRegistry.set('media', new Map(Object.entries(MEDIA_IMAGES)));
imageAssetRegistry.set('tutors', new Map(Object.entries(TUTOR_IMAGES)));
imageAssetRegistry.set('students', new Map(Object.entries(STUDENT_IMAGES)));
imageAssetRegistry.set('fallbacks', new Map(Object.entries(FALLBACK_IMAGES)));
imageAssetRegistry.set(
	'videoPlaceholders',
	new Map(Object.entries(VIDEO_PLACEHOLDERS)),
);
imageAssetRegistry.set('programmes', new Map(Object.entries(PROGRAMME_IMAGES)));
export function getImageAsset(
	category: string,
	key: string,
): ImageAsset | VideoAsset | BackgroundVideoAsset | undefined {
	const categoryMap = imageAssetRegistry.get(category);
	return categoryMap?.get(key);
}
function getCategoryAssets(
	category: string,
): Array<[string, ImageAsset | VideoAsset | BackgroundVideoAsset]> {
	const categoryMap = imageAssetRegistry.get(category);
	return categoryMap ? Array.from(categoryMap.entries()) : [];
}
const getFooterLogo = (): ImageAsset => {
	return LOGOS.footer;
};
const getInstitutionLogos = () => {
	return INSTITUTION_LOGOS;
};
const getUniversityLogos = (): Record<string, InstitutionLogo> => {
	const universityEntries = Object.entries(INSTITUTION_LOGOS).filter(
		([_, logo]) => (logo as InstitutionLogo).level === 'university',
	);
	return Object.fromEntries(universityEntries) as Record<
		string,
		InstitutionLogo
	>;
};
const getSecondarySchoolLogos = (): Record<string, InstitutionLogo> => {
	const secondarySchoolEntries = Object.entries(INSTITUTION_LOGOS).filter(
		([_, logo]) => (logo as InstitutionLogo).level === 'secondary-school',
	);
	return Object.fromEntries(secondarySchoolEntries) as Record<
		string,
		InstitutionLogo
	>;
};
const getInstitutionLogosByLevel = (
	level: 'primary-school' | 'secondary-school' | 'university',
): Record<string, InstitutionLogo> => {
	const filteredEntries = Object.entries(INSTITUTION_LOGOS).filter(
		([_, logo]) => (logo as InstitutionLogo).level === level,
	);
	return Object.fromEntries(filteredEntries) as Record<string, InstitutionLogo>;
};
export const getScrollingSchoolLogos = cache(
	(
		level?: 'primary-school' | 'secondary-school' | 'university',
	): Record<string, InstitutionLogo> => {
		const allInstitutionMapping: Record<string, InstitutionLogo> = {
			'Eton College': INSTITUTION_LOGOS.eton as InstitutionLogo,
			'Westminster School': INSTITUTION_LOGOS.westminster as InstitutionLogo,
			"St Paul's School": INSTITUTION_LOGOS.stPauls as InstitutionLogo,
			'Harrow School': INSTITUTION_LOGOS.harrow as InstitutionLogo,
			'Oxford University': INSTITUTION_LOGOS.oxford as InstitutionLogo,
			'Cambridge University': INSTITUTION_LOGOS.cambridge as InstitutionLogo,
			'London School of Economics': INSTITUTION_LOGOS.lse as InstitutionLogo,
			"King's College London": INSTITUTION_LOGOS.kingsCollege as InstitutionLogo,
			'Brighton College': INSTITUTION_LOGOS.brightonCollege as InstitutionLogo,
			'Durham University': INSTITUTION_LOGOS.durham as InstitutionLogo,
			'University of Edinburgh': INSTITUTION_LOGOS.edinburgh as InstitutionLogo,
			'Highgate School': INSTITUTION_LOGOS.highgate as InstitutionLogo,
			'Le Rosey School': INSTITUTION_LOGOS.leRosey as InstitutionLogo,
			'University of St Andrews': INSTITUTION_LOGOS.stAndrews as InstitutionLogo,
			'University of Warwick': INSTITUTION_LOGOS.warwick as InstitutionLogo,
			'Henrietta Barnett School':
				INSTITUTION_LOGOS.henriettaBarnett as InstitutionLogo,
			'Latymer School': INSTITUTION_LOGOS.latymerSchool as InstitutionLogo,
			"Queen Elizabeth's School":
				INSTITUTION_LOGOS.queenElizabeths as InstitutionLogo,
			'Tiffin School': INSTITUTION_LOGOS.tiffinSchool as InstitutionLogo,
		};
		if (level) {
			const filteredEntries = Object.entries(allInstitutionMapping).filter(
				([_, logo]) => logo.level === level,
			);
			return Object.fromEntries(filteredEntries) as Record<
				string,
				InstitutionLogo
			>;
		}
		return allInstitutionMapping;
	},
);
const getInstitutionsByLocation = (
	locationFilter: string,
): Record<string, InstitutionLogo> => {
	const filteredEntries = Object.entries(INSTITUTION_LOGOS).filter(
		([_, logo]) => {
			const institutionLogo = logo as InstitutionLogo;
			return (
				institutionLogo.location
					?.toLowerCase()
					.includes(locationFilter.toLowerCase()) ?? false
			);
		},
	);
	return Object.fromEntries(filteredEntries) as Record<string, InstitutionLogo>;
};
const getInstitutionsByPrestige = (
	prestige: 'high' | 'medium' | 'standard',
): Record<string, InstitutionLogo> => {
	const filteredEntries = Object.entries(INSTITUTION_LOGOS).filter(
		([_, logo]) => (logo as InstitutionLogo).prestige === prestige,
	);
	return Object.fromEntries(filteredEntries) as Record<string, InstitutionLogo>;
};
const getMediaImages = (): typeof MEDIA_IMAGES => {
	return MEDIA_IMAGES;
};
const getTutorImages = (): typeof TUTOR_IMAGES => {
	return TUTOR_IMAGES;
};
const getTutorImageById = (profileId: string): ImageAsset => {
	const tutorImage = TUTOR_IMAGES[profileId as keyof typeof TUTOR_IMAGES];
	if (tutorImage) {
		return tutorImage;
	}
	const formattedName = profileId
		.replace(/-/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
	return {
		src: '/images/tutors/tutor-facing-monitor.jpg',
		alt: `${formattedName} - Professional tutor placeholder image`,
		width: 400,
		height: 400,
		title: `${formattedName} - Professional Tutor`,
		loading: 'lazy' as const,
	};
};
export const hasTutorImage = (profileId: string): boolean => {
	return profileId in TUTOR_IMAGES;
};
const getNewTutorImageIds = (): readonly string[] => {
	const newTutorIds = [
		'alma-maths-science',
		'amy-english',
		'emily-entrance-history',
		'michael-primary',
		'juliet-maths-sen',
		'andreas-languages',
		'ophelia-classics',
		'annoushka-english',
		'alex-admissions',
	] as const;
	return newTutorIds;
};
const isNewTutor = (profileId: string): boolean => {
	const newTutorIds = getNewTutorImageIds();
	return newTutorIds.includes(profileId as (typeof newTutorIds)[number]);
};
const getVideoContent = () => {
	return Object.values(COMPREHENSIVE_VIDEO_CMS).filter(
		(video) => video.category === 'testimonial',
	);
};
export const getTestimonialVideos = (): Array<{
	readonly id: string;
	readonly title: string;
	readonly description: string;
	readonly videoSrc: string | null;
	readonly thumbnailSrc: string | null;
	readonly duration?: number | null;
	readonly featured?: boolean;
	readonly category?:
		| 'free'
		| 'premium'
		| 'background'
		| 'testimonial'
		| 'placeholder'
		| 'all'
		| 'Oxbridge'
		| 'paid';
	readonly testimonialAuthor?: string | null;
	readonly testimonialRole?: string | null;
}> => {
	return Object.values(COMPREHENSIVE_VIDEO_CMS)
		.filter((video) => video.category === 'testimonial')
		.map((video) => ({
			id: video.id,
			title: video.title,
			description: video.description,
			videoSrc: video.src,
			thumbnailSrc: video.poster,
			duration: video.duration,
			featured: video.featured,
			category: video.category,
			testimonialAuthor: video.testimonialAuthor,
			testimonialRole: video.testimonialRole,
		}));
};
const getMarketingAssets = (): typeof MARKETING_ASSETS => {
	return MARKETING_ASSETS;
};
const getHeroImage = (): ImageAsset => {
	return HERO_IMAGES.childWithLaptop;
};
const getIntroVideo = (): ImageAsset => {
	return HERO_IMAGES.introVideo;
};
const getAboutHeroImage = (): ImageAsset => {
	return HERO_IMAGES.aboutFounderStory;
};
const getGoingAgainstGrainImage = (): ImageAsset => {
	return HERO_IMAGES.goingAgainstGrainPhilosophy;
};
export const getTutorsHeroImage = (): ImageAsset => {
	return {
		src: '/images/students/student-teacher-inside-comfortable.jpg',
		alt: 'Professional tutor working with student in comfortable learning environment - Meet Our Expert Tutors',
		width: 1920,
		height: 1080,
		title: 'Meet Our Expert Tutors - Professional Learning Environment',
		loading: 'eager' as const,
		priority: true,
	};
};
const getTeamImages = (): typeof TEAM_IMAGES => {
	return TEAM_IMAGES;
};
const getTestimonialImages = (): typeof TESTIMONIAL_IMAGES => {
	return TESTIMONIAL_IMAGES;
};
const getVideoPlaceholders = (): typeof VIDEO_PLACEHOLDERS => {
	return VIDEO_PLACEHOLDERS;
};
const getMasterclassVideos = () => {
	return Object.values(COMPREHENSIVE_VIDEO_CMS).filter(
		(video) => video.usageTypes && video.usageTypes.includes('masterclass'),
	);
};
const getVideoPageSections = () => {
	return Object.values(COMPREHENSIVE_VIDEO_CMS).filter(
		(video) => video.usageTypes && video.usageTypes.includes('page-section'),
	);
};
const getVideoPageSection = (title: string) => {
	return getVideoByTitle(title);
};
const getProgrammeImages = (): typeof PROGRAMME_IMAGES => {
	return PROGRAMME_IMAGES;
};
const getProgrammeImage = (
	imageKey: keyof typeof PROGRAMME_IMAGES,
): ImageAsset => {
	return PROGRAMME_IMAGES[imageKey];
};
interface TransformedVideoMasterclass {
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
		videoPage: {
			badge: {
				text: string;
			};
			content: {
				paragraphs: string[];
				bulletPoints: string[];
			};
			animationStyle: string;
		};
	};
}
function transformVideoMasterclass(
	video: VideoMasterclass,
): TransformedVideoMasterclass {
	return {
		title: video.title,
		videoUrl: video.youtubeUrl || '',
		thumbnailUrl: video.thumbnailImage,
		backgroundImage: video.backgroundImage,
		alt: video.title,
		duration: '15',
		author: 'Elizabeth Burrows',
		isFree: !video.isPaid,
		price: video.isPaid ? 'Premium Content' : undefined,
		paymentUrl: video.purchaseLink,
		layouts: {
			videoPage: {
				badge: {
					text: video.isPaid ? 'Premium' : 'Free',
				},
				content: {
					paragraphs: [video.description],
					bulletPoints: video.bulletPoints || [
						'Expert guidance from Elizabeth Burrows',
						'Based on 15 years of tutoring experience',
						'Practical strategies for academic success',
						'Proven methodology for educational excellence',
					],
				},
				animationStyle: 'fade-in',
			},
		},
	};
}
export const getMasterclassVideo = (
	id: string,
): TransformedVideoMasterclass | undefined => {
	const video = getVideoMasterclass(id);
	if (!video) {
		console.error(`Video not found for videoId: "${id}"`);
		return undefined;
	}
	return transformVideoMasterclass(video);
};
const getVideoMasterclassPage = cache(
	(): readonly VideoMasterclass[] => {
		const videoIds = [
			'unlockingAcademicSuccess',
			'ucasSummit2024',
			'elizabethsUcasGuide',
			'personalStatementsGuide',
			'britishEtiquette',
			'britishLiteraryClassics',
		];
		const videos = videoIds
			.map((id) => getVideoMasterclass(id))
			.filter((video): video is VideoMasterclass => video !== undefined);
		if (videos.length !== videoIds.length) {
			console.warn(
				`Expected ${videoIds.length} videos but found ${videos.length}`,
			);
		}
		return videos;
	},
);
const getBackgroundVideo = (title: string) => {
	const video = getVideoByTitle(title);
	return video && video.category === 'background' ? video : null;
};
const getBackgroundVideos = () => {
	return Object.values(COMPREHENSIVE_VIDEO_CMS).filter(
		(video) => video.category === 'background',
	);
};
const getFallbackImage = (): ImageAsset => {
	return FALLBACK_IMAGES.placeholder;
};
const getAvatarPlaceholder = (): ImageAsset => {
	return FALLBACK_IMAGES.avatarPlaceholder;
};
const getStudentImages = (): typeof STUDENT_IMAGES => {
	return STUDENT_IMAGES;
};
const generateResponsiveSizes = (
	baseWidth: number,
): ResponsiveImageSizes => {
	return {
		mobile: Math.round(baseWidth * 0.5),
		tablet: Math.round(baseWidth * 0.75),
		desktop: baseWidth,
		xl: Math.round(baseWidth * 1.25),
	};
};
const generateSrcSet = (
	src: string,
	sizes: Record<string, number>,
): string => {
	return Object.entries(sizes)
		.map(([_, width]) => `${src}?w=${width} ${width}w`)
		.join(', ');
};
const getOptimizedImageProps = (
	image: ImageAsset,
	customSizes?: string,
): {
	readonly src: string;
	readonly alt: string;
	readonly width?: number;
	readonly height?: number;
	readonly title?: string;
	readonly loading?: 'lazy' | 'eager';
	readonly priority?: boolean;
	readonly sizes: string;
} => {
	return {
		src: image.src,
		alt: image.alt,
		width: image.width,
		height: image.height,
		title: image.title,
		loading: image.loading,
		priority: image.priority,
		sizes:
			customSizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
	};
};
const validateImageAccessibility = (image: ImageAsset): boolean => {
	if (!image.alt || image.alt.trim().length === 0) {
		return false;
	}
	if (
		image.alt.includes('.jpg') ||
		image.alt.includes('.png') ||
		image.alt.includes('.avif')
	) {
		return false;
	}
	if (!image.width || !image.height) {
	}
	return true;
};
const getCriticalImages = (): readonly ImageAsset[] => {
	const allImages: readonly ImageAsset[] = [
		...Object.values(LOGOS),
		...Object.values(HERO_IMAGES),
	];
	return allImages.filter(
		(image): image is ImageAsset =>
			'priority' in image && image.priority === true,
	);
};
export const getMainLogo = cache((): ImageAsset | undefined => {
	const logoMap = imageAssetRegistry.get('logos') as Map<string, ImageAsset>;
	return logoMap?.get('main');
});
export const getMainLogoWhite = cache((): ImageAsset | undefined => {
	const logoMap = imageAssetRegistry.get('logos') as Map<string, ImageAsset>;
	return logoMap?.get('mainWhite');
});
const CMSImages = {
	getLogos: () => {
		const logoMap = imageAssetRegistry.get('logos') as Map<string, ImageAsset>;
		const heroMap = imageAssetRegistry.get('hero') as Map<string, ImageAsset>;
		return {
			main: logoMap.get('main'),
			mainWhite: logoMap.get('mainWhite'),
			footer: logoMap.get('footer'),
			icon: logoMap.get('icon'),
			childWithLaptop: heroMap.get('childWithLaptop'),
		};
	},
	logos: imageAssetRegistry.get('logos'),
	institutions: imageAssetRegistry.get('institutions'),
	hero: imageAssetRegistry.get('hero'),
	team: imageAssetRegistry.get('team'),
	testimonials: imageAssetRegistry.get('testimonials'),
	media: imageAssetRegistry.get('media'),
	tutors: imageAssetRegistry.get('tutors'),
	students: imageAssetRegistry.get('students'),
	fallbacks: imageAssetRegistry.get('fallbacks'),
	marketing: imageAssetRegistry.get('marketing'),
	videoPlaceholders: imageAssetRegistry.get('videoPlaceholders'),
	programmes: imageAssetRegistry.get('programmes'),
	getTutorImageById,
	hasTutorImage,
	getNewTutorImageIds,
	isNewTutor,
	getProgrammeImages,
	getProgrammeImage,
} as const;
