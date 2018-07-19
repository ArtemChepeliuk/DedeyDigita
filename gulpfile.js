const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const plugin1 = require('gulp-plugin1');
const plugin2 = require('gulp-plugin2');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
 
gulp.task('stream', function () {
    // Endless stream mode
    return watch('css/**/*.css', { ignoreInitial: false })
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
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('compress', function (cb) {
  pump([
      gulp.src('js/*.js'),
      uglify(),
      gulp.dest('dist')
    ],
    cb
  );
});
gulp.task('default', () =>
  gulp.src('src/main.css')
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('dist'))
);
gulp.task('javascript', function () {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(plugin1())
    .pipe(plugin2())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});