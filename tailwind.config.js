/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    extend: {
      colors: {
        airbnb: {
          DEFAULT: '#FF385C',
          hover: '#E31C5F',
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
