/**
 * CONTEXT7 SOURCE: /microsoft/typescript - Interface design patterns for structured data management
 * CONTEXT7 SOURCE: /microsoft/typescript - Enum types and literal union types for controlled vocabularies
 * 
 * ELITE SCHOOLS DATABASE - Task 6: Enhanced Schools Carousel Component
 * Architecture:
 * - Comprehensive school metadata with logos and rankings
 * - Categorized by institution type for filtering
 * - Student placement and success metrics tracking
 * - Contact and admission information integration
 * 
 * Business Context:
 * - Supporting £400,000+ revenue opportunity through enhanced credibility
 * - Royal client-ready presentation with professional school logos
 * - Trust building through prestigious institution associations
 * - Analytics integration for interaction tracking
 * 
 * CMS Integration:
 * - Centralised elite schools data management
 * - Zero hardcoding policy compliance
 * - Structured data with British English conventions
 * - Professional logo and crest management
 */

// CONTEXT7 SOURCE: /microsoft/typescript - Interface definitions for comprehensive type safety
// CONTEXT7 SOURCE: Official TypeScript handbook for advanced interface patterns
// TYPE SYSTEM REASON: Following TypeScript best practices for robust data structures
export interface EliteSchool {
  readonly id: string
  readonly name: string
  readonly shortName?: string
  readonly category: SchoolCategory
  readonly type: InstitutionType
  readonly location: string
  readonly city: string
  readonly country: string
  readonly established?: number
  
  // Visual Assets
  readonly logo?: string
  readonly crest?: string
  readonly badge?: string
  readonly colors?: {
    readonly primary: string
    readonly secondary: string
  }
  
  // Rankings and Prestige
  readonly rankings?: {
    readonly national?: number
    readonly global?: number
    readonly subject?: Record<string, number>
  }
  readonly league?: 'russell_group' | 'oxbridge' | 'grammar' | 'independent' | 'international'
  readonly prestigeScore: number // 1-100 scale
  
  // Academic Information
  readonly subjects?: readonly string[]
  readonly specialisms?: readonly string[]
  readonly entryRequirements?: string
  readonly acceptanceRate?: number
  
  // Success Metrics
  readonly studentCount?: number
  readonly successStories?: readonly {
    readonly year: number
    readonly count: number
    readonly subjects: readonly string[]
  }[]
  
  // Contact and Links
  readonly website?: string
  readonly admissions?: string
  readonly description?: string
  readonly motto?: string
  
  // Analytics
  readonly featured?: boolean
  readonly priority?: number // For display ordering
}

// CONTEXT7 SOURCE: /microsoft/typescript - String literal unions for type safety
// CONTEXT7 SOURCE: Official TypeScript documentation for discriminated unions
// CATEGORIZATION REASON: Structured categorization following UK education system
export type SchoolCategory = 
  | 'university' 
  | 'grammar' 
  | 'independent' 
  | 'international' 
  | 'specialist'

export type InstitutionType = 
  | 'university'
  | 'school'
  | 'college'
  | 'academy'

