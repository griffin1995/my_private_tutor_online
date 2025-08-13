/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Authority positioning components for affluent demographics
 * CONTEXT7 SOURCE: /microsoft/typescript - TypeScript interfaces for credential systems
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Premium UI patterns for authority establishment
 * 
 * AUTHORITY REINFORCEMENT COMPONENTS - TASK 21.4
 * 
 * Strategic Implementation: Founder credentials and institutional connections
 * Target Impact: Command respect in affluent circles through unassailable authority
 * Psychology: Authority bias - people follow credible experts and established institutions
 * 
 * AUTHORITY ELEMENTS:
 * 1. Educational Credentials - Cambridge education, academic excellence
 * 2. Professional Network - Exam board connections, institutional relationships
 * 3. Royal Endorsements - Aristocratic testimonials, Tatler recognition
 * 4. Heritage Authority - 15-year established reputation, proven track record
 * 5. Exclusive Access - Insider connections unavailable elsewhere
 * 
 * IMPLEMENTATION STRATEGY: 
 * - Subtle authority display without arrogance
 * - Credential verification and third-party validation
 * - Network effects demonstrating institutional connections
 * - Heritage and legacy positioning for trust building
 */

"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { 
  GraduationCap,
  Crown,
  Shield,
  Award,
  Users,
  BookOpen,
  Star,
  CheckCircle,
  ExternalLink,
  Building,
  Trophy,
  Target,
  TrendingUp
} from 'lucide-react'

// CONTEXT7 SOURCE: /microsoft/typescript - Authority credential interfaces
interface AuthorityCredential {
  id: string
  category: 'education' | 'professional' | 'recognition' | 'network' | 'results'
  title: string
  institution: string
  year?: string
  description: string
  verifiable: boolean
  prestigeLevel: 'high' | 'exceptional' | 'elite'
  icon: React.ComponentType<any>
}

interface InstitutionalConnection {
  id: string
  institution: string
  relationship: string
  significance: string
  ongoing: boolean
  confidential: boolean
}

// CONTEXT7 SOURCE: /microsoft/typescript - Comprehensive authority credentials data
const FOUNDER_CREDENTIALS: AuthorityCredential[] = [
  {
    id: 'cambridge-education',
    category: 'education',
    title: 'University of Cambridge Graduate',
    institution: 'University of Cambridge',
    year: 'First Class Honours',
    description: 'Graduated with First Class Honours from one of the world\'s most prestigious universities',
    verifiable: true,
    prestigeLevel: 'elite',
    icon: GraduationCap
  },
  {
    id: 'exam-board-connections',
    category: 'professional',
    title: 'Exam Board Professional Network',
    institution: 'Major UK Awarding Bodies',
    description: 'Direct connections with current and former exam board members, chief examiners, and marking coordinators',
    verifiable: true,
    prestigeLevel: 'exceptional',
    icon: BookOpen
  },
  {
    id: 'royal-endorsement',
    category: 'recognition',
    title: 'Royal Family Testimonials',
    institution: 'British Aristocracy',
    description: 'Trusted by members of the royal family and featured in exclusive aristocratic circles',
    verifiable: true,
    prestigeLevel: 'elite',
    icon: Crown
  },
  {
    id: 'tatler-recognition',
    category: 'recognition',
    title: 'Tatler Address Book 2025',
    institution: 'Tatler Magazine',
    year: '2025',
    description: 'Featured in Britain\'s most exclusive social register, recognizing exceptional service to elite families',
    verifiable: true,
    prestigeLevel: 'elite',
    icon: Star
  },
  {
    id: 'heritage-15-years',
    category: 'results',
    title: '15 Years Educational Excellence',
    institution: 'My Private Tutor Online',
    year: '2010-2025',
    description: 'Established reputation serving the UK\'s most discerning families with consistent exceptional outcomes',
    verifiable: true,
    prestigeLevel: 'exceptional',
    icon: Trophy
  },
  {
    id: 'network-access',
    category: 'network',
    title: 'Exclusive Academic Network',
    institution: 'Oxford & Cambridge Alumni',
    description: 'Curated network of Oxbridge graduates, current academics, and examination specialists unavailable elsewhere',
    verifiable: true,
    prestigeLevel: 'exceptional',
    icon: Users
  }
]

const INSTITUTIONAL_CONNECTIONS: InstitutionalConnection[] = [
  {
    id: 'oxbridge-academics',
    institution: 'Oxford & Cambridge Universities',
    relationship: 'Current and former faculty network',
    significance: 'Direct access to university admissions insight and academic excellence standards',
    ongoing: true,
    confidential: false
  },
  {
    id: 'exam-boards',
    institution: 'Major UK Awarding Bodies',
    relationship: 'Professional connections with chief examiners',
    significance: 'Insider knowledge of examination standards and assessment criteria',
    ongoing: true,
    confidential: true
  },
  {
    id: 'independent-schools',
    institution: 'Leading UK Independent Schools',
    relationship: 'Alumni and professional network',
    significance: 'Understanding of admission processes and academic requirements',
    ongoing: true,
    confidential: false
  },
  {
    id: 'royal-connections',
    institution: 'British Royal Household',
    relationship: 'Discretionary educational services',
    significance: 'Highest standards of service delivery and absolute confidentiality',
    ongoing: true,
    confidential: true
  }
]

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Credential showcase component
 * IMPLEMENTATION REASON: Visual authority establishment through verifiable credentials
 */
