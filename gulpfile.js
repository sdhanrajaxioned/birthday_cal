'use strict';

const gulp = require('gulp');
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const terser = require('gulp-terser');

// Scss task
function compileCss() {
  return src('assets/sass/style.scss')
    .pipe(sass())
    .pipe(autoprefixer({  
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minify())
    .pipe(dest('assets/css'));
}

function jsMin() {
  return src('assets/vendor/script.js')
    .pipe(terser())
    .pipe(dest('dist/js'));
}


function watchTask(){
  watch('assets/sass/*.scss', compileCss);
  watch('assets/vendor/*.js', jsMin);
}

// deafault gulp task
exports.default = series(
  compileCss,
  jsMin,
  watchTask
  // autoprefix,
);