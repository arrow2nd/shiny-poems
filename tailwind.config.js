module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      default: ['"M PLUS Rounded 1c"', 'sans-serif']
    },
    screens: {
      sm: '640px',
      md: '768px'
    },
    extend: {
      colors: {
        'natural-black': '#2c2c2c',
        shiny: '#78aeff',
        luca: '#1E140E'
      },
      fontSize: {
        none: 0
      }
    }
  },
  plugins: []
}
