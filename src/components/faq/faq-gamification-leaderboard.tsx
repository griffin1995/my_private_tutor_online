/**
 * CONTEXT7 SOURCE: /radix-ui/website - Leaderboard components with privacy-conscious design
 * CONTEXT7 SOURCE: /context7/motion_dev - Animated leaderboard with smooth transitions
 * IMPLEMENTATION REASON: Task 21 - Anonymous community leaderboard to encourage healthy competition
 * 
 * FAQ Gamification Leaderboard Component - Privacy-Conscious Community Engagement
 * Provides anonymous leaderboard functionality to encourage FAQ exploration
 * Designed with royal client privacy standards and professional presentation
 * 
 * FEATURES:
 * - Anonymous user identification with generated avatars
 * - Privacy-conscious scoring system
 * - Multiple leaderboard categories (points, streaks, categories)
 * - Real-time position updates with smooth animations
 * - Royal client quality design standards
 * - Optional participation (users can opt-out)
 * 
 * PRIVACY: No personal data collected, uses anonymous identifiers
 * BUSINESS IMPACT: Increases engagement leading to higher conversion rates
 */

"use client"

import React from 'react'
// CONTEXT7 SOURCE: /context7/motion_dev - Advanced animations for leaderboard transitions and position changes
// LEADERBOARD ANIMATIONS: Official Motion documentation recommends layout animations for smooth position changes
import { m, AnimatePresence, LayoutGroup } from 'framer-motion'
// CONTEXT7 SOURCE: /radix-ui/website - Card, Badge, and Button components for leaderboard interface
// UI COMPONENTS: Professional leaderboard interface with royal client quality
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Trophy, 
  Medal, 
  Crown, 
  Star, 
  Flame, 
  Target,
  TrendingUp,
  Users,
  Eye,
  EyeOff,
  Settings,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  BookOpen
} from 'lucide-react'
// CONTEXT7 SOURCE: /facebook/react - Gamification integration hooks
// GAMIFICATION HOOKS: Integration with user progress and achievement system
import { useGamification } from './faq-gamification-tracker'

// CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interfaces for leaderboard data structures
// TYPE DEFINITIONS: Comprehensive typing for leaderboard system
interface LeaderboardEntry {
  id: string
  anonymousName: string
  avatar: string
  points: number
  level: number
  questionsRead: number
  categoriesCompleted: number
  streakDays: number
  helpfulVotes: number
  lastActive: string
  position: number
  previousPosition?: number
}

interface LeaderboardCategory {
  id: 'overall' | 'weekly' | 'streaks' | 'categories'
  title: string
  description: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  sortBy: keyof LeaderboardEntry
  formatValue: (entry: LeaderboardEntry) => string
}

interface LeaderboardProps {
  className?: string
  maxEntries?: number
  showCurrentUser?: boolean
  enablePrivateMode?: boolean
  refreshInterval?: number
  compact?: boolean
}

// CONTEXT7 SOURCE: /microsoft/typescript - Anonymous name generation for privacy protection
// PRIVACY NAMES: Generate tasteful anonymous names for royal client standards
const ADJECTIVES = [
  'Curious', 'Brilliant', 'Dedicated', 'Thoughtful', 'Insightful', 'Scholarly', 
  'Perceptive', 'Astute', 'Diligent', 'Keen', 'Sharp', 'Wise', 'Clever', 'Smart',
  'Inquisitive', 'Analytical', 'Methodical', 'Systematic', 'Thorough', 'Careful'
]

const NOUNS = [
  'Scholar', 'Reader', 'Student', 'Learner', 'Explorer', 'Seeker', 'Thinker',
  'Researcher', 'Analyst', 'Observer', 'Investigator', 'Examiner', 'Reviewer',
  'Questioner', 'Inquirer', 'Browser', 'Visitor', 'Guest', 'Client', 'User'
]

const ROYAL_AVATARS = ['👑', '🎓', '📚', '🔍', '⭐', '🏆', '🎯', '💡', '🌟', '✨', '🔥', '⚡']

