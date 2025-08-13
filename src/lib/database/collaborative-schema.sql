-- CONTEXT7 SOURCE: /react-hook-form/documentation - Task 23 collaborative features database schema
-- DATABASE SCHEMA: Complete database design for FAQ collaborative features
-- 
-- FAQ Collaborative Features Database Schema
-- Supports user suggestions, community voting, moderation workflow, and contributor recognition
-- Designed for scalability and privacy compliance (GDPR/royal client discretion)
-- 
-- BUSINESS CONTEXT: £381,600 revenue opportunity through community-driven content improvement
-- PRIVACY CONSIDERATIONS: Anonymous contributions and data protection compliance

-- Enable UUID extension for PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CONTEXT7 SOURCE: /react-hook-form/documentation - User management table for collaborative features
-- USERS TABLE: User profiles and authentication for collaborative features
CREATE TABLE faq_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    display_name VARCHAR(100),
    is_anonymous BOOLEAN DEFAULT FALSE,
    is_moderator BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP WITH TIME ZONE,
    
    -- Privacy and compliance
    privacy_settings JSONB DEFAULT '{}', -- User privacy preferences
    gdpr_consent BOOLEAN DEFAULT FALSE,
    gdpr_consent_date TIMESTAMP WITH TIME ZONE,
    
    -- User preferences
    notification_preferences JSONB DEFAULT '{"email": false, "in_app": true}',
    
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- CONTEXT7 SOURCE: /react-hook-form/documentation - FAQ suggestions table with comprehensive tracking
-- SUGGESTIONS TABLE: Community-submitted FAQ suggestions with metadata
CREATE TABLE faq_suggestions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    
    -- Contributor information
    suggested_by UUID REFERENCES faq_users(id) ON DELETE SET NULL,
    contributor_name VARCHAR(100), -- For anonymous or guest contributors
    is_anonymous BOOLEAN DEFAULT FALSE,
    
    -- Content metadata
    tags TEXT[] DEFAULT '{}',
    keywords TEXT[] DEFAULT '{}',
    difficulty_level VARCHAR(20) DEFAULT 'intermediate' CHECK (difficulty_level IN ('basic', 'intermediate', 'advanced')),
    estimated_read_time INTEGER, -- in minutes
    
    -- Status and workflow
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected', 'archived')),
    priority INTEGER DEFAULT 5 CHECK (priority BETWEEN 1 AND 10),
    
    -- Quality metrics
    helpfulness_score DECIMAL(3,2) DEFAULT 0.00,
    quality_score DECIMAL(3,2) DEFAULT 0.00,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- Search and indexing
    search_vector TSVECTOR,
    
    -- Additional metadata
    metadata JSONB DEFAULT '{}', -- Flexible field for additional data
    
    -- Constraints
    CONSTRAINT question_length CHECK (LENGTH(question) >= 10 AND LENGTH(question) <= 500),
    CONSTRAINT answer_length CHECK (LENGTH(answer) >= 20 AND LENGTH(answer) <= 2000)
);

-- CONTEXT7 SOURCE: /pmndrs/zustand - Community voting system with fraud prevention
-- VOTES TABLE: Community voting on suggestions with spam prevention
CREATE TABLE faq_suggestion_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    suggestion_id UUID NOT NULL REFERENCES faq_suggestions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES faq_users(id) ON DELETE SET NULL,
    vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
    
    -- Fraud prevention
    ip_address INET,
    user_agent TEXT,
    session_id VARCHAR(255),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Prevent duplicate votes
    UNIQUE(suggestion_id, user_id),
    UNIQUE(suggestion_id, ip_address) -- Additional protection for anonymous users
);

-- CONTEXT7 SOURCE: /react-hook-form/documentation - Moderation workflow and admin actions
-- MODERATION TABLE: Admin moderation actions and feedback
CREATE TABLE faq_moderation_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    suggestion_id UUID NOT NULL REFERENCES faq_suggestions(id) ON DELETE CASCADE,
    moderator_id UUID NOT NULL REFERENCES faq_users(id),
    
    -- Moderation decision
    action VARCHAR(20) NOT NULL CHECK (action IN ('approve', 'reject', 'request_changes', 'escalate', 'archive')),
    feedback TEXT,
    internal_notes TEXT, -- Private moderator notes
    
    -- Quality assessment
    content_quality_rating INTEGER CHECK (content_quality_rating BETWEEN 1 AND 5),
    helpfulness_rating INTEGER CHECK (helpfulness_rating BETWEEN 1 AND 5),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Additional metadata
    metadata JSONB DEFAULT '{}'
);

