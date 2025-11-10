'use client';

import { ReactNode } from 'react';
import { HydrationProvider } from './HydrationProvider';
import { LazyMotionProvider } from './LazyMotionProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

interface ClientProvidersProps {
	children: ReactNode;
}

/**
 * Unified client-side provider wrapper for Next.js 15 + React 19 SSR compatibility
 *
 * This component ensures all React Context providers are properly initialised
 * on the client side, preventing useContext SSR errors. All providers must be
 * wrapped in a single 'use client' boundary to maintain proper hydration.
 *
 * Provider hierarchy:
 * 1. HydrationProvider - SSR/client hydration tracking (outermost for maximum safety)
 * 2. LazyMotionProvider - Framer Motion lazy loading
 * 3. TooltipProvider - Tooltip context for accessible tooltips
 * 4. Toaster - Toast notification system (sibling to children)
 *
 * **Hydration Safety**: HydrationProvider tracks client-side mounting state,
 * allowing components to conditionally render based on hydration status using
 * the `useHydration()` hook. This prevents SSR/client mismatches.
 */
export function ClientProviders({ children }: ClientProvidersProps) {
	return (
		<HydrationProvider>
			<LazyMotionProvider>
				<TooltipProvider>
					{children}
					<Toaster />
				</TooltipProvider>
			</LazyMotionProvider>
		</HydrationProvider>
	);
}
