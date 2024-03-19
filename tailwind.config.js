/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./index.html",
    "./main.js",
    "./**/*.{html,js,jsx,ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
