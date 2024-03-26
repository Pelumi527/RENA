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
      'primary-disable': '#AF4000',
      'secondary-hover': '#E1E1E1',
      'secondary': '#FFF',
      'secondary-active': '#C3C3C3',
      'gray-light': '#CCC',
      'gray-dark-1': '#00000090',
      'gray-loading': '#333',
    },
    extend: {
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out forwards',
        slideUp: 'slideUp 0.3s ease-in forwards',
        slideInUp: 'slideInUp 0.3s ease-out forwards', // New animation usage
        slideInDown: 'slideInDown 0s ease-in forwards', // New animation usage
      }
    },
    fontFamily: {
      Inter: ['Inter', 'sans-serif']
    },
  },
  plugins: [],
}
