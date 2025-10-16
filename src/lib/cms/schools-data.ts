export interface EliteSchool {
	readonly id: string;
	readonly name: string;
	readonly shortName?: string;
	readonly category: SchoolCategory;
	readonly type: InstitutionType;
	readonly location: string;
	readonly city: string;
	readonly country: string;
	readonly established?: number;
	readonly logo?: string;
	readonly crest?: string;
	readonly badge?: string;
	readonly colors?: {
		readonly primary: string;
		readonly secondary: string;
	};
	readonly rankings?: {
		readonly national?: number;
		readonly global?: number;
		readonly subject?: Record<string, number>;
	};
	readonly league?:
		| 'russell_group'
		| 'oxbridge'
		| 'grammar'
		| 'independent'
		| 'international';
	readonly prestigeScore: number;
	readonly subjects?: readonly string[];
	readonly specialisms?: readonly string[];
	readonly entryRequirements?: string;
	readonly acceptanceRate?: number;
	readonly studentCount?: number;
	readonly website?: string;
	readonly admissions?: string;
	readonly description?: string;
	readonly motto?: string;
	readonly featured?: boolean;
	readonly priority?: number;
}
export type SchoolCategory =
	| 'university'
	| 'grammar'
	| 'independent'
	| 'international'
	| 'specialist';
