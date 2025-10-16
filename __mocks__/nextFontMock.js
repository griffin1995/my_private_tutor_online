// CONTEXT7 SOURCE: /vercel/next.js - Next.js font mocking for Jest testing environment
// TESTING REASON: Mock Next.js font imports to prevent module resolution issues in tests
// CONTEXT7 SOURCE: /vercel/next.js - Font loading simulation for testing components

module.exports = new Proxy(
	{},
	{
		get: function getter() {
			return () => ({
				className: 'mocked-font-class',
				variable: '--mocked-font-variable',
				style: {
					fontFamily: 'MockedFont, sans-serif',
					fontWeight: 'normal',
					fontStyle: 'normal',
				},
			});
		},
	},
);
