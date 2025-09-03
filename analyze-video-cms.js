#!/usr/bin/env node

/**
 * Script to analyze and output all video masterclass CMS items
 * with their complete attributes from the cms-images.ts file
 */

// Define the MASTERCLASS_VIDEOS object structure from cms-images.ts
const MASTERCLASS_VIDEOS = {
  unlockingAcademicSuccess: {
    id: "unlocking-academic-success",
    src: "/videos/elizabeth-gcse-summit-2024.mp4",
    poster: "/images/masterclass-thumbnails/unlocking-success.png",
    alt: "Unlocking Academic Success - GCSE Summit 2024 Masterclass by Elizabeth Burrows",
    title: "Unlocking Academic Success (Free Access)",
    description:
      "Elizabeth Burrows was invited to speak at the GCSE Summit 2024, where she addressed parents of GCSE-aged students on how to effectively navigate gaps in knowledge and rebuild lost confidence through one-to-one tuition. In this masterclass Elizabeth shares practical strategies and insights into the most common challenges families face when considering tutoring — from framing tutoring in a positive light for reluctant tutees to determining your child's true potential. Her session offers clear, reassuring guidance to help parents feel more confident in supporting their teens through GCSEs, IBs and A Levels.",
    duration: 30,
    featured: true,
    category: "free",
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: true,
    thumbnailUrl: "/images/masterclass-thumbnails/gcse-summit.png",
    videoUrl: "/videos/elizabeth-gcse-summit-2024.mp4",
  },
  ucasSummit2024: {
    id: "ucas-summit-2024",
    src: "/videos/elizabeth-gcse-summit-2024.mp4",
    poster: "/images/masterclass-thumbnails/gcse-summit-2024.png",
    alt: "UCAS Summit 2024 - Complete Recording by Elizabeth Burrows featuring GCSE Summit 2024 content",
    title: "UCAS Summit 2024 (Free Access)",
    description:
      "Complete recording from Elizabeth's presentation at the GCSE Summit 2024, where she addressed parents of GCSE-aged students on how to effectively navigate gaps in knowledge and rebuild lost confidence through one-to-one tuition. This comprehensive recording includes audience Q&A and additional insights for parents navigating the tutoring landscape.",
    duration: 45,
    featured: false,
    category: "free",
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: true,
    thumbnailUrl: "/images/masterclass-thumbnails/gcse-summit-2024.png",
    videoUrl: "/videos/elizabeth-gcse-summit-2024.mp4",
  },
  elizabethsUcasGuide: {
    id: "elizabeths-ucas-guide",
    src: "/videos/elizabeth-ucas-parent-interview-guide.mp4",
    poster: "/images/masterclass-thumbnails/ucas-guide.png",
    alt: "Elizabeth's Essential UCAS Guide - Part 1 of 2",
    title: "Elizabeth's Essential UCAS Guide - Part 1 of 2",
    description:
      "Widely recognised for her expertise in the British university admissions process, Elizabeth was invited to speak to international summer school students at LSE. In her session, she demystifies each stage of the UCAS application, offering clear, practical guidance to help students approach the process with confidence.",
    duration: 90,
    featured: true,
    category: "paid",
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: false,
    thumbnailUrl: "/images/masterclass-thumbnails/ucas-guide.png",
    videoUrl: "/videos/elizabeth-ucas-parent-interview-guide.mp4",
    paymentUrl: "https://buy.stripe.com/7sY6oGdj767tbtO1Zd38408",
    price: "£49.99",
  },
  personalStatementsGuide: {
    id: "personal-statements-guide",
    src: "/videos/elizabeth-personal-statements-guide-preview.mp4",
    poster: "/images/masterclass-thumbnails/top-10-tips.png",
    alt: "Elizabeth's Top 10 Tips for Outstanding Personal Statements",
    title: "Top 10 Tips for Outstanding Personal Statements - Part 2 of 2",
    description:
      "Elizabeth is renowned for her success in guiding ambitious students into Oxbridge and top UK universities. In this masterclass she reveals the 10 ingredients in her secret recipe for personal statement success.",
    duration: 70,
    featured: true,
    category: "paid",
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: false,
    thumbnailUrl: "/images/masterclass-thumbnails/top-10-tips.png",
    videoUrl: "/videos/elizabeth-personal-statements-guide-preview.mp4",
    paymentUrl: "https://buy.stripe.com/bJe4gy6UJ3ZlgO8avJ38409",
    price: "£89.99",
  },
  britishLiteraryClassics: {
    id: "british-literary-classics",
    src: "/videos/elizabeth-british-literary-classics-preview.mp4",
    poster: "/images/masterclass-thumbnails/british-literary-classics.png",
    alt: "Exploring British Literary Classics - Masterclass for Curious Readers",
    title: "Exploring British Literary Classics (Ages 8–14)",
    description:
      "From Wind in the Willows to The Lord of the Rings, this engaging masterclass introduces students to some of the most celebrated works in British literature. Led by Elizabeth Burrows, this session explores what defines a literary classic.",
    duration: 60,
    featured: false,
    category: "paid",
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: false,
    thumbnailUrl: "/images/masterclass-thumbnails/british-literary-classics.png",
    videoUrl: "/videos/elizabeth-british-literary-classics-preview.mp4",
    paymentUrl: "https://buy.stripe.com/aFa8wOfrffI3dBW47l3840a",
    price: "£19.99",
  },
  britishEtiquette: {
    id: "british-etiquette",
    src: "/videos/elizabeth-british-etiquette-preview.mp4",
    poster: "/images/masterclass-thumbnails/british-etiquette.jpg",
    alt: "Understanding British Etiquette - Cultural Awareness Masterclass",
    title: "Understanding British Etiquette",
    description:
      "Drawing on her experience working with royalty and high-profile international families, Elizabeth demystifies the social codes that shape life in the UK's most prestigious schools and institutions.",
    duration: 60,
    featured: false,
    category: "paid",
    masterclassAuthor: "Elizabeth Burrows",
    masterclassRole: "Founder, My Private Tutor Online",
    isFree: false,
    thumbnailUrl: "/images/masterclass-thumbnails/british-etiquette.jpg",
    videoUrl: "/videos/elizabeth-british-etiquette-preview.mp4",
    paymentUrl: "https://buy.stripe.com/cNidR8dj70N98hCeLZ3840b",
    price: "£19.99",
  },
};

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// Function to format and display video data
function displayVideoData(key, video) {
  console.log(`\n${colors.bright}${colors.cyan}${'='.repeat(80)}${colors.reset}`);
  console.log(`${colors.bright}${colors.green}VIDEO ITEM: ${key}${colors.reset}`);
  console.log(`${colors.cyan}${'='.repeat(80)}${colors.reset}\n`);

  // Display all attributes
  const attributes = [
    { label: 'ID', value: video.id, color: colors.yellow },
    { label: 'Title', value: video.title, color: colors.bright },
    { label: 'Alt Text', value: video.alt, color: colors.dim },
    { label: 'Description', value: video.description, color: colors.white },
    { label: 'Duration', value: `${video.duration} minutes`, color: colors.magenta },
    { label: 'Category', value: video.category, color: colors.blue },
    { label: 'Featured', value: video.featured ? 'Yes' : 'No', color: video.featured ? colors.green : colors.dim },
    { label: 'Is Free', value: video.isFree ? 'Yes' : 'No', color: video.isFree ? colors.green : colors.red },
    { label: 'Author', value: video.masterclassAuthor, color: colors.cyan },
    { label: 'Role', value: video.masterclassRole, color: colors.cyan },
    { label: 'Source Video', value: video.src, color: colors.blue },
    { label: 'Poster Image', value: video.poster, color: colors.blue },
    { label: 'Thumbnail URL', value: video.thumbnailUrl, color: colors.blue },
    { label: 'Video URL', value: video.videoUrl || 'N/A', color: colors.yellow },
    { label: 'Payment URL', value: video.paymentUrl || 'N/A', color: colors.magenta },
    { label: 'Price', value: video.price || 'Free', color: video.price ? colors.red : colors.green },
  ];

  attributes.forEach(attr => {
    console.log(`${colors.bright}${attr.label}:${colors.reset} ${attr.color}${attr.value}${colors.reset}`);
  });
}

