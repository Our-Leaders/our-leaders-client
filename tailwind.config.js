const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#C79947',
        gray: {
          ...colors.gray,
        },
        white: '#FFFFFF'
      },
      borderColor: theme => ({
        'nav': '#dbdbdb',
      }),
      margin: {
        '9': '2.25rem',
      }
    },
  },
  variants: {},
  plugins: []
}