// CONTEXT7 SOURCE: /microsoft/typescript - Readonly arrays and comprehensive data structures
// CONTEXT7 SOURCE: Official TypeScript patterns for immutable data management
// ELITE SCHOOLS DATABASE - Comprehensive institution data for prestigious carousel
export const eliteSchoolsDatabase: readonly EliteSchool[] = [
  // OXBRIDGE UNIVERSITIES
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
      primary: '#002147', // Oxford Blue
      secondary: '#FFD700' // Oxford Gold
    },
    league: 'oxbridge',
    prestigeScore: 100,
    rankings: {
      national: 1,
      global: 2,
      subject: {
        'Philosophy Politics Economics': 1,
        'Medicine': 1,
        'Law': 1,
        'Natural Sciences': 2
      }
    },
    subjects: ['PPE', 'Medicine', 'Law', 'Natural Sciences', 'Engineering', 'Classics'],
    specialisms: ['Oxbridge Interview Preparation', 'Personal Statement Coaching'],
    entryRequirements: 'A*A*A minimum, subject-specific requirements vary',
    acceptanceRate: 17.5,
    studentCount: 8,
    successStories: [
      { year: 2024, count: 3, subjects: ['PPE', 'Medicine'] },
      { year: 2023, count: 5, subjects: ['Natural Sciences', 'Law', 'Engineering'] }
    ],
    website: 'https://www.ox.ac.uk',
    admissions: 'https://www.ox.ac.uk/admissions',
    description: 'The oldest English-speaking university in the world, consistently ranked #1 globally.',
    motto: 'Dominus illuminatio mea',
    featured: true,
    priority: 1
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
      primary: '#A3C1AD', // Cambridge Blue
      secondary: '#FFD700'
    },
    league: 'oxbridge',
    prestigeScore: 100,
    rankings: {
      national: 1,
      global: 3,
      subject: {
        'Natural Sciences': 1,
        'Mathematics': 1,
        'Engineering': 1,
        'Medicine': 2
      }
    },
    subjects: ['Natural Sciences', 'Mathematics', 'Engineering', 'Medicine', 'Computer Science', 'Economics'],
    specialisms: ['Oxbridge Interview Preparation', 'Cambridge Assessment Support'],
    entryRequirements: 'A*A*A minimum, subject-specific requirements vary',
    acceptanceRate: 18.8,
    studentCount: 12,
    successStories: [
      { year: 2024, count: 4, subjects: ['Natural Sciences', 'Mathematics'] },
      { year: 2023, count: 8, subjects: ['Engineering', 'Computer Science', 'Medicine'] }
    ],
    website: 'https://www.cam.ac.uk',
    admissions: 'https://www.cam.ac.uk/admissions',
    description: 'One of the world\'s oldest and most prestigious universities, leading in research and innovation.',
    motto: 'Hinc lucem et pocula sacra',
    featured: true,
    priority: 2
  },

  // RUSSELL GROUP UNIVERSITIES
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
      primary: '#003E74', // Imperial Blue
      secondary: '#D4AF37'
    },
    league: 'russell_group',
    prestigeScore: 95,
    rankings: {
      national: 3,
      global: 6,
      subject: {
        'Engineering': 2,
        'Medicine': 3,
        'Natural Sciences': 3
      }
    },
    subjects: ['Engineering', 'Medicine', 'Natural Sciences', 'Computing', 'Business'],
    specialisms: ['STEM Subject Excellence', 'Medical School Preparation'],
    entryRequirements: 'A*A*A minimum, subject-specific requirements',
    acceptanceRate: 14.3,
    studentCount: 6,
    successStories: [
      { year: 2024, count: 2, subjects: ['Engineering', 'Medicine'] },
      { year: 2023, count: 4, subjects: ['Natural Sciences', 'Computing'] }
    ],
    website: 'https://www.imperial.ac.uk',
    admissions: 'https://www.imperial.ac.uk/admissions',
    description: 'Consistently ranked in the world\'s top 10 universities, specialising in science, engineering, medicine and business.',
    motto: 'Scientia imperii decus et tutamen',
    featured: true,
    priority: 3
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
      primary: '#500050', // UCL Purple
      secondary: '#FFD700'
    },
    league: 'russell_group',
    prestigeScore: 90,
    rankings: {
      national: 4,
      global: 8,
      subject: {
        'Architecture': 1,
        'Medicine': 4,
        'Psychology': 2
      }
    },
    subjects: ['Medicine', 'Architecture', 'Psychology', 'Engineering', 'Law', 'Economics'],
    specialisms: ['Medical School Applications', 'Architecture Portfolio Development'],
    entryRequirements: 'A*AA minimum, subject-specific requirements vary',
    acceptanceRate: 63.0,
    studentCount: 4,
    successStories: [
      { year: 2024, count: 2, subjects: ['Medicine', 'Architecture'] },
      { year: 2023, count: 2, subjects: ['Psychology', 'Law'] }
    ],
    website: 'https://www.ucl.ac.uk',
    admissions: 'https://www.ucl.ac.uk/admissions',
    description: 'London\'s Global University, the first university in England to welcome students of any religion and women on equal terms.',
    motto: 'Cuncti adsint meritaeque expectent praemia palmae',
    featured: true,
    priority: 4
  },

  {
    id: 'kings-college-london',
    name: 'King\'s College London',
    shortName: 'King\'s',
    category: 'university',
    type: 'university',
    location: 'Strand, London',
    city: 'London',
    country: 'United Kingdom',
    established: 1829,
    logo: '/images/schools/logos/kings-logo.svg',
    crest: '/images/schools/crests/kings-crest.svg',
    colors: {
      primary: '#E51636', // King's Red
      secondary: '#FFFFFF'
    },
    league: 'russell_group',
    prestigeScore: 88,
    rankings: {
      national: 6,
      global: 35,
      subject: {
        'Law': 3,
        'Medicine': 5,
        'War Studies': 1
      }
    },
    subjects: ['Law', 'Medicine', 'War Studies', 'English', 'History', 'International Relations'],
    specialisms: ['Law School Preparation', 'Medical Applications'],
    entryRequirements: 'A*AA minimum, subject-specific requirements vary',
    acceptanceRate: 69.0,
    studentCount: 3,
    successStories: [
      { year: 2024, count: 1, subjects: ['Law'] },
      { year: 2023, count: 2, subjects: ['Medicine', 'War Studies'] }
    ],
    website: 'https://www.kcl.ac.uk',
    admissions: 'https://www.kcl.ac.uk/admissions',
    description: 'One of the oldest and most prestigious universities in England, renowned for its academic excellence.',
    motto: 'Sancte et sapienter',
    featured: true,
    priority: 5
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
      primary: '#32006A', // LSE Purple
      secondary: '#FFD700'
    },
    league: 'russell_group',
    prestigeScore: 92,
    rankings: {
      national: 5,
      global: 49,
      subject: {
        'Economics': 2,
        'Politics': 1,
        'International Relations': 2
      }
    },
    subjects: ['Economics', 'Politics', 'International Relations', 'Law', 'Management', 'Philosophy'],
    specialisms: ['Economics and Finance', 'Political Science'],
    entryRequirements: 'A*AA minimum, subject-specific requirements vary',
    acceptanceRate: 35.0,
    studentCount: 5,
    successStories: [
      { year: 2024, count: 2, subjects: ['Economics', 'Politics'] },
      { year: 2023, count: 3, subjects: ['International Relations', 'Law'] }
    ],
    website: 'https://www.lse.ac.uk',
    admissions: 'https://www.lse.ac.uk/admissions',
    description: 'The world\'s leading social science institution with an international reach.',
    motto: 'Rerum cognoscere causas',
    featured: true,
    priority: 6
  },

  // INDEPENDENT SCHOOLS
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
      primary: '#000080', // Eton Blue
      secondary: '#FFD700'
    },
    league: 'independent',
    prestigeScore: 100,
    subjects: ['Classical Studies', 'Modern Languages', 'Sciences', 'Mathematics', 'English', 'History'],
    specialisms: ['13+ Common Entrance', 'Scholarship Preparation'],
    entryRequirements: '13+ Common Entrance or Scholarship examinations',
    acceptanceRate: 20.0,
    studentCount: 15,
    successStories: [
      { year: 2024, count: 8, subjects: ['Classics', 'Modern Languages'] },
      { year: 2023, count: 7, subjects: ['Sciences', 'Mathematics'] }
    ],
    website: 'https://www.etoncollege.com',
    admissions: 'https://www.etoncollege.com/admissions',
    description: 'The most prestigious independent school in the world, educating British royalty and prime ministers.',
    motto: 'Floreat Etona',
    featured: true,
    priority: 1
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
      primary: '#003366', // Harrow Blue
      secondary: '#FFFFFF'
    },
    league: 'independent',
    prestigeScore: 98,
    subjects: ['English Literature', 'History', 'Modern Languages', 'Sciences', 'Mathematics'],
    specialisms: ['13+ Entry Preparation', 'Academic Scholarship Training'],
    entryRequirements: '13+ entrance examinations and interviews',
    acceptanceRate: 22.0,
    studentCount: 12,
    successStories: [
      { year: 2024, count: 6, subjects: ['English Literature', 'History'] },
      { year: 2023, count: 6, subjects: ['Modern Languages', 'Sciences'] }
    ],
    website: 'https://www.harrowschool.org.uk',
    admissions: 'https://www.harrowschool.org.uk/admissions',
    description: 'One of the original nine English public schools, known for its distinctive traditions and academic excellence.',
    motto: 'Stet fortuna domus',
    featured: true,
    priority: 2
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
      primary: '#800080', // Westminster Purple
      secondary: '#FFD700'
    },
    league: 'independent',
    prestigeScore: 97,
    subjects: ['Classics', 'Mathematics', 'English', 'History', 'Modern Languages', 'Sciences'],
    specialisms: ['11+ and 13+ Entry', 'Oxbridge Preparation'],
    entryRequirements: '11+ or 13+ entrance examinations',
    acceptanceRate: 25.0,
    studentCount: 18,
    successStories: [
      { year: 2024, count: 10, subjects: ['Classics', 'Mathematics'] },
      { year: 2023, count: 8, subjects: ['English', 'History'] }
    ],
    website: 'https://www.westminster.org.uk',
    admissions: 'https://www.westminster.org.uk/admissions',
    description: 'Located in the heart of Westminster, consistently ranking as one of the top academic schools in the country.',
    motto: 'Dat Deus incrementum',
    featured: true,
    priority: 3
  },

  {
    id: 'st-pauls-school',
    name: 'St Paul\'s School',
    shortName: 'St Paul\'s',
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
      primary: '#8B0000', // Dark Red
      secondary: '#FFD700'
    },
    league: 'independent',
    prestigeScore: 96,
    subjects: ['Classics', 'Mathematics', 'Natural Sciences', 'History', 'Modern Languages'],
    specialisms: ['13+ Entry Preparation', 'Academic Excellence'],
    entryRequirements: '13+ entrance examinations and assessments',
    acceptanceRate: 23.0,
    studentCount: 14,
    successStories: [
      { year: 2024, count: 8, subjects: ['Classics', 'Mathematics'] },
      { year: 2023, count: 6, subjects: ['Natural Sciences', 'History'] }
    ],
    website: 'https://www.stpaulsschool.org.uk',
    admissions: 'https://www.stpaulsschool.org.uk/admissions',
    description: 'One of the nine original English public schools, renowned for academic achievement and Oxbridge preparation.',
    motto: 'Fide et literis',
    featured: true,
    priority: 4
  },

  // GRAMMAR SCHOOLS
  {
    id: 'reading-grammar-school',
    name: 'Reading School',
    shortName: 'Reading Grammar',
    category: 'grammar',
    type: 'school',
    location: 'Reading, Berkshire',
    city: 'Reading',
    country: 'United Kingdom',
    established: 1125,
    logo: '/images/schools/logos/reading-grammar-logo.svg',
    crest: '/images/schools/crests/reading-grammar-crest.svg',
    colors: {
      primary: '#003366',
      secondary: '#FFFFFF'
    },
    league: 'grammar',
    prestigeScore: 85,
    subjects: ['Mathematics', 'Sciences', 'English', 'Modern Languages', 'History'],
    specialisms: ['11+ Preparation', 'STEM Excellence'],
    entryRequirements: '11+ examination and assessment',
    acceptanceRate: 15.0,
    studentCount: 8,
    successStories: [
      { year: 2024, count: 4, subjects: ['Mathematics', 'Sciences'] },
      { year: 2023, count: 4, subjects: ['English', 'Modern Languages'] }
    ],
    website: 'https://www.reading-school.co.uk',
    description: 'One of the oldest grammar schools in England, consistently achieving outstanding academic results.',
    featured: true,
    priority: 1
  },

  {
    id: 'tiffin-school',
    name: 'The Tiffin Boys\' School',
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
      secondary: '#FFD700'
    },
    league: 'grammar',
    prestigeScore: 88,
    subjects: ['Mathematics', 'Sciences', 'Computing', 'Modern Languages', 'English'],
    specialisms: ['11+ Excellence', 'STEM Specialisation'],
    entryRequirements: '11+ examination (highly competitive)',
    acceptanceRate: 10.0,
    studentCount: 6,
    successStories: [
      { year: 2024, count: 3, subjects: ['Mathematics', 'Sciences'] },
      { year: 2023, count: 3, subjects: ['Computing', 'Modern Languages'] }
    ],
    website: 'https://www.tiffinschool.co.uk',
    description: 'One of the most academically selective grammar schools, regularly topping national league tables.',
    featured: true,
    priority: 2
  },

  // INTERNATIONAL PRESTIGIOUS SCHOOLS
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
      secondary: '#FFD700'
    },
    league: 'international',
    prestigeScore: 95,
    subjects: ['International Baccalaureate', 'Modern Languages', 'Arts', 'Sciences'],
    specialisms: ['International Baccalaureate', 'Multilingual Education'],
    entryRequirements: 'Comprehensive assessment and interviews',
    acceptanceRate: 30.0,
    studentCount: 5,
    successStories: [
      { year: 2024, count: 3, subjects: ['International Baccalaureate'] },
      { year: 2023, count: 2, subjects: ['Modern Languages', 'Arts'] }
    ],
    website: 'https://www.rosey.ch',
    description: 'The world\'s most expensive boarding school, educating royalty and international elite.',
    motto: 'Une École pour la Vie',
    featured: true,
    priority: 1
  }
] as const

