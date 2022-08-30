/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,tsx}", "./src/components/**/*.{html,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend Deca", "sans-serif"],
        dmSerif: ["DM Serif Display", "sans-serif"],
      },
      colors: {
        secondary: "#A5A5A5",
        dark: "#272727",
        primary: "#56CC6A",
      },
    },
  },
  plugins: [],
};
