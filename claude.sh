#!/bin/bash
# Claude Code Startup Script with Agent Ecosystem Integration
# Prepares Claude Code with proper agent context and ecosystem state

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Emojis
ROBOT="🤖"
CHECK="✅"
WARN="⚠️"
INFO="ℹ️"
ROCKET="🚀"
BRAIN="🧠"
GEAR="⚙️"

# Project paths
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
AGENT_MANAGER="$PROJECT_ROOT/.claude/scripts/agent-manager.sh"
CONTEXT_DIR="$PROJECT_ROOT/.claude/context"

echo -e "${CYAN}${ROBOT} Claude Code Agent Ecosystem Startup${NC}"
echo -e "${BLUE}Project: My Private Tutor Online${NC}"
echo ""

# Validate agent ecosystem first
echo -e "${YELLOW}${GEAR} Validating agent ecosystem...${NC}"
if [ -f "$AGENT_MANAGER" ]; then
    if ! bash "$AGENT_MANAGER" validate > /dev/null 2>&1; then
        echo -e "${RED}${WARN} Agent ecosystem validation failed${NC}"
        echo -e "${INFO} Running validation with details...${NC}"
        bash "$AGENT_MANAGER" validate
        exit 1
    fi
    echo -e "${GREEN}${CHECK} Agent ecosystem validated${NC}"
else
    echo -e "${RED}${WARN} Agent manager not found at $AGENT_MANAGER${NC}"
    exit 1
fi

# Show current ecosystem status
echo -e "${YELLOW}${GEAR} Checking agent ecosystem status...${NC}"
AGENT_COUNT=$(bash "$AGENT_MANAGER" status | grep "Total Available Agents:" | grep -o '[0-9]\+' || echo "0")
ACTIVE_WORKTREES=$(bash "$AGENT_MANAGER" status | grep "Active Worktrees:" | grep -o '[0-9]\+' || echo "0")

echo -e "${GREEN}${CHECK} ${AGENT_COUNT} agents available${NC}"
echo -e "${BLUE}${INFO} ${ACTIVE_WORKTREES} active worktrees${NC}"

# Create startup context file for Claude Code session
mkdir -p "$CONTEXT_DIR"
cat > "$CONTEXT_DIR/session-startup.md" << EOF
# Claude Code Session - Agent Ecosystem Ready

## Session Status
- **Started**: $(date)
- **Project**: My Private Tutor Online
- **Available Agents**: ${AGENT_COUNT}
- **Active Worktrees**: ${ACTIVE_WORKTREES}

## Agent Management Commands
\`\`\`bash
# Get agent recommendations
./.claude/scripts/agent-manager.sh recommend "your task description"

# Create worktree with agent
./.claude/scripts/agent-manager.sh create worktree-name agent-type

# Check status
./.claude/scripts/agent-manager.sh status

# List all agents
./.claude/scripts/agent-manager.sh list
\`\`\`

## Task Delegation Guidelines
- **Simple tasks** (content changes, CSS tweaks): Use Task tool directly
- **Complex tasks** (new features, architecture): Create dedicated worktree
- **Multi-step tasks**: Consider agent coordination workflow

## Project Standards
- Follow CLAUDE.md standards (Context7 MCP documentation required)
- British English, premium service quality
- Agent specialization: Haiku (simple), Sonnet (complex), Opus (strategic)

---
*Agent ecosystem initialized and ready for Claude Code session*
EOF

echo -e "${GREEN}${CHECK} Session context prepared${NC}"
echo ""

# Display quick start guide
echo -e "${CYAN}${BRAIN} Quick Start Guide:${NC}"
echo -e "${YELLOW}For task delegation:${NC}"
echo "  Use Task tool with appropriate subagent_type"
echo "  Or run: ./.claude/scripts/agent-manager.sh recommend 'your task'"
echo ""
echo -e "${YELLOW}For complex projects:${NC}"
echo "  Run: ./.claude/scripts/agent-manager.sh create project-name agent-type"
echo ""
echo -e "${YELLOW}To check ecosystem:${NC}"
echo "  Run: ./.claude/scripts/agent-manager.sh status"
echo ""

# Start Claude Code with agent context
echo -e "${ROCKET}${GREEN} Starting Claude Code with agent ecosystem ready...${NC}"
echo ""

# Change to project directory and start Claude Code
cd "$PROJECT_ROOT"
exec claude