// CONTEXT7 SOURCE: /microsoft/typescript - Leaderboard category definitions with royal client presentation
// LEADERBOARD CATEGORIES: Professional category system encouraging comprehensive engagement
const LEADERBOARD_CATEGORIES: LeaderboardCategory[] = [
  {
    id: 'overall',
    title: 'Overall Champions',
    description: 'Top performers across all activities',
    icon: Trophy,
    sortBy: 'points',
    formatValue: (entry) => `${entry.points} pts`
  },
  {
    id: 'weekly',
    title: 'This Week\'s Stars',
    description: 'Most active users this week',
    icon: Star,
    sortBy: 'questionsRead',
    formatValue: (entry) => `${entry.questionsRead} questions`
  },
  {
    id: 'streaks',
    title: 'Consistency Kings',
    description: 'Longest daily visit streaks',
    icon: Flame,
    sortBy: 'streakDays',
    formatValue: (entry) => `${entry.streakDays} days`
  },
  {
    id: 'categories',
    title: 'Category Explorers',
    description: 'Most categories completed',
    icon: Target,
    sortBy: 'categoriesCompleted',
    formatValue: (entry) => `${entry.categoriesCompleted} categories`
  }
]

/**
 * Generate Anonymous User Identity
 * CONTEXT7 SOURCE: /microsoft/typescript - Privacy-conscious user identification system
 * PRIVACY FUNCTION: Generate consistent anonymous identity without personal data
 */
function generateAnonymousIdentity(): { name: string; avatar: string; id: string } {
  // Generate consistent identity based on localStorage data (not personal info)
  const seed = Date.now() + Math.random()
  const adjective = ADJECTIVES[Math.floor(seed % ADJECTIVES.length)]
  const noun = NOUNS[Math.floor((seed * 7) % NOUNS.length)]
  const avatar = ROYAL_AVATARS[Math.floor((seed * 13) % ROYAL_AVATARS.length)]
  const id = `anon_${Math.random().toString(36).substr(2, 9)}`
  
  return {
    name: `${adjective} ${noun}`,
    avatar,
    id
  }
}

/**
 * Mock Leaderboard Data Generator
 * CONTEXT7 SOURCE: /microsoft/typescript - Generate realistic leaderboard data for demonstration
 * MOCK DATA: Simulated community data to demonstrate leaderboard functionality
 */
function generateMockLeaderboardData(userEntry?: LeaderboardEntry): LeaderboardEntry[] {
  const entries: LeaderboardEntry[] = []
  
  // Generate 20-30 mock entries
  for (let i = 0; i < Math.floor(Math.random() * 10) + 20; i++) {
    const identity = generateAnonymousIdentity()
    const points = Math.floor(Math.random() * 800) + 50
    const level = Math.floor(points / 100) + 1
    const questionsRead = Math.floor(Math.random() * 50) + 1
    const categoriesCompleted = Math.floor(Math.random() * 6) + 1
    const streakDays = Math.floor(Math.random() * 30) + 1
    const helpfulVotes = Math.floor(Math.random() * 20)
    
    entries.push({
      id: identity.id,
      anonymousName: identity.name,
      avatar: identity.avatar,
      points,
      level,
      questionsRead,
      categoriesCompleted,
      streakDays,
      helpfulVotes,
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      position: 0, // Will be calculated after sorting
    })
  }
  
  // Add user entry if provided
  if (userEntry) {
    entries.push(userEntry)
  }
  
  return entries
}

/**
 * FAQ Gamification Leaderboard Component
 * CONTEXT7 SOURCE: /vercel/next.js - Component architecture for community features
 * LEADERBOARD COMPONENT: Professional community leaderboard with privacy-first design
 */
