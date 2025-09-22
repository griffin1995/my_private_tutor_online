# LOCALHOST DEVELOPMENT SERVER KILLER - Usage Guide

## Overview
Comprehensive shell script that scans for and safely terminates zombie localhost development processes, particularly 'npm run dev' instances that often get stuck.

## Location
```bash
/home/jack/Documents/my_private_tutor_online/kill-localhosts.sh
```

## Quick Access
Added to bash aliases:
```bash
kill-localhosts
```

## Features

### 🔍 INTELLIGENT SCANNING
- **Port Scanning**: Checks common development ports (3000-3010, 8000-8090, 4000-4010, 5000-5010, 9000-9010)
- **Keyword Detection**: Finds processes containing 'npm', 'next', 'dev', 'localhost', 'node', 'turbopack', 'webpack', 'vite'
- **Process Analysis**: Uses both `netstat` and `ss` commands for comprehensive port detection
- **PM2 Integration**: Detects and properly handles PM2-managed processes

### ⚡ SAFE KILLING PROCESS
- **Graceful First**: Uses SIGTERM for graceful termination
- **Forceful Fallback**: Uses SIGKILL if graceful fails after 5-second timeout
- **PM2 Awareness**: Uses PM2 commands for PM2-managed processes
- **Confirmation Required**: Always asks before killing processes

### 🎨 USER EXPERIENCE
- **Color-coded Output**: Clear visual distinction for different information types
- **Process Details**: Shows PID, user, CPU%, memory%, command, and arguments
- **Port Information**: Displays which ports each process is using
- **Logging**: All actions logged to `/tmp/kill-localhosts.log`

## Usage Modes

### 1. AUTOMATIC MODE (Kill All)
```bash
./kill-localhosts.sh
# Choose 'y' when prompted
```
Kills all found development processes automatically.

### 2. SELECTIVE MODE (Pick & Choose)
```bash
./kill-localhosts.sh
# Choose 's' when prompted
```
Lets you choose which specific processes to kill.

### 3. SCAN ONLY (Safe Preview)
```bash
./kill-localhosts.sh
# Choose 'n' when prompted
```
Shows what would be killed without actually doing it.

## Safety Features

### 🛡️ BUILT-IN PROTECTIONS
- **Root Warning**: Warns when running as root user
- **Process Validation**: Verifies processes exist before attempting to kill
- **Confirmation Steps**: Multiple confirmation prompts
- **Graceful Escalation**: Tries gentle termination before forceful

### 📊 COMPREHENSIVE REPORTING
- **Before/After Scans**: Shows processes before and after cleanup
- **Success/Failure Counts**: Reports how many processes were successfully terminated
- **Detailed Logging**: Complete audit trail in log file

## Common Scenarios

### Zombie Next.js Development Servers
```
✅ Detects: next-server processes
✅ Detects: npm run dev processes
✅ Detects: turbopack processes
✅ Detects: transform.js workers
```

### Stuck Node.js Processes
```
✅ Detects: node processes on development ports
✅ Detects: webpack-dev-server instances
✅ Detects: vite development servers
✅ Detects: react-scripts start processes
```

### PM2 Managed Services
```
✅ Uses PM2 stop commands
✅ Falls back to manual kill if PM2 fails
✅ Preserves PM2 process management
```

## Troubleshooting

### If Script Won't Run
```bash
# Make executable
chmod +x /home/jack/Documents/my_private_tutor_online/kill-localhosts.sh

# Check permissions
ls -la /home/jack/Documents/my_private_tutor_online/kill-localhosts.sh
```

### If Processes Won't Die
- Some processes may be system-protected
- Try running with elevated permissions (carefully)
- Check if processes are managed by systemd
- Use `ps aux | grep [process]` to investigate further

### If False Positives
- VS Code Node.js language servers are included in scan
- Use selective mode to avoid killing IDE processes
- Script is conservative - includes many Node.js processes for safety

## Log File Analysis
```bash
# View recent activity
tail -f /tmp/kill-localhosts.log

# Search for specific PID
grep "PID 12345" /tmp/kill-localhosts.log

# View all today's activity
grep "$(date '+%Y-%m-%d')" /tmp/kill-localhosts.log
```

## Implementation Details

### CONTEXT7 SOURCE ATTRIBUTION
- **PM2 Documentation**: `/unitech/pm2` - Process management patterns
- **Psutil Documentation**: `/giampaolo/psutil` - Process scanning and termination
- **Linux Standards**: POSIX-compliant shell scripting and signal handling

### Technical Architecture
- **Signal Handling**: Proper SIGTERM → SIGKILL escalation
- **Process Detection**: Multi-method scanning (netstat, ss, ps, pgrep)
- **Error Handling**: Comprehensive edge case management
- **Performance**: Efficient process enumeration and validation

## Emergency Usage
When development environment is completely stuck:
```bash
# Quick nuclear option (use with caution)
./kill-localhosts.sh
# Choose 'y' immediately

# Then verify cleanup
./kill-localhosts.sh
# Should show "No processes found"
```

This script solves the common DevOps problem of zombie development servers that prevent new instances from starting and consume system resources unnecessarily.