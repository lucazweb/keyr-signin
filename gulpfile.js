const { series, src, dest } = require('gulp');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const cleanCss = require('gulp-clean-css');
const del = require('del')

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
