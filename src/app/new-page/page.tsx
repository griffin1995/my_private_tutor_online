"use client";

// CONTEXT7 SOURCE: /vercel/next.js - Client Component for consistent rendering behavior
// IMPLEMENTATION REASON: Official Next.js documentation recommends client components for pages with interactive elements
// CONTEXT7 SOURCE: /vercel/next.js - App Router page structure patterns
// PAGE CREATION REASON: Official Next.js App Router documentation Section 3.1 demonstrates page.tsx file structure in app directory

import { PageLayout } from "@/components/layout/page-layout";
import { SimpleHero } from "@/components/layout/simple-hero";
import { TwoRowHeadingTextSection } from "@/components/sections/two-row-heading-text-section";
import { VideoMasterclassGrid } from "@/components/video/VideoMasterclassGrid";
import { type VideoMasterclass } from "../../../COMPREHENSIVE_VIDEO_CMS";
import { getVideoMasterclassPage } from "@/lib/cms/cms-images";
import { type StandardizedContent, type StandardizedHeadingContent, type StandardizedVideoContent } from "./types";
import { standardizedPageContent, getStandardizedContentById } from "./standardized-data";
import React from "react";

// CONTEXT7 SOURCE: /vercel/next.js - Client component pattern without metadata export
// CLIENT COMPONENT REASON: Official Next.js documentation states client components cannot export metadata

// CONTEXT7 SOURCE: /microsoft/typescript - Standardized data structure implementation for consistent content management
// STANDARDIZATION REASON: Official TypeScript documentation for data modeling and type safety patterns

// Helper function to convert standardized video data to existing VideoMasterclass interface
function convertToVideoMasterclass(standardizedVideo: any): VideoMasterclass {
  return {
    id: standardizedVideo.id,
    title: standardizedVideo.title,
    description: standardizedVideo.description,
    bulletPoints: standardizedVideo.bulletPoints,
    youtubeUrl: standardizedVideo.youtubeUrl,
    thumbnailImage: standardizedVideo.thumbnailImage,
    backgroundImage: standardizedVideo.backgroundImage,
    isPaid: standardizedVideo.isPaid,
    purchaseLink: standardizedVideo.purchaseLink,
  };
}

