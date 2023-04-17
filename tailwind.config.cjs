/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'white': '#FFF',
      'gray': {
        300: '#868E9B',
        400: '#484D56',
        500: '#2A2D34',
        600: '#1E2025',
        700: '#171A1E'

      },
      'primary': '#FFD953',
      'primaryDarker': '#BF9D22',
      'green': {
        400: '#0DAC86',
      },
      'red': {
        400: '#E35759',
      },
      'input-border': 'rgba(154, 154, 175, 0.2)',
      'select': '#2E2E3A',
      headerDark: '#17181e',
      sectionsBGDark: '#101014',
      darkSecondary: '#202124',
      
    },

    extend: {
      width: {
        82: '22.25rem' //right panel
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      zIndex: {
        '100': '100',
      },
      
    },
  },
  plugins: [require('@headlessui/tailwindcss')({ prefix: 'ui' })],
}
