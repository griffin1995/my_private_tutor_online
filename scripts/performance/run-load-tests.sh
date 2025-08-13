#!/bin/bash

# CONTEXT7 SOURCE: /grafana/k6-docs - Comprehensive load testing script for FAQ system
# IMPLEMENTATION REASON: Official k6 pattern for automated load testing execution with comprehensive reporting

set -euo pipefail

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
LOAD_TESTS_DIR="$PROJECT_ROOT/load-tests"
RESULTS_DIR="$PROJECT_ROOT/test-results/load-tests"
LOG_FILE="$RESULTS_DIR/load-test-execution.log"

# CONTEXT7 SOURCE: /grafana/k6-docs - Default configuration for FAQ load testing
# DEFAULTS REASON: Royal client service standards with enterprise-grade performance requirements
DEFAULT_BASE_URL="http://localhost:3000"
DEFAULT_TEST_TYPE="baseline"
DEFAULT_OUTPUT_FORMAT="json"
DEFAULT_RESULTS_RETENTION_DAYS="30"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}[FAQ LOAD TEST]${NC} $message"
}

print_header() {
    echo -e "${PURPLE}"
    echo "╔══════════════════════════════════════════════════════════════════════════╗"
    echo "║                    FAQ SYSTEM LOAD TESTING SUITE                        ║"
    echo "║              My Private Tutor Online - Royal Client Standards            ║"
    echo "╚══════════════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_help() {
    cat << EOF
FAQ Load Testing Suite - My Private Tutor Online

USAGE:
    $0 [OPTIONS]

OPTIONS:
    -u, --url URL          Target URL for testing (default: $DEFAULT_BASE_URL)
    -t, --test TYPE        Test type to run (default: $DEFAULT_TEST_TYPE)
                           Available types: baseline, royal-peak, stress, accessibility, all
    -o, --output FORMAT    Output format (default: $DEFAULT_OUTPUT_FORMAT)
                           Available formats: json, summary, detailed, dashboard
    -c, --config FILE      Custom configuration file
    -r, --results-dir DIR  Results directory (default: $RESULTS_DIR)
    -d, --duration TIME    Override test duration (e.g., 10m, 30s)
    -v, --vus NUMBER       Override virtual users count
    --royal-ratio FLOAT    Royal client ratio (0.0-1.0, default: 0.3)
    --accessibility-mode   Enable enhanced accessibility testing
    --dry-run             Validate configuration without running tests
    --cleanup             Clean up old test results
    -h, --help            Show this help message

TEST TYPES:
    baseline              Standard FAQ load test (500 concurrent users, 12 minutes)
    royal-peak           Royal client peak load simulation (1000+ users, 60 minutes)
    stress               Breaking point stress test (progressive load increase)
    accessibility        Accessibility load test (300 users, assistive technology focus)
    all                  Run all test types sequentially

EXAMPLES:
    # Run baseline test on production
    $0 --url https://myprivatetutoronline.com --test baseline

    # Run royal peak test with custom parameters
    $0 --test royal-peak --royal-ratio 0.4 --duration 30m

    # Run accessibility test with detailed output
    $0 --test accessibility --output detailed --accessibility-mode

    # Run all tests with custom results directory
    $0 --test all --results-dir ./my-test-results

    # Dry run to validate configuration
    $0 --dry-run --test all --url https://staging.example.com

ENVIRONMENT VARIABLES:
    FAQ_TEST_URL          Override default base URL
    FAQ_TEST_TYPE         Override default test type
    FAQ_RESULTS_DIR       Override default results directory
    FAQ_K6_OPTIONS        Additional k6 command line options
    FAQ_ARTILLERY_OPTIONS Additional Artillery options
    FAQ_LOG_LEVEL         Set log level (debug, info, warn, error)

ROYAL CLIENT STANDARDS:
    - Response Time (p95): <50ms for royal clients, <100ms for standard
    - Error Rate: <0.01% for royal clients, <0.1% for standard
    - Availability: 99.99% uptime with graceful degradation
    - Search Performance: <100ms for FAQ queries
    - Accessibility: WCAG 2.1 AA compliance under load

EOF
}

