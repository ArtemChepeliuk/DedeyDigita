const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const cleanCSS = require('gulp-clean-css');

gulp.task('stream', function () {
  // Endless stream mode
  return watch('css/**/*.css', {
      ignoreInitial: false
    })
    .pipe(gulp.dest('build'));
});

gulp.task('callback', function () {
  // Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
  return watch('css/**/*.css', function () {
    gulp.src('css/**/*.css')
      .pipe(gulp.dest('build'));
  });
});
gulp.task('sass', function () {
  return gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.sass', ['sass']);
});

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('dist'));
});
gulp.task('start', ['stream', 'callback', 'sass', 'sass:watch', 'minify-css']);