/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ must include all React files inside src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
