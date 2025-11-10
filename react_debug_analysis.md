
> my-tutor-website@0.1.0 debug:react
> node scripts/analyze-react-health.mjs


============================================================
[1mREACT HEALTH ANALYSIS REPORT[0m
============================================================

============================================================
[1mFILE-LEVEL ANALYSIS[0m
============================================================
[36mScanning 310 React files...[0m
[31m✗ Found 275 potential issues[0m
[33m
  src/app/11-plus-bootcamps/page.tsx:[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m
  src/app/admin/login/page.tsx:[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m
  src/app/admin/monitoring/page.tsx:[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m
  src/app/admin/page.tsx:[0m
[33m    [MISSING_REACT_IMPORT]: Consider explicit React import for clarity in non-client components[0m
[33m
  src/app/api/performance/alerts/route.ts:[0m
[33m    [MISSING_REACT_IMPORT]: Consider explicit React import for clarity in non-client components[0m
[33m
  src/app/blog/page.tsx:[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m    [MISSING_KEY_PROP] (line 266): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 360): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 377): Array map without key prop - performance impact[0m
[33m
  src/app/contact/page.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 180): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <div key={index}>{line}</div>[0m
[33m    [MISSING_KEY_PROP] (line 179): Array map without key prop - performance impact[0m
[33m
  src/app/dashboard/faq-analytics/page.tsx:[0m
[33m    [MISSING_REACT_IMPORT]: Consider explicit React import for clarity in non-client components[0m
[33m
  src/app/dashboard/performance/page.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 462): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='text-sm'>{achievement}</span>[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m    [MISSING_KEY_PROP] (line 301): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 395): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 416): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 457): Array map without key prop - performance impact[0m
[33m
  src/app/dashboard/testimonials-analytics/page.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 27): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 60): Array map without key prop - performance impact[0m
[33m
  src/app/exam-papers/page.tsx:[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m    [MISSING_KEY_PROP] (line 2150): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 2194): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 2260): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 2357): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 2511): Array map without key prop - performance impact[0m
[33m
  src/app/expert-educators/page.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 781): Array map without key prop - performance impact[0m
[33m
  src/app/faq/page.tsx:[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m    [MISSING_KEY_PROP] (line 391): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 424): Array map without key prop - performance impact[0m
[33m
  src/app/homeschooling/page.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 460): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='text-slate-700'>{subject}</span>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 522): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='text-slate-700'>{subject}</span>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 584): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='text-slate-700'>{subject}</span>[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m    [MISSING_KEY_PROP] (line 332): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 648): Array map without key prop - performance impact[0m
[33m
  src/app/how-it-works/page.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 777): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span>{feature}</span>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 1061): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='transition-colors duration-300'>{benefit}</p>[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m    [MISSING_KEY_PROP] (line 770): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 1035): Array map without key prop - performance impact[0m
[33m
  src/app/layout.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 263): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <ClientProviders>{children}</ClientProviders>[0m
[33m
  src/app/legal/privacy-policy/page.tsx:[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m
  src/app/offline/page.tsx:[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m
  src/app/page.tsx:[0m
[33m    [MISSING_REACT_IMPORT]: Consider explicit React import for clarity in non-client components[0m
[33m
  src/app/services/layout.tsx:[0m
[33m    [MISSING_REACT_IMPORT]: Consider explicit React import for clarity in non-client components[0m
[33m
  src/app/services/page.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 474): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 626): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 675): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 780): Array map without key prop - performance impact[0m
[33m
  src/app/subject-tuition/page.tsx:[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m
  src/app/testimonials/Carousel_testimonial.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 296): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 333): Array map without key prop - performance impact[0m
[33m
  src/app/testimonials/page.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 276): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 376): Array map without key prop - performance impact[0m
[33m
  src/components/admin/AdminHeader.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 48): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <h1 className='text-2xl font-bold text-slate-900'>{title}</h1>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 49): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-slate-600 mt-1'>{subtitle}</p>[0m
[33m
  src/components/admin/SecurityMonitor.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 165): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 220): Array map without key prop - performance impact[0m
[33m
  src/components/admin/faq-admin-dashboard.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 607): Array map without key prop - performance impact[0m
[33m
  src/components/admin/faq-version-control-dashboard.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 321): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-sm text-gray-600 mt-1'>FAQ ID: {selectedFAQId}</p>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 482): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <h4 className='text-sm font-medium text-gray-600'>{title}</h4>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 483): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-2xl font-bold text-gray-900 mt-1'>{value}</p>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 484): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-sm text-gray-600 mt-1'>{subtitle}</p>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 485): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-xs text-green-600 font-medium mt-2'>{trend}</p>[0m
[33m    [MISSING_KEY_PROP] (line 204): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 331): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 442): Array map without key prop - performance impact[0m
[33m
  src/components/admin/faq-version-diff-viewer.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 192): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-gray-600 text-sm mt-1'>{error}</p>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 429): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <h4 className='text-sm font-medium text-gray-900 mb-2'>{title}</h4>[0m
[33m    [MISSING_KEY_PROP] (line 283): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 365): Array map without key prop - performance impact[0m
[33m
  src/components/admin/faq-version-workflow-manager.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 274): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 311): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 336): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 416): Array map without key prop - performance impact[0m
[33m
  src/components/analytics/faq-analytics-dashboard.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 527): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <div className='text-lg font-bold text-slate-900'>{count}</div>[0m
[33m    [MISSING_KEY_PROP] (line 563): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 606): Array map without key prop - performance impact[0m
[33m
  src/components/analytics/testimonials-executive-dashboard.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 101): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-sm font-medium text-muted-foreground'>{title}</p>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 102): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-2xl font-bold'>{value}</p>[0m
[33m    [MISSING_KEY_PROP] (line 274): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 304): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 337): Array map without key prop - performance impact[0m
[33m
  src/components/auth/ProtectedRoute.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 18): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      return <>{children}</>;[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 29): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      return <>{children}</>;[0m
[33m    [MISSING_REACT_IMPORT]: Consider explicit React import for clarity in non-client components[0m
[33m
  src/components/charts/analytics-charts-bundle.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 77): Array map without key prop - performance impact[0m
[33m
  src/components/charts/dashboard-charts-bundle.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 74): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 105): Array map without key prop - performance impact[0m
[33m
  src/components/charts/lazy-charts.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 238): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      () => Promise.resolve({ default: () => <>{children}</> }),[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 240): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      loading: () => <>{fallback}</>,[0m
[33m
  src/components/client/ScrollingLogos.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 44): Array map without key prop - performance impact[0m
[33m
  src/components/cms-architecture-dashboard.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 408): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      return <>{children}</>;[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m    [MISSING_KEY_PROP] (line 256): Array map without key prop - performance impact[0m
[33m
  src/components/dashboards/FAQSearchAnalyticsDashboard.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 117): Array map without key prop - performance impact[0m
[33m
  src/components/dashboards/client-success-metrics-dashboard.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 114): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='font-semibold text-slate-900 mb-2'>{label}</p>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 330): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-xs text-slate-500 mt-1'>{description}</p>[0m
[33m    [MISSING_KEY_PROP] (line 115): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 626): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 805): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 841): Array map without key prop - performance impact[0m
[33m
  src/components/dynamic/lazy-loaded-components.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 64): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 90): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 114): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 137): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 193): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 207): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 214): Array map without key prop - performance impact[0m
[33m
  src/components/education/CallOutsGrid.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 64): Array map without key prop - performance impact[0m
[33m
  src/components/education/EducationLevelTabContent-subject-tuition.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 80): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 98): Array map without key prop - performance impact[0m
[33m
  src/components/education/EducationLevelTabContent.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 74): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 92): Array map without key prop - performance impact[0m
[33m
  src/components/education/SubsectionCard-subject-tuition.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 44): Array map without key prop - performance impact[0m
[33m
  src/components/education/SubsectionCard.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 53): Array map without key prop - performance impact[0m
[33m
  src/components/education/feature-section.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 81): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <h2 className='text-pretty text-4xl font-medium lg:text-5xl'>{title}</h2>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 83): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='mt-6 text-lg text-muted-foreground'>{description}</p>[0m
[33m    [MISSING_KEY_PROP] (line 88): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 133): Array map without key prop - performance impact[0m
[33m
  src/components/education/stats-section.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 67): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <h2 className='text-2xl font-bold md:text-4xl'>{heading}</h2>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 68): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p>{description}</p>[0m
[33m    [MISSING_KEY_PROP] (line 79): Array map without key prop - performance impact[0m
[33m
  src/components/education/testimonial-card-subject-tuition.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 44): Array map without key prop - performance impact[0m
[33m
  src/components/education/testimonials-and-stats-grid.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 43): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 50): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 64): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 74): Array map without key prop - performance impact[0m
[33m
  src/components/error-boundary/FAQErrorBoundary.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 430): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <strong>Category:</strong> {category}[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 433): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <strong>Severity:</strong> {severity}[0m
[33m    [MISSING_KEY_PROP] (line 377): Array map without key prop - performance impact[0m
[33m
  src/components/faq/faq-advanced-search-filters.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 337): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='filter-count'>{activeFiltersCount}</span>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 348): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='search-query'> for "{searchQuery}"</span>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 588): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span>{tag}</span>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 615): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span>{tag}</span>[0m
[33m    [MISSING_KEY_PROP] (line 446): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 570): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 597): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 808): Array map without key prop - performance impact[0m
[33m
  src/components/faq/faq-category-section.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 795): Array map without key prop - performance impact[0m
[33m
  src/components/faq/faq-edge-search.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 192): Array map without key prop - performance impact[0m
[33m
  src/components/faq/faq-enhanced-search.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 674): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 880): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 938): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 1096): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 1206): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 1278): Array map without key prop - performance impact[0m
[33m
  src/components/faq/faq-error-fallback.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 232): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='text-sm'>{formattedError}</span>[0m
[33m    [MISSING_KEY_PROP] (line 292): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 403): Array map without key prop - performance impact[0m
[33m
  src/components/faq/faq-gamification-system.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 644): Array map without key prop - performance impact[0m
[33m
  src/components/faq/faq-recommendations.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 308): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <div className='text-slate-600 mb-4'>{error}</div>[0m
[33m    [MISSING_KEY_PROP] (line 159): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 282): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 347): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 364): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 408): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 472): Array map without key prop - performance impact[0m
[33m
  src/components/faq/faq-theme-switcher.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 278): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 437): Array map without key prop - performance impact[0m
[33m
  src/components/faq/faq-visual-search.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 577): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 633): Array map without key prop - performance impact[0m
[33m
  src/components/faq/faq-voice-search.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 816): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-slate-900 leading-relaxed'>{transcript}</p>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 926): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <div>Language: {selectedLanguage}</div>[0m
[33m    [MISSING_KEY_PROP] (line 616): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 696): Array map without key prop - performance impact[0m
[33m
  src/components/forms/newsletter-form.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 180): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-green-700 mt-1'>{resolvedSuccessMessage}</p>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 366): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-red-800 text-sm'>{errorMessage}</p>[0m
[33m
  src/components/forms/quote-request-form.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 506): Array map without key prop - performance impact[0m
[33m
  src/components/layout/footer-components/footer-gdpr-consent.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 130): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 227): Array map without key prop - performance impact[0m
[33m
  src/components/layout/footer-components/footer-navigation-hardcoded.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 68): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 107): Array map without key prop - performance impact[0m
[33m
  src/components/layout/footer-components/footer-navigation-sections.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 35): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 89): Array map without key prop - performance impact[0m
[33m
  src/components/layout/footer-components/footer-newsletter-form.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 197): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className='text-red-800 text-sm'>{errorMessage}</p>[0m
[33m
  src/components/layout/page-hero.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 192): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <div className='overflow-hidden'>{children}</div>[0m
[33m
  src/components/legal/CookieConsent.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 118): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <Button onClick={handleSavePreferences}>Save Preferences</Button>[0m
[33m
  src/components/magicui/interactive-hover-button.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 25): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span>{children}</span>[0m
[33m
  src/components/marketing/royal-testimonial-card.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 82): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='sr-only'>{rating} out of 5 stars</span>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 157): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <cite className={cn(authorNameClasses[variant])}>{author}</cite>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 158): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <p className={cn(authorRoleClasses[variant])}>{role}</p>[0m
[33m    [MISSING_KEY_PROP] (line 68): Array map without key prop - performance impact[0m
[33m
  src/components/navigation/Navigation.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 293): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 444): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 627): Array map without key prop - performance impact[0m
[33m
  src/components/performance/PerformanceDashboard.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 200): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <h4 className='font-semibold'>{name}</h4>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 251): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <div className='text-xs text-gray-600'>{type}</div>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 252): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <div className='text-lg font-semibold'>{count} files</div>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 273): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <strong>{name}</strong>:{' '}[0m
[33m    [MISSING_KEY_PROP] (line 195): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 228): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 247): Array map without key prop - performance impact[0m
[33m
  src/components/providers/LazyMotionProvider.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 9): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      return <LazyMotion features={domAnimation}>{children}</LazyMotion>;[0m
[33m
  src/components/sections/AboutSectionClient.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 127): Array map without key prop - performance impact[0m
[33m
  src/components/sections/about/FirstLessonSection.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 16): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      return <strong key={index}>{content}</strong>;[0m
[33m    [MISSING_KEY_PROP] (line 13): Array map without key prop - performance impact[0m
[33m
  src/components/sections/results-documentation.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 155): Array map without key prop - performance impact[0m
[33m
  src/components/sections/results-section.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 111): Array map without key prop - performance impact[0m
[33m
  src/components/sections/stats-trio.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 53): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      return <div>{children}</div>;[0m
[33m
  src/components/sections/subject-accordion.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 550): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='text-sm leading-relaxed'>{callOut}</span>[0m
[33m    [MISSING_KEY_PROP] (line 325): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 420): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 458): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 527): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 545): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 600): Array map without key prop - performance impact[0m
[33m
  src/components/sections/testimonials-section.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 167): Array map without key prop - performance impact[0m
[33m
  src/components/sections/testimonials-video-section.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 106): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 221): Array map without key prop - performance impact[0m
[33m
  src/components/sections/three-pillars-section.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 52): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 108): Array map without key prop - performance impact[0m
[33m
  src/components/testimonials/elite-schools-carousel.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 386): Array map without key prop - performance impact[0m
[33m
  src/components/testimonials/school-modal.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 355): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 368): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 397): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 414): Array map without key prop - performance impact[0m
[33m
  src/components/testimonials/testimonial-card.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 168): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 288): Array map without key prop - performance impact[0m
[33m
  src/components/testimonials/testimonial-modal.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 226): Array map without key prop - performance impact[0m
[33m
  src/components/testimonials/testimonials-filter.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 308): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 377): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 397): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 417): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 443): Array map without key prop - performance impact[0m
[33m
  src/components/testimonials/testimonials-grid.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 498): Array map without key prop - performance impact[0m
[33m
  src/components/tutors/tutor-profile.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 119): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <li key={index}>{qual}</li>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 159): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <li key={index}>{school}</li>[0m
[33m    [MISSING_KEY_PROP] (line 118): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 158): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 177): Array map without key prop - performance impact[0m
[33m
  src/components/tutors/tutors-grid.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 59): Array map without key prop - performance impact[0m
[33m
  src/components/ui/accordion.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 61): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <div className={cn("pt-0 pb-4", className)}>{children}</div>[0m
[33m
  src/components/ui/blockquote.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 177): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      {author && <cite className="pr-3 not-italic font-medium">{author}</cite>}[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 178): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      {role && <cite className="pl-3 not-italic opacity-80">{role}</cite>}[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 179): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      {cite && !author && <cite className="not-italic">{cite}</cite>}[0m
[33m
  src/components/ui/carousel.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 91): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 151): Array map without key prop - performance impact[0m
[33m
  src/components/ui/optimized-image.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 98): Array map without key prop - performance impact[0m
[33m
  src/components/ui/select.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 115): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>[0m
[33m
  src/components/ui/skeleton-card.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 62): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 101): Array map without key prop - performance impact[0m
[33m    [MISSING_KEY_PROP] (line 162): Array map without key prop - performance impact[0m
[33m
  src/components/ui/timeline.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 236): Array map without key prop - performance impact[0m
[33m
  src/components/ui/tooltip.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 362): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <div className='inline-block'>{children}</div>[0m
[33m
  src/components/video/VideoMasterclassSection.tsx:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 353): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='text-white text-sm font-medium'>{duration} minutes</span>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 405): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='text-[#D4AF37] text-sm'>{bulletPoint}</span>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 408): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <span className='text-[#D4AF37] text-sm'>{bulletPoint}</span>[0m
[33m    [MISSING_KEY_PROP] (line 398): Array map without key prop - performance impact[0m
[33m
  src/components/video/VideoMasterclassSectionImageFullWidthTextHalfWidth.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 272): Array map without key prop - performance impact[0m
[33m
  src/components/video/VideoMasterclassSectionTextFullWidth.tsx:[0m
[33m    [MISSING_KEY_PROP] (line 261): Array map without key prop - performance impact[0m
[33m
  src/hooks/use-debounce.ts:[0m
[33m    [HOOK_OUTSIDE_CLIENT_COMPONENT]: Hooks used outside client component - add "use client" directive[0m
[33m
  src/hooks/use-faq-version-control.ts:[0m
[33m    [HOOK_OUTSIDE_CLIENT_COMPONENT]: Hooks used outside client component - add "use client" directive[0m
[33m
  src/lib/analytics/client-success-analytics.ts:[0m
[33m    [HOOK_OUTSIDE_CLIENT_COMPONENT]: Hooks used outside client component - add "use client" directive[0m
[33m
  src/lib/cms/cms-architecture-validator.ts:[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m    [HOOK_OUTSIDE_CLIENT_COMPONENT]: Hooks used outside client component - add "use client" directive[0m
[33m
  src/lib/cms/cms-runtime-monitor.ts:[0m
[33m    [STATIC_CONTENT_WITH_STATE]: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33m
  src/lib/debug/eslint-react-rules.ts:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 67): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      'Change <Component children={elements} /> to <Component>{elements}</Component>',[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 105): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      pattern: '<div>{plainObject}</div>',[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 111): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      pattern: '<div>{promise}</div>',[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 117): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      pattern: '<div>{function}</div>',[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 120): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      example: '<div>{myFunction()}</div> or <MyComponent render={myFunction} />',[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 148): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      return <div>{children}</div>;[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 161): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      return <div>{children}</div>;[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 178): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      <Component>{(data) => <p>{data}</p>}</Component>[0m
[33m    [HOOK_OUTSIDE_CLIENT_COMPONENT]: Hooks used outside client component - add "use client" directive[0m
[33m
  src/lib/debug/react-error-logger.ts:[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 48): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      return <div>{myObject}</div>[0m
[33m    [POTENTIAL_INVALID_CHILDREN] (line 76): Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[0m      return <div>{data}</div>[0m
[33m    [HOOK_OUTSIDE_CLIENT_COMPONENT]: Hooks used outside client component - add "use client" directive[0m
[33m
  src/lib/faq-version-control/version-manager.ts:[0m
[33m    [MISSING_REACT_IMPORT]: Consider explicit React import for clarity in non-client components[0m
[33m
  src/lib/performance/crash-prevention.ts:[0m
[33m    [HOOK_OUTSIDE_CLIENT_COMPONENT]: Hooks used outside client component - add "use client" directive[0m
[33m
  src/lib/search/faq-search-engine.ts:[0m
[33m    [MISSING_REACT_IMPORT]: Consider explicit React import for clarity in non-client components[0m
[33m
  src/lib/search/use-faq-search.tsx:[0m
[33m    [CONDITIONAL_HOOK_CALL]: Hooks called conditionally - violates Rules of Hooks[0m
[33m
  src/lib/security/csrf.ts:[0m
[33m    [CONDITIONAL_HOOK_CALL]: Hooks called conditionally - violates Rules of Hooks[0m

============================================================
[1mTYPESCRIPT COMPILATION[0m
============================================================
[36mRunning TypeScript compilation check...[0m
[31m✗ TypeScript errors: 1, Warnings: 0[0m
[0m  Command failed: cd "/home/jack/Documents/my_private_tutor_online" && npm run typecheck 2>&1[0m

============================================================
[1mESLINT ANALYSIS[0m
============================================================
[36mRunning ESLint analysis...[0m
[31m✗ ESLint issues - Errors: 1, Warnings: 0[0m
[0m  Command failed: cd "/home/jack/Documents/my_private_tutor_online" && npm run lint 2>&1[0m

============================================================
[1mNEXT.JS BUILD ANALYSIS[0m
============================================================
[36mRunning Next.js build check (this may take a moment)...[0m
[32m✓ Build completed successfully[0m
[36m  Warnings: 0[0m
[36m  React-specific errors: 0[0m

============================================================
[1mBUNDLE SIZE ANALYSIS[0m
============================================================
[36mAnalysing bundle size...[0m
[36mTotal bundle size: 3.40 MB[0m
[33m
Largest files:[0m
[0m  css/8d010aa9adddb07f.css: 178.84 KB[0m
[0m  chunks/npm.next-ff30e0d3-81609c2b94e76ae1.js: 168.97 KB[0m
[0m  chunks/npm.react-dom-7d1510f043e98c27.js: 129.73 KB[0m
[0m  chunks/polyfills-42372ed130431b0a.js: 109.96 KB[0m
[0m  chunks/4374-dae1c72257136a31.js: 105.28 KB[0m
[0m  chunks/2890-91b1f99f016dffb8.js: 99.21 KB[0m
[0m  chunks/npm.framer-motion-d929e15b-4dd60372876c372d.js: 70.34 KB[0m
[0m  chunks/npm.next-2898f16f-0d4e6a86d183b014.js: 69.93 KB[0m
[0m  chunks/npm.radix-ui-bb8d3cea5b216e6b.js: 68.94 KB[0m
[0m  chunks/npm.recharts-5497cdea.6fb16c480a2da2b5.js: 67.34 KB[0m

============================================================
[1mSUMMARY[0m
============================================================
[33mTotal issues found: 275[0m
[31m  Errors: 24[0m
[33m  Warnings: 243[0m
[36m
Files scanned: 310[0m

============================================================
[1mRECOMMENDATIONS[0m
============================================================
[31mHIGH PRIORITY: Address React errors[0m
[31m  • STATIC_CONTENT_WITH_STATE: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[31m  • STATIC_CONTENT_WITH_STATE: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[31m  • STATIC_CONTENT_WITH_STATE: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[31m  • STATIC_CONTENT_WITH_STATE: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[31m  • STATIC_CONTENT_WITH_STATE: CMS or page file using useState/useEffect for potentially static content - verify data is truly dynamic[0m
[33mMedium priority: Address warnings for optimal performance[0m
[33m  • MISSING_KEY_PROP: Array map without key prop - performance impact[0m
[33m  • MISSING_KEY_PROP: Array map without key prop - performance impact[0m
[33m  • MISSING_KEY_PROP: Array map without key prop - performance impact[0m
[33m  • POTENTIAL_INVALID_CHILDREN: Potential invalid object as JSX child - verify object has no properties or use JSON.stringify[0m
[33m  • MISSING_KEY_PROP: Array map without key prop - performance impact[0m
[32m
Detailed report saved to: /home/jack/Documents/my_private_tutor_online/REACT_HEALTH_ANALYSIS_REPORT.json[0m