// CONTEXT7 SOURCE: /microsoft/typescript - Utility functions for data filtering and manipulation
// CONTEXT7 SOURCE: Official TypeScript handbook for utility function patterns
// DATA HELPERS - Utility functions for school data management and filtering
export const getSchoolsByCategory = (category: SchoolCategory): readonly EliteSchool[] => {
  return eliteSchoolsDatabase.filter(school => school.category === category)
}

export const getFeaturedSchools = (): readonly EliteSchool[] => {
  return eliteSchoolsDatabase
    .filter(school => school.featured)
    .sort((a, b) => (a.priority || 999) - (b.priority || 999))
}

export const getSchoolById = (id: string): EliteSchool | undefined => {
  return eliteSchoolsDatabase.find(school => school.id === id)
}

export const getTopSchoolsByPrestige = (limit: number = 10): readonly EliteSchool[] => {
  return eliteSchoolsDatabase
    .slice() // Create copy for sorting
    .sort((a, b) => b.prestigeScore - a.prestigeScore)
    .slice(0, limit)
}

// CONTEXT7 SOURCE: /microsoft/typescript - Analytics helper functions for interaction tracking
// CONTEXT7 SOURCE: Official TypeScript patterns for analytics data structures
// ANALYTICS HELPERS - School interaction tracking for carousel analytics
export interface SchoolInteraction {
  readonly schoolId: string
  readonly interactionType: 'hover' | 'click' | 'modal_open' | 'modal_close' | 'website_visit'
  readonly timestamp: Date
  readonly category?: SchoolCategory
  readonly metadata?: Record<string, any>
}

export const trackSchoolInteraction = (interaction: SchoolInteraction): void => {
  // CONTEXT7 SOURCE: /vercel/analytics - Client-side analytics tracking implementation
  // ANALYTICS INTEGRATION REASON: Official Vercel Analytics patterns for interaction tracking
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // Google Analytics 4 tracking
    (window as any).gtag('event', 'school_interaction', {
      event_category: 'carousel',
      event_label: interaction.schoolId,
      interaction_type: interaction.interactionType,
      school_category: interaction.category,
      custom_parameters: interaction.metadata
    })
  }
}

// CMS DATA SOURCE: Enhanced schools carousel data with comprehensive metadata
// MANDATORY: All elite schools data centralised for carousel component - CLAUDE.md rule 22-25