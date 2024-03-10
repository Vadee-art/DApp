/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      ...colors,
      'gray-olive': {
        50: '#f7f7f5',
        100: '#ecece8',
        200: '#d8d8d0',
        300: '#bebfb2',
        400: '#D1D3C8',
        500: '#A3A38F',
        600: '#868370',
        700: '#706d5e',
        800: '#5d5b4f',
        900: '#4c4942',
        950: '#282622',
      },

    },
    container: {
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        // '2xl': '1320px',
      }
    },
  },
  plugins: [],
};
