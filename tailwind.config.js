/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    ".src/components/**/*.{js,jsx}",
    "./src/**/*.{vue,js,jsx,scss,sass,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#164E50",
        "primary-light": "#6DCC65",
      },
    },
  },
  plugins: [],
};
