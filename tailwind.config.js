/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary-hover': '#FF903E',
      'primary': '#FF7C2A',
      'primary-active': '#F57220',
      'secondary-hover': '#E1E1E1',
      'secondary': '#FFF',
      'secondary-active': '#C3C3C3',
      'gray-light': '#CCC',
      'gray-dark-1': '#00000090',
    },
    extend: {},
    fontFamily: {
      Inter: ['Inter', 'sans-serif']
    },
  },
  plugins: [],
}