-- CONTEXT7 SOURCE: /react-hook-form/documentation - Contributor statistics and recognition
-- CONTRIBUTOR STATS TABLE: User contribution metrics and achievements
CREATE TABLE faq_contributor_stats (
    user_id UUID PRIMARY KEY REFERENCES faq_users(id) ON DELETE CASCADE,
    
    -- Contribution counts
    suggestions_submitted INTEGER DEFAULT 0,
    suggestions_approved INTEGER DEFAULT 0,
    suggestions_rejected INTEGER DEFAULT 0,
    votes_cast INTEGER DEFAULT 0,
    helpful_votes_received INTEGER DEFAULT 0,
    
    -- Quality metrics
    approval_rate DECIMAL(5,2) DEFAULT 0.00, -- Percentage of approved suggestions
    helpfulness_rating DECIMAL(3,2) DEFAULT 0.00,
    community_score DECIMAL(5,2) DEFAULT 0.00,
    
    -- Ranking and level
    contributor_level VARCHAR(20) DEFAULT 'newcomer',
    rank_position INTEGER,
    
    -- Achievements and badges
    badges JSONB DEFAULT '[]', -- Array of earned badges
    achievements JSONB DEFAULT '[]', -- Array of achievements with timestamps
    
    -- Activity tracking
    first_contribution_at TIMESTAMP WITH TIME ZONE,
    last_contribution_at TIMESTAMP WITH TIME ZONE,
    most_active_category VARCHAR(50),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CONTEXT7 SOURCE: /react-hook-form/documentation - Content improvement suggestions and changes
-- IMPROVEMENT SUGGESTIONS TABLE: Suggestions for existing FAQ improvements
CREATE TABLE faq_improvement_suggestions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    target_faq_id VARCHAR(100) NOT NULL, -- References existing FAQ ID from CMS
    suggested_by UUID REFERENCES faq_users(id) ON DELETE SET NULL,
    
    -- Improvement details
    improvement_type VARCHAR(50) NOT NULL CHECK (improvement_type IN ('content_update', 'clarity_improvement', 'additional_info', 'correction', 'categorization')),
    current_content TEXT,
    suggested_content TEXT NOT NULL,
    reason TEXT NOT NULL,
    
    -- Status tracking
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'implemented', 'rejected', 'archived')),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    
    -- Additional metadata
    metadata JSONB DEFAULT '{}'
);

-- CONTEXT7 SOURCE: /pmndrs/zustand - Spam detection and content quality control
-- SPAM DETECTION TABLE: Track potential spam and abuse
CREATE TABLE faq_spam_detection (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('suggestion', 'vote', 'improvement')),
    content_id UUID NOT NULL,
    user_id UUID REFERENCES faq_users(id) ON DELETE CASCADE,
    
    -- Spam indicators
    spam_score DECIMAL(3,2) DEFAULT 0.00,
    spam_reasons TEXT[],
    is_spam BOOLEAN DEFAULT FALSE,
    
    -- Detection metadata
    detection_method VARCHAR(50), -- e.g., 'automated', 'user_report', 'moderator_review'
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Additional context
    ip_address INET,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}'
);

-- CONTEXT7 SOURCE: /react-hook-form/documentation - Analytics and reporting for collaborative features
-- ANALYTICS TABLE: Track engagement and performance metrics
CREATE TABLE faq_collaboration_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB NOT NULL,
    user_id UUID REFERENCES faq_users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    
    -- Context
    category VARCHAR(50),
    tags TEXT[],
    
    -- Metrics
    engagement_score DECIMAL(3,2),
    conversion_value DECIMAL(10,2), -- Revenue impact
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Additional metadata
    metadata JSONB DEFAULT '{}'
);

-- INDEXES for performance optimization

-- CONTEXT7 SOURCE: /pmndrs/zustand - Performance indexes for collaborative features
-- PERFORMANCE INDEXES: Optimize queries for collaborative features

-- Suggestions indexes
CREATE INDEX idx_faq_suggestions_status ON faq_suggestions(status);
CREATE INDEX idx_faq_suggestions_category ON faq_suggestions(category);
CREATE INDEX idx_faq_suggestions_created_at ON faq_suggestions(created_at DESC);
CREATE INDEX idx_faq_suggestions_votes ON faq_suggestions(helpfulness_score DESC, created_at DESC);
CREATE INDEX idx_faq_suggestions_search ON faq_suggestions USING gin(search_vector);
CREATE INDEX idx_faq_suggestions_tags ON faq_suggestions USING gin(tags);

