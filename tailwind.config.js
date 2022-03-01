module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      default: ['Arial', 'sans-serif'],
      kiwi: ['Kiwi Maru', 'sans-serif']
    },
    extend: {
      colors: {
        main: '#4C7ABE',
        sub: '#8FA2BE',
        'neutral-white': '#FEFEFE'
      },
      fontSize: {
        none: 0
      }
    }
  },
  plugins: []
}
