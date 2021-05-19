module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: ['"M PLUS Rounded 1c"']
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
