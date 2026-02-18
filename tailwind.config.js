/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1B5E20",
        gold: "#F9A825",
        cream: "#FAF7F0",
        terra: "#D2691E",
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}