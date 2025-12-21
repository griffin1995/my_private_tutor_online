'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client-core';
import { createSyncStoragePersister } from '@tanstack/query-persist-client-core';

// Create a persister using localStorage
const persister = createSyncStoragePersister({
	storage: typeof window !== 'undefined' ? window.localStorage : null,
	key: 'my-private-tutor-query-cache',
	serialize: JSON.stringify,
	deserialize: JSON.parse,
});

// Create QueryClient with offline-first configuration
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Cache for 24 hours
			gcTime: 1000 * 60 * 60 * 24,
			// Stale after 5 minutes
			staleTime: 1000 * 60 * 5,
			// Retry failed requests
			retry: 3,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
			// Enable background refetching
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			// Network mode for offline support
			networkMode: 'offlineFirst',
		},
		mutations: {
			// Retry mutations on failure
			retry: 1,
			// Network mode for offline support
			networkMode: 'offlineFirst',
		},
	},
});

// Set default mutation functions for offline support
queryClient.setMutationDefaults(['faq-rating'], {
	mutationFn: async (data: { questionId: string; rating: number }) => {
		const response = await fetch('/api/faq/rating', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error('Failed to submit rating');
		}
		return response.json();
	},
});

queryClient.setMutationDefaults(['faq-feedback'], {
	mutationFn: async (data: { questionId: string; feedback: string; email?: string }) => {
		const response = await fetch('/api/faq/feedback', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error('Failed to submit feedback');
		}
		return response.json();
	},
});

interface QueryProviderProps {
	children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
	// Use persisted QueryClient provider for offline support
	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
			onSuccess={() => {
				// Resume paused mutations after restoration
				queryClient.resumePausedMutations().then(() => {
					queryClient.invalidateQueries();
				});
			}}
		>
			{children}
		</PersistQueryClientProvider>
	);
}

// Export queryClient for use in other parts of the app
export { queryClient };