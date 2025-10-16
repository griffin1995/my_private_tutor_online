// CONTEXT7 SOURCE: /jestjs/jest - Mock implementation for lucide-react icons in testing environment
// TESTING REASON: Prevent ES module import issues with icon libraries during Jest tests
// CONTEXT7 SOURCE: /jestjs/jest - React component mocking patterns for external libraries

const React = require('react');

// Create a mock factory function for Lucide icons
const createMockIcon = (iconName) => {
	const MockIcon = React.forwardRef((props, ref) => {
		return React.createElement('svg', {
			ref,
			'data-testid': `${iconName.toLowerCase()}-icon`,
			'aria-label': iconName,
			...props,
			className:
				`lucide lucide-${iconName.toLowerCase()} ${props.className || ''}`.trim(),
		});
	});

	MockIcon.displayName = iconName;
	return MockIcon;
};

// Mock all icons using a Proxy for dynamic icon support
const iconProxy = new Proxy(
	{},
	{
		get: function (target, prop) {
			if (typeof prop === 'string' && prop !== 'default') {
				return createMockIcon(prop);
			}
			return createMockIcon('DefaultIcon');
		},
	},
);

// Export all commonly used Lucide icons as mocks plus dynamic support
module.exports = {
	// Navigation icons
	Menu: createMockIcon('Menu'),
	X: createMockIcon('X'),
	ChevronDown: createMockIcon('ChevronDown'),
	ChevronUp: createMockIcon('ChevronUp'),
	ChevronLeft: createMockIcon('ChevronLeft'),
	ChevronRight: createMockIcon('ChevronRight'),
	ArrowRight: createMockIcon('ArrowRight'),
	ArrowLeft: createMockIcon('ArrowLeft'),

	// Premium/Royal icons
	Crown: createMockIcon('Crown'),
	Star: createMockIcon('Star'),
	Award: createMockIcon('Award'),
	Sparkles: createMockIcon('Sparkles'),

	// Communication icons
	Phone: createMockIcon('Phone'),
	Mail: createMockIcon('Mail'),
	MessageCircle: createMockIcon('MessageCircle'),
	Send: createMockIcon('Send'),

	// Academic icons
	BookOpen: createMockIcon('BookOpen'),
	GraduationCap: createMockIcon('GraduationCap'),
	Users: createMockIcon('Users'),
	User: createMockIcon('User'),
	Calendar: createMockIcon('Calendar'),
	Clock: createMockIcon('Clock'),

	// Interface icons
	Search: createMockIcon('Search'),
	Home: createMockIcon('Home'),
	Settings: createMockIcon('Settings'),
	Info: createMockIcon('Info'),
	Check: createMockIcon('Check'),
	Plus: createMockIcon('Plus'),
	Minus: createMockIcon('Minus'),

	// Media icons
	Play: createMockIcon('Play'),
	Pause: createMockIcon('Pause'),
	Video: createMockIcon('Video'),
	Image: createMockIcon('Image'),

	// Status icons
	CheckCircle: createMockIcon('CheckCircle'),
	AlertCircle: createMockIcon('AlertCircle'),
	XCircle: createMockIcon('XCircle'),

	// Social proof icons
	Quote: createMockIcon('Quote'),
	Heart: createMockIcon('Heart'),
	ThumbsUp: createMockIcon('ThumbsUp'),

	// Business icons
	TrendingUp: createMockIcon('TrendingUp'),
	BarChart: createMockIcon('BarChart'),
	Target: createMockIcon('Target'),

	// FAQ icons
	Globe: createMockIcon('Globe'),
	HelpCircle: createMockIcon('HelpCircle'),
	Banknote: createMockIcon('Banknote'),

	// Additional icons that might be used
	Trash: createMockIcon('Trash'),
	Edit: createMockIcon('Edit'),
	Save: createMockIcon('Save'),
	Download: createMockIcon('Download'),
	Upload: createMockIcon('Upload'),

	// Dynamic support via proxy
	...iconProxy,

	// Default export for dynamic imports
	default: createMockIcon('DefaultIcon'),
};