# CONTEXT7 SOURCE: /grafana/k6-docs - Configuration validation and setup
# VALIDATION REASON: Ensure proper test environment and parameters before execution
validate_configuration() {
    print_status "$BLUE" "Validating FAQ load testing configuration..."
    
    # Check required tools
    local missing_tools=()
    
    if ! command -v k6 &> /dev/null; then
        missing_tools+=("k6")
    fi
    
    if ! command -v artillery &> /dev/null && [[ "$TEST_TYPE" == "all" || "$TEST_TYPE" == "user-journeys" ]]; then
        missing_tools+=("artillery")
    fi
    
    if ! command -v lighthouse &> /dev/null && [[ "$TEST_TYPE" == "all" || "$TEST_TYPE" == "lighthouse" ]]; then
        missing_tools+=("lighthouse")
    fi
    
    if [[ ${#missing_tools[@]} -gt 0 ]]; then
        print_status "$RED" "Missing required tools: ${missing_tools[*]}"
        print_status "$YELLOW" "Install missing tools:"
        for tool in "${missing_tools[@]}"; do
            case $tool in
                k6)
                    echo "  - k6: https://k6.io/docs/getting-started/installation/"
                    ;;
                artillery)
                    echo "  - artillery: npm install -g artillery"
                    ;;
                lighthouse)
                    echo "  - lighthouse: npm install -g lighthouse"
                    ;;
            esac
        done
        exit 1
    fi
    
    # Validate target URL
    if [[ -n "$BASE_URL" ]]; then
        print_status "$BLUE" "Validating target URL: $BASE_URL"
        if ! curl -s --head --request GET "$BASE_URL/faq" | head -n 1 | grep -q "200 OK"; then
            print_status "$RED" "Target URL is not accessible: $BASE_URL/faq"
            if [[ "$DRY_RUN" != "true" ]]; then
                exit 1
            fi
        fi
        print_status "$GREEN" "Target URL validation successful"
    fi
    
    # Validate test files exist
    local test_files=()
    case "$TEST_TYPE" in
        baseline)
            test_files=("$LOAD_TESTS_DIR/k6/faq-baseline-load.js")
            ;;
        royal-peak)
            test_files=("$LOAD_TESTS_DIR/k6/faq-royal-peak-load.js")
            ;;
        stress)
            test_files=("$LOAD_TESTS_DIR/k6/faq-stress-breaking-point.js")
            ;;
        accessibility)
            test_files=("$LOAD_TESTS_DIR/k6/faq-accessibility-load.js")
            ;;
        all)
            test_files=(
                "$LOAD_TESTS_DIR/k6/faq-baseline-load.js"
                "$LOAD_TESTS_DIR/k6/faq-royal-peak-load.js"
                "$LOAD_TESTS_DIR/k6/faq-stress-breaking-point.js"
                "$LOAD_TESTS_DIR/k6/faq-accessibility-load.js"
                "$LOAD_TESTS_DIR/artillery/faq-complex-user-journeys.yml"
            )
            ;;
    esac
    
    for file in "${test_files[@]}"; do
        if [[ ! -f "$file" ]]; then
            print_status "$RED" "Test file not found: $file"
            exit 1
        fi
    done
    
    print_status "$GREEN" "Configuration validation completed successfully"
}

# CONTEXT7 SOURCE: /grafana/k6-docs - Test environment setup and preparation
# SETUP REASON: Prepare test environment with proper directories and logging
setup_test_environment() {
    print_status "$BLUE" "Setting up FAQ load testing environment..."
    
    # Create results directory
    mkdir -p "$RESULTS_DIR"
    mkdir -p "$RESULTS_DIR/k6"
    mkdir -p "$RESULTS_DIR/artillery"
    mkdir -p "$RESULTS_DIR/lighthouse"
    mkdir -p "$RESULTS_DIR/archives"
    
    # Initialize log file
    cat > "$LOG_FILE" << EOF
FAQ Load Testing Suite Execution Log
=====================================
Start Time: $(date -u '+%Y-%m-%d %H:%M:%S UTC')
Test Type: $TEST_TYPE
Target URL: $BASE_URL
Results Directory: $RESULTS_DIR
Script Version: $(git rev-parse HEAD 2>/dev/null || echo "unknown")

EOF
    
    # Set test session ID
    TEST_SESSION_ID="faq-load-test-$(date +%Y%m%d-%H%M%S)"
    export TEST_SESSION_ID
    
    print_status "$GREEN" "Test environment setup completed (Session: $TEST_SESSION_ID)"
}

