/* global require */

var gulp = require('gulp')
var connect = require('gulp-connect')


// https://github.com/AveVlad/gulp-connect
gulp.task('connect', function() {
	connect.server({
		port: 4242
	})
})

gulp.task('build', function() {
	var globs = [
		'**/*.js',
		'**/*.css',
		'!build/**/*',
		'!node_modules/**/*',
		'!gulpfile.js'
	]
	gulp.src(globs)
		.pipe(gulp.dest('./build'))
})

gulp.task('default', ['build'])