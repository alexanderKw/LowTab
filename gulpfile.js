const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const bs = require('browser-sync').create();

gulp.task('serve', () => {
  bs.init({
    server: {
      baseDir: './App/'
    }
  });
});

gulp.task('htmlmin', () => {
  return gulp
    .src('./dev/*.html')
    .pipe(
      plumber({
        errorHandler: notify.onError(err => {
          return {
            title: 'HTML Error',
            message: err.message
          };
        })
      })
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./App/'))
    .pipe(bs.stream());
});

gulp.task('css', () => {
  let processors = [cssnext, cssnano];

  return gulp
    .src('./dev/css/**/*.css')
    .pipe(
      plumber({
        errorHandler: notify.onError(err => {
          return {
            title: 'CSS Error',
            message: err.message
          };
        })
      })
    )
    .pipe(postcss(processors))
    .pipe(rename('all.min.css'))
    .pipe(gulp.dest('./App/css/'))
    .pipe(bs.stream());
});

gulp.task('js', () => {
  return gulp
    .src('./dev/js/**/*.js')
    .pipe(
      plumber({
        errorHandler: notify.onError(err => {
          return {
            title: 'JS Error',
            message: err.message
          };
        })
      })
    )
    .pipe(
      babel({
        presets: ['env']
      })
    )
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('./App/js/'))
    .pipe(bs.stream());
});

gulp.task('watch', () => {
  gulp.watch('./dev/*.html', ['htmlmin']);
  gulp.watch('./dev/css/**/*.css', ['css']);
  gulp.watch('./dev/js/**/*.js', ['js']);
});

gulp.task('default', ['serve', 'htmlmin', 'css', 'js', 'watch']);