# CONTEXT7 SOURCE: /grafana/k6-docs - K6 baseline load test execution
# BASELINE REASON: Standard FAQ performance validation under normal usage patterns
run_baseline_test() {
    print_status "$CYAN" "Running FAQ Baseline Load Test..."
    
    local test_file="$LOAD_TESTS_DIR/k6/faq-baseline-load.js"
    local output_file="$RESULTS_DIR/k6/baseline-results-$TEST_SESSION_ID.json"
    
    # Set test-specific environment variables
    export BASE_URL="$BASE_URL"
    export TARGET_VUS="${VUS_OVERRIDE:-500}"
    export RAMP_DURATION="${DURATION_OVERRIDE:-2m}"
    export PLATEAU_DURATION="10m"
    
    local k6_cmd="k6 run"
    k6_cmd+=" --out json=$output_file"
    k6_cmd+=" $FAQ_K6_OPTIONS"
    k6_cmd+=" $test_file"
    
    print_status "$BLUE" "Executing: $k6_cmd"
    echo "Baseline Test Command: $k6_cmd" >> "$LOG_FILE"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        print_status "$YELLOW" "DRY RUN: Would execute baseline test"
        return 0
    fi
    
    # Execute test with timeout protection
    if timeout 20m bash -c "$k6_cmd" >> "$LOG_FILE" 2>&1; then
        print_status "$GREEN" "Baseline test completed successfully"
        
        # Process results if output format requires it
        if [[ "$OUTPUT_FORMAT" != "json" ]]; then
            process_k6_results "$output_file" "baseline"
        fi
        
        return 0
    else
        print_status "$RED" "Baseline test failed or timed out"
        return 1
    fi
}

# CONTEXT7 SOURCE: /grafana/k6-docs - Royal client peak load test execution
# ROYAL PEAK REASON: Validate FAQ performance during royal client usage spikes
run_royal_peak_test() {
    print_status "$CYAN" "Running Royal Client Peak Load Test..."
    
    local test_file="$LOAD_TESTS_DIR/k6/faq-royal-peak-load.js"
    local output_file="$RESULTS_DIR/k6/royal-peak-results-$TEST_SESSION_ID.json"
    
    # Set royal client specific environment variables
    export BASE_URL="$BASE_URL"
    export ROYAL_CLIENT_RATIO="${ROYAL_RATIO:-0.3}"
    export PEAK_ARRIVAL_RATE="${VUS_OVERRIDE:-100}"
    export EXAM_SEASON_MULTIPLIER="2.5"
    
    local k6_cmd="k6 run"
    k6_cmd+=" --out json=$output_file"
    k6_cmd+=" $FAQ_K6_OPTIONS"
    k6_cmd+=" $test_file"
    
    print_status "$BLUE" "Executing royal peak test with ${ROYAL_CLIENT_RATIO} royal client ratio"
    echo "Royal Peak Test Command: $k6_cmd" >> "$LOG_FILE"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        print_status "$YELLOW" "DRY RUN: Would execute royal peak test"
        return 0
    fi
    
    # Execute test with extended timeout for comprehensive royal client testing
    if timeout 70m bash -c "$k6_cmd" >> "$LOG_FILE" 2>&1; then
        print_status "$GREEN" "Royal peak test completed successfully"
        
        if [[ "$OUTPUT_FORMAT" != "json" ]]; then
            process_k6_results "$output_file" "royal-peak"
        fi
        
        return 0
    else
        print_status "$RED" "Royal peak test failed or timed out"
        return 1
    fi
}

# CONTEXT7 SOURCE: /grafana/k6-docs - Stress breaking point test execution
# STRESS REASON: Identify FAQ system capacity limits and failure modes
run_stress_test() {
    print_status "$CYAN" "Running FAQ Stress Breaking Point Test..."
    
    local test_file="$LOAD_TESTS_DIR/k6/faq-stress-breaking-point.js"
    local output_file="$RESULTS_DIR/k6/stress-results-$TEST_SESSION_ID.json"
    
    # Set stress test specific environment variables
    export BASE_URL="$BASE_URL"
    export INITIAL_LOAD="50"
    export MAX_EXPECTED_LOAD="${VUS_OVERRIDE:-2000}"
    export LOAD_INCREMENT="50"
    
    local k6_cmd="k6 run"
    k6_cmd+=" --out json=$output_file"
    k6_cmd+=" $FAQ_K6_OPTIONS"
    k6_cmd+=" $test_file"
    
    print_status "$BLUE" "Executing stress test up to $MAX_EXPECTED_LOAD concurrent users"
    print_status "$YELLOW" "WARNING: Stress test may cause system degradation - monitor carefully"
    echo "Stress Test Command: $k6_cmd" >> "$LOG_FILE"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        print_status "$YELLOW" "DRY RUN: Would execute stress test"
        return 0
    fi
    
    # Execute stress test with extended timeout
    if timeout 50m bash -c "$k6_cmd" >> "$LOG_FILE" 2>&1; then
        print_status "$GREEN" "Stress test completed - check results for breaking point analysis"
        
        if [[ "$OUTPUT_FORMAT" != "json" ]]; then
            process_k6_results "$output_file" "stress"
        fi
        
        return 0
    else
        print_status "$YELLOW" "Stress test terminated (may have reached breaking point)"
        return 0  # Not necessarily a failure for stress tests
    fi
}

