# FAQ System Load Testing Suite

## Overview

This directory contains comprehensive load testing and performance optimization
tools for the My Private Tutor Online FAQ system. The suite ensures
enterprise-grade performance that meets royal client service standards.

## Quick Start

### Prerequisites

Install required tools:

```bash
# Install k6 (macOS with Homebrew)
brew install k6

# Install k6 (Linux)
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update && sudo apt-get install k6

# Install Artillery.js
npm install -g artillery@latest

# Install Lighthouse CI
npm install -g @lhci/cli@0.15.x
```

### Running Tests

#### Option 1: Using npm scripts (Recommended)

```bash
# Run all load tests
npm run load-test:all

# Run specific test types
npm run load-test:baseline    # Standard FAQ load test
npm run load-test:royal       # Royal client peak load
npm run load-test:stress      # Breaking point analysis
npm run load-test:accessibility  # Accessibility load test

# Individual tool tests
npm run k6:baseline          # K6 baseline test only
npm run artillery:journeys   # Artillery user journeys only
npm run lighthouse:audit     # Lighthouse audit only
```

#### Option 2: Using the master script

```bash
# Run comprehensive test suite
./scripts/performance/run-load-tests.sh --test all

# Run with custom target URL
./scripts/performance/run-load-tests.sh --url https://your-domain.com --test baseline

# Run with royal client optimization
./scripts/performance/run-load-tests.sh --test royal-peak --royal-ratio 0.4

# Dry run to validate configuration
./scripts/performance/run-load-tests.sh --dry-run --test all
```

#### Option 3: Direct test execution

```bash
# K6 tests
k6 run load-tests/k6/faq-baseline-load.js
k6 run load-tests/k6/faq-royal-peak-load.js
k6 run load-tests/k6/faq-stress-breaking-point.js
k6 run load-tests/k6/faq-accessibility-load.js

# Artillery user journeys
artillery run load-tests/artillery/faq-complex-user-journeys.yml
```

## Test Suite Components

### 🎯 K6 Load Tests (`/k6/`)

Comprehensive performance testing with realistic user scenarios:

| Test File                      | Purpose                              | Duration    | Target Load                     |
| ------------------------------ | ------------------------------------ | ----------- | ------------------------------- |
| `faq-baseline-load.js`         | Standard FAQ performance validation  | 14 minutes  | 500 concurrent users            |
| `faq-royal-peak-load.js`       | Royal client peak load simulation    | 57 minutes  | 1000+ users with royal priority |
| `faq-stress-breaking-point.js` | System capacity limit identification | 40+ minutes | Progressive load to 2000+ users |
| `faq-accessibility-load.js`    | Accessibility feature validation     | 22 minutes  | 300 assistive technology users  |

### 🎭 Artillery Complex Journeys (`/artillery/`)

Multi-step user workflow simulation:

| Component                       | Purpose                                                             |
| ------------------------------- | ------------------------------------------------------------------- |
| `faq-complex-user-journeys.yml` | Royal client, standard user, and accessibility user journey testing |
| `faq-artillery-processor.js`    | Custom test data generation and response validation                 |

### 📊 Performance Monitoring (`/src/lib/monitoring/`)

Real-time performance tracking:

| Component                     | Purpose                                                    |
| ----------------------------- | ---------------------------------------------------------- |
| `performance-monitor.ts`      | Client-side Web Vitals collection and FAQ-specific metrics |
| `/api/analytics/performance/` | Server-side performance data processing and alerting       |

## Performance Targets

### Royal Client Service Standards

Our FAQ system is tested against the following royal client performance
standards:

| Metric                  | Royal Target | Standard Target | Test Coverage         |
| ----------------------- | ------------ | --------------- | --------------------- |
| **Response Time (p95)** | <50ms        | <100ms          | All K6 tests          |
| **Response Time (p99)** | <100ms       | <200ms          | All K6 tests          |
| **Error Rate**          | <0.01%       | <0.1%           | All load tests        |
| **Availability**        | 99.99%       | 99.9%           | Stress testing        |
| **FAQ Search**          | <100ms       | <200ms          | Search-specific tests |
| **Theme Toggle**        | <200ms       | <400ms          | Accessibility tests   |
| **Voice Search**        | <2000ms      | <3000ms         | Accessibility tests   |

### Core Web Vitals Compliance

