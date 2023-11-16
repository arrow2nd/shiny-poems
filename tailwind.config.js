/** @type {import('tailwindcss').Config} \*/
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      kiwi: ["var(--font-kiwimaru)", "sans-serif"]
    },
    extend: {
      colors: {
        main: "#4C7ABE",
        sub: "#8FA2BE",
        "neutral-white": "#FEFEFE"
      },
      fontSize: {
        none: 0
      },
      backgroundImage: {
        "arrow-down": "url('/chevron-down.svg')"
      },
      backgroundPosition: {
        "right-center": "right 0.5rem center"
      }
    }
  },
  plugins: []
};
