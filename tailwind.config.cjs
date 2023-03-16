/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'white': '#FFF',
      'darkBg': "#282c35",
      'gray': {
        100: '#FAFAFC', //header, sidebar
        300: '#f8f8fa', //main
        400: '#f2f3f7', //right panel
      },

      text: {
        'gray': '#AEAEBE',
        'purple': '#9A9AAF',
        'DEFAULT': '#2E2E3A',
      },
      'primary': '#2e979a',
      'primary-light': '#329496',
      'primary-dark': '#1c5547',
      'green': '#20b26c',
      'greenDarker' : '#197148',
      'green': {
        300: '#197148',
        400: '#1d9b5f',
        500: '#20b26c'
      },
      'red': {
        300: '#952f34',
        400: '#d33e42',
        500: '#ef454a',
      },
      'input-border': 'rgba(154, 154, 175, 0.2)',
      'select': '#2E2E3A',
      headerDark: '#17181e',
      sectionsBGDark: '#101014',
      darkSecondary: '#202124',
      
    },

    extend: {
      boxShadow: {
        'header':
          '0px 12px 10px rgba(174, 174, 190, 0.035), 0px 42px 33px rgba(174, 174, 190, 0.05)',
        'dark': '0px 3px 2px rgba(174, 174, 190, 0.02), 0px 6.5px 5.5px rgba(174, 174, 190, 0.03), 0px 12px 10px rgba(174, 174, 190, 0.035), 0px 22px 18px rgba(174, 174, 190, 0.04), 0px 42px 33px rgba(174, 174, 190, 0.05), 0px 100px 80px rgba(174, 174, 190, 0.07)',
        'blue': '0px 1px 2px rgba(0, 98, 255, 0.06), 0px 2px 4px rgba(0, 98, 255, 0.08), 0px 3px 7px rgba(0, 98, 255, 0.1), 0px 6px 12px rgba(0, 98, 255, 0.12), 0px 10px 24px rgba(0, 98, 255, 0.15)',
        'table-white':
          '0px 3px 2px rgba(174, 174, 190, 0.02), 0px 6.5px 5.5px rgba(174, 174, 190, 0.03), 0px 12px 10px rgba(174, 174, 190, 0.035)',
        'drawer':
          '0px 3px 2px rgba(46, 46, 58, 0.02), 0px 6.5px 5.5px rgba(46, 46, 58, 0.03), 0px 12px 10px rgba(46, 46, 58, 0.035), 0px 22px 18px rgba(46, 46, 58, 0.04), 0px 42px 33px rgba(46, 46, 58, 0.05), 0px 100px 80px rgba(46, 46, 58, 0.07)',
        },
      width: {
        'rightPanel': '27.5rem',
        'rightPanel-min': '22.5rem',
        '6.5': '1.625rem',
        '8.5': '2.125rem',
        '12.5': '3.125rem',
        '29': '7.125rem',
        '35': '8.813rem',
        '50': '12.25rem',
      },
      height: {
        '10.5': '2.625rem',
        '13': '3.313rem',
        '15': '3.688rem',
      },
      padding: {
        '1.5': '0.375rem',
        '15': '3.75rem',
        'default-rightPanel': '27.375rem',
      },
      gap: {
        '1.5': '0.375rem',
        '17': '4.813rem',
      },
      fontSize: {
        '2xs': ['0.625rem', '0.813rem'],
        '2.5xl': ['1.75rem', '2.25rem'],
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      zIndex: {
        '100': '100',
      },
      borderRadius: {
        '4xl': '2rem',
        '7xl': '4.438rem'
      }
    },
  },
  darkMode: "class",
  plugins: [require('@headlessui/tailwindcss')({ prefix: 'ui' })],
}
