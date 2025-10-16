// CONTEXT7 SOURCE: /websites/motion_dev - Framer Motion Jest testing mocking patterns
// TESTING REASON: Mock framer-motion to prevent ES module and animation issues in Jest tests
// CONTEXT7 SOURCE: /websites/motion_dev - React component mocking for motion components

const React = require('react');

// Mock the motion component factory
const createMotionComponent = (tagName) => {
	const MotionComponent = React.forwardRef((props, ref) => {
		const {
			children,
			initial,
			animate,
			exit,
			variants,
			transition,
			whileHover,
			whileTap,
			whileInView,
			onAnimationStart,
			onAnimationComplete,
			onHoverStart,
			onHoverEnd,
			onTap,
			style,
			className,
			...restProps
		} = props;

		// Merge any animation styles into the regular style prop for testing
		const combinedStyle = {
			...style,
			...(typeof animate === 'object' ? animate : {}),
			...(typeof initial === 'object' ? initial : {}),
		};

		return React.createElement(
			tagName,
			{
				ref,
				style: combinedStyle,
				className,
				'data-testid': `motion-${tagName}`,
				'data-framer-motion': 'true',
				...restProps,
			},
			children,
		);
	});

	MotionComponent.displayName = `Motion${tagName.charAt(0).toUpperCase()}${tagName.slice(1)}`;
	return MotionComponent;
};

// Create motion object with common HTML elements
const motion = {
	div: createMotionComponent('div'),
	section: createMotionComponent('section'),
	article: createMotionComponent('article'),
	header: createMotionComponent('header'),
	footer: createMotionComponent('footer'),
	main: createMotionComponent('main'),
	nav: createMotionComponent('nav'),
	aside: createMotionComponent('aside'),
	h1: createMotionComponent('h1'),
	h2: createMotionComponent('h2'),
	h3: createMotionComponent('h3'),
	h4: createMotionComponent('h4'),
	h5: createMotionComponent('h5'),
	h6: createMotionComponent('h6'),
	p: createMotionComponent('p'),
	span: createMotionComponent('span'),
	button: createMotionComponent('button'),
	a: createMotionComponent('a'),
	img: createMotionComponent('img'),
	ul: createMotionComponent('ul'),
	ol: createMotionComponent('ol'),
	li: createMotionComponent('li'),
	form: createMotionComponent('form'),
	input: createMotionComponent('input'),
	textarea: createMotionComponent('textarea'),
	svg: createMotionComponent('svg'),
	path: createMotionComponent('path'),
	circle: createMotionComponent('circle'),
	rect: createMotionComponent('rect'),
	g: createMotionComponent('g'),
};

// Mock AnimatePresence - just renders children
const AnimatePresence = ({
	children,
	mode,
	initial,
	onExitComplete,
	...props
}) => {
	return React.createElement(React.Fragment, null, children);
};

// Mock useAnimation hook
const useAnimation = () => ({
	start: jest.fn().mockResolvedValue(undefined),
	stop: jest.fn(),
	set: jest.fn(),
	mount: jest.fn(),
	unmount: jest.fn(),
});

// CONTEXT7 SOURCE: /websites/motion_dev - Motion value and transform utilities for testing
// Mock useMotionValue hook
const useMotionValue = (initialValue) => ({
	get: jest.fn(() => initialValue),
	set: jest.fn(),
	on: jest.fn(() => jest.fn()), // Returns unsubscribe function
	off: jest.fn(),
	clearListeners: jest.fn(),
	destroy: jest.fn(),
});

// Mock useTransform hook
const useTransform = (motionValue, inputRange, outputRange, options) => ({
	get: jest.fn(() => (outputRange ? outputRange[0] : 0)),
	set: jest.fn(),
	on: jest.fn(() => jest.fn()),
	off: jest.fn(),
});

// Mock useSpring hook
const useSpring = (value, config) => ({
	get: jest.fn(() => value),
	set: jest.fn(),
	on: jest.fn(() => jest.fn()),
	off: jest.fn(),
});

// Mock useScroll hook
const useScroll = (options) => ({
	scrollX: useMotionValue(0),
	scrollY: useMotionValue(0),
	scrollXProgress: useMotionValue(0),
	scrollYProgress: useMotionValue(0),
});

// Mock useInView hook
const useInView = (ref, options) => true;

// Mock useAnimate hook
const useAnimate = () => [
	{ current: null }, // scope ref
	jest.fn().mockResolvedValue(undefined), // animate function
];

// Mock useMotionValueEvent hook
const useMotionValueEvent = (motionValue, event, callback) => {
	// No-op in tests
};

// Mock animate function
const animate = jest.fn().mockResolvedValue(undefined);

// Mock frame utilities
const frame = {
	read: jest.fn((callback) => callback()),
	update: jest.fn((callback) => callback()),
	render: jest.fn((callback) => callback()),
	postRender: jest.fn((callback) => callback()),
	cancel: jest.fn(),
	data: jest.fn(),
};

// Mock LazyMotion components
const LazyMotion = ({ children, features, strict }) => {
	return React.createElement(React.Fragment, null, children);
};

// Mock domAnimation features
const domAnimation = {
	type: 'dom',
	features: [],
};

// Mock Reorder components for drag and drop
const Reorder = {
	Group: ({ children, values, onReorder, ...props }) => {
		return React.createElement(
			'div',
			{
				'data-testid': 'reorder-group',
				...props,
			},
			children,
		);
	},
	Item: ({ children, value, ...props }) => {
		return React.createElement(
			'div',
			{
				'data-testid': 'reorder-item',
				'data-value': value,
				...props,
			},
			children,
		);
	},
};

// Mock useDragControls hook
const useDragControls = () => ({
	start: jest.fn(),
	componentControls: new Set(),
});

module.exports = {
	motion,
	AnimatePresence,
	useAnimation,
	useMotionValue,
	useTransform,
	useSpring,
	useScroll,
	useInView,
	useAnimate,
	useMotionValueEvent,
	animate,
	frame,
	LazyMotion,
	domAnimation,
	Reorder,
	useDragControls,
	// Also export as named exports for compatibility
	default: motion,
};