export type InstitutionType = 'university' | 'school' | 'college' | 'academy';
export const eliteSchoolsDatabase: readonly EliteSchool[] = [
	{
		id: 'oxford-university',
		name: 'University of Oxford',
		shortName: 'Oxford',
		category: 'university',
		type: 'university',
		location: 'Oxford',
		city: 'Oxford',
		country: 'United Kingdom',
		established: 1096,
		logo: '/images/schools/logos/oxford-logo.svg',
		crest: '/images/schools/crests/oxford-crest.svg',
		colors: {
			primary: '#002147',
			secondary: '#FFD700',
		},
		league: 'oxbridge',
		prestigeScore: 100,
		rankings: {
			national: 1,
			global: 2,
			subject: {
				'Philosophy Politics Economics': 1,
				Medicine: 1,
				Law: 1,
				'Natural Sciences': 2,
			},
		},
		subjects: [
			'PPE',
			'Medicine',
			'Law',
			'Natural Sciences',
			'Engineering',
			'Classics',
		],
		specialisms: [
			'Oxbridge Interview Preparation',
			'Personal Statement Coaching',
		],
		entryRequirements: 'A*A*A minimum, subject-specific requirements vary',
		acceptanceRate: 17.5,
		studentCount: 24,
		website: 'https://www.ox.ac.uk',
		admissions: 'https://www.ox.ac.uk/admissions',
		description:
			'The oldest English-speaking university in the world, consistently ranked #1 globally.',
		motto: 'Dominus illuminatio mea',
		featured: true,
		priority: 1,
	},
	{
		id: 'cambridge-university',
		name: 'University of Cambridge',
		shortName: 'Cambridge',
		category: 'university',
		type: 'university',
		location: 'Cambridge',
		city: 'Cambridge',
		country: 'United Kingdom',
		established: 1209,
		logo: '/images/schools/logos/cambridge-logo.svg',
		crest: '/images/schools/crests/cambridge-crest.svg',
		colors: {
			primary: '#A3C1AD',
			secondary: '#FFD700',
		},
		league: 'oxbridge',
		prestigeScore: 100,
		rankings: {
			national: 1,
			global: 3,
			subject: {
				'Natural Sciences': 1,
				Mathematics: 1,
				Engineering: 1,
				Medicine: 2,
			},
		},
		subjects: [
			'Natural Sciences',
			'Mathematics',
			'Engineering',
			'Medicine',
			'Computer Science',
			'Economics',
		],
		specialisms: [
			'Oxbridge Interview Preparation',
			'Cambridge Assessment Support',
		],
		entryRequirements: 'A*A*A minimum, subject-specific requirements vary',
		acceptanceRate: 18.8,
		studentCount: 27,
		website: 'https://www.cam.ac.uk',
		admissions: 'https://www.cam.ac.uk/admissions',
		description:
			"One of the world's oldest and most prestigious universities, leading in research and innovation.",
		motto: 'Hinc lucem et pocula sacra',
		featured: true,
		priority: 2,
	},
	{
		id: 'imperial-college-london',
		name: 'Imperial College London',
		shortName: 'Imperial',
		category: 'university',
		type: 'university',
		location: 'South Kensington, London',
		city: 'London',
		country: 'United Kingdom',
		established: 1907,
		logo: '/images/schools/logos/imperial-logo.svg',
		crest: '/images/schools/crests/imperial-crest.svg',
		colors: {
			primary: '#003E74',
			secondary: '#D4AF37',
		},
		league: 'russell_group',
		prestigeScore: 95,
		rankings: {
			national: 3,
			global: 6,
			subject: {
				Engineering: 2,
				Medicine: 3,
				'Natural Sciences': 3,
			},
		},
		subjects: [
			'Engineering',
			'Medicine',
			'Natural Sciences',
			'Computing',
			'Business',
		],
		specialisms: ['STEM Subject Excellence', 'Medical School Preparation'],
		entryRequirements: 'A*A*A minimum, subject-specific requirements',
		acceptanceRate: 14.3,
		studentCount: 19,
		website: 'https://www.imperial.ac.uk',
		admissions: 'https://www.imperial.ac.uk/admissions',
		description:
			"Consistently ranked in the world's top 10 universities, specialising in science, engineering, medicine and business.",
		motto: 'Scientia imperii decus et tutamen',
		featured: true,
		priority: 3,
	},
	{
		id: 'university-college-london',
		name: 'University College London',
		shortName: 'UCL',
		category: 'university',
		type: 'university',
		location: 'Bloomsbury, London',
		city: 'London',
		country: 'United Kingdom',
		established: 1826,
		logo: '/images/schools/logos/ucl-logo.svg',
		crest: '/images/schools/crests/ucl-crest.svg',
		colors: {
			primary: '#500050',
			secondary: '#FFD700',
		},
		league: 'russell_group',
		prestigeScore: 90,
		rankings: {
			national: 4,
			global: 8,
			subject: {
				Architecture: 1,
				Medicine: 4,
				Psychology: 2,
			},
		},
		subjects: [
			'Medicine',
			'Architecture',
			'Psychology',
			'Engineering',
			'Law',
			'Economics',
		],
		specialisms: [
			'Medical School Applications',
			'Architecture Portfolio Development',
		],
		entryRequirements: 'A*AA minimum, subject-specific requirements vary',
		acceptanceRate: 24,
		studentCount: 29,
		website: 'https://www.ucl.ac.uk',
		admissions: 'https://www.ucl.ac.uk/admissions',
		description:
			"London's Global University, the first university in England to welcome students of any religion and women on equal terms.",
		motto: 'Cuncti adsint meritaeque expectent praemia palmae',
		featured: true,
		priority: 4,
	},
	{
		id: 'kings-college-london',
		name: "King's College London",
		shortName: "King's",
		category: 'university',
		type: 'university',
		location: 'Strand, London',
		city: 'London',
		country: 'United Kingdom',
		established: 1829,
		logo: '/images/schools/logos/kings-logo.svg',
		crest: '/images/schools/crests/kings-crest.svg',
		colors: {
			primary: '#E51636',
			secondary: '#FFFFFF',
		},
		league: 'russell_group',
		prestigeScore: 88,
		rankings: {
			national: 6,
			global: 35,
			subject: {
				Law: 3,
				Medicine: 5,
				'War Studies': 1,
			},
		},
		subjects: [
			'Law',
			'Medicine',
			'War Studies',
			'English',
			'History',
			'International Relations',
		],
		specialisms: ['Law School Preparation', 'Medical Applications'],
		entryRequirements: 'A*AA minimum, subject-specific requirements vary',
		acceptanceRate: 69.0,
		studentCount: 3,
		website: 'https://www.kcl.ac.uk',
		admissions: 'https://www.kcl.ac.uk/admissions',
		description:
			'One of the oldest and most prestigious universities in England, renowned for its academic excellence.',
		motto: 'Sancte et sapienter',
		featured: true,
		priority: 5,
	},
	{
		id: 'lse',
		name: 'London School of Economics and Political Science',
		shortName: 'LSE',
		category: 'university',
		type: 'university',
		location: 'Holborn, London',
		city: 'London',
		country: 'United Kingdom',
		established: 1895,
		logo: '/images/schools/logos/lse-logo.svg',
		crest: '/images/schools/crests/lse-crest.svg',
		colors: {
			primary: '#32006A',
			secondary: '#FFD700',
		},
		league: 'russell_group',
		prestigeScore: 92,
		rankings: {
			national: 5,
			global: 49,
			subject: {
				Economics: 2,
				Politics: 1,
				'International Relations': 2,
			},
		},
		subjects: [
			'Economics',
			'Politics',
			'International Relations',
			'Law',
			'Management',
			'Philosophy',
		],
		specialisms: ['Economics and Finance', 'Political Science'],
		entryRequirements: 'A*AA minimum, subject-specific requirements vary',
		acceptanceRate: 35.0,
		studentCount: 5,
		website: 'https://www.lse.ac.uk',
		admissions: 'https://www.lse.ac.uk/admissions',
		description:
			"The world's leading social science institution with an international reach.",
		motto: 'Rerum cognoscere causas',
		featured: true,
		priority: 6,
	},
	{
		id: 'eton-college',
		name: 'Eton College',
		shortName: 'Eton',
		category: 'independent',
		type: 'school',
		location: 'Windsor, Berkshire',
		city: 'Windsor',
		country: 'United Kingdom',
		established: 1440,
		logo: '/images/schools/logos/eton-logo.svg',
		crest: '/images/schools/crests/eton-crest.svg',
		badge: '/images/schools/badges/eton-badge.svg',
		colors: {
			primary: '#000080',
			secondary: '#FFD700',
		},
		league: 'independent',
		prestigeScore: 100,
		subjects: [
			'Classical Studies',
			'Modern Languages',
			'Sciences',
			'Mathematics',
			'English',
			'History',
		],
		specialisms: ['13+ Common Entrance', 'Scholarship Preparation'],
		entryRequirements: '13+ Common Entrance or Scholarship examinations',
		acceptanceRate: 20.0,
		studentCount: 17,
		website: 'https://www.etoncollege.com',
		admissions: 'https://www.etoncollege.com/admissions',
		description:
			'The most prestigious independent school in the world, educating British royalty and prime ministers.',
		motto: 'Floreat Etona',
		featured: true,
		priority: 1,
	},
	{
		id: 'harrow-school',
		name: 'Harrow School',
		shortName: 'Harrow',
		category: 'independent',
		type: 'school',
		location: 'Harrow on the Hill, London',
		city: 'London',
		country: 'United Kingdom',
		established: 1572,
		logo: '/images/schools/logos/harrow-logo.svg',
		crest: '/images/schools/crests/harrow-crest.svg',
		badge: '/images/schools/badges/harrow-badge.svg',
		colors: {
			primary: '#003366',
			secondary: '#FFFFFF',
		},
		league: 'independent',
		prestigeScore: 98,
		subjects: [
			'English Literature',
			'History',
			'Modern Languages',
			'Sciences',
			'Mathematics',
		],
		specialisms: ['13+ Entry Preparation', 'Academic Scholarship Training'],
		entryRequirements: '13+ entrance examinations and interviews',
		acceptanceRate: 22.0,
		studentCount: 12,
		website: 'https://www.harrowschool.org.uk',
		admissions: 'https://www.harrowschool.org.uk/admissions',
		description:
			'One of the original nine English public schools, known for its distinctive traditions and academic excellence.',
		motto: 'Stet fortuna domus',
		featured: true,
		priority: 2,
	},
	{
		id: 'westminster-school',
		name: 'Westminster School',
		shortName: 'Westminster',
		category: 'independent',
		type: 'school',
		location: 'Westminster, London',
		city: 'London',
		country: 'United Kingdom',
		established: 1560,
		logo: '/images/schools/logos/westminster-logo.svg',
		crest: '/images/schools/crests/westminster-crest.svg',
		badge: '/images/schools/badges/westminster-badge.svg',
		colors: {
			primary: '#800080',
			secondary: '#FFD700',
		},
		league: 'independent',
		prestigeScore: 97,
		subjects: [
			'Classics',
			'Mathematics',
			'English',
			'History',
			'Modern Languages',
			'Sciences',
		],
		specialisms: ['11+ and 13+ Entry', 'Oxbridge Preparation'],
		entryRequirements: '11+ or 13+ entrance examinations',
		acceptanceRate: 25.0,
		studentCount: 18,
		website: 'https://www.westminster.org.uk',
		admissions: 'https://www.westminster.org.uk/admissions',
		description:
			'Located in the heart of Westminster, consistently ranking as one of the top academic schools in the country.',
		motto: 'Dat Deus incrementum',
		featured: true,
		priority: 3,
	},
	{
		id: 'st-pauls-school',
		name: "St Paul's School",
		shortName: "St Paul's",
		category: 'independent',
		type: 'school',
		location: 'Hammersmith, London',
		city: 'London',
		country: 'United Kingdom',
		established: 1509,
		logo: '/images/schools/logos/st-pauls-logo.svg',
		crest: '/images/schools/crests/st-pauls-crest.svg',
		badge: '/images/schools/badges/st-pauls-badge.svg',
		colors: {
			primary: '#8B0000',
			secondary: '#FFD700',
		},
		league: 'independent',
		prestigeScore: 96,
		subjects: [
			'Classics',
			'Mathematics',
			'Natural Sciences',
			'History',
			'Modern Languages',
		],
		specialisms: ['13+ Entry Preparation', 'Academic Excellence'],
		entryRequirements: '13+ entrance examinations and assessments',
		acceptanceRate: 23.0,
		studentCount: 14,
		website: 'https://www.stpaulsschool.org.uk',
		admissions: 'https://www.stpaulsschool.org.uk/admissions',
		description:
			'One of the nine original English public schools, renowned for academic achievement and Oxbridge preparation.',
		motto: 'Fide et literis',
		featured: true,
		priority: 4,
	},
	{
		id: 'highgate-school',
		name: 'Highgate School',
		shortName: 'Highgate',
		category: 'independent',
		type: 'school',
		location: 'North Hill, Highgate, London N6 4AY',
		city: 'London',
		country: 'United Kingdom',
		established: 1565,
		logo: '/images/schools/logos/highgate-logo.svg',
		crest: '/images/schools/crests/highgate-crest.svg',
		badge: '/images/schools/badges/highgate-badge.svg',
		colors: {
			primary: '#8B0000',
			secondary: '#FFD700',
		},
		league: 'independent',
		prestigeScore: 90,
		subjects: [
			'English Literature',
			'History',
			'Mathematics',
			'Sciences',
			'Modern Languages',
			'Classics',
		],
		specialisms: ['11+ and 13+ Entry', 'Academic Excellence'],
		entryRequirements: '11+ or 13+ entrance examinations and interviews',
		acceptanceRate: 18.0,
		studentCount: 23,
		website: 'https://www.highgateschool.org.uk',
		admissions: 'https://www.highgateschool.org.uk/admissions',
		description:
			'An independent co-educational day school in North London, renowned for its academic excellence and historic traditions.',
		motto: 'Altissima quaeque',
		featured: true,
		priority: 1,
	},
	{
		id: 'tiffin-school',
		name: "The Tiffin Boys' School",
		shortName: 'Tiffin Boys',
		category: 'grammar',
		type: 'school',
		location: 'Kingston upon Thames, Surrey',
		city: 'Kingston upon Thames',
		country: 'United Kingdom',
		established: 1874,
		logo: '/images/schools/logos/tiffin-boys-logo.svg',
		crest: '/images/schools/crests/tiffin-boys-crest.svg',
		colors: {
			primary: '#8B0000',
			secondary: '#FFD700',
		},
		league: 'grammar',
		prestigeScore: 88,
		subjects: [
			'Mathematics',
			'Sciences',
			'Computing',
			'Modern Languages',
			'English',
		],
		specialisms: ['11+ Excellence', 'STEM Specialisation'],
		entryRequirements: '11+ examination (highly competitive)',
		acceptanceRate: 10.0,
		studentCount: 11,
		website: 'https://www.tiffinschool.co.uk',
		description:
			'One of the most academically selective grammar schools, regularly topping national league tables.',
		featured: true,
		priority: 2,
	},
	{
		id: 'le-rosey',
		name: 'Institut Le Rosey',
		shortName: 'Le Rosey',
		category: 'international',
		type: 'school',
		location: 'Rolle, Switzerland',
		city: 'Rolle',
		country: 'Switzerland',
		established: 1880,
		logo: '/images/schools/logos/le-rosey-logo.svg',
		crest: '/images/schools/crests/le-rosey-crest.svg',
		colors: {
			primary: '#8B0000',
			secondary: '#FFD700',
		},
		league: 'international',
		prestigeScore: 95,
		subjects: [
			'International Baccalaureate',
			'Modern Languages',
			'Arts',
			'Sciences',
		],
		specialisms: ['International Baccalaureate', 'Multilingual Education'],
		entryRequirements: 'Comprehensive assessment and interviews',
		acceptanceRate: 22,
		studentCount: 3,
		website: 'https://www.rosey.ch',
		description:
			"The world's most expensive boarding school, educating royalty and international elite.",
		motto: 'Une École pour la Vie',
		featured: true,
		priority: 1,
	},
] as const;
export const getSchoolsByCategory = (
	category: SchoolCategory,
): readonly EliteSchool[] => {
	return eliteSchoolsDatabase.filter((school) => school.category === category);
};
export const getFeaturedSchools = (): readonly EliteSchool[] => {
	return eliteSchoolsDatabase
		.filter((school) => school.featured)
		.sort((a, b) => (a.priority || 999) - (b.priority || 999));
};
export const getSchoolById = (id: string): EliteSchool | undefined => {
	return eliteSchoolsDatabase.find((school) => school.id === id);
};
export const getTopSchoolsByPrestige = (
	limit: number = 10,
): readonly EliteSchool[] => {
	return eliteSchoolsDatabase
		.slice()
		.sort((a, b) => b.prestigeScore - a.prestigeScore)
		.slice(0, limit);
};
export interface SchoolInteraction {
	readonly schoolId: string;
	readonly interactionType:
		| 'hover'
		| 'click'
		| 'modal_open'
		| 'modal_close'
		| 'website_visit';
	readonly timestamp: Date;
	readonly category?: SchoolCategory;
	readonly metadata?: Record<string, any>;
}
export const trackSchoolInteraction = (
	interaction: SchoolInteraction,
): void => {
	if (typeof window !== 'undefined' && 'gtag' in window) {
		(window as any).gtag('event', 'school_interaction', {
			event_category: 'carousel',
			event_label: interaction.schoolId,
			interaction_type: interaction.interactionType,
			school_category: interaction.category,
			custom_parameters: interaction.metadata,
		});
	}
};
