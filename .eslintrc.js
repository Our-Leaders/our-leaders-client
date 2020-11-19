module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  overrides: [{
    files: ["*.vue"],
    rules: {  'max-len': 'off', 'no-underscore-dangle': 'off' },
  }],
  parserOptions: {
    parser: 'babel-eslint',
  },
};