// Main execution
console.log(`\n${colors.bright}${colors.magenta}${'*'.repeat(80)}${colors.reset}`);
console.log(`${colors.bright}${colors.white}        VIDEO MASTERCLASSES CMS ANALYSIS REPORT${colors.reset}`);
console.log(`${colors.bright}${colors.magenta}${'*'.repeat(80)}${colors.reset}`);
console.log(`\n${colors.dim}Analyzing ${Object.keys(MASTERCLASS_VIDEOS).length} video masterclass items...${colors.reset}`);

// Process each video
Object.entries(MASTERCLASS_VIDEOS).forEach(([key, video]) => {
  displayVideoData(key, video);
});

// Summary statistics
console.log(`\n${colors.bright}${colors.yellow}${'='.repeat(80)}${colors.reset}`);
console.log(`${colors.bright}${colors.white}SUMMARY STATISTICS${colors.reset}`);
console.log(`${colors.yellow}${'='.repeat(80)}${colors.reset}\n`);

const freeVideos = Object.values(MASTERCLASS_VIDEOS).filter(v => v.isFree);
const paidVideos = Object.values(MASTERCLASS_VIDEOS).filter(v => !v.isFree);
const featuredVideos = Object.values(MASTERCLASS_VIDEOS).filter(v => v.featured);
const totalDuration = Object.values(MASTERCLASS_VIDEOS).reduce((sum, v) => sum + v.duration, 0);

console.log(`${colors.bright}Total Videos:${colors.reset} ${colors.green}${Object.keys(MASTERCLASS_VIDEOS).length}${colors.reset}`);
console.log(`${colors.bright}Free Videos:${colors.reset} ${colors.green}${freeVideos.length}${colors.reset}`);
console.log(`${colors.bright}Paid Videos:${colors.reset} ${colors.red}${paidVideos.length}${colors.reset}`);
console.log(`${colors.bright}Featured Videos:${colors.reset} ${colors.yellow}${featuredVideos.length}${colors.reset}`);
console.log(`${colors.bright}Total Duration:${colors.reset} ${colors.magenta}${totalDuration} minutes${colors.reset}`);

// Check for missing video files
console.log(`\n${colors.bright}${colors.red}FILE VALIDATION:${colors.reset}`);
Object.entries(MASTERCLASS_VIDEOS).forEach(([key, video]) => {
  if (video.videoUrl && !video.isFree) {
    console.log(`${colors.yellow}⚠ ${key}: Has preview video at ${video.videoUrl}${colors.reset}`);
  }
  if (!video.videoUrl && video.isFree) {
    console.log(`${colors.red}✗ ${key}: Free video but missing video URL!${colors.reset}`);
  }
  if (!video.paymentUrl && !video.isFree) {
    console.log(`${colors.red}✗ ${key}: Paid video but missing payment URL!${colors.reset}`);
  }
});

console.log(`\n${colors.bright}${colors.green}Analysis complete!${colors.reset}\n`);