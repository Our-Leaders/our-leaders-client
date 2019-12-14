const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#C79947',
        gray: {
          ...colors.gray,
          db: '#DBDBDB',
        },
        red: {
          ...colors.red,
        },
        white: '#FFFFFF'
      },
      borderColor: theme => ({
        'nav': '#dbdbdb',
      }),
      margin: {
        '9': '2.25rem',
      },
      fontFamily: {
        'circular': 'Circular Std, sans-serif, serif',
      },
    },
  },
  variants: {},
  plugins: []
}
