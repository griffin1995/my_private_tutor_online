#!/bin/bash
# Claude Code Complete Uninstall and Reinstall Script
# This script will completely remove Claude Code and reinstall it properly

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=== Claude Code Complete Reinstall Script ===${NC}"
echo -e "${YELLOW}This script will uninstall and reinstall Claude Code${NC}"
echo ""

# Step 1: Kill any running Claude processes (excluding this script)
echo -e "${YELLOW}Step 1: Stopping any running Claude processes...${NC}"
# Use pgrep to find claude processes, exclude current script PID and its parent
SCRIPT_PID=$$
PARENT_PID=$PPID
for pid in $(pgrep -f claude 2>/dev/null || true); do
    if [ "$pid" != "$SCRIPT_PID" ] && [ "$pid" != "$PARENT_PID" ]; then
        kill $pid 2>/dev/null || true
        echo "Stopped process $pid"
    fi
done
sleep 2

# Step 2: Remove npm packages (if any)
echo -e "${YELLOW}Step 2: Removing npm Claude packages...${NC}"
npm uninstall -g claude-code 2>/dev/null || true
npm uninstall -g @anthropic/claude-code 2>/dev/null || true

# Step 3: Remove Claude binary
echo -e "${YELLOW}Step 3: Removing Claude binary...${NC}"
rm -f /usr/local/bin/claude
rm -f /usr/bin/claude
rm -f ~/bin/claude
rm -f ~/.local/bin/claude

# Step 4: Remove Claude configuration directories
echo -e "${YELLOW}Step 4: Backing up and removing Claude configuration...${NC}"
if [ -d ~/.claude ]; then
    # Backup agents if they exist
    if [ -d ~/.claude/agents ]; then
        echo -e "${GREEN}Backing up agents to ~/.claude-agents-backup${NC}"
        cp -r ~/.claude/agents ~/.claude-agents-backup
    fi
    rm -rf ~/.claude
fi

# Step 5: Remove any Claude-related environment variables
echo -e "${YELLOW}Step 5: Cleaning environment...${NC}"
sed -i '/CLAUDE/d' ~/.bashrc 2>/dev/null || true
sed -i '/claude/d' ~/.bashrc 2>/dev/null || true
sed -i '/CLAUDE/d' ~/.zshrc 2>/dev/null || true
sed -i '/claude/d' ~/.zshrc 2>/dev/null || true

# Step 6: Clear any Claude cache
echo -e "${YELLOW}Step 6: Clearing cache...${NC}"
rm -rf ~/.cache/claude* 2>/dev/null || true
rm -rf ~/.config/claude* 2>/dev/null || true

echo -e "${GREEN}✓ Uninstall complete!${NC}"
echo ""

# Step 7: Download and install latest Claude Code
echo -e "${YELLOW}Step 7: Installing latest Claude Code...${NC}"
echo -e "${BLUE}Downloading from official source...${NC}"

# Try official installation method
if command -v curl &> /dev/null; then
    curl -fsSL https://claude.ai/install.sh | sh 2>/dev/null || {
        echo -e "${YELLOW}Primary installation method failed, trying alternative...${NC}"
        # Alternative: Download directly from GitHub releases or official source
        LATEST_URL="https://github.com/anthropics/claude-code/releases/latest/download/claude-linux-x64"
        curl -L -o /tmp/claude "$LATEST_URL" 2>/dev/null || {
            echo -e "${RED}Failed to download Claude Code${NC}"
            echo -e "${YELLOW}Please visit: https://claude.ai/download for manual installation${NC}"
            exit 1
        }
        chmod +x /tmp/claude
        mv /tmp/claude /usr/local/bin/claude
    }
else
    echo -e "${RED}curl is required but not installed${NC}"
    exit 1
fi

# Step 8: Verify installation
echo -e "${YELLOW}Step 8: Verifying installation...${NC}"
if command -v claude &> /dev/null; then
    CLAUDE_VERSION=$(claude --version 2>/dev/null || echo "Unknown")
    echo -e "${GREEN}✓ Claude Code installed: $CLAUDE_VERSION${NC}"
else
    echo -e "${RED}✗ Claude Code installation failed${NC}"
    exit 1
fi

# Step 9: Set up agents directory
echo -e "${YELLOW}Step 9: Setting up agents...${NC}"
mkdir -p ~/.claude/agents

# Restore agents from backup if available
if [ -d ~/.claude-agents-backup ]; then
    echo -e "${GREEN}Restoring agents from backup...${NC}"
    cp -r ~/.claude-agents-backup/* ~/.claude/agents/
    rm -rf ~/.claude-agents-backup
elif [ -d /home/jack/Documents/my_private_tutor_online/.claude/agents ]; then
    echo -e "${GREEN}Copying agents from project directory...${NC}"
    cp -r /home/jack/Documents/my_private_tutor_online/.claude/agents/* ~/.claude/agents/
fi

# Count agents
AGENT_COUNT=$(ls -1 ~/.claude/agents/*.md 2>/dev/null | wc -l || echo "0")
echo -e "${GREEN}✓ $AGENT_COUNT agents installed${NC}"

# Step 10: Create minimal configuration
echo -e "${YELLOW}Step 10: Creating configuration...${NC}"
mkdir -p ~/.claude
cat > ~/.claude/settings.json << 'EOF'
{
  "telemetry": {
    "enabled": false
  }
}
EOF

echo -e "${GREEN}✓ Configuration created${NC}"

# Final summary
echo ""
echo -e "${GREEN}=== Installation Complete ===${NC}"
echo -e "${BLUE}Claude Code Version:${NC} $(claude --version 2>/dev/null || echo 'Check failed')"
echo -e "${BLUE}Agents Location:${NC} ~/.claude/agents/ ($AGENT_COUNT agents)"
echo -e "${BLUE}Configuration:${NC} ~/.claude/settings.json"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Open a new terminal window"
echo "2. Run: claude"
echo "3. Agents will work via:"
echo "   - Automatic invocation based on context"
echo "   - Explicit invocation: 'Use code-reviewer to...'"
echo ""
echo -e "${GREEN}The agents are now properly configured and will work in new Claude sessions!${NC}"