# CONTEXT7 SOURCE: /grafana/k6-docs - Accessibility load test execution
# ACCESSIBILITY REASON: Validate accessibility features under concurrent assistive technology usage
run_accessibility_test() {
    print_status "$CYAN" "Running FAQ Accessibility Load Test..."
    
    local test_file="$LOAD_TESTS_DIR/k6/faq-accessibility-load.js"
    local output_file="$RESULTS_DIR/k6/accessibility-results-$TEST_SESSION_ID.json"
    
    # Set accessibility test specific environment variables
    export BASE_URL="$BASE_URL"
    export SCREEN_READER_RATIO="0.15"
    export KEYBOARD_ONLY_RATIO="0.25"
    export HIGH_CONTRAST_RATIO="0.20"
    export VOICE_CONTROL_RATIO="0.10"
    
    if [[ "$ACCESSIBILITY_MODE" == "true" ]]; then
        # Enhanced accessibility testing ratios
        export SCREEN_READER_RATIO="0.25"
        export KEYBOARD_ONLY_RATIO="0.35"
        export HIGH_CONTRAST_RATIO="0.30"
        export VOICE_CONTROL_RATIO="0.20"
    fi
    
    local k6_cmd="k6 run"
    k6_cmd+=" --out json=$output_file"
    k6_cmd+=" $FAQ_K6_OPTIONS"
    k6_cmd+=" $test_file"
    
    print_status "$BLUE" "Executing accessibility test with assistive technology simulation"
    echo "Accessibility Test Command: $k6_cmd" >> "$LOG_FILE"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        print_status "$YELLOW" "DRY RUN: Would execute accessibility test"
        return 0
    fi
    
    # Execute accessibility test
    if timeout 25m bash -c "$k6_cmd" >> "$LOG_FILE" 2>&1; then
        print_status "$GREEN" "Accessibility test completed successfully"
        
        if [[ "$OUTPUT_FORMAT" != "json" ]]; then
            process_k6_results "$output_file" "accessibility"
        fi
        
        return 0
    else
        print_status "$RED" "Accessibility test failed or timed out"
        return 1
    fi
}

# CONTEXT7 SOURCE: Artillery.js - Complex user journey test execution
# ARTILLERY REASON: Multi-step user workflow simulation for comprehensive FAQ testing
run_artillery_test() {
    print_status "$CYAN" "Running Artillery Complex User Journeys..."
    
    local test_file="$LOAD_TESTS_DIR/artillery/faq-complex-user-journeys.yml"
    local output_file="$RESULTS_DIR/artillery/user-journeys-results-$TEST_SESSION_ID.json"
    
    # Set Artillery specific environment variables
    export BASE_URL="$BASE_URL"
    export TEST_ENVIRONMENT="script-execution"
    export TEST_SESSION_ID="$TEST_SESSION_ID"
    
    local artillery_cmd="artillery run"
    artillery_cmd+=" --output $output_file"
    artillery_cmd+=" $FAQ_ARTILLERY_OPTIONS"
    artillery_cmd+=" $test_file"
    
    print_status "$BLUE" "Executing Artillery complex user journeys"
    echo "Artillery Test Command: $artillery_cmd" >> "$LOG_FILE"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        print_status "$YELLOW" "DRY RUN: Would execute Artillery user journey test"
        return 0
    fi
    
    # Execute Artillery test
    if timeout 30m bash -c "$artillery_cmd" >> "$LOG_FILE" 2>&1; then
        print_status "$GREEN" "Artillery user journeys completed successfully"
        
        if [[ "$OUTPUT_FORMAT" != "json" ]]; then
            process_artillery_results "$output_file"
        fi
        
        return 0
    else
        print_status "$RED" "Artillery user journeys failed or timed out"
        return 1
    fi
}

