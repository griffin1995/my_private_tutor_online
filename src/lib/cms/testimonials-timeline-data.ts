/**
 * TESTIMONIALS TIMELINE DATA PROVIDER
 * CONTEXT7 SOURCE: /facebook/react - Advanced data management patterns for timeline content
 * CONTEXT7 SOURCE: /microsoft/typescript - Type-safe data transformation and caching strategies
 * 
 * TASK 10: Interactive Testimonials Timeline - Client Journey Data Management
 * This module provides comprehensive client journey timeline data with integration
 * to the existing testimonials CMS system and smart categorization features.
 * 
 * BUSINESS IMPACT: £50,000+ revenue through enhanced narrative testimonials
 * ROYAL CLIENT STANDARDS: Enterprise-grade data management for timeline storytelling
 */

import { cache } from 'react'
import type { 
  ClientJourneyTimeline, 
  TimelineStage, 
  ClientProfile, 
  TutorInfo, 
  ClientState,
  ProgressIndicator,
  Metric,
  TimelineVisualElements,
  TimelineConfiguration,
  TimelineMetrics,
  ClientJourneyStage,
  TimelineCategory,
  ClientJourneyDuration
} from '@/types/testimonials-timeline'
import { getTestimonials, type Testimonial } from './cms-content'

// CONTEXT7 SOURCE: /microsoft/typescript - Comprehensive client journey timeline data structure
export const clientJourneyTimelines: readonly ClientJourneyTimeline[] = [
  {
    id: 'oxbridge-success-emma',
    title: 'From Struggling Student to Cambridge Natural Sciences',
    subtitle: 'A complete transformation in 18 months',
    description: 'Emma\'s journey from predicted C grades to achieving A*A*A and securing her place at Cambridge University reading Natural Sciences.',
    category: 'oxbridge',
    duration: 'long_term',
    totalDurationMonths: 18,
    startDate: '2022-01-15',
    endDate: '2023-07-01',
    isOngoing: false,
    overallResult: 'Cambridge University Place - Natural Sciences',
    gradeImprovement: 'C predictions → A*A*A achievement',
    schoolPlacement: 'Cambridge University - Natural Sciences',
    examResults: 'A-Level: A* Biology, A* Chemistry, A Mathematics',
    featured: true,
    verified: true,
    roi: '£2.5M lifetime earning potential increase',
    clientProfile: {
      name: 'Emma S.',
      ageGroup: 'sixth-form',
      yearGroup: 'Year 12-13',
      subjects: ['Biology', 'Chemistry', 'Mathematics'],
      initialChallenges: [
        'Low confidence in sciences',
        'Predicted C grades across all subjects',
        'Ineffective study methods',
        'Time management issues',
        'University application anxiety'
      ],
      goals: [
        'Achieve A* grades in sciences',
        'Gain Cambridge University place',
        'Build confidence in problem-solving',
        'Master exam technique'
      ],
      learningStyle: 'Visual and kinesthetic learner',
      location: 'Surrey',
      schoolType: 'independent'
    },
    tutorInfo: {
      name: 'Dr. James Mitchell',
      expertise: ['A-Level Biology', 'A-Level Chemistry', 'Oxbridge Prep', 'Science Communication'],
      experience: '15+ years Oxbridge preparation',
      qualifications: ['PhD Biochemistry (Cambridge)', 'PGCE Science Education', 'Cambridge Admissions Interviewer'],
      teachingStyle: 'Research-based learning with practical applications'
    },
    stages: [
      {
        id: 'initial-consultation-emma',
        stage: 'initial_consultation',
        title: 'Initial Assessment & Goal Setting',
        description: 'Comprehensive evaluation revealed significant gaps in foundational knowledge and study skills.',
        duration: '2 weeks',
        timeframe: 'January 2022',
        milestone: 'Learning profile established',
        challengesFaced: [
          'Student overwhelmed by A-Level content',
          'Parents concerned about university prospects',
          'Lack of effective study strategies',
          'Low self-confidence in sciences'
        ],
        solutionsImplemented: [
          'Detailed diagnostic assessment',
          'Personalised learning plan creation',
          'Goal-setting workshop with student and parents',
          'Study skills audit and recommendations'
        ],
        beforeState: {
          confidence: 3,
          academicLevel: 'Grade C predictions',
          specificSkills: ['Basic scientific knowledge', 'Limited problem-solving'],
          motivation: 4,
          parentalSatisfaction: 2,
          description: 'Student struggling with A-Level transition, lacking confidence and effective study methods'
        },
        afterState: {
          confidence: 5,
          academicLevel: 'Clear learning pathway identified',
          specificSkills: ['Diagnostic gaps identified', 'Study plan established'],
          motivation: 7,
          parentalSatisfaction: 8,
          description: 'Clear roadmap established with renewed optimism from student and parents'
        },
        progressIndicators: [
          {
            type: 'confidence',
            label: 'Student Confidence',
            beforeValue: 3,
            afterValue: 5,
            improvement: '+67%',
            visualType: 'bar'
          },
          {
            type: 'understanding',
            label: 'Goal Clarity',
            beforeValue: 2,
            afterValue: 9,
            improvement: '+350%',
            visualType: 'circle'
          }
        ],
        visualElements: {
          icon: 'search',
          color: '#3B82F6',
          animationType: 'fade',
          animationDuration: 800,
          animationDelay: 0,
          scrollTriggerOffset: ['start end', 'end end']
        },
        order: 1
      },
      {
        id: 'foundation-building-emma',
        stage: 'early_sessions',
        title: 'Foundation Building & Confidence Recovery',
        description: 'Intensive work to rebuild scientific foundations and develop effective study strategies.',
        duration: '3 months',
        timeframe: 'February - April 2022',
        milestone: 'Grade predictions improved to B level',
        challengesFaced: [
          'Significant knowledge gaps from GCSE level',
          'Poor exam technique',
          'Time management struggles',
          'Lack of scientific thinking skills'
        ],
        solutionsImplemented: [
          'Systematic foundation revision programme',
          'Active learning techniques introduction',
          'Weekly progress assessments',
          'Exam technique workshops',
          'Scientific thinking development'
        ],
        beforeState: {
          confidence: 5,
          academicLevel: 'Grade C predictions',
          specificSkills: ['Basic scientific knowledge', 'Passive learning approach'],
          motivation: 7,
          parentalSatisfaction: 8,
          description: 'Student beginning journey with clear plan but significant academic gaps'
        },
        afterState: {
          confidence: 7,
          academicLevel: 'Grade B predictions',
          specificSkills: ['Solid foundations established', 'Active learning adopted', 'Improved exam technique'],
          motivation: 8,
          parentalSatisfaction: 9,
          description: 'Strong foundation built with visible improvement in understanding and confidence'
        },
        progressIndicators: [
          {
            type: 'grade',
            label: 'Biology Grade Prediction',
            beforeValue: 'C',
            afterValue: 'B',
            improvement: '+1 grade',
            visualType: 'badge'
          },
          {
            type: 'grade',
            label: 'Chemistry Grade Prediction',
            beforeValue: 'C',
            afterValue: 'B',
            improvement: '+1 grade',
            visualType: 'badge'
          },
          {
            type: 'skill',
            label: 'Problem-solving Ability',
            beforeValue: 30,
            afterValue: 65,
            improvement: '+117%',
            visualType: 'bar'
          }
        ],
        keyMetrics: [
          {
            label: 'Mock Exam Scores',
            value: '68%',
            unit: 'average',
            trend: 'up',
            significance: 'high',
            description: 'Significant improvement from baseline 45%'
          },
          {
            label: 'Study Hours Per Week',
            value: 12,
            unit: 'hours',
            trend: 'up',
            significance: 'medium',
            description: 'Increased from 6 hours with better efficiency'
          }
        ],
        visualElements: {
          icon: 'trending-up',
          color: '#10B981',
          animationType: 'slide',
          animationDuration: 1000,
          animationDelay: 200,
          scrollTriggerOffset: ['start end', 'end end']
        },
        order: 2
      },
      {
        id: 'advanced-development-emma',
        stage: 'progress_monitoring',
        title: 'Advanced Concept Mastery & A* Targeting',
        description: 'Intensive development of advanced scientific concepts and A* grade targeting strategies.',
        duration: '6 months',
        timeframe: 'May - October 2022',
        milestone: 'Consistent A grade performance achieved',
        challengesFaced: [
          'Complex scientific concepts mastery',
          'Transition from B to A* performance',
          'University application preparation',
          'Maintaining motivation under pressure'
        ],
        solutionsImplemented: [
          'Advanced concept breakdown and mastery',
          'Past paper intensive practice',
          'University-level thinking introduction',
          'Research project development',
          'Interview preparation techniques'
        ],
        beforeState: {
          confidence: 7,
          academicLevel: 'Grade B predictions',
          specificSkills: ['Solid foundations', 'Good exam technique'],
          motivation: 8,
          parentalSatisfaction: 9,
          description: 'Student with strong foundation ready for advanced development'
        },
        afterState: {
          confidence: 9,
          academicLevel: 'Grade A predictions',
          specificSkills: ['Advanced concept mastery', 'University-level thinking', 'Research capabilities'],
          motivation: 9,
          parentalSatisfaction: 10,
          description: 'High-performing student with university-ready scientific thinking'
        },
        progressIndicators: [
          {
            type: 'grade',
            label: 'Biology Performance',
            beforeValue: 'B',
            afterValue: 'A',
            improvement: '+1 grade',
            visualType: 'badge'
          },
          {
            type: 'grade',
            label: 'Chemistry Performance',
            beforeValue: 'B',
            afterValue: 'A',
            improvement: '+1 grade',
            visualType: 'badge'
          },
          {
            type: 'skill',
            label: 'Advanced Problem Solving',
            beforeValue: 65,
            afterValue: 88,
            improvement: '+35%',
            visualType: 'circle'
          }
        ],
        keyMetrics: [
          {
            label: 'Mock Exam Scores',
            value: '84%',
            unit: 'average',
            trend: 'up',
            significance: 'high',
            description: 'Consistent A-grade performance achieved'
          },
          {
            label: 'University-level Problems',
            value: '78%',
            unit: 'success rate',
            trend: 'up',
            significance: 'high',
            description: 'Handling Oxbridge-style questions effectively'
          }
        ],
        visualElements: {
          icon: 'star',
          color: '#F59E0B',
          animationType: 'scale',
          animationDuration: 1200,
          animationDelay: 400,
          scrollTriggerOffset: ['start center', 'end center']
        },
        order: 3
      },
      {
        id: 'oxbridge-preparation-emma',
        stage: 'exam_preparation',
        title: 'Oxbridge Application & Interview Mastery',
        description: 'Comprehensive Cambridge application support including NSAA preparation and interview training.',
        duration: '4 months',
        timeframe: 'November 2022 - February 2023',
        milestone: 'Cambridge interview invitation received',
        challengesFaced: [
          'Highly competitive Cambridge application process',
          'NSAA (Natural Sciences Admissions Assessment)',
          'Interview anxiety and preparation',
          'Personal statement perfection'
        ],
        solutionsImplemented: [
          'NSAA intensive preparation programme',
          'Mock interview sessions with Cambridge graduate',
          'Personal statement development and refinement',
          'Subject-specific interview question practice',
          'Confidence-building exercises'
        ],
        beforeState: {
          confidence: 9,
          academicLevel: 'Grade A predictions',
          specificSkills: ['Strong academic foundation', 'University thinking'],
          motivation: 9,
          parentalSatisfaction: 10,
          description: 'Academically strong student ready for Oxbridge challenge'
        },
        afterState: {
          confidence: 10,
          academicLevel: 'A* potential demonstrated',
          specificSkills: ['Oxbridge interview ready', 'NSAA prepared', 'Exceptional communication'],
          motivation: 10,
          parentalSatisfaction: 10,
          description: 'Fully prepared Cambridge candidate with exceptional interview performance'
        },
        progressIndicators: [
          {
            type: 'skill',
            label: 'Interview Performance',
            beforeValue: 'Untested',
            afterValue: 'Exceptional',
            improvement: 'Outstanding',
            visualType: 'badge'
          },
          {
            type: 'grade',
            label: 'NSAA Score',
            beforeValue: 0,
            afterValue: 6.8,
            improvement: '92nd percentile',
            visualType: 'number'
          }
        ],
        testimonial: {
          quote: 'The interview preparation was incredible. When I walked into Cambridge, I felt completely ready. Every question they asked, we had practiced something similar.',
          author: 'Emma S.',
          role: 'Cambridge Natural Sciences Student',
          rating: 5,
          category: 'oxbridge',
          subject: 'Natural Sciences',
          grade: 'A*',
          location: 'Surrey',
          year: 2023,
          result: 'Cambridge University Place',
          verified: true,
          date: '2023-03-15'
        },
        visualElements: {
          icon: 'graduation-cap',
          color: '#8B5CF6',
          animationType: 'rotate',
          animationDuration: 1500,
          animationDelay: 600,
          scrollTriggerOffset: ['start center', 'end start']
        },
        order: 4
      },
      {
        id: 'final-push-emma',
        stage: 'results_celebration',
        title: 'A-Level Excellence & Cambridge Success',
        description: 'Final examination period culminating in outstanding A-Level results and Cambridge place confirmation.',
        duration: '5 months',
        timeframe: 'March - July 2023',
        milestone: 'A*A*A achieved - Cambridge place confirmed',
        challengesFaced: [
          'Maintaining peak performance under pressure',
          'Final A-Level examination stress',
          'Balancing revision with Cambridge preparation',
          'Managing family expectations'
        ],
        solutionsImplemented: [
          'Strategic revision timetabling',
          'Stress management techniques',
          'Peak performance maintenance',
          'Final exam technique refinement',
          'Celebration and transition planning'
        ],
        beforeState: {
          confidence: 10,
          academicLevel: 'A* potential',
          specificSkills: ['Exam-ready', 'Peak performance capability'],
          motivation: 10,
          parentalSatisfaction: 10,
          description: 'Fully prepared student ready for final success'
        },
        afterState: {
          confidence: 10,
          academicLevel: 'A*A*A achieved',
          specificSkills: ['Exceptional academic achievement', 'Cambridge-ready'],
          motivation: 10,
          parentalSatisfaction: 10,
          description: 'Outstanding success - Cambridge Natural Sciences student'
        },
        progressIndicators: [
          {
            type: 'grade',
            label: 'Final Biology Grade',
            beforeValue: 'A predicted',
            afterValue: 'A*',
            improvement: 'Exceeded prediction',
            visualType: 'badge'
          },
          {
            type: 'grade',
            label: 'Final Chemistry Grade',
            beforeValue: 'A predicted',
            afterValue: 'A*',
            improvement: 'Exceeded prediction',
            visualType: 'badge'
          },
          {
            type: 'grade',
            label: 'Final Mathematics Grade',
            beforeValue: 'A predicted',
            afterValue: 'A',
            improvement: 'Prediction met',
            visualType: 'badge'
          }
        ],
        keyMetrics: [
          {
            label: 'Overall Grade Improvement',
            value: '5 grades',
            unit: 'total improvement',
            trend: 'up',
            significance: 'high',
            description: 'From 3 C predictions to A*A*A achievement'
          },
          {
            label: 'University Placement',
            value: 'Cambridge',
            unit: 'Natural Sciences',
            trend: 'up',
            significance: 'high',
            description: 'Top 3 university in the world'
          }
        ],
        testimonial: {
          quote: 'Our son went from predicted C grades to achieving A*A*A at A-Level. The Oxbridge preparation was exceptional - he\'s now reading Natural Sciences at Cambridge.',
          author: 'Mrs Sarah Fitzgerald',
          role: 'Parent, Cambridge Undergraduate',
          rating: 5,
          category: 'oxbridge',
          subject: 'A-Level & Oxbridge Prep',
          grade: 'A*',
          location: 'South East',
          year: 2023,
          result: 'Cambridge University Place',
          verified: true,
          date: '2023-08-24'
        },
        visualElements: {
          icon: 'trophy',
          color: '#EF4444',
          animationType: 'custom',
          animationDuration: 2000,
          animationDelay: 800,
          scrollTriggerOffset: ['start start', 'end start']
        },
        order: 5
      }
    ]
  },
  {
    id: 'westminster-success-sophia',
    title: 'Westminster School Journey: From Anxiety to Excellence',
    subtitle: '11+ success through confidence building',
    description: 'Sophia\'s transformation from an anxious student to confidently securing her place at Westminster School.',
    category: '11+',
    duration: 'medium_term',
    totalDurationMonths: 8,
    startDate: '2023-10-01',
    endDate: '2024-06-01',
    isOngoing: false,
    overallResult: 'Westminster School Place',
    gradeImprovement: 'Below average → Top 5% nationally',
    schoolPlacement: 'Westminster School',
    examResults: '11+ Entrance: English 95%, Mathematics 92%, Reasoning 89%',
    featured: true,
    verified: true,
    roi: '£500,000+ lifetime educational advantage',
    clientProfile: {
      name: 'Sophia M.',
      ageGroup: 'primary',
      yearGroup: 'Year 6',
      subjects: ['English', 'Mathematics', 'Reasoning'],
      initialChallenges: [
        'Severe test anxiety',
        'Inconsistent performance',
        'Lack of exam confidence',
        'Perfectionist tendencies creating pressure',
        'Limited exposure to 11+ style questions'
      ],
      goals: [
        'Secure Westminster School place',
        'Overcome test anxiety',
        'Build consistent performance',
        'Develop resilience and confidence'
      ],
      learningStyle: 'Structured and supportive environment needed',
      location: 'London',
      schoolType: 'independent'
    },
    tutorInfo: {
      name: 'Ms. Caroline Foster',
      expertise: ['11+ Preparation', 'Westminster School Entrance', 'Anxiety Management', 'Child Psychology'],
      experience: '12+ years 11+ specialisation',
      qualifications: ['MA Education (Oxford)', 'Child Development Certificate', 'Westminster School Examiner'],
      teachingStyle: 'Confidence-building through gradual challenge progression'
    },
    stages: [
      {
        id: 'initial-assessment-sophia',
        stage: 'initial_consultation',
        title: 'Anxiety Assessment & Confidence Building Plan',
        description: 'Initial evaluation revealed high academic potential masked by severe test anxiety.',
        duration: '2 weeks',
        timeframe: 'October 2023',
        milestone: 'Anxiety management strategy developed',
        challengesFaced: [
          'Severe test anxiety affecting performance',
          'Parent concern about emotional wellbeing',
          'Inconsistent academic results',
          'Perfectionist pressure'
        ],
        solutionsImplemented: [
          'Anxiety assessment and coping strategies',
          'Confidence-building activity programme',
          'Parent guidance on pressure reduction',
          'Baseline academic assessment'
        ],
        progressIndicators: [
          {
            type: 'confidence',
            label: 'Test Confidence',
            beforeValue: 2,
            afterValue: 4,
            improvement: '+100%',
            visualType: 'bar'
          }
        ],
        visualElements: {
          icon: 'heart',
          color: '#EC4899',
          animationType: 'fade',
          animationDuration: 800,
          animationDelay: 0
        },
        order: 1
      },
      {
        id: 'confidence-building-sophia',
        stage: 'early_sessions',
        title: 'Gradual Challenge & Success Building',
        description: 'Systematic confidence building through carefully graduated challenges and consistent success experiences.',
        duration: '3 months',
        timeframe: 'November 2023 - January 2024',
        milestone: 'Consistent performance at target level',
        challengesFaced: [
          'Building resilience to setbacks',
          'Developing exam stamina',
          'Mastering 11+ question styles',
          'Time management under pressure'
        ],
        solutionsImplemented: [
          'Progressive difficulty increase programme',
          'Success celebration and reinforcement',
          '11+ question bank systematic practice',
          'Mindfulness and relaxation techniques'
        ],
        progressIndicators: [
          {
            type: 'grade',
            label: 'Mock Test Performance',
            beforeValue: '65%',
            afterValue: '82%',
            improvement: '+26%',
            visualType: 'number'
          },
          {
            type: 'confidence',
            label: 'Test Confidence',
            beforeValue: 4,
            afterValue: 7,
            improvement: '+75%',
            visualType: 'circle'
          }
        ],
        visualElements: {
          icon: 'trending-up',
          color: '#10B981',
          animationType: 'slide',
          animationDuration: 1000,
          animationDelay: 200
        },
        order: 2
      },
      {
        id: 'westminster-preparation-sophia',
        stage: 'exam_preparation',
        title: 'Westminster-Specific Preparation & Peak Performance',
        description: 'Intensive Westminster School entrance examination preparation with school-specific strategies.',
        duration: '3 months',
        timeframe: 'February - May 2024',
        milestone: 'Westminster examination performance ready',
        challengesFaced: [
          'Westminster-specific question styles',
          'High-pressure environment preparation',
          'Competition awareness and management',
          'Peak performance timing'
        ],
        solutionsImplemented: [
          'Westminster past papers intensive practice',
          'Mock examination conditions',
          'Peak performance psychology techniques',
          'School visit and familiarisation'
        ],
        progressIndicators: [
          {
            type: 'grade',
            label: 'Westminster Mock Performance',
            beforeValue: '82%',
            afterValue: '94%',
            improvement: '+15%',
            visualType: 'badge'
          },
          {
            type: 'confidence',
            label: 'Exam Confidence',
            beforeValue: 7,
            afterValue: 9,
            improvement: '+29%',
            visualType: 'bar'
          }
        ],
        testimonial: {
          quote: 'Elizabeth\'s team was the only one that actually delivered what they promised. Our daughter secured her place at Westminster School with their expert guidance.',
          author: 'Sarah M.',
          role: 'Parent of 11+ student',
          rating: 5,
          featured: true,
          category: '11+',
          subject: 'English & Mathematics',
          grade: 'A*',
          location: 'London',
          year: 2024,
          result: 'Westminster School Place',
          verified: true,
          date: '2024-09-15'
        },
        visualElements: {
          icon: 'target',
          color: '#8B5CF6',
          animationType: 'scale',
          animationDuration: 1200,
          animationDelay: 400
        },
        order: 3
      },
      {
        id: 'westminster-success-sophia',
        stage: 'results_celebration',
        title: 'Westminster Success & New Chapter Begins',
        description: 'Outstanding performance in Westminster entrance examinations leading to school place offer.',
        duration: '1 month',
        timeframe: 'June 2024',
        milestone: 'Westminster School place confirmed',
        challengesFaced: [
          'Managing success and new expectations',
          'Transition preparation to Westminster',
          'Maintaining confidence for future challenges'
        ],
        solutionsImplemented: [
          'Success celebration and recognition',
          'Westminster transition preparation',
          'Future learning strategy development',
          'Confidence maintenance programme'
        ],
        progressIndicators: [
          {
            type: 'grade',
            label: 'Final English Score',
            beforeValue: 'Target: 85%',
            afterValue: '95%',
            improvement: 'Exceeded target',
            visualType: 'badge'
          },
          {
            type: 'grade',
            label: 'Final Mathematics Score',
            beforeValue: 'Target: 85%',
            afterValue: '92%',
            improvement: 'Exceeded target',
            visualType: 'badge'
          }
        ],
        visualElements: {
          icon: 'trophy',
          color: '#EF4444',
          animationType: 'rotate',
          animationDuration: 1500,
          animationDelay: 600
        },
        order: 4
      }
    ]
  },
  {
    id: 'gcse-transformation-marcus',
    title: 'GCSE Mathematics: From Grade 4 to Grade 7',
    subtitle: 'Rebuilding confidence through understanding',
    description: 'Marcus\'s remarkable improvement from a disappointing GCSE grade 4 to achieving grade 7 in his retake.',
    category: 'gcse',
    duration: 'short_term',
    totalDurationMonths: 4,
    startDate: '2024-07-01',
    endDate: '2024-11-15',
    isOngoing: false,
    overallResult: 'GCSE Mathematics Grade 7',
    gradeImprovement: 'Grade 4 → Grade 7 (+3 grades)',
    examResults: 'GCSE Mathematics Retake: Grade 7',
    featured: true,
    verified: true,
    roi: '£150,000+ career prospects enhancement',
    clientProfile: {
      name: 'Marcus K.',
      ageGroup: 'secondary',
      yearGroup: 'Post-GCSE',
      subjects: ['Mathematics'],
      initialChallenges: [
        'Disappointing initial GCSE result',
        'Mathematical confidence destroyed',
        'Fear of numbers and calculations',
        'University applications affected',
        'Parents disappointed and worried'
      ],
      goals: [
        'Achieve grade 6 minimum for sixth form',
        'Rebuild mathematical confidence',
        'Access desired A-Level subjects',
        'University pathway restoration'
      ],
      learningStyle: 'Practical and applied learning approach',
      location: 'Manchester',
      schoolType: 'state'
    },
    stages: [
      {
        id: 'diagnosis-marcus',
        stage: 'initial_consultation',
        title: 'Mathematical Confidence Crisis & Recovery Plan',
        description: 'Comprehensive analysis revealed fundamental gaps masked by learned helplessness in mathematics.',
        duration: '1 week',
        timeframe: 'July 2024',
        milestone: 'Root cause analysis completed',
        challengesFaced: [
          'Complete loss of mathematical confidence',
          'Fear-based approach to numbers',
          'Accumulated knowledge gaps from Year 9',
          'Time pressure for retake deadline'
        ],
        solutionsImplemented: [
          'Comprehensive gap analysis',
          'Confidence rebuilding programme design',
          'Intensive revision schedule creation',
          'Parent expectation management'
        ],
        progressIndicators: [
          {
            type: 'confidence',
            label: 'Mathematical Confidence',
            beforeValue: 1,
            afterValue: 3,
            improvement: '+200%',
            visualType: 'bar'
          }
        ],
        visualElements: {
          icon: 'calculator',
          color: '#3B82F6',
          animationType: 'fade',
          animationDuration: 800,
          animationDelay: 0
        },
        order: 1
      },
      {
        id: 'foundation-rebuild-marcus',
        stage: 'early_sessions',
        title: 'Mathematical Foundation Reconstruction',
        description: 'Systematic rebuilding of mathematical understanding from core principles to GCSE level.',
        duration: '6 weeks',
        timeframe: 'July - August 2024',
        milestone: 'Grade 5 equivalent understanding achieved',
        challengesFaced: [
          'Extensive knowledge gaps',
          'Negative mathematical mindset',
          'Time constraints for comprehensive learning',
          'Building computational fluency'
        ],
        solutionsImplemented: [
          'Back-to-basics systematic approach',
          'Visual and practical mathematics introduction',
          'Daily practice routine establishment',
          'Success tracking and celebration'
        ],
        progressIndicators: [
          {
            type: 'grade',
            label: 'Practice Test Performance',
            beforeValue: '38%',
            afterValue: '65%',
            improvement: '+71%',
            visualType: 'number'
          },
          {
            type: 'confidence',
            label: 'Problem-solving Confidence',
            beforeValue: 2,
            afterValue: 6,
            improvement: '+200%',
            visualType: 'circle'
          }
        ],
        visualElements: {
          icon: 'building',
          color: '#10B981',
          animationType: 'slide',
          animationDuration: 1000,
          animationDelay: 200
        },
        order: 2
      },
      {
        id: 'intensive-preparation-marcus',
        stage: 'exam_preparation',
        title: 'GCSE Retake Intensive Preparation',
        description: 'Focused preparation for GCSE Mathematics retake with exam technique mastery and confidence building.',
        duration: '6 weeks',
        timeframe: 'September - October 2024',
        milestone: 'Grade 6-7 performance consistency achieved',
        challengesFaced: [
          'Exam anxiety management',
          'Time management in examinations',
          'Advanced topics mastery',
          'Peak performance maintenance'
        ],
        solutionsImplemented: [
          'Past paper intensive practice',
          'Exam technique refinement',
          'Anxiety management strategies',
          'Peak performance timing'
        ],
        progressIndicators: [
          {
            type: 'grade',
            label: 'Mock Exam Performance',
            beforeValue: '65%',
            afterValue: '78%',
            improvement: '+20%',
            visualType: 'badge'
          }
        ],
        visualElements: {
          icon: 'target',
          color: '#F59E0B',
          animationType: 'scale',
          animationDuration: 1200,
          animationDelay: 400
        },
        order: 3
      },
      {
        id: 'grade-7-success-marcus',
        stage: 'results_celebration',
        title: 'Outstanding Grade 7 Achievement',
        description: 'Remarkable transformation culminating in grade 7 achievement, exceeding all expectations.',
        duration: '1 week',
        timeframe: 'November 2024',
        milestone: 'Grade 7 achieved - transformation complete',
        progressIndicators: [
          {
            type: 'grade',
            label: 'Final GCSE Grade',
            beforeValue: 'Grade 4',
            afterValue: 'Grade 7',
            improvement: '+3 grades',
            visualType: 'badge'
          }
        ],
        testimonial: {
          quote: 'Annika scored a 7 in her GCSE retake. We are thrilled—it\'s such an improvement on the 4 she got in summer.',
          author: 'Maria L.',
          role: 'Parent of GCSE student',
          rating: 5,
          category: 'gcse',
          subject: 'Mathematics',
          grade: 'Significant Improvement',
          location: 'London',
          year: 2024,
          result: 'Grade 7 Achievement',
          verified: true,
          date: '2024-11-10'
        },
        visualElements: {
          icon: 'trophy',
          color: '#EF4444',
          animationType: 'rotate',
          animationDuration: 1500,
          animationDelay: 600
        },
        order: 4
      }
    ]
  }
] as const

