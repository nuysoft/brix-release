/* global require */

var version = '0.0.21'

var gulp = require('gulp')
var connect = require('gulp-connect')
var shell = require('gulp-shell')


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
        '**/*.map',
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
        .pipe(gulp.dest('./build/' + version))
})

// 
var bower_components = 'bower_components/'
var linked = function() {
    var fs = require('fs')
    var linked = []
    fs.readdirSync(bower_components).forEach(function(file) {
        if (fs.lstatSync(bower_components + file).isSymbolicLink()) linked.push(file)
    })
    return linked
}()
var cmds = function() {
    var cmds = [
        'ls -al ' + bower_components,
    ]
    linked.forEach(function(file) {
        cmds.push('rm -fr ' + bower_components + file)
        cmds.push('bower update ' + file)
    })
    cmds = cmds.concat([
        'gulp',
        'git status',
        'git add -A .',
        'git commit -m "bower update"',
        'git push origin daily/0.0.21',
        'git push gitlab daily/0.0.21'
    ])
    linked.forEach(function(file) {
        cmds.push('rm -fr ' + bower_components + file)
        cmds.push('bower link ' + file)
    })
    return cmds
}()
gulp.task('brix', shell.task(cmds))

gulp.task('brix-loader', shell.task([
    'ls -al bower_components',
    'rm -fr bower_components/brix-loader',
    'bower update brix-loader',
    'rm -fr bower_components/brix-components',
    'bower update brix-components',

    'gulp',
    'git status',
    'git add .',
    'git commit -m "bower update brix-loader"',
    'git push origin daily/0.0.21',
    'git push gitlab daily/0.0.21',

    'rm -fr bower_components/brix-loader',
    'bower link brix-loader'
]))

gulp.task('brix-components', shell.task([
    'ls -al bower_components',
    'rm -fr bower_components/brix-loader',
    'bower update brix-loader',
    'rm -fr bower_components/brix-components',
    'bower update brix-components',

    'gulp',
    'git status',
    'git add .',
    'git commit -m "bower update brix-components"',
    'git push origin daily/0.0.21',
    'git push gitlab daily/0.0.21',

    'rm -fr bower_components/brix-components',
    'bower link brix-components'
]))

console.log(__dirname)

gulp.task('default', ['build'])