/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'white': '#FFF',
      'black': '#000',
      'gray': {
        200: '#42474E',
        300: '#868E9B',
        400: '#484D56',
        500: '#2A2D34',
        600: '#1E2025',
        700: '#171A1E'

      },
      'primary': '#FFD953',
      'primaryDarker': '#BF9D22',
      'blue': '#3659D2',
      'green': {
        400: '#0DAC86',
        500: '#143f38'
      },
      'red': {
        400: '#E35759',
        500: '#4a292d'
      },
      'modal-bg': 'rgba(0, 0, 0, 0.4)',
      'chips-bg': 'rgba(255, 255, 255, 0.1)'
      
    },

    extend: {
      minWidth: {
        82: '22.25rem'
      },
      width: {
        82: '22.25rem', //right panel
        100: '31.25rem' //500px
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      zIndex: {
        '100': '100',
      },
      blur:{
        'xs': '1.5px'
      }
      
    },
  },
  plugins: [require('@headlessui/tailwindcss')({ prefix: 'ui' })],
}
