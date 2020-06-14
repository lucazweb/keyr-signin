const { series, src, dest, task, watch, parallel } = require('gulp');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const cleanCss = require('gulp-clean-css');
const del = require('del')

const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

task('css-browsersync', function() {
  return src(["*.scss"])
      .pipe(sass().on('error', function(err) {
          console.error(err.message);
          browserSync.notify(err.message, 3000); // Display error in the browser
          this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
      }))
      .pipe(dest('./'))
      .pipe(browserSync.stream());
});

task('serve', series('css-browsersync', function(){
  browserSync.init({
    server: './'
  });
  watch('./*.scss', parallel('css-browsersync'));
  watch('./*.html').on('change', browserSync.reload);
}))



function clean() {
  return del('build/');
}

function styles() {
  return src(['./node_modules/bootstrap/dist/css/bootstrap.min.css', 'style.css'])
    .pipe(concat('style.css'))
    .pipe(cleanCss())
    .pipe(dest('build/'))
}

function htmlForBuild(){
  return src('index.html')
    .pipe(htmlReplace({ remove: ''}))
    .pipe(dest('build/'))
}

function build() {
  return src(['assets/**', 'js/**'], { base: '.'})
    .pipe(dest('build/'));
}

exports.default = series(clean, styles, htmlForBuild, build);
