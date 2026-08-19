/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f2f5f2',
          100: '#e0e8e2',
          200: '#c1d1c6',
          300: '#9bb4a2',
          400: '#748f7c',
          500: '#4f6b58', // verde salvia principal
          600: '#405a49',
          700: '#33473a',
          800: '#28382e',
          900: '#1e2b23',
        },
        mustard: {
          50: '#fbf6e9',
          100: '#f5e8c2',
          200: '#eed699',
          300: '#e5c26c',
          400: '#dcae48', // dorado mostaza
          500: '#c9962f',
          600: '#a67824',
          700: '#7d591c',
          800: '#553c13',
          900: '#33240b',
        },
        bone: '#faf8f3',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
