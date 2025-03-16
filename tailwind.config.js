/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Enable dark mode with the 'class' strategy so we can toggle it with JavaScript
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
