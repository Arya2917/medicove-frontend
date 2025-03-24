/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          teal: {
            600: '#0D9488',
            800: '#115E59',
          },
        },
      },
    },
    plugins: [],
  }