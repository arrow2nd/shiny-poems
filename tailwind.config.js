module.exports = {
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts.tsx}'],
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
  variants: {},
  plugins: []
}
