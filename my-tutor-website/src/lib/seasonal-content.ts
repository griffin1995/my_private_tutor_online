/**
 * Seasonal content management system
 * Provides dynamic content switching based on current time of year
 */

export interface SeasonalContent {
  title: string;
  description: string;
  ctaText: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  focusArea: string;
  bgGradient: string;
}

export const seasonalContent: Record<string, SeasonalContent> = {
  spring: {
    title: "Spring into Academic Success",
    description: "New term preparation and foundation building for confident progression. Expert tutors ready to nurture your child's potential.",
    ctaText: "Start Fresh This Term",
    season: 'spring',
    focusArea: "Foundation & Preparation",
    bgGradient: "bg-gradient-to-b from-green-50 to-white"
  },
  summer: {
    title: "Summer Learning Excellence",
    description: "Intensive exam preparation and skill development during the summer break. Maintain momentum with structured learning.",
    ctaText: "Book Summer Programme",
    season: 'summer',
    focusArea: "Intensive Preparation",
    bgGradient: "bg-gradient-to-b from-yellow-50 to-white"
  },
  autumn: {
    title: "Autumn Term Academic Excellence",
    description: "Back-to-school support and exam preparation for the new academic year. Build confidence for upcoming challenges.",
    ctaText: "Secure Autumn Success",
    season: 'autumn',
    focusArea: "Term Preparation",
    bgGradient: "bg-gradient-to-b from-orange-50 to-white"
  },
  winter: {
    title: "Winter Exam Mastery",
    description: "Final exam preparation and mock exam support. Achieve your best results with targeted revision programmes.",
    ctaText: "Master Winter Exams",
    season: 'winter',
    focusArea: "Exam Excellence",
    bgGradient: "bg-gradient-to-b from-blue-50 to-white"
  }
};

/**
 * Determines current season based on date
 * UK academic calendar consideration
 */
export function getCurrentSeason(): 'spring' | 'summer' | 'autumn' | 'winter' {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  
  // UK academic calendar alignment
  if (month >= 2 && month <= 4) return 'spring';    // March-May
  if (month >= 5 && month <= 7) return 'summer';    // June-August
  if (month >= 8 && month <= 10) return 'autumn';   // September-November
  return 'winter';                                   // December-February
}

/**
 * Gets content for current season
 */
export function getCurrentSeasonalContent(): SeasonalContent {
  const season = getCurrentSeason();
  return seasonalContent[season];
}

/**
 * Gets content for specific season
 */
export function getSeasonalContent(season: 'spring' | 'summer' | 'autumn' | 'winter'): SeasonalContent {
  return seasonalContent[season];
}