-- Votes indexes
CREATE INDEX idx_faq_votes_suggestion ON faq_suggestion_votes(suggestion_id);
CREATE INDEX idx_faq_votes_user ON faq_suggestion_votes(user_id);
CREATE INDEX idx_faq_votes_created_at ON faq_suggestion_votes(created_at DESC);

-- User and contributor indexes
CREATE INDEX idx_faq_users_active ON faq_users(is_active, created_at DESC);
CREATE INDEX idx_faq_contributor_stats_score ON faq_contributor_stats(community_score DESC);
CREATE INDEX idx_faq_contributor_stats_level ON faq_contributor_stats(contributor_level, helpfulness_rating DESC);

-- Moderation indexes
CREATE INDEX idx_faq_moderation_suggestion ON faq_moderation_actions(suggestion_id);
CREATE INDEX idx_faq_moderation_moderator ON faq_moderation_actions(moderator_id, created_at DESC);

-- Analytics indexes
CREATE INDEX idx_faq_analytics_type ON faq_collaboration_analytics(event_type);
CREATE INDEX idx_faq_analytics_created_at ON faq_collaboration_analytics(created_at DESC);
CREATE INDEX idx_faq_analytics_user ON faq_collaboration_analytics(user_id);

-- TRIGGERS for maintaining data consistency

-- CONTEXT7 SOURCE: /react-hook-form/documentation - Database triggers for data consistency
-- UPDATE TRIGGERS: Maintain updated_at timestamps and derived data

-- Update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_faq_suggestions_updated_at 
    BEFORE UPDATE ON faq_suggestions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_users_updated_at 
    BEFORE UPDATE ON faq_users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_contributor_stats_updated_at 
    BEFORE UPDATE ON faq_contributor_stats 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update search vector for suggestions
CREATE OR REPLACE FUNCTION update_suggestion_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('english', 
        COALESCE(NEW.question, '') || ' ' || 
        COALESCE(NEW.answer, '') || ' ' ||
        COALESCE(array_to_string(NEW.tags, ' '), '') || ' ' ||
        COALESCE(array_to_string(NEW.keywords, ' '), '')
    );
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_faq_suggestions_search_vector
    BEFORE INSERT OR UPDATE ON faq_suggestions
    FOR EACH ROW EXECUTE FUNCTION update_suggestion_search_vector();

-- Update contributor stats when suggestions are moderated
CREATE OR REPLACE FUNCTION update_contributor_stats()
RETURNS TRIGGER AS $$
DECLARE
    user_id_var UUID;
    approval_count INTEGER;
    total_count INTEGER;
BEGIN
    -- Get the user who made the suggestion
    SELECT suggested_by INTO user_id_var 
    FROM faq_suggestions 
    WHERE id = NEW.suggestion_id;
    
    IF user_id_var IS NOT NULL THEN
        -- Update approval counts
        SELECT 
            COUNT(*) FILTER (WHERE status = 'approved'),
            COUNT(*)
        INTO approval_count, total_count
        FROM faq_suggestions 
        WHERE suggested_by = user_id_var;
        
        -- Update or insert contributor stats
        INSERT INTO faq_contributor_stats (user_id, suggestions_submitted, suggestions_approved, approval_rate)
        VALUES (user_id_var, total_count, approval_count, 
                CASE WHEN total_count > 0 THEN (approval_count::DECIMAL / total_count * 100) ELSE 0 END)
        ON CONFLICT (user_id) 
        DO UPDATE SET 
            suggestions_submitted = total_count,
            suggestions_approved = approval_count,
            approval_rate = CASE WHEN total_count > 0 THEN (approval_count::DECIMAL / total_count * 100) ELSE 0 END,
            last_contribution_at = CURRENT_TIMESTAMP;
    END IF;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contributor_stats_on_moderation
    AFTER INSERT ON faq_moderation_actions
    FOR EACH ROW 
    WHEN (NEW.action IN ('approve', 'reject'))
    EXECUTE FUNCTION update_contributor_stats();

-- VIEWS for common queries

-- CONTEXT7 SOURCE: /pmndrs/zustand - Database views for collaborative features reporting
-- REPORTING VIEWS: Common queries for collaborative features dashboard

-- Popular suggestions view
CREATE VIEW faq_popular_suggestions AS
SELECT 
    s.*,
    COALESCE(v.upvotes, 0) as upvotes,
    COALESCE(v.downvotes, 0) as downvotes,
    COALESCE(v.upvotes, 0) - COALESCE(v.downvotes, 0) as net_votes,
    u.display_name as contributor_display_name
