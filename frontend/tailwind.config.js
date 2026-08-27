/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // paleta extraída del isotipo (montaña) del logo de Óptica Andina — #5c9c9d
        sage: {
          50: '#eff5f6',
          100: '#d8e8e8',
          200: '#b2d1d2',
          300: '#85b6b7',
          400: '#6ea9aa',
          500: '#5c9c9d', // verde de marca (logo)
          600: '#4f8687',
          700: '#427070',
          800: '#35595a',
          900: '#284343',
        },
        // amarillo extraído del sol del isotipo del logo
        mustard: {
          50: '#fbf9e9',
          100: '#f5f0c2',
          200: '#eee699',
          300: '#e5d96c',
          400: '#dccd48', // amarillo de marca (logo)
          500: '#c9ba2f',
          600: '#a69924',
          700: '#7d731c',
          800: '#554e13',
          900: '#332f0b',
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
