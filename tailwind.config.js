/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      fontFamily: {
        'logo': ['Playfair Display'],
        'primary': ['Merriweather']
      },
      colors: {
        'primary': '#da7f4e',
        'secondary': '#fef3e7',
        'accent': '#d19347',
      }
    },
  },
  plugins: [],
})

