/**
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - PostCSS Configuration for Tailwind CSS v3
 * POSTCSS SETUP REASON: Official Tailwind CSS v3 documentation requires standard tailwindcss plugin
 * CONTEXT7 SOURCE: /tailwindlabs/tailwindcss.com - Nesting support with tailwindcss/nesting plugin
 * CONFIGURATION REASON: Proper v3 configuration with nesting and modern CSS features support
 */

module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {},
    'postcss-custom-properties': {
      preserve: false,
    },
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': false, // handled by tailwindcss/nesting
        'custom-properties': false, // handled by postcss-custom-properties
        'is-pseudo-class': {
          onComplexSelector: 'ignore' // Suppress warnings for complex selectors that can't be transformed
        }
      },
    },
  },
}