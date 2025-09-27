# My Private Tutor Online - Claude Configuration

Project configuration for Claude Code development environment synchronized with st_saviours_lewisham standards.

## Directory Structure

```
.claude/
├── README.md                          # This file
├── settings.json                      # Claude model configuration
├── settings.local.json               # Local permissions and MCP settings
├── agents/
│   ├── agent-capability-matrix.json  # Tutoring domain agent mapping
│   └── [custom-agents]/              # Project-specific agents
├── commands/
│   ├── start.md                      # Development session initialization
│   └── save.md                       # Complete save workflow
├── scripts/                          # Automation scripts
├── workers/                          # Background workers
└── lib/                             # Shared utilities
```

## MCP Servers Configuration

Active MCP servers (defined in `.mcp.json`):
- **context7**: Documentation and code patterns
- **web-browser**: Puppeteer browser automation
- **git-mcp**: Git repository operations
- **filesystem**: File system operations
- **memory**: Session memory storage
- **sequential-thinking**: Complex reasoning workflows
- **playwright**: Advanced browser testing

## Workflow Commands

### `/start`
Initialize development session with:
- Memory MCP project state storage
- MCP server health verification
- Development environment validation

### `/save`
Complete save workflow including:
- Code quality validation (lint, typecheck, build)
- Git operations with proper commits
- Memory MCP progress updates
- Documentation synchronization

## Agent Capability Matrix

Optimized for tutoring domain with specialized agents for:
- **Educational Content**: Curriculum design, lesson planning
- **Student Analytics**: Progress tracking, performance analysis
- **Booking Systems**: Scheduling, payments, notifications
- **Standard Development**: Frontend, backend, security, performance

## Synchronization Notes

This configuration is synchronized with `st_saviours_lewisham` for:
- Consistent MCP server setup
- Standardized workflow commands
- Unified agent orchestration
- Compatible development patterns

## Usage

1. Ensure all MCP servers are properly configured in `.mcp.json`
2. Use `/start` to initialize development sessions
3. Use `/save` to complete work with full validation
4. Leverage agent capability matrix for optimal task delegation

## Project-Specific Adaptations

- **Domain**: Premium tutoring services (vs. school management)
- **Technologies**: Next.js 15.3.4, React 19, TypeScript 5.8+
- **Standards**: Royal client quality, British English, WCAG 2.1 AA compliance
- **Custom Agents**: Tutoring-focused specializations added to standard agent set