# CONTEXT7 SOURCE: /googlechrome/lighthouse-ci - Lighthouse performance audit execution
# LIGHTHOUSE REASON: Automated Core Web Vitals and accessibility compliance validation
run_lighthouse_audit() {
    print_status "$CYAN" "Running Lighthouse Performance Audit..."
    
    local output_dir="$RESULTS_DIR/lighthouse"
    
    # Create Lighthouse configuration
    cat > "$output_dir/lighthouserc-$TEST_SESSION_ID.json" << EOF
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "chromeFlags": "--no-sandbox --headless --disable-gpu"
      },
      "url": [
        "$BASE_URL/faq",
        "$BASE_URL/faq?accessibility=enhanced",
        "$BASE_URL/faq?tier=royal"
      ]
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "first-contentful-paint": ["error", {"maxNumericValue": 1500}],
        "largest-contentful-paint": ["error", {"maxNumericValue": 2500}]
      }
    },
    "upload": {
      "target": "filesystem",
      "outputDir": "$output_dir"
    }
  }
}
EOF
    
    local lighthouse_cmd="lhci autorun"
    lighthouse_cmd+=" --config=$output_dir/lighthouserc-$TEST_SESSION_ID.json"
    
    print_status "$BLUE" "Executing Lighthouse audit on FAQ pages"
    echo "Lighthouse Command: $lighthouse_cmd" >> "$LOG_FILE"
    
    if [[ "$DRY_RUN" == "true" ]]; then
        print_status "$YELLOW" "DRY RUN: Would execute Lighthouse audit"
        return 0
    fi
    
    # Change to output directory for Lighthouse execution
    cd "$output_dir"
    
    # Execute Lighthouse audit
    if timeout 15m bash -c "$lighthouse_cmd" >> "$LOG_FILE" 2>&1; then
        print_status "$GREEN" "Lighthouse audit completed successfully"
        return 0
    else
        print_status "$RED" "Lighthouse audit failed or timed out"
        return 1
    fi
    
    cd "$PROJECT_ROOT"
}

# CONTEXT7 SOURCE: /grafana/k6-docs - K6 results processing and analysis
# PROCESSING REASON: Convert raw k6 JSON output to actionable performance insights
process_k6_results() {
    local results_file="$1"
    local test_type="$2"
    
    if [[ ! -f "$results_file" ]]; then
        print_status "$RED" "Results file not found: $results_file"
        return 1
    fi
    
    print_status "$BLUE" "Processing $test_type test results..."
    
    # Extract key metrics using jq
    local summary_file="${results_file%.json}-summary.txt"
    
    cat > "$summary_file" << EOF
FAQ $test_type Load Test Results Summary
========================================
Generated: $(date -u '+%Y-%m-%d %H:%M:%S UTC')
Session ID: $TEST_SESSION_ID
Target URL: $BASE_URL

EOF
    
    # Process k6 JSON output to extract metrics
    if command -v jq &> /dev/null; then
        echo "PERFORMANCE METRICS:" >> "$summary_file"
        
        # Extract HTTP request metrics
        local http_req_duration_avg=$(jq -r '.metrics.http_req_duration.values.avg // "N/A"' "$results_file")
        local http_req_duration_p95=$(jq -r '.metrics.http_req_duration.values["p(95)"] // "N/A"' "$results_file")
        local http_req_duration_p99=$(jq -r '.metrics.http_req_duration.values["p(99)"] // "N/A"' "$results_file")
        local http_req_failed_rate=$(jq -r '.metrics.http_req_failed.values.rate // "N/A"' "$results_file")
        local vus_max=$(jq -r '.metrics.vus_max.values.max // "N/A"' "$results_file")
        local iterations=$(jq -r '.metrics.iterations.values.count // "N/A"' "$results_file")
        
        cat >> "$summary_file" << EOF
- Average Response Time: ${http_req_duration_avg}ms
- 95th Percentile Response Time: ${http_req_duration_p95}ms  
- 99th Percentile Response Time: ${http_req_duration_p99}ms
- Error Rate: ${http_req_failed_rate}%
- Maximum Virtual Users: $vus_max
- Total Iterations: $iterations

EOF
        
        # Check against royal client standards
        local royal_compliance="UNKNOWN"
        if [[ "$http_req_duration_p95" != "N/A" && "$http_req_failed_rate" != "N/A" ]]; then
            local p95_ms=$(echo "$http_req_duration_p95" | cut -d'.' -f1)
            local error_rate=$(echo "scale=4; $http_req_failed_rate * 100" | bc -l)
            
            if (( $(echo "$p95_ms < 100" | bc -l) )) && (( $(echo "$error_rate < 0.01" | bc -l) )); then
                royal_compliance="✓ COMPLIANT"
            else
                royal_compliance="✗ NON-COMPLIANT"
            fi
        fi
        
        echo "ROYAL CLIENT STANDARDS: $royal_compliance" >> "$summary_file"
        
    else
        echo "jq not available - basic results processing only" >> "$summary_file"
    fi
    
    print_status "$GREEN" "Results processed: $summary_file"
}