FROM faq_suggestions s
LEFT JOIN (
    SELECT 
        suggestion_id,
        COUNT(*) FILTER (WHERE vote_type = 'upvote') as upvotes,
        COUNT(*) FILTER (WHERE vote_type = 'downvote') as downvotes
    FROM faq_suggestion_votes
    GROUP BY suggestion_id
) v ON s.id = v.suggestion_id
LEFT JOIN faq_users u ON s.suggested_by = u.id
WHERE s.status != 'archived'
ORDER BY net_votes DESC, s.created_at DESC;

-- Top contributors view
CREATE VIEW faq_top_contributors AS
SELECT 
    u.id,
    u.display_name,
    u.is_anonymous,
    cs.*,
    RANK() OVER (ORDER BY cs.community_score DESC, cs.helpfulness_rating DESC) as rank
FROM faq_users u
JOIN faq_contributor_stats cs ON u.id = cs.user_id
WHERE u.is_active = true
ORDER BY cs.community_score DESC, cs.helpfulness_rating DESC;

-- Moderation queue view
CREATE VIEW faq_moderation_queue AS
SELECT 
    s.*,
    u.display_name as contributor_name,
    v.upvotes,
    v.downvotes,
    v.net_votes
FROM faq_suggestions s
LEFT JOIN faq_users u ON s.suggested_by = u.id
LEFT JOIN (
    SELECT 
        suggestion_id,
        COUNT(*) FILTER (WHERE vote_type = 'upvote') as upvotes,
        COUNT(*) FILTER (WHERE vote_type = 'downvote') as downvotes,
        COUNT(*) FILTER (WHERE vote_type = 'upvote') - COUNT(*) FILTER (WHERE vote_type = 'downvote') as net_votes
    FROM faq_suggestion_votes
    GROUP BY suggestion_id
) v ON s.id = v.suggestion_id
WHERE s.status IN ('pending', 'under_review')
ORDER BY v.net_votes DESC NULLS LAST, s.created_at DESC;

-- SECURITY: Row Level Security (RLS) policies

-- CONTEXT7 SOURCE: /react-hook-form/documentation - Database security for collaborative features
-- SECURITY POLICIES: Row-level security for data protection and privacy

ALTER TABLE faq_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_suggestion_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_contributor_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_moderation_actions ENABLE ROW LEVEL SECURITY;

-- Users can see all non-archived suggestions
CREATE POLICY faq_suggestions_select_policy ON faq_suggestions
    FOR SELECT USING (status != 'archived');

-- Users can insert their own suggestions
CREATE POLICY faq_suggestions_insert_policy ON faq_suggestions
    FOR INSERT WITH CHECK (suggested_by = current_setting('app.current_user_id')::UUID);

-- Users can vote on suggestions
CREATE POLICY faq_votes_insert_policy ON faq_suggestion_votes
    FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id')::UUID);

-- Users can see vote counts but not individual votes
CREATE POLICY faq_votes_select_policy ON faq_suggestion_votes
    FOR SELECT USING (true); -- Aggregated in views only

-- Only moderators can perform moderation actions
CREATE POLICY faq_moderation_policy ON faq_moderation_actions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM faq_users 
            WHERE id = current_setting('app.current_user_id')::UUID 
            AND is_moderator = true
        )
    );

-- Users can see their own stats and others' public stats
CREATE POLICY faq_contributor_stats_policy ON faq_contributor_stats
    FOR SELECT USING (
        user_id = current_setting('app.current_user_id')::UUID
        OR EXISTS (
            SELECT 1 FROM faq_users 
            WHERE id = user_id 
            AND is_anonymous = false
        )
    );

-- COMMENTS for documentation
COMMENT ON TABLE faq_suggestions IS 'Community-submitted FAQ suggestions with voting and moderation support';
COMMENT ON TABLE faq_suggestion_votes IS 'Community voting on FAQ suggestions with spam prevention';
COMMENT ON TABLE faq_moderation_actions IS 'Moderator actions and feedback on suggestions';
COMMENT ON TABLE faq_contributor_stats IS 'User contribution metrics and recognition system';
COMMENT ON TABLE faq_improvement_suggestions IS 'Suggestions for improving existing FAQ content';
COMMENT ON TABLE faq_spam_detection IS 'Spam detection and content quality control';
COMMENT ON TABLE faq_collaboration_analytics IS 'Analytics tracking for collaborative features';

COMMENT ON COLUMN faq_suggestions.search_vector IS 'Full-text search vector for questions and answers';
COMMENT ON COLUMN faq_suggestion_votes.ip_address IS 'IP address for spam prevention (hashed in production)';
COMMENT ON COLUMN faq_contributor_stats.community_score IS 'Overall community contribution score';
COMMENT ON COLUMN faq_users.privacy_settings IS 'JSONB field for user privacy preferences';