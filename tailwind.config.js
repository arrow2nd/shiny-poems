module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      body: [
        'Avenir',
        '"Helvetica Neue"',
        'Helvetica',
        'Arial',
        '"Hiragino Sans"',
        'ヒラギノ角ゴシック',
        'YuGothic',
        '"Yu Gothic"',
        'メイリオ',
        'Meiryo',
        '"ＭＳ Ｐゴシック"',
        'MS PGothic',
        'monospace'
      ]
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
