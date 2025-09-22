#!/bin/bash

# CONTEXT7 SOURCE: /unitech/pm2 - PM2 process management patterns and kill commands
# CONTEXT7 SOURCE: /giampaolo/psutil - Process scanning and termination patterns
# SCRIPT PURPOSE: Comprehensive localhost development server process killer
# Safely identifies and terminates zombie npm run dev, next dev, and Node.js processes

# Color codes for output formatting
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Script configuration
SCRIPT_NAME="kill-localhosts.sh"
LOG_FILE="/tmp/kill-localhosts.log"
COMMON_DEV_PORTS=(3000 3001 3002 3003 3004 3005 3006 3007 3008 3009 3010 8000 8001 8002 8003 8080 8081 8082 8083 4000 4001 4002 4003 5000 5001 5002 5003 9000 9001 9002 9003)
DEV_KEYWORDS=("npm" "next" "dev" "localhost" "node" "turbopack" "webpack" "vite" "react-scripts" "nuxt" "gatsby" "vue-cli")

# Logging function
log_action() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Display script header
show_header() {
    echo -e "${CYAN}================================================"
    echo -e "🔄 LOCALHOST DEVELOPMENT SERVER KILLER"
    echo -e "================================================${NC}"
    echo -e "${WHITE}Purpose:${NC} Identify and terminate zombie development processes"
    echo -e "${WHITE}Scope:${NC} npm run dev, next dev, Node.js servers on common ports"
    echo -e "${WHITE}Safety:${NC} Requires confirmation before killing processes"
    echo -e "${CYAN}================================================${NC}"
    echo ""
}

# Check if running as root (safety warning)
check_permissions() {
    if [[ $EUID -eq 0 ]]; then
        echo -e "${RED}⚠️  WARNING: Running as root! This script can kill system processes.${NC}"
        echo -e "${YELLOW}Consider running as a regular user for safety.${NC}"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${RED}Aborting for safety.${NC}"
            exit 1
        fi
    fi
}

# Find processes by port usage
find_processes_by_port() {
    local found_processes=()

    echo -e "${BLUE}🔍 Scanning common development ports...${NC}"

    for port in "${COMMON_DEV_PORTS[@]}"; do
        # Check both TCP and UDP connections
        local tcp_procs=$(netstat -tlnp 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d'/' -f1 | grep -v '^-$' | sort -u)
        local udp_procs=$(netstat -ulnp 2>/dev/null | grep ":$port " | awk '{print $6}' | cut -d'/' -f1 | grep -v '^-$' | sort -u)

        # Also check with ss command (more modern)
        local ss_tcp_procs=$(ss -tlnp 2>/dev/null | grep ":$port " | grep -o 'pid=[0-9]*' | cut -d'=' -f2 | sort -u)
        local ss_udp_procs=$(ss -ulnp 2>/dev/null | grep ":$port " | grep -o 'pid=[0-9]*' | cut -d'=' -f2 | sort -u)

        # Combine all found PIDs
        local all_pids=$(echo -e "$tcp_procs\n$udp_procs\n$ss_tcp_procs\n$ss_udp_procs" | grep -v '^$' | sort -u)

        for pid in $all_pids; do
            if [[ "$pid" =~ ^[0-9]+$ ]] && kill -0 "$pid" 2>/dev/null; then
                found_processes+=("$pid:$port")
            fi
        done
    done

    echo "${found_processes[@]}"
}

# Find processes by keywords in command line
find_processes_by_keywords() {
    local found_processes=()

    echo -e "${BLUE}🔍 Scanning for development server processes...${NC}"

    # Use ps to find processes with development keywords
    for keyword in "${DEV_KEYWORDS[@]}"; do
        # Search in process command line arguments
        local pids=$(ps aux | grep -i "$keyword" | grep -v "grep" | grep -v "$SCRIPT_NAME" | awk '{print $2}')

        for pid in $pids; do
            if [[ "$pid" =~ ^[0-9]+$ ]] && kill -0 "$pid" 2>/dev/null; then
                found_processes+=("$pid:keyword:$keyword")
            fi
        done
    done

    # Also find Node.js processes that might be development servers
    local node_pids=$(pgrep -f "node.*dev\|next.*dev\|npm.*dev\|yarn.*dev" 2>/dev/null)
    for pid in $node_pids; do
        if kill -0 "$pid" 2>/dev/null; then
            found_processes+=("$pid:node_dev")
        fi
    done

    echo "${found_processes[@]}"
}

# Get detailed process information
get_process_info() {
    local pid=$1
    local info=""

    if kill -0 "$pid" 2>/dev/null; then
        local cmd=$(ps -p "$pid" -o comm= 2>/dev/null)
        local args=$(ps -p "$pid" -o args= 2>/dev/null)
        local user=$(ps -p "$pid" -o user= 2>/dev/null)
        local cpu=$(ps -p "$pid" -o %cpu= 2>/dev/null)
        local mem=$(ps -p "$pid" -o %mem= 2>/dev/null)

        info="PID: $pid | User: $user | CPU: $cpu% | MEM: $mem% | CMD: $cmd | ARGS: $args"
    else
        info="PID: $pid | STATUS: Process not found or already terminated"
    fi

    echo "$info"
}

