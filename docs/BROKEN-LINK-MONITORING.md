# Broken Link & Site Health Monitoring

Your comprehensive Playwright-powered site health monitoring system is now fully implemented and ready to use!

## 🎯 What This System Does

✅ **Detects Broken Links** - Finds 404s, 500s, and other HTTP errors
✅ **Missing Assets** - Catches broken images, CSS, JavaScript files
✅ **Network Failures** - Identifies timeouts, DNS issues, connection problems
✅ **Performance Monitoring** - Tracks page load times and asset performance
✅ **Accessibility Compliance** - Validates WCAG 2.1 AA standards
✅ **JavaScript Errors** - Monitors for client-side runtime errors
✅ **Cross-Browser Testing** - Tests on Chrome, Firefox, Safari, and mobile

## 🚀 Quick Start

### Run Against Production (CI/CD)
```bash
# Test your live site for broken links
npm run test:health

# Full site health monitoring (includes performance & accessibility)
npm run test:site:all

# Quick health check after build
npm run health:check
```

### Run Against Local Development
```bash
# Start dev server (in one terminal)
npm run dev

# Run health monitoring against local site (in another terminal)
npm run test:health:local
npm run test:performance:local
npm run test:accessibility:local

# Or run all local tests together
npm run test:site:local
```

## 📊 Reports & Monitoring

### Automated Reports
The system generates detailed JSON reports in `test-results/`:
- `health-report.json` - Broken links and failed requests
- `performance-report.json` - Load times and asset performance
- `accessibility-report.json` - WCAG compliance and issues

### GitHub Actions Integration
Your existing `.github/workflows/site-health.yml` automatically:
- ✅ Runs on every push to main/master
- ✅ Monitors daily at 6 AM UTC
- ✅ Uploads detailed reports as artifacts
- ✅ Fails builds if critical issues found

## 🔍 What Gets Monitored

### 17 Critical Pages Checked
- Homepage (/)
- About Us (/about)
- Contact (/contact)
- Services (/services)
- Subject Tuition (/subject-tuition)
- How It Works (/how-it-works)
- Testimonials (/testimonials)
- Expert Educators (/expert-educators)
- FAQ (/faq)
- Meet Our Tutors (/meet-our-tutors)
- Video Masterclasses (/video-masterclasses)
- 11+ Bootcamps (/11-plus-bootcamps)
- Exam Papers (/exam-papers)
- Privacy Policy (/legal/privacy-policy)
- Terms of Service (/legal/terms-of-service)
- Cookie Policy (/legal/cookie-policy)
- Booking Policy (/legal/booking-policy)

### Comprehensive Detection
- **Internal Links** - All navigation and content links
- **Images** - All img tags with src attributes
- **Stylesheets** - CSS file loading and availability
- **JavaScript** - Script loading and runtime errors
- **Fonts** - Web font loading performance
- **API Calls** - AJAX requests and responses

## 🛠️ Advanced Usage

### Debug Mode (Visual)
```bash
# Run with visible browser for debugging
npm run test:health:local

# This runs with headless: false so you can see what's happening
```

### Custom URL Testing
```bash
# Test specific URLs (modify the test file)
npx playwright test tests/e2e/site-health.spec.ts --grep "Homepage"
```

### Performance Budget
Current performance targets (configurable in test files):
- Max page load time: 3 seconds
- Max asset load time: 2 seconds
- Max image size: 1MB

## 📈 Performance Optimization

The system identifies:
- **Slow Assets** - Resources taking >2s to load
- **Oversized Images** - Images larger than display size
- **Render-blocking Resources** - CSS/JS blocking page render
- **Failed Assets** - 404/500 responses for critical resources

## ♿ Accessibility Monitoring

Automated checks for:
- **Alt Text** - Missing image descriptions
- **Heading Structure** - Proper h1-h6 hierarchy
- **Form Labels** - Accessible form controls
- **Keyboard Navigation** - Focus management
- **ARIA Compliance** - Screen reader compatibility

## 🔧 Configuration

### Production URL
Automatically uses your Vercel deployment:
`https://myprivatetutoronline-f8tv06oa2-jacks-projects-cf5effed.vercel.app`

### Local Development
Uses `http://localhost:3000` when running local tests

### Browser Support
Tests across all major browsers:
- Desktop: Chrome, Firefox, Safari
- Mobile: Chrome (Pixel 5), Safari (iPhone 12)

## 🚨 Alert Thresholds

### Automatic Failures
Tests automatically fail for:
- ❌ Any broken internal links (404/500 errors)
- ❌ Missing critical images or assets
- ❌ Network request failures
- ❌ JavaScript runtime errors
- ❌ Critical accessibility violations

### Warnings (Non-blocking)
- ⚠️ Slow asset loading (>2s)
- ⚠️ Performance budget exceeded
- ⚠️ Accessibility improvements needed
- ⚠️ Large images being scaled down

## 📋 Daily Monitoring Checklist

Your GitHub Actions automatically:
1. ✅ Checks all 17 critical pages
2. ✅ Tests across 5 browsers/devices
3. ✅ Validates 95+ individual test cases
4. ✅ Generates comprehensive reports
5. ✅ Notifies of any issues found
6. ✅ Archives results for trend analysis

## 🎯 Next Steps

### Immediate Usage
1. **Run locally**: `npm run test:health:local`
2. **Check reports**: Look in `test-results/` folder
3. **Fix issues**: Address any broken links found
4. **Deploy**: Push to trigger automatic CI monitoring

### Advanced Customization
1. **Add pages**: Edit the `criticalPages` array in test files
2. **Adjust budgets**: Modify performance thresholds
3. **Custom checks**: Add page-specific validations
4. **Notifications**: Integrate with Slack/email via GitHub Actions

## 🆘 Troubleshooting

### Common Issues

**Test timeouts**: Increase timeout values for slow networks
```typescript
timeout: 45000 // Increase from 30000
```

**Too many requests**: Reduce concurrent checks
```typescript
workers: 1 // In CI environment
```

**False positives**: Add specific exclusions
```typescript
if (href && !href.includes('external-service.com'))
```

---

**Your broken link detection system is now live and monitoring your production site 24/7!** 🚀

For technical details, see the test files:
- `tests/e2e/site-health.spec.ts` - Core broken link detection
- `tests/e2e/performance.spec.ts` - Performance monitoring
- `tests/e2e/accessibility.spec.ts` - Accessibility compliance