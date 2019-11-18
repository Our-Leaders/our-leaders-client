const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    autoprefixer({
      add: true,
      grid: true,
    }),
    tailwindcss('./tailwind.config.js'),
  ],
};
