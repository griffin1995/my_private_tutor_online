'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

/**
 * Hydration Context for tracking client-side mounting state
 *
 * Provides hydration-safe state to prevent SSR/client mismatches in Next.js 15 + React 19.
 * This context tracks when the client has successfully hydrated, allowing components to
 * conditionally render based on hydration status.
 *
 * @context HydrationContext - Boolean indicating if client has hydrated
 */
const HydrationContext = createContext<boolean>(false);

interface HydrationProviderProps {
	children: ReactNode;
}

/**
 * HydrationProvider - SSR-safe hydration tracking
 *
 * Implements React 19 best practices for preventing hydration mismatches by tracking
 * client-side mounting state. Components can use `useHydration()` to check if the
 * application has fully hydrated before rendering client-only content.
 *
 * **Pattern**: Server renders with `isHydrated = false`, then client sets to `true`
 * after first effect runs, ensuring consistent SSR/client output during hydration.
 *
 * **Usage**:
 * ```tsx
 * const isHydrated = useHydration();
 * if (!isHydrated) return <LoadingFallback />;
 * return <ClientOnlyContent />;
 * ```
 *
 * @component
 * @param {ReactNode} children - Child components that need hydration tracking
 */
export function HydrationProvider({ children }: HydrationProviderProps) {
	const [isHydrated, setIsHydrated] = useState(false);

	// Set hydrated state after client-side mount
	// This ensures SSR and initial client render match (both false)
	// Then client updates to true after hydration completes
	useEffect(() => {
		setIsHydrated(true);
	}, []);

	return (
		<HydrationContext.Provider value={isHydrated}>
			{children}
		</HydrationContext.Provider>
	);
}

/**
 * useHydration hook - Check client-side hydration status
 *
 * Returns `true` when the application has successfully hydrated on the client,
 * `false` during SSR and initial client render. Use this to conditionally render
 * client-only features that could cause hydration mismatches.
 *
 * **Best Practices**:
 * - Use for client-only features (localStorage, window, document access)
 * - Provide SSR-compatible fallbacks for better initial render
 * - Avoid flash of content by using appropriate loading states
 *
 * **Example**:
 * ```tsx
 * function ClientFeature() {
 *   const isHydrated = useHydration();
 *
 *   if (!isHydrated) {
 *     return <div>Loading...</div>; // Matches SSR output
 *   }
 *
 *   return <div>{window.localStorage.getItem('theme')}</div>;
 * }
 * ```
 *
 * @returns {boolean} True if client has hydrated, false during SSR/initial render
 */
export function useHydration(): boolean {
	const context = useContext(HydrationContext);

	// During Next.js static generation, context might be null
	// Return false as safe fallback for SSR/static generation
	return context ?? false;
}