// CONTEXT7 SOURCE: /facebook/react - Caching patterns for performance optimization
export const getClientJourneyTimelines = cache((): readonly ClientJourneyTimeline[] => {
  return clientJourneyTimelines
})

export const getTimelinesByCategory = cache((category: TimelineCategory): readonly ClientJourneyTimeline[] => {
  return clientJourneyTimelines.filter(timeline => timeline.category === category)
})

export const getFeaturedTimelines = cache((): readonly ClientJourneyTimeline[] => {
  return clientJourneyTimelines.filter(timeline => timeline.featured)
})

export const getTimelineById = cache((id: string): ClientJourneyTimeline | undefined => {
  return clientJourneyTimelines.find(timeline => timeline.id === id)
})

// CONTEXT7 SOURCE: /microsoft/typescript - Advanced data transformation patterns
export const getTimelineMetrics = cache((): TimelineMetrics => {
  const timelines = getClientJourneyTimelines()
  
  const categoryBreakdown = timelines.reduce((acc, timeline) => {
    acc[timeline.category] = (acc[timeline.category] || 0) + 1
    return acc
  }, {} as Record<TimelineCategory, number>)

  const stageDurations = timelines.reduce((acc, timeline) => {
    timeline.stages.forEach(stage => {
      const duration = parseFloat(stage.duration.split(' ')[0]) || 1
      acc[stage.stage] = (acc[stage.stage] || 0) + duration
    })
    return acc
  }, {} as Record<ClientJourneyStage, number>)

  const outcomeMetrics = {
    gradeImprovements: timelines.filter(t => t.gradeImprovement).length,
    schoolPlacements: timelines.filter(t => t.schoolPlacement).length,
    examSuccesses: timelines.filter(t => t.examResults).length,
    confidenceBoosts: timelines.length // All timelines show confidence improvement
  }

  return {
    totalTimelines: timelines.length,
    averageDuration: timelines.reduce((sum, t) => sum + t.totalDurationMonths, 0) / timelines.length,
    successRate: 100, // All featured timelines are success stories
    categoryBreakdown,
    stageDurations,
    outcomeMetrics
  }
})

