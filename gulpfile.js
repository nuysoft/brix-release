/* global require */

var tag = require('moment')().format('YYYYMMDD.HHmmss.SSS') // 年月日.时分秒.毫秒
var version = '0.0.21'

var gulp = require('gulp')
var uglify = require('gulp-uglify')
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

// https://github.com/terinjokes/gulp-uglify
gulp.task('compress', function() {
    return gulp.src('./build/' + version + '/config-remote.js')
        .pipe(uglify())
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
var rmLinkCmds = function() {
    var cmds = []
    linked.forEach(function(file) {
        cmds.push('rm -fr ' + bower_components + file)
        cmds.push('bower update ' + file)
    })
    return cmds
}()
var reLinkCmds = function() {
    var cmds = []
    linked.forEach(function(file) {
        cmds.push('rm -fr ' + bower_components + file)
        cmds.push('bower link ' + file)
    })
    return cmds
}()
var dailyCmds = function() {
    var cmds = [
        'ls -al ' + bower_components,
    ]
    cmds = cmds.concat(rmLinkCmds)
    cmds.push('gulp build')
    cmds.push('gulp compress')
    cmds = cmds.concat([
        'git status',
        'git add -A .',
        'git commit -m "bower update"',
        'git push origin daily/' + version,
        'git push gitlab daily/' + version
    ])
    cmds = cmds.concat(reLinkCmds)
    return cmds
}()
gulp.task('daily', shell.task(dailyCmds))

var publishCmds = function() {
    var cmds = [] // dailyCmds.slice(0)
    cmds = cmds.concat([
        'git checkout master',
        'git merge daily/' + version
    ])
    cmds = cmds.concat([
        // 'git status',
        // 'git add -A .',
        // 'git commit -m "save tag log ' + tag + '"',
        'git push gitlab master',
        'git push origin master'
    ])
    cmds = cmds.concat([
        'git checkout -b daily/' + tag,
        'git branch',
        'git push gitlab daily/' + tag
    ])
    cmds = cmds.concat([
        'git tag publish/' + tag,
        'git push gitlab publish/' + tag,
        'git checkout master',
        'git pull',
        'git remote prune gitlab', // 清理远程已发布的分枝
        'git branch -d daily/' + tag, // 删除本地已发布的分枝
        'git checkout daily/' + version,
        'echo done'
    ])
    return cmds
}()
gulp.task('publish', shell.task(publishCmds))
gulp.task('cmds', function() {
    console.log(dailyCmds)
    console.log(publishCmds)
})

console.log(__dirname)

gulp.task('default', ['build'])