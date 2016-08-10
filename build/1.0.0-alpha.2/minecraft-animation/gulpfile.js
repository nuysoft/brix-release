var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task('less', function() {
  return gulp.src('./src/less/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(minifyCss())
    .pipe(rename(function(path) {
      path.extname = '-min.css'
    }))
    .pipe(gulp.dest('./dist/css'));
})

gulp.task('default', ['less'], function() {
  return gulp.watch('./src/less/**/*.less', ['less'])
})