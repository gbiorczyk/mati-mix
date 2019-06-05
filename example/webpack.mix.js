/* ---
  Docs: https://github.com/gbiorczyk/mati-mix/
--- */
const mix = require('mati-mix');

mix.js([
  '_dev/js/polyfills/**/*.js',
  '_dev/js/Core.js',
], 'public/build/js/scripts.js');

mix.sass(
  '_dev/scss/styles.scss'
, 'public/build/css/styles.css');

/* ---
  Config
--- */
mix
  // .sassMobileFirst()
  .aliases({
    'class': __dirname + '/_dev/js/classes',
  })
  .browserSync('example.test', [
    './public/**/*.css',
  ])
  // .version()
;