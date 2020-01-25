const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#C79947',
        gray: {
          ...colors.gray,
          db: '#DBDBDB',
          fa: '#FAFAFA',
          c4: '#C4C4C4',
          '96': '#969696',
        },
        red: {
          ...colors.red,
        },
        white: '#FFFFFF'
      },
      borderColor: theme => ({
        'nav': '#DBDBDB',
      }),
      fontFamily: {
        'circular': 'Circular Std, sans-serif',
        'pt': 'PT Serif, serif',
      },
      height: {
        '28': '7rem',
        '30': '7.5rem',
        '72': '18rem',
        '84': '20rem',
      },
      lineHeight: {
        'letter-lg': '40px',
        full: '100%',
      },
      margin: {
        '9': '2.25rem',
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
        'job': '54.5%',
        'job-sm': '64.5%',
      },
      fontSize: {
        'xxs': '.625rem',
        '7xl': '5rem',
        '8xl': '6rem',
      },
      boxShadow: {
        primary: '0px 12px 52px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  variants: {},
  plugins: []
}