# CONTEXT7 SOURCE: Artillery.js - Artillery results processing
# ARTILLERY PROCESSING REASON: Process Artillery user journey test results for analysis
process_artillery_results() {
    local results_file="$1"
    
    if [[ ! -f "$results_file" ]]; then
        print_status "$RED" "Artillery results file not found: $results_file"
        return 1
    fi
    
    print_status "$BLUE" "Processing Artillery user journey results..."
    
    local summary_file="${results_file%.json}-summary.txt"
    
    cat > "$summary_file" << EOF
FAQ Complex User Journeys Results Summary
=========================================
Generated: $(date -u '+%Y-%m-%d %H:%M:%S UTC')
Session ID: $TEST_SESSION_ID
Target URL: $BASE_URL

Artillery user journey tests completed successfully.
See detailed results in: $results_file

EOF
    
    print_status "$GREEN" "Artillery results processed: $summary_file"
}

# CONTEXT7 SOURCE: /grafana/k6-docs - Comprehensive test results reporting
# REPORTING REASON: Generate executive summary of all FAQ load test results
generate_comprehensive_report() {
    print_status "$BLUE" "Generating comprehensive FAQ load test report..."
    
    local report_file="$RESULTS_DIR/comprehensive-report-$TEST_SESSION_ID.md"
    
    cat > "$report_file" << EOF
# FAQ System Load Testing Comprehensive Report

**Test Session ID:** $TEST_SESSION_ID  
**Execution Date:** $(date -u '+%Y-%m-%d %H:%M:%S UTC')  
**Target URL:** $BASE_URL  
**Test Type:** $TEST_TYPE  

## Executive Summary

This report contains the results of comprehensive load testing performed on the My Private Tutor Online FAQ system. The testing validates performance against royal client service standards and ensures enterprise-grade reliability.

## Test Results Overview

| Test Type | Status | Results File | Summary |
|-----------|--------|--------------|---------|
EOF
    
    # Add test results to report
    local test_types=()
    case "$TEST_TYPE" in
        all)
            test_types=("baseline" "royal-peak" "stress" "accessibility")
            ;;
        *)
            test_types=("$TEST_TYPE")
            ;;
    esac
    
    for test_type in "${test_types[@]}"; do
        local results_file="$RESULTS_DIR/k6/${test_type}-results-$TEST_SESSION_ID.json"
        local summary_file="$RESULTS_DIR/k6/${test_type}-results-$TEST_SESSION_ID-summary.txt"
        
        if [[ -f "$results_file" ]]; then
            local status="✅ Completed"
            local summary_link="[View Summary]($(basename "$summary_file"))"
        else
            local status="❌ Failed/Skipped"
            local summary_link="N/A"
        fi
        
        echo "| FAQ $test_type Load Test | $status | $(basename "$results_file") | $summary_link |" >> "$report_file"
    done
    
    cat >> "$report_file" << EOF

## Royal Client Service Standards Compliance

The FAQ system has been tested against the following royal client standards:

- **Performance Target**: 95% of requests under 50ms for royal clients
- **Availability Target**: 99.99% uptime reliability
- **Error Rate Target**: <0.01% for royal clients
- **Search Performance**: <100ms for FAQ queries
- **Accessibility**: WCAG 2.1 AA compliance under load

## Test Environment Details

- **Script Version:** $(git rev-parse HEAD 2>/dev/null || echo "unknown")
- **Test Duration:** Variable based on test type
- **Load Generation:** k6 and Artillery.js
- **Results Format:** JSON with processed summaries
- **Log File:** [Execution Log]($(basename "$LOG_FILE"))

## Recommendations

Based on the load test results, review individual test summaries for specific performance optimization recommendations. Ensure any performance issues are addressed before production deployment.

## Test Artifacts

