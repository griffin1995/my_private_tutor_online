'use client';

import { MotionValue, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MotionValueRendererProps {
	motionValue: MotionValue<number>;
	formatter?: (value: number) => string | number;
	fallback?: string | number;
}

/**
 * Safe renderer for Framer Motion values that prevents
 * "Objects are not valid as a React child" errors
 *
 * Instead of using {motionValue.get()} directly in JSX,
 * use this component to safely render motion values.
 */
export function MotionValueRenderer({
	motionValue,
	formatter = (value) => value,
	fallback = 0
}: MotionValueRendererProps) {
	const [value, setValue] = useState<number>(() => {
		try {
			return motionValue.get();
		} catch {
			return typeof fallback === 'number' ? fallback : 0;
		}
	});

	useMotionValueEvent(motionValue, 'change', (latest) => {
		setValue(latest);
	});

	// Additional safety check
	useEffect(() => {
		const unsubscribe = motionValue.on('change', setValue);
		return unsubscribe;
	}, [motionValue]);

	try {
		const formattedValue = formatter(value);

		// Ensure we're not rendering an object
		if (typeof formattedValue === 'object' && formattedValue !== null) {
			console.warn('MotionValueRenderer: formatter returned an object, converting to string');
			return <>{JSON.stringify(formattedValue)}</>;
		}

		return <>{formattedValue}</>;
	} catch (error) {
		console.error('MotionValueRenderer error:', error);
		return <>{fallback}</>;
	}
}

/**
 * Hook to safely use motion values in React components
 * Returns the current value as a state that updates with motion value changes
 */
export function useMotionValueState<T>(motionValue: MotionValue<T>, fallback?: T): T {
	const [value, setValue] = useState<T>(() => {
		try {
			return motionValue.get();
		} catch {
			return fallback as T;
		}
	});

	useMotionValueEvent(motionValue, 'change', (latest) => {
		setValue(latest);
	});

	return value;
}