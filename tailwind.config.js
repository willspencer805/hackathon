/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          light: "#FFFBD9",
          dark: "#FFE400"
        },
        grey: {
          light: "#D9D9D9",
          medium: "#A1A1AA"
        },
        blue:{
          medium: "#3b82f6"
        }
      }
    },
  },
  plugins: [],
}
