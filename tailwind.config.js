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
        '92': '22rem',
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
      padding: {
        '17': '4.25rem',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '2/3': '67%',
        '3/4': '75%',
        'passport': '384px'
      },
      opacity: {
        '90': '0.9'
      },       
      width: {
        '9': '2.25rem',
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
        '1/16': '6.25%',
        '2/16': '12.50%',
        '3/16': '18.75%',
        '4/16': '25%',
        '5/16': '31.25%',
        '6/16': '37.50%',
        '7/16': '43.75%',
        '8/16': '50%',
        '9/16': '56.25%',
        '10/16': '62.50%',
        '11/16': '68.75%',
        '12/16': '75%',
        '13/16': '81.25%',
        '14/16': '87.50%',
        '15/16': '93.75%',
        '16/16': '100%',
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
        shallow: '0px 12px 16px rgba(0, 0, 0, 0.1)',
      },
      zIndex: {
        '100': 100,
        '200': 200,
        '300': 300,
      },
      screens: {
        'xxl': '1920px',
      },
    },
  },
  variants: {},
  plugins: []
}
