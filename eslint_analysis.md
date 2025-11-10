
> my-tutor-website@0.1.0 lint
> next lint

`next lint` is deprecated and will be removed in Next.js 16.
For new projects, use create-next-app to choose your preferred linter.
For existing projects, migrate to the ESLint CLI:
npx @next/codemod@canary next-lint-to-eslint-cli .


./src/app/11-plus-bootcamps/page.tsx
232:35  Warning: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
256:74  Warning: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities

./src/app/admin/login/page.tsx
132:9  Warning: The autoFocus prop should not be used, as it can reduce usability and accessibility for users.  jsx-a11y/no-autofocus

./src/app/api/analytics/client-success/route.ts
174:31  Warning: '_request' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/api/analytics/events/route.ts
194:58  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
254:42  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
298:48  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
298:72  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
320:49  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
328:73  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
341:31  Warning: '_request' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/api/analytics/performance/route.ts
37:36  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
38:41  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
39:69  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
42:36  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
43:42  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
52:47  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
55:47  Warning: 'timeRange' is defined but never used.  @typescript-eslint/no-unused-vars
55:75  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
56:21  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
62:36  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
62:44  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
78:25  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
84:46  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
87:38  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
88:22  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
91:66  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
92:35  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
93:38  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
133:33  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
133:59  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
134:17  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
167:34  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
218:41  Warning: 'metadata' is assigned a value but never used.  @typescript-eslint/no-unused-vars
375:10  Warning: 'calculateSLACompliance' is defined but never used.  @typescript-eslint/no-unused-vars
375:52  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
375:58  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
393:10  Warning: 'identifyCriticalIssues' is defined but never used.  @typescript-eslint/no-unused-vars
393:52  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
393:58  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
394:24  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
398:24  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/app/api/analytics/testimonials/route.ts
12:27  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
42:40  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
51:40  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/app/api/errors/route.ts
18:37  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
281:27  Warning: '_request' is defined but never used.  @typescript-eslint/no-unused-vars
293:11  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/api/faq/errors/route.ts
11:28  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
34:29  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
35:20  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
183:9  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
216:9  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
248:9  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
276:9  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
352:33  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
355:44  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
358:50  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
361:49  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
364:47  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
367:53  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
376:9  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/app/api/faq/suggestions/[id]/vote/route.ts
3:11  Warning: 'VoteRequest' is defined but never used.  @typescript-eslint/no-unused-vars
61:34  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
350:31  Warning: '_request' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/api/faq/suggestions/route.ts
23:27  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
43:40  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
99:2  Warning: '_userHistory' is defined but never used.  @typescript-eslint/no-unused-vars
99:17  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
189:43  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/app/api/performance/alerts/route.ts
44:10  Warning: 'determineUserType' is defined but never used.  @typescript-eslint/no-unused-vars
46:11  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
53:10  Warning: 'extractPageType' is defined but never used.  @typescript-eslint/no-unused-vars
59:10  Warning: 'extractDeviceType' is defined but never used.  @typescript-eslint/no-unused-vars
126:10  Warning: 'alertLog' is assigned a value but never used.  @typescript-eslint/no-unused-vars
205:2  Warning: 'correlationId' is defined but never used.  @typescript-eslint/no-unused-vars
206:2  Warning: 'context' is defined but never used.  @typescript-eslint/no-unused-vars
206:11  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
239:10  Warning: 'emailPayload' is assigned a value but never used.  @typescript-eslint/no-unused-vars
387:9  Warning: 'logData' is assigned a value but never used.  @typescript-eslint/no-unused-vars
397:2  Warning: 'alert' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/api/performance/metrics/route.ts
338:31  Warning: '_request' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/contact/page.tsx
85:8  Warning: 'unifiedContact' is assigned a value but never used.  @typescript-eslint/no-unused-vars

./src/app/dashboard/page.tsx
20:60  Warning: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities

./src/app/dashboard/performance/page.tsx
44:57  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/app/exam-papers/page.tsx
2092:12  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
2150:50  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
2294:7  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element
2394:49  Warning: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/app/faq/[category]/[subcategory]/page.tsx
10:2  Warning: 'params' is defined but never used.  @typescript-eslint/no-unused-vars
20:2  Warning: 'params' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/faq/[category]/page.tsx
9:2  Warning: 'params' is defined but never used.  @typescript-eslint/no-unused-vars
18:49  Warning: 'params' is defined but never used.  @typescript-eslint/no-unused-vars

./src/app/faq/page.tsx
351:30  Warning: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`.  react/no-unescaped-entities
351:44  Warning: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`.  react/no-unescaped-entities
381:20  Warning: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
381:51  Warning: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`.  react/no-unescaped-entities
381:65  Warning: `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`.  react/no-unescaped-entities
451:5  Warning: The element section has an implicit role of region. Defining this explicitly is redundant and should be avoided.  jsx-a11y/no-redundant-roles
461:11  Warning: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities
461:33  Warning: `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`.  react/no-unescaped-entities

./src/app/how-it-works/page.tsx
