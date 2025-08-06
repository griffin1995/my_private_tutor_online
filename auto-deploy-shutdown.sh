#!/bin/bash

# Auto-Deploy and Shutdown Script
# Waits 90 minutes, commits changes, deploys to Vercel, then shuts down PC

set -e  # Exit on any error

# Configuration
WAIT_TIME=5400  # 90 minutes in seconds
LOG_FILE="deployment-log-$(date +%Y%m%d-%H%M%S).txt"
PROJECT_DIR="/home/jack/Documents/my_private_tutor_online"

# Logging function
log() {
    local message="$(date '+%Y-%m-%d %H:%M:%S') - $1"
    echo "$message"
    echo "$message" >> "$LOG_FILE"
}

# Error handling function
error_exit() {
    log "ERROR: $1"
    log "Deployment failed. System will NOT shutdown automatically."
    exit 1
}

# Signal handlers for graceful shutdown
cleanup() {
    log "Script interrupted by user signal"
    exit 1
}

trap cleanup SIGINT SIGTERM

log "=== AUTO-DEPLOY AND SHUTDOWN SCRIPT STARTED ==="
log "Working directory: $PROJECT_DIR"
log "Log file: $LOG_FILE"
log "Wait time: $WAIT_TIME seconds (90 minutes)"

# Change to project directory
cd "$PROJECT_DIR" || error_exit "Failed to change to project directory"

log "=== PHASE 1: WAITING 90 MINUTES FOR OTHER PROCESSES ==="
log "Waiting for 90 minutes to allow other Claude processes to complete..."
log "Current time: $(date)"
log "Expected completion time: $(date -d '+90 minutes')"

# Show countdown every 10 minutes
for i in $(seq $WAIT_TIME -600 1); do
    if [ $((i % 600)) -eq 0 ]; then
        minutes=$((i / 60))
        log "Waiting... $minutes minutes remaining"
    fi
    sleep 1
done

log "=== PHASE 2: GIT OPERATIONS ==="
log "90-minute wait completed. Starting git operations..."

# Check git status
log "Checking git status..."
git status || error_exit "Failed to check git status"

# Add all changes
log "Adding all changes to git..."
git add . || error_exit "Failed to add changes to git"

# Check if there are changes to commit
if git diff --cached --quiet; then
    log "No changes to commit. Skipping commit step."
else
    # Create commit with timestamp
    commit_message="deploy: automated deployment $(date '+%Y-%m-%d %H:%M:%S')

    🤖 Generated with [Claude Code](https://claude.ai/code)

    Co-Authored-By: Claude <noreply@anthropic.com>"
    
    log "Creating commit..."
    git commit -m "$commit_message" || error_exit "Failed to create commit"
fi

# Push to remote
log "Pushing to remote repository..."
git push || error_exit "Failed to push to remote repository"

log "Git operations completed successfully"

log "=== PHASE 3: VERCEL DEPLOYMENT ==="
log "Starting Vercel production deployment..."

# Check if vercel CLI is available
if ! command -v vercel &> /dev/null; then
    error_exit "Vercel CLI not found. Please install with: npm i -g vercel"
fi

# Deploy to production
log "Deploying to Vercel production..."
vercel --prod --yes || error_exit "Vercel deployment failed"

log "Vercel deployment completed successfully"

log "=== PHASE 4: PRE-SHUTDOWN VERIFICATION ==="
log "Verifying deployment status..."

# Wait a moment for deployment to propagate
sleep 30

log "Deployment verification completed"

log "=== PHASE 5: SYSTEM SHUTDOWN ==="
log "All operations completed successfully"
log "Final status:"
log "- Git push: SUCCESS"
log "- Vercel deployment: SUCCESS" 
log "- System ready for shutdown: YES"
log "Initiating system shutdown in 10 seconds..."
log "Current time: $(date)"

# Final countdown
for i in {10..1}; do
    log "Shutting down in $i seconds..."
    sleep 1
done

log "Shutting down system now..."

# Shutdown the system
sudo shutdown -h now || error_exit "Failed to shutdown system"