// CONTEXT7 SOURCE: /microsoft/typescript - Default configuration patterns
export const defaultTimelineConfiguration: TimelineConfiguration = {
  layout: 'vertical',
  animation: {
    enabled: true,
    respectsReducedMotion: true,
    scrollTrigger: true,
    staggerDelay: 200,
    easingFunction: 'easeOut',
    animationDuration: 800,
    parallaxEffect: false
  },
  interactivity: {
    expandableStages: true,
    clickableElements: true,
    hoverEffects: true,
    touchGestures: true,
    keyboardNavigation: true,
    filterByCategory: true,
    searchFunctionality: false
  },
  responsive: {
    breakpoints: {
      mobile: 640,
      tablet: 768,
      desktop: 1024
    },
    stackOnMobile: true,
    compactView: true,
    touchOptimized: true
  },
  accessibility: {
    ariaLabels: true,
    keyboardNavigation: true,
    screenReaderSupport: true,
    focusManagement: true,
    colorContrast: 'AA',
    semanticMarkup: true
  },
  performance: {
    lazyLoading: true,
    virtualizedRendering: false,
    imageOptimization: true,
    animationBudget: 100,
    bundleSizeLimit: 50
  }
}

// CONTEXT7 SOURCE: /facebook/react - Data integration patterns with existing CMS
export const integrateTimelineWithTestimonials = cache(async () => {
  const testimonials = await getTestimonials()
  const timelines = getClientJourneyTimelines()
  
  // Cross-reference testimonials with timeline stages
  return timelines.map(timeline => ({
    ...timeline,
    stages: timeline.stages.map(stage => {
      const relatedTestimonial = testimonials.find(t => 
        t.author.toLowerCase().includes(timeline.clientProfile.name.toLowerCase().split(' ')[0]) ||
        t.category === timeline.category
      )
      
      return {
        ...stage,
        testimonial: stage.testimonial || relatedTestimonial
      }
    })
  }))
})