export default function NewPage() {
  // CONTEXT7 SOURCE: /vercel/next.js - Static hero image patterns for consistent branding
  // HERO IMAGE REASON: Official Next.js documentation for static asset referencing in public directory
  const heroImage = {
    src: "/images/hero/hero-about-us.jpg", // Using existing hero image as placeholder
  };

  // CONTEXT7 SOURCE: /reactjs/react.dev - React cache() memoization for expensive operations
  // BATCH FETCH: Get all video masterclasses in single optimized operation
  const allVideos = getVideoMasterclassPage();

  // Split videos into sections for organized display
  const ucasVideos = allVideos.slice(2, 4); // Next 2 videos for UCAS section

  // CONTEXT7 SOURCE: /microsoft/typescript - Standardized data structure access patterns
  // STANDARDIZED DATA ACCESS: Get content sections using standardized data structure
  const primarySchoolHeading = getStandardizedContentById("primary-school-heading") as StandardizedHeadingContent;
  const primarySchoolVideos1 = getStandardizedContentById("primary-school-videos-1") as StandardizedVideoContent;
  const primarySchoolVideos2 = getStandardizedContentById("primary-school-videos-2") as StandardizedVideoContent;
  const secondarySchoolHeading = getStandardizedContentById("secondary-school-heading") as StandardizedHeadingContent;
  const secondarySchoolVideos1 = getStandardizedContentById("secondary-school-videos-1") as StandardizedVideoContent;
  const secondarySchoolVideos2 = getStandardizedContentById("secondary-school-videos-2") as StandardizedVideoContent;

  return (
    <React.Fragment>
      {/* CONTEXT7 SOURCE: /vercel/next.js - SimpleHero integration with full-screen layout pattern */}
      {/* HERO INTEGRATION REASON: Official Next.js documentation for component composition and layout consistency */}
      {/* CONTEXT7 SOURCE: /mdn/web-docs - HTML section wrapper with unique id for navigation integration */}
      {/* SECTION ID REASON: Official HTML documentation for semantic section identification */}
      <section id="new-page-hero">
        <SimpleHero
          backgroundImage={heroImage.src}
          h1="New Page"
          h2="Welcome to our new page"
          decorativeStyle="lines"
          textVerticalOffset="default"
        />
      </section>

      {/* CONTEXT7 SOURCE: /vercel/next.js - Page layout for content sections following full-screen hero pattern */}
      {/* LAYOUT STRUCTURE REASON: Official Next.js documentation recommends wrapping non-hero content in PageLayout for consistency */}
      {/* CONTEXT7 SOURCE: /vercel/next.js - Layout component with navigation header for consistent site structure */}
      {/* NAVBAR CONSISTENCY REASON: Official Next.js documentation recommends showHeader={true} for consistent navigation across all pages */}
      <PageLayout
        background="white"
        showHeader={true}
        showFooter={true}
        containerSize="full"
        verticalSpacing="lg"
        className="space-y-0"
        footerProps={{ showContactForm: true }}
      >
        {/* CONTEXT7 SOURCE: /brijr/components - Sequential component implementation following exact order specification */}
        {/* COMPONENT ORDER REASON: Official React component composition patterns for structured page layout */}

        {/* 1. TwoRowHeadingTextSection (Primary School) */}
        <TwoRowHeadingTextSection
          headingOne={primarySchoolHeading.title}
          paragraphOne={primarySchoolHeading.description}
          headingTwo={primarySchoolHeading.subtitle || ""}
          paragraphTwo={primarySchoolHeading.secondaryDescription || ""}
          backgroundColor={primarySchoolHeading.backgroundColor}
          className={primarySchoolHeading.className}
        />

        {/* 2. VideoMasterclassGrid (Primary School Sections) */}
        <VideoMasterclassGrid
          videos={primarySchoolVideos1.videos.map(convertToVideoMasterclass)}
          className={primarySchoolVideos1.className}
        />

        {/* 3. VideoMasterclassGrid (Primary School Sections) */}
        <VideoMasterclassGrid
          videos={primarySchoolVideos2.videos.map(convertToVideoMasterclass)}
          className={primarySchoolVideos2.className}
        />

        {/* 4. TwoRowHeadingTextSection (Secondary School) */}
        <TwoRowHeadingTextSection
          headingOne={secondarySchoolHeading.title}
          paragraphOne={secondarySchoolHeading.description}
          headingTwo={secondarySchoolHeading.subtitle || ""}
          paragraphTwo={secondarySchoolHeading.secondaryDescription || ""}
          backgroundColor={secondarySchoolHeading.backgroundColor}
          className={secondarySchoolHeading.className}
        />

        {/* 5. VideoMasterclassGrid (Secondary School Sections) */}
        <VideoMasterclassGrid
          videos={secondarySchoolVideos1.videos.map(convertToVideoMasterclass)}
          className={secondarySchoolVideos1.className}
        />

        {/* 6. VideoMasterclassGrid (Secondary School Sections) */}
        <VideoMasterclassGrid
          videos={secondarySchoolVideos2.videos.map(convertToVideoMasterclass)}
          className={secondarySchoolVideos2.className}
        />

        {/* 7. TwoRowHeadingTextSection (Entrance Exams) */}
        <TwoRowHeadingTextSection
          headingOne="Entrance Exams"
          paragraphOne="Specialised preparation for competitive entrance examinations across all age groups."
          headingTwo=""
          paragraphTwo=""
          backgroundColor="white"
          className="py-16"
        />

        {/* 8. VideoMasterclassGrid (Entrance Exams Sections) */}
        {/* Note: Using hardcoded data until entrance exam sections added to standardized data */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "11plus-preparation",
              title: "Aligned With Every Major Exam Board",
              description: "Our team works with GL, CEM, ISEB, CAT4, and internal papers set by individual schools.",
              bulletPoints: ["GL Assessment expertise", "CEM preparation", "ISEB Common Entrance", "School-specific papers"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/aligned-with-every-major-exam-board.jpg",
              backgroundImage: "/images/features/aligned-with-every-major-exam-board.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
          ]}
          className="py-16"
        />

        {/* 9. VideoMasterclassGrid (Entrance Exams Sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "13plus-strategies",
              title: "Expert Tutor Matching",
              description: "Paired with a specialist tutor—often a former school examiner or prep school teacher—carefully chosen to meet the family's school ambitions.\n\nMeet Emily, one of our Entrance Exam specialists. She holds degrees from both Oxford & Cambridge University and worked at a top 10 London grammar school where she helped assess and select the best 11+ candidates\n\nEmily's 11+ Expert Introduction Video - Meet Emily, our specialist 11+ tutor and learn about our comprehensive entrance exam preparation approach",
              bulletPoints: ["Former examiners", "Prep school teachers", "School-specific expertise", "Personalised matching"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/expert-tutor-matching.jpg",
              backgroundImage: "/images/features/expert-tutor-matching.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
          ]}
          className="py-16"
        />

        {/* 10. VideoMasterclassGrid (Entrance Exams Sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "independent-school-prep",
              title: "Tailored, Flexible Programmes",
              description: "Each programme is personalised to the target schools, exam formats and the student's pace—ensuring effective progress without overwhelm.",
              bulletPoints: ["Target school focus", "Exam format preparation", "Individual pacing", "Stress management"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/tailored-flexible-programmes.jpg",
              backgroundImage: "/images/features/tailored-flexible-programmes.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
          ]}
          className="py-16"
        />

        {/* 11. VideoMasterclassGrid (Entrance Exams Sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "grammar-school-success",
              title: "Parent Guidance & School Selection",
              description: "We support families throughout—from helping create a shortlist of schools through to preparing for interviews.",
              bulletPoints: ["School selection advice", "Application guidance", "Timeline planning", "Interview preparation"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/parent-guidance-school-selection.jpg",
              backgroundImage: "/images/features/parent-guidance-school-selection.jpg",
              isPaid: false,
            },
          ]}
          className="py-16"
        />

        {/* 12. VideoMasterclassGrid (Entrance Exams Sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "mock-exams-interview",
              title: "Mock Exams & Interview Practice",
              description: "Students gain confidence through realistic mock tests and 1-2-1 interview rehearsals, with detailed feedback to improve performance.",
              bulletPoints: ["Realistic mock exams", "Interview rehearsals", "Detailed feedback", "Performance analysis"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/mock-exams-interview-practice.jpg",
              backgroundImage: "/images/features/mock-exams-interview-practice.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
          ]}
          className="py-16"
        />

        {/* 13. VideoMasterclassGrid (Entrance Exams Sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "deep-expertise-selective",
              title: "Deep Expertise From Selective Schools",
              description: "Our team includes qualified teachers at top 10 London grammar schools and leading UK boarding schools. Many have written and marked real entrance exam papers.",
              bulletPoints: ["Grammar school teachers", "Boarding school expertise", "Exam paper writers", "Marking experience"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/deep-expertise-selective-schools.jpg",
              backgroundImage: "/images/features/deep-expertise-selective-schools.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
          ]}
          className="py-16"
        />

        {/* 14. TwoRowHeadingTextSection (University Admissions Exams & English Proficiency Tests) */}
        <TwoRowHeadingTextSection
          headingOne="University Admissions Exams & English Proficiency Tests"
          paragraphOne="Expert academic support for undergraduates and postgraduates, including essay coaching, dissertations, and subject-specific tutoring. University admissions guidance for UK, US, Oxbridge and other global institutions—personal statements, interview prep, admissions tests."
          headingTwo=""
          paragraphTwo=""
          backgroundColor="gray-50"
          className="py-16"
        />

        {/* PERFORMANCE OPTIMIZED: Batch render UCAS videos with VideoMasterclassGrid */}
        <VideoMasterclassGrid videos={ucasVideos} className="py-32" />

        {/* SUBJECT-SPECIFIC ADMISSIONS TESTS SECTION */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "oxbridge-preparation",
              title: "Subject-Specific University Admissions Tests",
              description: "Targeted preparation for high-stakes exams that form a crucial part of university and course-specific admissions. Our experienced tutors offer intensive, focused tuition that sharpens core skills and exam-specific techniques.\n\nTMUA: Test of Mathematics for University Admission - for mathematics-based university courses in the UK including Mathematics, Computer Science, and Engineering degrees.\n\nLNAT: National Admissions Test for Law - required for law courses at top UK universities including Oxford, Cambridge, UCL, and other leading institutions.\n\nSAT/ACT: Standardised tests used for US university admissions, covering mathematics, English, and reasoning skills essential for American higher education applications.\n\nBMAT/UCAT: BioMedical Admissions Test and University Clinical Aptitude Test - required for medical and dental school applications in the UK and internationally.\n\nIELTS/TOEFL: International English Language Testing System and Test of English as a Foreign Language - English proficiency exams required by universities for non-native speakers.\n\nTSA: Thinking Skills Assessment for courses at Oxford, Cambridge, and UCL requiring advanced critical thinking and problem-solving abilities.\n\nELAT: English Literature Admissions Test for Oxford applicants studying English Language and Literature, requiring advanced literary analysis skills.",
              bulletPoints: ["Mathematics-based courses", "Law course applications", "US university admissions", "Medical school applications"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/subject-specific-university-admissions-tests.jpg",
              backgroundImage: "/images/features/subject-specific-university-admissions-tests.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
          ]}
          className="py-16"
        />

        {/* 15. TwoRowHeadingTextSection (Online Homeschooling) */}
        <TwoRowHeadingTextSection
          headingOne="Online Homeschooling"
          paragraphOne="Comprehensive one-to-one homeschooling for families seeking both academic structure and flexibility."
          headingTwo=""
          paragraphTwo=""
          backgroundColor="white"
          className="py-16"
        />

        {/* 16. VideoMasterclassGrid (Online Homeschooling sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "homeschool-curriculum",
              title: "Why Choose Homeschooling with Us",
              description: "Private‑School Standard, Delivered Virtually: We deliver bespoke online programmes that rival independent schools in quality.\n\nFully Personalised Curriculum & Timetabling: Lessons are crafted around each child's strengths, interests and pace. Consistent Tutor Teams & Academic Continuity: Students benefit from a stable team of expert tutors—subject specialists with years of experience and often examiner credentials.\n\nProgress Tracking & Motivation-Focused Design: Regular assessments, achievable goals, and work reviewed in real time ensure the programme adapts to each student's growth. Expert Support for SEN Needs: Our SEN-aligned homeschooling incorporates specially tailored pathways for students with dyslexia, ADHD, processing differences or related needs—delivered with empathy and structure.",
              bulletPoints: ["Private school standard", "Personalised curriculum", "Expert tutor teams", "Progress tracking", "SEN support"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/why-choose-homeschooling-with-us.jpg",
              backgroundImage: "/images/features/why-choose-homeschooling-with-us.jpg",
              isPaid: false,
            },
          ]}
          className="py-16"
        />

        {/* 17. VideoMasterclassGrid (Online Homeschooling sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "online-learning-tools",
              title: "A Unique Pathway for Global & Gifted Learners",
              description: "Academic excellence without the need for physical classrooms. Personal schedules built around elite sports, arts commitments or world experiences. A supportive, curated tutor programme that encourages curiosity, autonomy, and confidence.",
              bulletPoints: ["Global accessibility", "Elite sports compatibility", "Arts-focused schedules", "Curated tutoring"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/unique-pathway-global-gifted-learners.jpg",
              backgroundImage: "/images/features/unique-pathway-global-gifted-learners.jpg",
              isPaid: false,
            },
          ]}
          className="py-16"
        />

        {/* 18. VideoMasterclassGrid (Online Homeschooling sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "homeschool-socialisation",
              title: "How We Work",
              description: "Individual Onboarding: We begin with a comprehensive academic and interests profile. Goal Setting & Curriculum Design: Tutors build flexible lesson plans aligned with national standards or bespoke learning aims. Structured Delivery: Students engage in live online sessions, maintain daily routines, and receive regular tutoring feedback. Ongoing Review: Progress is tracked, objectives reset, and adjustments made with parental involvement.",
              bulletPoints: ["Individual onboarding", "Goal setting", "Structured delivery", "Ongoing review"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/how-we-work.jpg",
              backgroundImage: "/images/features/how-we-work.jpg",
              isPaid: false,
            },
          ]}
          className="py-16"
        />

        {/* 19. VideoMasterclassGrid (Online Homeschooling sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "why-it-works",
              title: "Why It Works",
              description: "Our programmes blend flexible schedules, engaging pedagogy, and specialist expertise to deliver transformative education—regardless of geography. Students develop strong academic habits, enjoy tailored attention, and experience significant progress. If you're considering online homeschooling, our expert-led structure ensures both confidence and credibility every step of the way.",
              bulletPoints: ["Flexible schedules", "Engaging pedagogy", "Specialist expertise", "Academic habits"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/why-it-works.jpg",
              backgroundImage: "/images/features/why-it-works.jpg",
              isPaid: false,
            },
          ]}
          className="py-16"
        />

        {/* 20. TwoRowHeadingTextSection (SEN Support & Neurodiverse Learning) */}
        <TwoRowHeadingTextSection
          headingOne="SEN Support & Neurodiverse Learning"
          paragraphOne="Our Founder Elizabeth's own neurodiversity (dyspraxia) means she's especially passionate about equipping students with gamechanging SEN support. Our work is tailored to empower students with dyslexia, dyspraxia, ADHD, autism spectrum conditions, speech or processing differences, and related profiles. We create a focused learning environment where individual strengths are championed and confidence is rebuilt."
          headingTwo=""
          paragraphTwo=""
          backgroundColor="gray-50"
          className="py-16"
        />

        {/* 20. VideoMasterclassGrid (SEN Support & Neurodiverse Learning Sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "individualised-learning",
              title: "Individualised Learning",
              description: "Tutors conduct detailed assessments to identify strengths, challenges, and personal learning styles.",
              bulletPoints: ["Detailed assessments", "Strength identification", "Learning style analysis", "Personal approach"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/individualised-learning.jpg",
              backgroundImage: "/images/features/individualised-learning.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
            {
              id: "expert-sen-tutors",
              title: "Expert SEN Tutor Teams",
              description: "Every student is supported by highly experienced tutors trained in neurodiversity-aware pedagogy.",
              bulletPoints: ["Experienced tutors", "Neurodiversity training", "Specialist knowledge", "SEN expertise"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/features/expert-sen-tutor-teams.jpg",
              backgroundImage: "/images/features/expert-sen-tutor-teams.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
          ]}
          className="py-16"
        />

        {/* 21. VideoMasterclassGrid (SEN Support & Neurodiverse Learning Sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "exam-access-advice",
              title: "Exam Access Advice",
              description: "We guide families through exam access arrangements and make recommendations to improve fairness and outcomes.",
              bulletPoints: ["Access arrangements", "Exam guidance", "Fairness improvements", "Outcome optimisation"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/masterclass-thumbnails/ucas-guide.png",
              backgroundImage: "/images/unlocking-academic-success-background.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
            {
              id: "full-coordination",
              title: "Full Coordination & Professional Oversight",
              description: "Our homeschooling clients benefit from a dedicated tutor team, tailored learning schedules, and education consultancy to manage continuity—especially vital for SEN learners and families working across time zones.",
              bulletPoints: ["Dedicated tutor teams", "Tailored schedules", "Education consultancy", "Continuity management"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/masterclass-thumbnails/ucas-guide.png",
              backgroundImage: "/images/ucas-summit-background.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
          ]}
          className="py-16"
        />

        {/* 22. VideoMasterclassGrid (SEN Support & Neurodiverse Learning Sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "online-homeschooling-sen",
              title: "Online Homeschooling for SEN & Complex Needs",
              description: "Whether families are travelling, transitioning between schools, or prioritising personalised learning, our homeschooling programme delivers full academic support entirely online—without any in-person tutoring.\n\nCurriculum Built Around the Student: We design bespoke programmes around each child's strengths, interests, and pace—seamlessly blending academics with creative and practical learning.\n\nHolistic Academic & Emotional Support: We understand daily routines and tutor consistency are especially important for SEN learners. Our tutees are supported by program management and ongoing progress reviews to nurture both academic growth and personal well-being.\n\nWhy It Works: Both SEN tutoring and full-online homeschooling emphasise individual strength, flexible pacing, and sustained mentorship. This approach enables students to flourish academically while nurturing autonomy, individualism, and confidence—delivered through expert-led, evidence-based practice.",
              bulletPoints: ["Bespoke programmes", "Holistic support", "Routine consistency", "Evidence-based practice"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/masterclass-thumbnails/ucas-guide.png",
              backgroundImage: "/images/ucas-part-1-mortar-board-background.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
          ]}
          className="py-16"
        />

        {/* 23. TwoRowHeadingTextSection (London In-Person Tutoring) */}
        <TwoRowHeadingTextSection
          headingOne="London In-Person Tutoring"
          paragraphOne="In-person tutoring typically available across Zones 1–5, depending on student location and tutor availability."
          headingTwo=""
          paragraphTwo=""
          backgroundColor="white"
          className="py-16"
        />

        {/* 24. VideoMasterclassGrid (London In-Person Tutoring Sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "dbs-checked-tutors",
              title: "DBS-Checked Specialist Tutors",
              description: "Sessions delivered by DBS-checked, specialist tutors with experience of the London independent and state school sectors.",
              bulletPoints: ["DBS-checked tutors", "Specialist expertise", "London school experience", "Independent sector knowledge"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/masterclass-thumbnails/ucas-guide.png",
              backgroundImage: "/images/ucas-part-2-library-background.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
            {
              id: "entrance-exam-subject-support",
              title: "Entrance Exam & Subject-Specific Support",
              description: "Ideal for entrance exam preparation, subject-specific tuition, or ongoing academic support.",
              bulletPoints: ["Entrance exam prep", "Subject specialisation", "Ongoing support", "Academic excellence"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/masterclass-thumbnails/ucas-guide.png",
              backgroundImage: "/images/ucas-summit-background.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
          ]}
          className="py-16"
        />

        {/* 25. VideoMasterclassGrid (London In-Person Tutoring Sections) */}
        <VideoMasterclassGrid
          videos={[
            {
              id: "continuity-trust",
              title: "Continuity & Trust",
              description: "We prioritise continuity—families typically work with the same tutor throughout for consistency and trust.",
              bulletPoints: ["Same tutor continuity", "Trust building", "Consistency", "Long-term relationships"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/masterclass-thumbnails/ucas-guide.png",
              backgroundImage: "/images/unlocking-academic-success-background.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
            {
              id: "limited-availability",
              title: "Limited Availability & Best Matching",
              description: "In-person availability is limited and arranged on a case-by-case basis to ensure the best possible match.",
              bulletPoints: ["Limited availability", "Case-by-case basis", "Best matching", "Quality over quantity"],
              youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnailImage: "/images/masterclass-thumbnails/ucas-guide.png",
              backgroundImage: "/images/ucas-part-1-mortar-board-background.jpg",
              isPaid: true,
              purchaseLink: "https://buy.stripe.com/test_example",
            },
          ]}
          className="py-16"
        />
      </PageLayout>
    </React.Fragment>
  );
}