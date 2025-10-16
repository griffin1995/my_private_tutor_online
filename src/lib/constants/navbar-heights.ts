export const NAVBAR_HEIGHTS = {
	mobile: '5.5rem',
	tablet: '6.25rem',
	desktop: '7rem',
} as const;
export type NavbarHeightKey = keyof typeof NAVBAR_HEIGHTS;
export type ViewportCalcExpression = `h-[calc(100${ViewportUnit}-${string})]`;
export const calculateRemainingViewport = (): string => {
	return [
		`h-[calc(100vh-${NAVBAR_HEIGHTS.mobile})]`,
		`lg:h-[calc(100vh-${NAVBAR_HEIGHTS.tablet})]`,
		`xl:h-[calc(100vh-${NAVBAR_HEIGHTS.desktop})]`,
		`h-[calc(100dvh-${NAVBAR_HEIGHTS.mobile})]`,
		`lg:h-[calc(100dvh-${NAVBAR_HEIGHTS.tablet})]`,
		`xl:h-[calc(100dvh-${NAVBAR_HEIGHTS.desktop})]`,
	].join(' ');
};
export const getNavbarClearance = (): string => {
	return `mt-[${NAVBAR_HEIGHTS.mobile}] lg:mt-[${NAVBAR_HEIGHTS.tablet}] xl:mt-[${NAVBAR_HEIGHTS.desktop}]`;
};
export const getFullSectionClasses = (): string => {
	return `w-full ${calculateRemainingViewport()} ${getNavbarClearance()} flex flex-col overflow-hidden`;
};
export const getNavbarSpacerHeight = (): string => {
	return `h-[${NAVBAR_HEIGHTS.mobile}] lg:h-[${NAVBAR_HEIGHTS.tablet}] xl:h-[${NAVBAR_HEIGHTS.desktop}]`;
};
export const getHeroSectionClasses = (): string => {
	return `w-full ${calculateRemainingViewport()} flex flex-col overflow-hidden`;
};
export const getNavbarHeight = (key: NavbarHeightKey): string => {
	return NAVBAR_HEIGHTS[key];
};
export const getNavbarHeightEntries = (): Array<[NavbarHeightKey, string]> => {
	return Object.entries(NAVBAR_HEIGHTS) as Array<[NavbarHeightKey, string]>;
};
export type ViewportUnit = 'vh' | 'dvh' | 'lvh' | 'svh';
export const calculateRemainingViewportWithUnit = (
	unit: ViewportUnit = 'dvh',
	includeFallback: boolean = true,
): string => {
	const baseClasses = [
		`h-[calc(100${unit}-${NAVBAR_HEIGHTS.mobile})]`,
		`lg:h-[calc(100${unit}-${NAVBAR_HEIGHTS.tablet})]`,
		`xl:h-[calc(100${unit}-${NAVBAR_HEIGHTS.desktop})]`,
	];
	if (includeFallback && (unit === 'dvh' || unit === 'lvh' || unit === 'svh')) {
		const fallbackClasses = [
			`h-[calc(100vh-${NAVBAR_HEIGHTS.mobile})]`,
			`lg:h-[calc(100vh-${NAVBAR_HEIGHTS.tablet})]`,
			`xl:h-[calc(100vh-${NAVBAR_HEIGHTS.desktop})]`,
		];
		return [...fallbackClasses, ...baseClasses].join(' ');
	}
	return baseClasses.join(' ');
};
export const supportsDynamicViewport = (): boolean => {
	if (typeof window === 'undefined' || typeof document === 'undefined') {
		return false;
	}
	try {
		return CSS.supports('height', '100dvh');
	} catch (error) {
		return false;
	}
};
export const calculateAdaptiveViewport = (): string => {
	const useDvh = supportsDynamicViewport();
	return useDvh ?
			calculateRemainingViewportWithUnit('dvh', true)
		:	calculateRemainingViewportWithUnit('vh', false);
};
