# 🔧 Claude Code Device Synchronization Diagnostic Protocol

## 📋 OVERVIEW
This diagnostic protocol will systematically identify and resolve configuration discrepancies between two Claude Code installations. Execute this on **Device B** (the problematic device) and report results back to **Device A** (the working device).

## 🎯 EXECUTION INSTRUCTIONS FOR DEVICE B

### PHASE 1: BASIC SYSTEM VERIFICATION
Execute each command and report the EXACT output:

```bash
# 1. Claude Code CLI Version
claude --version

# 2. Node.js Environment
node --version
npm --version

# 3. Current Working Directory
pwd

# 4. Project Files Present
ls -la /path/to/my_private_tutor_online/

# 5. Claude Config Directory
ls -la ~/.claude/
```

**REPORT FORMAT:**
```
PHASE 1 RESULTS:
- Claude Version: [output]
- Node Version: [output]
- NPM Version: [output]
- PWD: [output]
- Project Files: [list key files]
- Claude Config: [list config files]
```

---

### PHASE 2: CLAUDE CODE CONFIGURATION AUDIT
Execute and report each configuration file:

```bash
# 1. Main Claude Configuration
cat ~/.claude/config.json

# 2. Claude Workspace Settings (if exists)
cat ~/.claude/workspace.json

# 3. Environment Variables
env | grep -i claude

# 4. Check for Claude Code in PATH
which claude
echo $PATH | tr ':' '\n' | grep -i claude
```

**REPORT FORMAT:**
```
PHASE 2 RESULTS:
CONFIG.JSON:
[paste entire contents]

WORKSPACE.JSON:
[paste entire contents or "FILE NOT FOUND"]

ENVIRONMENT VARIABLES:
[list all Claude-related env vars]

PATH VERIFICATION:
[show claude executable path]
```

---

### PHASE 3: MCP SERVER DIAGNOSTICS
Check all MCP server configurations:

```bash
# 1. MCP Configuration File
cat ~/.claude/mcp.json

# 2. Verify MCP Servers Status
claude mcp status

# 3. Test Individual MCP Servers
claude mcp test context7
claude mcp test git-mcp
claude mcp test memory
claude mcp test filesystem
claude mcp test playwright
```

**REPORT FORMAT:**
```
PHASE 3 RESULTS:
MCP.JSON:
[paste entire contents]

MCP STATUS:
[paste status output]

MCP SERVER TESTS:
- Context7: [result]
- Git-MCP: [result]
- Memory: [result]
- Filesystem: [result]
- Playwright: [result]
```

---

### PHASE 4: PROJECT-SPECIFIC CONFIGURATION
Check project-specific Claude settings:

```bash
# 1. Navigate to Project Directory
cd /path/to/my_private_tutor_online/

# 2. Check for .claude Directory
ls -la .claude/

# 3. Project Claude Config
cat .claude/config.json

# 4. Custom Commands
ls -la .claude/commands/

# 5. Check Package.json for Claude Scripts
grep -A 10 -B 10 "claude" package.json
```

**REPORT FORMAT:**
```
PHASE 4 RESULTS:
PROJECT .claude DIRECTORY:
[list contents]

PROJECT CONFIG:
[paste contents or "FILE NOT FOUND"]

CUSTOM COMMANDS:
[list command files]

PACKAGE.JSON CLAUDE REFERENCES:
[paste relevant sections]
```

---

### PHASE 5: SLASH COMMAND TESTING
Test core functionality with these exact commands:

```
# Test in Claude Code interface (not bash):
1. Type: /help
2. Type: /agents
3. Type: /mcp
4. Type: /ma simple "test multi-agent"
5. Type: /task simple "test task tool"
```

**REPORT FORMAT:**
```
PHASE 5 RESULTS:
/help: [response or error]
/agents: [response or error]
/mcp: [response or error]
/ma: [response or error]
/task: [response or error]
```

---

### PHASE 6: MULTI-AGENT SYSTEM VERIFICATION
Test the multi-agent workflow:

```bash
# 1. Check Task Tool Availability
claude tools list | grep -i task

# 2. Test Agent Selection
claude agent list

# 3. Test Context Manager
echo "test context-manager activation" | claude task context-manager
```

**REPORT FORMAT:**
```
PHASE 6 RESULTS:
AVAILABLE TOOLS:
[list tools, focusing on Task tool]

AGENT LIST:
[paste agent list]

CONTEXT-MANAGER TEST:
[paste response or error]
```

---

### PHASE 7: ENVIRONMENT COMPARISON
Export current environment for comparison:

```bash
# 1. Export All Environment Variables
env > device-b-env.txt

# 2. Export Claude Specific Settings
claude config export > device-b-claude-config.json

# 3. System Information
uname -a
cat /etc/os-release

# 4. Installed Packages Related to Claude
npm list -g | grep -i claude
pip list | grep -i claude
```

**REPORT FORMAT:**
```
PHASE 7 RESULTS:
SYSTEM INFO:
[paste system information]

GLOBAL PACKAGES:
[list Claude-related packages]

CONFIG EXPORT STATUS:
[success/failure + any errors]
```

---

## 🔄 DEVICE A RESPONSE PROTOCOL

After receiving Phase reports from Device B, Device A will analyze and provide:

### 1. Configuration Comparison
Compare Device B results with working Device A configuration

### 2. Issue Identification
Identify specific discrepancies causing functionality failures

### 3. Corrective Instructions
Provide step-by-step fixes for each identified issue

### 4. Verification Protocol
Define tests to confirm successful synchronization

## 📞 COMMUNICATION FORMAT

**Device B Reports:**
```
DIAGNOSTIC REPORT - PHASE [N]
========================
[Phase results as specified above]

READY FOR DEVICE A ANALYSIS
```

**Device A Responds:**
```
ANALYSIS COMPLETE - PHASE [N]
============================
ISSUES IDENTIFIED:
- [Issue 1 with specific fix]
- [Issue 2 with specific fix]

CORRECTIVE ACTIONS:
[Step-by-step instructions]

NEXT PHASE: [Continue/Skip to specific phase]
```

## 🎯 SUCCESS CRITERIA

Configuration synchronization is complete when Device B can:
1. ✅ Execute all slash commands (/help, /agents, /mcp, /ma, /task)
2. ✅ Access all MCP servers (Context7, Git, Memory, etc.)
3. ✅ Successfully invoke multi-agent workflows
4. ✅ Complete task tool operations
5. ✅ Match Device A's functionality exactly

## 🚨 CRITICAL NOTES

- **Execute phases sequentially** - don't skip ahead
- **Report EXACT outputs** - don't summarize or interpret
- **Include error messages verbatim** - full stack traces if present
- **Test in actual Claude Code interface** - not just command line
- **Maintain project directory context** throughout testing

---

**BEGIN DIAGNOSTIC EXECUTION ON DEVICE B**
Start with Phase 1 and report results for Device A analysis.