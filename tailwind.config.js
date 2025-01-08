/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{ts,tsx}'],
  important: '#root',
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
