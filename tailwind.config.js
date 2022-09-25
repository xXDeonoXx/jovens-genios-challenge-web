/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5468FF',
        secondary: '#FD7900',
        fill: '#F3F5F9',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
