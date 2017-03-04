const gulp = require('gulp')
const bs = require('browser-sync').create()
const cssmin = require('gulp-cssmin')
const sass = require('gulp-sass')
const sassLint = require('gulp-sass-lint')
const jshint = require('gulp-jshint')
const stylish = require('jshint-stylish')
const rename = require('gulp-rename')
const imagemin = require('gulp-imagemin')
const jpg = require('imagemin-jpegtran')
const png = require('imagemin-optipng')
const svg = require('imagemin-svgo')

const reload = bs.reload
const path = {
  css: 'assets/stylesheets/**/*',
  img: 'assets/images/**/*',
  imgOrigin: 'assets/imageOriginal/**/*',
  js: 'assets/javascripts/**/*',
  sass: 'assets/sass/**/*.scss'
}

gulp.task('server', () => {
  bs.init({
    server: {
      baseDir: './'
    },
    open: false,
    reloadOnRestart: true,
    logPrefix: 'Portfólio'
  })

  gulp.watch('*.html', reload)
  gulp.watch([path.css, path.img, path.js, path.sass], reload)
  gulp.watch(path.sass, ['sass', reload])
  gulp.watch(path.css, ['cssmin', reload])
  gulp.watch(path.js, ['lint-js', reload])
  gulp.watch(path.img, ['imagemin', reload])
})

gulp.task('sass', () => {
  gulp.src(path.sass)
    .pipe(sass())
    .pipe(gulp.dest('assets/stylesheets'))
})
gulp.task('cssmin', () => {
  gulp.src(path.css)
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/stylesheet'))
})
gulp.task('imagemin', () => {
  gulp.src(path.img)
    .pipe(imagemin([jpg(), png(), svg()]))
    .pipe(gulp.dest('assets/images'))
})

// lint files
gulp.task('lint-js', () => {
  gulp.src(path.js)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
})
gulp.task('lint-sass', () => {
  gulp.src(path.sass)
    .pipe(sassLint({
      options: {
        formatter: 'stylish',
        'merge-default-rules': false
      },
      rules: {
        'no-ids': 1,
        'no-mergeable-selectors': 0
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
})

gulp.task('default', () => {})