| Metric                              | Royal Target | Standard Target | Lighthouse CI |
| ----------------------------------- | ------------ | --------------- | ------------- |
| **FCP** (First Contentful Paint)    | <1000ms      | <1800ms         | ✓ Automated   |
| **LCP** (Largest Contentful Paint)  | <1500ms      | <2500ms         | ✓ Automated   |
| **FID** (First Input Delay)         | <50ms        | <100ms          | ✓ Automated   |
| **CLS** (Cumulative Layout Shift)   | <0.05        | <0.1            | ✓ Automated   |
| **INP** (Interaction to Next Paint) | <100ms       | <200ms          | ✓ Automated   |

## Test Scenarios

### 1. FAQ Baseline Load Test

**Simulates**: Normal FAQ usage patterns with realistic user behavior

**Key Features**:

- 500 concurrent users over 12 minutes
- FAQ homepage, search, and category browsing
- Theme switching and offline recovery testing
- Voice search capability validation
- Royal client identification and prioritization

**Success Criteria**:

- 95% of requests under 100ms
- <0.1% error rate
- All FAQ functionality operational under load

### 2. Royal Client Peak Load Test

**Simulates**: Exam period traffic spikes with royal endorsement announcements

**Key Features**:

- Progressive load up to 1000+ concurrent users
- 30% royal client traffic simulation
- Premium service feature testing
- Oxbridge preparation access validation
- International royal client support

**Success Criteria**:

- Royal client responses <50ms (p95)
- Premium feature availability >99.99%
- Booking conversion rate maintained

### 3. Stress Breaking Point Test

**Simulates**: Extreme load conditions to identify capacity limits

**Key Features**:

- Progressive load increase from 50 to 2000+ users
- Automatic abort at 15% failure rate
- System degradation pattern analysis
- Memory pressure and cascade failure detection

**Success Criteria**:

- Breaking point identification
- Graceful degradation validation
- Recovery capability confirmation

### 4. Accessibility Load Test

**Simulates**: Concurrent assistive technology usage

**Key Features**:

- Screen reader compatibility (15% of users)
- Keyboard-only navigation (25% of users)
- High contrast mode (20% of users)
- Voice control features (10% of users)
- WCAG 2.1 AA compliance validation

**Success Criteria**:

- Screen reader response time <150ms
- Keyboard navigation <75ms average
- 95%+ accessibility compliance maintained

## GitHub Actions Integration

The load testing suite is fully integrated with GitHub Actions for continuous
performance monitoring:

### Automated Triggers

- **Push Events**: FAQ component changes trigger baseline testing
- **Pull Requests**: Comprehensive performance validation
- **Scheduled Runs**: Every 6 hours + weekday morning runs
- **Manual Dispatch**: On-demand test execution with configuration options

### Test Matrix

The CI pipeline executes tests in parallel for efficiency:

```yaml
strategy:
 matrix:
  test-scenario:
   - { name: 'baseline', file: 'faq-baseline-load.js' }
   - { name: 'royal-peak', file: 'faq-royal-peak-load.js' }
   - { name: 'stress-breaking-point', file: 'faq-stress-breaking-point.js' }
   - { name: 'accessibility', file: 'faq-accessibility-load.js' }
```

### Artifacts Generated

- Individual test results (JSON format)
- Performance summary reports (Markdown)
- Lighthouse audit reports (HTML/JSON)
- Comprehensive execution logs
- Historical performance trends

## Results Analysis

### Understanding Test Output

#### K6 Results Format

```json
{
	"test_type": "FAQ Baseline Load Test",
	"duration_minutes": 12,
	"peak_concurrent_users": 500,
	"total_requests": 45000,
	"avg_response_time_ms": 45,
	"p95_response_time_ms": 85,
	"p99_response_time_ms": 150,
	"error_rate_percent": "0.002",
	"royal_client_success_rate": "99.98%",
	"accessibility_compliance": "97.5%"
}
```

#### Performance Summary

Each test generates a comprehensive summary:

```
╔══════════════════════════════════════════════════════════════╗
║              FAQ BASELINE LOAD TEST RESULTS                 ║
╠══════════════════════════════════════════════════════════════╣
║ STATUS: ROYAL CLIENT READY ✓                                ║
║ Peak VUs: 500                                                ║
║ Total Requests: 45000                                        ║
║ HTTP Req Duration (p95): 85ms                               ║
║ HTTP Error Rate: 0.002%                                      ║
║ FAQ Search (avg): 42ms                                       ║
╚══════════════════════════════════════════════════════════════╝
```

