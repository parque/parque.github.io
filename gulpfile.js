// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var minify = require('gulp-minify');

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

// Watch Files For Changes
gulp.task('watch',['browserSync','sass'], function() {
    gulp.watch('app/scss/*.scss', ['sass']);

    gulp.watch("app/**/*.html").on('change', browserSync.reload);
    // gulp.watch("app/**/*.js").on('change', browserSync.reload);
});


gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});
