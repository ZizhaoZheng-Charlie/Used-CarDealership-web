/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["var(--lato-font-family)"],
        "kmx-mui": ["var(--kmx-mui-font-family)"],
        "kmx-sharp-bold": ["var(--kmxSharpBoldFontFamily)"],
      },
    },
  },
  plugins: [],
};