### Performance Monitoring Dashboard

Real-time performance metrics are available through:

1. **Client-side Monitoring**: Automatic Web Vitals collection
2. **Server-side Analytics**: `/api/analytics/performance`
3. **Alert System**: Immediate notification for royal client issues
4. **Historical Analysis**: Performance trends and regression detection

## Troubleshooting

### Common Issues

#### 1. Slow Test Execution

**Symptoms**: Tests taking longer than expected **Solution**: Check system
resources and network connectivity

```bash
# Check system resources
htop
netstat -tuln

# Run with reduced load
BASE_URL=http://localhost:3000 TARGET_VUS=100 k6 run load-tests/k6/faq-baseline-load.js
```

#### 2. High Error Rates

**Symptoms**: >1% error rate in results **Solution**: Validate target URL and
system health

```bash
# Check FAQ system health
curl -I http://localhost:3000/faq
curl -I http://localhost:3000/api/faq/health

# Run dry-run to validate configuration
./scripts/performance/run-load-tests.sh --dry-run --test baseline
```

#### 3. Lighthouse CI Failures

**Symptoms**: Performance budget violations **Solution**: Review specific
metrics and optimize

```bash
# Run isolated Lighthouse audit
lighthouse http://localhost:3000/faq --output json --chrome-flags="--headless"

# Check specific performance metrics
npm run lighthouse:audit
```

### Performance Optimization

If tests identify performance issues:

1. **Review Database Queries**: Check for inefficient FAQ searches
2. **Optimize Caching**: Implement appropriate cache strategies
3. **Bundle Analysis**: Reduce JavaScript bundle size
4. **CDN Configuration**: Optimize static asset delivery
5. **API Optimization**: Implement response compression and pagination

## Configuration

### Environment Variables

| Variable             | Purpose                        | Default                 |
| -------------------- | ------------------------------ | ----------------------- |
| `BASE_URL`           | Target URL for testing         | `http://localhost:3000` |
| `TARGET_VUS`         | Override virtual users         | Test-specific           |
| `RAMP_DURATION`      | Override ramp-up time          | Test-specific           |
| `ROYAL_CLIENT_RATIO` | Royal client percentage        | `0.3` (30%)             |
| `ACCESSIBILITY_MODE` | Enhanced accessibility testing | `false`                 |

### Custom Configuration

Create custom test configurations by modifying test files or using environment
variables:

```bash
# Custom baseline test with higher load
TARGET_VUS=1000 RAMP_DURATION=5m k6 run load-tests/k6/faq-baseline-load.js

# Royal client focused testing
ROYAL_CLIENT_RATIO=0.8 k6 run load-tests/k6/faq-royal-peak-load.js

# Extended accessibility testing
SCREEN_READER_RATIO=0.3 VOICE_CONTROL_RATIO=0.2 k6 run load-tests/k6/faq-accessibility-load.js
```

## Contributing

### Adding New Tests

1. **K6 Tests**: Place in `/k6/` directory with descriptive names
2. **Artillery Tests**: Use YAML format in `/artillery/` directory
3. **Test Scripts**: Update `run-load-tests.sh` for new test types
4. **Documentation**: Update this README with new test descriptions

### Test Development Guidelines

- Follow Context7 MCP documentation patterns
- Include comprehensive source attribution comments
- Implement realistic user behavior simulation
- Add appropriate performance thresholds
- Generate actionable test summaries

### Performance Standards

All new tests must validate against:

- Royal client service standards (<50ms p95 response)
- Accessibility compliance (WCAG 2.1 AA)
- Error rate targets (<0.01% for royal clients)
- Scalability requirements (1000+ concurrent users)

## Support

For issues, questions, or contributions:

1. **Documentation**: Review this README and
   `/docs/performance/FAQ-LOAD-TESTING-GUIDE.md`
2. **Test Results**: Check generated artifacts in `test-results/load-tests/`
3. **GitHub Actions**: Review workflow logs for CI/CD issues
4. **Performance Monitoring**: Check `/api/analytics/performance` endpoints

---

**FAQ Load Testing Suite - My Private Tutor Online**  
_Enterprise-grade performance validation for royal client service excellence_
