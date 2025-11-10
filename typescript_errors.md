src/app/_components/web-vitals.tsx(75,9): error TS2375: Type '{ name: MetricName; value: any; rating: "good" | "needs-improvement" | "poor" | undefined; timestamp: number; }' is not assignable to type 'WebVitalMetric' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'rating' are incompatible.
    Type '"good" | "needs-improvement" | "poor" | undefined' is not assignable to type '"good" | "needs-improvement" | "poor"'.
      Type 'undefined' is not assignable to type '"good" | "needs-improvement" | "poor"'.
src/app/_components/web-vitals.tsx(103,12): error TS7030: Not all code paths return a value.
src/app/_components/web-vitals.tsx(139,4): error TS2353: Object literal may only specify known properties, and 'timestamp' does not exist in type 'Phase1Metrics'.
src/app/admin/page.tsx(110,4): error TS2786: 'ProtectedRoute' cannot be used as a JSX component.
  Its type '({ children, fallback, }: ProtectedRouteProps) => Promise<string | number | bigint | boolean | Iterable<ReactNode> | Element | null | undefined>' is not a valid JSX element type.
    Type '({ children, fallback, }: ProtectedRouteProps) => Promise<string | number | bigint | boolean | Iterable<ReactNode> | Element | null | undefined>' is not assignable to type '(props: any, deprecatedLegacyContext?: any) => ReactNode'.
      Type 'Promise<string | number | bigint | boolean | Iterable<ReactNode> | Element | null | undefined>' is not assignable to type 'ReactNode'.
        Type 'Promise<string | number | bigint | boolean | Iterable<ReactNode> | Element | null | undefined>' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<...>'.
          Type 'Promise<string | number | bigint | boolean | Iterable<ReactNode> | Element | null | undefined>' is not assignable to type 'Promise<AwaitedReactNode>'.
            Type 'string | number | bigint | boolean | Iterable<ReactNode> | Element | null | undefined' is not assignable to type 'AwaitedReactNode'.
              Type 'bigint' is not assignable to type 'AwaitedReactNode'.
src/app/api/analytics/client-success/route.ts(44,28): error TS2345: Argument of type 'string | { insights: ClientSuccessInsights; realTimeMetrics: {}; exportMetadata: { timestamp: string; format: "json" | "csv"; version: string; }; }' is not assignable to parameter of type 'BodyInit | null | undefined'.
  Type '{ insights: ClientSuccessInsights; realTimeMetrics: {}; exportMetadata: { timestamp: string; format: "json" | "csv"; version: string; }; }' is not assignable to type 'BodyInit | null | undefined'.
src/app/api/analytics/events/route.ts(69,4): error TS2532: Object is possibly 'undefined'.
src/app/api/analytics/events/route.ts(179,13): error TS2339: Property 'sessionId' does not exist on type '{ timeRange: string; metric: string; conversions: { inquiries: { count: number; rate: number; trend: string; }; bootcamp_registrations: { count: number; rate: number; trend: string; }; phone_calls: { count: number; rate: number; trend: string; }; }; engagement: { ...; }; topPages: { ...; }[]; performance: { ...; }; ...'.
src/app/api/analytics/performance/route.ts(55,47): error TS6133: 'timeRange' is declared but its value is never read.
src/app/api/analytics/performance/route.ts(101,12): error TS18046: 'metricList' is of type 'unknown'.
src/app/api/analytics/performance/route.ts(103,22): error TS18046: 'metricList' is of type 'unknown'.
src/app/api/analytics/performance/route.ts(103,38): error TS7006: Parameter 'm' implicitly has an 'any' type.
src/app/api/analytics/performance/route.ts(104,22): error TS18046: 'metricList' is of type 'unknown'.
src/app/api/analytics/performance/route.ts(104,38): error TS7006: Parameter 'm' implicitly has an 'any' type.
src/app/api/analytics/performance/route.ts(106,6): error TS18046: 'metricList' is of type 'unknown'.
src/app/api/analytics/performance/route.ts(106,22): error TS7006: Parameter 'm' implicitly has an 'any' type.
src/app/api/analytics/performance/route.ts(109,26): error TS4111: Property 'good' comes from an index signature, so it must be accessed with ['good'].
src/app/api/analytics/performance/route.ts(109,39): error TS18046: 'metricList' is of type 'unknown'.
src/app/api/analytics/performance/route.ts(110,26): error TS4111: Property 'poor' comes from an index signature, so it must be accessed with ['poor'].
src/app/api/analytics/performance/route.ts(110,39): error TS18046: 'metricList' is of type 'unknown'.
src/app/api/analytics/performance/route.ts(218,41): error TS6133: 'metadata' is declared but its value is never read.
src/app/api/analytics/performance/route.ts(325,24): error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.
src/app/api/analytics/performance/route.ts(326,25): error TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.
src/app/api/analytics/performance/route.ts(375,10): error TS6133: 'calculateSLACompliance' is declared but its value is never read.
src/app/api/analytics/performance/route.ts(393,10): error TS6133: 'identifyCriticalIssues' is declared but its value is never read.
src/app/api/analytics/testimonials/route.ts(62,10): error TS6133: 'lastProcessed' is declared but its value is never read.
src/app/api/analytics/testimonials/route.ts(212,33): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyHeaders>'.
src/app/api/analytics/testimonials/route.ts(213,36): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyHeaders>'.
src/app/api/contact/route.ts(74,36): error TS2345: Argument of type '{ email: string; name: string; subject: string; message: string; phone?: string | undefined; preferredContact?: "email" | "phone" | undefined; studentDetails?: { subjects?: string[] | undefined; age?: number | undefined; currentLevel?: string | undefined; examBoard?: string | undefined; } | undefined; urgency?: "imm...' is not assignable to parameter of type '{ email: string; name: string; subject: string; message: string; phone?: string | undefined; preferredContact?: "email" | "phone" | undefined; studentDetails?: { subjects?: string[] | undefined; age?: number | undefined; currentLevel?: string | undefined; examBoard?: string | undefined; } | undefined; urgency?: "imm...'.
  Type 'undefined' is not assignable to type '{ email: string; name: string; subject: string; message: string; phone?: string | undefined; preferredContact?: "email" | "phone" | undefined; studentDetails?: { subjects?: string[] | undefined; age?: number | undefined; currentLevel?: string | undefined; examBoard?: string | undefined; } | undefined; urgency?: "imm...'.
