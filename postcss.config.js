/**
 * Documentation Source: PostCSS + Tailwind CSS v4 Official Configuration
 * Reference: https://tailwindcss.com/docs/using-with-preprocessors#using-post-css-as-your-preprocessor
 * Reference: https://github.com/csstools/postcss-preset-env#options
 * Reference: https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-is-pseudo-class
 * 
 * Pattern: Optimised PostCSS Configuration for Tailwind CSS v4
 * Architecture:
 * - @tailwindcss/postcss for Tailwind v4 processing
 * - postcss-preset-env for modern CSS features with browser compatibility
 * - Suppressed warnings for complex :is() selectors (non-breaking)
 * 
 * Complex Selector Warnings:
 * - These occur when :is() pseudo-class cannot be transformed for older browsers
 * - Warnings are suppressed as they don't affect functionality in modern browsers
 * - Target audience uses contemporary browsers supporting :is() natively
 * 
 * Browser Support Strategy:
 * - Modern browsers: Full :is() support with enhanced functionality
 * - Legacy browsers: Graceful degradation (selectors ignored, core functionality intact)
 */

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    'autoprefixer': {},
    'postcss-nesting': {},
    'postcss-custom-properties': {
      preserve: false,
    },
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': false, // handled by postcss-nesting
        'custom-properties': false, // handled by postcss-custom-properties
        'is-pseudo-class': {
          onComplexSelector: 'ignore' // Suppress warnings for complex selectors that can't be transformed
        }
      },
    },
  },
}