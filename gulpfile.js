/* global require */

var gulp = require('gulp')
var connect = require('gulp-connect')


// https://github.com/AveVlad/gulp-connect
gulp.task('connect', function() {
    connect.server({
        port: 4242,
        middleware: function(connect, opt) {
            return [
                // https://github.com/senchalabs/connect/#use-middleware
                function cors(req, res, next) {
                    res.setHeader('Access-Control-Allow-Origin', '*')
                    res.setHeader('Access-Control-Allow-Methods', '*')
                    next()
                }
            ]
        }
    })
})

gulp.task('build', function() {
    var path = require('path')
    var through = require('through2')
    var Buffer = require('buffer').Buffer
    var globs = [
        '**/*.js',
        '**/*.css',
        '!build/**/*',
        '!node_modules/**/*',
        '!gulpfile.js'
    ]
    gulp.src(globs)
        .pipe(through.obj(function(file, encoding, callback) {
            file.path = file.path.replace(
                path.join(__dirname, 'bower_components'),
                __dirname
            )
            callback(null, file)
        }))
        .pipe(gulp.dest('./build'))
})

console.log(__dirname)

gulp.task('default', ['build'])