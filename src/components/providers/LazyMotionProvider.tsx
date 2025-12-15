'use client';

import { type ReactNode } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
interface LazyMotionProviderProps {
	children: ReactNode;
}
export function LazyMotionProvider({ children }: LazyMotionProviderProps) {
	return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