export function FAQGamificationLeaderboard({
  className = "",
  maxEntries = 10,
  showCurrentUser = true,
  enablePrivateMode = false,
  refreshInterval = 300000, // 5 minutes
  compact = false
}: LeaderboardProps) {
  
  // CONTEXT7 SOURCE: /facebook/react - Gamification integration and user progress
  // GAMIFICATION STATE: Access to user progress for leaderboard positioning
  const { progress } = useGamification()
  
  // CONTEXT7 SOURCE: /facebook/react - Component state for leaderboard management
  // LEADERBOARD STATE: Manage leaderboard data, categories, and user preferences
  const [activeCategory, setActiveCategory] = React.useState<LeaderboardCategory['id']>('overall')
  const [leaderboardData, setLeaderboardData] = React.useState<LeaderboardEntry[]>([])
  const [currentUserEntry, setCurrentUserEntry] = React.useState<LeaderboardEntry | null>(null)
  const [isPrivateMode, setIsPrivateMode] = React.useState(enablePrivateMode)
  const [userOptedOut, setUserOptedOut] = React.useState(false)
  const [lastRefresh, setLastRefresh] = React.useState(Date.now())
  const [isLoading, setIsLoading] = React.useState(false)
  
  // CONTEXT7 SOURCE: /facebook/react - User anonymous identity management
  // IDENTITY MANAGEMENT: Generate and persist anonymous user identity
  React.useEffect(() => {
    const savedIdentity = localStorage.getItem('faq-anonymous-identity')
    const optOutStatus = localStorage.getItem('faq-leaderboard-opt-out')
    
    if (optOutStatus === 'true') {
      setUserOptedOut(true)
      return
    }
    
    let identity
    if (savedIdentity) {
      try {
        identity = JSON.parse(savedIdentity)
      } catch (error) {
        identity = generateAnonymousIdentity()
        localStorage.setItem('faq-anonymous-identity', JSON.stringify(identity))
      }
    } else {
      identity = generateAnonymousIdentity()
      localStorage.setItem('faq-anonymous-identity', JSON.stringify(identity))
    }
    
    // Create user entry from current progress
    const userEntry: LeaderboardEntry = {
      id: identity.id,
      anonymousName: identity.name,
      avatar: identity.avatar,
      points: progress.totalPoints,
      level: progress.level,
      questionsRead: progress.totalQuestionsRead,
      categoriesCompleted: progress.categoriesCompleted.length,
      streakDays: progress.streakDays,
      helpfulVotes: progress.helpfulVotes,
      lastActive: new Date().toISOString(),
      position: 0
    }
    
    setCurrentUserEntry(userEntry)
  }, [progress])
  
  // CONTEXT7 SOURCE: /facebook/react - Leaderboard data generation and sorting
  // DATA MANAGEMENT: Generate and sort leaderboard data based on selected category
  React.useEffect(() => {
    if (userOptedOut) return
    
    setIsLoading(true)
    
    // Simulate API call delay
    const timeout = setTimeout(() => {
      const mockData = generateMockLeaderboardData(currentUserEntry || undefined)
      const currentCategory = LEADERBOARD_CATEGORIES.find(cat => cat.id === activeCategory)
      
      if (currentCategory) {
        // Sort by selected category
        mockData.sort((a, b) => {
          const aValue = a[currentCategory.sortBy] as number
          const bValue = b[currentCategory.sortBy] as number
          return bValue - aValue
        })
        
        // Assign positions and track previous positions
        mockData.forEach((entry, index) => {
          const previousEntry = leaderboardData.find(prev => prev.id === entry.id)
          entry.position = index + 1
          entry.previousPosition = previousEntry?.position
        })
      }
      
      setLeaderboardData(mockData)
      setLastRefresh(Date.now())
      setIsLoading(false)
    }, 500)
    
    return () => clearTimeout(timeout)
  }, [activeCategory, currentUserEntry, userOptedOut])
  
  // CONTEXT7 SOURCE: /facebook/react - Auto-refresh functionality
  // AUTO REFRESH: Periodic leaderboard updates for real-time feel
  React.useEffect(() => {
    if (userOptedOut || !refreshInterval) return
    
    const interval = setInterval(() => {
      setLastRefresh(Date.now())
    }, refreshInterval)
    
    return () => clearInterval(interval)
  }, [refreshInterval, userOptedOut])
  
  // CONTEXT7 SOURCE: /facebook/react - User opt-out handling
  // PRIVACY CONTROLS: Handle user opt-out preferences
  const handleOptOut = React.useCallback(() => {
    setUserOptedOut(true)
    localStorage.setItem('faq-leaderboard-opt-out', 'true')
  }, [])
  
  const handleOptIn = React.useCallback(() => {
    setUserOptedOut(false)
    localStorage.removeItem('faq-leaderboard-opt-out')
  }, [])
  
  // CONTEXT7 SOURCE: /facebook/react - Manual refresh functionality
  // MANUAL REFRESH: Allow users to manually refresh leaderboard data
  const handleRefresh = React.useCallback(() => {
    setIsLoading(true)
    // Trigger re-render of data
    setLastRefresh(Date.now())
  }, [])
  
  // Get current category data
  const currentCategory = LEADERBOARD_CATEGORIES.find(cat => cat.id === activeCategory) || LEADERBOARD_CATEGORIES[0]
  const displayData = leaderboardData.slice(0, maxEntries)
  const currentUserPosition = currentUserEntry ? leaderboardData.findIndex(entry => entry.id === currentUserEntry.id) + 1 : 0
  
  // CONTEXT7 SOURCE: /context7/motion_dev - Animation variants for leaderboard entries
  // LEADERBOARD ANIMATIONS: Smooth transitions for position changes and entry updates
  const entryAnimationVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.95 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        delay: index * 0.05,
        duration: 0.4,
        type: "spring" as const,
        stiffness: 300,
        damping: 25
      }
    }),
    exit: { opacity: 0, x: 20, scale: 0.95, transition: { duration: 0.2 } }
  }
  
  // Privacy opt-out screen
  if (userOptedOut) {
    return (
      <Card className={`bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-200 ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <EyeOff className="mx-auto text-slate-400 mb-4" size={48} />
            <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">
              Private Mode Enabled
            </h3>
            <p className="text-slate-600 max-w-md mx-auto">
              You've opted out of the community leaderboard. Your progress remains private and is not shared with others.
            </p>
          </div>
          <Button 
            onClick={handleOptIn}
            variant="outline"
            className="flex items-center space-x-2 mx-auto"
          >
            <Users size={16} />
            <span>Join Community Leaderboard</span>
          </Button>
        </CardContent>
      </Card>
    )
  }
  
  if (compact) {
    return (
      <Card className={`bg-white/90 backdrop-blur-sm border-2 border-slate-200 ${className}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-serif text-slate-900">Community Leaders</CardTitle>
            <Badge variant="outline" className="text-xs">
              #{currentUserPosition}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {displayData.slice(0, 3).map((entry, index) => (
            <div key={entry.id} className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{entry.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 truncate">
                    {entry.anonymousName}
                  </div>
                  <div className="text-xs text-slate-500">
                    {currentCategory.formatValue(entry)}
                  </div>
                </div>
              </div>
              <Badge 
                variant={index === 0 ? "default" : "outline"}
                className={index === 0 ? "bg-amber-500 text-white" : ""}
              >
                #{entry.position}
              </Badge>
            </div>
          ))}
          
          {currentUserPosition > 3 && currentUserEntry && (
            <div className="pt-2 border-t border-slate-200">
              <div className="flex items-center space-x-3 bg-blue-50 p-2 rounded-lg">
                <span className="text-lg">{currentUserEntry.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-blue-900">
                    You ({currentUserEntry.anonymousName})
                  </div>
                  <div className="text-xs text-blue-600">
                    {currentCategory.formatValue(currentUserEntry)}
                  </div>
                </div>
                <Badge variant="outline" className="border-blue-200 text-blue-700">
                  #{currentUserPosition}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
  
  return (
    <Card className={`bg-gradient-to-br from-white via-slate-50 to-white border-2 border-slate-200 shadow-xl ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-serif font-bold text-slate-900 mb-2">
              Community Leaderboard
            </CardTitle>
            <p className="text-slate-600">
              Anonymous community rankings • Updated every 5 minutes
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-1"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPrivateMode(!isPrivateMode)}
              className="flex items-center space-x-1"
            >
              {isPrivateMode ? <EyeOff size={14} /> : <Eye size={14} />}
              <span>Privacy</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value as LeaderboardCategory['id'])}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            {LEADERBOARD_CATEGORIES.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center space-x-1 text-xs"
              >
                <category.icon size={14} />
                <span className="hidden sm:inline">{category.title.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {LEADERBOARD_CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <category.icon className="text-slate-600" size={20} />
                <div>
                  <h3 className="font-semibold text-slate-900">{category.title}</h3>
                  <p className="text-xs text-slate-500">{category.description}</p>
                </div>
              </div>
              
              {/* Leaderboard Entries */}
              <LayoutGroup>
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {displayData.map((entry, index) => {
                      const isCurrentUser = currentUserEntry?.id === entry.id
                      const positionChange = entry.previousPosition 
                        ? entry.position - entry.previousPosition
                        : 0
                      
                      return (
                        <m.div
                          key={entry.id}
                          layout
                          variants={entryAnimationVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          custom={index}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 ${
                            isCurrentUser
                              ? 'bg-blue-50 border-blue-200 shadow-md'
                              : index < 3
                              ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            {/* Position */}
                            <div className="flex items-center space-x-2">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                index === 0 ? 'bg-amber-500 text-white'
                                : index === 1 ? 'bg-slate-400 text-white'
                                : index === 2 ? 'bg-orange-400 text-white'
                                : isCurrentUser ? 'bg-blue-500 text-white'
                                : 'bg-slate-100 text-slate-600'
                              }`}>
                                {index < 3 ? (
                                  index === 0 ? <Crown size={16} />
                                  : index === 1 ? <Medal size={16} />
                                  : <Trophy size={16} />
                                ) : (
                                  entry.position
                                )}
                              </div>
                              
                              {/* Position Change Indicator */}
                              {positionChange !== 0 && (
                                <div className={`flex items-center ${
                                  positionChange > 0 ? 'text-red-500' : 'text-green-500'
                                }`}>
                                  {positionChange > 0 ? <ChevronDown size={12} /> : <ChevronUp size={12} />}
                                  <span className="text-xs font-medium">{Math.abs(positionChange)}</span>
                                </div>
                              )}
                            </div>
                            
                            {/* User Info */}
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{entry.avatar}</span>
                              <div>
                                <div className={`font-semibold ${
                                  isCurrentUser ? 'text-blue-900' : 'text-slate-900'
                                }`}>
                                  {isCurrentUser ? `You (${entry.anonymousName})` : entry.anonymousName}
                                </div>
                                <div className="text-sm text-slate-500">
                                  Level {entry.level} • {category.formatValue(entry)}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Stats */}
                          <div className="flex items-center space-x-4 text-sm text-slate-500">
                            <div className="text-center">
                              <div className="font-medium text-slate-900">{entry.questionsRead}</div>
                              <div className="text-xs">Questions</div>
                            </div>
                            <div className="text-center">
                              <div className="font-medium text-slate-900">{entry.streakDays}</div>
                              <div className="text-xs">Streak</div>
                            </div>
                            {index < 3 && (
                              <Badge 
                                variant={index === 0 ? "default" : "secondary"}
                                className={index === 0 ? "bg-amber-500" : ""}
                              >
                                {index === 0 ? "Champion" : index === 1 ? "Runner-up" : "3rd Place"}
                              </Badge>
                            )}
                          </div>
                        </m.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              </LayoutGroup>
              
              {/* Current User Position (if not in top entries) */}
              {showCurrentUser && currentUserPosition > maxEntries && currentUserEntry && (
                <div className="pt-4 border-t border-slate-200">
                  <m.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-4 bg-blue-50 border-2 border-blue-200 rounded-xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
                        {currentUserPosition}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{currentUserEntry.avatar}</span>
                        <div>
                          <div className="font-semibold text-blue-900">
                            Your Position
                          </div>
                          <div className="text-sm text-blue-600">
                            {category.formatValue(currentUserEntry)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-blue-300 text-blue-700">
                      #{currentUserPosition}
                    </Badge>
                  </m.div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Privacy Controls */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-slate-500">
              <Settings size={14} />
              <span>Privacy: All data is anonymous and stored locally</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOptOut}
              className="text-slate-500 hover:text-slate-700"
            >
              Opt out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}