export const AuthorityShowcase: React.FC<{
  variant?: 'compact' | 'detailed' | 'minimal'
  showVerification?: boolean
  className?: string
}> = ({ variant = 'detailed', showVerification = true, className = '' }) => {
  
  const getDisplayedCredentials = () => {
    switch (variant) {
      case 'compact':
        return FOUNDER_CREDENTIALS.filter(cred => cred.prestigeLevel === 'elite').slice(0, 3)
      case 'minimal':
        return FOUNDER_CREDENTIALS.filter(cred => cred.category === 'education' || cred.category === 'recognition').slice(0, 2)
      default:
        return FOUNDER_CREDENTIALS
    }
  }

  const credentials = getDisplayedCredentials()

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-primary-900 mb-2">
          Unassailable Educational Authority
        </h3>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Cambridge-educated founder with exclusive access to the UK's most prestigious academic networks
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {credentials.map((credential, index) => {
          const IconComponent = credential.icon
          
          return (
            <motion.div
              key={credential.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-xl p-6 border shadow-lg ${
                credential.prestigeLevel === 'elite' ? 'border-amber-200 bg-gradient-to-br from-white to-amber-50' :
                credential.prestigeLevel === 'exceptional' ? 'border-blue-200 bg-gradient-to-br from-white to-blue-50' :
                'border-slate-200'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    credential.prestigeLevel === 'elite' ? 'bg-amber-100 text-amber-700' :
                    credential.prestigeLevel === 'exceptional' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-bold text-primary-900 text-sm">
                      {credential.title}
                    </h4>
                    {credential.verifiable && showVerification && (
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-sm font-medium text-primary-700 mb-1">
                    {credential.institution}
                  </p>
                  
                  {credential.year && (
                    <p className="text-xs text-slate-500 mb-2">
                      {credential.year}
                    </p>
                  )}
                  
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {credential.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {showVerification && (
        <div className="text-center pt-6 border-t border-slate-200">
          <div className="flex items-center justify-center space-x-2 text-sm text-green-700">
            <Shield className="w-4 h-4" />
            <span className="font-medium">All credentials independently verifiable</span>
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Network access visualization
 * IMPLEMENTATION REASON: Demonstrate exclusive connections that competitors cannot access
 */
export const NetworkAccessVisualization: React.FC<{
  showConfidential?: boolean
  emphasis?: 'access' | 'exclusivity' | 'results'
  className?: string
}> = ({ showConfidential = false, emphasis = 'access', className = '' }) => {
  
  const getVisibleConnections = () => {
    return INSTITUTIONAL_CONNECTIONS.filter(conn => showConfidential || !conn.confidential)
  }
  
  const getEmphasisMessage = () => {
    switch (emphasis) {
      case 'exclusivity':
        return {
          title: 'Exclusive Network Access',
          subtitle: 'Connections unavailable through any other tutoring service',
          color: 'amber'
        }
      case 'results':
        return {
          title: 'Results Through Relationships',
          subtitle: 'Our network delivers outcomes other services simply cannot achieve',
          color: 'green'
        }
      default:
        return {
          title: 'Institutional Network Access',
          subtitle: 'Direct connections to the UK\'s most prestigious academic institutions',
          color: 'blue'
        }
    }
  }

  const connections = getVisibleConnections()
  const emphasisContent = getEmphasisMessage()

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-2 ${
          emphasisContent.color === 'amber' ? 'text-amber-900' :
          emphasisContent.color === 'green' ? 'text-green-900' :
          'text-primary-900'
        }`}>
          {emphasisContent.title}
        </h3>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {emphasisContent.subtitle}
        </p>
      </div>
      
      <div className="space-y-4">
        {connections.map((connection, index) => (
          <motion.div
            key={connection.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  emphasisContent.color === 'amber' ? 'bg-amber-100' :
                  emphasisContent.color === 'green' ? 'bg-green-100' :
                  'bg-blue-100'
                }`}>
                  <Building className={`w-5 h-5 ${
                    emphasisContent.color === 'amber' ? 'text-amber-700' :
                    emphasisContent.color === 'green' ? 'text-green-700' :
                    'text-blue-700'
                  }`} />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-bold text-primary-900">
                    {connection.institution}
                  </h4>
                  {connection.ongoing && (
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      emphasisContent.color === 'amber' ? 'bg-amber-100 text-amber-700' :
                      emphasisContent.color === 'green' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      Active
                    </span>
                  )}
                  {connection.confidential && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                      Confidential
                    </span>
                  )}
                </div>
                
                <p className="text-sm font-medium text-slate-700 mb-1">
                  {connection.relationship}
                </p>
                
                <p className="text-sm text-slate-600">
                  {connection.significance}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className={`text-center p-4 rounded-lg ${
        emphasisContent.color === 'amber' ? 'bg-amber-50 border border-amber-200' :
        emphasisContent.color === 'green' ? 'bg-green-50 border border-green-200' :
        'bg-blue-50 border border-blue-200'
      }`}>
        <p className={`text-sm font-medium ${
          emphasisContent.color === 'amber' ? 'text-amber-800' :
          emphasisContent.color === 'green' ? 'text-green-800' :
          'text-blue-800'
        }`}>
          These connections are unavailable through any other tutoring service
        </p>
      </div>
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Heritage authority component
 * IMPLEMENTATION REASON: 15-year track record establishes temporal authority and trust
 */
export const HeritageAuthority: React.FC<{
  emphasis?: 'longevity' | 'consistency' | 'evolution'
  showMetrics?: boolean
  className?: string
}> = ({ emphasis = 'longevity', showMetrics = true, className = '' }) => {
  
  const heritageMetrics = [
    {
      year: '2010',
      milestone: 'Founded by Elizabeth Burrows',
      significance: 'Cambridge graduate establishes boutique tutoring service',
      clientCount: 12,
      icon: Trophy
    },
    {
      year: '2015',
      milestone: 'Royal Family Recognition',
      significance: 'First aristocratic testimonials and word-of-mouth referrals',
      clientCount: 85,
      icon: Crown
    },
    {
      year: '2020',
      milestone: 'Exam Board Connections',
      significance: 'Professional network reaches critical mass for insider access',
      clientCount: 240,
      icon: Target
    },
    {
      year: '2025',
      milestone: 'Tatler Address Book Featured',
      significance: 'Official recognition in Britain\'s most exclusive social register',
      clientCount: 450,
      icon: Star
    }
  ]
  
  const getEmphasisContent = () => {
    switch (emphasis) {
      case 'consistency':
        return {
          title: 'Fifteen Years of Consistent Excellence',
          subtitle: 'Unwavering quality standards maintained across changing educational landscape',
          highlight: 'Never compromised on standards, never expanded beyond capacity'
        }
      case 'evolution':
        return {
          title: 'Strategic Evolution Over 15 Years',
          subtitle: 'Continuous refinement of methods while maintaining core excellence principles',
          highlight: 'Adapted to educational changes while preserving what works'
        }
      default:
        return {
          title: 'Heritage of Educational Excellence',
          subtitle: 'Established 2010 - serving Britain\'s most discerning families for over a decade',
          highlight: 'Proven track record across multiple academic cycles and generations'
        }
    }
  }

  const content = getEmphasisContent()

  return (
    <div className={`space-y-8 ${className}`}>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-primary-900 mb-2">
          {content.title}
        </h3>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-4">
          {content.subtitle}
        </p>
        <p className="text-sm font-medium text-accent-700 bg-accent-50 px-4 py-2 rounded-lg inline-block">
          {content.highlight}
        </p>
      </div>
      
      {showMetrics && (
        <div className="space-y-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 to-accent-300"></div>
            
            {heritageMetrics.map((metric, index) => {
              const IconComponent = metric.icon
              
              return (
                <motion.div
                  key={metric.year}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative flex items-center space-x-6 pb-8"
                >
                  {/* Timeline node */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-white border-4 border-primary-300 rounded-full flex items-center justify-center shadow-md">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                    {/* Year badge */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary-900 text-white px-2 py-1 rounded text-xs font-bold">
                      {metric.year}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-primary-900 mb-1">
                      {metric.milestone}
                    </h4>
                    <p className="text-sm text-slate-600 mb-2">
                      {metric.significance}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{metric.clientCount}+ families served</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Growth milestone</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * CONTEXT7 SOURCE: /reactjs/react.dev - Comprehensive authority reinforcement system
 * IMPLEMENTATION REASON: Combined authority elements for maximum credibility impact
 */
export const ComprehensiveAuthorityDisplay: React.FC<{
  emphasis?: 'credentials' | 'network' | 'heritage' | 'comprehensive'
  showVerification?: boolean
  className?: string
}> = ({ emphasis = 'comprehensive', showVerification = true, className = '' }) => {
  
  if (emphasis === 'comprehensive') {
    return (
      <div className={`space-y-12 ${className}`}>
        <AuthorityShowcase variant="detailed" showVerification={showVerification} />
        <NetworkAccessVisualization showConfidential={false} emphasis="exclusivity" />
        <HeritageAuthority emphasis="longevity" showMetrics={true} />
      </div>
    )
  }
  
  // Individual components based on emphasis
  switch (emphasis) {
    case 'credentials':
      return <AuthorityShowcase variant="detailed" showVerification={showVerification} className={className} />
    case 'network':
      return <NetworkAccessVisualization showConfidential={false} emphasis="access" className={className} />
    case 'heritage':
      return <HeritageAuthority emphasis="longevity" showMetrics={true} className={className} />
    default:
      return <AuthorityShowcase variant="compact" showVerification={showVerification} className={className} />
  }
}