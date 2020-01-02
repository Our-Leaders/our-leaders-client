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
      height: {
        '28': '7rem',
        '30': '7.5rem',
      },
      margin: {
        '17': '4.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '34': '8.4rem',
        '36': '8.6rem',
        '37': '8.8rem',
        '38': '9rem',
      },
      width: {
        '28': '7rem',
        '30': '7.5rem',
        '1/8': '12.5%',
        '2/8': '25%',
        '3/8': '37.5%',
        '4/8': '50%',
        '5/8': '62.5%',
        '6/8': '75%',
        '7/8': '87.5%',
        '8/8': '100%',
      },
    },
  },
  variants: {},
  plugins: []
}