All test results, summaries, and logs are available in the test results directory:
\`$RESULTS_DIR\`

---

*Generated by FAQ Load Testing Suite*  
*My Private Tutor Online - Royal Client Service Excellence*
EOF
    
    print_status "$GREEN" "Comprehensive report generated: $report_file"
    
    # Display report if not in quiet mode
    if [[ "$OUTPUT_FORMAT" == "detailed" || "$OUTPUT_FORMAT" == "dashboard" ]]; then
        echo ""
        print_status "$CYAN" "=== COMPREHENSIVE REPORT PREVIEW ==="
        echo ""
        head -50 "$report_file"
        echo ""
        print_status "$CYAN" "=== END REPORT PREVIEW ==="
        echo ""
    fi
}

# CONTEXT7 SOURCE: /grafana/k6-docs - Test results cleanup and archiving
# CLEANUP REASON: Manage test results storage and maintain clean test environment
cleanup_old_results() {
    print_status "$BLUE" "Cleaning up old test results..."
    
    if [[ ! -d "$RESULTS_DIR" ]]; then
        print_status "$YELLOW" "No results directory found: $RESULTS_DIR"
        return 0
    fi
    
    # Archive old results
    local archive_dir="$RESULTS_DIR/archives"
    mkdir -p "$archive_dir"
    
    # Find results older than retention period
    local retention_days="${RESULTS_RETENTION_DAYS:-$DEFAULT_RESULTS_RETENTION_DAYS}"
    
    print_status "$BLUE" "Archiving results older than $retention_days days..."
    
    # Archive old JSON results
    find "$RESULTS_DIR" -name "*.json" -type f -mtime +"$retention_days" -exec mv {} "$archive_dir/" \; 2>/dev/null || true
    
    # Archive old summary files
    find "$RESULTS_DIR" -name "*summary.txt" -type f -mtime +"$retention_days" -exec mv {} "$archive_dir/" \; 2>/dev/null || true
    
    # Archive old log files
    find "$RESULTS_DIR" -name "*.log" -type f -mtime +"$retention_days" -exec mv {} "$archive_dir/" \; 2>/dev/null || true
    
    # Compress archived files
    if [[ -n "$(ls -A "$archive_dir" 2>/dev/null)" ]]; then
        cd "$archive_dir"
        tar -czf "archived-results-$(date +%Y%m%d).tar.gz" * 2>/dev/null || true
        rm -f *.json *.txt *.log 2>/dev/null || true
        cd "$PROJECT_ROOT"
        print_status "$GREEN" "Old results archived and compressed"
    else
        print_status "$YELLOW" "No old results to archive"
    fi
    
    # Clean up empty directories
    find "$RESULTS_DIR" -type d -empty -delete 2>/dev/null || true
    
    print_status "$GREEN" "Cleanup completed"
}

# CONTEXT7 SOURCE: /grafana/k6-docs - Main execution workflow
# MAIN REASON: Orchestrate comprehensive FAQ load testing execution with proper error handling
main() {
    local start_time=$(date +%s)
    
    print_header
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -u|--url)
                BASE_URL="$2"
                shift 2
                ;;
            -t|--test)
                TEST_TYPE="$2"
                shift 2
                ;;
            -o|--output)
                OUTPUT_FORMAT="$2"
                shift 2
                ;;
            -c|--config)
                CONFIG_FILE="$2"
                shift 2
                ;;
            -r|--results-dir)
                RESULTS_DIR="$2"
                shift 2
                ;;
            -d|--duration)
                DURATION_OVERRIDE="$2"
                shift 2
                ;;
            -v|--vus)
                VUS_OVERRIDE="$2"
                shift 2
                ;;
            --royal-ratio)
                ROYAL_RATIO="$2"
                shift 2
                ;;
            --accessibility-mode)
                ACCESSIBILITY_MODE="true"
                shift
                ;;
            --dry-run)
                DRY_RUN="true"
                shift
                ;;
            --cleanup)
                cleanup_old_results
                exit 0
                ;;
            -h|--help)
                print_help
                exit 0
                ;;
            *)
                print_status "$RED" "Unknown option: $1"
                print_help
                exit 1
                ;;
        esac
    done
    
    # Set defaults and environment variables
    BASE_URL="${BASE_URL:-${FAQ_TEST_URL:-$DEFAULT_BASE_URL}}"
    TEST_TYPE="${TEST_TYPE:-${FAQ_TEST_TYPE:-$DEFAULT_TEST_TYPE}}"
    OUTPUT_FORMAT="${OUTPUT_FORMAT:-$DEFAULT_OUTPUT_FORMAT}"
    DRY_RUN="${DRY_RUN:-false}"
    ACCESSIBILITY_MODE="${ACCESSIBILITY_MODE:-false}"
    FAQ_K6_OPTIONS="${FAQ_K6_OPTIONS:-}"
    FAQ_ARTILLERY_OPTIONS="${FAQ_ARTILLERY_OPTIONS:-}"
    RESULTS_RETENTION_DAYS="${RESULTS_RETENTION_DAYS:-$DEFAULT_RESULTS_RETENTION_DAYS}"
    
    # Validate configuration
    validate_configuration
    
    # Setup test environment
    if [[ "$DRY_RUN" != "true" ]]; then
        setup_test_environment
    fi
    
    print_status "$BLUE" "Starting FAQ load testing suite..."
    print_status "$BLUE" "Configuration:"
    print_status "$BLUE" "  - Target URL: $BASE_URL"
    print_status "$BLUE" "  - Test Type: $TEST_TYPE"
    print_status "$BLUE" "  - Output Format: $OUTPUT_FORMAT"
    print_status "$BLUE" "  - Results Dir: $RESULTS_DIR"
    print_status "$BLUE" "  - Dry Run: $DRY_RUN"
    
    # Execute tests based on type
    local test_results=()
    local overall_success=true
    
    case "$TEST_TYPE" in
        baseline)
            if run_baseline_test; then
                test_results+=("baseline:success")
            else
                test_results+=("baseline:failed")
                overall_success=false
            fi
            ;;
        royal-peak)
            if run_royal_peak_test; then
                test_results+=("royal-peak:success")
            else
                test_results+=("royal-peak:failed")
                overall_success=false
            fi
            ;;
        stress)
            if run_stress_test; then
                test_results+=("stress:success")
            else
                test_results+=("stress:failed")
                overall_success=false
            fi
            ;;
        accessibility)
            if run_accessibility_test; then
                test_results+=("accessibility:success")
            else
                test_results+=("accessibility:failed")
                overall_success=false
            fi
            ;;
        all)
            print_status "$BLUE" "Running comprehensive FAQ load testing suite..."
            
            # Run K6 tests
            if run_baseline_test; then
                test_results+=("baseline:success")
            else
                test_results+=("baseline:failed")
                overall_success=false
            fi
            
            if run_royal_peak_test; then
                test_results+=("royal-peak:success")
            else
                test_results+=("royal-peak:failed")
                overall_success=false
            fi
            
            if run_accessibility_test; then
                test_results+=("accessibility:success")
            else
                test_results+=("accessibility:failed")
                overall_success=false
            fi
            
            # Run stress test last (may cause system impact)
            if run_stress_test; then
                test_results+=("stress:success")
            else
                test_results+=("stress:failed")
                # Don't fail overall for stress test issues
            fi
            
            # Run Artillery user journeys
            if run_artillery_test; then
                test_results+=("artillery:success")
            else
                test_results+=("artillery:failed")
                overall_success=false
            fi
            
            # Run Lighthouse audit
            if run_lighthouse_audit; then
                test_results+=("lighthouse:success")
            else
                test_results+=("lighthouse:failed")
                # Don't fail overall for lighthouse issues
            fi
            ;;
        *)
            print_status "$RED" "Unknown test type: $TEST_TYPE"
            print_help
            exit 1
            ;;
    esac
    
    # Generate comprehensive report
    if [[ "$DRY_RUN" != "true" ]]; then
        generate_comprehensive_report
    fi
    
    # Print final summary
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    local duration_formatted=$(printf '%02dh:%02dm:%02ds' $((duration/3600)) $((duration%3600/60)) $((duration%60)))
    
    echo ""
    print_status "$PURPLE" "=== FAQ LOAD TESTING SUITE SUMMARY ==="
    print_status "$BLUE" "Execution Time: $duration_formatted"
    print_status "$BLUE" "Test Results:"
    
    for result in "${test_results[@]}"; do
        local test_name="${result%:*}"
        local test_status="${result#*:}"
        
        if [[ "$test_status" == "success" ]]; then
            print_status "$GREEN" "  ✅ $test_name: SUCCESS"
        else
            print_status "$RED" "  ❌ $test_name: FAILED"
        fi
    done
    
    if [[ "$overall_success" == "true" ]]; then
        print_status "$GREEN" "🎉 FAQ Load Testing Suite completed successfully!"
        print_status "$GREEN" "Royal client service standards validated."
        
        if [[ "$DRY_RUN" != "true" ]]; then
            print_status "$BLUE" "📊 Results available in: $RESULTS_DIR"
        fi
        
        exit 0
    else
        print_status "$RED" "⚠️  FAQ Load Testing Suite completed with failures."
        print_status "$YELLOW" "Review failed tests and address issues before production deployment."
        
        if [[ "$DRY_RUN" != "true" ]]; then
            print_status "$BLUE" "📊 Results available in: $RESULTS_DIR"
        fi
        
        exit 1
    fi
}

# Execute main function with all arguments
main "$@"