src/app/api/faq/errors/route.ts(155,3): error TS2322: Type 'NextResponse<{ success: true; errorId: string | undefined; processingTime: number; actions: { alertsSent: number; ticketsCreated: number; escalations: number; } | undefined; recommendations: string[] | undefined; }>' is not assignable to type 'NextResponse<ErrorReportResponse>'.
  Type '{ success: true; errorId: string | undefined; processingTime: number; actions: { alertsSent: number; ticketsCreated: number; escalations: number; } | undefined; recommendations: string[] | undefined; }' is not assignable to type 'ErrorReportResponse' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
    Types of property 'errorId' are incompatible.
      Type 'string | undefined' is not assignable to type 'string'.
        Type 'undefined' is not assignable to type 'string'.
src/app/api/faq/errors/route.ts(283,4): error TS18048: 'report.metrics.errorsByCategory.search' is possibly 'undefined'.
src/app/api/faq/errors/route.ts(283,36): error TS4111: Property 'search' comes from an index signature, so it must be accessed with ['search'].
src/app/api/faq/suggestions/[id]/vote/route.ts(3,11): error TS6196: 'VoteRequest' is declared but never used.
src/app/api/faq/suggestions/[id]/vote/route.ts(69,2): error TS6133: 'suggestionId' is declared but its value is never read.
src/app/api/faq/suggestions/[id]/vote/route.ts(70,2): error TS6133: 'userId' is declared but its value is never read.
src/app/api/faq/suggestions/[id]/vote/route.ts(136,30): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyHeaders>'.
src/app/api/faq/suggestions/[id]/vote/route.ts(137,33): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyHeaders>'.
src/app/api/faq/suggestions/[id]/vote/route.ts(175,8): error TS18048: 'existingVote' is possibly 'undefined'.
src/app/api/faq/suggestions/[id]/vote/route.ts(179,5): error TS2375: Type '{ voteType: any; updatedAt: string; id?: string; suggestionId?: string; userId?: string; ipAddress?: string; userAgent?: string; createdAt?: string; }' is not assignable to type 'VoteRecord' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Property 'id' is optional in type '{ voteType: any; updatedAt: string; id?: string; suggestionId?: string; userId?: string; ipAddress?: string; userAgent?: string; createdAt?: string; }' but required in type 'VoteRecord'.
src/app/api/faq/suggestions/[id]/vote/route.ts(205,4): error TS2532: Object is possibly 'undefined'.
src/app/api/faq/suggestions/[id]/vote/route.ts(255,30): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyHeaders>'.
src/app/api/faq/suggestions/[id]/vote/route.ts(299,30): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyHeaders>'.
src/app/api/faq/suggestions/[id]/vote/route.ts(321,4): error TS2532: Object is possibly 'undefined'.
src/app/api/faq/suggestions/route.ts(186,9): error TS2375: Type '{ category: string | undefined; status: string | undefined; sortBy: any; showAnonymous: boolean; page: number; limit: number; }' is not assignable to type 'SuggestionFilters' with 'exactOptionalPropertyTypes: true'. Consider adding 'undefined' to the types of the target's properties.
  Types of property 'category' are incompatible.
    Type 'string | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