# Display found processes in a formatted table
display_processes() {
    local processes=("$@")
    local total_count=0

    if [[ ${#processes[@]} -eq 0 ]]; then
        echo -e "${GREEN}✅ No zombie development processes found!${NC}"
        echo -e "${WHITE}All localhost ports appear to be clean.${NC}"
        return 0
    fi

    echo -e "${YELLOW}📋 FOUND DEVELOPMENT PROCESSES:${NC}"
    echo -e "${CYAN}================================================${NC}"

    # Remove duplicates and sort
    local unique_pids=()
    for process in "${processes[@]}"; do
        local pid=$(echo "$process" | cut -d':' -f1)
        if [[ ! " ${unique_pids[@]} " =~ " ${pid} " ]]; then
            unique_pids+=("$pid")
        fi
    done

    for pid in "${unique_pids[@]}"; do
        if kill -0 "$pid" 2>/dev/null; then
            echo -e "${WHITE}[$((++total_count))]${NC} $(get_process_info "$pid")"

            # Check which ports this process is using
            local ports=$(netstat -tlnp 2>/dev/null | grep "$pid/" | awk '{print $4}' | cut -d':' -f2 | sort -u | tr '\n' ',' | sed 's/,$//')
            if [[ -n "$ports" ]]; then
                echo -e "    ${BLUE}🌐 Ports: $ports${NC}"
            fi

            # Check for PM2 managed processes
            if command -v pm2 >/dev/null 2>&1; then
                local pm2_info=$(pm2 list 2>/dev/null | grep -w "$pid" | head -1)
                if [[ -n "$pm2_info" ]]; then
                    echo -e "    ${PURPLE}📦 PM2 Managed: Yes${NC}"
                fi
            fi

            echo ""
        fi
    done

    echo -e "${CYAN}================================================${NC}"
    echo -e "${WHITE}Total processes found: $total_count${NC}"

    return $total_count
}

# Safely kill a process with graceful -> forceful escalation
kill_process_safely() {
    local pid=$1
    local process_info=$(get_process_info "$pid")

    echo -e "${YELLOW}🎯 Terminating PID $pid...${NC}"
    log_action "Attempting to kill PID $pid: $process_info"

    # Check if it's a PM2 managed process first
    if command -v pm2 >/dev/null 2>&1; then
        local pm2_name=$(pm2 list 2>/dev/null | grep -w "$pid" | awk '{print $2}' | head -1)
        if [[ -n "$pm2_name" && "$pm2_name" != "name" ]]; then
            echo -e "  ${PURPLE}📦 Using PM2 to stop process: $pm2_name${NC}"
            if pm2 stop "$pm2_name" >/dev/null 2>&1; then
                echo -e "  ${GREEN}✅ Successfully stopped via PM2${NC}"
                log_action "Successfully stopped PID $pid via PM2 ($pm2_name)"
                return 0
            else
                echo -e "  ${YELLOW}⚠️ PM2 stop failed, falling back to manual kill${NC}"
            fi
        fi
    fi

    # Try graceful termination first (SIGTERM)
    if kill -TERM "$pid" 2>/dev/null; then
        echo -e "  ${BLUE}📤 Sent SIGTERM (graceful termination)${NC}"

        # Wait up to 5 seconds for graceful shutdown
        local count=0
        while kill -0 "$pid" 2>/dev/null && [[ $count -lt 5 ]]; do
            sleep 1
            ((count++))
            echo -e "  ${YELLOW}⏳ Waiting for graceful shutdown... ($count/5)${NC}"
        done

        if ! kill -0 "$pid" 2>/dev/null; then
            echo -e "  ${GREEN}✅ Process terminated gracefully${NC}"
            log_action "Successfully terminated PID $pid gracefully"
            return 0
        fi
    fi

    # If still running, use forceful termination (SIGKILL)
    echo -e "  ${RED}💀 Process still running, using SIGKILL (forceful)${NC}"
    if kill -KILL "$pid" 2>/dev/null; then
        sleep 1
        if ! kill -0 "$pid" 2>/dev/null; then
            echo -e "  ${GREEN}✅ Process forcefully terminated${NC}"
            log_action "Successfully killed PID $pid forcefully"
            return 0
        else
            echo -e "  ${RED}❌ Failed to kill process${NC}"
            log_action "FAILED to kill PID $pid"
            return 1
        fi
    else
        echo -e "  ${RED}❌ Permission denied or process already gone${NC}"
        log_action "Permission denied killing PID $pid or process already terminated"
        return 1
    fi
}

# Main execution function
main() {
    show_header
    check_permissions

    echo -e "${WHITE}Starting scan at $(date)${NC}"
    log_action "Starting localhost process scan"

    # Find all potentially problematic processes
    local port_processes=($(find_processes_by_port))
    local keyword_processes=($(find_processes_by_keywords))

    # Combine all found processes
    local all_processes=("${port_processes[@]}" "${keyword_processes[@]}")

    # Display findings
    display_processes "${all_processes[@]}"
    local process_count=$?

    if [[ $process_count -eq 0 ]]; then
        echo -e "${GREEN}🎉 No action needed. System is clean!${NC}"
        log_action "Scan completed - no processes found"
        exit 0
    fi

    echo ""
    echo -e "${RED}⚠️  WARNING: This will terminate $process_count development processes!${NC}"
    echo -e "${YELLOW}This action cannot be undone.${NC}"
    echo ""
    echo -e "${WHITE}Options:${NC}"
    echo -e "  ${GREEN}y${NC} - Yes, kill all found processes"
    echo -e "  ${BLUE}s${NC} - Selective mode (choose which to kill)"
    echo -e "  ${RED}n${NC} - No, abort (default)"
    echo ""

    read -p "What would you like to do? (y/s/N): " -n 1 -r
    echo ""

    case $REPLY in
        [Yy]*)
            echo -e "${RED}🔥 Killing all found processes...${NC}"
            log_action "User confirmed killing all $process_count processes"

            # Extract unique PIDs and kill them
            local unique_pids=()
            for process in "${all_processes[@]}"; do
                local pid=$(echo "$process" | cut -d':' -f1)
                if [[ ! " ${unique_pids[@]} " =~ " ${pid} " ]]; then
                    unique_pids+=("$pid")
                fi
            done

            local killed_count=0
            local failed_count=0

            for pid in "${unique_pids[@]}"; do
                if kill_process_safely "$pid"; then
                    ((killed_count++))
                else
                    ((failed_count++))
                fi
                echo ""
            done

            echo -e "${CYAN}================================================${NC}"
            echo -e "${WHITE}SUMMARY:${NC}"
            echo -e "  ${GREEN}✅ Successfully terminated: $killed_count${NC}"
            echo -e "  ${RED}❌ Failed to terminate: $failed_count${NC}"
            echo -e "  ${BLUE}📊 Total processed: $((killed_count + failed_count))${NC}"

            log_action "Batch kill completed: $killed_count successful, $failed_count failed"
            ;;

        [Ss]*)
            echo -e "${BLUE}🎯 Selective mode - choose processes to kill${NC}"
            log_action "User selected selective mode"

            # Extract unique PIDs for selective killing
            local unique_pids=()
            for process in "${all_processes[@]}"; do
                local pid=$(echo "$process" | cut -d':' -f1)
                if [[ ! " ${unique_pids[@]} " =~ " ${pid} " ]]; then
                    unique_pids+=("$pid")
                fi
            done

            local killed_count=0
            local skipped_count=0

            for pid in "${unique_pids[@]}"; do
                echo ""
                echo -e "${WHITE}Process details:${NC}"
                get_process_info "$pid"
                echo ""
                read -p "Kill this process? (y/N): " -n 1 -r
                echo ""

                if [[ $REPLY =~ ^[Yy]$ ]]; then
                    if kill_process_safely "$pid"; then
                        ((killed_count++))
                    fi
                else
                    echo -e "  ${YELLOW}⏭️ Skipped PID $pid${NC}"
                    ((skipped_count++))
                fi
            done

            echo ""
            echo -e "${CYAN}================================================${NC}"
            echo -e "${WHITE}SELECTIVE MODE SUMMARY:${NC}"
            echo -e "  ${GREEN}✅ Killed: $killed_count${NC}"
            echo -e "  ${YELLOW}⏭️ Skipped: $skipped_count${NC}"

            log_action "Selective kill completed: $killed_count killed, $skipped_count skipped"
            ;;

        *)
            echo -e "${YELLOW}🚫 Operation cancelled by user${NC}"
            echo -e "${WHITE}No processes were harmed. 😉${NC}"
            log_action "User cancelled operation"
            exit 0
            ;;
    esac

    echo ""
    echo -e "${GREEN}🏁 Operation completed at $(date)${NC}"
    echo -e "${WHITE}Log file: $LOG_FILE${NC}"

    # Final verification scan
    echo ""
    echo -e "${BLUE}🔍 Running final verification scan...${NC}"
    local final_port_processes=($(find_processes_by_port))
    local final_keyword_processes=($(find_processes_by_keywords))
    local final_all_processes=("${final_port_processes[@]}" "${final_keyword_processes[@]}")

    display_processes "${final_all_processes[@]}"
    local final_count=$?

    if [[ $final_count -eq 0 ]]; then
        echo -e "${GREEN}🎉 All clean! No development processes detected.${NC}"
    else
        echo -e "${YELLOW}⚠️ $final_count processes still running. They may be system processes or failed to terminate.${NC}"
    fi

    log_action "Script completed successfully"
}

# Script entry point
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi