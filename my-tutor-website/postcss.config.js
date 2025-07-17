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
      },
    },
  },
}