src/app/api/faq/suggestions/route.ts(241,30): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyHeaders>'.
src/app/api/faq/suggestions/route.ts(242,33): error TS2339: Property 'get' does not exist on type 'Promise<ReadonlyHeaders>'.
src/app/api/performance/alerts/route.ts(44,10): error TS6133: 'determineUserType' is declared but its value is never read.
src/app/api/performance/alerts/route.ts(53,10): error TS6133: 'extractPageType' is declared but its value is never read.
src/app/api/performance/alerts/route.ts(59,10): error TS6133: 'extractDeviceType' is declared but its value is never read.
src/app/api/performance/alerts/route.ts(89,4): error TS2532: Object is possibly 'undefined'.
src/app/api/performance/alerts/route.ts(126,10): error TS6133: 'alertLog' is declared but its value is never read.
src/app/api/performance/alerts/route.ts(205,2): error TS6133: 'correlationId' is declared but its value is never read.
src/app/api/performance/alerts/route.ts(206,2): error TS6133: 'context' is declared but its value is never read.
src/app/api/performance/alerts/route.ts(239,10): error TS6133: 'emailPayload' is declared but its value is never read.
src/app/api/performance/alerts/route.ts(387,9): error TS6133: 'logData' is declared but its value is never read.
src/app/api/performance/alerts/route.ts(397,2): error TS6133: 'alert' is declared but its value is never read.
src/app/api/performance/alerts/route.ts(451,2): error TS6133: 'timeRange' is declared but its value is never read.
src/app/api/performance/metrics/route.ts(101,14): error TS2532: Object is possibly 'undefined'.
src/app/api/performance/metrics/route.ts(279,22): error TS4111: Property 'violations' comes from an index signature, so it must be accessed with ['violations'].
src/app/api/performance/metrics/route.ts(284,24): error TS4111: Property 'type' comes from an index signature, so it must be accessed with ['type'].
src/app/blog/page.tsx(341,5): error TS2322: Type '"default"' is not assignable to type '"full" | "sm" | "lg" | "md" | "xl" | "2xl"'.
src/app/contact/page.tsx(85,8): error TS6133: 'unifiedContact' is declared but its value is never read.
src/app/dashboard/page.tsx(9,4): error TS2322: Type '"slate"' is not assignable to type '"dark" | "gradient" | "white" | "transparent" | "pattern"'.
src/app/exam-papers/page.tsx(2408,24): error TS2345: Argument of type '{ id: string; name: string; count: number; subcategories: { id: string; name: string; count: number; }[]; }[]' is not assignable to parameter of type '{ id: string; name: string; count: number; subcategories: { id: string; name: string; count: number; subcategories: { id: string; name: string; count: number; }[]; }[]; }[]'.
  Type '{ id: string; name: string; count: number; subcategories: { id: string; name: string; count: number; }[]; }' is not assignable to type '{ id: string; name: string; count: number; subcategories: { id: string; name: string; count: number; subcategories: { id: string; name: string; count: number; }[]; }[]; }'.
    Types of property 'subcategories' are incompatible.
      Type '{ id: string; name: string; count: number; }[]' is not assignable to type '{ id: string; name: string; count: number; subcategories: { id: string; name: string; count: number; }[]; }[]'.
        Property 'subcategories' is missing in type '{ id: string; name: string; count: number; }' but required in type '{ id: string; name: string; count: number; subcategories: { id: string; name: string; count: number; }[]; }'.
src/app/expert-educators/page.tsx(93,6): error TS2322: Type '"br"' is not assignable to type '"top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "radial" | "conic"'.
src/app/expert-educators/page.tsx(212,6): error TS2322: Type '"light"' is not assignable to type '"subtle" | "double" | "dramatic" | "organic"'.
src/app/expert-educators/page.tsx(334,20): error TS2322: Type '"primary"' is not assignable to type '"subtle" | "double" | "dramatic" | "organic"'.
src/app/faq/[category]/[subcategory]/page.tsx(9,40): error TS6133: 'params' is declared but its value is never read.
src/app/faq/[category]/[subcategory]/page.tsx(19,50): error TS6133: 'params' is declared but its value is never read.
src/app/faq/[category]/page.tsx(8,40): error TS6133: 'params' is declared but its value is never read.
src/app/faq/[category]/page.tsx(18,47): error TS6133: 'params' is declared but its value is never read.
src/app/faq/page.tsx(3,8): error TS6133: 'React' is declared but its value is never read.
src/app/homeschooling/page.tsx(3,8): error TS6133: 'React' is declared but its value is never read.
src/app/homeschooling/page.tsx(177,7): error TS2322: Type '"br"' is not assignable to type '"top" | "right" | "bottom" | "left" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "radial" | "conic"'.
src/app/homeschooling/page.tsx(287,6): error TS2322: Type '"light"' is not assignable to type '"subtle" | "double" | "dramatic" | "organic"'.
src/app/how-it-works/page.tsx(679,10): error TS2741: Property 'cite' is missing in type '{ children: (string | Element)[]; showCite: true; author: string; role: "Founder"; size: "lg"; }' but required in type 'Omit<BlockquoteProps<true>, "variant" | "showQuoteIcon">'.
src/app/how-it-works/page.tsx(761,21): error TS2322: Type 'string | null' is not assignable to type 'string | undefined'.
